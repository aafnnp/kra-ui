import React from 'react';
import {
  createRestyleComponent,
  createVariant,
  type VariantProps,
} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

const BadgeContainer = createRestyleComponent<
  VariantProps<Theme, 'badgeVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'badgeVariants'})], Box);

export interface BadgeProps extends BoxProps {
  /** 变体 */
  variant?: 'solid' | 'subtle' | 'outline';
  /** 颜色方案 (预留，目前使用主题色) */
  colorScheme?: 'primary' | 'success' | 'warning' | 'error';
  /** 标签文字 */
  label: string;
}

/**
 * 徽章组件
 * 支持 variant: solid, subtle, outline
 */
function Badge({variant = 'subtle', label, ...rest}: BadgeProps) {
  const isSolid = variant === 'solid';

  return (
    <BadgeContainer
      variant={variant}
      alignSelf="flex-start"
      {...rest}>
      <Text
        fontSize={12}
        fontWeight="600"
        color={isSolid ? 'textInverse' : 'primary'}>
        {label}
      </Text>
    </BadgeContainer>
  );
}

export default Badge;
