import { QueryClient } from "@tanstack/react-query";

const MINUTE = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE, // 10분간 캐시 유지
      staleTime: 5 * MINUTE, // 5분간 fresh
      retry: 3, // 실패 시 3번 재시도
      refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
    },
    mutations: {
      retry: 1, // 뮤테이션 실패 시 1번 재시도
    },
  },
});
