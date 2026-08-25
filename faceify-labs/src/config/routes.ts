/**
 * Faceify Labs — Route Registry
 * Single source of truth for all internal URLs.
 * Never scatter path strings throughout components.
 */

export const routes = {
  // Core
  home: '/',
  login: '/login',

  // Product
  simulate: '/simulate',
  simulateProcedure: (slug: string) => `/simulate/${slug}`,
  procedures: '/procedures',
  procedure: (slug: string) => `/procedures/${slug}`,
  technology: '/technology',

  // Audiences
  patients: '/for-patients',
  surgeons: '/for-surgeons',

  // Business
  pricing: '/pricing',
  partners: '/partners',
  foundingPartners: '/founding-partners',
  directory: '/directory',
  useCases: '/use-cases',
  consultation: '/consultation',

  // Content
  gallery: '/gallery',
  faq: '/faq',
  blog: '/blog',
  ourStory: '/our-story',

  // Trust
  trust: '/trust',
  privacy: '/privacy',
  terms: '/terms',
  refundPolicy: '/refund-policy',
  cancellationPolicy: '/cancellation-policy',
  grievanceOfficer: '/grievance-officer',

  // Leadership
  leadership: {
    virendraGhaisas: '/leadership/virendra-ghaisas',
  },

  // External
  external: {
    instagram: 'https://www.instagram.com/faceifylabs',
    linkedin: 'https://www.linkedin.com/company/faceifylabs',
    whatsapp: 'https://wa.me/66957519638',
    emailCeo: 'mailto:ceo@faceifylabs.com',
    emailPartners: 'mailto:partners@faceifylabs.com',
  },

  // Analyse
  analyse: '/analyse',
} as const;

export type Route = typeof routes;
