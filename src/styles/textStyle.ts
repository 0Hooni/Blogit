import type { TextStyle as RNTextStyle } from "react-native";
import { css } from "styled-components/native";
import { typography } from "./typography";

type TextStyleKey = keyof typeof typography;

export const textStyle = (style: TextStyleKey) => {
  const { fontSize, lineHeight, fontWeight, fontFamily } = typography[style];
  return css`
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    font-weight: ${fontWeight};
    font-family: ${fontFamily};
  `;
};

export const textStyleObject = (style: TextStyleKey): RNTextStyle => {
  const { fontSize, lineHeight, fontWeight, fontFamily } = typography[style];
  return {
    fontSize,
    lineHeight,
    fontWeight: fontWeight as RNTextStyle["fontWeight"],
    fontFamily,
  };
};
