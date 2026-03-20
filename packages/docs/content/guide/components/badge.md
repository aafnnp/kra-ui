# Badge 组件

徽章组件，用于展示标签、状态或计数等短文本信息。

## 引入

```tsx
import { Badge } from 'kra-ui';
```

## 基本用法

```tsx
<Badge label="新" variant="solid" />
<Badge label="进行中" variant="subtle" />
<Badge label="待审核" variant="outline" />
```

## Props

| 属性        | 类型                               | 默认值     | 说明             |
| ----------- | ---------------------------------- | ---------- | ---------------- |
| label       | `string`                           | -          | 徽章文字（必填） |
| variant     | `'solid' \| 'subtle' \| 'outline'` | `'subtle'` | 徽章变体         |
| ...BoxProps | -                                  | -          | 继承 Box 属性    |
