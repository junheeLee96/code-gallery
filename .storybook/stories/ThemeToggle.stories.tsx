import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import ThemeToggle from "@/app/ui/common/ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

// 기본 템플릿 생성
const Template: Story = {
  render: (args) => (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  ),
};

// 기본 스토리 생성
export const Default: Story = {
  ...Template,
};

// 라이트 테마 스토리 생성
export const LightTheme: Story = {
  ...Template,
  parameters: {
    backgrounds: { default: "light" },
  },
};

// 다크 테마 스토리 생성
export const DarkTheme: Story = {
  ...Template,
  parameters: {
    backgrounds: { default: "dark" },
  },
};

// 라이트와 다크 테마 간 전환 가능한 스토리 생성
export const Toggleable: Story = {
  ...Template,
  args: {
    initialTheme: "light",
  },
  argTypes: {
    initialTheme: {
      control: {
        type: "select",
        options: ["light", "dark"],
      },
    },
  },
};
