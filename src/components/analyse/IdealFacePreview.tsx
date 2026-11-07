'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from '@/i18n/messages';
import { HudLabel } from '@/components/ui/hud';
import type { AnalysisTransformation } from '@/lib/analyse/types';

interface Props {
  originalSrc: string;
  idealSrc: string;
  transformation: AnalysisTransformation;
  /** Controlled morph intensity, 0-100. */
  intensity?: number;
  /** Called as the user drags; parent debounces + recomputes the warp. */
  onIntensityChange?: (intensity: number) => void;
  /** Whether the parent is currently recomputing the warped preview. */
  isRecomputing?: boolean;
}

export default function IdealFacePreview({
  originalSrc,
  idealSrc,
  transformation,
  intensity: controlledIntensity,
  onIntensityChange,
  isRecomputing = false,
}: Props) {
  const t = useTranslations('Analyse');
  const [sliderPos, setSliderPos] = useState(50); // 0-100, percentage
  // Fall back to internal state only when used uncontrolled (e.g. in isolation).
  const [internalIntensity, setInternalIntensity] = useState(70);
  const intensity = controlledIntensity ?? internalIntensity;
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  // Mouse handlers
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      updateSlider(e.clientX);
    },
    [updateSlider],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) updateSlider(e.clientX);
    };
    const onMouseUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [updateSlider]);

  // Touch handlers
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging.current) updateSlider(e.touches[0].clientX);
    },
    [updateSlider],
  );

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleIntensityChange = (val: number) => {
    if (controlledIntensity == null) setInternalIntensity(val);
    onIntensityChange?.(val);
  };

  // Keyboard control for the before/after compare divider. Arrow keys nudge the
  // seam; Home/End jump to the extremes. Mirrors the WAI-ARIA slider pattern.
  const onSliderKeyDown = useCallback((e: React.KeyboardEvent) => {
    const STEP = 5;
    let next = sliderPos;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(0, sliderPos - STEP);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(100, sliderPos + STEP);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = 100;
        break;
      default:
        return;
    }
    e.preventDefault();
    setSliderPos(next);
  }, [sliderPos]);

  return (
    <div>
      <HudLabel className="mb-2">{t('previewEyebrow')}</HudLabel>
      <h2 className="mb-2 font-headline text-2xl font-light text-[#2C2C2C]">
        {t('previewTitle')}
      </h2>
      <p className="mb-5 font-body text-sm text-[#8C8480]">
        {t('previewSubtitle')}
      </p>

      {/* Before / After slider */}
      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-md cursor-col-resize select-none overflow-hidden rounded-3xl border border-[#D8D0C5]/70 shadow-[0_8px_40px_rgba(44,44,44,0.10)]"
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ideal image (full width background — shows on right side as "After") */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={idealSrc}
          alt="Ideal"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Original image (clipped to reveal only left portion — shows on left side as "Before").
            The divider/handle sits at `left: ${sliderPos}%`, so to reveal the original on
            everything LEFT of it we clip the RIGHT side by (100 - sliderPos)%. Using
            `${sliderPos}%` here clipped from the wrong side, so the seam tracked the inverse
            of the handle and the "Before"/"After" halves read swapped. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalSrc}
            alt="Original"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider line — solid, higher-contrast seam (was a faint dotted line) */}
        <div
          className="pointer-events-none absolute bottom-0 top-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(44,44,44,0.25)]"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Handle — keyboard-operable WAI-ARIA slider */}
          <div
            role="slider"
            tabIndex={0}
            aria-label={t('compareSliderLabel')}
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            aria-valuetext={t('compareSliderValue', { percent: Math.round(sliderPos) })}
            onKeyDown={onSliderKeyDown}
            onMouseDown={onMouseDown}
            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full border border-[#D8D0C5]/60 bg-white shadow-md backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C9082] focus-visible:ring-offset-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4 7L1 4M4 7L1 10M10 7L13 4M10 7L13 10" stroke="#7C9082" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-[#D8D0C5]/50 bg-white/60 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6C6460] backdrop-blur-md">
          {t('labelBefore')}
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#7C9082] px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
          {t('labelAfter')}
        </div>

        {/* Recompute overlay */}
        {isRecomputing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#2C2C2C]/15 backdrop-blur-[1px]">
            <span className="flex items-center gap-2 rounded-full border border-[#D8D0C5]/60 bg-white/80 px-3 py-1.5 font-sans text-[11px] font-semibold text-[#6C6460] backdrop-blur-md">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#D8D0C5] border-t-[#7C9082]" />
              {t('updating')}
            </span>
          </div>
        )}
      </div>

      {/* Intensity slider */}
      <div className="mx-auto mt-5 max-w-md">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#6C6460]/80">
            {t('morphIntensity')}
          </span>
          <span className="font-sans text-xs font-bold tabular-nums text-[#7C9082]">{intensity}%</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={intensity}
          aria-label={t('morphIntensity')}
          onChange={(e) => handleIntensityChange(Number(e.target.value))}
          className="w-full h-0.5 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:h-0.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[#D8D0C5] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C9082] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#7C9082]"
        />
      </div>

      {/* Changes list */}
      {transformation.changes.length > 0 && (
        <div className="mx-auto mt-6 max-w-md">
          <HudLabel className="mb-3">{t('appliedAdjustments')}</HudLabel>
          <div className="mt-3 space-y-2">
            {transformation.changes.map((c, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-[#D8D0C5]/70 bg-white p-3">
                <span className="mt-1 font-sans text-[10px] font-semibold tabular-nums text-[#7C9082]">[{i + 1}]</span>
                <div>
                  <span className="font-body text-xs font-semibold text-[#2C2C2C]">{c.regionKey ? t(c.regionKey as Parameters<typeof t>[0]) : c.region}: </span>
                  <span className="font-body text-xs text-[#6C6460]">{c.descriptionKey ? t(c.descriptionKey as Parameters<typeof t>[0]) : c.description}</span>
                  <p className="mt-0.5 font-body text-[10px] text-[#8C8480]">{t('viaPrefix')} {c.procedureKey ? t(c.procedureKey as Parameters<typeof t>[0]) : c.procedureToAchieve} {t('viaSuffix')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
