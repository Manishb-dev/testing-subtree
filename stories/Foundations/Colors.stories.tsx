import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from '@mui/material/styles';
import {
  Neutral,
  blue,
  purple,
  red,
  rose,
  orange,
  green,
  Limon,
} from '@bmi/mui-tonic-theme';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ColorScale = Record<string, string>;

/** Build a reverse map: normalised hex → "ScaleName[stop]" */
const hexToScaleRef = (() => {
  const scaleEntries: { scaleName: string; scale: ColorScale }[] = [
    { scaleName: 'Neutral', scale: Neutral },
    { scaleName: 'blue', scale: blue },
    { scaleName: 'purple', scale: purple },
    { scaleName: 'red', scale: red },
    { scaleName: 'rose', scale: rose },
    { scaleName: 'orange', scale: orange },
    { scaleName: 'green', scale: green },
    { scaleName: 'Limon', scale: Limon },
  ];
  const map = new Map<string, string>();
  for (const { scaleName, scale } of scaleEntries) {
    for (const [stop, hex] of Object.entries(scale)) {
      map.set(hex.toLowerCase(), `${scaleName}[${stop}]`);
    }
  }
  return map;
})();

function resolveScaleRef(value: string): string | null {
  return hexToScaleRef.get(value.toLowerCase()) ?? null;
}

const palettes: { name: string; scale: ColorScale }[] = [
  { name: 'Neutral', scale: Neutral },
  { name: 'Blue', scale: blue },
  { name: 'Purple', scale: purple },
  { name: 'Red', scale: red },
  { name: 'Rose', scale: rose },
  { name: 'Orange', scale: orange },
  { name: 'Green', scale: green },
  { name: 'Limon', scale: Limon },
];

/** Return black or white depending on the luminance of the hex colour. */
function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// ─── Components ───────────────────────────────────────────────────────────────

function ColorSwatch({ stop, hex }: { stop: string; hex: string }) {
  return (
    <div
      style={{
        width: '88px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.08)',
        fontFamily: 'IBM Plex Sans, Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: hex,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: contrastText(hex),
          letterSpacing: '0.02em',
        }}
      >
        {stop}
      </div>
      <div
        style={{
          padding: '6px 6px',
          fontSize: '0.6rem',
          background: '#fff',
          color: '#425461',
          fontFamily: 'monospace',
        }}
      >
        {hex}
      </div>
    </div>
  );
}

function ColorPaletteSection({ name, scale }: { name: string; scale: ColorScale }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2
        style={{
          margin: '0 0 12px',
          fontSize: '1rem',
          fontWeight: 700,
          color: '#1d2d38',
          fontFamily: 'IBM Plex Sans, Arial, sans-serif',
          textTransform: 'capitalize',
        }}
      >
        {name}
      </h2>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {Object.entries(scale).map(([stop, hex]) => (
          <ColorSwatch key={stop} stop={stop} hex={hex} />
        ))}
      </div>
    </section>
  );
}

function ColorsPage() {
  return (
    <div style={{ padding: '32px', background: '#f7f9fa', minHeight: '100vh' }}>
      <h1
        style={{
          margin: '0 0 8px',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#1d2d38',
          fontFamily: 'IBM Plex Sans, Arial, sans-serif',
        }}
      >
        Color Ramps
      </h1>
      <p
        style={{
          margin: '0 0 32px',
          fontSize: '0.875rem',
          color: '#73838f',
          fontFamily: 'IBM Plex Sans, Arial, sans-serif',
        }}
      >
        Raw colour scales sourced from{' '}
        <code style={{ fontSize: '0.8rem' }}>@bmi/mui-tonic-theme</code>. These are the
        single source of truth for every colour in the design system.
      </p>
      {palettes.map(({ name, scale }) => (
        <ColorPaletteSection key={name} name={name} scale={scale} />
      ))}
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const ColorScales: StoryObj = {
  name: 'Color Ramps',
  render: () => <ColorsPage />,
};

// ─── Color Tokens (theme-aware) ───────────────────────────────────────────

function SemanticSwatch({ token, value }: { token: string; value: string }) {
  const luminance = (() => {
    const hex = value.replace('#', '');
    if (hex.length < 6) return 1;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  })();

  const scaleRef = resolveScaleRef(value);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '6px 10px',
        borderRadius: '6px',
        background: 'rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '6px',
          backgroundColor: value,
          border: '1px solid rgba(0,0,0,0.1)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.55rem',
          fontWeight: 700,
          color: luminance > 0.5 ? '#000' : '#fff',
        }}
      />
      <div style={{ fontFamily: 'IBM Plex Sans, Arial, sans-serif', minWidth: 0 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'inherit', marginBottom: '3px' }}>{token}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', opacity: 0.6 }}>{value}</span>
          {scaleRef && (
            <span
              style={{
                fontSize: '0.6rem',
                fontFamily: 'monospace',
                background: 'rgba(0,0,0,0.07)',
                borderRadius: '3px',
                padding: '1px 5px',
                color: 'inherit',
                opacity: 0.75,
                whiteSpace: 'nowrap',
              }}
            >
              {scaleRef}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SemanticGroup({ name, tokens }: { name: string; tokens: Record<string, unknown> }) {
  const entries = Object.entries(tokens).filter(([, v]) => typeof v === 'string' && (v as string).startsWith('#') || typeof v === 'string' && (v as string).startsWith('rgb'));
  if (entries.length === 0) return null;
  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 700, fontFamily: 'IBM Plex Sans, Arial, sans-serif', textTransform: 'capitalize' }}>
        {name}
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
        {entries.map(([token, value]) => (
          <SemanticSwatch key={token} token={token} value={value as string} />
        ))}
      </div>
    </section>
  );
}

function SemanticPalettePage() {
  const { palette } = useTheme();

  const groups: { name: string; tokens: Record<string, unknown> }[] = [
    { name: 'Primary', tokens: palette.primary as unknown as Record<string, unknown> },
    { name: 'Secondary', tokens: palette.secondary as unknown as Record<string, unknown> },
    { name: 'Error', tokens: palette.error as unknown as Record<string, unknown> },
    { name: 'Warning', tokens: palette.warning as unknown as Record<string, unknown> },
    { name: 'Info', tokens: palette.info as unknown as Record<string, unknown> },
    { name: 'Success', tokens: palette.success as unknown as Record<string, unknown> },
    { name: 'Text', tokens: palette.text as unknown as Record<string, unknown> },
    { name: 'Background', tokens: palette.background as unknown as Record<string, unknown> },
  ];

  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: palette.background.default, color: palette.text.primary }}>
      <h1 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'IBM Plex Sans, Arial, sans-serif' }}>
        Color Tokens
      </h1>
      <p style={{ margin: '0 0 32px', fontSize: '0.875rem', opacity: 0.6, fontFamily: 'IBM Plex Sans, Arial, sans-serif' }}>
        Active theme: <strong>{palette.mode}</strong>. Toggle the theme in the toolbar to see values change.
      </p>
      {groups.map(({ name, tokens }) => (
        <SemanticGroup key={name} name={name} tokens={tokens} />
      ))}
    </div>
  );
}

export const SemanticPalette: StoryObj = {
  name: 'Color Tokens',
  render: () => <SemanticPalettePage />,
};
