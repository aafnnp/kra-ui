import { fireEvent } from '@testing-library/react-native';
import Tabs from '../index';
import { renderWithProvider } from '../../../test-utils/render';

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

test('uncontrolled mode should update selected tab after press', () => {
  const { getByTestId } = renderWithProvider(
    <Tabs
      items={[
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
      ]}
    />,
  );

  fireEvent.press(getByTestId('native-ui-tabs-tab-b'));

  expect(getByTestId('native-ui-tabs-tab-b').props.accessibilityState).toMatchObject({
    selected: true,
  });
  expect(getByTestId('native-ui-tabs-tab-a').props.accessibilityState).toMatchObject({
    selected: false,
  });
});

test('controlled mode should set selected state by activeKey', () => {
  const first = renderWithProvider(
    <Tabs
      items={[
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
      ]}
      activeKey="a"
    />,
  );

  expect(first.getByTestId('native-ui-tabs-tab-a').props.accessibilityState).toMatchObject({
    selected: true,
  });
  expect(first.getByTestId('native-ui-tabs-tab-b').props.accessibilityState).toMatchObject({
    selected: false,
  });

  first.unmount();

  const second = renderWithProvider(
    <Tabs
      items={[
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
      ]}
      activeKey="b"
    />,
  );

  expect(second.getByTestId('native-ui-tabs-tab-b').props.accessibilityState).toMatchObject({
    selected: true,
  });
  expect(second.getByTestId('native-ui-tabs-tab-a').props.accessibilityState).toMatchObject({
    selected: false,
  });
});

test('scrollable underline should render indicator and support press', () => {
  const onChange = jest.fn();
  const { getByTestId } = renderWithProvider(
    <Tabs
      items={[
        { key: 'a', label: 'A' },
        { key: 'b', label: 'B' },
      ]}
      scrollable
      variant="underline"
      onChange={onChange}
    />,
  );

  expect(getByTestId('native-ui-tabs-indicator-scrollable')).toBeTruthy();
  fireEvent.press(getByTestId('native-ui-tabs-tab-b'));
  expect(onChange).toHaveBeenCalledWith('b');
});
