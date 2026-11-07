'use client';

/**
 * HudLabel — bracketed / uppercase-tracked technical micro-label.
 *
 * Part of the clinical-luxury HUD design system (`components/ui/hud/*`).
 * Renders a small uppercase, letter-spaced label — optionally prefixed with a
 * bracketed index like `[1]` in the QOVES style. Decorative by default; pass a
 * meaningful `as`/`children` for real headings.
 *
 * @example
 * <HudLabel index={1}>Facial Thirds</HudLabel>
 * <HudLabel>Symmetry</HudLabel>
 */
import type { ReactNode } from 'react';

export interface HudLabelProps {
  /** Optional bracketed index, e.g. 1 → "[1]". */
  index?: number;
  /** Label text. */
  children: ReactNode;
  /** Tailwind color/extra classes. Defaults to the clinical slate tone. */
  className?: string;
}

export function HudLabel({ index, children, className = '' }: HudLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6C6460] ${className}`}
    >
      {index != null && (
        <span className="text-[#7C9082] tabular-nums" aria-hidden="true">
          [{index}]
        </span>
      )}
      {children}
    </span>
  );
}

export default HudLabel;
