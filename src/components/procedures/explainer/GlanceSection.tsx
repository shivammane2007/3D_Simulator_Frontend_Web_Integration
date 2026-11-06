import ChapterLabel from '@/components/homepage/ChapterLabel'

interface GlanceSectionProps {
    eyebrow: string
    heading: string
    body: string
    facts: { key: string; value: string; label: string }[]
}

/** What the procedure is in one paragraph, then its key facts as a row of figures. */
export default function GlanceSection({ eyebrow, heading, body, facts }: GlanceSectionProps) {
    return (
        <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="max-w-[680px]">
                    <ChapterLabel text={eyebrow} />
                    <h2 id="about-heading" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                        {heading}
                    </h2>
                    <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{body}</p>
                </div>

                <dl className="mt-10 grid max-w-[960px] grid-cols-2 gap-x-6 border-t border-mist md:grid-cols-4 md:gap-x-8">
                    {facts.map((fact) => (
                        <div key={fact.key} className="flex flex-col-reverse gap-2 border-b border-mist py-4 md:border-b-0 md:py-6">
                            <dt className="font-body text-sm leading-relaxed text-slate-hp">{fact.label}</dt>
                            <dd className="editorial-stats text-[1.75rem] leading-none text-ink md:text-4xl">{fact.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
