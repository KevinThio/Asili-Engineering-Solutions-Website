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
  // The live address, for canonical links, the sitemap and link previews. Netlify sets URL on every
  // build (the netlify.app address now, the custom domain once it is added). Unset locally.
  site: process.env.URL || undefined,
  integrations: [react(), devStyleguide],
  security: {
    // Content Security Policy as a <meta> tag on every page. Astro hashes its own inline scripts and
    // styles; style="" attributes are allowed because the design system components use them.
    // /admin (Decap) is a plain file in public/ and is not covered.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
});
