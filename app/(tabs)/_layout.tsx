import { useFontLoaded } from "@/src/components/FontLoaders";
import { useAuth } from "@/src/contexts/AuthContext";
import { theme } from "@/src/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { styled, ThemeProvider } from "styled-components/native";

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function TabsLayout() {
  const scheme = useColorScheme();
  const { user } = useAuth();

  const fontsLoaded = useFontLoaded();

  if (!fontsLoaded) return null;

  if (!user) return <Redirect href="/login" />;

  return (
    <ThemeProvider theme={scheme === "dark" ? theme.dark : theme.light}>
      <AppContainer>
        <Tabs
          screenOptions={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor:
                scheme === "dark"
                  ? theme.dark.colors.background
                  : theme.light.colors.background,
            },
            headerTitleAlign: "left",
            headerTintColor:
              scheme === "dark"
                ? theme.dark.colors.foreground
                : theme.light.colors.foreground,
            headerTitleStyle: {
              fontSize: 28,
              lineHeight: 28 * 1.5,
              fontWeight: "bold",
            },
            tabBarStyle: {
              backgroundColor:
                scheme === "dark"
                  ? theme.dark.colors.background
                  : theme.light.colors.background,
              borderTopWidth: 0,
            },
            tabBarActiveTintColor:
              scheme === "dark"
                ? theme.dark.colors.foreground
                : theme.light.colors.foreground,
            tabBarInactiveTintColor:
              scheme === "dark"
                ? theme.dark.colors.mutedForeground
                : theme.light.colors.mutedForeground,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "홈",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="setting"
            options={{
              title: "설정",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </AppContainer>
    </ThemeProvider>
  );
}
