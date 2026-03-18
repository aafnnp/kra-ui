import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import type { ToastConfig, ToastItem, ToastShowOptions, ToastStatus } from './types';
import { createToastItem, findDedupTarget, toastReducer, type ToastManagerDeps, type ToastState } from './ToastManager';
import { setToastApi } from './toastApi';

export interface ToastContextValue {
  toasts: ToastItem[];
  config: ToastConfig;
  show: (options: ToastShowOptions) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
  info: (options: Omit<ToastShowOptions, 'status'>) => string;
  success: (options: Omit<ToastShowOptions, 'status'>) => string;
  warning: (options: Omit<ToastShowOptions, 'status'>) => string;
  error: (options: Omit<ToastShowOptions, 'status'>) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  config?: ToastConfig;
  deps?: Partial<ToastManagerDeps>;
}

const defaultDeps: ToastManagerDeps = {
  now: () => Date.now(),
  generateId: (() => {
    let counter = 0;
    return () => `${Date.now()}_${++counter}`;
  })(),
};

/**
 * Toast Provider
 * - 提供队列状态与 show/dismiss 等方法
 */
export function ToastProvider({children, config, deps}: ToastProviderProps) {
  const mergedDeps: ToastManagerDeps = useMemo(
    () => ({
      now: deps?.now ?? defaultDeps.now,
      generateId: deps?.generateId ?? defaultDeps.generateId,
    }),
    [deps?.now, deps?.generateId],
  );

  const initialState: ToastState = useMemo(() => ({toasts: []}), []);
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const dismiss = useCallback((id: string) => {
    dispatch({type: 'DISMISS', id});
  }, []);

  const clearAll = useCallback(() => {
    dispatch({type: 'CLEAR_ALL'});
  }, []);

  const show = useCallback(
    (options: ToastShowOptions) => {
      const now = mergedDeps.now();
      const dedup = findDedupTarget(
        state.toasts,
        {message: options.message, status: (options.status ?? 'info') as ToastStatus},
        config,
        now,
      );
      if (dedup) {
        return dedup.id;
      }

      const item = createToastItem(options, config, {
        ...mergedDeps,
        now: () => now,
      });
      dispatch({type: 'ADD', item});
      return item.id;
    },
    [mergedDeps, state.toasts, config],
  );

  const createShowByStatus = useCallback(
    (status: ToastStatus) => (options: Omit<ToastShowOptions, 'status'>) =>
      show({
        ...options,
        status,
      }),
    [show],
  );

  const value: ToastContextValue = useMemo(
    () => ({
      toasts: state.toasts,
      config: config ?? {},
      show,
      dismiss,
      clearAll,
      info: createShowByStatus('info'),
      success: createShowByStatus('success'),
      warning: createShowByStatus('warning'),
      error: createShowByStatus('error'),
    }),
    [state.toasts, config, show, dismiss, clearAll, createShowByStatus],
  );

  useEffect(() => {
    setToastApi({
      show: value.show,
      dismiss: value.dismiss,
      clearAll: value.clearAll,
      info: value.info,
      success: value.success,
      warning: value.warning,
      error: value.error,
    });

    return () => {
      setToastApi(null);
    };
  }, [value]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

/**
 * 获取 Toast API
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast 必须在 ToastProvider 内使用');
  }
  return ctx;
}

