/**
 * Maps procedure slugs to their actual simulator page slugs.
 * When a Day Pass is scoped to one slug, access to the target is also allowed.
 * Kept as a lightweight constant to avoid bundling the full procedures array
 * into client components.
 */
export const SIMULATOR_SLUG_ALIASES: Record<string, string> = {
  'v-line-contouring': 'facial-contouring',
  'botox': 'injectables',
};

/**
 * Slugs that render ConsultOnlyPanel instead of a real photo-upload
 * simulator (see components/simulation/ConsultOnlyPanel.tsx doc comment —
 * intimate-anatomy procedures where self-serve upload was removed for
 * payment-processor AUP / CSAM-adjacent / special-category-data reasons).
 * These pages have nothing to unlock, so SimulatorAccessGuard must not
 * paywall them — the whole point is that they stay open for SEO + the
 * "Book a consultation" lead-conversion CTA.
 */
export const CONSULT_ONLY_SLUGS: readonly string[] = [
  'labiaplasty',
  'mons-pubis-lift',
  'vaginal-rejuvenation',
];

/** Check if a procedure slug is allowed given an allowed-procedures list,
 *  accounting for slug→simulateSlug redirect aliases in both directions. */
export function isProcedureSlugAllowed(
  currentSlug: string,
  allowedProcedures: string[]
): boolean {
  if (allowedProcedures.includes(currentSlug)) return true;
  // Forward: currentSlug is an alias → check if target is allowed
  const aliasTarget = SIMULATOR_SLUG_ALIASES[currentSlug];
  if (aliasTarget && allowedProcedures.includes(aliasTarget)) return true;
  // Reverse: currentSlug is a target → check if any alias is allowed
  const aliasKeys = Object.entries(SIMULATOR_SLUG_ALIASES)
    .filter(([, target]) => target === currentSlug)
    .map(([key]) => key);
  return aliasKeys.some(k => allowedProcedures.includes(k));
}
