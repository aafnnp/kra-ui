/**
 * Textarea 组件基础用例
 * - 渲染占位符
 * - 输入变更回调
 * - isInvalid 与 isDisabled 状态
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Textarea from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('渲染占位符文本', () => {
  const { getByPlaceholderText } = renderWithProvider(<Textarea placeholder="请输入内容" />);
  expect(getByPlaceholderText('请输入内容')).toBeTruthy();
});

test('输入变更时触发 onChangeText', () => {
  const onChangeText = jest.fn();
  const { getByPlaceholderText } = renderWithProvider(
    <Textarea placeholder="输入" onChangeText={onChangeText} />,
  );

  const input = getByPlaceholderText('输入');
  fireEvent.changeText(input, 'hello');

  expect(onChangeText).toHaveBeenCalledWith('hello');
});

test('isInvalid 与 isDisabled 会反映到无障碍 state', () => {
  const { getByPlaceholderText: getByPlaceholderTextInvalid } = renderWithProvider(
    <Textarea placeholder="无效" isInvalid />,
  );
  expect(getByPlaceholderTextInvalid('无效').props.accessibilityHint).toBe('输入无效');

  const { getByPlaceholderText: getByPlaceholderTextDisabled } = renderWithProvider(
    <Textarea placeholder="禁用" isDisabled />,
  );
  expect(getByPlaceholderTextDisabled('禁用').props.accessibilityState).toMatchObject({
    disabled: true,
  });
});
