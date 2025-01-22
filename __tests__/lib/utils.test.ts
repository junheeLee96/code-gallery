import { formatDateTime, timeAgo, truncateText } from "@/app/lib/utils";

describe("timeAgo 함수", () => {
  it("몇 초 전을 올바르게 반환한다", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 15 * 1000).toISOString(); // 15초 전
    expect(timeAgo(past)).toBe("15초 전");
  });

  it("몇 분 전을 올바르게 반환한다", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 5 * 60 * 1000).toISOString(); // 5분 전
    expect(timeAgo(past)).toBe("5분 전");
  });

  it("몇 시간 전을 올바르게 반환한다", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(); // 2시간 전
    expect(timeAgo(past)).toBe("2시간 전");
  });

  it("몇 일 전을 올바르게 반환한다", () => {
    const now = new Date();
    const past = new Date(
      now.getTime() - 3 * 24 * 60 * 60 * 1000
    ).toISOString(); // 3일 전
    expect(timeAgo(past)).toBe("3일 전");
  });

  it("유효하지 않은 날짜를 처리한다", () => {
    expect(timeAgo("invalid-date")).toBe("유효하지 않은 날짜입니다");
  });
});

describe("truncateText 함수", () => {
  it("텍스트가 6줄을 초과하면 줄여서 반환한다", () => {
    const longText = "줄1\n줄2\n줄3\n줄4\n줄5\n줄6\n줄7";
    const [isTruncated, truncatedText] = truncateText(longText);
    expect(isTruncated).toBe(true);
    expect(truncatedText).toBe("줄1\n줄2\n줄3\n줄4\n줄5\n줄6\n...");
  });

  it("텍스트가 500자를 초과하면 줄여서 반환한다", () => {
    const longText = "a".repeat(501);
    const [isTruncated, truncatedText] = truncateText(longText);
    expect(isTruncated).toBe(true);
    expect(truncatedText).toBe("a".repeat(50) + "...");
  });

  it("텍스트가 조건을 만족하지 않으면 그대로 반환한다", () => {
    const shortText = "짧은 텍스트";
    const [isTruncated, truncatedText] = truncateText(shortText);
    expect(isTruncated).toBe(false);
    expect(truncatedText).toBe(shortText);
  });
});

describe("formatDateTime function", () => {
  test("formats date correctly for UTC time", () => {
    const input = "2023-05-14T12:34:56Z";
    const expected = "23년 05월 14일 12시 34분";
    expect(formatDateTime(input)).toBe(expected);
  });

  test("formats date correctly for a different time zone", () => {
    const input = "2023-05-14T12:34:56+09:00";
    const expected = "23년 05월 14일 03시 34분";
    expect(formatDateTime(input)).toBe(expected);
  });

  test("handles dates before year 2000", () => {
    const input = "1999-12-31T23:59:59Z";
    const expected = "99년 12월 31일 23시 59분";
    expect(formatDateTime(input)).toBe(expected);
  });

  test("handles dates after year 2099", () => {
    const input = "2100-01-01T00:00:00Z";
    const expected = "00년 01월 01일 00시 00분";
    expect(formatDateTime(input)).toBe(expected);
  });

  test("handles leap years correctly", () => {
    const input = "2024-02-29T15:30:00Z";
    const expected = "24년 02월 29일 15시 30분";
    expect(formatDateTime(input)).toBe(expected);
  });

  test("handles daylight saving time transitions", () => {
    // Note: This test assumes the function always uses UTC
    const input = "2023-03-12T02:30:00-05:00"; // During DST transition in US
    const expected = "23년 03월 12일 07시 30분";
    expect(formatDateTime(input)).toBe(expected);
  });
});
