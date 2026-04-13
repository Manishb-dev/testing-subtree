import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import { AvatarLabel, Stack, Typography } from '@bmi/mui-tonic-components';
import { StarIcon } from '@bmi/mui-tonic-icons';
import { useTranslation } from 'react-i18next';

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'Components/Shared/AvatarLabel/TonicAvatarLabel',
  component: AvatarLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    subTitleSuffix: { control: 'text' },
    subtitleVariant: {
      control: 'select',
      options: ['body3', 'body4'],
    },
    subtitleColor: { control: 'text' },
    avatarBgColor: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof AvatarLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default ------------------------------------------------------------------

export const Default: Story = {
  args: {
    title: 'John Doe',
    subtitle: 'Account Manager',
    avatarIcon: <StarIcon />,
  },
};

// --- States -------------------------------------------------------------------

const StatesRenderer = (args: ComponentProps<typeof AvatarLabel>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      {([
        {
          key: 'titleOnly',
          label: 'Title only',
          props: { title: t('avatarLabel.title'), avatarIcon: <StarIcon /> },
        },
        {
          key: 'withSubtitle',
          label: 'With subtitle',
          props: {
            title: t('avatarLabel.title'),
            subtitle: t('avatarLabel.subtitle'),
            avatarIcon: <StarIcon />,
          },
        },
        {
          key: 'withSuffix',
          label: 'With subtitle + suffix',
          props: {
            title: t('avatarLabel.title'),
            subtitle: t('avatarLabel.subtitle'),
            subTitleSuffix: t('avatarLabel.suffix'),
            avatarIcon: <StarIcon />,
          },
        },
        {
          key: 'noAvatar',
          label: 'No avatar',
          props: {
            title: t('avatarLabel.title'),
            subtitle: t('avatarLabel.subtitle'),
          },
        },
      ]).map(({ key, label, props }) => (
        <Stack key={key} spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <AvatarLabel {...args} {...props} />
        </Stack>
      ))}
    </Stack>
  );
};

/** All meaningful configurations - title only, with subtitle, with suffix, without avatar. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { title: '' },
};

// --- SubtitleVariants ---------------------------------------------------------

const SubtitleVariantsRenderer = (args: ComponentProps<typeof AvatarLabel>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      {(['body3', 'body4'] as const).map((variant) => (
        <Stack key={variant} spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            {variant}
          </Typography>
          <AvatarLabel
            {...args}
            title={t('avatarLabel.title')}
            subtitle={t('avatarLabel.subtitle')}
            subtitleVariant={variant}
            avatarIcon={<StarIcon />}
          />
        </Stack>
      ))}
    </Stack>
  );
};

/** Both subtitle typography variants - `body3` and `body4` - side-by-side for comparison. */
export const SubtitleVariants: Story = {
  render: (args) => <SubtitleVariantsRenderer {...args} />,
  args: { title: '' },
};

// --- CustomAvatarColor --------------------------------------------------------

const CustomAvatarColorRenderer = (args: ComponentProps<typeof AvatarLabel>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4}>
      {([
        { color: 'primary.main',   label: 'primary.main' },
        { color: 'success.main',   label: 'success.main' },
        { color: 'warning.main',   label: 'warning.main' },
        { color: 'background.paper', label: 'background.paper (default)' },
      ]).map(({ color, label }) => (
        <Stack key={color} spacing={0.5}>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <AvatarLabel
            {...args}
            title={t('avatarLabel.title')}
            subtitle={t('avatarLabel.subtitle')}
            avatarIcon={<StarIcon />}
            avatarBgColor={color}
          />
        </Stack>
      ))}
    </Stack>
  );
};

/** Avatar background color token variations using MUI palette references. */
export const CustomAvatarColor: Story = {
  render: (args) => <CustomAvatarColorRenderer {...args} />,
  args: { title: '' },
};
