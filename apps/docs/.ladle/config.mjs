/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/stories/**/*.{stories.tsx,stories.mdx}',
  base: '/',
  port: 61000,
  viteConfig: 'vite.config.ts',
  addons: {
    // We ship our own theme/mode switcher via TweaksPanel — disable Ladle's built-in
    theme: { enabled: false },
    mode:  { enabled: false },
    width: {
      enabled: true,
      options: { Mobile: 390, Tablet: 768, Desktop: 1280 },
      defaultState: 1280,
    },
    a11y:    { enabled: true },
    control: { enabled: true },
    ladle:   { enabled: true },
    action:  { enabled: true },
    source:  { enabled: true },
  },
};
