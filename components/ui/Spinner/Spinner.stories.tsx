import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './index';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Click me',
  },
  argTypes: {
    // variant: {
    //   options: ['primary', 'secondary'],
    //   control: { type: 'radio' },
    // },
    // size: {
    //   options: ['medium', 'small'],
    //   control: { type: 'radio' },
    // },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// export const Primary: Story = {
//   args: {
//     variant: 'primary',
//     size: 'small',
//   },
// };
//
// export const Secondary: Story = {
//   args: {
//     variant: 'secondary',
//     size: 'small',
//   },
// };
