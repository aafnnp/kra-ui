import React from 'react';
import { render } from '@testing-library/react-native';
import Tabs from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('active tab should set accessibilityState.selected=true', () => {
  const { getByTestId } = renderWithProvider(
    <Tabs
      items={[
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
      ]}
      activeKey="b"
    />,
  );

  expect(getByTestId('native-ui-tabs-tab-b').props.accessibilityState).toMatchObject({
    selected: true,
  });
  expect(getByTestId('native-ui-tabs-tab-a').props.accessibilityState).toMatchObject({
    selected: false,
  });
});

