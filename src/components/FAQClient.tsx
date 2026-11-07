"use client";

import { useState, useRef, useCallback } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "@/i18n/messages";
import { openDemoModal } from "@/lib/analytics";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";

type FAQKey =
    | "patientPrivacy"
    | "hipaaCompat"
    | "gdprPdpaPipa"
    | "consentCapture"
    | "trainingTime"
    | "multipleSeats"
    | "languages"
    | "foundingPartner";

const FAQ_KEYS: FAQKey[] = [
    "patientPrivacy",
    "hipaaCompat",
    "gdprPdpaPipa",
    "consentCapture",
    "trainingTime",
    "multipleSeats",
    "languages",
    "foundingPartner",
];

function FAQItem({
    q,
    a,
    id,
    isOpen,
    onToggle,
    onKeyDown,
}: {
    q: string;
    a: string;
    id: string;
    isOpen: boolean;
    onToggle: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
    const panelId = `panel-${id}`;
    const buttonId = `btn-${id}`;
    return (
        <div className={`border rounded-2xl overflow-hidden transition-colors ${isOpen ? "border-sage/40 shadow-sm" : "border-slate-200"}`}>
            <button
                id={buttonId}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-warm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/60 focus-visible:ring-inset"
                onClick={onToggle}
                onKeyDown={onKeyDown}
                aria-expanded={isOpen}
                aria-controls={panelId}
            >
                <span className="font-body font-semibold text-ink text-sm pr-4">{q}</span>
                <ChevronDown className={`w-4 h-4 text-sage shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-5 text-sm text-slate-600 font-body leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQClient() {
    const t = useTranslations("FAQ");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = (index + 1) % FAQ_KEYS.length;
                const btn = listRef.current?.querySelector<HTMLButtonElement>(`#btn-${FAQ_KEYS[next]}`);
                btn?.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const prev = (index - 1 + FAQ_KEYS.length) % FAQ_KEYS.length;
                const btn = listRef.current?.querySelector<HTMLButtonElement>(`#btn-${FAQ_KEYS[prev]}`);
                btn?.focus();
            } else if (e.key === "Escape") {
                e.preventDefault();
                setOpenIndex(null);
                const btn = listRef.current?.querySelector<HTMLButtonElement>(`#btn-${FAQ_KEYS[index]}`);
                btn?.focus();
            }
        },
        []
    );

    return (
        <div className="bg-warm font-body pt-16">
            <PageHero
                label={t("heroLabel") || "FAQ"}
                title={t.rich("heroTitle", {
                    em: (chunks: React.ReactNode) => <em className="font-serif text-sage not-italic italic">{chunks}</em>,
                }) || (
                    <>
                        Common questions, <em className="font-serif text-sage not-italic italic">clear answers</em>
                    </>
                )}
                subtitle={t("heroSubtitle") || "Everything surgeons and patients need to know about Faceify Labs."}
            />
            <MarketingSection variant="white" className="!pt-0 !pb-16" noFade>
                <div className="max-w-3xl mx-auto space-y-3" ref={listRef}>
                    {FAQ_KEYS.map((key, index) => (
                        <FAQItem
                            key={key}
                            id={key}
                            q={t(`questions.${key}.q`)}
                            a={t(`questions.${key}.a`)}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
            </MarketingSection>
            <MarketingSection variant="warm" className="!py-16">
                <div className="max-w-lg mx-auto text-center bg-white rounded-[20px] border border-slate-200 p-8 shadow-sm">
                    <h3 className="font-serif text-2xl text-ink mb-3">{t("ctaHeading") || "Ready to see it in action?"}</h3>
                    <p className="text-sm text-slate-600 font-body mb-6">{t("ctaDescription") || "Schedule a personalized demo and we'll show you how Faceify fits your practice."}</p>
                    <button
                        type="button"
                        onClick={() => openDemoModal("faq")}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-sage hover:bg-sage-light text-white font-semibold rounded-full text-sm transition-all font-body shadow-sm"
                    >
                        {t("ctaButton") || "Schedule a Demo"} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </MarketingSection>
        </div>
    );
}

