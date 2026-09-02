import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Sparkles, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { procedures, getProcedureBySlug, getRelatedProcedures } from '@/data/procedures';
import { routes } from '@/config/routes';
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider';
import SimulatorShell from '@/components/simulator/SimulatorShell';

interface ProcedurePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return procedures.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProcedurePageProps): Promise<Metadata> {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);

  if (!procedure) {
    return {
      title: 'Procedure Not Found',
    };
  }

  return {
    title: `${procedure.name} — AI Simulation & Visual Planning Guide`,
    description: procedure.description,
  };
}

export default async function ProcedureDetailPage({ params }: ProcedurePageProps) {
  const { slug } = await params;
  const procedure = getProcedureBySlug(slug);

  if (!procedure) {
    notFound();
  }

  const related = getRelatedProcedures(procedure);

  return (
    <div className="pt-8 pb-20">
      {/* Breadcrumb Header */}
      <Section background="default" className="py-12 md:py-16 border-b border-[var(--border)]">
        <Container>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground-subtle)] mb-6">
            <Link href={routes.home} className="hover:text-[var(--foreground)] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={routes.procedures} className="hover:text-[var(--foreground)] transition-colors">
              Procedures
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[var(--accent)] font-bold">{procedure.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-bold uppercase tracking-wider">
                <span>{procedure.categoryLabel} Simulation</span>
              </div>

              <Heading level="h1" size="display">
                {procedure.name}{' '}
                <span className="italic font-normal" style={{ color: 'var(--accent)' }}>
                  Simulation.
                </span>
              </Heading>

              <Prose size="lg">{procedure.description}</Prose>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={routes.simulateProcedure(procedure.simulatorSlug)}
                  className="px-6 py-3.5 rounded-[var(--radius-pill)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch {procedure.name} Simulator</span>
                </Link>
                <Link
                  href={routes.consultation}
                  className="px-6 py-3.5 rounded-[var(--radius-pill)] border border-[var(--border-strong)] text-[var(--foreground)] text-sm font-bold hover:bg-[var(--surface-muted)] transition-all"
                >
                  Consult a Surgeon
                </Link>
              </div>
            </div>

            {/* Interactive Preview for this procedure */}
            <div>
              <BeforeAfterSlider procedureTitle={`${procedure.name} Simulation`} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Live Interactive Simulator Section */}
      <Section background="muted" className="border-b border-[var(--border)]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow className="mb-4">Interactive Preview</Eyebrow>
            <Heading level="h2">Test {procedure.name} adjustments live.</Heading>
            <Prose className="mt-2">
              Move the sliders to inspect anatomical adjustments rendered via browser WebGL2.
            </Prose>
          </div>

          <SimulatorShell initialProcedureSlug={procedure.slug} />
        </Container>
      </Section>

      {/* Clinical Guidance & What It Simulates */}
      <Section background="default">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Eyebrow>Clinical Context</Eyebrow>
              <Heading level="h3">How the {procedure.name} simulation works</Heading>
              <div className="space-y-4 text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  During the simulation of {procedure.name}, our 468-point facial tracking model extracts exact geometric vectors corresponding to your unique bone and soft-tissue anatomy.
                </p>
                <p>
                  Deformations are evaluated against mathematical clinical constraints, guaranteeing that simulation previews reflect realistic aesthetic proportions rather than impossible geometric artifacts.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                {[
                  '468 anatomical landmark reference points mapped',
                  'Sub-millimeter tracking accuracy (0.04mm RMSD)',
                  'Zero server processing — strictly on-device simulation',
                  'Parameter export for physician review',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Disclaimer Box */}
            <div className="p-8 rounded-[var(--radius-2xl)] bg-[var(--surface-muted)] border border-[var(--border-strong)] space-y-4">
              <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>Clinical &amp; Medical Disclaimer</span>
              </div>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                {procedure.disclaimer} Faceify Labs provides educational visual planning software. It is not a diagnostic device or a promise of surgical outcome. Consult an accredited plastic surgeon or aesthetic physician for individual clinical evaluation.
              </p>
              <div className="pt-2">
                <Link
                  href={routes.directory}
                  className="text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] flex items-center gap-1.5"
                >
                  Find a certified clinic near you <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Procedures */}
      {related.length > 0 && (
        <Section background="muted" className="border-t border-[var(--border)]">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold font-display text-[var(--foreground)]">
                Related Procedures
              </h3>
              <Link
                href={routes.procedures}
                className="text-xs font-bold text-[var(--accent)] hover:text-[var(--accent-hover)] flex items-center gap-1"
              >
                View all procedures <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={routes.procedure(rel.slug)}
                  className="p-6 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-subtle)] hover:shadow-md transition-all group block"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1 block">
                    {rel.categoryLabel}
                  </span>
                  <h4 className="font-bold text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-2">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[var(--foreground-muted)] line-clamp-2">
                    {rel.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
