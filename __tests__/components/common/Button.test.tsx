import Button from "@/app/ui/common/Button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button 컴포넌트", () => {
  test("children이 올바르게 렌더링된다.", () => {
    render(<Button>클릭하세요</Button>);
    expect(screen.getByText("클릭하세요")).toBeInTheDocument();
  });

  test("클래스가 올바르게 적용된다.", () => {
    render(<Button className="extra-class">클래스 테스트</Button>);
    const button = screen.getByText("클래스 테스트");
    expect(button).toHaveClass("extra-class");
  });

  test("버튼 클릭 시 onClick 핸들러가 호출된다.", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭하세요</Button>);
    const button = screen.getByText("클릭하세요");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("버튼에 기본 클래스가 적용된다.", () => {
    render(<Button>기본 클래스</Button>);
    const button = screen.getByText("기본 클래스");
    expect(button).toHaveClass("w-full p-2 pointer rounded hover:bg-gray-200");
  });
});
