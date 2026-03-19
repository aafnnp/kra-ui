import { useMemo, useRef, useCallback } from 'react';
import { TextInput, Pressable } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import type { BoxProps } from '../Box';

const sizeMap = {
  sm: { box: 36, fontSize: 16 },
  md: { box: 44, fontSize: 20 },
  lg: { box: 52, fontSize: 24 },
};

export interface PinInputProps extends BoxProps {
  /** PIN 码位数，默认 4 */
  length?: number;
  /** 当前值 */
  value?: string;
  /** 值变更回调 */
  onChange?: (value: string) => void;
  /** 完成回调（所有位数输入完成时触发） */
  onComplete?: (value: string) => void;
  /** 是否掩码显示 */
  mask?: boolean;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  isDisabled?: boolean;
}

/**
 * PIN 码输入组件
 * 多个单字符输入框，自动聚焦切换
 */
function PinInput({
  length = 4,
  value = '',
  onChange,
  onComplete,
  mask = false,
  size = 'md',
  isDisabled = false,
  ...rest
}: PinInputProps) {
  const theme = useTheme<Theme>();
  const s = sizeMap[size];
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const inputStyle = useMemo(
    () => ({
      fontSize: s.fontSize,
      color: theme.colors.textPrimary,
      textAlign: 'center' as const,
      width: '100%' as const,
      height: '100%' as const,
      padding: 0,
    }),
    [s.fontSize, theme.colors.textPrimary],
  );

  const chars = value.split('').slice(0, length);
  while (chars.length < length) {
    chars.push('');
  }

  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus();
      }
    },
    [length],
  );

  const handleChange = useCallback(
    (text: string, index: number) => {
      const char = text.slice(-1);
      const newChars = [...chars];
      newChars[index] = char;
      const newValue = newChars.join('');

      onChange?.(newValue);

      if (char && index < length - 1) {
        focusInput(index + 1);
      }

      if (newChars.length === length && newChars.every(Boolean)) {
        onComplete?.(newValue);
      }
    },
    [chars, length, onChange, onComplete, focusInput],
  );

  const handleKeyPress = useCallback(
    (e: { nativeEvent: { key: string } }, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !chars[index] && index > 0) {
        focusInput(index - 1);
      }
    },
    [chars, focusInput],
  );

  return (
    <Box flexDirection="row" {...rest}>
      {chars.map((char, index) => (
        <Pressable key={index} onPress={() => focusInput(index)}>
          <Box
            width={s.box}
            height={s.box}
            borderWidth={2}
            borderColor={char ? 'borderFocus' : 'border'}
            borderRadius="m"
            alignItems="center"
            justifyContent="center"
            marginRight={index < length - 1 ? 's' : undefined}
            opacity={isDisabled ? 0.5 : 1}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              value={mask && char ? '●' : char}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={2}
              editable={!isDisabled}
              selectTextOnFocus
              style={inputStyle}
            />
          </Box>
        </Pressable>
      ))}
    </Box>
  );
}

export default PinInput;
