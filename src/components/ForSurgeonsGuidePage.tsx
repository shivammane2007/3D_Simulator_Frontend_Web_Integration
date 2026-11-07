"use client";

import { useTranslations } from "@/i18n/messages";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { openDemoModal } from "@/lib/analytics";
import {
    ArrowRight,
    CheckCircle2,
    XCircle,
    Clock,
    Smartphone,
    Camera,
    Sliders,
    Send,
    UserCheck,
    RefreshCw,
    Globe,
    Stethoscope,
    ShieldCheck,
    Zap,
    type LucideIcon,
} from "lucide-react";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeading from "@/components/marketing/SectionHeading";
import MarketingCard from "@/components/marketing/MarketingCard";

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
};

function stagger(i: number) {
    return { ...fadeUp, transition: { duration: 0.5, delay: i * 0.08 } };
}

// ---------------------------------------------------------------------------
// Icon maps
// ---------------------------------------------------------------------------

const STEP_ICONS: LucideIcon[] = [UserCheck, Camera, Zap, Sliders, Send];
const SCENARIO_ICONS: LucideIcon[] = [Stethoscope, RefreshCw, Globe];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ForSurgeonsGuidePage() {
    const t = useTranslations("ForSurgeonsGuide");

    const workflowSteps = [0, 1, 2, 3, 4].map((i) => ({
        icon: STEP_ICONS[i],
        stepNum: t(`workflow.steps.${i}.stepNum`),
        time: t(`workflow.steps.${i}.time`),
        title: t(`workflow.steps.${i}.title`),
        desc: t(`workflow.steps.${i}.desc`),
    }));

    const scenarios = [0, 1, 2].map((i) => ({
        icon: SCENARIO_ICONS[i],
        title: t(`scenarios.items.${i}.title`),
        desc: t(`scenarios.items.${i}.desc`),
    }));

    const isItems = [0, 1, 2, 3].map((i) => t(`clarity.is.${i}`));
    const isntItems = [0, 1, 2, 3].map((i) => t(`clarity.isnt.${i}`));

    return (
        <div className="bg-warm font-body">
            <PageHero
                label={t("hero.label")}
                title={t("hero.title")}
                subtitle={t("hero.subtitle")}
            />

            {/* Hero CTAs */}
            <MarketingSection variant="warm" className="!pt-0 !pb-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/login"
                        className="px-8 py-3.5 bg-sage hover:bg-sage-light text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 font-body"
                    >
                        {t("hero.cta.trial")} <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => openDemoModal("guide_hero")}
                        className="px-8 py-3.5 border border-mist hover:border-sage/40 text-ink text-sm font-bold rounded-full transition-all hover:bg-white font-body"
                    >
                        {t("hero.cta.walkthrough")}
                    </button>
                </div>
                <p className="text-xs text-slate-600 mt-4 text-center font-body">
                    {t("hero.cta.sub")}
                </p>
            </MarketingSection>

            {/* Without vs. With Faceify */}
            <MarketingSection variant="dark">
                <SectionHeading
                    label={t("comparison.label")}
                    title={t("comparison.title")}
                    dark
                />
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* WITHOUT */}
                    <motion.div {...stagger(0)}>
                        <MarketingCard variant="glass-dark" className="h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <h3 className="text-base font-semibold text-white font-body">
                                    {t("comparison.without.heading")}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                        <span className="text-sm text-white/70 font-body leading-relaxed">
                                            {t(`comparison.without.points.${i}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </MarketingCard>
                    </motion.div>

                    {/* WITH */}
                    <motion.div {...stagger(1)}>
                        <MarketingCard variant="glass-dark" className="h-full border-sage/40">
                            <div className="flex items-center gap-3 mb-6">
                                <CheckCircle2 className="w-6 h-6 text-sage-light shrink-0" />
                                <h3 className="text-base font-semibold text-white font-body">
                                    {t("comparison.with.heading")}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-sage-light mt-0.5 shrink-0" />
                                        <span className="text-sm text-white/85 font-body leading-relaxed">
                                            {t(`comparison.with.points.${i}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </MarketingCard>
                    </motion.div>
                </div>
            </MarketingSection>

            {/* Step-by-Step Workflow */}
            <MarketingSection variant="white">
                <SectionHeading
                    label={t("workflow.label")}
                    title={t("workflow.title")}
                />
                <div className="space-y-6 max-w-4xl mx-auto">
                    {workflowSteps.map((step, i) => (
                        <motion.div key={step.stepNum} {...stagger(i)}>
                            <MarketingCard hover>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center shrink-0">
                                            <step.icon className="w-5 h-5 text-sage" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-sage tracking-widest uppercase font-body">
                                                {step.stepNum}
                                            </span>
                                            <h3 className="text-xl font-normal text-ink font-serif">
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm border border-mist text-xs font-semibold text-slate-600 font-body shrink-0">
                                        <Clock className="w-3.5 h-3.5 text-sage" />
                                        {step.time}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 font-body leading-relaxed pl-0 sm:pl-14">
                                    {step.desc}
                                </p>
                            </MarketingCard>
                        </motion.div>
                    ))}
                </div>
            </MarketingSection>

            {/* Practice Scenarios */}
            <MarketingSection variant="warm">
                <SectionHeading
                    label={t("scenarios.label")}
                    title={t("scenarios.title")}
                />
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {scenarios.map((scenario, i) => (
                        <motion.div key={scenario.title} {...stagger(i)}>
                            <MarketingCard hover className="h-full">
                                <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center mb-4">
                                    <scenario.icon className="w-5 h-5 text-sage" />
                                </div>
                                <h3 className="text-lg font-normal text-ink mb-2 font-serif">
                                    {scenario.title}
                                </h3>
                                <p className="text-sm text-slate-600 font-body leading-relaxed">
                                    {scenario.desc}
                                </p>
                            </MarketingCard>
                        </motion.div>
                    ))}
                </div>
            </MarketingSection>

            {/* What Faceify IS / ISN'T */}
            <MarketingSection variant="white">
                <SectionHeading
                    label={t("clarity.label")}
                    title={t("clarity.title")}
                />
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* IS */}
                    <motion.div {...stagger(0)}>
                        <MarketingCard className="h-full bg-sage/5 border-sage/30">
                            <div className="flex items-center gap-3 mb-5">
                                <CheckCircle2 className="w-6 h-6 text-sage shrink-0" />
                                <h3 className="text-base font-semibold text-ink font-body">
                                    {t("clarity.is.heading")}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {isItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-sage mt-0.5 shrink-0" />
                                        <span className="text-sm text-slate-700 font-body leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </MarketingCard>
                    </motion.div>

                    {/* ISN'T */}
                    <motion.div {...stagger(1)}>
                        <MarketingCard className="h-full bg-warm border-slate-200">
                            <div className="flex items-center gap-3 mb-5">
                                <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                                <h3 className="text-base font-semibold text-ink font-body">
                                    {t("clarity.isnt.heading")}
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {isntItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <XCircle className="w-4 h-4 text-red-300 mt-0.5 shrink-0" />
                                        <span className="text-sm text-slate-600 font-body leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </MarketingCard>
                    </motion.div>
                </div>

                <motion.p
                    className="text-xs text-slate-400 text-center mt-8 max-w-2xl mx-auto font-body"
                    {...fadeUp}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {t("clarity.disclaimer")}
                </motion.p>
            </MarketingSection>

            {/* Device callout */}
            <MarketingSection variant="warm">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    {...fadeUp}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sage/10 mb-6">
                        <Smartphone className="w-6 h-6 text-sage" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-ink mb-4">
                        {t("device.title")}
                    </h2>
                    <p className="text-base text-slate-600 font-body leading-relaxed max-w-xl mx-auto">
                        {t("device.body")}
                    </p>
                </motion.div>
            </MarketingSection>

            {/* Final CTA */}
            <MarketingSection variant="white">
                <motion.div
                    className="max-w-3xl mx-auto text-center bg-ink rounded-[24px] p-12 sm:p-16 relative overflow-hidden"
                    {...fadeUp}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-sage/20 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
                            {t("cta.title")}
                        </h2>
                        <p className="text-white/70 mb-8 max-w-lg mx-auto leading-relaxed font-body">
                            {t("cta.body")}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/login"
                                className="px-8 py-3.5 bg-sage hover:bg-sage-light text-white text-sm font-bold rounded-full transition-all flex items-center gap-2 font-body"
                            >
                                {t("cta.trial")} <ArrowRight className="w-4 h-4" />
                            </Link>
                            <button
                                onClick={() => openDemoModal("guide_final_cta")}
                                className="px-8 py-3.5 border border-white/20 hover:border-white/40 text-white text-sm font-bold rounded-full transition-all hover:bg-white/5 font-body"
                            >
                                {t("cta.walkthrough")}
                            </button>
                        </div>

                        <p className="text-[10px] text-white/70 mt-6 font-body">
                            {t("cta.sub")}
                        </p>
                    </div>
                </motion.div>
            </MarketingSection>
        </div>
    );
}

