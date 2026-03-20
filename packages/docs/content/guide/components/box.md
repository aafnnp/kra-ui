# Box 组件

基础布局容器，使用 `createBox` 封装。支持所有 Restyle 布局属性，包括 backgroundColor、spacing、border、shadow、position 等。

## 引入

```tsx
import { Box } from 'kra-ui';
```

## 基本用法

```tsx
<Box padding="m" backgroundColor="primaryLight" borderRadius="m">
  <Text>内容区域</Text>
</Box>
```

## Props

| 属性          | 类型 | 说明                                                                                                                     |
| ------------- | ---- | ------------------------------------------------------------------------------------------------------------------------ |
| 所有 BoxProps | -    | 继承 Restyle 的 BoxProps，包括 `backgroundColor`、`padding`、`margin`、`border`、`shadow`、`position`、`flex` 等布局属性 |
