"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "@/i18n/messages";
import { TrendingUp, Users, BarChart3, DollarSign, Percent, ArrowRight } from "lucide-react";
import { openDemoModal } from "@/lib/analytics";

// ─── Currency / market config ────────────────────────────────────────────────

interface MarketConfig {
    /** Currency symbol (₹, $, ฿, ₩) */
    symbol: string;
    /** ISO 4217 code, used by Intl.NumberFormat */
    code: string;
    /** Default monthly consultations slider value */
    defaultConsultations: number;
    /** Default conversion % slider value */
    defaultConversion: number;
    /** Default avg revenue per booking (in major units) */
    defaultRevenue: number;
    /** Slider max for revenue */
    revenueMax: number;
    /** Slider step for revenue */
    revenueStep: number;
    /** Starter plan annual-billed monthly cost in this currency (major units).
     *  Annual is billed at the same rate as monthly (no discount) per
     *  lib/billing/pricing.ts, so this equals planMonthly. */
    planAnnualMonthly: number;
    /** Starter plan monthly-billed cost (for the small footnote) */
    planMonthly: number;
    /** Pro plan monthly cost in this currency (major units) */
    planProMonthly: number;
    /** Clinic plan monthly cost in this currency (major units) */
    planClinicMonthly: number;
}

// USD prices are the source of truth in lib/billing/pricing.ts:
// Starter $149 / Pro $299 / Clinic $499 per month. Annual is billed at the
// same per-month rate (no discount). INR/THB/KRW converted at approximate FX
// + rounded to clinic-friendly numbers, keeping the same tier ratios.
// Defaults reflect typical aesthetic-clinic ticket sizes per market.
const MARKET_CONFIGS: Record<string, MarketConfig> = {
    USD: {
        symbol: "$",
        code: "USD",
        defaultConsultations: 35,
        defaultConversion: 42,
        defaultRevenue: 8500,
        revenueMax: 30000,
        revenueStep: 500,
        planAnnualMonthly: 149,
        planMonthly: 149,
        planProMonthly: 299,
        planClinicMonthly: 499,
    },
    INR: {
        symbol: "₹",
        code: "INR",
        defaultConsultations: 25,
        defaultConversion: 42,
        // ₹1.8L typical for rhinoplasty / hair transplant in Pune (mid-market)
        defaultRevenue: 180_000,
        revenueMax: 1_500_000,
        revenueStep: 5_000,
        // $149 × 83 ≈ ₹12,400; rounded for clinic-friendly display.
        // Annual billed at same rate (no discount), so annual = monthly.
        planAnnualMonthly: 12_500,
        planMonthly: 12_500,
        planProMonthly: 25_000,
        planClinicMonthly: 41_900,
    },
    THB: {
        symbol: "฿",
        code: "THB",
        defaultConsultations: 30,
        defaultConversion: 42,
        defaultRevenue: 80_000,
        revenueMax: 500_000,
        revenueStep: 2_000,
        planAnnualMonthly: 5_300,
        planMonthly: 5_300,
        planProMonthly: 10_600,
        planClinicMonthly: 17_800,
    },
    KRW: {
        symbol: "₩",
        code: "KRW",
        defaultConsultations: 35,
        defaultConversion: 42,
        defaultRevenue: 4_000_000,
        revenueMax: 30_000_000,
        revenueStep: 100_000,
        planAnnualMonthly: 210_000,
        planMonthly: 210_000,
        planProMonthly: 420_000,
        planClinicMonthly: 700_000,
    },
};

const COUNTRY_TO_CURRENCY: Record<string, keyof typeof MARKET_CONFIGS> = {
    IN: "INR",
    TH: "THB",
    KR: "KRW",
    US: "USD",
    SG: "USD",
};

const CONVERSION_LIFT = 0.20; // 20% relative lift (conservative end of 15-25% range)

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format a currency amount compactly: ₹12L, $12.3k, $120k, $1.4m */
function fmt(n: number, cfg: MarketConfig): string {
    // INR follows the lakh/crore convention which is more familiar to
    // Indian clinic owners than k/m. Round to whole units; the magnitudes
    // in this calculator are too large for sub-decimal precision to read.
    if (cfg.code === "INR") {
        if (n >= 10_000_000) return `${cfg.symbol}${(n / 10_000_000).toFixed(1)}Cr`;
        if (n >= 100_000) return `${cfg.symbol}${(n / 100_000).toFixed(1)}L`;
        if (n >= 1_000) return `${cfg.symbol}${Math.round(n / 1_000)}k`;
        return `${cfg.symbol}${Math.round(n).toLocaleString("en-IN")}`;
    }
    if (n >= 1_000_000) return `${cfg.symbol}${(n / 1_000_000).toFixed(1)}m`;
    if (n >= 10_000) return `${cfg.symbol}${Math.round(n / 1_000)}k`;
    if (n >= 1_000) return `${cfg.symbol}${(n / 1_000).toFixed(1)}k`;
    return `${cfg.symbol}${Math.round(n).toLocaleString()}`;
}

function formatRevenueDisplay(amount: number, cfg: MarketConfig): string {
    if (cfg.code === "INR") return `${cfg.symbol}${amount.toLocaleString("en-IN")}`;
    return `${cfg.symbol}${amount.toLocaleString()}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SliderInput({
    label,
    value,
    min,
    max,
    step,
    onChange,
    display,
    icon,
    footnote,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    display: string;
    icon: React.ReactNode;
    footnote?: string;
}) {
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white/60 text-xs font-body font-medium">
                    <span className="text-sage-light">{icon}</span>
                    {label}
                </div>
                <span className="text-white font-semibold text-sm font-body">{display}</span>
            </div>
            {/*
              Controlled range input. TESTING NOTE: React tracks value via
              synthetic events, not raw DOM property writes. Automated tools
              that assign `.value = X` directly will NOT trigger onChange.
              Use dispatchEvent('input', {bubbles:true}) or keyboard arrows.
            */}
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-label={label}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sage [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                style={{
                    background: `linear-gradient(to right, #4a7c6f ${pct}%, rgba(255,255,255,0.15) ${pct}%)`,
                }}
            />
            {footnote && <p className="text-xs text-white/65 mt-1.5 font-body">{footnote}</p>}
        </div>
    );
}

function ResultRow({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <p className="text-sm font-medium text-white/90 font-body">{label}</p>
                <p className="text-xs text-white/65 mt-0.5 font-body">{sublabel}</p>
            </div>
            <span className="font-semibold text-white text-base font-body shrink-0">{value}</span>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface ROICalculatorProps {
    /** ISO 3166 country code (e.g. "IN" from x-vercel-ip-country). Drives
     *  currency localization + sensible defaults per market. Falls back to USD. */
    country?: string | null;
    /** When true (cohort/founder pricing), default the commission slider to 0%. */
    cohort?: boolean;
    /**
     * Override the currency resolved from `country`. When the pricing page's
     * currency toggle changes, this prop keeps the ROI calculator in sync with
     * the plan cards without requiring a geo re-resolve.
     * TODO(fx-live): swap MARKET_CONFIGS rates for live FX feed.
     */
    forceCurrencyKey?: keyof typeof MARKET_CONFIGS | null;
}

export default function ROICalculator({ country = null, cohort = false, forceCurrencyKey = null }: ROICalculatorProps) {
    const [activeCountry, setActiveCountry] = useState<string | null>(country ?? null);

    useEffect(() => {
        if (!activeCountry && typeof window !== "undefined") {
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) {
                    setActiveCountry("IN");
                }
            } catch {}
        }
    }, [activeCountry]);

    const effectiveCountry = activeCountry ?? country;
    const t = useTranslations("Pricing");

    // Resolve market config: forceCurrencyKey (from pricing toggle) takes
    // precedence over geo-resolved country. Falls back to USD.
    const cfg = useMemo<MarketConfig>(() => {
        if (forceCurrencyKey && MARKET_CONFIGS[forceCurrencyKey]) {
            return MARKET_CONFIGS[forceCurrencyKey];
        }
        const cc = effectiveCountry?.toUpperCase();
        const ccyKey = (cc && COUNTRY_TO_CURRENCY[cc]) || "INR";
        return MARKET_CONFIGS[ccyKey];
    }, [effectiveCountry, forceCurrencyKey]);

    // Slider state — defaults set per-market
    const [consultations, setConsultations] = useState(cfg.defaultConsultations);
    const [conversionRate, setConversionRate] = useState(cfg.defaultConversion); // %
    const [avgRevenue, setAvgRevenue] = useState(cfg.defaultRevenue);
    // Marketplace commission — global standard is 10%; cohort surgeons get
    // 0% during the founder window. Lets the prospect see exactly what
    // Faceify takes off the top.
    const [takeRate, setTakeRate] = useState(cohort ? 0 : 10); // %

    useEffect(() => {
        setConsultations(cfg.defaultConsultations);
        setConversionRate(cfg.defaultConversion);
        setAvgRevenue(cfg.defaultRevenue);
    }, [cfg]);

    // ─── Computations ────────────────────────────────────────────────────────
    const newConversionRate = Math.min(conversionRate * (1 + CONVERSION_LIFT), 100);
    const currentBookings = consultations * (conversionRate / 100);
    const newBookings = consultations * (newConversionRate / 100);
    const additionalBookings = newBookings - currentBookings;
    const grossExtraMonthly = additionalBookings * avgRevenue;
    // Net of marketplace commission — what actually lands in the clinic's bank
    const netExtraMonthly = grossExtraMonthly * (1 - takeRate / 100);
    const annualExtraRevenue = netExtraMonthly * 12;
    const annualPlanCost = cfg.planAnnualMonthly * 12;
    const annualROI = annualExtraRevenue - annualPlanCost;
    const roiMultiple = annualPlanCost > 0
        ? (annualExtraRevenue / annualPlanCost).toFixed(1)
        : "-";

    // Recommended plan — based on net annual revenue, suggest the tier
    // that gives the surgeon enough seats for the team they'd need to
    // handle the volume. USD pricing thresholds; INR/THB scale at the same
    // ratios as the underlying USD plans.
    const recommendedPlan = useMemo(() => {
        const usdEquivalent = cfg.code === "USD" ? annualExtraRevenue
            : cfg.code === "INR" ? annualExtraRevenue / 83
            : cfg.code === "THB" ? annualExtraRevenue / 36
            : cfg.code === "KRW" ? annualExtraRevenue / 1380
            : annualExtraRevenue;
        if (usdEquivalent > 200_000) return { name: "Clinic", priceLabel: `${cfg.symbol}${cfg.planClinicMonthly.toLocaleString()}/mo`, seats: 10 };
        if (usdEquivalent > 60_000) return { name: "Pro", priceLabel: `${cfg.symbol}${cfg.planProMonthly.toLocaleString()}/mo`, seats: 3 };
        return { name: "Starter", priceLabel: `${cfg.symbol}${cfg.planAnnualMonthly.toLocaleString()}/mo`, seats: 1 };
    }, [annualExtraRevenue, cfg]);

    return (
        <div className="bg-ink rounded-[20px] overflow-hidden shadow-lg">
            {/* Header */}
            <div className="px-8 pt-10 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-sage/20 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-sage-light" />
                    </div>
                    <span className="text-xs font-semibold text-sage-light font-body tracking-widest uppercase">
                        {t("roi.badgeLabel")}
                    </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">{t("roi.heading")}</h2>
                <p className="text-white/60 text-sm font-body max-w-xl">
                    {t("roi.liftIntro")}{" "}
                    <span className="text-white font-semibold">{t("roi.liftHighlight")}</span>{" "}
                    {t("roi.liftSuffix")}
                </p>
            </div>

            {/* Two-column layout: inputs | outputs */}
            <div className="grid md:grid-cols-2">
                {/* ─── Inputs ───────────────────────────────────────────────────── */}
                <div className="px-8 py-8 border-b md:border-b-0 md:border-r border-white/10 space-y-7">
                    <SliderInput
                        label={t("roi.sliders.consultationsLabel")}
                        value={consultations}
                        min={5}
                        max={150}
                        step={5}
                        onChange={setConsultations}
                        display={t("roi.sliders.consultationsDisplay", { value: consultations })}
                        icon={<Users className="w-4 h-4" />}
                    />
                    <SliderInput
                        label={t("roi.sliders.conversionLabel")}
                        value={conversionRate}
                        min={10}
                        max={80}
                        step={1}
                        onChange={setConversionRate}
                        display={t("roi.sliders.conversionDisplay", { value: conversionRate })}
                        icon={<BarChart3 className="w-4 h-4" />}
                        footnote={t("roi.sliders.conversionFootnote")}
                    />
                    <SliderInput
                        label={t("roi.sliders.revenueLabel")}
                        value={avgRevenue}
                        min={cfg.revenueStep}
                        max={cfg.revenueMax}
                        step={cfg.revenueStep}
                        onChange={setAvgRevenue}
                        display={formatRevenueDisplay(avgRevenue, cfg)}
                        icon={<DollarSign className="w-4 h-4" />}
                        footnote={t("roi.sliders.revenueFootnote")}
                    />
                    <SliderInput
                        label="Marketplace commission"
                        value={takeRate}
                        min={0}
                        max={15}
                        step={1}
                        onChange={setTakeRate}
                        display={`${takeRate}%`}
                        icon={<Percent className="w-4 h-4" />}
                        footnote={
                            takeRate === 0
                                ? "0%. Founder cohort: you keep every rupee"
                                : `${takeRate}% take-rate on prepaid bookings (global standard 10%)`
                        }
                    />

                    {/* Assumption footnote */}
                    <div className="pt-2 border-t border-white/10">
                        <p className="text-xs text-white/65 font-body leading-relaxed">
                            {t("roi.assumption")}{" "}
                            <span className="text-white/60 font-semibold">
                                {t("roi.assumptionHighlight")}
                            </span>{" "}
                            {t("roi.assumptionSuffix")}
                        </p>
                    </div>
                </div>

                {/* ─── Outputs ──────────────────────────────────────────────────── */}
                <div className="px-8 py-8 flex flex-col justify-between">
                    <div className="space-y-4">
                        <p className="text-xs font-semibold text-sage-light font-body tracking-wider uppercase mb-2">
                            {t("roi.results.label")}
                        </p>
                        <ResultRow
                            label={t("roi.results.conversionAfterLabel")}
                            value={`${newConversionRate.toFixed(1)}%`}
                            sublabel={t("roi.results.conversionAfterSublabel", {
                                current: conversionRate,
                                lift: (CONVERSION_LIFT * 100).toFixed(0),
                            })}
                        />
                        <ResultRow
                            label={t("roi.results.extraBookingsLabel")}
                            value={`+${additionalBookings.toFixed(1)}`}
                            sublabel={t("roi.results.extraBookingsSublabel", {
                                current: currentBookings.toFixed(1),
                                new: newBookings.toFixed(1),
                            })}
                        />
                        <ResultRow
                            label={t("roi.results.extraRevenueLabel")}
                            value={fmt(netExtraMonthly, cfg)}
                            sublabel={
                                takeRate > 0
                                    ? `gross ${fmt(grossExtraMonthly, cfg)} − ${takeRate}% commission`
                                    : t("roi.results.extraRevenueSublabel", {
                                          bookings: additionalBookings.toFixed(1),
                                          revenue: fmt(avgRevenue, cfg),
                                      })
                            }
                        />
                    </div>

                    {/* ─── Annual ROI highlight ──────────────────────────────────── */}
                    <div className="mt-6 space-y-4">
                        <div className="bg-sage/15 border border-sage/25 rounded-2xl p-5">
                            <p className="text-xs text-sage-light font-body tracking-wider uppercase mb-1">
                                {t("roi.annualRoiLabel")}
                            </p>
                            <div className="flex items-end gap-3 mb-1">
                                <span className="text-4xl font-serif text-white">{fmt(annualROI, cfg)}</span>
                                <span className="text-sage-light font-semibold text-sm mb-1 font-body">
                                    {t("roi.roiReturn", { multiple: roiMultiple })}
                                </span>
                            </div>
                            <p className="text-white/50 text-xs font-body">
                                {t("roi.roiBreakdown", {
                                    extraRevenue: fmt(annualExtraRevenue, cfg),
                                    planCost: fmt(annualPlanCost, cfg),
                                })}
                            </p>
                            <p className="text-white/35 text-xs font-body mt-1.5">
                                Recommended: <span className="text-white/60 font-semibold">{recommendedPlan.name} plan</span>
                                {", "}{recommendedPlan.priceLabel}, {recommendedPlan.seats} seat{recommendedPlan.seats === 1 ? "" : "s"}
                            </p>
                        </div>

                        <button
                            onClick={() => openDemoModal("roi_calculator_cta")}
                            className="w-full py-3 bg-sage hover:bg-sage-light text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition-all font-body"
                        >
                            {t("roi.cta")} <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-center text-xs text-white/65 font-body">{t("roi.ctaNote")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
