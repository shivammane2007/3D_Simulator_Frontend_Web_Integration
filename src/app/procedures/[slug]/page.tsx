import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Sparkles, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
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
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-24">
      {/* Breadcrumb & Hero Header */}
      <section className="pb-16 relative overflow-hidden">
        {/* Decorative orbital arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-100 450 C 400 550, 800 120, 1550 220"
            stroke="#F37338"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.35"
          />
          <circle cx="980" cy="200" r="3.5" fill="#CF4500" opacity="0.4" />
        </svg>

        <div className="container-master relative z-10">
          {/* Breadcrumbs */}
          <nav
            className="flex items-center gap-2 text-xs font-semibold text-[#696969] mb-8"
            aria-label="Breadcrumb"
          >
            <Link href={routes.home} className="hover:text-[#141413] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#696969]/60" />
            <Link href={routes.procedures} className="hover:text-[#141413] transition-colors">
              Procedures
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#696969]/60" />
            <span className="text-[#CF4500] font-bold">{procedure.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-eyebrow-master text-eyebrow-dot">
                {procedure.categoryLabel} SIMULATION
              </span>

              <h1 className="text-h1-hero text-[#141413]">
                {procedure.name}{' '}
                <span className="italic font-medium text-[#CF4500]">
                  Simulation.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-xl font-normal">
                {procedure.description}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href={routes.simulateProcedure(procedure.simulatorSlug)}
                  className="px-7 py-3 rounded-[20px] bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#CF4500]" />
                  <span>Launch {procedure.name} Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={routes.consultation}
                  className="px-7 py-3 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] text-sm font-medium tracking-[-0.02em] transition-all inline-flex items-center gap-2"
                >
                  <span>Consult a Surgeon</span>
                </Link>
              </div>

              {/* Technical Specifications */}
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#696969]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                  468 Landmark Mesh
                </span>
                <span>•</span>
                <span>0.04mm RMSD Precision</span>
                <span>•</span>
                <span>Zero Cloud Photo Egress</span>
              </div>
            </div>

            {/* Right: Interactive Preview in Stadium Frame */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-level-2 border border-black/5 bg-[#141413]">
                <BeforeAfterSlider procedureTitle={`${procedure.name} Simulation`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Simulator Section */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              INTERACTIVE CLINICAL ENGINE
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Test {procedure.name} adjustments live.
            </h2>
            <p className="text-base text-[#555555] leading-relaxed max-w-xl mx-auto font-normal">
              Move the sliders to inspect anatomical adjustments rendered via browser-native WebGL2.
            </p>
          </div>

          <SimulatorShell initialProcedureSlug={procedure.slug} />
        </div>
      </section>

      {/* Clinical Guidance & Medical Disclaimer */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Clinical Context (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-eyebrow-master text-eyebrow-dot">
                ANATOMICAL CONSTRAINTS
              </span>
              <h2 className="text-h2-section text-[#141413]">
                How the {procedure.name} simulation works
              </h2>
              <div className="space-y-4 text-base text-[#555555] leading-relaxed font-normal">
                <p>
                  During the simulation of {procedure.name}, our 468-point facial tracking model extracts exact geometric vectors corresponding to your unique bone and soft-tissue anatomy.
                </p>
                <p>
                  Deformations are evaluated against mathematical clinical constraints, guaranteeing that simulation previews reflect realistic aesthetic proportions rather than impossible geometric artifacts.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {[
                  '468 anatomical landmark reference points mapped',
                  'Sub-millimeter tracking accuracy (0.04mm RMSD)',
                  'Zero server processing — strictly on-device simulation',
                  'Parameter export for physician review',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#FCFBFA] p-4 rounded-[20px] border border-black/5 shadow-level-1 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#CF4500] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#141413] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Medical Disclaimer Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#FCFBFA] p-8 sm:p-10 rounded-[40px] border border-black/5 shadow-level-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                    Patient Advisory
                  </span>
                  <h3 className="text-base font-bold text-[#141413] font-display">
                    Clinical &amp; Medical Disclaimer
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {procedure.disclaimer} Faceify Labs provides educational visual planning software. It is not a diagnostic device or a promise of surgical outcome. Consult an accredited plastic surgeon or aesthetic physician for individual clinical evaluation.
              </p>

              <div className="pt-2">
                <Link
                  href={routes.directory}
                  className="px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2"
                >
                  <span>Find a Certified Clinic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Procedures */}
      {related.length > 0 && (
        <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
          <div className="container-master">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
              <div className="space-y-2">
                <span className="text-eyebrow-master text-eyebrow-dot">
                  PROCEDURE CATALOG
                </span>
                <h2 className="text-h2-section text-[#141413]">
                  Related Procedures
                </h2>
              </div>
              <Link
                href={routes.procedures}
                className="text-sm font-semibold text-[#141413] hover:text-[#CF4500] inline-flex items-center gap-1.5 transition-colors"
              >
                <span>View all 85+ procedures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={routes.procedure(rel.slug)}
                  className="bg-[#FCFBFA] p-8 rounded-[32px] sm:rounded-[40px] border border-black/5 shadow-level-1 hover:shadow-level-2 transition-all flex flex-col justify-between space-y-6 group cursor-pointer"
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDEEE7] text-[#CF4500] text-xs font-semibold uppercase tracking-wider">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="text-xl font-medium tracking-tight text-[#141413] group-hover:text-[#CF4500] transition-colors font-display">
                      {rel.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed line-clamp-2 font-normal">
                      {rel.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#141413] group-hover:text-[#CF4500] transition-colors">
                    <span>Explore Simulation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
