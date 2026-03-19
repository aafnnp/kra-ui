import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

export interface RatingProps extends BoxProps {
  /** 当前评分值 */
  value?: number;
  /** 评分变更回调 */
  onChange?: (value: number) => void;
  /** 星星数量，默认 5 */
  count?: number;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否只读 */
  readonly?: boolean;
}

/**
 * 评分组件
 * 支持星级评分交互
 */
function Rating({
  value = 0,
  onChange,
  count = 5,
  size = 'md',
  readonly = false,
  ...rest
}: RatingProps) {
  useTheme<Theme>();
  const fontSize = sizeMap[size];

  return (
    <Box flexDirection="row" alignItems="center" {...rest}>
      {Array.from({ length: count }, (_, index) => {
        const starIndex = index + 1;
        const isActive = starIndex <= value;

        return (
          <Pressable
            key={index}
            onPress={() => !readonly && onChange?.(starIndex)}
            disabled={readonly}
            accessibilityRole="button"
            accessibilityLabel={`${starIndex} 星`}
          >
            <Text
              fontSize={fontSize}
              color={isActive ? 'ratingActive' : 'ratingInactive'}
              style={styles.star}
            >
              ★
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}

const styles = StyleSheet.create({
  star: {
    marginRight: 2,
  },
});

export default Rating;
