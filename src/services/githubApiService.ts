import type {
  BlogPost,
  BlogPostSummary,
  CommentEntity,
  GitHubRepository,
  GitHubRepositoryContent,
  GitHubUser,
  IssueCommentsResponse,
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
    user: GitHubUser,
    path: string = "_posts",
  ): Promise<GitHubRepositoryContent> {
    const endpoint = DynamicEndpoint.buildBlogPostsEndpoint(user.login, path);

    const response = await httpClient.get(endpoint);
    return response.data;
  }

  /**
   * 블로그 포스트 요약 정보를 가져옵니다 (포스팅 개수 포함)
   * @param path - 디렉토리 경로 (기본값: "_posts")
   * @returns 블로그 포스트 요약 정보
   */
  async getBlogPostSummary(
    user: GitHubUser,
    path: string = "_posts",
  ): Promise<BlogPostSummary> {
    const content = await this.getBlogPosts(user, path);
    return this.analyzeBlogContent(content);
  }

  /**
   * GitHub Repository 정보를 가져옵니다
   * @param owner - Repository 소유자 (사용자명)
   * @param repo - Repository 이름
   * @returns Repository 정보
   */
  async getRepositoryInfo(
    owner: string,
    repo: string,
  ): Promise<GitHubRepository> {
    const endpoint = DynamicEndpoint.buildRepositoryEndpoint(owner, repo);
    const response = await httpClient.get(endpoint);
    return response.data;
  }

  /**
   * 이슈 댓글을 가져옵니다
   * @param userLogin - Repository 소유자 (사용자명)
   * @returns 이슈 댓글
   */
  async getIssueComments(userLogin: string): Promise<IssueCommentsResponse> {
    const endpoint = DynamicEndpoint.buildIssueCommentsEndpoint(userLogin);
    const response = await httpClient.get(endpoint);
    return response.data;
  }

  /**
   * 이슈 댓글 요약 정보를 가져옵니다
   * @param userLogin - Repository 소유자 (사용자명)
   * @returns 이슈 댓글 요약 정보
   */
  async getIssueCommentsSummary(userLogin: string): Promise<CommentEntity[]> {
    const comments = await this.getIssueComments(userLogin);
    return this.analyzeIssueComments(comments);
  }

  /**
   * 마크다운 파일명에서 제목을 추출합니다
   * @param fileName - 파일명 (예: "2024-01-15-hello-world.md")
   * @returns 추출된 제목
   */
  private extractTitleFromFileName(fileName: string): string {
    // .md, .markdown 확장자 제거
    const nameWithoutExt = fileName.replace(/\.(md|markdown)$/i, "");

    // Jekyll 형식의 날짜 제거 (YYYY-MM-DD-)
    const titlePart = nameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, "");

    // 하이픈을 공백으로 변경하고 각 단어의 첫 글자를 대문자로
    return titlePart;
  }

  /**
   * 마크다운 파일명에서 발행 날짜를 추출합니다
   * @param fileName - 파일명 (예: "2024-01-15-hello-world.md")
   * @returns 발행 날짜 (ISO 형식) 또는 undefined
   */
  private extractDateFromFileName(fileName: string): string | undefined {
    const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      return new Date(dateMatch[1]).toISOString();
    }
    return undefined;
  }

  /**
   * GitHubContentItem을 BlogPost로 변환합니다
   * @param item - GitHub 컨텐츠 아이템
   * @returns 블로그 포스트 객체
   */
  private convertToBlogPost(item: any): BlogPost {
    return {
      id: item.sha,
      title: this.extractTitleFromFileName(item.name),
      fileName: item.name,
      path: item.path,
      publishedDate: this.extractDateFromFileName(item.name),
      lastModified: undefined, // GitHub Contents API로는 마지막 수정 시간을 가져올 수 없음
      url: item.url,
      downloadUrl: item.download_url,
      sha: item.sha,
    };
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
        blogPosts: [],
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

      // 마크다운 파일들을 BlogPost로 변환하고 날짜순 정렬
      const blogPosts = markdownFiles
        .map((file) => this.convertToBlogPost(file))
        .sort((a, b) => {
          // 발행 날짜가 있는 경우 날짜순으로 정렬 (최신순)
          if (a.publishedDate && b.publishedDate) {
            return (
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
            );
          }
          // 발행 날짜가 없는 경우 파일명으로 정렬
          return b.fileName.localeCompare(a.fileName);
        });

      return {
        totalPosts: markdownFiles.length,
        markdownFiles,
        blogPosts,
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

      const blogPosts = markdownFiles
        .map((file) => this.convertToBlogPost(file))
        .sort((a, b) => {
          if (a.publishedDate && b.publishedDate) {
            return (
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
            );
          }
          return b.fileName.localeCompare(a.fileName);
        });

      return {
        totalPosts: markdownFiles.length,
        markdownFiles,
        blogPosts,
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

      const blogPosts = isMarkdown ? [this.convertToBlogPost(fileContent)] : [];

      return {
        totalPosts: isMarkdown ? 1 : 0,
        markdownFiles: isMarkdown ? [fileContent] : [],
        blogPosts,
        otherFiles: isMarkdown ? [] : [fileContent],
        lastUpdated: new Date().toISOString(),
      };
    }

    return {
      totalPosts: 0,
      markdownFiles: [],
      blogPosts: [],
      otherFiles: [],
    };
  }

  /**
   * 이슈 댓글을 분석하여 요약 정보를 생성합니다
   * @param comments - 이슈 댓글
   * @returns 분석된 이슈 댓글 요약 정보
   */
  private analyzeIssueComments(
    comments: IssueCommentsResponse,
  ): CommentEntity[] {
    return comments.map((comment) => ({
      id: comment.id,
      body: comment.body,
      user: comment.user,
      issue_number: Number(comment.issue_url.split("/").pop()),
      created_at: comment.created_at,
    }));
  }
}

const githubApiService = new GitHubApiService();
export default githubApiService;

export const { getCurrentUser } = githubApiService;
