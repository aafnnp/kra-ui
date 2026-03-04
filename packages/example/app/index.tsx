import React, {useState} from 'react';
import {ScrollView, SafeAreaView, StatusBar} from 'react-native';
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
  Flex,
  HStack,
  VStack,
  Center,
  Divider,
  useColorMode,
} from '@native-ui/ui';

/** 各组件分区展示 */
function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <Box marginBottom="l">
      <Heading size="h4" marginBottom="s">
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export default function HomeScreen() {
  const {colorMode, toggleColorMode} = useColorMode();
  const [inputValue, setInputValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={colorMode === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
          {/* 标题 */}
          <HStack space="s" marginBottom="m" alignItems="center" justifyContent="space-between">
            <Heading size="h2">NativeUI</Heading>
            <Button
              label={colorMode === 'light' ? '暗色' : '亮色'}
              variant="outline"
              size="sm"
              onPress={toggleColorMode}
            />
          </HStack>

          <Text variant="body" color="textSecondary" marginBottom="l">
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

          {/* 按钮 */}
          <Section title="按钮 Button">
            <VStack space="s">
              <HStack space="s">
                <Button label="Filled" variant="filled" size="md" onPress={() => {}} />
                <Button label="Outline" variant="outline" size="md" onPress={() => {}} />
                <Button label="Ghost" variant="ghost" size="md" onPress={() => {}} />
              </HStack>
              <HStack space="s">
                <Button label="Small" variant="filled" size="sm" onPress={() => {}} />
                <Button label="Medium" variant="filled" size="md" onPress={() => {}} />
                <Button label="Large" variant="filled" size="lg" onPress={() => {}} />
              </HStack>
              <HStack space="s">
                <Button label="加载中..." variant="filled" loading onPress={() => {}} />
                <Button label="禁用" variant="filled" disabled onPress={() => {}} />
                <Button label="Danger" variant="danger" onPress={() => {}} />
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
              <Input variant="filled" placeholder="Filled 输入框" />
              <Input variant="underline" placeholder="Underline 输入框" />
              <Input variant="outline" placeholder="无效输入框" isInvalid />
              <Input variant="outline" placeholder="禁用输入框" isDisabled />
            </VStack>
          </Section>

          <Divider />

          {/* 开关 */}
          <Section title="开关 Switch">
            <Switch
              label="启用通知"
              value={switchValue}
              onValueChange={setSwitchValue}
            />
          </Section>

          <Divider />

          {/* 卡片 */}
          <Section title="卡片 Card">
            <VStack space="s">
              <Card variant="elevated">
                <Text variant="label">Elevated 卡片</Text>
                <Text variant="caption" marginTop="xs">
                  带阴影的卡片样式
                </Text>
              </Card>
              <Card variant="outline">
                <Text variant="label">Outline 卡片</Text>
                <Text variant="caption" marginTop="xs">
                  边框卡片样式
                </Text>
              </Card>
              <Card variant="filled">
                <Text variant="label">Filled 卡片</Text>
                <Text variant="caption" marginTop="xs">
                  填充卡片样式
                </Text>
              </Card>
            </VStack>
          </Section>

          <Divider />

          {/* 徽章 */}
          <Section title="徽章 Badge">
            <HStack space="s">
              <Badge label="Solid" variant="solid" />
              <Badge label="Subtle" variant="subtle" />
              <Badge label="Outline" variant="outline" />
            </HStack>
          </Section>

          <Divider />

          {/* 头像 */}
          <Section title="头像 Avatar">
            <HStack space="s" alignItems="center">
              <Avatar size="xs" name="张三" />
              <Avatar size="sm" name="李四" />
              <Avatar size="md" name="王五" />
              <Avatar size="lg" name="John Doe" />
            </HStack>
          </Section>

          <Divider />

          {/* 加载 */}
          <Section title="加载 Spinner">
            <HStack space="m" alignItems="center">
              <Spinner size="sm" />
              <Spinner size="lg" />
              <Spinner size="sm" colorKey="success" />
              <Spinner size="sm" colorKey="error" />
            </HStack>
          </Section>

          <Divider />

          {/* 提示 */}
          <Section title="提示 Alert">
            <VStack space="s">
              <Alert status="info" title="提示" description="这是一条信息提示" />
              <Alert status="success" title="成功" description="操作已成功完成" />
              <Alert status="warning" title="警告" description="请注意此操作" />
              <Alert status="error" title="错误" description="操作失败，请重试" />
            </VStack>
          </Section>

          <Divider />

          {/* 布局 */}
          <Section title="布局 Layout">
            <Text variant="label" marginBottom="xs">
              Flex 布局
            </Text>
            <Flex justify="space-between" marginBottom="s">
              <Box backgroundColor="primaryLight" padding="s" borderRadius="s">
                <Text>A</Text>
              </Box>
              <Box backgroundColor="primaryLight" padding="s" borderRadius="s">
                <Text>B</Text>
              </Box>
              <Box backgroundColor="primaryLight" padding="s" borderRadius="s">
                <Text>C</Text>
              </Box>
            </Flex>

            <Text variant="label" marginBottom="xs">
              Center 居中
            </Text>
            <Center
              height={80}
              backgroundColor="primaryLight"
              borderRadius="m"
              marginBottom="s">
              <Text>居中内容</Text>
            </Center>
          </Section>

          <Box height={48} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
