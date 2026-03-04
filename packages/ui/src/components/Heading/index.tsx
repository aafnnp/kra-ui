import React from 'react';
import Text from '../Text';
import type {TextProps} from '../Text';

const sizeMap = {
  h1: {fontSize: 36, lineHeight: 44, fontWeight: 'bold' as const},
  h2: {fontSize: 30, lineHeight: 38, fontWeight: 'bold' as const},
  h3: {fontSize: 24, lineHeight: 32, fontWeight: '600' as const},
  h4: {fontSize: 20, lineHeight: 28, fontWeight: '600' as const},
  h5: {fontSize: 16, lineHeight: 24, fontWeight: '600' as const},
  h6: {fontSize: 14, lineHeight: 20, fontWeight: '600' as const},
};

export interface HeadingProps extends TextProps {
  /** 标题级别 h1-h6 */
  size?: keyof typeof sizeMap;
}

/**
 * 标题组件
 * 支持 h1-h6 六个级别
 */
function Heading({size = 'h2', style, children, ...rest}: HeadingProps) {
  const sizeStyle = sizeMap[size];

  return (
    <Text
      color="textPrimary"
      style={[sizeStyle, style]}
      accessibilityRole="header"
      {...rest}>
      {children}
    </Text>
  );
}

export default Heading;
