"use client";

/**
 * ProcedureTimeline — visual journey infographic for /procedures/[slug]
 * pages. Replaces the wall-of-text pattern with a 5-step horizontal
 * timeline (Day 0 consult → surgery → first week → first month → final).
 *
 * Per-procedure overrides via `data/procedure-timelines.ts` so a 30-min
 * Botox visit doesn't read as "first month recovery". When no override
 * exists we render a sensible aesthetic-procedure default.
 *
 * Production-grade requirements honoured:
 *   - SSR-rendered (motion entrance is enhancement, not gating)
 *   - prefers-reduced-motion: skip the stagger animation
 *   - Mobile: vertical stack with connector line; desktop: horizontal row
 *   - Each step is a list item under an aria-label so screen readers can
 *     navigate the timeline as a journey
 */

import { motion, useReducedMotion } from "framer-motion";
import {
    type LucideIcon,
    Calendar,
    Stethoscope,
    HeartPulse,
    Sparkles,
    CalendarCheck,
} from "lucide-react";
import { getTimelineForProcedure } from "@/data/procedure-timelines";

interface ProcedureTimelineProps {
    procedureSlug: string;
}

const ICON_BY_KIND: Record<string, LucideIcon> = {
    consult: Calendar,
    procedure: Stethoscope,
    "early-recovery": HeartPulse,
    "settling-in": Sparkles,
    "final-result": CalendarCheck,
};

export default function ProcedureTimeline({ procedureSlug }: ProcedureTimelineProps) {
    const steps = getTimelineForProcedure(procedureSlug);
    const reduce = useReducedMotion();

    return (
        <section className="bg-white py-14 md:py-20 border-y border-slate-200">
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10 md:mb-12">
                        <p className="text-[0.7rem] font-body font-semibold tracking-[0.15em] uppercase text-sage mb-3">
                            What to expect
                        </p>
                        <h2 className="text-2xl md:text-3xl font-body font-semibold text-ink leading-tight">
                            Your timeline, day by day
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 font-body max-w-xl mx-auto">
                            Typical milestones for an aesthetic-procedure patient. Your surgeon will personalise the plan during your consultation.
                        </p>
                    </div>

                    <ol
                        className="relative"
                        aria-label={`Recovery and result timeline for ${procedureSlug.replace(/-/g, " ")}`}
                    >
                        {/* Desktop horizontal row */}
                        <div className="hidden md:grid grid-cols-5 gap-4 relative">
                            {/* connector line behind the icons */}
                            <div
                                className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-sage/20 via-sage/40 to-sage/20"
                                aria-hidden="true"
                            />
                            {steps.map((step, i) => {
                                const Icon = ICON_BY_KIND[step.kind] ?? Calendar;
                                return (
                                    <motion.li
                                        key={step.label}
                                        className="relative flex flex-col items-center text-center px-2"
                                        initial={reduce ? false : { opacity: 0, y: 12 }}
                                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                    >
                                        <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-sage/30 flex items-center justify-center mb-4 shadow-sm">
                                            <Icon className="w-6 h-6 text-sage" aria-hidden="true" />
                                        </div>
                                        <p className="text-xs font-body font-semibold text-sage uppercase tracking-wider mb-1">
                                            {step.when}
                                        </p>
                                        <p className="text-sm font-body font-semibold text-ink mb-1.5">
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-slate-600 font-body leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.li>
                                );
                            })}
                        </div>

                        {/* Mobile vertical stack with left-rail connector */}
                        <div className="md:hidden relative pl-12">
                            <div
                                className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-sage/30 via-sage/30 to-transparent"
                                aria-hidden="true"
                            />
                            {steps.map((step, i) => {
                                const Icon = ICON_BY_KIND[step.kind] ?? Calendar;
                                return (
                                    <motion.li
                                        key={step.label}
                                        className="relative pb-6 last:pb-0"
                                        initial={reduce ? false : { opacity: 0, x: -12 }}
                                        whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.4, delay: i * 0.06 }}
                                    >
                                        <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-white border-2 border-sage/30 flex items-center justify-center shadow-sm">
                                            <Icon className="w-4 h-4 text-sage" aria-hidden="true" />
                                        </div>
                                        <p className="text-[10px] font-body font-semibold text-sage uppercase tracking-wider mb-0.5">
                                            {step.when}
                                        </p>
                                        <p className="text-sm font-body font-semibold text-ink mb-1">
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-slate-600 font-body leading-relaxed">
                                            {step.description}
                                        </p>
                                    </motion.li>
                                );
                            })}
                        </div>
                    </ol>

                    <p className="text-center text-[11px] text-slate-400 font-body mt-8 max-w-md mx-auto italic">
                        Educational guidance only. Actual recovery and final-result timelines vary by individual, surgeon, and procedure complexity.
                    </p>
                </div>
            </div>
        </section>
    );
}
