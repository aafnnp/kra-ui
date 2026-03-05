import React, {useEffect, useRef, useCallback} from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  PanResponder,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';

/** 弹出面板高度比例 */
type PopupHeight = 'auto' | number;

export interface PopupProps {
  /** 是否显示 */
  visible: boolean;
  /** 关闭回调 */
  onClose: () => void;
  /** 面板高度，number 表示屏幕高度比例 (0~1)，'auto' 自适应内容 */
  height?: PopupHeight;
  /** 标题 */
  title?: string;
  /** 点击遮罩是否关闭 */
  closeOnOverlay?: boolean;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 是否显示拖拽指示条 */
  showHandle?: boolean;
  /** 是否支持下滑关闭 */
  swipeToClose?: boolean;
  /** 是否圆角 */
  rounded?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
}

const SWIPE_THRESHOLD = 80;

/**
 * 底部弹出面板组件
 * 从底部滑入，支持下滑手势关闭、遮罩关闭
 */
function Popup({
  visible,
  onClose,
  height = 'auto',
  title,
  closeOnOverlay = true,
  showClose = true,
  showHandle = true,
  swipeToClose = true,
  rounded = true,
  children,
}: PopupProps) {
  const theme = useTheme<Theme>();
  const {height: screenHeight} = useWindowDimensions();
  const screenHeightRef = useRef(screenHeight);
  screenHeightRef.current = screenHeight;

  const slideAnim = useSharedValue(screenHeight);
  const overlayAnim = useSharedValue(0);
  const dragY = useSharedValue(0);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayAnim.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{translateY: slideAnim.value + dragY.value}],
  }));

  const animateIn = useCallback(() => {
    slideAnim.value = withSpring(0, {stiffness: 65, damping: 11});
    overlayAnim.value = withTiming(1, {duration: 250});
  }, [slideAnim, overlayAnim]);

  const animateOut = useCallback(
    (callback?: () => void) => {
      slideAnim.value = withTiming(screenHeightRef.current, {duration: 250});
      overlayAnim.value = withTiming(0, {duration: 200}, finished => {
        if (finished && callback) {
          runOnJS(callback)();
        }
      });
    },
    [slideAnim, overlayAnim],
  );

  const handleClose = useCallback(() => {
    animateOut(() => onClose());
  }, [animateOut, onClose]);

  const swipeToCloseRef = useRef(swipeToClose);
  const handleCloseRef = useRef(handleClose);
  useEffect(() => {
    swipeToCloseRef.current = swipeToClose;
  }, [swipeToClose]);
  useEffect(() => {
    handleCloseRef.current = handleClose;
  }, [handleClose]);

  useEffect(() => {
    if (visible) {
      slideAnim.value = screenHeightRef.current;
      overlayAnim.value = 0;
      dragY.value = 0;
      animateIn();
    }
  }, [visible, animateIn, slideAnim, overlayAnim, dragY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => swipeToCloseRef.current,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        swipeToCloseRef.current && gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          dragY.value = gestureState.dy;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD) {
          handleCloseRef.current();
        } else {
          dragY.value = withSpring(0, {stiffness: 65, damping: 11});
        }
      },
    }),
  ).current;

  const panelHeight =
    typeof height === 'number'
      ? screenHeight * height
      : undefined;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent>
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeOnOverlay ? handleClose : undefined}
        />
      </Animated.View>

      <Animated.View
        style={[styles.container, containerStyle]}
        {...panResponder.panHandlers}>
        <Box
          style={[
            styles.panel,
            {
              maxHeight: screenHeight * 0.9,
              backgroundColor: theme.colors.cardBackground,
              height: panelHeight,
              borderTopLeftRadius: rounded ? theme.borderRadii.xl : 0,
              borderTopRightRadius: rounded ? theme.borderRadii.xl : 0,
            },
          ]}>
          {showHandle && (
            <Box alignItems="center" paddingTop="s" paddingBottom="xs">
              <Box
                style={[
                  styles.handle,
                  {backgroundColor: theme.colors.border},
                ]}
              />
            </Box>
          )}

          {(title || showClose) && (
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingHorizontal="m"
              paddingVertical="s">
              <Text fontWeight="600" fontSize={18} flex={1}>
                {title || ''}
              </Text>
              {showClose && (
                <Pressable
                  onPress={handleClose}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="关闭">
                  <Text fontSize={18} color="textSecondary">
                    ✕
                  </Text>
                </Pressable>
              )}
            </Box>
          )}

          <Box flex={height === 'auto' ? undefined : 1} padding="m">
            {children}
          </Box>
        </Box>
      </Animated.View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {},
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
});

export default Popup;
