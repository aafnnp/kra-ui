import { useMemo } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';

const sizeMap = {
  sm: { box: 16, fontSize: 10, checkMark: '✓' },
  md: { box: 20, fontSize: 13, checkMark: '✓' },
  lg: { box: 24, fontSize: 16, checkMark: '✓' },
};

export interface CheckboxProps extends BoxProps {
  /** 是否选中 */
  isChecked?: boolean;
  /** 选中状态变更回调 */
  onChange?: (checked: boolean) => void;
  /** 标签文字 */
  label?: string;
  /** 是否禁用 */
  isDisabled?: boolean;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 复选框组件
 * 支持 size: sm, md, lg
 */
function Checkbox({
  isChecked = false,
  onChange,
  label,
  isDisabled = false,
  size = 'md',
  ...rest
}: CheckboxProps) {
  const theme = useTheme<Theme>();
  const s = sizeMap[size];
  const checkboxBoxStyle = useMemo(
    () => ({
      width: s.box,
      height: s.box,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: isChecked ? theme.colors.primary : theme.colors.border,
      backgroundColor: isChecked ? theme.colors.primary : theme.colors.transparent,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    }),
    [isChecked, s.box, theme.colors.border, theme.colors.primary, theme.colors.transparent],
  );

  return (
    <Pressable
      onPress={() => !isDisabled && onChange?.(!isChecked)}
      disabled={isDisabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled: isDisabled }}
    >
      <Box flexDirection="row" alignItems="center" opacity={isDisabled ? 0.5 : 1} {...rest}>
        <Box style={checkboxBoxStyle}>
          {isChecked && (
            <Text
              fontSize={s.fontSize}
              color="textInverse"
              fontWeight="bold"
              lineHeight={s.box - 2}
            >
              {s.checkMark}
            </Text>
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

export default Checkbox;
