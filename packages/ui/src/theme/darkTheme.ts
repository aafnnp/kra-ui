import { createTheme } from '@shopify/restyle';
import { baseThemeConfig } from './baseThemeConfig';
import { palette } from './palette';
import type { Theme } from './theme';

/**
 * 暗色主题
 * 结构与浅色主题一致，仅替换色值
 */
const darkTheme = createTheme<Theme>({
  colors: {
    mainBackground: palette.gray900,
    cardBackground: palette.gray800,
    inputBackground: palette.gray700,

    textPrimary: palette.gray50,
    textSecondary: palette.gray300,
    textMuted: palette.gray500,
    textInverse: palette.gray900,

    primary: palette.primary300,
    primaryLight: palette.primary900,
    primaryDark: palette.primary100,

    secondary: palette.secondary300,
    secondaryLight: palette.secondary900,
    secondaryDark: palette.secondary100,

    success: palette.success300,
    successLight: palette.success900,
    warning: palette.warning300,
    warningLight: palette.warning900,
    error: palette.error300,
    errorLight: palette.error900,

    border: palette.gray600,
    borderFocus: palette.primary300,

    divider: palette.gray600,

    overlay: 'rgba(0, 0, 0, 0.6)',

    codeBackground: palette.gray700,
    highlight: '#744210',
    link: palette.primary300,
    ratingActive: palette.warning300,
    ratingInactive: palette.gray600,
    segmentedBackground: palette.gray700,
    segmentedActiveBackground: palette.gray600,

    transparent: palette.transparent,
  },
  ...baseThemeConfig,
});

export default darkTheme;
