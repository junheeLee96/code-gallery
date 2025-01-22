import useHandleLike from "@/app/hooks/useHandleLike";
import { handleLike } from "@/app/lib/actions";
import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";

// 모킹
jest.mock("@/app/lib/actions", () => ({
  handleLike: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("useHandleLike", () => {
  const mockPush = jest.fn();
  const mockOnSuccessHandleLike = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    global.confirm = jest.fn(() => true);
    global.alert = jest.fn();
  });

  it("handleClick 호출 시 handleLike 액션 호출", async () => {
    (handleLike as jest.Mock).mockResolvedValue({
      status: true,
      message: "Success",
    });

    const { result } = renderHook(() =>
      useHandleLike({
        isLike: false,
        id: "1",
        onSuccessHandleLike: mockOnSuccessHandleLike,
      })
    );

    await act(async () => {
      await result.current.handleClick();
    });

    expect(handleLike).toHaveBeenCalledWith("1", true);
    expect(mockOnSuccessHandleLike).toHaveBeenCalled();
  });

  it("로그인 필요 시 confirm 창 표시 및 로그인 페이지 이동", async () => {
    (handleLike as jest.Mock).mockResolvedValue({
      status: false,
      message: "로그인이 필요합니다. 로그인하시겠습니까?",
    });

    const { result } = renderHook(() =>
      useHandleLike({
        isLike: false,
        id: "1",
        onSuccessHandleLike: mockOnSuccessHandleLike,
      })
    );

    await act(async () => {
      await result.current.handleClick();
    });

    expect(global.confirm).toHaveBeenCalledWith(
      "로그인이 필요합니다. 로그인하시겠습니까?"
    );
    expect(mockPush).toHaveBeenCalledWith("/login");
    expect(mockOnSuccessHandleLike).not.toHaveBeenCalled();
  });

  it("에러 메시지 표시", async () => {
    const errorMessage = "오류가 발생했습니다.";
    (handleLike as jest.Mock).mockResolvedValue({
      status: false,
      message: errorMessage,
    });

    const { result } = renderHook(() =>
      useHandleLike({
        isLike: true,
        id: "1",
        onSuccessHandleLike: mockOnSuccessHandleLike,
      })
    );

    await act(async () => {
      await result.current.handleClick();
    });

    expect(global.alert).toHaveBeenCalledWith(errorMessage);
    expect(mockOnSuccessHandleLike).not.toHaveBeenCalled();
  });

  it("성공 시 onSuccessHandleLike 호출", async () => {
    (handleLike as jest.Mock).mockResolvedValue({
      status: true,
      message: "Success",
    });

    const { result } = renderHook(() =>
      useHandleLike({
        isLike: true,
        id: "1",
        onSuccessHandleLike: mockOnSuccessHandleLike,
      })
    );

    await act(async () => {
      await result.current.handleClick();
    });

    expect(mockOnSuccessHandleLike).toHaveBeenCalled();
  });
});
