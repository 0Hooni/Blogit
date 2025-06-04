import type {
  BlogPostSummary,
  GitHubRepositoryContent,
  GitHubUser,
} from "@/src/types/github";
import { DynamicEndpoint, GITHUB_API_ENDPOINT } from "./apiEndpoint";
import httpClient from "./httpClient";

class GitHubApiService {
  async getCurrentUser(): Promise<GitHubUser> {
    const response = await httpClient.get(GITHUB_API_ENDPOINT.USER.CURRENT);
    return response.data;
  }

  /**
   * 현재 사용자의 블로그 포스트 목록을 가져옵니다
   * @param path - 디렉토리 경로 (기본값: "_posts")
   * @returns 블로그 포스트 목록
   */
  async getBlogPosts(
    path: string = "_posts",
  ): Promise<GitHubRepositoryContent> {
    const user = await this.getCurrentUser();
    const endpoint = DynamicEndpoint.buildBlogPostsEndpoint(user.login, path);

    const response = await httpClient.get(endpoint);
    return response.data;
  }

  /**
   * 블로그 포스트 요약 정보를 가져옵니다 (포스팅 개수 포함)
   * @param path - 디렉토리 경로 (기본값: "_posts")
   * @returns 블로그 포스트 요약 정보
   */
  async getBlogPostSummary(path: string = "_posts"): Promise<BlogPostSummary> {
    const content = await this.getBlogPosts(path);
    return this.analyzeBlogContent(content);
  }

  /**
   * 레포지토리 콘텐츠를 분석하여 블로그 포스트 요약 정보를 생성합니다
   * @param content - GitHub 레포지토리 콘텐츠
   * @returns 분석된 블로그 포스트 요약 정보
   */
  private analyzeBlogContent(
    content: GitHubRepositoryContent,
  ): BlogPostSummary {
    if (!content) {
      return {
        totalPosts: 0,
        markdownFiles: [],
        otherFiles: [],
      };
    }

    // GitHub API에서 디렉토리 콘텐츠는 배열로 직접 반환됨
    if (Array.isArray(content)) {
      const files = content.filter((item) => item.type === "file");

      const markdownFiles = files.filter(
        (file) => file.name.endsWith(".md") || file.name.endsWith(".markdown"),
      );

      const otherFiles = files.filter(
        (file) =>
          !file.name.endsWith(".md") && !file.name.endsWith(".markdown"),
      );

      return {
        totalPosts: markdownFiles.length,
        markdownFiles,
        otherFiles,
        lastUpdated: new Date().toISOString(),
      };
    }

    // entries 프로퍼티가 있는 경우
    if (content.entries && Array.isArray(content.entries)) {
      const files = content.entries.filter((item) => item.type === "file");

      const markdownFiles = files.filter(
        (file) => file.name.endsWith(".md") || file.name.endsWith(".markdown"),
      );

      const otherFiles = files.filter(
        (file) =>
          !file.name.endsWith(".md") && !file.name.endsWith(".markdown"),
      );

      return {
        totalPosts: markdownFiles.length,
        markdownFiles,
        otherFiles,
        lastUpdated: new Date().toISOString(),
      };
    }

    // 단일 파일인 경우
    if ((content as GitHubRepositoryContent).type === "file") {
      const fileContent = content as GitHubRepositoryContent;
      const isMarkdown =
        fileContent.name.endsWith(".md") ||
        fileContent.name.endsWith(".markdown");
      return {
        totalPosts: isMarkdown ? 1 : 0,
        markdownFiles: isMarkdown ? [fileContent] : [],
        otherFiles: isMarkdown ? [] : [fileContent],
        lastUpdated: new Date().toISOString(),
      };
    }

    return {
      totalPosts: 0,
      markdownFiles: [],
      otherFiles: [],
    };
  }
}

const githubApiService = new GitHubApiService();
export default githubApiService;

export const { getCurrentUser } = githubApiService;
