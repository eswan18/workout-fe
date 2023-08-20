import type { Meta, StoryObj } from '@storybook/react';
import NavBarRight from '@/components/navBar/navBarRight';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/NavBar/NavBarRight',
  component: NavBarRight,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof NavBarRight>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const LoggedIn: Story = {
  args: {
    userEmail: 'ethan@ethanswan.com',
  },
};

export const LoggedOut: Story = {
  args: {
    userEmail: undefined,
  },
};