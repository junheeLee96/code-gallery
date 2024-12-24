// getPosts.test.ts

import { client } from "@/app/api/client";
import { getComments, getPost, getPosts, getUser } from "@/app/lib/data";
import { InfiniteQueryResponse, PostTypes } from "@/app/lib/definitions";
jest.mock("@/app/api/client", () => ({
  client: jest.fn(),
}));

describe("getUser 테스트", () => {
  it("getUser가 옳은 값을 리턴하는지 테스트", async () => {
    const mock_uuid = "1234";
    const mockResponse = {
      uuid: "1234",
      user_name: "example",
      eamil: "example@example.com",
      image: "www",
      nickname: "example_nickname",
    };
    (client as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getUser(mock_uuid);

    expect(result).toEqual(mockResponse);
  });
});

describe("getPosts 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("파라미터가 잘 들어갔는지와 값이 제대로 나왔는지 테스트", async () => {
    const mockDate = new Date("2024-01-01T00:00:00Z");
    const mockParams = {
      page: 1,
      queryKey: "javascript",
      date: mockDate,
    };

    const mockResponse: InfiniteQueryResponse<PostTypes[]> = {
      posts: [],
      totalPage: 1,
      pageParams: 1,
    };

    (client as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getPosts(mockParams);

    expect(client).toHaveBeenCalledWith("/api/getPosts", {
      params: {
        page: "1",
        language: "javascript",
        date: encodeURIComponent(mockDate.toISOString()),
      },
    });

    expect(result).toEqual(mockResponse);
  });

  it("client함수로부터 에러가 발생했을때 에러를 리턴받는다.", async () => {
    const mockError = new Error("Network error");
    (client as jest.Mock).mockRejectedValue(mockError);

    const mockParams = {
      page: 1,
      queryKey: "javascript",
      date: new Date(),
    };

    await expect(getPosts(mockParams)).rejects.toThrow("Network error");
  });
});

describe("getComments 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("파라미터가 잘 들어갔는지와 값이 제대로 나왔는지 테스트", async () => {
    const mockDate = new Date("2024-01-01T00:00:00Z");
    const mockParams = {
      page: 1,
      queryKey: "1", // queryKey를 post_id로 변경
      date: mockDate,
    };

    const mockResponse = {
      // PostTypes[]를 CommentTypes[]로 변경
      comments: [],
      totalPage: 1,
      pageParams: 1,
    };

    (client as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getComments(mockParams);

    expect(client).toHaveBeenCalledWith("/api/getComments", {
      params: {
        page: "1", // 문자열로 변경
        post_id: "1", // queryKey를 post_id로 변경
        date: encodeURIComponent(mockDate.toISOString()),
      },
    });

    expect(result).toEqual(mockResponse);
  });

  it("client함수로부터 에러가 발생했을때 에러를 리턴받는다.", async () => {
    const mockError = new Error("Network error");
    (client as jest.Mock).mockRejectedValue(mockError);

    const mockParams = {
      page: 1,
      queryKey: "1", // queryKey를 post_id로 변경
      date: new Date(),
    };

    await expect(getComments(mockParams)).rejects.toThrow("Network error");
  });
});

describe("getPost 테스트", () => {
  test("에러가 발생하는 것을 확인", async () => {
    const mockError = new Error("Network error");
    (client as jest.Mock).mockRejectedValue(mockError);

    const mock_post_id = "1";

    await expect(getPost(mock_post_id)).rejects.toThrow("Network error");
  });

  test("getPost의 리턴값을 잘 받는다", async () => {
    const mockResponse = {
      idx: 1,
      isAuthor: true,
      nickname: "nickname",
      content: "content mock",
      language: "javascript",
      like: 0,
      comment: 0,
      reg_dt: new Date(),
    };

    (client as jest.Mock).mockResolvedValue(mockResponse);

    const mock_post_id = "1";

    const response = await getPost(mock_post_id);

    expect(response).toEqual(mockResponse);
  });
});
