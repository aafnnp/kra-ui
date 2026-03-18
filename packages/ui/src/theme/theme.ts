import { createTheme } from "@shopify/restyle"
import { palette } from "./palette"

/**
 * 默认浅色主题
 * 参考 Chakra UI 设计令牌系统
 */
const theme = createTheme({
  colors: {
    // 背景
    mainBackground: palette.white,
    cardBackground: palette.white,
    inputBackground: palette.white,

    // 文字
    textPrimary: palette.gray800,
    textSecondary: palette.gray600,
    textMuted: palette.gray400,
    textInverse: palette.white,

    // 主色
    primary: palette.primary500,
    primaryLight: palette.primary100,
    primaryDark: palette.primary700,

    // 次色
    secondary: palette.secondary500,
    secondaryLight: palette.secondary100,
    secondaryDark: palette.secondary700,

    // 语义色
    success: palette.success500,
    successLight: palette.success100,
    warning: palette.warning500,
    warningLight: palette.warning100,
    error: palette.error500,
    errorLight: palette.error100,

    // 边框
    border: palette.gray200,
    borderFocus: palette.primary500,

    // 分割线
    divider: palette.gray200,

    // 遮罩
    overlay: "rgba(0, 0, 0, 0.4)" as string,

    // 代码背景
    codeBackground: palette.gray100,

    // 高亮背景
    highlight: '#FEFCBF',

    // 链接
    link: palette.primary500,

    // 评分
    ratingActive: palette.warning400,
    ratingInactive: palette.gray200,

    // 分段控制器
    segmentedBackground: palette.gray100,
    segmentedActiveBackground: palette.white,

    // 透明
    transparent: palette.transparent,
  },

  spacing: {
    "0": 0,
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

  breakpoints: {
    phone: 0,
    tablet: 768,
  },

  // 文本变体
  textVariants: {
    defaults: {
      color: "textPrimary",
      fontSize: 16,
      lineHeight: 24,
    },
    header: {
      fontSize: 34,
      fontWeight: "bold",
      lineHeight: 42,
      color: "textPrimary",
    },
    subheader: {
      fontSize: 24,
      fontWeight: "600",
      lineHeight: 32,
      color: "textPrimary",
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: "textPrimary",
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      color: "textSecondary",
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 20,
      color: "textPrimary",
    },
  },

  // 按钮变体
  buttonVariants: {
    defaults: {
      paddingVertical: "s",
      paddingHorizontal: "m",
      borderRadius: "m",
    },
    filled: {
      backgroundColor: "primary",
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "primary",
    },
    ghost: {
      backgroundColor: "transparent",
    },
    danger: {
      backgroundColor: "error",
    },
  },

  // 卡片变体
  cardVariants: {
    defaults: {
      padding: "m",
      borderRadius: "l",
      backgroundColor: "cardBackground",
    },
    elevated: {
      shadowColor: "textPrimary",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    outline: {
      borderWidth: 1,
      borderColor: "border",
    },
    filled: {
      backgroundColor: "primaryLight",
    },
  },

  // 徽章变体
  badgeVariants: {
    defaults: {
      paddingVertical: "xs",
      paddingHorizontal: "s",
      borderRadius: "s",
    },
    solid: {
      backgroundColor: "primary",
    },
    subtle: {
      backgroundColor: "primaryLight",
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "primary",
    },
  },

  // 输入框变体
  inputVariants: {
    defaults: {
      padding: "s",
      borderRadius: "m",
      fontSize: 16,
      color: "textPrimary",
    },
    outline: {
      borderWidth: 1,
      borderColor: "border",
      backgroundColor: "inputBackground",
    },
    filled: {
      backgroundColor: "primaryLight",
      borderWidth: 0,
    },
    underline: {
      borderBottomWidth: 1,
      borderColor: "border",
      borderRadius: "none",
      paddingHorizontal: "0",
    },
  },

  // Alert 变体
  alertVariants: {
    defaults: {
      padding: "m",
      borderRadius: "m",
      flexDirection: "row" as const,
      alignItems: "center" as const,
    },
    info: {
      backgroundColor: "primaryLight",
    },
    success: {
      backgroundColor: "successLight",
    },
    warning: {
      backgroundColor: "warningLight",
    },
    error: {
      backgroundColor: "errorLight",
    },
  },

  // Accordion 变体
  accordionVariants: {
    defaults: {},
    outline: {
      borderWidth: 1,
      borderColor: "border",
      borderRadius: "m",
      overflow: "hidden" as const,
    },
    filled: {
      borderWidth: 1,
      borderColor: "border",
      borderRadius: "m",
      overflow: "hidden" as const,
    },
    separated: {
      gap: "s",
    },
  },

  accordionItemVariants: {
    defaults: {},
    separated: {
      borderWidth: 1,
      borderColor: "border",
      borderRadius: "m",
      overflow: "hidden" as const,
    },
  },

  accordionHeaderVariants: {
    defaults: {},
    filled: {
      backgroundColor: "primaryLight",
    },
  },
})

export type Theme = typeof theme
export default theme
