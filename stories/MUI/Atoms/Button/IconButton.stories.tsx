import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { IconButton, Stack, Typography } from '@bmi/tonic-components-mui';

// --- Inline SVG icon (24px, matches Figma IconButton_v3 icon size) ------------

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'MUI/Atoms/Button/TonicIconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default', 'inherit'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
    },
    variant: {
      control: 'select',
      options: ['default', 'contained'],
    },
    disabled: { control: 'boolean' },
  },
  args: { onClick: fn() },
  render: (args) => (
    <IconButton {...args}>
      <StarIcon />
    </IconButton>
  ),
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Variants -----------------------------------------------------------------

/** Transparent background, icon in the theme color. */
export const Default: Story = {
  args: { color: 'primary', size: 'medium', variant: 'default' },
};

/**
 * Filled circular background using Color.main, white icon.
 * From Figma: IconButton_v3 ? variant=contained.
 */
export const Contained: Story = {
  args: { color: 'primary', size: 'medium', variant: 'contained' },
};

/** Both variants side by side. */
export const BothVariants: Story = {
  name: 'Both Variants',
  render: (args) => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Stack alignItems="center" spacing={1}>
        <IconButton {...args} variant="default"><StarIcon /></IconButton>
        <Typography variant="caption" color="text.secondary">Default</Typography>
      </Stack>
      <Stack alignItems="center" spacing={1}>
        <IconButton {...args} variant="contained"><StarIcon /></IconButton>
        <Typography variant="caption" color="text.secondary">Contained</Typography>
      </Stack>
    </Stack>
  ),
  args: { color: 'primary', size: 'large', onClick: fn() },
};

// --- States -------------------------------------------------------------------

export const Disabled: Story = {
  args: { color: 'primary', size: 'medium', disabled: true },
};

export const DisabledContained: Story = {
  name: 'Disabled (Contained)',
  args: { color: 'primary', size: 'medium', variant: 'contained', disabled: true },
};

// --- Sizes --------------------------------------------------------------------
// From Figma: small=32px, medium=36px, large=40px, extraLarge=48px (all with 24px icon)

export const AllSizes: Story = {
  name: 'All Sizes',
  render: (args) => (
    <Stack direction="row" spacing={3} alignItems="flex-end">
      {([
        { size: 'small',      label: 'Small\n32px'       },
        { size: 'medium',     label: 'Medium\n36px'      },
        { size: 'large',      label: 'Large\n40px'       },
        { size: 'extraLarge', label: 'Extra Large\n48px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <IconButton {...args} size={size}><StarIcon /></IconButton>
          <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre', textAlign: 'center' }}>
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { color: 'primary', onClick: fn() },
};

// --- Colors -------------------------------------------------------------------

/** Default (transparent) variant across all theme colors. */
export const AllColors: Story = {
  name: 'All Colors - Default',
  render: (args) => (
    <Stack direction="row" spacing={1} alignItems="center">
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((color) => (
        <IconButton key={color} {...args} color={color}>
          <StarIcon />
        </IconButton>
      ))}
    </Stack>
  ),
  args: { size: 'medium', variant: 'default', onClick: fn() },
};

/** Contained variant across all theme colors - filled background, white icon. */
export const AllColorsContained: Story = {
  name: 'All Colors - Contained',
  render: (args) => (
    <Stack direction="row" spacing={1} alignItems="center">
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((color) => (
        <IconButton key={color} {...args} color={color} variant="contained">
          <StarIcon />
        </IconButton>
      ))}
    </Stack>
  ),
  args: { size: 'medium', onClick: fn() },
};
