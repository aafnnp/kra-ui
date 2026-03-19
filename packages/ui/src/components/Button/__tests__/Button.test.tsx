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
import { theme } from '../../../theme';

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

  const { getByRole: getByRoleLoading } = renderWithProvider(
    <Button label="加载中" isLoading onPress={onPress} />,
  );
  const loadingButton = getByRoleLoading('button');
  expect(loadingButton.props.accessibilityState?.busy).toBe(true);
  fireEvent.press(loadingButton);

  const { getByRole: getByRoleDisabled } = renderWithProvider(
    <Button label="禁用" isDisabled onPress={onPress} />,
  );
  const disabledButton = getByRoleDisabled('button');
  expect(disabledButton.props.accessibilityState?.disabled).toBe(true);
  fireEvent.press(disabledButton);

  expect(onPress).not.toHaveBeenCalled();
});

test('isLoading 会设置 accessibilityState.busy', () => {
  const { getByRole } = renderWithProvider(<Button label="加载中" isLoading />);
  const button = getByRole('button');
  expect(button.props.accessibilityState?.busy).toBe(true);
});

test('不同 size 会应用对应的 fontSize token', () => {
  const { getByText: getByTextSm } = renderWithProvider(<Button label="小" size="sm" />);
  const smStyle = getByTextSm('小').props.style;
  const smMergedStyle = Array.isArray(smStyle) ? Object.assign({}, ...smStyle) : smStyle;
  expect(smMergedStyle.fontSize).toBe(theme.buttonSizes.sm.fontSize);

  const { getByText: getByTextLg } = renderWithProvider(<Button label="大" size="lg" />);
  const lgStyle = getByTextLg('大').props.style;
  const lgMergedStyle = Array.isArray(lgStyle) ? Object.assign({}, ...lgStyle) : lgStyle;
  expect(lgMergedStyle.fontSize).toBe(theme.buttonSizes.lg.fontSize);
});

test('outline/ghost 文本颜色使用 primary', () => {
  const { getByText: getByTextOutline } = renderWithProvider(
    <Button label="描边" variant="outline" />,
  );
  const outlineStyle = getByTextOutline('描边').props.style;
  const outlineMergedStyle = Array.isArray(outlineStyle)
    ? Object.assign({}, ...outlineStyle)
    : outlineStyle;
  expect(outlineMergedStyle.color).toBe(theme.colors.primary);

  const { getByText: getByTextGhost } = renderWithProvider(<Button label="幽灵" variant="ghost" />);
  const ghostStyle = getByTextGhost('幽灵').props.style;
  const ghostMergedStyle = Array.isArray(ghostStyle)
    ? Object.assign({}, ...ghostStyle)
    : ghostStyle;
  expect(ghostMergedStyle.color).toBe(theme.colors.primary);
});
