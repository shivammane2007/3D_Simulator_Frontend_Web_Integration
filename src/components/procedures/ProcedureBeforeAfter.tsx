"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import CompareSlider from "@/components/ui/CompareSlider";

interface ProcedureBeforeAfterProps {
    /** Procedure slug. Builds the link to the simulator. */
    procedureSlug: string;
    /** Procedure name, used in the heading and the slider label. */
    procedureName: string;
    beforeSrc: string;
    afterSrc: string;
    beforeAlt: string;
    afterAlt: string;
    /** Optional attribution caption shown under the slider. */
    subjectCaption?: string;
    /** Divider position on first render, 0 to 100. */
    initialPosition?: number;
}

export default function ProcedureBeforeAfter({
    procedureSlug,
    procedureName,
    beforeSrc,
    afterSrc,
    beforeAlt,
    afterAlt,
    subjectCaption,
    initialPosition = 50,
}: ProcedureBeforeAfterProps) {
    if (!beforeSrc || !afterSrc) return null;

    return (
        <section
            className="bg-warm py-14 md:py-20 border-y border-slate-200"
            aria-labelledby={`procedure-ba-${procedureSlug}-heading`}
        >
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8 md:mb-10">
                        <p className="text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase text-sage mb-3">
                            Example simulation
                        </p>
                        <h2
                            id={`procedure-ba-${procedureSlug}-heading`}
                            className="text-2xl md:text-3xl font-body font-semibold text-ink leading-tight"
                        >
                            Drag to reveal a simulated{" "}
                            <span className="text-sage">{procedureName.toLowerCase()}</span> outcome
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 font-body max-w-xl mx-auto">
                            Simulated preview on an example face. The same facial mesh runs on your own photo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
                        <div className="max-w-lg w-full mx-auto md:max-w-none">
                            <CompareSlider
                                beforeSrc={beforeSrc}
                                afterSrc={afterSrc}
                                beforeAlt={beforeAlt}
                                afterAlt={afterAlt}
                                beforeLabel="Before"
                                afterLabel="AI Preview"
                                label={`Before and after comparison: drag to reveal ${procedureName.toLowerCase()} simulation`}
                                initialPosition={initialPosition}
                                aspectClassName="aspect-[3/4] sm:aspect-[4/5]"
                            />
                            <p className="mt-3 text-center text-[11px] text-slate-500 font-body">
                                Drag the handle, or use the arrow keys
                                {subjectCaption ? ` · ${subjectCaption}` : ""}
                            </p>
                        </div>

                        <div className="md:w-72 md:pt-2 space-y-4">
                            <div className="space-y-3 text-sm text-slate-600 font-body">
                                <p>
                                    Adjustments use a 468-point anatomical mesh; proportions stay anchored to the patient&apos;s actual face.
                                </p>
                                <ul className="space-y-1.5 text-xs">
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage shrink-0">✓</span>
                                        Simulation runs in your browser
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage shrink-0">✓</span>
                                        Adjustable parameters update in real time
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-sage shrink-0">✓</span>
                                        Educational preview, not a clinical guarantee
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href={`/simulate/${procedureSlug}`}
                                className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-sage hover:bg-sage-light text-white text-sm font-semibold rounded-full transition-colors font-body"
                            >
                                Try this on your face <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
