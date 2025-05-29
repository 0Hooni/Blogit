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
