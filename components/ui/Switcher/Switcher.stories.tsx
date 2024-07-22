import type { Meta, StoryObj } from '@storybook/react';

import { Switcher } from './Switcher';

const meta = {
  title: 'Components/Switcher',
  component: Switcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
