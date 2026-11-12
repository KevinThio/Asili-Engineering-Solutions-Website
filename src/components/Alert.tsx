import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

const ICONS: Record<NonNullable<AlertProps['tone']>, IconName> = {
  success: 'circle-check',
  warning: 'triangle-alert',
  error: 'circle-alert',
  info: 'info',
};

export interface AlertProps {
  /** success = "We received your enquiry"; warning = "Check this field"; error = "Something is missing" */
  tone?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  children?: ReactNode;
  action?: ReactNode;
  id?: string;
}

export function Alert({ tone = 'info', title, children, action, id }: AlertProps) {
  return (
    <div id={id} role={tone === 'error' ? 'alert' : 'status'} className={`a-alert a-alert--${tone}`}>
      <Icon name={ICONS[tone] ?? 'info'} size={24} className="a-alert__icon" />
      <div className="a-alert__body">
        {title && <div className="a-alert__title">{title}</div>}
        {children && <div className="a-alert__text">{children}</div>}
        {action && <div className="a-alert__action">{action}</div>}
      </div>
    </div>
  );
}
