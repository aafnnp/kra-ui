# Divider 组件

分割线组件，用于在内容之间添加视觉分隔。

## 引入

```tsx
import { Divider } from 'kra-ui';
```

## 基本用法

```tsx
<VStack>
  <Text>上方内容</Text>
  <Divider orientation="horizontal" />
  <Text>下方内容</Text>
</VStack>

// 垂直分割线
<HStack>
  <Text>左侧</Text>
  <Divider orientation="vertical" thickness={2} />
  <Text>右侧</Text>
</HStack>
```

## Props

| 属性        | 类型                         | 默认值         | 说明                                |
| ----------- | ---------------------------- | -------------- | ----------------------------------- |
| orientation | `'horizontal' \| 'vertical'` | `'horizontal'` | 分割线方向                          |
| thickness   | `number`                     | `1`            | 分割线粗细（像素）                  |
| ...BoxProps | -                            | -              | 继承 Box 属性（不含 height、width） |
