# Flex 组件

弹性布局组件，基于 Box 封装，默认 `flexDirection="row"`。用于快速构建水平或垂直弹性布局。

## 引入

```tsx
import { Flex } from 'kra-ui';
```

## 基本用法

```tsx
<Flex direction="row" align="center" justify="space-between">
  <Text>左侧</Text>
  <Text>右侧</Text>
</Flex>
```

## Props

| 属性        | 类型                                                     | 默认值  | 说明              |
| ----------- | -------------------------------------------------------- | ------- | ----------------- |
| direction   | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | `'row'` | 主轴方向          |
| align       | `AlignItems`                                             | -       | 交叉轴对齐方式    |
| justify     | `JustifyContent`                                         | -       | 主轴对齐方式      |
| wrap        | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                   | -       | 是否换行          |
| ...BoxProps | -                                                        | -       | 继承所有 Box 属性 |
