# Alert Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将现有 `Alert`（仅 `status/title/description`）升级为支持 `variant/size/icon/action/closable` 且支持插槽组合（compound components）的内联提示条组件，并同步更新主题、示例与文档。

**Architecture:** 在 `packages/ui/src/components/Alert/index.tsx` 内重构为复合组件（静态属性挂载子组件），默认 props 渲染走同一套内部布局；主题中补齐 `alertVariants` 的颜色 token 与新增 `alertSizes`。为减少破坏性变更，保留 `status/title/description` 作为兼容别名（标记废弃）。

**Tech Stack:** React Native + TypeScript、@shopify/restyle、@testing-library/react-native、Jest、pnpm monorepo

---

## 注意事项（执行前）

- 本计划假设在独立 worktree 中执行更安全，但当前仓库也可直接执行；若需要 worktree，可在执行阶段先创建。
- 现状：仓库已存在简版 `Alert` 与 `alertVariants`（仅 background），并且 `Alert` 已在 `packages/ui/src/index.ts` 中导出，`packages/docs/guide/components/alert.md` 与 example demo 也已使用旧 API。

---

### Task 1: 为新 Alert API 补齐/新增单元测试

**Files:**
- Create: `packages/ui/src/components/Alert/__tests__/Alert.test.tsx`

**Step 1: 写失败的测试（默认 props 渲染 + variant）**

```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Alert from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';

const renderWithProvider = (ui: React.ReactElement) => render(<NativeUIProvider>{ui}</NativeUIProvider>);

test('默认使用 variant 渲染 title/message', () => {
  const { getByText } = renderWithProvider(
    <Alert variant="info" title="提示" message="这是一条信息提示" />,
  );
  expect(getByText('提示')).toBeTruthy();
  expect(getByText('这是一条信息提示')).toBeTruthy();
});
```

**Step 2: 运行测试确认失败**

Run: `pnpm --filter kra-ui test -- Alert.test.tsx`

Expected: FAIL（`AlertProps` 不存在 `variant/message` 或渲染不符合预期）

**Step 3: 添加失败的测试（closable + onClose）**

```tsx
test('closable 时点击触发 onClose', () => {
  const onClose = jest.fn();
  const { getByA11yLabel } = renderWithProvider(
    <Alert variant="warning" title="警告" message="请注意" closable onClose={onClose} />,
  );
  fireEvent.press(getByA11yLabel('关闭提示'));
  expect(onClose).toHaveBeenCalledTimes(1);
});
```

**Step 4: 运行测试确认失败**

Run: `pnpm --filter kra-ui test -- Alert.test.tsx`

Expected: FAIL（未渲染关闭按钮或无 a11yLabel）

**Step 5: 添加兼容性测试（旧 status/title/description 仍可用）**

```tsx
test('兼容旧 props：status/title/description', () => {
  const { getByText } = renderWithProvider(
    <Alert status="success" title="成功" description="操作已完成" />,
  );
  expect(getByText('成功')).toBeTruthy();
  expect(getByText('操作已完成')).toBeTruthy();
});
```

**Step 6: 运行测试确认失败**

Run: `pnpm --filter kra-ui test -- Alert.test.tsx`

Expected: FAIL（后续重构过程中应保持可通过；此时可能仍 PASS/FAIL 皆可，关键是锁定行为）

**Step 7: 提交（仅测试）**

Run:

```bash
git add packages/ui/src/components/Alert/__tests__/Alert.test.tsx
git commit -m "$(cat <<'EOF'
test(alert): add Alert interaction coverage

EOF
)"
```

---

### Task 2: 扩展主题 Token（alertVariants + alertSizes）

**Files:**
- Modify: `packages/ui/src/theme/theme.ts`
- Modify: `packages/ui/src/theme/darkTheme.ts`

**Step 1: 在浅色主题补齐 alertVariants 颜色 token**

在 `alertVariants` 中，为 `info/success/warning/error` 增加：
- `backgroundColor`（保留）
- `borderColor`

并新增一个结构化的颜色映射（例如 `alertColors` 或直接在组件内根据 `variant` 计算），确保能得到：
- `iconColor`
- `titleColor`
- `messageColor`

（如果主题系统不希望新增 key，可让组件用 `useTheme` 从 `colors` 中组合出这三个颜色：例如 title/message 使用 `primary/success/warning/error`，border 使用对应语义色，背景使用 `*Light`。）

**Step 2: 新增 alertSizes**

为 `sm/md` 增加：
- `paddingX/paddingY`（映射到 spacing token，例如 `s/m`）
- `gap`
- `iconSize`
- `radius`
- `titleTextVariant/messageTextVariant`（可复用现有 `textVariants`，例如 `label/body/caption` 的组合）

**Step 3: 同步暗色主题**

在 `darkTheme.ts` 做同样结构的补齐（色值引用暗色 `colors` 的语义色）。

**Step 4: 类型检查**

Run: `pnpm --filter kra-ui lint`

Expected: PASS

**Step 5: 提交（仅主题）**

```bash
git add packages/ui/src/theme/theme.ts packages/ui/src/theme/darkTheme.ts
git commit -m "$(cat <<'EOF'
feat(theme): add Alert size tokens and colors

EOF
)"
```

---

### Task 3: 重构 Alert 组件为复合组件 + 新 API（保留旧 API 兼容）

**Files:**
- Modify: `packages/ui/src/components/Alert/index.tsx`

**Step 1: 定义新类型与兼容层**

实现新的主 props（与设计一致）：
- `variant: 'info' | 'success' | 'warning' | 'error'`
- `size?: 'sm' | 'md'`
- `title?: React.ReactNode`
- `message?: React.ReactNode`
- `icon?: boolean | React.ReactNode`
- `action?: React.ReactNode`
- `closable?: boolean`
- `onClose?: () => void`

兼容旧 props：
- `status?: ...`（等价 `variant`，JSDoc 标记 `@deprecated`）
- `description?: string`（映射到 `message`，JSDoc `@deprecated`）

并确保当用户同时传入 `variant` 与 `status` 时，以 `variant` 为准。

**Step 2: 采用静态属性模式实现插槽子组件**

参照现有规范（如 `Accordion`）：
- `Alert.Icon`
- `Alert.Title`
- `Alert.Description`
- `Alert.Action`
- `Alert.Close`

实现方式建议：
- `Alert` 内部用 `React.Context` 传递 `variant/size/colors/onClose/closable` 等
- 子组件读取 context 决定默认样式与是否渲染

**Step 3: 默认渲染路径（props 模式）复用插槽实现**

当未传 `children` 时：
- 根据 props 组合渲染 `Alert.Icon/Title/Description/Action/Close` 的默认布局

当传了 `children` 时：
- 直接渲染 children（仍包在 `Alert.Root` 风格容器内），由用户自行排列插槽

**Step 4: Restyle 集成**

- 容器继续使用 `createRestyleComponent + createVariant({themeKey:'alertVariants'})`
- 额外的 spacing/border/background 等尽量走 Restyle props（避免硬编码）
- size 相关样式从 `theme.alertSizes` 读取并应用（padding/gap/radius/iconSize）

**Step 5: 无障碍**

- 容器：设置合适 `accessibilityRole`（优先 `alert`）
- Close：`Pressable` + `accessibilityLabel="关闭提示"` + 合理 `hitSlop`

**Step 6: 跑 Task 1 的测试并修到通过**

Run: `pnpm --filter kra-ui test -- Alert.test.tsx`

Expected: PASS

**Step 7: 提交（组件重构）**

```bash
git add packages/ui/src/components/Alert/index.tsx
git commit -m "$(cat <<'EOF'
feat(ui): enhance Alert with compound slots

EOF
)"
```

---

### Task 4: 更新示例应用的 AlertDemo

**Files:**
- Modify: `packages/example/app/demo/[name].tsx`（`AlertDemo` 段落）

**Step 1: 将旧 props 替换为新 props**

- `status` -> `variant`（或继续用 `status` 验证兼容性，但建议 demo 使用新 API）
- `description` -> `message`

**Step 2: 增加至少一个展示点**

- 带 `action` 的示例（例如一个 `Button` 或 `Link`）
- 带 `closable` 的示例（验证 `onClose`）
- 至少一个插槽用法（展示 `Alert.Icon/Title/Description/Action/Close` 的组合）

**Step 3: 运行 example 基础类型检查（或 lint）**

Run: `pnpm --filter kra-ui-example exec tsc --noEmit`

Expected: PASS

**Step 4: 提交（example）**

```bash
git add packages/example/app/demo/[name].tsx
git commit -m "$(cat <<'EOF'
docs(example): update Alert demo to new API

EOF
)"
```

---

### Task 5: 更新文档站 Alert 文档页

**Files:**
- Modify: `packages/docs/guide/components/alert.md`

**Step 1: 更新基本用法**

- `status/title/description` -> `variant/title/message`
- 增加 `action/closable` 示例
- 增加插槽用法示例（compound）

**Step 2: 更新 Props 表**

列出新 props，并在表中标注旧 props 为 deprecated（如果仍保留）。

**Step 3: 提交（docs）**

```bash
git add packages/docs/guide/components/alert.md
git commit -m "$(cat <<'EOF'
docs: refresh Alert docs for new API

EOF
)"
```

---

### Task 6: 全量校验（lint/test/build）

**Files:**
- None

**Step 1: UI 包 lint**

Run: `pnpm --filter kra-ui lint`

Expected: PASS

**Step 2: UI 包 test**

Run: `pnpm --filter kra-ui test`

Expected: PASS

**Step 3: 根目录 lint + build（与 CI 一致）**

Run: `pnpm lint && pnpm build`

Expected: PASS

**Step 4: 最终提交（如有零散修复）**

如在校验中产生修复性改动，按变更范围补充一次小 commit（例如 `fix(ui): ...`）。

---

## Plan complete

Plan complete and saved to `docs/plans/2026-03-18-alert-implementation-plan.md`. Two execution options:

1. Subagent-Driven (this session) - I dispatch fresh subagent per task, review between tasks, fast iteration
2. Parallel Session (separate) - Open new session with executing-plans, batch execution with checkpoints

Which approach?

