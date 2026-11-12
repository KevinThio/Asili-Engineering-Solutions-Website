import { site } from './site';

/** Pages listed in the sitemap (thanks, 404 and /admin are left out on purpose). */
export const SITEMAP_PATHS = ['/', '/about', '/enquiry'];

/**
 * schema.org structured data for Google: ASILI as a local business (an electrician), main branch
 * in Gilgil, serving Nairobi, Nakuru and Eldoret. Only facts we have; no street address or hours.
 */
export function localBusiness(siteUrl: URL | undefined, logoUrl: string | undefined) {
  const url = siteUrl?.href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: site.name,
    ...(url && { url, '@id': `${url}#business` }),
    ...(logoUrl && { logo: logoUrl, image: logoUrl }),
    description: 'Licensed electrical engineers. Solar irrigation pumps, home wiring and solar, and commercial and industrial installations: sized, protected, tested and commissioned.',
    telephone: site.tel,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.mainBranch.town,
      addressRegion: site.mainBranch.county,
      addressCountry: site.mainBranch.countryCode,
    },
    areaServed: site.branches.map(name => ({ '@type': 'City', name })),
    department: site.branches.map(name => ({
      '@type': 'Electrician',
      name: `${site.shortName}, ${name}`,
      telephone: site.tel,
      address: { '@type': 'PostalAddress', addressLocality: name, addressCountry: site.mainBranch.countryCode },
    })),
    contactPoint: site.contacts.map(c => ({
      '@type': 'ContactPoint',
      contactType: 'customer service',
      name: c.name,
      telephone: c.tel,
      areaServed: 'KE',
      availableLanguage: ['en', 'sw'],
    })),
    sameAs: [`https://wa.me/${site.whatsapp}`],
  };
}
