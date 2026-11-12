import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export interface EmptyStateProps {
  icon?: IconName;
  title?: string;
  children?: ReactNode;
  /** Buttons */
  action?: ReactNode;
  /** field (dashed, default), white card, or none */
  tone?: 'field' | 'white' | 'none';
  compact?: boolean;
}

/** Shown where a list has nothing yet, or failed to load. Always offers a next step. */
export function EmptyState({ icon = 'inbox', title, children, action, tone = 'field', compact = false }: EmptyStateProps) {
  const cls = ['a-empty', `a-empty--${tone}`, compact && 'a-empty--compact'].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <span className="a-empty__icon"><Icon name={icon} size={28} /></span>
      {title && <div className="a-empty__title">{title}</div>}
      {children && <div className="a-empty__text">{children}</div>}
      {action && <div className="a-empty__action">{action}</div>}
    </div>
  );
}
