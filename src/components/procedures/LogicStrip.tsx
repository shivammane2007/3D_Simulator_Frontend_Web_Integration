"use client";

import { motion } from "framer-motion";
import type { Procedure_Legacy as Procedure } from "@/data/procedures";

interface LogicStripProps {
    procedure: Procedure;
}

export default function LogicStrip({ procedure }: LogicStripProps) {
    const benchmarks = [
        { label: "Nasolabial Angle", value: procedure.benchmarks?.nla },
        { label: "Goode's Ratio", value: procedure.benchmarks?.goode },
        { label: "Phi Ratio", value: procedure.benchmarks?.phi },
    ].filter((b) => b.value && b.value !== "N/A");

    return (
        <section className="py-12 bg-[#000814] border-y border-ink/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {benchmarks.map((b, i) => (
                        <motion.div
                            key={b.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            className="flex flex-col items-center text-center p-6 rounded-xl bg-[#001220] border border-ink/40"
                        >
                            <p className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-2">
                                {b.label}
                            </p>
                            <p className="text-2xl font-bold text-white">{b.value}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
