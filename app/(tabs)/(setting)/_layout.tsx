import HeaderTitleComponent from "@/src/components/HeaderTitle";
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
        headerTitle: () => <HeaderTitleComponent title="Setting" />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: selectedTheme.colors.background,
        },
        headerTintColor: selectedTheme.colors.foreground,
      }}
    />
  );
}
