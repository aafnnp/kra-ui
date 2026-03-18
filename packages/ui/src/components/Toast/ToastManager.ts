import type { ToastConfig, ToastItem, ToastPlacement, ToastShowOptions, ToastStatus } from './types';

export interface ToastManagerDeps {
  now: () => number;
  generateId: () => string;
}

export const defaultToastConfig: Required<
  Pick<ToastConfig, 'maxVisible' | 'defaultDuration' | 'placement' | 'closable' | 'enableDedup' | 'dedupInterval'>
> = {
  maxVisible: 3,
  defaultDuration: 3000,
  placement: 'top',
  closable: true,
  enableDedup: true,
  dedupInterval: 1000,
};

export interface ToastState {
  toasts: ToastItem[];
}

export type ToastAction =
  | {type: 'ADD'; item: ToastItem}
  | {type: 'DISMISS'; id: string}
  | {type: 'CLEAR_ALL'};

export function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD':
      return {toasts: [...state.toasts, action.item]};
    case 'DISMISS':
      return {toasts: state.toasts.filter(t => t.id !== action.id)};
    case 'CLEAR_ALL':
      return {toasts: []};
    default:
      return state;
  }
}

export function resolveToastConfig(config?: ToastConfig) {
  return {
    ...defaultToastConfig,
    ...(config ?? {}),
  };
}

export function createToastItem(
  options: ToastShowOptions,
  config: ToastConfig | undefined,
  deps: ToastManagerDeps,
): ToastItem {
  const resolved = resolveToastConfig(config);

  const status: ToastStatus = options.status ?? 'info';
  const placement: ToastPlacement = options.placement ?? resolved.placement;
  const duration = options.duration ?? resolved.defaultDuration;
  const closable = options.closable ?? resolved.closable;

  return {
    id: deps.generateId(),
    createdAt: deps.now(),
    title: options.title,
    message: options.message,
    status,
    placement,
    duration,
    closable,
    actionLabel: options.actionLabel,
    onActionPress: options.onActionPress,
  };
}

export function findDedupTarget(
  toasts: ToastItem[],
  candidate: Pick<ToastItem, 'message' | 'status'>,
  config: ToastConfig | undefined,
  now: number,
): ToastItem | undefined {
  const resolved = resolveToastConfig(config);
  if (!resolved.enableDedup) {
    return undefined;
  }

  return toasts.find(t => {
    const withinWindow = now - t.createdAt <= resolved.dedupInterval;
    return withinWindow && t.message === candidate.message && t.status === candidate.status;
  });
}

export function getVisibleToasts(
  toasts: ToastItem[],
  placement: ToastPlacement,
  config?: ToastConfig,
): ToastItem[] {
  const resolved = resolveToastConfig(config);
  const filtered = toasts.filter(t => t.placement === placement);
  filtered.sort((a, b) => a.createdAt - b.createdAt);
  return filtered.slice(0, resolved.maxVisible);
}

