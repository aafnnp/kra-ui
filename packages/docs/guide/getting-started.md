# 快速开始

## 安装

```bash
# 使用 pnpm
pnpm add @native-ui/ui @shopify/restyle

# 使用 yarn
yarn add @native-ui/ui @shopify/restyle

# 使用 npm
npm install @native-ui/ui @shopify/restyle
```

## 基本用法

在应用根组件中使用 `NativeUIProvider`：

```tsx
import {NativeUIProvider} from '@native-ui/ui';

export default function App() {
  return (
    <NativeUIProvider>
      {/* 你的应用内容 */}
    </NativeUIProvider>
  );
}
```

## 使用组件

```tsx
import {Box, Text, Button, Card} from '@native-ui/ui';

function MyScreen() {
  return (
    <Box flex={1} padding="m" backgroundColor="mainBackground">
      <Text variant="header">欢迎使用 NativeUI</Text>

      <Card variant="elevated" marginTop="m">
        <Text variant="body">这是一个卡片示例</Text>
      </Card>

      <Button
        label="点击我"
        variant="filled"
        marginTop="m"
        onPress={() => console.log('clicked')}
      />
    </Box>
  );
}
```

## 暗色模式

通过 `useColorMode` hook 切换主题：

```tsx
import {useColorMode, Button} from '@native-ui/ui';

function ThemeToggle() {
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Button
      label={colorMode === 'light' ? '切换暗色' : '切换亮色'}
      onPress={toggleColorMode}
    />
  );
}
```

## 自定义主题

传入自定义主题覆盖默认值：

```tsx
import {createTheme} from '@shopify/restyle';
import {NativeUIProvider, theme as defaultTheme} from '@native-ui/ui';

const customTheme = createTheme({
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#FF6B6B',
  },
});

export default function App() {
  return (
    <NativeUIProvider lightTheme={customTheme}>
      {/* 你的应用内容 */}
    </NativeUIProvider>
  );
}
```
