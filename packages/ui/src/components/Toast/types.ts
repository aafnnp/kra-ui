/** Toast 状态类型 */
export type ToastStatus = 'info' | 'success' | 'warning' | 'error';

/** Toast 位置 */
export type ToastPlacement = 'top' | 'bottom';

export interface ToastConfig {
  /** 同屏最多展示数量 */
  maxVisible?: number;
  /** 默认展示时长（毫秒），0 为不自动关闭 */
  defaultDuration?: number;
  /** 默认展示位置 */
  placement?: ToastPlacement;
  /** 默认是否可手动关闭 */
  closable?: boolean;
  /** 是否启用去重 */
  enableDedup?: boolean;
  /** 去重时间窗口（毫秒） */
  dedupInterval?: number;
}

export interface ToastShowOptions {
  /** 主标题（可选） */
  title?: string;
  /** 描述文案，必填 */
  message: string;
  /** 状态类型 */
  status?: ToastStatus;
  /** 展示位置 */
  placement?: ToastPlacement;
  /** 展示时长（毫秒），0 为不自动关闭 */
  duration?: number;
  /** 是否可手动关闭 */
  closable?: boolean;
  /** 操作按钮文案（可选） */
  actionLabel?: string;
  /** 操作按钮点击回调（可选） */
  onActionPress?: () => void;
}

/** Toast 队列项（内部使用） */
export interface ToastItem {
  id: string;
  createdAt: number;
  title?: string;
  message: string;
  status: ToastStatus;
  placement: ToastPlacement;
  duration: number;
  closable: boolean;
  actionLabel?: string;
  onActionPress?: () => void;
}

