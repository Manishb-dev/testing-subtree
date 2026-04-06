import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { KeyboardIcon } from '@bmi/mui-tonic-icons';
import type { IconSize, IconVariant, IconContainedShape } from '@bmi/mui-tonic-icons';

const meta: Meta<typeof KeyboardIcon> = {
  title: 'Icons/KeyboardIcon',
  component: KeyboardIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'] as IconSize[],
    },
    color: {
      control: 'select',
      options: [
        'inherit',
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success',
        'action',
        'disabled',
      ],
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'contained'] as IconVariant[],
    },
    containedShape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'] as IconContainedShape[],
      if: { arg: 'variant', eq: 'contained' },
    },
    bgColor: {
      control: 'text',
      if: { arg: 'variant', eq: 'contained' },
    },
  },
  args: {
    size: 'medium',
    color: 'inherit',
    variant: 'outlined',
    containedShape: 'circle',
    bgColor: 'primary.main',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak all props via the Controls panel. */
export const Playground: Story = {};

/** Outlined (stroke), filled (solid), and contained (background) icon variants. */
export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" spacing={4} alignItems="center">
      {(['outlined', 'filled', 'contained'] as const).map((v) => (
        <Stack key={v} alignItems="center" spacing={1}>
          <KeyboardIcon {...args} variant={v} size="medium" />
          <Typography variant="caption" color="text.secondary">
            {v}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Small, medium, and large sizes. */
export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={3} alignItems="flex-end">
      {(['small', 'medium', 'large'] as const).map((s) => (
        <Stack key={s} alignItems="center" spacing={1}>
          <KeyboardIcon {...args} size={s} />
          <Typography variant="caption" color="text.secondary">
            {s}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

/** All theme colors applied via the color prop. */
export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'action', 'disabled'] as const).map(
        (color) => (
          <Stack key={color} alignItems="center" spacing={1}>
            <KeyboardIcon {...args} size="medium" color={color} />
            <Typography variant="caption" color="text.secondary">
              {color}
            </Typography>
          </Stack>
        ),
      )}
    </Stack>
  ),
};

/** Contained variant with all three shapes. */
export const ContainedShapes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={4} alignItems="center">
      {(['circle', 'square', 'rounded'] as const).map((shape) => (
        <Stack key={shape} alignItems="center" spacing={1}>
          <KeyboardIcon {...args} variant="contained" containedShape={shape} size="medium" />
          <Typography variant="caption" color="text.secondary">
            {shape}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
};
