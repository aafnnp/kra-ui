# Accordion 组件

手风琴组件，用于将内容分组折叠展示，支持单项展开和多项展开模式。

## 引入

```tsx
import { Accordion } from 'kra-ui';
```

## 基本用法

```tsx
<Accordion>
  <Accordion.Item title="第一项">
    <Text>第一项的内容</Text>
  </Accordion.Item>
  <Accordion.Item title="第二项">
    <Text>第二项的内容</Text>
  </Accordion.Item>
</Accordion>
```

## 多项展开

设置 `type="multiple"` 允许同时展开多个项。

```tsx
<Accordion type="multiple" defaultIndex={[0, 1]}>
  <Accordion.Item title="第一项">
    <Text>第一项的内容</Text>
  </Accordion.Item>
  <Accordion.Item title="第二项">
    <Text>第二项的内容</Text>
  </Accordion.Item>
</Accordion>
```

## 变体样式

```tsx
{/* 边框样式（默认） */}
<Accordion variant="outline">
  <Accordion.Item title="Outline 样式">
    <Text>边框包裹的手风琴</Text>
  </Accordion.Item>
</Accordion>

{/* 填充标题背景 */}
<Accordion variant="filled">
  <Accordion.Item title="Filled 样式">
    <Text>标题带背景色的手风琴</Text>
  </Accordion.Item>
</Accordion>

{/* 各项分离 */}
<Accordion variant="separated">
  <Accordion.Item title="Separated 样式">
    <Text>各项独立分隔的手风琴</Text>
  </Accordion.Item>
</Accordion>
```

## 禁用项

```tsx
<Accordion>
  <Accordion.Item title="可用项">
    <Text>可以展开的内容</Text>
  </Accordion.Item>
  <Accordion.Item title="禁用项" isDisabled>
    <Text>无法展开的内容</Text>
  </Accordion.Item>
</Accordion>
```

## Accordion Props

| 属性         | 类型                                        | 默认值      | 说明                     |
| ------------ | ------------------------------------------- | ----------- | ------------------------ |
| type         | `'single' \| 'multiple'`                    | `'single'`  | 展开模式                 |
| defaultIndex | `number[]`                                  | `[]`        | 默认展开的项索引         |
| variant      | `'outline' \| 'filled' \| 'separated'`      | `'outline'` | 变体样式                 |
| ...BoxProps  | -                                           | -           | 继承所有 Box 属性        |

## AccordionItem Props

| 属性        | 类型       | 默认值  | 说明              |
| ----------- | ---------- | ------- | ----------------- |
| title       | `string`   | -       | 标题（必填）      |
| isDisabled  | `boolean`  | `false` | 是否禁用          |
| ...BoxProps | -          | -       | 继承所有 Box 属性 |
