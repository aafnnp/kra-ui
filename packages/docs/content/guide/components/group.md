# Group 组件

分组容器，子元素之间自动添加间距，默认水平排列。适用于按钮组、标签组等场景。

## 引入

```tsx
import { Group } from 'kra-ui';
```

## 基本用法

```tsx
// 水平分组（默认）
<Group spacing="s">
  <Button label="取消" variant="outline" onPress={() => {}} />
  <Button label="确认" variant="filled" onPress={() => {}} />
</Group>

// 垂直分组
<Group spacing="m" direction="column">
  <Text>第一行</Text>
  <Text>第二行</Text>
  <Text>第三行</Text>
</Group>
```

## Props

| 属性        | 类型                     | 默认值  | 说明          |
| ----------- | ------------------------ | ------- | ------------- |
| spacing     | `keyof Theme['spacing']` | `'s'`   | 子元素间距    |
| direction   | `'row' \| 'column'`      | `'row'` | 排列方向      |
| ...BoxProps | -                        | -       | 继承 Box 属性 |
