'use client';

/**
 * MetricBar — 1px-track labeled progress bar (the "Eye Curvature 72%" look).
 *
 * Part of the clinical-luxury HUD design system (`components/ui/hud/*`).
 * A thin track with an animated fill, a left-aligned label and a right-aligned
 * value. The fill animates in on mount (Framer Motion) with ease-out-quint.
 *
 * Accessibility: the wrapper is role="meter" with aria-valuenow/min/max and an
 * aria-label built from `label`.
 *
 * @example
 * <MetricBar label="Symmetry" value={72} valueText="72%" />
 */
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface MetricBarProps {
  /** Metric name. */
  label: ReactNode;
  /** Fill percentage 0-100. */
  value: number;
  /** Display text for the value (defaults to `${value}%`). */
  valueText?: ReactNode;
  /** Plain-text label for the accessible name (falls back to "metric"). */
  ariaLabel?: string;
  /** Fill color. Defaults to sage; pass a hex for severity tinting. */
  color?: string;
  className?: string;
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export function MetricBar({
  label,
  value,
  valueText,
  ariaLabel,
  color = '#7C9082',
  className = '',
}: MetricBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={className}
      role="meter"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel ?? (typeof label === 'string' ? label : 'metric')}
    >
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-[#6C6460]">
          {label}
        </span>
        <span className="font-sans text-xs font-bold tabular-nums text-[#2C2C2C] min-w-0">
          {valueText ?? `${Math.round(clamped)}%`}
        </span>
      </div>
      <div className="h-px w-full overflow-visible bg-[#EDE8E0]" aria-hidden="true">
        <motion.div
          className="relative -top-[1.5px] h-[3px] rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.9, ease: EASE_OUT_QUINT }}
        />
      </div>
    </div>
  );
}

export default MetricBar;
