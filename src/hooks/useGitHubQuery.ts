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
    REPOSITORY: (owner: string, repo: string) => [
      "github",
      "repository",
      "info",
      owner,
      repo,
    ],
  },
  ISSUE: {
    COMMENTS: (owner: string) => ["github", "issue", "comments", owner],
  },
};

/**
 * 현재 사용자 정보를 가져오는 훅
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: GITHUB_QUERY_KEY.USER.CURRENT,
    queryFn: githubApiService.getCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * 현재 사용자의 블로그 포스트를 가져오는 훅 (블로그 포스트 목록)
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
 * 현재 사용자의 블로그 포스트 요약 정보를 가져오는 훅 (포스팅 개수, 블로그 포스트 요약 정보 포함)
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

/**
 * GitHub Repository 정보를 가져오는 훅
 * @param owner - Repository 소유자 (사용자명)
 * @param repo - Repository 이름
 */
export const useRepositoryInfo = (owner: string, repo: string) => {
  return useQuery({
    queryKey: GITHUB_QUERY_KEY.REPOSITORY.REPOSITORY(owner, repo),
    queryFn: () => githubApiService.getRepositoryInfo(owner, repo),
    enabled: !!owner && !!repo, // owner와 repo가 있을 때만 실행
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 지연
  });
};

/**
 * 이슈 댓글 요약 정보를 가져오는 훅
 * @param owner - Repository 소유자 (사용자명)
 * @param repo - Repository 이름
 */
export const useIssueCommentsSummary = () => {
  const { data: user } = useCurrentUser();

  return useQuery({
    queryKey: GITHUB_QUERY_KEY.ISSUE.COMMENTS(user?.login || ""),
    queryFn: () => githubApiService.getIssueCommentsSummary(),
    enabled: !!user?.login,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
