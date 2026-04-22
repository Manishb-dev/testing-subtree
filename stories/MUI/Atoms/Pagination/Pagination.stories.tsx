import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { Pagination, Stack, Typography } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'MUI/Atoms/Pagination/TonicPagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    count: { control: 'number' },
    page: { control: 'number' },
    disabled: { control: 'boolean' },
    showFirstButton: { control: 'boolean' },
    showLastButton: { control: 'boolean' },
    siblingCount: { control: 'number' },
    boundaryCount: { control: 'number' },
    label: { control: 'text' },
    totalItems: { control: 'number' },
    rowsPerPage: { control: 'number' },
    responsive: { control: 'boolean' },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

const PlaygroundWrapper = (args: ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page ?? 1);
  return (
    <Pagination
      {...args}
      page={page}
      onChange={(e, value) => {
        setPage(value);
        args.onChange?.(e, value);
      }}
    />
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundWrapper {...args} />,
  args: {
    count: 20,
    page: 1,
    size: 'medium',
    label: 'Items',
    totalItems: 200,
    rowsPerPage: 10,
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof Pagination>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3} alignItems="center">
      {([
        { key: 'default', extraProps: {} },
        { key: 'disabled', extraProps: { disabled: true } },
      ]).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Pagination
            {...args}
            {...extraProps}
            label={t('pagination.textLabel')}
          />
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Default (interactive) and Disabled states side-by-side. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { count: 20, page: 1, size: 'medium', totalItems: 22, rowsPerPage: 10 },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SizesRenderer = (args: ComponentProps<typeof Pagination>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3} alignItems="center">
      {([
        { size: 'small', label: 'Small\n26px' },
        { size: 'medium', label: 'Medium\n32px' },
        { size: 'large', label: 'Large\n40px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Pagination
            {...args}
            size={size}
            label={t('pagination.textLabel')}
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
  );
};

/** All sizes with pixel spec labels. */
export const Sizes: Story = {
  render: (args) => <SizesRenderer {...args} />,
  args: { count: 20, page: 1, totalItems: 22, rowsPerPage: 10 },
};

// ─── WithLabel ────────────────────────────────────────────────────────────────

const WithLabelRenderer = (args: ComponentProps<typeof Pagination>) => {
  const { t } = useTranslation();
  return <Pagination {...args} label={t('pagination.textLabel')} />;
};

/** Pagination with a text label and items-range indicator before the controls. */
export const WithLabel: Story = {
  render: (args) => <WithLabelRenderer {...args} />,
  args: { count: 20, page: 1, size: 'medium', totalItems: 22, rowsPerPage: 10 },
};

// ─── WithoutLabel ───────────────────────────────────────────────────────────

/** Pagination without the range label — just the navigation controls. */
export const WithoutLabel: Story = {
  args: {
    count: 20,
    page: 1,
    size: 'medium',
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

const InteractiveWrapper = (args: ComponentProps<typeof Pagination>) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  return (
    <Pagination
      {...args}
      count={20}
      page={page}
      totalItems={200}
      rowsPerPage={10}
      label={t('pagination.textLabel')}
      onChange={(_e, value) => setPage(value)}
    />
  );
};

/** Click to navigate — shows real page switching with a dynamic range label. */
export const Interactive: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: { size: 'medium' },
};

// ─── Responsive ───────────────────────────────────────────────────────────────

const ResponsiveRenderer = (args: ComponentProps<typeof Pagination>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={4} alignItems="center">
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <Pagination
            {...args}
            size={size}
            responsive
            label={t('pagination.textLabel')}
          />
          <Typography variant="caption" color="text.secondary">
            {size}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Responsive layout — label and range stack above the pagination controls. */
export const Responsive: Story = {
  render: (args) => <ResponsiveRenderer {...args} />,
  args: { count: 20, page: 1, totalItems: 22, rowsPerPage: 10 },
};
