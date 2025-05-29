import { useCurrentUser } from "@/hooks/useGitHubQuery";
import { textStyle } from "@/src/styles/textStyle";
import styled from "styled-components/native";

const SectionCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 16px;
`;

const ProfileContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const UserName = styled.Text`
  ${textStyle("section")}
  color: ${({ theme }) => theme.colors.foreground};
`;

const UserNickname = styled.Text`
  ${textStyle("body2")}
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export const UserProfile = () => {
  const { data: user } = useCurrentUser();

  return (
    <SectionCard>
      <ProfileImage source={{ uri: user?.avatar_url }} />
      <ProfileContainer>
        <UserName>{user?.name}</UserName>
        <UserNickname>@{user?.login}</UserNickname>
      </ProfileContainer>
    </SectionCard>
  );
};
