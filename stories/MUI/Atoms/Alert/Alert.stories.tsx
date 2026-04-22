import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Stack, Typography } from '@bmi/tonic-components-mui';
import type { TonicAlertProps } from '@bmi/tonic-components-mui';

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'MUI/Atoms/Alert/TonicAlert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['warning', 'error', 'success'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    title: 'License Renew Reminder',
    description: 'Your license is expiring soon. Please renew to avoid disruption.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

/** Interactive sandbox - adjust all controls in the panel. */
export const Playground: Story = {
  args: {
    severity: 'warning',
    title: 'License Renew Reminder',
    description: 'Your license is expiring soon. Please renew to avoid disruption.',
  },
};

// --- Severities ---------------------------------------------------------------

const SeveritiesRenderer = (args: ComponentProps<typeof Alert>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} sx={{ width: 560 }}>
      {(['warning', 'error', 'success'] as const).map((severity) => (
        <Stack key={severity} spacing={0.5}>
          <Alert
            {...args}
            severity={severity}
            title={t(`alert.${severity}Title`)}
            description={t(`alert.${severity}Description`)}
          />
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
            {severity}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All severity variants stacked - warning, error, success. */
export const Severities: Story = {
  render: (args) => <SeveritiesRenderer {...args} />,
};

// --- States -------------------------------------------------------------------

const StatesRenderer = (args: ComponentProps<typeof Alert>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} sx={{ width: 560 }}>
      {([
        { key: 'titleOnly', extraProps: { description: undefined } as Partial<TonicAlertProps> },
        { key: 'withDescription', extraProps: {} },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} spacing={0.5}>
          <Alert
            {...args}
            {...extraProps}
            title={t('alert.warningTitle')}
            description={key === 'withDescription' ? t('alert.warningDescription') : undefined}
          />
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
            {key === 'titleOnly' ? 'Title only' : 'With description'}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Title-only vs title with description - the two content configurations. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { severity: 'warning' },
};

// --- WithDescription ----------------------------------------------------------

const WithDescriptionRenderer = (args: ComponentProps<typeof Alert>) => {
  const { t } = useTranslation();
  return (
    <Alert
      {...args}
      title={t('alert.warningTitle')}
      description={t('alert.warningDescription')}
    />
  );
};

/** Alert with both title and description text - the most common real-world usage. */
export const WithDescription: Story = {
  render: (args) => <WithDescriptionRenderer {...args} />,
  args: { severity: 'warning' },
};
