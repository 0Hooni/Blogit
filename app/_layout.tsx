import { useFontLoaded } from "@/src/components/FontLoaders";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { queryClient } from "@/src/lib/queryClient";
import { theme } from "@/src/styles/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { styled, ThemeProvider } from "styled-components/native";

// app/_layout.tsx 또는 app/_layout.tsx

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function RootLayout() {
  const scheme = useColorScheme();

  const fontsLoaded = useFontLoaded();

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={scheme === "dark" ? theme.dark : theme.light}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppContainer>
            <Slot />
          </AppContainer>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
