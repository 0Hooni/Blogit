import { textStyle } from "@/styles/textStyle";
import styled from "styled-components/native";
import { useIssueCommentsSummary } from "../hooks/useGitHubQuery";
import { getRelativeTime } from "../lib/timeUtils";
import { ThemedIcon } from "./ThemedIcon";

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const CommentsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
`;

const CommentIcon = styled.View`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const CommentContent = styled.View`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const CommentTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail",
})`
  ${textStyle("body1")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const CommentDescription = styled.Text`
  ${textStyle("label")};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const RecentCommentsView = () => {
  const { data: commentsSummary, isLoading, error } = useIssueCommentsSummary();

  // 최신 포스트 3개 가져오기 (이미 날짜순으로 정렬됨)
  const recentComments =
    commentsSummary
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 3) || [];

  const getPublishedDateText = (publishedDate?: string) => {
    if (!publishedDate) return "Date unknown";

    const relativeTime = getRelativeTime(publishedDate);
    return `Commented ${relativeTime}`;
  };

  if (isLoading) {
    return (
      <Container>
        <CommentsContainer>
          <CommentContent>
            <CommentTitle>Loading recent comments...</CommentTitle>
          </CommentContent>
        </CommentsContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <CommentsContainer>
          <CommentContent>
            <CommentTitle>Failed to load comments</CommentTitle>
          </CommentContent>
        </CommentsContainer>
      </Container>
    );
  }

  if (recentComments.length === 0) {
    return (
      <Container>
        <CommentsContainer>
          <CommentContent>
            <CommentTitle>No comments found</CommentTitle>
            <CommentDescription>
              Start writing your first blog post!
            </CommentDescription>
          </CommentContent>
        </CommentsContainer>
      </Container>
    );
  }

  return (
    <Container>
      {recentComments.map((comment) => (
        <CommentsContainer key={comment.id}>
          <CommentIcon>
            <ThemedIcon
              name="chatbubble-ellipses-outline"
              size={24}
              variant="foreground"
            />
          </CommentIcon>
          <CommentContent>
            <CommentTitle>{comment.body}</CommentTitle>
            <CommentDescription>
              {getPublishedDateText(comment.created_at)}
            </CommentDescription>
          </CommentContent>
        </CommentsContainer>
      ))}
    </Container>
  );
};

export default RecentCommentsView;
