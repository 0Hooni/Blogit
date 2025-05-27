import { auth } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useGitHubAuth } from "../hooks/useGitHubAuth";

interface AuthContextType {
  user: FirebaseUser | null; // 현재 로그인된 사용자
  isLoading: boolean; // 인증 상태 확인 중
  isInitialized: boolean; // 앱 초기화 완료 여부
  signIn: () => Promise<void>; // 로그인 함수
  signOut: () => Promise<void>; // 로그아웃 함수
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const { signInWithGitHub, signOut: githubSignOut } = useGitHubAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      // AsyncStorage에 인증 상태 저장
      if (firebaseUser) {
        await AsyncStorage.setItem("isAuthenticated", "true");
      } else {
        await AsyncStorage.removeItem("isAuthenticated");
      }

      setIsInitialized(true);
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    setIsLoading(true);

    try {
      await signInWithGitHub();
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await githubSignOut();
    } finally {
      setIsLoading(false);
    }
  };

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
