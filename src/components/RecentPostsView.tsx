import { textStyle } from "@/styles/textStyle";
import styled from "styled-components/native";
import { useBlogPostsSummary } from "../hooks/useGitHubQuery";
import { getRelativeTime } from "../lib/timeUtils";
import { ThemedIcon } from "./ThemedIcon";

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const PostContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
`;

const PostIcon = styled.View`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const PostContent = styled.View`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const PostTitle = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: "tail",
})`
  ${textStyle("body1")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const PostDescription = styled.Text`
  ${textStyle("label")};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const RecentPostsView = () => {
  const { data: blogPostsSummary, isLoading, error } = useBlogPostsSummary();

  // 최신 포스트 3개 가져오기 (이미 날짜순으로 정렬됨)
  const recentPosts = blogPostsSummary?.blogPosts.slice(0, 3) || [];

  const getPublishedDateText = (publishedDate?: string) => {
    if (!publishedDate) return "Date unknown";

    const relativeTime = getRelativeTime(publishedDate);
    return `Published ${relativeTime}`;
  };

  if (isLoading) {
    return (
      <Container>
        <PostContainer>
          <PostContent>
            <PostTitle>Loading recent posts...</PostTitle>
          </PostContent>
        </PostContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <PostContainer>
          <PostContent>
            <PostTitle>Failed to load posts</PostTitle>
          </PostContent>
        </PostContainer>
      </Container>
    );
  }

  if (recentPosts.length === 0) {
    return (
      <Container>
        <PostContainer>
          <PostContent>
            <PostTitle>No posts found</PostTitle>
            <PostDescription>
              Start writing your first blog post!
            </PostDescription>
          </PostContent>
        </PostContainer>
      </Container>
    );
  }

  return (
    <Container>
      {recentPosts.map((post) => (
        <PostContainer key={post.id}>
          <PostIcon>
            <ThemedIcon
              name="document-text-outline"
              size={24}
              variant="foreground"
            />
          </PostIcon>
          <PostContent>
            <PostTitle>{post.title}</PostTitle>
            <PostDescription>
              {getPublishedDateText(post.publishedDate)}
            </PostDescription>
          </PostContent>
        </PostContainer>
      ))}
    </Container>
  );
};

export default RecentPostsView;
