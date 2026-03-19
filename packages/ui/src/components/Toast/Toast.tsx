import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Text from '../Text';
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from '../Icon/icons';
import { CloseIcon } from '../Icon/icons';
import type { IconProps } from '../Icon';
import type { ToastPlacement, ToastStatus } from './types';

const statusIconMap: Record<ToastStatus, React.FC<IconProps>> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: XCircleIcon,
};

export interface ToastProps {
  /** 是否显示 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 标题（可选） */
  title?: string;
  /** 提示内容 */
  message: string;
  /** 状态类型 */
  status?: ToastStatus;
  /** 自动关闭时间（毫秒），0 为不自动关闭 */
  duration?: number;
  /** 位置 */
  placement?: ToastPlacement;
  /** 是否可手动关闭 */
  closable?: boolean;
  /** 操作按钮文案（可选） */
  actionLabel?: string;
  /** 操作按钮点击回调（可选） */
  onActionPress?: () => void;
  /** 外层容器样式（用于堆叠定位等场景） */
  containerStyle?: StyleProp<ViewStyle>;
}

const TOAST_OFFSET = 60;

type ToastVariantTokens = {
  accentColor: keyof Theme['colors'];
  backgroundColor: keyof Theme['colors'];
  textColor: keyof Theme['colors'];
};

type ThemeWithToastVariants = Theme & {
  toastVariants?: Partial<Record<ToastStatus, ToastVariantTokens>>;
};

function getClosedTranslateY(placement: ToastPlacement) {
  return placement === 'top' ? -100 : 100;
}

function getPlacementOffsetStyle(placement: ToastPlacement) {
  return placement === 'top' ? styles.top : styles.bottom;
}

function ToastTitle({
  title,
  textColorKey,
}: {
  title?: string;
  textColorKey: keyof Theme['colors'];
}) {
  if (!title) return null;
  return (
    <Text style={styles.title} numberOfLines={1} color={textColorKey}>
      {title}
    </Text>
  );
}

function ToastActionButton({
  actionLabel,
  onActionPress,
  onClose,
}: {
  actionLabel?: string;
  onActionPress?: () => void;
  onClose: () => void;
}) {
  if (!actionLabel || !onActionPress) return null;
  return (
    <Pressable
      onPress={() => {
        onActionPress();
        onClose();
      }}
      hitSlop={8}
      style={styles.action}
    >
      <Text color="primary" numberOfLines={1}>
        {actionLabel}
      </Text>
    </Pressable>
  );
}

function ToastCloseButton({ closable, onClose }: { closable: boolean; onClose: () => void }) {
  if (!closable) return null;
  return (
    <Pressable onPress={onClose} hitSlop={8}>
      <CloseIcon size={14} color="textSecondary" />
    </Pressable>
  );
}

function useToastController({
  visible,
  placement,
  duration,
  onClose,
}: {
  visible: boolean;
  placement: ToastPlacement;
  duration: number;
  onClose: () => void;
}) {
  const translateY = useSharedValue(getClosedTranslateY(placement));
  const opacity = useSharedValue(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const animateIn = useCallback(() => {
    translateY.value = withSpring(0, { stiffness: 80, damping: 12 });
    opacity.value = withTiming(1, { duration: 200 });
  }, [translateY, opacity]);

  const animateOut = useCallback(
    (callback?: () => void) => {
      translateY.value = withTiming(getClosedTranslateY(placement), { duration: 200 });
      opacity.value = withTiming(0, { duration: 200 }, (finished) => {
        if (finished && callback) {
          runOnJS(callback)();
        }
      });
    },
    [opacity, placement, translateY],
  );

  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    animateOut(() => onClose());
  }, [animateOut, onClose]);

  useEffect(() => {
    if (!visible) return;

    translateY.value = getClosedTranslateY(placement);
    opacity.value = 0;
    animateIn();

    if (duration > 0) {
      timerRef.current = setTimeout(handleClose, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [animateIn, duration, handleClose, opacity, placement, translateY, visible]);

  return { animatedStyle, handleClose };
}

/**
 * 轻提示组件
 * 支持 status: info, success, warning, error
 * 支持自动关闭、位置配置、淡入滑出动画
 */
function ToastBase({
  visible,
  onClose,
  title,
  message,
  status = 'info',
  duration = 3000,
  placement = 'top',
  closable = true,
  actionLabel,
  onActionPress,
  containerStyle,
}: ToastProps) {
  const theme = useTheme<Theme>();
  const { width: screenWidth } = useWindowDimensions();
  const placementStyle = getPlacementOffsetStyle(placement);
  const { animatedStyle, handleClose } = useToastController({
    visible,
    placement,
    duration,
    onClose,
  });

  const variantTokens = (theme as ThemeWithToastVariants).toastVariants?.[status];
  const accentColorKey = variantTokens?.accentColor ?? 'primary';
  const backgroundColorKey = variantTokens?.backgroundColor ?? 'cardBackground';
  const textColorKey = variantTokens?.textColor ?? 'textPrimary';

  const StatusIcon = statusIconMap[status];
  const toastStyle = useMemo(
    () => [
      styles.toast,
      {
        width: screenWidth - 32,
        backgroundColor: theme.colors[backgroundColorKey] as string,
        borderLeftColor: theme.colors[accentColorKey] as string,
        shadowColor: theme.colors.textPrimary as string,
      },
    ],
    [accentColorKey, backgroundColorKey, screenWidth, theme.colors],
  );

  return (
    <Animated.View
      style={[styles.container, placementStyle, animatedStyle, containerStyle]}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={closable ? handleClose : undefined}
        testID="native-ui-toast"
        accessibilityRole="alert"
        accessibilityLabel={title ? `${title} ${message}` : message}
        style={toastStyle}
      >
        <StatusIcon size={18} color={accentColorKey} />
        <Pressable style={styles.content} pointerEvents="none">
          <ToastTitle title={title} textColorKey={textColorKey} />
          <Text style={styles.message} numberOfLines={title ? 1 : 2} color={textColorKey}>
            {message}
          </Text>
        </Pressable>
        <ToastActionButton
          actionLabel={actionLabel}
          onActionPress={onActionPress}
          onClose={handleClose}
        />
        <ToastCloseButton closable={closable} onClose={handleClose} />
      </Pressable>
    </Animated.View>
  );
}

function Toast(props: ToastProps) {
  if (!props.visible) return null;
  return <ToastBase {...props} />;
}

const styles = StyleSheet.create({
  action: {
    marginRight: 8,
  },
  bottom: {
    bottom: TOAST_OFFSET,
  },
  container: {
    alignItems: 'center',
    left: 16,
    position: 'absolute',
    right: 16,
    zIndex: 9999,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  message: {
    fontSize: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  toast: {
    alignItems: 'center',
    borderLeftWidth: 4,
    borderRadius: 12,
    elevation: 6,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  top: {
    top: TOAST_OFFSET,
  },
});

export default Toast;
