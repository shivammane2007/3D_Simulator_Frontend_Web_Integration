"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { PROCEDURES, PROCEDURE_CATEGORIES, type Procedure, type ProcedureCategoryKey } from "@/data/procedures";
import ProcedureIcon from "@/components/ProcedureIcon";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import ClinicalDisclaimer from "@/components/ClinicalDisclaimer";
import { useTranslations } from "@/i18n/messages";

const CATEGORY_COLORS: Record<ProcedureCategoryKey, { pill: string; border: string }> = {
    surgical: {
        pill: "bg-[#CF4500]/10 text-[#CF4500] border-[#CF4500]/20",
        border: "hover:border-[#CF4500]/40",
    },
    "non-surgical": {
        pill: "bg-gold/10 text-gold border-gold/20",
        border: "hover:border-gold/40",
    },
    injectable: {
        pill: "bg-[#CF4500]/10 text-[#CF4500] border-[#CF4500]/20",
        border: "hover:border-[#CF4500]/40",
    },
    dental: {
        pill: "bg-slate-hp/10 text-slate-hp border-slate-hp/20",
        border: "hover:border-slate-hp/40",
    },
    "body-contouring": {
        pill: "bg-[#CF4500]/10 text-[#CF4500] border-[#CF4500]/20",
        border: "hover:border-[#CF4500]/40",
    },
    "hair-restoration": {
        pill: "bg-gold/10 text-gold border-gold/20",
        border: "hover:border-gold/40",
    },
};

const VISIBLE_CATEGORIES = PROCEDURE_CATEGORIES;

export interface HubProcedure {
    slug: string;
    simulateSlug: string;
    shortName: string;
    description: string;
    category: ProcedureCategoryKey;
    popularity?: 'high' | 'medium' | 'low';
    isNew?: boolean;
    comingSoon?: boolean;
    saleReady?: boolean;
}

function toHubProcedure(p: Procedure): HubProcedure {
    return {
        slug: p.slug,
        simulateSlug: p.simulateSlug,
        shortName: p.shortName,
        description: p.description,
        category: p.category,
        popularity: p.popularity,
        isNew: p.isNew,
        comingSoon: p.comingSoon,
        saleReady: p.saleReady,
    };
}

export default function SimulateHub({ procedures }: { procedures?: HubProcedure[] } = {}) {
    const t = useTranslations("Simulate");
    const tCats = useTranslations("procedureCategories");
    const [activeCategory, setActiveCategory] = useState<ProcedureCategoryKey | "all">("all");
    const [query, setQuery] = useState("");
    const showDealsLink = true;

    // Localized list from the server page, or the catalogue as a floor.
    const allProcedures = procedures ?? PROCEDURES.map(toHubProcedure);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const q = query.trim().toLowerCase();
    const searched = q
        ? allProcedures.filter(
              (p) =>
                  p.shortName.toLowerCase().includes(q) ||
                  p.description.toLowerCase().includes(q),
          )
        : allProcedures;

    const filtered = activeCategory === "all"
        ? searched
        : searched.filter((p) => p.category === activeCategory);

    const grouped = activeCategory === "all"
        ? VISIBLE_CATEGORIES.map((cat) => ({
              ...cat,
              procedures: searched.filter((p) => p.category === cat.key),
          })).filter((group) => group.procedures.length > 0)
        : null;

    const hasResults = filtered.length > 0;

    return (
        <div className="bg-warm min-h-screen font-body pb-24">
            <PageHero
                label={t("heroLabel") || "Simulation Tools"}
                title={
                    <>
                        Preview any procedure,<br className="hidden sm:inline" />{" "}
                        <em className="font-serif not-italic italic text-[#CF4500] inline-block whitespace-nowrap">
                            in seconds.
                        </em>
                    </>
                }
                subtitle={t("heroSubtitle", { count: allProcedures.length }) || `Upload a photo and explore AI visualizations. Choose from ${allProcedures.length} simulators powered by our 468-point facial mesh.`}
            />

            <MarketingSection variant="warm" className="!pt-0" noFade>
                {/* Search */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                        <input
                            type="text"
                            aria-label={t("searchLabel") || "Search simulators..."}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t("searchPlaceholder") || "Search simulators..."}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 bg-white rounded-lg text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CF4500]/30 focus:border-[#CF4500] transition-all shadow-xs"
                        />
                    </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter procedures by category">
                    <button
                        onClick={() => setActiveCategory("all")}
                        aria-label={`Filter by ${t("all") || "All"}${activeCategory === "all" ? " (active)" : ""}`}
                        aria-pressed={activeCategory === "all"}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all font-body cursor-pointer ${
                            activeCategory === "all"
                                ? "bg-ink text-cream shadow-xs"
                                : "bg-white border border-slate-200 text-slate-600 hover:text-ink hover:border-[#CF4500]/40"
                        }`}
                    >
                        {t("all") || "All"}
                        <span className="ml-1.5 text-xs opacity-70">({searched.length})</span>
                    </button>
                    {VISIBLE_CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            aria-label={`Filter by ${tCats(cat.key) || cat.label}${activeCategory === cat.key ? " (active)" : ""}`}
                            aria-pressed={activeCategory === cat.key}
                            className={`px-5 py-2 min-h-[44px] rounded-full text-sm font-semibold transition-all font-body cursor-pointer ${
                                activeCategory === cat.key
                                    ? "bg-ink text-cream shadow-xs"
                                    : "bg-white border border-slate-200 text-slate-600 hover:text-ink hover:border-[#CF4500]/40"
                            }`}
                        >
                            <span className="mr-1">{cat.icon}</span> {tCats(cat.key) || cat.label}
                            <span className="ml-1.5 text-xs opacity-70">
                                ({searched.filter((p) => p.category === cat.key).length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="max-w-5xl mx-auto">
                    {!hasResults ? (
                        <p className="text-center text-slate-500 py-16 font-body" role="status">
                            {t("noResults", { query: query.trim() }) || `No simulators matching "${query.trim()}"`}
                        </p>
                    ) : grouped ? (
                        grouped.map((group) => (
                            <div key={group.key} className="mb-12">
                                <h2 className="text-xl font-serif text-ink mb-5 flex items-center gap-2">
                                    <span>{group.icon}</span>
                                    {tCats(group.key) || group.label}
                                    <span className="text-xs font-body font-normal text-slate-600">
                                        ({group.procedures.length})
                                    </span>
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    {group.procedures.map((proc) => (
                                        <SimulatorCard key={proc.slug} procedure={proc} showDealsLink={showDealsLink} />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {filtered.map((proc) => (
                                <SimulatorCard key={proc.slug} procedure={proc} showDealsLink={showDealsLink} />
                            ))}
                        </div>
                    )}
                </div>
            </MarketingSection>

            {/* Bottom clinical notice overlay */}
            <ClinicalDisclaimer />

            <style>{`
                @keyframes simulator-card-enter {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .simulator-card-enter {
                    animation: simulator-card-enter 250ms ease-out both;
                }
                @media (prefers-reduced-motion: reduce) {
                    .simulator-card-enter { animation: none !important; }
                }
                .simulator-card-cv {
                    content-visibility: auto;
                    contain-intrinsic-size: auto 232px;
                }
            `}</style>
        </div>
    );
}

function SimulatorCard({
    procedure,
    showDealsLink,
}: {
    procedure: HubProcedure;
    showDealsLink: boolean;
}) {
    const t = useTranslations("Simulate");
    const tNav = useTranslations("UI.nav");
    const colors = CATEGORY_COLORS[procedure.category] || { pill: "bg-slate-100", border: "hover:border-slate-300" };
    const isComingSoon = procedure.comingSoon;
    const isWorkInProgress = procedure.saleReady === false;

    const cardBody = (
        <>
            <div className="flex items-start justify-between mb-4">
                <ProcedureIcon slug={procedure.slug} size={40} category={procedure.category} />
                <div className="flex items-center gap-2">
                    {procedure.popularity === 'high' && !isComingSoon && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#FDEEE7] text-[#CF4500] border border-[#CF4500]/20 font-body">
                            POPULAR
                        </span>
                    )}
                    {procedure.isNew && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#CF4500]/10 text-[#CF4500] border border-[#CF4500]/20 font-body">
                            NEW
                        </span>
                    )}
                    {isComingSoon && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-body">
                            {t("comingSoon") || "COMING SOON"}
                        </span>
                    )}
                    {isWorkInProgress && !isComingSoon && (
                        <span
                            title={t("workInProgressTitle") || "Work in Progress"}
                            className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-500 border border-slate-300 font-body cursor-help"
                        >
                            {t("workInProgress") || "Work in Progress"}
                        </span>
                    )}
                </div>
            </div>

            <h3 className={`text-base font-semibold mb-2 transition-colors font-body ${
                isComingSoon ? "text-slate-600" : "text-ink group-hover/card:text-[#CF4500]"
            }`}>
                {procedure.shortName} {t("simulator") || "Simulator"}
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 font-body">
                {procedure.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4">
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all font-body ${
                    isComingSoon
                        ? "text-slate-600"
                        : isWorkInProgress
                          ? "text-slate-500 group-hover/card:gap-2.5"
                          : "text-[#CF4500] group-hover/card:gap-2.5"
                }`}>
                    {isComingSoon
                        ? (t("comingSoonLabel") || "Coming Soon")
                        : isWorkInProgress
                          ? (t("workInProgressCta") || "Preview only")
                          : (t("tryNow") || "Try Now")}{" "}
                    {!isComingSoon && <ArrowRight className="w-3.5 h-3.5" />}
                </span>

                <div className="flex items-center gap-3 relative z-10">
                    {showDealsLink && (
                        <Link
                            href={`/deals?procedure=${procedure.slug}`}
                            aria-label={`${procedure.shortName} ${tNav("deals") || "Deals"}`}
                            className="text-[10px] text-[#CF4500] hover:underline transition-colors font-body font-semibold"
                        >
                            {tNav("deals") || "Deals"}
                        </Link>
                    )}
                    <Link
                        href={`/procedures/${procedure.slug}`}
                        aria-label={`${procedure.shortName} ${t("learnMore") || "Learn More"}`}
                        className="text-[10px] text-slate-600 hover:text-ink transition-colors font-body"
                    >
                        {t("learnMore") || "Learn More"}
                    </Link>
                </div>
            </div>
        </>
    );

    if (isComingSoon) {
        return (
            <div
                aria-disabled="true"
                title={t("comingSoonTitle") || "Coming Soon"}
                className="simulator-card-enter simulator-card-cv bg-white/60 rounded-[20px] border border-slate-200 p-6 opacity-70 h-full cursor-not-allowed flex flex-col"
            >
                {cardBody}
            </div>
        );
    }

    return (
        <div
            className={`simulator-card-enter simulator-card-cv group/card relative bg-white rounded-[20px] border border-slate-200 p-6 hover:shadow-lg hover:shadow-[#CF4500]/5 hover:-translate-y-1 transition-all duration-200 h-full flex flex-col ${colors.border}`}
        >
            <Link
                href={`/simulate/${procedure.simulateSlug}`}
                className="absolute inset-0 rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4500]/50"
                aria-label={
                    isWorkInProgress
                        ? `${procedure.shortName} ${t("simulator") || "Simulator"}: ${t("workInProgress") || "Work in Progress"}`
                        : `${procedure.shortName} ${t("simulator") || "Simulator"}`
                }
                tabIndex={0}
            />
            {cardBody}
        </div>
    );
}

