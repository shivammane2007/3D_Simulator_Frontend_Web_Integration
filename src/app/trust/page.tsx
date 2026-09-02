import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Cpu, FileText, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Trust & Privacy Architecture — On-Device Simulation',
  description:
    'Read our strict privacy commitment. 100% on-device simulation, zero server-side photo storage, GDPR/PDPA aligned data protection practices.',
};

export default function TrustPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-eyebrow-master text-eyebrow-dot">
              SECURITY & PRIVACY
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Privacy-first by design.{' '}
              <span className="italic font-medium text-[#CF4500]">
                Guaranteed.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              {siteConfig.compliance.statement}
            </p>
          </div>
        </div>
      </section>

      {/* Core Privacy Commitments Grid */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-5 h-5 text-[#CF4500]" />,
                title: 'Zero Photo Uploads (Real-Time)',
                description:
                  'During real-time 3D simulation, all mathematical operations execute locally in your device GPU memory. No facial photo ever leaves your browser window.',
              },
              {
                icon: <Lock className="w-5 h-5 text-[#CF4500]" />,
                title: 'Never Used for Model Training',
                description:
                  'We maintain a permanent architectural commitment: patient photos are never scraped, aggregated, or used to train machine learning models.',
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#CF4500]" />,
                title: 'International Compliance',
                description:
                  'Our data governance architecture is informed by GDPR (EU), Thailand PDPA, South Korea PIPA, Singapore PDPA, and India DPDPA.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#FCFBFA] p-8 rounded-[40px] border border-black/5 shadow-level-1 space-y-5 hover:shadow-level-2 transition-all"
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

      {/* When data leaves the device */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="max-w-2xl mb-12 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              TRANSPARENCY
            </span>
            <h2 className="text-h2-section text-[#141413]">When does data ever leave your device?</h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              We believe in complete transparency. There are only two explicit, user-initiated scenarios where data transmits off-device:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 rounded-[40px] bg-white border border-black/5 shadow-level-1 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                Scenario 1 (Optional)
              </span>
              <h3 className="text-xl font-medium font-display text-[#141413]">
                AI Photoreal Preview Generation
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                If you choose to generate an optional ultra-photorealistic preview beyond real-time WebGL mesh deformation, the photo is encrypted in transit and processed via ephemeral server memory before immediate deletion.
              </p>
            </div>

            <div className="p-8 md:p-10 rounded-[40px] bg-white border border-black/5 shadow-level-1 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                Scenario 2 (Optional)
              </span>
              <h3 className="text-xl font-medium font-display text-[#141413]">
                Saving to Clinical Practice Account
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                When a surgeon explicitly saves a simulation plan to their authenticated practice dashboard, only the selected parameters and optional annotated preview are stored securely with JWT session authorization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Disclaimer Section */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="p-8 md:p-12 rounded-[40px] bg-[#FCFBFA] border border-black/10 shadow-level-1 space-y-5">
            <div className="flex items-center gap-3 text-[#CF4500] font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span className="uppercase tracking-wider">Official Regulatory & Clinical Disclaimer</span>
            </div>
            <p className="text-sm text-[#555555] leading-relaxed">
              Faceify Labs is an educational visual planning and expectation-alignment tool. It is not regulated as a medical device under the U.S. FDA, Thai FDA, Korean MFDS, ANVISA (Brazil), or PMDA (Japan). Simulations are directional illustrative approximations and do not guarantee or predict surgical or biological outcomes.
            </p>
            <div className="pt-3">
              <Link
                href={routes.terms}
                className="text-xs font-bold text-[#141413] hover:text-[#CF4500] flex items-center gap-1.5 transition-colors"
              >
                Read full Clinical Terms & Disclaimer <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
