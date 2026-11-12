import logoUrl from '../assets/logo.svg?url';
import { Button } from './Button';
import { Icon } from './Icon';

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface SiteHeaderProps {
  logoSrc?: string;
  links?: NavLink[];
  /** id of the current page's link */
  current?: string;
  /** E.164 phone for tel: links */
  tel: string;
  /** wa.me number, digits only */
  whatsapp: string;
  /**
   * true = always the phone layout (menu button); false = always desktop;
   * "auto" (default) switches with screen width in CSS.
   */
  compact?: boolean | 'auto';
}

/**
 * Sticky white header: logo (always on light) left; menu button (phone) or inline links + Call/WhatsApp (desktop) right.
 * Static port: the menu is a <details> element, so it opens without JavaScript.
 */
export function SiteHeader({ logoSrc = logoUrl, links = [], current, tel, whatsapp, compact = 'auto' }: SiteHeaderProps) {
  const mode = compact === 'auto' ? 'auto' : compact ? 'compact' : 'wide';
  return (
    <header className={`a-header a-header--${mode}`}>
      <div className="a-header__bar">
        <a href="/" className="a-header__logo">
          <img src={logoSrc} alt="ASILI Engineering Solutions Limited, home" width={97} height={62} />
        </a>
        <nav className="a-header__nav" aria-label="Main">
          {links.map(l => (
            <a key={l.id} href={l.href} aria-current={current === l.id ? 'page' : undefined} className="a-header__link">{l.label}</a>
          ))}
        </nav>
        <div className="a-header__actions">
          <Button variant="ghost" size="sm" iconLeft="phone" href={'tel:' + tel}>Call</Button>
          <Button variant="outline" size="sm" iconLeft="whatsapp" href={'https://wa.me/' + whatsapp}>WhatsApp</Button>
        </div>
        <details className="a-header__menu">
          <summary className="a-iconbtn a-iconbtn--outline a-header__toggle" aria-label="Menu">
            <Icon name="menu" size={22} className="a-header__open" />
            <Icon name="x" size={22} className="a-header__close" />
          </summary>
          <nav className="a-header__drop" aria-label="Main">
            {links.map(l => (
              <a key={l.id} href={l.href} aria-current={current === l.id ? 'page' : undefined} className="a-header__droplink">
                {l.label}<Icon name="chevron-right" size={22} />
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
