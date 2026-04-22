import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@bmi/tonic-theme-mui';
import { TamaguiProvider } from 'tamagui';
import { tamaguiConfig } from '../tamagui.config';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';

const withTheme: Decorator = (Story, context) => {
  const currentTheme = context.globals['theme'] === 'dark' ? darkTheme : lightTheme;
  return React.createElement(
    TamaguiProvider,
    { config: tamaguiConfig, defaultTheme: context.globals['theme'] === 'dark' ? 'dark' : 'light' },
    React.createElement(
      ThemeProvider,
      { theme: currentTheme },
      React.createElement(CssBaseline, null),
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
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'BMI Light' },
          { value: 'dark', icon: 'moon', title: 'BMI Dark' },
        ],
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
    theme: 'light',
    locale: 'en',
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