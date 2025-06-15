import { theme } from "@/src/styles/theme";
import { Text, useColorScheme } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export default function Editor() {
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;

  return (
    <Container>
      <Text style={{ color: selectedTheme.colors.foreground }}>Editor</Text>
    </Container>
  );
}
