import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "@/app/(unprotected)/login/LoginForm";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Forms/LoginForm",
  component: LoginForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Standard: Story = {
  args: {},
  parameters: {
    // This is necessary for components that use `useRouter`.
    nextjs: {
      appDirectory: true,
    },
  },
};
