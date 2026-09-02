import { Metadata } from 'next';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Refund Policy — Faceify Labs',
  description: 'Refund terms for Faceify Labs clinical subscription plans.',
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-8 pb-20">
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Billing Terms</Eyebrow>
            <Heading level="h1" size="display">
              Refund Policy.
            </Heading>
            <Prose size="lg">
              Formir Technologies Private Limited (operating as Faceify Labs).
            </Prose>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="max-w-3xl mx-auto bg-[var(--surface)] p-8 md:p-12 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-xs space-y-6 text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
            <h2 className="text-lg font-bold font-display text-[var(--foreground)]">
              Subscription Refunds
            </h2>
            <p>
              We offer a 14-day evaluation window for new clinic subscription accounts. If Faceify Labs does not fit your clinical consultation workflow, contact our billing team at <a href={`mailto:${siteConfig.email.ceo}`} className="text-[var(--accent)] hover:underline">{siteConfig.email.ceo}</a> within 14 days of initial enrollment for a full refund of your first billing cycle.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
