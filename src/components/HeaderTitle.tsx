import { textStyle } from "@/src/styles/textStyle";
import { theme } from "@/src/styles/theme";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  ${textStyle("display")}
  height: 44px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const NewPostButton = styled.TouchableOpacity`
  size: 24px;
  justify-content: center;
`;

export default function HeaderTitleComponent({ title }: { title: string }) {
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;

  return (
    <Container>
      <HeaderTitle>{title}</HeaderTitle>
      <NewPostButton onPress={() => router.push("/editor")}>
        <Entypo
          name="new-message"
          size={24}
          color={selectedTheme.colors.foreground}
        />
      </NewPostButton>
    </Container>
  );
}
