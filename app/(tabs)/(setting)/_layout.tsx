import { theme } from "@/src/styles/theme";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "설정",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: selectedTheme.colors.background,
        },
        headerTintColor: selectedTheme.colors.foreground,
      }}
    />
  );
}
