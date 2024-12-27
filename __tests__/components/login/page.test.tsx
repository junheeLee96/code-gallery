import LoginButton from "@/app/login/page";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSession, signIn, signOut } from "next-auth/react";

// next-auth 모킹
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// next/image 모킹
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("LoginButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("세션이 없을 때 로그인 버튼이 표시된다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<LoginButton />);

    expect(screen.getByAltText("구글로 로그인하기")).toBeInTheDocument();
  });

  test("세션이 있을 때 로그아웃 버튼이 표시된다.", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
    });

    render(<LoginButton />);

    expect(screen.getByText("Sign out")).toBeInTheDocument();
  });

  test("로그인 버튼 클릭 시 signIn 함수가 호출된다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });

    render(<LoginButton />);

    fireEvent.click(screen.getByAltText("구글로 로그인하기"));

    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/sign-up" });
  });

  test("로그아웃 버튼 클릭 시 signOut 함수가 호출됩니다", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
    });

    render(<LoginButton />);

    fireEvent.click(screen.getByText("Sign out"));

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: "/", redirect: true });
  });
});
