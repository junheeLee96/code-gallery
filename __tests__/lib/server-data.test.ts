import { getPosts } from "@/app/lib/client-data";
import { db } from "@/app/lib/db";
import { User } from "@/app/lib/definitions";
import { getPost, getUser } from "@/app/lib/server-data";
import { auth } from "@/auth";

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/app/lib/db", () => ({
  db: jest.fn(),
}));

describe("사용자 및 게시물 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUser 함수", () => {
    it("사용자를 성공적으로 가져옴", async () => {
      const mockUser: User = {
        uuid: "123",
        user_name: "테스트 사용자",
        email: "test@example.com",
        image: "profile.jpg",
        nickname: "테스터",
      };

      (db as jest.Mock).mockResolvedValue([mockUser]);

      const result = await getUser("123");

      expect(db).toHaveBeenCalledWith({
        query: "SELECT * FROM users WHERE uuid = ?",
        queryParams: ["123"],
      });
      expect(result).toEqual([mockUser]);
    });

    it("사용자가 없을 때 빈 배열을 반환함", async () => {
      (db as jest.Mock).mockResolvedValue([]);

      const result = await getUser("456");

      expect(db).toHaveBeenCalledWith({
        query: "SELECT * FROM users WHERE uuid = ?",
        queryParams: ["456"],
      });
      expect(result).toEqual([]);
    });
  });

  describe("getPost 함수", () => {
    // it("게시물을 성공적으로 가져오고 포맷팅함", async () => {
    //   const mockPost = {
    //     idx: "1",
    //     title: "테스트 게시물",
    //     content: "내용",
    //     uuid: "123",
    //   };

    //   (auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    //   (db as jest.Mock).mockResolvedValueOnce([mockPost]);
    //   (db as jest.Mock).mockResolvedValueOnce([{ exists: true }]); // isLike 함수에 대한 모의 응답

    //   const result = await getPosts("1");

    //   expect(db).toHaveBeenCalledWith({
    //     query: "SELECT * FROM posts WHERE idx = ?",
    //     queryParams: ["1"],
    //   });
    //   expect(result).toEqual([
    //     {
    //       idx: "1",
    //       title: "테스트 게시물",
    //       content: "내용",
    //       initialLike: true,
    //       isAuthor: true,
    //     },
    //   ]);
    // });

    // it("게시물이 없을 때 null을 반환함", async () => {
    //   (auth as jest.Mock).mockResolvedValue({ user: { id: "123" } });
    //   (db as jest.Mock).mockResolvedValue([]);

    //   const result = await getPost("999");

    //   expect(db).toHaveBeenCalled();
    //   expect(result).toBeNull();
    // });

    it("로그인하지 않은 사용자에 대해 적절히 처리함", async () => {
      const mockPost = {
        idx: "1",
        title: "테스트 게시물",
        content: "내용",
        uuid: "123",
      };

      (auth as jest.Mock).mockResolvedValue({});
      (db as jest.Mock).mockResolvedValueOnce([mockPost]);
      (db as jest.Mock).mockResolvedValueOnce([]); // isLike 함수에 대한 모의 응답

      const result = await getPost("1");

      expect(result).toEqual([
        {
          idx: "1",
          title: "테스트 게시물",
          content: "내용",
          initialLike: false,
          isAuthor: false,
        },
      ]);
    });
  });
});
