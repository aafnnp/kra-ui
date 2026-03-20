# Textarea 组件

多行文本输入组件，基于 Input 模式封装，复用 inputVariants 主题变体。

## 引入

```tsx
import { Textarea } from 'kra-ui';
```

## 基本用法

```tsx
const [text, setText] = useState('');

<Textarea
  placeholder="请输入内容..."
  value={text}
  onChangeText={setText}
/>

// 指定行数
<Textarea rows={5} placeholder="5 行高度" />

// 不同变体
<Textarea variant="outline" placeholder="Outline" />
<Textarea variant="filled" placeholder="Filled" />

// 无效和禁用状态
<Textarea placeholder="无效状态" isInvalid />
<Textarea placeholder="禁用状态" isDisabled />
```

## Props

| 属性              | 类型                                   | 默认值      | 说明                |
| ----------------- | -------------------------------------- | ----------- | ------------------- |
| variant           | `'outline' \| 'filled' \| 'underline'` | `'outline'` | 输入框变体          |
| size              | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | 尺寸                |
| rows              | `number`                               | `3`         | 行数                |
| isInvalid         | `boolean`                              | `false`     | 是否无效            |
| isDisabled        | `boolean`                              | `false`     | 是否禁用            |
| ...TextInputProps | -                                      | -           | 继承 TextInput 属性 |
