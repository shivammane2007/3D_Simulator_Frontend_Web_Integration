import { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope, Building2, Sparkles, HeartPulse, ArrowRight, CheckCircle2 } from 'lucide-react';
import { routes } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Clinical Use Cases — Solo Practices to Hospital Networks',
  description:
    'Discover how solo cosmetic surgeons, aesthetic multi-centers, and medspas integrate Faceify browser simulation into daily consultation workflows.',
};

export default function UseCasesPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              PRACTICE APPLICATIONS
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Built for every aesthetic{' '}
              <span className="italic font-medium text-[#CF4500]">
                consultation environment.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Explore how different clinical settings use Faceify Labs to streamline patient education, align expectations, and increase treatment confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Practice Use Cases */}
      <section className="py-16 md:py-24 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="space-y-12">
            {[
              {
                icon: <Stethoscope className="w-6 h-6 text-[#CF4500]" />,
                title: 'Solo Plastic Surgery Practices',
                subtitle: 'Eliminate expectation mismatches with zero hardware overhead.',
                body: 'Solo surgeons use Faceify directly on their personal iPads during consultations. In less than 60 seconds, a patient photo is mapped into 468 landmark coordinates, allowing the surgeon to demonstrate tip rotation, dorsal changes, or eyelid refinement while conversing face-to-face.',
                benefits: [
                  'Reduces consultation time from 45 minutes to 25 minutes',
                  'Gives patients a clear visual memory of agreed changes',
                  'Requires zero hardware investment ($149/mo vs $25k+ scanner)',
                ],
              },
              {
                icon: <Building2 className="w-6 h-6 text-[#CF4500]" />,
                title: 'Multi-Physician Aesthetic Centers',
                subtitle: 'Standardize visual planning across multiple consulting rooms.',
                body: 'Aesthetic clinics with multiple surgeons and nurses use the Faceify Clinic plan to provide shared access across all exam rooms. Staff can take patient intake photos that are immediately ready for review when the doctor enters.',
                benefits: [
                  'Centralized clinic branding and customized procedure catalog',
                  'Unlimited simulations across all surgeon workstations',
                  'Priority support and onboarding training for clinical coordinators',
                ],
              },
              {
                icon: <Sparkles className="w-6 h-6 text-[#CF4500]" />,
                title: 'Medical Spas & Injectable Practitioners',
                subtitle: 'Show subtle volume restoration and contour changes with precision.',
                body: 'Nurse injectors and dermatologists use injectable simulators (Botox, dermal fillers, Profhilo) to show patients where volume addition will enhance jawline definition or soften nasolabial folds without over-promising.',
                benefits: [
                  'Differentiates medspa consultations from competitor practices',
                  'Assists patients in selecting optimal filler volume and treatment zones',
                  'High retention and repeat procedure booking confidence',
                ],
              },
              {
                icon: <HeartPulse className="w-6 h-6 text-[#CF4500]" />,
                title: 'Hospital Aesthetic & Reconstructive Departments',
                subtitle: 'Strict privacy-compliant visual consultation architecture.',
                body: 'Hospitals requiring strict data governance leverage Faceify’s Zero Data Egress design. Because real-time simulations run entirely in browser memory on-device, hospitals maintain compliance with GDPR and regional medical data laws.',
                benefits: [
                  'Zero patient facial photos stored in external cloud servers',
                  'Compatible with hospital enterprise network firewalls',
                  'Custom SLA and multi-location deployment support',
                ],
              },
            ].map((useCase, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFA] p-8 md:p-12 rounded-[40px] border border-black/5 shadow-level-1 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center hover:shadow-level-2 transition-all"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-level-1">
                    {useCase.icon}
                  </div>
                  <h3 className="text-3xl font-medium font-display text-[#141413]">
                    {useCase.title}
                  </h3>
                  <p className="text-sm font-bold text-[#CF4500] uppercase tracking-wider">
                    {useCase.subtitle}
                  </p>
                  <p className="text-sm text-[#555555] leading-relaxed max-w-xl">
                    {useCase.body}
                  </p>
                </div>

                <div className="bg-[#EBE7E3] p-8 rounded-[32px] border border-black/5 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                    Key Outcomes
                  </span>
                  <ul className="space-y-3">
                    {useCase.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs font-medium text-[#141413]">
                        <CheckCircle2 className="w-4 h-4 text-[#CF4500] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href={routes.consultation}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-sm font-medium transition-all shadow-sm"
            >
              <span>Discuss Your Practice Use Case</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
