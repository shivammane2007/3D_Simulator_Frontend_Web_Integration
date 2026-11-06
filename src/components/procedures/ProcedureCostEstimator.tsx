"use client";

// City price-range widget for legacy /procedures/[slug] pages; ranges come from data/procedure-cost-estimates.ts.

import { useMemo, useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, MapPin, Wallet } from "lucide-react";
import {
    ESTIMATOR_CITIES,
    formatCostRange,
    getCostForProcedure,
} from "@/data/procedure-cost-estimates";

interface ProcedureCostEstimatorProps {
    procedureSlug: string;
    procedureName: string;
    /** Initial city, preselected in the dropdown. Defaults to Pune. */
    defaultCity?: string;
    /** Pre-translated UI strings. Passed from the server component parent
     *  so the client component doesn't need next-intl's useTranslations. */
    labels?: {
        eyebrow: string;
        heading: string;
        cityLabel: string;
        cityAriaLabel: string;
        rangeLabel: string;
        rangeDisclaimer: string;
        seeDeals: string;
        sourceNote: string;
    };
}

// Default English strings, used when no labels prop is passed.
const DEFAULT_LABELS: NonNullable<ProcedureCostEstimatorProps['labels']> = {
    eyebrow: "Typical pricing",
    heading: "What does {procedure} cost in your city?",
    cityLabel: "Your city",
    cityAriaLabel: "Choose your city for cost estimate",
    rangeLabel: "Typical range in {city}",
    rangeDisclaimer: "Range reflects 5th–95th percentile of clinic prices in {city}. Final quote depends on surgeon experience, technique (e.g. open vs closed), facility, and complexity. Not a quote.",
    seeDeals: "See live deals in {city}",
    sourceNote: "Educational estimate. Sources: 2026 RealSelf + ASAPS surveys, Practo + clinic-listed prices. Verified annually.",
};

function interpolate(template: string, vars: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

export default function ProcedureCostEstimator({
    procedureSlug,
    procedureName,
    defaultCity = "Pune",
    labels,
}: ProcedureCostEstimatorProps) {
    const L = labels ?? DEFAULT_LABELS;
    const [city, setCity] = useState(defaultCity);

    // Resolve cost for the selected city. Falls back to procedure default
    // (which falls back to null when even the procedure has no data).
    const estimate = useMemo(
        () => getCostForProcedure(procedureSlug, city),
        [procedureSlug, city],
    );

    if (!estimate) return null;

    const cityCountry = ESTIMATOR_CITIES.find((c) => c.city === city);

    return (
        <section
            className="bg-white py-14 md:py-20 border-y border-slate-200"
            aria-labelledby="cost-estimator-heading"
        >
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <p className="text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase text-sage mb-3">
                            {L.eyebrow}
                        </p>
                        <h2
                            id="cost-estimator-heading"
                            className="text-2xl md:text-3xl font-body font-semibold text-ink leading-tight"
                        >
                            {interpolate(L.heading, { procedure: procedureName.toLowerCase() })}
                        </h2>
                    </div>

                    <div className="bg-warm border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <label className="block">
                            <span className="text-[11px] font-body font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
                                {L.cityLabel}
                            </span>
                            <div className="relative">
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-3 pr-10 text-sm font-body text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:border-sage transition-colors"
                                    aria-label={L.cityAriaLabel}
                                >
                                    {ESTIMATOR_CITIES.map((c) => (
                                        <option key={c.city} value={c.city}>
                                            {c.flag} {c.city}, {c.country}
                                        </option>
                                    ))}
                                </select>
                                <span
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    aria-hidden="true"
                                >
                                    ▾
                                </span>
                            </div>
                        </label>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <p className="text-[11px] font-body font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Wallet className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
                                {interpolate(L.rangeLabel, { city })}
                            </p>
                            <p className="text-3xl md:text-4xl font-serif text-sage" aria-live="polite">
                                {formatCostRange(estimate)}
                            </p>
                            <p className="text-xs text-slate-500 font-body mt-2 leading-relaxed">
                                {interpolate(L.rangeDisclaimer, { city })}
                            </p>
                        </div>

                        <Link
                            href={`/deals?city=${encodeURIComponent(city)}&procedure=${encodeURIComponent(procedureSlug)}`}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-sage hover:bg-sage-light text-white text-sm font-semibold rounded-full transition-colors font-body"
                        >
                            {interpolate(L.seeDeals, { city: cityCountry?.city ?? city })} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <p className="text-[11px] text-slate-400 font-body italic text-center mt-4">
                        {L.sourceNote}
                    </p>
                </div>
            </div>
        </section>
    );
}
