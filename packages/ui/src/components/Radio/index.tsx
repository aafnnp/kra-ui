import { createContext, useContext, useMemo } from 'react';
import { Pressable } from 'react-native';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';

const sizeMap = {
  sm: { outer: 16, inner: 8 },
  md: { outer: 20, inner: 10 },
  lg: { outer: 24, inner: 12 },
};

interface RadioContextValue {
  value?: string;
  onChange?: (value: string) => void;
  size: 'sm' | 'md' | 'lg';
}

const RadioContext = createContext<RadioContextValue>({ size: 'md' });

export interface RadioGroupProps extends BoxProps {
  /** 当前选中值 */
  value?: string;
  /** 选中值变更回调 */
  onChange?: (value: string) => void;
  /** 排列方向，默认 column */
  direction?: 'row' | 'column';
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 单选组容器
 * 管理子 Radio 的选中状态
 */
function RadioGroup({
  value,
  onChange,
  direction = 'column',
  size = 'md',
  children,
  ...rest
}: RadioGroupProps) {
  return (
    <RadioContext.Provider value={{ value, onChange, size }}>
      <Box flexDirection={direction} {...rest}>
        {children}
      </Box>
    </RadioContext.Provider>
  );
}

export interface RadioProps extends BoxProps {
  /** 选项值 */
  value: string;
  /** 标签文字 */
  label?: string;
  /** 是否禁用 */
  isDisabled?: boolean;
}

/**
 * 单选项组件
 * 需配合 RadioGroup 使用
 */
function Radio({ value, label, isDisabled = false, ...rest }: RadioProps) {
  const { value: groupValue, onChange, size } = useContext(RadioContext);
  const isSelected = groupValue === value;
  const s = sizeMap[size];
  const outerStyle = useMemo(() => ({ borderRadius: s.outer / 2 }), [s.outer]);
  const innerStyle = useMemo(() => ({ borderRadius: s.inner / 2 }), [s.inner]);

  return (
    <Pressable
      onPress={() => !isDisabled && onChange?.(value)}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled: isDisabled }}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        opacity={isDisabled ? 0.5 : 1}
        marginBottom="xs"
        {...rest}
      >
        <Box
          width={s.outer}
          height={s.outer}
          borderWidth={2}
          borderColor={isSelected ? 'primary' : 'border'}
          alignItems="center"
          justifyContent="center"
          style={outerStyle}
        >
          {isSelected && (
            <Box width={s.inner} height={s.inner} backgroundColor="primary" style={innerStyle} />
          )}
        </Box>
        {label && (
          <Text variant="body" marginLeft="s">
            {label}
          </Text>
        )}
      </Box>
    </Pressable>
  );
}

export { RadioGroup };
export default Radio;
