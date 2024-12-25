// client.test.ts

import { client } from "@/app/api/client";

describe("client 함수 테스트", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  it("성공적으로 데이터를 반환한다", async () => {
    const mockData = { message: "성공" };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await client<{ message: string }>("/endpoint", {
      params: { key: "value" },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/endpoint?key=value`
    );
    expect(result).toEqual(mockData);
  });

  it("서버 오류 발생 시 에러를 던진다", async () => {
    const mockErrorData = { message: "요청에 실패했습니다." };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => mockErrorData,
    });

    await expect(
      client<{ message: string }>("/endpoint", {
        params: { key: "value" },
      })
    ).rejects.toThrow("요청에 실패했습니다.");

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/endpoint?key=value`
    );
  });

  it("알 수 없는 오류가 발생하면 에러를 던진다", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("알 수 없는 오류가 발생했습니다.")
    );

    await expect(
      client<{ message: string }>("/endpoint", {
        params: { key: "value" },
      })
    ).rejects.toThrow("알 수 없는 오류가 발생했습니다.");

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/endpoint?key=value`
    );
  });
});
