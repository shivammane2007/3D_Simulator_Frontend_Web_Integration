import Link from 'next/link';
import { Monitor, Cloud, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { routes } from '@/config/routes';

export default function PrivacySection() {
  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            <span className="text-eyebrow-master text-eyebrow-dot">
              PRIVACY ARCHITECTURE
            </span>
            <h2 className="text-h2-section text-[#141413]">
              What happens to your photo.
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              The real-time simulator runs entirely on-device inside your web browser. Zero patient photos are uploaded or stored on any remote cloud server during simulation.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-[24px] bg-[#FCFBFA] border border-black/5 shadow-level-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141413]">
                  <Monitor className="w-4 h-4 text-[#CF4500]" />
                  <span>On-Device Execution (Always)</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Landmark tracking (468 points), 3D mesh deformation, before/after slider comparison, and parameter adjustments run 100% locally.
                </p>
              </div>

              <div className="p-6 rounded-[24px] bg-white border border-black/5 shadow-level-1 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141413]">
                  <Lock className="w-4 h-4 text-[#CF4500]" />
                  <span>Permanent Zero-Training Commitment</span>
                </div>
                <p className="text-xs text-[#555555] leading-relaxed">
                  We never use patient photos to train machine learning models.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href={routes.trust}
                className="px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2"
              >
                <span>Read Full Privacy Commitment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Stadium Card Diagram */}
          <div className="bg-[#FCFBFA] rounded-[40px] p-8 md:p-10 border border-black/5 shadow-level-2 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#CF4500]">
                ZERO DATA EGRESS
              </span>
              <h3 className="text-xl font-medium tracking-tight text-[#141413] font-display">
                Device Isolation Boundary
              </h3>
            </div>

            <div className="space-y-3">
              {[
                '1. Patient photo loaded into local HTML5 Canvas',
                '2. 468 landmark coordinates extracted on device GPU',
                '3. 934-triangle mesh surface morphs in WebGL2 memory',
                '4. Direct parameter adjustments rendered in <200ms',
                '5. Zero photo bytes transmitted to any external server',
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-[16px] bg-white border border-black/5 text-xs font-medium text-[#141413] flex items-center gap-3 shadow-level-1"
                >
                  <span className="w-2 h-2 rounded-full bg-[#CF4500] shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
