# ScrollArea 组件

滚动区域组件，基于 ScrollView 封装，支持水平和垂直滚动。

## 引入

```tsx
import { ScrollArea } from 'kra-ui';
```

## 基本用法

```tsx
// 垂直滚动（默认）
<ScrollArea height={200}>
  <VStack space="s">
    {items.map(item => (
      <Text key={item.id}>{item.name}</Text>
    ))}
  </VStack>
</ScrollArea>

// 水平滚动
<ScrollArea direction="horizontal" height={100}>
  <HStack space="s">
    <Box width={120} height={80} backgroundColor="primaryLight" borderRadius="m" />
    <Box width={120} height={80} backgroundColor="successLight" borderRadius="m" />
    <Box width={120} height={80} backgroundColor="warningLight" borderRadius="m" />
  </HStack>
</ScrollArea>
```

## Props

| 属性                 | 类型                         | 默认值       | 说明                          |
| -------------------- | ---------------------------- | ------------ | ----------------------------- |
| direction            | `'horizontal' \| 'vertical'` | `'vertical'` | 滚动方向                      |
| showsScrollIndicator | `boolean`                    | `true`       | 是否显示滚动条                |
| scrollViewProps      | `ScrollViewProps`            | -            | 透传给 ScrollView 的属性      |
| ...BoxProps          | -                            | -            | 继承 Box 属性（控制外层尺寸） |
