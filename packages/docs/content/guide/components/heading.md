# Heading 组件

标题组件，支持 h1-h6 六个级别，用于页面标题层级展示。

## 引入

```tsx
import { Heading } from 'kra-ui';
```

## 基本用法

```tsx
<Heading size="h1">一级标题</Heading>
<Heading size="h2">二级标题</Heading>
<Heading size="h3">三级标题</Heading>
```

## Props

| 属性         | 类型                                           | 默认值 | 说明               |
| ------------ | ---------------------------------------------- | ------ | ------------------ |
| size         | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | 标题级别           |
| ...TextProps | -                                              | -      | 继承所有 Text 属性 |
