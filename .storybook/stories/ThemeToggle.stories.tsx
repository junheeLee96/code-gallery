import React from "react";
import type { Story, Meta } from "@storybook/react";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import ThemeToggle from "@/app/ui/common/ThemeToggle";

export default {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

// Create a template for the component
const Template: Story = (args) => {
  return (
    <ThemeProvider>
      <ThemeToggle {...args} />
    </ThemeProvider>
  );
};

// Create the default story
export const Default = Template.bind({});

// Create a story for the light theme
export const LightTheme = Template.bind({});
LightTheme.parameters = {
  backgrounds: { default: "light" },
};

// Create a story for the dark theme
export const DarkTheme = Template.bind({});
DarkTheme.parameters = {
  backgrounds: { default: "dark" },
};

// Add controls to toggle between light and dark themes
export const Toggleable = Template.bind({});
Toggleable.args = {
  initialTheme: "light",
};
Toggleable.argTypes = {
  initialTheme: {
    control: {
      type: "select",
      options: ["light", "dark"],
    },
  },
};
