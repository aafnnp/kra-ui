import React, { Children, useMemo } from 'react';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';
import type { Theme } from '../../theme';

export interface ListItemProps extends BoxProps {
  /** 列表项内容 */
  children: React.ReactNode;
}

/**
 * 列表项组件
 */
function ListItem({ children, ...rest }: ListItemProps) {
  return (
    <Box flexDirection="row" alignItems="flex-start" {...rest}>
      {children}
    </Box>
  );
}

export interface ListProps extends BoxProps {
  /** 列表类型：有序或无序 */
  type?: 'ordered' | 'unordered';
  /** 子元素间距，对应 theme.spacing 的键 */
  spacing?: keyof Theme['spacing'];
}

/**
 * 列表组件
 * 支持有序列表（数字）和无序列表（圆点）
 */
function List({ type = 'unordered', spacing = 'xs', children, ...rest }: ListProps) {
  const validChildren = Children.toArray(children).filter(Boolean);
  const markerWidth = type === 'ordered' ? 24 : 16;
  const markerStyle = useMemo(() => ({ width: markerWidth }), [markerWidth]);

  return (
    <Box {...rest}>
      {validChildren.map((child, index) => (
        <Box
          key={index}
          flexDirection="row"
          alignItems="flex-start"
          marginTop={index > 0 ? spacing : undefined}
        >
          <Text color="textSecondary" style={markerStyle} fontSize={14}>
            {type === 'ordered' ? `${index + 1}.` : '•'}
          </Text>
          <Box flex={1}>{child}</Box>
        </Box>
      ))}
    </Box>
  );
}

export { ListItem };
export default List;
