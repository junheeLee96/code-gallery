import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from "../../app/ui/common/Button";
import { userEvent, within } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
    },
    onClick: { action: "clicked" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "기본 버튼",
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "커스텀 클래스 버튼",
    className: "bg-blue-500 text-white",
  },
};

export const DarkMode: Story = {
  args: {
    children: "다크 모드 버튼",
    className: "dark:bg-gray-700 dark:text-white",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const ClickableButton: Story = {
  args: {
    children: "클릭 가능한 버튼",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
  },
};
