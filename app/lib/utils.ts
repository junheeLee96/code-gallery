export function timeAgo(date: string): string {
  const now = new Date();
  const past = new Date(date);
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
