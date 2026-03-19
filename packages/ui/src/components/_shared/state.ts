import type { AccessibilityState } from 'react-native';

export interface NormalizeInteractiveStateInput {
  /** 是否禁用（新规范） */
  isDisabled?: boolean;
  /** 是否加载中（新规范） */
  isLoading?: boolean;
  /** 是否无效（新规范） */
  isInvalid?: boolean;

  /** @deprecated 请使用 isDisabled */
  disabled?: boolean;
  /** @deprecated 请使用 isLoading */
  loading?: boolean;
  /** @deprecated 请使用 isInvalid */
  invalid?: boolean;

  /** 额外的无障碍状态 */
  accessibilityState?: AccessibilityState;
}

export interface NormalizeInteractiveStateResult {
  isDisabled: boolean;
  isLoading: boolean;
  isInvalid: boolean;
  /** 用于 Pressable.disabled 的结果（禁用或加载中都禁用点击） */
  isPressableDisabled: boolean;
  /** 合并后的无障碍状态 */
  accessibilityState: AccessibilityState;
}

/**
 * 统一交互组件的状态字段，兼容旧 props，并生成可访问性 state。
 */
export function normalizeInteractiveState(
  input: NormalizeInteractiveStateInput,
): NormalizeInteractiveStateResult {
  const isDisabled = Boolean(input.isDisabled ?? input.disabled);
  const isLoading = Boolean(input.isLoading ?? input.loading);
  const isInvalid = Boolean(input.isInvalid ?? input.invalid);

  const isPressableDisabled = isDisabled || isLoading;

  const accessibilityState: AccessibilityState = {
    ...(input.accessibilityState ?? {}),
    disabled: isPressableDisabled || (input.accessibilityState?.disabled ?? false),
    busy: isLoading || (input.accessibilityState?.busy ?? false),
  };

  return {
    isDisabled,
    isLoading,
    isInvalid,
    isPressableDisabled,
    accessibilityState,
  };
}
