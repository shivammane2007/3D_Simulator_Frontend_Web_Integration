"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "@/i18n/messages";

// Names the locale's medical-device regulator; unlisted locales get the generic
// fallback (docs/CMO_MEDICAL_REPORT_2026-05-04.md §3 item 4).
const REGULATOR_BY_LOCALE: Record<string, string> = {
    en: "the U.S. FDA",
    th: "the Thai FDA",
    ko: "the Korean MFDS",
    pt: "ANVISA (Brazil)",
    ja: "the PMDA (Japan)",
};

export default function RegulatoryFooter() {
    const locale = useLocale();
    const regulator =
        REGULATOR_BY_LOCALE[locale] ??
        "the applicable medical-device regulator in your jurisdiction";

    return (
        <section className="bg-warm">
            <div className="editorial-container mx-auto px-5 md:px-8">
                <div className="space-y-2 border-t border-mist py-8 font-body text-[13px] leading-relaxed text-slate-hp [&>p]:max-w-[680px]">
                    <p>
                        <span className="font-semibold text-ink">Disclaimer: </span>
                        Faceify Labs is a visualisation aid for patient consultation and shared decision-making. It does not diagnose, treat, or recommend any procedure; all clinical decisions are made by the treating surgeon.
                        It is not regulated as a medical device under {regulator}. All previews are illustrative visualisations of the requested change, not predictions of surgical outcome. Actual results depend on individual anatomy, surgical technique, and healing response.
                    </p>
                    <p>
                        Real-time simulations run in your browser. Your photo leaves your device only when you save a simulation to your account, and we do not use it to train AI models.
                    </p>
                    <p>
                        <Link href="/clinical-safety" className="inline-flex min-h-11 items-center text-[#CF4500] hover:text-[#B53D00] font-medium underline underline-offset-4 transition-colors">
                            Read our clinical posture &rarr;
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
