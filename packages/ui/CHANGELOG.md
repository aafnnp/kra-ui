# kra-ui

## 1.0.0

### Major Changes

- [#27](https://github.com/aafnnp/kra-ui/pull/27) [`c355905`](https://github.com/aafnnp/kra-ui/commit/c3559059ed73221bb0a3aecb5ae591d14db45fc2) Thanks [@aafnnp](https://github.com/aafnnp)! - ## 破坏性变更
  - `Button` 移除 `loading`，统一使用 `isLoading`。

  ## 改进
  - 新增 `components/_shared`：统一交互态归一化与 a11y Pressable 封装。
  - `Modal` 补齐遮罩点击关闭行为测试与验证。
  - `Popup`/`PageContainer` 遮罩与间距从硬编码迁移到主题 token（`theme.colors.overlay` / `theme.spacing`）。

## 0.8.2

### Patch Changes

- [#24](https://github.com/aafnnp/kra-ui/pull/24) [`0904400`](https://github.com/aafnnp/kra-ui/commit/0904400fb7159aae4cb39566f69aafdb7054d366) Thanks [@aafnnp](https://github.com/aafnnp)! - - 完善 `Avatar`：支持图片加载失败回退、`status` 状态角标、交互与无障碍属性（a11y）。
  - 新增 `AvatarGroup`：支持叠放展示与超出 `max` 时的 `+N` 指示。
  - 主题新增 `avatarSizes/avatarVariants/avatarStatusColors` 令牌，统一尺寸与状态色映射。

## 0.8.1

### Patch Changes

- [#22](https://github.com/aafnnp/kra-ui/pull/22) [`425978c`](https://github.com/aafnnp/kra-ui/commit/425978c6096db386f7686720f19fc027c71a23ec) Thanks [@aafnnp](https://github.com/aafnnp)! - Alert 组件增强：新增 Compound Slots 用法（Alert.Icon / Alert.Title / Alert.Description / Alert.Action / Alert.Close），同时保留原先“非 children”快速用法。

## 0.8.0

### Minor Changes

- [#19](https://github.com/aafnnp/kra-ui/pull/19) [`15f6564`](https://github.com/aafnnp/kra-ui/commit/15f6564e71be4273e21a3ecfc07975bbb5757a49) Thanks [@aafnnp](https://github.com/aafnnp)! - 新增 Toast 队列能力与全局调用 API（`toast.*` / `useToast`），并完善相关测试与工程化配置。

  增强 Accordion：
  - 新增受控展开：`index` / `onIndexChange`
  - 支持自定义标题：`Accordion.Item renderHeader`
  - 支持内容挂载策略：`lazyMount` / `unmountOnCollapse`
  - 支持动画配置：`isAnimated` / `animationDuration` / `animationEasing`
  - 新增主题 variants（light/dark）：`accordionVariants` / `accordionItemVariants` / `accordionHeaderVariants`

## 0.7.1

### Patch Changes

- [#17](https://github.com/aafnnp/kra-ui/pull/17) [`18340bc`](https://github.com/aafnnp/kra-ui/commit/18340bc0bde1857d0863b7478c00a106483ffd38) Thanks [@aafnnp](https://github.com/aafnnp)! - 1. add test,2. perf release flow

## 0.7.0

### Minor Changes

- [`45fdc05`](https://github.com/aafnnp/kra-ui/commit/45fdc0591d43ed6f4d82f11387b88b06ad30cc25) Thanks [@aafnnp](https://github.com/aafnnp)! - add Icon component

## 0.6.0

### Minor Changes

- [#12](https://github.com/aafnnp/kra-ui/pull/12) [`c0164fb`](https://github.com/aafnnp/kra-ui/commit/c0164fbd19ba017d20aa51714755ddc189bd07ef) Thanks [@aafnnp](https://github.com/aafnnp)! - add steps component

## 0.5.0

### Minor Changes

- [#10](https://github.com/aafnnp/kra-ui/pull/10) [`4992a55`](https://github.com/aafnnp/kra-ui/commit/4992a553b14eb285e0dcf643b649a5b496f37558) Thanks [@aafnnp](https://github.com/aafnnp)! - 新增 Pagecontainer

## 0.4.0

### Minor Changes

- 4c3b983: react-native-reanimated 替换 Animated

## 0.3.1

### Patch Changes

- 15b6413: fix issue

## 0.3.0

### Minor Changes

- b95ba1c: add components(Popup,Toast,Tabs,Dropdown)

## 0.2.0

### Minor Changes

- 7259d60: 新增 Modal 模态弹窗组件，支持多种尺寸（sm/md/lg/full）、动画类型、遮罩点击关闭，包含 Modal.Header、Modal.Body、Modal.Footer 子组件
