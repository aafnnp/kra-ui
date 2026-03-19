import { createTheme } from '@shopify/restyle';
import { baseThemeConfig } from './baseThemeConfig';
import { palette } from './palette';

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
    overlay: 'rgba(0, 0, 0, 0.4)',

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
  ...baseThemeConfig,
});

export type Theme = typeof theme;
export default theme;
