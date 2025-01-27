import { renderHook, act } from "@testing-library/react";
import usePostForm from "@/app/hooks/PostForm/usePosValues";
import { createPost } from "@/app/lib/actions";
import { redirect } from "next/navigation";

jest.mock("@/app/lib/actions", () => ({
  createPost: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("usePostForm", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test("초기값이 옳바르게 선언되어있다.", () => {
    const { result } = renderHook(() => usePostForm());
    expect(result.current.content).toBe("");
    expect(result.current.language).toEqual("javascript");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("글의 내용이 바뀌면 값을 잘 저장해야한다.", () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.onContentChange({
        target: { value: "New Post" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.content).toBe("New Post");
  });
  test("언어의 값이 바뀌면 값을 잘 저장해야한다.", () => {
    const { result } = renderHook(() => usePostForm());
    act(() => {
      result.current.onLanguageChange({
        target: { value: "python" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.language).toBe("python");
  });

  test("글을 작성하고 제출이 되어야한다.", async () => {
    const { result } = renderHook(() => usePostForm());
    (createPost as jest.Mock).mockResolvedValue(true);

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(redirect).toHaveBeenCalledWith("/");
  });
  test("제출 중 에러가 발생하면 에러 상태를 설정해야 한다", async () => {
    const { result } = renderHook(() => usePostForm());
    const testError = new Error("Test error");
    (createPost as jest.Mock).mockRejectedValueOnce(testError);

    act(() => {
      result.current.onContentChange({
        target: { value: "Test content" },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    });

    await act(async () => {
      await result.current.onSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(createPost).toHaveBeenCalledWith({
      content: "Test content",
      language: "javascript",
    });
    expect(result.current.error).toBe(testError);
    expect(result.current.isLoading).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(testError);
    expect(redirect).not.toHaveBeenCalled();
  });
});
