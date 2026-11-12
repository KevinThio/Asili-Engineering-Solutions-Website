import { Icon } from './Icon';

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterContact {
  name: string;
  role?: string;
  /** Displayed number */
  phone: string;
  /** E.164 for tel: */
  tel: string;
}

export interface SiteFooterProps {
  /** Phone contacts, from src/data/site.ts */
  contacts: readonly FooterContact[];
  whatsappLabel: string;
  /** wa.me digits */
  whatsapp: string;
  email: string;
  location: string;
  /** Licence / registration line */
  registration?: string;
  tagline?: string;
  links?: FooterLink[];
}

export function SiteFooter({ contacts, whatsappLabel, whatsapp, email, location, registration, tagline = 'Sized right. Tested before we leave.', links = [] }: SiteFooterProps) {
  return (
    <footer className="a-footer">
      <div className="a-footer__grid">
        <div className="a-footer__col">
          <div className="a-footer__name">ASILI Engineering Solutions Limited</div>
          {tagline && <p>{tagline}</p>}
          {registration && <p>{registration}</p>}
          <span className="a-footer__row a-footer__row--top"><Icon name="map-pin" size={18} color="var(--sun-500)" />{location}</span>
        </div>
        <div className="a-footer__col">
          {contacts.map(c => (
            <a key={c.tel} href={'tel:' + c.tel} className="a-footer__row a-footer__row--start">
              <Icon name="phone" size={18} color="var(--sun-500)" style={{ marginTop: 3 }} />
              <span className="a-footer__contact">
                <span>{c.phone}</span>
                <span className="a-footer__who">{c.name}{c.role ? ', ' + c.role : ''}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="a-footer__col a-footer__col--tight">
          <a href={'https://wa.me/' + whatsapp} className="a-footer__row"><Icon name="whatsapp" size={18} color="var(--sun-500)" />WhatsApp {whatsappLabel}</a>
          <a href={'mailto:' + email} className="a-footer__row"><Icon name="mail" size={18} color="var(--sun-500)" />{email}</a>
          {links.length > 0 && (
            <nav className="a-footer__links" aria-label="Footer">
              {links.map(l => <a key={l.id} href={l.href} className="a-footer__row a-footer__link">{l.label}</a>)}
            </nav>
          )}
        </div>
      </div>
      <div className="a-footer__base">© ASILI Engineering Solutions Limited</div>
    </footer>
  );
}
