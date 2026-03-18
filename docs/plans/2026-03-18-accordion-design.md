# Accordion（受控 / Header 可定制 / 内容策略 / 动画可配置 / 主题化）设计

## 背景与目标

现有 `Accordion` 已支持：

- `type="single" | "multiple"`（单开/多开）
- `defaultIndex`（非受控默认展开）
- `variant="outline" | "filled" | "separated"`（基础样式）
- `Accordion.Item`（`title` + 禁用 + reanimated 动画）

本次目标是在 **保持现有用法不破坏** 的前提下，补齐：

- **受控能力**：外部状态可控展开项，支持 `onIndexChange`
- **Header 可自定义**：支持业务渲染标题区域（包含右侧图标/副标题/自定义布局）
- **内容策略**：支持折叠卸载与首次展开再挂载（性能与状态保留可按需选）
- **动画可配置**：可关闭动画、配置时长与缓动
- **主题化**：减少组件内硬编码分支，把视觉差异下沉到 theme variants

非目标：

- 不引入 `value: string` 标识（本轮选择“索引受控”，最小改动）
- 不新增复杂交互（如嵌套手风琴、手势拖拽等）

## 总体方案（索引受控，最小改动）

采用 **方案 A：索引受控**：

- `Accordion` 新增 `index`/`onIndexChange`，与 `defaultIndex` 并存
- `Accordion.Item` 新增 `renderHeader`，保留默认 Header（标题 + 箭头）
- 新增内容挂载策略：`lazyMount`、`unmountOnCollapse`
- 新增动画配置：`isAnimated`、`animationDuration`、`animationEasing`
- `variant` 相关样式逐步迁移到主题 `accordion*Variants`，组件内优先使用 Restyle token

取舍：

- 优点：改动范围小、迁移成本低、与当前 index 体系兼容
- 风险：业务侧若动态插入/排序 item，索引可能变化（受控状态需同步）

## API 设计

### Accordion

保留：

- `type?: 'single' | 'multiple'`
- `defaultIndex?: number[]`
- `variant?: 'outline' | 'filled' | 'separated'`
- `...BoxProps`

新增（受控）：

- `index?: number[]`
  - 作为展开项索引集合（`type="single"` 时约定长度为 0 或 1）
- `onIndexChange?: (next: number[]) => void`

新增（内容策略）：

- `unmountOnCollapse?: boolean`
  - 默认 `false`，保持折叠时内容仍在树中（与现有行为一致）
- `lazyMount?: boolean`
  - 默认 `false`，首次展开时才挂载内容

新增（动画）：

- `isAnimated?: boolean`（默认 `true`）
- `animationDuration?: number`（默认 `250`）
- `animationEasing?: (t: number) => number`
  - 传入时替换默认 easing（保持 API 简单，满足大多数定制需求）

> 兼容策略：若传入 `index`，组件进入受控模式；否则使用内部 state（由 `defaultIndex` 初始化）。

### Accordion.Item

保留：

- `title: string`
- `isDisabled?: boolean`
- `...BoxProps`

新增（Header 可定制）：

- `renderHeader?: (params) => React.ReactNode`
  - `params` 包含：
    - `title: string`
    - `isExpanded: boolean`
    - `isDisabled: boolean`
    - `index: number`
    - `toggle: () => void`

当不提供 `renderHeader` 时，使用默认 Header（标题 + 右侧箭头旋转）。

## 状态与数据流

### 受控/非受控

- 受控：`expandedIndices` 来源于 `props.index`
  - `toggle` 计算 `next` 后只触发 `onIndexChange?.(next)`，不维护内部 state
- 非受控：内部 `useState(new Set(defaultIndex))`
  - `toggle` 更新内部 state，同时（可选）也触发 `onIndexChange`（便于监听）

### toggle 规则

- `type="single"`：
  - 若点击已展开项：收起（`next=[]`）
  - 若点击未展开项：清空其他，仅展开当前（`next=[index]`）
- `type="multiple"`：
  - 点击展开项：收起（从集合删除）
  - 点击未展开项：展开（加入集合）

## 内容挂载策略

### lazyMount

- 维护 `mountedIndices: Set<number>`
- 首次展开某 index 时加入集合
- 内容渲染条件：
  - `lazyMount=false`：始终渲染内容（与当前一致）
  - `lazyMount=true`：仅当 `mountedIndices.has(index)` 时渲染内容

### unmountOnCollapse

- 折叠时直接不渲染内容节点
- 与 `lazyMount` 组合时：
  - `unmountOnCollapse=true`：折叠即卸载；展开再挂载（若 `lazyMount` 也为 true，则首次展开前仍不挂载）

默认值选择：

- `lazyMount=false`
- `unmountOnCollapse=false`

以确保默认行为与现有一致，避免破坏性变更。

## 动画设计

保持现有动画思路（内容测量高度 + height/opacity 动画 + 箭头旋转），并参数化：

- 默认 timing：
  - `animationDuration=250`
  - easing 为 material 风格曲线（当前使用的 bezier）
- `isAnimated=false`：
  - 直接渲染最终状态（展开显示内容，折叠隐藏/卸载），避免测量与 timing 带来的开销

注意：

- 内容高度测量依赖 `onLayout`，当内容动态变化时可能需要重新测量；本轮优先保持与现有一致的实现路径，避免引入更复杂的测量机制。

## 主题化策略（variants 下沉）

在 `theme.ts` 与 `darkTheme.ts` 增加（或扩展）：

- `accordionVariants`：容器层（outline/filled/separated）
- `accordionItemVariants`：item 外框/分隔逻辑
- `accordionHeaderVariants`：header 背景/边框/内边距等

组件侧：

- 优先使用 Restyle token/variant，而非 `useTheme` + 内联硬编码
- 仅在确需动态色值时使用 `useTheme<Theme>()`

主题化范围（本轮建议“轻量”）：

- 下沉 `filled` 的 header 背景
- 下沉 `outline` 的容器边框与圆角
- 下沉 `separated` 的间距与 item 边框/圆角

后续如需要再扩展到文字色、禁用态等。

## 无障碍与可用性

保持并完善：

- `accessibilityRole="button"`
- `accessibilityState={{ expanded, disabled }}`
- 默认 Header 与自定义 Header 都应保证可触达/可读（自定义 Header 由业务负责时，仍提供 `toggle` 与状态参数）

## 示例用法（草案）

受控（single）：

```tsx
const [index, setIndex] = useState<number[]>([0])

<Accordion type="single" index={index} onIndexChange={setIndex}>
  <Accordion.Item title="A">...</Accordion.Item>
  <Accordion.Item title="B">...</Accordion.Item>
</Accordion>
```

自定义 Header：

```tsx
<Accordion>
  <Accordion.Item
    title="标题"
    renderHeader={({ title, isExpanded, toggle }) => (
      <Pressable onPress={toggle} accessibilityRole="button" accessibilityState={{ expanded: isExpanded }}>
        <HStack justifyContent="space-between" alignItems="center" padding="m">
          <Text fontWeight="600">{title}</Text>
          <Text color="textSecondary">{isExpanded ? '收起' : '展开'}</Text>
        </HStack>
      </Pressable>
    )}
  >
    <Text>内容</Text>
  </Accordion.Item>
</Accordion>
```

内容策略：

```tsx
<Accordion lazyMount unmountOnCollapse>
  <Accordion.Item title="性能友好">
    <HeavyComponent />
  </Accordion.Item>
</Accordion>
```

## 验收标准

- 现有文档与示例用法不需要修改即可继续工作
- 新增受控 API 后，可在示例中稳定控制展开/收起
- `renderHeader` 可完全替换默认 Header，并仍可正确 toggle
- `lazyMount` / `unmountOnCollapse` 行为符合预期且默认不改变现状
- 动画参数可生效；关闭动画时无测量/无 timing
- `variant` 样式在主题中可集中维护（至少覆盖轻量范围）

