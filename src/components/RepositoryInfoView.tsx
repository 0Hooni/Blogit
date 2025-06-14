import { useCurrentUser, useRepositoryInfo } from "@/src/hooks/useGitHubQuery";
import { getRelativeTime } from "@/src/lib/timeUtils";
import { textStyle } from "@/styles/textStyle";
import styled from "styled-components/native";
import { ThemedIcon } from "./ThemedIcon";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
`;

const RepositoryIcon = styled.View`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const RepositoryContent = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const RepositoryTitle = styled.Text`
  ${textStyle("body1")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const RepositoryDescription = styled.Text`
  ${textStyle("label")};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const RepositoryInfoView = () => {
  const { data: user } = useCurrentUser();
  const repositoryName = `${user?.login.toLowerCase() || ""}.github.io`;

  // GitHub Repository 정보 가져오기
  const {
    data: repository,
    isLoading,
    error,
  } = useRepositoryInfo(user?.login || "", repositoryName);

  // 마지막 업데이트 시간 계산
  const getLastUpdatedText = () => {
    if (isLoading) return "로딩 중...";
    if (error) return "업데이트 정보 없음";
    if (!repository?.updated_at) return "업데이트 정보 없음";

    const relativeTime = getRelativeTime(repository.updated_at);
    return `Last updated ${relativeTime}`;
  };

  return (
    <Container>
      <RepositoryIcon>
        <ThemedIcon name="git-branch-outline" size={24} variant="foreground" />
      </RepositoryIcon>
      <RepositoryContent>
        <RepositoryTitle>{repositoryName}</RepositoryTitle>
        <RepositoryDescription>{getLastUpdatedText()}</RepositoryDescription>
      </RepositoryContent>
    </Container>
  );
};

export default RepositoryInfoView;
