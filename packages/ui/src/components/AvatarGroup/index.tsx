import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Avatar from '../Avatar';
import Center from '../Center';
import Text from '../Text';
import Flex from '../Flex';
import type {BoxProps} from '../Box';

export interface AvatarGroupProps extends BoxProps {
  /** 统一子头像尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 最多显示数量，超出显示 +N */
  max?: number;
  /** 叠放间距 */
  spacing?: 'tight' | 'normal';
}

/**
 * 头像组
 * 横向叠放，超出 max 时显示 +N
 */
function AvatarGroup({
  size = 'md',
  max = 4,
  spacing = 'normal',
  children,
  ...rest
}: AvatarGroupProps) {
  const theme = useTheme<Theme>();
  const sizes = theme.avatarSizes?.[size] ?? {
    dimension: 48,
    ringWidth: 2,
    gap: 8,
  };
  const dimension = typeof sizes.dimension === 'number' ? sizes.dimension : 48;
  const ringWidth = typeof sizes.ringWidth === 'number' ? sizes.ringWidth : 2;
  const gap = typeof sizes.gap === 'number' ? sizes.gap : 8;
  const overlap = spacing === 'tight' ? ringWidth + 2 : ringWidth + gap / 2;

  const childArray = React.Children.toArray(children).filter(
    (c): c is React.ReactElement => React.isValidElement(c),
  );
  const visible = childArray.slice(0, max);
  const extra = Math.max(0, childArray.length - max);

  return (
    <Flex flexDirection="row" alignItems="center" {...rest}>
      {visible.map((child, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : -overlap,
            borderWidth: ringWidth,
            borderColor: theme.colors.mainBackground ?? theme.colors.cardBackground,
            borderRadius: dimension / 2 + ringWidth,
          }}>
          {React.isValidElement(child) && child.type === Avatar
            ? React.cloneElement(child as React.ReactElement<{size?: string}>, {
                size,
              })
            : child}
        </View>
      ))}
      {extra > 0 && (
        <View
          style={{
            marginLeft: -overlap,
            borderWidth: ringWidth,
            borderColor: theme.colors.mainBackground ?? theme.colors.cardBackground,
            borderRadius: dimension / 2 + ringWidth,
          }}
          accessibilityLabel={`还有 ${extra} 个头像`}
          accessible>
          <Center
            width={dimension}
            height={dimension}
            borderRadius="full"
            backgroundColor="primaryLight">
            <Text
              style={{
                fontSize: (sizes as {fontSize?: number}).fontSize ?? 18,
                fontWeight: '600',
                color: theme.colors.primary,
              }}>
              +{extra}
            </Text>
          </Center>
        </View>
      )}
    </Flex>
  );
}

export default AvatarGroup;
