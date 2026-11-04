import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, FlaskConical, AlertTriangle, Eye } from 'lucide-react';
import { routes } from '@/config/routes';
import AdverseEventForm from '@/components/clinical-safety/AdverseEventForm';

export const metadata: Metadata = {
  title: 'Clinical Safety — Faceify Labs',
  description:
    'How Faceify Labs handles clinical claims, patient privacy, advisor input, and pilot studies. Plain language, by design.',
  robots: { index: true, follow: true },
};

const SECTION = 'max-w-3xl mx-auto py-5';

export default function ClinicalSafetyPage() {
  return (
    <div className="min-h-screen bg-[#F3F0EE] pt-28 md:pt-36 pb-20 font-sans selection:bg-[#CF4500]/15 selection:text-[#141413] relative overflow-hidden">
      {/* ── Background Trajectory Curve ── */}
      <svg
        className="absolute inset-0 w-full h-[700px] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M-100 480 C 350 620, 850 140, 1600 260"
          stroke="#F37338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.35"
        />
        <circle cx="1020" cy="220" r="3.5" fill="#CF4500" opacity="0.4" />
      </svg>

      <div className="container-master relative z-10 px-4 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-10 text-center sm:text-left space-y-3">
          <p className="text-xs uppercase tracking-wider font-bold text-[#CF4500]">
            CLINICAL POSTURE
          </p>
          <h1 className="text-3xl md:text-5xl font-display font-normal text-[#141413] leading-[1.15]">
            How we think about clinical safety
          </h1>
          <p className="text-base text-[#555555] leading-relaxed max-w-2xl font-normal">
            This page exists because the most important question a plastic surgery patient or surgeon can ask us is also the one we&apos;re most often <em>not</em> asked: &ldquo;what is this thing actually doing, and where does it stop?&rdquo;
          </p>
        </div>

        {/* The single most important claim */}
        <section className={SECTION}>
          <div className="bg-white border-l-4 border-[#CF4500] rounded-r-[24px] p-6 md:p-8 border-y border-r border-black/5 shadow-level-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0 mt-0.5">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-bold text-lg md:text-xl text-[#141413]">
                  Our simulator visualises the change a patient is asking about.
                </h2>
                <p className="text-base text-[#555555] leading-relaxed">
                  It does <strong className="text-[#141413]">not</strong> predict what surgery will deliver. That distinction is the company&apos;s clinical posture and we will not blur it for marketing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What we are */}
        <section className={SECTION}>
          <div className="bg-white rounded-[28px] p-6 md:p-8 border border-black/10 shadow-level-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-normal text-[#141413]">
              What Faceify is
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              Faceify Labs is a planning and visualisation tool. A patient uploads a photo, adjusts parametric sliders or uses brush tools, and sees a rendered preview of the requested change. The simulator is built on MediaPipe&apos;s 468-point face mesh and a per-procedure deformation engine. For nine procedures we additionally offer a 3D variant powered by a parametric head model (FLAME).
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              The simulator is intended to make a consultation conversation more concrete. It is <strong className="text-[#141413]">not</strong> a diagnostic device, a treatment recommendation, or an outcome guarantee.
            </p>
          </div>
        </section>

        {/* What we are not */}
        <section className={SECTION}>
          <div className="bg-white rounded-[28px] p-6 md:p-8 border border-black/10 shadow-level-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-normal text-[#141413]">
              What Faceify is not
            </h2>
            <ul className="space-y-3 text-base text-[#555555] list-disc pl-5 leading-relaxed">
              <li>
                <strong className="text-[#141413]">Not a medical device</strong> regulated under the U.S. FDA, the Thai FDA, the Korean MFDS, ANVISA (Brazil), the PMDA (Japan), or any other regulator we operate adjacent to.
              </li>
              <li>
                <strong className="text-[#141413]">Not predictive of outcome.</strong> We do not have an outcome-prediction ML model. The simulator is parametric warping plus brush deformation. The L6 surgical-outcome model is a future research project, gated on a consented before/after dataset we are only just beginning to collect.
              </li>
              <li>
                <strong className="text-[#141413]">Not a substitute for a board-certified surgeon.</strong> Every patient surface tells the user this. Every surgeon tells them this. We tell them this.
              </li>
              <li>
                <strong className="text-[#141413]">Patient photo privacy.</strong> Real-time simulations run in your browser. Your photo is sent off your device only if you turn on the optional AI photoreal preview or choose to save a simulation to your account, and is never used to train any model.
              </li>
            </ul>
          </div>
        </section>

        {/* Privacy claim */}
        <section className={SECTION}>
          <div className="bg-white rounded-[28px] p-6 md:p-8 border border-black/10 shadow-level-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-display font-normal text-[#141413]">
              Patient data &amp; privacy
            </h2>
            <p className="text-base text-[#555555] leading-relaxed">
              Photos uploaded into the patient simulator are processed entirely in the browser. They are not transmitted to our servers and we cannot read them. The user can clear their session at any time.
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              When a patient chooses to share their saved simulation with a surgeon, only the parameter values + a hashed reference to the edit are transmitted &mdash; not the underlying photo. The surgeon-side viewer reconstructs the preview when the patient re-opens the share link.
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              Patient gallery submissions are an opt-in exception: a patient explicitly uploads before/after photos with consent, and our admin team reviews every submission before publication.
            </p>
          </div>
        </section>

        {/* Validation status */}
        <section className={SECTION}>
          <div className="bg-white rounded-[28px] p-6 md:p-8 border border-black/10 shadow-level-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500]">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-[#141413]">
                Validation status
              </h2>
            </div>
            <p className="text-base text-[#555555] leading-relaxed">
              We are committing to publish our first validation study by end of 2026. The pilot design (per CMO-Medical recommendation) is a prospective single-arm, single-procedure (rhinoplasty), single-site study with a blinded panel of three independent plastic surgeons rating preview-vs-post-op similarity.
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              <strong className="text-[#141413]">What we will publish even if results are mixed:</strong> the protocol, the data, the conclusions. A candid mixed result increases credibility more than a positive one buried in marketing.
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              Status as of 2026-05-26:{' '}
              <em className="text-[#141413]">
                protocol drafted, recruitment not yet started, partner clinic identification in progress.
              </em>
            </p>
          </div>
        </section>

        {/* Advisory */}
        <section className={SECTION}>
          <div className="bg-white rounded-[28px] p-6 md:p-8 border border-black/10 shadow-level-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-normal text-[#141413]">
                Clinical advisory
              </h2>
            </div>
            <p className="text-base text-[#555555] leading-relaxed">
              We are in the process of constituting a 3-person Medical Advisory Board (board-certified plastic surgeons, two from our active markets and one academic-side). Names will be published here once the board is formally seated and members have approved public listing.
            </p>
            <p className="text-base text-[#555555] leading-relaxed">
              Surgeons interested in advisory or KOL roles should contact{' '}
              <a
                href="mailto:medical@faceifylabs.com"
                className="text-[#141413] font-semibold underline hover:text-[#CF4500] transition-colors"
              >
                medical@faceifylabs.com
              </a>
              . We do not pay per-referral; that is a non-negotiable line for us under medical-council kickback regulations in our markets.
            </p>
          </div>
        </section>

        {/* Complaint channel */}
        <section className={SECTION}>
          <div className="space-y-4">
            <div className="bg-white rounded-[28px] p-6 md:p-8 border border-black/10 shadow-level-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-normal text-[#141413]">
                  If something is wrong
                </h2>
              </div>
              <p className="text-base text-[#555555] leading-relaxed">
                If a simulation appears to mislead, if a published gallery photo violates consent, or if a surgeon listing makes claims you believe are unsupported &mdash; please tell us:
              </p>
              <div>
                <a
                  href="mailto:safety@faceifylabs.com"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-amber-50 border border-amber-200 rounded-full text-amber-900 font-bold text-xs hover:bg-amber-100 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>safety@faceifylabs.com</span>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-[#696969] leading-relaxed pt-1">
                We aim to acknowledge within one business day and to act (correction, takedown, or escalation) within five.
              </p>
            </div>

            {/* Embedded Adverse Event Form */}
            <AdverseEventForm />
          </div>
        </section>

        {/* Footer cross-links */}
        <section className={SECTION}>
          <div className="bg-[#FCFBFA] rounded-[28px] p-6 sm:p-8 border border-black/10 shadow-level-1 text-center">
            <p className="text-xs sm:text-sm text-[#696969]">
              Related:{' '}
              <Link
                href={routes.privacy}
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Privacy Policy
              </Link>
              {' · '}
              <Link
                href={routes.terms}
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Terms of Service
              </Link>
              {' · '}
              <Link
                href={routes.refundPolicy}
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Refund Policy
              </Link>
              {' · '}
              <Link
                href={routes.trust}
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Trust &amp; Privacy Architecture
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

