import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { faqs } from '@/data/faq';
import HeroSection from '@/components/sections/HeroSection';
import AudienceSplit from '@/components/sections/AudienceSplit';
import HowItWorks from '@/components/sections/HowItWorks';
import ProcedureExplorer from '@/components/sections/ProcedureExplorer';
import MetricsSection from '@/components/sections/MetricsSection';
import TechnologySection from '@/components/sections/TechnologySection';
import PrivacySection from '@/components/sections/PrivacySection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import PricingPreview from '@/components/sections/PricingPreview';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTA from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.faceifylabs.com/#organization',
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        description: siteConfig.description,
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.linkedin,
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Faceify Labs Surgical Simulator',
        operatingSystem: 'Any (Web Browser)',
        applicationCategory: 'HealthApplication',
        offers: {
          '@type': 'Offer',
          price: '149.00',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col w-full">
        <HeroSection />
        <AudienceSplit />
        <HowItWorks />
        <ProcedureExplorer />
        <MetricsSection />
        <TechnologySection />
        <PrivacySection />
        <ComparisonSection />
        <PricingPreview />
        <FAQSection />
        <FinalCTA />
      </div>
    </>
  );
}
