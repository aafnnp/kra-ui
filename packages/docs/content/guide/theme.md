# 主题配置

NativeUI 的主题系统基于 `@shopify/restyle`，定义了颜色、间距、圆角、文本变体等设计令牌。

## 默认主题结构

```ts
const theme = {
  colors: {
    mainBackground,
    cardBackground,
    inputBackground,
    textPrimary,
    textSecondary,
    textMuted,
    textInverse,
    primary,
    primaryLight,
    primaryDark,
    secondary,
    secondaryLight,
    secondaryDark,
    success,
    successLight,
    warning,
    warningLight,
    error,
    errorLight,
    border,
    borderFocus,
    divider,
    overlay,
    transparent,
    codeBackground,
    highlight,
    link,
    ratingActive,
    ratingInactive,
    segmentedBackground,
    segmentedActiveBackground,
  },
  spacing: {
    '0': 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadii: {
    none: 0,
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    full: 9999,
  },
  breakpoints: { phone: 0, tablet: 768 },
  textVariants: { header, subheader, body, caption, label },
  buttonVariants: { filled, outline, ghost, danger },
  cardVariants: { elevated, outline, filled },
  badgeVariants: { solid, subtle, outline },
  inputVariants: { outline, filled, underline },
  alertVariants: { info, success, warning, error },
};
```

## 颜色

采用语义化命名：

| 键名                        | 用途               |
| --------------------------- | ------------------ |
| `mainBackground`            | 页面背景           |
| `textPrimary`               | 主要文字           |
| `primary`                   | 主色调             |
| `error`                     | 错误色             |
| `codeBackground`            | 代码背景色         |
| `highlight`                 | 高亮背景色         |
| `link`                      | 链接文字色         |
| `ratingActive`              | 评分激活色         |
| `ratingInactive`            | 评分未激活色       |
| `segmentedBackground`       | 分段控制器背景     |
| `segmentedActiveBackground` | 分段控制器激活背景 |

## 间距

采用 T-shirt 尺寸命名：

| 键名  | 值  |
| ----- | --- |
| `xs`  | 4   |
| `s`   | 8   |
| `m`   | 16  |
| `l`   | 24  |
| `xl`  | 32  |
| `xxl` | 48  |

## 暗色主题

内置 `darkTheme`，与浅色主题结构完全一致，仅颜色值不同。通过 `NativeUIProvider` 的 `initialColorMode` 或 `useColorMode` 切换。
