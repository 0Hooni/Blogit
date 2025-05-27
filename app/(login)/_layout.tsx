import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function LoginLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
