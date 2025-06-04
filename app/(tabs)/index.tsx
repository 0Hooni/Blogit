import { textStyle } from "@/styles/textStyle";
import { styled } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px 0px;
`;

const CardSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  gap: 16px;
`;

const CardView = styled.View`
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border-radius: 12px;
  border: 1px ${({ theme }) => theme.colors.border};
  width: 50%;
`;

const CardTitle = styled.Text`
  ${textStyle("section")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const CardContent = styled.Text`
  ${textStyle("display")};
  color: ${({ theme }) => theme.colors.foreground};
`;

export default function HomeScreen() {
  return (
    <Container>
      <CardSection>
        <CardView>
          <CardTitle>{"Posts"}</CardTitle>
          <CardContent>{"12"}</CardContent>
        </CardView>
        <CardView>
          <CardTitle>{"Comments"}</CardTitle>
          <CardContent>{"23"}</CardContent>
        </CardView>
      </CardSection>
    </Container>
  );
}
