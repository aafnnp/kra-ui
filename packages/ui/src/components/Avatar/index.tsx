import { useCallback, useMemo, useState } from 'react';
import { Image, Pressable, type ImageSourcePropType, type ImageStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Center from '../Center';
import Text from '../Text';
import type { BoxProps } from '../Box';

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

function resolveAvatarSizes(theme: Theme, size: AvatarProps['size']) {
  const fallback = {
    dimension: 48,
    fontSize: 18,
    statusSize: 10,
  };
  const config = (size ? theme.avatarSizes?.[size] : undefined) ?? fallback;
  const dimension = typeof config.dimension === 'number' ? config.dimension : fallback.dimension;
  const fontSize = typeof config.fontSize === 'number' ? config.fontSize : fallback.fontSize;
  const statusSize =
    typeof config.statusSize === 'number' ? config.statusSize : fallback.statusSize;
  return { dimension, fontSize, statusSize };
}

function getA11yProps(onPress: AvatarProps['onPress'], label: string) {
  return onPress ? {} : { accessibilityRole: 'image' as const, accessibilityLabel: label };
}

function StatusBadge({
  status,
  statusSize,
}: {
  status: NonNullable<AvatarProps['status']>;
  statusSize: number;
}) {
  const theme = useTheme<Theme>();
  const backgroundColorKey = (theme.avatarStatusColors?.[status] ??
    'success') as keyof Theme['colors'];
  const borderColorKey = (
    theme.colors.mainBackground ? 'mainBackground' : 'cardBackground'
  ) as keyof Theme['colors'];

  return (
    <Box
      position="absolute"
      bottom={0}
      right={0}
      width={statusSize}
      height={statusSize}
      backgroundColor={backgroundColorKey}
      borderWidth={1}
      borderColor={borderColorKey}
      style={{ borderRadius: statusSize / 2 }}
      accessibilityLabel={STATUS_LABELS[status] ?? status}
      accessible
    />
  );
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

  const { dimension, fontSize, statusSize } = useMemo(
    () => resolveAvatarSizes(theme, size),
    [size, theme],
  );

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

  const a11yProps = getA11yProps(onPress, label);

  const imageStyle: ImageStyle = useMemo(
    () => ({ width: dimension, height: dimension }),
    [dimension],
  );

  const content = (
    <Center
      width={dimension}
      height={dimension}
      borderRadius="full"
      backgroundColor="primaryLight"
      overflow="hidden"
      {...a11yProps}
      {...rest}
    >
      {showImage ? (
        <Image source={source!} style={imageStyle} resizeMode="cover" onError={handleImageError} />
      ) : (
        <Text fontSize={fontSize} fontWeight="600" color="primary">
          {initials}
        </Text>
      )}
      {status ? <StatusBadge status={status} statusSize={statusSize} /> : null}
    </Center>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        disabled={isDisabled}
        accessibilityRole="imagebutton"
        accessibilityLabel={label}
        accessibilityState={{ disabled: isDisabled }}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

export default Avatar;
