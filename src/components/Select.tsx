import type { ChangeEventHandler } from 'react';
import { Field, fieldState, messageId } from './Field';
import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  hint?: string;
  error?: string;
  id: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  options?: Array<string | SelectOption>;
  placeholder?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export function Select({ label, hint, error, id, name, value, defaultValue, options = [], placeholder, required, onChange }: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} id={id}>
      <div className="a-select">
        <select id={id} name={name} value={value} defaultValue={value === undefined ? defaultValue ?? (placeholder ? '' : undefined) : undefined}
          required={required} onChange={onChange} className={['a-input', 'a-input--select', fieldState(error)].filter(Boolean).join(' ')}
          aria-invalid={error ? true : undefined} aria-describedby={error || hint ? messageId(id) : undefined}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o => typeof o === 'string'
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Icon name="chevron-down" size={20} color="var(--forest-900)" className="a-select__chevron" />
      </div>
    </Field>
  );
}
