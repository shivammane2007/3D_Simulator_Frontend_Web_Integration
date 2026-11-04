'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Microscope, FlaskConical } from 'lucide-react';
import { routes } from '@/config/routes';

interface CaseStatic {
  id: number;
  type: 'Surgical' | 'Non-Surgical';
  beforeSrc: string | null;
  afterSrc: string | null;
  status: 'live' | 'coming-soon';
  procedure: string;
  viewLabel: string;
  description: string;
  region: string;
  sourceBadge: 'real-patient' | 'ai-simulation';
}

const CASES_STATIC: CaseStatic[] = [
  // ── Real patient cases (consented, verified) ──────────────────────────
  {
    id: 1,
    type: 'Surgical',
    beforeSrc: '/images/gallery/blepharoplasty-hong-liu-before.webp',
    afterSrc: '/images/gallery/blepharoplasty-hong-liu-after.webp',
    status: 'live',
    procedure: 'Blepharoplasty',
    viewLabel: 'Frontal View',
    description: 'Upper blepharoplasty with natural crease formation and restored lid symmetry.',
    region: 'Seoul Pilot Case',
    sourceBadge: 'real-patient',
  },
  {
    id: 2,
    type: 'Surgical',
    beforeSrc: '/images/gallery/chin-augmentation-joon-ho-kim-before.webp',
    afterSrc: '/images/gallery/chin-augmentation-joon-ho-kim-after.webp',
    status: 'live',
    procedure: 'Chin Augmentation',
    viewLabel: 'Profile View',
    description: 'Chin projection enhancement using simulation to preview ideal proportions relative to nasal tip and lip position.',
    region: 'Seoul Pilot Case',
    sourceBadge: 'real-patient',
  },
  {
    id: 3,
    type: 'Non-Surgical',
    beforeSrc: '/images/gallery/dermal-fillers-deepika-reddy-before.webp',
    afterSrc: '/images/gallery/dermal-fillers-deepika-reddy-after.webp',
    status: 'live',
    procedure: 'Dermal Fillers',
    viewLabel: 'Oblique View',
    description: 'Midface volume restoration with hyaluronic acid filler. Cheek projection and nasolabial fold improvement.',
    region: 'Mumbai Pilot Case',
    sourceBadge: 'real-patient',
  },
  {
    id: 4,
    type: 'Surgical',
    beforeSrc: '/images/gallery/buccal-fat-removal-mei-lin-chen-before.webp',
    afterSrc: '/images/gallery/buccal-fat-removal-mei-lin-chen-after.webp',
    status: 'live',
    procedure: 'Buccal Fat Removal',
    viewLabel: 'Frontal View',
    description: 'Buccal fat pad excision for mid-face slimming. Simulation confirmed projected cheek contour pre-operatively.',
    region: 'Singapore Pilot Case',
    sourceBadge: 'real-patient',
  },
  {
    id: 5,
    type: 'Surgical',
    beforeSrc: '/images/gallery/lip-lift-carlos-reyes-before.webp',
    afterSrc: '/images/gallery/lip-lift-carlos-reyes-after.webp',
    status: 'live',
    procedure: 'Lip Lift',
    viewLabel: 'Frontal View',
    description: "Subnasal bullhorn lip lift with simulation-guided cupid's bow positioning. Upper lip definition enhanced.",
    region: 'Bangkok Pilot Case',
    sourceBadge: 'real-patient',
  },
  // ── AI simulator outputs (same fixture, deformation-region-only diff) ─
  {
    id: 6,
    type: 'Surgical',
    beforeSrc: '/images/gallery/chin-augmentation-fixture-1-before.webp',
    afterSrc: '/images/gallery/chin-augmentation-fixture-1-after.webp',
    status: 'live',
    procedure: 'Chin Augmentation',
    viewLabel: 'AI Simulation Preview · Fixture 1',
    description: 'AI simulator output. Same fixture, deformation region only — chin projection enhanced with implant. Preview what the simulator generates.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 7,
    type: 'Surgical',
    beforeSrc: '/images/gallery/facelift-fixture-3-before.webp',
    afterSrc: '/images/gallery/facelift-fixture-3-after.webp',
    status: 'live',
    procedure: 'Facelift',
    viewLabel: 'AI Simulation Preview · Fixture 3',
    description: 'AI simulator output. Mid and lower face lift simulation showing jowl reduction and jawline definition improvements.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 8,
    type: 'Surgical',
    beforeSrc: '/images/gallery/facial-contouring-fixture-3-before.webp',
    afterSrc: '/images/gallery/facial-contouring-fixture-3-after.webp',
    status: 'live',
    procedure: 'Facial Contouring',
    viewLabel: 'AI Simulation Preview · Fixture 3',
    description: 'AI simulator output. Overall facial contouring simulation demonstrating cheekbone and jawline refinement.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 9,
    type: 'Surgical',
    beforeSrc: '/images/gallery/brow-lift-fixture-2-before.webp',
    afterSrc: '/images/gallery/brow-lift-fixture-2-after.webp',
    status: 'live',
    procedure: 'Brow Lift',
    viewLabel: 'AI Simulation Preview · Fixture 2',
    description: 'AI simulator output. Lateral brow elevation and forehead smoothing — deformation region only modified.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 10,
    type: 'Surgical',
    beforeSrc: '/images/gallery/mid-facelift-fixture-1-before.webp',
    afterSrc: '/images/gallery/mid-facelift-fixture-1-after.webp',
    status: 'live',
    procedure: 'Mid Facelift',
    viewLabel: 'AI Simulation Preview · Fixture 1',
    description: 'AI simulator output. Cheek and midface lift simulation with SMAS layer deformation preview.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 11,
    type: 'Non-Surgical',
    beforeSrc: '/images/gallery/thread-lift-fixture-1-before.webp',
    afterSrc: '/images/gallery/thread-lift-fixture-1-after.webp',
    status: 'live',
    procedure: 'Thread Lift',
    viewLabel: 'AI Simulation Preview · Fixture 1',
    description: 'AI simulator output. PDO thread lift trajectory simulation for midface and jowl elevation.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 12,
    type: 'Surgical',
    beforeSrc: '/images/gallery/fat-grafting-fixture-1-before.webp',
    afterSrc: '/images/gallery/fat-grafting-fixture-1-after.webp',
    status: 'live',
    procedure: 'Fat Grafting',
    viewLabel: 'AI Simulation Preview · Fixture 1',
    description: 'AI simulator output. Autologous fat transfer simulation for midface volume restoration and hollow correction.',
    region: 'AI Simulator Output',
    sourceBadge: 'ai-simulation',
  },
  {
    id: 13,
    type: 'Surgical',
    beforeSrc: null,
    afterSrc: null,
    status: 'coming-soon',
    procedure: 'Rhinoplasty',
    viewLabel: 'Profile View',
    description: 'Dorsal hump reduction and tip refinement planned with simulation. Pilot cases pending patient consent release.',
    region: 'Bangkok Pilot Case',
    sourceBadge: 'real-patient',
  },
];

function BeforeAfterStatic({
  beforeSrc,
  afterSrc,
  alt,
  priority,
  beforeLabel = 'Before',
  afterLabel = 'After',
  sourceBadge,
}: {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  priority?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
  sourceBadge: 'real-patient' | 'ai-simulation';
}) {
  const isAI = sourceBadge === 'ai-simulation';

  return (
    <div className="grid grid-cols-2 w-full relative select-none">
      {/* Before */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
        <Image
          src={beforeSrc}
          alt={`${alt} — ${beforeLabel}`}
          fill
          unoptimized
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 400px"
          priority={priority}
          draggable={false}
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10 shadow-sm">
          {beforeLabel}
        </div>
      </div>

      {/* After */}
      <div className="relative aspect-[3/4] overflow-hidden border-l border-white/20 bg-black/5">
        <Image
          src={afterSrc}
          alt={`${alt} — ${afterLabel}`}
          fill
          unoptimized
          className="object-cover object-top"
          sizes="(max-width: 768px) 50vw, 400px"
          priority={priority}
          draggable={false}
        />
        <div className="absolute top-3 right-3 bg-[#CF4500] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10 shadow-sm">
          {afterLabel}
        </div>
      </div>

      {/* Center Dual-Circle Divider Handle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/95 shadow-md border border-black/10 flex items-center justify-center gap-0.5 pointer-events-none z-10">
        <span className="w-1 h-1 rounded-full bg-[#141413]" />
        <span className="w-1 h-1 rounded-full bg-[#CF4500]" />
      </div>

      {/* Source Badge (Bottom Center) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap z-10">
        {isAI ? (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#141413]/85 backdrop-blur-sm text-[#F37338] border border-white/20 shadow-sm">
            AI Simulation
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white border border-white/20 shadow-sm">
            Real Patient
          </span>
        )}
      </div>
    </div>
  );
}

function ComingSoonPlaceholder({
  procedure,
  notice,
}: {
  procedure: string;
  notice: string;
}) {
  return (
    <div className="w-full aspect-[2/1] bg-gradient-to-br from-[#EBE7E3] via-white to-[#EBE7E3] flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="w-11 h-11 rounded-xl bg-white border border-black/10 flex items-center justify-center shadow-sm">
          <FlaskConical className="w-5 h-5 text-[#555555]" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-[#141413]">{procedure}</p>
        <p className="text-[11px] text-[#696969] max-w-[260px] leading-relaxed">
          {notice}
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const FILTERS = [
    'All',
    'Blepharoplasty',
    'Chin Augmentation',
    'Dermal Fillers',
    'Buccal Fat Removal',
    'Lip Lift',
    'Facelift',
    'Facial Contouring',
    'Brow Lift',
    'Mid Facelift',
    'Thread Lift',
    'Fat Grafting',
    'Rhinoplasty',
  ];

  const filtered =
    activeFilter === 'All'
      ? CASES_STATIC
      : CASES_STATIC.filter((c) => c.procedure === activeFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (a.status === 'live' && b.status !== 'live') return -1;
    if (a.status !== 'live' && b.status === 'live') return 1;
    return 0;
  });

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-24">
      {/* ── 1. Hero Section ── */}
      <section className="pb-12 px-4 relative overflow-hidden text-center">
        {/* Subtle decorative orbital arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-100 450 C 400 550, 800 120, 1550 220"
            stroke="#F37338"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.35"
          />
          <circle cx="980" cy="200" r="3.5" fill="#CF4500" opacity="0.4" />
        </svg>

        <div className="container-master relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-eyebrow-master text-eyebrow-dot justify-center">
            CLINICAL EVIDENCE
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-display tracking-tight text-[#141413] leading-[1.1]">
            Before &amp;{' '}
            <span className="italic font-medium text-[#CF4500]">
              After
            </span>{' '}
            Gallery
          </h1>

          <p className="pt-2 text-base sm:text-lg text-[#555555] font-normal max-w-[58ch] mx-auto leading-relaxed">
            AI simulation previews and real patient stories (where consented). Side-by-side results for each case.
          </p>

          {/* Procedure Filter Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  aria-pressed={isActive}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#141413] text-[#F3F0EE] shadow-sm'
                      : 'bg-white border border-black/10 text-[#555555] hover:text-[#141413] hover:border-black/20'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 2. Case Cards Grid ── */}
      <section className="px-4">
        <div className="container-master max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((c, i) => (
              <div
                key={c.id}
                className="bg-white rounded-[20px] border border-black/10 overflow-hidden hover:border-[#CF4500]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Side-by-Side Images */}
                {c.status === 'live' && c.beforeSrc && c.afterSrc ? (
                  <BeforeAfterStatic
                    beforeSrc={c.beforeSrc}
                    afterSrc={c.afterSrc}
                    alt={`${c.procedure} — ${c.viewLabel}`}
                    priority={i < 3}
                    beforeLabel="Before"
                    afterLabel="After"
                    sourceBadge={c.sourceBadge}
                  />
                ) : (
                  <ComingSoonPlaceholder
                    procedure={c.procedure}
                    notice="Cases coming soon from clinical pilots. Pending surgeon review and patient consent."
                  />
                )}

                {/* Case Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="font-semibold text-[#141413] text-sm">
                        {c.procedure}
                      </h3>
                      <span className="text-[11px] text-[#696969]">
                        — {c.viewLabel} · Case {c.id}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          c.type === 'Surgical'
                            ? 'text-[#CF4500] bg-[#CF4500]/10 border-[#CF4500]/20'
                            : 'text-[#9A3A0A] bg-[#9A3A0A]/10 border-[#9A3A0A]/20'
                        }`}
                      >
                        {c.type}
                      </span>
                    </div>

                    <p className="text-xs text-[#555555] mb-3 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 mt-auto">
                    <p className="text-[11px] text-[#696969] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#CF4500]" aria-hidden="true" />
                      {c.region}
                    </p>
                    {c.status === 'live' ? (
                      <span className="text-[10px] font-bold text-[#CF4500] bg-[#CF4500]/10 px-2 py-0.5 rounded-full border border-[#CF4500]/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500] animate-pulse" />
                        Live
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#696969] bg-[#EBE7E3] px-2 py-0.5 rounded-full border border-black/10">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── 3. Pipeline Notice ── */}
          <div className="mt-10 flex items-center justify-center gap-3 text-xs text-[#696969]">
            <Microscope className="w-4 h-4 text-[#CF4500]" aria-hidden="true" />
            <p>More cases being added from our clinical pilots across Bangkok, Seoul, Singapore &amp; Mumbai.</p>
          </div>

          {/* ── 4. Bottom CTA ── */}
          <div className="max-w-2xl mx-auto text-center bg-[#141413] rounded-[24px] p-10 sm:p-14 relative overflow-hidden mt-16 shadow-level-2">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display text-white font-medium">
                Want to see Faceify in action at your practice?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto leading-relaxed text-sm">
                Get a personalized walkthrough. We&apos;ll show you how the simulator fits into your consultation workflow.
              </p>
              <div className="pt-2">
                <Link
                  href={routes.consultation}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#CF4500] hover:bg-[#F37338] text-white text-sm font-bold rounded-full transition-all shadow-sm"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
