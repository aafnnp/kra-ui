# Kra-UI Components Redesign (v1) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 按 `docs/plans/2026-03-19-ui-components-redesign-design.md` 落地组件重设计 v1：建立 `_shared` 基建、补齐主题令牌、统一交互与 a11y、修复暗黑模式一致性，并为高优先级组件补齐最小有效测试与文档/示例，同时提供小破坏的兼容层与弃用策略。

**Architecture:** 采用“渐进式一致化（方案 A）”。保持 `packages/ui/src/index.ts` 现有导出与组件路径稳定，新增内部目录 `packages/ui/src/components/_shared/*` 作为交互态/a11y/size-variant 归一化的复用层；逐组件迁移硬编码样式到 `theme.ts/darkTheme.ts`；通过 `@deprecated` + 归一化函数提供兼容层；优先改造 Button/Input/Modal/Toast，再扩展到 Tabs/Dropdown/Accordion 等复合组件。

**Tech Stack:** React Native, TypeScript, `@shopify/restyle`, Jest (React Native preset), pnpm workspace, GitHub Actions

---

## Pre-flight (once)

### Task 0: 建立本地验证基线（不改代码逻辑）

**Files:**

- Verify: `packages/ui/package.json`
- Verify: `packages/ui/jest.config.*`（如存在）

**Step 1: 安装依赖**

Run: `pnpm install`  
Expected: PASS

**Step 2: 跑 UI 包的测试（确认命令）**

Run: `pnpm --filter kra-ui test`（若不存在，改为仓库实际 UI 测试命令）  
Expected: PASS（或至少能跑通并输出测试列表）

**Step 3: 跑 UI 包的类型检查（确认命令）**

Run: `pnpm --filter kra-ui typecheck`（若不存在，改为 UI 包实际 typecheck 命令）  
Expected: PASS

**Step 4: Commit（可选）**

> 只在你为补齐命令做了脚本小调整时提交；否则跳过。

---

## 基建与主题令牌（为后续迁移铺路）

### Task 1: 新增 `_shared` 基建（Pressable 交互态 + a11y + 状态归一化）

**Files:**

- Create: `packages/ui/src/components/_shared/pressable.tsx`
- Create: `packages/ui/src/components/_shared/a11y.ts`
- Create: `packages/ui/src/components/_shared/state.ts`
- Test: `packages/ui/src/components/_shared/__tests__/state.test.ts`（如测试目录结构不同按实际调整）

**Step 1: 写 failing test（状态归一化）**

在 `state.test.ts` 里覆盖：

- `loading`/`isLoading` 同时存在时，以 `isLoading` 为主
- `disabled`（若存在旧字段）映射到 `isDisabled`
- 输出的 `a11yState` 合并策略（disabled + busy + invalid 等）

Run: `pnpm --filter kra-ui test -- state.test`（按 jest 运行方式调整）  
Expected: FAIL（缺少实现/导出）

**Step 2: 实现 `normalizeInteractiveState`（最小实现让测试过）**

- 在 `state.ts` 导出 `normalizeInteractiveState(input)`，返回：
  - `isDisabled`
  - `isLoading`
  - `isInvalid`
  - `accessibilityState`（React Native 形状）

**Step 3: 跑测试**

Run: `pnpm --filter kra-ui test -- state.test`  
Expected: PASS

**Step 4: 实现 `_shared/a11y.ts`**

- 导出 helper：
  - `getAccessibilityLabel({label, accessibilityLabel})`
  - `mergeAccessibilityState(base, extra)`

**Step 5: 实现 `_shared/pressable.tsx`**

- 新建一个内部组件 `InteractivePressable`（或同名导出）：
  - 输入：`onPress`, `isDisabled`, `isLoading`, `accessibilityRole`, `accessibilityLabel`, `accessibilityState`, `children`
  - 输出：统一 `Pressable` 的 `disabled` 与 `accessibilityState`
  - pressed 反馈：通过 `Pressable` 的 `style` 回调实现（opacity/token 后续在主题里补齐时接入）

**Step 6: Commit**

```bash
git add packages/ui/src/components/_shared
git commit -m "$(cat <<'EOF'
feat(ui): add shared interaction and a11y utilities

EOF
)"
```

---

### Task 2: 为 v1 迁移补齐主题令牌（light/dark 同步）

**Files:**

- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`
- (Optional) Modify: `packages/ui/src/theme/index.ts`
- Test: `packages/ui/src/theme/__tests__/theme-tokens.test.ts`（或放在现有 theme 测试目录）

**Step 1: 写 failing test（token 存在性与 light/dark 对齐）**

断言：

- `colors.overlay` 在 light/dark 都存在（避免 Modal overlay 硬编码）
- 新增的 `buttonSizes`、`inputSizes`、`inputStates`（若本次引入）在 light/dark 都存在

Run: `pnpm --filter kra-ui test -- theme-tokens`  
Expected: FAIL

**Step 2: 在 `theme.ts` 增加 token**

最小建议（按设计稿）：

- `buttonSizes`: `sm/md/lg`（paddingX/paddingY/fontSize/gap/spinnerSize）
- `inputSizes`: `sm/md/lg`（height/padding/fontSize/radius）
- `inputStates`: `default/focus/invalid/disabled`（borderColor/backgroundColor/textColor/iconColor）

**Step 3: 在 `darkTheme.ts` 同步 token**

确保 key 完全一致（否则测试失败）。

**Step 4: 跑测试**

Run: `pnpm --filter kra-ui test -- theme-tokens`  
Expected: PASS

**Step 5: Commit**

```bash
git add packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
feat(theme): add tokens for interactive components

EOF
)"
```

---

## 组件迁移（按优先级）

### Task 3: Button v1 迁移（去硬编码 + 交互态统一 + 兼容层）

**Files:**

- Modify: `packages/ui/src/components/Button/index.tsx`
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`
- Test: `packages/ui/src/components/Button/__tests__/Button.test.tsx`
- Docs/Example (later): `packages/docs/**` / `packages/example/**`（按仓库实际位置）

**Step 1: 写 failing test（a11y + loading/disabled）**

在现有 `Button.test.tsx` 增加/补齐断言：

- `accessibilityRole="button"`
- `isDisabled` 时 `accessibilityState.disabled === true`
- `isLoading` 时 `accessibilityState.busy === true` 且点击被禁用
- 兼容：传 `loading` 也能生效（若当前存在）

Run: `pnpm --filter kra-ui test -- Button.test`  
Expected: FAIL（在迁移前至少有一项不满足）

**Step 2: 实现 props 兼容归一化（最小侵入）**

- 在 `ButtonProps` 中：
  - 新增 `isLoading?: boolean`
  - 保留 `loading?: boolean`，并加 `/** @deprecated use isLoading */`
- 组件内部用 `_shared/state.normalizeInteractiveState` 统一读取 `isLoading/isDisabled`

**Step 3: 将 sizeMap 迁移到 theme token**

- 删除硬编码 `sizeMap` 数字
- 改为从 theme 读取 `buttonSizes[size]`

**Step 4: 将 pressed/disabled/loading 行为迁移到 `_shared/pressable`**

- `Pressable` 替换为 `InteractivePressable`
- 确保 `ButtonContainer` 仍使用 restyle variant，不改变对外 `variant` 值

**Step 5: 跑测试**

Run: `pnpm --filter kra-ui test -- Button.test`  
Expected: PASS

**Step 6: Commit**

```bash
git add packages/ui/src/components/Button/index.tsx packages/ui/src/components/Button/__tests__/Button.test.tsx packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
refactor(button): unify states, a11y, and tokenized sizing

EOF
)"
```

---

### Task 4: Modal v1 迁移（overlay token 化 + a11y + 关闭行为约束）

**Files:**

- Modify: `packages/ui/src/components/Modal/index.tsx`
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`
- Test: `packages/ui/src/components/Modal/__tests__/Modal.test.tsx`（如不存在则创建）

**Step 1: 写 failing test（overlay 与 close 行为）**

断言：

- overlay 背景来自 theme（可通过渲染后读取 style 中背景色，或在实现中把 overlay 背景改为 `Box` + token 以便测试）
- `closeOnOverlay=false` 时点击遮罩不触发 `onClose`
- `closeOnOverlay=true` 时点击遮罩触发 `onClose`

Run: `pnpm --filter kra-ui test -- Modal.test`  
Expected: FAIL

**Step 2: 去除 overlay 硬编码**

- 将 `styles.overlay.backgroundColor` 改为 `theme.colors.overlay`（或改为 restyle token）

**Step 3: 补齐 a11y**

- overlay/内容区按可行性补齐：
  - 关闭按钮 `accessibilityRole="button"` + label
  - 若有展开态/可关闭态，补齐 `accessibilityState`

**Step 4: 跑测试**

Run: `pnpm --filter kra-ui test -- Modal.test`  
Expected: PASS

**Step 5: Commit**

```bash
git add packages/ui/src/components/Modal packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
refactor(modal): tokenized overlay and standardized close behavior

EOF
)"
```

---

### Task 5: Input 基座 v1（先从 Input/Textarea 做最小闭环）

**Files:**

- Modify: `packages/ui/src/components/Input/index.tsx`
- Modify: `packages/ui/src/components/Textarea/index.tsx`
- Create (if needed): `packages/ui/src/components/_shared/inputField.tsx`（只在确实能减少重复时引入）
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`
- Test: `packages/ui/src/components/Input/__tests__/Input.test.tsx`
- Test: `packages/ui/src/components/Textarea/__tests__/Textarea.test.tsx`（如不存在则创建）

**Step 1: 写 failing test（invalid/disabled/readOnly + a11y）**

Input/Textarea 各自覆盖：

- `isInvalid` → `accessibilityState.invalid === true`
- `isDisabled` → disabled state
- `label` 默认成为 `accessibilityLabel`（若组件支持）

Run: `pnpm --filter kra-ui test -- Input.test`  
Expected: FAIL

**Step 2: 引入 inputStates/inputSizes token（若 Task 2 未覆盖到具体形状，这里补齐）**

**Step 3: 实现样式迁移（去硬编码）**

- border/background/text/icon 全部读取 `inputStates[state]`
- focus 状态如果当前已有逻辑：迁移为 token 驱动（focus 时使用 `inputStates.focus`）

**Step 4: Textarea 同步**

确保 Input/Textarea 使用同一套 state 计算逻辑（尽量复用 `_shared/state`）。

**Step 5: 跑测试**

Run: `pnpm --filter kra-ui test -- Input.test`  
Expected: PASS

**Step 6: Commit**

```bash
git add packages/ui/src/components/Input packages/ui/src/components/Textarea packages/ui/src/components/_shared packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
refactor(input): standardize states, a11y, and theme-driven styling

EOF
)"
```

---

### Task 6: Toast v1（保持 API，token 化样式并补齐关键测试）

**Files:**

- Modify: `packages/ui/src/components/Toast/Toast.tsx`
- Modify: `packages/ui/src/components/Toast/types.ts`
- Modify: `packages/ui/src/components/Toast/ToastHost.tsx`
- Modify: `packages/ui/src/components/Toast/ToastManager.ts`
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`
- Test: `packages/ui/src/components/Toast/__tests__/toast-global.test.tsx`
- Test: `packages/ui/src/components/Toast/__tests__/ToastManager.test.ts`（按需补齐）

**Step 1: 写 failing test（status → 样式变体 & a11y）**

断言：

- `toast({status:'success'})` 渲染使用对应 variant（建议通过 testID/可读文本 + 样式断言）
- toast 容器具备可访问性 role（平台允许情况下）或至少可读 label

Run: `pnpm --filter kra-ui test -- toast-global`  
Expected: FAIL

**Step 2: theme 增加 `toastVariants`（light/dark 同步）**

- `success/warning/error/info` 对应背景/边框/文字/icon 色

**Step 3: Toast 组件去硬编码样式**

- 从 `toastVariants[status]` 读取颜色与间距 token

**Step 4: 跑测试**

Run: `pnpm --filter kra-ui test -- toast-global`  
Expected: PASS

**Step 5: Commit**

```bash
git add packages/ui/src/components/Toast packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
refactor(toast): tokenize variants and improve accessibility

EOF
)"
```

---

## 扩展到复合组件（第二优先级）

### Task 7: Tabs/Dropdown/Accordion（统一 a11y 与交互态）

**Files:**

- Modify: `packages/ui/src/components/Tabs/index.tsx`
- Modify: `packages/ui/src/components/Dropdown/index.tsx`
- Modify: `packages/ui/src/components/Accordion/index.tsx`
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`
- Test: 各组件 `__tests__`（如不存在则创建）

**Step 1: 为每个组件补最小 failing test**

- Tabs：选中态 `accessibilityState.selected`
- Dropdown：展开态 `accessibilityState.expanded`
- Accordion：展开/收起态 `accessibilityState.expanded` + 交互回调

**Step 2: 引入/补齐对应 theme variants（必要时）**

**Step 3: 用 `_shared/a11y` 与 `_shared/pressable` 统一交互实现**

**Step 4: 跑测试**

Run: `pnpm --filter kra-ui test -- Tabs.test Dropdown.test Accordion.test`（按实际命令拆分）  
Expected: PASS

**Step 5: Commit**

```bash
git add packages/ui/src/components/Tabs packages/ui/src/components/Dropdown packages/ui/src/components/Accordion packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
refactor(composites): standardize a11y and interaction patterns

EOF
)"
```

---

## 文档、示例与迁移说明（必须）

### Task 8: 文档补齐（最佳实践 + 迁移对照表）

**Files:**

- Modify/Create: `packages/docs/**`（按实际 docs 结构定位）
- Modify: `docs/plans/2026-03-19-ui-components-redesign-design.md`（如需补充“已实现项”链接可选）

**Step 1: 写迁移对照表**

至少覆盖：

- Button：`loading` → `isLoading`
- 其它组件若存在旧字段：列出旧→新

**Step 2: 写最佳实践示例**

覆盖：

- Button 的 disabled/loading/variant/size
- Input 的 invalid/label/errorText（若引入）
- Modal 的 closeOnOverlay 行为

**Step 3: Commit**

```bash
git add packages/docs
git commit -m "$(cat <<'EOF'
docs: add migration notes and best practices for v1 redesign

EOF
)"
```

---

## 收尾验证

### Task 9: 全量验证与回归

**Files:**

- Verify: `packages/ui/src/components/**`
- Verify: `packages/ui/src/theme/**`
- Verify: `packages/example/**`（若示例有改动）
- Verify: `packages/docs/**`（若文档有改动）

**Step 1: 全量测试**

Run: `pnpm --filter kra-ui test`  
Expected: PASS

**Step 2: 类型检查**

Run: `pnpm --filter kra-ui typecheck`（或实际命令）  
Expected: PASS

**Step 3: 构建**

Run: `pnpm --filter kra-ui build`（或仓库 `pnpm build`）  
Expected: PASS

**Step 4: （可选）Example 冒烟**

Run: `pnpm --filter kra-ui-example typecheck`  
Expected: PASS

**Step 5: 最终 commit（仅在需要小修）**

> 若前面已按任务提交，这里通常不需要。
