'use client';

/**
 * GlassTag — glassmorphism label/value tag (QOVES-style floating data chip).
 *
 * Part of the clinical-luxury HUD design system (`components/ui/hud/*`).
 * A frosted-glass card with a 1px line-gray stroke, an uppercase tracked
 * micro-label and a prominent value. Designed to float over a face photo
 * (anchor it with absolute positioning by the parent) or sit inline.
 *
 * Warm/clinical, never cold: uses `bg-white/60` + warm ink/slate text.
 *
 * @example
 * <GlassTag label="Symmetry" value="92%" index={1} />
 */
import type { ReactNode } from 'react';

export interface GlassTagProps {
  /** Uppercase micro-label (the metric name). */
  label: ReactNode;
  /** The value to surface — must be a real measured value, never fabricated. */
  value: ReactNode;
  /** Optional bracketed index shown before the label. */
  index?: number;
  /** Extra classes for positioning (e.g. `absolute top-4 left-4`). */
  className?: string;
}

export function GlassTag({ label, value, index, className = '' }: GlassTagProps) {
  return (
    <div
      className={`pointer-events-none inline-flex flex-col gap-0.5 rounded-xl border border-[#D8D0C5]/70 bg-white/60 px-3 py-2 shadow-[0_2px_12px_rgba(44,44,44,0.08)] backdrop-blur-md ${className}`}
    >
      <span className="flex items-center gap-1 font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6C6460]">
        {index != null && (
          <span className="text-[#7C9082] tabular-nums">[{index}]</span>
        )}
        {label}
      </span>
      <span className="font-sans text-base font-bold leading-none text-[#2C2C2C] tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default GlassTag;
