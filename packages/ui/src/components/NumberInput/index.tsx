import { useMemo } from 'react';
import { Pressable } from 'react-native';
import Input from '../Input';
import type { InputProps } from '../Input';
import Box from '../Box';
import Text from '../Text';

const sizeMap = {
  sm: { buttonSize: 28, fontSize: 16 },
  md: { buttonSize: 36, fontSize: 20 },
  lg: { buttonSize: 44, fontSize: 24 },
};

export interface NumberInputProps extends Omit<
  InputProps,
  'value' | 'onChangeText' | 'keyboardType' | 'onChange'
> {
  /** 当前数值 */
  value?: number;
  /** 数值变更回调 */
  onChange?: (value: number) => void;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步进值，默认 1 */
  step?: number;
}

/**
 * 数字输入框组件
 * 带 +/- 按钮的数字输入
 */
function NumberInput({
  value = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  size = 'md',
  isDisabled = false,
  ...rest
}: NumberInputProps) {
  const s = sizeMap[size];
  const stepButtonBoxStyle = useMemo(
    () => ({
      width: s.buttonSize,
      height: s.buttonSize,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    }),
    [s.buttonSize],
  );

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const handleDecrement = () => {
    if (!isDisabled) {
      onChange?.(clamp(value - step));
    }
  };

  const handleIncrement = () => {
    if (!isDisabled) {
      onChange?.(clamp(value + step));
    }
  };

  const handleChangeText = (text: string) => {
    const num = Number(text);
    if (!isNaN(num)) {
      onChange?.(clamp(num));
    }
  };

  const StepButton = ({
    label,
    onPress,
    disabled,
  }: {
    label: string;
    onPress: () => void;
    disabled: boolean;
  }) => (
    <Pressable onPress={onPress} disabled={disabled || isDisabled}>
      <Box style={stepButtonBoxStyle} opacity={disabled || isDisabled ? 0.3 : 1}>
        <Text fontSize={s.fontSize} color="primary" fontWeight="600">
          {label}
        </Text>
      </Box>
    </Pressable>
  );

  return (
    <Input
      value={String(value)}
      onChangeText={handleChangeText}
      keyboardType="numeric"
      size={size}
      isDisabled={isDisabled}
      leftElement={<StepButton label="−" onPress={handleDecrement} disabled={value <= min} />}
      rightElement={<StepButton label="+" onPress={handleIncrement} disabled={value >= max} />}
      {...rest}
    />
  );
}

export default NumberInput;
