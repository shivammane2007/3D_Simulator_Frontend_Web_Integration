/**
 * Clinical-luxury HUD design system.
 *
 * Reusable, tree-shakeable primitives for QOVES-style clinical HUD overlays —
 * warm palette (cream/ink/deep-blue/teal/copper/gold), 1px-precise data-viz,
 * glassmorphism tags. Built for the AI Face Analyser; reusable across
 * simulators + homepage later.
 *
 * No heavy deps — only Framer Motion (already in the project) for mount-in
 * animations.
 */
export { GlassTag } from './GlassTag';
export type { GlassTagProps } from './GlassTag';

export { RadialGauge } from './RadialGauge';
export type { RadialGaugeProps } from './RadialGauge';

export { MetricBar } from './MetricBar';
export type { MetricBarProps } from './MetricBar';

export { LandmarkOverlay } from './LandmarkOverlay';
export type { LandmarkOverlayProps, NormPoint } from './LandmarkOverlay';

export { HudLabel } from './HudLabel';
export type { HudLabelProps } from './HudLabel';

export * from './face-landmark-groups';
