"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  PROCEDURES,
  PROCEDURE_CATEGORIES,
  isProcedureSaleReady,
  type ProcedureCategoryKey,
  type Procedure,
} from "@/data/procedures";
import ProcedureIcon from "@/components/ProcedureIcon";

const CATEGORY_COLORS: Record<ProcedureCategoryKey, { bg: string; text: string }> = {
  surgical: { bg: "bg-[#FDEEE7]", text: "text-[#CF4500]" },
  "non-surgical": { bg: "bg-[#FDF3E7]", text: "text-[#9A6428]" },
  injectable: { bg: "bg-[#FDEEE7]", text: "text-[#CF4500]" },
  dental: { bg: "bg-[#EDF2F7]", text: "text-[#243847]" },
  "body-contouring": { bg: "bg-[#FDEEE7]", text: "text-[#CF4500]" },
  "hair-restoration": { bg: "bg-[#FDF3E7]", text: "text-[#9A6428]" },
};

const CATEGORY_NAMES: Record<ProcedureCategoryKey, string> = {
  surgical: "SURGICAL",
  "non-surgical": "NON-SURGICAL",
  injectable: "INJECTABLE",
  dental: "DENTAL",
  "body-contouring": "BODY CONTOURING",
  "hair-restoration": "HAIR RESTORATION",
};

function ProcedureCard({ procedure }: { procedure: Procedure }) {
  const colors = CATEGORY_COLORS[procedure.category] || CATEGORY_COLORS.surgical;
  // Sale-ready globally? When false, the procedure is /demo-only —
  // surface a non-judgemental "Demo preview" badge so patients
  // browsing the catalog know the marketplace doesn't carry paid
  // offerings for it (yet). Doesn't hide the card — these are still
  // legitimate demos, just not for sale through the platform.
  const isDemoOnly = !isProcedureSaleReady(procedure.slug);

  return (
    <Link href={`/procedures/${procedure.slug}`} className="group block h-full">
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        className="bg-white rounded-[20px] border border-black/5 p-6 hover:-translate-y-1 hover:shadow-level-2 hover:border-[#CF4500]/40 transition-all duration-300 h-full flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ProcedureIcon slug={procedure.slug} category={procedure.category} size={40} />
            {procedure.isNew && (
              <span className="text-[0.6rem] font-semibold bg-[#CF4500] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                New
              </span>
            )}
            {isDemoOnly && (
              <span className="text-[0.6rem] font-semibold bg-[#EBE7E3] text-[#555555] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Demo
              </span>
            )}
          </div>
          <span
            className={`inline-block text-[0.65rem] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full mb-3 ${colors.bg} ${colors.text}`}
          >
            {CATEGORY_NAMES[procedure.category] || procedure.categoryLabel}
          </span>
          <h3 className="font-semibold text-[#141413] text-sm mb-1 flex items-center justify-between group-hover:text-[#CF4500] transition-colors">
            {procedure.shortName}
            <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-[#CF4500]" />
          </h3>
          <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
            {procedure.description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ProceduresPage() {
  const [activeCategory, setActiveCategory] = useState<ProcedureCategoryKey | "all">("all");
  const filtered =
    activeCategory === "all"
      ? PROCEDURES
      : PROCEDURES.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#F3F0EE] min-h-screen">
      {/* Hero Header */}
      <section className="pt-36 md:pt-40 pb-10 px-5 md:px-12 text-center">
        <div className="max-w-[720px] mx-auto space-y-4">
          <span className="text-eyebrow-master text-eyebrow-dot justify-center">
            PROCEDURE CATALOG
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,3.75rem)] font-normal tracking-tight text-[#141413] leading-[1.1]">
            <em className="italic font-serif text-[#CF4500]">{PROCEDURES.length} procedures</em>. One platform.
          </h1>
          <p className="text-base md:text-lg text-[#555555] font-normal max-w-[540px] mx-auto leading-relaxed">
            Explore {PROCEDURES.length} aesthetic procedures powered by AI simulation.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-5 md:px-12 pb-24">
        <div className="max-w-[1140px] mx-auto">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#141413] text-[#F3F0EE] shadow-level-1"
                  : "bg-white border border-black/5 text-[#555555] hover:text-[#141413] hover:border-black/15 shadow-sm"
              }`}
            >
              All <span className="ml-1 text-xs opacity-70">({PROCEDURES.length})</span>
            </button>
            {PROCEDURE_CATEGORIES.map((cat) => {
              const count = PROCEDURES.filter((p) => p.category === cat.key).length;
              const displayLabel = cat.key === "dental" ? "Dental" : cat.label;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#141413] text-[#F3F0EE] shadow-level-1"
                      : "bg-white border border-black/5 text-[#555555] hover:text-[#141413] hover:border-black/15 shadow-sm"
                  }`}
                >
                  {cat.icon} {displayLabel}{" "}
                  <span className={`ml-1 text-xs ${isActive ? "opacity-70" : "text-[#696969]"}`}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Catalog Grid View */}
          <AnimatePresence mode="wait">
            {activeCategory === "all" ? (
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {PROCEDURE_CATEGORIES.map((cat, idx) => {
                  const catProcedures = PROCEDURES.filter((p) => p.category === cat.key);
                  if (catProcedures.length === 0) return null;
                  const displayLabel = cat.key === "dental" ? "Dental" : cat.label;
                  return (
                    <div key={cat.key}>
                      {idx > 0 && <hr className="border-black/5 my-10" />}
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-xl" aria-hidden="true">
                          {cat.icon}
                        </span>
                        <h2 className="font-semibold text-[#141413] text-lg">
                          {displayLabel}
                        </h2>
                        <span className="text-sm text-[#696969]">
                          ({catProcedures.length})
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {catProcedures.map((p) => (
                          <ProcedureCard key={p.slug} procedure={p} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((p) => (
                  <ProcedureCard key={p.slug} procedure={p} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
