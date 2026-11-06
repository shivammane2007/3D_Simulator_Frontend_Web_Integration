'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export interface CompareSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel: string
  afterLabel: string
  /** Accessible name for the divider control. */
  label: string
  /** Divider position on first render, 0 to 100. */
  initialPosition?: number
  /** Handle height within the frame, 0 to 100, so it can sit clear of the changed feature. */
  handleTop?: number
  /** Tailwind aspect class for the frame. */
  aspectClassName?: string
  /** Preloads both images at high priority, for a slider above the fold. */
  eager?: boolean
}

// The disc stays whole at either end; a label hides once its side shows less than 10%.
const HANDLE_INSET = '1.5rem'
const LABEL_MIN_SHARE = 10
const LABEL_CLASS = 'pointer-events-none absolute bottom-3 rounded-xl bg-scrim px-2.5 py-1 font-body text-xs font-semibold text-white motion-safe:transition-opacity'

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(query.matches)
    apply()
    query.addEventListener('change', apply)
    return () => query.removeEventListener('change', apply)
  }, [])
  return reduced
}

export default function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  label,
  initialPosition = 50,
  handleTop = 50,
  aspectClassName = 'aspect-[4/5]',
  eager = false,
}: CompareSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(initialPosition)
  const [dragging, setDragging] = useState(false)
  const reducedMotion = useReducedMotion()

  const toPercent = useCallback((clientX: number) => {
    const frame = frameRef.current
    if (!frame) return 50
    const rect = frame.getBoundingClientRect()
    if (rect.width === 0) return 50
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const nudge = useCallback((key: string) => {
    const step: Record<string, number> = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }
    if (key in step) {
      setPosition((current) => Math.min(100, Math.max(0, current + step[key])))
      return true
    }
    if (key === 'Home') { setPosition(0); return true }
    if (key === 'End') { setPosition(100); return true }
    return false
  }, [])

  useEffect(() => {
    if (!dragging) return
    const onMove = (event: PointerEvent) => setPosition(toPercent(event.clientX))
    const onUp = () => setDragging(false)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [dragging, toPercent])

  return (
    <div ref={frameRef} className={`relative ${aspectClassName} overflow-hidden rounded-2xl border border-mist select-none has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-ink`}>
      <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 640px" preload={eager} fetchPriority={eager ? 'high' : undefined} className="object-cover object-top" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width: 768px) 100vw, 640px" preload={eager} fetchPriority={eager ? 'high' : undefined} className="object-cover object-top" draggable={false} />
      </div>

      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% ${beforeLabel}`}
        aria-orientation="horizontal"
        onKeyDown={(event) => { if (nudge(event.key)) event.preventDefault() }}
        onPointerDown={(event) => {
          setDragging(true)
          setPosition(toPercent(event.clientX))
          event.currentTarget.focus()
        }}
        className="absolute inset-0 cursor-col-resize touch-pan-y focus-visible:outline-none"
      >
        <span className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white shadow-[0_0_3px] shadow-ink/40" style={{ left: `${position}%` }} />
        <span
          className={`pointer-events-none absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-sm ${dragging && !reducedMotion ? 'scale-110' : ''}`}
          style={{ left: `clamp(${HANDLE_INSET}, ${position}%, calc(100% - ${HANDLE_INSET}))`, top: `min(${handleTop}%, calc(100% - 4rem))` }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
            <path d="M5 1L1 7l4 6M13 1l4 6-4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <span className={`${LABEL_CLASS} left-3 ${position < LABEL_MIN_SHARE ? 'opacity-0' : ''}`}>
        {beforeLabel}
      </span>
      <span className={`${LABEL_CLASS} right-3 ${position > 100 - LABEL_MIN_SHARE ? 'opacity-0' : ''}`}>
        {afterLabel}
      </span>
    </div>
  )
}
