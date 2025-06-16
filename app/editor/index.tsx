import { textStyleObject } from "@/src/styles/textStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  gap: 16px;
`;

const EditorToolbarContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`;

const ToolbarIcon = styled.TouchableOpacity`
  size: 24px;
  tint-color: ${({ theme }) => theme.colors.foreground};
`;

const TitleInput = styled.TextInput`
  font-size: ${textStyleObject("title").fontSize}px;
  color: ${({ theme }) => theme.colors.foreground};
  height: 40px;
`;

const ContentInput = styled.TextInput`
  flex: 1;
  font-size: ${textStyleObject("body2").fontSize}px;
  color: ${({ theme }) => theme.colors.foreground};
  text-align-vertical: top;
`;

export default function Editor() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <EditorToolbarContainer>
          <ToolbarIcon onPress={() => {}}>
            <MaterialIcons name="format-indent-decrease" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <MaterialIcons name="format-indent-increase" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <MaterialIcons name="format-bold" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <MaterialIcons name="format-italic" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <MaterialIcons name="format-underline" size={24} />
          </ToolbarIcon>
        </EditorToolbarContainer>

        <TitleInput placeholder="제목" />
        <ContentInput multiline={true} placeholder="내용" />
      </Container>
    </TouchableWithoutFeedback>
  );
}
