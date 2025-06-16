import { textStyleObject } from "@/src/styles/textStyle";
import { theme } from "@/src/styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import Markdown from "react-native-markdown-display";
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
`;

const StyledMaterialIcons = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.foreground};
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
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;
  const [isPreview, setIsPreview] = useState(false);
  const [text, setText] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <EditorToolbarContainer>
          <ToolbarIcon onPress={() => {}}>
            <StyledMaterialIcons name="format-indent-decrease" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <StyledMaterialIcons name="format-indent-increase" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <StyledMaterialIcons name="format-bold" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <StyledMaterialIcons name="format-italic" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => {}}>
            <StyledMaterialIcons name="format-underline" size={24} />
          </ToolbarIcon>
          <ToolbarIcon
            onPress={() => {
              setIsPreview(!isPreview);
              Keyboard.dismiss();
            }}
          >
            <StyledMaterialIcons
              name={isPreview ? "edit" : "preview"}
              size={24}
            />
          </ToolbarIcon>
        </EditorToolbarContainer>

        <TitleInput placeholder="제목" editable={!isPreview} />
        {isPreview ? (
          <Markdown
            style={{
              text: {
                color: selectedTheme.colors.foreground,
              },
            }}
          >
            {text}
          </Markdown>
        ) : (
          <ContentInput
            value={text}
            multiline={true}
            placeholder="내용"
            editable={!isPreview}
            onChangeText={setText}
          />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
