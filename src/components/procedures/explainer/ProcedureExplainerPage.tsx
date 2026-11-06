import type { ReactNode } from 'react'
import { getTranslations } from '@/i18n/messages'
import { Camera, Download, Layers, ListChecks, MessageCircleQuestion, SlidersHorizontal, Stethoscope } from 'lucide-react'
import RegulatoryFooter from '@/components/procedures/RegulatoryFooter'
import FaqDisclosure from '@/components/marketing/FaqDisclosure'
import ClosingCtaBand from '@/components/marketing/ClosingCtaBand'
import ChapterLabel from '@/components/homepage/ChapterLabel'
import { type ProcedureExplainer } from '@/data/procedure-explainers'
import { getSimulatorPair } from '@/lib/homepage/simulator-output'
import { RESEARCH_SOURCES, RHINOPLASTY_EVIDENCE } from '@/data/consultation-research'
import ExplainerHero from './ExplainerHero'
import { Link } from '@/i18n/routing'
import CaseSection from './CaseSection'
import MeasurementSection from './MeasurementSection'
import ControlSection from './ControlSection'
import StepSection, { type Step } from './StepSection'
import GlanceSection from './GlanceSection'
import CostSection from './CostSection'
import RelatedProcedures from './RelatedProcedures'
import SimulatorSettings from './SimulatorSettings'

interface ExplainerLabels {
    categoryLabel: string
    /** ProcedurePage strings, reused so this template adds no message keys. */
    breadcrumbProcedures: string
    breadcrumbCurrent: string
    relatedHeading: string
    related: { slug: string; shortName: string; description: string; icon: string }[]
}

// The privacy answer is left out because RegulatoryFooter states the same sentences on this page.
const FAQ_ITEMS = ['result', 'photos', 'references', 'camera'] as const
const ICON = 'mt-0.5 h-6 w-6 text-sage'
const CONSULT_ICONS = { s1: Camera, s2: Layers, s3: SlidersHorizontal, s4: Download } as const
const PREPARE_ICONS = { s1: SlidersHorizontal, s2: ListChecks, s3: MessageCircleQuestion, s4: Stethoscope } as const
const SLOT = '\u0000'

// Data-driven procedure page for slugs with an explainer entry; the visible FAQ
// and its JSON-LD are built from the same ProcedureExplainer.<slug> strings.
export default async function ProcedureExplainerPage({
    explainer,
    labels,
}: {
    explainer: ProcedureExplainer
    labels: ExplainerLabels
}) {
    const t = await getTranslations(`ProcedureExplainer.${explainer.slug}`)
    const tHome = await getTranslations('Homepage.closing')
    const pair = getSimulatorPair(explainer.slug, 'front')

    const faq = FAQ_ITEMS
        .filter((key) => key !== 'camera' || explainer.liveCamera)
        .map((key) => ({ q: t(`faq.items.${key}.q`), a: t(`faq.items.${key}.a`) }))
    const patientFaq = explainer.patientFaq.map((key) => ({ q: t(`patientFaq.items.${key}.q`), a: t(`patientFaq.items.${key}.a`) }))

    const iconSteps = (group: 'consult' | 'prepare', icons: Record<string, typeof Camera>): Step[] =>
        Object.entries(icons).map(([key, Icon]) => ({
            key,
            marker: <Icon className={ICON} strokeWidth={1.5} aria-hidden="true" />,
            title: t(`${group}.${key}.title`),
            body: t(`${group}.${key}.body`),
        }))

    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [...patientFaq, ...faq].map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
    }

    return (
        <div className="editorial-surface min-h-screen bg-warm font-body text-ink">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

            <ExplainerHero
                breadcrumb={{
                    procedures: labels.breadcrumbProcedures,
                    category: labels.categoryLabel,
                    current: labels.breadcrumbCurrent,
                }}
                eyebrow={t('eyebrow')}
                heading={t('heading')}
                subtext={t('subtext')}
                primary={{ href: `/simulate/${explainer.slug}`, label: t('ctaPrimary') }}
                secondary={{ href: '#for-surgeons', label: t('ctaSecondary') }}
                figure={pair && {
                    beforeSrc: pair.beforeSrc,
                    afterSrc: pair.afterSrc,
                    beforeAlt: `${t('figure.before')}: ${t('figure.alt')}`,
                    afterAlt: `${t('figure.after')}: ${t('figure.alt')}`,
                    beforeLabel: t('figure.before'),
                    afterLabel: t('figure.after'),
                    dragHint: t('figure.dragHint'),
                    label: t('figure.label'),
                    caption: withSlot(t('figure.caption', { changes: SLOT }), <SimulatorSettings settings={pair.settings} />),
                }}
            />

            <GlanceSection
                eyebrow={t('about.eyebrow')}
                heading={t('about.heading')}
                body={t('about.body')}
                facts={explainer.facts.map((key) => ({
                    key,
                    value: t(`about.facts.${key}.value`),
                    label: t(`about.facts.${key}.label`),
                }))}
            />

            <CaseSection explainer={explainer} />

            <StepSection
                id="recovery"
                marker="label"
                eyebrow={t('recovery.eyebrow')}
                heading={t('recovery.heading')}
                subtext={t('recovery.subtext')}
                note={t('recovery.note')}
                steps={explainer.recovery.map((key) => ({
                    key,
                    marker: t(`recovery.items.${key}.when`),
                    title: t(`recovery.items.${key}.title`),
                    body: t(`recovery.items.${key}.body`),
                }))}
            />

            <CostSection slug={explainer.slug} />

            <StepSection
                id="prepare"
                eyebrow={t('prepare.eyebrow')}
                heading={t('prepare.heading')}
                steps={iconSteps('prepare', PREPARE_ICONS)}
            />

            <FaqSection id="patient-faq" heading={t('patientFaq.heading')} items={patientFaq} defaultOpen />

            <section id="for-surgeons" aria-labelledby="for-surgeons-heading" className="scroll-mt-20 border-t border-mist bg-warm pt-14 md:pt-20">
                <div className="editorial-container mx-auto px-5 md:px-8">
                    <div className="max-w-[680px]">
                        <ChapterLabel text={t('surgeons.eyebrow')} />
                        <h2 id="for-surgeons-heading" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                            {t('surgeons.heading')}
                        </h2>
                        <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{t('surgeons.subtext')}</p>
                        <Link href="/founding-partners" className="mt-4 inline-flex min-h-11 items-center font-body text-sm font-semibold text-sage underline-offset-4 hover:underline">
                            {t('ctaPartner')}
                        </Link>
                    </div>
                </div>
            </section>

            <MeasurementSection explainer={explainer} />

            <ControlSection explainer={explainer} />

            <StepSection
                id="explainer-consult"
                eyebrow={t('consult.eyebrow')}
                heading={t('consult.heading')}
                steps={iconSteps('consult', CONSULT_ICONS)}
            />

            <section aria-labelledby="explainer-evidence" className="bg-warm editorial-section">
                <div className="editorial-container mx-auto px-5 md:px-8">
                    <div className="max-w-[680px]">
                        <ChapterLabel text={t('evidence.eyebrow')} />
                        <h2 id="explainer-evidence" className="editorial-heading mt-3 text-balance font-headline font-normal text-ink">
                            {t('evidence.heading')}
                        </h2>
                        <p className="mt-4 font-body text-base leading-relaxed text-slate-hp">{t('evidence.subtext')}</p>
                    </div>

                    <ul className="mt-10 max-w-[960px] border-b border-mist">
                        {RHINOPLASTY_EVIDENCE.map((id) => {
                            const source = RESEARCH_SOURCES[id]
                            return (
                                <li
                                    key={source.key}
                                    className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-t border-mist py-4 md:grid-cols-[8rem_minmax(0,1fr)] md:py-5 md:gap-x-8"
                                >
                                    <span className="editorial-stats text-[1.75rem] leading-none text-ink md:text-4xl">{t(`evidence.${source.key}.value`)}</span>
                                    <p className="font-body text-base leading-relaxed text-slate-hp">
                                        {t(`evidence.${source.key}.body`)}{' '}
                                        <span className="whitespace-nowrap text-sm text-sage">
                                            (<a
                                                href={`#explainer-source-${source.key}`}
                                                className="underline decoration-mist underline-offset-4 hover:decoration-sage"
                                            >
                                                {authorYear(source.authors, source.year)}
                                            </a>)
                                        </span>
                                    </p>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-12 max-w-[960px]">
                        <h3 className="font-body text-sm font-semibold text-ink">{t('evidence.sourcesHeading')}</h3>
                        <ul className="mt-4 list-disc space-y-3 pl-5 font-body text-sm leading-relaxed text-slate-hp marker:text-sage">
                            {[...RHINOPLASTY_EVIDENCE]
                                .sort((a, b) => RESEARCH_SOURCES[a].authors.localeCompare(RESEARCH_SOURCES[b].authors))
                                .map((id) => {
                                    const source = RESEARCH_SOURCES[id]
                                    return (
                                        <li key={source.key} id={`explainer-source-${source.key}`}>
                                            {source.authors}.{' '}
                                            <a href={source.url} className="text-ink underline decoration-mist underline-offset-4 hover:decoration-sage">{source.title}</a>{/[.?!]$/.test(source.title) ? '' : '.'}{' '}
                                            <em>{source.journal}</em>. {source.citation}.
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                </div>
            </section>

            <FaqSection id="explainer-faq" heading={t('faq.heading')} items={faq} />

            <RelatedProcedures heading={labels.relatedHeading} procedures={labels.related} />

            <ClosingCtaBand
                heading={tHome('heading')}
                primary={{ href: `/simulate/${explainer.slug}`, label: t('ctaPrimary') }}
                secondary={{ href: '/founding-partners', label: t('ctaPartner') }}
            />

            <RegulatoryFooter />
        </div>
    )
}

function FaqSection({ id, heading, items, defaultOpen = false }: { id: string; heading: string; items: { q: string; a: string }[]; defaultOpen?: boolean }) {
    return (
        <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 bg-warm editorial-section">
            <div className="editorial-container mx-auto px-5 md:px-8 lg:grid lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.1fr)] lg:gap-20">
                <h2 id={`${id}-heading`} className="editorial-heading text-balance font-headline font-normal text-ink">
                    {heading}
                </h2>
                <div className="editorial-faq mt-8 border-t border-mist lg:mt-0">
                    {items.map((item, index) => (
                        <FaqDisclosure key={item.q} question={item.q} defaultOpen={defaultOpen && index === 0}>
                            {item.a}
                        </FaqDisclosure>
                    ))}
                </div>
            </div>
        </section>
    )
}

/** "Punthakee et al., 2009" from the full author list. */
function authorYear(authors: string, year: number): string {
    const [first, ...rest] = authors.split(',')
    const surname = first.trim().split(' ')[0]
    return `${surname}${rest.length > 0 ? ' et al.' : ''}, ${year}`
}

/** Splits a message rendered with SLOT as its argument and puts node in the slot. */
function withSlot(message: string, node: ReactNode): ReactNode {
    const [lead, ...tail] = message.split(SLOT)
    return <>{lead}{tail.length > 0 && node}{tail.join('')}</>
}
