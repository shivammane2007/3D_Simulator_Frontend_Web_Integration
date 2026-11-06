"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export default function MiniMorphos({ slug }: { slug?: string }) {
    return (
        <section className="py-16 bg-gradient-to-b from-[#000814] to-[#001220]">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-xs font-bold tracking-wider uppercase text-[#CF4500] mb-3">
                        Try It Now
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Preview Results in Real-Time
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Upload a patient photo and explore surgical outcomes with our browser-based simulation engine.
                        No downloads, no uploads. Everything runs locally.
                    </p>
                    <Link
                        href={slug ? `/simulate/${slug}` : "/simulate"}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#CF4500] hover:bg-[#B53D00] text-white font-bold rounded-full transition-colors shadow-sm"
                    >
                        Launch Simulator
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
