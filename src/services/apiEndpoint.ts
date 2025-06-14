export const GITHUB_API_ENDPOINT = {
  USER: {
    CURRENT: "/user",
  },
  REPOSITORY: {
    CONTENTS: "/repos/{owner}/{repo}/contents/{path}",
    REPOSITORY: "/repos/{owner}/{repo}",
  },
  ISSUE: {
    COMMENTS: "/repos/{owner}/{repo}/issues/comments",
  },
};

interface EndpointParams {
  owner: string;
  repo: string;
  path?: string;
}

export class DynamicEndpoint {
  /**
   * 동적 엔드포인트 URL을 생성합니다
   * @param template - 템플릿 URL (예: "/repos/{owner}/{repo}/contents/{path}")
   * @param params - 교체할 파라미터들
   * @returns 완성된 엔드포인트 URL
   */
  static build(template: string, params: EndpointParams): string {
    let endpoint = template;

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        endpoint = endpoint.replace(`{${key}}`, value);
      }
    });

    // path가 optional일 때 템플릿에 남아있는 {path}를 빈 문자열로 대체
    endpoint = endpoint.replace(/\{path\}/g, "");

    return endpoint;
  }

  /**
   * GitHub Pages 블로그의 _posts 디렉토리 엔드포인트를 생성합니다
   * @param owner - GitHub 사용자명
   * @param path - 경로 (기본값: "_posts")
   * @returns 완성된 엔드포인트 URL
   */
  static buildBlogPostsEndpoint(
    owner: string,
    path: string = "_posts",
  ): string {
    return this.build(GITHUB_API_ENDPOINT.REPOSITORY.CONTENTS, {
      owner,
      repo: `${owner}.github.io`,
      path,
    });
  }

  /**
   * GitHub Repository 정보 엔드포인트를 생성합니다
   * @param owner - GitHub 사용자명
   * @param repo - Repository 이름
   * @returns 완성된 엔드포인트 URL
   */
  static buildRepositoryEndpoint(owner: string, repo: string): string {
    return this.build(GITHUB_API_ENDPOINT.REPOSITORY.REPOSITORY, {
      owner,
      repo,
    });
  }

  static buildIssueCommentsEndpoint(owner: string): string {
    return this.build(GITHUB_API_ENDPOINT.ISSUE.COMMENTS, {
      owner,
      repo: `${owner}.github.io`,
    });
  }
}
