"use client";

import MarketingReveal from "@/components/marketing/MarketingReveal";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "@/i18n/messages";
import { Link } from "@/i18n/routing";
import { openDemoModal, trackEvent } from "@/lib/analytics";
import { FEATURE_FLAGS } from "@/lib/config/featureFlags";
import {
    Monitor,
    ShieldCheck,
    Zap,
    DollarSign,
    Users,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Minus,
    Upload,
    Sparkles,
    MessageSquare,
    ScanFace,
    Eye,
    Scissors,
    Syringe,
    SmilePlus,
    HeartPulse,
    Layers,
    Gauge,
    Globe,
    Lock,
    Laptop,
    Tag,
    TrendingUp,
    CalendarCheck,
    Star,
    Share2,
    type LucideIcon,
} from "lucide-react";
import SurgeonTestimonials from "@/components/SurgeonTestimonials";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeading from "@/components/marketing/SectionHeading";
import MarketingCard from "@/components/marketing/MarketingCard";
import DemoGuide from "@/components/marketing/DemoGuide";

// ---------------------------------------------------------------------------
// Icon maps
// ---------------------------------------------------------------------------

const PAIN_POINT_ICONS: LucideIcon[] = [MessageSquare, Users, DollarSign, Globe];

const SOLUTION_ICONS: LucideIcon[] = [Monitor, Lock, Layers, Laptop, Zap, ShieldCheck];

const STEP_ICONS: LucideIcon[] = [Upload, Sparkles, ScanFace];

const PROCEDURE_ICONS: LucideIcon[] = [
    ScanFace, Eye, SmilePlus, SmilePlus, Syringe, Syringe,
    Scissors, Scissors, Scissors, HeartPulse, Sparkles, Syringe, Scissors, HeartPulse,
];

// Boolean/partial values for comparison rows that cannot come from i18n
type CompValue = true | false | "partial";
const COMPARISON_VALUES: { faceify: CompValue | null; legacy: CompValue | null; cloud: CompValue | null }[] = [
    { faceify: null, legacy: null, cloud: null },        // 0: text values from i18n
    { faceify: null, legacy: null, cloud: null },        // 1: text values from i18n
    { faceify: null, legacy: null, cloud: null },        // 2: text values from i18n
    { faceify: true, legacy: true, cloud: false },       // 3: Patient data privacy
    { faceify: true, legacy: false, cloud: "partial" },  // 4: Works on iPad / phone
    { faceify: true, legacy: true, cloud: false },       // 5: Anatomical mesh model
    { faceify: null, legacy: null, cloud: null },        // 6: text values from i18n
    { faceify: true, legacy: "partial", cloud: false },  // 7: Real-time adjustments
    { faceify: true, legacy: false, cloud: "partial" },  // 8: Patient take-home link
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CompCell({ value }: { value: string | boolean | "partial" }) {
    // Visible icons + sr-only text for screen readers / static scrapers /
    // SEO crawlers. Without the sr-only label, the table reads as empty
    // cells to anyone not rendering SVG (Comet QA P1-4 false-positive).
    if (value === true) return (
        <span className="inline-flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#CF4500]" aria-hidden="true" />
            <span className="sr-only">Yes</span>
        </span>
    );
    if (value === false) return (
        <span className="inline-flex items-center justify-center">
            <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
            <span className="sr-only">No</span>
        </span>
    );
    if (value === "partial") return (
        <span className="inline-flex items-center justify-center">
            <Minus className="w-5 h-5 text-[#9A6428]" aria-hidden="true" />
            <span className="sr-only">Partial</span>
        </span>
    );
    return <span>{value}</span>;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ForSurgeonsPage() {
    const t = useTranslations("ForSurgeons");
    const searchParams = useSearchParams();

    // Attribute /for-surgeons traffic that came from /demo so PostHog can
    // build the demo→signup funnel. Fires once on mount when the URL
    // carries the source/procedure tags written by the demo CTAs.
    // Guard against null searchParams (test env without Next.js routing
    // context) so component tests still render cleanly.
    useEffect(() => {
        if (!searchParams) return;
        const source = searchParams.get("source");
        const procedure = searchParams.get("procedure");
        if (source) {
            trackEvent("for_surgeons_visited_from_source", {
                source,
                procedure: procedure ?? undefined,
            });
        }
        // Mount-only: searchParams ref is stable for the duration of one
        // page view; we don't want to re-fire on push/replace navigations.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const painPoints = [0, 1, 2, 3].map((i) => ({
        icon: PAIN_POINT_ICONS[i],
        title: t(`painPoints.${i}.title`),
        desc: t(`painPoints.${i}.desc`),
    }));

    const solutionPoints = [0, 1, 2, 3, 4, 5].map((i) => ({
        icon: SOLUTION_ICONS[i],
        title: t(`solutionPoints.${i}.title`),
        desc: t(`solutionPoints.${i}.desc`),
    }));

    const roiMetrics = [0, 1, 2, 3].map((i) => ({
        value: t(`roiMetrics.${i}.value`),
        label: t(`roiMetrics.${i}.label`),
        sub: t(`roiMetrics.${i}.sub`),
    }));

    const steps = [0, 1, 2].map((i) => ({
        num: t(`steps.${i}.num`),
        icon: STEP_ICONS[i],
        title: t(`steps.${i}.title`),
        desc: t(`steps.${i}.desc`),
    }));

    const procedures = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => ({
        name: t(`procedureList.${i}`),
        icon: PROCEDURE_ICONS[i],
    }));

    const comparisonRows = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const vals = COMPARISON_VALUES[i];
        const hasFaceifyText = vals.faceify === null;
        return {
            feature: t(`comparisonRows.${i}.feature`),
            faceify: hasFaceifyText ? t(`comparisonRows.${i}.faceify` as Parameters<typeof t>[0]) : (vals.faceify as CompValue),
            legacy: hasFaceifyText ? t(`comparisonRows.${i}.legacy` as Parameters<typeof t>[0]) : (vals.legacy as CompValue),
            cloud: hasFaceifyText ? t(`comparisonRows.${i}.cloud` as Parameters<typeof t>[0]) : (vals.cloud as CompValue),
        };
    });

    return (
        <div className="bg-warm font-body">
            <PageHero
                label={t("hero.label")}
                title={t.rich("hero.title", {
                    em: (chunks: React.ReactNode) => <em className="font-headline text-[#CF4500] not-italic italic">{chunks}</em>,
                })}
                subtitle={t("hero.subtitle")}
            />

            {/* Hero CTAs */}
            <MarketingSection variant="warm" className="!pt-0 !pb-12" noFade>
                <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/founding-partners"
                        className="editorial-button px-8 py-3.5 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 font-body shadow-sm"
                        data-testid="founding-partner-cta"
                    >
                        <Star className="w-4 h-4" />
                        {t("cta.foundingPartnerCta")}
                    </Link>
                    <Link
                        href={`/login?callbackUrl=${encodeURIComponent("/onboarding")}`}
                        className="editorial-button px-8 py-3.5 border border-mist hover:border-[#CF4500]/40 text-ink text-sm font-bold rounded-full transition-all hover:bg-white font-body flex items-center gap-2"
                        data-testid="free-embed-widget-cta"
                    >
                        {t("cta.getStarted")} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => openDemoModal("for_surgeons_hero")}
                        className="editorial-button px-8 py-3.5 border border-mist hover:border-[#CF4500]/40 text-ink text-sm font-bold rounded-full transition-all hover:bg-white font-body"
                    >
                        {t("cta.bookDemo")}
                    </button>
                </div>
                <p className="text-sm text-slate-hp mt-4 text-center font-body">
                    {t("cta.noCreditCard")}
                </p>
            </MarketingSection>

            <DemoGuide defaultTab="surgeon" />

            {/* The Problem */}
            <MarketingSection variant="white">
                <SectionHeading label={t("problem.label")} title={t("problem.title")} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                    {painPoints.map((p, i) => (
                        <MarketingReveal key={p.title} delay={Math.min(i * 0.04, 0.16)}>
                            <MarketingCard>
                                <p.icon className="w-7 h-7 text-[#CF4500] mb-4" />
                                <h3 className="text-xl font-normal text-ink mb-2 font-headline">{p.title}</h3>
                                <p className="text-sm text-slate-hp leading-relaxed font-body">{p.desc}</p>
                            </MarketingCard>
                        </MarketingReveal>
                    ))}
                </div>
            </MarketingSection>

            {/* The Solution */}
            <MarketingSection variant="warm">
                <SectionHeading label={t("solution.label")} title={t("solution.title")} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                    {solutionPoints.map((s, i) => (
                        <MarketingReveal key={s.title} delay={Math.min(i * 0.04, 0.16)}>
                            <MarketingCard hover>
                                <div className="w-10 h-10 rounded-xl bg-[#CF4500]/10 flex items-center justify-center mb-4">
                                    <s.icon className="w-5 h-5 text-[#CF4500]" />
                                </div>
                                <h3 className="text-xl font-normal text-ink mb-1.5 font-headline">{s.title}</h3>
                                <p className="text-sm text-slate-hp leading-relaxed font-body">{s.desc}</p>
                            </MarketingCard>
                        </MarketingReveal>
                    ))}
                </div>
            </MarketingSection>

            {/* ROI Metrics */}
            <MarketingSection variant="dark">
                <SectionHeading label={t("roi.label")} title={t("roi.title")} dark />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    {roiMetrics.map((m, i) => (
                        <MarketingReveal key={m.label} delay={Math.min(i * 0.04, 0.16)}>
                            <MarketingCard variant="glass-dark">
                                <p className="text-5xl font-serif tabular-nums text-sage-light mb-2">{m.value}</p>
                                <p className="text-sm font-semibold text-white mb-1 font-body">{m.label}</p>
                                <p className="text-[10px] text-white/85 font-body">{m.sub}</p>
                            </MarketingCard>
                        </MarketingReveal>
                    ))}
                </div>
                <p className="text-[10px] text-white/85 text-center mt-6 max-w-2xl mx-auto font-body">
                    {t("roi.disclaimer")}
                </p>
            </MarketingSection>

            {/* Founding Partner Section */}
            <MarketingSection variant="warm">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-5">                        <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-sage font-body">
                            {t("foundingPartner.label")}
                        </span>
                    </div>
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
                        <div>
                            <h2 className="text-balance font-headline text-[clamp(2rem,4vw,2.8rem)] font-normal text-ink mb-4 leading-tight">
                                {t("foundingPartner.title")}
                            </h2>
                            <p className="text-base text-slate-hp font-body font-normal mb-6 leading-relaxed">
                                {t("foundingPartner.subtitle")}
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <Link
                                    href="/founding-partners"
                                    className="editorial-button inline-flex items-center gap-2 px-6 py-3 bg-sage editorial-primary hover:bg-sage text-white text-sm font-bold rounded-full transition-colors font-body"
                                    data-testid="founding-partner-link"
                                >
                                    <Star className="w-4 h-4" />
                                    {t("foundingPartner.ctaBecome")}
                                </Link>
                                <Link
                                    href="/founding-partners"
                                    className="editorial-button inline-flex items-center gap-2 px-6 py-3 border border-mist hover:border-sage/40 text-ink text-sm font-bold rounded-full transition-colors hover:bg-white font-body"
                                >
                                    {t("foundingPartner.ctaView")} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {([0, 1, 2, 3] as const).map((i) => {
                                const key = String(i) as "0" | "1" | "2" | "3";
                                const icons = [Star, Share2, TrendingUp, Users];
                                const Icon = icons[i];
                                return (
                                    <MarketingReveal
                                        key={key}
                                        delay={Math.min(i * 0.04, 0.16)}
                                        className="bg-white border border-mist rounded-xl p-4"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center mb-3">
                                            <Icon className="w-4 h-4 text-sage" />
                                        </div>
                                        <h3 className="text-xl font-normal text-ink mb-1 font-headline">
                                            {t(`foundingPartner.perk${key}Title` as Parameters<typeof t>[0])}
                                        </h3>
                                        <p className="text-sm text-slate-hp font-body leading-relaxed">
                                            {t(`foundingPartner.perk${key}Desc` as Parameters<typeof t>[0])}
                                        </p>
                                    </MarketingReveal>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </MarketingSection>

            {/* Free Embed Widget Section */}
            <MarketingSection variant="white">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-5">                        <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-sage font-body">
                            {t("freeWidget.label")}
                        </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-balance font-headline text-[clamp(1.8rem,3.5vw,2.4rem)] font-normal text-ink mb-4 leading-tight">
                                {t("freeWidget.title")}
                            </h2>
                            <p className="text-base text-slate-hp font-body font-normal mb-6 leading-relaxed">
                                {t("freeWidget.desc")}
                            </p>
                            <Link
                                href={`/login?callbackUrl=${encodeURIComponent("/onboarding")}`}
                                className="editorial-button inline-flex items-center gap-2 px-6 py-3 bg-sage editorial-primary hover:bg-sage text-white text-sm font-bold rounded-full transition-colors font-body"
                                data-testid="free-widget-link"
                            >
                                {t("freeWidget.cta")} <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="bg-warm rounded-2xl border border-mist p-6">
                            <p className="text-xs font-semibold text-slate-hp font-body mb-3 uppercase tracking-wider">
                                {t("freeWidget.label")}
                            </p>
                            <div className="space-y-3">
                                {[
                                    { icon: ScanFace, text: t("freeWidget.bullets.bioLink") },
                                    { icon: Zap, text: t("freeWidget.bullets.embed") },
                                    { icon: Lock, text: t("freeWidget.bullets.noContract") },
                                    { icon: Globe, text: t("freeWidget.bullets.languages") },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                                            <item.icon className="w-3.5 h-3.5 text-sage" />
                                        </div>
                                        <span className="text-sm text-ink font-body">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </MarketingSection>

            {/* Marketplace Section */}
            <MarketingSection variant="warm">
                <div className="max-w-5xl mx-auto">
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
                        <MarketingReveal >
                            <div className="flex items-center gap-3 mb-5">                                <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-sage font-body">
                                    Aesthetic Marketplace
                                </span>
                            </div>
                            <h2 className="text-balance font-headline text-[clamp(2rem,4vw,2.8rem)] font-normal text-ink mb-4 leading-tight">
                                Grow your practice with{" "}
                                <span className="italic text-sage">qualified patient leads</span>
                            </h2>
                            <p className="text-base text-slate-hp font-body font-normal mb-6 leading-relaxed">
                                List your exclusive deals on our marketplace. Patients discover your offers, try our simulator to visualize results, then book consultations directly with you.
                            </p>
                            <div className="space-y-4 mb-8">
                                {[
                                    { icon: Tag, text: "Post deals that attract new patients" },
                                    { icon: TrendingUp, text: "Patients pre-qualified through simulation" },
                                    { icon: CalendarCheck, text: "Direct bookings: no middlemen fees" },
                                ].map((item, i) => (
                                    <MarketingReveal
                                        key={item.text}
                                        className="flex items-center gap-3"
                                        delay={Math.min(i * 0.04, 0.16)}
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center shrink-0">
                                            <item.icon className="w-4 h-4 text-sage" />
                                        </div>
                                        <span className="text-sm text-ink font-body">{item.text}</span>
                                    </MarketingReveal>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                {FEATURE_FLAGS.MARKETPLACE_DEALS_ENABLED ? (
                                    <Link
                                        href="/deals"
                                        className="editorial-button inline-flex items-center gap-2 px-6 py-3 bg-sage editorial-primary hover:bg-sage text-white text-sm font-bold rounded-full transition-colors font-body"
                                    >
                                        <Tag className="w-4 h-4" />
                                        View Marketplace
                                    </Link>
                                ) : (
                                    <span className="inline-flex items-center gap-2 px-6 py-3 border border-mist text-slate-hp text-sm font-bold rounded-full font-body cursor-not-allowed">
                                        <Tag className="w-4 h-4" />
                                        Marketplace: Coming Soon
                                    </span>
                                )}
                                <button
                                    onClick={() => openDemoModal("marketplace_section")}
                                    className="editorial-button inline-flex items-center gap-2 px-6 py-3 border border-mist hover:border-sage/40 text-ink text-sm font-bold rounded-full transition-colors hover:bg-white font-body"
                                >
                                    Learn How It Works
                                </button>
                            </div>
                        </MarketingReveal>

                        <MarketingReveal
                            className="bg-white rounded-2xl border border-mist p-6 editorial-paper"
                            delay={0.12}
                        >
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-mist">
                                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-sage" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-ink font-body">Patient Flow</p>
                                    <p className="text-[11px] text-slate-hp font-body">How patients find you</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { step: "1", label: "Discovers your deal", desc: "Patient browses marketplace" },
                                    { step: "2", label: "Tries simulator", desc: "Visualizes their results" },
                                    { step: "3", label: "Books consultation", desc: "Pre-qualified, ready to buy" },
                                ].map((item, i) => (
                                    <div key={item.step} className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-full bg-sage text-white text-xs font-bold flex items-center justify-center shrink-0">
                                            {item.step}
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <p className="text-sm font-semibold text-ink font-body">{item.label}</p>
                                            <p className="text-sm text-slate-hp font-body">{item.desc}</p>
                                        </div>
                                        {i < 2 && (
                                            <div className="w-px h-8 bg-slate-200 ml-3 mt-7 -mb-4" />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-mist flex items-center justify-between">
                                <span className="text-sm text-slate-hp font-body">Result</span>
                                <span className="text-sm font-bold text-sage font-body">Higher conversion, lower CAC</span>
                            </div>
                        </MarketingReveal>
                    </div>
                </div>
            </MarketingSection>

            {/* How It Works */}
            <MarketingSection variant="white">
                <SectionHeading label={t("howItWorks.label")} title={t("howItWorks.title")} />
                <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {steps.map((s, i) => (
                        <MarketingReveal key={s.num} className="relative" delay={Math.min(i * 0.04, 0.16)}>
                            <MarketingCard hover>
                                <span className="text-[10px] font-body font-semibold text-sage tracking-widest uppercase mb-4 block">
                                    {t("howItWorks.stepPrefix")} {s.num}
                                </span>
                                <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center mb-5">
                                    <s.icon className="w-6 h-6 text-sage" />
                                </div>
                                <h3 className="text-base font-normal text-ink mb-2 font-headline">{s.title}</h3>
                                <p className="text-sm text-slate-hp leading-relaxed font-body">{s.desc}</p>
                            </MarketingCard>

                            {i < steps.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-4 z-10 w-8 items-center justify-center -translate-y-1/2">
                                    <ArrowRight className="w-5 h-5 text-sage-light" />
                                </div>
                            )}
                        </MarketingReveal>
                    ))}
                </div>

                <MarketingReveal className="text-center mt-10">
                    <Link
                        href="/for-surgeons/guide"
                        className="editorial-button inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-ink transition-colors font-body"
                    >
                        {t("howItWorks.guideLink")}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </MarketingReveal>
            </MarketingSection>

            {/* Testimonials */}
            <MarketingSection variant="warm">
                <SurgeonTestimonials
                    heading={t("testimonials.heading")}
                    label={t("testimonials.label")}
                />
            </MarketingSection>

            {/* Procedures Covered */}
            <MarketingSection variant="white">
                <SectionHeading label={t("procedures.label")} title={t("procedures.title")} />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-5xl mx-auto">
                    {procedures.map((p, i) => (
                        <MarketingReveal
                            key={p.name}
                            className="bg-white border border-mist rounded-xl px-4 py-3.5 flex items-center gap-3 hover:border-sage/40 transition-colors"
                            delay={Math.min(i * 0.04, 0.16)}
                        >
                            <p.icon className="w-4 h-4 text-sage shrink-0" />
                            <span className="text-xs font-semibold text-ink font-body">{p.name}</span>
                        </MarketingReveal>
                    ))}
                </div>

                <MarketingReveal className="text-center mt-10">
                    <Link
                        href="/gallery"
                        className="editorial-button inline-flex items-center gap-2 text-sm font-semibold text-sage hover:text-ink transition-colors font-body"
                    >
                        {t("procedures.viewGallery")}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </MarketingReveal>
            </MarketingSection>

            {/* Comparison Table */}
            <MarketingSection variant="warm">
                <SectionHeading label={t("comparison.label")} title={t("comparison.title")} />
                <MarketingReveal className="max-w-4xl mx-auto">
                    {/*
                      Below md this renders as stacked cards, not a table.
                      Four columns cannot fit 360px: the cells broke mid-word
                      ("Propri/etary/camer/a", "Legacy/Hardwa/re"). The usual
                      overflow-x-auto + min-width fix is NOT usable here --
                      Lenis owns <html>, and a min-width on a display:table
                      pushes intrinsic width past every clipping ancestor, so
                      the whole PAGE gained 158px of horizontal scroll. Cards
                      avoid the scroll entirely and read better on a phone.
                      Same data, same translation keys, no new copy.
                    */}
                    <ul className="md:hidden space-y-3 list-none">
                        {comparisonRows.map((row) => (
                            <li key={row.feature} className="bg-white rounded-2xl border border-mist p-4">
                                <p className="text-xs font-body font-semibold text-ink mb-3">{row.feature}</p>
                                <dl className="space-y-2">
                                    <div className="flex items-center justify-between gap-4 border-t border-mist pt-2">
                                        <dt className="text-[0.7rem] font-body font-semibold uppercase tracking-wider text-sage">
                                            {t("comparison.faceifyHeader")}
                                        </dt>
                                        <dd className="text-xs font-body font-bold text-sage text-right">
                                            <CompCell value={row.faceify} />
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 border-t border-mist pt-2">
                                        <dt className="text-[0.7rem] font-body font-semibold uppercase tracking-wider text-slate-hp">
                                            {t("comparison.legacyHeader")}
                                        </dt>
                                        <dd className="text-xs font-body text-slate-hp text-right">
                                            <CompCell value={row.legacy} />
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 border-t border-mist pt-2">
                                        <dt className="text-[0.7rem] font-body font-semibold uppercase tracking-wider text-slate-hp">
                                            {t("comparison.cloudHeader")}
                                        </dt>
                                        <dd className="text-xs font-body text-slate-hp text-right">
                                            <CompCell value={row.cloud} />
                                        </dd>
                                    </div>
                                </dl>
                            </li>
                        ))}
                    </ul>
                    <table className="hidden md:table w-full text-sm bg-white rounded-[20px] border border-mist overflow-hidden">
                        <thead>
                            <tr className="border-b border-mist">
                                <th className="text-left py-4 px-5 text-xs font-body font-semibold text-slate-hp uppercase tracking-wider w-[35%]">
                                    {t("comparison.featureHeader")}
                                </th>
                                <th className="py-4 px-4 text-center">
                                    <span className="text-xs font-bold text-sage bg-sage/10 px-3 py-1 rounded-full font-body">
                                        {t("comparison.faceifyHeader")}
                                    </span>
                                </th>
                                <th className="py-4 px-4 text-center">
                                    <span className="text-xs font-semibold text-slate-hp font-body">
                                        {t("comparison.legacyHeader")}
                                    </span>
                                </th>
                                <th className="py-4 px-4 text-center">
                                    <span className="text-xs font-semibold text-slate-hp font-body">
                                        {t("comparison.cloudHeader")}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map((row) => (
                                <tr key={row.feature} className="border-b border-mist last:border-0 hover:bg-warm/50 transition-colors">
                                    <td className="py-3.5 px-5 text-xs font-medium text-ink font-body">
                                        {row.feature}
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-xs font-bold text-sage font-body">
                                        <CompCell value={row.faceify} />
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm text-slate-hp font-body">
                                        <CompCell value={row.legacy} />
                                    </td>
                                    <td className="py-3.5 px-4 text-center text-sm text-slate-hp font-body">
                                        <CompCell value={row.cloud} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </MarketingReveal>
            </MarketingSection>

            {/* Final CTA */}
            <MarketingSection variant="white">
                <MarketingReveal
                    className="max-w-3xl mx-auto text-center bg-ink rounded-[24px] p-6 sm:p-12 lg:p-16 relative overflow-hidden"

                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-sage/20 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <Gauge className="w-10 h-10 text-sage-light mx-auto mb-5" />
                        <h2 className="text-balance text-3xl sm:text-4xl font-headline text-white mb-4">
                            {t("finalCta.title")}
                        </h2>
                        <p className="text-white/85 mb-8 max-w-lg mx-auto leading-relaxed font-body">
                            {t("finalCta.body")}
                        </p>

                        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/founding-partners"
                                className="editorial-button px-8 py-3.5 bg-sage editorial-primary hover:bg-sage text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 font-body"
                                data-testid="final-founding-partner-cta"
                            >
                                <Star className="w-4 h-4" />
                                {t("cta.foundingPartnerCta")}
                            </Link>
                            <Link
                                href={`/login?callbackUrl=${encodeURIComponent("/onboarding")}`}
                                className="editorial-button px-8 py-3.5 border border-white/20 hover:border-white/40 text-white text-sm font-bold rounded-full transition-all hover:bg-white/5 font-body flex items-center gap-2"
                            >
                                {t("cta.getStarted")} <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => openDemoModal("for_surgeons_cta")}
                                className="editorial-button px-8 py-3.5 border border-white/20 hover:border-white/40 text-white text-sm font-bold rounded-full transition-all hover:bg-white/5 font-body"
                            >
                                {t("cta.bookDemoFinal")}
                            </button>
                        </div>

                        <p className="text-[10px] text-white/85 mt-6 font-body">
                            {t("cta.noCreditCardFinal")}
                        </p>
                    </div>
                </MarketingReveal>
            </MarketingSection>
        </div>
    );
}
