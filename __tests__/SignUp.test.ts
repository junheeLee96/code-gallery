import SignUp from "@/app/ui/auth/SignUp";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SignUp Component", () => {
  test("SignUp컴포넌트가 잘 렌더링 됐나", async () => {
    render(await SignUp());
    const signUpElement = screen.getByText("UP");
    expect(signUpElement).toBeInTheDocument();
  });

  test("css스타일링 테스트", async () => {
    render(await SignUp());
    const signUpElement = screen.getByText("UP");
    expect(signUpElement).toHaveClass(
      "inline-block",
      "border-r",
      "border-t",
      "border-b",
      "rounded-sign-up-shape",
      "px-5",
      "py-1"
    );
  });

  test("google로그인 oauth페이지로 잘 넘어가는가?", async () => {
    window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
        href: "",
      },
      writable: true,
    });
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "test-client-id";

    render(await SignUp());
    const signUpElement = screen.getByText("UP");

    fireEvent.click(signUpElement);

    const expectedUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=test-client-id&response_type=token&redirect_uri=http://localhost:3000/oauth/google&scope=email profile`;
    expect(window.location.href).toBe(expectedUrl);
  });
});
