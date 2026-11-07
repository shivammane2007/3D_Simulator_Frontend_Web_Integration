import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
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
    title: `${title} Simulator: AI Before & After Preview | Faceify`,
    description: `Preview ${title} outcomes with AI simulation. Adjust parameters and inspect 468 landmark tracking on your local GPU with zero server uploads.`,
    openGraph: {
      title: `${title} Simulator`,
      description: `Preview ${title} outcomes in real time with AI simulation. Private by design.`,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${title} Simulator: Faceify Labs`,
        },
      ],
    },
  };
}

export default async function SimulateProcedurePage({ params }: SimulateProcedureProps) {
  const { procedure: procSlug } = await params;
  const procedure = procedures.find(
    (p) => p.simulatorSlug === procSlug || p.slug === procSlug
  ) || procedures[0];

  return (
    <div className="bg-[#0c1018] min-h-screen text-slate-100 pt-6 pb-20">
      <Container>
        {/* Breadcrumb Header */}
        <div className="mb-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
            <Link href={routes.home} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={routes.simulate} className="hover:text-white transition-colors">
              Simulator
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#CF4500] font-semibold">{procedure.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500] mb-1 block">
                {procedure.categoryLabel} Simulation
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {procedure.name}{' '}
                <span className="italic font-serif text-[#CF4500] font-normal">
                  Simulator
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed sm:text-right">
              Adjust parameters below to visualize structural changes. Real-time inference operates 100% on-device in your browser.
            </p>
          </div>
        </div>

        {/* Main Simulator Workspace */}
        <div className="mb-12 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-[#141a24]">
          <SimulatorShell initialProcedureSlug={procedure.slug} />
        </div>

        {/* Guide Card */}
        <div className="p-6 sm:p-8 rounded-[24px] bg-[#141a24] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-base font-bold text-white">
              Want in-depth clinical information about {procedure.name}?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Read our comprehensive clinical guide covering candidate criteria, recovery timelines, and surgical techniques.
            </p>
          </div>
          <Link
            href={routes.procedure(procedure.slug)}
            className="px-6 py-2.5 rounded-full bg-[#CF4500] hover:bg-[#F37338] text-white text-xs font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#CF4500]/25"
          >
            <span>Read {procedure.name} Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
