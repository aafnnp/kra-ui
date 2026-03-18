import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Toast from './Toast';
import { useToast } from './ToastContext';
import { getVisibleToasts, resolveToastConfig } from './ToastManager';
import type { ToastPlacement, ToastItem } from './types';

const TOAST_OFFSET = 60;
const STACK_STEP = 64;

function getItemContainerStyle(placement: ToastPlacement, index: number): StyleProp<ViewStyle> {
  const offset = TOAST_OFFSET + index * STACK_STEP;
  return placement === 'top' ? {top: offset} : {bottom: offset};
}

function renderPlacementToasts(placement: ToastPlacement, items: ToastItem[], onDismiss: (id: string) => void) {
  return items.map((item, index) => (
    <Toast
      key={item.id}
      visible
      onClose={() => onDismiss(item.id)}
      title={item.title}
      message={item.message}
      status={item.status}
      duration={item.duration}
      placement={placement}
      closable={item.closable}
      actionLabel={item.actionLabel}
      onActionPress={item.onActionPress}
      containerStyle={getItemContainerStyle(placement, index)}
    />
  ));
}

/**
 * Toast 渲染宿主
 * - 根据队列渲染同屏可见的多条 Toast（默认最多 3 条）
 */
export default function ToastHost() {
  const {toasts, config, dismiss} = useToast();

  const resolved = useMemo(() => resolveToastConfig(config), [config]);
  const topVisible = useMemo(() => getVisibleToasts(toasts, 'top', resolved), [toasts, resolved]);
  const bottomVisible = useMemo(
    () => getVisibleToasts(toasts, 'bottom', resolved),
    [toasts, resolved],
  );

  return (
    <View pointerEvents="box-none" style={styles.root}>
      {renderPlacementToasts('top', topVisible, dismiss)}
      {renderPlacementToasts('bottom', bottomVisible, dismiss)}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
});

