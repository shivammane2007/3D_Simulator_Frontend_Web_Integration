'use client';

/**
 * RadialGauge — circular percentage arc with a centered value.
 *
 * Part of the clinical-luxury HUD design system (`components/ui/hud/*`).
 * A 1px-precise SVG arc that fills clockwise from the top. The arc animates
 * from 0 to `value` on mount via Framer Motion (already a dependency). Warm
 * palette: deep-blue → teal stroke, never cyan glow.
 *
 * Accessibility: exposed as role="img" with an aria-label; pass `label` so
 * screen readers get "<label>: <value>%". The SVG internals are aria-hidden.
 *
 * @example
 * <RadialGauge value={82} label="Overall Harmony" />
 */
import { motion } from 'framer-motion';

export interface RadialGaugeProps {
  /** Percentage 0-100. */
  value: number;
  /** Accessible label describing what the gauge measures. */
  label: string;
  /** Diameter in px. Default 88. */
  size?: number;
  /** Stroke width in px. Default 5. */
  stroke?: number;
  /** Optional suffix shown after the number (e.g. "/100"). */
  suffix?: string;
  /** Arc color. Defaults to sage; pass a hex for severity tinting. */
  color?: string;
  className?: string;
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

export function RadialGauge({
  value,
  label,
  size = 88,
  stroke = 5,
  suffix,
  color = '#7C9082',
  className = '',
}: RadialGaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${clamped}${suffix ?? '%'}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#EDE8E0"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1, ease: EASE_OUT_QUINT }}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-sans text-lg font-bold leading-none text-[#2C2C2C] tabular-nums">
          {clamped}
        </span>
        {suffix && (
          <span className="font-sans text-[9px] font-medium tracking-wide text-[#8C8480]">
            {suffix}
          </span>
        )}
      </span>
    </div>
  );
}

export default RadialGauge;
