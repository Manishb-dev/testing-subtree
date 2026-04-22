import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, Typography } from '@bmi/tonic-components-mui';
import type { TonicStackProps } from '@bmi/tonic-components-mui';

// --- Meta ---------------------------------------------------------------------

const meta: Meta<typeof Stack> = {
  title: 'MUI/Atoms/Stack/TonicStack',
  component: Stack,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    spacing: {
      control: 'number',
      min: 0,
      max: 10,
      step: 0.5,
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    },
    flexWrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- Helper -------------------------------------------------------------------

const Item = ({ label }: { label: string }) => (
  <Box
    sx={{
      px: 2,
      py: 1.5,
      bgcolor: 'background.paper2',
      borderRadius: 1,
      border: '1px solid',
      borderColor: 'common.borders.light',
    }}
  >
    <Typography variant="body3" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

// --- Playground ---------------------------------------------------------------

export const Playground: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    alignItems: 'center',
    children: (
      <>
        <Item label="Item 1" />
        <Item label="Item 2" />
        <Item label="Item 3" />
      </>
    ),
  },
};

// --- Directions ---------------------------------------------------------------

/**
 * All four direction values side by side.
 */
export const Directions: Story = {
  render: () => (
    <Stack direction="column" spacing={4} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
      {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((dir) => (
        <Box key={dir}>
          <Typography variant="body3" color="text.tertiary" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
            {dir}
          </Typography>
          <Stack direction={dir} spacing={1}>
            <Item label="A" />
            <Item label="B" />
            <Item label="C" />
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};

// --- Spacing Scale ------------------------------------------------------------

/**
 * Demonstrates spacing values mapped to the theme's 8px spacing unit.
 */
export const SpacingScale: Story = {
  render: () => (
    <Stack direction="column" spacing={4} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 1 }}>
      {([1, 2, 3, 4, 6] as const).map((sp) => (
        <Box key={sp}>
          <Typography variant="body3" color="text.tertiary" sx={{ mb: 1, fontWeight: 700 }}>
            spacing={sp} ({sp * 8}px)
          </Typography>
          <Stack direction="row" spacing={sp}>
            <Item label="A" />
            <Item label="B" />
            <Item label="C" />
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
};
