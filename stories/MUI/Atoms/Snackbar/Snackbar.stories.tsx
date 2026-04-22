import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fn } from 'storybook/test';
import { Snackbar, Button, Stack, Typography } from '@bmi/tonic-components-mui';
import type { SnackbarSeverity } from '@bmi/tonic-components-mui';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'MUI/Atoms/Snackbar/TonicSnackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'warning', 'error'],
    },
    message: { control: 'text' },
    open: { control: 'boolean' },
    autoHideDuration: { control: 'number' },
    anchorOrigin: { control: 'object' },
  },
  args: {
    onClose: fn(),
    message: 'License has been renewed successfully.',
    severity: 'success',
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

const PlaygroundWrapper = (args: ComponentProps<typeof Snackbar>) => {
  const [open, setOpen] = useState(false);
  return (
    <Stack spacing={2} alignItems="center">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show Snackbar
      </Button>
      <Snackbar
        {...args}
        open={open}
        autoHideDuration={4000}
        onClose={(e, reason) => {
          setOpen(false);
          args.onClose?.(e, reason);
        }}
      />
    </Stack>
  );
};

/** Interactive sandbox — click the button to trigger the snackbar. */
export const Playground: Story = {
  render: (args) => <PlaygroundWrapper {...args} />,
  args: {
    severity: 'success',
    message: 'License has been renewed successfully.',
  },
};

// ─── Severities ───────────────────────────────────────────────────────────────

const inlineSx = {
  position: 'static',
  transform: 'none',
  '& .MuiSnackbarContent-root': { width: '100%' },
} as const;

const SeveritiesRenderer = (args: ComponentProps<typeof Snackbar>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3} sx={{ width: 504 }}>
      {(['success', 'warning', 'error'] as const).map((severity) => (
        <Stack key={severity} alignItems="center" spacing={0.5}>
          <Snackbar
            {...args}
            open
            severity={severity}
            message={t(`snackbar.${severity}Message`)}
            sx={inlineSx}
          />
          <Typography variant="caption" color="text.secondary">
            {severity}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All severity variants stacked — success, warning, error. */
export const Severities: Story = {
  render: (args) => <SeveritiesRenderer {...args} />,
}; 

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof Snackbar>) => {
  const { t } = useTranslation();

  const closeAction = (
    <Button size="small" color="inherit">
      {t('snackbar.close')}
    </Button>
  );

  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {([
        { key: 'default', extraProps: {} },
        { key: 'withAction', extraProps: { action: closeAction } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={0.5} sx={{ width: 504 }}>
          <Snackbar
            {...args}
            open
            message={t('snackbar.successMessage')}
            severity="success"
            sx={inlineSx}
            {...extraProps}
          />
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Default and with-action states side-by-side. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
};

// ─── WithAction ───────────────────────────────────────────────────────────────

const WithActionWrapper = (args: ComponentProps<typeof Snackbar>) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={2} alignItems="center">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show Snackbar
      </Button>
      <Snackbar
        {...args}
        open={open}
        autoHideDuration={4000}
        severity="error"
        message={t('snackbar.errorMessage')}
        onClose={(e, reason) => {
          setOpen(false);
          args.onClose?.(e, reason);
        }}
        action={
          <Button
            size="small"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            {t('snackbar.close')}
          </Button>
        }
      />
    </Stack>
  );
};

/** Snackbar with a close action button — click to trigger. */
export const WithAction: Story = {
  render: (args) => <WithActionWrapper {...args} />,
};
