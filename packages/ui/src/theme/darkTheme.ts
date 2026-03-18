import { createTheme } from '@shopify/restyle';
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

  breakpoints: {
    phone: 0,
    tablet: 768,
  },

  textVariants: {
    defaults: {
      color: 'textPrimary',
      fontSize: 16,
      lineHeight: 24,
    },
    header: {
      fontSize: 34,
      fontWeight: 'bold',
      lineHeight: 42,
      color: 'textPrimary',
    },
    subheader: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
      color: 'textPrimary',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'textPrimary',
    },
    caption: {
      fontSize: 12,
      lineHeight: 16,
      color: 'textSecondary',
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 20,
      color: 'textPrimary',
    },
  },

  buttonVariants: {
    defaults: {
      paddingVertical: 's',
      paddingHorizontal: 'm',
      borderRadius: 'm',
    },
    filled: {
      backgroundColor: 'primary',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: 'error',
    },
  },

  cardVariants: {
    defaults: {
      padding: 'm',
      borderRadius: 'l',
      backgroundColor: 'cardBackground',
    },
    elevated: {
      shadowColor: 'textPrimary',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 3,
    },
    outline: {
      borderWidth: 1,
      borderColor: 'border',
    },
    filled: {
      backgroundColor: 'primaryLight',
    },
  },

  badgeVariants: {
    defaults: {
      paddingVertical: 'xs',
      paddingHorizontal: 's',
      borderRadius: 's',
    },
    solid: {
      backgroundColor: 'primary',
    },
    subtle: {
      backgroundColor: 'primaryLight',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'primary',
    },
  },

  // Avatar 尺寸（推荐 sm/md/lg，兼容 xs/xl）
  avatarSizes: {
    xs: {
      dimension: 24,
      fontSize: 10,
      gap: 4,
      ringWidth: 1,
      statusSize: 6,
    },
    sm: {
      dimension: 32,
      fontSize: 12,
      gap: 6,
      ringWidth: 1,
      statusSize: 8,
    },
    md: {
      dimension: 48,
      fontSize: 18,
      gap: 8,
      ringWidth: 2,
      statusSize: 10,
    },
    lg: {
      dimension: 64,
      fontSize: 24,
      gap: 10,
      ringWidth: 2,
      statusSize: 12,
    },
    xl: {
      dimension: 96,
      fontSize: 36,
      gap: 12,
      ringWidth: 2,
      statusSize: 16,
    },
  },

  // Avatar 回退态变体
  avatarVariants: {
    solid: {
      backgroundColor: 'primaryLight',
      textColor: 'primary',
    },
    subtle: {
      backgroundColor: 'segmentedBackground',
      textColor: 'textPrimary',
    },
  },

  // Avatar 状态色映射
  avatarStatusColors: {
    online: 'success',
    offline: 'border',
    busy: 'error',
    away: 'warning',
  },

  inputVariants: {
    defaults: {
      padding: 's',
      borderRadius: 'm',
      fontSize: 16,
      color: 'textPrimary',
    },
    outline: {
      borderWidth: 1,
      borderColor: 'border',
      backgroundColor: 'inputBackground',
    },
    filled: {
      backgroundColor: 'primaryLight',
      borderWidth: 0,
    },
    underline: {
      borderBottomWidth: 1,
      borderColor: 'border',
      borderRadius: 'none',
      paddingHorizontal: '0',
    },
  },

  alertVariants: {
    defaults: {
      padding: 'm',
      borderRadius: 'm',
      borderWidth: 1,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    info: {
      backgroundColor: 'primaryLight',
      borderColor: 'primary',
    },
    success: {
      backgroundColor: 'successLight',
      borderColor: 'success',
    },
    warning: {
      backgroundColor: 'warningLight',
      borderColor: 'warning',
    },
    error: {
      backgroundColor: 'errorLight',
      borderColor: 'error',
    },
  },

  alertSizes: {
    sm: {
      paddingX: 's',
      paddingY: 's',
      gap: 's',
      iconSize: 16,
      radius: 'm',
      titleTextVariant: 'label',
      messageTextVariant: 'caption',
    },
    md: {
      paddingX: 'm',
      paddingY: 'm',
      gap: 's',
      iconSize: 18,
      radius: 'm',
      titleTextVariant: 'label',
      messageTextVariant: 'body',
    },
  },

  accordionVariants: {
    defaults: {},
    outline: {
      borderWidth: 1,
      borderColor: 'border',
      borderRadius: 'm',
      overflow: 'hidden' as const,
    },
    filled: {
      borderWidth: 1,
      borderColor: 'border',
      borderRadius: 'm',
      overflow: 'hidden' as const,
    },
    separated: {
      gap: 's',
    },
  },

  accordionItemVariants: {
    defaults: {},
    separated: {
      borderWidth: 1,
      borderColor: 'border',
      borderRadius: 'm',
      overflow: 'hidden' as const,
    },
  },

  accordionHeaderVariants: {
    defaults: {},
    filled: {
      backgroundColor: 'primaryLight',
    },
  },
});

export default darkTheme;
