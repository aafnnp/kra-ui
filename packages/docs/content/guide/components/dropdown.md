# Dropdown 组件

下拉菜单组件，点击触发器弹出菜单选项列表，支持缩放淡入动画。

## 引入

```tsx
import { Dropdown } from 'kra-ui';
```

## 基本用法

```tsx
<Dropdown
  trigger="请选择"
  items={[
    { key: 'edit', label: '编辑' },
    { key: 'copy', label: '复制' },
    { key: 'delete', label: '删除' },
  ]}
  onSelect={(key) => console.log('选中:', key)}
/>
```

## 带分割线

```tsx
<Dropdown
  trigger="操作"
  items={[
    { key: 'edit', label: '编辑' },
    { key: 'copy', label: '复制' },
    { key: 'delete', label: '删除', divider: true },
  ]}
  onSelect={onSelect}
/>
```

## 禁用项

```tsx
<Dropdown
  trigger="选择"
  items={[
    { key: 'edit', label: '编辑' },
    { key: 'copy', label: '复制', disabled: true },
    { key: 'delete', label: '删除' },
  ]}
  onSelect={onSelect}
/>
```

## 自定义触发器

```tsx
<Dropdown
  items={items}
  onSelect={onSelect}
  renderTrigger={(isOpen) => <Button label={isOpen ? '收起' : '展开'} variant="outline" />}
/>
```

## 右对齐

```tsx
<Dropdown trigger="右对齐菜单" items={items} onSelect={onSelect} align="right" />
```

## Props

| 属性          | 类型                                   | 默认值     | 说明               |
| ------------- | -------------------------------------- | ---------- | ------------------ |
| items         | `DropdownItem[]`                       | -          | 菜单项列表（必填） |
| onSelect      | `(key: string) => void`                | -          | 选中回调           |
| trigger       | `string`                               | `'请选择'` | 触发按钮文字       |
| renderTrigger | `(isOpen: boolean) => React.ReactNode` | -          | 自定义触发器       |
| menuWidth     | `number`                               | -          | 菜单宽度           |
| align         | `'left' \| 'right'`                    | `'left'`   | 对齐方式           |
| ...BoxProps   | -                                      | -          | 继承 Box 属性      |

## DropdownItem

| 属性     | 类型      | 默认值  | 说明                 |
| -------- | --------- | ------- | -------------------- |
| key      | `string`  | -       | 唯一标识             |
| label    | `string`  | -       | 显示文本             |
| disabled | `boolean` | `false` | 是否禁用             |
| divider  | `boolean` | `false` | 在此项上方显示分割线 |

## 动画效果

- **缩放动画**：菜单从 85% 缩放弹簧式放大到 100%
- **淡入淡出**：透明度平滑过渡
