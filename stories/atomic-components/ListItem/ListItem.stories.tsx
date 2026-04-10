import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { ListItem, Avatar, Stack, Typography } from '@bmi/mui-tonic-components';
import { StarIcon, ErrorIcon } from '@bmi/mui-tonic-icons';
import type { ListItemState } from '@bmi/mui-tonic-components';
import MuiList from '@mui/material/List';
import { useTranslation } from 'react-i18next';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FIGMA_STATES: { key: string; state: ListItemState }[] = [
  { key: 'default', state: 'default' },
  { key: 'hover', state: 'hover' },
  { key: 'active', state: 'active' },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atomic/ListItem/TonicListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    primaryText: { control: 'text' },
    secondaryText: { control: 'text' },
    avatar: { control: false },
    endIcon: { control: false },
    showCheckbox: { control: 'boolean' },
    checked: { control: 'boolean' },
    state: { control: 'select', options: ['default', 'hover', 'active'] },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    primaryText: 'List Item',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof ListItem>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {FIGMA_STATES.map(({ key, state }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <MuiList>
            <ListItem
              {...args}
              state={state}
              primaryText={t('listItem.primaryText')}
            />
          </MuiList>
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Default, Hover, and Active states side-by-side. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { primaryText: '' },
};

// ─── WithSecondaryText ────────────────────────────────────────────────────────

const WithSecondaryTextRenderer = (args: ComponentProps<typeof ListItem>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {FIGMA_STATES.map(({ key, state }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <MuiList>
            <ListItem
              {...args}
              state={state}
              primaryText={t('listItem.primaryText')}
              secondaryText={t('listItem.secondaryText')}
            />
          </MuiList>
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Primary and secondary text with state variations. */
export const WithSecondaryText: Story = {
  render: (args) => <WithSecondaryTextRenderer {...args} />,
  args: { primaryText: '' },
};

// ─── WithAvatar ───────────────────────────────────────────────────────────────

const WithAvatarRenderer = (args: ComponentProps<typeof ListItem>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {FIGMA_STATES.map(({ key, state }) => (
          <Stack key={key} alignItems="center" spacing={1}>
            <MuiList>
              <ListItem
                {...args}
                state={state}
                primaryText={t('listItem.primaryText')}
                secondaryText={t('listItem.secondaryText')}
                avatar={
                  <Avatar size="medium">
                    <StarIcon />
                  </Avatar>
                }
              />
            </MuiList>
            <Typography variant="caption" color="text.secondary">
              {t(`state.${key}`)}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {FIGMA_STATES.map(({ key, state }) => (
          <Stack key={`textonly-${key}`} alignItems="center" spacing={1}>
            <MuiList>
              <ListItem
                {...args}
                state={state}
                primaryText={t('listItem.primaryText')}
                avatar={
                  <Avatar size="medium">
                    <StarIcon />
                  </Avatar>
                }
              />
            </MuiList>
            <Typography variant="caption" color="text.secondary">
              {t(`state.${key}`)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

/** Avatar with primary text and optional secondary text. */
export const WithAvatar: Story = {
  render: (args) => <WithAvatarRenderer {...args} />,
  args: { primaryText: '' },
};

// ─── WithEndIcon ──────────────────────────────────────────────────────────────

const WithEndIconRenderer = (args: ComponentProps<typeof ListItem>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {FIGMA_STATES.map(({ key, state }) => (
          <Stack key={key} alignItems="center" spacing={1}>
            <MuiList>
              <ListItem
                {...args}
                state={state}
                primaryText={t('listItem.primaryText')}
                endIcon={<ErrorIcon />}
              />
            </MuiList>
            <Typography variant="caption" color="text.secondary">
              {t(`state.${key}`)}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" spacing={3} alignItems="flex-start">
        {FIGMA_STATES.map(({ key, state }) => (
          <Stack key={`secondary-${key}`} alignItems="center" spacing={1}>
            <MuiList>
              <ListItem
                {...args}
                state={state}
                primaryText={t('listItem.primaryText')}
                secondaryText={t('listItem.secondaryText')}
                endIcon={<ErrorIcon />}
              />
            </MuiList>
            <Typography variant="caption" color="text.secondary">
              {t(`state.${key}`)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

/** List item with a trailing action icon, with and without secondary text. */
export const WithEndIcon: Story = {
  render: (args) => <WithEndIconRenderer {...args} />,
  args: { primaryText: '' },
};

// ─── WithCheckbox ─────────────────────────────────────────────────────────────

const WithCheckboxWrapper = (args: ComponentProps<typeof ListItem>) => {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {FIGMA_STATES.map(({ key, state }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <MuiList>
            <ListItem
              {...args}
              state={state}
              showCheckbox
              checked={checkedItems[key] ?? false}
              onCheckedChange={(_e: React.ChangeEvent<HTMLInputElement>, val: boolean) =>
                setCheckedItems((prev) => ({ ...prev, [key]: val }))
              }
              primaryText={t('listItem.primaryText')}
            />
          </MuiList>
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** List item with an interactive checkbox before the text. */
export const WithCheckbox: Story = {
  render: (args) => <WithCheckboxWrapper {...args} />,
  args: { primaryText: '' },
};
