import type { CSSProperties, ReactNode } from 'react';
import markUrl from '../assets/logo-mark.svg?url';
import { Icon } from './Icon';

export interface PhotoProps {
  src?: string;
  alt?: string;
  /** Pixel size of the source image, so the browser can reserve space */
  width?: number;
  height?: number;
  /** Below-the-fold photos load lazily (default) */
  loading?: 'lazy' | 'eager';
  /** Force a state; otherwise "ready" when there is a src or children, "empty" when not */
  status?: 'loading' | 'ready' | 'empty' | 'error';
  /** CSS aspect-ratio, default "4 / 3" */
  ratio?: string;
  radius?: string | number;
  /** Shown when there's no photo; defaults to the ASILI mark */
  markSrc?: string;
  /** Caption under the mark in the empty state */
  emptyLabel?: string;
  /** Custom fill (e.g. an Astro <Image>); shown when status is ready/unset */
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * Fixed-ratio photo frame. Reserves its space on slow data so the page never jumps.
 * Static port: the design system faded the photo in with JavaScript; here it renders directly.
 */
export function Photo({
  src, alt = '', width, height, loading = 'lazy', status, ratio = '4 / 3', radius = 'var(--radius-lg)',
  markSrc = markUrl, emptyLabel, children, style,
}: PhotoProps) {
  const s = status ?? (children || src ? 'ready' : 'empty');
  return (
    <div className="a-photo" style={{ aspectRatio: ratio, borderRadius: radius, ...style }}>
      {s === 'ready' && children && <div className="a-photo__fill">{children}</div>}
      {s === 'ready' && !children && src && (
        <img className="a-photo__img" src={src} alt={alt} width={width} height={height} loading={loading} decoding="async" />
      )}
      {s === 'loading' && (
        <div className="a-photo__center"><Icon name="loader-circle" size={26} color="var(--ink-300)" className="a-spin" /></div>
      )}
      {s === 'empty' && (
        <div className="a-photo__center">
          <img src={markSrc} alt="" className="a-photo__mark" />
          {emptyLabel && <span className="a-photo__label">{emptyLabel}</span>}
        </div>
      )}
      {s === 'error' && (
        <div className="a-photo__center">
          <Icon name="image-off" size={28} color="var(--ink-500)" />
          <span className="a-photo__label">Photo didn't load</span>
        </div>
      )}
    </div>
  );
}
