import type { AccessibilityState as RNAccessibilityState } from 'react-native';

/**
 * React Native 的 AccessibilityState 类型未包含 invalid，但 RN 平台实际支持该字段。
 * 这里做一次类型扩展，供组件库内部统一使用。
 */
export type AccessibilityState = RNAccessibilityState & { invalid?: boolean };

export interface NormalizeInteractiveStateInput {
  isDisabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  accessibilityState?: AccessibilityState;
}

export interface NormalizeInteractiveStateResult {
  isDisabled: boolean;
  isLoading: boolean;
  isInvalid: boolean;
  accessibilityState: AccessibilityState;
}

/**
 * 交互态归一化：统一 disabled/loading/invalid 与 a11y state 合并
 */
export function normalizeInteractiveState(
  input: NormalizeInteractiveStateInput,
): NormalizeInteractiveStateResult {
  const isDisabled = Boolean(input.isDisabled);
  const isLoading = Boolean(input.isLoading);
  const isInvalid = Boolean(input.isInvalid);

  const baseState: AccessibilityState = input.accessibilityState ?? {};

  return {
    isDisabled,
    isLoading,
    isInvalid,
    accessibilityState: {
      ...baseState,
      disabled: baseState.disabled ?? (isDisabled || isLoading),
      busy: baseState.busy ?? isLoading,
      invalid: baseState.invalid ?? isInvalid,
    },
  };
}
