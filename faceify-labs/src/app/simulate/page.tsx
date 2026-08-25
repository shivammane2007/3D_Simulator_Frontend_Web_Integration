import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Cpu, Smartphone, ArrowRight } from 'lucide-react';
import SimulatorShell from '@/components/simulator/SimulatorShell';
import { procedures } from '@/data/procedures';
import { routes } from '@/config/routes';

export const metadata: Metadata = {
  title: 'AI Surgical Simulator — 85+ Procedures in Browser',
  description:
    'Test real-time surgical and aesthetic simulations directly in your web browser. 100% on-device inference, 468 landmark tracking, zero cloud uploads.',
};

export default function SimulatePage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              INTERACTIVE AI SIMULATOR
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Browser-native{' '}
              <span className="italic font-medium text-[#CF4500]">
                surgical simulation.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto font-normal">
              Adjust parametric sliders in real time. 468 anatomical landmark points calculated on your local GPU with zero server round-trips.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-[11px] font-bold text-[#555555] uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#CF4500]" />
                <span>100% Private (Runs Locally)</span>
              </div>
              <span className="text-[#141413]/20">•</span>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#CF4500]" />
                <span>Client-Side GPU WebGL2</span>
              </div>
              <span className="text-[#141413]/20">•</span>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#CF4500]" />
                <span>Mobile & iPad Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Workspace */}
      <section className="py-12 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <SimulatorShell initialProcedureSlug="rhinoplasty" />
        </div>
      </section>

      {/* Procedure Quick Switcher Grid */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-eyebrow-master text-eyebrow-dot">
                PROCEDURE CATALOG
              </span>
              <h3 className="text-h2-section text-[#141413]">
                Explore Specialized Simulators
              </h3>
              <p className="text-sm text-[#555555]">
                Select any procedure below to load specialized anatomical deformation models.
              </p>
            </div>
            <Link
              href={routes.procedures}
              className="text-xs font-bold text-[#141413] hover:text-[#CF4500] flex items-center gap-1.5 transition-colors"
            >
              All 85+ procedures <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {procedures.map((proc) => (
              <Link
                key={proc.slug}
                href={routes.simulateProcedure(proc.simulatorSlug)}
                className="p-6 rounded-[32px] bg-[#FCFBFA] border border-black/5 hover:shadow-level-2 transition-all group block shadow-level-1"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500] mb-2 block">
                  • {proc.categoryLabel}
                </span>
                <h4 className="text-h3-card text-[#141413] group-hover:text-[#CF4500] transition-colors mb-2">
                  {proc.name}
                </h4>
                <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                  {proc.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
