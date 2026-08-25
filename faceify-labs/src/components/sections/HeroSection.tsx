'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { routes } from '@/config/routes';
import { SatelliteButton } from '@/components/ui/Button';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-96px)] flex items-center overflow-hidden bg-[#F3F0EE] py-12 lg:py-20"
      aria-label="Hero"
    >
      {/* Ghost Watermark Text in Background (cream-on-cream) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 opacity-40">
        <span className="text-watermark uppercase font-medium">
          PREVIEW
        </span>
      </div>

      {/* Decorative Light Signal Orange Orbital Arc */}
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
          opacity="0.45"
        />
        <circle cx="980" cy="300" r="3.5" fill="#CF4500" />
      </svg>

      <div className="container-master w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ── Left Column: Editorial Typography & CTAs (7 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-7 flex flex-col gap-6 max-w-xl"
          >
            {/* Eyebrow Label with Accent Dot */}
            <div>
              <span className="text-eyebrow-master text-eyebrow-dot">
                85+ Surgical Simulators
              </span>
            </div>

            {/* Headline: H1 64px, 500 weight, -2% tracking */}
            <h1 className="text-h1-hero text-[#141413] text-balance">
              Show the result{' '}
              <span className="italic font-medium text-[#CF4500]">
                before the consult ends.
              </span>
            </h1>

            {/* Body: 16px, weight 450, soft reading tone */}
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-lg font-normal">
              Browser-native 3D facial simulation across 85+ aesthetic procedures. Real-time inference executes on-device with zero cloud photo uploads.
            </p>

            {/* Primary & Secondary Pill Buttons (20px radius) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={routes.foundingPartners}
                className="px-7 py-3 rounded-[20px] bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Apply for Founding Partner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={routes.procedures}
                className="px-7 py-3 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] text-sm font-medium tracking-[-0.02em] transition-all inline-flex items-center gap-2"
              >
                <span>Explore Procedures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Subtle metadata list */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#696969]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                Client-Side GPU WebGL2
              </span>
              <span>•</span>
              <span>468 Anatomical Landmarks</span>
              <span>•</span>
              <span>0.04mm RMSD Precision</span>
            </div>
          </motion.div>

          {/* ── Right Column: Circular Portrait with Satellite Micro-CTA (5 cols) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-5 flex justify-center relative"
          >
            {/* Circular Portrait Frame */}
            <div className="relative w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[480px] lg:h-[480px]">
              {/* Outer soft halo */}
              <div className="absolute inset-0 rounded-full bg-white shadow-level-2 border border-black/5" />

              {/* Main Circle Canvas */}
              <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-[#FCFBFA] via-[#EBE7E3] to-[#DFD9D2] flex items-center justify-center">
                <video
                  src="/hero-transformation.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Satellite Micro-CTA Button Docked Bottom-Right (protrudes ~40% outside) */}
              <div className="absolute -bottom-2 -right-2">
                <SatelliteButton
                  href={routes.simulate}
                  ariaLabel="Launch AI Simulation"
                />
              </div>

              {/* Floating Chip Label (Top Left) */}
              <div className="absolute -top-3 left-4 bg-white px-3.5 py-1.5 rounded-full shadow-level-1 border border-black/5 text-[10px] font-bold uppercase tracking-wider text-[#141413]">
                468 Landmark Mesh
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
