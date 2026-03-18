import React, {useState, useCallback} from 'react';
import {Image, Pressable, View, type ImageSourcePropType} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Center from '../Center';
import Text from '../Text';
import type {BoxProps} from '../Box';

const STATUS_LABELS: Record<string, string> = {
  online: '在线',
  offline: '离线',
  busy: '忙碌',
  away: '离开',
};

/** 从 name 计算 initials，最多 2 个字符 */
function getInitials(name?: string): string {
  if (!name || !name.trim()) return '?';
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return trimmed.slice(0, 2);
}

export interface AvatarProps extends BoxProps {
  /** 图片源 */
  source?: ImageSourcePropType;
  /** 尺寸 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 名称 (无图片时显示首字母) */
  name?: string;
  /** 图片加载失败回调 */
  onImageError?: (e: unknown) => void;
  /** 点击回调 */
  onPress?: () => void;
  /** 是否禁用 */
  isDisabled?: boolean;
  /** 状态角标 */
  status?: 'online' | 'offline' | 'busy' | 'away';
}

/**
 * 头像组件
 * 支持图片显示和名称首字母回退
 */
function Avatar({
  source,
  size = 'md',
  name,
  onImageError,
  onPress,
  isDisabled = false,
  status,
  accessibilityLabel,
  ...rest
}: AvatarProps) {
  const theme = useTheme<Theme>();
  const [hasImageError, setHasImageError] = useState(false);

  const sizes = theme.avatarSizes?.[size] ?? {
    dimension: 48,
    fontSize: 18,
    statusSize: 10,
  };
  const dimension = typeof sizes.dimension === 'number' ? sizes.dimension : 48;
  const fontSize = typeof sizes.fontSize === 'number' ? sizes.fontSize : 18;
  const statusSize =
    typeof sizes.statusSize === 'number' ? sizes.statusSize : 10;

  const showImage = Boolean(source) && !hasImageError;
  const initials = getInitials(name);
  const label = accessibilityLabel ?? name ?? '头像';

  const handleImageError = useCallback(
    (e: unknown) => {
      setHasImageError(true);
      onImageError?.(e);
    },
    [onImageError],
  );

  const a11yProps =
    !onPress
      ? {accessibilityRole: 'image' as const, accessibilityLabel: label}
      : {};

  const content = (
    <Center
      width={dimension}
      height={dimension}
      borderRadius="full"
      backgroundColor="primaryLight"
      overflow="hidden"
      {...a11yProps}
      {...rest}>
      {showImage ? (
        <Image
          source={source!}
          style={{width: dimension, height: dimension}}
          resizeMode="cover"
          onError={handleImageError}
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
      {status && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: statusSize,
            height: statusSize,
            borderRadius: statusSize / 2,
            backgroundColor:
              theme.colors[
                (theme.avatarStatusColors?.[status] ?? 'success') as keyof Theme['colors']
              ],
            borderWidth: 1,
            borderColor: theme.colors.mainBackground ?? theme.colors.cardBackground,
          }}
          accessibilityLabel={STATUS_LABELS[status] ?? status}
          accessible
        />
      )}
    </Center>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        disabled={isDisabled}
        accessibilityRole="imagebutton"
        accessibilityLabel={label}
        accessibilityState={{disabled: isDisabled}}>
        {content}
      </Pressable>
    );
  }

  return content;
}

export default Avatar;
