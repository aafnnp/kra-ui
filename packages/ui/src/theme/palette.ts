/**
 * 调色板 - 参考 Chakra UI 色彩系统
 * 每个色系包含 50-900 共 10 个色阶
 */
export const palette = {
  // 灰色系
  gray50: '#F7FAFC',
  gray100: '#EDF2F7',
  gray200: '#E2E8F0',
  gray300: '#CBD5E0',
  gray400: '#A0AEC0',
  gray500: '#718096',
  gray600: '#4A5568',
  gray700: '#2D3748',
  gray800: '#1A202C',
  gray900: '#171923',

  // 主色 (蓝色系)
  primary50: '#EBF8FF',
  primary100: '#BEE3F8',
  primary200: '#90CDF4',
  primary300: '#63B3ED',
  primary400: '#4299E1',
  primary500: '#3182CE',
  primary600: '#2B6CB0',
  primary700: '#2C5282',
  primary800: '#2A4365',
  primary900: '#1A365D',

  // 次色 (紫色系)
  secondary50: '#FAF5FF',
  secondary100: '#E9D8FD',
  secondary200: '#D6BCFA',
  secondary300: '#B794F4',
  secondary400: '#9F7AEA',
  secondary500: '#805AD5',
  secondary600: '#6B46C1',
  secondary700: '#553C9A',
  secondary800: '#44337A',
  secondary900: '#322659',

  // 成功 (绿色系)
  success50: '#F0FFF4',
  success100: '#C6F6D5',
  success200: '#9AE6B4',
  success300: '#68D391',
  success400: '#48BB78',
  success500: '#38A169',
  success600: '#2F855A',
  success700: '#276749',
  success800: '#22543D',
  success900: '#1C4532',

  // 警告 (橙色系)
  warning50: '#FFFAF0',
  warning100: '#FEEBC8',
  warning200: '#FBD38D',
  warning300: '#F6AD55',
  warning400: '#ED8936',
  warning500: '#DD6B20',
  warning600: '#C05621',
  warning700: '#9C4221',
  warning800: '#7B341E',
  warning900: '#652B19',

  // 错误 (红色系)
  error50: '#FFF5F5',
  error100: '#FED7D7',
  error200: '#FEB2B2',
  error300: '#FC8181',
  error400: '#F56565',
  error500: '#E53E3E',
  error600: '#C53030',
  error700: '#9B2C2C',
  error800: '#822727',
  error900: '#63171B',

  // 纯色
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} satisfies Record<string, string>;
