import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Modal from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';
import theme from '../../../theme/theme';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('closeOnOverlay=false 时点击遮罩不触发 onClose', () => {
  const onClose = jest.fn();
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={onClose} closeOnOverlay={false}>
      <Modal.Body>
        <></>
      </Modal.Body>
    </Modal>,
  );

  fireEvent.press(getByTestId('native-ui-modal-overlay'));
  expect(onClose).not.toHaveBeenCalled();
});

test('closeOnOverlay=true 时点击遮罩触发 onClose', () => {
  const onClose = jest.fn();
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={onClose} closeOnOverlay>
      <Modal.Body>
        <></>
      </Modal.Body>
    </Modal>,
  );

  fireEvent.press(getByTestId('native-ui-modal-overlay'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('overlay 背景色来自主题 token', () => {
  const onClose = jest.fn();
  const { getByTestId } = renderWithProvider(
    <Modal visible onClose={onClose}>
      <Modal.Body>
        <></>
      </Modal.Body>
    </Modal>,
  );

  expect(getByTestId('native-ui-modal-overlay')).toHaveStyle({
    backgroundColor: theme.colors.overlay,
  });
});

