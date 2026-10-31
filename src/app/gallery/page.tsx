'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldAlert, ArrowRight, CheckCircle2, SlidersHorizontal, Eye } from 'lucide-react';
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

interface GalleryCase {
  id: string;
  title: string;
  procedure: string;
  category: 'all' | 'surgical' | 'contouring' | 'injectable';
  categoryLabel: string;
  description: string;
  sliderLabel: string;
  simulatorSlug: string;
  parameters: { label: string; value: string }[];
}

const galleryCases: GalleryCase[] = [
  {
    id: 'rhino-case-1',
    title: 'Nasal Dorsal Reduction & Tip Rotation',
    procedure: 'Rhinoplasty',
    category: 'surgical',
    categoryLabel: 'Surgical',
    description: 'Reduction of prominent osteocartilaginous dorsal hump with 4-degree cranial tip rotation and alar base harmonization.',
    sliderLabel: 'Rhinoplasty Simulation',
    simulatorSlug: 'rhinoplasty',
    parameters: [
      { label: 'Dorsal Hump', value: '-2.4 mm' },
      { label: 'Tip Rotation', value: '+4.5°' },
      { label: 'Nasolabial Angle', value: '104°' },
    ],
  },
  {
    id: 'vline-case-1',
    title: 'Mandibular Angle & Lower Face Tapering',
    procedure: 'V-Line Contouring',
    category: 'contouring',
    categoryLabel: 'Contouring',
    description: 'Parametric lower face tapering with jaw angle refinement, balancing the lower facial third while preserving natural gonial contours.',
    sliderLabel: 'V-Line Simulation',
    simulatorSlug: 'facial-contouring',
    parameters: [
      { label: 'Mandible Width', value: '-3.2 mm' },
      { label: 'Chin Apex', value: '+1.5 mm' },
      { label: 'Facial Thirds', value: '1:1:0.98' },
    ],
  },
  {
    id: 'bleph-case-1',
    title: 'Upper Blepharoplasty & Canthal Elevation',
    procedure: 'Blepharoplasty',
    category: 'surgical',
    categoryLabel: 'Surgical',
    description: 'Supratarsal fold crease definition and lateral canthal angle elevation to open the peri-orbital region and reduce hooded eyelid fatigue.',
    sliderLabel: 'Blepharoplasty Simulation',
    simulatorSlug: 'blepharoplasty',
    parameters: [
      { label: 'Fold Elevation', value: '+2.8 mm' },
      { label: 'Canthal Tilt', value: '+3.5°' },
      { label: 'Aperture Gain', value: '+14%' },
    ],
  },
  {
    id: 'lift-case-1',
    title: 'Deep-Plane Midface & Jowl Repositioning',
    procedure: 'Facelift',
    category: 'surgical',
    categoryLabel: 'Surgical',
    description: 'Vector-aligned anatomical elevation restoring malar fat pad projection, smoothing nasolabial folds, and sharpening the cervicofacial angle.',
    sliderLabel: 'Facelift Simulation',
    simulatorSlug: 'facelift',
    parameters: [
      { label: 'Malar Elevation', value: '+4.2 mm' },
      { label: 'Jawline Vector', value: '45° Cranial' },
      { label: 'Fold Softening', value: '-38%' },
    ],
  },
  {
    id: 'chin-case-1',
    title: 'Genioplasty Projection & Labiomental Refinement',
    procedure: 'Chin Augmentation',
    category: 'contouring',
    categoryLabel: 'Contouring',
    description: 'Horizontal pogonion advancement to bring the chin into harmonious alignment with the lower lip and nasal tip on Riedel profile lines.',
    sliderLabel: 'Chin Augmentation Simulation',
    simulatorSlug: 'chin-augmentation',
    parameters: [
      { label: 'Pogonion Projection', value: '+4.0 mm' },
      { label: 'Riedel Plane', value: 'Aligned' },
      { label: 'Submental Angle', value: '118°' },
    ],
  },
  {
    id: 'lip-case-1',
    title: 'Vermilion Volumization & Cupid’s Bow Definition',
    procedure: 'Lip Augmentation',
    category: 'injectable',
    categoryLabel: 'Injectable',
    description: 'Balanced micro-droplet dermal filler simulation enhancing tubercle projection and Cupid’s bow definition respecting the 1:1.6 golden ratio.',
    sliderLabel: 'Lip Filler Simulation',
    simulatorSlug: 'lip-augmentation',
    parameters: [
      { label: 'Upper/Lower Ratio', value: '1 : 1.6' },
      { label: 'Vermilion Height', value: '+1.8 mm' },
      { label: 'Philtrum Definition', value: 'Enhanced' },
    ],
  },
];

const categoryFilters = [
  { id: 'all', label: 'All Cases' },
  { id: 'surgical', label: 'Surgical' },
  { id: 'contouring', label: 'Contouring' },
  { id: 'injectable', label: 'Injectables' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'all') return galleryCases;
    return galleryCases.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-24">
      {/* ── Centered Editorial Header ── */}
      <section className="pb-16 px-4 relative overflow-hidden text-center">
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
            Clinical Visualizations
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif tracking-tight text-[#141413] leading-[1.1]">
            Simulation Case{' '}
            <span className="italic">Gallery.</span>
          </h1>

          <p className="pt-2 text-base sm:text-lg text-[#555555] font-normal max-w-[58ch] mx-auto leading-relaxed">
            Explore directional 3D visual outcome simulations across aesthetic procedures. Powered by 468 client-side landmarks with zero cloud photo uploads.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2.5">
            {categoryFilters.map((tab) => {
              const count =
                tab.id === 'all'
                  ? galleryCases.length
                  : galleryCases.filter((c) => c.category === tab.id).length;
              const isActive = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={cn(
                    'px-5 py-2 rounded-full text-xs font-semibold tracking-[-0.01em] transition-all cursor-pointer border',
                    isActive
                      ? 'bg-[#141413] text-[#F3F0EE] border-[#141413] shadow-level-1'
                      : 'bg-white text-[#141413] border-black/5 hover:bg-[#EBE7E3] hover:border-black/10'
                  )}
                >
                  {tab.label} <span className={cn('ml-1 text-[11px]', isActive ? 'text-white/60' : 'text-[#696969]')}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive Cases Grid ── */}
      <section className="px-4">
        <div className="container-master max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[40px] p-6 sm:p-8 border border-black/5 shadow-level-1 hover:shadow-level-2 transition-all flex flex-col justify-between space-y-6"
              >
                {/* Top Info Bar */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#CF4500] px-3 py-1 rounded-full bg-[#FDEEE7]">
                    {c.procedure}
                  </span>
                  <span className="text-[11px] font-bold text-[#696969] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                    468 Landmark Mesh
                  </span>
                </div>

                {/* Before / After Interactive Slider */}
                <div className="rounded-[28px] overflow-hidden border border-black/5 shadow-sm bg-[#141413]">
                  <BeforeAfterSlider procedureTitle={c.sliderLabel} />
                </div>

                {/* Case Description & Details */}
                <div className="space-y-4 pt-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#141413] leading-snug">
                      {c.title}
                    </h3>
                    <p className="pt-2 text-sm text-[#555555] leading-relaxed font-normal">
                      {c.description}
                    </p>
                  </div>

                  {/* Clinical Vectors Parameter Strip */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-black/5">
                    {c.parameters.map((param, idx) => (
                      <div key={idx} className="bg-[#FCFBFA] rounded-[18px] p-2.5 border border-black/5 text-center">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#696969] truncate">
                          {param.label}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-[#141413] pt-0.5">
                          {param.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Link to Procedure Simulator */}
                  <div className="pt-2 flex items-center justify-between gap-4">
                    <div className="text-[11px] text-[#696969]">
                      Zero photo upload · Client-side WebGL2
                    </div>
                    <Link
                      href={routes.simulateProcedure(c.simulatorSlug)}
                      className="px-5 py-2.5 rounded-full bg-[#141413] text-[#F3F0EE] hover:bg-[#CF4500] text-xs font-semibold tracking-[-0.01em] transition-all inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>Simulate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Clinical Notice / Disclaimer ── */}
          <div className="mt-14 p-6 sm:p-8 rounded-[32px] bg-white border border-black/5 shadow-level-1 flex flex-col sm:flex-row items-start gap-4 text-xs text-[#555555] leading-relaxed max-w-4xl mx-auto">
            <ShieldAlert className="w-5 h-5 text-[#CF4500] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                Clinical Simulation Notice
              </div>
              <p>
                All images and previews displayed in this gallery are directional AI-generated visual simulations created strictly for patient-physician expectation alignment during consultations. They do not guarantee surgical or clinical outcomes. Every patient possesses unique anatomical constraints, skin elasticity, and healing characteristics.
              </p>
            </div>
          </div>

          {/* ── Bottom Callout: Try Your Face ── */}
          <div className="mt-16 rounded-[40px] bg-[#141413] text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-level-2">
            <span className="text-eyebrow-master text-eyebrow-dot text-white/60 justify-center">
              Private On-Device Simulation
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif text-white">
              Ready to visualize on <span className="italic text-[#F37338]">your own device?</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed font-normal">
              Test rhinoplasty, blepharoplasty, facelift, and 85+ other procedures directly in your web browser. Zero software downloads, zero cloud photo uploads.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={routes.simulate}
                className="px-8 py-3.5 rounded-full bg-[#FF2400] hover:bg-[#CF4500] text-white text-sm font-semibold tracking-[-0.01em] transition-all inline-flex items-center gap-2 shadow-level-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch 3D Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={routes.consultation}
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold tracking-[-0.01em] transition-all inline-flex items-center gap-2"
              >
                <span>Book Clinic Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
