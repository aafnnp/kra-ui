# Text 组件

文本组件，支持主题定义的 textVariants 变体，用于统一应用内的文字样式。

## 引入

```tsx
import { Text } from 'kra-ui';
```

## 基本用法

```tsx
<Text variant="body">普通正文</Text>
<Text variant="header">大标题</Text>
<Text variant="caption" color="textMuted">辅助说明文字</Text>
```

## textVariants

| 变体      | 说明                |
| --------- | ------------------- |
| header    | 大标题，34px 粗体   |
| subheader | 副标题，24px 半粗   |
| body      | 正文，16px          |
| caption   | 说明文字，12px      |
| label     | 标签文字，14px 半粗 |

## Props

| 属性         | 类型                                                        | 说明                                                              |
| ------------ | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| variant      | `'header' \| 'subheader' \| 'body' \| 'caption' \| 'label'` | 文本变体                                                          |
| ...TextProps | -                                                           | 继承 Restyle TextProps，包括 `color`、`fontSize`、`fontWeight` 等 |
