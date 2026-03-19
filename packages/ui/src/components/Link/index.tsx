import { useMemo } from 'react';
import { Linking, Pressable } from 'react-native';
import Text from '../Text';
import type { TextProps } from '../Text';

export interface LinkProps extends TextProps {
  /** 链接地址 */
  href?: string;
  /** 是否使用系统浏览器打开，默认 true */
  isExternal?: boolean;
  /** 点击回调 */
  onPress?: () => void;
}

/**
 * 链接组件
 * 支持外部链接跳转
 */
function Link({ href, isExternal = true, onPress, children, style, ...rest }: LinkProps) {
  const underlineStyle = useMemo(() => ({ textDecorationLine: 'underline' as const }), []);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (href && isExternal) {
      Linking.openURL(href);
    }
  };

  return (
    <Pressable onPress={handlePress} accessibilityRole="link">
      <Text color="link" style={[underlineStyle, style]} {...rest}>
        {children}
      </Text>
    </Pressable>
  );
}

export default Link;
