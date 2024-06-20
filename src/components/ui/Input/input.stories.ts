import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/ui/Input";

const meta = {
  title: "Input/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "label:",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "input",
  },
};

export const DefaultWithError: Story = {
  args: {
    errorMessage: "error message",
    name: "input with error",
  },
};
