import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';

const sizeMap = {
  sm: { paddingVertical: 4, paddingHorizontal: 12, fontSize: 13 },
  md: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 15 },
  lg: { paddingVertical: 12, paddingHorizontal: 20, fontSize: 17 },
};

export interface Segment {
  /** 显示文本 */
  label: string;
  /** 唯一值 */
  value: string;
}

export interface SegmentedControlProps extends BoxProps {
  /** 选项列表 */
  segments: Segment[];
  /** 当前选中值 */
  value?: string;
  /** 选中值变更回调 */
  onChange?: (value: string) => void;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 分段控制器组件
 * 类似 iOS UISegmentedControl
 */
function SegmentedControl({
  segments,
  value,
  onChange,
  size = 'md',
  ...rest
}: SegmentedControlProps) {
  const theme = useTheme<Theme>();
  const s = sizeMap[size];
  const segmentBoxStyle = useMemo(
    () => ({
      paddingVertical: s.paddingVertical,
      paddingHorizontal: s.paddingHorizontal,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    }),
    [s.paddingHorizontal, s.paddingVertical],
  );
  const shadowColorStyle = useMemo(
    () => ({ shadowColor: theme.colors.textPrimary }),
    [theme.colors.textPrimary],
  );

  return (
    <Box
      flexDirection="row"
      backgroundColor="segmentedBackground"
      borderRadius="m"
      padding="xs"
      {...rest}
    >
      {segments.map((segment) => {
        const isActive = segment.value === value;

        const activeShadowStyle = isActive ? [styles.activeShadow, shadowColorStyle] : undefined;
        return (
          <Pressable
            key={segment.value}
            onPress={() => onChange?.(segment.value)}
            style={styles.segment}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Box
              backgroundColor={isActive ? 'segmentedActiveBackground' : 'transparent'}
              borderRadius="s"
              style={[segmentBoxStyle, activeShadowStyle]}
            >
              <Text
                fontSize={s.fontSize}
                fontWeight={isActive ? '600' : '400'}
                color={isActive ? 'textPrimary' : 'textSecondary'}
              >
                {segment.label}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  activeShadow: {
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  segment: {
    flex: 1,
  },
});

export default SegmentedControl;
