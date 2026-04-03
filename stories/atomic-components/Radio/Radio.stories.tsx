import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { Radio, Stack, Typography } from '@bmi/mui-tonic-components';
import { useTranslation } from 'react-i18next';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atomic/Radio/TonicRadio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

/**
 * Fully interactive playground - all controls are live.
 * Selecting the radio updates the checked state in real time.
 * Figma: Tonic/Radio → Default state
 */
const PlaygroundWrapper = (args: ComponentProps<typeof Radio>) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <Radio
      {...args}
      label={args.label ?? t('radio.label')}
      checked={checked}
      onChange={(e, val) => {
        setChecked(val);
        args.onChange?.(e, val);
      }}
    />
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundWrapper {...args} />,
  args: {
    color: 'primary',
    size: 'medium',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

/**
 * All meaningful states side-by-side.
 * Error state uses `color="error"` per Figma - the outer ring turns error.main
 * even when unchecked, which is visually distinct from all other color values.
 * Figma: Tonic/Radio → state axis
 */
const StatesRenderer = (args: ComponentProps<typeof Radio>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default',         extraProps: {} },
        { key: 'selected',        extraProps: { checked: true } },
        { key: 'disabled',        extraProps: { disabled: true } },
        { key: 'disabledSelected', extraProps: { disabled: true, checked: true } },
        { key: 'error',           extraProps: { color: 'error' as const } },
        { key: 'errorSelected',   extraProps: { color: 'error' as const, checked: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Radio {...args} {...extraProps} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: 'pre', textAlign: 'center' }}
          >
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { color: 'primary', size: 'medium' },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

/**
 * Both sizes in their selected state.
 * Figma: Tonic/Radio → size axis (small = 20px, medium = 24px)
 */
export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={3} alignItems="flex-end">
      {([
        { size: 'small',  label: 'Small\n20px'  },
        { size: 'medium', label: 'Medium\n24px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Radio {...args} size={size} checked />
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
  ),
  args: { color: 'primary' },
};

// ─── Colors ───────────────────────────────────────────────────────────────────

/** All semantic palette colors in their selected state. */
export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'] as const).map((color) => (
        <Stack key={color} alignItems="center" spacing={1}>
          <Radio {...args} color={color} checked />
          <Typography variant="caption" color="text.secondary">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { size: 'medium' },
};

// ─── WithLabel ────────────────────────────────────────────────────────────────

/** Radio button wrapped in FormControlLabel - opt-in labelled variant via the `label` prop. */
const WithLabelRenderer = (args: ComponentProps<typeof Radio>) => {
  const { t } = useTranslation();
  return <Radio {...args} label={t('radio.label')} />;
};

export const WithLabel: Story = {
  render: (args) => <WithLabelRenderer {...args} />,
  args: {
    labelPlacement: 'end',
    color: 'primary',
    size: 'medium',
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

const InteractiveWrapper = (args: ComponentProps<typeof Radio>) => {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      {...args}
      checked={checked}
      onChange={(e, val) => {
        setChecked(val);
        args.onChange?.(e, val);
      }}
    />
  );
};

/** Click to select - demonstrates controlled checked/unchecked toggle with real state. */
export const Interactive: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    color: 'primary',
    size: 'medium',
  },
};
