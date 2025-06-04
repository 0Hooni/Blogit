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
    BLOG_POSTS_SUMMARY: (owner: string, path: string = "_posts") => [
      "github",
      "repository",
      "blog-posts-summary",
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

/**
 * 현재 사용자의 블로그 포스트를 가져오는 훅
 */
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

/**
 * 현재 사용자의 블로그 포스트 요약 정보를 가져오는 훅 (포스팅 개수 포함)
 */
export const useBlogPostsSummary = (path: string = "_posts") => {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: GITHUB_QUERY_KEY.REPOSITORY.BLOG_POSTS_SUMMARY(
      user?.login || "",
      path,
    ),
    queryFn: () => githubApiService.getBlogPostSummary(path),
    enabled: !!user?.login,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
