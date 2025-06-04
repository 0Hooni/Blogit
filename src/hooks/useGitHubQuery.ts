import githubApiService from "@/src/services/githubApiService";
import { useQuery } from "@tanstack/react-query";

export const GITHUB_QUERY_KEY = {
  USER: {
    CURRENT: ["github", "user", "current"],
  },
  REPOSITORY: {
    BLOG_POSTS: (owner: string, path: string = "_posts") => [
      "github",
      "repository",
      "blog-posts",
      owner,
      path,
    ],
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

export const useBlogPosts = (path: string = "_posts") => {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: GITHUB_QUERY_KEY.REPOSITORY.BLOG_POSTS(user?.login || "", path),
    queryFn: () => githubApiService.getBlogPosts(path),
    enabled: !!user?.login, // 사용자 정보가 있는 경우에만 쿼리 실행
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
