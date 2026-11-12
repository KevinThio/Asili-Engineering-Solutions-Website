import type { CSSProperties, MouseEventHandler } from 'react';
import { Icon, type IconName } from './Icon';

export interface IconButtonProps {
  icon: IconName;
  /** Required accessible label */
  label: string;
  variant?: 'outline' | 'secondary' | 'ghost' | 'whatsapp';
  /** Square size in px, min 44 */
  size?: number;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  style?: CSSProperties;
}

export function IconButton({ icon, label, variant = 'outline', size = 48, href, onClick, className, style }: IconButtonProps) {
  const cls = ['a-iconbtn', `a-iconbtn--${variant}`, className].filter(Boolean).join(' ');
  const s = { width: size, height: size, ...style };
  const glyph = <Icon name={icon} size={Math.round(size * 0.46)} />;
  return href
    ? <a href={href} aria-label={label} title={label} onClick={onClick} className={cls} style={s}>{glyph}</a>
    : <button type="button" aria-label={label} title={label} onClick={onClick} className={cls} style={s}>{glyph}</button>;
}
