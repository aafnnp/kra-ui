---
title: Kra-UI 组件重设计（v1）设计稿
date: 2026-03-19
scope: packages/ui/src/components
status: approved
---

## 背景

`packages/ui` 当前组件库已具备较完整的组件集合，并基于 `@shopify/restyle` 与主题系统实现基础 token/variant 能力。但在演进过程中逐渐出现以下问题：

- **一致性不足**：Props 命名（disabled/loading 等）、`variant/size` 语义、复合组件组织方式在不同组件间存在差异。
- **令牌使用不彻底**：部分组件在实现中仍存在硬编码的颜色/间距/圆角/遮罩等样式，导致暗黑模式与整体视觉一致性难以保证。
- **可访问性不统一**：交互组件的 `accessibilityRole/accessibilityState/accessibilityLabel` 覆盖不完整且不一致。
- **交互体验与性能**：disabled/loading/pressed 等状态处理与反馈不一致，且部分组件存在不必要的计算与重渲染风险。
- **测试与文档缺口**：覆盖不均衡，迁移与最佳实践缺少统一说明。

本设计稿目标是在 **允许小破坏并提供兼容层/弃用策略** 的前提下，用最小可控的改动半径完成一次“工程化一致化”的组件重设计。

## 目标与非目标

### 目标

- **API 一致性**：统一 Props 命名规范、`variant/size` 语义、复合组件的组合模式。
- **设计令牌统一**：彻底避免硬编码颜色/间距/圆角/阴影，全部通过主题 token 与 restyle `variant` 驱动（必要的 RN 样式仅用于布局计算/平台差异）。
- **可访问性**：交互组件统一提供 `accessibilityRole/state/label`，默认可用且可覆盖。
- **交互一致性**：disabled/loading/pressed/focus（按平台能力）等状态反馈统一。
- **深色模式质量**：所有组件在 `darkTheme` 下可读性与对比度稳定。
- **性能与可维护性**：减少重复逻辑，降低分支复杂度与耦合，必要处用 `useCallback/useMemo`。
- **测试与文档**：补齐最小有效测试集合与迁移/最佳实践文档。

### 非目标

- 本轮不追求一次性完成“彻底推翻重写”的大版本 API（保留兼容层，循序渐进）。
- 本轮不引入新的流程工具链（如强制 pre-commit 等）作为组件重设计的一部分。
- 本轮不改变 monorepo 的包结构与发布策略。

## 方案对比

### 方案 A：渐进式一致化（推荐起步）

- **范围**：保持现有对外导出与目录结构基本不变；新增内部共享模块以统一规范。
- **收益**：风险低、可持续交付、对现有使用方影响可控。
- **代价**：历史结构问题短期内会保留，需要后续迭代进一步分层重构。

### 方案 B：分层重构（中等改动半径）

- **范围**：在 A 的基础上进一步引入内部“Primitives/Patterns/Composites”分层组织；对外仍维持原导出。
- **收益**：长期维护成本更低、复用更强、增量开发更快。
- **代价**：改动面更大，需要更严格的迁移与测试。

### 方案 C：大版本重设计（最大改动半径）

- **范围**：以新 API 规范为准统一重写，旧 API 通过适配层/独立包过渡。
- **收益**：一致性最佳、结构最干净。
- **代价**：迁移成本最高、最易在边界行为上卡住。

**结论**：先落地方案 A，稳定后按收益优先推进到方案 B 的局部重构（优先 Input/Button/Modal/Toast/Tabs 等高频组件）。

## 总体架构与规范基线（方案 A）

### 目录策略

- 对外路径保持：`packages/ui/src/components/*` 与 `packages/ui/src/index.ts` 的导出结构尽量不变。
- 新增内部共享目录：`packages/ui/src/components/_shared/*`（**不对外导出**），用于：
  - 交互态与 Pressable 封装
  - a11y 辅助方法
  - `size/variant` 的归一化与映射
  - 通用样式/状态计算（全部基于 theme token）

### 主题与设计令牌

- 所有视觉常量必须来自 `theme.ts/darkTheme.ts`：
  - colors/spacing/borderRadii/breakpoints
  - 各组件的 `xxxVariants/xxxSizes/xxxStates`（按组件需要）
- 组件中禁止硬编码：
  - 颜色（含 overlay）
  - 间距/圆角/阴影
  - 交互态的 opacity/scale 等（若需要，也应 token 化）
- 允许在 RN `StyleSheet` 中保留 **布局计算/平台差异** 类样式，但颜色/间距仍必须由 token 提供。

### Props 统一规范

- **状态类**：`isDisabled`、`isLoading`、`isInvalid`、`isReadOnly`（按组件需要）。
- **事件类**：`onPress`、`onChange`、`onOpen`、`onClose`。
- **规格类**：`size` 统一 `sm/md/lg` 为主（必要时扩展 `xs/xl`，需在组件规范中说明）。
- **变体类**：`variant` 与 themeKey 对应（如 `buttonVariants`、`inputVariants`）。
- **兼容策略**：允许旧 props 存在，但在内部映射到新 props，并提供弃用策略（见下文）。

### 可访问性基线

- 所有可交互组件必须设置：
  - `accessibilityRole`
  - `accessibilityState`（如 disabled/busy/expanded/selected/invalid）
  - 默认可用的 `accessibilityLabel`（可由用户覆盖）

### 测试与文档基线

- 交互组件与复合组件必须具备最小有效测试集合：
  - 默认渲染 + 关键状态
  - 关键交互回调
  - a11y role/state 断言
- docs/example 提供：
  - 最佳实践用法
  - 迁移提示与弃用说明

## 组件级规范模板

### Button（交互基准件）

- **Props**
  - 统一：`isLoading`（兼容旧 `loading`）、`isDisabled`
  - a11y：`accessibilityRole="button"`，`accessibilityState={{disabled, busy: isLoading}}`
  - 默认 `accessibilityLabel`：优先 `label`
- **令牌化**
  - 将硬编码 `sizeMap` 迁移为 `theme.buttonSizes`
  - 文字色/加载色与 variant 对齐：通过 theme 定义或共享计算，避免分支散落在组件内
- **交互一致性**
  - pressed/disabled/loading 统一由 `_shared/pressable` 处理（视觉反馈与禁用策略一致）
  - loading 时布局稳定（spinner 占位与间距 token 化）

### 输入类（Input/Textarea/NumberInput/PasswordInput/PinInput）

- **统一目标**：共享同一套状态与装饰能力（label/helper/error + invalid/disabled/readOnly）。
- **统一 Props（按需子集）**
  - `isDisabled/isReadOnly/isInvalid`
  - `label/helperText/errorText`
  - 装饰：`startIcon/endIcon`（优先覆盖常见场景）
  - a11y：默认用 `label` 作为 `accessibilityLabel`，并同步 invalid/disabled state
- **令牌化**
  - `theme.inputSizes`：height/padding/fontSize/radius
  - `theme.inputStates`：default/focus/invalid/disabled 的边框/背景/文字/icon 色
- **错误处理**
  - 只由 `isInvalid + errorText` 驱动呈现，不在组件内部做业务校验。

### 弹层/浮层（Modal/Popup/Dropdown）

- **统一目标**：遮罩、关闭行为、尺寸语义、层级管理与 a11y 一致。
- **Modal**
  - overlay 使用 `theme.colors.overlay`（禁止 `rgba(...)` 硬编码）
  - `closeOnOverlay` 保留；补齐 back 行为约束（`onRequestClose` 对齐）
  - `modalSizes/modalVariants` 控制宽度/圆角/最大高度等，减少内部分支
  - 组合模式保持 `Modal.Header/Body/Footer`，但间距/分割线 token 化
- **Popup/Dropdown**
  - 统一 placement/offset/boundary 语义
  - 触发器 a11y：`accessibilityState={{expanded: true}}` 与 `role="button"` 对齐

### Toast（全局反馈）

- **目标**：保持 `toast()`/`useToast()` 对外使用方式稳定，内部样式/状态 token 化。
- **规范**
  - `status`：`success|warning|error|info` → `theme.toastVariants`
  - `placement`：收敛为清晰枚举，并在 docs 中说明
  - a11y：toast 内容具备可读文本与合适的 role（平台允许情况下）
- **测试**
  - show/hide、自动消失计时、队列/并发基础行为

## 数据流与错误处理（统一原则）

- **原则**：组件只负责展示与交互，所有错误信息与校验结果由 props 驱动。
- **状态归一化**：disabled/loading/invalid 等状态在 `_shared` 中做统一计算，各组件消费归一化结果以降低圈复杂度与重复分支。

## 测试策略（最小但有效）

### 优先级

- 交互组件：Button/Input/Switch/Checkbox/Radio/Dropdown/Tabs
- 复合组件：Modal/Toast/Accordion

### 每组件最小集合

- 默认渲染 + 关键 `variant/size`
- 关键交互回调（onPress/onChange/onClose 等）
- a11y：role + state
- 关键状态：disabled/loading/invalid

## 兼容层与弃用策略（小破坏可控）

- **原则**：对外优先保持可用；引入新规范 props 时：
  - 新 props 为主（如 `isLoading`）
  - 旧 props 继续可用但标记弃用（文档与类型层面提示）
  - 内部统一映射到新 props，避免双逻辑分岔
- **类型策略**：
  - Props 类型中保留旧字段并标记 `/** @deprecated ... */`
  - 在实现中做一次归一化，后续逻辑只读新字段
- **迁移文档**：docs 增加“从旧 props 迁移到新 props”的对照表与示例。

## 交付顺序（建议）

- **第 0 批（基建）**：`components/_shared` + theme 补齐必要 token（overlay、buttonSizes、inputStates 等）+ lint/test 基线约束。
- **第 1 批（高频交互）**：Button/Input/Textarea/Switch/Checkbox/Radio（先把交互与 a11y 立住）。
- **第 2 批（弹层/复合）**：Modal/Toast/Tabs/Dropdown/Accordion。
- **第 3 批（展示与布局）**：Card/Badge/Avatar/Steps/Rating 等，补齐 token 与文档。

## 验收标准（Definition of Done）

- 组件实现中不再出现硬编码颜色/间距/圆角/遮罩（除布局计算/平台差异外）。
- 交互组件的 a11y role/state 覆盖达到规范基线。
- `darkTheme` 下关键组件（Button/Input/Modal/Toast）对比度与可读性可用。
- 高优先级组件具备最小有效测试集合。
- docs/example 提供最佳实践与迁移说明。
