# Toast 组件

轻提示组件，用于操作反馈、信息提示等场景，支持多种状态类型和自动关闭。

## 引入

```tsx
import { Toast } from 'kra-ui';
```

## 基本用法

```tsx
const [visible, setVisible] = useState(false);

<Button label="显示提示" onPress={() => setVisible(true)} />

<Toast
  visible={visible}
  onClose={() => setVisible(false)}
  message="操作成功"
  status="success"
/>
```

## 不同状态

```tsx
<Toast visible={visible} onClose={onClose} message="这是一条信息提示" status="info" />
<Toast visible={visible} onClose={onClose} message="操作已成功完成" status="success" />
<Toast visible={visible} onClose={onClose} message="请注意此操作" status="warning" />
<Toast visible={visible} onClose={onClose} message="操作失败，请重试" status="error" />
```

## 底部显示

```tsx
<Toast
  visible={visible}
  onClose={() => setVisible(false)}
  message="底部提示信息"
  placement="bottom"
/>
```

## 自定义持续时间

```tsx
<Toast
  visible={visible}
  onClose={() => setVisible(false)}
  message="5秒后自动关闭"
  duration={5000}
/>
```

## Props

| 属性      | 类型                                          | 默认值   | 说明                               |
| --------- | --------------------------------------------- | -------- | ---------------------------------- |
| visible   | `boolean`                                     | -        | 是否显示（必填）                   |
| onClose   | `() => void`                                  | -        | 关闭回调（必填）                   |
| message   | `string`                                      | -        | 提示内容（必填）                   |
| status    | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 状态类型                           |
| duration  | `number`                                      | `3000`   | 自动关闭时间（毫秒），0 为不关闭   |
| placement | `'top' \| 'bottom'`                           | `'top'`  | 显示位置                           |
| closable  | `boolean`                                     | `true`   | 是否可手动关闭                     |

## 可访问性

- 默认 `accessibilityRole="alert"`
- 默认 `accessibilityLabel`：优先使用 `title + message`，否则使用 `message`

## 动画效果

- **滑入动画**：从顶部/底部弹簧式滑入
- **淡入淡出**：透明度平滑过渡
- **自动关闭**：到时间后滑出消失
