// Enquiry form rules (AGENTS.md §5) and wording (AGENTS.md §7). Shared by the page and its script.

export const FORM_NAME = 'enquiry';
export const SERVICES = ['farm', 'home', 'commercial', 'digital'] as const;
export const MIN_PHONE_DIGITS = 9;

/** HTML pattern: at least 9 digits, spaces, dashes, brackets or a leading + allowed (no-JavaScript check). */
export const PHONE_PATTERN = `[^0-9]*([0-9][^0-9]*){${MIN_PHONE_DIGITS},}`;

export const MESSAGES = {
  service: 'Something is missing: choose a service',
  name: 'Something is missing: your name',
  phone: 'Check this field: enter a full phone number',
  problem: 'Something is missing: tell us a little about it',
} as const;

export type EnquiryField = keyof typeof MESSAGES;

export interface EnquiryValues {
  service: string;
  name: string;
  phone: string;
  problem: string;
}

/** Returns the fields that need fixing, in form order. Empty when the enquiry can be sent. */
export function validateEnquiry(v: EnquiryValues): EnquiryField[] {
  const bad: EnquiryField[] = [];
  if (!(SERVICES as readonly string[]).includes(v.service)) bad.push('service');
  if (!v.name.trim()) bad.push('name');
  if (v.phone.replace(/\D/g, '').length < MIN_PHONE_DIGITS) bad.push('phone');
  if (!v.problem.trim()) bad.push('problem');
  return bad;
}
