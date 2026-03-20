# Popup 组件

底部弹出面板组件，从屏幕底部滑入，支持手势下滑关闭、遮罩关闭，常用于操作面板、筛选器等场景。

## 引入

```tsx
import { Popup } from 'kra-ui';
```

## 基本用法

```tsx
const [visible, setVisible] = useState(false);

<Button label="打开面板" onPress={() => setVisible(true)} />

<Popup
  visible={visible}
  onClose={() => setVisible(false)}
  title="操作面板"
>
  <Text>这是一个底部弹出面板</Text>
</Popup>
```

## 固定高度

通过 `height` 属性设置面板高度比例（0~1）。

```tsx
<Popup visible={visible} onClose={() => setVisible(false)} title="半屏面板" height={0.5}>
  <Text>面板占屏幕高度 50%</Text>
</Popup>
```

## 禁用下滑关闭

```tsx
<Popup
  visible={visible}
  onClose={() => setVisible(false)}
  title="不可下滑关闭"
  swipeToClose={false}
>
  <Text>只能通过关闭按钮或遮罩关闭</Text>
</Popup>
```

## 无标题无关闭按钮

```tsx
<Popup visible={visible} onClose={() => setVisible(false)} showClose={false}>
  <Text>简洁的弹出面板</Text>
</Popup>
```

## Props

| 属性           | 类型               | 默认值   | 说明                                  |
| -------------- | ------------------ | -------- | ------------------------------------- |
| visible        | `boolean`          | -        | 是否显示（必填）                      |
| onClose        | `() => void`       | -        | 关闭回调（必填）                      |
| height         | `'auto' \| number` | `'auto'` | 面板高度，number 为屏幕高度比例 (0~1) |
| title          | `string`           | -        | 标题                                  |
| closeOnOverlay | `boolean`          | `true`   | 点击遮罩是否关闭                      |
| showClose      | `boolean`          | `true`   | 是否显示关闭按钮                      |
| showHandle     | `boolean`          | `true`   | 是否显示拖拽指示条                    |
| swipeToClose   | `boolean`          | `true`   | 是否支持下滑关闭                      |
| rounded        | `boolean`          | `true`   | 是否圆角                              |

## 动画效果

- **滑入动画**：面板从底部弹簧式滑入
- **遮罩动画**：背景遮罩淡入淡出
- **手势关闭**：支持下滑手势，超过阈值自动关闭，否则弹回
