import React, {useEffect, useRef, useCallback} from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

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

const SCREEN_HEIGHT = Dimensions.get('window').height;
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
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, overlayAnim]);

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(callback);
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
      slideAnim.setValue(SCREEN_HEIGHT);
      overlayAnim.setValue(0);
      dragY.setValue(0);
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
          dragY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD) {
          handleCloseRef.current();
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 65,
            friction: 11,
          }).start();
        }
      },
    }),
  ).current;

  const panelHeight =
    typeof height === 'number'
      ? SCREEN_HEIGHT * height
      : undefined;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent>
      <Animated.View style={[styles.overlay, {opacity: overlayAnim}]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeOnOverlay ? handleClose : undefined}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {translateY: Animated.add(slideAnim, dragY)},
            ],
          },
        ]}
        {...panResponder.panHandlers}>
        <Box
          style={[
            styles.panel,
            {
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
  panel: {
    maxHeight: SCREEN_HEIGHT * 0.9,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
});

export default Popup;
