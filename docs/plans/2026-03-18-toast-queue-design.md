# Toast 队列与全局/局部调用设计

## 背景与目标

- 当前 `Toast` 组件只支持单实例展示，无法在多次快速触发时形成堆叠队列体验。
- 希望提供一个简单易用且可扩展的 **全局 Toast 队列能力**，同时兼容局部使用场景。
- 内容形态在现有基础上 **轻量增强**：在保持简单文本为主的前提下，支持可选 `title`、`description`（message）和单个主要操作按钮。

**设计目标：**

1. 支持多条 Toast 堆叠展示，**同屏最多 3 条**，自动排队，遵循 FIFO。
2. 短时间内相同内容的 Toast 自动去重，避免“刷屏”。
3. 提供 **全局 API**（默认推荐用法）和 **局部 Hook/容器** 两种使用方式，但内部尽量复用同一套队列管理逻辑。
4. 行为配置以 **全局规则为主**，单条调用只做少量覆盖（如时长、状态、位置）。
5. 对业务侧保持 API 简洁，默认视觉和交互与当前版本尽量一致。

---

## 一、全局 API 设计

### 1.1 导出形式

- 从组件库导出一个全局 `toast` 对象：

```ts
import {toast} from 'kra-ui';

toast.show({
  message: '保存成功',
  status: 'success',
});

toast.error({
  message: '保存失败',
});
```

- 语法糖方法：
  - `toast.show(options)`
  - `toast.info(options)`
  - `toast.success(options)`
  - `toast.warning(options)`
  - `toast.error(options)`

### 1.2 单条 Toast 参数

```ts
interface ToastShowOptions {
  /** 主标题（可选） */
  title?: string;
  /** 描述文案，必填 */
  message: string;
  /** 状态类型，默认 info */
  status?: 'info' | 'success' | 'warning' | 'error';
  /** 展示位置，默认使用全局配置 placement */
  placement?: 'top' | 'bottom';
  /** 展示时长，毫秒，默认使用全局配置 duration */
  duration?: number;
  /** 是否可手动关闭，默认使用全局配置 closable */
  closable?: boolean;
  /** 操作按钮文案 */
  actionLabel?: string;
  /** 操作按钮点击回调 */
  onActionPress?: () => void;
}
```

> 约定：除 `message` 外，其余字段均为可选；当不传 `title`、`actionLabel` 时，UI 与当前版本的简单 Toast 非常接近。

### 1.3 全局配置入口

在 `NativeUIProvider`（或后续抽出的 `ToastProvider`）上增加一个 `toastConfig` 配置项：

```tsx
<NativeUIProvider
  toastConfig={{
    maxVisible: 3,
    defaultDuration: 3000,
    placement: 'top',
    closable: true,
    enableDedup: true,
    dedupInterval: 1000,
  }}
>
  {children}
</NativeUIProvider>
```

全局配置字段：

- `maxVisible?: number`：同屏最多可见的 Toast 数量，默认 `3`。
- `defaultDuration?: number`：默认展示时长（毫秒），默认 `3000`。
- `placement?: 'top' | 'bottom'`：默认展示位置，默认 `'top'`。
- `closable?: boolean`：默认是否可手动关闭，默认 `true`。
- `enableDedup?: boolean`：是否启用去重，默认 `true`。
- `dedupInterval?: number`：去重时间窗口（毫秒），默认 `1000`。

单条调用未显式传入对应字段时，使用全局配置作为默认值。

---

## 二、队列与去重规则

### 2.1 队列模型

内部定义一个 `ToastItem` 类型，用于队列管理和渲染：

```ts
interface ToastItem {
  id: string;
  title?: string;
  message: string;
  status: 'info' | 'success' | 'warning' | 'error';
  placement: 'top' | 'bottom';
  duration: number;
  closable: boolean;
  actionLabel?: string;
  onActionPress?: () => void;
  createdAt: number;
}
```

- 队列存储结构：`toasts: ToastItem[]`。
- 渲染时根据 `createdAt` 升序排序，按位置分组后分别取前 `maxVisible` 条。

### 2.2 入队规则

调用 `toast.show(options)` 时：

1. 根据全局配置 + 单条 options 组装出一个完整的 `ToastItem`（尚未加入队列）。
2. 若 `enableDedup = true`：
   - 在队列中查找满足：
     - `existing.status === item.status`
     - `existing.message === item.message`
     - `now - existing.createdAt <= dedupInterval`
   - 若存在，则 **忽略本次 show 调用**（不入队）。
3. 否则：
   - 将 `item` 追加到队列末尾（FIFO）：`toasts.push(item)`。

> 说明：去重简单基于 `status + message + 时间窗口`，避免在短时间内重复弹出内容完全一致的 Toast。

### 2.3 出队规则与排队行为

- **自动关闭：**
  - 每个 `ToastItem` 在进入可见状态时，根据 `duration > 0` 与否决定是否自动计时。
  - 到时后触发 `dismiss(id)`，从队列中移除对应项。

- **手动关闭：**
  - 用户点击 Toast 本体（当 `closable = true` 时）或关闭按钮时，调用 `dismiss(id)`。

- **出队后行为：**
  - `dismiss(id)` 从队列中删除该项。
  - 其后续项自然“补位”，由 `ToastHost` 根据最新队列重新计算可见列表，触发堆叠动画。

- **同屏最多 N 条：**
  - 对于每个 `placement`（`top` / `bottom`），根据创建时间升序排序：
    - `visibleTopToasts = topToasts.slice(0, maxVisible)`
    - `visibleBottomToasts = bottomToasts.slice(0, maxVisible)`
  - 多余的项依然保留在队列中，等待前面的关闭后再进入可见范围。

---

## 三、组件结构与职责划分

### 3.1 `Toast`（单条视觉与动画组件）

当前的 `Toast` 组件继续存在，角色不变：

- 负责单条 Toast 的布局与样式：
  - 图标（基于 status）
  - `title?` + `message` 两行文本布局
  - 可选操作按钮（`actionLabel`）
  - 关闭按钮（当 `closable = true`）
- 负责单条 Toast 的进出场动画：
  - 基于 `placement` 的滑入/滑出
  - 不直接关心队列，只关心自身 `visible` 状态与关闭回调。

在本次升级中，主要改动：

- 扩展 props 支持 `title`、`actionLabel`、`onActionPress`。
- 适当调整内部布局（例如：左侧图标，中间 `title + message` 垂直排列，右侧为可选操作按钮与关闭按钮）。

### 3.2 `ToastHost`（多条渲染与位置管理）

新增一个 `ToastHost` 组件，挂载在 `NativeUIProvider` 内部，用于根据队列渲染可见的多条 Toast：

- 从 `ToastContext` 中获取：
  - `toasts: ToastItem[]`
  - 全局配置：`maxVisible` 等
  - 操作方法：`dismiss(id)` 等
- 按 `placement` 将队列拆分成两组（top / bottom），并为每组渲染对应位置的堆叠 Toast：

```tsx
<ToastHost>
  {/* top placement toasts */}
  {/* bottom placement toasts */}
</ToastHost>
```

- 每个 Toast 使用 `key={item.id}`，通过 `Toast` 组件实现进出场动画。
- 在布局上，`ToastHost` 自身负责：
  - `position: 'absolute'`
  - 顶部/底部偏移（如复用现有 `TOAST_OFFSET`）
  - 垂直方向堆叠间距（例如固定 `8` 像素间距）

### 3.3 `ToastContext` 与 `ToastManager`

定义一个上下文用于在 React 树中传递队列和操作方法：

- `ToastContext` 暴露：

```ts
interface ToastContextValue {
  toasts: ToastItem[];
  config: ToastConfig;
  show: (options: ToastShowOptions) => string; // 返回 id
  dismiss: (id: string) => void;
  clearAll: () => void;
}
```

- `ToastManager` 负责：
  - 持有内部 `toasts` 状态（可用 `useReducer` 管理）。
  - 实现 `show` / `dismiss` / `clearAll` 的具体逻辑（包括去重、FIFO 队列管理）。
  - 通过 `ToastContext.Provider` 将状态和方法下发给子树（主要消费者是 `ToastHost`）。

### 3.4 与 `NativeUIProvider` 集成

- 在 `NativeUIProvider` 中：
  - 初始化 `ToastManager` 和 `ToastContext`。
  - 在根部渲染 `ToastHost`，确保 Toast 能覆盖全局 UI。
  - 同时将 `toastConfig` 传入 manager 用作全局默认配置。

- 全局 `toast` 对象：
  - 通过某种方式持有当前的 `show`/`dismiss` 引用（例如在 `ToastManager` 初始化时注册到一个模块级单例中）。
  - 当业务调用 `toast.show()` 时，本质上是调用当前激活的 `ToastManager.show()`。

---

## 四、局部 Hook 与容器扩展

### 4.1 `useToast` Hook

- 在 `ToastContext` 上提供 `useToast()`：

```ts
function useToast() {
  const ctx = useContext(ToastContext);
  // 返回与全局 toast 类似的 API（show / success / error / dismiss 等）
}
```

- 在 React 组件中使用：

```tsx
const toast = useToast();

toast.success({message: '操作成功'});
```

- 内部实现上，`useToast` 直接使用当前 context 的 `show` 方法，与全局 `toast` 对象保持一致行为。

### 4.2 局部容器（可选 Portal）

在本次设计中，局部容器的诉求是“可以在某个局部视图内改变 Toast 的挂载位置”，而不是完全独立队列。因此：

- 可以提供轻量的 `ToastPortal` 组件：
  - 内部仍然使用同一个 `ToastContext` 队列。
  - 只是在该组件的位置渲染 `ToastHost` 的一个变体（或直接复用 `ToastHost`，通过 props 覆盖样式）。
- 未来如果需要完全独立的局部队列，可以在此基础上扩展为“带 `scopeId` 的多队列管理”，本次不展开。

---

## 五、内容形态与交互细节

### 5.1 内容布局

- 基本结构：
  - 左侧：状态图标（info/success/warning/error）。
  - 中间：垂直排列的 `title?` + `message`。
    - 仅传 `message` 时，保持单行/两行展示，与当前版本接近。
  - 右侧：
    - 可选操作按钮（`actionLabel`），文字按钮样式。
    - 关闭按钮（当 `closable = true` 且未禁用时）。

### 5.2 交互约定

- 点击 Toast 本体：
  - 当 `closable = true` 时，可以整体作为关闭区域；也可以只通过右侧关闭按钮关闭（具体交互在实现时微调，但保证易用性）。
- 点击操作按钮：
  - 触发 `onActionPress`。
  - 同时关闭当前 Toast（调用 `dismiss(id)`），避免残留。
- 手势关闭（可选后续增强）：
  - 本次设计不强制实现滑动关闭，保留为未来扩展点。

---

## 六、测试与兼容性

### 6.1 回归兼容

- 仅使用现有 `Toast` 组件的场景：
  - 保持 props 兼容，新增字段均为可选。
  - 不使用全局 API/Provider 的用户，依然可以直接渲染单个 `Toast`，不依赖队列能力。

### 6.2 行为测试要点

- 多条快速触发时最多显示 3 条，超过部分排队。
- 去重规则生效：在短时间内多次调用相同 `status + message` 时，只展示一次。
- 自动关闭后，排队中的下一条能正确“补位”进入可见区域。
- 全局与 `useToast` 在同一页面混用时，行为一致且不会重复渲染。

---

## 七、后续实现计划（概览）

> 详细的实现步骤会通过 writing-plans 能力单独输出为 Implementation Plan，这里只给高层概览。

1. 扩展 `Toast` 组件：支持 `title`、`actionLabel`、`onActionPress`，保证兼容旧用法。
2. 实现 `ToastManager` 与 `ToastContext`：集中管理队列与全局配置。
3. 实现 `ToastHost`：按队列与 placement 渲染多条 Toast。
4. 在 `NativeUIProvider` 中集成 `ToastManager` 和 `ToastHost`，并注入 `toastConfig`。
5. 导出全局 `toast` 对象和 `useToast` Hook。
6. 在示例应用中补充多 Toast 场景的 Demo 与文档说明。

