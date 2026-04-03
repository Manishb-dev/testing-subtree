import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorIcon } from '@bmi/mui-tonic-icons';
import type { IconSize } from '@bmi/mui-tonic-icons';

const meta: Meta<typeof ErrorIcon> = {
  title: 'Icons/ErrorIcon',
  component: ErrorIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [48, 32, 24, 20, 16, 14] as IconSize[],
    },
  },
  args: {
    size: 24,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Default render at size 24 - inherits currentColor from the surrounding context. */
export const Default: Story = {};
