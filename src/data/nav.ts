import type { NavLink } from '../components/SiteHeader';

/** The three screens, in the order the header and footer show them (labels from the mockup). */
export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About & Services', href: '/about' },
  { id: 'enquiry', label: 'Send an enquiry', href: '/enquiry' },
];

export type PageId = 'home' | 'about' | 'enquiry' | 'thanks';
