# Rating 组件

评分组件，支持星级评分交互，适用于评价、打分场景。

## 引入

```tsx
import { Rating } from 'kra-ui';
```

## 基本用法

```tsx
const [score, setScore] = useState(3);

<Rating value={score} onChange={setScore} />

// 10 颗星
<Rating value={score} onChange={setScore} count={10} />

// 只读模式
<Rating value={4} readonly />

// 不同尺寸
<Rating value={3} size="sm" readonly />
<Rating value={3} size="md" readonly />
<Rating value={3} size="lg" readonly />
```

## Props

| 属性        | 类型                      | 默认值  | 说明          |
| ----------- | ------------------------- | ------- | ------------- |
| value       | `number`                  | `0`     | 当前评分值    |
| onChange    | `(value: number) => void` | -       | 评分变更回调  |
| count       | `number`                  | `5`     | 星星数量      |
| size        | `'sm' \| 'md' \| 'lg'`    | `'md'`  | 尺寸          |
| readonly    | `boolean`                 | `false` | 是否只读      |
| ...BoxProps | -                         | -       | 继承 Box 属性 |
