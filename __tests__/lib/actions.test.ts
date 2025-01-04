import { createComment, createNewUser, createPost } from "@/app/lib/actions";
import { createCommentProps, User } from "@/app/lib/definitions";
import { db } from "@/app/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

jest.mock("@/app/lib/db", () => ({
  db: jest.fn(),
}));
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.unmock("@/app/lib/actions");

describe("createNewUser 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("user가 없으면 에러를 리턴한다", async () => {
    const user = { nickname: "test" } as User;
    await expect(createNewUser(user)).rejects.toThrow("User is not logged");
  });

  test("user.uuid가 없으면 에러를 리턴한다", async () => {
    const user = { nickname: "test" } as User;
    await expect(createNewUser(user)).rejects.toThrow("User is not logged");
  });

  test("user.nickname이 없으면 에러를 리턴한다", async () => {
    const user = { uuid: "test-uuid" } as User;
    await expect(createNewUser(user)).rejects.toThrow("User is not logged");
  });

  test("유효한 user 정보로 새 사용자를 생성한다", async () => {
    const user: User = {
      uuid: "test-uuid",
      user_name: "Test User",
      nickname: "testuser",
      email: "test@example.com",
      image: "https://example.com/image.jpg",
    };

    (db as jest.Mock).mockResolvedValue({ affectedRows: 1 });

    await expect(createNewUser(user)).resolves.not.toThrow();

    expect(db).toHaveBeenCalledWith({
      query: expect.stringContaining("INSERT INTO users"),
      queryParams: [
        user.uuid,
        user.user_name,
        user.nickname,
        user.email,
        user.image,
        expect.any(Date),
      ],
    });
  });
});

describe("createPost 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("db에 알맞은 쿼리로 호출하고 리다이렉트도 잘 호출된다.", async () => {
    const content = "testing";
    const language = "javascript";

    (auth as jest.Mock).mockResolvedValue({
      user: { id: "123", nickname: "nickname" },
    });
    (db as jest.Mock).mockResolvedValue({ affectedRows: 1 });

    await createPost({ content, language });

    expect(db).toHaveBeenCalledWith({
      query: expect.stringContaining("INSERT INTO posts"),
      queryParams: ["123", "nickname", "testing", "javascript"],
    });

    expect(redirect).toHaveBeenCalledWith("/");
  });

  test("로그인하지 않은 경우 에러를 던진다.", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    await expect(
      createPost({ content: "test", language: "javascript" })
    ).rejects.toThrow("로그인이 필요합니다.");
  });
});

describe("createComment 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("코멘트가 성공적으로 생성된다.", async () => {
    const mockComment = {
      comment: "Test comment",
      post_id: "1",
      uuid: "user-123",
      nickname: "testuser",
    } as createCommentProps;

    const mockReturnvalue = "success";

    (db as jest.Mock).mockResolvedValue(mockReturnvalue);

    await createComment(mockComment);

    expect(db).toHaveBeenCalledWith({
      query: expect.stringContaining("INSERT INTO comments"),
      queryParams: [
        mockComment.post_id,
        mockComment.uuid,
        mockComment.nickname,
        mockComment.comment,
      ],
    });
  });

  test("코멘트 생성 실패 시 에러가 발생한다.", async () => {
    const mockComment = {
      comment: "Test comment",
      post_id: "1",
      uuid: "user-123",
      nickname: "testuser",
    } as createCommentProps;

    const mockError = new Error("Database error");
    (db as jest.Mock).mockRejectedValue(mockError);

    await expect(createComment(mockComment)).rejects.toThrow("Database error");
  });
});
