# NumberInput 组件

数字输入框组件，带 +/- 步进按钮，支持范围限制。

## 引入

```tsx
import { NumberInput } from 'kra-ui';
```

## 基本用法

```tsx
const [count, setCount] = useState(0);

<NumberInput
  value={count}
  onChange={setCount}
  min={0}
  max={100}
  step={1}
/>

// 指定步进值
<NumberInput value={50} onChange={setValue} step={10} min={0} max={100} />
```

## Props

| 属性       | 类型                                   | 默认值      | 说明         |
| ---------- | -------------------------------------- | ----------- | ------------ |
| value      | `number`                               | `0`         | 当前数值     |
| onChange   | `(value: number) => void`              | -           | 数值变更回调 |
| min        | `number`                               | `-Infinity` | 最小值       |
| max        | `number`                               | `Infinity`  | 最大值       |
| step       | `number`                               | `1`         | 步进值       |
| size       | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | 尺寸         |
| isDisabled | `boolean`                              | `false`     | 是否禁用     |
| variant    | `'outline' \| 'filled' \| 'underline'` | `'outline'` | 输入框变体   |
