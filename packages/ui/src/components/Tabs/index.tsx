import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  type LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {useTheme} from '@shopify/restyle';
import type {Theme} from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type {BoxProps} from '../Box';

export interface TabItem {
  /** 选项卡标签 */
  label: string;
  /** 唯一标识 */
  key: string;
}

export interface TabsProps extends BoxProps {
  /** 选项卡列表 */
  items: TabItem[];
  /** 当前激活的 key */
  activeKey?: string;
  /** 切换回调 */
  onChange?: (key: string) => void;
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 变体 */
  variant?: 'underline' | 'filled' | 'pill';
  /** 是否可滚动 */
  scrollable?: boolean;
  /** 子元素（选项卡内容，按 key 对应） */
  children?: React.ReactNode;
}

const sizeMap = {
  sm: {paddingVertical: 6, paddingHorizontal: 12, fontSize: 13},
  md: {paddingVertical: 10, paddingHorizontal: 16, fontSize: 15},
  lg: {paddingVertical: 14, paddingHorizontal: 20, fontSize: 17},
};

/**
 * 选项卡组件
 * 支持 variant: underline, filled, pill
 * 支持滑动指示器动画和内容切换
 */
function Tabs({
  items,
  activeKey,
  onChange,
  size = 'md',
  variant = 'underline',
  scrollable = false,
  children,
  ...rest
}: TabsProps) {
  const theme = useTheme<Theme>();
  const s = sizeMap[size];

  const [currentKey, setCurrentKey] = useState(activeKey || items[0]?.key || '');
  const tabLayouts = useRef<Record<string, {x: number; width: number}>>({});
  const indicatorLeft = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  const effectiveKey = activeKey ?? currentKey;

  const indicatorStyle = useAnimatedStyle(() => ({
    left: indicatorLeft.value,
    width: indicatorWidth.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const animateIndicator = useCallback(
    (key: string) => {
      const layout = tabLayouts.current[key];
      if (!layout) return;

      indicatorLeft.value = withSpring(layout.x, {stiffness: 80, damping: 12});
      indicatorWidth.value = withSpring(layout.width, {stiffness: 80, damping: 12});
    },
    [indicatorLeft, indicatorWidth],
  );

  const handleTabPress = useCallback(
    (key: string) => {
      if (key === effectiveKey) return;

      contentOpacity.value = withSequence(
        withTiming(0, {duration: 100}),
        withTiming(1, {duration: 150}),
      );

      if (!activeKey) {
        setCurrentKey(key);
      }
      onChange?.(key);
      animateIndicator(key);
    },
    [effectiveKey, activeKey, onChange, animateIndicator, contentOpacity],
  );

  useEffect(() => {
    animateIndicator(effectiveKey);
  }, [effectiveKey, animateIndicator]);

  const handleTabLayout = useCallback(
    (key: string, event: LayoutChangeEvent) => {
      const {x, width} = event.nativeEvent.layout;
      tabLayouts.current[key] = {x, width};

      if (key === effectiveKey) {
        animateIndicator(key);
      }
    },
    [effectiveKey, animateIndicator],
  );

  const renderTabBar = () => {
    const tabItems = items.map(item => {
      const isActive = item.key === effectiveKey;

      const tabStyle =
        variant === 'pill'
          ? {
              backgroundColor: isActive
                ? theme.colors.primary
                : 'transparent',
              borderRadius: theme.borderRadii.full,
            }
          : variant === 'filled'
            ? {
                backgroundColor: isActive
                  ? theme.colors.primaryLight
                  : 'transparent',
                borderRadius: theme.borderRadii.m,
              }
            : {};

      return (
        <Pressable
          key={item.key}
          onPress={() => handleTabPress(item.key)}
          onLayout={e => handleTabLayout(item.key, e)}
          testID={`native-ui-tabs-tab-${item.key}`}
          accessibilityRole="tab"
          accessibilityState={{selected: isActive}}>
          <Box
            style={[
              {
                paddingVertical: s.paddingVertical,
                paddingHorizontal: s.paddingHorizontal,
              },
              tabStyle,
            ]}>
            <Text
              style={{
                fontSize: s.fontSize,
                fontWeight: isActive ? '600' : '400',
                color:
                  variant === 'pill' && isActive
                    ? theme.colors.textInverse
                    : isActive
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
              }}>
              {item.label}
            </Text>
          </Box>
        </Pressable>
      );
    });

    if (scrollable) {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Box flexDirection="row">{tabItems}</Box>
        </ScrollView>
      );
    }

    return <Box flexDirection="row">{tabItems}</Box>;
  };

  const activeIndex = items.findIndex(item => item.key === effectiveKey);
  const childArray = React.Children.toArray(children);
  const activeContent = childArray[activeIndex] || null;

  return (
    <Box {...rest}>
      <Box
        borderBottomWidth={variant === 'underline' ? 1 : 0}
        borderColor="border">
        {renderTabBar()}

        {variant === 'underline' && (
          <Animated.View
            style={[
              styles.indicator,
              {backgroundColor: theme.colors.primary},
              indicatorStyle,
            ]}
          />
        )}
      </Box>

      {activeContent && (
        <Animated.View style={contentStyle}>
          <Box paddingTop="m">{activeContent}</Box>
        </Animated.View>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    borderRadius: 1,
  },
});

export default Tabs;
