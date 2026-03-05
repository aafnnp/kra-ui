# Modal 组件

模态弹窗组件，用于在当前页面上层展示重要信息或操作，支持遮罩、多种尺寸和动画类型。

## 引入

```tsx
import { Modal } from 'kra-ui';
```

## 基本用法

```tsx
const [visible, setVisible] = useState(false);

<Button label="打开弹窗" onPress={() => setVisible(true)} />

<Modal visible={visible} onClose={() => setVisible(false)}>
  <Modal.Header title="提示" />
  <Modal.Body>
    <Text>这是一个基本的模态弹窗。</Text>
  </Modal.Body>
  <Modal.Footer>
    <Button label="关闭" variant="outline" onPress={() => setVisible(false)} />
    <Button label="确认" onPress={() => setVisible(false)} />
  </Modal.Footer>
</Modal>
```

## 不同尺寸

通过 `size` 属性控制弹窗宽度。

```tsx
<Modal visible={visible} onClose={onClose} size="sm">
  <Modal.Header title="小尺寸弹窗" />
  <Modal.Body>
    <Text>宽度为屏幕 65%</Text>
  </Modal.Body>
</Modal>

<Modal visible={visible} onClose={onClose} size="lg">
  <Modal.Header title="大尺寸弹窗" />
  <Modal.Body>
    <Text>宽度为屏幕 92%</Text>
  </Modal.Body>
</Modal>
```

## 动画类型

```tsx
<Modal visible={visible} onClose={onClose} animationType="slide">
  <Modal.Header title="滑入动画" />
  <Modal.Body>
    <Text>从底部滑入的弹窗</Text>
  </Modal.Body>
</Modal>
```

## 禁止点击遮罩关闭

```tsx
<Modal visible={visible} onClose={onClose} closeOnOverlay={false}>
  <Modal.Header title="必须手动关闭" />
  <Modal.Body>
    <Text>点击遮罩不会关闭此弹窗。</Text>
  </Modal.Body>
  <Modal.Footer>
    <Button label="关闭" onPress={onClose} />
  </Modal.Footer>
</Modal>
```

## Modal Props

| 属性           | 类型                              | 默认值   | 说明               |
| -------------- | --------------------------------- | -------- | ------------------ |
| visible        | `boolean`                         | -        | 是否显示（必填）   |
| onClose        | `() => void`                      | -        | 关闭回调（必填）   |
| size           | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'`   | 弹窗尺寸           |
| closeOnOverlay | `boolean`                         | `true`   | 点击遮罩是否关闭   |
| animationType  | `'none' \| 'slide' \| 'fade'`    | `'fade'` | 动画类型           |

## ModalHeader Props

| 属性      | 类型      | 默认值 | 说明             |
| --------- | --------- | ------ | ---------------- |
| title     | `string`  | -      | 标题文字         |
| showClose | `boolean` | `true` | 是否显示关闭按钮 |
| ...BoxProps | -       | -      | 继承 Box 属性    |

## ModalBody Props

| 属性      | 类型 | 默认值 | 说明          |
| --------- | ---- | ------ | ------------- |
| ...BoxProps | -  | -      | 继承 Box 属性 |

## ModalFooter Props

| 属性      | 类型 | 默认值 | 说明          |
| --------- | ---- | ------ | ------------- |
| ...BoxProps | -  | -      | 继承 Box 属性 |
