import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps } from 'react';
import { Avatar, Stack, Typography } from '@bmi/mui-tonic-components';
import { StarIcon } from '@bmi/mui-tonic-icons';
import type { AvatarSize } from '@bmi/mui-tonic-components';

// --- Meta ---------------------------------------------------------------------

const meta = {
  title: 'Components/Atoms/Avatar/TonicAvatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    children: { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

export const Playground: Story = {
  args: {
    size: 'extraLarge',
    children: 'AS',
  },
};

// --- Content Types ------------------------------------------------------------

/** All three content types side-by-side - Text, Icon, and Image. */
export const ContentTypes: Story = {
  render: (args: ComponentProps<typeof Avatar>) => (
    <Stack direction="row" spacing={3} alignItems="center">
      <Stack alignItems="center" spacing={1}>
        <Avatar {...args}>AS</Avatar>
        <Typography variant="caption" color="text.secondary">
          Text
        </Typography>
      </Stack>
      <Stack alignItems="center" spacing={1}>
        <Avatar {...args}>
          <StarIcon size="medium" />
        </Avatar>
        <Typography variant="caption" color="text.secondary">
          Icon
        </Typography>
      </Stack>
      <Stack alignItems="center" spacing={1}>
        <Avatar
          {...args}
          src="https://i.pravatar.cc/80?img=3"
          alt="User avatar"
        />
        <Typography variant="caption" color="text.secondary">
          Image
        </Typography>
      </Stack>
    </Stack>
  ),
  args: { size: 'extraLarge' },
};

// --- Sizes --------------------------------------------------------------------

/** All sizes with pixel spec labels from Figma Avatar_v3. */
export const Sizes: Story = {
  render: (args: ComponentProps<typeof Avatar>) => (
    <Stack direction="row" spacing={3} alignItems="flex-end">
      {([
        { size: 'small', label: 'Small\n18px' },
        { size: 'medium', label: 'Medium\n24px' },
        { size: 'large', label: 'Large\n32px' },
        { size: 'extraLarge', label: 'Extra Large\n40px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Avatar {...args} size={size}>
            AS
          </Avatar>
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
  args: {},
};

// --- Sizes with Icon ----------------------------------------------------------

/** Icon content across all sizes - icon scales with the avatar. */
export const SizesWithIcon: Story = {
  render: (args: ComponentProps<typeof Avatar>) => {
    const iconSizeMap: Record<AvatarSize, 14 | 16 | 20 | 24> = {
      small: 14,
      medium: 16,
      large: 20,
      extraLarge: 24,
    };
    return (
      <Stack direction="row" spacing={3} alignItems="flex-end">
        {([
          { size: 'small', label: 'Small\n18px' },
          { size: 'medium', label: 'Medium\n24px' },
          { size: 'large', label: 'Large\n32px' },
          { size: 'extraLarge', label: 'Extra Large\n40px' },
        ] as const).map(({ size, label }) => (
          <Stack key={size} alignItems="center" spacing={1}>
            <Avatar {...args} size={size}>
              <StarIcon size={iconSizeMap[size]} />
            </Avatar>
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
  },
  args: {},
};

// --- Sizes with Image ---------------------------------------------------------

/** Image content across all sizes. */
export const SizesWithImage: Story = {
  render: (args: ComponentProps<typeof Avatar>) => (
    <Stack direction="row" spacing={3} alignItems="flex-end">
      {([
        { size: 'small', label: 'Small\n18px' },
        { size: 'medium', label: 'Medium\n24px' },
        { size: 'large', label: 'Large\n32px' },
        { size: 'extraLarge', label: 'Extra Large\n40px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Avatar
            {...args}
            size={size}
            src="https://i.pravatar.cc/80?img=3"
            alt="User avatar"
          />
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
  args: {},
};
