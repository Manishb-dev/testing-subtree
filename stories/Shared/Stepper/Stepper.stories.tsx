import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState, type ComponentProps } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stepper } from '@bmi/mui-tonic-components';
import type { TonicStepConfig } from '@bmi/mui-tonic-components';
import { useTranslation } from 'react-i18next';

// ─── Shared step configs ──────────────────────────────────────────────────────

const defaultSteps: TonicStepConfig[] = [
  { label: 'Business', subSteps: 3 },
  { label: 'Terms', subSteps: 0 },
  { label: 'Payment', subSteps: 0 },
];

const useStepsWithSubSteps = (): TonicStepConfig[] => {
  const { t } = useTranslation();
  return [
    { label: t('stepper.business'), subSteps: 3 },
    { label: t('stepper.terms'), subSteps: 0 },
    { label: t('stepper.payment'), subSteps: 0 },
  ];
};

const useStepsNoSubSteps = (): TonicStepConfig[] => {
  const { t } = useTranslation();
  return [
    { label: t('stepper.businessInfo') },
    { label: t('stepper.ownerInfo') },
    { label: t('stepper.bankInfo') },
    { label: t('stepper.review') },
  ];
};

/** Calculate total flat indices for a step config array. */
const getTotalSteps = (steps: TonicStepConfig[]) =>
  steps.reduce((acc, s) => acc + Math.max(s.subSteps ?? 0, 1), 0);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Shared/Stepper/TonicStepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    activeStep: { control: 'number', description: 'Flat zero-based index of the active step.' },
    lastCompletedStep: { control: 'number', description: 'Flat index of the last completed step. Defaults to activeStep - 1.' },
    compact: { control: 'boolean', description: 'Hides labels for inactive steps (mobile mode).' },
  },
  args: {
    steps: defaultSteps,
    activeStep: 0,
    onStepClick: fn(),
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

const DefaultRenderer = (args: ComponentProps<typeof Stepper>) => {
  return <Stepper {...args} />;
};

/** Default stepper with 3 major steps and sub-steps on the first step. Active on first sub-step. */
export const Default: Story = {
  render: (args) => <DefaultRenderer {...args} />,
  args: {
    compact: false,
  },
};

// ─── SubStepProgression ───────────────────────────────────────────────────────

const SubStepProgressionRenderer = (args: ComponentProps<typeof Stepper>) => {
  const steps = useStepsWithSubSteps();

  // Flat indices: 0=sub1, 1=sub2, 2=sub3, 3=Terms, 4=Payment
  const progressions = [
    { label: 'Business 1', activeStep: 0 },
    { label: 'Business 2', activeStep: 1 },
    { label: 'Business 3', activeStep: 2 },
    { label: 'Terms', activeStep: 3 },
    { label: 'Payment', activeStep: 4 },
  ];

  return (
    <Stack spacing={4}>
      {progressions.map(({ label, activeStep }) => (
        <Stack key={label} spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <Stepper
            {...args}
            steps={steps}
            activeStep={activeStep}
          />
        </Stack>
      ))}
    </Stack>
  );
};

/** All progression states from the Figma spec — Business sub-steps 1→3, Terms, Payment. */
export const SubStepProgression: Story = {
  render: (args) => <SubStepProgressionRenderer {...args} />,
};

// ─── StepProgression ─────────────────────────────────────────────────────────

const StepProgressionRenderer = (args: ComponentProps<typeof Stepper>) => {
  const steps = useStepsNoSubSteps();

  // Flat indices: 0=BusinessInfo, 1=OwnerInfo, 2=BankInfo, 3=Review
  const progressions = [
    { label: 'Step 1', activeStep: 0 },
    { label: 'Step 2', activeStep: 1 },
    { label: 'Step 3', activeStep: 2 },
    { label: 'Step 4', activeStep: 3 },
  ];

  return (
    <Stack spacing={4}>
      {progressions.map(({ label, activeStep }) => (
        <Stack key={label} spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <Stepper
            {...args}
            steps={steps}
            activeStep={activeStep}
          />
        </Stack>
      ))}
    </Stack>
  );
};

/** Steps without sub-steps — simple connector bars between each step. */
export const StepProgression: Story = {
  render: (args) => <StepProgressionRenderer {...args} />,
};

// ─── Compact ──────────────────────────────────────────────────────────────────

const CompactRenderer = (args: ComponentProps<typeof Stepper>) => {
  const steps = useStepsWithSubSteps();

  const progressions = [
    { label: 'Business 1 (compact)', activeStep: 0 },
    { label: 'Terms (compact)', activeStep: 3 },
    { label: 'Payment (compact)', activeStep: 4 },
  ];

  return (
    <Stack spacing={4}>
      {progressions.map(({ label, activeStep }) => (
        <Stack key={label} spacing={1}>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          <Box sx={{ maxWidth: 361 }}>
            <Stepper
              {...args}
              steps={steps}
              activeStep={activeStep}
              compact
            />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

/** Mobile/compact mode — only the active step shows its label. Constrained to 361px like the Figma mobile variant. */
export const Compact: Story = {
  render: (args) => <CompactRenderer {...args} />,
  args: {
    compact: true,
  },
};

// ─── CustomSteps ──────────────────────────────────────────────────────────────

const CustomStepsRenderer = (args: ComponentProps<typeof Stepper>) => {
  const steps: TonicStepConfig[] = [
    { label: 'Application', subSteps: 4 },
    { label: 'Documents', subSteps: 2 },
    { label: 'Verification', subSteps: 0 },
    { label: 'Approval', subSteps: 0 },
  ];

  return (
    <Stepper
      {...args}
      steps={steps}
      activeStep={3}
      lastCompletedStep={2}
    />
  );
};

/** Arbitrary step configuration with mixed sub-step counts — shows flexible composition. */
export const CustomSteps: Story = {
  render: (args) => <CustomStepsRenderer {...args} />,
  args: {
    activeStep: 3,
    lastCompletedStep: 2,
  },
};

// ─── Interactive ──────────────────────────────────────────────────────────────

const InteractiveWrapper = (args: ComponentProps<typeof Stepper>) => {
  const steps = useStepsWithSubSteps();
  const total = getTotalSteps(steps);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, total - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Stack spacing={3}>
      <Stepper
        {...args}
        steps={steps}
        activeStep={activeStep}
        onStepClick={(idx) => {
          setActiveStep(idx);
          args.onStepClick?.(idx);
        }}
      />
      <Stack direction="row" spacing={2} justifyContent="center">
        <button onClick={handleBack} disabled={activeStep === 0}>
          Back
        </button>
        <Typography variant="body2" sx={{ alignSelf: 'center' }}>
          Flat index: {activeStep} / {total - 1}
        </Typography>
        <button onClick={handleNext} disabled={activeStep === total - 1}>
          Next
        </button>
      </Stack>
    </Stack>
  );
};

/** Click Next/Back to step through the stepper. Click completed steps to jump back. Demonstrates the full consumer flow. */
export const Interactive: Story = {
  render: (args) => <InteractiveWrapper {...args} />,
};
