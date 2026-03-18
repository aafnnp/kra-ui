/**
 * Avatar 新行为用例（先写失败）
 * - 无 source 且无 name 时显示 ?
 * - 无 source 且有 name 时显示最多 2 个 initials（中文/英文）
 * - 有 onPress 时点击触发回调（通过 accessibilityLabel="用户头像" 定位）
 * - isDisabled 时不触发 onPress
 * - 图片 error 后回退到 initials 且触发 onImageError
 * - 传入 status 时渲染状态角标（通过 labelText 断言）
 */
import React from 'react';
import {Image} from 'react-native';
import {render, fireEvent} from '@testing-library/react-native';
import Avatar from '../index';
import {NativeUIProvider} from '../../../provider/NativeUIProvider';

const Wrapper: React.FC<React.PropsWithChildren> = ({children}) => (
  <NativeUIProvider>{children}</NativeUIProvider>
);

const renderWithProvider = (ui: React.ReactElement) =>
  render(ui, {wrapper: Wrapper});

test('无 source 且无 name 时显示 ?', () => {
  const {getByText} = renderWithProvider(<Avatar />);

  expect(getByText('?')).toBeTruthy();
});

test('无 source 且有 name 时显示最多 2 个 initials', () => {
  const {getByText, rerender} = renderWithProvider(
    <Avatar name="张三" />,
  );

  // 中文：取前两个字符（示例：张三 -> 张三）
  expect(getByText('张三')).toBeTruthy();

  // 英文：取单词首字母并大写（示例：john smith -> JS）
  rerender(<Avatar name="john smith" />);
  expect(getByText('JS')).toBeTruthy();
});

test('有 onPress 时点击触发回调（通过 accessibilityLabel="用户头像" 定位）', () => {
  const onPress = jest.fn();
  const {getByLabelText} = renderWithProvider(
    <Avatar {...({onPress, accessibilityLabel: '用户头像'} as any)} />,
  );

  fireEvent.press(getByLabelText('用户头像'));
  expect(onPress).toHaveBeenCalledTimes(1);
});

test('isDisabled 时不触发 onPress', () => {
  const onPress = jest.fn();
  const {getByLabelText} = renderWithProvider(
    <Avatar
      {...({onPress, isDisabled: true, accessibilityLabel: '用户头像'} as any)}
    />,
  );

  fireEvent.press(getByLabelText('用户头像'));
  expect(onPress).not.toHaveBeenCalled();
});

test('图片 error 后回退到 initials 且触发 onImageError', () => {
  const onImageError = jest.fn();
  const {getByText, UNSAFE_getByType} = renderWithProvider(
    <Avatar
      name="john smith"
      source={{uri: 'https://example.com/avatar.png'}}
      {...({onImageError} as any)}
    />,
  );

  const image = UNSAFE_getByType(Image);
  fireEvent(image, 'onError', {nativeEvent: {error: 'boom'}});

  expect(onImageError).toHaveBeenCalledTimes(1);
  expect(getByText('JS')).toBeTruthy();
});

test('传入 status 时渲染状态角标', () => {
  const {getByLabelText} = renderWithProvider(
    <Avatar {...({status: 'online'} as any)} />,
  );

  expect(getByLabelText('在线')).toBeTruthy();
});

