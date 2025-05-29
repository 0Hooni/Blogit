import { UserProfile } from "@/src/components/UserProfile";
import { useAuth } from "@/src/contexts/AuthContext";
import { textStyle } from "@/src/styles/textStyle";
import { styled } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 16px;
`;

const SectionCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 16px;
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

const LogoutButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.destructive};
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-top: 20px;
`;

const LogoutButtonImage = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${({ theme }) => theme.colors.destructive};
`;

const RightChevronImage = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${({ theme }) => theme.colors.destructive};
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
          <LogoutButtonImage
            source={require("@/assets/images/icons/logout/logout.png")}
          />
          <LogoutButtonText>
            {isLoading ? "로그아웃 중..." : "로그아웃"}
          </LogoutButtonText>
          <RightChevronImage
            source={require("@/assets/images/icons/right-chevron/right-chevron.png")}
          />
        </TouchableSectionCard>
      </AccountSection>
    </Container>
  );
}
