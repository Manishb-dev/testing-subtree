import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import { Loader, Stack, Typography, Box } from '@bmi/mui-tonic-components';
import type { LoaderColor, LoaderSize } from '@bmi/mui-tonic-components';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Shared/Loader/TonicLoader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'] satisfies LoaderSize[],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'] satisfies LoaderColor[],
    },
  },
  args: {},
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    size: 'large',
    color: 'primary',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SizesRenderer = (args: ComponentProps<typeof Loader>) => (
  <Stack direction="row" spacing={6} alignItems="center">
    {(['small', 'large'] as LoaderSize[]).map((size) => (
      <Stack key={size} alignItems="center" spacing={2}>
        <Loader {...args} size={size} />
        <Typography variant="caption">{size}</Typography>
      </Stack>
    ))}
  </Stack>
);

export const Sizes: Story = {
  render: SizesRenderer,
  args: { color: 'primary' },
};

// ─── Colors ───────────────────────────────────────────────────────────────────

const COLORS: LoaderColor[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

const ColorsRenderer = (args: ComponentProps<typeof Loader>) => (
  <Stack direction="row" spacing={4} alignItems="flex-end" flexWrap="wrap">
    {COLORS.map((color) => (
      <Stack key={color} alignItems="center" spacing={2}>
        <Loader {...args} color={color} />
        <Typography variant="caption">{color}</Typography>
      </Stack>
    ))}
  </Stack>
);

export const Colors: Story = {
  render: ColorsRenderer,
  args: { size: 'large' },
};

// ─── Inherit (contextual usage) ───────────────────────────────────────────────

export const InheritColor: Story = {
  render: (args) => (
    <Stack direction="row" spacing={4}>
      {(['error.main', 'success.main', 'warning.main'] as const).map((bgColor) => (
        <Box
          key={bgColor}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderRadius: 2,
            bgcolor: bgColor,
            color: 'common.white',
          }}
        >
          <Loader {...args} color="inherit" />
        </Box>
      ))}
    </Stack>
  ),
  args: { size: 'large' },
};
