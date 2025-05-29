import githubApiService from "@/src/services/githubApiService";
import { useQuery } from "@tanstack/react-query";

export const GITHUB_QUERY_KEY = {
  USER: {
    CURRENT: ["github", "user", "current"],
  },
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: GITHUB_QUERY_KEY.USER.CURRENT,
    queryFn: githubApiService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
