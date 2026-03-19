/**
 * Button 组件基础用例
 * - 渲染 label 文本
 * - 处理 onPress 回调
 * - loading 与 disabled 状态
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('渲染按钮 label 文本', () => {
  const { getByText } = renderWithProvider(<Button label="确定" />);
  expect(getByText('确定')).toBeTruthy();
});

test('点击时触发 onPress', () => {
  const onPress = jest.fn();
  const { getByText } = renderWithProvider(<Button label="点击" onPress={onPress} />);

  fireEvent.press(getByText('点击'));

  expect(onPress).toHaveBeenCalledTimes(1);
});

test('loading 或 isDisabled 时不触发 onPress', () => {
  const onPress = jest.fn();

  const { getByText: getByTextLoading } = renderWithProvider(
    <Button label="加载中" loading onPress={onPress} />,
  );
  fireEvent.press(getByTextLoading('加载中'));

  const { getByText: getByTextDisabled } = renderWithProvider(
    <Button label="禁用" isDisabled onPress={onPress} />,
  );
  fireEvent.press(getByTextDisabled('禁用'));

  expect(onPress).not.toHaveBeenCalled();
});

test('默认包含无障碍 role，并在 loading/disabled 时设置 state', () => {
  const { getByLabelText: getByLabelTextNormal } = renderWithProvider(<Button label="正常" />);
  expect(getByLabelTextNormal('正常').props.accessibilityRole).toBe('button');

  const { getByLabelText: getByLabelTextLoading } = renderWithProvider(
    <Button label="加载" isLoading />,
  );
  expect(getByLabelTextLoading('加载').props.accessibilityState).toMatchObject({
    busy: true,
    disabled: true,
  });

  const { getByLabelText: getByLabelTextDisabled } = renderWithProvider(
    <Button label="禁用" isDisabled />,
  );
  expect(getByLabelTextDisabled('禁用').props.accessibilityState).toMatchObject({
    disabled: true,
  });
});
