import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="setting" options={{ title: "설정" }} />
    </Tabs>
  );
}
