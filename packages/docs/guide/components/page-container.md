# PageContainer 组件

页面容器组件，提供完整页面布局：StatusBar + 头部导航栏 + 可滚动内容区 + 固定底部按钮。集成加载状态和入场动画。

## 引入

```tsx
import { PageContainer } from 'kra-ui';
```

## 基本用法

```tsx
<PageContainer
  title="页面标题"
  onBack={() => navigation.goBack()}
  onFooterPress={() => console.log('确认')}>
  <Text>页面内容</Text>
</PageContainer>
```

## 自定义头部右侧

通过 `renderRight` 渲染头部右侧内容。

```tsx
<PageContainer
  title="设置"
  onBack={() => navigation.goBack()}
  renderRight={() => (
    <Pressable onPress={handleSave}>
      <Text color="primary">保存</Text>
    </Pressable>
  )}>
  <Text>设置页面内容</Text>
</PageContainer>
```

## 自定义返回按钮

```tsx
<PageContainer
  title="详情"
  renderBack={() => (
    <Pressable onPress={() => navigation.goBack()}>
      <Text>关闭</Text>
    </Pressable>
  )}>
  <Text>页面内容</Text>
</PageContainer>
```

## 隐藏返回按钮

```tsx
<PageContainer title="首页" showBack={false} showFooter={false}>
  <Text>首页没有返回按钮</Text>
</PageContainer>
```

## 自定义底部

```tsx
<PageContainer
  title="订单确认"
  onBack={() => navigation.goBack()}
  renderFooter={() => (
    <HStack space="s" padding="m">
      <Button label="取消" variant="outline" flex={1} onPress={onCancel} />
      <Button label="提交订单" variant="filled" flex={1} onPress={onSubmit} />
    </HStack>
  )}>
  <Text>订单详情</Text>
</PageContainer>
```

## 加载状态

```tsx
<PageContainer
  title="数据加载"
  isLoading={loading}
  onBack={() => navigation.goBack()}>
  <Text>内容区域</Text>
</PageContainer>
```

## 自定义加载

```tsx
<PageContainer
  title="加载"
  isLoading={loading}
  renderLoading={() => (
    <Center flex={1}>
      <Spinner size="lg" colorKey="success" />
      <Text>正在获取数据...</Text>
    </Center>
  )}>
  <Text>内容</Text>
</PageContainer>
```

## 禁用动画

```tsx
<PageContainer title="无动画" animated={false}>
  <Text>不带入场动画</Text>
</PageContainer>
```

## StatusBar 配置

```tsx
<PageContainer
  title="深色导航栏"
  statusBarStyle="light-content"
  onBack={() => navigation.goBack()}>
  <Text>内容</Text>
</PageContainer>
```

## 非滚动模式

```tsx
<PageContainer title="固定布局" scrollable={false}>
  <Center flex={1}>
    <Text>内容不可滚动，居中显示</Text>
  </Center>
</PageContainer>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | `string` | - | 页面标题 |
| showBack | `boolean` | `true` | 是否显示返回按钮 |
| onBack | `() => void` | - | 返回按钮点击回调 |
| renderBack | `() => ReactNode` | - | 自定义返回按钮 |
| renderRight | `() => ReactNode` | - | 右侧自定义内容 |
| renderHeader | `() => ReactNode` | - | 自定义头部（覆盖默认头部） |
| footerButtonLabel | `string` | `'确认'` | 底部按钮文字 |
| onFooterPress | `() => void` | - | 底部按钮点击回调 |
| footerButtonProps | `ButtonProps` | - | 底部按钮附加属性 |
| renderFooter | `() => ReactNode` | - | 自定义底部渲染 |
| showFooter | `boolean` | `true` | 是否显示底部栏 |
| statusBarStyle | `StatusBarStyle` | `'dark-content'` | StatusBar 样式 |
| hideStatusBar | `boolean` | `false` | 是否隐藏 StatusBar |
| isLoading | `boolean` | `false` | 加载状态 |
| renderLoading | `() => ReactNode` | - | 自定义加载渲染 |
| animated | `boolean` | `true` | 是否启用入场动画 |
| scrollable | `boolean` | `true` | 内容区是否可滚动 |
| safeAreaStyle | `StyleProp<ViewStyle>` | - | SafeAreaView 自定义样式 |
| headerStyle | `StyleProp<ViewStyle>` | - | 头部导航栏自定义样式 |
| contentStyle | `StyleProp<ViewStyle>` | - | 内容区自定义样式 |
| footerStyle | `StyleProp<ViewStyle>` | - | 底部栏自定义样式 |
| ...BoxProps | - | - | 继承 Box 属性 |
