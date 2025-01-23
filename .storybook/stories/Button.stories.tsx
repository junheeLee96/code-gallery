import React from "react";
import Button from "../../app/ui/common/Button";

export default {
  title: "Example/Button", // Storybook에서 표시될 그룹/컴포넌트 경로
  component: Button, // 스토리북에서 사용할 컴포넌트
  argTypes: {
    children: {
      control: "text", // 스토리북에서 children을 텍스트로 입력 가능
    },
    onClick: { action: "clicked" }, // onClick 이벤트 로그를 콘솔에 표시
    className: { control: "text" }, // className을 변경 가능
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "기본 버튼",
  className: "",
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  children: "커스텀 클래스 버튼",
  className: "bg-blue-500 text-white",
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  children: "다크 모드 버튼",
  className: "dark:bg-gray-700 dark:text-white",
};

export const ClickableButton = Template.bind({});
ClickableButton.args = {
  children: "클릭 가능한 버튼",
  onClick: () => alert("버튼이 클릭되었습니다!"),
};
