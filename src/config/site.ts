/**
 * Faceify Labs — Site Configuration
 * Global site metadata and company information.
 */

export const siteConfig = {
  name: 'Faceify Labs',
  tagline: 'AI Surgical Simulation for Plastic Surgeons',
  description:
    'Preview rhinoplasty, facelift, fillers & 85+ cosmetic procedures with AI simulation. Real-time simulations run in your browser.',
  url: 'https://www.faceifylabs.com',

  // Company
  legalName: 'Formir Technologies Private Limited',
  operatingAs: 'Faceify Labs',
  foundedYear: 2024,
  copyright: `© ${new Date().getFullYear()} Faceify Labs. All rights reserved.`,

  // Contact
  email: {
    ceo: 'ceo@faceifylabs.com',
    partners: 'partners@faceifylabs.com',
  },
  whatsapp: '+66 957 519 638',
  whatsappUrl: 'https://wa.me/66957519638',

  // Social
  social: {
    instagram: 'https://www.instagram.com/faceifylabs',
    linkedin: 'https://www.linkedin.com/company/faceifylabs',
  },

  // Product claims (source-verified)
  stats: {
    procedures: '85+',
    landmarks: '468',
    meshTriangles: '934',
    rmsd: '0.04mm',
    latency: '<200ms',
  },

  // Business metrics (labeled as early clinical adoption data)
  metrics: {
    consultTimeReduction: '40%',
    conversionConfidence: '2×',
    feeIncrease: '15–20%',
  },

  // Pricing (source-verified)
  pricing: {
    starterMonthly: 149,
    starterAnnual: 119,
    clinicMonthly: 499,
  },

  // Compliance (exact source wording)
  compliance: {
    statement:
      'Privacy-first architecture: real-time simulation runs on-device, with JWT session auth and data-protection practices informed by GDPR, PDPA, and PIPA.',
    frameworks: ['GDPR', 'Thailand PDPA', 'South Korea PIPA', 'Singapore PDPA', 'India DPDPA'],
    medicalDisclaimer:
      'Faceify is a visualisation tool, not a diagnostic device. Results are illustrative.',
    notMedicalDevice: true,
    noTraining: 'We never use your photo to train any model.',
  },

  // Awards
  awards: ['NVIDIA Inception Program Member'],

  // SEO
  ogImage: '/opengraph-image.png',
  locale: 'en',
  locales: ['en', 'th', 'ko', 'pt', 'ja'],
} as const;
