import { PostCountCard } from "@/src/components/PostCountCard";
import { ThemedIcon } from "@/src/components/ThemedIcon";
import { textStyle } from "@/styles/textStyle";
import { styled } from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
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
    <Container>
      <CardSection>
        <PostCountCard />
        <CardView>
          <CardTitle>{"Comments"}</CardTitle>
          <CardContent>{"23"}</CardContent>
        </CardView>
      </CardSection>

      <SectionContainer>
        <SectionTitle>{"Repository Status"}</SectionTitle>

        <SectionContent>
          <SectionIcon>
            <ThemedIcon
              name="git-branch-outline"
              size={24}
              variant="foreground"
            />
          </SectionIcon>
          <SectionItem>
            <SectionItemTitle>{"Repository name"}</SectionItemTitle>
            <SectionItemContent>
              {"Last updated 2 hours ago"}
            </SectionItemContent>
          </SectionItem>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>{"Recent Posts"}</SectionTitle>

        <SectionContent>
          <SectionIcon>
            <ThemedIcon
              name="document-text-outline"
              size={24}
              variant="foreground"
            />
          </SectionIcon>
          <SectionItem>
            <SectionItemTitle>{"Post Title"}</SectionItemTitle>
            <SectionItemContent>{"Published 2 min ago"}</SectionItemContent>
          </SectionItem>
        </SectionContent>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle>{"Recent Comments"}</SectionTitle>

        <SectionContent>
          <SectionIcon>
            <ThemedIcon
              name="chatbubble-ellipses-outline"
              size={24}
              variant="foreground"
            />
          </SectionIcon>
          <SectionItem>
            <SectionItemTitle>{"Comment content"}</SectionItemTitle>
            <SectionItemContent>{"Commented now"}</SectionItemContent>
          </SectionItem>
        </SectionContent>
        <SectionContent>
          <SectionIcon>
            <ThemedIcon
              name="chatbubble-ellipses-outline"
              size={24}
              variant="foreground"
            />
          </SectionIcon>
          <SectionItem>
            <SectionItemTitle>{"Comment content"}</SectionItemTitle>
            <SectionItemContent>{"Commented now"}</SectionItemContent>
          </SectionItem>
        </SectionContent>
      </SectionContainer>
    </Container>
  );
}
