import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Typography,
} from '@bmi/tonic-components-mui';
import type { CardVariant } from '@bmi/tonic-components-mui';
import { useTranslation } from 'react-i18next';

// ─── Controlled arg type — only variant is Storybook-managed ─────────────────

type CardArgs = {
  variant?: CardVariant;
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<CardArgs> = {
  title: 'MUI/Atoms/Card/TonicCard',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'] as CardVariant[],
    },
  },
  args: {
    variant: 'elevation',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: ({ variant }) => (
    <Card variant={variant} sx={{ maxWidth: 345 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6">Card Title</Typography>
        <Typography variant="body2" color="text.secondary">
          This is the card body content. It can contain any text or elements.
        </Typography>
      </CardContent>
    </Card>
  ),
};

// ─── Variants ─────────────────────────────────────────────────────────────────

const VariantsRenderer = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {(['elevation', 'outlined'] as const).map((variant) => (
        <Stack key={variant} alignItems="center" spacing={1}>
          <Card variant={variant} sx={{ maxWidth: 280, minWidth: 240 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6">{t('card.title')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('card.body')}
              </Typography>
            </CardContent>
          </Card>
          <Typography variant="caption" color="text.secondary">
            {variant}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** All visual variants side-by-side — elevation and outlined. */
export const Variants: Story = {
  render: () => <VariantsRenderer />,
};

// ─── WithActions ──────────────────────────────────────────────────────────────

const WithActionsRenderer = ({ variant }: CardArgs) => {
  const { t } = useTranslation();
  return (
    <Card variant={variant} sx={{ maxWidth: 345 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6">{t('card.title')}</Typography>
        <Typography variant="body2" color="text.secondary">
          {t('card.body')}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button variant="text" size="small">
          {t('card.action')}
        </Button>
      </CardActions>
    </Card>
  );
};

/** Card with a CardActions area containing action buttons. */
export const WithActions: Story = {
  render: (args) => <WithActionsRenderer {...args} />,
  args: { variant: 'outlined' },
};

// ─── States ───────────────────────────────────────────────────────────────────

const StatesRenderer = ({ variant }: CardArgs) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {([
        { key: 'default', withActions: false },
        { key: 'withAction', withActions: true },
      ]).map(({ key, withActions }) => (
        <Stack key={key} alignItems="center" spacing={1}>
          <Card variant={variant} sx={{ maxWidth: 280, minWidth: 240 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6">{t('card.title')}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('card.body')}
              </Typography>
            </CardContent>
            {withActions && (
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button variant="text" size="small">
                  {t('card.action')}
                </Button>
              </CardActions>
            )}
          </Card>
          <Typography variant="caption" color="text.secondary">
            {t(`state.${key}`)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/** Card in default and with-action states. */
export const States: Story = {
  render: (args) => <StatesRenderer {...args} />,
  args: { variant: 'outlined' },
};
