/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Jest 全局测试环境配置
 *
 * 说明：
 * - reanimated 3 在 node 环境下会以 ESM 形式导出，Jest 默认无法直接解析
 * - 这里使用最小可用的手写 mock，覆盖组件测试所需的 API
 */

jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const { View } = require('react-native');

  // jest 的 mock 工厂会被提升，这里避免引用“非 mock 前缀”的外部标识符
  type mockUnknownProps = Record<string, unknown>;
  type mockUnknownRef = unknown;
  type mockUnknownFn = (...args: unknown[]) => unknown;

  const AnimatedView = React.forwardRef((props: mockUnknownProps, ref: mockUnknownRef) =>
    React.createElement(View, { ...props, ref }),
  );
  AnimatedView.displayName = 'Animated.View';

  return {
    __esModule: true,
    default: {
      View: AnimatedView,
    },
    FadeIn: {
      duration: () => ({}),
    },
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: (updater: mockUnknownFn) => updater(),
    withSpring: (toValue: unknown) => toValue,
    withTiming: (toValue: unknown, _config?: unknown, callback?: (finished: boolean) => void) => {
      if (callback) {
        callback(true);
      }
      return toValue;
    },
    withSequence: (...values: unknown[]) => values[values.length - 1],
    runOnJS: (fn: mockUnknownFn) => fn,
  };
});
