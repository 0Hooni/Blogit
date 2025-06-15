import { textStyle } from "@/src/styles/textStyle";
import { theme } from "@/src/styles/theme";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  gap: 16px;
`;

const TitleInput = styled.TextInput`
  ${textStyle("title")};
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.primaryForeground};
  height: 72px;
  padding: 16px;
  border-radius: 12px;
`;

const ContentInput = styled.TextInput`
  ${textStyle("body2")};
  color: ${({ theme }) => theme.colors.foreground};
  min-height: 120px;
  text-align-vertical: top;
  background-color: ${({ theme }) => theme.colors.primaryForeground};
  border-radius: 12px;
  padding: 16px;
`;

export default function Editor() {
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;

  return (
    <Container>
      <TitleInput
        style={{ color: selectedTheme.colors.foreground }}
        placeholder="Title"
      />
      <ContentInput
        multiline={true}
        style={{ color: selectedTheme.colors.foreground }}
        placeholder="Content"
      />
    </Container>
  );
}
