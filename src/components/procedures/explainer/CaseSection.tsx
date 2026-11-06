import { getTranslations } from '@/i18n/messages'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import ChapterLabel from '@/components/homepage/ChapterLabel'
import Tabs from '@/components/ui/Tabs'
import CompareSlider from '@/components/ui/CompareSlider'
import type { ProcedureExplainer } from '@/data/procedure-explainers'
import { getSimulatorCases } from '@/lib/homepage/simulator-output'
import SimulatorSettings from './SimulatorSettings'

// The divider opens beside the nose, so the first view is the simulated result.
const START = { front: 22, side: 18 } as const

/** One simulator case per presenting type, each on a different AI-generated face, as tabs. */
export default async function CaseSection({ explainer }: { explainer: ProcedureExplainer }) {
    const cases = getSimulatorCases(explainer.slug)
    if (cases.length === 0) return null
    const t = await getTranslations(`ProcedureExplainer.${explainer.slug}`)

    const tabs = cases.map((item) => {
        const name = t(`cases.items.${item.type}.name`)
        const alt = `${name}, ${t(item.view === 'front' ? 'figure.alt' : 'measure.figures.side.alt')}`
        return {
            id: item.type,
            label: name,
            content: (
                <figure className="grid gap-4 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-12">
                    <div className="w-full max-w-[440px]">
                        <CompareSlider
                            beforeSrc={item.beforeSrc}
                            afterSrc={item.afterSrc}
                            beforeAlt={`${t('figure.before')}: ${alt}`}
                            afterAlt={`${t('figure.after')}: ${alt}`}
                            beforeLabel={t('figure.before')}
                            afterLabel={t('figure.after')}
                            label={t('figure.dragHint')}
                            initialPosition={START[item.view]}
                            aspectClassName="aspect-square"
                        />
                    </div>
                    <figcaption className="border-t border-mist pt-3 md:self-end">
                        <h3 className="font-headline text-2xl font-normal text-ink">{name}</h3>
                        <p className="mt-2 font-body text-base leading-relaxed text-ink">{t(`cases.items.${item.type}.body`)}</p>
                        <p className="mt-4 font-body text-sm leading-relaxed text-slate-hp">
                            {t.rich('cases.caption', { changes: () => <SimulatorSettings settings={item.settings} /> })}
                        </p>
                        <Link
                            href={`/simulate/${explainer.slug}`}
                            className="mt-4 inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-[#CF4500] hover:text-[#B53D00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4500] focus-visible:ring-offset-2"
                        >
                            {t('ctaPrimary')}
                            <ArrowRight className="size-4" aria-hidden="true" />
                        </Link>
                    </figcaption>
                </figure>
            ),
        }
    })

    return (
        <section aria-labelledby="explainer-cases" className="bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="max-w-[680px]">
                    <ChapterLabel text={t('cases.eyebrow')} />
                    <h2 id="explainer-cases" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                        {t('cases.heading')}
                    </h2>
                    <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{t('cases.subtext')}</p>
                </div>

                <Tabs
                    tabs={tabs}
                    variant="pill"
                    keepMounted
                    tabListClassName="mt-8"
                    panelClassName="mt-8 focus-visible:outline-none"
                />
            </div>
        </section>
    )
}
