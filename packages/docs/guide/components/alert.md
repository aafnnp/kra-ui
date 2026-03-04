# Alert 组件

提示信息组件，用于展示信息、成功、警告、错误等不同状态的提示内容。

## 引入

```tsx
import { Alert } from '@native-ui/ui';
```

## 基本用法

```tsx
<Alert status="info" title="提示" description="这是一条信息提示" />
<Alert status="success" title="成功" description="操作已完成" />
<Alert status="warning" title="警告" description="请注意检查" />
<Alert status="error" title="错误" description="操作失败，请重试" />
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| status | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 状态类型 |
| title | `string` | - | 标题 |
| description | `string` | - | 描述 |
| ...BoxProps | - | - | 继承 Box 属性 |
