import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Popup } from './Popup';

const meta = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isOpen: false,
    setIsOpen: action('setIsOpen'),
    text: 'Popup enough long text',
    buttons: [
      { text: 'Submit', onClick: action('OK clicked') },
      { text: 'Cancel', onClick: action('Cancel clicked') },
    ],
  },
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
