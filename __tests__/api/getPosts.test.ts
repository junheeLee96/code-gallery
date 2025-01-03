/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";
import { GET } from "@/app/api/getPosts/route";
import { db } from "@/app/lib/db";
import { auth } from "@/auth";

// 모킹
jest.mock("@/app/lib/db");
jest.mock("@/auth");

describe("GET 함수 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (auth as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
  });

  test("기본 요청 처리 테스트", async () => {
    const mockRequest = new NextRequest("http://localhost:3000/api/getPosts");
    const mockDbResponse = [{ totalPosts: 100 }];
    const mockPosts = [
      { idx: 1, uuid: "user1", reg_dt: new Date(), like_count: 10 },
      { idx: 2, uuid: "user2", reg_dt: new Date(), like_count: 5 },
    ];

    (db as jest.Mock).mockResolvedValueOnce([mockDbResponse]);
    (db as jest.Mock).mockResolvedValueOnce(mockPosts);
    (db as jest.Mock).mockResolvedValue([]);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(result.data.length).toBe(2);
    expect(result.totalPosts).toBe(100);
    expect(result.nextCursor).not.toBeNull();
  });

  test("언어 필터 적용 테스트", async () => {
    const mockRequest = new NextRequest(
      "http://localhost:3000/api/getPosts?language=ko"
    );
    const mockDbResponse = [{ totalPosts: 50 }];
    const mockPosts = [
      {
        idx: 1,
        uuid: "user1",
        reg_dt: new Date(),
        like_count: 10,
        language: "ko",
      },
    ];

    (db as jest.Mock).mockResolvedValueOnce([mockDbResponse]);
    (db as jest.Mock).mockResolvedValueOnce(mockPosts);
    (db as jest.Mock).mockResolvedValue([]);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(result.data.length).toBe(1);
    expect(result.data[0].language).toBe("ko");
  });

  test("정렬 옵션 테스트 - 최신순", async () => {
    const mockRequest = new NextRequest(
      "http://localhost:3000/api/getPosts?sorting=recent"
    );
    const mockDbResponse = [{ totalPosts: 100 }];
    const mockPosts = [
      { idx: 2, uuid: "user2", reg_dt: new Date(2023, 1, 2), like_count: 5 },
      { idx: 1, uuid: "user1", reg_dt: new Date(2023, 1, 1), like_count: 10 },
    ];

    (db as jest.Mock).mockResolvedValueOnce([mockDbResponse]);
    (db as jest.Mock).mockResolvedValueOnce(mockPosts);
    (db as jest.Mock).mockResolvedValue([]);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(result.data[0].idx).toBe(2);
    expect(result.data[1].idx).toBe(1);
  });

  test("정렬 옵션 테스트 - 좋아요 순", async () => {
    const mockRequest = new NextRequest(
      "http://localhost:3000/api/getPosts?sorting=like"
    );
    const mockDbResponse = [{ totalPosts: 100 }];
    const mockPosts = [
      { idx: 1, uuid: "user1", reg_dt: new Date(2023, 1, 1), like_count: 10 },
      { idx: 2, uuid: "user2", reg_dt: new Date(2023, 1, 2), like_count: 5 },
    ];

    (db as jest.Mock).mockResolvedValueOnce([mockDbResponse]);
    (db as jest.Mock).mockResolvedValueOnce(mockPosts);
    (db as jest.Mock).mockResolvedValue([]);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(result.data[0].like).toBe(10);
    expect(result.data[1].like).toBe(5);
  });

  test("커서 기반 페이지네이션 테스트", async () => {
    const cursor = `1_${new Date(2023, 1, 1).getTime()}_10`;
    const mockRequest = new NextRequest(
      `http://localhost:3000/api/getPosts?cursor=${cursor}`
    );
    const mockDbResponse = [{ totalPosts: 100 }];
    const mockPosts = [
      { idx: 2, uuid: "user2", reg_dt: new Date(2023, 1, 2), like_count: 5 },
    ];

    (db as jest.Mock).mockResolvedValueOnce([mockDbResponse]);
    (db as jest.Mock).mockResolvedValueOnce(mockPosts);
    (db as jest.Mock).mockResolvedValue([]);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(result.data.length).toBe(1);
    expect(result.data[0].idx).toBe(2);
  });

  test("세션 없을 때 테스트", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const mockRequest = new NextRequest("http://localhost:3000/api/getPosts");
    const mockDbResponse = [{ totalPosts: 100 }];
    const mockPosts = [
      { idx: 1, uuid: "user1", reg_dt: new Date(), like_count: 10 },
    ];

    (db as jest.Mock).mockResolvedValueOnce([mockDbResponse]);
    (db as jest.Mock).mockResolvedValueOnce(mockPosts);
    (db as jest.Mock).mockResolvedValue([]);

    const response = await GET(mockRequest);
    const result = await response.json();

    expect(result.data.length).toBe(1);
    expect(result.data[0].isAuthor).toBe(false);
  });

  test("데이터베이스 오류 처리 테스트", async () => {
    const mockRequest = new NextRequest("http://localhost:3000/api/getPosts");

    (db as jest.Mock).mockRejectedValue(new Error("Database error"));

    await expect(GET(mockRequest)).rejects.toThrow("Database error");
  });
});
