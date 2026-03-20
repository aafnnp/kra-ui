# Code 组件

行内代码组件，使用等宽字体和背景色显示代码片段。

## 引入

```tsx
import { Code } from 'kra-ui';
```

## 基本用法

```tsx
<Text>
  使用 <Code>npm install</Code> 安装依赖
</Text>

<Code>const x = 42;</Code>
```

## Props

| 属性         | 类型              | 默认值 | 说明             |
| ------------ | ----------------- | ------ | ---------------- |
| children     | `React.ReactNode` | -      | 代码内容（必填） |
| ...TextProps | -                 | -      | 继承 Text 属性   |
