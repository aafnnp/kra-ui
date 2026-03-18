# Toast Queue Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 kra-ui 增加支持多条堆叠队列的 Toast（同屏最多 3 条、FIFO、短时间去重），并提供全局 `toast` API + `useToast` Hook，同时兼容现有 `Toast` 组件用法。

**Architecture:** 在 `NativeUIProvider` 内新增 `ToastProvider` 能力（context + manager + host）。队列逻辑集中在 manager（去重/FIFO/出队），UI 渲染由 `ToastHost` 负责，单条视觉与动画继续由 `Toast` 组件承担并做轻量增强（title/action）。

**Tech Stack:** React Native, TypeScript, @shopify/restyle, react-native-reanimated, Jest, @testing-library/react-native

---

### Task 1: 扩展单条 `Toast` 支持 title/action（保持兼容）

**Files:**
- Modify: `packages/ui/src/components/Toast/index.tsx`
- Test: （可选）`packages/ui/src/components/Toast/__tests__/Toast.test.tsx`（若项目已有 Toast 测试目录则复用；当前未发现）

**Step 1: 定义新增 props（不破坏现有 props）**
- 在 `ToastProps` 增加：
  - `title?: string`
  - `actionLabel?: string`
  - `onActionPress?: () => void`
- 约定：仅当 `actionLabel && onActionPress` 同时存在时才渲染操作按钮。

**Step 2: 增加布局（不改变默认外观）**
- 仅传 `message` 时，布局尽量保持当前一致。
- 传入 `title` 时，在 `message` 上方增加一行标题（粗一点/更高对比度即可）。
- 传入 action 时，在右侧增加一个 Pressable 文本按钮；点击后调用 `onActionPress`，并触发 `handleClose`（关闭当前 toast）。

**Step 3: 人工验证（example app）**
- 在 `packages/example/app/demo/[name].tsx` 找一个可快速触发 Toast 的 demo 页面（若已有 Toast demo 则复用），手动确认：
  - 不传新字段时视觉无回归
  - 传 `title`/action 时展示正确且可点击

---

### Task 2: 新增 Toast 队列类型与配置类型

**Files:**
- Create: `packages/ui/src/components/Toast/types.ts`
- Modify: `packages/ui/src/components/Toast/index.tsx`（复用类型）

**Step 1: 定义公开类型**
- `ToastStatus`, `ToastPlacement`（若目前是组件内 type，可迁移到 types 文件并导出）
- `ToastShowOptions`：用于 `toast.show()`
- `ToastConfig`：Provider 级配置（`maxVisible/defaultDuration/placement/closable/enableDedup/dedupInterval`）

**Step 2: 定义内部类型**
- `ToastItem`：包含 `id/createdAt` 等内部字段

**Step 3: 导出策略**
- `packages/ui/src/components/Toast/index.tsx` 继续默认导出 `Toast`，并导出类型：
  - `export type {ToastProps, ToastShowOptions, ToastConfig}`（保持对外可用）

---

### Task 3: 实现 `ToastManager`（队列、去重、出队）

**Files:**
- Create: `packages/ui/src/components/Toast/ToastManager.ts`
- Test: `packages/ui/src/components/Toast/__tests__/ToastManager.test.ts`（新增）

**Step 1: 写失败测试（去重/FIFO/maxVisible 计算）**
- 测试用例建议：
  - `show` 三次后 `getToasts()` 长度为 3
  - 第四次 `show` 后队列长度为 4，但 `getVisibleToasts()` 仅返回 3
  - 去重：在 `dedupInterval` 内连续 `show` 相同 `status+message` 只入队一次
  - `dismiss(id)` 会移除对应项，并使后续补位

**Step 2: 实现最小 manager 让测试通过**
- 使用纯函数/类均可，但建议保持简单可测：
  - `createToastManager(config)` 返回 `{show,dismiss,clearAll,getState}` 或类似结构
  - 或导出一组纯函数 + reducer（便于 React 集成）

**Step 3: 运行测试验证**
- Run: `pnpm -C packages/ui test ToastManager`（若 jest 配置支持按名称过滤；否则 `pnpm -C packages/ui test`）
- Expected: PASS

---

### Task 4: 实现 `ToastContext` + `useToast` Hook

**Files:**
- Create: `packages/ui/src/components/Toast/ToastContext.tsx`
- Create: `packages/ui/src/components/Toast/useToast.ts`
- Test: `packages/ui/src/components/Toast/__tests__/useToast.test.tsx`

**Step 1: 写失败测试（hook 可调用 show）**
- 用 `renderHook` 包一层 Provider，调用 `result.current.show(...)` 后能在 context state 中看到新增 item。

**Step 2: 实现 Context**
- `ToastContextValue`：
  - `toasts: ToastItem[]`
  - `config: ToastConfig`
  - `show(options): string`
  - `dismiss(id): void`
  - `clearAll(): void`
- Provider 内部用 `useReducer` 或 `useState` + manager 来维护状态与更新。

**Step 3: 实现 `useToast`**
- 返回 API：
  - `show`
  - 语法糖：`success/info/warning/error`（仅填充 status）
  - `dismiss`
  - `clearAll`

**Step 4: 运行测试验证**
- Run: `pnpm -C packages/ui test useToast`
- Expected: PASS

---

### Task 5: 实现 `ToastHost`（渲染多条堆叠）

**Files:**
- Create: `packages/ui/src/components/Toast/ToastHost.tsx`
- Modify: `packages/ui/src/components/Toast/index.tsx`（导出相关能力）

**Step 1: 基础渲染实现（先不追求完美动画）**
- 从 context 获取 `toasts`，按 placement 分组，取前 `maxVisible`。
- 每条渲染一个 `Toast`：
  - `visible={true}`
  - `onClose={() => dismiss(id)}`
  - 传递 `title/message/status/duration/placement/closable/action...`

**Step 2: 堆叠间距与偏移**
- `top` 组从 `TOAST_OFFSET` 开始，向下堆叠（每条 + (高度估算或固定间距)）。
- `bottom` 组从 `TOAST_OFFSET` 开始，向上堆叠。
- 第一版可以用固定 `stackGap`（如 8）+ `translateY` 偏移（按 index * (gap + itemHeightApprox)）实现基本堆叠。

**Step 3: 简单可视化验证**
- 在 example app 中一次触发 5 条 toast，确认：
  - 同屏只见 3 条
  - 关闭一条后下一条补位出现

---

### Task 6: 在 `NativeUIProvider` 中集成 Toast Provider + ToastHost

**Files:**
- Modify: `packages/ui/src/provider/NativeUIProvider.tsx`
- Modify: `packages/ui/src/index.ts`（导出 `toast`/`useToast`）
- Test: `packages/ui/src/provider/__tests__/NativeUIProvider.test.tsx`（补充）

**Step 1: 扩展 `NativeUIProviderProps`**
- 增加 `toastConfig?: ToastConfig`

**Step 2: 在 Provider 内部包裹 ToastProvider 并挂载 ToastHost**
- 结构示意：
  - `ColorModeContext.Provider`
    - `ThemeProvider`
      - `ToastProvider config={toastConfig}`
        - `{children}`
        - `<ToastHost />`

**Step 3: 写/补测试（确保挂载不破坏现有）**
- 现有 `useColorMode` 测试应继续通过。
- 新增：在 wrapper 中渲染一个使用 `useToast()` 的 hook，调用 `show` 不报错。

---

### Task 7: 实现并导出全局 `toast` 对象（与 Provider 连接）

**Files:**
- Create: `packages/ui/src/components/Toast/toast.ts`
- Modify: `packages/ui/src/components/Toast/index.tsx`（导出）
- Modify: `packages/ui/src/index.ts`（导出）
- Test: `packages/ui/src/components/Toast/__tests__/toast-global.test.tsx`

**Step 1: 设计连接方式（避免过度设计）**
- 采用模块级可变引用：
  - `setToastRef(ref)` 在 `ToastProvider` mount 时注册 `show/dismiss/...`
  - `toast.show` 调用当前 ref，若未注册则 no-op 或抛出更明确错误（建议开发态抛错，生产 no-op）

**Step 2: 写失败测试**
- 未挂载 Provider 时调用 `toast.show` 行为符合预期（按你偏好：抛错/忽略）。
- 挂载 Provider 后调用 `toast.show` 能让队列变化并渲染出 Toast（可用测试渲染 `ToastHost` 并断言出现文本）。

**Step 3: 实现并验证**

---

### Task 8: Example Demo & 文档（最小）

**Files:**
- Modify: `packages/example/app/demo/[name].tsx`（或对应 Toast demo 文件）
- （可选）docs：若项目已有组件文档体系则补一段

**Step 1: 增加 demo 操作**
- 按钮：一次触发 5 条不同 message（验证堆叠与排队）
- 按钮：快速触发同 message（验证去重）
- 按钮：带 title + action 的 toast（验证 action 关闭 + 回调）

---

## 执行方式（本会话）

你已选择在当前会话按计划一步步实现，我将采用“逐 Task 推进”的节奏：
- 每个 Task 内按 TDD 小步走（先测试→再实现→再验证）
- 每个 Task 完成后进行一次快速自检（类型检查/测试/示例验证）

