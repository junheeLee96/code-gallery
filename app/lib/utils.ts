export function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
  if (isNaN(past.getTime())) {
    return "유효하지 않은 날짜입니다"; // 또는 적절한 에러 메시지를 반환
  }
  const diffInSeconds = (now.getTime() - past.getTime()) / 1000;

  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-Math.floor(diffInSeconds), "second");
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
  }
}

export function truncateText(input: string): [boolean, string] {
  const lines = input.split("\n");

  // 줄바꿈이 6줄 이상일 경우
  if (lines.length > 6) {
    return [true, lines.slice(0, 6).join("\n") + "\n..."];
  }
  // 500자 이상일 경우
  if (input.length > 500) {
    return [true, input.substring(0, 50) + "..."];
  }

  // 기본적으로 원본 텍스트 반환
  return [false, input];
}

export function formatDateTime(time: string): string {
  const date = new Date(time);
  // UTC 기반으로 날짜와 시간을 가져옵니다
  const year = String(date.getUTCFullYear()).slice(-2);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0"); // 시간은 UTC로 처리
  const minute = String(date.getUTCMinutes()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}
