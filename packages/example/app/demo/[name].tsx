import React, { useState } from "react"
import { Pressable } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
  Box,
  Text,
  Heading,
  Button,
  Input,
  Switch,
  Card,
  Badge,
  Avatar,
  Spinner,
  Alert,
  Modal,
  Popup,
  Toast,
  Tabs,
  Dropdown,
  Flex,
  HStack,
  VStack,
  Center,
  useColorMode,
  AspectRatio,
  Grid,
  Group,
  Separator,
  Code,
  Highlight,
  Link,
  List,
  Checkbox,
  NumberInput,
  PasswordInput,
  PinInput,
  Radio,
  RadioGroup,
  Rating,
  SegmentedControl,
  Textarea,
  Accordion,
  Steps,
  PageContainer,
} from "kra-ui"

// ─── 各组件演示 ───────────────────────────────────

function TypographyDemo() {
  return (
    <VStack space="xs">
      <Heading size="h1">Heading H1</Heading>
      <Heading size="h2">Heading H2</Heading>
      <Heading size="h3">Heading H3</Heading>
      <Heading size="h4">Heading H4</Heading>
      <Text variant="body">Body 正文文本</Text>
      <Text variant="caption">Caption 辅助说明文本</Text>
      <Text variant="label">Label 标签文本</Text>
    </VStack>
  )
}

function CodeDemo() {
  return (
    <VStack space="s">
      <Code>const x = 42;</Code>
      <Code>npm install kra-ui</Code>
    </VStack>
  )
}

function HighlightDemo() {
  return (
    <VStack space="s">
      <Highlight query="React">React Native 是基于 React 的移动端框架</Highlight>
      <Highlight query={["组件", "主题"]}>NativeUI 提供丰富的组件和主题系统</Highlight>
    </VStack>
  )
}

function LinkDemo() {
  return (
    <VStack space="s">
      <Link href="https://reactnative.dev">React Native 官网</Link>
      <Link href="https://github.com">GitHub</Link>
    </VStack>
  )
}

function ListDemo() {
  return (
    <VStack space="s">
      <Text
        variant="label"
        marginBottom="xs"
      >
        无序列表
      </Text>
      <List>
        <Text>安装依赖</Text>
        <Text>配置主题</Text>
        <Text>使用组件</Text>
      </List>
      <Text
        variant="label"
        marginTop="s"
        marginBottom="xs"
      >
        有序列表
      </Text>
      <List
        type="ordered"
        spacing="s"
      >
        <Text>第一步：初始化项目</Text>
        <Text>第二步：添加 Provider</Text>
        <Text>第三步：引入组件</Text>
      </List>
    </VStack>
  )
}

function ButtonDemo() {
  return (
    <VStack space="s">
      <HStack space="s">
        <Button
          label="Filled"
          variant="filled"
          size="md"
          onPress={() => {}}
        />
        <Button
          label="Outline"
          variant="outline"
          size="md"
          onPress={() => {}}
        />
        <Button
          label="Ghost"
          variant="ghost"
          size="md"
          onPress={() => {}}
        />
      </HStack>
      <HStack space="s">
        <Button
          label="Small"
          variant="filled"
          size="sm"
          onPress={() => {}}
        />
        <Button
          label="Medium"
          variant="filled"
          size="md"
          onPress={() => {}}
        />
        <Button
          label="Large"
          variant="filled"
          size="lg"
          onPress={() => {}}
        />
      </HStack>
      <HStack space="s">
        <Button
          label="加载中..."
          variant="filled"
          loading
          onPress={() => {}}
        />
        <Button
          label="禁用"
          variant="filled"
          isDisabled
          onPress={() => {}}
        />
        <Button
          label="Danger"
          variant="danger"
          onPress={() => {}}
        />
      </HStack>
    </VStack>
  )
}

function InputDemo() {
  const [value, setValue] = useState("")
  return (
    <VStack space="s">
      <Input
        variant="outline"
        placeholder="Outline 输入框"
        value={value}
        onChangeText={setValue}
      />
      <Input
        variant="filled"
        placeholder="Filled 输入框"
      />
      <Input
        variant="underline"
        placeholder="Underline 输入框"
      />
      <Input
        variant="outline"
        placeholder="无效输入框"
        isInvalid
      />
      <Input
        variant="outline"
        placeholder="禁用输入框"
        isDisabled
      />
    </VStack>
  )
}

function PasswordInputDemo() {
  const [value, setValue] = useState("")
  return (
    <PasswordInput
      placeholder="请输入密码"
      value={value}
      onChangeText={setValue}
    />
  )
}

function NumberInputDemo() {
  const [value, setValue] = useState(5)
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      min={0}
      max={99}
      step={1}
    />
  )
}

function PinInputDemo() {
  const [value, setValue] = useState("")
  return (
    <VStack space="s">
      <PinInput
        length={4}
        value={value}
        onChange={setValue}
      />
      <PinInput
        length={6}
        mask
        value=""
        onChange={() => {}}
        size="sm"
      />
    </VStack>
  )
}

function TextareaDemo() {
  const [value, setValue] = useState("")
  return (
    <Textarea
      placeholder="请输入内容..."
      value={value}
      onChangeText={setValue}
      rows={4}
    />
  )
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <VStack space="s">
      <Checkbox
        isChecked={checked}
        onChange={setChecked}
        label="同意用户协议"
      />
      <Checkbox
        isChecked
        size="sm"
        label="小号"
        onChange={() => {}}
      />
      <Checkbox
        isChecked
        size="lg"
        label="大号"
        onChange={() => {}}
      />
      <Checkbox
        label="禁用选项"
        isDisabled
      />
    </VStack>
  )
}

function RadioDemo() {
  const [value, setValue] = useState("apple")
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
    >
      <Radio
        value="apple"
        label="苹果"
      />
      <Radio
        value="banana"
        label="香蕉"
      />
      <Radio
        value="orange"
        label="橘子"
      />
      <Radio
        value="disabled"
        label="禁用选项"
        isDisabled
      />
    </RadioGroup>
  )
}

function SwitchDemo() {
  const [value, setValue] = useState(false)
  return (
    <VStack space="s">
      <Switch
        label="启用通知"
        value={value}
        onValueChange={setValue}
        onLabel="已开启"
        offLabel="已关闭"
      />
      <Switch
        label="小号"
        size="sm"
        value={true}
        onValueChange={() => {}}
      />
      <Switch
        label="大号"
        size="lg"
        value={false}
        onValueChange={() => {}}
      />
      <Switch
        label="禁用"
        isDisabled
        value={false}
        onValueChange={() => {}}
      />
    </VStack>
  )
}

function RatingDemo() {
  const [value, setValue] = useState(3)
  return (
    <VStack space="s">
      <Rating
        value={value}
        onChange={setValue}
      />
      <HStack
        space="m"
        alignItems="center"
      >
        <Rating
          value={4}
          size="sm"
          readonly
        />
        <Rating
          value={3}
          size="lg"
          readonly
        />
      </HStack>
    </VStack>
  )
}

function SegmentedControlDemo() {
  const [value, setValue] = useState("all")
  return (
    <VStack space="s">
      <SegmentedControl
        segments={[
          { label: "全部", value: "all" },
          { label: "进行中", value: "active" },
          { label: "已完成", value: "done" },
        ]}
        value={value}
        onChange={setValue}
      />
      <SegmentedControl
        segments={[
          { label: "日", value: "day" },
          { label: "周", value: "week" },
          { label: "月", value: "month" },
        ]}
        value="day"
        size="sm"
        onChange={() => {}}
      />
    </VStack>
  )
}

function CardDemo() {
  return (
    <VStack space="s">
      <Card variant="elevated">
        <Text variant="label">Elevated 卡片</Text>
        <Text
          variant="caption"
          marginTop="xs"
        >
          带阴影的卡片样式
        </Text>
      </Card>
      <Card variant="outline">
        <Text variant="label">Outline 卡片</Text>
        <Text
          variant="caption"
          marginTop="xs"
        >
          边框卡片样式
        </Text>
      </Card>
      <Card variant="filled">
        <Text variant="label">Filled 卡片</Text>
        <Text
          variant="caption"
          marginTop="xs"
        >
          填充卡片样式
        </Text>
      </Card>
    </VStack>
  )
}

function BadgeDemo() {
  return (
    <HStack space="s">
      <Badge
        label="Solid"
        variant="solid"
      />
      <Badge
        label="Subtle"
        variant="subtle"
      />
      <Badge
        label="Outline"
        variant="outline"
      />
    </HStack>
  )
}

function AvatarDemo() {
  return (
    <HStack
      space="s"
      alignItems="center"
    >
      <Avatar
        size="xs"
        name="张三"
      />
      <Avatar
        size="sm"
        name="李四"
      />
      <Avatar
        size="md"
        name="王五"
      />
      <Avatar
        size="lg"
        name="John Doe"
      />
    </HStack>
  )
}

function AccordionDemo() {
  return (
    <VStack space="s">
      <Text
        variant="label"
        marginBottom="xs"
      >
        单项展开（默认）
      </Text>
      <Accordion defaultIndex={[0]}>
        <Accordion.Item title="什么是 NativeUI？">
          <Text variant="body">NativeUI 是基于 @shopify/restyle 的 React Native 组件库，提供丰富的主题化组件。</Text>
        </Accordion.Item>
        <Accordion.Item title="如何安装？">
          <Text variant="body">运行 npm install kra-ui @shopify/restyle 即可安装。</Text>
        </Accordion.Item>
        <Accordion.Item
          title="禁用项"
          isDisabled
        >
          <Text variant="body">该项已禁用，无法展开。</Text>
        </Accordion.Item>
      </Accordion>

      <Text
        variant="label"
        marginTop="s"
        marginBottom="xs"
      >
        多项展开 + 分离样式
      </Text>
      <Accordion
        type="multiple"
        variant="separated"
        defaultIndex={[0]}
      >
        <Accordion.Item title="React Native">
          <Text variant="body">使用 React 构建原生移动应用的框架。</Text>
        </Accordion.Item>
        <Accordion.Item title="Expo">
          <Text variant="body">简化 React Native 开发流程的工具链。</Text>
        </Accordion.Item>
      </Accordion>
    </VStack>
  )
}

function SpinnerDemo() {
  return (
    <HStack
      space="m"
      alignItems="center"
    >
      <Spinner size="sm" />
      <Spinner size="lg" />
      <Spinner
        size="sm"
        colorKey="success"
      />
      <Spinner
        size="sm"
        colorKey="error"
      />
    </HStack>
  )
}

function AlertDemo() {
  return (
    <VStack space="s">
      <Alert
        status="info"
        title="提示"
        description="这是一条信息提示"
      />
      <Alert
        status="success"
        title="成功"
        description="操作已成功完成"
      />
      <Alert
        status="warning"
        title="警告"
        description="请注意此操作"
      />
      <Alert
        status="error"
        title="错误"
        description="操作失败，请重试"
      />
    </VStack>
  )
}

function ModalDemo() {
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState<"sm" | "md" | "lg">("md")
  return (
    <>
      <HStack space="s">
        <Button
          label="小弹窗"
          variant="outline"
          size="sm"
          onPress={() => {
            setSize("sm")
            setVisible(true)
          }}
        />
        <Button
          label="中弹窗"
          variant="outline"
          size="sm"
          onPress={() => {
            setSize("md")
            setVisible(true)
          }}
        />
        <Button
          label="大弹窗"
          variant="outline"
          size="sm"
          onPress={() => {
            setSize("lg")
            setVisible(true)
          }}
        />
      </HStack>
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        size={size}
      >
        <Modal.Header title={`${size.toUpperCase()} 尺寸弹窗`} />
        <Modal.Body>
          <Text variant="body">这是一个 {size} 尺寸的模态弹窗示例，点击遮罩或关闭按钮可以关闭。</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="取消"
            variant="outline"
            size="sm"
            onPress={() => setVisible(false)}
          />
          <Button
            label="确认"
            variant="filled"
            size="sm"
            onPress={() => setVisible(false)}
          />
        </Modal.Footer>
      </Modal>
    </>
  )
}

function PopupDemo() {
  const [visible, setVisible] = useState(false)
  const [half, setHalf] = useState(false)
  return (
    <>
      <HStack space="s">
        <Button
          label="自适应高度"
          variant="outline"
          size="sm"
          onPress={() => {
            setHalf(false)
            setVisible(true)
          }}
        />
        <Button
          label="半屏面板"
          variant="outline"
          size="sm"
          onPress={() => {
            setHalf(true)
            setVisible(true)
          }}
        />
      </HStack>
      <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        title="操作面板"
        height={half ? 0.5 : "auto"}
      >
        <VStack space="s">
          <Text variant="body">这是一个底部弹出面板，支持手势下滑关闭。</Text>
          <Button
            label="确认"
            variant="filled"
            onPress={() => setVisible(false)}
          />
        </VStack>
      </Popup>
    </>
  )
}

function ToastDemo() {
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState<"info" | "success" | "warning" | "error">("info")

  const messages = {
    info: "这是一条信息提示",
    success: "操作已成功完成",
    warning: "请注意此操作",
    error: "操作失败，请重试",
  }

  return (
    <>
      <HStack
        space="s"
        flexWrap="wrap"
      >
        {(["info", "success", "warning", "error"] as const).map((s) => (
          <Button
            key={s}
            label={s.charAt(0).toUpperCase() + s.slice(1)}
            variant="outline"
            size="sm"
            onPress={() => {
              setStatus(s)
              setVisible(true)
            }}
          />
        ))}
      </HStack>
      <Toast
        visible={visible}
        onClose={() => setVisible(false)}
        message={messages[status]}
        status={status}
      />
    </>
  )
}

function TabsDemo() {
  const [tabKey, setTabKey] = useState("tab1")
  return (
    <VStack space="m">
      <Text
        variant="label"
        marginBottom="xs"
      >
        下划线变体
      </Text>
      <Tabs
        items={[
          { label: "推荐", key: "tab1" },
          { label: "热门", key: "tab2" },
          { label: "最新", key: "tab3" },
        ]}
        activeKey={tabKey}
        onChange={setTabKey}
        variant="underline"
      >
        <Text variant="body">这是推荐内容区域</Text>
        <Text variant="body">这是热门内容区域</Text>
        <Text variant="body">这是最新内容区域</Text>
      </Tabs>

      <Text
        variant="label"
        marginBottom="xs"
      >
        胶囊变体
      </Text>
      <Tabs
        items={[
          { label: "日", key: "d" },
          { label: "周", key: "w" },
          { label: "月", key: "m" },
        ]}
        variant="pill"
        size="sm"
      >
        <Text variant="body">按日查看</Text>
        <Text variant="body">按周查看</Text>
        <Text variant="body">按月查看</Text>
      </Tabs>
    </VStack>
  )
}

function DropdownDemo() {
  return (
    <Dropdown
      trigger="选择操作"
      items={[
        { key: "edit", label: "编辑" },
        { key: "copy", label: "复制" },
        { key: "delete", label: "删除", divider: true },
      ]}
      onSelect={(key) => console.log("选中:", key)}
    />
  )
}

function LayoutDemo() {
  return (
    <VStack space="s">
      <Text
        variant="label"
        marginBottom="xs"
      >
        Flex 布局
      </Text>
      <Flex
        justify="space-between"
        marginBottom="s"
      >
        <Box
          backgroundColor="primaryLight"
          padding="s"
          borderRadius="s"
        >
          <Text>A</Text>
        </Box>
        <Box
          backgroundColor="primaryLight"
          padding="s"
          borderRadius="s"
        >
          <Text>B</Text>
        </Box>
        <Box
          backgroundColor="primaryLight"
          padding="s"
          borderRadius="s"
        >
          <Text>C</Text>
        </Box>
      </Flex>

      <Text
        variant="label"
        marginBottom="xs"
      >
        Center 居中
      </Text>
      <Center
        height={80}
        backgroundColor="primaryLight"
        borderRadius="m"
      >
        <Text>居中内容</Text>
      </Center>
    </VStack>
  )
}

function AspectRatioDemo() {
  return (
    <HStack space="s">
      <AspectRatio
        ratio={1}
        flex={1}
      >
        <Center
          flex={1}
          backgroundColor="primaryLight"
          borderRadius="m"
        >
          <Text>1:1</Text>
        </Center>
      </AspectRatio>
      <AspectRatio
        ratio={16 / 9}
        flex={1}
      >
        <Center
          flex={1}
          backgroundColor="successLight"
          borderRadius="m"
        >
          <Text>16:9</Text>
        </Center>
      </AspectRatio>
    </HStack>
  )
}

function GridDemo() {
  return (
    <Grid
      columns={3}
      spacing="s"
    >
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Box
          key={n}
          backgroundColor="primaryLight"
          padding="m"
          borderRadius="s"
        >
          <Text>{n}</Text>
        </Box>
      ))}
    </Grid>
  )
}

function GroupDemo() {
  return (
    <Group spacing="s">
      <Button
        label="取消"
        variant="outline"
        size="sm"
        onPress={() => {}}
      />
      <Button
        label="保存"
        variant="filled"
        size="sm"
        onPress={() => {}}
      />
      <Button
        label="提交"
        variant="filled"
        size="sm"
        onPress={() => {}}
      />
    </Group>
  )
}

function SeparatorDemo() {
  return (
    <VStack space="s">
      <Separator />
      <Separator label="或者" />
      <Separator label="更多选项" />
    </VStack>
  )
}

function PageContainerDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleToggleLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <PageContainer
      title="PageContainer 演示"
      onBack={() => router.back()}
      showFooter={true}
      footerButtonLabel="提交"
      onFooterPress={() => console.log("底部按钮点击")}
      isLoading={isLoading}
      renderRight={() => (
        <Pressable onPress={handleToggleLoading}>
          <Text
            color="primary"
            fontSize={14}
          >
            加载
          </Text>
        </Pressable>
      )}
    >
      <VStack space="m">
        <Card variant="elevated">
          <Text variant="label">基本功能</Text>
          <Text
            variant="caption"
            marginTop="xs"
          >
            顶部导航栏（返回 + 标题 + 右侧操作）、可滚动内容区、固定底部按钮
          </Text>
        </Card>
        <Card variant="outline">
          <Text variant="label">加载状态</Text>
          <Text
            variant="caption"
            marginTop="xs"
          >
            点击右上角「加载」按钮查看加载遮罩效果
          </Text>
        </Card>
        <Card variant="outline">
          <Text variant="label">入场动画</Text>
          <Text
            variant="caption"
            marginTop="xs"
          >
            默认开启 FadeIn 动画，头部从上方淡入，底部从下方淡入
          </Text>
        </Card>
        <Card variant="outline">
          <Text variant="label">StatusBar 集成</Text>
          <Text
            variant="caption"
            marginTop="xs"
          >
            可配置 statusBarStyle、hideStatusBar 等属性
          </Text>
        </Card>
        {Array.from({ length: 6 }, (_, i) => (
          <Card
            key={i}
            variant="filled"
          >
            <Text variant="body">滚动内容项 #{i + 1}</Text>
          </Card>
        ))}
      </VStack>
    </PageContainer>
  )
}

function StepsDemo() {
  const [current, setCurrent] = useState(1)
  const [verticalCurrent, setVerticalCurrent] = useState(1)

  return (
    <VStack space="l">
      <Heading size="h4">基本用法</Heading>
      <Steps
        current={current}
        items={[
          { title: "账号信息" },
          { title: "身份验证" },
          { title: "完成注册" },
        ]}
      />
      <HStack space="s">
        <Button label="上一步" variant="outline" size="sm" onPress={() => setCurrent((p) => Math.max(0, p - 1))} />
        <Button label="下一步" size="sm" onPress={() => setCurrent((p) => Math.min(2, p + 1))} />
      </HStack>

      <Heading size="h4">带描述</Heading>
      <Steps
        current={1}
        items={[
          { title: "账号信息", description: "填写用户名和邮箱" },
          { title: "身份验证", description: "验证手机号码" },
          { title: "完成注册", description: "设置密码并提交" },
        ]}
      />

      <Heading size="h4">错误状态</Heading>
      <Steps
        current={1}
        items={[
          { title: "提交订单" },
          { title: "支付", status: "error" },
          { title: "完成" },
        ]}
      />

      <Heading size="h4">可点击</Heading>
      <Steps
        current={current}
        onChange={setCurrent}
        items={[
          { title: "第一步" },
          { title: "第二步" },
          { title: "第三步" },
        ]}
      />

      <Heading size="h4">垂直方向</Heading>
      <Steps
        current={verticalCurrent}
        orientation="vertical"
        onChange={setVerticalCurrent}
        items={[
          { title: "创建账户", description: "填写基本信息完成注册" },
          { title: "实名认证", description: "上传身份证照片进行验证" },
          { title: "绑定银行卡", description: "添加银行卡用于收款" },
          { title: "开始使用" },
        ]}
      />

      <Heading size="h4">不同尺寸</Heading>
      <Text variant="caption" color="textSecondary">Small</Text>
      <Steps current={1} size="sm" items={[{ title: "步骤一" }, { title: "步骤二" }, { title: "步骤三" }]} />
      <Text variant="caption" color="textSecondary">Medium（默认）</Text>
      <Steps current={1} size="md" items={[{ title: "步骤一" }, { title: "步骤二" }, { title: "步骤三" }]} />
      <Text variant="caption" color="textSecondary">Large</Text>
      <Steps current={1} size="lg" items={[{ title: "步骤一" }, { title: "步骤二" }, { title: "步骤三" }]} />
    </VStack>
  )
}

// ─── 演示注册表 ───────────────────────────────────

/** 名称 -> 标题映射 */
const TITLE_MAP: Record<string, string> = {
  typography: "排版 Typography",
  code: "行内代码 Code",
  highlight: "高亮 Highlight",
  link: "链接 Link",
  list: "列表 List",
  button: "按钮 Button",
  input: "输入框 Input",
  "password-input": "密码输入 PasswordInput",
  "number-input": "数字输入 NumberInput",
  "pin-input": "PIN码 PinInput",
  textarea: "多行输入 Textarea",
  checkbox: "复选框 Checkbox",
  radio: "单选框 Radio",
  switch: "开关 Switch",
  rating: "评分 Rating",
  "segmented-control": "分段控制 SegmentedControl",
  card: "卡片 Card",
  badge: "徽章 Badge",
  avatar: "头像 Avatar",
  accordion: "手风琴 Accordion",
  spinner: "加载 Spinner",
  alert: "提示 Alert",
  modal: "弹窗 Modal",
  popup: "底部弹出 Popup",
  toast: "轻提示 Toast",
  tabs: "选项卡 Tabs",
  dropdown: "下拉菜单 Dropdown",
  layout: "布局 Layout",
  "aspect-ratio": "宽高比 AspectRatio",
  grid: "网格 Grid",
  group: "分组 Group",
  separator: "分隔符 Separator",
  steps: "步骤条 Steps",
  "page-container": "页面容器 PageContainer",
}

/** 名称 -> 演示组件映射 */
const DEMO_MAP: Record<string, React.ComponentType> = {
  typography: TypographyDemo,
  code: CodeDemo,
  highlight: HighlightDemo,
  link: LinkDemo,
  list: ListDemo,
  button: ButtonDemo,
  input: InputDemo,
  "password-input": PasswordInputDemo,
  "number-input": NumberInputDemo,
  "pin-input": PinInputDemo,
  textarea: TextareaDemo,
  checkbox: CheckboxDemo,
  radio: RadioDemo,
  switch: SwitchDemo,
  rating: RatingDemo,
  "segmented-control": SegmentedControlDemo,
  card: CardDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  accordion: AccordionDemo,
  spinner: SpinnerDemo,
  alert: AlertDemo,
  modal: ModalDemo,
  popup: PopupDemo,
  toast: ToastDemo,
  tabs: TabsDemo,
  dropdown: DropdownDemo,
  layout: LayoutDemo,
  "aspect-ratio": AspectRatioDemo,
  grid: GridDemo,
  group: GroupDemo,
  separator: SeparatorDemo,
  steps: StepsDemo,
  "page-container": PageContainerDemo,
}

// ─── 详情页 ───────────────────────────────────────

export default function DemoScreen() {
  const { name } = useLocalSearchParams<{ name: string }>()
  const { colorMode } = useColorMode()
  const router = useRouter()

  const title = TITLE_MAP[name] ?? name
  const DemoComponent = DEMO_MAP[name]

  // PageContainerDemo 自身已包含完整 PageContainer，直接渲染避免嵌套
  if (name === "page-container" && DemoComponent) {
    return <DemoComponent />
  }

  return (
    <PageContainer
      title={title}
      onBack={() => router.back()}
      showFooter={false}
      statusBarStyle={colorMode === "dark" ? "light-content" : "dark-content"}>
      {DemoComponent ? (
        <DemoComponent />
      ) : (
        <Text variant="body" color="textSecondary">
          未找到该组件的演示
        </Text>
      )}
    </PageContainer>
  )
}
