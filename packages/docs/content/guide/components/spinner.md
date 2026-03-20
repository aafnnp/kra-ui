# Spinner 组件

加载指示器组件，用于表示加载中的状态。

## 引入

```tsx
import { Spinner } from 'kra-ui';
```

## 基本用法

```tsx
<Spinner size="sm" />
<Spinner size="lg" colorKey="primary" />
```

## Props

| 属性        | 类型                    | 默认值      | 说明          |
| ----------- | ----------------------- | ----------- | ------------- |
| size        | `'sm' \| 'lg'`          | `'sm'`      | 尺寸          |
| colorKey    | `keyof Theme['colors']` | `'primary'` | 主题色键名    |
| ...BoxProps | -                       | -           | 继承 Box 属性 |
