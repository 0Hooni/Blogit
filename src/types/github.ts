export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  bio: string | null;
  blog: string | null;
  location: string | null;
  company: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

export interface GitHubContentLinks {
  git: string | null;
  html: string | null;
  self: string;
}

export interface GitHubContentItem {
  type: string;
  size: number;
  name: string;
  path: string;
  sha: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  _links: GitHubContentLinks;
}

export interface GitHubRepositoryContent {
  type: string;
  size: number;
  name: string;
  path: string;
  sha: string;
  content?: string;
  url: string;
  git_url: string | null;
  html_url: string | null;
  download_url: string | null;
  entries?: GitHubContentItem[];
  encoding?: string;
  _links: GitHubContentLinks;
}

// 블로그 포스트 관련 타입
export interface BlogPostSummary {
  totalPosts: number;
  markdownFiles: GitHubContentItem[];
  otherFiles: GitHubContentItem[];
  lastUpdated?: string;
}
