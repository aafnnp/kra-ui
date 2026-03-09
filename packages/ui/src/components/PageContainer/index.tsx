import React, { useCallback, useMemo } from "react"
import {
  StatusBar,
  type StatusBarStyle,
  type StyleProp,
  type ViewStyle,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native"
import { SafeAreaView } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import Box from "../Box"
import Text from "../Text"
import Button from "../Button"
import Spinner from "../Spinner"
import type { BoxProps } from "../Box"
import type { ButtonProps } from "../Button"

/** 入场动画持续时间（毫秒） */
const ENTER_DURATION = 350

export interface PageContainerProps extends BoxProps {
  /** 页面标题 */
  title?: string
  /** 是否显示返回按钮 */
  showBack?: boolean
  /** 返回按钮点击回调 */
  onBack?: () => void
  /** 自定义返回按钮渲染 */
  renderBack?: () => React.ReactNode
  /** 右侧自定义内容 */
  renderRight?: () => React.ReactNode
  /** 自定义头部（覆盖默认头部） */
  renderHeader?: () => React.ReactNode
  /** 底部按钮文字，设置后显示底部栏 */
  footerButtonLabel?: string
  /** 底部按钮点击回调 */
  onFooterPress?: () => void
  /** 底部按钮附加属性 */
  footerButtonProps?: Omit<ButtonProps, "label" | "onPress">
  /** 自定义底部渲染（覆盖默认底部按钮） */
  renderFooter?: () => React.ReactNode
  /** 是否显示底部栏 */
  showFooter?: boolean
  /** StatusBar 样式 */
  statusBarStyle?: StatusBarStyle
  /** 是否隐藏 StatusBar */
  hideStatusBar?: boolean
  /** 加载状态 */
  isLoading?: boolean
  /** 自定义加载渲染 */
  renderLoading?: () => React.ReactNode
  /** 是否启用入场动画 */
  animated?: boolean
  /** 内容区是否可滚动 */
  scrollable?: boolean
  /** SafeAreaView 自定义样式 */
  safeAreaStyle?: StyleProp<ViewStyle>
  /** 头部导航栏自定义样式 */
  headerStyle?: StyleProp<ViewStyle>
  /** 内容区自定义样式 */
  contentStyle?: StyleProp<ViewStyle>
  /** 底部栏自定义样式 */
  footerStyle?: StyleProp<ViewStyle>
  /** 子元素 */
  children?: React.ReactNode
}

/**
 * 页面容器组件
 * 提供完整页面布局：StatusBar + 头部导航栏 + 可滚动内容区 + 固定底部按钮
 * 支持加载状态、入场动画、返回按钮和右侧自定义区域
 */
function PageContainer({
  title,
  showBack = true,
  onBack,
  renderBack,
  renderRight,
  renderHeader,
  footerButtonLabel = "确认",
  onFooterPress,
  footerButtonProps,
  renderFooter,
  showFooter = true,
  statusBarStyle = "dark-content",
  hideStatusBar = false,
  isLoading = false,
  renderLoading,
  animated = true,
  scrollable = true,
  safeAreaStyle,
  headerStyle,
  contentStyle,
  footerStyle,
  children,
  ...rest
}: PageContainerProps) {
  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  /** 默认返回按钮 */
  const backButton = useMemo(() => {
    if (!showBack) return null
    if (renderBack) return renderBack()
    return (
      <Pressable
        onPress={handleBack}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel="返回"
      >
        <Box
          paddingRight="s"
          paddingVertical="xs"
        >
          <Text
            fontSize={16}
            color="primary"
          >
            ← 返回
          </Text>
        </Box>
      </Pressable>
    )
  }, [showBack, renderBack, handleBack])

  /** 头部导航栏 */
  const header = useMemo(() => {
    if (renderHeader) return renderHeader()
    return (
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="m"
        paddingVertical="s"
        borderBottomWidth={1}
        borderColor="border"
        style={headerStyle}
      >
        <Box
          flex={1}
          alignItems="flex-start"
        >
          {backButton}
        </Box>
        <Box
          flex={2}
          alignItems="center"
        >
          {title ? (
            <Text
              fontWeight="600"
              fontSize={17}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
        </Box>
        <Box
          flex={1}
          alignItems="flex-end"
        >
          {renderRight?.()}
        </Box>
      </Box>
    )
  }, [renderHeader, backButton, title, renderRight, headerStyle])

  /** 底部固定栏 */
  const footer = useMemo(() => {
    if (!showFooter) return null
    if (renderFooter) return renderFooter()
    return (
      <Box
        paddingHorizontal="m"
        paddingVertical="s"
        borderTopWidth={1}
        borderColor="border"
        backgroundColor="mainBackground"
        style={footerStyle}
      >
        <Button
          label={footerButtonLabel}
          variant="filled"
          onPress={onFooterPress}
          {...footerButtonProps}
        />
      </Box>
    )
  }, [showFooter, renderFooter, footerButtonLabel, onFooterPress, footerButtonProps, footerStyle])

  /** 加载遮罩 */
  const loadingOverlay = useMemo(() => {
    if (!isLoading) return null
    if (renderLoading) return renderLoading()
    return (
      <Box style={styles.loadingOverlay}>
        <Box
          backgroundColor="cardBackground"
          padding="l"
          borderRadius="l"
          alignItems="center"
          gap="s"
        >
          <Spinner size="lg" />
          <Text variant="caption">加载中...</Text>
        </Box>
      </Box>
    )
  }, [isLoading, renderLoading])

  /** 内容区域 */
  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <Box
      flex={1}
      padding="m"
      style={contentStyle}
    >
      {children}
    </Box>
  )

  const pageBody = (
    <>
      {header}
      <Box flex={1}>
        {content}
        {loadingOverlay}
      </Box>
      {footer}
    </>
  )

  return (
    <SafeAreaView style={[styles.safeArea, safeAreaStyle]}>
      <StatusBar
        barStyle={statusBarStyle}
        hidden={hideStatusBar}
      />
      <Box
        flex={1}
        backgroundColor="mainBackground"
        {...rest}
      >
        {animated ? (
          <Animated.View
            style={styles.flex1}
            entering={FadeIn.duration(ENTER_DURATION)}
          >
            {pageBody}
          </Animated.View>
        ) : (
          pageBody
        )}
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
})

export default PageContainer
