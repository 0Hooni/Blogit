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

enum MarkdownStyle {
  BOLD = "bold",
  ITALIC = "italic",
  UNDERLINE = "underline",
  INDENT = "indent",
  OUTDENT = "outdent",
}

export default function Editor() {
  const scheme = useColorScheme();
  const selectedTheme = scheme === "dark" ? theme.dark : theme.light;
  const [isPreview, setIsPreview] = useState(false);
  const [text, setText] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [selectedText, setSelectedText] = useState("");

  const applyMarkdown = (style: MarkdownStyle) => {
    const { start, end } = selection;
    const selectedText = text.slice(start, end);

    switch (style) {
      case MarkdownStyle.BOLD:
        setText(text.replace(selectedText, `**${selectedText}**`));
        break;
      case MarkdownStyle.ITALIC:
        setText(text.replace(selectedText, `*${selectedText}*`));
        break;
      case MarkdownStyle.UNDERLINE:
        setText(text.replace(selectedText, `_${selectedText}_`));
        break;
      case MarkdownStyle.INDENT:
        setText(text.replace(selectedText, `  ${selectedText}`));
        break;
      case MarkdownStyle.OUTDENT:
        setText(text.replace(selectedText, selectedText.replace(/^  /, "")));
        break;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <EditorToolbarContainer>
          <ToolbarIcon onPress={() => applyMarkdown(MarkdownStyle.OUTDENT)}>
            <StyledMaterialIcons name="format-indent-decrease" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => applyMarkdown(MarkdownStyle.INDENT)}>
            <StyledMaterialIcons name="format-indent-increase" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => applyMarkdown(MarkdownStyle.BOLD)}>
            <StyledMaterialIcons name="format-bold" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => applyMarkdown(MarkdownStyle.ITALIC)}>
            <StyledMaterialIcons name="format-italic" size={24} />
          </ToolbarIcon>
          <ToolbarIcon onPress={() => applyMarkdown(MarkdownStyle.UNDERLINE)}>
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
            onSelectionChange={(event) => {
              const { start, end } = event.nativeEvent.selection;
              const selectedText = text.slice(start, end);
              setSelection({ start, end });
              setSelectedText(selectedText);
            }}
          />
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
}
