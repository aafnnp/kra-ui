import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { getAccessibilityLabel, mergeAccessibilityState } from './a11y';
import { normalizeInteractiveState } from './state';
import type { AccessibilityState } from './state';

export interface InteractivePressableProps extends Omit<PressableProps, 'disabled' | 'style'> {
  isDisabled?: boolean;
  isLoading?: boolean;
  isInvalid?: boolean;
  accessibilityLabel?: string;
  accessibilityState?: AccessibilityState;
  style?: StyleProp<ViewStyle>;
}

/**
 * 统一交互态与无障碍的 Pressable 封装
 */
export function InteractivePressable({
  isDisabled,
  isLoading,
  isInvalid,
  accessibilityLabel,
  accessibilityState,
  style,
  children,
  ...rest
}: InteractivePressableProps) {
  const normalized = normalizeInteractiveState({
    isDisabled,
    isLoading,
    isInvalid,
    accessibilityState,
  });

  const mergedA11yState = useMemo(
    () => mergeAccessibilityState(undefined, normalized.accessibilityState),
    [normalized.accessibilityState],
  );

  return (
    <Pressable
      {...rest}
      accessibilityLabel={getAccessibilityLabel({ accessibilityLabel })}
      accessibilityState={mergedA11yState}
      disabled={normalized.isDisabled || normalized.isLoading}
      style={({ pressed }) => [
        styles.base,
        pressed && !normalized.isDisabled && !normalized.isLoading ? styles.pressed : null,
        normalized.isDisabled ? styles.disabled : null,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {},
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.88 },
});
