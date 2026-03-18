import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { toast } from '../toastApi';
import { ToastProvider, useToast } from '../ToastContext';

describe('toast global api', () => {
  test('未初始化时调用会抛错', () => {
    expect(() => toast.show({message: 'x'})).toThrow('toast 未初始化');
  });

  test('Provider 挂载后可以通过 toast.show 入队', () => {
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastProvider
        deps={{
          now: () => 1000,
          generateId: () => 'id_1',
        }}>
        {children}
      </ToastProvider>
    );

    const {result} = renderHook(() => useToast(), {wrapper});

    act(() => {
      toast.show({message: 'hello'});
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe('id_1');
  });
});

