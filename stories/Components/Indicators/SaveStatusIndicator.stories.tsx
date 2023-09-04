import type { Meta, StoryObj } from "@storybook/react";
import SaveStatusIndicator from "@/components/indicators/SaveStatusIndicator";

const meta = {
  title: "Components/Indicators/SaveStatusIndicator",
  component: SaveStatusIndicator,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SaveStatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Saving: Story = {
  args: { saveStatus: "saving" },
};

export const Unsaved: Story = {
  args: { saveStatus: "unsaved" },
};

export const Saved: Story = {
  args: { saveStatus: "saved" },
};
