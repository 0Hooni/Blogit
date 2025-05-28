import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export default function HomeScreen() {
  return (
    <Container>
      <Title>{"Blogit\n홈 화면"}</Title>
    </Container>
  );
}
