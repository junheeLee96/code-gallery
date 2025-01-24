import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import Textarea from "@/app/ui/common/TextArea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    onMarkdownChange: { action: "changed" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-white dark:bg-gray-800" style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    markdown: "",
  },
};

export const WithInitialValue: Story = {
  args: {
    markdown: "이것은 초기 텍스트입니다.",
  },
};

export const WithMarkdown: Story = {
  args: {
    markdown:
      "# 제목\n\n이것은 *마크다운* **텍스트**입니다.\n\n```\nconsole.log('Hello, World!');\n```",
  },
};

export const DarkMode: Story = {
  args: {
    markdown: "",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Resizable: Story = {
  args: {
    markdown: "",
    className: "resize-y",
  },
};

export const Interactive: Story = {
  args: {
    markdown: "",
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.markdown);
    return (
      <Textarea
        {...args}
        markdown={value}
        onMarkdownChange={(e) => {
          setValue(e.target.value);
          args.onMarkdownChange?.(e);
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");

    await userEvent.type(
      textarea,
      '# 안녕하세요\n\n이것은 테스트입니다.\n\n```\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```'
    );

    await expect(textarea).toHaveValue(
      '# 안녕하세요\n\n이것은 테스트입니다.\n\n```\nconst greeting = "Hello, World!";\nconsole.log(greeting);\n```'
    );
  },
};
