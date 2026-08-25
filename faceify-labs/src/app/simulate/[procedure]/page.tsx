import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowRight, ChevronRight, ShieldCheck, Cpu } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import SimulatorShell from '@/components/simulator/SimulatorShell';
import { procedures } from '@/data/procedures';
import { routes } from '@/config/routes';

interface SimulateProcedureProps {
  params: Promise<{ procedure: string }>;
}

export async function generateStaticParams() {
  return procedures.map((p) => ({
    procedure: p.simulatorSlug,
  }));
}

export async function generateMetadata({ params }: SimulateProcedureProps): Promise<Metadata> {
  const { procedure: procSlug } = await params;
  const procedure = procedures.find(
    (p) => p.simulatorSlug === procSlug || p.slug === procSlug
  );

  const title = procedure ? procedure.name : 'Cosmetic Procedure';

  return {
    title: `${title} Simulator — Real-Time Browser AI Simulation`,
    description: `Preview ${title} results in real time. 468 landmark tracking on your local GPU with zero server uploads.`,
  };
}

export default async function SimulateProcedurePage({ params }: SimulateProcedureProps) {
  const { procedure: procSlug } = await params;
  const procedure = procedures.find(
    (p) => p.simulatorSlug === procSlug || p.slug === procSlug
  ) || procedures[0];

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <Section background="default" className="py-12 md:py-16 border-b border-[var(--border)]">
        <Container>
          <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground-subtle)] mb-6">
            <Link href={routes.home} className="hover:text-[var(--foreground)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={routes.simulate} className="hover:text-[var(--foreground)] transition-colors">
              Simulator
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--accent)] font-bold">{procedure.name}</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
              <span>{procedure.categoryLabel} Simulation</span>
            </div>
            <Heading level="h1" size="display">
              {procedure.name}{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                Real-Time Simulator.
              </span>
            </Heading>
            <Prose size="lg">
              Adjust parameters below to visualize structural changes. Real-time inference operates 100% on-device in your browser.
            </Prose>
          </div>
        </Container>
      </Section>

      {/* Main Simulator Workspace */}
      <Section background="muted">
        <Container>
          <SimulatorShell initialProcedureSlug={procedure.slug} />
        </Container>
      </Section>

      {/* Guide Link */}
      <Section background="default">
        <Container>
          <div className="p-8 rounded-[var(--radius-2xl)] bg-[var(--surface)] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h3 className="text-lg font-bold font-display text-[var(--foreground)]">
                Want in-depth information about {procedure.name}?
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-1">
                Read our comprehensive clinical guide covering candidate criteria, recovery timelines, and surgical techniques.
              </p>
            </div>
            <Link
              href={routes.procedure(procedure.slug)}
              className="px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--accent)] text-white text-xs font-bold shrink-0 hover:bg-[var(--accent-hover)] transition-all flex items-center gap-2"
            >
              <span>Read {procedure.name} Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
