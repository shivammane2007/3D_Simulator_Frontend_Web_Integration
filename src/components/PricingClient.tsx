"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "@/i18n/messages";
import {
    Check,
    ArrowRight,
    Building2,
    ChevronDown,
    MessageCircle,
    Star,
    Sparkles,
    Award,
    Megaphone,
    Mail,
    Search,
    Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openDemoModal } from "@/lib/analytics";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import SectionHeading from "@/components/marketing/SectionHeading";
import ROICalculator from "@/components/ROICalculator";
import {
    CREDIT_UNIT_PRICE_MINOR,
    FOUNDING_PARTNER_CAP,
    formatCreditPrice,
    resolveCreditCurrency,
} from "@/lib/billing/pricing";
import { getSurgeonPlanPrice, resolveZone } from "@/lib/billing/surgeon-plans";
import IntendedUseNotice from "@/components/IntendedUseNotice";

// 1 credit = 24h access to one simulator. The displayed price is derived at
// render time from CREDIT_UNIT_PRICE_MINOR (lib/billing/pricing.ts) in the
// visitor's checkout currency, the same table checkout charges from. Never
// hardcode it here.
const patientTierMeta = [
    {
        id: "patient_pass",
        sims: null, // unlimited simulations within the 24h window
        icon: Sparkles,
        featureCount: 6,
    },
];

// ─── Add-on metadata ──────────────────────────────────────────────────────────
const addOnMeta = [
    { id: "directoryPlacement", icon: Globe },
    { id: "homepageBanner", icon: Megaphone },
    { id: "sponsoredTile", icon: Award },
    { id: "searchBoost", icon: Search },
    { id: "emailSpotlight", icon: Mail },
    { id: "embedWidget", icon: Globe },
] as const;

const faceTouchUpPrice = `custom (~${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
}).format(195)}/mo)`;

// ─── Sub-components ─────────────────────────────────────────────────────────

function FAQItem({ q, a, id }: { q: string; a: string; id: string }) {
    const [open, setOpen] = useState(false);
    const panelId = `pricing-panel-${id}`;
    const buttonId = `pricing-btn-${id}`;
    return (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button id={buttonId} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-warm transition-colors" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}>
                <span className="font-body font-semibold text-ink text-sm pr-4">{q}</span>
                <ChevronDown className={`w-4 h-4 text-sage shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div id={panelId} role="region" aria-labelledby={buttonId} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="px-6 pb-4 text-sm text-slate-600 font-body leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

interface PricingClientProps {
    /** ISO 3166 country (e.g. "IN" from x-vercel-ip-country). */
    country?: string | null;
    /** Live DB count of surgeons with foundingPartner = true. */
    foundingPartnerCount?: number;
    /** Spots remaining until cap of 100. */
    foundingPartnerSpotsRemaining?: number;
    /** Live DB count of Pune Founding Partner surgeons (cap=5). */
    puneCount?: number;
}

export default function PricingClient({
    country = null,
    foundingPartnerCount = 0,
    foundingPartnerSpotsRemaining = FOUNDING_PARTNER_CAP,
}: PricingClientProps = {}) {
    const [clientCountry, setClientCountry] = useState<string | null>(country ?? null);

    useEffect(() => {
        if (!clientCountry && typeof window !== "undefined") {
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) {
                    setClientCountry("IN");
                }
            } catch {}
        }
    }, [clientCountry]);

    const effectiveCountry = clientCountry ?? country;
    const t = useTranslations("Pricing");
    const tc = useTranslations("Credits");
    const tb = useTranslations("Billing");
    const tClinic = useTranslations("ClinicCheckout");
    const locale = useLocale();
    const zone = resolveZone(effectiveCountry) || "A";
    const annualPrice = getSurgeonPlanPrice(zone, "annual");
    const annualPriceLabel = new Intl.NumberFormat(locale, { style: "currency", currency: annualPrice.currency, maximumFractionDigits: 0 }).format(annualPrice.amountMinor / 100);
    const creditCurrency = resolveCreditCurrency(effectiveCountry || "IN");
    const creditPrice = formatCreditPrice(CREDIT_UNIT_PRICE_MINOR[creditCurrency], creditCurrency);

    const isCohortFull = foundingPartnerSpotsRemaining <= 0;
    // foundingPartnerCount is used in the banner to show taken spots
    void foundingPartnerCount;

    // Build patientTiers array from translations
    const patientTiers = patientTierMeta.map((meta, i) => ({
        ...meta,
        name: t(`patientTiers.${i}.name`),
        badge: t(`patientTiers.${i}.badge`, { price: creditPrice }),
        description: t(`patientTiers.${i}.description`),
        features: Array.from({ length: meta.featureCount }, (_, j) => t(`patientTiers.${i}.features.${j}`)),
    }));

    // Build faqs array from translations
    const faqs = Array.from({ length: 6 }, (_, i) => ({
        q: t(`faqs.${i}.q`),
        a: t(`faqs.${i}.a`),
    }));

    // Build testimonials array from translations
    const testimonials = Array.from({ length: 3 }, (_, i) => ({
        quote: t(`testimonials.${i}.quote`),
        name: t(`testimonials.${i}.name`),
        title: t(`testimonials.${i}.title`),
        stars: 5,
    }));

    return (
        <div className="bg-warm font-body">
            {/* Hero */}
            <PageHero
                label={t("hero.label")}
                title={t.rich("hero.title", {
                    em: (chunks: React.ReactNode) => <em className="font-serif text-sage not-italic italic">{chunks}</em>,
                })}
                subtitle={t("hero.subtitle")}
            >
                <p className="text-xs text-slate-600 mt-1 font-body">{t("billing.annualNote")}</p>
            </PageHero>

            {/* General Founding Partner cohort banner */}
            <MarketingSection variant="warm" className="!pt-4 !pb-0" noFade>
                <div
                    data-testid="founding-partner-banner"
                    className="max-w-3xl mx-auto rounded-[20px] bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300/50 px-6 py-5"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-xs font-body font-semibold text-amber-700 uppercase tracking-wider mb-1">
                                {t("foundingPartner.cohortLabel")}
                            </p>
                            <p className="text-sm font-body text-slate-700 max-w-lg leading-relaxed">
                                {t("foundingPartner.perks")}
                            </p>
                            <ul className="mt-2 space-y-0.5">
                                {(["perksPricelock", "perksInstagram", "perksRoadmap", "perksPage"] as const).map((key) => (
                                    <li key={key} className="flex items-center gap-1.5 text-xs font-body text-slate-600">
                                        <Check className="w-3 h-3 text-amber-600 shrink-0" />
                                        {t(`foundingPartner.${key}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div
                            data-testid="founding-partner-counter"
                            className="shrink-0 text-center sm:text-right"
                        >
                            {isCohortFull ? (
                                <p className="text-sm font-body font-semibold text-amber-700">
                                    {t("foundingPartner.spotsLabelFull")}
                                </p>
                            ) : (
                                <>
                                    <p className="text-3xl font-serif text-amber-700 font-bold">
                                        {foundingPartnerSpotsRemaining}
                                    </p>
                                    <p className="text-xs font-body text-slate-500">
                                        {t("foundingPartner.spotsLabel", { spots: foundingPartnerSpotsRemaining })}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </MarketingSection>

            {/* Pricing Cards */}
            <MarketingSection variant="warm" className="!pt-6 !pb-10" noFade>
                <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-5 items-start">
                    <div data-testid="pricing-card-annual" className="rounded-[20px] bg-ink text-white p-6 shadow-xl ring-2 ring-sage/40">
                        {!isCohortFull && <p data-testid="founding-partner-badge" className="text-xs text-amber-300 mb-3">{t("foundingPartner.badgeLabel")}</p>}
                        <Sparkles className="w-8 h-8 text-sage-light mb-4" />
                        <h2 className="text-xl font-semibold mb-2">{tb("annualSeatName")}</h2>
                        <p className="text-sm text-white/80 mb-5">{tb("annualSeatDescription")}</p>
                        <p className="text-3xl font-serif text-sage-light mb-2">
                            {annualPriceLabel ? tClinic("annualPrice", { price: annualPriceLabel }) : t("seat.signInForPrice")}
                        </p>
                        <p className="text-xs text-white/70 mb-5">{t("seat.priceNotice")}</p>
                        <p className="text-sm text-white/80 mb-5">{tb("annualSeatProcedures")}</p>
                        <Link href="/surgeon/settings#billing" className="w-full py-3 bg-sage hover:bg-sage-light text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2">
                            {t("seat.viewPlan")} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div data-testid="pricing-card-clinic-setup" className="rounded-[20px] bg-white border border-slate-200 p-6 shadow-sm">
                        <Building2 className="w-8 h-8 text-sage mb-4" />
                        <h2 className="text-xl font-semibold text-ink mb-2">{t("seat.clinicTitle")}</h2>
                        <p className="text-sm text-slate-600 mb-5">{t("seat.clinicDescription")}</p>
                        <Link href="/clinic/onboard" className="w-full py-3 bg-sage hover:bg-sage-light text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2">
                            {t("seat.setupClinic")} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a href="mailto:partners@faceifylabs.com" className="block mt-4 text-center text-sm text-sage underline">{t("seat.contactSales")}</a>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-body">
                    <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sage" /> No contracts
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sage" /> Cancel anytime
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sage" /> No future charges after cancellation
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-sage" /> No setup fee
                    </span>
                </div>

                <p className="text-center text-xs text-slate-600 mt-5 max-w-xl mx-auto font-body">
                    {t("footer.allPlansNote")}{" "}
                    <Link href="/faq" className="text-sage hover:underline font-medium">{t("footer.seeFaq")}</Link>{" "}{t("footer.or")}{" "}
                    <button type="button" onClick={() => openDemoModal("pricing_footer_chat")} className="text-sage hover:underline font-medium">{t("footer.chatWithUs")}</button>.
                </p>
            </MarketingSection>

            {/* Add-on Packages Section */}
            <MarketingSection variant="white" className="!py-14">
                <div className="max-w-5xl mx-auto">
                    <SectionHeading
                        label={t("addOns.sectionLabel")}
                        title={t("addOns.sectionTitle")}
                        subtitle={t("addOns.sectionSubtitle")}
                    />
                    <div
                        data-testid="add-ons-section"
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {addOnMeta.map((addon, index) => {
                            const Icon = addon.icon;
                            const name = t(`addOns.items.${addon.id}.name`);
                            const description = t(`addOns.items.${addon.id}.description`);
                            const inventory = t(`addOns.items.${addon.id}.inventory`);
                            return (
                                <motion.div
                                    key={addon.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06, duration: 0.35 }}
                                    className="bg-white border border-slate-200 rounded-[18px] p-5 hover:shadow-md transition-shadow"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-warm flex items-center justify-center mb-3">
                                        <Icon className="w-4 h-4 text-sage" />
                                    </div>
                                    <h4 className="text-sm font-semibold text-ink font-body mb-1">{name}</h4>
                                    <p className="text-xs text-slate-500 font-body leading-relaxed mb-3">{description}</p>
                                    <p className="text-[11px] text-slate-400 font-body italic">{t("addOns.availabilityLabel")}: {inventory}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                    <p className="text-center text-xs text-slate-500 font-body mt-6">
                        All placement add-ons are subject to inventory availability. Redemption is self-serve via surgeon dashboard.{" "}
                        <button type="button" onClick={() => openDemoModal("pricing_addons_learn_more")} className="text-sage hover:underline font-medium">
                            Learn more
                        </button>
                    </p>
                </div>
            </MarketingSection>

            {/* Patient Pricing — credits are sold on Razorpay to patients and
                surgeons (2026-10-02); the CTA routes through the /day-pass
                procedure picker. */}
            {(
            <MarketingSection variant="white">
                <div className="max-w-3xl mx-auto">
                    <SectionHeading
                        label={t("patientSection.label")}
                        title={t("patientSection.title")}
                        subtitle={t("patientSection.subtitleCredits", {
                            price: creditPrice,
                            explainer: tc("creditExplainer"),
                        })}
                    />
                    <IntendedUseNotice className="justify-center mb-6 max-w-sm mx-auto" />
                    <div className="grid sm:grid-cols-1 gap-6 max-w-sm mx-auto">
                        {patientTiers.map((tier, index) => (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="relative bg-white text-ink border border-slate-200 rounded-[20px] shadow-sm hover:shadow-md transition-shadow"
                            >
                                {tier.badge && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-sage text-white text-xs font-semibold rounded-full shadow-lg whitespace-nowrap font-body">
                                        {tier.badge}
                                    </div>
                                )}
                                <div className="p-7 flex flex-col">
                                    <div className="mb-5">
                                        <div className="w-10 h-10 rounded-xl bg-warm flex items-center justify-center mb-4">
                                            <tier.icon className="w-5 h-5 text-sage" />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-1 font-body text-ink">{tier.name}</h3>
                                        <p className="text-xs text-slate-500 font-body">{tier.description}</p>
                                    </div>

                                    <div className="mb-6">
                                        {/* Day Pass is the only patient SKU and is always paid;
                                            the former Free/3-day branch was unreachable and removed. */}
                                        <div className="flex items-end gap-1">
                                            <span className="text-4xl font-serif text-sage">{creditPrice}</span>
                                            <span className="text-sm mb-1.5 font-body text-slate-600">{t("patientPrice.oneTime")}</span>
                                        </div>
                                        <p className="text-xs mt-1 font-body text-slate-600">
                                            {t("patientPrice.unlimited")}
                                        </p>
                                    </div>

                                    <ul className="space-y-2.5 mb-6 flex-grow">
                                        {tier.features.map((f) => (
                                            <li key={f} className="flex items-start gap-2.5 text-sm font-body">
                                                <Check className="w-4 h-4 mt-0.5 shrink-0 text-sage" />
                                                <span className="text-slate-600">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/day-pass"
                                        className="w-full py-3 bg-sage hover:bg-sage-light text-white font-semibold rounded-full text-sm transition-all flex items-center justify-center gap-2 font-body"
                                    >
                                        {t("patientCta.getStarted")} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="/simulate"
                                        className="w-full mt-2 py-2.5 text-center text-sage hover:text-sage-light font-medium rounded-full text-xs transition-all font-body inline-flex items-center justify-center gap-1.5 border border-sage/20 hover:border-sage/40"
                                    >
                                        {t("patientCta.explore")}
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </MarketingSection>
            )}

            {/* Competitor comparison */}
            <MarketingSection variant="white" className="!py-14">
                <div className="max-w-5xl mx-auto">
                    <SectionHeading
                        label="How we compare"
                        title="60–95% less than the legacy stack"
                        subtitle={t("seat.comparisonSubtitle")}
                    />

                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <thead>
                                <tr className="border-b border-slate-200 bg-warm/40">
                                    <th className="text-left px-5 py-4 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider w-[28%]">Vendor</th>
                                    <th className="text-left px-4 py-4 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider w-[18%]">Price (per surgeon)</th>
                                    <th className="text-center px-3 py-4 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Browser-only</th>
                                    <th className="text-center px-3 py-4 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">On-device privacy</th>
                                    <th className="text-center px-3 py-4 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Marketplace</th>
                                    <th className="text-center px-3 py-4 font-body text-xs font-semibold text-slate-500 uppercase tracking-wider">Multi-language</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-sage/5 border-b border-sage/20">
                                    <td className="px-5 py-3.5 font-bold text-sage">Faceify Labs</td>
                                    <td className="px-4 py-3.5"><span className="text-ink font-bold">{t("seat.comparisonPrice")}</span><span className="block text-[11px] text-slate-500">{t("billing.annualNote")}</span></td>
                                    <td className="px-3 py-3.5 text-center text-sage">&#10003;</td>
                                    <td className="px-3 py-3.5 text-center text-sage">&#10003;</td>
                                    <td className="px-3 py-3.5 text-center text-sage">&#10003;</td>
                                    <td className="px-3 py-3.5 text-center text-sage">5 languages</td>
                                </tr>
                                {[
                                    { name: "Crisalix", price: "up to $20,000/yr", notes: ["-", "-", "-", "English"] },
                                    { name: "Canfield Vectra", price: "$9,500+ upfront", priceNote: "+ hardware", notes: ["-", "-", "-", "English"] },
                                    { name: "QuantifiCare", price: "$15–19k upfront", notes: ["-", "-", "-", "English"] },
                                    { name: "Arbrea Labs", price: "~$399/mo", notes: ["-", "-", "-", "English"] },
                                    { name: "TouchMD", price: "$250–450/mo", priceNote: "+ setup fee", notes: ["-", "-", "-", "English"] },
                                    { name: "FaceTouchUp", price: faceTouchUpPrice, priceNote: "demo to get price", notes: ["✓", "-", "-", "English"] },
                                ].map((c) => (
                                    <tr key={c.name} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-3.5 text-slate-700">{c.name}</td>
                                        <td className="px-4 py-3.5 text-slate-600">{c.price}{c.priceNote && <span className="block text-[11px] text-slate-400">{c.priceNote}</span>}</td>
                                        {c.notes.map((n, ni) => <td key={ni} className="px-3 py-3.5 text-center text-slate-400">{n}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="text-[11px] text-slate-400 mt-3 text-center font-body">
                            Competitor pricing as of May 2026, sourced from public pricing pages + sales-confirmed quotes. Refresh annually.
                        </p>
                    </div>

                    {/* Mobile compact view */}
                    <div className="md:hidden space-y-2">
                        <div className="bg-sage/5 border border-sage/30 rounded-xl p-4">
                            <div className="flex items-baseline justify-between">
                                <span className="font-bold text-sage">Faceify Labs</span>
                                <span className="font-bold text-ink">{t("seat.comparisonPrice")}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">No contract · 5 languages · marketplace · on-device privacy</p>
                        </div>
                        {[
                            { name: "Crisalix", price: "up to $20,000/yr" },
                            { name: "Canfield Vectra", price: "$9,500+ upfront + hardware" },
                            { name: "QuantifiCare", price: "$15–19k upfront" },
                            { name: "Arbrea Labs", price: "~$399/mo" },
                            { name: "TouchMD", price: "$250–450/mo + setup" },
                            { name: "FaceTouchUp", price: faceTouchUpPrice },
                        ].map((c) => (
                            <div key={c.name} className="bg-white border border-slate-200 rounded-xl p-3 flex items-baseline justify-between">
                                <span className="text-slate-700 text-sm">{c.name}</span>
                                <span className="text-slate-600 text-xs text-right">{c.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </MarketingSection>

            {/* ROI Calculator */}
            <MarketingSection variant="white">
                <div className="max-w-5xl mx-auto">
                    <SectionHeading label={t("roi.sectionLabel")} title={t("roi.sectionTitle")} subtitle={t("roi.sectionSubtitle")} />
                    <ROICalculator country={effectiveCountry} />
                </div>
            </MarketingSection>

            {/* Testimonials */}
            <MarketingSection variant="warm">
                <div className="max-w-5xl mx-auto">
                    <SectionHeading title={t("testimonials.sectionTitle")} />
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-white border border-slate-200 rounded-[20px] p-6"
                            >
                                <div className="flex gap-0.5 mb-3">
                                    {Array.from({ length: testimonial.stars }).map((_, j) => (
                                        <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                                    ))}
                                </div>
                                <p className="text-sm text-slate-700 font-body leading-relaxed mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div>
                                    <p className="text-sm font-semibold text-ink font-body">{testimonial.name}</p>
                                    <p className="text-xs text-slate-600 font-body">{testimonial.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </MarketingSection>

            {/* FAQ */}
            <MarketingSection variant="white">
                <div className="max-w-3xl mx-auto">
                    <SectionHeading title={t("faqs.sectionTitle")} />
                    <div className="space-y-3">
                        {faqs.map((faq, i) => <FAQItem key={faq.q} id={String(i)} q={faq.q} a={faq.a} />)}
                    </div>
                </div>
            </MarketingSection>

            {/* Bottom CTA */}
            <MarketingSection variant="dark">
                <div className="text-center">
                    <MessageCircle className="w-8 h-8 text-sage-light mx-auto mb-4" />
                    <h2 className="text-3xl font-serif text-white mb-3">{t("bottomCta.heading")}</h2>
                    <p className="text-white/80 mb-8 max-w-md mx-auto font-body">
                        {t("bottomCta.body")}
                    </p>
                    <button
                        type="button"
                        onClick={() => openDemoModal("pricing_bottom_cta")}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sage hover:bg-sage-light text-white font-semibold rounded-full text-sm transition-all font-body"
                    >
                        {t("bottomCta.button")} <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-white/80 text-xs mt-3 font-body">{t("bottomCta.note")}</p>
                </div>
            </MarketingSection>
        </div>
    );
}
