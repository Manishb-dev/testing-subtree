import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import { themeRegistry, themeToolbarItems, type ThemeKey } from '../src/themes/registry';

const withTheme: Decorator = (Story, context) => {
  const framework = (context.globals['framework'] as string) ?? 'all';
  const themeKey = ((context.globals['theme'] as string) ?? 'tonic-light') as ThemeKey;
  const { theme: muiTheme } = themeRegistry[themeKey] ?? themeRegistry['tonic-light'];
  const tamaguiTheme = themeKey.endsWith('-dark') ? 'dark' : 'light';

  if (framework === 'mui') {
    return React.createElement(
      ThemeProvider,
      { theme: muiTheme },
      React.createElement(CssBaseline, null),
      React.createElement(Story as unknown as React.FC, null),
    );
  }

  if (framework === 'tamagui') {
    return React.createElement(
      TamaguiProvider,
      { config: tamaguiConfig, defaultTheme: tamaguiTheme },
      React.createElement(Story as unknown as React.FC, null),
    );
  }

  // 'all' — both providers stacked
  return React.createElement(
    ThemeProvider,
    { theme: muiTheme },
    React.createElement(CssBaseline, null),
    React.createElement(
      TamaguiProvider,
      { config: tamaguiConfig, defaultTheme: tamaguiTheme },
      React.createElement(Story as unknown as React.FC, null),
    ),
  );
};

const withI18n: Decorator = (Story, context) => {
  const locale = (context.globals['locale'] as string) || 'en';
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }
  return React.createElement(
    I18nextProvider,
    { i18n },
    React.createElement(Story as unknown as React.FC, null),
  );
};

const preview: Preview = {
  globalTypes: {
    framework: {
      description: 'Component framework',
      toolbar: {
        title: 'Framework',
        icon: 'component',
        items: [
          { value: 'all', title: 'All' }, 
          { value: 'mui', title: 'MUI' },
          { value: 'tamagui', title: 'Tamagui' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: themeToolbarItems,
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Locale for internationalization',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
        ],
        dynamicTitle: true,
      },
    },

  },
  initialGlobals: {
    theme: 'tonic-light',
    locale: 'en',
    framework: 'all',
  },
  decorators: [withI18n, withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Welcome', 'How to Use', 'Contribution Guide'],
          'Foundations',
          'Assets',
          'Components',
          ['Atoms', 'Shared', 'Patterns'],
          '*',
          'Icons',
        ],
      },
    },
  },
};

export default preview;