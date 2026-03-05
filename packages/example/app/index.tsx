import React, { useState } from "react"
import { ScrollView, SafeAreaView, StatusBar } from "react-native"
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
  Flex,
  HStack,
  VStack,
  Center,
  Divider,
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
} from "kra-ui"

/** 各组件分区展示 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box marginBottom="l">
      <Heading
        size="h4"
        marginBottom="s"
      >
        {title}
      </Heading>
      {children}
    </Box>
  )
}

export default function HomeScreen() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [inputValue, setInputValue] = useState("")
  const [switchValue, setSwitchValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState("apple")
  const [ratingValue, setRatingValue] = useState(3)
  const [numberValue, setNumberValue] = useState(5)
  const [passwordValue, setPasswordValue] = useState("")
  const [pinValue, setPinValue] = useState("")
  const [segmentValue, setSegmentValue] = useState("all")
  const [textareaValue, setTextareaValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSize, setModalSize] = useState<"sm" | "md" | "lg">("md")

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={colorMode === "dark" ? "light-content" : "dark-content"} />
      <ScrollView>
        <Box
          padding="m"
          backgroundColor="mainBackground"
          flex={1}
        >
          {/* 标题 */}
          <HStack
            space="s"
            marginBottom="m"
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading size="h2">NativeUI</Heading>
            <Button
              label={colorMode === "light" ? "暗色" : "亮色"}
              variant="outline"
              size="sm"
              onPress={toggleColorMode}
            />
          </HStack>

          <Text
            variant="body"
            color="textSecondary"
            marginBottom="l"
          >
            基于 @shopify/restyle 的 React Native 组件库
          </Text>

          <Divider />

          {/* 排版 */}
          <Section title="排版 Typography">
            <VStack space="xs">
              <Heading size="h1">Heading H1</Heading>
              <Heading size="h2">Heading H2</Heading>
              <Heading size="h3">Heading H3</Heading>
              <Heading size="h4">Heading H4</Heading>
              <Text variant="body">Body 正文文本</Text>
              <Text variant="caption">Caption 辅助说明文本</Text>
              <Text variant="label">Label 标签文本</Text>
            </VStack>
          </Section>

          <Divider />

          {/* Code 行内代码 */}
          <Section title="行内代码 Code">
            <VStack space="s">
              <Code>const x = 42;</Code>
              <Code>npm install kra-ui</Code>
            </VStack>
          </Section>

          <Divider />

          {/* Highlight 高亮 */}
          <Section title="高亮 Highlight">
            <VStack space="s">
              <Highlight query="React">React Native 是基于 React 的移动端框架</Highlight>
              <Highlight query={["组件", "主题"]}>NativeUI 提供丰富的组件和主题系统</Highlight>
            </VStack>
          </Section>

          <Divider />

          {/* Link 链接 */}
          <Section title="链接 Link">
            <VStack space="s">
              <Link href="https://reactnative.dev">React Native 官网</Link>
              <Link href="https://github.com">GitHub</Link>
            </VStack>
          </Section>

          <Divider />

          {/* List 列表 */}
          <Section title="列表 List">
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
          </Section>

          <Divider />

          {/* 按钮 */}
          <Section title="按钮 Button">
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
                  disabled
                  onPress={() => {}}
                />
                <Button
                  label="Danger"
                  variant="danger"
                  onPress={() => {}}
                />
              </HStack>
            </VStack>
          </Section>

          <Divider />

          {/* 输入框 */}
          <Section title="输入框 Input">
            <VStack space="s">
              <Input
                variant="outline"
                placeholder="Outline 输入框"
                value={inputValue}
                onChangeText={setInputValue}
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
          </Section>

          <Divider />

          {/* 密码输入框 */}
          <Section title="密码输入框 PasswordInput">
            <PasswordInput
              placeholder="请输入密码"
              value={passwordValue}
              onChangeText={setPasswordValue}
            />
          </Section>

          <Divider />

          {/* 数字输入框 */}
          <Section title="数字输入框 NumberInput">
            <NumberInput
              value={numberValue}
              onChange={setNumberValue}
              min={0}
              max={99}
              step={1}
            />
          </Section>

          <Divider />

          {/* PIN 码输入 */}
          <Section title="PIN 码输入 PinInput">
            <VStack space="s">
              <PinInput
                length={4}
                value={pinValue}
                onChange={setPinValue}
              />
              <PinInput
                length={6}
                mask
                value=""
                onChange={() => {}}
                size="sm"
              />
            </VStack>
          </Section>

          <Divider />

          {/* 多行输入 */}
          <Section title="多行输入 Textarea">
            <Textarea
              placeholder="请输入内容..."
              value={textareaValue}
              onChangeText={setTextareaValue}
              rows={4}
            />
          </Section>

          <Divider />

          {/* 复选框 */}
          <Section title="复选框 Checkbox">
            <VStack space="s">
              <Checkbox
                isChecked={checkboxValue}
                onChange={setCheckboxValue}
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
          </Section>

          <Divider />

          {/* 单选框 */}
          <Section title="单选框 Radio">
            <RadioGroup
              value={radioValue}
              onChange={setRadioValue}
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
          </Section>

          <Divider />

          {/* 开关 */}
          <Section title="开关 Switch">
            <VStack space="s">
              <Switch
                label="启用通知"
                value={switchValue}
                onValueChange={setSwitchValue}
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
          </Section>

          <Divider />

          {/* 评分 */}
          <Section title="评分 Rating">
            <VStack space="s">
              <Rating
                value={ratingValue}
                onChange={setRatingValue}
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
          </Section>

          <Divider />

          {/* 分段控制器 */}
          <Section title="分段控制器 SegmentedControl">
            <VStack space="s">
              <SegmentedControl
                segments={[
                  { label: "全部", value: "all" },
                  { label: "进行中", value: "active" },
                  { label: "已完成", value: "done" },
                ]}
                value={segmentValue}
                onChange={setSegmentValue}
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
          </Section>

          <Divider />

          {/* 卡片 */}
          <Section title="卡片 Card">
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
          </Section>

          <Divider />

          {/* 徽章 */}
          <Section title="徽章 Badge">
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
          </Section>

          <Divider />

          {/* 头像 */}
          <Section title="头像 Avatar">
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
          </Section>

          <Divider />

          {/* 加载 */}
          <Section title="加载 Spinner">
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
          </Section>

          <Divider />

          {/* 提示 */}
          <Section title="提示 Alert">
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
          </Section>

          <Divider />

          {/* 弹窗 */}
          <Section title="弹窗 Modal">
            <VStack space="s">
              <HStack space="s">
                <Button
                  label="小弹窗"
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    setModalSize("sm")
                    setModalVisible(true)
                  }}
                />
                <Button
                  label="中弹窗"
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    setModalSize("md")
                    setModalVisible(true)
                  }}
                />
                <Button
                  label="大弹窗"
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    setModalSize("lg")
                    setModalVisible(true)
                  }}
                />
              </HStack>
            </VStack>

            <Modal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              size={modalSize}
            >
              <Modal.Header title={`${modalSize.toUpperCase()} 尺寸弹窗`} />
              <Modal.Body>
                <Text variant="body">
                  这是一个 {modalSize} 尺寸的模态弹窗示例，点击遮罩或关闭按钮可以关闭。
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  label="取消"
                  variant="outline"
                  size="sm"
                  onPress={() => setModalVisible(false)}
                />
                <Button
                  label="确认"
                  variant="filled"
                  size="sm"
                  onPress={() => setModalVisible(false)}
                />
              </Modal.Footer>
            </Modal>
          </Section>

          <Divider />

          {/* 手风琴 */}
          <Section title="手风琴 Accordion">
            <VStack space="s">
              <Text variant="label" marginBottom="xs">
                单项展开（默认）
              </Text>
              <Accordion defaultIndex={[0]}>
                <Accordion.Item title="什么是 NativeUI？">
                  <Text variant="body">
                    NativeUI 是基于 @shopify/restyle 的 React Native 组件库，提供丰富的主题化组件。
                  </Text>
                </Accordion.Item>
                <Accordion.Item title="如何安装？">
                  <Text variant="body">
                    运行 npm install kra-ui @shopify/restyle 即可安装。
                  </Text>
                </Accordion.Item>
                <Accordion.Item title="禁用项" disabled>
                  <Text variant="body">该项已禁用，无法展开。</Text>
                </Accordion.Item>
              </Accordion>

              <Text variant="label" marginTop="s" marginBottom="xs">
                多项展开 + 分离样式
              </Text>
              <Accordion type="multiple" variant="separated" defaultIndex={[0]}>
                <Accordion.Item title="React Native">
                  <Text variant="body">使用 React 构建原生移动应用的框架。</Text>
                </Accordion.Item>
                <Accordion.Item title="Expo">
                  <Text variant="body">简化 React Native 开发流程的工具链。</Text>
                </Accordion.Item>
              </Accordion>
            </VStack>
          </Section>

          <Divider />

          {/* 布局 */}
          <Section title="布局 Layout">
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
              marginBottom="s"
            >
              <Text>居中内容</Text>
            </Center>
          </Section>

          <Divider />

          {/* AspectRatio */}
          <Section title="宽高比 AspectRatio">
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
          </Section>

          <Divider />

          {/* Grid */}
          <Section title="网格 Grid">
            <Grid
              columns={3}
              spacing="s"
            >
              <Box
                backgroundColor="primaryLight"
                padding="m"
                borderRadius="s"
              >
                <Text>1</Text>
              </Box>
              <Box
                backgroundColor="primaryLight"
                padding="m"
                borderRadius="s"
              >
                <Text>2</Text>
              </Box>
              <Box
                backgroundColor="primaryLight"
                padding="m"
                borderRadius="s"
              >
                <Text>3</Text>
              </Box>
              <Box
                backgroundColor="primaryLight"
                padding="m"
                borderRadius="s"
              >
                <Text>4</Text>
              </Box>
              <Box
                backgroundColor="primaryLight"
                padding="m"
                borderRadius="s"
              >
                <Text>5</Text>
              </Box>
              <Box
                backgroundColor="primaryLight"
                padding="m"
                borderRadius="s"
              >
                <Text>6</Text>
              </Box>
            </Grid>
          </Section>

          <Divider />

          {/* Group */}
          <Section title="分组 Group">
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
          </Section>

          <Divider />

          {/* Separator */}
          <Section title="分隔符 Separator">
            <VStack space="s">
              <Separator />
              <Separator label="或者" />
              <Separator label="更多选项" />
            </VStack>
          </Section>

          <Box height={48} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
