import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import CompareSlider from '@/components/ui/CompareSlider'
import MarketingButton from '@/components/marketing/MarketingButton'
import ChapterLabel from '@/components/homepage/ChapterLabel'

interface ExplainerHeroProps {
    breadcrumb: { procedures: string; category: string; current: string }
    eyebrow: string
    heading: string
    subtext: string
    primary: { href: string; label: string }
    secondary: { href: string; label: string }
    figure: {
        beforeSrc: string
        afterSrc: string
        beforeAlt: string
        afterAlt: string
        beforeLabel: string
        afterLabel: string
        dragHint: string
        label: string
        caption: ReactNode
    } | null
}

// The divider starts left of the nose so the whole nose reads as the simulated result at load.
const FIGURE_START = 22
const SECONDARY = 'inline-flex min-h-11 items-center justify-center font-body text-sm font-semibold text-sage underline-offset-4 hover:underline'

/** Article opening: the argument and its actions, then the front-view figure with its caption. */
export default function ExplainerHero({
    breadcrumb,
    eyebrow,
    heading,
    subtext,
    primary,
    secondary,
    figure,
}: ExplainerHeroProps) {
    return (
        <header className="editorial-container mx-auto grid gap-8 px-5 pt-28 pb-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_480px] lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-16 lg:gap-y-0 lg:pb-16">
            <div className="max-w-[680px] lg:col-start-1 lg:row-start-2">
                <nav aria-label="Breadcrumb" className="font-body text-sm text-slate-hp">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li><Link href="/procedures" className="hover:text-ink">{breadcrumb.procedures}</Link></li>
                        <li aria-hidden="true">/</li>
                        <li><Link href="/procedures" className="hover:text-ink">{breadcrumb.category}</Link></li>
                        <li aria-hidden="true">/</li>
                        <li className="text-ink">{breadcrumb.current}</li>
                    </ol>
                </nav>

                <ChapterLabel text={eyebrow} className="mt-8" />
                <h1 className="mt-3 text-balance font-headline text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] text-ink md:text-5xl lg:text-[3.5rem]">{heading}</h1>
                <p className="mt-5 font-body text-lg leading-relaxed text-slate-hp">{subtext}</p>
            </div>

            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-6 lg:col-start-1 lg:row-start-3 lg:mt-10">
                <MarketingButton href={primary.href} className="justify-center">
                    {primary.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </MarketingButton>
                {secondary.href.startsWith('#') ? (
                    <a href={secondary.href} className={SECONDARY}>{secondary.label}</a>
                ) : (
                    <Link href={secondary.href} className={SECONDARY}>{secondary.label}</Link>
                )}
            </div>

            {figure && (
                <figure className="mx-auto w-full max-w-[480px] lg:col-start-2 lg:row-span-4 lg:row-start-1">
                    <CompareSlider
                        beforeSrc={figure.beforeSrc}
                        afterSrc={figure.afterSrc}
                        beforeAlt={figure.beforeAlt}
                        afterAlt={figure.afterAlt}
                        beforeLabel={figure.beforeLabel}
                        afterLabel={figure.afterLabel}
                        label={figure.dragHint}
                        initialPosition={FIGURE_START}
                        aspectClassName="aspect-square"
                        eager
                    />
                    <figcaption className="mt-4 border-t border-mist pt-3">
                        <ChapterLabel text={figure.label} />
                        <p className="mt-1 font-body text-sm leading-relaxed text-slate-hp">{figure.caption}</p>
                    </figcaption>
                </figure>
            )}
        </header>
    )
}
