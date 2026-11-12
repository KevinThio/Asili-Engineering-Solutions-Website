import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { Field, fieldState, messageId } from './Field';

export interface TextAreaProps {
  label?: string;
  hint?: string;
  error?: string;
  warning?: string;
  id: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export function TextArea({ label, hint, error, warning, id, rows = 4, ...rest }: TextAreaProps) {
  return (
    <Field label={label} hint={hint} error={error} warning={warning} id={id}>
      <textarea id={id} rows={rows} {...rest} className={['a-input', 'a-input--area', fieldState(error, warning)].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined} aria-describedby={error || warning || hint ? messageId(id) : undefined} />
    </Field>
  );
}
