import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ArrowRight, Award, ShieldCheck, Stethoscope } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Virendra Ghaisas — Executive Director | Faceify Labs',
  description:
    'Executive Director profile for Virendra Ghaisas at Faceify Labs (Formir Technologies Private Limited).',
};

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ExecutiveDirectorPage() {
  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="grid md:grid-cols-[280px_1fr] gap-12 items-center">
            {/* Avatar / Portrait */}
            <div className="space-y-4 text-center">
              <div className="w-52 h-52 mx-auto rounded-[var(--radius-2xl)] bg-gradient-to-br from-[var(--accent-soft)] to-[var(--surface-muted)] border-2 border-[var(--border)] flex items-center justify-center text-4xl font-black font-display text-[var(--accent)] shadow-sm">
                VG
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[var(--foreground)]">
                  Virendra Ghaisas
                </h3>
                <p className="text-xs text-[var(--accent)] font-bold uppercase tracking-wider mt-0.5">
                  Executive Director
                </p>
                <p className="text-[11px] text-[var(--foreground-muted)]">
                  {siteConfig.legalName}
                </p>
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-6">
              <Eyebrow>Leadership</Eyebrow>
              <Heading level="h1" size="h1">
                Executive Leadership &amp; Medical Strategy
              </Heading>
              <div className="space-y-4 text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  Virendra Ghaisas serves as Executive Director at Formir Technologies Private Limited (operating as Faceify Labs), guiding international clinic partnerships, regulatory standards adherence, and clinical adoption of browser-native visualization systems.
                </p>
                <p>
                  Under his leadership, Faceify Labs has expanded partnerships across plastic surgery institutions and private aesthetic clinics in India, Thailand, South Korea, and Singapore, and joined the NVIDIA Inception program.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={routes.external.emailCeo}
                  className="px-4 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Executive Office</span>
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground-muted)] transition-all"
                  aria-label="Virendra Ghaisas on LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
