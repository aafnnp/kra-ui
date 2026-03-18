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
  const {View} = require('react-native');

  const AnimatedView = React.forwardRef((props: any, ref: any) =>
    React.createElement(View, {...props, ref}),
  );
  AnimatedView.displayName = 'Animated.View';

  return {
    __esModule: true,
    default: {
      View: AnimatedView,
    },
    useSharedValue: (value: any) => ({value}),
    useAnimatedStyle: (updater: any) => updater(),
    withSpring: (toValue: any) => toValue,
    withTiming: (toValue: any, _config?: any, callback?: (finished: boolean) => void) => {
      if (callback) {
        callback(true);
      }
      return toValue;
    },
    runOnJS: (fn: any) => fn,
  };
});

