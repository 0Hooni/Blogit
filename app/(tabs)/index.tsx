import { PostCountCard } from "@/src/components/PostCountCard";
import RecentCommentsView from "@/src/components/RecentCommentsView";
import RecentPostsView from "@/src/components/RecentPostsView";
import RepositoryInfoView from "@/src/components/RepositoryInfoView";
import { textStyle } from "@/styles/textStyle";
import { ScrollView } from "react-native";
import { styled } from "styled-components/native";

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.View`
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0px;
`;

const CardSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
`;

const CardView = styled.View`
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  border: 1px ${({ theme }) => theme.colors.border};
`;

const CardTitle = styled.Text`
  ${textStyle("section")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const CardContent = styled.Text`
  ${textStyle("display")};
  color: ${({ theme }) => theme.colors.foreground};
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

const SectionContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 12px 16px;
`;

const SectionIcon = styled.View`
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const SectionItem = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

const SectionItemTitle = styled.Text`
  ${textStyle("body1")};
  color: ${({ theme }) => theme.colors.foreground};
`;

const SectionItemContent = styled.Text`
  ${textStyle("label")};
  color: ${({ theme }) => theme.colors.mutedForeground};
`;

export default function HomeScreen() {
  return (
    <Container showsVerticalScrollIndicator={false}>
      <ContentWrapper>
        <CardSection>
          <PostCountCard />
          <CardView>
            <CardTitle>{"Comments"}</CardTitle>
            <CardContent>{"23"}</CardContent>
          </CardView>
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
