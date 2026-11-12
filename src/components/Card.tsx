import type { CSSProperties, ElementType, ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  /** px or any CSS length; default 24 */
  padding?: number | string;
  elevated?: boolean;
  /** white (default), field (sunken), brand (forest) */
  tone?: 'white' | 'field' | 'brand';
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, padding = 24, elevated = false, tone = 'white', as: Tag = 'div', className, style }: CardProps) {
  const cls = ['a-card', `a-card--${tone}`, elevated && 'a-card--elevated', className].filter(Boolean).join(' ');
  return <Tag className={cls} style={{ padding, ...style }}>{children}</Tag>;
}
