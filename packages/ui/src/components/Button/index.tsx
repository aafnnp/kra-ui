import React from 'react';
import { ActivityIndicator, type PressableProps } from 'react-native';
import {
  backgroundColor,
  border,
  createRestyleComponent,
  createVariant,
  spacing,
  useTheme,
  type VariantProps,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';
import { InteractivePressable } from '../_shared/pressable';
import { getAccessibilityLabel } from '../_shared/a11y';
import { normalizeInteractiveState } from '../_shared/state';

type ButtonContainerProps = VariantProps<Theme, 'buttonVariants'> &
  React.ComponentProps<typeof Box>;

const ButtonContainer = createRestyleComponent<ButtonContainerProps, Theme>(
  [createVariant({ themeKey: 'buttonVariants' }), spacing, backgroundColor, border],
  Box,
);

export interface ButtonProps extends BoxProps {
  /** 按钮文字 */
  label: string;
  /** 变体 */
  variant?: 'filled' | 'outline' | 'ghost' | 'danger';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 加载状态 */
  isLoading?: boolean;
  /** 是否禁用 */
  isDisabled?: boolean;
  /** 点击事件 */
  onPress?: PressableProps['onPress'];
  /** 无障碍标签（默认使用 label） */
  accessibilityLabel?: string;
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
  isLoading = false,
  isDisabled = false,
  onPress,
  accessibilityLabel,
  ...rest
}: ButtonProps) {
  const theme = useTheme<Theme>();
  const sizeStyle = theme.buttonSizes[size];

  const isOutlineOrGhost = variant === 'outline' || variant === 'ghost';
  const textColor = isOutlineOrGhost ? theme.colors.primary : theme.colors.textInverse;

  const normalized = normalizeInteractiveState({ isDisabled, isLoading });

  return (
    <InteractivePressable
      onPress={onPress}
      isDisabled={isDisabled}
      isLoading={isLoading}
      accessibilityRole="button"
      accessibilityLabel={getAccessibilityLabel({ label, accessibilityLabel })}
      accessibilityState={normalized.accessibilityState}
    >
      <ButtonContainer
        variant={variant}
        paddingVertical={sizeStyle.paddingVertical}
        paddingHorizontal={sizeStyle.paddingHorizontal}
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        {...rest}
      >
        {isLoading && (
          <Box marginRight="s">
            <ActivityIndicator size="small" color={textColor} />
          </Box>
        )}
        <Text style={{ color: textColor, fontSize: sizeStyle.fontSize, fontWeight: '600' }}>
          {label}
        </Text>
      </ButtonContainer>
    </InteractivePressable>
  );
}

export default Button;
