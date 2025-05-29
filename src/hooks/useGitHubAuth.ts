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
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// GitHub OAuth 설정
const GITHUB_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
  clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
  scopes: ["user:email", "read:user"],
  redirectUri: AuthSession.makeRedirectUri({
    scheme: "blogit",
    path: "auth",
  }),
};

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
};

export function useGitHubAuth(): UseGitHubAuthReturn {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Firebase 인증 상태 리스너
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // GitHub OAuth 요청 설정
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GITHUB_CONFIG.clientId,
      scopes: GITHUB_CONFIG.scopes,
      redirectUri: GITHUB_CONFIG.redirectUri,
    },
    discovery,
  );

  // GitHub에서 access token 획득
  const getGitHubAccessToken = useCallback(
    async (
      authCode: string,
    ): Promise<{ accessToken: string; refreshToken: string }> => {
      const response = await fetch(discovery.tokenEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CONFIG.clientId,
          client_secret: GITHUB_CONFIG.clientSecret,
          code: authCode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.access_token) {
        throw new Error(
          data.error_description || data.error || "GitHub 토큰 획득 실패",
        );
      }

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    },
    [],
  );

  const signInWithGitHub = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // GitHub OAuth 인증 시작
      const result = await promptAsync();

      if (result.type === "success") {
        const { code } = result.params;

        const { accessToken, refreshToken } = await getGitHubAccessToken(code);
        await AsyncStorage.setItem("github_access_token", accessToken);
        if (refreshToken) {
          await AsyncStorage.setItem("github_refresh_token", refreshToken);
        }

        // Firebase GitHub credential 생성 및 로그인
        const credential = GithubAuthProvider.credential(accessToken);
        await signInWithCredential(auth, credential);

        // 상태는 onAuthStateChanged에서 자동 업데이트
      } else if (result.type === "cancel") {
        setIsLoading(false);
      } else {
        throw new Error("GitHub 인증이 취소되었거나 실패했습니다.");
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
  }, [promptAsync, getGitHubAccessToken]);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await auth.signOut();

      await AsyncStorage.removeItem("github_access_token");
      await AsyncStorage.removeItem("github_refresh_token");

      // 상태는 onAuthStateChanged에서 자동 업데이트
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
