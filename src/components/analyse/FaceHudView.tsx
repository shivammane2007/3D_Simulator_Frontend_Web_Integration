'use client';

/**
 * FaceHudView — the flagship clinical HUD overlaid on the user's uploaded face.
 *
 * Renders the uploaded photo with a QOVES-style overlay: curated landmark dots,
 * thin feature contours, facial-thirds guide lines, and 2-3 glassmorphism data
 * tags surfacing REAL measured values from `analysis` (never fabricated).
 *
 * Landmarks are normalized [0-1]; LandmarkOverlay maps them to the rendered box
 * via a `0 0 100 100` viewBox, so this just needs a relatively-positioned image.
 */
import { motion } from 'framer-motion';
import { useTranslations } from '@/i18n/messages';
import {
  LandmarkOverlay,
  GlassTag,
  HUD_POLYLINES,
  KEY_DOTS,
} from '@/components/ui/hud';
import type { NormPoint } from '@/components/ui/hud';
import type { FacialAnalysisResult } from '@/lib/analyse/types';

interface Props {
  src: string;
  landmarks: NormPoint[];
  analysis: FacialAnalysisResult;
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export default function FaceHudView({ src, landmarks, analysis }: Props) {
  const t = useTranslations('Analyse');

  // Facial-thirds guide lines, derived from real measured landmark y-positions
  // (glabella ~ brow line, subnasale ~ nose base). Falls back to even thirds.
  const browLine = landmarks[9]?.y; // glabella
  const noseBase = landmarks[2]?.y; // subnasale
  const guides = [
    browLine ?? 0.36,
    noseBase ?? 0.66,
  ];

  // Real values only — no fabrication.
  const thirdsBalance = Math.max(
    0,
    Math.round(
      100 -
        (Math.abs(analysis.upperThird.deviation) +
          Math.abs(analysis.middleThird.deviation) +
          Math.abs(analysis.lowerThird.deviation)) /
          3,
    ),
  );

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[#D8D0C5]/70 bg-[#EDE8E0] shadow-[0_8px_40px_rgba(44,44,44,0.10)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={t('hudImageAlt')}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Subtle vignette to seat the HUD over the photo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 120% at 50% 35%, transparent 55%, rgba(10,15,26,0.18) 100%)',
          }}
          aria-hidden="true"
        />

        <LandmarkOverlay
          points={landmarks}
          dots={KEY_DOTS}
          polylines={HUD_POLYLINES}
          guides={guides}
        />

        {/* Glass data tags — anchored to regions, real values only */}
        <motion.div
          className="absolute left-3 top-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_QUINT, delay: 0.35 }}
        >
          <GlassTag index={1} label={t('hudTagSymmetry')} value={`${analysis.symmetryScore}%`} />
        </motion.div>

        <motion.div
          className="absolute right-3 top-3"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_QUINT, delay: 0.45 }}
        >
          <GlassTag index={2} label={t('hudTagHarmony')} value={`${analysis.overallHarmonyScore}`} />
        </motion.div>

        <motion.div
          className="absolute bottom-3 left-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_QUINT, delay: 0.55 }}
        >
          <GlassTag index={3} label={t('hudTagThirds')} value={`${thirdsBalance}%`} />
        </motion.div>
      </div>

      {/* Caption */}
      <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.18em] text-[#8C8480]">
        {t('hudCaption')}
      </p>
    </div>
  );
}
