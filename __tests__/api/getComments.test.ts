// GET.test.ts

import { GET } from "@/app/api/getComments/route"; // 실제 경로로 변경하세요
import { db } from "@/app/lib/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { InfiniteQueryResponse, CommentsTypes } from "@/app/lib/definitions";
import moment from "moment-timezone";

jest.mock("@/app/lib/db");
jest.mock("@/auth");

describe("GET 함수 테스트", () => {
  const mockAuth = auth as jest.Mock;
  const mockDb = db as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 댓글을 반환한다", async () => {
    const mockSession = { user: { id: "test-uuid" } };
    mockAuth.mockResolvedValue(mockSession);

    const mockRequest = new Request(
      "https://example.com/api/comments?post_id=1&page=1&date=" +
        encodeURIComponent(new Date().toISOString())
    );
    const mockCountResult = [{ totalComments: 24 }];
    const mockCommentsResult = [
      {
        uuid: "test-uuid",
        reg_dt: new Date().toISOString(),
        comment: "test comment",
      },
    ];

    mockDb
      .mockResolvedValueOnce(mockCountResult) // For count query
      .mockResolvedValueOnce(mockCommentsResult); // For comments query

    const response = await GET(mockRequest);
    const jsonResponse = await response.json();

    expect(jsonResponse).toEqual({
      comments: [
        {
          comment: "test comment",
          reg_dt: moment
            .utc(mockCommentsResult[0].reg_dt)
            .tz("Asia/Seoul")
            .format(),
          isAuthor: true,
        },
      ],
      totalPage: 2,
      pageParams: 1,
    });
  });

  it("user가 없는 경우 에러를 반환한다", async () => {
    mockAuth.mockResolvedValue(null);

    const mockRequest = new Request(
      "https://example.com/api/comments?post_id=1&page=1&date=" +
        encodeURIComponent(new Date().toISOString())
    );

    await expect(GET(mockRequest)).rejects.toThrow("User is not logged");
  });
});
