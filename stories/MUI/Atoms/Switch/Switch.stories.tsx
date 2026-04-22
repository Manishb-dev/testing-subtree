import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { Switch, Stack, Typography } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'MUI/Atoms/Switch/TonicSwitch',
  component: Switch,
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

/**
 * Fully interactive playground - all controls are live.
 * Click the switch to toggle it. Use the Controls panel to adjust props.
 * For a dedicated toggle demonstration see the Interactive story.
 */
const PlaygroundWrapper = (args: ComponentProps<typeof Switch>) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <Switch
      {...args}
      label={args.label ?? t('switch.label')}
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
    size: 'medium',
    color: 'primary',
  },
};

// --- States -------------------------------------------------------------------

const StatesRenderer = (args: ComponentProps<typeof Switch>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default',        extraProps: { checked: false } },
        { key: 'checked',        extraProps: { checked: true } },
        { key: 'disabled',       extraProps: { disabled: true, checked: false } },
        { key: 'disabledChecked', extraProps: { disabled: true, checked: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Switch {...args} {...extraProps} />
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
  args: { color: 'primary', size: 'small' },
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
          <Switch {...args} size={size} checked />
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

/** All semantic colors in their checked (on) state. */
export const Colors: Story = {
  render: (args) => (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success', 'default'] as const).map((color) => (
        <Stack key={color} alignItems="center" spacing={1}>
          <Switch {...args} color={color} checked />
          <Typography variant="caption" color="text.secondary">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { size: 'small' },
};

// --- WithLabel ----------------------------------------------------------------

/** Opt-in labelled variant - renders the switch wrapped in FormControlLabel. */
const WithLabelRenderer = (args: ComponentProps<typeof Switch>) => {
  const { t } = useTranslation();
  return <Switch {...args} label={t('switch.label')} />;
};

export const WithLabel: Story = {
  render: (args) => <WithLabelRenderer {...args} />,
  args: {
    labelPlacement: 'end',
    color: 'primary',
    size: 'small',
  },
};

// --- Interactive ---------------------------------------------------------------

const InteractiveWrapper = (args: ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(e, val) => {
        setChecked(val);
        args.onChange?.(e, val);
      }}
    />
  );
};

/** Click to toggle - shows real on/off behavior with controlled state. */
export const Interactive: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: { color: 'primary', size: 'small' },
};
