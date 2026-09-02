/**
 * Faceify Labs — Data Layer: Pricing
 * Source: https://faceifylabs.com/pricing
 * All pricing values are source-verified.
 */

export interface PricingFeature {
  name: string;
  starter: boolean | string;
  clinic: boolean | string;
  enterprise: boolean | string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  currency: string;
  highlight: boolean;
  ctaText: string;
  ctaHref: string;
  badge?: string;
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For solo practices and growing clinics.',
    monthlyPrice: 149,
    annualPrice: 119,
    currency: 'USD',
    highlight: false,
    ctaText: 'Start Free Trial',
    ctaHref: '/consultation',
    features: [
      '85+ procedure simulators',
      'Unlimited patient sessions',
      '468-point facial mesh',
      'Real-time parameter adjustment',
      'Before/after comparison',
      'Patient share links',
      'On-device processing',
      'Chrome, Safari, Firefox, Edge support',
      'Email support',
    ],
  },
  {
    id: 'clinic',
    name: 'Clinic',
    tagline: 'For multi-surgeon clinics and aesthetic centres.',
    monthlyPrice: 499,
    annualPrice: null,
    currency: 'USD',
    highlight: true,
    ctaText: 'Apply for Clinic Plan',
    ctaHref: '/consultation',
    badge: 'Most Popular',
    features: [
      'Everything in Starter',
      'Multiple surgeon seats',
      'Clinic branding',
      'Embedded simulator integration',
      'Advanced analytics dashboard',
      'Team management',
      'Priority WhatsApp support',
      'Onboarding session',
      'Clinical report export',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For hospital networks and enterprise deployments.',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    highlight: false,
    ctaText: 'Contact Us',
    ctaHref: '/consultation',
    features: [
      'Everything in Clinic',
      'Custom procedure configurations',
      'SSO / enterprise auth',
      'API access',
      'Dedicated support',
      'SLA guarantees',
      'Custom data agreements',
      'Multi-location deployment',
      'Training programme',
    ],
  },
];

export const foundingPartnerBenefits = [
  'Locked pricing at founding rates',
  'Direct input into product roadmap',
  'Early access to new procedures',
  'Priority onboarding and support',
  'Co-marketing opportunities',
  'Access to 3D Quest/AR preview (first cohort)',
];
