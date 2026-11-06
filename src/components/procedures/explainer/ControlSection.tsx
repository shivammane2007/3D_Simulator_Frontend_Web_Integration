import { getTranslations } from '@/i18n/messages'
import ChapterLabel from '@/components/homepage/ChapterLabel'
import { formatControlRange, type ProcedureExplainer } from '@/data/procedure-explainers'

const COLUMNS = ['control', 'changes', 'range', 'view'] as const
const CELL = 'align-top md:border-t md:border-mist md:px-3 md:py-3'

/** The core controls as one hairline table: what each moves, its range and the views it applies to. */
export default async function ControlSection({ explainer }: { explainer: ProcedureExplainer }) {
    const t = await getTranslations(`ProcedureExplainer.${explainer.slug}`)

    return (
        <section aria-labelledby="explainer-adjust" className="bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="max-w-[680px]">
                    <ChapterLabel text={t('adjust.eyebrow')} />
                    <h2 id="explainer-adjust" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                        {t('adjust.heading')}
                    </h2>
                    <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{t('adjust.subtext')}</p>
                </div>

                <table className="mt-10 w-full border-collapse text-left font-body max-md:block md:table-fixed">
                    <caption className="sr-only">{t('adjust.heading')}</caption>
                    <colgroup className="max-md:hidden">
                        <col className="w-[22%]" />
                        <col className="w-[40%]" />
                        <col className="w-[20%]" />
                        <col className="w-[18%]" />
                    </colgroup>
                    <thead className="max-md:sr-only">
                        <tr className="text-xs font-semibold tracking-[0.12em] text-slate-hp uppercase">
                            {COLUMNS.map((column) => (
                                <th key={column} scope="col" className="pb-3 font-semibold md:px-3 md:first:pl-0">
                                    {t(`adjust.columns.${column}`)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="max-md:block">
                        {explainer.controls.map((control) => (
                            <tr
                                key={control.key}
                                className="border-t border-mist max-md:grid max-md:grid-cols-[minmax(0,1fr)_auto] max-md:gap-x-4 max-md:gap-y-0.5 max-md:py-3 md:border-t-0"
                            >
                                <th scope="row" className={`${CELL} text-base font-medium text-ink md:pl-0`}>
                                    {t(`adjust.items.${control.key}.name`)}
                                </th>
                                <td className={`${CELL} text-sm leading-relaxed text-slate-hp max-md:col-start-1 max-md:row-start-2`}>
                                    {t(`adjust.items.${control.key}.body`)}
                                </td>
                                <td className={`${CELL} editorial-stats text-lg whitespace-nowrap text-ink max-md:col-start-2 max-md:row-start-1 max-md:text-right`}>
                                    {formatControlRange(control.rangeId)}
                                </td>
                                <td className={`${CELL} text-sm text-slate-hp max-md:col-start-2 max-md:row-start-2 max-md:text-right`}>
                                    {t(control.view === 'front' ? 'adjust.viewFront' : 'adjust.viewBoth')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="mt-6 max-w-[680px] font-body text-sm leading-relaxed text-slate-hp">{t('adjust.extras')}</p>
            </div>
        </section>
    )
}
