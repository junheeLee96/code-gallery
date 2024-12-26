import { renderHook, act } from "@testing-library/react";
import { createNewUser } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSignUpForm from "@/app/hooks/useSignUpForm";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("@/app/lib/actions", () => ({
  createNewUser: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("useSignUpForm", () => {
  let consoleErrorSpy: jest.SpyInstance;
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });
  test("초기값을 테스트한다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    const { result } = renderHook(() => useSignUpForm());
    expect(result.current.nickname).toBe("");
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  test("닉네임을 변경하면 옳바른 값이 저장되어야한다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.onInputChange({
        target: { value: "nickname" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.nickname).toBe("nickname");
    expect(result.current.error).toBeNull();
  });

  test("닉네임 변경 시, 공백을 포함하면 error를 띄운다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.onInputChange({
        target: { value: "mock ing" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.error).toBe("공백을 포함하지 않아야합니다.");
  });
  test("닉네임 변경 시, 8글자 이상일 시, error를 띄운다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.onInputChange({
        target: { value: "0123456789" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.error).toBe("닉네임은 8자 이하여야합니다.");
  });

  test("닉네임 저장 시, 에러가 있다면 저장하지 않는다.", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (createNewUser as jest.Mock).mockResolvedValue({});
    const { result } = renderHook(() => useSignUpForm());

    act(() => {
      result.current.onInputChange({
        target: { value: "123456789" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.error).toBe("닉네임은 8자 이하여야합니다.");
    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });
    expect(createNewUser).not.toHaveBeenCalled();
  });

  test("닉네임 저장 시 닉네임이 1글자 이상인지 체크한다.", async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: {} } });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    const { result } = renderHook(() => useSignUpForm());

    await act(async () => {
      await result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent<HTMLFormElement>);
    });

    expect(result.current.nickname).toBe("");
    expect(result.current.error).toBe("1글자 이상이어야합니다.");
  });
});
