'use client'

import { useRef, useSyncExternalStore, type ReactNode, type RefObject } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * One entrance per element: a 14 px rise over 500 ms as it enters the viewport,
 * then it settles. Reduced motion, and the server render, show the final state.
 */
export default function MarketingReveal({ children, className = '', disabled = false, delay = 0 }: {
  children: ReactNode
  className?: string
  disabled?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false)
  const observable = mounted && typeof IntersectionObserver !== 'undefined'

  return (
    <div ref={ref} className={`editorial-reveal ${className}`}>
      {observable ? (
        <RevealMotion target={ref} reduced={reduced} disabled={disabled} delay={delay}>
          {children}
        </RevealMotion>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

function RevealMotion({ target, reduced, disabled, delay, children }: {
  target: RefObject<HTMLDivElement | null>
  reduced: boolean
  disabled: boolean
  delay: number
  children: ReactNode
}) {
  const seen = useInView(target, { once: true, amount: 'some', margin: '0px 0px -15% 0px' })
  const animate = !reduced && !disabled
  return (
    <motion.div
      initial={false}
      animate={{ opacity: animate && !seen ? 0 : 1, y: animate && !seen ? 14 : 0 }}
      transition={{ duration: animate ? 0.5 : 0, delay: animate ? delay : 0, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
