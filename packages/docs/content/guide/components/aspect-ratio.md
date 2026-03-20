# AspectRatio 组件

宽高比容器，保持子元素按指定比例显示，适用于图片、视频等场景。

## 引入

```tsx
import { AspectRatio } from 'kra-ui';
```

## 基本用法

```tsx
// 16:9 比例容器
<AspectRatio ratio={16 / 9}>
  <Image source={{ uri: 'https://example.com/image.jpg' }} style={{ width: '100%', height: '100%' }} />
</AspectRatio>

// 正方形（默认 ratio=1）
<AspectRatio ratio={1} backgroundColor="primaryLight" borderRadius="m">
  <Center flex={1}>
    <Text>1:1</Text>
  </Center>
</AspectRatio>
```

## Props

| 属性        | 类型     | 默认值 | 说明          |
| ----------- | -------- | ------ | ------------- |
| ratio       | `number` | `1`    | 宽高比        |
| ...BoxProps | -        | -      | 继承 Box 属性 |
