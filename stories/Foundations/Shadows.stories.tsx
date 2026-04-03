import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from '@mui/material/styles';
import { shadows } from '@bmi/mui-tonic-theme';

// ─── Component ────────────────────────────────────────────────────────────────

function ShadowCard({ name, value }: { name: string; value: string }) {
  const theme = useTheme();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
      }}
    >
      {/* Shadow preview */}
      <div
        style={{
          width: '160px',
          height: '96px',
          borderRadius: '8px',
          background: theme.palette.background.paper1,
          boxShadow: value,
        }}
      />

      {/* Label */}
      <div style={{ textAlign: 'center', maxWidth: '180px' }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: theme.palette.text.primary }}>
          shadows.{name}
        </div>
        <div
          style={{
            fontSize: '0.6rem',
            color: theme.palette.text.secondary,
            marginTop: '6px',
            wordBreak: 'break-word',
            fontFamily: 'monospace',
            lineHeight: '1.5',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function ShadowsPage() {
  const theme = useTheme();
  return (
    <div
      style={{
        padding: '32px',
        background: theme.palette.background.default,
        minHeight: '100vh',
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, color: theme.palette.text.primary }}>
        Shadows
      </h1>
      <p style={{ margin: '0 0 40px', fontSize: '0.875rem', color: theme.palette.text.secondary }}>
        Shadow tokens sourced from{' '}
        <code style={{ fontSize: '0.8rem' }}>@bmi/mui-tonic-theme</code>. Cards are
        shown on a surface background to make shadows visible.
      </p>

      {/* Cards */}
      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {Object.entries(shadows).map(([name, value]) => (
          <ShadowCard key={name} name={name} value={value} />
        ))}
      </div>

      {/* Comparison strip */}
      <section style={{ marginTop: '56px' }}>
        <h2
          style={{
            margin: '0 0 24px',
            fontSize: '0.875rem',
            fontWeight: 700,
            color: theme.palette.text.tertiary,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Side-by-side elevation comparison
        </h2>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {Object.entries(shadows).map(([name, value], i) => (
            <div
              key={name}
              style={{
                width: `${80 + i * 20}px`,
                height: `${48 + i * 16}px`,
                borderRadius: '8px',
                background: theme.palette.background.paper1,
                boxShadow: value,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                fontWeight: 700,
                color: theme.palette.text.secondary,
                fontFamily: 'IBM Plex Sans, Arial, sans-serif',
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Shadows',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const ShadowTokens: StoryObj = {
  name: 'Shadow Tokens',
  render: () => <ShadowsPage />,
};
