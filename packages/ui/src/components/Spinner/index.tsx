import React from 'react';
import {ActivityIndicator, type ActivityIndicatorProps} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Center from '../Center';
import type {BoxProps} from '../Box';

const sizeMap = {
  sm: 'small' as const,
  lg: 'large' as const,
};

export interface SpinnerProps extends BoxProps {
  /** 尺寸 */
  size?: keyof typeof sizeMap;
  /** 颜色，对应主题色键名 */
  colorKey?: keyof Theme['colors'];
  /** 原生 ActivityIndicator 属性 */
  indicatorProps?: Omit<ActivityIndicatorProps, 'size' | 'color'>;
}

/**
 * 加载指示器组件
 */
function Spinner({
  size = 'sm',
  colorKey = 'primary',
  indicatorProps,
  ...rest
}: SpinnerProps) {
  const theme = useTheme<Theme>();

  return (
    <Center {...rest}>
      <ActivityIndicator
        size={sizeMap[size]}
        color={theme.colors[colorKey]}
        {...indicatorProps}
      />
    </Center>
  );
}

export default Spinner;
