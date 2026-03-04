import {Slot} from 'expo-router';
import {NativeUIProvider} from 'native-ui';

export default function RootLayout() {
  return (
    <NativeUIProvider>
      <Slot />
    </NativeUIProvider>
  );
}
