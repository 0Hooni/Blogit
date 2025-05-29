import type { GitHubUser } from "@/src/types/github";
import { GITHUB_API_ENDPOINT } from "./apiEndpoint";
import httpClient from "./httpClient";

class GitHubApiService {
  async getCurrentUser(): Promise<GitHubUser> {
    const response = await httpClient.get(GITHUB_API_ENDPOINT.USER.CURRENT);
    return response.data;
  }
}

const githubApiService = new GitHubApiService();
export default githubApiService;

export const { getCurrentUser } = githubApiService;
