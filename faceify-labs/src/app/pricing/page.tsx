import { Metadata } from 'next';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import PricingPreview from '@/components/sections/PricingPreview';
import { routes } from '@/config/routes';
import { pricingPlans, foundingPartnerBenefits } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing — Plans for Solo Surgeons & Aesthetic Clinics',
  description:
    'Transparent pricing for Faceify Labs. Starter from $149/mo ($119/mo annual), Clinic from $499/mo. Unlimited simulations, 100% browser-native inference.',
};

export default function PricingPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              TRANSPARENT PRICING
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Plans built for practices of{' '}
              <span className="italic font-medium text-[#CF4500]">
                any scale.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto font-normal">
              No expensive scanner hardware. No per-patient surcharge. Simple, predictable subscription tiers for solo surgeons, multi-physician clinics, and hospitals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards & Toggle */}
      <PricingPreview />

      {/* Detailed Feature Comparison Matrix */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              FEATURE BREAKDOWN
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Compare plan capabilities.
            </h2>
          </div>

          <div className="bg-[#FCFBFA] rounded-[40px] border border-black/5 shadow-level-1 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-black/5 bg-[#EBE7E3] text-[10px] font-bold uppercase tracking-wider text-[#141413]">
                    <th className="p-6">Feature</th>
                    <th className="p-6">Starter ($149/mo)</th>
                    <th className="p-6 text-[#CF4500]">Clinic ($499/mo)</th>
                    <th className="p-6">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs">
                  {[
                    ['85+ Procedure Simulators', 'All procedures', 'All procedures', 'Custom + All'],
                    ['Simulations per Month', 'Unlimited', 'Unlimited', 'Unlimited'],
                    ['Doctor / Staff Seats', '1 Surgeon seat', 'Up to 5 seats', 'Unlimited seats'],
                    ['468 Landmark 3D Mesh', 'Yes', 'Yes', 'Yes'],
                    ['Client-Side Inference (<200ms)', 'Yes', 'Yes', 'Yes'],
                    ['Patient Shareable URLs', 'Yes', 'Yes', 'Yes'],
                    ['Clinic Branding & Logo', '—', 'Yes', 'Custom Portal'],
                    ['Website Embed Widget', '—', 'Yes', 'Custom API'],
                    ['Spatial 3D Preview (Vision/Quest)', 'Founding Cohort', 'Priority Access', 'Included'],
                    ['Support Channel', 'Standard Email', 'Priority WhatsApp', 'Dedicated SLA'],
                  ].map(([feat, s, c, e], idx) => (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="p-6 font-medium text-[#141413]">{feat}</td>
                      <td className="p-6 text-[#555555]">{s}</td>
                      <td className="p-6 font-semibold text-[#CF4500]">{c}</td>
                      <td className="p-6 text-[#555555]">{e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Partner Cohort Box */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="bg-[#141413] text-white p-8 md:p-14 rounded-[40px] border border-black/5 grid lg:grid-cols-2 gap-10 items-center shadow-level-2">
            <div className="space-y-6">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F37338]">
                Founding Partner Program
              </span>
              <h3 className="text-3xl font-medium font-display leading-tight">
                Are you a leading aesthetic surgeon or clinic director?
              </h3>
              <p className="text-sm text-white/70 leading-relaxed font-normal">
                Join our exclusive Founding Partner cohort to lock in lifetime preferred rates and shape our spatial 3D simulation roadmap.
              </p>
              <ul className="space-y-3 pt-2">
                {foundingPartnerBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-medium text-white/90">
                    <Check className="w-4 h-4 text-[#CF4500] shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1E1E1C] p-8 md:p-10 rounded-[32px] border border-white/10 text-center space-y-6">
              <Sparkles className="w-8 h-8 text-[#F37338] mx-auto" />
              <h4 className="text-2xl font-medium font-display text-white">Apply for Founding Cohort</h4>
              <p className="text-xs text-white/60">
                Applications reviewed within 24 business hours.
              </p>
              <Link
                href={routes.foundingPartners}
                className="block w-full py-3.5 rounded-[20px] bg-white text-[#141413] hover:bg-[#F3F0EE] text-xs font-medium transition-all shadow-md mt-4"
              >
                Apply for Founding Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
