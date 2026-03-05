<p align="center">
  <h1 align="center">kra-ui</h1>
  <p align="center">基于 <a href="https://github.com/Shopify/restyle">@shopify/restyle</a> 的 React Native UI 组件库</p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/kra-ui"><img src="https://img.shields.io/npm/v/kra-ui.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/kra-ui"><img src="https://img.shields.io/npm/dm/kra-ui.svg" alt="npm downloads" /></a>
  <a href="https://github.com/aafnnp/native-ui/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/kra-ui.svg" alt="license" /></a>
</p>

---

## 特性

- 基于 `@shopify/restyle` 构建，支持强类型主题系统
- 内置亮色 / 暗色主题，开箱即用
- 30+ 常用组件，覆盖布局、表单、反馈等场景
- 使用 TypeScript 编写，提供完整类型定义
- 支持 React Native 新架构

## 组件列表

| 布局 | 表单 | 数据展示 | 反馈 |
| --- | --- | --- | --- |
| Box | Button | Avatar | Alert |
| Flex | Checkbox | Badge | Spinner |
| Grid | Input | Card | Rating |
| Stack | NumberInput | Code | - |
| Center | PasswordInput | Heading | - |
| Group | PinInput | Highlight | - |
| AspectRatio | Radio | List | - |
| ScrollArea | SegmentedControl | Separator | - |
| - | Switch | Text | - |
| - | Textarea | Divider | - |
| - | Link | - | - |

## 安装

```bash
# npm
npm install kra-ui @shopify/restyle

# yarn
yarn add kra-ui @shopify/restyle

# pnpm
pnpm add kra-ui @shopify/restyle
```

### 依赖要求

- React >= 18.0.0
- React Native >= 0.72.0
- @shopify/restyle >= 2.0.0

## 快速开始

使用 `NativeUIProvider` 包裹根组件，即可开始使用：

```tsx
import { NativeUIProvider, Button, Text } from 'kra-ui';

export default function App() {
  return (
    <NativeUIProvider>
      <Text variant="heading">Hello kra-ui</Text>
      <Button onPress={() => console.log('pressed')}>
        <Text>点击我</Text>
      </Button>
    </NativeUIProvider>
  );
}
```

### 暗色主题

```tsx
import { NativeUIProvider, darkTheme } from 'kra-ui';

export default function App() {
  return (
    <NativeUIProvider theme={darkTheme}>
      {/* your app */}
    </NativeUIProvider>
  );
}
```

## 项目结构

```
native-ui/
├── packages/
│   ├── ui/          # 组件库源码
│   ├── example/     # Expo 示例应用
│   └── docs/        # VitePress 文档站点
├── .changeset/      # Changesets 版本管理
└── .github/         # CI/CD 工作流
```

## 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 开始

```bash
# 克隆仓库
git clone https://github.com/aafnnp/native-ui.git
cd native-ui

# 安装依赖
pnpm install

# 启动示例应用
pnpm dev:example

# 启动文档站点
pnpm dev:docs

# 构建组件库
pnpm build
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/awesome`)
3. 提交变更 (`git commit -m 'feat: add awesome feature'`)
4. 推送分支 (`git push origin feature/awesome`)
5. 创建 Pull Request

本项目使用 [Changesets](https://github.com/changesets/changesets) 管理版本，提交 PR 前请运行：

```bash
pnpm changeset
```

## 许可证

[MIT](./LICENSE) &copy; [aafnnp](https://github.com/aafnnp)
