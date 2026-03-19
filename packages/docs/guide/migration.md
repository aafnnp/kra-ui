# 迁移指南（组件重设计 v1）

本页用于说明组件重设计 v1 带来的 **小破坏变更** 与推荐迁移方式。整体原则是：**新字段优先，旧字段保留一段时间并逐步弃用**。

## Button

### `loading` → `isLoading`（推荐）

- 现状：`loading` 仍可用
- 推荐：迁移到 `isLoading`

```tsx
// before
<Button label="提交" loading onPress={onSubmit} />

// after
<Button label="提交" isLoading onPress={onSubmit} />
```

### a11y（无需改动）

Button 默认会设置：

- `accessibilityRole="button"`
- `accessibilityLabel=label`
- `accessibilityState.disabled/busy`

## Input / Textarea

### a11y state（无需改动）

当你传入 `isDisabled` 时，组件会自动同步到：

- `accessibilityState.disabled`

当你传入 `isInvalid` 时，组件会设置 `accessibilityHint`（默认“输入无效”）。

并默认使用 `placeholder` 作为 `accessibilityLabel`（可手动覆盖）。

## Modal

### overlay token 化（无需改动）

遮罩颜色已统一走主题 `colors.overlay`，并保持 `closeOnOverlay` 行为不变。

## Toast

### Toast 变体 token 化（无需改动）

`status` 样式已统一走主题 `toastVariants`（info/success/warning/error）。Toast 默认会设置：

- `accessibilityRole="alert"`
- `accessibilityLabel`：优先 `title + message`，否则 `message`
