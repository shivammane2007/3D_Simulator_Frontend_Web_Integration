"use client";

import { useMemo, useState, useRef, useEffect, type RefObject } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "@/i18n/messages";
import { ArrowRight, Check, Clock, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ErrorBanner from "@/components/ErrorBanner";
import IntendedUseNotice from "@/components/IntendedUseNotice";
import {
    CREDIT_UNIT_PRICE_MINOR,
    formatCreditPrice,
    type CreditCurrency,
} from "@/lib/billing/pricing";
import {
    PROCEDURES,
    PROCEDURE_CATEGORIES,
    type Procedure,
    type ProcedureCategoryKey,
} from "@/data/procedures";

export default function DayPassPicker({ currency: initialCurrency = "INR" }: { currency?: CreditCurrency }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tc = useTranslations("Credits");
    const tCats = useTranslations("procedureCategories");

    const [currency, setCurrency] = useState<CreditCurrency>(initialCurrency);
    const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Auto-detect currency if running locally or if user timezone indicates India or Global
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
                if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) {
                    setCurrency("INR");
                } else if (!initialCurrency) {
                    setCurrency("USD");
                }
            } catch {
                /* keep initial */
            }
        }
    }, [initialCurrency]);

    const priceLabel = formatCreditPrice(CREDIT_UNIT_PRICE_MINOR[currency], currency);

    // Only expose simulators that are actually available — skip "coming soon" and not-sale-ready rows.
    const available = useMemo(
        () =>
            PROCEDURES.filter((p) => !p.comingSoon && p.saleReady !== false).sort(
                (a, b) => a.order - b.order,
            ),
        [],
    );

    const grouped = useMemo(() => {
        const map = new Map<ProcedureCategoryKey, Procedure[]>();
        for (const p of available) {
            const list = map.get(p.category) ?? [];
            list.push(p);
            map.set(p.category, list);
        }
        return map;
    }, [available]);

    async function handleBuy(slug: string) {
        setLoadingSlug(slug);
        setError(null);
        try {
            const procedure = available.find((p) => p.slug === slug || p.simulateSlug === slug);
            const targetSim = procedure?.simulateSlug || slug;
            // Short delay to show the active loader state before routing
            setTimeout(() => {
                router.push(`/simulate/${targetSim}`);
            }, 300);
        } catch {
            setError(tc("checkoutFailed") || "Something went wrong. Please try again.");
            setLoadingSlug(null);
        }
    }

    const pending = searchParams.get("pending");
    const pendingLabel = pending
        ? available.find((p) => p.simulateSlug === pending || p.slug === pending)?.name
        : null;

    const pendingRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (pending && pendingRef.current) {
            pendingRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [pending]);

    return (
        <div className="min-h-screen bg-warm pb-20 pt-28">
            <div className="mx-auto max-w-5xl px-4">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/5 px-3 py-1 text-xs font-semibold text-sage">
                        <Sparkles className="h-3.5 w-3.5" /> {tc("balanceTitle") || "Simulation credits"}
                    </div>
                    <h1 className="mt-4 text-4xl font-serif text-ink md:text-5xl">
                        {tc("pickerHeading", { price: priceLabel }) || `One credit: ${priceLabel} = 24 hours with one simulator`}
                    </h1>
                    <p className="mt-3 max-w-2xl mx-auto text-sm text-slate-600">
                        {tc("pickerSubtitle") || "Pick the one procedure you want to explore now. Buying redeems 1 credit for instant 24-hour access to that simulator."}{" "}
                        {tc("expiryNote") || "Credits are valid for 12 months from purchase."}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-sage" /> {tc("featureAccess") || "24-hour access"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Check className="h-3.5 w-3.5 text-sage" /> {tc("featureUnlimited") || "Unlimited simulations"}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-sage" /> {tc("featurePrivacy") || "100% on-device privacy"}
                        </span>
                    </div>
                    <IntendedUseNotice className="justify-center mt-3" />
                </div>

                {pendingLabel && !error && (
                    <div className="mb-6 mx-auto max-w-xl rounded-xl border border-sage/30 bg-sage/5 px-4 py-3 text-center text-sm text-ink">
                        {tc.rich("pendingBanner", {
                            strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                            procedure: pendingLabel,
                        }) || (
                            <>
                                Continuing checkout for <strong>{pendingLabel}</strong>...
                            </>
                        )}
                    </div>
                )}

                {error && (
                    <div className="mb-6 mx-auto max-w-xl">
                        <ErrorBanner
                            message={error}
                            onDismiss={() => setError(null)}
                        />
                    </div>
                )}

                {PROCEDURE_CATEGORIES.map((cat) => {
                    const items = grouped.get(cat.key);
                    if (!items || items.length === 0) return null;
                    return (
                        <section key={cat.key} className="mb-10">
                            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                                <span className="text-lg">{cat.icon}</span>{" "}
                                {tCats(cat.key) || cat.label}
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((p) => {
                                    const isPending = pending === p.simulateSlug || pending === p.slug;
                                    return (
                                        <ProcedureCard
                                            key={p.slug}
                                            procedure={p}
                                            loading={loadingSlug === p.slug}
                                            disabled={loadingSlug !== null && loadingSlug !== p.slug}
                                            onBuy={() => handleBuy(p.slug)}
                                            priceLabel={priceLabel}
                                            isPending={isPending}
                                            cardRef={isPending ? pendingRef : null}
                                        />
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}

interface ProcedureCardProps {
    procedure: Procedure;
    loading: boolean;
    disabled: boolean;
    onBuy: () => void;
    priceLabel: string;
    isPending?: boolean;
    cardRef?: RefObject<HTMLDivElement | null> | null;
}

function ProcedureCard({
    procedure,
    loading,
    disabled,
    onBuy,
    priceLabel,
    isPending = false,
    cardRef = null,
}: ProcedureCardProps) {
    const tc = useTranslations("Credits");
    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${isPending ? "border-sage/60 ring-2 ring-sage/40" : "border-slate-200"}`}
        >
            {isPending && (
                <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-sage/20 text-sage font-semibold">
                    {tc("continueBadge") || "Continue pick"}
                </span>
            )}
            <div className="mb-4 flex items-start gap-3">
                <span className="text-2xl shrink-0">{procedure.icon}</span>
                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-ink line-clamp-1">
                        {procedure.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                        {procedure.description}
                    </p>
                </div>
            </div>
            <button
                type="button"
                onClick={onBuy}
                disabled={loading || disabled}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sage-light disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" /> {tc("openingCheckout") || "Opening simulator..."}
                    </>
                ) : (
                    <>
                        {tc("qtyOne", { price: priceLabel }) || `1 credit: ${priceLabel}`}
                        <ArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </motion.div>
    );
}

