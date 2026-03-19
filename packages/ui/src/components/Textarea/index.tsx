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

type TextareaContainerProps = VariantProps<Theme, 'inputVariants'> &
  React.ComponentProps<typeof Box>;

const TextareaContainer = createRestyleComponent<TextareaContainerProps, Theme>(
  [createVariant({ themeKey: 'inputVariants' }), spacing, border, backgroundColor],
  Box,
);

export interface TextareaProps extends BoxProps, Omit<TextInputProps, 'style'> {
  /** 变体 */
  variant?: 'outline' | 'filled' | 'underline';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 行数，默认 3 */
  rows?: number;
  /** 是否无效 */
  isInvalid?: boolean;
  /** 是否禁用 */
  isDisabled?: boolean;
}

/**
 * 多行文本输入组件
 * 复用 inputVariants 主题变体
 */
function Textarea({
  variant = 'outline',
  size = 'md',
  rows = 3,
  isInvalid = false,
  isDisabled = false,
  placeholder,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...rest
}: TextareaProps) {
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
      }
    | undefined;

  const sizeTokens = theme.inputSizes?.[size];
  const fontSize = sizeTokens?.fontSize ?? 16;
  const lineHeight = Math.round(fontSize * 1.5);
  const minHeight = lineHeight * rows + theme.spacing.m;

  return (
    <TextareaContainer
      variant={variant}
      opacity={isDisabled ? 0.5 : 1}
      style={{
        minHeight,
        borderColor: stateTokens?.borderColor,
        backgroundColor: stateTokens?.backgroundColor,
      }}
      {...rest}
    >
      <TextInput
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
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
          fontSize,
          lineHeight,
          color: stateTokens?.textColor
            ? theme.colors[stateTokens.textColor]
            : theme.colors.textPrimary,
          paddingVertical: theme.spacing.s,
        }}
      />
    </TextareaContainer>
  );
}

export default Textarea;
