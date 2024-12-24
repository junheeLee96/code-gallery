import { timeAgo, truncateText } from "@/app/lib/utils";

// timeAgo.test.ts

describe("timeAgo 함수", () => {
  it("몇 초전이 잘 리턴되는지 확인", () => {
    const date = new Date(Date.now() - 30 * 1000).toISOString(); // 30초 전
    const result = timeAgo(date);
    expect(result).toBe("30초 전");
  });

  it("몇 분전이 잘 리턴되는지 확인", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000).toISOString(); // 5분 전
    const result = timeAgo(date);
    expect(result).toBe("5분 전");
  });

  it("몇 시간전이 잘 리턴되는지 확인", () => {
    const date = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(); // 2시간 전
    const result = timeAgo(date);
    expect(result).toBe("2시간 전");
  });

  it("며칠 전이 잘 리턴되는지 확인", () => {
    const date = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(); // 3일 전
    const result = timeAgo(date);
    expect(result).toBe("3일 전");
  });
});

// truncateText.test.ts

describe("truncateText 함수", () => {
  it("6줄 이상이면 ...텍스트가 잘라지는지 확인", () => {
    const input = "line1\nline2\nline3\nline4\nline5\nline6\nline7";
    const [isTruncated, output] = truncateText(input);
    expect(isTruncated).toBe(true);
    expect(output).toBe("line1\nline2\nline3\nline4\nline5\nline6\n...");
  });

  it("500자 이상이면 잘라지는 확인", () => {
    const input = "a".repeat(501); // 501개의 'a' 문자
    const [isTruncated, output] = truncateText(input);
    expect(isTruncated).toBe(true);
    expect(output).toBe("a".repeat(50) + "...");
  });

  it("500자, 6줄 모두 해당안될때 텍스트가 그대로 리턴되는지 확인", () => {
    const input = "line1\nline2\nline3\nline4\nline5\nline6";
    const [isTruncated, output] = truncateText(input);
    expect(isTruncated).toBe(false);
    expect(output).toBe(input);
  });

  it("500자 이하일때 텍스트가 그대로 리턴되는지 확인", () => {
    const input = "a".repeat(500); // 500개의 'a' 문자
    const [isTruncated, output] = truncateText(input);
    expect(isTruncated).toBe(false);
    expect(output).toBe(input);
  });
});
