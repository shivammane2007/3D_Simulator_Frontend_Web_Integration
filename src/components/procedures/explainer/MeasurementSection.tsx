import type { ReactNode } from 'react'
import Image from 'next/image'
import { getTranslations } from '@/i18n/messages'
import ChapterLabel from '@/components/homepage/ChapterLabel'
import CompareSlider from '@/components/ui/CompareSlider'
import {
    REFERENCE_LITERALS,
    REFERENCE_SOURCES,
    type ExplainerMeasurement,
    type ProcedureExplainer,
    type SourceId,
} from '@/data/procedure-explainers'
import { getSimulatorOverlay, getSimulatorPair } from '@/lib/homepage/simulator-output'
import SimulatorSettings from './SimulatorSettings'

const GROUPS = ['front', 'either', 'side'] as const
// The side capture changes only from 21% of its width onward, so the divider starts clear of the nose.
const SIDE_START = 18
const SIDE_HANDLE_TOP = 82
const PRINTED_RATIO = /Alar\/IC:\s*(\d+(?:\.\d+)?)/

const CAPTION = 'mt-1 font-body text-sm leading-relaxed text-slate-hp'
const CELL = 'py-2 align-top md:border-t md:px-3'

/** The nasal analysis as cited reference tables, one per view, each opened by its figure. */
export default async function MeasurementSection({ explainer }: { explainer: ProcedureExplainer }) {
    const t = await getTranslations(`ProcedureExplainer.${explainer.slug}`)
    const overlay = getSimulatorOverlay(explainer.slug, 'front')
    const sidePair = getSimulatorPair(explainer.slug, 'side')

    const groups = GROUPS.map((view) => ({
        view,
        rows: explainer.measurements.filter((item) => item.view === view && item.references.length > 0),
    })).filter((group) => group.rows.length > 0)
    const sources = [...new Set(groups.flatMap((group) => group.rows.flatMap((row) => row.references.map((ref) => ref.source))))]
        .sort((a, b) => REFERENCE_SOURCES[a].cite.localeCompare(REFERENCE_SOURCES[b].cite))
    const guides = explainer.measurements.filter((item) => item.references.length === 0)

    const sourceLink = (id: SourceId) => (
        <a
            href={`#measure-source-${id}`}
            className="text-sm text-sage underline decoration-mist underline-offset-4 hover:decoration-sage"
        >
            {REFERENCE_SOURCES[id].cite}
        </a>
    )

    const printed = overlay?.printed.map((line) => PRINTED_RATIO.exec(line)?.[1]).find(Boolean)
    const figureLabel = (view: 'front' | 'side') => t(`measure.figures.${view}.label`)

    const figures: Partial<Record<(typeof GROUPS)[number], ReactNode>> = {
        front: overlay && printed && (
            <figure className="mt-6 grid gap-4 lg:grid-cols-[640px_minmax(0,1fr)] lg:gap-12">
                <Image
                    src={overlay.src}
                    alt={t('measure.figures.front.alt', { value: printed, reference: REFERENCE_LITERALS.alarIC })}
                    width={overlay.width}
                    height={overlay.height}
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="w-full rounded-2xl border border-mist lg:w-[640px]"
                />
                <figcaption className="border-t border-mist pt-3 lg:self-end">
                    <ChapterLabel text={figureLabel('front')} />
                    <p className={CAPTION}>
                        {t.rich('measure.figures.front.caption', {
                            value: printed,
                            reference: REFERENCE_LITERALS.alarIC,
                            num: (chunks?: ReactNode) => <span className="editorial-stats text-base text-ink">{chunks}</span>,
                            source: () => <span className="whitespace-nowrap">({sourceLink('farkas')})</span>,
                        })}
                    </p>
                </figcaption>
            </figure>
        ),
        side: sidePair && (
            <figure className="mt-6 grid gap-4 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-12">
                <div className="w-full max-w-[440px]">
                    <CompareSlider
                        beforeSrc={sidePair.beforeSrc}
                        afterSrc={sidePair.afterSrc}
                        beforeAlt={`${t('figure.before')}: ${t('measure.figures.side.alt')}`}
                        afterAlt={`${t('figure.after')}: ${t('measure.figures.side.alt')}`}
                        beforeLabel={t('figure.before')}
                        afterLabel={t('figure.after')}
                        label={t('figure.dragHint')}
                        initialPosition={SIDE_START}
                        handleTop={SIDE_HANDLE_TOP}
                        aspectClassName="aspect-square"
                    />
                </div>
                <figcaption className="border-t border-mist pt-3 md:self-end">
                    <ChapterLabel text={figureLabel('side')} />
                    <p className={CAPTION}>
                        {t.rich('measure.figures.side.caption', {
                            changes: () => <SimulatorSettings settings={sidePair.settings} />,
                        })}
                    </p>
                    <p className="mt-4 font-body text-base leading-relaxed text-ink">{t('measure.side')}</p>
                </figcaption>
            </figure>
        ),
    }

    const appliesTo = (ref: ExplainerMeasurement['references'][number]) =>
        t('measure.appliesTo', {
            sex: t(`measure.sex.${ref.sex ?? 'any'}`),
            population: t(`measure.population.${ref.population}`),
            kind: t(`measure.kind.${ref.kind}`),
        })

    return (
        <section aria-labelledby="explainer-measure" className="bg-cream editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="max-w-[680px]">
                    <ChapterLabel text={t('measure.eyebrow')} />
                    <h2 id="explainer-measure" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                        {t('measure.heading')}
                    </h2>
                    <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{t('measure.subtext')}</p>
                </div>

                {groups.map(({ view, rows }) => (
                    <div key={view} className="mt-12 md:mt-16">
                        <h3 className="border-t border-ink pt-3 font-body text-xs font-semibold tracking-[0.15em] text-ink uppercase">
                            {t(`measure.groups.${view}`)}
                        </h3>
                        {figures[view]}

                        <table className="mt-8 w-full border-collapse text-left font-body max-md:block md:table-fixed">
                            <caption className="sr-only">{t(`measure.groups.${view}`)}</caption>
                            <colgroup className="max-md:hidden">
                                <col className="w-[18%]" />
                                <col className="w-[22%] lg:w-[27%]" />
                                <col className="w-[15%]" />
                                <col className="w-[20%] lg:w-[22%]" />
                                <col className="w-[25%] lg:w-[18%]" />
                            </colgroup>
                            <thead className="max-md:sr-only">
                                <tr className="text-xs font-semibold tracking-[0.12em] text-slate-hp uppercase">
                                    {(['measurement', 'what', 'reference', 'appliesTo', 'source'] as const).map((column) => (
                                        <th key={column} scope="col" className="pb-3 font-semibold md:px-3 md:first:pl-0">
                                            {t(`measure.columns.${column}`)}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            {rows.map((item) => (
                                <tbody key={item.key} className="border-t border-mist max-md:block max-md:py-2.5 md:border-t-0">
                                    {item.references.map((ref, index) => {
                                        const cell = `${CELL} ${index === 0 ? 'md:border-mist' : 'md:border-mist/50'}`
                                        return (
                                            <tr
                                                key={`${ref.source}-${ref.population}-${ref.sex}-${ref.value}`}
                                                className="max-md:grid max-md:grid-cols-[6.5rem_minmax(0,1fr)] max-md:gap-x-3"
                                            >
                                                {index === 0 && (
                                                    <>
                                                        <th
                                                            scope="rowgroup"
                                                            rowSpan={item.references.length}
                                                            className={`${cell} text-base font-medium text-ink max-md:col-span-2 max-md:pb-0 md:pl-0`}
                                                        >
                                                            {t(`measure.items.${item.key}.name`)}
                                                            {item.estimated && <span className="text-slate-hp">*</span>}
                                                        </th>
                                                        <td
                                                            rowSpan={item.references.length}
                                                            className={`${cell} text-sm leading-relaxed text-slate-hp max-md:col-span-2 max-md:pt-0.5 max-md:pb-1.5`}
                                                        >
                                                            {t(`measure.items.${item.key}.body`)}
                                                        </td>
                                                    </>
                                                )}
                                                <td className={`${cell} editorial-stats text-base leading-snug whitespace-nowrap text-ink max-md:py-1 md:text-lg`}>
                                                    {ref.value}
                                                    {ref.unverified && <span className="font-body text-sm text-slate-hp">†</span>}
                                                </td>
                                                <td className={`${cell} text-sm leading-relaxed text-slate-hp max-md:py-1`}>{appliesTo(ref)}</td>
                                                <td className={`${cell} max-md:col-start-2 max-md:pt-0 max-md:pb-1.5`}>{sourceLink(ref.source)}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            ))}
                        </table>
                    </div>
                ))}

                <div className="mt-10 grid gap-8 border-t border-mist pt-5 font-body text-sm leading-relaxed text-slate-hp md:grid-cols-2 md:gap-12">
                    <div className="space-y-3">
                        <p>{t('measure.legend')}</p>
                        <p>{t('measure.caveat')}</p>
                        {guides.length > 0 && (
                            <p>{t('measure.guides', { names: guides.map((item) => t(`measure.items.${item.key}.name`)).join(', ') })}</p>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-ink">{t('measure.referencesHeading')}</h3>
                        <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-sage">
                            {sources.map((id) => (
                                <li key={id} id={`measure-source-${id}`}>{REFERENCE_SOURCES[id].full}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
