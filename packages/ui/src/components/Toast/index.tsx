import React, {useEffect, useRef, useCallback} from 'react';
import {StyleSheet, Pressable, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Text from '../Text';

/** Toast 状态类型 */
type ToastStatus = 'info' | 'success' | 'warning' | 'error';

/** Toast 位置 */
type ToastPlacement = 'top' | 'bottom';

const statusIconMap: Record<ToastStatus, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

const statusColorMap: Record<ToastStatus, keyof Theme['colors']> = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export interface ToastProps {
  /** 是否显示 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
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
  message,
  status = 'info',
  duration = 3000,
  placement = 'top',
  closable = true,
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

  const colorKey = statusColorMap[status];
  const icon = statusIconMap[status];

  return (
    <Animated.View
      style={[
        styles.container,
        placement === 'top' ? {top: TOAST_OFFSET} : {bottom: TOAST_OFFSET},
        animatedStyle,
      ]}
      pointerEvents="box-none">
      <Pressable
        onPress={closable ? handleClose : undefined}
        style={[
          styles.toast,
          {
            width: screenWidth - 32,
            backgroundColor: theme.colors.cardBackground,
            borderLeftColor: theme.colors[colorKey] as string,
            shadowColor: theme.colors.textPrimary as string,
          },
        ]}>
        <Text
          style={[
            styles.icon,
            {color: theme.colors[colorKey] as string},
          ]}>
          {icon}
        </Text>
        <Text style={styles.message} numberOfLines={2} color="textPrimary">
          {message}
        </Text>
        {closable && (
          <Pressable onPress={handleClose} hitSlop={8}>
            <Text fontSize={14} color="textSecondary">
              ✕
            </Text>
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
  icon: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 10,
  },
  message: {
    flex: 1,
    fontSize: 15,
  },
});

export default Toast;
