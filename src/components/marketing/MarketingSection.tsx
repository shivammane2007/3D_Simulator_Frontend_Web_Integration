'use client'

import type { ReactNode } from 'react'
import MarketingReveal from './MarketingReveal'

const bgVariants = {
  warm: 'bg-warm',
  white: 'bg-white',
  dark: 'bg-ink text-white',
  cream: 'bg-cream',
  sage: 'bg-sage text-white',
} as const

export default function MarketingSection({ children, variant = 'warm', className = '', id, noFade }: {
  children: ReactNode
  variant?: keyof typeof bgVariants
  className?: string
  id?: string
  noFade?: boolean
}) {
  return (
    <section id={id} className={`editorial-surface editorial-section ${bgVariants[variant]} px-5 md:px-12 ${className}`}>
      <MarketingReveal disabled={noFade} className="max-w-[1140px] mx-auto">
        {children}
      </MarketingReveal>
    </section>
  )
}
