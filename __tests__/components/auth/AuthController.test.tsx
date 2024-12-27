import AuthController from "@/app/ui/auth/AuthController";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: any; href: any }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock("@/app/ui/common/Button", () => (props: any) => (
  <button {...props} />
));

describe("AuthController 테스트", () => {
  test("로그아웃 상태라면 로그인 버튼이 나타난다.", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<AuthController />);
    expect(screen.getByText("로그인하기")).toBeInTheDocument();
  });

  test("로그인 상태라면 로그아웃 버튼이 나타난다.", () => {
    const mockSession = { user: { nickname: "TestUser" } };
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
    render(<AuthController />);
    expect(screen.getByText("로그아웃")).toBeInTheDocument();
  });
});
