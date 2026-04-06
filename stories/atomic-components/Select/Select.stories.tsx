import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { type ComponentProps } from 'react';
import { Select, Stack, Typography } from '@bmi/mui-tonic-components';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sampleOptions = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atomic/Select/TonicSelect',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: { control: 'boolean' },
    displayEmpty: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'filled',
    size: 'medium',
    value: 'option-1',
    displayEmpty: true,
    children: sampleOptions.map(({ value, label }) => (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    )),
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const VariantsRenderer = (args: ComponentProps<typeof Select>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['filled', 'outlined'] as const).map((variant) => (
        <Stack key={variant} alignItems="center" spacing={1}>
          <Select {...args} variant={variant} value="option-1" displayEmpty>
            {sampleOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="text.secondary">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All visual variants side-by-side — filled (solid background) and outlined (transparent with border). */
export const Variants: Story = {
  render: (args) => <VariantsRenderer {...args} />,
  args: { size: 'medium' },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof Select>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default', extraProps: {} },
        { key: 'disabled', extraProps: { disabled: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Select {...args} {...extraProps} value="option-1" displayEmpty>
            {sampleOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Default (interactive) and Disabled states side-by-side. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { variant: 'filled', size: 'medium' },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SizesRenderer = (args: ComponentProps<typeof Select>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      {([
        { size: 'small', label: 'Small\n32px' },
        { size: 'medium', label: 'Medium\n40px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Select {...args} size={size} value="option-1" displayEmpty>
            {sampleOptions.map(({ value, label: optLabel }) => (
              <MenuItem key={value} value={value}>
                {optLabel}
              </MenuItem>
            ))}
          </Select>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: 'pre', textAlign: 'center' }}
          >
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All sizes with pixel spec labels from the Figma design system. */
export const Sizes: Story = {
  render: (args) => <SizesRenderer {...args} />,
  args: { variant: 'filled' },
};
