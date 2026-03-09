import { defineConfig } from "vitepress"

export default defineConfig({
  title: "NativeUI",
  description: "基于 @shopify/restyle 的 React Native UI 组件库",
  lang: "zh-CN",
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "组件", link: "/guide/components/box" },
    ],
    sidebar: [
      {
        text: "开始",
        items: [
          { text: "快速开始", link: "/guide/getting-started" },
          { text: "主题配置", link: "/guide/theme" },
        ],
      },
      {
        text: "布局",
        items: [
          { text: "Box", link: "/guide/components/box" },
          { text: "Flex", link: "/guide/components/flex" },
          { text: "Stack", link: "/guide/components/stack" },
          { text: "Center", link: "/guide/components/center" },
          { text: "Divider", link: "/guide/components/divider" },
          { text: "AspectRatio", link: "/guide/components/aspect-ratio" },
          { text: "Grid", link: "/guide/components/grid" },
          { text: "Group", link: "/guide/components/group" },
          { text: "ScrollArea", link: "/guide/components/scroll-area" },
          { text: "Separator", link: "/guide/components/separator" },
        ],
      },
      {
        text: "排版",
        items: [
          { text: "Text", link: "/guide/components/text" },
          { text: "Heading", link: "/guide/components/heading" },
          { text: "Code", link: "/guide/components/code" },
          { text: "Highlight", link: "/guide/components/highlight" },
          { text: "Link", link: "/guide/components/link" },
          { text: "List", link: "/guide/components/list" },
        ],
      },
      {
        text: "表单",
        items: [
          { text: "Button", link: "/guide/components/button" },
          { text: "Input", link: "/guide/components/input" },
          { text: "Switch", link: "/guide/components/switch" },
          { text: "Checkbox", link: "/guide/components/checkbox" },
          { text: "Radio", link: "/guide/components/radio" },
          { text: "Textarea", link: "/guide/components/textarea" },
          { text: "NumberInput", link: "/guide/components/number-input" },
          { text: "PasswordInput", link: "/guide/components/password-input" },
          { text: "PinInput", link: "/guide/components/pin-input" },
          { text: "Rating", link: "/guide/components/rating" },
          { text: "SegmentedControl", link: "/guide/components/segmented-control" },
        ],
      },
      {
        text: "数据展示",
        items: [
          { text: "Accordion", link: "/guide/components/accordion" },
          { text: "Badge", link: "/guide/components/badge" },
          { text: "Card", link: "/guide/components/card" },
          { text: "Avatar", link: "/guide/components/avatar" },
        ],
      },
      {
        text: "数据导航",
        items: [
          { text: "Tabs", link: "/guide/components/tabs" },
          { text: "Steps", link: "/guide/components/steps" },
          { text: "Dropdown", link: "/guide/components/dropdown" },
          { text: "PageContainer", link: "/guide/components/page-container" },
        ],
      },
      {
        text: "反馈",
        items: [
          { text: "Spinner", link: "/guide/components/spinner" },
          { text: "Alert", link: "/guide/components/alert" },
          { text: "Modal", link: "/guide/components/modal" },
          { text: "Popup", link: "/guide/components/popup" },
          { text: "Toast", link: "/guide/components/toast" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/user/kra-ui" }],
  },
})
