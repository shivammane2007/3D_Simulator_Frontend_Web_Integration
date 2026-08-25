import { Metadata } from 'next';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Faceify Labs',
  description:
    'Comprehensive privacy policy covering on-device data processing, GDPR/PDPA alignment, and zero-training commitments.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-8 pb-20">
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Legal &amp; Privacy</Eyebrow>
            <Heading level="h1" size="display">
              Privacy Policy.
            </Heading>
            <Prose size="lg">
              Effective Date: January 1, 2026 • Formir Technologies Private Limited (operating as Faceify Labs).
            </Prose>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="max-w-3xl mx-auto bg-[var(--surface)] p-8 md:p-12 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-xs space-y-8 text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
            <div className="space-y-3">
              <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
                1. Core Architectural Privacy Commitment
              </h2>
              <p>
                {siteConfig.compliance.statement} Real-time facial landmark localization (468 points) and mesh rendering execute client-side inside the user&apos;s web browser. Facial photos are not uploaded to our servers during real-time simulation.
              </p>
            </div>

            <div className="space-y-3 border-t border-[var(--border)] pt-6">
              <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
                2. Data We Never Collect
              </h2>
              <p>
                We do not collect, store, or sell unencrypted patient facial imagery. We maintain a permanent corporate commitment: <strong>{siteConfig.compliance.noTraining}</strong>
              </p>
            </div>

            <div className="space-y-3 border-t border-[var(--border)] pt-6">
              <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
                3. International Data Protection Alignment
              </h2>
              <p>
                Our data practices are designed in alignment with regional data privacy frameworks including the General Data Protection Regulation (GDPR - EU), Thailand Personal Data Protection Act (PDPA), South Korea Personal Information Protection Act (PIPA), Singapore Personal Data Protection Act, and the Digital Personal Data Protection Act (India).
              </p>
            </div>

            <div className="space-y-3 border-t border-[var(--border)] pt-6">
              <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
                4. Contact and Inquiries
              </h2>
              <p>
                For privacy questions or data protection officer inquiries, please contact: <a href={`mailto:${siteConfig.email.ceo}`} className="text-[var(--accent)] hover:underline">{siteConfig.email.ceo}</a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
