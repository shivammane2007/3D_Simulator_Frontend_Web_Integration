'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { SatelliteButton } from '@/components/ui/Button';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse tracking for subtle 3D depth
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Subtle parallax transforms — restrained to ±8px / ±5px
  const translateX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const translateY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const rotateY = useTransform(smoothX, [-1, 1], [-3, 3]);
  const rotateX = useTransform(smoothY, [-1, 1], [2, -2]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Normalize to [-1, 1]
    rawX.set((e.clientX - centerX) / (rect.width / 2));
    rawY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F3F0EE] pt-16 pb-4 lg:pt-10 lg:pb-4"
      aria-label="Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ghost Watermark Text in Background (cream-on-cream) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 opacity-40">
        <span className="text-watermark uppercase font-medium">
          PREVIEW
        </span>
      </div>

      {/* Decorative annotation SVG — repositioned to connect to the portrait video */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Main orbital arc — flows through hero from left to right side video */}
        <path
          d="M-100 650 C 400 750, 800 200, 1550 320"
          stroke="#F37338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.35"
        />
        {/* Annotation line dropping from label to video top */}
        <line
          x1="1060"
          y1="90"
          x2="1060"
          y2="148"
          stroke="#CF4500"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity="0.45"
        />
        {/* Dot at annotation anchor */}
        <circle cx="1060" cy="88" r="3" fill="#CF4500" opacity="0.6" />
        {/* Dot at video top anchor */}
        <circle cx="1060" cy="150" r="2.5" fill="#CF4500" opacity="0.4" />
        {/* Secondary accent dot on arc */}
        <circle cx="980" cy="300" r="3.5" fill="#CF4500" opacity="0.3" />
      </svg>

      {/* Atmospheric soft shadow behind video (middle layer depth) */}
      <div
        className="absolute right-[5%] lg:right-[8%] top-1/2 -translate-y-1/2 pointer-events-none z-[1]"
        style={{
          width: '340px',
          height: '620px',
          borderRadius: '40px',
          background: 'rgba(20,20,19,0.04)',
          filter: 'blur(48px)',
          transform: 'translateY(-50%) scale(1.12)',
        }}
        aria-hidden="true"
      />

      <div className="container-master w-full relative z-10 -mt-2 lg:-mt-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center">

          {/* ── Left Column: Editorial Typography & CTAs (6 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-6 flex flex-col gap-6 max-w-xl -mt-4 lg:-mt-12"
          >
            {/* Eyebrow Label with Accent Dot */}
            <div>
              <span className="text-eyebrow-master text-eyebrow-dot">
                85+ Surgical Simulators
              </span>
            </div>

            {/* Headline: H1 */}
            <h1 className="text-h1-hero text-[#141413] text-balance">
              Show the result{' '}
              <span className="italic font-medium text-[#CF4500]">
                before the consult ends.
              </span>
            </h1>

            {/* Body copy */}
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

            {/* Technical metadata */}
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

          {/* ── Right Column: Portrait 9:16 Video as floating product object (6 cols) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.2, 0, 0, 1] }}
            className="lg:col-span-6 flex justify-center lg:justify-end relative"
          >
            {/*
              Composition wrapper — establishes the annotation coordinate space.
              Slightly offset to create editorial feel (not a centered grid card).
            */}
            <div className="relative flex justify-center lg:justify-end lg:pr-4 xl:pr-8">

              {/* ── Technical annotation label — top-left of video ── */}
              <div
                className="absolute z-20 flex items-center gap-2"
                style={{
                  // Position label to upper-left of the video frame
                  top: '-18px',
                  left: '8px',
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-black/[0.07] shadow-sm text-[10px] font-bold uppercase tracking-[0.08em] text-[#141413]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500] shrink-0" />
                  468 Landmark Mesh
                </span>
              </div>

              {/*
                The video object — floating 3D product feel.
                Uses motion.div for subtle pointer parallax.
              */}
              <motion.div
                ref={videoContainerRef}
                style={prefersReducedMotion ? {} : {
                  x: translateX,
                  y: translateY,
                  rotateY: rotateY,
                  rotateX: rotateX,
                  transformPerspective: 1200,
                  transformStyle: 'preserve-3d',
                }}
                className="relative"
              >
                {/*
                  9:16 portrait video container.
                  Width-constrained; height flows naturally from aspect-ratio.
                */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: 'clamp(240px, 28vw, 380px)',
                    aspectRatio: '9 / 16',
                    borderRadius: '32px',
                    boxShadow: `
                      0 32px 80px rgba(0, 0, 0, 0.10),
                      0 8px 24px rgba(0, 0, 0, 0.06),
                      0 2px 6px rgba(0, 0, 0, 0.04)
                    `,
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    background: '#141413',
                  }}
                >
                  <video
                    src="/Create_a_high_end_photorealis.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    aria-label="Faceify Labs 3D facial simulation preview"
                  />

                  {/* Very subtle inner vignette to make it feel like a real display */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, transparent 70%, rgba(0,0,0,0.06) 100%)',
                      borderRadius: '32px',
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Satellite control — docked to lower-right of the video frame */}
                <div
                  className="absolute z-20"
                  style={{
                    bottom: '-12px',
                    right: '-14px',
                  }}
                >
                  <SatelliteButton
                    href={routes.simulate}
                    ariaLabel="Launch AI Simulation"
                  />
                </div>

                {/* Subtle annotation dot below video — connects to orbital arc */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                  style={{ bottom: '-30px' }}
                  aria-hidden="true"
                >
                  <span className="w-2 h-2 rounded-full bg-[#CF4500] opacity-40 block" />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
