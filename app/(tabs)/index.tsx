import { textStyle } from "@/styles/textStyle";
import { styled } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px 0px;
`;

const PostTitle = styled.Text`
  ${textStyle("body1")};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 20px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 12px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.foreground};
`;

export default function HomeScreen() {
  return (
    <Container>
      <PostTitle>{"포스트 갯수"}</PostTitle>
    </Container>
  );
}
