import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ThemedIcon } from "./ThemedIcon";

const Container = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 0px 8px 0px;
`;

export default function EditorTabbarButton() {
  return (
    <Container>
      <TouchableOpacity onPress={() => router.push("/editor")}>
        <ThemedIcon name="add-circle-outline" size={36} />
      </TouchableOpacity>
    </Container>
  );
}
