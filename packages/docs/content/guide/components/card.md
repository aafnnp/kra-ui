# Card 组件

卡片容器组件，用于内容分组展示，支持阴影、边框、填充等多种样式。

## 引入

```tsx
import { Card } from 'kra-ui';
```

## 基本用法

```tsx
<Card variant="elevated">
  <Heading size="h4">卡片标题</Heading>
  <Text variant="body">卡片内容</Text>
</Card>

<Card variant="outline">
  <Text>边框样式卡片</Text>
</Card>
```

## Props

| 属性        | 类型                                  | 默认值       | 说明              |
| ----------- | ------------------------------------- | ------------ | ----------------- |
| variant     | `'elevated' \| 'outline' \| 'filled'` | `'elevated'` | 卡片变体          |
| ...BoxProps | -                                     | -            | 继承所有 Box 属性 |
