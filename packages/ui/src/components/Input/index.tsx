import React, {useState} from 'react';
import {TextInput, type TextInputProps} from 'react-native';
import {
  createRestyleComponent,
  createVariant,
  spacing,
  border,
  backgroundColor,
  useTheme,
  type VariantProps,
} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import type {BoxProps} from '../Box';

type InputContainerProps = VariantProps<Theme, 'inputVariants'> &
  React.ComponentProps<typeof Box>;

const InputContainer = createRestyleComponent<InputContainerProps, Theme>(
  [createVariant({themeKey: 'inputVariants'}), spacing, border, backgroundColor],
  Box,
);

const sizeMap = {
  sm: {height: 36, fontSize: 14},
  md: {height: 44, fontSize: 16},
  lg: {height: 52, fontSize: 18},
};

export interface InputProps extends BoxProps, Omit<TextInputProps, 'style'> {
  /** 变体 */
  variant?: 'outline' | 'filled' | 'underline';
  /** 尺寸 */
  size?: keyof typeof sizeMap;
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
  const sizeStyle = sizeMap[size];

  return (
    <InputContainer
      variant={variant}
      flexDirection="row"
      alignItems="center"
      opacity={isDisabled ? 0.5 : 1}
      style={{
        height: sizeStyle.height,
        borderColor: isInvalid
          ? theme.colors.error
          : isFocused
            ? theme.colors.borderFocus
            : undefined,
      }}
      {...rest}>
      {leftElement}
      <TextInput
        editable={!isDisabled}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={e => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        style={{
          flex: 1,
          fontSize: sizeStyle.fontSize,
          color: theme.colors.textPrimary,
          paddingVertical: 0,
        }}
      />
      {rightElement}
    </InputContainer>
  );
}

export default Input;
