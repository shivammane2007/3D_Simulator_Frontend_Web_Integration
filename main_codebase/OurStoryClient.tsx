"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Shield, Eye, Globe2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { openDemoModal } from "@/lib/analytics";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeading from "@/components/marketing/SectionHeading";
import MarketingCard from "@/components/marketing/MarketingCard";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 },
};

function Divider() {
    return (
        <div className="flex items-center justify-center py-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent" />
        </div>
    );
}

export default function OurStoryClient() {
    const t = useTranslations("OurStory");

    const beliefs = [
        {
            icon: Eye,
            title: t("belief1Title"),
            body: t("belief1Body"),
        },
        {
            icon: Shield,
            title: t("belief2Title"),
            body: t("belief2Body"),
        },
        {
            icon: Zap,
            title: t("belief3Title"),
            body: t("belief3Body"),
        },
        {
            icon: Globe2,
            title: t("belief4Title"),
            body: t("belief4Body"),
        },
    ];

    return (
        <div className="bg-warm font-body">
            <PageHero
                label={t("heroLabel")}
                title={t.rich("heroTitle", {
                    em: (chunks) => <em className="font-serif text-sage not-italic italic">{chunks}</em>,
                })}
                subtitle={t("heroSubtitle")}
            />

            {/* The Problem */}
            <MarketingSection variant="white">
                <div className="max-w-3xl mx-auto">
                    <motion.h2 {...fadeUp} className="text-3xl font-serif text-ink mb-8">
                        {t("problemHeading")}
                    </motion.h2>
                    <motion.div {...fadeUp} className="space-y-6 text-slate-700 text-lg leading-relaxed">
                        <p>
                            {t.rich("problemP1", {
                                show: (chunks) => <em className="text-ink">{chunks}</em>,
                            })}
                        </p>
                        <p>
                            {t("problemP2")}
                        </p>
                        <p className="text-ink font-semibold text-xl font-serif">
                            {t("problemP3")}
                        </p>
                    </motion.div>
                </div>
            </MarketingSection>

            <Divider />

            {/* What We Believe */}
            <MarketingSection variant="warm">
                <SectionHeading title={t("beliefsHeading")} />
                <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                    {beliefs.map((belief, i) => (
                        <motion.div
                            key={belief.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <MarketingCard hover>
                                <belief.icon className="w-6 h-6 text-sage mb-4" />
                                <h3 className="text-base font-semibold text-ink mb-2">{belief.title}</h3>
                                <p className="text-sm text-slate-700 leading-relaxed">{belief.body}</p>
                            </MarketingCard>
                        </motion.div>
                    ))}
                </div>
            </MarketingSection>

            <Divider />

            {/* What We Built */}
            <MarketingSection variant="white">
                <div className="max-w-3xl mx-auto">
                    <motion.h2 {...fadeUp} className="text-3xl font-serif text-ink mb-8">
                        {t("builtHeading")}
                    </motion.h2>
                    <motion.div {...fadeUp} className="space-y-6 text-slate-700 text-lg leading-relaxed">
                        <p>{t("builtP1")}</p>
                        <p>{t("builtP2")}</p>
                        <p>{t("builtP3")}</p>
                    </motion.div>
                </div>
            </MarketingSection>

            <Divider />

            {/* Why We're Different */}
            <MarketingSection variant="warm">
                <div className="max-w-3xl mx-auto">
                    <motion.h2 {...fadeUp} className="text-3xl font-serif text-ink mb-8">
                        {t("differentHeading")}
                    </motion.h2>
                    <motion.div {...fadeUp} className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10">
                        <p>{t("differentP1")}</p>
                        <p>{t("differentP2")}</p>
                    </motion.div>
                    <motion.div
                        {...fadeUp}
                        className="p-8 rounded-[20px] bg-sage/5 border border-sage/20"
                    >
                        <p className="text-ink text-xl md:text-2xl font-serif leading-relaxed">
                            {t("differentQuoteLine1")}
                            <br />
                            {t("differentQuoteLine2")}
                        </p>
                    </motion.div>
                </div>
            </MarketingSection>

            <Divider />

            {/* Why "Faceify" */}
            <MarketingSection variant="white">
                <div className="max-w-3xl mx-auto">
                    <motion.h2 {...fadeUp} className="text-3xl font-serif text-ink mb-8">
                        {t("whyFaceifyHeading")}
                    </motion.h2>
                    <motion.div {...fadeUp} className="space-y-6 text-slate-700 text-lg leading-relaxed">
                        <p>
                            <span className="text-ink font-semibold">{t("whyFace")}</span>
                            {t("whyFaceDesc")}
                        </p>
                        <p>
                            <span className="text-ink font-semibold">{t("whyIfy")}</span>
                            {t("whyIfyDesc")}
                        </p>
                        <p>
                            <span className="text-ink font-semibold">{t("whyLabs")}</span>
                            {t("whyLabsDesc")}
                        </p>
                    </motion.div>
                </div>
            </MarketingSection>

            {/* Legal entity */}
            <MarketingSection variant="white">
                <div className="max-w-3xl mx-auto">
                    <p className="text-sm text-slate-400 text-center">
                        Faceify Labs is a product of Formir Technologies Private Limited, a company registered in India.
                    </p>
                    <p className="text-sm text-slate-400 text-center mt-2">
                        Faceify Labs is chaired by{" "}
                        <Link href="/leadership/virendra-ghaisas" className="underline hover:text-sage">
                            Dr. Virendra Ghaisas
                        </Link>
                        , who brings a physician&apos;s perspective to the platform&apos;s clinical direction.
                    </p>
                </div>
            </MarketingSection>

            {/* CTA */}
            <MarketingSection variant="warm">
                <div className="max-w-2xl mx-auto text-center bg-white rounded-[20px] border border-slate-200 p-10 sm:p-14">
                    <h2 className="text-3xl font-serif text-ink mb-4">
                        {t("ctaHeading")}
                    </h2>
                    <p className="text-slate-600 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                        {t("ctaSubtitle")}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => openDemoModal("our-story")}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-light text-white text-sm font-bold rounded-full transition-all"
                        >
                            {t("ctaDemo")} <ArrowRight className="w-4 h-4" />
                        </button>
                        <Link
                            href="/simulate"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-mist hover:border-sage/40 text-ink text-sm font-bold rounded-full hover:bg-warm transition-all"
                        >
                            {t("ctaSimulator")}
                        </Link>
                    </div>
                </div>
            </MarketingSection>
        </div>
    );
}
