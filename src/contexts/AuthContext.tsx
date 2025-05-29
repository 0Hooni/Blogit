import { auth } from "@/firebaseConfig";
import { useGitHubAuth } from "@/src/hooks/useGitHubAuth";
import { setTokenExpiredHandler } from "@/src/services/httpClient";
import { router, SplashScreen } from "expo-router";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  user: FirebaseUser | null; // 현재 로그인된 사용자
  isLoading: boolean; // 인증 상태 확인 중
  isInitialized: boolean; // 앱 초기화 완료 여부
  signIn: () => Promise<void>; // 로그인 함수
  signOut: () => Promise<void>; // 로그아웃 함수
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthContextProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const { signInWithGitHub, signOut: githubSignOut } = useGitHubAuth();

  const handleTokenExpired = useCallback(async () => {
    await githubSignOut();
    router.replace("/login");
  }, [githubSignOut]);

  useEffect(() => {
    setTokenExpiredHandler(handleTokenExpired);

    return () => {
      setTokenExpiredHandler(null);
    };
  }, [handleTokenExpired]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setIsLoading(true);

    try {
      await signInWithGitHub();
      router.replace("/");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await githubSignOut();
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      SplashScreen.hideAsync();
      setIsLoading(false);
    }
  }, [isInitialized]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isInitialized,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
}
