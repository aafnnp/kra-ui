# Tabs 组件

选项卡组件，用于内容区域的切换展示，支持多种变体样式和滑动指示器动画。

## 引入

```tsx
import { Tabs } from 'kra-ui';
```

## 基本用法

```tsx
<Tabs
  items={[
    { label: '选项一', key: 'tab1' },
    { label: '选项二', key: 'tab2' },
    { label: '选项三', key: 'tab3' },
  ]}
  activeKey="tab1"
  onChange={(key) => console.log(key)}
>
  <Text>选项一的内容</Text>
  <Text>选项二的内容</Text>
  <Text>选项三的内容</Text>
</Tabs>
```

## 不同变体

### 下划线（默认）

```tsx
<Tabs variant="underline" items={items} onChange={onChange}>
  ...
</Tabs>
```

### 填充

```tsx
<Tabs variant="filled" items={items} onChange={onChange}>
  ...
</Tabs>
```

### 胶囊

```tsx
<Tabs variant="pill" items={items} onChange={onChange}>
  ...
</Tabs>
```

## 不同尺寸

```tsx
<Tabs size="sm" items={items} onChange={onChange} />
<Tabs size="md" items={items} onChange={onChange} />
<Tabs size="lg" items={items} onChange={onChange} />
```

## Props

| 属性        | 类型                                | 默认值        | 说明               |
| ----------- | ----------------------------------- | ------------- | ------------------ |
| items       | `TabItem[]`                         | -             | 选项卡列表（必填） |
| activeKey   | `string`                            | 第一项的 key  | 当前激活的 key     |
| onChange    | `(key: string) => void`             | -             | 切换回调           |
| size        | `'sm' \| 'md' \| 'lg'`              | `'md'`        | 尺寸               |
| variant     | `'underline' \| 'filled' \| 'pill'` | `'underline'` | 变体样式           |
| scrollable  | `boolean`                           | `false`       | 是否可滚动         |
| ...BoxProps | -                                   | -             | 继承 Box 属性      |

## TabItem

| 属性  | 类型     | 说明     |
| ----- | -------- | -------- |
| label | `string` | 选项标签 |
| key   | `string` | 唯一标识 |

## 动画效果

- **指示器动画**：下划线指示器弹簧式滑动过渡
- **内容切换**：透明度淡入淡出过渡
