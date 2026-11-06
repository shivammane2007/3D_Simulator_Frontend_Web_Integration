"use client";

import { motion } from "framer-motion";

// Procedures whose simulations operate on the body (not the face).
// ConcernMapper swaps "facial mesh" copy for body-appropriate copy on these.
const BODY_PROCEDURE_SLUGS = new Set([
    "bbl",
    "breast-augmentation",
    "breast-reduction",
    "breast-lift",
    "liposuction",
    "tummy-tuck",
    "mommy-makeover",
    "buccal-fat-removal",
    "labiaplasty",
    "fat-grafting",
    "emsculpt",
    "cryolipolysis",
    "laser-hair-removal",
    "tattoo-removal",
]);

const FACE_CONCERNS = [
    { label: "Will it look natural?", answer: "Our 468-point mesh constrains deformation to anatomically plausible ranges for realistic visualizations." },
    { label: "How accurate is the simulation?", answer: "Faceify aligns to a 468-point facial mesh for detailed visualizations." },
    { label: "Is my data private?", answer: "Real-time simulations run in your browser; your photo is sent off-device only for the optional AI preview or to save it to your account, and is never used to train models." },
    { label: "Can I see multiple options?", answer: "Yes, adjust parameters in real-time to explore different surgical approaches." },
];

const BODY_CONCERNS = [
    { label: "Will it look natural?", answer: "Our AI body contour engine constrains deformation to clinically plausible ranges for realistic visualizations." },
    { label: "How accurate is the simulation?", answer: "Faceify uses an AI body analysis model to visualise proportional changes, anchored to your photo and anatomy." },
    { label: "Is my data private?", answer: "Real-time simulations run in your browser; your photo is sent off-device only for the optional AI preview or to save it to your account, and is never used to train models." },
    { label: "Can I see multiple options?", answer: "Yes, adjust parameters in real-time to explore different surgical approaches." },
];

interface ConcernMapperProps {
    /** Pass the procedure slug so body procedures get body-appropriate copy. */
    slug?: string;
}

export default function ConcernMapper({ slug }: ConcernMapperProps = {}) {
    const concerns = slug && BODY_PROCEDURE_SLUGS.has(slug) ? BODY_CONCERNS : FACE_CONCERNS;
    return (
        <section className="py-14 bg-warm border-t border-slate-200">
            <div className="container mx-auto px-5 md:px-8 max-w-3xl">
                <h2 className="text-xl md:text-2xl font-body font-semibold text-ink mb-8 text-center">
                    Common Patient Questions
                </h2>
                <div className="space-y-4">
                    {concerns.map((c, i) => (
                        <motion.div
                            key={c.label}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.3 }}
                            className="rounded-2xl bg-white border border-slate-200 p-5"
                        >
                            <h3 className="font-body font-semibold text-ink text-sm mb-2">{c.label}</h3>
                            <p className="text-slate-500 font-body text-sm leading-relaxed">{c.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
