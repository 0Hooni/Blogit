import { useAuth } from "@/src/contexts/AuthContext";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
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

const UserInfoCard = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const UserInfoLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const UserInfoValue = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #141414;
  margin-bottom: 15px;
`;

const LogoutButton = styled.TouchableOpacity`
  background-color: #ff4444;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-top: 20px;
`;

const LogoutButtonText = styled.Text`
  color: white;
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
