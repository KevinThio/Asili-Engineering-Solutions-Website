import type { ReactNode } from 'react';
import markUrl from '../assets/logo-mark.svg?url';
import { Badge } from './Badge';

export interface ProjectCardProps {
  /** Same-sized skeleton while data loads */
  loading?: boolean;
  /** Real ASILI job photo URL (never stock) */
  photo?: string;
  photoWidth?: number;
  photoHeight?: number;
  /** Custom node filling the 4:3 photo area (e.g. an Astro <Image>); overrides photo */
  media?: ReactNode;
  title?: string;
  /** Badge reads Farm / Home / Business */
  type?: 'farm' | 'home' | 'commercial';
  location?: string;
  /** One line on what was installed */
  description?: string;
  /** Fixed width for horizontal strips, e.g. 300 */
  width?: number | string;
  markSrc?: string;
  /** Text under the mark when there is no photo (AGENTS.md §5) */
  emptyLabel?: string;
}

export function ProjectCard({
  loading, photo, photoWidth, photoHeight, media, title, type = 'farm', location, description, width,
  markSrc = markUrl, emptyLabel = 'No photos uploaded yet',
}: ProjectCardProps) {
  const sizing = { width, flex: width ? 'none' : undefined };
  if (loading) {
    return (
      <article aria-busy="true" className="a-project a-project--loading" style={sizing}>
        <div className="a-project__media" />
        <div className="a-project__skeleton">
          <span style={{ width: '40%', height: 12 }} /><span style={{ width: '75%', height: 22 }} />
          <span style={{ width: '90%', height: 14 }} /><span style={{ width: '60%', height: 14 }} />
        </div>
      </article>
    );
  }
  return (
    <article className="a-project" style={sizing}>
      <div className="a-project__media">
        {media && <div className="a-project__fill">{media}</div>}
        {!media && photo && (
          <img src={photo} alt={title} width={photoWidth} height={photoHeight} loading="lazy" decoding="async" className="a-project__img" />
        )}
        {!media && !photo && (
          <div className="a-project__empty">
            <img src={markSrc} alt="" className="a-project__mark" />
            {emptyLabel && <span className="a-project__empty-label">{emptyLabel}</span>}
          </div>
        )}
        <span className="a-project__badge"><Badge tone={type} /></span>
      </div>
      <div className="a-project__body">
        {location && <div className="a-project__location">{location}</div>}
        <h3 className="a-project__title">{title}</h3>
        {description && <p className="a-project__desc">{description}</p>}
      </div>
    </article>
  );
}
