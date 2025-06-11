import { textStyle } from "@/styles/textStyle";
import styled from "styled-components/native";
import { useBlogPostsSummary } from "../hooks/useGitHubQuery";
import { ThemedIcon } from "./ThemedIcon";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
`;

const PostTitle = styled.Text`
  ${textStyle("body1")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const PostDescription = styled.Text`
  ${textStyle("label")};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

const RecentPostsView = () => {
  const { data: blogPostsSummary } = useBlogPostsSummary();

  const recentPosts = blogPostsSummary?.markdownFiles.slice(0, 3);

  return (
    <Container>
      {recentPosts?.map((post) => (
        <PostContainer key={post.path}>
          <PostIcon>
            <ThemedIcon
              name="document-text-outline"
              size={24}
              variant="foreground"
            />
          </PostIcon>
          <PostContent>
            <PostTitle>{post.name}</PostTitle>
            <PostDescription>{"Published 2 min ago"}</PostDescription>
          </PostContent>
        </PostContainer>
      ))}
    </Container>
  );
};

export default RecentPostsView;
