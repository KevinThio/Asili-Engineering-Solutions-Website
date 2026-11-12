import { getCollection, type CollectionEntry } from 'astro:content';
import { newest } from './newest';

export type Project = CollectionEntry<'projects'>;

/** The newest six completed projects, newest first. Empty when none have been added yet. */
export async function getNewestProjects(): Promise<Project[]> {
  return newest(await getCollection('projects'));
}
