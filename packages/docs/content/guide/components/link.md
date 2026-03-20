# Link 组件

链接组件，支持外部 URL 跳转，显示带下划线的链接样式文本。

## 引入

```tsx
import { Link } from 'kra-ui';
```

## 基本用法

```tsx
// 外部链接
<Link href="https://reactnative.dev">
  React Native 官网
</Link>

// 自定义点击事件
<Link onPress={() => navigation.navigate('Detail')}>
  查看详情
</Link>
```

## Props

| 属性         | 类型         | 默认值 | 说明                   |
| ------------ | ------------ | ------ | ---------------------- |
| href         | `string`     | -      | 链接地址               |
| isExternal   | `boolean`    | `true` | 是否使用系统浏览器打开 |
| onPress      | `() => void` | -      | 自定义点击回调         |
| ...TextProps | -            | -      | 继承 Text 属性         |
