import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

export type BadgeTone = 'farm' | 'home' | 'commercial' | 'digital' | 'neutral' | 'success';

const TONES: Record<BadgeTone, [IconName | null, string]> = {
  farm: ['sprout', 'Farm'],
  home: ['house', 'Home'],
  commercial: ['factory', 'Business'],
  digital: ['smartphone', 'Website & app'],
  neutral: [null, ''],
  success: ['circle-check', ''],
};

export interface BadgeProps {
  /** farm | home | commercial | digital map to the type of work; neutral/success for status */
  tone?: BadgeTone;
  /** Defaults to the tone's label */
  children?: ReactNode;
  /** Override icon; null hides it */
  icon?: IconName | null;
}

export function Badge({ tone = 'neutral', children, icon }: BadgeProps) {
  const [ic, def] = TONES[tone] ?? TONES.neutral;
  const i = icon === null ? null : icon || ic;
  return (
    <span className={`a-badge a-badge--${tone}`}>
      {i && <Icon name={i} size={15} />}{children ?? def}
    </span>
  );
}
