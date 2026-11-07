/**
 * procedure-links — resolve a recommendation's procedure slug to a real
 * educational procedure page (`/procedures/[slug]`).
 *
 * Treatment recommendations (treatment-mapper.ts) and acne recommendations
 * (acne-analysis.ts) emit a fixed, known set of slugs. A few are umbrella terms
 * with no dedicated page; those alias to the closest real procedure. Anything
 * not in VALID_SLUGS returns null so callers can omit the link rather than
 * producing a 404.
 *
 * The slug set is intentionally a small static list (not an import of the full
 * procedures dataset) to keep the analyser bundles lean.
 */

const SLUG_ALIASES: Record<string, string> = {
  alarplasty: 'rhinoplasty',
  'facial-contouring': 'jaw-contouring',
  injectables: 'dermal-fillers',
  'chemical-peel': 'chemical-peels',
};

// Verified against data/procedures.ts.
const VALID_SLUGS = new Set<string>([
  'rhinoplasty',
  'lip-augmentation',
  'dermal-fillers',
  'chin-augmentation',
  'blepharoplasty',
  'hairline-lowering',
  'lip-lift',
  'jaw-contouring',
  'microneedling',
  'ipl-photofacial',
  'rf-microneedling',
  'co2-laser',
  'chemical-peels',
]);

/**
 * Returns a locale-relative href to the educational procedure page for `slug`,
 * or null when no suitable page exists.
 */
export function procedureEducationHref(slug?: string | null): string | null {
  if (!slug) return null;
  const resolved = SLUG_ALIASES[slug] ?? slug;
  if (!VALID_SLUGS.has(resolved)) return null;
  return `/procedures/${resolved}`;
}
