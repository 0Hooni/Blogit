import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";
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
  margin-top: 80px;
`;

const SubTitle = styled.Text`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #141414;
  margin-top: 60px;
`;

const GitHubButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 24px;
  background-color: #030213;
  margin-top: 100px;
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
  const { user, signIn, isLoading } = useAuth();

  if (user) return <Redirect href="/" />;

  const handleGitHubLogin = async () => {
    await signIn();
  };

  return (
    <Container>
      <LogoImage source={require("@/assets/images/base/icon.png")} />
      <Title>Blogit</Title>
      <SubTitle>
        {"GitHub Pages 블로그의 모든 것을\n모바일에서 손쉽게 관리하세요"}
      </SubTitle>
      <GitHubButton
        onPress={handleGitHubLogin}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <GithubCatImage
          source={require("@/assets/images/icon/github-cat/github-cat.png")}
        />
        <GitHubButtonText>GitHub 계정으로 로그인하기</GitHubButtonText>
      </GitHubButton>
    </Container>
  );
}
