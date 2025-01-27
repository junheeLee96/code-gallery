import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import Input from "../../app/ui/common/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    onChange: { action: "changed" },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    title: "",
    placeholder: "Enter text here",
  },
};

export const WithValue: Story = {
  args: {
    title: "Hello, Storybook!",
    placeholder: "Enter text here",
  },
};

export const Required: Story = {
  args: {
    title: "",
    placeholder: "Required field",
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled input",
    placeholder: "You can't edit this",
  },
};

export const DarkMode: Story = {
  args: {
    title: "",
    placeholder: "Dark mode input",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Interactive: Story = {
  args: {
    title: "",
    placeholder: "Type something...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Interactive Input");
    await userEvent.type(input, "Hello, Storybook!", { delay: 100 });
    await expect(input).toHaveValue("Hello, Storybook!");
  },
};
