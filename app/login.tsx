import { ThemedIcon } from "@/src/components/ThemedIcon";
import { useAuth } from "@/src/contexts/AuthContext";
import { textStyle } from "@/src/styles/textStyle";
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
  background-color: ${({ theme }) => theme.colors.foreground};
  tint-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  ${textStyle("display")}
  margin-top: 80px;
`;

const SubTitle = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedForeground};
  ${textStyle("body1")}
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
  ${textStyle("button1")}
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
        <ThemedIcon name="logo-github" size={24} variant="primaryForeground" />
        <GitHubButtonText>GitHub 계정으로 로그인하기</GitHubButtonText>
      </GitHubButton>
    </Container>
  );
}
