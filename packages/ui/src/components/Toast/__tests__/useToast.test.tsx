import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ToastProvider, useToast } from '../ToastContext';

describe('useToast', () => {
  test('show 会入队，dismiss 会移除', () => {
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
      result.current.show({message: 'hello'});
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].id).toBe('id_1');

    act(() => {
      result.current.dismiss('id_1');
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  test('dedup: 短时间内相同 status+message 会返回已有 id 且不重复入队', () => {
    let now = 1000;
    const wrapper = ({children}: {children: React.ReactNode}) => (
      <ToastProvider
        config={{enableDedup: true, dedupInterval: 1000}}
        deps={{
          now: () => now,
          generateId: () => `id_${now}`,
        }}>
        {children}
      </ToastProvider>
    );

    const {result} = renderHook(() => useToast(), {wrapper});

    let id1 = '';
    act(() => {
      id1 = result.current.show({message: 'same', status: 'success'});
    });
    expect(id1).toBe('id_1000');
    expect(result.current.toasts).toHaveLength(1);

    now = 1500;
    let id2 = '';
    act(() => {
      id2 = result.current.show({message: 'same', status: 'success'});
    });
    expect(id2).toBe(id1);
    expect(result.current.toasts).toHaveLength(1);
  });
});

