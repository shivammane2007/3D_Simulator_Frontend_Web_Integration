import { getLocale, getTranslations } from '@/i18n/messages'
import ChapterLabel from '@/components/homepage/ChapterLabel'
import { formatCostRange, getCityCosts } from '@/data/procedure-cost-estimates'

const COLUMNS = ['location', 'range'] as const
const CELL = 'align-top md:border-t md:border-mist md:px-3 md:py-3'

/** Typical price ranges per city as one hairline table, with the variance note above it. */
export default async function CostSection({ slug }: { slug: string }) {
    const rows = getCityCosts(slug)
    if (rows.length === 0) return null
    const [t, locale] = await Promise.all([getTranslations(`ProcedureExplainer.${slug}.cost`), getLocale()])
    const region = new Intl.DisplayNames([locale], { type: 'region' })

    return (
        <section id="cost" aria-labelledby="cost-heading" className="scroll-mt-20 bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="max-w-[680px]">
                    <ChapterLabel text={t('eyebrow')} />
                    <h2 id="cost-heading" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                        {t('heading')}
                    </h2>
                    <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{t('subtext')}</p>
                </div>

                <table className="mt-10 w-full max-w-[960px] border-collapse text-left font-body max-md:block md:table-fixed">
                    <caption className="sr-only">{t('heading')}</caption>
                    <colgroup className="max-md:hidden">
                        <col className="w-[55%]" />
                        <col className="w-[45%]" />
                    </colgroup>
                    <thead className="max-md:sr-only">
                        <tr className="text-xs font-semibold tracking-[0.12em] text-slate-hp uppercase">
                            {COLUMNS.map((column) => (
                                <th key={column} scope="col" className="pb-3 font-semibold md:px-3 md:first:pl-0">
                                    {t(`columns.${column}`)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="max-md:block max-md:border-b max-md:border-mist">
                        {rows.map((row) => (
                            <tr
                                key={row.city ?? row.country}
                                className="border-t border-mist max-md:grid max-md:grid-cols-[minmax(0,1fr)_auto] max-md:items-baseline max-md:gap-x-4 max-md:py-3 md:border-t-0"
                            >
                                <th scope="row" className={`${CELL} text-base font-medium text-ink md:pl-0`}>
                                    {row.city ? `${row.city}, ${region.of(row.country)}` : region.of(row.country)}
                                </th>
                                <td className={`${CELL} editorial-stats text-lg whitespace-nowrap text-ink max-md:text-right`}>
                                    {formatCostRange(row.estimate, locale)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="mt-6 max-w-[680px] font-body text-sm leading-relaxed text-slate-hp">{t('source')}</p>
            </div>
        </section>
    )
}
