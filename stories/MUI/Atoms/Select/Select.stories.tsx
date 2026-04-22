import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { Select, MenuItem, Checkbox, Stack, Typography } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const sampleOptions = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'MUI/Atoms/Select/TonicSelect',
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
    multiple: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

const PlaygroundWrapper = (args: ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<string | string[]>(
    args.multiple ? ['option-1'] : 'option-1',
  );

  const normalizedValue = args.multiple
    ? Array.isArray(value) ? value : [value]
    : Array.isArray(value) ? value[0] ?? '' : value;

  return (
    <Select
      {...args}
      value={normalizedValue}
      onChange={(e) => {
        setValue(e.target.value as string | string[]);
        args.onChange?.(e, undefined);
      }}
    >
      {sampleOptions.map(({ value: v, label }) => (
        <MenuItem key={v} value={v}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundWrapper {...args} />,
  args: {
    variant: 'filled',
    size: 'medium',
    displayEmpty: true,
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

// ─── Multiple ─────────────────────────────────────────────────────────────────

const MultipleRenderer = (args: ComponentProps<typeof Select>) => {
  const { t } = useTranslation();
  const selectedValues = ['option-1', 'option-3'];
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default', extraProps: {} },
        { key: 'disabled', extraProps: { disabled: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Select
            {...args}
            {...extraProps}
            multiple
            value={selectedValues}
            displayEmpty
          >
            {sampleOptions.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                <Checkbox
                  size="small"
                  checked={selectedValues.includes(value)}
                  sx={{ p: 0 }}
                />
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

/** Multi-select mode — multiple values rendered as a comma-separated list. */
export const Multiple: Story = {
  render: (args) => <MultipleRenderer {...args} />,
  args: { variant: 'filled', size: 'medium' },
};
