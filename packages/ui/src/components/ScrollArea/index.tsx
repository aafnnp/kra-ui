import { ScrollView, type ScrollViewProps } from 'react-native';
import Box from '../Box';
import type { BoxProps } from '../Box';

export interface ScrollAreaProps extends BoxProps {
  /** 滚动方向，默认 vertical */
  direction?: 'horizontal' | 'vertical';
  /** 是否显示滚动条，默认 true */
  showsScrollIndicator?: boolean;
  /** ScrollView 原生属性 */
  scrollViewProps?: Omit<ScrollViewProps, 'horizontal' | 'showsHorizontalScrollIndicator' | 'showsVerticalScrollIndicator'>;
}

/**
 * 滚动区域组件
 * 基于 ScrollView 封装，支持水平和垂直滚动
 */
function ScrollArea({
  direction = 'vertical',
  showsScrollIndicator = true,
  scrollViewProps,
  children,
  ...rest
}: ScrollAreaProps) {
  const isHorizontal = direction === 'horizontal';

  return (
    <Box {...rest}>
      <ScrollView
        horizontal={isHorizontal}
        showsHorizontalScrollIndicator={isHorizontal && showsScrollIndicator}
        showsVerticalScrollIndicator={!isHorizontal && showsScrollIndicator}
        {...scrollViewProps}>
        {children}
      </ScrollView>
    </Box>
  );
}

export default ScrollArea;
