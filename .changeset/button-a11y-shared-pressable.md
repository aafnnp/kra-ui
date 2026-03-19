---
'kra-ui': major
---

## 破坏性变更

- `Button` 移除 `loading`，统一使用 `isLoading`。

## 改进

- 新增 `components/_shared`：统一交互态归一化与 a11y Pressable 封装。
- `Modal` 补齐遮罩点击关闭行为测试与验证。
- `Popup`/`PageContainer` 遮罩与间距从硬编码迁移到主题 token（`theme.colors.overlay` / `theme.spacing`）。
