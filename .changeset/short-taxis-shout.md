---
'kra-ui': minor
---

新增 Toast 队列能力与全局调用 API（`toast.*` / `useToast`），并完善相关测试与工程化配置。

增强 Accordion：

- 新增受控展开：`index` / `onIndexChange`
- 支持自定义标题：`Accordion.Item renderHeader`
- 支持内容挂载策略：`lazyMount` / `unmountOnCollapse`
- 支持动画配置：`isAnimated` / `animationDuration` / `animationEasing`
- 新增主题 variants（light/dark）：`accordionVariants` / `accordionItemVariants` / `accordionHeaderVariants`

