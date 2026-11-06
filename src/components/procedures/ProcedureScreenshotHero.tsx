'use client';

/**
 * ProcedureScreenshotHero
 *
 * (Client component: uses an onError handler on <Image> to gracefully hide a
 * missing screenshot. Event handlers cannot be passed from a server component,
 * so this must run on the client.)
 *
 * Renders above the fold on procedure pages that have a live simulator.
 * Shows the real simulator screenshot (captured by the Playwright harness)
 * alongside anatomy callout text and a CTA to launch the live simulator.
 *
 * Usage:
 *   <ProcedureScreenshotHero
 *     slug="rhinoplasty"
 *     procedureName="Rhinoplasty"
 *     simulateSlug="rhinoplasty"
 *     anatomyCallout="468-point anatomical mesh · sub-millimetre tip precision"
 *   />
 *
 * Screenshot files are expected at:
 *   /marketing/procedure-screenshots/<slug>-desktop.png
 *   /marketing/procedure-screenshots/<slug>-mobile.png
 *
 * When the screenshot file does not exist (pre-capture or missing viewport),
 * the component renders a placeholder with the procedure name instead.
 * No broken-image artefact is shown — fail silently.
 *
 * The 6-phase timeline is NOT rendered here; it moves below the fold to the
 * <ProcedureTimeline> component already present on every procedure page.
 */

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

export interface ProcedureScreenshotHeroProps {
  /** Procedure slug — used to derive screenshot filenames */
  slug: string;
  /** Human-readable procedure name */
  procedureName: string;
  /** Slug used for the /simulate/<slug> URL (may differ from procedure slug) */
  simulateSlug: string;
  /**
   * Short anatomy callout line rendered above the screenshot.
   * Example: "468-point mesh · sub-millimetre tip precision"
   * Keep under ~80 characters.
   */
  anatomyCallout?: string;
  /**
   * Override alt text for the desktop screenshot.
   * Defaults to "{procedureName} simulator preview — desktop view"
   */
  screenshotAlt?: string;
}

export default function ProcedureScreenshotHero({
  slug,
  procedureName,
  simulateSlug,
  anatomyCallout,
  screenshotAlt,
}: ProcedureScreenshotHeroProps) {
  const desktopSrc = `/marketing/procedure-screenshots/${slug}-desktop.png`;
  const mobileSrc = `/marketing/procedure-screenshots/${slug}-mobile.png`;
  const alt = screenshotAlt ?? `${procedureName} simulator preview: live AI simulation`;

  return (
    <section className="relative overflow-hidden bg-[#0f0f0f] py-10 md:py-14" aria-label={`${procedureName} simulator preview`}>
      <div className="container mx-auto px-5 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Anatomy callout eyebrow */}
          {anatomyCallout && (
            <p className="text-[#CF4500] text-xs font-semibold tracking-widest uppercase mb-4">
              {anatomyCallout}
            </p>
          )}

          {/* Screenshot image — desktop shows desktop capture, mobile shows mobile capture */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-6">
            {/* Desktop screenshot (hidden on small screens) */}
            <div className="hidden md:block relative w-full" style={{ aspectRatio: '1440/900' }}>
              <Image
                src={desktopSrc}
                alt={alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
                priority
                // If image is missing Next.js will show broken-image icon —
                // we suppress with onError making the wrapper transparent.
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                }}
              />
              {/* Fallback shown by CSS when image fails */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f0f] pointer-events-none">
                <span className="text-white/20 text-lg font-medium">{procedureName} Simulator</span>
              </div>
            </div>

            {/* Mobile screenshot (shown on small screens only) */}
            <div className="block md:hidden relative w-full" style={{ aspectRatio: '390/844' }}>
              <Image
                src={mobileSrc}
                alt={alt}
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f0f] pointer-events-none">
                <span className="text-white/20 text-base font-medium">{procedureName} Simulator</span>
              </div>
            </div>

            {/* Gradient fade-out at bottom to soften the screenshot crop */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none" />
          </div>

          {/* Caption + CTA row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              AI simulation: results illustrative only. Outcomes vary.
            </p>
            <Link
              href={`/simulate/${simulateSlug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-semibold rounded-full transition-all whitespace-nowrap shadow-sm"
            >
              Try {procedureName} Simulator Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * Slim data map — the 14 live simulators that have screenshots.
 * Used by procedure pages to pass the right props without repetition.
 */
export const LIVE_SIMULATOR_SCREENSHOT_SLUGS: Record<
  string,
  Pick<ProcedureScreenshotHeroProps, 'simulateSlug' | 'anatomyCallout'>
> = {
  rhinoplasty: {
    simulateSlug: 'rhinoplasty',
    anatomyCallout: '468-point facial mesh · high-detail nasal tip visualization',
  },
  blepharoplasty: {
    simulateSlug: 'blepharoplasty',
    anatomyCallout: '468 landmarks · upper & lower eyelid deformation modelling',
  },
  'chin-augmentation': {
    simulateSlug: 'chin-augmentation',
    anatomyCallout: 'Projection, vertical height & chin-jaw harmony modelling',
  },
  facelift: {
    simulateSlug: 'facelift',
    anatomyCallout: 'SMAS tissue repositioning · jowl & neck contouring simulation',
  },
  'brow-lift': {
    simulateSlug: 'brow-lift',
    anatomyCallout: 'Brow arch & forehead height modelling · upper lid hooding correction',
  },
  'buccal-fat-removal': {
    simulateSlug: 'buccal-fat-removal',
    anatomyCallout: 'Mid-face volume reduction · cheek contour slimming',
  },
  'cheek-implants': {
    simulateSlug: 'cheek-implants',
    anatomyCallout: 'Cheekbone projection · malar eminence enhancement modelling',
  },
  'neck-lift': {
    simulateSlug: 'neck-lift',
    anatomyCallout: 'Submental & platysmal band contouring simulation',
  },
  'fat-grafting': {
    simulateSlug: 'fat-grafting',
    anatomyCallout: 'Volume restoration via fat transfer · natural facial rejuvenation',
  },
  'lip-augmentation': {
    simulateSlug: 'lip-augmentation',
    anatomyCallout: 'Vermilion border · cupid\'s bow · upper-lower lip ratio modelling',
  },
  'masseter-botox': {
    simulateSlug: 'masseter-botox',
    anatomyCallout: 'Masseter volume reduction · V-line jawline slimming preview',
  },
  'dermal-fillers': {
    simulateSlug: 'dermal-fillers',
    anatomyCallout: 'Cheek · lip · jawline · tear trough volume modelling',
  },
  bbl: {
    simulateSlug: 'bbl',
    anatomyCallout: 'Fat transfer volume · projection · waist-to-hip ratio simulation',
  },
  'tummy-tuck': {
    simulateSlug: 'tummy-tuck',
    anatomyCallout: 'Abdominal wall tightening · skin re-draping contour preview',
  },
};
