"use client";

import { motion } from "framer-motion";
import type { Procedure_Legacy as Procedure } from "@/data/procedures";

interface PrecisionTableProps {
    procedure: Procedure;
}

export default function PrecisionTable({ procedure }: PrecisionTableProps) {
    return (
        <section className="py-16 bg-[#000814]">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                        Recovery & Cost
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recovery */}
                        <div className="rounded-xl bg-[#001220] border border-ink/40 p-6">
                            <h3 className="text-sm font-bold tracking-wider uppercase text-[#CF4500] mb-4">
                                Recovery Timeline
                            </h3>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-slate-400 text-sm">Downtime</dt>
                                    <dd className="text-white text-sm font-medium">{procedure.recovery?.downtime ?? "N/A"}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400 text-sm">Swelling Duration</dt>
                                    <dd className="text-white text-sm font-medium">{procedure.recovery?.swelling ?? "N/A"}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400 text-sm">Pain Level</dt>
                                    <dd className="text-white text-sm font-medium">{procedure.recovery?.pain ?? "N/A"}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Cost */}
                        <div className="rounded-xl bg-[#001220] border border-ink/40 p-6">
                            <h3 className="text-sm font-bold tracking-wider uppercase text-[#CF4500] mb-4">
                                Estimated Cost Range
                            </h3>
                            <dl className="space-y-3">
                                <div className="flex justify-between">
                                    <dt className="text-slate-400 text-sm">USD</dt>
                                    <dd className="text-white text-sm font-medium">{procedure.cost?.usd ?? "N/A"}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400 text-sm">THB</dt>
                                    <dd className="text-white text-sm font-medium">{procedure.cost?.thb ?? "N/A"}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-slate-400 text-sm">KRW</dt>
                                    <dd className="text-white text-sm font-medium">{procedure.cost?.krw ?? "N/A"}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
