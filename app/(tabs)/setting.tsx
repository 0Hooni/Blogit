import { useAuth } from "@/src/contexts/AuthContext";
import { styled } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  margin-top: 60px;
  margin-bottom: 40px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #141414;
`;

const SectionCard = styled.View`
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 16px;
`;

const UserInfoLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 5px;
`;

const UserInfoValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 15px;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.destructive};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-top: 20px;
`;

const LogoutButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 16px;
  font-weight: bold;
`;

export default function SettingScreen() {
  const { user, signOut, isLoading } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Container>
      <Header>
        <Title>설정</Title>
      </Header>

      <UserInfoCard>
        <UserInfoLabel>이름</UserInfoLabel>
        <UserInfoValue>{user?.displayName || "이름 없음"}</UserInfoValue>

        <UserInfoLabel>이메일</UserInfoLabel>
        <UserInfoValue>{user?.email || "이메일 없음"}</UserInfoValue>

        <UserInfoLabel>UID</UserInfoLabel>
        <UserInfoValue>{user?.uid || "UID 없음"}</UserInfoValue>
      </UserInfoCard>

      <LogoutButton onPress={handleLogout} disabled={isLoading}>
        <LogoutButtonText>
          {isLoading ? "로그아웃 중..." : "로그아웃"}
        </LogoutButtonText>
      </LogoutButton>
    </Container>
  );
}
