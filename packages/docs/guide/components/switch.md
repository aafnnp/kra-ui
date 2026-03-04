# Switch 组件

开关组件，自动适配主题颜色，适用于布尔值切换场景。

## 引入

```tsx
import { Switch } from '@native-ui/ui';
```

## 基本用法

```tsx
<Switch
  label="启用通知"
  value={enabled}
  onValueChange={setEnabled}
/>
```

## Props

| 属性 | 类型 | 说明 |
|------|------|------|
| label | `string` | 标签文字 |
| value | `boolean` | 开关状态 |
| onValueChange | `(value: boolean) => void` | 状态变化回调 |
| containerProps | `BoxProps` | 容器 Box 属性 |
