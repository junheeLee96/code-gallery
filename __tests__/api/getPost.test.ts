/**
 * @jest-environment node
 */

// request is not defined라는 에러 때문에 위에 것을 선언해야함
import { GET } from "@/app/api/getPost/[id]/route";
import { db } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Mock the db module
jest.mock("@/app/lib/db", () => ({
  db: jest.fn(),
}));

describe("GET /api/getPost/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("알맞은 글의 내용을 가져오는지 테스트한다.", async () => {
    const mockPost = {
      idx: "1",
      title: "Test Post",
      content: "This is a test post",
      author: "Test Author",
    };

    (db as jest.Mock).mockResolvedValue([mockPost]);

    const request = new NextRequest("http://localhost:3000/api/getPost/1");
    const response = await GET(request, { params: { id: "1" } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([mockPost]);
    expect(db).toHaveBeenCalledWith({
      query: "SELECT * FROM posts WHERE idx = ?",
      queryParams: ["1"],
    });
  });

  test("글 id값이 없으면 400을 리턴한다.", async () => {
    const request = new NextRequest("http://localhost:3000/api/getPost/");
    const response = await GET(request, { params: { id: "" } });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "Post ID is required" });
    expect(db).not.toHaveBeenCalled();
  });

  test("데이터베이스 조회를 실패하면 500에러를 리턴한다.", async () => {
    (db as jest.Mock).mockRejectedValue(new Error("Database error"));

    const request = new NextRequest("http://localhost:3000/api/getPost/1");
    const response = await GET(request, { params: { id: "1" } });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: "Failed to fetch post" });
    expect(db).toHaveBeenCalledWith({
      query: "SELECT * FROM posts WHERE idx = ?",
      queryParams: ["1"],
    });
  });
});
