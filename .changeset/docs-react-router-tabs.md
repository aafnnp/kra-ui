---
'kra-ui': patch
---

### 相对 `master` 的变更摘要

**文档站（`packages/docs`）**

- 移除 VitePress、Nitro 与 Nitro 路由；文档源迁至 `content/`，构建前由脚本生成 `app/routes` 下的页面路由。
- 采用 **React Router 7** + **Vite** + **@cloudflare/vite-plugin**，SSR 面向 **Cloudflare Workers / Pages**；新增 `wrangler.toml`、`workers/app.ts`、侧栏/顶栏配置与导航校验脚本。
- 根目录 `typecheck` 增加 `kra-ui-docs`；调整 ESLint / Prettier 对 `packages/docs` 的忽略与规则。
- 新增迁移设计与实施计划：`docs/plans/2026-03-20-docs-remix-migration-*.md`。

**组件库（`kra-ui`，本 changeset 版本号）**

- **Tabs**：`scrollable` 且 `variant="underline"` 时在横向 `ScrollView` 内渲染下划线指示器，并避免与非滚动模式重复渲染；补充交互与可访问性相关测试。
- **测试**：Jest 的 `react-native-reanimated` mock 增加 `withSequence`，避免相关用例报错。

> 说明：`kra-ui-docs` 在 changeset 配置中为 `ignore`，不参与 npm 版本发布；上述文档站变更随仓库发布说明可见，不单独 bump 文档包版本。
