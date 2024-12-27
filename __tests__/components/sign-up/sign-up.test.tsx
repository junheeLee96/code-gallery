import SignUp from "@/app/sign-up/page";
import SignUpForm from "@/app/ui/sign-up/SignUpForm";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/app/ui/sign-up/SignUpForm", () => <div></div>);

describe("SignUp 컴포넌트", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("로딩 중일 때 로딩 div를 렌더링합니다", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: undefined,
      status: "loading",
    });

    render(<SignUp />);
    const loading = screen.getByTestId("loading");
    expect(loading).toBeInTheDocument();
  });

  //   test("세션이 없을 때 로그인 페이지로 리다이렉트합니다", () => {
  //     (useSession as jest.Mock).mockReturnValue({
  //       data: null,
  //       status: "authenticated",
  //     });

  //     render(<SignUp />);
  //     expect(mockPush).toHaveBeenCalledWith("/login");
  //   });

  //   test("유저가 새로운 유저가 아닐 때 홈 페이지로 리다이렉트합니다", () => {
  //     (useSession as jest.Mock).mockReturnValue({
  //       data: { user: { isNewUser: false } },
  //       status: "authenticated",
  //     });

  //     render(<SignUp />);
  //     expect(mockPush).toHaveBeenCalledWith("/");
  //   });

  //   test("세션이 있고 새로운 유저일 때 SignUpForm을 렌더링합니다", () => {
  //     (useSession as jest.Mock).mockReturnValue({
  //       data: { user: { isNewUser: true } },
  //       status: "authenticated",
  //     });

  //     render(<SignUp />);
  //     const signUpForm = screen.getByTestId("sign-up-form");
  //     expect(signUpForm).toBeInTheDocument();
  //   });
});
