# PasswordInput 组件

密码输入框组件，基于 Input 封装，支持密码可见性切换。

## 引入

```tsx
import { PasswordInput } from 'kra-ui';
```

## 基本用法

```tsx
const [password, setPassword] = useState('');

<PasswordInput
  placeholder="请输入密码"
  value={password}
  onChangeText={setPassword}
/>

// 隐藏切换按钮
<PasswordInput
  placeholder="不可切换显示"
  visibilityToggle={false}
/>
```

## Props

| 属性             | 类型      | 默认值 | 说明                    |
| ---------------- | --------- | ------ | ----------------------- |
| visibilityToggle | `boolean` | `true` | 是否显示可见性切换按钮  |
| ...InputProps    | -         | -      | 继承 Input 组件所有属性 |
