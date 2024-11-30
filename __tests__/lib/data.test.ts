import { getUserInfo } from "@/app/lib/data";

describe("getUserInfo", () => {
  test("fetch 호출이 문자열 오류를 던진다.", async () => {
    const mockError = "Fetch error";
    global.fetch = jest.fn().mockRejectedValue(mockError);

    try {
      await getUserInfo("invalid_token");
    } catch (e) {
      expect(e).toEqual(new Error("Fetch error"));
    }
  });

  test("fetch 호출이 알 수 없는 오류를 던진다.", async () => {
    global.fetch = jest.fn().mockRejectedValue({});

    try {
      await getUserInfo("invalid_token");
    } catch (e) {
      expect(e).toEqual(new Error("An unknown error occurred"));
    }
  });

  test("fetch 호출이 Error 객체를 던진다.", async () => {
    const mockError = new Error("Network error");
    global.fetch = jest.fn().mockRejectedValue(mockError);

    try {
      await getUserInfo("invalid_token");
    } catch (e) {
      expect(e).toEqual(mockError);
    }
  });

  test("유효한 토큰이다.(적합한 사용자)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ id: "123", isValid: true }),
    });

    const data = await getUserInfo("valid_token");
    expect(data.isValid).toBe(true);
  });

  test("유효하지 않은 토큰이다.(부적합한 사용자)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ isValid: false }),
    });

    const data = await getUserInfo("invalid_token");
    expect(data.isValid).toBe(false);
  });
});
