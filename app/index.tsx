import { useAuth } from "@/src/contexts/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) return null;

  if (user) return <Redirect href="/(tabs)/(home)" />;

  return <Redirect href="/login" />;
}
