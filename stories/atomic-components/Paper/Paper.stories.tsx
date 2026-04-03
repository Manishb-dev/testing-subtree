import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paper, Stack, Typography } from '@bmi/mui-tonic-components';
import type { TonicPaperProps, PaperElevation } from '@bmi/mui-tonic-components';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Paper> = {
  title: 'Atomic/Paper/TonicPaper',
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
      options: [0, 1, 2, 3, 4],
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
 * All five elevation levels from the Tonic shadow scale.
 * Elevation 0 is flat (no shadow), 4 is the deepest (xl shadow).
 * Figma: Tonic/Paper → elevation axis
 */
export const Elevations: Story = {
  render: (args: TonicPaperProps) => (
    <Stack
      direction="row"
      spacing={4}
      alignItems="flex-end"
      sx={{ p: 4, bgcolor: 'background.paper1', borderRadius: 1 }}
    >
      {([0, 1, 2, 3, 4] as PaperElevation[]).map((elevation) => (
        <Stack key={elevation} alignItems="center" spacing={1.5}>
          <Paper {...args} elevation={elevation} variant="elevation">
            <SampleContent />
          </Paper>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ whiteSpace: 'pre', textAlign: 'center' }}
          >
            {`elevation ${elevation}\n${(['none', 'sm', 'md', 'lg', 'xl'] as const)[elevation]}`}
          </Typography>
        </Stack>
      ))}
    </Stack>
  ),
  args: { sx: { p: 3, width: 180 } },
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
