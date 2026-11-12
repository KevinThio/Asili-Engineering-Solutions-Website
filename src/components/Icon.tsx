import type { CSSProperties } from 'react';
import { ICONS, type IconName } from './icon-data';

export type { IconName };

export interface IconProps {
  /** Lucide icon name (kebab-case) or "whatsapp". Must be listed in scripts/icons.mjs. */
  name: IconName;
  size?: number;
  /** Any CSS colour; defaults to currentColor */
  color?: string;
  /** Accessible label; omit for decorative icons */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Port of the design system's Icon. The original fetched SVGs from a CDN at runtime;
 * here they are inlined at build time from src/components/icon-data.ts.
 */
export function Icon({ name, size = 20, color = 'currentColor', label, className, style }: IconProps) {
  const icon = ICONS[name];
  if (!icon) throw new Error(`Unknown icon "${name}". Add it to scripts/icons.mjs and run npm run icons.`);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${icon.size} ${icon.size}`}
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      className={['a-icon', className].filter(Boolean).join(' ')}
      style={{ color, ...style }}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
