import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import { TextField, MenuItem, Stack, Typography } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'MUI/Atoms/TextField/TonicTextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
    select: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email', 'tel', 'url', 'search'],
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input Text',
    helperText: 'Helper text',
    size: 'medium',
    required: true,
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof TextField>) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={3}>
      {([
        { key: 'default', extraProps: {} },
        {
          key: 'filled',
          extraProps: { defaultValue: t('textField.placeholder') },
        },
        { key: 'disabled', extraProps: { disabled: true } },
        {
          key: 'readOnly',
          extraProps: {
            defaultValue: t('textField.placeholder'),
            slotProps: { input: { readOnly: true } },
          },
        },
        {
          key: 'error',
          extraProps: {
            error: true,
            helperText: t('textField.helperText'),
          },
        },
      ] as const).map(({ key, extraProps }) => (
        <Stack key={key} spacing={1}>
          <TextField
            {...args}
            {...extraProps}
            label={t('textField.label')}
            placeholder={t('textField.placeholder')}
            required
          />
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All meaningful states: default, filled, disabled, read-only, error. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: {
    size: 'medium',
    helperText: 'Helper text',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SizesRenderer = (args: ComponentProps<typeof TextField>) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      {([
        { size: 'small', label: 'Small\n40px' },
        { size: 'medium', label: 'Medium\n48px' },
      ] as const).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <TextField
            {...args}
            size={size}
            label={t('textField.label')}
            placeholder={t('textField.placeholder')}
            required
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

/** Both size variants side-by-side. */
export const Sizes: Story = {
  render: (args) => <SizesRenderer {...args} />,
  args: {
    helperText: 'Helper text',
  },
};

// ─── Select Type ──────────────────────────────────────────────────────────────

const SelectTypeRenderer = (args: ComponentProps<typeof TextField>) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  return (
    <TextField
      {...args}
      select
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange?.(e);
      }}
      label={t('textField.label')}
      helperText={t('textField.helperText')}
      required
    >
      <MenuItem value="option1">{t('textField.option1')}</MenuItem>
      <MenuItem value="option2">{t('textField.option2')}</MenuItem>
      <MenuItem value="option3">{t('textField.option3')}</MenuItem>
    </TextField>
  );
};

/** Select variant using existing Tonic MenuItem for dropdown options. */
export const SelectType: Story = {
  render: (args) => <SelectTypeRenderer {...args} />,
  args: {
    size: 'medium',
  },
};

// ─── Multiline ────────────────────────────────────────────────────────────────

const MultilineRenderer = (args: ComponentProps<typeof TextField>) => {
  const { t } = useTranslation();
  return (
    <TextField
      {...args}
      multiline
      rows={4}
      label={t('textField.label')}
      placeholder={t('textField.placeholder')}
      helperText={t('textField.helperText')}
    />
  );
};

/** Multiline textarea rendering. */
export const Multiline: Story = {
  render: (args) => <MultilineRenderer {...args} />,
  args: {
    size: 'medium',
  },
};
