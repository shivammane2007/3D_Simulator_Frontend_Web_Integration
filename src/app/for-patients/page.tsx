import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Eye,
  CheckCircle2,
  Upload,
  UserCheck,
  Smartphone,
  ShieldCheck,
  Lock,
  ArrowRight,
  Shield,
  Layers,
  Clock,
  Coins,
  MessageSquare,
  AlertCircle,
  Tag,
  Stethoscope,
  Calendar,
  Globe2,
} from 'lucide-react';
import { routes } from '@/config/routes';

export const metadata: Metadata = {
  title: "For Patients — See Your Face, Not Someone Else's",
  description:
    "A photoreal AI preview of your rhinoplasty on your own photo, reviewed by a real surgeon. First preview free. No app download. $19 unlocks 24 hours of unlimited previews.",
  openGraph: {
    title: "See Your Face. Not Someone Else's.",
    description:
      "Photoreal AI rhinoplasty preview on your own photo. Reviewed by a real surgeon. First preview free. No app download.",
  },
};

export default function ForPatientsPage() {
  const steps = [
    {
      step: '01',
      title: 'Upload your photo',
      desc: 'A clear, front-facing or 3/4-angle photo. Metadata stripped immediately. Your photo is never shown to other users.',
      cta: 'Try the simulator',
      href: routes.simulateProcedure('rhinoplasty'),
      icon: <Upload className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      step: '02',
      title: 'Preview your rhinoplasty',
      desc: 'AI renders a photoreal preview on your actual photo in about 30 seconds. First result is free, fully visible — no blur.',
      cta: 'Try free',
      href: routes.simulateProcedure('rhinoplasty'),
      icon: <Sparkles className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      step: '03',
      title: 'Send to a surgeon for review',
      desc: "When you're ready, a surgeon can review and approve your preview. Their name attaches only if they sign off.",
      cta: 'Find a surgeon',
      href: routes.directory,
      icon: <UserCheck className="w-5 h-5 text-[#CF4500]" />,
    },
  ];

  const jtbdCards = [
    {
      title: 'Stop the mental projection loop',
      desc: "Three to nine months of saving other people's before-and-afters doesn't show you a visualization on your own face. Faceify does.",
      icon: <Layers className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      title: 'Decide if a consult is worth booking',
      desc: 'A paid consultation is a real commitment: time off work, family questions, anxiety. Explore a visualization privately first, then decide.',
      icon: <Calendar className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      title: 'Have something to show one trusted person',
      desc: 'Not a public post. A preview you can send on WhatsApp to your best friend and ask: be honest, does this look better?',
      icon: <MessageSquare className="w-5 h-5 text-[#CF4500]" />,
    },
  ];

  const deliverItems = [
    {
      title: 'Photoreal of your face, not a 3D mannequin',
      desc: 'We render a photoreal AI preview using your actual photo — your skin, your lighting, your identity. Not a clay model you can spin.',
      icon: <Eye className="w-5 h-5 text-[#141413]" />,
    },
    {
      title: 'A real surgeon reviews your visualization',
      desc: 'Every photoreal render is reviewed by a board-certified surgeon before it carries their name.',
      icon: <Stethoscope className="w-5 h-5 text-[#141413]" />,
    },
    {
      title: 'First preview free. No blur, no paywall.',
      desc: 'Your first result is fully visible — no watermark, no blurred reveal. $19 unlocks 24 hours of unlimited previews. One-time, not a subscription.',
      icon: <Coins className="w-5 h-5 text-[#141413]" />,
    },
    {
      title: 'Private. Your photo is never shared.',
      desc: 'Metadata stripped before processing. Cached for one hour then deleted. Never used to train AI. Never shown to other users.',
      icon: <Lock className="w-5 h-5 text-[#141413]" />,
    },
    {
      title: 'Any phone, any browser',
      desc: 'Works on Android and iPhone. No app download. No account required for your first preview. 5 languages: English, Korean, Thai, Japanese, Portuguese.',
      icon: <Smartphone className="w-5 h-5 text-[#141413]" />,
    },
    {
      title: 'Recovery time and cost context',
      desc: 'Every procedure comes with honest cost ranges and recovery time estimates. Information first; surgeon recommendation only when you ask.',
      icon: <Clock className="w-5 h-5 text-[#141413]" />,
    },
  ];

  const sampleProcedures = [
    {
      name: 'Rhinoplasty',
      slug: 'rhinoplasty',
      tagline: 'Reshape your nose',
      recoveryTime: '2–3 weeks',
      costRange: '$3,000 – $15,000',
    },
    {
      name: 'Blepharoplasty',
      slug: 'blepharoplasty',
      tagline: 'Brighter, refreshed eyes',
      recoveryTime: '1–2 weeks',
      costRange: '$1,500 – $7,000',
    },
    {
      name: 'Dermal Fillers',
      slug: 'dermal-fillers',
      tagline: 'Volume and contour',
      recoveryTime: 'No downtime',
      costRange: '$500 – $2,000',
    },
    {
      name: 'Chin Augmentation',
      slug: 'chin-augmentation',
      tagline: 'Define your profile',
      recoveryTime: '1 week',
      costRange: '$2,000 – $5,000',
    },
    {
      name: 'Buccal Fat Removal',
      slug: 'buccal-fat-removal',
      tagline: 'Sculpted facial structure',
      recoveryTime: '3–5 days',
      costRange: '$2,000 – $5,000',
    },
    {
      name: 'Lip Lift',
      slug: 'lip-lift',
      tagline: 'Fuller, youthful lips',
      recoveryTime: '1 week',
      costRange: '$1,500 – $4,000',
    },
    {
      name: 'Chemical Peel',
      slug: 'chemical-peel',
      tagline: 'Renewed, glowing skin',
      recoveryTime: '3–14 days',
      costRange: '$150 – $3,000',
    },
    {
      name: 'Thread Lift',
      slug: 'thread-lift',
      tagline: 'Non-surgical lift',
      recoveryTime: '2–3 days',
      costRange: '$1,000 – $4,500',
    },
  ];

  const delightPoints = [
    {
      title: '"That\'s actually my face."',
      desc: 'The preview uses your photo, not a generic model. Identity preservation is built into the render — if the AI drifts, it retries or tells you honestly.',
    },
    {
      title: 'The surgeon\'s name is on it.',
      desc: 'Once your surgeon reviews the visualization, their name and clinic appear on it. You didn\'t know to ask for that. Now you have it.',
    },
    {
      title: 'The tool tells you when a change isn\'t realistic.',
      desc: 'Push a slider past what\'s anatomically plausible and the AI flags it rather than inventing a result. A tool that says no builds trust faster than one that says yes to everything.',
    },
  ];

  const privacyPoints = [
    {
      title: 'Metadata stripped before processing',
      desc: 'Location, device, and timestamp data removed before your photo touches any server. We do not use your photo to train AI.',
      icon: <ShieldCheck className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      title: 'Cached 1 hour, then deleted',
      desc: 'Your photo is held only as long as the render takes. After one hour it is gone. No archive, no long-term storage.',
      icon: <Clock className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      title: 'Email-only sign-up for your first session',
      desc: 'No Google sign-in. No phone number. No LinkedIn. Your rhinoplasty research stays separate from your work email and social accounts.',
      icon: <Lock className="w-5 h-5 text-[#CF4500]" />,
    },
    {
      title: 'One-time charge, not a subscription',
      desc: '$19 unlocks 24 hours of unlimited previews. It auto-expires. No recurring charge, no stealth subscription.',
      icon: <Coins className="w-5 h-5 text-[#CF4500]" />,
    },
  ];

  const honestyCards = [
    {
      title: 'Not a surgical guarantee',
      desc: "Real outcomes depend on your anatomy, your surgeon's technique, and healing. The preview is a research aid, not a prediction.",
    },
    {
      title: 'Not a replacement for a consult',
      desc: 'A real consultation with a surgeon is the only place a surgical plan is decided. Faceify is the on-ramp, not the destination.',
    },
    {
      title: 'Not every photo produces a confident result',
      desc: 'If the AI can\'t preserve your identity in 3 attempts, it tells you: "try a clearer, front-facing angle" rather than shipping a stranger\'s face.',
    },
  ];

  return (
    <div className="bg-[#F3F0EE] min-h-screen">
      {/* ─── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        {/* Subtle Decorative Arc */}
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
            opacity="0.35"
          />
          <circle cx="980" cy="300" r="3.5" fill="#CF4500" opacity="0.6" />
        </svg>

        <div className="container-master relative z-10 text-center max-w-4xl mx-auto">
          {/* Chapter Label */}
          <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
            FOR PATIENTS
          </span>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#141413] font-display text-balance leading-[1.08] mt-6 mb-6">
            See your face.{' '}
            <span className="italic font-medium text-[#CF4500]">
              Not someone else&apos;s.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto font-normal mb-8">
            A photoreal AI visualization of rhinoplasty on your own photo, reviewed by a real surgeon for your discussion. First preview free. No app download.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Link
              href={routes.simulateProcedure('rhinoplasty')}
              className="px-7 py-3.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-sm font-medium tracking-tight shadow-sm transition-all inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#CF4500]" />
              <span>Try the Rhinoplasty Simulator</span>
            </Link>

            <Link
              href={routes.procedures}
              className="px-7 py-3.5 rounded-[20px] bg-white text-[#141413] border border-black/10 hover:bg-[#EBE7E3] text-sm font-medium tracking-tight transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-4 h-4 text-[#555555]" />
              <span>Browse all simulators</span>
            </Link>
          </div>

          {/* Reassurances Checkpoints */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-[#555555] font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CF4500]" />
              <span>First preview free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CF4500]" />
              <span>No app download</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#CF4500]" />
              <span>Photo stripped and deleted after 1 hour</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. YOUR JOURNEY (How It Works) ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#FCFBFA] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              YOUR JOURNEY
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Preview. Review. Decide.
            </h2>
            <p className="text-sm sm:text-base text-[#555555]">
              Three steps, under 5 minutes, on any phone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((st) => (
              <div
                key={st.step}
                className="bg-white rounded-[32px] p-8 border border-black/5 shadow-level-1 flex flex-col justify-between space-y-6 hover:shadow-level-2 transition-all relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#F3F0EE] text-[#141413]">
                      Step {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#EBE7E3]/60 flex items-center justify-center">
                      {st.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-[#141413] tracking-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5">
                  <Link
                    href={st.href}
                    className="text-xs font-semibold text-[#141413] hover:text-[#CF4500] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{st.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHAT YOU ACTUALLY NEED (JTBD) ───────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              WHAT YOU ACTUALLY NEED
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Before you book a consult, you want to know what your face would look like.
            </h2>
            <p className="text-sm sm:text-base text-[#555555]">
              Not someone else&apos;s before-and-after. Not a 3D mannequin. Your face, after the procedure your surgeon would actually do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {jtbdCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFA] p-8 rounded-[32px] border border-black/5 shadow-level-1 space-y-5 hover:shadow-level-2 transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {card.icon}
                </div>
                <h3 className="text-lg font-medium text-[#141413] tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. WHAT WE DELIVER (Six Things We Get Right) ────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              WHAT WE DELIVER
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Six things we get right.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deliverItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFA] rounded-[32px] p-7 border border-black/5 shadow-level-1 space-y-4 hover:shadow-level-2 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#EBE7E3]/60 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-[#141413] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. EXPLORE PROCEDURES ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl space-y-3">
              <span className="text-eyebrow-master text-eyebrow-dot">
                EXPLORE PROCEDURES
              </span>
              <h2 className="text-h2-section text-[#141413]">
                What would you like to explore?
              </h2>
              <p className="text-sm text-[#555555]">
                Pick a procedure and explore a visualization on your own photo.
              </p>
            </div>
            <Link
              href={routes.procedures}
              className="text-xs font-bold text-[#141413] hover:text-[#CF4500] inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View all 85+ procedures</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProcedures.map((proc) => (
              <div
                key={proc.slug}
                className="bg-[#FCFBFA] rounded-[28px] p-6 border border-black/5 shadow-level-1 flex flex-col justify-between space-y-5 hover:shadow-level-2 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#EBE7E3] text-[#555555]">
                      {proc.recoveryTime}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-[#CF4500]">
                      {proc.costRange}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-[#141413] group-hover:text-[#CF4500] transition-colors">
                    {proc.name}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {proc.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/5">
                  <Link
                    href={routes.simulateProcedure(proc.slug)}
                    className="text-xs font-semibold text-[#141413] group-hover:text-[#CF4500] inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Simulate</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. WHAT SURPRISES PATIENTS (Dark Stadium Card) ────────────────── */}
      <section className="py-20 md:py-28 bg-[#F3F0EE]">
        <div className="container-master">
          <div className="bg-[#141413] text-white rounded-[40px] p-10 md:p-16 shadow-level-2 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-eyebrow-master text-eyebrow-dot text-white/60">
                WHAT SURPRISES PATIENTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white font-display">
                Three things patients didn&apos;t expect.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {delightPoints.map((dp, i) => (
                <div
                  key={i}
                  className="space-y-3 border-l border-white/15 pl-6"
                >
                  <div className="text-xs font-mono font-bold text-[#F37338]">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-medium text-white tracking-tight">
                    {dp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                    {dp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. PRIVACY BY DESIGN ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              PRIVACY BY DESIGN
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Your face belongs to you.
            </h2>
            <p className="text-sm sm:text-base text-[#555555]">
              We built the privacy rules into the architecture — not the policy document.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPoints.map((pp, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFA] rounded-[32px] p-7 border border-black/5 shadow-level-1 space-y-4 hover:shadow-level-2 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {pp.icon}
                </div>
                <h3 className="text-base font-semibold text-[#141413] tracking-tight">
                  {pp.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {pp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. PATIENT VOICE & MEDICAL HONESTY ────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master space-y-16">
          {/* Patient Quote Card */}
          <div className="p-8 md:p-12 rounded-[36px] bg-[#FCFBFA] border border-black/5 shadow-level-1 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              IN PATIENTS&apos; OWN WORDS
            </span>
            <p className="text-lg sm:text-2xl font-serif italic text-[#141413] leading-relaxed">
              &ldquo;Every other tool showed someone else&apos;s face. This one actually looked like me — and a real surgeon reviewed it before I saw the final.&rdquo;
            </p>
            <p className="text-xs text-[#696969] font-medium pt-2">
              Composite from patient research: r/Rhinoplasty and RealSelf consultation threads
            </p>
          </div>

          {/* Honest Disclaimer Section */}
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-eyebrow-master text-eyebrow-dot">
                WHAT WE DON&apos;T PROMISE
              </span>
              <h2 className="text-h2-section text-[#141413]">
                Honest about what AI can and can&apos;t do.
              </h2>
              <p className="text-sm text-[#555555]">
                Faceify is a research tool, not a medical device. Every preview carries this disclaimer — verbatim from surgeon comments patients have been reading on RealSelf for years.
              </p>
            </div>

            {/* Official Disclaimer Box */}
            <div className="p-6 md:p-8 rounded-[28px] bg-white border-l-4 border-l-[#CF4500] border border-black/5 shadow-sm max-w-3xl mx-auto text-center">
              <p className="text-xs sm:text-sm font-medium text-[#141413] italic leading-relaxed">
                &ldquo;Computer simulations are not meant to predict or guarantee an outcome after rhinoplasty. They are a means of visual communication to support the consultation.&rdquo;
              </p>
            </div>

            {/* 3 Honesty Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {honestyCards.map((hc, idx) => (
                <div
                  key={idx}
                  className="bg-[#FCFBFA] p-7 rounded-[28px] border border-black/5 shadow-level-1 space-y-3 hover:shadow-level-2 transition-all"
                >
                  <div className="flex items-center gap-2 text-[#CF4500]">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Reality Check 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-[#141413]">
                    {hc.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {hc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      ─── 9. AESTHETIC MARKETPLACE DEALS ───────────────────────────────────
      <section className="py-20 md:py-28 bg-white border-t border-black/5">
        <div className="container-master">
          <div className="p-8 md:p-14 rounded-[40px] bg-[#FCFBFA] border border-black/5 shadow-level-1 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <span className="text-eyebrow-master text-eyebrow-dot">
                AESTHETIC MARKETPLACE
              </span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#141413] font-display">
                Save up to{' '}
                <span className="italic font-medium text-[#CF4500]">
                  80%
                </span>{' '}
                on top procedures
              </h2>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                Exclusive deals from verified clinics across Asia-Pacific. Browse rhinoplasty, fillers, and 85+ procedures at unbeatable prices.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <span className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#EBE7E3] text-[#141413] inline-flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#CF4500]" />
                  Up to 80% savings
                </span>
                <span className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#EBE7E3] text-[#141413] inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#CF4500]" />
                  Verified clinics only
                </span>
                <span className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#EBE7E3] text-[#141413] inline-flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-[#CF4500]" />
                  Asia-Pacific wide
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href={routes.consultation}
                className="px-8 py-3.5 rounded-[20px] bg-[#141413] text-white hover:bg-[#262627] text-sm font-medium tracking-tight shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Browse All Deals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="bg-[#141413] text-white rounded-[40px] p-10 md:p-20 text-center shadow-level-2 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <span className="text-eyebrow-master text-eyebrow-dot text-white/60">
                READY TO SEE YOUR FACE?
              </span>

              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white font-display text-balance">
                Stop scrolling other people&apos;s noses.{' '}
                <span className="italic font-medium text-[#F37338]">
                  See yours.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto font-normal">
                First preview free. No app download. No account to start. $19 unlocks 24 hours of unlimited previews.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href={routes.simulateProcedure('rhinoplasty')}
                  className="px-8 py-3.5 bg-white text-[#141413] hover:bg-[#F3F0EE] text-sm font-medium rounded-[20px] shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#CF4500]" />
                  <span>Try the Rhinoplasty Simulator</span>
                </Link>

                <Link
                  href={routes.directory}
                  className="px-8 py-3.5 bg-transparent text-white border border-white/30 hover:bg-white/10 text-sm font-medium rounded-[20px] transition-all inline-flex items-center gap-2"
                >
                  <span>Find a Surgeon</span>
                </Link>

                <Link
                  href={routes.consultation}
                  className="px-8 py-3.5 bg-transparent text-white border border-white/30 hover:bg-white/10 text-sm font-medium rounded-[20px] transition-all inline-flex items-center gap-2"
                >
                  <span>Browse Deals</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
