import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/routing'

interface RelatedProcedure {
    slug: string
    shortName: string
    description: string
}

interface RelatedProceduresProps {
    heading: string
    procedures: RelatedProcedure[]
}

/** Related procedures as text rows: the name, its sentence and a chevron. */
export default function RelatedProcedures({ heading, procedures }: RelatedProceduresProps) {
    if (procedures.length === 0) return null

    return (
        <section aria-labelledby="explainer-related" className="bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <h2 id="explainer-related" className="editorial-heading max-w-[680px] text-balance font-headline font-normal text-ink">
                    {heading}
                </h2>
                <ul className="mt-10 max-w-[960px] border-b border-mist">
                    {procedures.map((procedure) => (
                        <li key={procedure.slug} className="border-t border-mist">
                            <Link
                                href={`/procedures/${procedure.slug}`}
                                className="group grid grid-cols-[minmax(0,1fr)_1.25rem] items-baseline gap-x-6 gap-y-1 py-5 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_1.25rem] md:gap-x-8"
                            >
                                <span className="font-headline text-xl text-ink group-hover:text-sage">{procedure.shortName}</span>
                                <span className="row-start-2 font-body text-base leading-relaxed text-slate-hp md:col-start-2 md:row-start-1">
                                    {procedure.description}
                                </span>
                                <ChevronRight className="col-start-2 row-start-1 h-5 w-5 self-center text-sage md:col-start-3" aria-hidden="true" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
