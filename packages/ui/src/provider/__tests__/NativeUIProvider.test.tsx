/**
 * NativeUIProvider / useColorMode 基础用例
 * - 默认颜色模式为 light
 * - toggleColorMode 能在 light/dark 之间切换
 */
import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { NativeUIProvider, useColorMode } from '../NativeUIProvider';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <NativeUIProvider initialColorMode="light">{children}</NativeUIProvider>
);

test('默认颜色模式为 light', () => {
  const { result } = renderHook(() => useColorMode(), { wrapper });
  expect(result.current.colorMode).toBe('light');
});

test('toggleColorMode 在 light/dark 之间切换', () => {
  const { result } = renderHook(() => useColorMode(), { wrapper });

  act(() => {
    result.current.toggleColorMode();
  });
  expect(result.current.colorMode).toBe('dark');

  act(() => {
    result.current.toggleColorMode();
  });
  expect(result.current.colorMode).toBe('light');
});
