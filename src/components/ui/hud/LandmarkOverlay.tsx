'use client';

/**
 * LandmarkOverlay — SVG HUD overlay for normalized face landmarks.
 *
 * Part of the clinical-luxury HUD design system (`components/ui/hud/*`).
 * Renders dots, polylines and horizontal guide-lines over a face image, given
 * landmarks in NORMALIZED [0-1] space (MediaPipe convention). The overlay uses
 * a `0 0 100 100` viewBox with `preserveAspectRatio="none"`, so the parent only
 * needs to size/position this absolutely over the image — coordinates map as
 * `x * 100`, `y * 100` regardless of rendered pixel size.
 *
 * All elements animate in on mount (staggered fade/scale, ease-out-quint) via
 * Framer Motion. The whole overlay is decorative → aria-hidden.
 *
 * @example
 * <div className="relative">
 *   <img ... />
 *   <LandmarkOverlay points={landmarks} dots={KEY_DOTS} polylines={[JAWLINE]} guides={[0.33, 0.66]} />
 * </div>
 */
import { motion } from 'framer-motion';

export interface NormPoint {
  x: number;
  y: number;
}

export interface LandmarkOverlayProps {
  /** Normalized [0-1] landmarks (e.g. MediaPipe 468). */
  points: NormPoint[];
  /** Indices to render as dots. */
  dots?: number[];
  /** Sequences of indices to connect as thin polylines (contours). */
  polylines?: number[][];
  /** Normalized y positions [0-1] for horizontal guide lines (facial thirds). */
  guides?: number[];
  /** Dot color. */
  dotColor?: string;
  /** Line/guide color. */
  lineColor?: string;
  className?: string;
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

function toXY(points: NormPoint[], i: number): [number, number] | null {
  const p = points[i];
  if (!p) return null;
  return [p.x * 100, p.y * 100];
}

export function LandmarkOverlay({
  points,
  dots = [],
  polylines = [],
  guides = [],
  dotColor = '#2C2C2C',
  lineColor = '#7C9082',
  className = '',
}: LandmarkOverlayProps) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Contour polylines */}
      {polylines.map((seq, pi) => {
        const pts = seq
          .map((i) => toXY(points, i))
          .filter((v): v is [number, number] => v !== null)
          .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
          .join(' ');
        if (!pts) return null;
        return (
          <motion.polyline
            key={`pl-${pi}`}
            points={pts}
            fill="none"
            stroke={lineColor}
            strokeWidth={0.25}
            strokeOpacity={0.55}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.45, ease: EASE_OUT_QUINT, delay: 0.1 + pi * 0.05 }}
          />
        );
      })}

      {/* Horizontal facial-thirds guides */}
      {guides.map((gy, gi) => (
        <motion.line
          key={`g-${gi}`}
          x1={6}
          x2={94}
          y1={gy * 100}
          y2={gy * 100}
          stroke={lineColor}
          strokeWidth={0.2}
          strokeOpacity={0.35}
          strokeDasharray="1.2 1.2"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 0.35, pathLength: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: 0.15 + gi * 0.08 }}
        />
      ))}

      {/* Landmark dots */}
      {dots.map((i, di) => {
        const xy = toXY(points, i);
        if (!xy) return null;
        return (
          <motion.circle
            key={`d-${i}`}
            cx={xy[0]}
            cy={xy[1]}
            r={0.5}
            fill={dotColor}
            fillOpacity={0.85}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{
              duration: 0.35,
              ease: EASE_OUT_QUINT,
              delay: 0.2 + (di % 12) * 0.012,
            }}
            style={{ transformOrigin: `${xy[0]}px ${xy[1]}px` }}
          />
        );
      })}
    </svg>
  );
}

export default LandmarkOverlay;
