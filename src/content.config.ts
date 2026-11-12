// Content collections (Astro 7 reads this file; src/content/config.ts is no longer supported).
// Projects: one Markdown file per completed job in src/content/projects/, added by the owner
// through Decap CMS at /admin. Schema from AGENTS.md §5.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const PROJECT_TYPES = ['farm', 'home', 'commercial'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      /** Drives the badge: Farm / Home / Business */
      type: z.enum(PROJECT_TYPES),
      /** Town, county */
      location: z.string().min(1),
      /** One line on what was installed */
      description: z.string().min(1),
      /** ASILI's own job photo, in src/assets/projects/. Never stock. */
      photo: image().optional(),
      /** Used to pick the newest six */
      completed: z.coerce.date(),
    }),
});

export const collections = { projects };
