import React from 'react';
import {ActivityIndicator, Pressable, type PressableProps, type ViewStyle} from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  spacing,
  backgroundColor,
  border,
  useTheme,
  type SpacingProps,
  type BackgroundColorProps,
  type BorderProps,
  type VariantProps,
} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

type ButtonContainerProps = VariantProps<Theme, 'buttonVariants'> &
  React.ComponentProps<typeof Box>;

const ButtonContainer = createRestyleComponent<ButtonContainerProps, Theme>(
  [createVariant({themeKey: 'buttonVariants'}), spacing, backgroundColor, border],
  Box,
);

const sizeMap: Record<string, {paddingVertical: number; paddingHorizontal: number; fontSize: number}> = {
  sm: {paddingVertical: 4, paddingHorizontal: 12, fontSize: 14},
  md: {paddingVertical: 8, paddingHorizontal: 16, fontSize: 16},
  lg: {paddingVertical: 12, paddingHorizontal: 24, fontSize: 18},
};

export interface ButtonProps extends BoxProps {
  /** 按钮文字 */
  label: string;
  /** 变体 */
  variant?: 'filled' | 'outline' | 'ghost' | 'danger';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 加载状态 */
  loading?: boolean;
  /** 是否禁用 */
  isDisabled?: boolean;
  /** 点击事件 */
  onPress?: PressableProps['onPress'];
}

/**
 * 按钮组件
 * 支持 variant: filled, outline, ghost, danger
 * 支持 size: sm, md, lg
 */
function Button({
  label,
  variant = 'filled',
  size = 'md',
  loading = false,
  isDisabled = false,
  onPress,
  ...rest
}: ButtonProps) {
  const theme = useTheme<Theme>();
  const sizeStyle = sizeMap[size];

  const isOutlineOrGhost = variant === 'outline' || variant === 'ghost';
  const textColor = isOutlineOrGhost
    ? theme.colors.primary
    : theme.colors.textInverse;

  const pressableStyle: ViewStyle = {
    paddingVertical: sizeStyle.paddingVertical,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: isDisabled ? 0.5 : 1,
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled || loading}
      accessibilityRole="button"
      accessibilityState={{disabled: isDisabled || loading}}>
      <ButtonContainer variant={variant} style={pressableStyle} {...rest}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={{marginRight: 8}}
          />
        )}
        <Text style={{color: textColor, fontSize: sizeStyle.fontSize, fontWeight: '600'}}>
          {label}
        </Text>
      </ButtonContainer>
    </Pressable>
  );
}

export default Button;
