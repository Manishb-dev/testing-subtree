import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

const ADDON_ID = 'bmi/framework-filter';
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Tonic',
    brandUrl: 'https://bmi.com',// clicking logo goes here
    brandImage: '/logo.png', 
    brandTarget: '_self',

    //app specific styles
    appBg: '#f7f9fa',  
  }),
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  enableShortcuts: false,   // ← this removes the settings/shortcuts icon
});

function createFrameworkFilter(framework: string) {
  return (item: any): boolean => {
      if (!framework || framework === 'all') return true;
    const title: string = item.title ?? '';
    const isMui = title.startsWith('MUI/');
    const isTamagui = title.startsWith('Tamagui/');
    // Non-framework stories (Getting Started, Foundations, Assets, Icons …) always visible
    if (!isMui && !isTamagui) return true;
    return framework === 'mui' ? isMui : isTamagui;
  };
}

addons.register(ADDON_ID, (api: any) => {
  // Apply the initial filter — default is MUI (matches initialGlobals in preview.ts)
  api.experimental_setFilter(ADDON_ID, createFrameworkFilter('mui'));

  // Re-apply whenever the framework global changes
  // GLOBALS_UPDATED = 'globalsUpdated' (actual channel event string, not the enum key)
  addons.getChannel().on(GLOBALS_UPDATED, ({ globals }: { globals: Record<string, string> }) => {
    const framework = globals?.framework ?? 'mui';
    api.experimental_setFilter(ADDON_ID, createFrameworkFilter(framework));
  });
});
