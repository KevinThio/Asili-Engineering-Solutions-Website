import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { Field, fieldState, messageId } from './Field';

export interface TextFieldProps {
  label?: string;
  hint?: string;
  /** "Something is missing" (red) */
  error?: string;
  /** "Check this field" (amber) */
  warning?: string;
  id: string;
  /** Form field name (what Netlify stores) */
  name?: string;
  type?: 'text' | 'tel' | 'email';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  inputMode?: 'text' | 'tel' | 'numeric' | 'email';
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Use to show errors only after the visitor leaves the field */
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

export function TextField({ label, hint, error, warning, id, type = 'text', ...rest }: TextFieldProps) {
  return (
    <Field label={label} hint={hint} error={error} warning={warning} id={id}>
      <input id={id} type={type} {...rest} className={['a-input', fieldState(error, warning)].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined} aria-describedby={error || warning || hint ? messageId(id) : undefined} />
    </Field>
  );
}
