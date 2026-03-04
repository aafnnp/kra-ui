import React from 'react';
import {Image, type ImageSourcePropType} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Center from '../Center';
import Text from '../Text';
import type {BoxProps} from '../Box';

const sizeMap = {
  xs: 24,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const fontSizeMap = {
  xs: 10,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 36,
};

export interface AvatarProps extends BoxProps {
  /** 图片源 */
  source?: ImageSourcePropType;
  /** 尺寸 */
  size?: keyof typeof sizeMap;
  /** 名称 (无图片时显示首字母) */
  name?: string;
}

/**
 * 头像组件
 * 支持图片显示和名称首字母回退
 */
function Avatar({source, size = 'md', name, ...rest}: AvatarProps) {
  const theme = useTheme<Theme>();
  const dimension = sizeMap[size];
  const fontSize = fontSizeMap[size];

  const initials = name
    ? name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <Center
      width={dimension}
      height={dimension}
      borderRadius="full"
      backgroundColor="primaryLight"
      overflow="hidden"
      {...rest}>
      {source ? (
        <Image
          source={source}
          style={{width: dimension, height: dimension}}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            fontSize,
            fontWeight: '600',
            color: theme.colors.primary,
          }}>
          {initials}
        </Text>
      )}
    </Center>
  );
}

export default Avatar;
