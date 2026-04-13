import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { Tabs, Tab } from '@bmi/mui-tonic-components';
import type { TonicTabsProps } from '@bmi/mui-tonic-components';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Atoms/Tabs/TonicTabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundWrapper = (args: TonicTabsProps) => {
  const [value, setValue] = useState<number>(0);
  return (
    <Tabs
      {...args}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue as number);
        args.onChange?.(_, newValue);
      }}
    >
      <Tab label="Dashboard" value={0} />
      <Tab label="Analytics" value={1} />
      <Tab label="Reports" value={2} />
      <Tab label="Settings" value={3} />
    </Tabs>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundWrapper {...args} />,
  args: {
    variant: 'standard',
    orientation: 'horizontal',
  },
};

const StatesRenderer = (args: TonicTabsProps) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      {([
        { key: 'default', value: false, tabProps: {} },
        { key: 'selected', value: 0, tabProps: {} },
        { key: 'disabled', value: false, tabProps: { disabled: true } },
      ] as const).map(({ key, value, tabProps }) => (
        <Stack key={key} direction="row" spacing={3} alignItems="center">
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ width: 80, flexShrink: 0 }}
          >
            {t(`state.${key}`)}
          </Typography>
          <Tabs {...args} value={value}>
            <Tab label={t('tabs.dashboard')} value={0} {...tabProps} />
          </Tabs>
        </Stack>
      ))}
    </Stack>
  );
};

/** All meaningful tab states: default (unselected), selected, and disabled. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: {
    variant: 'standard',
    orientation: 'horizontal',
  },
};

const VariantsRenderer = (args: TonicTabsProps) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4} sx={{ width: 480 }}>
      {(['standard', 'scrollable', 'fullWidth'] as const).map((variant) => (
        <Stack key={variant} spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {variant}
          </Typography>
          <Tabs {...args} variant={variant} value={0}>
            <Tab label={t('tabs.dashboard')} value={0} />
            <Tab label={t('tabs.analytics')} value={1} />
            <Tab label={t('tabs.reports')} value={2} />
          </Tabs>
        </Stack>
      ))}
    </Stack>
  );
};

/** All layout variant values — controls tab scrolling and width distribution. */
export const Variants: Story = {
  render: (args) => <VariantsRenderer {...args} />,
  args: {
    orientation: 'horizontal',
  },
};

const OrientationsRenderer = (args: TonicTabsProps) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={6} alignItems="flex-start">
      {(['horizontal', 'vertical'] as const).map((orientation) => (
        <Stack key={orientation} spacing={2} alignItems="flex-start">
          <Typography variant="caption" color="text.secondary">
            {orientation}
          </Typography>
          <Tabs {...args} orientation={orientation} value={0}>
            <Tab label={t('tabs.dashboard')} value={0} />
            <Tab label={t('tabs.analytics')} value={1} />
            <Tab label={t('tabs.reports')} value={2} />
          </Tabs>
        </Stack>
      ))}
    </Stack>
  );
};

/** Horizontal (default) and vertical orientations side by side. */
export const Orientations: Story = {
  render: (args) => <OrientationsRenderer {...args} />,
  args: {
    variant: 'standard',
  },
};
