"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ScanFace, Fingerprint, ShieldCheck, Cpu } from "lucide-react";

const features = [
    {
        icon: ScanFace,
        title: "468-Point Anatomical Mapping",
        description: "Every simulation is anchored to skeletal landmarks — so patients see achievable results, not AI artifacts."
    },
    {
        icon: Fingerprint,
        title: "Identity-Lock Preservation",
        description: "Maintains orbital and mid-face ratios so simulations look like the patient, reducing unrealistic expectations."
    },
    {
        icon: Cpu,
        title: "Real-Time Consultation Previews",
        description: "Generate visualizations in seconds during consultations. No waiting, no separate appointments."
    },
    {
        icon: ShieldCheck,
        title: "HIPAA-Aligned On-Device Processing",
        description: "Real-time simulation runs in your browser. Your photo is sent off-device only for the optional AI preview or to save it to your account — never used to train any model."
    }
];

export default function Technology() {
    const featureCardsRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div
                    className="flex flex-col lg:flex-row items-center gap-16"
                    onMouseMove={(e) => {
                        if (!featureCardsRef.current) return;
                        const cards = featureCardsRef.current.querySelectorAll(".group");
                        cards.forEach(card => {
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
                            (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
                        });
                    }}
                >

                    {/* Text Content */}
                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
                        >
                            Built for <br />
                            <span className="text-medical-blue">Clinical Accuracy</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-muted-foreground mb-12"
                        >
                            Unlike consumer face filters, Faceify Labs is engineered for surgical visualisation. Our 468-point landmark system anchors every transformation to underlying skeletal anatomy — giving your patients a preview they can trust.
                        </motion.p>

                        <div ref={featureCardsRef} className="grid sm:grid-cols-2 gap-8">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    whileHover={{ scale: 1.02 }}
                                    className="group relative flex flex-col gap-3 p-4 rounded-xl transition-all duration-300 hover:bg-slate-50"
                                >
                                    {/* Hover Radial Gradient */}
                                    <div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 229, 255, 0.05), transparent 40%)"
                                        }}
                                    />

                                    <div className="w-10 h-10 rounded-lg bg-medical-blue/10 flex items-center justify-center text-medical-blue group-hover:text-medical-cyan transition-colors">
                                        <f.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-foreground group-hover:text-medical-blue transition-colors">{f.title}</h3>
                                    <p className="text-sm text-muted-foreground">{f.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Content - Grid Simulation */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square max-w-md mx-auto"
                        >
                            {/* Abstract Face Grid Representation */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-full opacity-50 blur-2xl" />

                            <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-medical-blue to-medical-teal" />

                                <div className="w-full h-full flex items-center justify-center relative">
                                    {/* Grid Points Animation */}
                                    <div className="grid grid-cols-12 grid-rows-12 gap-2 w-64 h-64 md:w-80 md:h-80 opacity-20">
                                        {Array.from({ length: 144 }).map((_, i) => (
                                            <div key={i} className="w-1 h-1 bg-medical-blue rounded-full" />
                                        ))}
                                    </div>

                                    {/* Connecting lines (SVG overlay) */}
                                    <svg className="absolute inset-0 w-full h-full text-medical-blue/30" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" />
                                        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" />
                                    </svg>

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
                                            <ScanFace className="w-6 h-6 text-medical-blue animate-pulse" />
                                            <span className="font-mono text-xs font-medium text-slate-600">
                                                TRACKING: ACTIVE<br />
                                                POINTS: 468/468
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
