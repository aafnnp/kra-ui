import React, { useMemo, useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  spacing,
  border,
  backgroundColor,
  useTheme,
  type VariantProps,
} from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import type { BoxProps } from '../Box';
import { getAccessibilityLabel } from '../_shared/a11y';

type InputContainerProps = VariantProps<Theme, 'inputVariants'> & React.ComponentProps<typeof Box>;

const InputContainer = createRestyleComponent<InputContainerProps, Theme>(
  [createVariant({ themeKey: 'inputVariants' }), spacing, border, backgroundColor],
  Box,
);

export interface InputProps extends BoxProps, Omit<TextInputProps, 'style'> {
  /** 变体 */
  variant?: 'outline' | 'filled' | 'underline';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 左侧元素 */
  leftElement?: React.ReactNode;
  /** 右侧元素 */
  rightElement?: React.ReactNode;
  /** 是否无效 */
  isInvalid?: boolean;
  /** 是否禁用 */
  isDisabled?: boolean;
}

/**
 * 输入框组件
 * 支持 variant: outline, filled, underline
 * 支持 size: sm, md, lg
 */
function Input({
  variant = 'outline',
  size = 'md',
  leftElement,
  rightElement,
  isInvalid = false,
  isDisabled = false,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const theme = useTheme<Theme>();
  const [isFocused, setIsFocused] = useState(false);

  const a11yLabel = useMemo(
    () =>
      getAccessibilityLabel({
        label: placeholder,
        accessibilityLabel: rest.accessibilityLabel,
      }),
    [placeholder, rest.accessibilityLabel],
  );

  const stateKey = isDisabled
    ? 'disabled'
    : isInvalid
      ? 'invalid'
      : isFocused
        ? 'focus'
        : 'default';
  const stateTokens = theme.inputStates?.[stateKey] as
    | {
        borderColor?: keyof Theme['colors'];
        backgroundColor?: keyof Theme['colors'];
        textColor?: keyof Theme['colors'];
        iconColor?: keyof Theme['colors'];
      }
    | undefined;
  const sizeTokens = theme.inputSizes?.[size];

  return (
    <InputContainer
      variant={variant}
      flexDirection="row"
      alignItems="center"
      opacity={isDisabled ? 0.5 : 1}
      style={{
        height: sizeTokens?.height,
        borderColor: stateTokens?.borderColor,
        backgroundColor: stateTokens?.backgroundColor,
      }}
      {...rest}
    >
      {leftElement}
      <TextInput
        editable={!isDisabled}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={a11yLabel}
        accessibilityState={{ disabled: isDisabled }}
        accessibilityHint={isInvalid ? '输入无效' : undefined}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={{
          flex: 1,
          fontSize: sizeTokens?.fontSize ?? 16,
          color: stateTokens?.textColor
            ? theme.colors[stateTokens.textColor]
            : theme.colors.textPrimary,
          paddingVertical: 0,
        }}
      />
      {rightElement}
    </InputContainer>
  );
}

export default Input;
