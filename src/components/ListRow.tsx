import type { MouseEventHandler, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export interface ListRowProps {
  icon?: IconName;
  /** forest tile + sun glyph (default), success tile, field tile, or bare green glyph */
  iconTone?: 'forest' | 'success' | 'field' | 'none';
  title: ReactNode;
  /** Second line, muted */
  meta?: ReactNode;
  /** Makes the row a link (tel:, mailto:, wa.me) with a chevron */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Replaces the chevron */
  trailing?: ReactNode;
  /** Bottom hairline, default true */
  divider?: boolean;
  /** White text for forest backgrounds */
  onBrand?: boolean;
}

export function ListRow({ icon, iconTone = 'forest', title, meta, href, onClick, trailing, divider = true, onBrand = false }: ListRowProps) {
  const clickable = !!(href || onClick);
  const cls = ['a-listrow', clickable && 'a-listrow--clickable', divider && 'a-listrow--divider', onBrand && 'a-listrow--onbrand'].filter(Boolean).join(' ');
  const inner = (
    <>
      {icon && (iconTone === 'none'
        ? <Icon name={icon} size={22} color="var(--success-700)" />
        : <span className={`a-listrow__tile a-listrow__tile--${iconTone}`}><Icon name={icon} size={22} /></span>)}
      <span className="a-listrow__text">
        <span className="a-listrow__title">{title}</span>
        {meta && <span className="a-listrow__meta">{meta}</span>}
      </span>
      {trailing ?? (clickable && <Icon name="chevron-right" size={22} className="a-listrow__chevron" />)}
    </>
  );
  if (href) return <a href={href} onClick={onClick} className={cls}>{inner}</a>;
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
  return <div className={cls}>{inner}</div>;
}
