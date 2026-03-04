import React from 'react';
import Box from '../Box';
import type {BoxProps} from '../Box';

export interface DividerProps extends Omit<BoxProps, 'height' | 'width'> {
  /** 方向：水平或垂直 */
  orientation?: 'horizontal' | 'vertical';
  /** 分割线粗细 */
  thickness?: number;
}

/**
 * 分割线组件
 */
function Divider({
  orientation = 'horizontal',
  thickness = 1,
  ...rest
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <Box
      backgroundColor="divider"
      height={isHorizontal ? thickness : undefined}
      width={!isHorizontal ? thickness : undefined}
      alignSelf="stretch"
      marginVertical={isHorizontal ? 's' : undefined}
      marginHorizontal={!isHorizontal ? 's' : undefined}
      {...rest}
    />
  );
}

export default Divider;
