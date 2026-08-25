import { Metadata } from 'next';
import Link from 'next/link';
import { Tablet, Laptop, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import SimulatorShell from '@/components/simulator/SimulatorShell';

export const metadata: Metadata = {
  title: 'For Plastic Surgeons & Aesthetic Clinics — AI Simulation Platform',
  description:
    'Enhance surgical consultations with 85+ real-time browser simulations. 40% shorter consultation times, 2× conversion confidence, sub-millimeter 0.04mm RMSD precision.',
};

export default function ForSurgeonsPage() {
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
            d="M1500 650 C 1000 750, 600 200, -100 320"
            stroke="#F37338"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.45"
          />
          <circle cx="480" cy="300" r="3.5" fill="#CF4500" />
        </svg>

        <div className="container-master relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 max-w-xl">
              <span className="text-eyebrow-master text-eyebrow-dot">
                Clinical Practice Solution
              </span>
              <h1 className="text-h1-hero text-[#141413]">
                Close more consultations with{' '}
                <span className="italic font-medium text-[#CF4500]">
                  visual certainty.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-lg font-normal">
                Equip your consultation room with browser-native 3D simulations. Map 468 anatomical landmarks with 0.04mm RMSD precision on the patient&apos;s own device or your clinic iPad.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href={routes.consultation}
                  className="px-7 py-3 rounded-[20px] bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <span>Book Surgeon Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={routes.pricing}
                  className="px-7 py-3 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] text-sm font-medium tracking-[-0.02em] transition-all inline-flex items-center gap-2"
                >
                  <span>View Practice Plans</span>
                </Link>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/5 mt-6">
                <div>
                  <div className="text-2xl font-black font-display text-[#141413]">
                    {siteConfig.metrics.consultTimeReduction}
                  </div>
                  <div className="text-[11px] font-semibold text-[#696969] uppercase tracking-wider">
                    Less Consult Time
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display text-[#141413]">
                    {siteConfig.metrics.conversionConfidence}
                  </div>
                  <div className="text-[11px] font-semibold text-[#696969] uppercase tracking-wider">
                    Conversion Confidence
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display text-[#141413]">
                    {siteConfig.metrics.feeIncrease}
                  </div>
                  <div className="text-[11px] font-semibold text-[#696969] uppercase tracking-wider">
                    Higher Consult Fees
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Simulation Sandbox */}
            <div className="relative">
              <SimulatorShell initialProcedureSlug="rhinoplasty" />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Workflow Integration */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              WORKFLOW INTEGRATION
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Built for the real consultation room.
            </h2>
            <p className="text-sm text-[#555555]">
              No bulky 3D camera towers. No expensive specialized scanners. Run simulations on the hardware you already own.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Tablet className="w-5 h-5 text-[#CF4500]" />,
                title: 'Clinic iPad & Touchscreens',
                description:
                  'Use standard iPads or touchscreen laptops to walk patients through parametric deformations in real time at <200ms latency.',
              },
              {
                icon: <Laptop className="w-5 h-5 text-[#CF4500]" />,
                title: 'Web & EMR Integration',
                description:
                  'Embed the simulator directly onto your practice website or link parameters into patient consultation notes with zero backend changes.',
              },
              {
                icon: <Zap className="w-5 h-5 text-[#CF4500]" />,
                title: 'Anatomical Safety Clamps',
                description:
                  'Built-in anatomical limits prevent unachievable deformations, protecting patient expectations and surgical credibility.',
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

      {/* Competitive Benchmark for Practices */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="bg-[#141413] text-white rounded-[40px] p-8 md:p-14 border border-black/5 shadow-level-2 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F37338]">
                Cost & Hardware Comparison
              </span>
              <h3 className="text-3xl font-medium font-display leading-tight">
                Why practices are moving away from legacy $25k+ hardware scanners.
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                Legacy systems like Vectra require dedicated room space, five-figure upfront capital, and expensive service contracts. Faceify runs purely in standard web browsers with zero maintenance overhead.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  'Zero hardware purchase required ($0 vs $25,000+)',
                  'Unlimited seats per clinic on Clinic plans',
                  'Instant updates and new procedures added monthly',
                  '100% on-device processing aligned with GDPR and HIPAA standards',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-medium text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#CF4500] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1E1E1C] p-8 md:p-10 rounded-[32px] border border-white/10 space-y-6 text-center">
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#F37338]">
                Founding Partner Program
              </span>
              <div className="text-3xl sm:text-4xl font-medium font-display text-white">
                Starting at $149 / mo
              </div>
              <p className="text-xs text-white/60">
                Join plastic surgeons in Bangkok, Seoul, Singapore, and Mumbai using Faceify in daily consultations.
              </p>
              <Link
                href={routes.consultation}
                className="block w-full py-3.5 rounded-[20px] bg-white text-[#141413] hover:bg-[#F3F0EE] text-xs font-medium transition-all shadow-md"
              >
                Schedule Clinic Demo & Trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
