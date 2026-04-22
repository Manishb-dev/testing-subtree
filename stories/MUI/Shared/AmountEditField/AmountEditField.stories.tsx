import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AmountEditField } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'MUI/Shared/AmountEditField/TonicAmountEditField',
  component: AmountEditField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    displayValue: { control: 'text' },
    inputValue: { control: 'text' },
    error: { control: 'boolean' },
    prefix: { control: 'text' },
    size: { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
  },
  args: {
    onInputChange: fn(),
    onCommit: fn(),
    onEditStart: fn(),
  },
} satisfies Meta<typeof AmountEditField>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

/** Read-only display mode with formatted amount. */
export const Default: Story = {
  args: {
    displayValue: '1,750',
    inputValue: '1750',
    prefix: '$',
    size: 'small',
  },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = (args: ComponentProps<typeof AmountEditField>) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={4} alignItems="flex-start">
      {([
        { key: 'default', extraProps: {} },
        { key: 'disabled', extraProps: { disabled: true } },
        { key: 'error', extraProps: { error: true } },
      ] as const).map(({ key, extraProps }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <AmountEditField
            {...args}
            displayValue={t('amountEditField.displayValue')}
            inputValue="1750"
            {...extraProps}
          />
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Default, Disabled, and Error states side-by-side. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: {
    displayValue: '',
    inputValue: '',
    size: 'small',
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

const SizesRenderer = (args: ComponentProps<typeof AmountEditField>) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={4} alignItems="flex-end">
      {([
        { size: 'small' as const, label: 'Small\n(mobile)' },
        { size: 'medium' as const, label: 'Medium\n(desktop)' },
      ]).map(({ size, label }) => (
        <Stack key={size} alignItems="center" spacing={1}>
          <AmountEditField
            {...args}
            displayValue={t('amountEditField.displayValue')}
            inputValue="1750"
            size={size}
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

/** Small (mobile H6) and Medium (desktop H5) sizes side-by-side. */
export const Sizes: Story = {
  render: (args) => <SizesRenderer {...args} />,
  args: {
    displayValue: '',
    inputValue: '',
  },
};

// ─── WithError ────────────────────────────────────────────────────────────────

const WithErrorRenderer = (args: ComponentProps<typeof AmountEditField>) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('2500');

  return (
    <Stack spacing={2} alignItems="center">
      <AmountEditField
        {...args}
        displayValue={t('amountEditField.displayValue')}
        inputValue={inputValue}
        onInputChange={(v) => {
          setInputValue(v);
          args.onInputChange?.(v);
        }}
        error
      />
      <Typography variant="caption" color="text.secondary">
        {t('state.error')}
      </Typography>
    </Stack>
  );
};

/** Error state with red border — click to edit and see the error styling. */
export const WithError: Story = {
  render: (args) => <WithErrorRenderer {...args} />,
  args: {
    displayValue: '',
    inputValue: '',
    size: 'small',
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

const InteractiveWrapper = (args: ComponentProps<typeof AmountEditField>) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('1750');
  const [displayValue, setDisplayValue] = useState(t('amountEditField.displayValue'));

  const formatAmount = (raw: string) => {
    const num = parseFloat(raw);
    if (isNaN(num)) return raw;
    return num.toLocaleString('en-US');
  };

  return (
    <AmountEditField
      {...args}
      displayValue={displayValue}
      inputValue={inputValue}
      onInputChange={(v) => {
        setInputValue(v);
        args.onInputChange?.(v);
      }}
      onCommit={(v) => {
        setDisplayValue(formatAmount(v));
        args.onCommit?.(v);
      }}
      onEditStart={() => {
        args.onEditStart?.();
      }}
    />
  );
};

/** Click to edit, type a new amount, blur or press Enter to commit. Demonstrates the full edit→commit flow. */
export const Interactive: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
  args: {
    displayValue: '',
    inputValue: '',
    size: 'small',
    prefix: '$',
  },
};

// ─── CustomPrefix ─────────────────────────────────────────────────────────────

const CustomPrefixRenderer = (args: ComponentProps<typeof AmountEditField>) => {
  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={4} alignItems="center">
      {([
        { prefix: '$', label: 'Dollar ($)' },
        { prefix: '€', label: 'Euro (€)' },
        { prefix: '£', label: 'Pound (£)' },
      ]).map(({ prefix, label }) => (
        <Stack key={prefix} alignItems="center" spacing={1}>
          <AmountEditField
            {...args}
            displayValue={t('amountEditField.displayValue')}
            inputValue="1750"
            prefix={prefix}
          />
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Different currency prefixes — Dollar, Euro, Pound. */
export const CustomPrefix: Story = {
  render: (args) => <CustomPrefixRenderer {...args} />,
  args: {
    displayValue: '',
    inputValue: '',
    size: 'small',
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

const DisabledRenderer = (args: ComponentProps<typeof AmountEditField>) => {
  const { t } = useTranslation();

  return (
    <Stack alignItems="center" spacing={1}>
      <AmountEditField
        {...args}
        displayValue={t('amountEditField.displayValue')}
        inputValue="1750"
        disabled
      />
      <Typography variant="caption" color="text.secondary">
        {t('state.disabled')}
      </Typography>
    </Stack>
  );
};

/** Disabled state — hover effects suppressed, clicking does not enter edit mode. */
export const Disabled: Story = {
  render: (args) => <DisabledRenderer {...args} />,
  args: {
    displayValue: '',
    inputValue: '',
    size: 'small',
  },
};
