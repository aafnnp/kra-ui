import type { AccessibilityState } from 'react-native';

export interface GetAccessibilityLabelInput {
  /** 可读文案（例如按钮 label） */
  label?: string;
  /** 显式传入的无障碍标签 */
  accessibilityLabel?: string;
}

/**
 * 获取默认可用的无障碍标签：优先使用显式传入的 label，其次回退到展示文本。
 */
export function getAccessibilityLabel(input: GetAccessibilityLabelInput): string | undefined {
  return input.accessibilityLabel ?? input.label;
}

/**
 * 合并无障碍 state，后者覆盖前者。
 */
export function mergeAccessibilityState(
  base?: AccessibilityState,
  extra?: AccessibilityState,
): AccessibilityState | undefined {
  if (!base && !extra) return undefined;
  return {
    ...(base ?? {}),
    ...(extra ?? {}),
  };
}

