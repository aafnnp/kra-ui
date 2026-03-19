import type { AccessibilityState } from './state';

export interface GetAccessibilityLabelInput {
  label?: string;
  accessibilityLabel?: string;
}

/**
 * 默认无障碍标签策略：优先使用用户传入的 accessibilityLabel，其次使用业务 label
 */
export function getAccessibilityLabel(input: GetAccessibilityLabelInput): string | undefined {
  return input.accessibilityLabel ?? input.label;
}

/**
 * 合并 accessibilityState，后者优先级更高
 */
export function mergeAccessibilityState(
  base?: AccessibilityState,
  extra?: AccessibilityState,
): AccessibilityState | undefined {
  if (!base && !extra) return undefined;
  return { ...(base ?? {}), ...(extra ?? {}) };
}
