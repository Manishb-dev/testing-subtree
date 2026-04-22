import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { Button, Stack, Typography } from '@bmi/tonic-components-mui';
import type { ButtonLoadingState } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// --- Inline SVG icons (16px, matches Figma Button_v3 icon size) --------------

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'MUI/Atoms/Button/TonicButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    loadingState: {
      control: 'select',
      options: [undefined, 'loading', 'success'],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

const PlaygroundRenderer = (args: ComponentProps<typeof Button>) => {
  const { t } = useTranslation();
  return <Button {...args}>{args.children ?? t('button.label')}</Button>;
};

export const Playground: Story = {
  render: (args) => <PlaygroundRenderer {...args} />,
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

// --- Variants -----------------------------------------------------------------

/**
 * All three visual variants side-by-side.
 * - `contained`: high-emphasis primary action
 * - `outlined`: medium-emphasis secondary action
 * - `text`: low-emphasis inline action
 * Figma: Tonic/Button ? variant axis.
 */
const VariantsRenderer = (args: ComponentProps<typeof Button>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {(['contained', 'outlined', 'text'] as const).map((variant) => (
        <Stack key={variant} alignItems="center" spacing={1}>
          <Button {...args} variant={variant}>{t('button.label')}</Button>
          <Typography variant="caption" color="text.secondary">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export const Variants: Story = {
  render: (args) => <VariantsRenderer {...args} />,
  args: { color: 'primary', size: 'medium' },
};

// --- States -------------------------------------------------------------------

/**
 * All meaningful states side-by-side - Default, Disabled, Loading, and Success.
 * For the animated Loading ? Success transition see the Interactive Loading Flow story.
 */
const StatesRenderer = (args: ComponentProps<typeof Button>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="center">
      {([
        { key: 'default',  extraProps: {} },
        { key: 'disabled', extraProps: { disabled: true } },
        { key: 'loading',  extraProps: { loadingState: 'loading' as const } },
        { key: 'success',  extraProps: { loadingState: 'success' as const } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Button {...args} {...extraProps}>{t('button.label')}</Button>
          <Typography variant="caption" color="text.secondary">{t(`state.${key}`)}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { variant: 'contained', color: 'primary', size: 'medium' },
};

// --- Sizes --------------------------------------------------------------------

/** All four sizes side-by-side with pixel height spec from Figma. */
const SizesRenderer = (args: ComponentProps<typeof Button>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      {([
        { size: 'small',      label: 'Small\n32px'       },
        { size: 'medium',     label: 'Medium\n40px'      },
        { size: 'large',      label: 'Large\n44px'       },
        { size: 'extraLarge', label: 'Extra Large\n48px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Button {...args} size={size}>{t('button.label')}</Button>
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

export const Sizes: Story = {
  render: (args) => <SizesRenderer {...args} />,
  args: { variant: 'contained', color: 'primary' },
};

// --- Colors -------------------------------------------------------------------

/** All six semantic colors across contained, outlined, and text variants. */
const ColorsRenderer = (args: ComponentProps<typeof Button>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2}>
      {(['contained', 'outlined', 'text'] as const).map((variant) => (
        <Stack key={variant} direction="row" spacing={1} alignItems="center">
          {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map((color) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Button {...args} variant={variant} color={color}>{t('button.label')}</Button>
              <Typography variant="caption" color="text.secondary">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};

export const Colors: Story = {
  render: (args) => <ColorsRenderer {...args} />,
  args: { size: 'medium' },
};

// --- With Icons ---------------------------------------------------------------

/** Start icon, end icon, and both icons side-by-side. */
const WithIconsRenderer = (args: ComponentProps<typeof Button>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-end">
      {([
        { key: 'startIcon', extraProps: { startIcon: <StarIcon /> } },
        { key: 'endIcon',   extraProps: { endIcon: <ArrowIcon /> } },
        { key: 'bothIcons', extraProps: { startIcon: <StarIcon />, endIcon: <ArrowIcon /> } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Button {...args} {...extraProps}>{t('button.label')}</Button>
          <Typography variant="caption" color="text.secondary">{t(`button.${key}`)}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export const WithIcons: Story = {
  name: 'With Icons',
  render: (args) => <WithIconsRenderer {...args} />,
  args: { variant: 'contained', color: 'primary', size: 'medium' },
};

// --- Interactive --------------------------------------------------------------

/** Click to trigger the full loading ? success ? idle transition with real timers. */
const InteractiveLoadingFlowRenderer = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<ButtonLoadingState | undefined>(undefined);
  const handleClick = () => {
    setState('loading');
    setTimeout(() => {
      setState('success');
      setTimeout(() => setState(undefined), 2000);
    }, 2000);
  };
  return (
    <Button variant="contained" color="primary" loadingState={state} onClick={handleClick}>
      {state === 'loading' ? t('button.saving') : state === 'success' ? t('button.saved') : t('button.saveChanges')}
    </Button>
  );
};

export const InteractiveLoadingFlow: Story = {
  name: 'Interactive Loading Flow',
  render: () => <InteractiveLoadingFlowRenderer />,
};

