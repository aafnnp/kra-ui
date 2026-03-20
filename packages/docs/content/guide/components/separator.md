# Separator 组件

分隔符组件，支持带文字标签的分隔线，适用于内容分区。

## 引入

```tsx
import { Separator } from 'kra-ui';
```

## 基本用法

```tsx
// 水平分隔线
<Separator />

// 带标签的分隔线
<Separator label="或者" />

// 垂直分隔线
<HStack height={40} alignItems="center">
  <Text>左侧</Text>
  <Separator orientation="vertical" />
  <Text>右侧</Text>
</HStack>
```

## Props

| 属性        | 类型                         | 默认值         | 说明                                |
| ----------- | ---------------------------- | -------------- | ----------------------------------- |
| orientation | `'horizontal' \| 'vertical'` | `'horizontal'` | 分隔线方向                          |
| label       | `string`                     | -              | 中间标签文字（仅水平方向）          |
| thickness   | `number`                     | `1`            | 分隔线粗细                          |
| ...BoxProps | -                            | -              | 继承 Box 属性（不含 height、width） |
