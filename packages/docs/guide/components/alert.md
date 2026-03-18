# Alert 组件

提示信息组件，用于展示信息、成功、警告、错误等不同状态的提示内容。

## 引入

```tsx
import { Alert } from 'kra-ui';
```

## 基本用法

```tsx
<Alert variant="info" title="提示" message="这是一条信息提示" />
<Alert variant="success" title="成功" message="操作已完成" />
<Alert variant="warning" title="警告" message="请注意检查" />
<Alert variant="error" title="错误" message="操作失败，请重试" />
```

## 可关闭

```tsx
<Alert
  variant="warning"
  title="可关闭"
  message="点击右侧关闭按钮"
  closable
  onClose={() => {}}
/>
```

## 操作区

```tsx
<Alert
  variant="info"
  title="提示"
  message="你可以在右侧放一个操作按钮"
  action={<Button label="操作" size="sm" variant="outline" onPress={() => {}} />}
/>
```

## 插槽用法（Compound）

```tsx
<Alert variant="info" closable onClose={() => {}}>
  <HStack
    flex={1}
    alignItems="center"
    justifyContent="space-between"
    space="s"
  >
    <HStack
      flex={1}
      alignItems="center"
      space="s"
    >
      <Alert.Icon />
      <VStack
        flex={1}
        space="xs"
      >
        <Alert.Title>插槽用法</Alert.Title>
        <Alert.Description>可以自由组合标题、内容、操作与关闭按钮</Alert.Description>
      </VStack>
    </HStack>
    <Alert.Action>
      <Button label="操作" size="sm" variant="outline" onPress={() => {}} />
    </Alert.Action>
    <Alert.Close />
  </HStack>
</Alert>
```

## Props

| 属性        | 类型                                          | 默认值   | 说明          |
| ----------- | --------------------------------------------- | -------- | ------------- |
| variant     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 提示类型      |
| size        | `'sm' \| 'md'`                                | `'md'`   | 尺寸          |
| title       | `ReactNode`                                   | -        | 标题          |
| message     | `ReactNode`                                   | -        | 内容          |
| icon        | `boolean \| ReactNode`                        | `true`   | 图标          |
| action      | `ReactNode`                                   | -        | 右侧操作区    |
| closable    | `boolean`                                     | `false`  | 是否可关闭    |
| onClose     | `() => void`                                  | -        | 关闭回调      |
| status      | `'info' \| 'success' \| 'warning' \| 'error'` | -        | 兼容旧版本（deprecated） |
| description | `ReactNode`                                   | -        | 兼容旧版本（deprecated） |
| ...BoxProps | -                                             | -        | 继承 Box 属性 |
