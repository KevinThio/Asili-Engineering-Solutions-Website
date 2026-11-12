import type { ReactNode } from 'react';
import { Icon } from './Icon';

/** Shared label + message wrapper for TextField, TextArea and Select (internal to the design system). */
export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  warning?: string;
  id: string;
  children: ReactNode;
}

/** id of the message line, for aria-describedby on the control */
export const messageId = (id: string) => `${id}-msg`;

export function fieldState(error?: string, warning?: string) {
  return error ? 'a-input--error' : warning ? 'a-input--warning' : '';
}

export function Field({ label, hint, error, warning, id, children }: FieldProps) {
  const msg = error || warning || hint;
  const tone = error ? 'error' : warning ? 'warning' : 'hint';
  return (
    <div className="a-field">
      {label && <label htmlFor={id} className="a-field__label">{label}</label>}
      {children}
      {/* Always present so screen readers announce a message when it appears */}
      <div id={messageId(id)} className={`a-field__msg a-field__msg--${tone}`} aria-live="polite" hidden={!msg}>
        {error && <Icon name="circle-alert" size={16} />}
        {!error && warning && <Icon name="triangle-alert" size={16} />}
        {msg}
      </div>
    </div>
  );
}
