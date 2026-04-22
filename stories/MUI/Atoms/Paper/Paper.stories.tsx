import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paper, Stack, Typography } from '@bmi/tonic-components-mui';
import type { TonicPaperProps, PaperElevation } from '@bmi/tonic-components-mui';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Paper> = {
  title: 'MUI/Atoms/Paper/TonicPaper',
  component: Paper,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
    },
    elevation: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    },
    square: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Helper ───────────────────────────────────────────────────────────────────

const SampleContent = () => (
  <Stack spacing={0.5}>
    <Typography variant="h6" color="text.primary">
      Surface content
    </Typography>
    <Typography variant="body3" color="text.secondary">
      A contained region using the paper background token.
    </Typography>
  </Stack>
);

// ─── Playground ───────────────────────────────────────────────────────────────

/** Fully interactive playground - all controls are live. */
export const Playground: Story = {
  args: {
    elevation: 1,
    variant: 'elevation',
    square: false,
    sx: { p: 3, width: 320 },
    children: <SampleContent />,
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

/**
 * The two Paper variants side-by-side.
 * - `elevation` - surface raised with a drop shadow
 * - `outlined`  - flat surface with a `borders.light` border, no shadow
 */
export const Variants: Story = {
  render: (args: TonicPaperProps) => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      {(['elevation', 'outlined'] as const).map((variant) => (
        <Stack key={variant} alignItems="center" spacing={1.5}>
          <Paper {...args} variant={variant} elevation={variant === 'elevation' ? 2 : undefined}>
            <SampleContent />
          </Paper>
          <Typography variant="caption" color="text.secondary">
            {variant}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { sx: { p: 3, width: 260 } },
};

// ─── Elevations ───────────────────────────────────────────────────────────────

/**
 * All MUI elevation levels (0–24).
 * - `0`    → no shadow
 * - `1`    → Tonic low
 * - `2`    → Tonic medium
 * - `3`    → Tonic high
 * - `4–24` → MUI default shadow scale
 */
export const Elevations: Story = {
  render: (args: TonicPaperProps) => (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={4}
      sx={{ p: 4, bgcolor: 'background.paper1', borderRadius: 1, maxWidth: 900 }}
    >
      {(Array.from({ length: 25 }, (_, i) => i) as PaperElevation[]).map((elevation) => (
        <Stack key={elevation} alignItems="center" spacing={1.5}>
          <Paper {...args} elevation={elevation} variant="elevation">
            <SampleContent />
          </Paper>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: 'center' }}
          >
            {`elevation ${elevation}`}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { sx: { p: 3, width: 140 } },
};

// ─── Square ───────────────────────────────────────────────────────────────────

/**
 * Rounded corners (default) vs `square` corners side-by-side.
 * The `square` prop removes `border-radius` from the surface.
 */
export const Square: Story = {
  render: (args: TonicPaperProps) => (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      {([
        { square: false, label: 'Rounded (default)' },
        { square: true,  label: 'Square' },
      ] as const).map(({ square, label }) => (
        <Stack key={label} alignItems="center" spacing={1.5}>
          <Paper {...args} square={square}>
            <SampleContent />
          </Paper>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { elevation: 2, sx: { p: 3, width: 240 } },
};
