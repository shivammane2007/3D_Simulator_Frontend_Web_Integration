import { Metadata } from 'next';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Grievance Officer & Data Redressal — Faceify Labs',
  description: 'Designated Grievance Officer details for Formir Technologies Private Limited.',
};

export default function GrievanceOfficerPage() {
  return (
    <div className="pt-8 pb-20">
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Compliance &amp; Governance</Eyebrow>
            <Heading level="h1" size="display">
              Grievance Officer.
            </Heading>
            <Prose size="lg">
              Statutory grievance and data privacy redressal contact for Formir Technologies Private Limited.
            </Prose>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="max-w-3xl mx-auto bg-[var(--surface)] p-8 md:p-12 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-xs space-y-6 text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
            <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
              Redressal Officer Details
            </h2>
            <div className="space-y-2">
              <p><strong>Entity:</strong> {siteConfig.legalName}</p>
              <p><strong>Brand:</strong> {siteConfig.operatingAs}</p>
              <p><strong>Contact Email:</strong> <a href={`mailto:${siteConfig.email.ceo}`} className="text-[var(--accent)] hover:underline">{siteConfig.email.ceo}</a></p>
              <p><strong>Grievance Escalations:</strong> <a href={`mailto:${siteConfig.email.partners}`} className="text-[var(--accent)] hover:underline">{siteConfig.email.partners}</a></p>
              <p><strong>WhatsApp Support:</strong> {siteConfig.whatsapp}</p>
            </div>
            <p className="pt-4 border-t border-[var(--border)]">
              All grievances or privacy redressal inquiries are acknowledged within 24 business hours and resolved pursuant to applicable information technology regulations.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
