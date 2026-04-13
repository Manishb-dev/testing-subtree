import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, Typography } from '@bmi/mui-tonic-components';
import type { TonicBoxProps } from '@bmi/mui-tonic-components';

// --- Meta ---------------------------------------------------------------------

const meta: Meta<typeof Box> = {
  title: 'Components/Atoms/Box/TonicBox',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    component: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Playground ---------------------------------------------------------------

export const Playground: Story = {
  args: {
    sx: {
      p: 3,
      bgcolor: 'background.paper1',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'common.borders.light',
    },
    children: 'Box content',
  },
};

// --- Surface Levels -----------------------------------------------------------

/**
 * Box using each background surface token from the theme.
 * Demonstrates how the default/paper/paper1/paper2/paper3 tokens stack visually.
 */
export const SurfaceLevels: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
      {(
        [
          { token: 'background.default', label: 'default' },
          { token: 'background.paper', label: 'paper' },
          { token: 'background.paper1', label: 'paper1' },
          { token: 'background.paper2', label: 'paper2' },
          { token: 'background.paper3', label: 'paper3' },
        ] as const
      ).map(({ token, label }) => (
        <Box
          key={label}
          sx={{
            p: 2,
            bgcolor: token,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'common.borders.light',
          }}
        >
          <Typography variant="body3" color="text.secondary">
            {token}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
};

// --- With Border --------------------------------------------------------------

/**
 * Box demonstrating each border token from the theme.
 */
export const BorderTokens: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
      {(
        [
          { token: 'common.borders.light', label: 'borders.light' },
          { token: 'common.borders.medium', label: 'borders.medium' },
          { token: 'common.borders.dark', label: 'borders.dark' },
        ] as const
      ).map(({ token, label }) => (
        <Box
          key={label}
          sx={{
            p: 2,
            bgcolor: 'background.paper1',
            borderRadius: 1,
            border: '1px solid',
            borderColor: token,
          }}
        >
          <Typography variant="body3" color="text.secondary">
            {token}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
};
