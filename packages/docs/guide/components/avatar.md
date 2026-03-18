# Avatar 组件

头像组件，支持图片显示，无图片时显示名称首字母作为回退。支持状态角标、可交互、图片失败回退，以及 `AvatarGroup` 叠放展示。

## 引入

```tsx
import { Avatar, AvatarGroup } from 'kra-ui';
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

## 状态角标

```tsx
<Avatar name="张三" status="online" />
<Avatar name="李四" status="busy" />
<Avatar name="王五" status="away" />
```

## 可交互

```tsx
<Avatar
  name="用户"
  onPress={() => console.log('点击头像')}
  accessibilityLabel="用户头像"
/>
<Avatar name="禁用" onPress={() => {}} isDisabled accessibilityLabel="禁用头像" />
```

## 图片失败回退

```tsx
<Avatar
  name="张三"
  source={{ uri: 'https://example.com/avatar.jpg' }}
  onImageError={(e) => console.warn('图片加载失败', e)}
/>
```

图片加载失败时会自动回退到名称首字母。

## AvatarGroup

叠放展示多个头像，超出 `max` 时显示 `+N`：

```tsx
<AvatarGroup max={3}>
  <Avatar name="A" />
  <Avatar name="B" />
  <Avatar name="C" />
  <Avatar name="D" />
</AvatarGroup>
```

## Props

### Avatar

| 属性               | 类型                                   | 默认值  | 说明                                                         |
| ------------------ | -------------------------------------- | ------- | ------------------------------------------------------------ |
| source             | `ImageSourcePropType`                  | -       | 图片源                                                       |
| size               | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | 头像尺寸（推荐 `sm/md/lg`，`xs/xl` 兼容但已废弃）            |
| name               | `string`                               | -       | 名称（无图片时显示首字母，最多 2 个字符）                     |
| status             | `'online' \| 'offline' \| 'busy' \| 'away'` | -   | 状态角标                                                     |
| onPress            | `() => void`                           | -       | 点击回调                                                     |
| isDisabled         | `boolean`                              | `false` | 是否禁用                                                     |
| onImageError       | `(e: unknown) => void`                 | -       | 图片加载失败回调                                             |
| accessibilityLabel | `string`                               | -       | 无障碍标签（默认 `name ?? '头像'`）                          |
| ...BoxProps        | -                                      | -       | 继承 Box 属性                                                |

### AvatarGroup

| 属性     | 类型                         | 默认值   | 说明                 |
| -------- | ---------------------------- | -------- | -------------------- |
| size     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`   | 统一子头像尺寸       |
| max      | `number`                     | `4`      | 最多显示数量，超出显示 +N |
| spacing  | `'tight' \| 'normal'`        | `'normal'` | 叠放间距           |
| ...BoxProps | -                          | -        | 继承 Box 属性        |
