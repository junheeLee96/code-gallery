import { renderHook, act } from "@testing-library/react";
import useCommentForm from "@/app/hooks/useCommentForm";
import { createComment } from "@/app/lib/actions";

jest.mock("@/app/lib/actions", () => ({
  createComment: jest.fn(),
}));

describe("useCommentForm", () => {
  const mockProps = {
    uuid: "test-uuid",
    nickname: "Test User",
    post_id: "test-post-id",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("초기값 세팅을 확인한다.", () => {
    const { result } = renderHook(() => useCommentForm(mockProps));

    expect(result.current.comment).toBe("");
    expect(result.current.comments).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should update comment state on change", () => {
    const { result } = renderHook(() => useCommentForm(mockProps));

    act(() => {
      result.current.onCommentChange({
        target: { value: "New comment" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.comment).toBe("New comment");
  });

  test("댓글달기가 성공적으로 실행된다.", async () => {
    const { result } = renderHook(() => useCommentForm(mockProps));

    (createComment as jest.Mock).mockResolvedValueOnce({});

    act(() => {
      result.current.onCommentChange({
        target: { value: "Test comment" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(createComment).toHaveBeenCalledWith({
      comment: "Test comment",
      post_id: mockProps.post_id,
      uuid: mockProps.uuid,
      nickname: mockProps.nickname,
    });

    expect(result.current.comment).toBe("");
    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0]).toMatchObject({
      post_id: mockProps.post_id,
      comment: "Test comment",
      nickname: mockProps.nickname,
      isAuthor: true,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("댓글달기에 실패했을 때 에러를 표시한다.", async () => {
    const { result } = renderHook(() => useCommentForm(mockProps));

    (createComment as jest.Mock).mockRejectedValueOnce(new Error("Test error"));

    act(() => {
      result.current.onCommentChange({
        target: { value: "Test comment" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(createComment).toHaveBeenCalled();
    expect(result.current.comment).toBe("Test comment");
    expect(result.current.comments).toHaveLength(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(
      "오류가 발생했습니다. 새로고침 후 다시 시도해주세요."
    );
  });
});
