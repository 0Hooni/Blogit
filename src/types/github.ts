// GitHub User 타입
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

// GitHub Content Links 타입
export interface GitHubContentLinks {
  git: string | null;
  html: string | null;
  self: string;
}

// GitHub Content Item 타입
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

// GitHub Repository Content 타입
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
export interface BlogPost {
  id: string;
  title: string;
  fileName: string;
  path: string;
  publishedDate?: string;
  lastModified?: string;
  url: string;
  downloadUrl: string | null;
  sha: string;
}

// Blog Post Summary 타입
export interface BlogPostSummary {
  totalPosts: number;
  markdownFiles: GitHubContentItem[];
  blogPosts: BlogPost[];
  otherFiles: GitHubContentItem[];
  lastUpdated?: string;
}

// GitHub Repository 타입
export interface GitHubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

// Reactions 타입
export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

// GitHub App Permissions 타입
export interface GitHubAppPermissions {
  issues: "read" | "write";
  metadata: "read" | "write";
  [key: string]: string; // 다른 권한들을 위한 인덱스 시그니처
}

// GitHub App 타입
export interface GitHubApp {
  id: number;
  client_id: string;
  slug: string;
  node_id: string;
  owner: GitHubUser;
  name: string;
  description: string;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: GitHubAppPermissions;
  events: string[];
}

// 메인 Issue Comment 타입
export interface IssueComment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  author_association:
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
  body: string;
  reactions: Reactions;
  performed_via_github_app: GitHubApp;
}

// 배열 형태의 응답 타입
export type IssueCommentsResponse = IssueComment[];

// Comment Entity 타입
export interface CommentEntity {
  body: string;
  user: {
    login: string;
    avatar_url: string;
  };
  issue_number: number;
}
