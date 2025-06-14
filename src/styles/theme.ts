const lightColors = {
  background: "#ffffff",
  foreground: "#262626",
  primary: "#030213",
  primaryForeground: "#ffffff",
  secondary: "#f3f2fc",
  muted: "#ececf0",
  mutedForeground: "#717182",
  accent: "#e9ebef",
  border: "#e0e0e0",
  destructive: "#d4183d",
  inputBackground: "#f3f3f5",
};

const darkColors = {
  background: "#0a0a0a",
  foreground: "#ffffff",
  primary: "#ffffff",
  primaryForeground: "#111111",
  secondary: "#2b2b2b",
  muted: "#2b2b2b",
  mutedForeground: "#b5b5b5",
  accent: "#2b2b2b",
  border: "#2b2b2b",
  destructive: "#96303b",
  inputBackground: "#1e1e1e",
};

export const theme = {
  light: {
    mode: "light",
    colors: lightColors,
  },
  dark: {
    mode: "dark",
    colors: darkColors,
  },
};

export type AppTheme = typeof theme.light; // 타입 자동 추론용
