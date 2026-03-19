# 工程质量最小闭环（v1）设计稿

日期：2026-03-19  
范围：Kra-UI monorepo（`packages/ui`、`packages/example`、`packages/docs`）  
目标：以最小改动建立清晰、可复现的质量门禁闭环

## 背景

当前仓库已具备基础的 CI 与发布流程：

- CI：安装依赖后执行 lint、UI 测试、build，并对 example 做类型检查兜底。
- Release：使用 Changesets 自动创建版本 PR 或发布到 npm。

但“质量门禁”的关键能力仍可进一步收敛与明确：

- 门禁项的职责需要更清晰（格式 / eslint / 类型 / 测试 / 构建分别可定位）。
- 本地复现 CI 的成本需要降低（用单条命令复现 CI 的门禁集合）。
- 失败反馈需要更直接（哪个门禁失败、如何修复，一眼可见）。

## 目标与非目标

### 目标

- 将质量检查能力拆为可组合的脚本，并在 CI 上强制执行。
- 引入 **Prettier 只检查不修复** 的门禁（`prettier --check`），尽早失败节省 CI 时间。
- CI 的每个步骤职责单一、失败定位明确。
- 提供本地可一键复现 CI 的聚合命令，保证本地与 CI 一致。

### 非目标

- 本轮不引入 husky/lefthook、commitlint、danger 等更侵入的流程工具。
- 本轮不修改组件实现与组件对外 API，不改变打包产物与发布策略。

## 方案概述（推荐）

采用“最小闭环 + 明确质量门槛”的方案：

- 根级新增/补齐脚本：
  - `format:check`：Prettier 只检查
  - `typecheck`：聚合 typecheck（至少覆盖 `packages/ui`、`packages/example`）
  - `test`：聚合测试（维持现有 UI jest 体系）
  - `ci`：串行执行本轮所有门禁项，本地一键复现 CI
- CI 侧将 `pnpm lint` 拆为更明确的步骤（或保持脚本不变但在 CI 里显式拆 step），提升可读性与定位效率。

## 脚本与门禁设计

### 门禁项定义

- **Format**：`prettier --check`（只检查，不写入）
- **ESLint**：eslint 规则检查（与现有 `.eslintrc.cjs` 一致）
- **TypeCheck**：`tsc --noEmit`（至少覆盖 `packages/ui` 与 `packages/example`）
- **Test**：UI 组件测试（jest）
- **Build**：仓库 build（沿用现有 `pnpm build` 聚合）

### 根级脚本建议（意图）

- `format`：保持现有写入修复能力（便于开发者一键修复）
- `format:check`：CI 强制门禁（不通过则失败）
- `ci`：将上述门禁项串联，便于本地复现（同时作为 CI 的执行入口之一）

> 说明：脚本命名以清晰为先，避免“一个 lint 覆盖过多语义”导致定位困难。

## CI 设计

在 `.github/workflows/ci.yml` 的结构上做最小调整：

- 在最前面新增 **Format check** step，尽早失败。
- 将门禁项拆为职责单一的 steps（Format / ESLint / TypeCheck / Test / Build / Example typecheck）。
- 触发策略维持现有路径过滤（只在相关文件变更时触发）。

## 失败反馈与一致性

- **失败反馈**：通过拆分 steps，使失败点直接对应到门禁项。
- **一致性**：根级提供 `pnpm ci`（或等价命令）以复现 CI 门禁集合。
- **修复路径**：当 Format 失败时，开发者可执行 `pnpm format` 修复；当 ESLint 失败时按提示修复；类型与测试同理。

## 验收标准（Definition of Done）

- PR/Push 上 CI 新增的 **Format（prettier --check）** 门禁生效，格式不符合会失败。
- CI 日志能清楚显示失败发生于哪个门禁项。
- 本地可用单条命令复现 CI 的门禁集合（与 CI 一致）。
- release 工作流保持可用，不改变发布产物与行为。
