/**
 * @jest-environment node
 */

// request is not defined라는 에러 때문에 위에 것을 선언해야함

import { db } from "@/app/lib/db";
import { auth } from "@/auth";
import { GET } from "@/app/api/getPosts/route";
import { NextRequest } from "next/server";

jest.mock("@/app/lib/db", () => ({
  db: jest.fn(),
}));
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));
describe("글 가져오기 API 테스트", () => {
  test("글이 잘 가져와지는지 테스트한다.", async () => {
    const mockDB_res_value_1 = [{ totalPosts: 24 }];
    const mockDB_res_value_2 = [
      {
        idx: 1,
        post_id: 1,
        uuid: "1",
        nickname: "nickname",
        reg_dt: new Date("2023-01-01T00:00:00+09:00"),
      },
      {
        idx: 2,
        post_id: 1,
        uuid: "1",
        nickname: "nickname",
        reg_dt: new Date("2023-01-01T00:00:00+09:00"),
      },
    ];

    (db as jest.Mock)
      .mockResolvedValueOnce(mockDB_res_value_1)
      .mockResolvedValueOnce(mockDB_res_value_2);

    (auth as jest.Mock).mockResolvedValue({
      user: {
        id: "1",
        nickname: "nickname",
      },
    });

    const request = new NextRequest(
      "http://localhost:3000/api/getPosts?language=javascript&page=1&date=2024-01-01"
    );

    const response = await GET(request);
    const data = await response.json();

    expect(db).toHaveBeenCalledTimes(2);
    expect(auth).toHaveBeenCalledTimes(1);
    expect(data).toEqual({
      totalPage: 2,
      pageParams: 1,
      posts: [
        {
          idx: 1,
          post_id: 1,
          nickname: "nickname",
          reg_dt: "2022-12-31T15:00:00.000Z",
          isAuthor: true,
        },
        {
          idx: 2,
          post_id: 1,
          nickname: "nickname",
          reg_dt: "2022-12-31T15:00:00.000Z",
          isAuthor: true,
        },
      ],
    });
  });

  test("가져온 댓글의 본인 소유 절차를 확인한다", async () => {
    const mockDB_res_value_1 = [{ totalPosts: 24 }];
    const mockDB_res_value_2 = [
      {
        idx: 1,
        post_id: 1,
        uuid: "1",
        nickname: "nickname",
        reg_dt: new Date("2023-01-01T00:00:00+09:00"),
      },
      {
        idx: 2,
        post_id: 1,
        uuid: "2",
        nickname: "nickname",
        reg_dt: new Date("2023-01-01T00:00:00+09:00"),
      },
    ];

    (db as jest.Mock)
      .mockResolvedValueOnce(mockDB_res_value_1)
      .mockResolvedValueOnce(mockDB_res_value_2);

    (auth as jest.Mock).mockResolvedValue({
      user: {
        id: "1",
        nickname: "nickname",
      },
    });

    const request = new NextRequest(
      "http://localhost:3000/api/getComments?post_id=1&page=1&date=2024-01-01"
    );

    const response = await GET(request);
    const data = await response.json();

    expect(data.posts[0].isAuthor).toBe(true);
    expect(data.posts[1].isAuthor).toBe(false);

    //
  });
});