# Checkbox 组件

复选框组件，支持选中状态、标签文字和多种尺寸。

## 引入

```tsx
import { Checkbox } from 'kra-ui';
```

## 基本用法

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  isChecked={checked}
  onChange={setChecked}
  label="同意用户协议"
/>

// 不同尺寸
<Checkbox size="sm" label="小" isChecked onChange={() => {}} />
<Checkbox size="md" label="中" isChecked onChange={() => {}} />
<Checkbox size="lg" label="大" isChecked onChange={() => {}} />

// 禁用状态
<Checkbox label="禁用选项" isDisabled />
```

## Props

| 属性        | 类型                         | 默认值  | 说明             |
| ----------- | ---------------------------- | ------- | ---------------- |
| isChecked   | `boolean`                    | `false` | 是否选中         |
| onChange    | `(checked: boolean) => void` | -       | 选中状态变更回调 |
| label       | `string`                     | -       | 标签文字         |
| isDisabled  | `boolean`                    | `false` | 是否禁用         |
| size        | `'sm' \| 'md' \| 'lg'`       | `'md'`  | 尺寸             |
| ...BoxProps | -                            | -       | 继承 Box 属性    |
