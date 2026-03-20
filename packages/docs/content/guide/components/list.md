# List 组件

列表组件，支持有序列表（数字）和无序列表（圆点）。

## 引入

```tsx
import { List } from 'kra-ui';
```

## 基本用法

```tsx
// 无序列表（默认）
<List>
  <Text>列表项 A</Text>
  <Text>列表项 B</Text>
  <Text>列表项 C</Text>
</List>

// 有序列表
<List type="ordered" spacing="s">
  <Text>第一步：安装依赖</Text>
  <Text>第二步：配置主题</Text>
  <Text>第三步：使用组件</Text>
</List>
```

## Props

| 属性        | 类型                       | 默认值        | 说明          |
| ----------- | -------------------------- | ------------- | ------------- |
| type        | `'ordered' \| 'unordered'` | `'unordered'` | 列表类型      |
| spacing     | `keyof Theme['spacing']`   | `'xs'`        | 列表项间距    |
| ...BoxProps | -                          | -             | 继承 Box 属性 |
