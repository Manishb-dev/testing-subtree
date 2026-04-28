import type { Meta, StoryObj } from '@storybook/react-vite';
import { shape } from '@bmi/tonic-theme';

// ─── Data ─────────────────────────────────────────────────────────────────────

/**
 * Multipliers used to demonstrate the radius scale.
 * MUI uses the base borderRadius × an internal factor for each component size.
 * Here we show the most relevant raw multipliers.
 */
const steps = [0, 0.5, 1, 1.5, 2, 3, 4, 6, 8];
//test commit
// ─── Component ────────────────────────────────────────────────────────────────

function RadiusCard({ multiplier, base }: { multiplier: number; base: number }) {
  const px = multiplier * base;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '96px',
          height: '96px',
          background: '#1c81e6',
          borderRadius: `${px}px`,
          transition: 'border-radius 0.2s',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1d2d38' }}>
          {multiplier === 0 ? 'none' : `×${multiplier}`}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#73838f', marginTop: '2px' }}>{px}px</div>
      </div>
    </div>
  );
}

function BorderRadiusPage() {
  const base = shape.borderRadius as number;

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
        Border Radius
      </h1>
      <p style={{ margin: '0 0 40px', fontSize: '0.875rem', color: '#73838f' }}>
        Base radius:{' '}
        <code style={{ fontSize: '0.875rem' }}>shape.borderRadius = {base}px</code>. MUI
        multiplies this by an internal factor per component size variant. Squares below show
        the raw scale from <code>0px</code> to <code>{steps[steps.length - 1] * base}px</code>.
      </p>

      {/* Scale */}
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {steps.map((n) => (
          <RadiusCard key={n} multiplier={n} base={base} />
        ))}
      </div>

      {/* Token reference table */}
      <section style={{ marginTop: '56px' }}>
        <h2
          style={{
            margin: '0 0 16px',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: '#5c6e7a',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Token reference
        </h2>

        {/* Column headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '96px 96px 96px 200px',
            gap: '16px',
            paddingBottom: '8px',
            borderBottom: '2px solid #dce2e6',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#5c6e7a',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          <span>Multiplier</span>
          <span>Value</span>
          <span>Preview</span>
          <span>Common use</span>
        </div>

        {steps.map((n) => {
          const px = n * base;
          const uses: Record<number, string> = {
            0: 'Sharp / no radius',
            0.5: '-',
            1: 'Base token (shape.borderRadius)',
            1.5: '-',
            2: 'Small components',
            3: 'Medium components',
            4: 'Cards, dialogs',
            6: 'Large surfaces',
            8: 'Pill / fully rounded look',
          };

          return (
            <div
              key={n}
              style={{
                display: 'grid',
                gridTemplateColumns: '96px 96px 96px 200px',
                gap: '16px',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid #f2f4f5',
              }}
            >
              <code style={{ fontSize: '0.8rem', color: '#425461' }}>×{n}</code>
              <code style={{ fontSize: '0.8rem', color: '#425461' }}>{px}px</code>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#1c81e6',
                  borderRadius: `${px}px`,
                }}
              />
              <span style={{ fontSize: '0.8rem', color: '#73838f' }}>{uses[n] ?? '-'}</span>
            </div>
          );
        })}
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/BorderRadius',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const RadiusScale: StoryObj = {
  name: 'Radius Scale',
  render: () => <BorderRadiusPage />,
};
