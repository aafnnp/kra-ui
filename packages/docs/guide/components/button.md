# Button 组件

按钮组件，支持多种变体和尺寸，适用于主要操作、次要操作及危险操作等场景。

## 引入

```tsx
import { Button } from 'kra-ui';
```

## 基本用法

```tsx
<Button label="主要按钮" variant="filled" onPress={() => {}} />
<Button label="次要按钮" variant="outline" onPress={() => {}} />
<Button label="危险操作" variant="danger" onPress={() => {}} />
<Button label="加载中" loading onPress={() => {}} />
```

## Props

| 属性     | 类型                                           | 默认值     | 说明             |
| -------- | ---------------------------------------------- | ---------- | ---------------- |
| label    | `string`                                       | -          | 按钮文字（必填） |
| variant  | `'filled' \| 'outline' \| 'ghost' \| 'danger'` | `'filled'` | 按钮变体         |
| size     | `'sm' \| 'md' \| 'lg'`                         | `'md'`     | 按钮尺寸         |
| loading  | `boolean`                                      | `false`    | 加载状态         |
| isDisabled | `boolean`                                      | `false`    | 是否禁用         |
| onPress  | `() => void`                                   | -          | 点击回调         |
