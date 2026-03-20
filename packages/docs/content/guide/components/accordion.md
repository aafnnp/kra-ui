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
{
  /* 边框样式（默认） */
}
<Accordion variant="outline">
  <Accordion.Item title="Outline 样式">
    <Text>边框包裹的手风琴</Text>
  </Accordion.Item>
</Accordion>;

{
  /* 填充标题背景 */
}
<Accordion variant="filled">
  <Accordion.Item title="Filled 样式">
    <Text>标题带背景色的手风琴</Text>
  </Accordion.Item>
</Accordion>;

{
  /* 各项分离 */
}
<Accordion variant="separated">
  <Accordion.Item title="Separated 样式">
    <Text>各项独立分隔的手风琴</Text>
  </Accordion.Item>
</Accordion>;
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

| 属性              | 类型                                   | 默认值      | 说明                   |
| ----------------- | -------------------------------------- | ----------- | ---------------------- |
| type              | `'single' \| 'multiple'`               | `'single'`  | 展开模式               |
| defaultIndex      | `number[]`                             | `[]`        | 默认展开的项索引       |
| index             | `number[]`                             | -           | 展开项索引（受控）     |
| onIndexChange     | `(next: number[]) => void`             | -           | 展开项变化回调         |
| variant           | `'outline' \| 'filled' \| 'separated'` | `'outline'` | 变体样式               |
| lazyMount         | `boolean`                              | `false`     | 是否首次展开才挂载内容 |
| unmountOnCollapse | `boolean`                              | `false`     | 折叠时是否卸载内容     |
| isAnimated        | `boolean`                              | `true`      | 是否启用动画           |
| animationDuration | `number`                               | `250`       | 动画时长（毫秒）       |
| animationEasing   | `(t: number) => number`                | -           | 动画缓动函数           |
| ...BoxProps       | -                                      | -           | 继承所有 Box 属性      |

## AccordionItem Props

| 属性         | 类型                    | 默认值  | 说明              |
| ------------ | ----------------------- | ------- | ----------------- |
| title        | `string`                | -       | 标题（必填）      |
| isDisabled   | `boolean`               | `false` | 是否禁用          |
| renderHeader | `(params) => ReactNode` | -       | 自定义标题区域    |
| ...BoxProps  | -                       | -       | 继承所有 Box 属性 |

## 受控用法

```tsx
const [index, setIndex] = useState<number[]>([0]);

<Accordion type="single" index={index} onIndexChange={setIndex}>
  <Accordion.Item title="第一项">
    <Text>第一项的内容</Text>
  </Accordion.Item>
  <Accordion.Item title="第二项">
    <Text>第二项的内容</Text>
  </Accordion.Item>
</Accordion>;
```

## 自定义标题区域

当传入 `renderHeader` 时，标题区域完全由你渲染。建议你在自定义标题中自行添加可点击与无障碍属性。

```tsx
<Accordion>
  <Accordion.Item
    title="第一项"
    renderHeader={({ title, isExpanded, isDisabled, toggle }) => (
      <Pressable
        onPress={toggle}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
      >
        <Box flexDirection="row" alignItems="center" justifyContent="space-between" padding="m">
          <Text fontWeight="600">{title}</Text>
          <Text color="textSecondary">{isExpanded ? '收起' : '展开'}</Text>
        </Box>
      </Pressable>
    )}
  >
    <Text>第一项的内容</Text>
  </Accordion.Item>
</Accordion>
```

## 内容挂载策略

```tsx
<Accordion lazyMount unmountOnCollapse>
  <Accordion.Item title="性能友好">
    <Text>首次展开才会挂载，折叠时会卸载</Text>
  </Accordion.Item>
</Accordion>
```

## 动画配置

```tsx
<Accordion isAnimated={false}>
  <Accordion.Item title="无动画">
    <Text>展开/收起不走动画</Text>
  </Accordion.Item>
</Accordion>
```
