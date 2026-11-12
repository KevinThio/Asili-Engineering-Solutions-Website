/** Number of completed projects About & Services shows (spec: "the newest six"). */
export const PROJECTS_SHOWN = 6;

/**
 * Newest first by completion date; ties keep a stable order by title.
 * Pure, so it can be tested without Astro.
 */
export function newest<T extends { data: { completed: Date; title: string } }>(items: readonly T[], count = PROJECTS_SHOWN): T[] {
  return [...items]
    .sort((a, b) => b.data.completed.getTime() - a.data.completed.getTime() || a.data.title.localeCompare(b.data.title))
    .slice(0, count);
}
