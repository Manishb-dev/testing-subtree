import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Tooltip, Button } from '@bmi/mui-tonic-components';
import type { TonicTooltipProps, TooltipPlacement } from '@bmi/mui-tonic-components';
import { useTranslation } from 'react-i18next';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tooltip> = {
  title: 'Atomic/Tooltip/TonicTooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ] satisfies TooltipPlacement[],
    },
    arrow: { control: 'boolean' },
    open: { control: 'boolean' },
    disableHoverListener: { control: 'boolean' },
    disableFocusListener: { control: 'boolean' },
    disableTouchListener: { control: 'boolean' },
  },
  args: {
    title: 'Helpful information goes here',
    placement: 'bottom',
    arrow: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

/** Interactive playground — adjust controls to explore all tooltip behaviours. */
export const Playground: Story = {
  args: {
    title: 'Helpful information goes here',
    placement: 'bottom',
    arrow: true,
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <Tooltip {...args}>
        <Button variant="outlined">Hover over me</Button>
      </Tooltip>
    </Box>
  ),
};

// ─── Placements ───────────────────────────────────────────────────────────────

const PlacementsRenderer = (args: ComponentProps<typeof Tooltip>) => {
  const { t } = useTranslation();
  return (
    <Stack
      direction="row"
      spacing={4}
      alignItems="center"
      justifyContent="center"
      sx={{ p: 6 }}
    >
      {([
        { placement: 'top',    label: 'Top'    },
        { placement: 'bottom', label: 'Bottom' },
        { placement: 'left',   label: 'Left'   },
        { placement: 'right',  label: 'Right'  },
      ] as const).map(({ placement, label }) => (
        <Stack key={placement} alignItems="center" spacing={1}>
          <Tooltip {...args} placement={placement} title={t('tooltip.content')}>
            <Button variant="outlined" size="small">{label}</Button>
          </Tooltip>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All primary placements (top, bottom, left, right) demonstrated side-by-side. */
export const Placements: Story = {
  render: (args) => <PlacementsRenderer {...args} />,
  args: { open: true, arrow: true },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof Tooltip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={4} alignItems="center" sx={{ p: 4 }}>
      {([
        { key: 'default',  extraProps: {} },
        { key: 'disabled', extraProps: { disableHoverListener: true, disableFocusListener: true, disableTouchListener: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Tooltip {...args} {...extraProps} title={t('tooltip.content')}>
            <span>
              <Button
                variant="outlined"
                disabled={key === 'disabled'}
              >
                {t(`state.${key}`)}
              </Button>
            </span>
          </Tooltip>
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Default (hover to reveal) and Disabled (tooltip suppressed) states side-by-side. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { placement: 'top', arrow: true },
};

// ─── WithArrow ────────────────────────────────────────────────────────────────

const WithArrowRenderer = (args: ComponentProps<typeof Tooltip>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={6} alignItems="center" sx={{ p: 4 }}>
      {([
        { arrow: true,  label: 'With Arrow'    },
        { arrow: false, label: 'Without Arrow' },
      ] as const).map(({ arrow, label }) => (
        <Stack key={String(arrow)} alignItems="center" spacing={1}>
          <Tooltip
            {...args}
            arrow={arrow}
            title={t('tooltip.content')}
            open
          >
            <Button variant="outlined" size="small">{label}</Button>
          </Tooltip>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Side-by-side comparison of tooltip with and without the directional arrow. */
export const WithArrow: Story = {
  render: (args) => <WithArrowRenderer {...args} />,
  args: { placement: 'top' },
};
