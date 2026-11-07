"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/i18n/messages";
import { usePathname } from "next/navigation";

const emptySubscribe = () => () => {};

const DISMISS_KEY = "faceify-clinical-disclaimer-dismissed";

export default function ClinicalDisclaimer() {
    const t = useTranslations("ClinicalDisclaimer");
    const pathname = usePathname();
    const barRef = useRef<HTMLDivElement>(null);

    const isIndividualSimulatorPage = /\/simulate\/[^/]/.test(pathname || "");

    const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === "undefined") return false;
        return !sessionStorage.getItem(DISMISS_KEY);
    });

    const showing = !isIndividualSimulatorPage && isVisible && mounted;

    if (!showing) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                ref={barRef}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-[#141a24]/95 backdrop-blur-md border-t border-white/10 p-3 shadow-2xl"
            >
                <div className="container mx-auto px-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                        <p className="text-xs text-slate-300 font-mono leading-tight">
                            <strong className="text-amber-500 uppercase">{t("noticeLabel") || "CLINICAL NOTICE"}:</strong>{" "}
                            {t("noticeBody") || "For Patient Consultation Purposes Only. Not a Medical Device. The anatomical mesh provided by Faceify Labs is for illustrative consultation visualisation and does not replace in person clinical examination by a qualified surgeon."}
                        </p>
                    </div>
                    <button
                        onClick={() => { sessionStorage.setItem(DISMISS_KEY, "1"); setIsVisible(false); }}
                        className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
                        aria-label={t("dismiss") || "Dismiss"}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
}

