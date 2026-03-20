# Kra-UI 文档站

基于 **React Router 7**（原 Remix 合并栈）+ **Vite** + **Cloudflare Workers**，SSR 部署到 Cloudflare Pages。

## 本地开发

```bash
# 在仓库根目录
pnpm dev:docs
```

开发前会自动执行 `generate`，根据 `content/` 下 Markdown 生成 `app/routes` 下的路由模块。

## 构建

```bash
pnpm build:docs
```

会依次：生成路由 → 校验侧栏链接 → `react-router build`。产物在 `build/client` 与 `build/server`。

## 类型与检查

```bash
pnpm --filter kra-ui-docs typecheck   # wrangler types + react-router typegen + tsc
pnpm --filter kra-ui-docs test:scripts # 路由映射单元测试
```

`worker-configuration.d.ts` 由 `wrangler types` 生成且已加入 `.gitignore`，克隆后首次执行 `typecheck` 或 `typegen` 即可生成。

修改 `wrangler.toml` 后请重新执行 `pnpm --filter kra-ui-docs run typegen`。

## 预览（生产构建）

```bash
pnpm --filter kra-ui-docs preview
```

使用 `build/server/wrangler.json` 启动 Wrangler 开发服务器（需先 build）。

## 内容目录

- 文档源文件：`content/**/*.md`（首页为 `content/index.md`）
- 导航配置：`app/lib/docs-nav.json`（与 `app/lib/docs-nav.ts` 类型导出配合使用）

## Cloudflare Pages

构建命令（仓库根）：`pnpm install --frozen-lockfile && pnpm --filter kra-ui-docs build`  
Node 版本：**20+**

具体输出目录与 Worker 入口以 `build/server/wrangler.json` 为准（由框架生成）。
