# Icon 组件

基于 `react-native-svg` 的图标组件，提供 30+ 内置图标、`createIcon` 工厂函数和自定义 SVG 支持。

## 引入

```tsx
import { Icon, createIcon, CloseIcon, SearchIcon } from 'kra-ui';
```

## 基本用法

```tsx
// 使用内置图标
<SearchIcon size="lg" color="textPrimary" />
<CloseIcon size="md" color="textSecondary" />
<CheckCircleIcon size={32} color="success" />

// 使用预设尺寸
<HomeIcon size="xs" />  {/* 12 */}
<HomeIcon size="sm" />  {/* 16 */}
<HomeIcon size="md" />  {/* 20 */}
<HomeIcon size="lg" />  {/* 24 (默认) */}
<HomeIcon size="xl" />  {/* 32 */}
```

## 主题色

图标颜色通过 `color` 属性绑定主题色键名，自动适配 light/dark 模式。

```tsx
<InfoIcon color="primary" />
<CheckCircleIcon color="success" />
<AlertTriangleIcon color="warning" />
<XCircleIcon color="error" />
```

## createIcon 工厂函数

通过 SVG path data 快速创建自定义图标组件。

```tsx
import { createIcon } from 'kra-ui';

// 单条路径
const HeartIcon = createIcon({
  displayName: 'HeartIcon',
  d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
});

// 多条路径
const CustomIcon = createIcon({
  displayName: 'CustomIcon',
  viewBox: '0 0 24 24',
  paths: [
    { d: 'M12 2L2 7l10 5 10-5-10-5z' },
    { d: 'M2 17l10 5 10-5' },
  ],
});
```

## 使用自定义 SVG 组件

通过 `as` 属性传入任意 SVG 组件。

```tsx
import { Icon } from 'kra-ui';
import MySvgIcon from './MySvgIcon';

<Icon as={MySvgIcon} size={24} color="primary" />
```

## 使用 Icon 基础组件 + SVG 子元素

```tsx
import { Icon, Path, Circle } from 'kra-ui';

<Icon size={24} color="primary" viewBox="0 0 24 24">
  <Circle cx="12" cy="12" r="10" />
  <Path d="M12 8v4l3 3" />
</Icon>
```

## 内置图标列表

### 导航类

| 图标 | 名称 | 说明 |
| ---- | ---- | ---- |
| ‹ | `ChevronLeftIcon` | 左箭头（V 形） |
| › | `ChevronRightIcon` | 右箭头（V 形） |
| ˄ | `ChevronUpIcon` | 上箭头（V 形） |
| ˅ | `ChevronDownIcon` | 下箭头（V 形） |
| ← | `ArrowLeftIcon` | 左箭头 |
| → | `ArrowRightIcon` | 右箭头 |
| ↑ | `ArrowUpIcon` | 上箭头 |
| ↓ | `ArrowDownIcon` | 下箭头 |

### 操作类

| 图标 | 名称 | 说明 |
| ---- | ---- | ---- |
| ✕ | `CloseIcon` | 关闭 |
| ✓ | `CheckIcon` | 对勾 |
| + | `PlusIcon` | 加号 |
| − | `MinusIcon` | 减号 |
| 🔍 | `SearchIcon` | 搜索 |
| ✏ | `EditIcon` | 编辑 |
| 🗑 | `TrashIcon` | 删除 |
| 📋 | `CopyIcon` | 复制 |

### 状态类

| 图标 | 名称 | 说明 |
| ---- | ---- | ---- |
| ℹ | `InfoIcon` | 信息 |
| ✓○ | `CheckCircleIcon` | 成功 |
| ⚠ | `AlertTriangleIcon` | 警告 |
| ✕○ | `XCircleIcon` | 错误 |

### UI 类

| 图标 | 名称 | 说明 |
| ---- | ---- | ---- |
| ☰ | `MenuIcon` | 菜单 |
| ··· | `MoreHorizontalIcon` | 更多（水平） |
| ⋮ | `MoreVerticalIcon` | 更多（垂直） |
| 👁 | `EyeIcon` | 可见 |
| 👁‍🗨 | `EyeOffIcon` | 不可见 |
| ♡ | `HeartIcon` | 心形 |
| ☆ | `StarIcon` | 星形 |
| ⚙ | `SettingsIcon` | 设置 |
| 🏠 | `HomeIcon` | 主页 |
| 👤 | `UserIcon` | 用户 |
| ↻ | `RefreshIcon` | 刷新 |
| ↓ | `DownloadIcon` | 下载 |
| ↗ | `ExternalLinkIcon` | 外部链接 |

## Icon Props

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| size | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'lg'` | 图标尺寸 |
| color | `keyof Theme['colors']` | `'textPrimary'` | 主题色键名 |
| viewBox | `string` | `'0 0 24 24'` | SVG viewBox |
| strokeWidth | `number` | `2` | 描边宽度 |
| fill | `'none' \| 'currentColor'` | `'none'` | 填充模式 |
| as | `React.ComponentType<SvgProps>` | - | 自定义 SVG 组件 |
| accessibilityLabel | `string` | - | 无障碍标签 |

## CreateIconOptions

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| displayName | `string` | `'CustomIcon'` | 组件显示名称 |
| viewBox | `string` | `'0 0 24 24'` | SVG viewBox |
| d | `string` | - | 单条路径 path data |
| paths | `PathConfig[]` | - | 多条路径配置 |
| defaultProps | `Partial<IconProps>` | - | 默认属性 |
| render | `(color: string) => ReactNode` | - | 自定义渲染函数 |
