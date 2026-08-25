import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Our Story — Why We Built Faceify Labs',
  description:
    'The mission behind Faceify Labs: closing the visual communication gap in plastic surgery consultations with browser-native on-device AI.',
};

export default function OurStoryPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Editorial Hero */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-eyebrow-master text-eyebrow-dot">
              OUR MISSION
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              A shared visual language for{' '}
              <span className="italic font-medium text-[#CF4500]">
                every consultation.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              We started Faceify Labs in 2024 with a simple realization: in plastic surgery and aesthetic medicine, describing anatomical adjustments with words alone leads to misunderstandings, hesitation, and post-operative dissatisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Content */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
            <div className="bg-[#FCFBFA] p-8 md:p-14 rounded-[40px] border border-black/5 space-y-12 shadow-level-1">
              <div className="space-y-5">
                <h2 className="text-3xl font-medium font-display text-[#141413]">
                  The Problem with Traditional Consultations
                </h2>
                <div className="space-y-4">
                  <p className="text-sm text-[#555555] leading-relaxed">
                    For decades, patient consultations relied either on two-dimensional photo warping that looked unnatural, or bulky $25,000+ hardware camera towers that only large multi-specialty hospitals could afford.
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    Patients walked into consultations hoping to understand what a procedure might look like on their own face, but left with vague verbal reassurances and anxiety.
                  </p>
                </div>
              </div>

              <div className="space-y-5 border-t border-black/5 pt-12">
                <h2 className="text-3xl font-medium font-display text-[#141413]">
                  The Browser-Native Breakthrough
                </h2>
                <div className="space-y-4">
                  <p className="text-sm text-[#555555] leading-relaxed">
                    We asked a fundamental question: What if high-precision 3D facial simulation could execute in the palm of a patient&apos;s hand, right inside Safari or Chrome, without installing an app or uploading photos to a remote cloud server?
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    By compiling optimized neural inference pipelines to WebGL2 shaders, we achieved 468 landmark tracking and 934-triangle mesh deformation with under 200ms latency directly on smartphone GPUs.
                  </p>
                </div>
              </div>

              <div className="space-y-5 border-t border-black/5 pt-12">
                <h2 className="text-3xl font-medium font-display text-[#141413]">
                  Company Background
                </h2>
                <div className="space-y-4">
                  <p className="text-sm text-[#555555] leading-relaxed">
                    Faceify Labs operates under {siteConfig.legalName}. We work with plastic surgeons, aesthetic clinics, and hospital networks across India, Thailand, South Korea, Singapore, and Bangladesh.
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    We are proud members of the NVIDIA Inception Program, collaborating on the future of medical graphics rendering and browser neural acceleration.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar Facts */}
            <div className="space-y-6">
              <div className="bg-[#FCFBFA] p-8 rounded-[32px] border border-black/5 shadow-level-1 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                  Fast Facts
                </span>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#555555]">Founded</span>
                    <span className="font-bold text-[#141413]">2024</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#555555]">Legal Entity</span>
                    <span className="font-bold text-[#141413] text-right">{siteConfig.legalName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#555555]">Key Markets</span>
                    <span className="font-bold text-[#141413] text-right">IN, TH, KR, SG, BD</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#555555]">Programs</span>
                    <span className="font-bold text-[#141413] text-right">NVIDIA Inception</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#141413] text-white p-8 rounded-[32px] border border-black/5 space-y-5 shadow-level-2">
                <h4 className="text-xl font-medium font-display text-white">Join as a Partner Clinic</h4>
                <p className="text-xs text-white/70 font-normal leading-relaxed">
                  Bring real-time simulation to your consultation rooms today.
                </p>
                <Link
                  href={routes.consultation}
                  className="block text-center py-3.5 rounded-[20px] bg-white text-[#141413] hover:bg-[#F3F0EE] text-xs font-medium transition-all shadow-sm"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
