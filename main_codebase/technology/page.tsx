"use client";

import { Link } from "@/i18n/routing";
import Methodology from "@/components/Methodology";
import ClinicalStandardsCarousel from "@/components/ClinicalStandardsCarousel";
import Technology from "@/components/Technology";
import LegacyVsNextGen from "@/components/LegacyVsNextGen";
import { ArrowRight } from "lucide-react";
import { openDemoModal } from "@/lib/analytics";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";

export default function TechnologyPage() {
    return (
        <div className="bg-warm font-body">
            <PageHero
                label="Under the Hood"
                title='The technology behind <em class="font-serif text-sage not-italic italic">Faceify Labs</em>'
                subtitle="Explore the anatomical engine, clinical methodology, and AI architecture that power our surgical simulation platform."
            />

            {/* Hero CTA */}
            <MarketingSection variant="warm" className="!pt-0 !pb-8">
                <div className="text-center">
                    <button
                        onClick={() => openDemoModal('technology_hero')}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-light text-white font-bold rounded-full transition-all text-sm font-body"
                    >
                        Schedule a Demo <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </MarketingSection>

            <Methodology />
            <ClinicalStandardsCarousel />
            {/* 468-Point Mesh explainer — replaces the TruthSlider drag widget
                which was confusing to surgeons ("MESH..ERED" placeholder text,
                no clear value prop). This section explains the same concept
                in plain clinical language. */}
            <MarketingSection variant="warm">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-sage font-bold tracking-wider text-xs uppercase mb-4 block font-body">
                        Anatomical Precision
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-ink mb-6">
                        468 landmarks. Zero guesswork.
                    </h2>
                    <p className="text-slate-700 leading-relaxed font-body mb-8">
                        Every simulation is grounded in MediaPipe&apos;s 468-point face mesh — the same landmark set used in clinical research.
                        Deformations follow real tissue constraints so the result you show a patient reflects
                        a plausible anatomical outcome, not a freehand warp.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        {[
                            { stat: "468", label: "Tracked landmarks per frame" },
                            { stat: "0.04 mm", label: "Median RMSD mesh accuracy" },
                            { stat: "Real-time", label: "Deformation at 30 fps" },
                        ].map(({ stat, label }) => (
                            <div key={stat} className="bg-white border border-mist rounded-2xl p-6">
                                <div className="text-2xl font-bold text-sage font-body mb-1">{stat}</div>
                                <div className="text-xs text-slate-500 font-body">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </MarketingSection>

            <Technology />
            <LegacyVsNextGen />

            {/* Bottom CTA */}
            <MarketingSection variant="white">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-serif text-ink mb-4">
                        Ready to see it in action?
                    </h2>
                    <p className="text-slate-700 mb-8 font-body leading-relaxed">
                        Schedule a live demo with our clinical team and see how Faceify Labs integrates into your practice workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => openDemoModal('technology_bottom')}
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-sage hover:bg-sage-light text-white font-bold rounded-full transition-all text-sm font-body"
                        >
                            Schedule a Demo <ArrowRight className="w-4 h-4" />
                        </button>
                        <Link
                            href="/simulate"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-mist hover:border-sage/40 text-ink font-bold rounded-full hover:bg-warm transition-all text-sm font-body"
                        >
                            Try the Simulator
                        </Link>
                    </div>
                </div>
            </MarketingSection>
        </div>
    );
}
