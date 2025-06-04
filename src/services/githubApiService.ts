import type { GitHubUser } from "@/src/types/github";
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
  async getBlogPosts(path: string = "_posts") {
    const user = await getCurrentUser();
    const endpoint = DynamicEndpoint.buildBlogPostsEndpoint(user.login, path);

    const response = await httpClient.get(endpoint);
    return response.data;
  }
}

const githubApiService = new GitHubApiService();
export default githubApiService;

export const { getCurrentUser } = githubApiService;
