import React from "react"
import { ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import {
  Box,
  Text,
  Heading,
  Button,
  HStack,
  VStack,
  Divider,
  useColorMode,
  Card,
} from "kra-ui"

/** 组件条目 */
interface ComponentItem {
  name: string
  title: string
}

/** 分类配置 */
interface CategoryGroup {
  category: string
  items: ComponentItem[]
}

/** 组件注册表（按分类分组） */
const COMPONENT_GROUPS: CategoryGroup[] = [
  {
    category: "排版",
    items: [
      { name: "typography", title: "排版 Typography" },
      { name: "code", title: "行内代码 Code" },
      { name: "highlight", title: "高亮 Highlight" },
      { name: "link", title: "链接 Link" },
      { name: "list", title: "列表 List" },
    ],
  },
  {
    category: "表单",
    items: [
      { name: "button", title: "按钮 Button" },
      { name: "input", title: "输入框 Input" },
      { name: "password-input", title: "密码输入 PasswordInput" },
      { name: "number-input", title: "数字输入 NumberInput" },
      { name: "pin-input", title: "PIN码 PinInput" },
      { name: "textarea", title: "多行输入 Textarea" },
      { name: "checkbox", title: "复选框 Checkbox" },
      { name: "radio", title: "单选框 Radio" },
      { name: "switch", title: "开关 Switch" },
      { name: "rating", title: "评分 Rating" },
      { name: "segmented-control", title: "分段控制 Segmented" },
    ],
  },
  {
    category: "数据展示",
    items: [
      { name: "card", title: "卡片 Card" },
      { name: "badge", title: "徽章 Badge" },
      { name: "avatar", title: "头像 Avatar" },
      { name: "accordion", title: "手风琴 Accordion" },
    ],
  },
  {
    category: "反馈",
    items: [
      { name: "spinner", title: "加载 Spinner" },
      { name: "alert", title: "提示 Alert" },
      { name: "modal", title: "弹窗 Modal" },
      { name: "popup", title: "底部弹出 Popup" },
      { name: "toast", title: "轻提示 Toast" },
    ],
  },
  {
    category: "导航",
    items: [
      { name: "tabs", title: "选项卡 Tabs" },
      { name: "steps", title: "步骤条 Steps" },
      { name: "dropdown", title: "下拉菜单 Dropdown" },
      { name: "page-container", title: "页面容器 PageContainer" },
    ],
  },
  {
    category: "布局",
    items: [
      { name: "layout", title: "布局 Layout" },
      { name: "aspect-ratio", title: "宽高比 AspectRatio" },
      { name: "grid", title: "网格 Grid" },
      { name: "group", title: "分组 Group" },
      { name: "separator", title: "分隔符 Separator" },
    ],
  },
]

export default function HomeScreen() {
  const { colorMode, toggleColorMode } = useColorMode()
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={colorMode === "dark" ? "light-content" : "dark-content"} />
      <ScrollView>
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
          {/* 标题栏 */}
          <HStack space="s" marginBottom="m" alignItems="center" justifyContent="space-between">
            <Heading size="h2">NativeUI</Heading>
            <Button
              label={colorMode === "light" ? "暗色" : "亮色"}
              variant="outline"
              size="sm"
              onPress={toggleColorMode}
            />
          </HStack>

          <Text variant="body" color="textSecondary" marginBottom="l">
            基于 @shopify/restyle 的 React Native 组件库
          </Text>

          {/* 按分类展示组件卡片 */}
          {COMPONENT_GROUPS.map((group) => (
            <Box key={group.category} marginBottom="l">
              <Heading size="h4" marginBottom="s">
                {group.category}
              </Heading>
              <VStack space="s">
                {group.items.map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/demo/${item.name}`)}
                  >
                    <Card variant="outline" paddingVertical="m" paddingHorizontal="m">
                      <HStack alignItems="center" justifyContent="space-between">
                        <Text variant="body">{item.title}</Text>
                        <Text color="textSecondary">›</Text>
                      </HStack>
                    </Card>
                  </TouchableOpacity>
                ))}
              </VStack>
              <Divider marginTop="m" />
            </Box>
          ))}

          <Box height={48} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
