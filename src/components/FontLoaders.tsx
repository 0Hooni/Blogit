import { useFonts } from "expo-font";

export function useFontLoaded() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Regular": require("@/assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("@/assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("@/assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Bold": require("@/assets/fonts/Pretendard-Bold.ttf"),
  });

  return fontsLoaded;
}
