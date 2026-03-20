# PinInput 组件

PIN 码输入组件，多个单字符输入框组成，自动聚焦切换，适用于验证码、PIN 码输入场景。

## 引入

```tsx
import { PinInput } from 'kra-ui';
```

## 基本用法

```tsx
const [pin, setPin] = useState('');

<PinInput
  length={4}
  value={pin}
  onChange={setPin}
  onComplete={(value) => console.log('完成:', value)}
/>

// 6 位掩码模式
<PinInput length={6} mask value={pin} onChange={setPin} />

// 不同尺寸
<PinInput size="sm" value={pin} onChange={setPin} />
<PinInput size="lg" value={pin} onChange={setPin} />
```

## Props

| 属性        | 类型                      | 默认值  | 说明                   |
| ----------- | ------------------------- | ------- | ---------------------- |
| length      | `number`                  | `4`     | PIN 码位数             |
| value       | `string`                  | `''`    | 当前值                 |
| onChange    | `(value: string) => void` | -       | 值变更回调             |
| onComplete  | `(value: string) => void` | -       | 所有位数输入完成时触发 |
| mask        | `boolean`                 | `false` | 是否掩码显示           |
| size        | `'sm' \| 'md' \| 'lg'`    | `'md'`  | 尺寸                   |
| isDisabled  | `boolean`                 | `false` | 是否禁用               |
| ...BoxProps | -                         | -       | 继承 Box 属性          |
