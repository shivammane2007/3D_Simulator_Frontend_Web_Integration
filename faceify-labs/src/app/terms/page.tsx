import { Metadata } from 'next';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service — Faceify Labs',
  description: 'Terms of Service and Clinical Use Disclaimer for Faceify Labs visual simulation tools.',
};

export default function TermsPage() {
  return (
    <div className="pt-8 pb-20">
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Terms &amp; Disclaimers</Eyebrow>
            <Heading level="h1" size="display">
              Terms of Service.
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
                1. Medical &amp; Clinical Visualization Disclaimer
              </h2>
              <p>
                {siteConfig.compliance.medicalDisclaimer} Faceify Labs software is designed exclusively as an educational communication aid between qualified medical practitioners and patients. It does not provide medical advice, diagnosis, surgical guarantees, or treatment prescriptions.
              </p>
              <p>
                Faceify Labs is not regulated as a medical device under the U.S. FDA, Thai FDA, Korean MFDS, ANVISA (Brazil), or PMDA (Japan).
              </p>
            </div>

            <div className="space-y-3 border-t border-[var(--border)] pt-6">
              <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
                2. Acceptable Clinical Use
              </h2>
              <p>
                Practitioners agree not to present simulated previews as guarantees of biological outcomes. Patients must be informed that actual surgical healing, soft-tissue elasticity, and anatomical variance will affect real-world results.
              </p>
            </div>

            <div className="space-y-3 border-t border-[var(--border)] pt-6">
              <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
                3. Subscription &amp; Licensing
              </h2>
              <p>
                Subscriptions are billed on a monthly or annual basis as designated upon registration. Licenses are granted per practitioner or clinic tier.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
