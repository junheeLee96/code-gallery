import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import Input from "../../app/ui/common/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    onInputChange: { action: "changed" },
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
    id: "default-input",
    label: "Default Input",
  },
};

export const WithValue: Story = {
  args: {
    title: "Hello, Storybook!",
    placeholder: "Enter text here",
    id: "value-input",
    label: "Input with Value",
  },
};

export const Required: Story = {
  args: {
    title: "",
    placeholder: "Required field",
    id: "required-input",
    label: "Required Input",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    title: "Disabled input",
    placeholder: "You can't edit this",
    id: "disabled-input",
    label: "Disabled Input",
    disabled: true,
  },
};

export const DarkMode: Story = {
  args: {
    title: "",
    placeholder: "Dark mode input",
    id: "dark-input",
    label: "Dark Mode Input",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Interactive: Story = {
  args: {
    title: "",
    placeholder: "Type something...",
    id: "interactive-input",
    label: "Interactive Input",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Interactive Input");
    await userEvent.type(input, "Hello, Storybook!", { delay: 100 });
    await expect(input).toHaveValue("Hello, Storybook!");
  },
};
