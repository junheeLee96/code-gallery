import { client } from "@/app/api/client";
import { getComments, getPosts } from "@/app/lib/client-data";
import {
  CommentsTypes,
  InfiniteQueryResponse,
  PostTypes,
} from "@/app/lib/definitions";

// Mock the client function
jest.mock("@/app/api/client", () => ({
  client: jest.fn(),
}));

describe("API 함수 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPosts 함수", () => {
    it("올바른 매개변수로 client를 호출함", async () => {
      const mockParams = {
        cursor: "1",
        queryKey: "en",
        date: new Date("2023-01-01T00:00:00Z"),
        sorting: "recent",
        timePeriod: "day",
      };

      const mockResponse: InfiniteQueryResponse<PostTypes[]> = {
        data: [{ id: "1", title: "테스트 게시물" }],
        nextCursor: "2",
        totalPosts: 1,
        pageParams: 1,
      };

      (client as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getPosts(mockParams);

      expect(client).toHaveBeenCalledWith("/api/getPosts", {
        params: {
          cursor: "1",
          language: "en",
          date: "2023-01-01T00%3A00%3A00.000Z",
          sorting: "recent",
          timePeriod: "day",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("에러를 적절히 처리함", async () => {
      const mockParams = {
        cursor: "1",
        queryKey: "en",
        date: new Date("2023-01-01T00:00:00Z"),
        sorting: "recent",
        timePeriod: "day",
      };

      (client as jest.Mock).mockRejectedValue(new Error("API 오류"));

      await expect(getPosts(mockParams)).rejects.toThrow("API 오류");
    });
  });

  describe("getComments 함수", () => {
    it("올바른 매개변수로 client를 호출함", async () => {
      const mockParams = {
        cursor: "1",
        queryKey: "post123",
        date: new Date("2023-01-01T00:00:00Z"),
      };

      const mockResponse: InfiniteQueryResponse<CommentsTypes[]> = {
        data: [{ id: "1", content: "테스트 댓글" }],
        nextCursor: "2",
        totalPosts: 1,
        pageParams: 1,
      };

      (client as jest.Mock).mockResolvedValue(mockResponse);

      const result = await getComments(mockParams);

      expect(client).toHaveBeenCalledWith("/api/getComments", {
        params: {
          cursor: "1",
          post_id: "post123",
          date: "2023-01-01T00%3A00%3A00.000Z",
        },
      });

      expect(result).toEqual(mockResponse);
    });

    it("에러를 적절히 처리함", async () => {
      const mockParams = {
        cursor: "1",
        queryKey: "post123",
        date: new Date("2023-01-01T00:00:00Z"),
      };

      (client as jest.Mock).mockRejectedValue(new Error("API 오류"));

      await expect(getComments(mockParams)).rejects.toThrow("API 오류");
    });
  });
});
