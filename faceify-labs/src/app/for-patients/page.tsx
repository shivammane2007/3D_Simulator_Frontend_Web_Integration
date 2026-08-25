import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Smartphone, Eye, Sparkles, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { routes } from '@/config/routes';
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider';
import { procedures } from '@/data/procedures';

export const metadata: Metadata = {
  title: 'For Patients — Visualize Surgical & Aesthetic Options',
  description:
    'Explore 85+ procedure simulations from your phone. Zero cloud photo uploads during real-time preview. Have more confident, informed conversations with your surgeon.',
};

export default function ForPatientsPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 md:py-32 overflow-hidden relative">
        {/* Decorative Light Signal Orange Orbital Arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-100 650 C 400 750, 800 200, 1550 320"
            stroke="#F37338"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.45"
          />
          <circle cx="980" cy="300" r="3.5" fill="#CF4500" />
        </svg>

        <div className="container-master relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 max-w-xl">
              <span className="text-eyebrow-master text-eyebrow-dot">
                Patient Experience
              </span>
              <h1 className="text-h1-hero text-[#141413]">
                Visualize possibilities{' '}
                <span className="italic font-medium text-[#CF4500]">
                  before making a decision.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-lg font-normal">
                Explore how cosmetic adjustments may look on your own face. No awkward app downloads, no software installation, and your photos stay private on your device.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href={routes.simulate}
                  className="px-7 py-3 rounded-[20px] bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <span>Try Your Face</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={routes.procedures}
                  className="px-7 py-3 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] text-sm font-medium tracking-[-0.02em] transition-all inline-flex items-center gap-2"
                >
                  <span>Browse 85+ Procedures</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-[#696969] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                  <span>100% Private (Runs in Browser)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                  <span>Works on Any Smartphone</span>
                </div>
              </div>
            </div>

            {/* Interactive Preview */}
            <div className="relative">
              <BeforeAfterSlider procedureTitle="Rhinoplasty Patient Simulation" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Patients Love Faceify */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              WHY FACEIFY
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Confidence starts with visual clarity.
            </h2>
            <p className="text-sm text-[#555555]">
              Describing aesthetic goals with words often leads to misaligned expectations. Faceify gives you a shared visual language.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-5 h-5 text-[#CF4500]" />,
                title: 'No App Installation',
                description:
                  'Open a link in Safari, Chrome, or any mobile browser. Instant load, zero storage footprint.',
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#CF4500]" />,
                title: 'Strictly Privacy-First',
                description:
                  'Real-time simulation executes entirely inside your browser memory. We never store photos or train AI models on your face.',
              },
              {
                icon: <HeartHandshake className="w-5 h-5 text-[#CF4500]" />,
                title: 'Shared Consultation Language',
                description:
                  'Share your parameter link directly with a certified clinic so your doctor understands your exact aesthetic goals.',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFA] p-8 rounded-[40px] border border-black/5 shadow-level-1 space-y-6 hover:shadow-level-2 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-level-1">
                  {card.icon}
                </div>
                <h3 className="text-h3-card text-[#141413]">{card.title}</h3>
                <p className="text-xs text-[#555555] leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure Discovery for Patients */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl space-y-3">
              <span className="text-eyebrow-master text-eyebrow-dot">
                EXPLORE OPTIONS
              </span>
              <h2 className="text-h2-section text-[#141413]">
                Popular procedures for patients.
              </h2>
            </div>
            <Link
              href={routes.procedures}
              className="text-xs font-bold text-[#141413] hover:text-[#CF4500] flex items-center gap-1.5 transition-colors"
            >
              Browse complete 85+ catalog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {procedures.slice(0, 6).map((proc) => (
              <div
                key={proc.slug}
                className="bg-[#FCFBFA] rounded-[32px] p-6 border border-black/5 shadow-level-1 flex flex-col justify-between space-y-6 hover:shadow-level-2 transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                      • {proc.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-h3-card text-[#141413]">
                    {proc.name}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                    {proc.shortDescription}
                  </p>
                </div>
                <div className="pt-4 border-t border-black/5">
                  <Link
                    href={routes.simulateProcedure(proc.simulatorSlug)}
                    className="text-xs font-medium text-[#141413] group-hover:text-[#CF4500] flex items-center gap-1.5 transition-colors"
                  >
                    Preview Simulation <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer Banner */}
      <section className="pb-20 bg-[#F3F0EE]">
        <div className="container-master">
          <div className="p-8 rounded-[32px] bg-white border border-black/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-level-1">
            <div className="space-y-1">
              <span className="font-bold uppercase text-[10px] tracking-wider text-[#CF4500]">
                • Important Patient Notice
              </span>
              <p className="text-xs text-[#555555] max-w-2xl">
                Faceify Labs is an educational visualization platform, not a medical or diagnostic device. Simulations are illustrative approximations and not guarantees of medical outcomes.
              </p>
            </div>
            <Link
              href={routes.directory}
              className="px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] font-medium text-xs shrink-0 hover:bg-[#262627] transition-all shadow-sm"
            >
              Find a Certified Clinic
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
