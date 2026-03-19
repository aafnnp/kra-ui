import theme from '../theme';
import darkTheme from '../darkTheme';

function expectKeys<T extends object>(obj: T, keys: Array<keyof T>) {
  for (const key of keys) {
    expect(obj).toHaveProperty(key as string);
  }
}

test('light/dark themes contain required v1 tokens', () => {
  expectKeys(theme.colors, ['overlay']);
  expectKeys(darkTheme.colors, ['overlay']);

  // 交互组件 v1 令牌（light/dark 结构必须一致）
  expect(theme).toHaveProperty('buttonSizes');
  expect(darkTheme).toHaveProperty('buttonSizes');

  expect(theme).toHaveProperty('inputSizes');
  expect(darkTheme).toHaveProperty('inputSizes');

  expect(theme).toHaveProperty('inputStates');
  expect(darkTheme).toHaveProperty('inputStates');
});

