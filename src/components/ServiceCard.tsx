import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export interface ServiceCardProps {
  icon: IconName;
  title: string;
  children?: ReactNode;
  /** Short check-marked points */
  points?: string[];
  /** Makes the whole card a link. Without it the card is static (never a clickable div). */
  href?: string;
  linkLabel?: string;
}

export function ServiceCard({ icon, title, children, points = [], href, linkLabel = 'Ask about this' }: ServiceCardProps) {
  const clickable = !!href;
  const cls = ['a-service', clickable && 'a-service--clickable'].filter(Boolean).join(' ');
  const inner = (
    <>
      <span className="a-service__tile"><Icon name={icon} size={28} /></span>
      <h3 className="a-service__title">{title}</h3>
      {children && <p className="a-service__text">{children}</p>}
      {points.length > 0 && (
        <ul className="a-service__points">
          {points.map(p => (
            <li key={p}><Icon name="check" size={18} color="var(--success-700)" style={{ marginTop: 3 }} />{p}</li>
          ))}
        </ul>
      )}
      {clickable && (
        <span className="a-service__link">{linkLabel}<Icon name="arrow-right" size={18} className="a-service__arrow" /></span>
      )}
    </>
  );
  return href
    ? <a href={href} className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}
