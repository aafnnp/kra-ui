import React, { useMemo } from 'react';
import {
  Pressable,
  type PressableProps,
  type AccessibilityRole,
  type AccessibilityState,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { getAccessibilityLabel, mergeAccessibilityState } from './a11y';
import { normalizeInteractiveState, type NormalizeInteractiveStateInput } from './state';

export interface InteractivePressableProps
  extends Omit<PressableProps, 'disabled' | 'accessibilityState' | 'accessibilityLabel'>,
    NormalizeInteractiveStateInput {
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
}

/**
 * 内部通用 Pressable：统一 disabled/loading/invalid 与可访问性 state，并提供一致的 pressed 反馈。
 */
export function InteractivePressable(props: InteractivePressableProps) {
  const {
    isDisabled,
    isLoading,
    isInvalid,
    disabled,
    loading,
    invalid,
    accessibilityRole,
    accessibilityLabel,
    accessibilityState,
    style,
    ...rest
  } = props;

  const normalized = normalizeInteractiveState({
    isDisabled,
    isLoading,
    isInvalid,
    disabled,
    loading,
    invalid,
    accessibilityState,
  });

  const resolvedA11yLabel = getAccessibilityLabel({
    label: typeof rest.children === 'string' ? rest.children : undefined,
    accessibilityLabel,
  });

  const resolvedStyle: PressableProps['style'] = useMemo(() => {
    if (typeof style === 'function') {
      return (state) => {
        const base = style(state);
        const pressedOpacity: StyleProp<ViewStyle> =
          state.pressed && !normalized.isPressableDisabled ? { opacity: 0.9 } : null;
        return [base, pressedOpacity] as StyleProp<ViewStyle>;
      };
    }

    return ({ pressed }) => {
      const pressedOpacity: StyleProp<ViewStyle> =
        pressed && !normalized.isPressableDisabled ? { opacity: 0.9 } : null;
      return [style as StyleProp<ViewStyle>, pressedOpacity] as StyleProp<ViewStyle>;
    };
  }, [normalized.isPressableDisabled, style]);

  return (
    <Pressable
      {...rest}
      style={resolvedStyle}
      disabled={normalized.isPressableDisabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={resolvedA11yLabel}
      accessibilityState={mergeAccessibilityState(normalized.accessibilityState, props.accessibilityState)}
    />
  );
}

export default InteractivePressable;

