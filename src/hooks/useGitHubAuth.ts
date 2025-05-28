import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import {
  User as FirebaseUser,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

import { auth } from "@/firebaseConfig";

// WebBrowser 설정 (iOS에서 인증 후 앱으로 돌아오기 위함)
WebBrowser.maybeCompleteAuthSession();

interface GitHubAuthState {
  user: FirebaseUser | null;
  isLoading: boolean;
  error: string | null;
}

interface UseGitHubAuthReturn extends GitHubAuthState {
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

export function useGitHubAuth(): UseGitHubAuthReturn {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Firebase 인증 상태 리스너 등록
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Firebase 인증 상태 변경 시 로딩 상태 해제
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
  };

  const GITHUB_CLIENT_ID = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET;

  if (!GITHUB_CLIENT_ID) {
    throw new Error(
      "EXPO_PUBLIC_GITHUB_CLIENT_ID 환경 변수가 설정되지 않았습니다.",
    );
  }

  if (!GITHUB_CLIENT_SECRET) {
    throw new Error(
      "EXPO_PUBLIC_GITHUB_CLIENT_SECRET 환경 변수가 설정되지 않았습니다.",
    );
  }

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GITHUB_CLIENT_ID,
      scopes: ["user:email", "read:user"],
      redirectUri: AuthSession.makeRedirectUri({
        scheme: "blogit",
        path: "auth",
      }),
    },
    discovery,
  );

  const signInWithGitHub = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await promptAsync();

      if (result.type == "success") {
        const { code } = result.params;

        const tokenResponse = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              client_id: GITHUB_CLIENT_ID,
              client_secret: GITHUB_CLIENT_SECRET,
              code,
            }),
          },
        );

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
          throw new Error(
            `GitHub API 오류: ${tokenData.error_description || tokenData.error || "알 수 없는 오류"}`,
          );
        }

        if (tokenData.access_token) {
          // Firebase GitHub 인증 - onAuthStateChanged에서 user 상태가 자동으로 업데이트됨
          const credential = GithubAuthProvider.credential(
            tokenData.access_token,
          );
          await signInWithCredential(auth, credential);
          // 로딩 상태는 onAuthStateChanged에서 해제됨
        } else {
          throw new Error(
            `GitHub 엑세스 토큰을 받을 수 없습니다: ${tokenData.error_description || "알 수 없는 오류"}`,
          );
        }
      } else if (result.type == "cancel") {
        setIsLoading(false);
      } else {
        throw new Error("GitHub 인증이 실패했습니다.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      setIsLoading(false);
      setError(errorMessage);

      Alert.alert("로그인 실패", errorMessage, [
        { text: "확인", style: "default" },
      ]);
    }
  }, [promptAsync]);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Firebase 로그아웃 - onAuthStateChanged에서 user 상태가 자동으로 업데이트됨
      await auth.signOut();
      // 로딩 상태는 onAuthStateChanged에서 해제됨
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "로그아웃 중 오류가 발생했습니다.";

      setIsLoading(false);
      setError(errorMessage);

      Alert.alert("로그아웃 실패", errorMessage, [
        { text: "확인", style: "default" },
      ]);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    signInWithGitHub,
    signOut,
  };
}
