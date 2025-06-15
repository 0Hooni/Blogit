import { textStyle } from "@/src/styles/textStyle";
import { View } from "react-native";
import styled from "styled-components/native";

export const HeaderTitle = styled.Text`
  ${textStyle("display")}
  height: 44px;
  color: ${({ theme }) => theme.colors.foreground};
`;

export default function HeaderTitleComponent({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: "flex-start" }}>
      <HeaderTitle>{title}</HeaderTitle>
    </View>
  );
}
