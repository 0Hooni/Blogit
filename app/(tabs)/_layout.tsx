import EditorTabbarButton from "@/src/components/EditorTabbarButton";
import { useFontLoaded } from "@/src/components/FontLoaders";
import { useAuth } from "@/src/contexts/AuthContext";
import { textStyleObject } from "@/src/styles/textStyle";
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

  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;

  return (
    <ThemeProvider theme={selectedTheme}>
      <AppContainer>
        <Tabs
          screenOptions={{
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: selectedTheme.colors.background,
            },
            headerTitleAlign: "left",
            headerTintColor: selectedTheme.colors.foreground,
            headerTitleStyle: textStyleObject("display"),
            tabBarStyle: {
              backgroundColor: selectedTheme.colors.background,
              borderTopWidth: 0,
            },
            tabBarActiveTintColor: selectedTheme.colors.foreground,
            tabBarInactiveTintColor: selectedTheme.colors.mutedForeground,
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              title: "홈",
              tabBarIcon: ({ color }) => (
                <Ionicons name="home" color={color} size={28} />
              ),
            }}
          />
          <Tabs.Screen
            name="editor"
            options={{
              title: "에디터",
              tabBarButton: () => <EditorTabbarButton />,
              tabBarShowLabel: false,
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
              },
            }}
          />
          <Tabs.Screen
            name="setting"
            options={{
              title: "설정",
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings" color={color} size={28} />
              ),
            }}
          />
        </Tabs>
      </AppContainer>
    </ThemeProvider>
  );
}
