import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export interface ButtonProps {
  children?: ReactNode;
  /** primary = sun (ONE per screen); secondary = forest; outline; ghost; onBrand = white outline on forest */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'onBrand';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: IconName;
  iconRight?: IconName;
  fullWidth?: boolean;
  /** Renders an <a> when set (e.g. "tel:", "https://wa.me/…", "/enquiry") */
  href?: string;
  disabled?: boolean;
  /** Shows a spinner and locks the button */
  loading?: boolean;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
  style?: CSSProperties;
}

const ICON_SIZE = { sm: 18, md: 20, lg: 22 } as const;

export function Button({
  children, variant = 'primary', size = 'md', iconLeft, iconRight, fullWidth, href,
  disabled: disabledProp, loading, type = 'button', onClick, className, style,
}: ButtonProps) {
  const disabled = disabledProp || loading;
  const cls = ['a-btn', `a-btn--${variant}`, `a-btn--${size}`, fullWidth && 'a-btn--full', className].filter(Boolean).join(' ');
  const ic = ICON_SIZE[size];
  const content = (
    <>
      {loading && <Icon name="loader-circle" size={ic} className="a-spin" />}
      {!loading && iconLeft && <Icon name={iconLeft} size={ic} />}
      {children}
      {!loading && iconRight && <Icon name={iconRight} size={ic} />}
    </>
  );
  if (href) {
    return (
      <a href={disabled ? undefined : href} aria-disabled={disabled || undefined} aria-busy={loading || undefined}
        onClick={disabled ? undefined : onClick} className={cls} style={style}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} aria-busy={loading || undefined} onClick={disabled ? undefined : onClick}
      className={cls} style={style}>
      {content}
    </button>
  );
}
