import { textStyle } from "@/src/styles/textStyle";
import styled from "styled-components/native";
import { useBlogPostsSummary } from "../hooks/useGitHubQuery";

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

export const PostCountCard = () => {
  const { data: summary } = useBlogPostsSummary();

  return (
    <CardView>
      <CardTitle>{"Posts"}</CardTitle>
      <CardContent>{summary?.totalPosts ?? "-"}</CardContent>
    </CardView>
  );
};
