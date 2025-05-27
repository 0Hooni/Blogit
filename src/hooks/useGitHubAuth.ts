import { useCallback, useState } from "react";
import { Alert } from "react-native";

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import {
  User as FirebaseUser,
  GithubAuthProvider,
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
  const [state, setState] = useState<GitHubAuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

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
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

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

        if (tokenData.access_token) {
          // Firebase GitHub 인증
          const credential = GithubAuthProvider.credential(
            tokenData.access_token,
          );
          const userCredential = await signInWithCredential(auth, credential);

          setState((prev) => ({
            ...prev,
            user: userCredential.user,
            isLoading: false,
          }));
        } else {
          throw new Error("GitHub 엑세스 토큰을 받을 수 없습니다.");
        }
      } else if (result.type == "cancel") {
        setState((prev) => ({ ...prev, isLoading: false }));
      } else {
        throw new Error("GitHub 인증이 실패했습니다.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      Alert.alert("로그인 실패", errorMessage, [
        { text: "확인", style: "default" },
      ]);
    }
  }, [promptAsync]);

  const signOut = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      await auth.signOut();

      setState((prev) => ({
        ...prev,
        user: null,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "로그아웃 중 오류가 발생했습니다.";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      Alert.alert("로그아웃 실패", errorMessage, [
        { text: "확인", style: "default" },
      ]);
    }
  }, []);

  return {
    ...state,
    signInWithGitHub,
    signOut,
  };
}
