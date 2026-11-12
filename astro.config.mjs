// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

/** Adds /styleguide (every design system component) to `npm run dev` only. It is never built or deployed. */
const devStyleguide = {
  name: 'asili-dev-styleguide',
  hooks: {
    /** @param {{ command: string, injectRoute: (route: { pattern: string, entrypoint: string }) => void }} options */
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') injectRoute({ pattern: '/styleguide', entrypoint: './src/styleguide/index.astro' });
    },
  },
};

export default defineConfig({
  integrations: [react(), devStyleguide],
});
