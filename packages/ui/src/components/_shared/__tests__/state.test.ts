import { normalizeInteractiveState } from '../state';

test('优先使用新规范字段（isLoading/isDisabled/isInvalid）', () => {
  const result = normalizeInteractiveState({
    isDisabled: true,
    isLoading: true,
    isInvalid: true,
    disabled: false,
    loading: false,
    invalid: false,
  });

  expect(result.isDisabled).toBe(true);
  expect(result.isLoading).toBe(true);
  expect(result.isInvalid).toBe(true);
  expect(result.isPressableDisabled).toBe(true);
  expect(result.accessibilityState).toMatchObject({
    disabled: true,
    busy: true,
  });
});

test('兼容旧字段（loading/disabled/invalid）', () => {
  const result = normalizeInteractiveState({
    disabled: true,
    loading: true,
    invalid: true,
  });

  expect(result.isDisabled).toBe(true);
  expect(result.isLoading).toBe(true);
  expect(result.isInvalid).toBe(true);
  expect(result.isPressableDisabled).toBe(true);
  expect(result.accessibilityState).toMatchObject({
    disabled: true,
    busy: true,
  });
});

test('合并并保留额外 accessibilityState', () => {
  const result = normalizeInteractiveState({
    isLoading: true,
    accessibilityState: { selected: true },
  });

  expect(result.accessibilityState).toMatchObject({
    selected: true,
    busy: true,
  });
});
