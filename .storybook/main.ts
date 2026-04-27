/// <reference types="node" />
import type { StorybookConfig } from '@storybook/react-vite';
import type { InlineConfig } from 'vite';
import { dirname, resolve } from "path"

import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    // getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        controls: true,
        docs: true,
        viewport: true,
        backgrounds: true,
        toolbars: true,
        test: false,
      },
    },
  ],
  features: {
    sidebarOnboardingChecklist: false,   // hide the gear/checklist icon in the sidebar header
  },
  managerHead: (head) => `${head}
    <style>
      /* Hide the built-in vitest testing module (Run tests button) from the sidebar */
      #sidebar-bottom-wrapper { display: none !important; }
      /* Hide the settings/gear icon button in the sidebar header */
      button[aria-label="Settings"] { display: none !important; }
    </style>
  `,
  "framework": getAbsolutePath('@storybook/react-vite'),
  async viteFinal(config): Promise<InlineConfig> {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      define: {
        // react-native-web and Tamagui reference process.env.NODE_ENV at runtime
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
      },
      resolve: {
        alias: {
          // Required for Tamagui on web: redirect react-native imports to react-native-web
          'react-native': 'react-native-web',
          // Resolve workspace packages from source so no build step is needed in dev.
          '@bmi/tonic-components-licensing': resolve(__dirname, '../../components-licensing/src/index.ts'),
          '@bmi/tonic-components-mui': resolve(__dirname, '../../components-mui/src/index.ts'),
          '@bmi/tonic-components-tamagui': resolve(__dirname, '../../components-tamagui/src/index.ts'),
          '@bmi/tonic-icons-web': resolve(__dirname, '../../icons-web/src/index.ts'),
          '@bmi/tonic-theme-mui': resolve(__dirname, '../../theme-mui/src/index.ts'),
          '@bmi/tonic-theme': resolve(__dirname, '../../theme-core/src/index.ts'),
          '@bmi/tonic-components': resolve(__dirname, '../../components-core/src/index.ts'),
        },
      },
    });
  },
};
export default config;