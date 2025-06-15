import { useFontLoaded } from "@/src/components/FontLoaders";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { queryClient } from "@/src/lib/queryClient";
import { theme } from "@/src/styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { styled, ThemeProvider } from "styled-components/native";

// app/_layout.tsx 또는 app/_layout.tsx

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function RootLayout() {
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;

  const fontsLoaded = useFontLoaded();

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={selectedTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContainer>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                  animation: "none",
                }}
              />
              <Stack.Screen
                name="editor"
                options={{
                  headerShown: true,
                  headerTitle: "New Post",
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: selectedTheme.colors.background,
                  },
                  headerTintColor: selectedTheme.colors.foreground,
                  headerBackButtonDisplayMode: "minimal",
                }}
              />
            </Stack>
          </AppContainer>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
