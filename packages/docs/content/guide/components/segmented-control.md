# SegmentedControl 组件

分段控制器组件，类似 iOS UISegmentedControl，适用于视图切换、筛选等场景。

## 引入

```tsx
import { SegmentedControl } from 'kra-ui';
```

## 基本用法

```tsx
const [tab, setTab] = useState('all');

<SegmentedControl
  segments={[
    { label: '全部', value: 'all' },
    { label: '进行中', value: 'active' },
    { label: '已完成', value: 'done' },
  ]}
  value={tab}
  onChange={setTab}
/>

// 不同尺寸
<SegmentedControl
  segments={[
    { label: '日', value: 'day' },
    { label: '周', value: 'week' },
    { label: '月', value: 'month' },
  ]}
  value="day"
  size="sm"
  onChange={setTab}
/>
```

## Props

| 属性        | 类型                                 | 默认值 | 说明             |
| ----------- | ------------------------------------ | ------ | ---------------- |
| segments    | `{ label: string; value: string }[]` | -      | 选项列表（必填） |
| value       | `string`                             | -      | 当前选中值       |
| onChange    | `(value: string) => void`            | -      | 选中值变更回调   |
| size        | `'sm' \| 'md' \| 'lg'`               | `'md'` | 尺寸             |
| ...BoxProps | -                                    | -      | 继承 Box 属性    |
