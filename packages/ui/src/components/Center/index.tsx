import React from 'react';
import Box from '../Box';
import type {BoxProps} from '../Box';

export type CenterProps = BoxProps;

/**
 * 居中布局容器
 * 子元素在水平和垂直方向上居中
 */
function Center({children, ...rest}: CenterProps) {
  return (
    <Box alignItems="center" justifyContent="center" {...rest}>
      {children}
    </Box>
  );
}

export default Center;
