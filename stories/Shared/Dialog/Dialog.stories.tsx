import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import {
  Dialog,
  Button,
  Paper,
  Stack,
  Typography,
} from '@bmi/mui-tonic-components';
import type { TonicDialogProps } from '@bmi/mui-tonic-components';
import {
  CheckCircleIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  ShieldCheckIcon,
  WarningOctagonIcon,
  HeadsetIcon,
} from '@bmi/mui-tonic-icons';
import { useTranslation } from 'react-i18next';

// ─── Icon state config ────────────────────────────────────────────────────────

const iconSx = { width: 82, height: 82, fontSize: 82 } as const;

const iconStateMap = {
  success: <CheckCircleIcon size="large" variant="filled" sx={{ color: 'success.main', ...iconSx }} />,
  error: <ErrorIcon size="large" variant="filled" sx={{ color: 'error.main', ...iconSx }} />,
  softDecline: <ErrorIcon size="large" variant="filled" sx={{ color: 'warning.main', ...iconSx }} />,
  info: <InfoIcon size="large" variant="filled" sx={{ color: 'info.main', ...iconSx }} />,
  referral: <ShieldCheckIcon size="large" variant="filled" sx={{ color: 'warning.main', ...iconSx }} />,
  hardDecline: <WarningOctagonIcon size="large" variant="filled" sx={{ color: 'error.main', ...iconSx }} />,
  warningCircle: <WarningIcon size="large" variant="filled" sx={{ color: 'info.main', ...iconSx }} />,
  contact: <HeadsetIcon size="large" variant="outlined" sx={{ color: 'secondary.main', ...iconSx }} />,
} as const;

type IconState = keyof typeof iconStateMap;

/** DialogProps shared across inline (non-portal) story previews — disables
 *  focus-trapping so the docs page stays scrollable and clickable. */
const inlineDialogProps: TonicDialogProps['DialogProps'] = {
  hideBackdrop: true,
  disablePortal: true,
  disableScrollLock: true,
  disableAutoFocus: true,
  disableEnforceFocus: true,
  disableRestoreFocus: true,
  sx: { position: 'relative', zIndex: 0 },
};

// ─── Extended args type (adds iconState for Playground) ───────────────────────

type DialogStoryArgs = TonicDialogProps & { iconState?: IconState };

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<DialogStoryArgs> = {
  title: 'Components/Shared/Dialog/TonicDialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    heading: { control: 'text' },
    body: { control: 'text' },
    primaryActionLabel: { control: 'text' },
    secondaryActionLabel: { control: 'text' },
    iconState: {
      control: 'select',
      options: Object.keys(iconStateMap),
      description: 'Preset icon state to display',
    },
  },
  args: {
    open: true,
    onClose: fn(),
    onPrimaryAction: fn(),
    onSecondaryAction: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

const PlaygroundWrapper = (args: DialogStoryArgs) => {
  const [open, setOpen] = useState(false);
  const icon = args.iconState ? iconStateMap[args.iconState] : args.icon;
  return (
    <>
      <Button variant="contained" size="medium" onClick={() => setOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        {...args}
        icon={icon}
        open={open}
        onClose={() => {
          setOpen(false);
          args.onClose?.();
        }}
        onPrimaryAction={() => {
          setOpen(false);
          args.onPrimaryAction?.();
        }}
        onSecondaryAction={() => {
          setOpen(false);
          args.onSecondaryAction?.();
        }}
      />
    </>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundWrapper {...args} />,
  args: {
    heading: 'Heading Text',
    body: 'Body Text',
    primaryActionLabel: 'Confirm',
    secondaryActionLabel: 'Cancel',
    iconState: 'success',
  },
};

// ─── WithSecondaryCta ─────────────────────────────────────────────────────────

const WithSecondaryCtaRenderer = (args: TonicDialogProps) => {
  const { t } = useTranslation();
  return (
    <Paper variant="outlined" sx={{ p: 2, display: 'inline-block' }}>
      <Dialog
        {...args}
        heading={t('dialog.heading')}
        body={t('dialog.body')}
        primaryActionLabel={t('dialog.primaryAction')}
        secondaryActionLabel={t('dialog.secondaryAction')}
        icon={iconStateMap.success}
        DialogProps={inlineDialogProps}
      />
    </Paper>
  );
};

/** Dialog with both primary and secondary action buttons. */
export const WithSecondaryCta: Story = {
  render: (args) => <WithSecondaryCtaRenderer {...args} />,
  args: {
    heading: '',
    primaryActionLabel: '',
  },
};

// ─── WithoutIcon ──────────────────────────────────────────────────────────────

const WithoutIconRenderer = (args: TonicDialogProps) => {
  const { t } = useTranslation();
  return (
    <Paper variant="outlined" sx={{ p: 2, display: 'inline-block' }}>
      <Dialog
        {...args}
        heading={t('dialog.heading')}
        body={t('dialog.body')}
        primaryActionLabel={t('dialog.primaryAction')}
        DialogProps={inlineDialogProps}
      />
    </Paper>
  );
};

/** Dialog without an icon — text-only layout. */
export const WithoutIcon: Story = {
  render: (args) => <WithoutIconRenderer {...args} />,
  args: {
    heading: '',
    primaryActionLabel: '',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

const stateConfigs: { key: IconState; headingKey: string; bodyKey: string }[] = [
  { key: 'success', headingKey: 'dialog.successHeading', bodyKey: 'dialog.successBody' },
  { key: 'error', headingKey: 'dialog.errorHeading', bodyKey: 'dialog.errorBody' },
  { key: 'softDecline', headingKey: 'dialog.softDeclineHeading', bodyKey: 'dialog.softDeclineBody' },
  { key: 'info', headingKey: 'dialog.infoHeading', bodyKey: 'dialog.infoBody' },
  { key: 'referral', headingKey: 'dialog.referralHeading', bodyKey: 'dialog.referralBody' },
  { key: 'hardDecline', headingKey: 'dialog.hardDeclineHeading', bodyKey: 'dialog.hardDeclineBody' },
  { key: 'warningCircle', headingKey: 'dialog.warningCircleHeading', bodyKey: 'dialog.warningCircleBody' },
  { key: 'contact', headingKey: 'dialog.contactHeading', bodyKey: 'dialog.contactBody' },
];

const StatesRenderer = (args: TonicDialogProps) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start" flexWrap="wrap" useFlexGap>
      {stateConfigs.map(({ key, headingKey, bodyKey }) => (
        <Stack key={key} spacing={1} alignItems="center">
          <Typography variant="caption" color="text.secondary">
            {key}
          </Typography>
          <Dialog
            {...args}
            open
            icon={iconStateMap[key]}
            heading={t(headingKey)}
            body={t(bodyKey)}
            primaryActionLabel={t('dialog.primaryAction')}
            secondaryActionLabel={t('dialog.secondaryAction')}
            DialogProps={inlineDialogProps}
          />
        </Stack>
      ))}
    </Stack>
  );
};

/** All 8 popup icon states from Figma — success, error, soft decline, info, referral, hard decline, warning circle, and contact. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: {
    heading: '',
    primaryActionLabel: '',
  },
};
