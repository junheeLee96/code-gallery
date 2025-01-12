/**
 * @jest-environment node
 */

import { db } from "@/app/lib/db";
import {
  createNewUser,
  createPost,
  createComment,
  createLike,
} from "@/app/lib/actions";
import {
  User,
  createPostProps,
  createCommentProps,
} from "@/app/lib/definitions";
import { auth } from "@/auth";
// 모킹

jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@/app/lib/db", () => ({
  db: jest.fn(),
}));

describe("서버 액션 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewUser 함수", () => {
    it("새 사용자를 성공적으로 생성해야 함", async () => {
      const mockUser: User = {
        uuid: "123",
        user_name: "홍길동",
        email: "hong@example.com",
        image: "profile.jpg",
        nickname: "길동이",
      };
      (auth as jest.Mock).mockResolvedValue({});
      (db as jest.Mock).mockResolvedValue({});

      await createNewUser(mockUser);

      expect(db).toHaveBeenCalled();
    });

    it("사용자가 로그인하지 않은 경우 에러를 던져야 함", async () => {
      await expect(createNewUser({} as User)).rejects.toThrow(
        "User is not logged"
      );
    });
  });

  describe("createPost 함수", () => {
    it("새 게시물을 성공적으로 생성해야 함", async () => {
      const mockPost: createPostProps = {
        title: "테스트 게시물",
        content: "이것은 테스트 게시물입니다",
        language: "ko",
      };

      (auth as jest.Mock).mockResolvedValue({
        user: { id: "123", nickname: "길동이" },
      });

      (db as jest.Mock).mockResolvedValue({});

      await createPost(mockPost);

      expect(db).toHaveBeenCalledWith(
        expect.objectContaining({
          query: expect.stringContaining("INSERT INTO posts"),
          queryParams: expect.arrayContaining([
            "123",
            "길동이",
            mockPost.title,
            mockPost.content,
            mockPost.language,
          ]),
        })
      );
    });

    it("사용자가 로그인하지 않은 경우 에러를 던져야 함", async () => {
      (auth as jest.Mock).mockResolvedValue({});

      await expect(createPost({} as createPostProps)).rejects.toThrow(
        "로그인이 필요합니다."
      );
    });
  });

  describe("createComment 함수", () => {
    it("새 댓글을 성공적으로 생성해야 함", async () => {
      const mockComment: createCommentProps = {
        comment: "테스트 댓글",
        post_id: "456",
        uuid: "123",
        nickname: "길동이",
      };

      (db as jest.Mock).mockResolvedValue({});

      await createComment(mockComment);

      expect(db).toHaveBeenCalledTimes(2);
      expect(db).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          query: expect.stringContaining(
            "UPDATE posts SET comment = comment + 1"
          ),
          queryParams: [mockComment.post_id],
        })
      );
      expect(db).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          query: expect.stringContaining("INSERT INTO comments"),
          queryParams: expect.arrayContaining([
            mockComment.post_id,
            mockComment.uuid,
            mockComment.nickname,
            mockComment.comment,
          ]),
        })
      );
    });
  });

  describe("createLike 함수", () => {
    it("좋아요를 성공적으로 생성해야 함", async () => {
      const post_id = "456";
      const isLike = true;

      (auth as jest.Mock).mockResolvedValue({
        user: { id: "123" },
      });

      (db as jest.Mock).mockResolvedValue({});

      await createLike(post_id, isLike);

      expect(db).toHaveBeenCalledTimes(2);
      expect(db).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          query: expect.stringContaining(
            "UPDATE posts SET `like` = `like` + 1"
          ),
          queryParams: [post_id],
        })
      );
      expect(db).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          query: expect.stringContaining("INSERT INTO likes"),
          queryParams: ["123", post_id],
        })
      );
    });

    it("좋아요를 성공적으로 제거해야 함", async () => {
      const post_id = "456";
      const isLike = false;

      (auth as jest.Mock).mockResolvedValue({
        user: { id: "123" },
      });

      (db as jest.Mock).mockResolvedValue({});

      await createLike(post_id, isLike);

      expect(db).toHaveBeenCalledTimes(2);
      expect(db).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          query: expect.stringContaining(
            "UPDATE posts SET `like` = `like` - 1"
          ),
          queryParams: [post_id],
        })
      );
      expect(db).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          query: expect.stringContaining("DELETE FROM likes"),
          queryParams: ["123", post_id],
        })
      );
    });
  });
});
