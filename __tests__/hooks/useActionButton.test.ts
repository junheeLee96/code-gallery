import useActionButton from "@/app/hooks/useActionButton";
import { deletePost } from "@/app/lib/actions";
import { useToastMessageContext } from "@/app/providers/ToastMessageProvider";
import { renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { act } from "react";

// 모킹
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/app/lib/actions", () => ({
  deletePost: jest.fn(),
}));
jest.mock("@/app/providers/ToastMessageProvider", () => ({
  useToastMessageContext: jest.fn(),
}));

describe("useActionButton", () => {
  const mockPush = jest.fn();
  const mockShowToastMessage = jest.fn();
  const post_id = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useToastMessageContext as jest.Mock).mockReturnValue({
      showToastMessage: mockShowToastMessage,
    });
  });

  test("onEdit 호출 시 올바른 URL로 라우팅", async () => {
    const { result } = renderHook(() => useActionButton({ post_id }));

    await act(async () => {
      await result.current.onEdit();
    });

    expect(mockPush).toHaveBeenCalledWith(`/post/${post_id}/edit`);
  });

  test("onDelete 호출 시 deletePost 함수 호출", async () => {
    const { result } = renderHook(() => useActionButton({ post_id }));

    await act(async () => {
      await result.current.onDelete();
    });

    expect(deletePost).toHaveBeenCalledWith(post_id);
  });

  test("onDelete 에러 발생 시 토스트 메시지 표시", async () => {
    const errorMessage = "삭제 중 오류 발생";
    (deletePost as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useActionButton({ post_id }));

    await act(async () => {
      await result.current.onDelete();
    });

    expect(mockShowToastMessage).toHaveBeenCalledWith({
      message: errorMessage,
      type: "error",
    });
  });

  test("onEdit 호출 시 router.push 호출 확인", () => {
    const { result } = renderHook(() => useActionButton({ post_id }));

    act(() => {
      result.current.onEdit();
    });

    expect(mockPush).toHaveBeenCalledWith(`/post/${post_id}/edit`);
  });

  test("초기 isLoading 상태 확인", () => {
    const { result } = renderHook(() => useActionButton({ post_id }));

    expect(result.current.isLoading).toBe(false);
  });
});
