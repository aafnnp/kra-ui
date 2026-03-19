import React, { useEffect, useRef, useCallback } from 'react';
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

/**
 * 轻提示组件
 * 支持 status: info, success, warning, error
 * 支持自动关闭、位置配置、淡入滑出动画
 */
function Toast({
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
  const {width: screenWidth} = useWindowDimensions();
  const translateY = useSharedValue(placement === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  const animateIn = useCallback(() => {
    translateY.value = withSpring(0, {stiffness: 80, damping: 12});
    opacity.value = withTiming(1, {duration: 200});
  }, [translateY, opacity]);

  const animateOut = useCallback(
    (callback?: () => void) => {
      translateY.value = withTiming(
        placement === 'top' ? -100 : 100,
        {duration: 200},
      );
      opacity.value = withTiming(0, {duration: 200}, finished => {
        if (finished && callback) {
          runOnJS(callback)();
        }
      });
    },
    [translateY, opacity, placement],
  );

  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    animateOut(() => onClose());
  }, [animateOut, onClose]);

  const handleActionPress = useCallback(() => {
    if (!actionLabel || !onActionPress) {
      return;
    }
    onActionPress();
    handleClose();
  }, [actionLabel, onActionPress, handleClose]);

  useEffect(() => {
    if (visible) {
      translateY.value = placement === 'top' ? -100 : 100;
      opacity.value = 0;
      animateIn();

      if (duration > 0) {
        timerRef.current = setTimeout(handleClose, duration);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [visible, duration, placement, animateIn, handleClose, translateY, opacity]);

  if (!visible) {
    return null;
  }

  const variantTokens = (theme as any).toastVariants?.[status] as
    | {
        accentColor: keyof Theme['colors'];
        backgroundColor: keyof Theme['colors'];
        textColor: keyof Theme['colors'];
      }
    | undefined;
  const accentColorKey = variantTokens?.accentColor ?? 'primary';
  const backgroundColorKey = variantTokens?.backgroundColor ?? 'cardBackground';
  const textColorKey = variantTokens?.textColor ?? 'textPrimary';

  const StatusIcon = statusIconMap[status];
  const shouldRenderAction = Boolean(actionLabel && onActionPress);

  return (
    <Animated.View
      style={[
        styles.container,
        placement === 'top' ? {top: TOAST_OFFSET} : {bottom: TOAST_OFFSET},
        animatedStyle,
        containerStyle,
      ]}
      pointerEvents="box-none">
      <Pressable
        onPress={closable ? handleClose : undefined}
        testID="native-ui-toast"
        accessibilityRole="alert"
        accessibilityLabel={title ? `${title} ${message}` : message}
        style={[
          styles.toast,
          {
            width: screenWidth - 32,
            backgroundColor: theme.colors[backgroundColorKey] as string,
            borderLeftColor: theme.colors[accentColorKey] as string,
            shadowColor: theme.colors.textPrimary as string,
          },
        ]}>
        <StatusIcon size={18} color={accentColorKey} />
        <Pressable style={styles.content} pointerEvents="none">
          {title ? (
            <Text style={styles.title} numberOfLines={1} color={textColorKey}>
              {title}
            </Text>
          ) : null}
          <Text style={styles.message} numberOfLines={title ? 1 : 2} color={textColorKey}>
            {message}
          </Text>
        </Pressable>
        {shouldRenderAction ? (
          <Pressable onPress={handleActionPress} hitSlop={8} style={styles.action}>
            <Text color="primary" numberOfLines={1}>
              {actionLabel}
            </Text>
          </Pressable>
        ) : null}
        {closable && (
          <Pressable onPress={handleClose} hitSlop={8}>
            <CloseIcon size={14} color="textSecondary" />
          </Pressable>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  message: {
    fontSize: 15,
  },
  action: {
    marginRight: 8,
  },
});

export default Toast;

