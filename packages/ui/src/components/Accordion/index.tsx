import React, { createContext, useContext, useState, useCallback, useMemo } from "react"
import { Pressable } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  Easing,
} from "react-native-reanimated"
import { useTheme } from "@shopify/restyle"
import type { Theme } from "../../theme"
import Box from "../Box"
import Text from "../Text"
import type { BoxProps } from "../Box"
import { ChevronDownIcon } from "../Icon/icons"

/** 动画时长（毫秒） */
const ANIMATION_DURATION = 250
const TIMING_CONFIG = { duration: ANIMATION_DURATION, easing: Easing.bezier(0.4, 0, 0.2, 1) }

/** 手风琴展开模式 */
type AccordionType = "single" | "multiple"

/** 手风琴变体 */
type AccordionVariant = "outline" | "filled" | "separated"

interface AccordionContextValue {
  expandedIndices: Set<number>
  toggle: (index: number) => void
  variant: AccordionVariant
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedIndices: new Set(),
  toggle: () => {},
  variant: "outline",
})

/** 手风琴项的索引上下文 */
const AccordionItemIndexContext = createContext<number>(0)

export interface AccordionProps extends BoxProps {
  /** 展开模式：single 单项展开，multiple 多项展开 */
  type?: AccordionType
  /** 默认展开的项索引 */
  defaultIndex?: number[]
  /** 变体样式 */
  variant?: AccordionVariant
}

/**
 * 手风琴容器组件
 * 支持 type: single（单项展开）, multiple（多项展开）
 * 支持 variant: outline, filled, separated
 */
function Accordion({ type = "single", defaultIndex = [], variant = "outline", children, ...rest }: AccordionProps) {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(() => new Set(defaultIndex))

  const toggle = useCallback(
    (index: number) => {
      setExpandedIndices((prev) => {
        const next = new Set(prev)
        if (next.has(index)) {
          next.delete(index)
        } else {
          if (type === "single") {
            next.clear()
          }
          next.add(index)
        }
        return next
      })
    },
    [type],
  )

  const contextValue = useMemo(() => ({ expandedIndices, toggle, variant }), [expandedIndices, toggle, variant])

  const containerStyle: BoxProps =
    variant === "separated"
      ? { gap: "s" }
      : {
          borderWidth: 1,
          borderColor: "border",
          borderRadius: "m",
          overflow: "hidden" as const,
        }

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
  title: string
  /** 是否禁用 */
  isDisabled?: boolean
}

/**
 * 手风琴子项组件
 * 包含可点击的标题栏和可折叠的内容区，使用 reanimated 实现平滑动画
 */
function AccordionItem({ title, isDisabled = false, children, ...rest }: AccordionItemProps) {
  const { expandedIndices, toggle, variant } = useContext(AccordionContext)
  const index = useContext(AccordionItemIndexContext)
  const theme = useTheme<Theme>()
  const isExpanded = expandedIndices.has(index)

  const contentHeight = useSharedValue(0)
  const animatedExpanded = useDerivedValue(() => withTiming(isExpanded ? 1 : 0, TIMING_CONFIG))

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      toggle(index)
    }
  }, [isDisabled, toggle, index])

  const handleContentLayout = useCallback(
    (e: { nativeEvent: { layout: { height: number } } }) => {
      contentHeight.value = e.nativeEvent.layout.height
    },
    [contentHeight],
  )

  /** 内容区高度 + 透明度动画 */
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    height: animatedExpanded.value * contentHeight.value,
    opacity: animatedExpanded.value,
    overflow: "hidden" as const,
  }))

  /** 箭头旋转动画 */
  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${animatedExpanded.value * 180}deg` }],
  }))

  const itemStyle: BoxProps =
    variant === "separated"
      ? { borderWidth: 1, borderColor: "border", borderRadius: "m", overflow: "hidden" as const }
      : {}

  const headerBg = variant === "filled" ? theme.colors.primaryLight : "transparent"

  return (
    <Box
      {...itemStyle}
      {...rest}
    >
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

      <Animated.View style={contentAnimatedStyle}>
        <Box
          position="absolute"
          width="100%"
          onLayout={handleContentLayout}
        >
          <Box
            padding="m"
            paddingTop={"0"}
          >
            {children}
          </Box>
        </Box>
      </Animated.View>

      {variant !== "separated" && (
        <Box
          height={1}
          backgroundColor="border"
        />
      )}
    </Box>
  )
}

Accordion.Item = AccordionItem

export { AccordionItem }
export default Accordion
