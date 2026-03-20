# Stack / HStack / VStack 组件

堆叠布局组件，子元素之间自动添加间距。`HStack` 为水平堆叠，`VStack` 为垂直堆叠。

## 引入

```tsx
import { Stack, HStack, VStack } from 'kra-ui';
```

## 基本用法

```tsx
// 垂直堆叠（默认）
<VStack space="m">
  <Text>第一项</Text>
  <Text>第二项</Text>
  <Text>第三项</Text>
</VStack>

// 水平堆叠
<HStack space="s">
  <Badge label="标签1" />
  <Badge label="标签2" />
</HStack>
```

## Props

| 属性        | 类型                     | 默认值     | 说明                                                  |
| ----------- | ------------------------ | ---------- | ----------------------------------------------------- |
| space       | `keyof Theme['spacing']` | `'s'`      | 子元素间距，对应主题 spacing 键（如 xs、s、m、l、xl） |
| direction   | `'row' \| 'column'`      | `'column'` | 排列方向                                              |
| ...BoxProps | -                        | -          | 继承所有 Box 属性                                     |
