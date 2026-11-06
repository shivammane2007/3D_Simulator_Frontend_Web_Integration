import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'

/** The sage closing band. Wording comes from the caller so pages can share it. */
export default function ClosingCtaBand({
  heading,
  primary,
  secondary,
}: {
  heading: ReactNode
  primary: { href: string; label: string; ariaLabel?: string }
  secondary?: { href: string; label: string; ariaLabel?: string }
}) {
  return (
    <section className="bg-sage">
      <div className="editorial-container mx-auto flex flex-col items-start gap-8 px-5 py-16 md:px-8 md:py-24">
        <h2 className="editorial-heading max-w-3xl text-balance font-headline font-normal tracking-[-0.02em] text-warm">
          {heading}
        </h2>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href={primary.href}
            aria-label={primary.ariaLabel ?? primary.label}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-warm px-7 py-3.5 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm focus-visible:ring-offset-2 focus-visible:ring-offset-sage"
          >
            {primary.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              aria-label={secondary.ariaLabel ?? secondary.label}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-warm/40 px-7 py-3.5 text-sm font-semibold text-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm focus-visible:ring-offset-2 focus-visible:ring-offset-sage"
            >
              {secondary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
