import { Icon, type IconName } from './Icon';

export interface ServiceOption {
  value: string;
  label: string;
  sub?: string;
  icon: IconName;
}

export const SERVICES: ServiceOption[] = [
  { value: 'farm', label: 'Farm', sub: 'Solar pumps and irrigation', icon: 'sprout' },
  { value: 'home', label: 'Home', sub: 'Wiring and solar power', icon: 'house' },
  { value: 'commercial', label: 'Business', sub: 'Commercial or industrial', icon: 'factory' },
  { value: 'digital', label: 'Website or mobile app', sub: 'For your business', icon: 'smartphone' },
];

export interface ServicePickerProps {
  label?: string;
  /** Form field name; default "service" */
  name?: string;
  /** Used for the error message id */
  id?: string;
  /** Controlled value (needs a hydrated island) */
  value?: string;
  /** Initial value for a plain HTML form */
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  options?: ServiceOption[];
  /** 1 forces a single column */
  columns?: 1 | 2;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Large radio cards for choosing the service on the enquiry form.
 * The selected look comes from CSS (:has(:checked)), so it works without JavaScript.
 */
export function ServicePicker({
  label = 'What do you need help with?', name = 'service', id = 'service', value, defaultValue, onChange, error,
  options = SERVICES, columns = 2, required, disabled,
}: ServicePickerProps) {
  const controlled = value !== undefined;
  const msgId = `${id}-msg`;
  return (
    <fieldset disabled={disabled} className={['a-picker', error && 'a-picker--error', columns === 1 && 'a-picker--one'].filter(Boolean).join(' ')}
      aria-describedby={error ? msgId : undefined}>
      {label && <legend className="a-picker__legend">{label}</legend>}
      <div className="a-picker__grid">
        {options.map((o, i) => (
          <label key={o.value} className="a-picker__option">
            <input type="radio" name={name} value={o.value} required={required && i === 0}
              {...(controlled ? { checked: value === o.value, onChange: () => onChange?.(o.value) } : { defaultChecked: defaultValue === o.value })}
              aria-invalid={error ? true : undefined} className="a-picker__input" />
            <span className="a-picker__tile"><Icon name={o.icon} size={22} /></span>
            <span className="a-picker__text">
              <span className="a-picker__label">{o.label}</span>
              {o.sub && <span className="a-picker__sub">{o.sub}</span>}
            </span>
            <span className="a-picker__check"><Icon name="check" size={14} /></span>
          </label>
        ))}
      </div>
      <div id={msgId} className="a-field__msg a-field__msg--error" aria-live="polite" hidden={!error}>
        {error && <Icon name="circle-alert" size={16} />}{error}
      </div>
    </fieldset>
  );
}
