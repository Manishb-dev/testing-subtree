import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { Checkbox, Stack, Typography } from '@bmi/mui-tonic-components';
import { useTranslation } from 'react-i18next';

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'Components/Atoms/Checkbox/TonicCheckbox',
  component: Checkbox,
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
    indeterminate: { control: 'boolean' },
    label: { control: 'text' },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start', 'top', 'bottom'],
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

const PlaygroundRenderer = (args: ComponentProps<typeof Checkbox>) => {
  const { t } = useTranslation();
  return <Checkbox {...args} label={args.label ?? t('checkbox.label')} />;
};

export const Playground: Story = {
  render: (args) => <PlaygroundRenderer {...args} />,
  args: {
    size: 'medium',
    color: 'primary',
  },
};

// --- States -------------------------------------------------------------------

const StatesRenderer = (args: ComponentProps<typeof Checkbox>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default',         extraProps: {} },
        { key: 'checked',         extraProps: { checked: true } },
        { key: 'indeterminate',   extraProps: { indeterminate: true } },
        { key: 'disabled',        extraProps: { disabled: true } },
        { key: 'disabledChecked', extraProps: { disabled: true, checked: true } },
        { key: 'error',           extraProps: { color: 'error' as const } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Checkbox {...args} {...extraProps} />
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

// --- Sizes --------------------------------------------------------------------

/** Both sizes side-by-side with pixel spec labels from Figma. */
export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" spacing={3} alignItems="flex-end">
      {([
        { size: 'small',  label: 'Small\n20px'  },
        { size: 'medium', label: 'Medium\n24px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Checkbox {...args} size={size} checked />
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

// --- Colors -------------------------------------------------------------------

/** All semantic colors in their checked state. */
export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'] as const).map((color) => (
        <Stack key={color} alignItems="center" spacing={1}>
          <Checkbox {...args} color={color} checked />
          <Typography variant="caption" color="text.secondary">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { size: 'medium' },
};

// --- WithLabel ----------------------------------------------------------------

/** Opt-in labelled variant - renders the checkbox wrapped in FormControlLabel. */
const WithLabelRenderer = (args: ComponentProps<typeof Checkbox>) => {
  const { t } = useTranslation();
  return <Checkbox {...args} label={t('checkbox.label')} />;
};

export const WithLabel: Story = {
  render: (args) => <WithLabelRenderer {...args} />,
  args: {
    labelPlacement: 'end',
    color: 'primary',
    size: 'medium',
  },
};

// --- Interactive ---------------------------------------------------------------

const InteractiveWrapper = (args: ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e, val) => {
        setChecked(val);
        args.onChange?.(e, val);
      }}
    />
  );
};

/** Click to toggle - shows real checked/unchecked behavior with controlled state. */
export const Interactive: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: { color: 'primary', size: 'medium' },
};
