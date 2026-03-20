# Radio 组件

单选框组件，由 RadioGroup 和 Radio 配合使用，适用于互斥选项选择。

## 引入

```tsx
import { Radio, RadioGroup } from 'kra-ui';
```

## 基本用法

```tsx
const [value, setValue] = useState('apple');

<RadioGroup value={value} onChange={setValue}>
  <Radio value="apple" label="苹果" />
  <Radio value="banana" label="香蕉" />
  <Radio value="orange" label="橘子" />
</RadioGroup>

// 水平排列
<RadioGroup value={value} onChange={setValue} direction="row">
  <Radio value="a" label="选项 A" />
  <Radio value="b" label="选项 B" />
</RadioGroup>

// 禁用某个选项
<RadioGroup value={value} onChange={setValue}>
  <Radio value="a" label="可选" />
  <Radio value="b" label="禁用" isDisabled />
</RadioGroup>
```

## RadioGroup Props

| 属性        | 类型                      | 默认值     | 说明           |
| ----------- | ------------------------- | ---------- | -------------- |
| value       | `string`                  | -          | 当前选中值     |
| onChange    | `(value: string) => void` | -          | 选中值变更回调 |
| direction   | `'row' \| 'column'`       | `'column'` | 排列方向       |
| size        | `'sm' \| 'md' \| 'lg'`    | `'md'`     | 尺寸           |
| ...BoxProps | -                         | -          | 继承 Box 属性  |

## Radio Props

| 属性        | 类型      | 默认值  | 说明           |
| ----------- | --------- | ------- | -------------- |
| value       | `string`  | -       | 选项值（必填） |
| label       | `string`  | -       | 标签文字       |
| isDisabled  | `boolean` | `false` | 是否禁用       |
| ...BoxProps | -         | -       | 继承 Box 属性  |
