# Switch 组件

开关组件，自动适配主题颜色，支持多种尺寸和状态文字，适用于布尔值切换场景。

## 引入

```tsx
import { Switch } from 'kra-ui';
```

## 基本用法

```tsx
<Switch
  label="启用通知"
  value={enabled}
  onValueChange={setEnabled}
/>

// 带状态文字
<Switch
  label="飞行模式"
  value={enabled}
  onValueChange={setEnabled}
  onLabel="已开启"
  offLabel="已关闭"
/>

// 不同尺寸
<Switch label="小号" size="sm" value={true} onValueChange={() => {}} />
<Switch label="中号" size="md" value={true} onValueChange={() => {}} />
<Switch label="大号" size="lg" value={true} onValueChange={() => {}} />

// 禁用状态
<Switch label="禁用" isDisabled value={false} onValueChange={() => {}} />
```

## Props

| 属性           | 类型                       | 默认值  | 说明          |
| -------------- | -------------------------- | ------- | ------------- |
| label          | `string`                   | -       | 标签文字      |
| size           | `'sm' \| 'md' \| 'lg'`     | `'md'`  | 尺寸          |
| isDisabled     | `boolean`                  | `false` | 是否禁用      |
| onLabel        | `string`                   | -       | 开启状态文字  |
| offLabel       | `string`                   | -       | 关闭状态文字  |
| value          | `boolean`                  | -       | 开关状态      |
| onValueChange  | `(value: boolean) => void` | -       | 状态变化回调  |
| containerProps | `BoxProps`                 | -       | 容器 Box 属性 |
