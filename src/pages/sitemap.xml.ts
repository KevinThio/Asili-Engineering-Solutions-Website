import type { APIRoute } from 'astro';
import { SITEMAP_PATHS } from '../data/seo';

// Built at deploy time. Needs the site address (Netlify's URL variable, see astro.config.mjs).
export const GET: APIRoute = ({ site }) => {
  const urls = site
    ? SITEMAP_PATHS.map(p => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n')
    : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
