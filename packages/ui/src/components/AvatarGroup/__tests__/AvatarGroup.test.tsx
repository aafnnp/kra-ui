/**
 * AvatarGroup 用例
 * - 超出 max 时显示 +N
 */
import React from 'react';
import {render} from '@testing-library/react-native';
import Avatar from '../../Avatar';
import AvatarGroup from '../index';
import {NativeUIProvider} from '../../../provider/NativeUIProvider';

const Wrapper: React.FC<React.PropsWithChildren> = ({children}) => (
  <NativeUIProvider>{children}</NativeUIProvider>
);

const renderWithProvider = (ui: React.ReactElement) =>
  render(ui, {wrapper: Wrapper});

test('超出 max 时显示 +N', () => {
  const {getByText} = renderWithProvider(
    <AvatarGroup max={2}>
      <Avatar name="A" />
      <Avatar name="B" />
      <Avatar name="C" />
    </AvatarGroup>,
  );
  expect(getByText('+1')).toBeTruthy();
});
