/**
 * ISO 8601 형식의 날짜 문자열을 받아서 현재 시간과의 차이를 계산하여
 * 한국어로 상대적인 시간을 반환합니다.
 *
 * @param dateString - ISO 8601 형식의 날짜 문자열 (예: "2024-06-09T06:31:11Z")
 * @returns 상대적인 시간 문자열 (예: "3시간 전", "2일 전", "now")
 */
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const targetDate = new Date(dateString);

  // 밀리초 단위 차이 계산
  const diffInMs = now.getTime() - targetDate.getTime();

  // 음수인 경우 (미래 시간) "now"로 처리
  if (diffInMs < 0) {
    return "now";
  }

  // 각 시간 단위별 밀리초 상수
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY; // 한 달
  const YEAR = 365 * DAY; // 1년

  // 1분 이내
  if (diffInMs < MINUTE) {
    return "now";
  }

  // 1시간 이내 - 분 단위
  if (diffInMs < HOUR) {
    const minutes = Math.floor(diffInMs / MINUTE);
    return `${minutes} minutes ago`;
  }

  // 24시간 이내 - 시간 단위
  if (diffInMs < DAY) {
    const hours = Math.floor(diffInMs / HOUR);
    return `${hours} hours ago`;
  }

  // 1주일 이내 - 일 단위
  if (diffInMs < WEEK) {
    const days = Math.floor(diffInMs / DAY);
    return `${days} days ago`;
  }

  // 1개월 이내 - 주 단위
  if (diffInMs < MONTH) {
    const weeks = Math.floor(diffInMs / WEEK);
    return `${weeks} weeks ago`;
  }

  // 1년 이내 - 개월 단위
  if (diffInMs < YEAR) {
    const months = Math.floor(diffInMs / MONTH);
    return `${months} months ago`;
  }

  // 1년 이상 - 년 단위
  const years = Math.floor(diffInMs / YEAR);
  return `${years} years ago`;
};
