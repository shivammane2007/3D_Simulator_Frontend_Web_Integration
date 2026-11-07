'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(callback: () => void) {
  if (typeof window.matchMedia !== 'function') return () => {}
  const preference = window.matchMedia(QUERY)
  preference.addEventListener('change', callback)
  return () => preference.removeEventListener('change', callback)
}

function getSnapshot() {
  return typeof window.matchMedia !== 'function' || window.matchMedia(QUERY).matches
}

// SSR assumes reduced motion so the server-rendered markup is the static,
// fully-visible state. Hydration then relaxes it only for users who have not
// asked for reduced motion. This ordering is deliberate: it means content is
// never hidden behind an animation that may not run.
function getServerSnapshot() {
  return true
}

/** Shared reduced-motion preference, reactive to the user changing it mid-session. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
