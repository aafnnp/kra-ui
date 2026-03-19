# Button 按钮

按钮组件，支持多种变体和尺寸，适用于主要操作、次要操作及危险操作等场景。

## 引入

```tsx
import { Button } from 'kra-ui';
```

## 使用示例

### 基本按钮

```tsx
<Button label="主要按钮" onPress={() => {}} />
<Button label="次要按钮" variant="outline" onPress={() => {}} />
<Button label="幽灵按钮" variant="ghost" onPress={() => {}} />
<Button label="危险操作" variant="danger" onPress={() => {}} />
```

### 尺寸

```tsx
<Button label="小号按钮" size="sm" onPress={() => {}} />
<Button label="默认按钮" size="md" onPress={() => {}} />
<Button label="大号按钮" size="lg" onPress={() => {}} />
```

### 加载与禁用状态

```tsx
<Button label="加载中" loading onPress={() => {}} />
<Button label="已禁用" isDisabled onPress={() => {}} />
```

> 迁移提示：`loading` 将逐步弃用，推荐使用 `isLoading`。详见 `/guide/migration`。

## Props

| 属性       | 类型                                           | 默认值     | 说明             |
| ---------- | ---------------------------------------------- | ---------- | ---------------- |
| label      | `string`                                       | -          | 按钮文字（必填） |
| variant    | `'filled' \| 'outline' \| 'ghost' \| 'danger'` | `'filled'` | 按钮变体         |
| size       | `'sm' \| 'md' \| 'lg'`                         | `'md'`     | 按钮尺寸         |
| isLoading  | `boolean`                                      | `false`    | 加载状态（推荐） |
| loading    | `boolean`                                      | `false`    | 加载状态（兼容，后续弃用） |
| isDisabled | `boolean`                                      | `false`    | 是否禁用         |
| onPress    | `() => void`                                   | -          | 点击回调         |
