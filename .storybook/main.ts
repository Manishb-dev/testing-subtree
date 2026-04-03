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
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
  ],
  "framework": getAbsolutePath('@storybook/react-vite'),
  async viteFinal(config): Promise<InlineConfig> {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          // Resolve workspace packages from source so no build step is needed in dev.
          '@bmi/mui-tonic-components': resolve(__dirname, '../../components/src/index.ts'),
          '@bmi/mui-tonic-icons': resolve(__dirname, '../../icons/src/index.ts'),
          '@bmi/mui-tonic-theme': resolve(__dirname, '../../theme/src/index.ts'),
        },
      },
    });
  },
};
export default config;