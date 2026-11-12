// The ONLY place phone numbers, WhatsApp, email, branches and licences live.
// Every page and component reads them from here.

export interface Contact {
  name: string;
  role?: string;
  /** Shown on the page */
  phone: string;
  /** E.164, for tel: links */
  tel: string;
}

export const site = {
  name: 'ASILI Engineering Solutions Limited',
  shortName: 'ASILI Engineering Solutions',
  tagline: 'Sized right. Tested before we leave.',
  registration: 'EPRA-licensed · EBK-certified engineers',

  /** Main number for Call buttons */
  tel: '+254792961341',
  /** wa.me digits only */
  whatsapp: '254792961341',
  whatsappLabel: '+254 792 961 341',
  email: 'asiliengineering@gmail.com',

  branches: ['Nairobi', 'Nakuru', 'Eldoret'],
  /** Main branch (the Nakuru branch, in Gilgil). No street address yet: only what we know. */
  mainBranch: { town: 'Gilgil', county: 'Nakuru County', countryCode: 'KE', country: 'Kenya' },

  contacts: [
    { name: 'Eng. Kevin Maina', role: 'Director', phone: '+254 792 961 341', tel: '+254792961341' },
    { name: 'Eng. Dan Mirimu', role: 'Director', phone: '+254 719 580 090', tel: '+254719580090' },
    { name: 'Eng. Emmanuel Kiprotich', role: 'Director', phone: '+254 799 864 284', tel: '+254799864284' },
  ] satisfies Contact[],
} as const;

export const telHref = (tel: string = site.tel) => `tel:${tel}`;
export const whatsappHref = (digits: string = site.whatsapp) => `https://wa.me/${digits}`;
