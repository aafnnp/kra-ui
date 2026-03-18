# Accordion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 在不破坏现有用法的前提下，为 `Accordion` 增加受控 API、自定义 Header、内容挂载策略、动画可配置与主题化 variants。

**Architecture:** 维持现有 `Accordion`/`Accordion.Item` 结构与 index 体系；容器层支持受控/非受控两条状态源；Item 通过 context 获取展开状态与 toggle；新增内容挂载策略与动画参数化；将 `variant` 样式下沉至 theme variants（轻量范围）。

**Tech Stack:** React Native、TypeScript、@shopify/restyle、react-native-reanimated、pnpm monorepo。

---

### Task 1: 建立主题 variants（轻量范围）

**Files:**
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`

**Step 1: 在浅色主题新增 variants**
- 在 `createTheme({ ... })` 根对象新增：
  - `accordionVariants`
  - `accordionItemVariants`
  - `accordionHeaderVariants`
- 覆盖 `outline/filled/separated` 的最小必要差异：
  - `outline`：容器边框/圆角/overflow
  - `filled`：header 背景色（使用 `primaryLight`）
  - `separated`：容器 `gap` 与 item 边框/圆角

**Step 2: 在暗色主题同步 variants 结构**
- 在 `darkTheme` 中新增同名 key，保持结构一致
- 颜色引用使用既有 token（例如 `primaryLight`、`border`）

**Step 3: 运行 lint 确认无类型/格式问题**

Run:
```bash
pnpm lint
```
Expected: ESLint/TS 无新增报错

**Step 4: Commit**

Run:
```bash
git add packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "feat(ui): add accordion theme variants"
```

---

### Task 2: Accordion 容器增加受控 API（index/onIndexChange）

**Files:**
- Modify: `packages/ui/src/components/Accordion/index.tsx`
- Reference: `packages/ui/src/index.ts`（已导出，无需改动，除非类型导出需要调整）

**Step 1: 调整 Props 类型**
- `AccordionProps` 新增：
  - `index?: number[]`
  - `onIndexChange?: (next: number[]) => void`
  - `unmountOnCollapse?: boolean`
  - `lazyMount?: boolean`
  - `isAnimated?: boolean`
  - `animationDuration?: number`
  - `animationEasing?: (t: number) => number`

**Step 2: 抽象“受控/非受控”的 expandedIndices 来源**
- 规则：
  - `const isControlled = index !== undefined`
  - `expandedIndicesSet` 优先来自 `props.index`
  - 非受控使用内部 `useState(Set(defaultIndex))`
- `toggle`：
  - 计算 `nextIndices: number[]`
  - 受控：仅触发 `onIndexChange?.(nextIndices)`
  - 非受控：更新内部 state，并触发 `onIndexChange?.(nextIndices)`（监听用）

**Step 3: 将内容策略与动画配置透传给 Item（通过 context）**
- `AccordionContextValue` 增加：
  - `unmountOnCollapse`
  - `lazyMount`
  - `isAnimated`
  - `animationDuration`
  - `animationEasing`

**Step 4: 运行示例应用做基础验证**

Run:
```bash
pnpm dev:example
```
Expected: Accordion 现有 demo 可正常展开/收起；受控 demo（后续 Task 5 添加）可按外部状态工作

**Step 5: Commit**

Run:
```bash
git add packages/ui/src/components/Accordion/index.tsx
git commit -m "feat(ui): add controlled accordion index api"
```

---

### Task 3: Accordion.Item 支持 renderHeader（自定义 Header）

**Files:**
- Modify: `packages/ui/src/components/Accordion/index.tsx`

**Step 1: 扩展 AccordionItemProps**
- 新增：
  - `renderHeader?: (params: { title: string; isExpanded: boolean; isDisabled: boolean; index: number; toggle: () => void }) => React.ReactNode`

**Step 2: 实现默认 Header 与 renderHeader 分支**
- 若提供 `renderHeader`：
  - 仍由 Item 提供默认 `toggle` 方法与状态参数
  - 要求自定义 Header 自己处理可点击与无障碍（文档里明确）
- 若不提供：
  - 继续使用现有 Pressable header（标题 + 右侧箭头旋转）
  - 保持 `accessibilityRole` 与 `accessibilityState`

**Step 3: Commit**

Run:
```bash
git add packages/ui/src/components/Accordion/index.tsx
git commit -m "feat(ui): support accordion item custom header"
```

---

### Task 4: 内容挂载策略（lazyMount / unmountOnCollapse）

**Files:**
- Modify: `packages/ui/src/components/Accordion/index.tsx`

**Step 1: 为 Item 增加 mountedIndices 逻辑（按需）**
- 当 `lazyMount=true`：
  - 本地维护 `hasMounted`（或容器层维护 `mountedIndices`，推荐容器层，避免每个 item 各自状态不一致）
  - 首次展开时标记已挂载

**Step 2: 实现渲染条件**
- `unmountOnCollapse=true`：
  - 折叠时不渲染内容节点（或直接 return null）
- 与 `lazyMount` 组合时保持逻辑清晰：
  - 未曾展开且 `lazyMount=true`：不渲染
  - 曾展开：按 `unmountOnCollapse` 决定折叠时是否卸载

**Step 3: Commit**

Run:
```bash
git add packages/ui/src/components/Accordion/index.tsx
git commit -m "feat(ui): add accordion mount strategy options"
```

---

### Task 5: 动画可配置（isAnimated/duration/easing）

**Files:**
- Modify: `packages/ui/src/components/Accordion/index.tsx`

**Step 1: 参数化 timing 配置**
- 默认值：
  - `isAnimated=true`
  - `animationDuration=250`
  - `animationEasing` 默认 material 风格曲线（沿用当前 bezier）
- 将 `withTiming(..., TIMING_CONFIG)` 改为由 props 组装 config

**Step 2: 支持关闭动画**
- `isAnimated=false`：
  - `animatedExpanded` 直接取 0/1（不走 timing）
  - 或者 bypass Animated.View，直接渲染最终态（优先保证稳定）

**Step 3: Commit**

Run:
```bash
git add packages/ui/src/components/Accordion/index.tsx
git commit -m "feat(ui): make accordion animation configurable"
```

---

### Task 6: 主题化落地（组件侧接入 variants）

**Files:**
- Modify: `packages/ui/src/components/Accordion/index.tsx`
- Reference: `packages/ui/src/theme/theme.ts`

**Step 1: 容器层使用 accordionVariants**
- 使用 Restyle 的 variant 机制（或最小化手写映射）读取：
  - `outline/filled/separated` 对应容器样式（边框/圆角/overflow/gap）

**Step 2: Item 与 Header 使用对应 variants**
- Item 外框（主要针对 `separated`）走 `accordionItemVariants`
- Header 背景（主要针对 `filled`）走 `accordionHeaderVariants`
- 尽量移除组件内 `useTheme` + `style={{ backgroundColor: ... }}` 分支（仍允许少量必要动态值）

**Step 3: 运行 lint**

Run:
```bash
pnpm lint
```
Expected: 无新增 lint

**Step 4: Commit**

Run:
```bash
git add packages/ui/src/components/Accordion/index.tsx
git commit -m "refactor(ui): theme accordion variants"
```

---

### Task 7: 文档与示例更新

**Files:**
- Modify: `packages/docs/guide/components/accordion.md`
- Modify: `packages/example/app/demo/[name].tsx`（如果该页面集中展示组件）

**Step 1: 更新 docs Props 表**
- `Accordion Props` 增补：
  - `index`
  - `onIndexChange`
  - `lazyMount`
  - `unmountOnCollapse`
  - `isAnimated`
  - `animationDuration`
  - `animationEasing`
- `AccordionItem Props` 增补 `renderHeader`

**Step 2: 增加代码示例**
- 受控（single）
- 自定义 Header（示例中使用 `Pressable` + `accessibilityState`）
- 内容策略（lazyMount + unmountOnCollapse）
- 动画配置（关闭动画/更短时长）

**Step 3: 更新 example demo**
- 新增一个 Accordion demo 区块覆盖：
  - 受控切换
  - 自定义 header
  - lazyMount/unmountOnCollapse

**Step 4: 构建 docs（或至少启动验证）**

Run:
```bash
pnpm dev:docs
```
Expected: 文档页面可正常渲染，代码块无语法问题

**Step 5: Commit**

Run:
```bash
git add packages/docs/guide/components/accordion.md packages/example/app/demo/[name].tsx
git commit -m "docs(example): update accordion usage"
```

---

### Task 8: 最终验证与收尾

**Files:**
- Verify: `packages/ui/src/components/Accordion/index.tsx`
- Verify: `packages/ui/src/theme/theme.ts`
- Verify: `packages/ui/src/theme/darkTheme.ts`
- Verify: `packages/docs/guide/components/accordion.md`

**Step 1: 全量 lint + build**

Run:
```bash
pnpm lint
pnpm build
```
Expected: 全部通过

**Step 2: 手动冒烟**
- Example App 中展开/收起、single/multiple、disabled、variants 仍正常
- 新增受控与策略选项行为符合预期

**Step 3: 可选：补 changeset**
- 若属于对外发布的能力增强：新增 changeset 说明新增 props（若仓库发布流程要求）

---

## 执行交接

计划已保存到 `docs/plans/2026-03-18-accordion-implementation-plan.md`。两个执行选项：

1. **Subagent-Driven（本会话）**：我按 Task 分派子任务逐个实现，每个 Task 完成后做一次 review，再进入下一个
2. **Parallel Session（单独会话）**：你在 worktree 开新会话，用 `superpowers:executing-plans` 分批执行并设置检查点

你选哪个？

