import type { Meta, StoryObj } from '@storybook/react-vite';
import { spacing } from '@bmi/tonic-theme-mui';

// ─── Data ─────────────────────────────────────────────────────────────────────

/** Multipliers to showcase - mirrors what MUI components typically use. */
const steps = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 10, 12];

// ─── Component ────────────────────────────────────────────────────────────────

function SpacingPage() {
  return (
    <div
      style={{
        padding: '32px',
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, color: '#1d2d38' }}>
        Spacing
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: '0.875rem', color: '#73838f' }}>
        Base unit:{' '}
        <code style={{ fontSize: '0.875rem' }}>{spacing}px</code>. MUI multiplies
        this by the factor passed to{' '}
        <code style={{ fontSize: '0.875rem' }}>theme.spacing(n)</code>, so{' '}
        <code style={{ fontSize: '0.875rem' }}>theme.spacing(2) = {2 * spacing}px</code>.
      </p>

      {/* Column headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '96px 320px 64px',
          gap: '16px',
          marginBottom: '8px',
          paddingBottom: '8px',
          borderBottom: '2px solid #dce2e6',
        }}
      >
        {['Token', 'Visual', 'Value'].map((h) => (
          <span
            key={h}
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#5c6e7a',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {steps.map((n) => {
        const px = n * spacing;
        return (
          <div
            key={n}
            style={{
              display: 'grid',
              gridTemplateColumns: '96px 320px 64px',
              gap: '16px',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #f2f4f5',
            }}
          >
            {/* Token name */}
            <code style={{ fontSize: '0.8rem', color: '#425461' }}>spacing({n})</code>

            {/* Bar */}
            <div
              style={{
                height: '20px',
                width: `${Math.min(px, 300)}px`,
                backgroundColor: '#1c81e6',
                borderRadius: '4px',
                minWidth: '3px',
                transition: 'width 0.2s',
              }}
            />

            {/* Pixel value */}
            <span style={{ fontSize: '0.8rem', color: '#73838f' }}>{px}px</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const SpacingScale: StoryObj = {
  name: 'Spacing Scale',
  render: () => <SpacingPage />,
};
