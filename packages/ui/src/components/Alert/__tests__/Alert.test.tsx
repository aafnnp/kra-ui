/**
 * Alert 组件基础用例
 * - 默认渲染 title/message
 * - closable 触发 onClose
 * - 兼容旧 props：status/title/description
 */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Alert from '../index';
import {NativeUIProvider} from '../../../provider/NativeUIProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('默认使用 variant 渲染 title/message', () => {
  const {getByText} = renderWithProvider(
    <Alert
      variant="info"
      title="提示"
      message="这是一条信息提示"
    />,
  );

  expect(getByText('提示')).toBeTruthy();
  expect(getByText('这是一条信息提示')).toBeTruthy();
});

test('closable 时点击触发 onClose', () => {
  const onClose = jest.fn();
  const {getByLabelText} = renderWithProvider(
    <Alert
      variant="warning"
      title="警告"
      message="请注意"
      closable
      onClose={onClose}
    />,
  );

  fireEvent.press(getByLabelText('关闭提示'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('兼容旧 props：status/title/description', () => {
  const {getByText} = renderWithProvider(
    <Alert
      status="success"
      title="成功"
      description="操作已完成"
    />,
  );

  expect(getByText('成功')).toBeTruthy();
  expect(getByText('操作已完成')).toBeTruthy();
});

