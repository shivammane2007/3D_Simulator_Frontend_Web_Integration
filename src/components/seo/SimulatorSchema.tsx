// ---------------------------------------------------------------------------
// SimulatorSchema — server component
// Injects MedicalWebPage + SoftwareApplication JSON-LD into /simulate/* pages.
// Tells Google these are medical tool pages targeted at clinicians, and gives
// each simulator a procedure-specific semantic identity.
// ---------------------------------------------------------------------------

import { SIMULATOR_SCHEMA_MAP } from '@/data/simulator-schema-data';

interface SimulatorSchemaProps {
  procedureSlug: string;
  locale?: string;
}

export default function SimulatorSchema({ procedureSlug, locale = 'en' }: SimulatorSchemaProps) {
  const data = SIMULATOR_SCHEMA_MAP[procedureSlug];
  if (!data) return null;

  const baseUrl = 'https://www.faceifylabs.com';
  const pageUrl = locale === 'en'
    ? `${baseUrl}/simulate/${data.simulateSlug}`
    : `${baseUrl}/${locale}/simulate/${data.simulateSlug}`;

  const medicalWebPage = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${data.shortName} Simulator: AI Surgical Preview`,
    description: data.toolDescription,
    url: pageUrl,
    inLanguage: locale,
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Clinician',
      healthCondition: {
        '@type': 'MedicalCondition',
        name: data.procedureName,
      },
    },
    about: {
      '@type': 'MedicalProcedure',
      name: data.procedureName,
      description: data.description,
      bodyLocation: data.bodyLocation,
      medicalSpecialty: {
        '@type': 'MedicalSpecialty',
        name: data.medicalSpecialty,
      },
      procedureType: 'https://schema.org/SurgicalProcedure',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
    },
  };

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${data.shortName} Simulator by Faceify Labs`,
    applicationCategory: 'MedicalApplication',
    applicationSubCategory: 'Surgical Simulation',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires WebGL 2.0',
    url: pageUrl,
    description: data.toolDescription,
    featureList: [
      '468-point anatomical facial landmark mesh',
      'Real-time simulation, no server processing',
      'Zero patient data egress, 100% client-side',
      'No download or hardware required',
      'HIPAA-ready by design',
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      // COMPLIANCE KILL-SWITCH: patient price removed. This JSON-LD ships on
      // every simulator page and is crawled, so it is a public patient price
      // quote reachable while patient checkout is gated. Surgeon pricing stays.
      description: 'Plans start at $149/mo, cancel anytime.',
    },
    creator: {
      '@type': 'Organization',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
    </>
  );
}
