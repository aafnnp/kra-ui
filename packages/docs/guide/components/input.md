# Input 组件

输入框组件，支持多种变体和尺寸，可配置左右附加元素。

## 引入

```tsx
import { Input } from 'kra-ui';
```

## 基本用法

```tsx
<Input placeholder="请输入" variant="outline" />
<Input placeholder="带图标" leftElement={<Icon name="search" />} />
<Input placeholder="无效状态" isInvalid />
<Input placeholder="禁用" isDisabled />
```

> 可访问性：当传入 `isDisabled` 时，会自动同步到 `accessibilityState.disabled`；当传入 `isInvalid` 时，会设置 `accessibilityHint`（默认“输入无效”）。同时默认使用 `placeholder` 作为 `accessibilityLabel`（可手动覆盖）。

## Props

| 属性         | 类型                                   | 默认值      | 说明                       |
| ------------ | -------------------------------------- | ----------- | -------------------------- |
| variant      | `'outline' \| 'filled' \| 'underline'` | `'outline'` | 输入框变体                 |
| size         | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | 输入框尺寸                 |
| leftElement  | `React.ReactNode`                      | -           | 左侧附加元素（如图标）     |
| rightElement | `React.ReactNode`                      | -           | 右侧附加元素（如清除按钮） |
| isInvalid    | `boolean`                              | `false`     | 是否无效（显示错误样式）   |
| isDisabled   | `boolean`                              | `false`     | 是否禁用                   |
