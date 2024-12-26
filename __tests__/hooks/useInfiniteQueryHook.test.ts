import { renderHook, act } from "@testing-library/react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import useInfiniteQueryHook from "../../app/hooks/useInfiniteQueryHook";

// Mock the @tanstack/react-query module
jest.mock("@tanstack/react-query", () => ({
  useSuspenseInfiniteQuery: jest.fn(),
}));

// Mock the alert function
global.alert = jest.fn();

describe("useInfiniteQueryHook", () => {
  const mockQueryFn = jest.fn();
  const mockQueryKey = ["testKey", "testId", new Date()];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("성공적인 데이터 페칭을 처리해야 한다", () => {
    const mockData = {
      pages: [{ data: [1, 2, 3], totalPage: 2 }],
      pageParams: [1],
    };

    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      hasNextPage: true,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      error: null,
      isError: false,
    });

    const { result } = renderHook(() =>
      useInfiniteQueryHook({
        queryKey: mockQueryKey,
        queryFn: mockQueryFn,
      })
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
    expect(typeof result.current.fetchNextPage).toBe("function");
    expect(result.current.isFetchingNextPage).toBe(false);
  });

  it("로딩 상태를 처리해야 한다", () => {
    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      error: null,
      isError: false,
    });

    const { result } = renderHook(() =>
      useInfiniteQueryHook({
        queryKey: mockQueryKey,
        queryFn: mockQueryFn,
      })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("페이지네이션을 처리해야 한다", async () => {
    const mockFetchNextPage = jest.fn();
    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [{ data: [1, 2, 3], totalPage: 2 }], pageParams: [1] },
      isLoading: false,
      hasNextPage: true,
      fetchNextPage: mockFetchNextPage,
      isFetchingNextPage: false,
      error: null,
      isError: false,
    });

    const { result } = renderHook(() =>
      useInfiniteQueryHook({
        queryKey: mockQueryKey,
        queryFn: mockQueryFn,
      })
    );

    await act(async () => {
      result.current.fetchNextPage();
    });

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it("에러를 처리해야 한다", () => {
    const mockError = new Error("Test error");
    (useSuspenseInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      error: mockError,
      isError: true,
    });

    renderHook(() =>
      useInfiniteQueryHook({
        queryKey: mockQueryKey,
        queryFn: mockQueryFn,
      })
    );

    expect(global.alert).toHaveBeenCalledWith(`Error: ${mockError.message}`);
  });

  it("useSuspenseInfiniteQuery에 올바른 매개변수를 전달해야 한다", () => {
    renderHook(() =>
      useInfiniteQueryHook({
        queryKey: mockQueryKey,
        queryFn: mockQueryFn,
      })
    );

    expect(useSuspenseInfiniteQuery).toHaveBeenCalledWith({
      queryKey: mockQueryKey,
      queryFn: expect.any(Function),
      getNextPageParam: expect.any(Function),
      initialPageParam: 1,
    });
  });

  it("다음 페이지가 있는지 올바르게 판단해야 한다", () => {
    (useSuspenseInfiniteQuery as jest.Mock).mockImplementation(
      ({ getNextPageParam }) => {
        const lastPage = { totalPage: 3 };
        const pages = [{ data: [1, 2, 3] }, { data: [4, 5, 6] }];
        const nextPageParam = getNextPageParam(lastPage, pages);

        return {
          data: { pages, pageParams: [1, 2] },
          isLoading: false,
          hasNextPage: nextPageParam !== undefined,
          fetchNextPage: jest.fn(),
          isFetchingNextPage: false,
          error: null,
          isError: false,
        };
      }
    );

    const { result } = renderHook(() =>
      useInfiniteQueryHook({
        queryKey: mockQueryKey,
        queryFn: mockQueryFn,
      })
    );

    expect(result.current.hasNextPage).toBe(true);
  });
});
