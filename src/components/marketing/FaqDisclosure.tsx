'use client'

import { useId, useState, type ReactNode, type KeyboardEvent } from 'react'
import { Plus } from 'lucide-react'

/**
 * One question that opens into its answer. The answer is always in the HTML, so
 * crawlers read it; while closed it is collapsed to zero height and inert.
 */
export default function FaqDisclosure({
  question,
  children,
  buttonId,
  onKeyDown,
  defaultOpen = false,
}: {
  question: string
  children: ReactNode
  buttonId?: string
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void
  /** Opens the panel on first render. */
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const reactId = useId()
  const panelId = `faq-panel-${reactId}`
  const triggerId = buttonId ?? `faq-btn-${reactId}`

  return (
    <div className="border-b border-mist">
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
        className="flex w-full items-center justify-between gap-6 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage"
      >
        <span className="font-body text-base text-ink">{question}</span>
        <Plus
          className={`h-4 w-4 shrink-0 text-sage motion-safe:transition-transform motion-safe:duration-200 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        inert={!open}
        className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-200 motion-safe:ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-5 text-sm font-body leading-relaxed text-slate-hp">{children}</div>
        </div>
      </div>
    </div>
  )
}
