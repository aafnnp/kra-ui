# Avatar 组件

头像组件，支持图片显示，无图片时显示名称首字母作为回退。

## 引入

```tsx
import { Avatar } from '@native-ui/ui';
```

## 基本用法

```tsx
// 图片头像
<Avatar source={{ uri: 'https://example.com/avatar.jpg' }} size="md" />

// 名称首字母
<Avatar name="张三" size="lg" />

// 无图片无名称时显示 ?
<Avatar size="sm" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| source | `ImageSourcePropType` | - | 图片源 |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 头像尺寸 |
| name | `string` | - | 名称（无图片时显示首字母，最多 2 个字符） |
| ...BoxProps | - | - | 继承 Box 属性 |
