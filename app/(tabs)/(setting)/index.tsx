import { ThemedIcon } from "@/src/components/ThemedIcon";
import { UserProfile } from "@/src/components/UserProfile";
import { useAuth } from "@/src/contexts/AuthContext";
import { textStyle } from "@/src/styles/textStyle";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

const Container = styled(ScrollView)`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 16px;
`;

const TouchableSectionCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 16px;
`;

const AccountSection = styled.View`
  gap: 8px;
  align-items: flex-start;
`;

const AccountSectionTitle = styled.Text`
  ${textStyle("section")}
  color: ${({ theme }) => theme.colors.foreground};
`;

const LogoutButtonText = styled.Text`
  ${textStyle("button2")}
  color: ${({ theme }) => theme.colors.destructive};
  flex: 1;
`;

export default function SettingScreen() {
  const { user, signOut, isLoading } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Container>
      <UserProfile />
      <AccountSection style={{ marginTop: 16 }}>
        <AccountSectionTitle>계정</AccountSectionTitle>
        <TouchableSectionCard
          onPress={handleLogout}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.9 : 1,
          }}
        >
          <ThemedIcon name="log-out-outline" size={24} variant="destructive" />
          <LogoutButtonText>
            {isLoading ? "로그아웃 중..." : "로그아웃"}
          </LogoutButtonText>
          <ThemedIcon
            name="chevron-forward-outline"
            size={24}
            variant="destructive"
          />
        </TouchableSectionCard>
      </AccountSection>
    </Container>
  );
}
