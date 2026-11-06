"use client";

import { motion } from "framer-motion";
import type { Procedure_Legacy as Procedure } from "@/data/procedures";

interface ProcedureHeroProps {
    procedure: Procedure;
}

export default function ProcedureHero({ procedure }: ProcedureHeroProps) {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#001220] to-[#000814]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,146,244,0.08)_0%,_transparent_60%)]" />

            <div className="relative container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-3xl"
                >
                    <p className="text-[#CF4500] text-sm font-bold tracking-wider uppercase mb-4">
                        468-Point Facial Mesh
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        {procedure.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                        {procedure.description}
                    </p>

                    {/* Landmark tags */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {procedure.landmarks?.map((lm) => (
                            <span
                                key={lm}
                                className="px-3 py-1.5 bg-[#CF4500]/10 border border-[#CF4500]/20 rounded-lg text-sm text-[#CF4500] font-medium"
                            >
                                {lm}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
