import mysql, { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { db } from "@/app/lib/db";

jest.mock("mysql2/promise", () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    createPool: jest.fn(() => mockPool),
    Pool: jest.fn(() => mockPool),
  };
});

describe("db 함수 테스트", () => {
  let mockPool: jest.Mocked<Pool>;

  beforeEach(() => {
    mockPool = mysql.createPool() as jest.Mocked<Pool>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("쿼리가 성공적으로 실행되어 결과를 반환한다", async () => {
    const mockQueryParams = ["value1", 123, new Date()];
    const mockResult = [{ id: 1, name: "test" }];
    mockPool.query.mockResolvedValue([mockResult]);

    const result = await db<{ id: number; name: string }>({
      query: "SELECT * FROM test WHERE id = ?",
      queryParams: mockQueryParams,
    });

    expect(mockPool.query).toHaveBeenCalledWith(
      "SELECT * FROM test WHERE id = ?",
      mockQueryParams
    );
    expect(result).toEqual(mockResult);
  });

  test("쿼리 실행 중 오류가 발생하면 에러를 던진다", async () => {
    const mockQueryParams = ["value1", 123, new Date()];
    const mockError = new Error("쿼리 실행 오류");
    mockPool.query.mockRejectedValue(mockError);

    await expect(
      db<{ id: number; name: string }>({
        query: "SELECT * FROM test WHERE id = ?",
        queryParams: mockQueryParams,
      })
    ).rejects.toThrow("쿼리 실행 오류");

    expect(mockPool.query).toHaveBeenCalledWith(
      "SELECT * FROM test WHERE id = ?",
      mockQueryParams
    );
  });

  test("알 수 없는 오류가 발생하면 기본 오류 메시지를 던진다", async () => {
    const mockQueryParams = ["value1", 123, new Date()];

    // 예기치 않은 오류 객체를 던지도록 설정합니다
    mockPool.query.mockRejectedValue({});

    await expect(
      db<{ id: number; name: string }>({
        query: "SELECT * FROM test WHERE id = ?",
        queryParams: mockQueryParams,
      })
    ).rejects.toThrow("알 수 없는 오류가 발생했습니다.");

    expect(mockPool.query).toHaveBeenCalledWith(
      "SELECT * FROM test WHERE id = ?",
      mockQueryParams
    );
  });
});
