import type { ReactNode } from 'react'
import ChapterLabel from '@/components/homepage/ChapterLabel'

export interface Step {
    key: string
    marker: ReactNode
    title: string
    body: string
}

interface StepSectionProps {
    id: string
    eyebrow: string
    heading: string
    subtext?: string
    note?: string
    steps: Step[]
    /** Width of the marker column: an icon, or a short label such as "Day 7". */
    marker?: 'icon' | 'label'
}

const GRID = {
    icon: 'grid-cols-[2.5rem_minmax(0,1fr)] md:grid-cols-[3rem_minmax(0,18rem)_minmax(0,1fr)]',
    label: 'grid-cols-[minmax(0,1fr)] md:grid-cols-[9rem_minmax(0,16rem)_minmax(0,1fr)]',
} as const

/** A hairline list of steps, each with an icon or label in one fixed-width column. */
export default function StepSection({ id, eyebrow, heading, subtext, note, steps, marker = 'icon' }: StepSectionProps) {
    return (
        <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="max-w-[680px]">
                    <ChapterLabel text={eyebrow} />
                    <h2 id={`${id}-heading`} className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                        {heading}
                    </h2>
                    {subtext && <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{subtext}</p>}
                </div>

                <ol className="mt-10 max-w-[960px] border-b border-mist">
                    {steps.map((step) => (
                        <li
                            key={step.key}
                            className={`grid items-start gap-x-4 gap-y-1 border-t border-mist py-4 md:gap-x-8 md:py-5 ${GRID[marker]}`}
                        >
                            {marker === 'icon' ? (
                                step.marker
                            ) : (
                                <span className="editorial-stats text-lg leading-snug text-[#CF4500]">{step.marker}</span>
                            )}
                            <h3 className="font-headline text-xl font-normal text-ink">{step.title}</h3>
                            <p className={`font-body text-base leading-relaxed text-slate-hp md:col-start-3 ${marker === 'icon' ? 'col-start-2' : ''}`}>
                                {step.body}
                            </p>
                        </li>
                    ))}
                </ol>

                {note && <p className="mt-6 max-w-[680px] font-body text-sm leading-relaxed text-slate-hp">{note}</p>}
            </div>
        </section>
    )
}
