import React from 'react';
import {
  createRestyleComponent,
  createVariant,
  type VariantProps,
} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import type {BoxProps} from '../Box';

const CardContainer = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

export interface CardProps extends BoxProps {
  /** 变体 */
  variant?: 'elevated' | 'outline' | 'filled';
}

/**
 * 卡片容器组件
 * 支持 variant: elevated, outline, filled
 */
function Card({variant = 'elevated', children, ...rest}: CardProps) {
  return (
    <CardContainer variant={variant} {...rest}>
      {children}
    </CardContainer>
  );
}

export default Card;
