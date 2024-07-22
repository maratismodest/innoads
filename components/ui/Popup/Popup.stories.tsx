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
    isOpen: true,
    setIsOpen: action('setIsOpen'),
    text: 'Popup enough long text',
    buttons: [
      { text: 'OK', onClick: action('OK clicked') },
      { text: 'Cancel', onClick: action('Cancel clicked') },
    ],
  },
  argTypes: {
    isOpen: {
      options: [true, false],
      control: { type: 'radio' },
    },
    // size: {
    //   options: ['medium', 'small'],
    //   control: { type: 'radio' },
    // },
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};
//
// export const Secondary: Story = {
//   args: {
//     variant: 'secondary',
//     size: 'small',
//   },
// };
