import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Accordion from '../index';
import { NativeUIProvider } from '../../../provider/NativeUIProvider';
import Text from '../../Text';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeUIProvider>{ui}</NativeUIProvider>);
};

test('header should set accessibilityState.expanded when toggled', () => {
  const { getByTestId } = renderWithProvider(
    <Accordion defaultIndex={[]}>
      <Accordion.Item title="Section 1">
        <Text>Content</Text>
      </Accordion.Item>
    </Accordion>,
  );

  const header = getByTestId('native-ui-accordion-header-0');
  expect(header.props.accessibilityState).toMatchObject({ expanded: false });

  fireEvent.press(header);
  expect(getByTestId('native-ui-accordion-header-0').props.accessibilityState).toMatchObject({
    expanded: true,
  });
});

