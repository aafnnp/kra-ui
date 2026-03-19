import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Dropdown from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('trigger should set accessibilityState.expanded based on open state', () => {
  const { getByTestId } = renderWithProvider(
    <Dropdown items={[{ key: '1', label: 'One' }]} />,
  );

  const trigger = getByTestId('native-ui-dropdown-trigger');
  expect(trigger.props.accessibilityState).toMatchObject({ expanded: false });

  fireEvent.press(trigger);
  expect(getByTestId('native-ui-dropdown-trigger').props.accessibilityState).toMatchObject({
    expanded: true,
  });
});

