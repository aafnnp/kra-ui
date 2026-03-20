# Docs Remix Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 `packages/docs` 从 VitePress + Nitro **完全迁移**到 **Remix（MDX Route + 构建前生成）**，部署目标为 **Cloudflare Pages**，并更新包内与仓库根目录相关脚本。

**Architecture:** 保留现有 Markdown 为内容源；`scripts/generate-docs-routes.mjs` 在 `dev/build` 前生成 `app/routes/` 下的 MDX 路由模块；布局路由提供顶栏/侧栏；导航数据单文件维护并做死链校验；移除 VitePress/Nitro 及 `h3` 路由层。

**Tech Stack:** pnpm workspace、Remix（Vite 模式）、MDX、TypeScript、Cloudflare Pages（@remix-run/cloudflare 系列，版本以官方模板为准）、Node `node --test`

**设计依据：** `docs/plans/2026-03-20-docs-remix-migration-design.md`

---

### Task 1: 对照官方模板列出 Remix Cloudflare 最小文件清单

**Files:**

- Read: Remix 官方文档「Cloudflare Pages」部署章节
- Read: 运行 `npx create-remix@latest` 选择 Cloudflare 模板后的目录结构（可在临时目录执行，**不要**提交临时目录）

**Step 1: 记录必备文件**

- 列出必须存在的文件：`vite.config.ts`、`react-router.config.ts` 或 `remix.config`（以模板为准）、`app/entry.client.tsx`、`app/entry.server.tsx`、`app/root.tsx`、`functions` 或 `server.ts`（以模板为准）、`tsconfig.json` 等。

**Step 2: 记录必备 `package.json` scripts**

- 记录模板中的 `dev`、`build`、`start`、`typecheck`（若有）、`deploy`（若有）。

**Step 3: Commit**

- 本 Task 无代码变更可不提交；若做了笔记文件则按需提交（通常跳过）。

---

### Task 2: 备份并移除 `packages/docs` 中与 VitePress/Nitro 直接冲突的目录（保留 Markdown）

**Files:**

- Delete（后续 Task 会补齐 Remix）: `packages/docs/.vitepress/`
- Delete: `packages/docs/nitro.config.ts`
- Delete: `packages/docs/routes/`（Nitro 路由，整目录）
- Keep: `packages/docs/guide/**/*.md`、`packages/docs/index.md`

**Step 1: 确认无其他包引用这些路径**

Run: `rg "vitepress|nitro\\.config|packages/docs/routes" --glob '!**/node_modules/**'`

**Step 2: 删除上述目录/文件**

**Step 3: Commit**

```bash
git add -A packages/docs
git commit -m "chore(docs): remove VitePress and Nitro scaffolding"
```

---

### Task 3: 初始化 Remix 依赖与 TS 配置（packages/docs）

**Files:**

- Modify: `packages/docs/package.json`
- Create: `packages/docs/tsconfig.json`（若尚无或与模板对齐）
- Create: `packages/docs/vite.config.ts`（从官方 Cloudflare 模板拷贝并改 `paths`/别名）

**Step 1: 安装依赖（版本以模板为准，示例占位）**

在 `packages/docs` 下添加依赖（具体包名与版本复制自模板 `package.json`）：

- `@remix-run/cloudflare`、`@remix-run/react`、`@remix-run/server-runtime`（若需要）
- `react`、`react-dom`
- `vite`、`@remix-run/dev`（或当前 Remix 对 Vite 的包名）
- MDX：`@mdx-js/rollup` 或模板推荐方式
- `typescript`、`@types/react`、`@types/react-dom`

移除：`vitepress`、`nitropack`、`h3`

Run: `pnpm install`（在仓库根）

**Step 2: 添加脚本**

- `generate`: `node scripts/generate-docs-routes.mjs`
- `dev`: `pnpm run generate && remix vite:dev`（命令以模板为准）
- `build`: `pnpm run generate && remix vite:build`
- `preview`: 使用模板推荐的 Cloudflare 本地预览（如 `wrangler pages dev`）
- `clean`: 删除 `build/`、`.cache/`、`public/build/`（以实际输出为准）以及 `app/routes/generated/`（若采用该目录）
- `test:docs`: `node --test scripts/**/*.test.mjs`（路径在实施中敲定）
- 删除所有 `vitepress`/`nitro`/`build:vercel`/`build:spa`/`build:node` 相关脚本

**Step 3: Commit**

```bash
git add packages/docs/package.json pnpm-lock.yaml packages/docs/tsconfig.json packages/docs/vite.config.ts
git commit -m "chore(docs): add Remix and Vite toolchain for Cloudflare"
```

---

### Task 4: 添加 Remix 应用骨架（entry、root、基础样式）

**Files:**

- Create: `packages/docs/app/entry.client.tsx`
- Create: `packages/docs/app/entry.server.tsx`
- Create: `packages/docs/app/root.tsx`
- Create: `packages/docs/app/tailwind.css`（若模板使用 Tailwind；若不用则最小 CSS）

**Step 1: 从官方 Cloudflare 模板拷贝并改 import 路径**

- `root.tsx` 中 `<Links />`、`<Meta />`、`<Outlet />`、`<Scripts />` 保持模板结构；`lang` 设为 `zh-CN`。

**Step 2: 本地试跑（可先无业务路由）**

Run: `pnpm --filter kra-ui-docs dev`  
Expected: 开发服务器启动；访问 `/` 不崩溃（可能 404 直至下 Task）

**Step 3: Commit**

```bash
git add packages/docs/app
git commit -m "feat(docs): add Remix app shell"
```

---

### Task 5: 提取导航数据为单一数据源

**Files:**

- Create: `packages/docs/app/lib/docs-nav.ts`（或 `docs-nav.json` + 类型声明）
- Reference: 从 `packages/docs/.vitepress/config.ts` 迁移（若 Task 2 已删，则从 git 历史拷贝 nav/sidebar 结构）

**Step 1: 导出 `nav` 与 `sidebar` 常量**

- 结构与原 VitePress 一致：`{ text, link }`、`{ text, items }`。

**Step 2: Commit**

```bash
git add packages/docs/app/lib/docs-nav.ts
git commit -m "feat(docs): add centralized docs navigation config"
```

---

### Task 6: 实现文档布局（顶栏 + 侧栏 + `<Outlet />`）

**Files:**

- Create: `packages/docs/app/routes/_layout.docs.tsx` 或等价 pathless layout（以 Remix 扁平路由约定为准，名称在实施时与模板对齐）
- Create: `packages/docs/app/components/DocsLayout.tsx`（可选拆分）

**Step 1: 布局渲染**

- 顶栏：渲染 `docs-nav.ts` 的 `nav`。
- 侧栏：根据当前 URL 高亮对应项。
- 正文：`<Outlet />`。

**Step 2: 手动添加临时路由 `app/routes/_index.tsx` 指向简单占位**

**Step 3: 验证**

Run: `pnpm --filter kra-ui-docs dev`  
Expected: `/` 显示布局 + 占位内容

**Step 4: Commit**

```bash
git add packages/docs/app/routes packages/docs/app/components
git commit -m "feat(docs): add docs chrome layout"
```

---

### Task 7: 编写生成脚本测试（TDD）— 路径映射

**Files:**

- Create: `packages/docs/scripts/generate-docs-routes.test.mjs`
- Create: `packages/docs/scripts/path-to-route.mjs`（被测模块，尽量单函数）

**Step 1: 写失败测试**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { markdownPathToRouteSegment } from './path-to-route.mjs';

test('guide/getting-started.md -> guide.getting-started', () => {
  assert.equal(markdownPathToRouteSegment('guide/getting-started.md'), 'guide.getting-started');
});
```

**Step 2: 运行确认失败**

Run: `cd packages/docs && node --test scripts/generate-docs-routes.test.mjs`  
Expected: FAIL（模块或函数不存在）

**Step 3: 实现最小 `markdownPathToRouteSegment`**

**Step 4: 运行确认通过**

Run: `cd packages/docs && node --test scripts/generate-docs-routes.test.mjs`  
Expected: PASS

**Step 5: Commit**

```bash
git add packages/docs/scripts/path-to-route.mjs packages/docs/scripts/generate-docs-routes.test.mjs
git commit -m "test(docs): add markdown to route segment mapping"
```

---

### Task 8: 实现 `generate-docs-routes.mjs`（扫描 + 写出 MDX 路由文件）

**Files:**

- Create: `packages/docs/scripts/generate-docs-routes.mjs`
- Create: `packages/docs/app/routes/generated/.gitkeep`（若决定提交生成目录占位；或 `.gitignore` 生成物——与设计文档选定一致，**本计划默认：生成物写入 `app/routes/generated/` 并提交**，便于 CI 不依赖生成顺序）

**Step 1: 扫描 `guide/**/\*.md`与根目录`index.md`\*\*

**Step 2: 为每个文件写出 `route.tsx` 或 `.mdx` 路由模块**

- 文件头注释：`// 本文件由 scripts/generate-docs-routes.mjs 自动生成，请勿手改`
- 内容：`export { default } from '../../../content/...'` 或内联 `import Content from ...`（具体以 MDX 插件配置为准）。

**Step 3: 将原始 `.md` 复制或移动到 `packages/docs/content/` 并保持相对路径稳定**

- 若采用「移动」：`git mv packages/docs/guide packages/docs/content/guide` 并更新扫描路径。

**Step 4: 运行生成**

Run: `pnpm --filter kra-ui-docs run generate`  
Expected: `app/routes/generated/` 下出现预期文件数

**Step 5: Commit**

```bash
git add packages/docs/scripts/generate-docs-routes.mjs packages/docs/content packages/docs/app/routes/generated
git commit -m "feat(docs): generate Remix MDX routes from Markdown sources"
```

---

### Task 9: 配置 MDX（Vite + Remix）

**Files:**

- Modify: `packages/docs/vite.config.ts`

**Step 1: 按官方文档启用 MDX 插件**

**Step 2: 验证任意生成页可渲染标题与代码块**

Run: `pnpm --filter kra-ui-docs dev`，打开 `/guide/getting-started`  
Expected: 正文渲染无报错

**Step 3: Commit**

```bash
git add packages/docs/vite.config.ts
git commit -m "feat(docs): enable MDX in Vite config"
```

---

### Task 10: 导航死链校验（生成或独立脚本）

**Files:**

- Create: `packages/docs/scripts/validate-docs-nav.mjs`
- Modify: `packages/docs/package.json`（`build` 前串行 `validate`）

**Step 1: 读取 `docs-nav.ts`**

- 简单做法：维护并行的 `docs-nav.json` 供 Node 读取；或 `node --experimental-strip-types` 读取 ts（视环境而定）。**推荐 `docs-nav.json`** 生成自 `docs-nav.ts` 或由脚本直接 import 编译产物——实施时选最简稳定方案。

**Step 2: 对每个 `link` 检查是否存在对应路由文件**

**Step 3: 测试**

- 故意错误 link → 脚本 exit 1。

**Step 4: Commit**

```bash
git add packages/docs/scripts/validate-docs-nav.mjs packages/docs/package.json
git commit -m "feat(docs): validate sidebar links against generated routes"
```

---

### Task 11: 404 与 ErrorBoundary

**Files:**

- Create: `packages/docs/app/routes/$.tsx` 或模板推荐的 splat 404
- Modify: `packages/docs/app/root.tsx` 增加 `ErrorBoundary`

**Step 1: 访问不存在路径应 404**

**Step 2: Commit**

```bash
git add packages/docs/app/routes/$.tsx packages/docs/app/root.tsx
git commit -m "feat(docs): add 404 route and root error boundary"
```

---

### Task 12: Cloudflare Pages 配置落地

**Files:**

- Create: `packages/docs/wrangler.toml` 或 `wrangler.jsonc`（以模板为准）
- Modify: 仓库根或 `packages/docs` README 说明 Pages 构建命令

**Step 1: 按模板填写 `name`、`compatibility_date`、pages 构建输出目录**

**Step 2: 本地预览**

Run: `pnpm --filter kra-ui-docs preview`  
Expected: 本地可访问主要页面

**Step 3: Commit**

```bash
git add packages/docs/wrangler.toml
git commit -m "chore(docs): add Wrangler config for Cloudflare Pages"
```

---

### Task 13: 更新根 `package.json` 与 CI（若有 docs 构建）

**Files:**

- Modify: `package.json`（确认 `dev:docs` / `build:docs` 仍指向 `kra-ui-docs`）
- Modify: `.github/workflows/*.yml`（若存在部署 docs 的 job，更新 build 命令与 artifact 路径）

**Step 1: 搜索 workflows**

Run: `rg "kra-ui-docs|vitepress|nitro" .github`

**Step 2: 更新为 Remix build 输出路径**

**Step 3: Commit**

```bash
git add package.json .github/workflows
git commit -m "ci: update docs build for Remix on Cloudflare"
```

---

### Task 14: 根 `ci` 可选纳入 `docs` typecheck/build

**Files:**

- Modify: `package.json` 中 `ci` 脚本

**Step 1: 决策**

- 若 docs 包有 `typecheck`：在 `ci` 末尾追加 `pnpm --filter kra-ui-docs build` 或 `typecheck`（YAGNI：若仅静态站且构建足够，可只跑 `build`）。

**Step 2: 验证**

Run: `pnpm ci`  
Expected: PASS

**Step 3: Commit**

```bash
git add package.json
git commit -m "ci: include docs package in quality gate"
```

---

### Task 15: 文档与收尾

**Files:**

- Modify: `README.md` 或 `packages/docs/README.md`（若不存在则创建简短说明）

**Step 1: 说明**

- 如何 `pnpm dev:docs`
- 如何 `pnpm build:docs`
- 修改文档应编辑 `content/` 下 md 并运行 `generate`（若 predev 已挂钩可简写）

**Step 2: Commit**

```bash
git add README.md packages/docs/README.md
git commit -m "docs: document Remix docs development workflow"
```

---

## 执行交接

**Plan complete and saved to `docs/plans/2026-03-20-docs-remix-migration-implementation-plan.md`. Two execution options:**

**1. Subagent-Driven（本会话）** — 每个 Task 派生子代理，任务间人工 review，迭代快

**2. Parallel Session（新会话）** — 新开会话使用 **executing-plans**，批量执行并设检查点

**你选哪一种？**
