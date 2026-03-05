import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  Pressable,
  Animated,
  StyleSheet,
  Modal as RNModal,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

export interface DropdownItem {
  /** 唯一标识 */
  key: string;
  /** 显示文本 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 分割线（在此项上方显示分割线） */
  divider?: boolean;
}

export interface DropdownProps extends BoxProps {
  /** 菜单项列表 */
  items: DropdownItem[];
  /** 选中回调 */
  onSelect?: (key: string) => void;
  /** 触发按钮文字 */
  trigger?: string;
  /** 自定义触发器 */
  renderTrigger?: (isOpen: boolean) => React.ReactNode;
  /** 菜单宽度 */
  menuWidth?: number;
  /** 对齐方式 */
  align?: 'left' | 'right';
}

/**
 * 下拉菜单组件
 * 支持缩放淡入动画、自定义触发器、对齐方式
 */
function Dropdown({
  items,
  onSelect,
  trigger = '请选择',
  renderTrigger,
  menuWidth,
  align = 'left',
  ...rest
}: DropdownProps) {
  const theme = useTheme<Theme>();
  const {height: screenHeight} = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const triggerRef = useRef<{x: number; y: number; width: number; height: number}>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const animateIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 12,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(callback);
    },
    [scaleAnim, opacityAnim],
  );

  const handleOpen = useCallback(() => {
    scaleAnim.setValue(0);
    opacityAnim.setValue(0);
    setIsOpen(true);
  }, [scaleAnim, opacityAnim]);

  const handleClose = useCallback(() => {
    animateOut(() => setIsOpen(false));
  }, [animateOut]);

  const handleSelect = useCallback(
    (key: string) => {
      onSelect?.(key);
      handleClose();
    },
    [onSelect, handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      animateIn();
    }
  }, [isOpen, animateIn]);

  const triggerViewRef = useRef<any>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  const handleTriggerLayout = useCallback(() => {
    if (triggerViewRef.current) {
      triggerViewRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          triggerRef.current = {x, y, width, height};
        },
      );
    }
  }, []);

  const handleMenuLayout = useCallback((e: LayoutChangeEvent) => {
    setMenuHeight(e.nativeEvent.layout.height);
  }, []);

  const {y, height: triggerHeight, x, width: triggerWidth} = triggerRef.current;
  const menuTopWhenDown = y + triggerHeight + 4;
  const menuLeft =
    align === 'right'
      ? x + triggerWidth - (menuWidth || triggerWidth)
      : x;

  const estimatedMenuHeight = menuHeight || 200;
  const openDownward = menuTopWhenDown + estimatedMenuHeight < screenHeight;
  const menuTop = openDownward
    ? menuTopWhenDown
    : Math.max(0, y - estimatedMenuHeight - 4);

  return (
    <Box {...rest}>
      <Pressable
        ref={triggerViewRef}
        onPress={handleOpen}
        onLayout={handleTriggerLayout}
        accessibilityRole="button"
        accessibilityState={{expanded: isOpen}}>
        {renderTrigger ? (
          renderTrigger(isOpen)
        ) : (
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingVertical="s"
            paddingHorizontal="m"
            borderWidth={1}
            borderColor="border"
            borderRadius="m"
            backgroundColor="inputBackground">
            <Text color="textPrimary">{trigger}</Text>
            <Text
              fontSize={10}
              color="textSecondary"
              style={{
                transform: [{rotate: isOpen ? '180deg' : '0deg'}],
              }}>
              ▼
            </Text>
          </Box>
        )}
      </Pressable>

      <RNModal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
        statusBarTranslucent>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />

        <Animated.View
          onLayout={handleMenuLayout}
          style={[
            styles.menu,
            {
              top: menuTop,
              left: menuLeft,
              width: menuWidth || triggerWidth,
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.textPrimary as string,
              opacity: opacityAnim,
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}>
          {items.map(item => (
            <React.Fragment key={item.key}>
              {item.divider && (
                <Box height={1} backgroundColor="border" />
              )}
              <Pressable
                onPress={() => !item.disabled && handleSelect(item.key)}
                disabled={item.disabled}
                accessibilityRole="menuitem"
                accessibilityState={{disabled: item.disabled}}
                style={({pressed}) => ({
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  opacity: item.disabled ? 0.4 : 1,
                  backgroundColor: pressed
                    ? (theme.colors.primaryLight as string)
                    : 'transparent',
                })}>
                <Text
                  fontSize={15}
                  color={item.disabled ? 'textMuted' : 'textPrimary'}>
                  {item.label}
                </Text>
              </Pressable>
            </React.Fragment>
          ))}
        </Animated.View>
      </RNModal>
    </Box>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default Dropdown;
