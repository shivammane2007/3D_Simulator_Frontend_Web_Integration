'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { procedures, procedureCategories, type ProcedureCategory } from '@/data/procedures';
import { routes } from '@/config/routes';
import { SatelliteButton } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const categoryOrder: ProcedureCategory[] = [
  'surgical',
  'non-surgical',
  'injectable',
  'dental',
  'body',
  'hair',
];

export default function ProcedureExplorer() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProcedureCategory>('surgical');
  const displayed = procedures.filter((p) => p.category === activeCategory).slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] relative overflow-hidden">
      {/* Decorative Light Signal Orange Orbital Path */}
      <svg
        className="absolute top-1/3 left-0 w-full h-[400px] pointer-events-none z-0"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M-50 200 Q 400 350, 800 120 T 1500 250"
          stroke="#F37338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.35"
        />
      </svg>

      <div className="container-master relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              {t('PROCEDURE CONSTELLATION')}
            </span>
            <h2 className="text-h2-section text-[#141413]">
              {t('85+ procedural simulations.')}
            </h2>
            <p className="text-sm text-[#555555]">
              {t('Parametric visual models calculated client-side with 468 landmark tracking precision.')}
            </p>
          </div>

          <Link
            href={routes.procedures}
            className="px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2 shrink-0"
          >
            <span>{t('View All Procedures')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Procedure categories">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2 rounded-[20px] text-xs font-medium tracking-tight transition-all cursor-pointer border',
                activeCategory === cat
                  ? 'bg-[#141413] text-[#F3F0EE] border-[#141413] shadow-sm'
                  : 'bg-white text-[#141413] border-black/5 hover:bg-[#EBE7E3]'
              )}
            >
              {t(procedureCategories[cat].label)}
            </button>
          ))}
        </div>

        {/* Circular Portrait Cards Grid with Satellite CTAs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {displayed.map((procedure) => (
            <div
              key={procedure.slug}
              className="bg-[#FCFBFA] rounded-[32px] p-6 border border-black/5 shadow-level-1 flex flex-col items-center text-center justify-between space-y-6 hover:shadow-level-2 transition-all group"
            >
              {/* Circular Portrait with Satellite Micro-CTA */}
              <div className="relative w-[180px] h-[180px] my-2">
                {/* Circular image mask */}
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white via-[#EBE7E3] to-[#DFD9D2] border border-black/5 flex items-center justify-center p-3">
                  <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
                    <ellipse cx="80" cy="80" rx="42" ry="54" stroke="#141413" strokeWidth="1.2" fill="rgba(255,255,255,0.5)" />
                    <ellipse cx="65" cy="70" rx="8" ry="5" stroke="#141413" strokeWidth="1" fill="#fff" />
                    <ellipse cx="95" cy="70" rx="8" ry="5" stroke="#141413" strokeWidth="1" fill="#fff" />
                    <circle cx="65" cy="70" r="2" fill="#CF4500" />
                    <circle cx="95" cy="70" r="2" fill="#CF4500" />
                    <path d="M80 60 L77 78 Q80 82 83 78 L80 60" stroke="#141413" strokeWidth="1" fill="none" />
                    <path d="M70 95 Q80 100 90 95" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    {/* Landmark points */}
                    <circle cx="80" cy="50" r="1.5" fill="#CF4500" />
                    <circle cx="55" cy="85" r="1.5" fill="#F37338" />
                    <circle cx="105" cy="85" r="1.5" fill="#F37338" />
                    <circle cx="80" cy="110" r="1.5" fill="#CF4500" />
                  </svg>
                </div>

                {/* Attached Satellite Micro-CTA (docks bottom-right) */}
                <div className="absolute -bottom-1 -right-1">
                  <SatelliteButton
                    href={routes.simulateProcedure(procedure.simulatorSlug)}
                    ariaLabel={`Simulate ${procedure.name}`}
                  />
                </div>
              </div>

              {/* Text Info Below Portrait */}
              <div className="space-y-2 max-w-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                  • {t(procedure.categoryLabel)}
                </span>

                <h3 className="text-h3-card text-[#141413]">
                  {t(procedure.name)}
                </h3>

                <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                  {t(procedure.shortDescription)}
                </p>
              </div>

              {/* Secondary Link to Guide */}
              <div className="pt-2 border-t border-black/5 w-full flex justify-center">
                <Link
                  href={routes.procedure(procedure.slug)}
                  className="text-xs font-medium text-[#141413] hover:text-[#CF4500] transition-colors inline-flex items-center gap-1 group-hover:gap-1.5"
                >
                  <span>{t('View Clinical Guide')}</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
