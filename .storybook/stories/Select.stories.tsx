import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import Select from "@/app/ui/common/Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    onChange: { action: "changed" },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-white dark:bg-gray-800">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const languages = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "zh", label: "中文" },
];

export const Default: Story = {
  args: {
    value: "ko",
    label: "언어 선택",
    children: languages.map((lang) => (
      <option key={lang.value} value={lang.value}>
        {lang.label}
      </option>
    )),
  },
};

export const WithEnglishDefault: Story = {
  args: {
    ...Default.args,
    value: "en",
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <Select
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          args.onChange?.(e);
        }}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText("언어 선택");

    await userEvent.selectOptions(select, "en");
    await expect(select).toHaveValue("en");

    await userEvent.selectOptions(select, "ja");
    await expect(select).toHaveValue("ja");
  },
};

export const DarkMode: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
