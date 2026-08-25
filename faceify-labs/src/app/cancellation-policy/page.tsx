import { Metadata } from 'next';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cancellation Policy — Faceify Labs',
  description: 'Subscription cancellation terms for Faceify Labs.',
};

export default function CancellationPolicyPage() {
  return (
    <div className="pt-8 pb-20">
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Billing Terms</Eyebrow>
            <Heading level="h1" size="display">
              Cancellation Policy.
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
              Cancelling Your Practice Plan
            </h2>
            <p>
              You can cancel your monthly or annual subscription at any time directly through your practice settings or by contacting <a href={`mailto:${siteConfig.email.ceo}`} className="text-[var(--accent)] hover:underline">{siteConfig.email.ceo}</a>. Your access will remain active through the end of your current paid billing period with no subsequent renewals.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
