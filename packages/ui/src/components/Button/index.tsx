import React from 'react';
import { ActivityIndicator, type PressableProps, type ViewStyle } from 'react-native';
import {
    createRestyleComponent,
    createVariant,
    spacing,
    backgroundColor,
    border,
    useTheme,
    type VariantProps,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';
import InteractivePressable from '../_shared/pressable';
import { normalizeInteractiveState } from '../_shared/state';

type ButtonContainerProps = VariantProps<Theme, 'buttonVariants'> &
  React.ComponentProps<typeof Box>;

const ButtonContainer = createRestyleComponent<ButtonContainerProps, Theme>(
  [createVariant({themeKey: 'buttonVariants'}), spacing, backgroundColor, border],
  Box,
);

export interface ButtonProps extends BoxProps {
  /** 按钮文字 */
  label: string;
  /** 变体 */
  variant?: 'filled' | 'outline' | 'ghost' | 'danger';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 加载状态（新规范） */
  isLoading?: boolean;
  /** @deprecated 请使用 isLoading */
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
  isLoading,
  loading,
  isDisabled = false,
  onPress,
  ...rest
}: ButtonProps) {
  const theme = useTheme<Theme>();
  const normalized = normalizeInteractiveState({
    isDisabled,
    isLoading,
    loading,
  });
  const sizeToken = theme.buttonSizes?.[size];
  const paddingX = sizeToken?.paddingX as keyof Theme['spacing'] | undefined;
  const paddingY = sizeToken?.paddingY as keyof Theme['spacing'] | undefined;
  const gap = (sizeToken?.gap ?? 's') as keyof Theme['spacing'];

  const isOutlineOrGhost = variant === 'outline' || variant === 'ghost';
  const textColor = isOutlineOrGhost
    ? theme.colors.primary
    : theme.colors.textInverse;

  const pressableStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    opacity: normalized.isDisabled ? 0.5 : 1,
  };

  return (
    <InteractivePressable
      onPress={onPress}
      isDisabled={normalized.isDisabled}
      isLoading={normalized.isLoading}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={pressableStyle}>
      <ButtonContainer
        variant={variant}
        paddingHorizontal={paddingX}
        paddingVertical={paddingY}
        style={pressableStyle}
        {...rest}>
        {normalized.isLoading && (
          <ActivityIndicator
            size="small"
            color={textColor}
            style={{marginRight: theme.spacing[gap]}}
          />
        )}
        <Text style={{color: textColor, fontSize: sizeToken?.fontSize ?? 16, fontWeight: '600'}}>
          {label}
        </Text>
      </ButtonContainer>
    </InteractivePressable>
  );
}

export default Button;
