import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  Easing,
  type EasingFunction,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '../../theme';
import Box from '../Box';
import Text from '../Text';
import type { BoxProps } from '../Box';
import { ChevronDownIcon } from '../Icon/icons';

/** 动画时长（毫秒） */
const DEFAULT_ANIMATION_DURATION = 250;
const DEFAULT_EASING = Easing.bezier(0.4, 0, 0.2, 1);

/** 手风琴展开模式 */
type AccordionType = 'single' | 'multiple';

/** 手风琴变体 */
type AccordionVariant = 'outline' | 'filled' | 'separated';

type AccordionEasing = EasingFunction | { factory: () => EasingFunction };

function resolveEasing(easing: AccordionEasing): EasingFunction {
  return typeof easing === 'function' ? easing : easing.factory();
}

interface AccordionContextValue {
  expandedIndices: Set<number>;
  toggle: (index: number) => void;
  variant: AccordionVariant;
  lazyMount: boolean;
  unmountOnCollapse: boolean;
  mountedIndices: Set<number>;
  isAnimated: boolean;
  animationDuration: number;
  animationEasing: AccordionEasing;
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedIndices: new Set(),
  toggle: () => {},
  variant: 'outline',
  lazyMount: false,
  unmountOnCollapse: false,
  mountedIndices: new Set(),
  isAnimated: true,
  animationDuration: DEFAULT_ANIMATION_DURATION,
  animationEasing: DEFAULT_EASING,
});

/** 手风琴项的索引上下文 */
const AccordionItemIndexContext = createContext<number>(0);

export interface AccordionProps extends BoxProps {
  /** 展开模式：single 单项展开，multiple 多项展开 */
  type?: AccordionType;
  /** 默认展开的项索引 */
  defaultIndex?: number[];
  /** 展开项索引（受控） */
  index?: number[];
  /** 展开项变化回调 */
  onIndexChange?: (next: number[]) => void;
  /** 变体样式 */
  variant?: AccordionVariant;
  /** 折叠时是否卸载内容 */
  unmountOnCollapse?: boolean;
  /** 是否首次展开才挂载内容 */
  lazyMount?: boolean;
  /** 是否启用动画 */
  isAnimated?: boolean;
  /** 动画时长（毫秒） */
  animationDuration?: number;
  /** 动画缓动函数 */
  animationEasing?: AccordionEasing;
}

/**
 * 手风琴容器组件
 * 支持 type: single（单项展开）, multiple（多项展开）
 * 支持 variant: outline, filled, separated
 */
function Accordion({
  type = 'single',
  defaultIndex = [],
  index,
  onIndexChange,
  variant = 'outline',
  unmountOnCollapse = false,
  lazyMount = false,
  isAnimated = true,
  animationDuration = DEFAULT_ANIMATION_DURATION,
  animationEasing = DEFAULT_EASING,
  children,
  ...rest
}: AccordionProps) {
  const theme = useTheme<Theme>();

  const isControlled = index !== undefined;
  const [uncontrolledExpandedIndices, setUncontrolledExpandedIndices] = useState<Set<number>>(
    () => new Set(defaultIndex),
  );

  const expandedIndices = useMemo(
    () => (isControlled ? new Set(index) : uncontrolledExpandedIndices),
    [isControlled, index, uncontrolledExpandedIndices],
  );

  const [mountedIndices, setMountedIndices] = useState<Set<number>>(() => new Set(defaultIndex));

  useEffect(() => {
    if (!lazyMount) return;
    setMountedIndices((prev) => {
      let changed = false;
      const next = new Set(prev);
      expandedIndices.forEach((i) => {
        if (!next.has(i)) {
          next.add(i);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [expandedIndices, lazyMount]);

  const toggle = useCallback(
    (index: number) => {
      const prev = expandedIndices;
      const nextSet = new Set(prev);

      if (nextSet.has(index)) {
        nextSet.delete(index);
      } else {
        if (type === 'single') {
          nextSet.clear();
        }
        nextSet.add(index);
      }

      const next = Array.from(nextSet);

      if (lazyMount) {
        setMountedIndices((prevMounted) => {
          if (prevMounted.has(index)) return prevMounted;
          const nextMounted = new Set(prevMounted);
          nextMounted.add(index);
          return nextMounted;
        });
      }

      onIndexChange?.(next);

      if (!isControlled) {
        setUncontrolledExpandedIndices(nextSet);
      }
    },
    [expandedIndices, isControlled, lazyMount, onIndexChange, type],
  );

  const contextValue = useMemo(
    () => ({
      expandedIndices,
      toggle,
      variant,
      lazyMount,
      unmountOnCollapse,
      mountedIndices,
      isAnimated,
      animationDuration,
      animationEasing,
    }),
    [
      expandedIndices,
      toggle,
      variant,
      lazyMount,
      unmountOnCollapse,
      mountedIndices,
      isAnimated,
      animationDuration,
      animationEasing,
    ],
  );

  const containerStyle = useMemo(() => {
    const styles = theme.accordionVariants?.[variant] ?? theme.accordionVariants?.defaults ?? {};
    return styles as BoxProps;
  }, [theme, variant]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <Box
        {...containerStyle}
        {...rest}
      >
        {React.Children.map(children, (child, index) => (
          <AccordionItemIndexContext.Provider value={index}>{child}</AccordionItemIndexContext.Provider>
        ))}
      </Box>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps extends BoxProps {
  /** 标题 */
  title: string;
  /** 是否禁用 */
  isDisabled?: boolean;
  /** 自定义标题区域 */
  renderHeader?: (params: {
    title: string;
    isExpanded: boolean;
    isDisabled: boolean;
    index: number;
    toggle: () => void;
  }) => React.ReactNode;
}

/**
 * 手风琴子项组件
 * 包含可点击的标题栏和可折叠的内容区，使用 reanimated 实现平滑动画
 */
function AccordionItem({ title, isDisabled = false, renderHeader, children, ...rest }: AccordionItemProps) {
  const {
    expandedIndices,
    toggle,
    variant,
    lazyMount,
    unmountOnCollapse,
    mountedIndices,
    isAnimated,
    animationDuration,
    animationEasing,
  } = useContext(AccordionContext);
  const index = useContext(AccordionItemIndexContext);
  const theme = useTheme<Theme>();
  const isExpanded = expandedIndices.has(index);

  const contentHeight = useSharedValue(0);
  const timingConfig = useMemo(
    () => ({ duration: animationDuration, easing: resolveEasing(animationEasing) }),
    [animationDuration, animationEasing],
  );

  const animatedExpanded = useDerivedValue(() => {
    if (!isAnimated) return isExpanded ? 1 : 0;
    return withTiming(isExpanded ? 1 : 0, timingConfig);
  });

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      toggle(index);
    }
  }, [isDisabled, toggle, index]);

  const handleContentLayout = useCallback(
    (e: { nativeEvent: { layout: { height: number } } }) => {
      contentHeight.value = e.nativeEvent.layout.height;
    },
    [contentHeight],
  );

  /** 内容区高度 + 透明度动画 */
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: animatedExpanded.value * contentHeight.value,
    opacity: animatedExpanded.value,
    overflow: 'hidden' as const,
  }));

  /** 箭头旋转动画 */
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${animatedExpanded.value * 180}deg` }],
  }));

  const itemStyle: BoxProps =
    variant === 'separated' ? (theme.accordionItemVariants?.separated as BoxProps) : {};

  const headerBg =
    variant === 'filled'
      ? theme.accordionHeaderVariants?.filled?.backgroundColor ?? 'transparent'
      : 'transparent';

  const canRenderContent = useMemo(() => {
    if (!lazyMount) return true;
    return mountedIndices.has(index);
  }, [index, lazyMount, mountedIndices]);

  const shouldRenderChildren = useMemo(() => {
    if (!canRenderContent) return false;
    if (!unmountOnCollapse) return true;
    return isExpanded;
  }, [canRenderContent, isExpanded, unmountOnCollapse]);

  return (
    <Box
      {...itemStyle}
      {...rest}
    >
      {renderHeader ? (
        renderHeader({
          title,
          isExpanded,
          isDisabled,
          index,
          toggle: handlePress,
        })
      ) : (
        <Pressable
          onPress={handlePress}
          disabled={isDisabled}
          accessibilityRole="button"
          accessibilityState={{ expanded: isExpanded, disabled: isDisabled }}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            padding="m"
            style={{ backgroundColor: headerBg }}
            opacity={isDisabled ? 0.5 : 1}
          >
            <Text
              fontWeight="600"
              flex={1}
            >
              {title}
            </Text>
            <Animated.View style={arrowAnimatedStyle}>
              <ChevronDownIcon size={12} color="textSecondary" />
            </Animated.View>
          </Box>
        </Pressable>
      )}

      <Animated.View style={contentAnimatedStyle}>
        <Box
          position="absolute"
          width="100%"
          onLayout={handleContentLayout}
        >
          <Box
            padding="m"
            paddingTop="0"
          >
            {shouldRenderChildren ? children : null}
          </Box>
        </Box>
      </Animated.View>

      {variant !== 'separated' && (
        <Box
          height={1}
          backgroundColor="border"
        />
      )}
    </Box>
  )
}

type AccordionComponent = React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
};

const AccordionWithItem = Accordion as unknown as AccordionComponent;
AccordionWithItem.Item = AccordionItem;

export { AccordionItem };
export default AccordionWithItem;
