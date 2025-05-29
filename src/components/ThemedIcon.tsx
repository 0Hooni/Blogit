import Ionicons from "@expo/vector-icons/Ionicons";
import { styled } from "styled-components/native";

export const ThemedIcon = styled(Ionicons).attrs<{
  variant?:
    | "destructive"
    | "foreground"
    | "muted"
    | "primaryForeground"
    | "primary";
}>(({ theme, variant = "foreground" }) => ({
  color:
    variant === "destructive"
      ? theme.colors.destructive
      : variant === "muted"
        ? theme.colors.mutedForeground
        : variant === "primaryForeground"
          ? theme.colors.primaryForeground
          : variant === "primary"
            ? theme.colors.primary
            : theme.colors.foreground,
}))``;
