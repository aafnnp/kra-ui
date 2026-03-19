import { darkTheme, theme } from '../index';

const sortedKeys = (obj: Record<string, unknown>) => Object.keys(obj).sort();

test('浅色/暗色主题顶层结构一致', () => {
  expect(sortedKeys(theme as unknown as Record<string, unknown>)).toEqual(
    sortedKeys(darkTheme as unknown as Record<string, unknown>),
  );
});

test('浅色/暗色主题 colors key 集合一致', () => {
  expect(sortedKeys(theme.colors as unknown as Record<string, unknown>)).toEqual(
    sortedKeys(darkTheme.colors as unknown as Record<string, unknown>),
  );
});

test('关键语义 token 存在且类型正确', () => {
  expect(typeof theme.colors.overlay).toBe('string');
  expect(typeof darkTheme.colors.overlay).toBe('string');

  expect(theme.buttonSizes.sm).toBeTruthy();
  expect(theme.buttonSizes.md).toBeTruthy();
  expect(theme.buttonSizes.lg).toBeTruthy();
});

test('variants 结构一致（button/input/alert/accordion）', () => {
  expect(sortedKeys(theme.buttonVariants as unknown as Record<string, unknown>)).toEqual(
    sortedKeys(darkTheme.buttonVariants as unknown as Record<string, unknown>),
  );
  expect(sortedKeys(theme.inputVariants as unknown as Record<string, unknown>)).toEqual(
    sortedKeys(darkTheme.inputVariants as unknown as Record<string, unknown>),
  );
  expect(sortedKeys(theme.alertVariants as unknown as Record<string, unknown>)).toEqual(
    sortedKeys(darkTheme.alertVariants as unknown as Record<string, unknown>),
  );
  expect(sortedKeys(theme.accordionVariants as unknown as Record<string, unknown>)).toEqual(
    sortedKeys(darkTheme.accordionVariants as unknown as Record<string, unknown>),
  );
});
