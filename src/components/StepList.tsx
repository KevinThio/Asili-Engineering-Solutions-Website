import { Icon, type IconName } from './Icon';

export interface Step {
  title: string;
  icon?: IconName;
  text?: string;
}

export const ASILI_STEPS: Step[] = [
  { title: 'Design', icon: 'ruler', text: 'We visit, measure your needs and calculate the right system.' },
  { title: 'Install', icon: 'wrench', text: 'We install with quality parts and proper protection.' },
  { title: 'Test', icon: 'gauge', text: 'We test every circuit.' },
  { title: 'Commission', icon: 'clipboard-check', text: 'We switch it on with you, show you how it works, and hand it over.' },
];

export interface StepListProps {
  steps?: Step[];
  /** White/sun styling for forest backgrounds */
  onBrand?: boolean;
  direction?: 'row' | 'column';
}

export function StepList({ steps = ASILI_STEPS, onBrand = false, direction = 'row' }: StepListProps) {
  const cls = ['a-steps', `a-steps--${direction}`, onBrand && 'a-steps--onbrand'].filter(Boolean).join(' ');
  return (
    <ol className={cls}>
      {steps.map((s, i) => (
        <li key={s.title} className="a-steps__item">
          <div className="a-steps__head">
            <span className="a-steps__num" aria-hidden="true">{i + 1}</span>
            <span className="a-steps__title">{s.title}{s.icon && <Icon name={s.icon} size={20} className="a-steps__icon" />}</span>
          </div>
          {s.text && <p className="a-steps__text">{s.text}</p>}
        </li>
      ))}
    </ol>
  );
}
