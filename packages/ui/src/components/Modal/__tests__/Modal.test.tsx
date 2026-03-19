import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Modal from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';
import { darkTheme, theme } from '../../../theme';

const renderWithProvider = (
  ui: React.ReactElement,
  { initialColorMode = 'light' }: { initialColorMode?: 'light' | 'dark' } = {},
) => {
  return render(<NativeUIProvider initialColorMode={initialColorMode}>{ui}</NativeUIProvider>);
};

test('遮罩色使用主题 overlay（浅色）', () => {
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={() => {}}>
      <Modal.Body />
    </Modal>,
  );

  const overlay = getByTestId('native-ui-modal-overlay');
  const style = overlay.props.style;
  const overlayStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;

  expect(overlayStyle.backgroundColor).toBe(theme.colors.overlay);
});

test('遮罩色使用主题 overlay（暗色）', () => {
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={() => {}}>
      <Modal.Body />
    </Modal>,
    { initialColorMode: 'dark' },
  );

  const overlay = getByTestId('native-ui-modal-overlay');
  const style = overlay.props.style;
  const overlayStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;

  expect(overlayStyle.backgroundColor).toBe(darkTheme.colors.overlay);
});

test('closeOnOverlay=false 时点击遮罩不触发 onClose', () => {
  const onClose = jest.fn();
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={onClose} closeOnOverlay={false}>
      <Modal.Body />
    </Modal>,
  );

  fireEvent.press(getByTestId('native-ui-modal-overlay'));
  expect(onClose).not.toHaveBeenCalled();
});

test('closeOnOverlay=true 时点击遮罩触发 onClose', () => {
  const onClose = jest.fn();
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={onClose} closeOnOverlay>
      <Modal.Body />
    </Modal>,
  );

  fireEvent.press(getByTestId('native-ui-modal-overlay'));
  expect(onClose).toHaveBeenCalledTimes(1);
});
