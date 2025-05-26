import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: 192px;
  height: 192px;
  border-radius: 48px;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  color: #141414;
`;

const SubTitle = styled.Text`
  font-weight: regular;
  font-size: 16px;
  line-height: 24px;
  color: #141414;
`;

const GitHubButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 24px;
  background-color: #030213;
`;

const GithubCatImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const GitHubButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #fafafa;
`;

export default function LoginScreen() {
  return (
    <Container>
      <LogoImage source={require("../../assets/images/base/logo.png")} />
      <Title>Blogit</Title>
      <SubTitle>
        {"GitHub Pages 블로그의 모든 것을\n모바일에서 손쉽게 관리하세요"}
      </SubTitle>
      <GitHubButton>
        <GithubCatImage
          source={require("../../assets/images/icon/github-cat.png")}
        />
        <GitHubButtonText>GitHub으로 시작하기</GitHubButtonText>
      </GitHubButton>
    </Container>
  );
}
