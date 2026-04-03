import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography, Stack } from '@bmi/mui-tonic-components';
import type { TonicTypographyProps, TypographyVariant } from '@bmi/mui-tonic-components';

// --- Meta ---------------------------------------------------------------------

const meta: Meta<typeof Typography> = {
  title: 'Atomic/Typography/TonicTypography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'body1', 'body2', 'body3', 'body4',
        'subtitle1', 'subtitle2',
        'caption', 'overline', 'button',
        'inherit',
      ] satisfies TypographyVariant[],
    },
    color: {
      control: 'select',
      options: [
        'text.primary',
        'text.secondary',
        'text.tertiary',
        'text.disabled',
        'primary.main',
        'secondary.main',
        'error.main',
        'warning.main',
        'success.main',
        'info.main',
      ],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify', 'inherit'],
    },
    noWrap: { control: 'boolean' },
    gutterBottom: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

export const Playground: Story = {
  args: {
    variant: 'body1',
    color: 'text.primary',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

// --- Type Scale ---------------------------------------------------------------

/**
 * All variants in the Tonic type scale, top to bottom.
 * Includes Tonic extensions: `display`, `body3`, `body4`.
 */
export const TypeScale: Story = {
  render: () => (
    <Stack
      spacing={2}
      sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1, maxWidth: 640 }}
    >
      {(
        [
          { variant: 'display', label: 'display' },
          { variant: 'h1', label: 'h1' },
          { variant: 'h2', label: 'h2' },
          { variant: 'h3', label: 'h3' },
          { variant: 'h4', label: 'h4' },
          { variant: 'h5', label: 'h5' },
          { variant: 'h6', label: 'h6' },
          { variant: 'body1', label: 'body1' },
          { variant: 'body2', label: 'body2' },
          { variant: 'body3', label: 'body3' },
          { variant: 'body4', label: 'body4' },
          { variant: 'subtitle1', label: 'subtitle1' },
          { variant: 'subtitle2', label: 'subtitle2' },
          { variant: 'caption', label: 'caption' },
          { variant: 'overline', label: 'overline' },
          { variant: 'button', label: 'button' },
        ] satisfies { variant: TypographyVariant; label: string }[]
      ).map(({ variant, label }) => (
        <Stack key={variant} direction="row" alignItems="baseline" spacing={2}>
          <Typography
            variant="caption"
            color="text.tertiary"
            sx={{ minWidth: 80, fontFamily: 'monospace' }}
          >
            {label}
          </Typography>
          <Typography variant={variant} color="text.primary">
            Tonic type scale
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

// --- Colors -------------------------------------------------------------------

/**
 * All semantic text color tokens from the theme.
 */
export const Colors: Story = {
  render: () => (
    <Stack
      spacing={1.5}
      sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1 }}
    >
      {(
        [
          { color: 'text.primary', label: 'text.primary' },
          { color: 'text.secondary', label: 'text.secondary' },
          { color: 'text.tertiary', label: 'text.tertiary' },
          { color: 'text.disabled', label: 'text.disabled' },
          { color: 'primary.main', label: 'primary.main' },
          { color: 'secondary.main', label: 'secondary.main' },
          { color: 'error.main', label: 'error.main' },
          { color: 'warning.main', label: 'warning.main' },
          { color: 'success.main', label: 'success.main' },
          { color: 'info.main', label: 'info.main' },
        ] as const
      ).map(({ color, label }) => (
        <Typography key={label} variant="body3" color={color}>
          {label} - The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </Stack>
  ),
};
