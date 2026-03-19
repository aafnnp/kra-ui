# Engineering Quality Minimal Loop Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 Kra-UI 仓库补齐“工程质量最小闭环”门禁（Prettier check、清晰的 lint/typecheck/test/build 门禁、本地一键复现 CI）。

**Architecture:** 以最小侵入方式调整根脚本与 CI：新增 `format:check`/`typecheck`/`ci` 等聚合脚本，并在 `.github/workflows/ci.yml` 增加 Prettier 检查与更清晰的 step 拆分；不引入额外工具链（husky/commitlint 等）。

**Tech Stack:** pnpm workspace、TypeScript、ESLint、Prettier、GitHub Actions、Jest（React Native preset）

---

### Task 1: 增加 Prettier “只检查”门禁脚本

**Files:**

- Modify: `package.json`

**Step 1: 写一个会失败的检查（模拟）**

- 手动在任意 md/ts 文件制造一个明显不符合 Prettier 的格式（例如多余空格），用于验证 `format:check` 会失败。
- 注意：后续会撤销该改动，不要提交。

**Step 2: 添加 `format:check` 脚本**

- 在根 `package.json` 增加脚本：
  - `format:check`: `prettier "**/*.{js,jsx,ts,tsx,json,md,mdx,yml,yaml}" --check`

**Step 3: 本地运行以确认能失败/能通过**

Run: `pnpm format:check`  
Expected:

- 在故意制造的格式问题存在时：FAIL，并指出具体文件
- 修复后（执行 `pnpm format`）：PASS

**Step 4: Commit**

```bash
git add package.json
git commit -m "chore: add prettier format check script"
```

---

### Task 2: 增加根级 `typecheck` 与 `ci` 聚合脚本（本地一键复现 CI）

**Files:**

- Modify: `package.json`

**Step 1: 明确 typecheck 覆盖范围**

- 目标最小覆盖：
  - `packages/ui`: `pnpm --filter kra-ui lint`（其 lint 为 `tsc --noEmit`）
  - `packages/example`: `tsc --noEmit`（目前 CI 已有兜底）

**Step 2: 新增脚本**

- 在根 `package.json` 增加：
  - `typecheck`: 串行执行 ui 与 example 的 typecheck（推荐用 pnpm filter 组合）
  - `test`: 聚合 UI 测试（可直接复用现有 CI 命令）
  - `ci`: 串行执行 `format:check`、`lint:eslint`、`typecheck`、`test`、`build`

**Step 3: 本地验证**

Run: `pnpm typecheck`  
Expected: PASS

Run: `pnpm ci`  
Expected: PASS（若有失败，按输出定位到对应门禁项）

**Step 4: Commit**

```bash
git add package.json
git commit -m "chore: add root typecheck and ci scripts"
```

---

### Task 3: 让 example 的 typecheck 入口更明确（可选但推荐）

**Files:**

- Modify: `packages/example/package.json`

**Step 1: 添加 `typecheck`（或 `lint`）脚本**

- 在 `packages/example/package.json` 增加：
  - `typecheck`: `tsc --noEmit`

**Step 2: 本地验证**

Run: `pnpm --filter kra-ui-example typecheck`  
Expected: PASS

**Step 3: Commit**

```bash
git add packages/example/package.json
git commit -m "chore(example): add typecheck script"
```

---

### Task 4: CI 增加 Format check，并拆分门禁 steps（更清晰的失败定位）

**Files:**

- Modify: `.github/workflows/ci.yml`

**Step 1: 新增 Format step**

- 在依赖安装后、其他检查前增加：
  - `pnpm format:check`

**Step 2: 让 CI 与根 `ci` 脚本对齐**

- 选择其一（推荐 A）：
  - A：CI 直接跑 `pnpm ci`（最一致、最少维护点）
  - B：CI 继续拆 step，但每步对应根脚本（例如 `pnpm lint:eslint` / `pnpm typecheck` / `pnpm test` / `pnpm build`）

**Step 3: 本地用 act/或推送分支验证（若可）**

Run: `pnpm ci`  
Expected: PASS

**Step 4: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add prettier check and align quality gates"
```

---

### Task 5:（可选）Docs 的最小门禁：确保 docs 能 build

**Files:**

- Modify: `.github/workflows/ci.yml`

**Step 1: 增加 docs build step（条件触发）**

- 当 `packages/docs/**` 或 docs 配置文件变更时，执行：
  - `pnpm --filter kra-ui-docs build`

**Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci(docs): add docs build gate"
```

---

### Task 6: 回归验证与收尾

**Files:**

- Verify: `package.json`
- Verify: `.github/workflows/ci.yml`
- Verify: `packages/example/package.json`

**Step 1: 全量本地验证**

Run: `pnpm ci`  
Expected: PASS

**Step 2: 验证 CI 触发路径过滤是否符合预期**

- 修改 `packages/docs/**` 是否会触发 docs build gate（如果启用了 Task 5）
- 修改 `packages/ui/**` 是否会触发完整门禁

**Step 3: 最终 Commit（如需合并/整理）**

> 若前面已按任务分多次 commit，这里无需再提交；仅在需要调整文案或小修复时使用。
