import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { type ComponentProps } from 'react';
import { Chip, Stack, Typography } from '@bmi/mui-tonic-components';
import { useTranslation } from 'react-i18next';

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'Components/Atoms/Chip/TonicChip',
  component: Chip,
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
    color: {
      control: 'select',
      options: ['default', 'error', 'warning', 'info', 'success'],
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

export const Playground: Story = {
  args: {
    label: 'Chip',
    variant: 'filled',
    size: 'medium',
    color: 'default',
  },
};

// --- Variants -----------------------------------------------------------------

const VariantsRenderer = (args: ComponentProps<typeof Chip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['filled', 'outlined'] as const).map((variant) => (
        <Stack key={variant} alignItems="center" spacing={1}>
          <Chip {...args} variant={variant} label={t('chip.label')} />
          <Typography variant="caption" color="text.secondary">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All visual variants side-by-side - filled (solid background) and outlined (transparent with border). */
export const Variants: Story = {
  render: (args) => <VariantsRenderer {...args} />,
  args: { color: 'default', size: 'medium' },
};

// --- States -------------------------------------------------------------------

const StatesRenderer = (args: ComponentProps<typeof Chip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default',  extraProps: {} },
        { key: 'disabled', extraProps: { disabled: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Chip {...args} {...extraProps} label={t('chip.label')} />
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
  args: { variant: 'filled', color: 'default', size: 'medium' },
};

// --- Sizes --------------------------------------------------------------------

const SizesRenderer = (args: ComponentProps<typeof Chip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      {([
        { size: 'small',  label: 'Small\n24px'  },
        { size: 'medium', label: 'Medium\n32px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Chip {...args} size={size} label={t('chip.label')} />
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
  args: { variant: 'filled', color: 'default' },
};

// --- Colors -------------------------------------------------------------------

const ColorsRenderer = (args: ComponentProps<typeof Chip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      {(['default', 'error', 'warning', 'info', 'success'] as const).map((color) => (
        <Stack key={color} alignItems="center" spacing={1}>
          <Chip {...args} color={color} label={t('chip.label')} />
          <Typography variant="caption" color="text.secondary">
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All semantic color options side-by-side - filled and outlined. */
export const Colors: Story = {
  render: (args) => <ColorsRenderer {...args} />,
  args: { size: 'medium', variant: 'filled' },
};

// --- Deletable ----------------------------------------------------------------

const DeletableRenderer = (args: ComponentProps<typeof Chip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['filled', 'outlined'] as const).map((variant) => (
        <Chip key={variant} {...args} variant={variant} label={t('chip.label')} />
      ))}
    </Stack>
  );
};

/** Chip with a delete icon rendered by providing `onDelete`. Both variants shown side-by-side. */
export const Deletable: Story = {
  render: (args) => <DeletableRenderer {...args} />,
  args: {
    color: 'default',
    size: 'medium',
    onDelete: fn(),
  },
};
