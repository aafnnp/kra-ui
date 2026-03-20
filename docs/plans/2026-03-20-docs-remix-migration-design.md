# 文档站（packages/docs）Remix 迁移设计

**日期：** 2026-03-20  
**状态：** 已确认（brainstorming 全文确认）

## 背景与目标

- 当前 `packages/docs` 为 **VitePress + Nitro**，用于组件库文档与多预设静态/边缘部署。
- 目标：**完全替换**为 **Remix**，部署目标为 **Cloudflare Pages**，并**更新构建脚本**与 monorepo 根脚本衔接。
- 内容形态：以 **MDX Route** 为运行时形态；采用 **方案 A**——Markdown 为内容源，**构建前生成** Remix 路由模块，避免在 Worker 运行时动态扫描文件系统带来的复杂性与限制。

## 约束与决策（已确认）

| 项         | 决策                                                                       |
| ---------- | -------------------------------------------------------------------------- |
| 迁移范围   | 完全替换，移除 VitePress / Nitro                                           |
| 部署       | Cloudflare Pages（Remix Cloudflare 适配）                                  |
| 内容       | MDX Route；源文件为现有 `.md`，经脚本生成路由                              |
| URL        | 允许调整；默认与现有路径对齐（`/guide/...`）以降低迁移成本                 |
| 未匹配路径 | 优先 **404** + `ErrorBoundary`；与旧 Nitro SPA fallback 行为可后续按需对齐 |

## 架构与目录（第 1 节）

- **`packages/docs` 作为 Remix 应用根**：包含 `app/`、`public/` 等 Remix 约定目录；使用官方 **Remix + Vite + Cloudflare Pages** 推荐结构（以实施时官方模板为准）。
- **内容源与生成产物分离**：
  - 内容源：保留现有 `guide/**/*.md`、`index.md`（实施时可统一收拢到单一 `content/` 根目录，属实施细节）。
  - 生成：在 `predev` / `prebuild` 执行脚本，将每个 Markdown 映射为 `app/routes/` 下可路由的 **MDX 模块**（或「route 壳 + MDX」组合），生成文件带**明显头部注释**标明自动生成。
- **移除旧栈**：删除 `.vitepress/`、`nitro.config.ts`、Nitro `routes/`（含 `h3` 处理器）及仅服务于旧栈的依赖与脚本。
- **根仓库脚本**：`dev:docs`、`build:docs` 仍通过 `pnpm --filter kra-ui-docs` 调用；包内脚本改为 Remix 的 `dev` / `build` / `preview`。

## 路由、导航与 URL（第 2 节）

- **默认 URL**：`/` 首页；`/guide/getting-started`、`/guide/theme`、`/guide/migration`；组件文档 `/guide/components/<name>`，与磁盘路径一致，减少认知负担。
- **布局**：`app/root.tsx` + 文档布局路由（如 `docs` 布局或 pathless layout），负责顶栏、侧栏、正文槽位；子路由仅承载 MDX 正文。
- **导航数据源**：从 **单一源** 维护侧栏与顶栏（例如 `app/lib/docs-nav.ts` 或 `docs-nav.json`），由一次性从 `.vitepress/config.ts` 迁移得到；生成脚本或构建前校验：**侧栏每个 `link` 必须存在对应路由**。
- **可选重定向**：因允许 URL 变更，旧外链如需兼容可在 Cloudflare `_redirects` 或等价机制中维护（非首期必做）。

## 构建脚本与 Cloudflare（第 3 节）

- **`packages/docs/package.json`（建议）**：
  - `generate`：`node scripts/generate-docs-routes.mjs`（名称可微调）
  - `predev` / `prebuild`：调用 `generate`（或 `dev`/`build` 显式串行 `generate && ...`，二选一写死一种）
  - `dev` / `build` / `preview`：Remix + Cloudflare 官方推荐命令；`preview` 替代原 `vitepress preview` / `preview:nitro`
  - `clean`：清理 Remix/Vite 输出及**生成路由目录**（若生成物集中在 `app/routes/generated/` 等，仅清理子树更安全）
  - **删除**：所有 `vitepress`、`nitro`、`build:vercel`、`build:spa`、`build:node` 等与旧栈相关脚本
- **Cloudflare Pages**：构建命令与输出目录以 **Remix Cloudflare Pages 模板 + Wrangler/Pages 控制台** 为准，在实施计划中写死具体命令与目录，避免歧义。
- **依赖**：增加 Remix、MDX 插件、Cloudflare 适配相关包；移除 `vitepress`、`nitropack`、`h3`。

## 错误处理、测试、回滚与验收（第 4 节）

- **生成阶段失败**：非法路径、重复 URL、frontmatter 解析失败、侧栏死链 → **进程非零退出**，日志带文件路径。
- **运行时**：未匹配路由 → 404；全局错误边界避免白屏。
- **测试**：
  - 为**路由映射 / 导航校验**提供 `node --test` 轻量测试（表驱动或快照）。
  - 原 `resolveFallbackRedirect` 相关逻辑：若 Remix 侧不再需要 Nitro 式 fallback，则删除或改为测试 404/重定向策略的纯函数（实施时二选一）。
- **回滚**：单 PR revert 即可；团队需约定**生成物是否入仓**（推荐：**生成脚本必跑** + 生成目录明确，或生成物提交其一，在实施计划中选定）。
- **验收标准**：
  - `pnpm --filter kra-ui-docs dev` 可本地浏览首页与代表性文档页
  - `pnpm --filter kra-ui-docs build` 成功
  - Cloudflare Pages 可用同一构建命令部署
  - 侧栏/顶栏无死链（脚本校验）
  - 根目录 `build:docs` 仍可用

## 后续

- 实施计划见：`docs/plans/2026-03-20-docs-remix-migration-implementation-plan.md`
- 执行时建议使用 **executing-plans** / **subagent-driven-development** 按任务逐步落地并频繁提交。
