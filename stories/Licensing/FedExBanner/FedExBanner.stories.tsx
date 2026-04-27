import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { type ComponentProps } from 'react';
import { FedExBanner } from '@bmi/tonic-components-licensing';
import { useTranslation } from 'react-i18next';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Licensing/FedExBanner/FedExBanner',
  component: FedExBanner,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    logo: { control: 'text', description: 'URL of the partner logo image.' },
    title: { control: 'text', description: 'Primary headline of the banner.' },
    desc: { control: 'text', description: 'Supporting description shown below the title.' },
    code: { control: 'text', description: 'Promo/discount code displayed in the tear-off area.' },
    infoTooltip: { control: 'text', description: 'Optional tooltip content shown next to the title via an info icon.' },
    onRedeem: { description: 'Callback fired when the "Redeem" CTA button is clicked.' },
  },
  args: {
    onRedeem: fn(),
  },
} satisfies Meta<typeof FedExBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

const DefaultRenderer = (args: ComponentProps<typeof FedExBanner>) => {
  const { t } = useTranslation();
  return (
    <FedExBanner
      {...args}
      title={t('fedExBanner.title')}
      desc={t('fedExBanner.desc')}
      code={t('fedExBanner.code')}
    />
  );
};

/** Full-width promotional banner with default FedEx branding and promo code tear-off.
 *  Automatically switches to a stacked mobile layout when the container is narrower than 640 px. */
export const Default: Story = {
  render: (args) => <DefaultRenderer {...args} />,
  args: {},
};

// ─── WithTooltip ──────────────────────────────────────────────────────────────

const WithTooltipRenderer = (args: ComponentProps<typeof FedExBanner>) => {
  const { t } = useTranslation();
  return (
    <FedExBanner
      {...args}
      title={t('fedExBanner.title')}
      desc={t('fedExBanner.desc')}
      code={t('fedExBanner.code')}
      infoTooltip={t('fedExBanner.infoTooltip')}
    />
  );
};

/** Banner with the optional info tooltip visible next to the title.
 *  Use this when you need to surface eligibility or programme details inline. */
export const WithTooltip: Story = {
  render: (args) => <WithTooltipRenderer {...args} />,
  args: {},
};

// ─── CustomContent ────────────────────────────────────────────────────────────

const CustomContentRenderer = (args: ComponentProps<typeof FedExBanner>) => {
  const { t } = useTranslation();
  return (
    <FedExBanner
      {...args}
      title={t('fedExBanner.title')}
      desc={t('fedExBanner.desc')}
      code="BMI2025"
      infoTooltip={t('fedExBanner.infoTooltip')}
    />
  );
};

/** Banner configured with a custom promo code and tooltip — shows how all
 *  content props compose together for a specific campaign or member segment. */
export const CustomContent: Story = {
  render: (args) => <CustomContentRenderer {...args} />,
  args: {},
};
