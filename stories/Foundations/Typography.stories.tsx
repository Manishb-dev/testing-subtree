import type { Meta, StoryObj } from '@storybook/react-vite';
import { typography } from '@bmi/mui-tonic-theme';
import type { CSSProperties } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

// Cast to a plain dictionary so we can index it without TS complaints (the
// exported `typography` type is a union that includes a function overload).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typo = typography as Record<string, any>;

interface VariantSpec {
  key: string;
  label: string;
  sample: string;
}

const variants: VariantSpec[] = [
  { key: 'display', label: 'Display', sample: 'The quick brown fox' },
  { key: 'h1', label: 'Heading 1 / h1', sample: 'The quick brown fox' },
  { key: 'h2', label: 'Heading 2 / h2', sample: 'The quick brown fox' },
  { key: 'h3', label: 'Heading 3 / h3', sample: 'The quick brown fox' },
  { key: 'h4', label: 'Heading 4 / h4', sample: 'The quick brown fox' },
  { key: 'h5', label: 'Heading 5 / h5', sample: 'The quick brown fox' },
  { key: 'h6', label: 'Heading 6 / h6', sample: 'The quick brown fox' },
  {
    key: 'body1',
    label: 'Body 1',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    key: 'body2',
    label: 'Body 2',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    key: 'body3',
    label: 'Body 3',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    key: 'body4',
    label: 'Body 4',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
];

const weights: { label: string; key: string }[] = [
  { label: 'Light', key: 'fontWeightLight' },
  { label: 'Regular', key: 'fontWeightRegular' },
  { label: 'Medium', key: 'fontWeightMedium' },
  { label: 'Semi Bold', key: 'fontWeightSemiBold' },
  { label: 'Bold', key: 'fontWeightBold' },
];

// ─── Component ────────────────────────────────────────────────────────────────

function TypographyPage() {
  const fontFamily = String(typo['fontFamily'] ?? 'IBM Plex Sans, Arial, sans-serif');

  return (
    <div
      style={{
        padding: '32px',
        background: '#ffffff',
        minHeight: '100vh',
        fontFamily,
      }}
    >
      {/* Header */}
      <h1
        style={{
          margin: '0 0 8px',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#1d2d38',
        }}
      >
        Typography
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: '0.875rem', color: '#73838f' }}>
        Type scale sourced from{' '}
        <code style={{ fontSize: '0.8rem' }}>@bmi/mui-tonic-theme</code>. Font&nbsp;family:{' '}
        <strong>{fontFamily}</strong>
      </p>

      {/* Font weights */}
      <section style={{ marginBottom: '40px' }}>
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
          Font Weights
        </h2>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {weights.map(({ label, key }) => {
            const value = typo[key] as number | undefined;
            return (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: value,
                    color: '#1d2d38',
                    fontFamily,
                  }}
                >
                  Ag
                </div>
                <div style={{ fontSize: '0.75rem', color: '#73838f', marginTop: '4px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '0.625rem', color: '#94a1ab', fontFamily: 'monospace' }}>
                  {String(value)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Type scale */}
      <section>
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
          Type Scale
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {variants.map(({ key, label, sample }) => {
            const styles = typo[key] as CSSProperties | undefined;
            if (!styles) return null;

            return (
              <div
                key={key}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '24px',
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderBottom: '1px solid #dce2e6',
                }}
              >
                {/* Metadata column */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#425461' }}>
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.625rem',
                      color: '#94a1ab',
                      marginTop: '4px',
                      lineHeight: '1.6',
                      fontFamily: 'monospace',
                    }}
                  >
                    {styles.fontSize && <div>size: {String(styles.fontSize)}</div>}
                    {styles.lineHeight && <div>line-h: {String(styles.lineHeight)}</div>}
                    {styles.fontWeight && <div>weight: {String(styles.fontWeight)}</div>}
                    {styles.letterSpacing !== undefined && (
                      <div>tracking: {String(styles.letterSpacing)}</div>
                    )}
                  </div>
                </div>

                {/* Sample text */}
                <span
                  style={{
                    ...styles,
                    fontFamily,
                    color: '#1d2d38',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {sample}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const TypeScale: StoryObj = {
  name: 'Type Scale',
  render: () => <TypographyPage />,
};
