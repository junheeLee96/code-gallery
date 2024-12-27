import { render, screen, fireEvent } from "@testing-library/react";
import * as useSignUpFormModule from "@/app/hooks/useSignUpForm";
import SignUpForm from "@/app/ui/sign-up/SignUpForm";

jest.mock("@/app/hooks/useSignUpForm");
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));
jest.mock("@/app/ui/common/Button", () => (props: any) => (
  <button {...props} />
));

describe("SignUpForm 컴포넌트", () => {
  const mockHandleSubmit = jest.fn();
  const mockOnInputChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(useSignUpFormModule, "default").mockReturnValue({
      nickname: "initialNick",
      error: null,
      isLoading: false,
      onInputChange: mockOnInputChange,
      handleSubmit: mockHandleSubmit,
    });
  });

  test("텍스트필드와 버튼이 렌더링된다.", () => {
    render(<SignUpForm />);

    const input = screen.getByPlaceholderText("Enter your Nickname");
    const button = screen.getByText("가입하기");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("닉네임 입력 필드에 텍스트를 입력하면 useSignUpForm 훅의 상태가 업데이트된다.", () => {
    render(<SignUpForm />);

    const input = screen.getByPlaceholderText(
      "Enter your Nickname"
    ) as HTMLInputElement;

    // fireEvent로 입력 필드에 텍스트를 입력합니다
    fireEvent.change(input, { target: { value: "newNick" } });

    // onInputChange가 호출되고, 값이 설정되었는지 확인합니다
    expect(mockOnInputChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("로딩 중일 때 가입하기 버튼이 비활성화된다.", () => {
    jest.spyOn(useSignUpFormModule, "default").mockReturnValue({
      nickname: "",
      error: null,
      isLoading: true,
      onInputChange: mockOnInputChange,
      handleSubmit: mockHandleSubmit,
    });

    render(<SignUpForm />);

    const button = screen.getByText("가입하기");
    expect(button).toBeDisabled();
  });

  test("로딩 중이지 않을 때 가입하기 버튼이 활성화된다.", () => {
    jest.spyOn(useSignUpFormModule, "default").mockReturnValue({
      nickname: "",
      error: null,
      isLoading: false,
      onInputChange: mockOnInputChange,
      handleSubmit: mockHandleSubmit,
    });

    render(<SignUpForm />);

    const button = screen.getByText("가입하기");
    expect(button).not.toBeDisabled();
  });
});
