# Grid 组件

网格布局组件，基于 flexWrap 实现多列网格，适用于卡片列表、图片墙等场景。

## 引入

```tsx
import { Grid } from 'kra-ui';
```

## 基本用法

```tsx
// 两列网格
<Grid columns={2} spacing="s">
  <Card><Text>卡片 1</Text></Card>
  <Card><Text>卡片 2</Text></Card>
  <Card><Text>卡片 3</Text></Card>
  <Card><Text>卡片 4</Text></Card>
</Grid>

// 三列网格
<Grid columns={3} spacing="m">
  <Box backgroundColor="primaryLight" padding="m" borderRadius="s">
    <Text>A</Text>
  </Box>
  <Box backgroundColor="primaryLight" padding="m" borderRadius="s">
    <Text>B</Text>
  </Box>
  <Box backgroundColor="primaryLight" padding="m" borderRadius="s">
    <Text>C</Text>
  </Box>
</Grid>
```

## Props

| 属性        | 类型                     | 默认值 | 说明          |
| ----------- | ------------------------ | ------ | ------------- |
| columns     | `number`                 | `2`    | 列数          |
| spacing     | `keyof Theme['spacing']` | `'s'`  | 网格间距      |
| ...BoxProps | -                        | -      | 继承 Box 属性 |
