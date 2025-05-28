import { AuthProvider } from "@/src/contexts/AuthContext";
import { theme } from "@/src/styles/theme";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { styled, ThemeProvider } from "styled-components/native";

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider theme={scheme === "dark" ? theme.dark : theme.light}>
      <AuthProvider>
        <AppContainer>
          <Slot />
        </AppContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
