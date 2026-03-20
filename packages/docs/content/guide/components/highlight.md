# Highlight 组件

文本高亮组件，高亮显示匹配的查询文本，适用于搜索结果展示。

## 引入

```tsx
import { Highlight } from 'kra-ui';
```

## 基本用法

```tsx
// 单个关键词高亮
<Highlight query="React">
  React Native 是基于 React 的移动端框架
</Highlight>

// 多个关键词高亮
<Highlight query={['React', 'Native']}>
  React Native 是基于 React 的移动端框架
</Highlight>
```

## Props

| 属性         | 类型                 | 默认值 | 说明                   |
| ------------ | -------------------- | ------ | ---------------------- |
| children     | `string`             | -      | 原始文本（必填）       |
| query        | `string \| string[]` | -      | 要高亮的关键词（必填） |
| ...TextProps | -                    | -      | 继承 Text 属性         |
