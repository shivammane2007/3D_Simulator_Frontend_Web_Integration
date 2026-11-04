'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScanFace,
  Fingerprint,
  ShieldCheck,
  Cpu,
  MoveHorizontal,
  Microscope,
  BrainCircuit,
  CheckCircle2,
  Globe,
  Lock,
  FileCheck,
  Stethoscope,
  X,
  Check,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { routes } from '@/config/routes';

export default function TechnologyPage() {
  // Slider state for Neural Mesh vs Clinical Reality comparison
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const standardsScrollRef = useRef<HTMLDivElement>(null);

  const scrollStandards = (direction: 'left' | 'right') => {
    if (!standardsScrollRef.current) return;
    const scrollAmount = direction === 'left' ? -360 : 360;
    standardsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const STANDARDS = [
    {
      icon: Cpu,
      title: 'Mechanical Foundation',
      desc: 'Engineering-grade simulation with 468-point mesh logic.',
    },
    {
      icon: Globe,
      title: 'Multi-Ethnic Engine',
      desc: 'Validated against Choi et al. (2018) for diverse anatomies.',
    },
    {
      icon: ShieldCheck,
      title: 'On-Device Privacy',
      desc: 'Zero cloud data retention. Simulations are processed locally.',
    },
    {
      icon: Lock,
      title: 'HIPAA-Aligned',
      desc: 'Built with HIPAA privacy principles — enterprise-grade encryption for all patient metadata.',
    },
    {
      icon: Stethoscope,
      title: 'Surgeon Verified',
      desc: 'Clinically validated in Seoul & Bangkok nodes.',
    },
    {
      icon: FileCheck,
      title: 'ISO 27001 Ready',
      desc: 'Adherence to international information security standards.',
    },
  ];

  const features = [
    {
      icon: ScanFace,
      title: '468-Point Anatomical Mapping',
      description:
        'Every simulation is anchored to skeletal landmarks — so patients see achievable results, not AI artifacts.',
    },
    {
      icon: Fingerprint,
      title: 'Identity-Lock Preservation',
      description:
        'Maintains orbital and mid-face ratios so simulations look like the patient, reducing unrealistic expectations.',
    },
    {
      icon: Cpu,
      title: 'Real-Time Consultation Previews',
      description:
        'Generate visualizations in seconds during consultations. No waiting, no separate appointments.',
    },
    {
      icon: ShieldCheck,
      title: 'HIPAA-Aligned On-Device Processing',
      description:
        'Real-time simulation runs in your browser. Your photo is sent off-device only for the optional AI preview or to save it to your account — never used to train any model.',
    },
  ];

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-28 sm:pt-32 pb-20 font-sans selection:bg-[#CF4500]/15 selection:text-[#141413]">
      {/* ── 1. Page Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-6 sm:pt-10">
        {/* Decorative Trajectory Curve */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
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

        <div className="container-master relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
            UNDER THE HOOD
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#141413] font-display text-balance leading-[1.08]">
            The technology behind{' '}
            <span className="italic font-medium text-[#CF4500]">
              Faceify Labs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto font-normal">
            Explore the anatomical engine, clinical methodology, and AI architecture that power our surgical simulation platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={routes.consultation}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#141413] hover:bg-[#262627] text-white font-bold rounded-full transition-all text-sm shadow-sm"
            >
              <span>Schedule a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={routes.simulate}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-black/10 hover:border-black/20 text-[#141413] font-bold rounded-full hover:bg-[#FCFBFA] transition-all text-sm shadow-sm"
            >
              <span>Try the Simulator</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Methodology: Scan to Surgical Preview (Truth Slider) ── */}
      <section className="py-20 bg-white border-y border-black/5 relative overflow-hidden" id="clinical-engine">
        <div className="container-master">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
              CLINICAL METHODOLOGY
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#141413] tracking-tight">
              How It Works: From Scan to Surgical Preview
            </h2>
            <p className="text-[#555555] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Every simulation is grounded in 468-point anatomical constraints — so what you show patients reflects what&apos;s surgically achievable, not AI hallucinations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Interactive Image Slider */}
            <div className="relative">
              <div
                ref={containerRef}
                className="relative w-full aspect-square max-w-md mx-auto rounded-[28px] overflow-hidden shadow-level-2 border-4 border-[#F3F0EE] cursor-ew-resize select-none bg-black/5"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* Background Layer: 468-Point Mesh */}
                <Image
                  src="/wireframe_face.png"
                  alt="468-Point Neural Face Mesh"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                  priority
                  draggable={false}
                />

                {/* Foreground Layer: Clinical Reality (Clipped by Slider) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <Image
                    src="/realistic_face.png"
                    alt="Clinical Reality Face"
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-cover object-left"
                    priority
                    draggable={false}
                  />
                  {/* Vertical Divider Line */}
                  <div className="absolute inset-y-0 right-0 w-0.5 bg-white shadow-[0_0_12px_rgba(207,69,0,0.6)] z-20" />
                  {/* Center Circle Slider Handle */}
                  <div className="absolute inset-y-0 right-0 w-9 h-9 -mr-4.5 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border border-black/10 flex items-center justify-center z-30 cursor-ew-resize">
                    <MoveHorizontal className="w-4 h-4 text-[#CF4500]" />
                  </div>
                </div>

                {/* Floating Labels */}
                <div className="absolute bottom-4 left-4 text-[10px] font-bold text-white px-2.5 py-1 bg-black/60 backdrop-blur rounded-full pointer-events-none tracking-wider uppercase z-20">
                  REALITY
                </div>
                <div className="absolute bottom-4 right-4 text-[10px] font-bold text-[#F37338] px-2.5 py-1 bg-[#141413]/85 backdrop-blur rounded-full pointer-events-none border border-white/20 tracking-wider uppercase z-20">
                  468-POINT MESH
                </div>
              </div>

              <p className="text-center text-xs text-[#696969] mt-4 italic">
                Drag slider to compare Neural Mesh vs. Clinical Reality
              </p>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-rows-3 gap-5">
              {/* 1. Scan Accuracy */}
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-start gap-5 p-6 bg-[#FCFBFA] rounded-[24px] border border-black/5 hover:border-[#CF4500]/30 hover:shadow-level-2 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0 group-hover:bg-[#CF4500] group-hover:text-white transition-colors shadow-sm">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141413] mb-1 group-hover:text-[#CF4500] transition-colors">
                    Scan Accuracy
                  </h3>
                  <div className="text-2xl font-mono font-bold text-[#141413] mb-1">
                    0.04 mm
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    RMSD mesh tracking tolerance. 65x more precise than manual calipers. This measures face mesh precision, not surgical outcome accuracy.
                  </p>
                </div>
              </motion.div>

              {/* 2. Mesh Logic */}
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-start gap-5 p-6 bg-[#FCFBFA] rounded-[24px] border border-black/5 hover:border-[#CF4500]/30 hover:shadow-level-2 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0 group-hover:bg-[#CF4500] group-hover:text-white transition-colors shadow-sm">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141413] mb-1 group-hover:text-[#CF4500] transition-colors">
                    Mesh Logic
                  </h3>
                  <div className="text-2xl font-mono font-bold text-[#141413] mb-1">
                    468 Pts
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    Dense anatomical constraints that lock facial identity anchors (Orbital-to-Midface Ratio).
                  </p>
                </div>
              </motion.div>

              {/* 3. Outcome Truth */}
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-start gap-5 p-6 bg-[#FCFBFA] rounded-[24px] border border-black/5 hover:border-[#CF4500]/30 hover:shadow-level-2 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0 group-hover:bg-[#CF4500] group-hover:text-white transition-colors shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141413] mb-1 group-hover:text-[#CF4500] transition-colors">
                    Outcome Truth
                  </h3>
                  <div className="text-2xl font-mono font-bold text-[#141413] mb-1">
                    99.5%
                  </div>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    Identity preservation target. Designed to maintain ethnic markers and facial proportions.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Built for Clinical Environments (Carousel) ── */}
      <section className="py-20 bg-[#F3F0EE] border-b border-black/5 overflow-hidden">
        <div className="container-master mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
              ENTERPRISE COMPLIANCE
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-[#141413] tracking-tight mt-2 mb-2">
              Built for Clinical Environments
            </h2>
            <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
              Enterprise-grade privacy, compliance, and accuracy standards — so you can integrate Faceify into your practice with confidence.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollStandards('left')}
              aria-label="Previous standard"
              className="w-10 h-10 rounded-full bg-white border border-black/10 hover:border-black/20 shadow-level-1 flex items-center justify-center text-[#141413] hover:text-[#CF4500] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollStandards('right')}
              aria-label="Next standard"
              className="w-10 h-10 rounded-full bg-white border border-black/10 hover:border-black/20 shadow-level-1 flex items-center justify-center text-[#141413] hover:text-[#CF4500] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative w-full">
          <div
            ref={standardsScrollRef}
            className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory container-master scrollbar-hide no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {STANDARDS.map((std, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[340px] bg-white p-6 sm:p-7 rounded-[28px] border border-black/5 shadow-level-1 hover:shadow-level-2 hover:border-[#CF4500]/25 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F3F0EE] flex items-center justify-center mb-5 group-hover:bg-[#FDEEE7] transition-colors">
                    <std.icon className="w-6 h-6 text-[#141413] group-hover:text-[#CF4500] transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-[#141413] mb-2">{std.title}</h3>
                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Anatomical Precision: 468 landmarks. Zero guesswork. ── */}
      <section className="py-20 bg-white border-b border-black/5">
        <div className="container-master max-w-3xl mx-auto text-center space-y-4">
          <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
            ANATOMICAL PRECISION
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-[#141413] tracking-tight">
            468 landmarks. Zero guesswork.
          </h2>
          <p className="text-[#555555] text-base leading-relaxed max-w-2xl mx-auto">
            Every simulation is grounded in MediaPipe&apos;s 468-point face mesh — the same landmark set used in clinical research. Deformations follow real tissue constraints so the result you show a patient reflects a plausible anatomical outcome, not a freehand warp.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            {[
              { stat: '468', label: 'Tracked landmarks per frame' },
              { stat: '0.04 mm', label: 'Median RMSD mesh accuracy' },
              { stat: 'Real-time', label: 'Deformation at 30 fps' },
            ].map(({ stat, label }) => (
              <div
                key={stat}
                className="bg-[#FCFBFA] border border-black/5 rounded-[24px] p-6 shadow-level-1 hover:shadow-level-2 hover:border-[#CF4500]/20 transition-all text-center"
              >
                <div className="text-3xl font-display font-medium text-[#CF4500] mb-1.5">
                  {stat}
                </div>
                <div className="text-xs font-semibold text-[#696969] uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Built for Clinical Accuracy (Technology & Face Grid) ── */}
      <section className="py-24 bg-[#F3F0EE] border-b border-black/5 relative overflow-hidden">
        <div className="container-master">
          <div
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            onMouseMove={(e) => {
              if (!featureCardsRef.current) return;
              const cards = featureCardsRef.current.querySelectorAll('.feature-card-group');
              cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
              });
            }}
          >
            {/* Left Column: Text & Features */}
            <div className="lg:w-1/2 space-y-6">
              <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
                ARCHITECTURAL RIGOR
              </span>

              <h2 className="text-3xl md:text-5xl font-display font-medium text-[#141413] tracking-tight leading-[1.1]">
                Built for <br />
                <span className="italic font-medium text-[#CF4500]">Clinical Accuracy</span>
              </h2>

              <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
                Unlike consumer face filters, Faceify Labs is engineered for surgical visualisation. Our 468-point landmark system anchors every transformation to underlying skeletal anatomy — giving your patients a preview they can trust.
              </p>

              <div ref={featureCardsRef} className="grid sm:grid-cols-2 gap-5 pt-4">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="feature-card-group relative flex flex-col gap-3 p-5 rounded-[22px] bg-white border border-black/5 shadow-level-1 hover:border-[#CF4500]/25 hover:shadow-level-2 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shadow-sm">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-[#141413]">
                      {f.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {f.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Face Grid Simulation */}
            <div className="lg:w-1/2 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square max-w-md mx-auto"
              >
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#CF4500]/15 to-[#F37338]/10 rounded-full blur-3xl opacity-70" />

                <div className="relative w-full h-full bg-white rounded-[32px] shadow-level-2 border border-black/5 p-8 overflow-hidden">
                  {/* Top Accent Gradient Bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#CF4500] to-[#F37338]" />

                  <div className="w-full h-full flex items-center justify-center relative">
                    {/* Grid Points Overlay */}
                    <div className="grid grid-cols-12 grid-rows-12 gap-2 w-64 h-64 md:w-80 md:h-80 opacity-20">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-[#CF4500] rounded-full" />
                      ))}
                    </div>

                    {/* Connecting SVG Target Lines */}
                    <svg className="absolute inset-0 w-full h-full text-[#CF4500]/25" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                      <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
                    </svg>

                    {/* Active Tracking Pill */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-md px-6 py-3.5 rounded-full border border-black/10 shadow-level-1 flex items-center gap-3.5">
                        <ScanFace className="w-6 h-6 text-[#CF4500] animate-pulse" />
                        <span className="font-mono text-xs font-semibold text-[#141413] tracking-tight">
                          TRACKING: ACTIVE<br />
                          POINTS: 468/468
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Why Practices Are Switching to Faceify (Legacy vs Next-Gen) ── */}
      <section className="py-24 bg-white border-b border-black/5 relative overflow-hidden">
        <div className="container-master">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot uppercase tracking-wider text-[#696969] text-xs font-semibold">
              PRACTICE ECONOMICS
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-[#141413] tracking-tight leading-[1.1]">
              Why Practices Are <br />
              <span className="italic font-medium text-[#CF4500]">Switching to Faceify</span>
            </h2>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto">
              Eliminate $20k+ hardware costs. Run surgical previews from any browser, on any device — in under 60 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Legacy Card */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-[32px] border border-black/10 bg-[#EBE7E3]/60 shadow-level-1 flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 p-3.5 rounded-2xl bg-black/5 w-fit">
                  <Cpu className="w-8 h-8 text-[#696969]" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#696969] mb-2">
                  Legacy Hardware
                </h3>
                <p className="text-[#696969] text-sm mb-8 leading-relaxed">
                  Expensive sensors, long contracts, and dedicated workstations that sit idle between consultations.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm text-[#696969]">
                    <X className="w-5 h-5 text-[#CF4500]/70 shrink-0" />
                    <span>$20k+ Upfront Capital</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#696969]">
                    <X className="w-5 h-5 text-[#CF4500]/70 shrink-0" />
                    <span>External Sensors Required</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-[#696969]">
                    <X className="w-5 h-5 text-[#CF4500]/70 shrink-0" />
                    <span>Cloud Latency &amp; Lag</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Next-Gen Card (Faceify Labs) */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-[32px] border-2 border-[#CF4500]/30 bg-white shadow-level-2 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Gradient Highlight */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#CF4500] to-[#F37338]" />

              <div>
                <div className="mb-6 p-3.5 rounded-2xl bg-[#FDEEE7] w-fit">
                  <Zap className="w-8 h-8 text-[#CF4500]" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#141413] mb-2">
                  Faceify Labs
                </h3>
                <p className="text-[#555555] text-sm mb-8 leading-relaxed">
                  Zero hardware cost. Runs on your existing iPad or laptop. Ready for consultations in minutes.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-semibold text-[#141413]">
                    <Check className="w-5 h-5 text-[#CF4500] shrink-0" />
                    <span>$0 Hardware — Works on iPad &amp; Laptop</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-[#141413]">
                    <Check className="w-5 h-5 text-[#CF4500] shrink-0" />
                    <span>Patient-Ready Previews in Under 60 Seconds</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold text-[#141413]">
                    <Check className="w-5 h-5 text-[#CF4500] shrink-0" />
                    <span>On-Device Processing — Privacy-First by Design</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. Bottom CTA ── */}
      <section className="py-16 sm:py-20 bg-[#F3F0EE]">
        <div className="container-master">
          <div className="max-w-3xl mx-auto text-center bg-[#141413] rounded-[32px] p-10 sm:p-14 relative overflow-hidden shadow-level-2">
            <div className="relative z-10 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">
                Ready to see it in action?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto leading-relaxed text-sm">
                Schedule a live demo with our clinical team and see how Faceify Labs integrates into your practice workflow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
                <Link
                  href={routes.consultation}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#CF4500] hover:bg-[#F37338] text-white text-sm font-bold rounded-full transition-all shadow-sm"
                >
                  <span>Schedule a Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={routes.simulate}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold rounded-full transition-all"
                >
                  <span>Try the Simulator</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
