import { CommentCountCard } from "@/src/components/CommentCountCard";
import { PostCountCard } from "@/src/components/PostCountCard";
import RecentCommentsView from "@/src/components/RecentCommentsView";
import RecentPostsView from "@/src/components/RecentPostsView";
import RepositoryInfoView from "@/src/components/RepositoryInfoView";
import { textStyle } from "@/styles/textStyle";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.View`
  justify-content: flex-start;
  align-items: center;
`;

const CardSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

const SectionContainer = styled.View`
  flex-direction: column;
  width: 100%;
`;

const SectionTitle = styled.Text`
  ${textStyle("title")};
  color: ${({ theme }) => theme.colors.foreground};
  padding: 0px 16px;
`;

export default function HomeScreen() {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <ContentWrapper>
        <CardSection>
          <PostCountCard />
          <CommentCountCard />
        </CardSection>

        <SectionContainer>
          <SectionTitle>{"Repository Status"}</SectionTitle>

          <RepositoryInfoView />
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>{"Recent Posts"}</SectionTitle>

          <RecentPostsView />
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>{"Recent Comments"}</SectionTitle>

          <RecentCommentsView />
        </SectionContainer>
      </ContentWrapper>
    </Container>
  );
}
