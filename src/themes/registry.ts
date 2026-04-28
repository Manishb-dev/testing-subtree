import type { Theme } from '@mui/material/styles';
import { tonicLight, tonicDark } from './tonic';
import { licensingLight, licensingDark } from './licensing';

export type ThemeKey =
  | 'tonic-light'
  | 'tonic-dark'
  | 'licensing-light'
  | 'licensing-dark';

export const themeRegistry: Record<ThemeKey, { label: string; theme: Theme }> = {
  'tonic-light':     { label: 'Tonic — Light',            theme: tonicLight },
  'tonic-dark':      { label: 'Tonic — Dark',             theme: tonicDark },
  'licensing-light': { label: 'Licensing Portal — Light', theme: licensingLight },
  'licensing-dark':  { label: 'Licensing Portal — Dark',  theme: licensingDark },
};

// Drives the toolbar items array — consumed by preview.ts
export const themeToolbarItems = Object.entries(themeRegistry).map(
  ([value, { label }]) => ({ value, title: label }),
);
