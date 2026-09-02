/**
 * Faceify Labs — Data Layer: Navigation
 * Central navigation structure — never hardcoded in components.
 */

import { routes } from '@/config/routes';

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavDropdown {
  label: string;
  items: NavItem[];
}

export type NavEntry = NavItem | (NavDropdown & { isDropdown: true });

export const mainNav: NavEntry[] = [
  {
    label: 'For Surgeons',
    isDropdown: true,
    items: [
      {
        label: 'Overview',
        href: routes.surgeons,
        description: 'How Faceify fits your clinical workflow',
      },
      {
        label: 'Use Cases',
        href: routes.useCases,
        description: 'How clinics use Faceify',
      },
      {
        label: 'Pricing',
        href: routes.pricing,
        description: 'Plans for solo and multi-surgeon practices',
      },
      {
        label: 'Partner Program',
        href: routes.partners,
        description: 'Become a founding partner',
      },
    ],
  },
  {
    label: 'For Patients',
    href: routes.patients,
  },
  {
    label: 'Procedures',
    href: routes.procedures,
  },
  {
    label: 'Technology',
    href: routes.technology,
  },
  {
    label: 'About',
    isDropdown: true,
    items: [
      {
        label: 'Our Story',
        href: routes.ourStory,
        description: 'Why Faceify was built',
      },
      {
        label: 'Trust & Privacy',
        href: routes.trust,
        description: 'Our privacy architecture',
      },
      {
        label: 'Surgeon Directory',
        href: routes.directory,
        description: 'Find Faceify-enabled clinics',
      },
    ],
  },
];

export const footerNav = {
  product: [
    { label: 'All Procedures', href: routes.procedures },
    { label: 'AI Simulator', href: routes.simulate },
    { label: 'Technology', href: routes.technology },
    { label: 'Pricing', href: routes.pricing },
    { label: 'Surgeon Registry', href: routes.directory },
    { label: 'Use Cases', href: routes.useCases },
  ],
  explore: [
    { label: 'Rhinoplasty', href: routes.procedure('rhinoplasty') },
    { label: 'Blepharoplasty', href: routes.procedure('blepharoplasty') },
    { label: 'Facelift', href: routes.procedure('facelift') },
    { label: 'Case Gallery', href: routes.gallery },
    { label: 'FAQ', href: routes.faq },
    { label: 'Consultation', href: routes.consultation },
  ],
  company: [
    { label: 'Our Story', href: routes.ourStory },
    { label: 'Trust & Privacy', href: routes.trust },
    { label: 'Partner Program', href: routes.partners },
    { label: 'Executive Director', href: routes.leadership.virendraGhaisas },
    { label: 'Blog', href: routes.blog },
  ],
  support: [
    { label: 'WhatsApp Priority', href: routes.external.whatsapp, external: true },
    { label: 'ceo@faceifylabs.com', href: routes.external.emailCeo },
    { label: 'partners@faceifylabs.com', href: routes.external.emailPartners },
  ],
  legal: [
    { label: 'Privacy Policy', href: routes.privacy },
    { label: 'Terms of Service', href: routes.terms },
    { label: 'Refund Policy', href: routes.refundPolicy },
    { label: 'Cancellation Policy', href: routes.cancellationPolicy },
    { label: 'Grievance Officer', href: routes.grievanceOfficer },
  ],
};
