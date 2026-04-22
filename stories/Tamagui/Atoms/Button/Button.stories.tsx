import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '@bmi/tonic-components-tamagui';

const meta: Meta<typeof Button> = {
  title: 'Tamagui/Atoms/Button/TonicButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
    },
    disabled: { control: 'boolean' },
    loadingState: {
      control: 'select',
      options: [undefined, 'loading', 'success'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    children: 'Button',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} variant="contained">Contained</Button>
      <Button {...args} variant="outlined">Outlined</Button>
      <Button {...args} variant="text">Text</Button>
    </div>
  ),
  args: { color: 'primary', size: 'medium' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
      <Button {...args} size="extraLarge">Extra Large</Button>
    </div>
  ),
  args: { variant: 'contained', color: 'primary' },
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button {...args} color="primary">Primary</Button>
      <Button {...args} color="secondary">Secondary</Button>
      <Button {...args} color="error">Error</Button>
      <Button {...args} color="warning">Warning</Button>
      <Button {...args} color="info">Info</Button>
      <Button {...args} color="success">Success</Button>
    </div>
  ),
  args: { variant: 'contained', size: 'medium' },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args}>Default</Button>
      <Button {...args} disabled>Disabled</Button>
      <Button {...args} loadingState="loading">Loading</Button>
    </div>
  ),
  args: { variant: 'contained', size: 'medium', color: 'primary' },
};
