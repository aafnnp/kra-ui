import type { ToastShowOptions } from './types';

export interface ToastApi {
  show: (options: ToastShowOptions) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
  info: (options: Omit<ToastShowOptions, 'status'>) => string;
  success: (options: Omit<ToastShowOptions, 'status'>) => string;
  warning: (options: Omit<ToastShowOptions, 'status'>) => string;
  error: (options: Omit<ToastShowOptions, 'status'>) => string;
}

let currentApi: ToastApi | null = null;

/**
 * 注册全局 toast API（由 Provider 在挂载时调用）
 */
export function setToastApi(api: ToastApi | null) {
  currentApi = api;
}

function ensureApi(): ToastApi {
  if (!currentApi) {
    throw new Error('toast 未初始化，请确认已使用 NativeUIProvider 包裹应用');
  }
  return currentApi;
}

export const toast: ToastApi = {
  show: options => ensureApi().show(options),
  dismiss: id => ensureApi().dismiss(id),
  clearAll: () => ensureApi().clearAll(),
  info: options => ensureApi().info(options),
  success: options => ensureApi().success(options),
  warning: options => ensureApi().warning(options),
  error: options => ensureApi().error(options),
};

