import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";
import { styled } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: 192px;
  height: 192px;
  border-radius: 48px;
  background-color: ${({ theme }) => theme.colors.foreground};
  tint-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  color: ${({ theme }) => theme.colors.foreground};
  margin-top: 80px;
`;

const SubTitle = styled.Text`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedForeground};
  margin-top: 60px;
`;

const GitHubButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 100px;
`;

const GitHubButtonText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

export default function LoginScreen() {
  const { user, signIn, isLoading } = useAuth();

  if (user) return <Redirect href="/" />;

  const handleGitHubLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error("GitHub 로그인 실패:", error);
    }
  };

  return (
    <Container>
      <LogoImage source={require("@/assets/images/base/adaptive-icon.png")} />
      <Title>Blogit</Title>
      <SubTitle>
        {"GitHub Pages 블로그의 모든 것을\n모바일에서 손쉽게 관리하세요"}
      </SubTitle>
      <GitHubButton
        onPress={handleGitHubLogin}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <GitHubButtonText>GitHub 계정으로 로그인하기</GitHubButtonText>
      </GitHubButton>
    </Container>
  );
}
