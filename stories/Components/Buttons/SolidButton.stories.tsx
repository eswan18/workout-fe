import type { Meta, StoryObj } from '@storybook/react';
import SolidButton from '@/components/buttons/SolidButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/Buttons/SolidButton',
  component: SolidButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof SolidButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Enabled: Story = {
  args: {
    type: 'button',
    children: 'Click Me!',
  },
};

export const Disabled: Story = {
  args: {
    type: 'button',
    children: 'Click Me!',
    enabled: false,
  },
};