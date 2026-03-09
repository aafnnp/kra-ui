# Steps 组件

步骤条组件，引导用户按照流程完成任务，支持水平/垂直方向、自定义图标、可点击跳转和错误状态。

## 引入

```tsx
import { Steps } from 'kra-ui';
```

## 基本用法

通过 `current` 指定当前步骤（从 0 开始），`items` 传入步骤数据。

```tsx
<Steps
  current={1}
  items={[
    { title: '账号信息' },
    { title: '身份验证' },
    { title: '完成注册' },
  ]}
/>
```

## 带描述

每个步骤可以设置 `description` 显示描述文字。

```tsx
<Steps
  current={1}
  items={[
    { title: '账号信息', description: '填写用户名和邮箱' },
    { title: '身份验证', description: '验证手机号码' },
    { title: '完成注册', description: '设置密码并提交' },
  ]}
/>
```

## 错误状态

通过 `status: 'error'` 手动指定某个步骤为错误状态。

```tsx
<Steps
  current={1}
  items={[
    { title: '提交订单' },
    { title: '支付', status: 'error' },
    { title: '完成' },
  ]}
/>
```

## 可点击

传入 `onChange` 回调后，步骤可点击跳转。

```tsx
const [current, setCurrent] = useState(0);

<Steps
  current={current}
  onChange={setCurrent}
  items={[
    { title: '第一步' },
    { title: '第二步' },
    { title: '第三步' },
  ]}
/>
```

## 垂直方向

设置 `orientation="vertical"` 切换为垂直布局。

```tsx
<Steps
  current={1}
  orientation="vertical"
  items={[
    { title: '创建账户', description: '填写基本信息完成注册' },
    { title: '实名认证', description: '上传身份证照片进行验证' },
    { title: '绑定银行卡', description: '添加银行卡用于收款' },
    { title: '开始使用' },
  ]}
/>
```

## 自定义图标

通过 `icon` 属性替换默认的步骤序号/对勾。

```tsx
<Steps
  current={1}
  items={[
    { title: '编辑', icon: <Text>📝</Text> },
    { title: '审核', icon: <Text>🔍</Text> },
    { title: '发布', icon: <Text>🚀</Text> },
  ]}
/>
```

## 不同尺寸

通过 `size` 控制步骤圆圈和文字大小。

```tsx
<Steps current={1} size="sm" items={[...]} />
<Steps current={1} size="md" items={[...]} />
<Steps current={1} size="lg" items={[...]} />
```

## StepsProps

| 属性        | 类型                              | 默认值         | 说明                               |
| ----------- | --------------------------------- | -------------- | ---------------------------------- |
| current     | `number`                          | `0`            | 当前步骤索引（从 0 开始）          |
| orientation | `'horizontal' \| 'vertical'`     | `'horizontal'` | 布局方向                           |
| onChange    | `(index: number) => void`         | -              | 点击步骤回调，传入后步骤可点击     |
| items       | `StepItem[]`                      | -              | 步骤数据列表（必填）               |
| size        | `'sm' \| 'md' \| 'lg'`           | `'md'`         | 尺寸                               |
| ...BoxProps | -                                 | -              | 继承所有 Box 属性                  |

## StepItem

| 属性        | 类型                                          | 默认值 | 说明                                        |
| ----------- | --------------------------------------------- | ------ | ------------------------------------------- |
| title       | `string`                                      | -      | 步骤标题（必填）                            |
| description | `string`                                      | -      | 步骤描述                                    |
| icon        | `ReactNode`                                   | -      | 自定义图标，替换默认序号/对勾               |
| status      | `'wait' \| 'process' \| 'finish' \| 'error'` | -      | 手动指定状态，不传则根据 current 自动推断   |
