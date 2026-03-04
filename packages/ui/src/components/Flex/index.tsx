import React from 'react';
import Box from '../Box';
import type {BoxProps} from '../Box';

export interface FlexProps extends BoxProps {
  /** 主轴方向，默认 row */
  direction?: BoxProps['flexDirection'];
  /** 对齐方式 */
  align?: BoxProps['alignItems'];
  /** 主轴对齐方式 */
  justify?: BoxProps['justifyContent'];
  /** 是否换行 */
  wrap?: BoxProps['flexWrap'];
}

/**
 * 弹性布局容器
 * 基于 Box 封装，默认 flexDirection="row"
 */
function Flex({
  direction = 'row',
  align,
  justify,
  wrap,
  children,
  ...rest
}: FlexProps) {
  return (
    <Box
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      {...rest}>
      {children}
    </Box>
  );
}

export default Flex;
