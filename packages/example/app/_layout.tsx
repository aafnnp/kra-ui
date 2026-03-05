import { Stack } from "expo-router"
import { NativeUIProvider } from "kra-ui"

export default function RootLayout() {
  return (
    <NativeUIProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NativeUIProvider>
  )
}
