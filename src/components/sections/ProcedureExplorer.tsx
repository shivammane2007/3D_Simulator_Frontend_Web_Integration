'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { PROCEDURES, PROCEDURE_CATEGORIES, getProcedureCounts, type ProcedureCategoryKey } from '@/data/procedures';
import { CONSULT_ONLY_SLUGS } from '@/lib/simulator-redirects';
import { useLanguage } from '@/context/LanguageContext';

const COUNTS = getProcedureCounts();
const HALF = Math.ceil(PROCEDURE_CATEGORIES.length / 2);
const COLUMNS = [PROCEDURE_CATEGORIES.slice(0, HALF), PROCEDURE_CATEGORIES.slice(HALF)];

const CATEGORY_DISPLAY_NAMES: Record<ProcedureCategoryKey, string> = {
  surgical: 'Surgical',
  'non-surgical': 'Non-Surgical',
  injectable: 'Injectable',
  dental: 'Dental',
  'body-contouring': 'Body Contouring',
  'hair-restoration': 'Hair Restoration',
};

type Status = 'live' | 'consult' | 'soon';

function statusOf(procedure: (typeof PROCEDURES)[number]): Status {
  if (CONSULT_ONLY_SLUGS.includes(procedure.slug)) return 'consult';
  if (procedure.comingSoon) return 'soon';
  return 'live';
}

const STATUS_RANK: Record<Status, number> = { live: 0, consult: 1, soon: 2 };

export default function ProcedureExplorer() {
  const { t } = useLanguage();
  const [openKey, setOpenKey] = useState<string>('');

  const statusLabel: Record<Status, string> = {
    live: t('Simulator'),
    consult: t('Consult guide'),
    soon: t('In development'),
  };

  return (
    <section className="bg-[#F3F0EE] py-20 md:py-28 border-t border-black/5 relative">
      <div className="container-master">
        {/* Header matching Screenshot 1 */}
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-normal text-[#141413] tracking-tight leading-[1.15]">
            {COUNTS.live} {t('simulators you can use today.')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#555555] font-normal">
            {COUNTS.total} {t('procedures across')} {COUNTS.categories} {t('categories. Choose a category to see what is live and what is in development.')}
          </p>
        </div>

        {/* Two-Column Category Accordion List */}
        <div className="mt-10 md:mt-14 grid items-start md:grid-cols-2 md:gap-x-12">
          {COLUMNS.map((column, columnIndex) => (
            <ul
              key={columnIndex}
              className={`border-black/5 ${columnIndex === 0 ? 'md:border-b' : 'border-b'}`}
            >
              {column.map((category) => {
                const isOpen = openKey === category.key;
                const bucket = COUNTS.byCategory[category.key];
                const panelId = `catalogue-${category.key}`;
                const items = PROCEDURES.filter((procedure) => procedure.category === category.key).sort(
                  (a, b) => STATUS_RANK[statusOf(a)] - STATUS_RANK[statusOf(b)] || a.order - b.order
                );
                const categoryName = t(CATEGORY_DISPLAY_NAMES[category.key] || category.label);

                return (
                  <li key={category.key} className="border-t border-black/10">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenKey(isOpen ? '' : category.key)}
                      className="flex min-h-14 w-full items-center justify-between gap-4 py-4 md:py-5 text-left transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4500]"
                    >
                      <span className="font-serif text-xl sm:text-2xl font-normal text-[#141413] group-hover:text-[#CF4500] transition-colors">
                        {categoryName}
                      </span>
                      <span className="flex items-center gap-4">
                        <span className="font-serif text-base sm:text-lg text-[#555555] tabular-nums">
                          {bucket.live}/{bucket.total}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-[#CF4500] motion-safe:transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>

                    {/* Collapsible procedures list */}
                    {isOpen && (
                      <ul id={panelId} className="pb-4 space-y-0.5">
                        {items.map((procedure) => {
                          const status = statusOf(procedure);
                          const isLive = status === 'live';
                          const href = isLive
                            ? `/simulate/${procedure.simulateSlug || procedure.slug}`
                            : `/procedures/${procedure.slug}`;

                          return (
                            <li
                              key={procedure.slug}
                              className="flex items-center justify-between gap-3 py-2 border-t border-black/[0.04]"
                            >
                              <Link
                                href={href}
                                className="inline-flex min-h-8 items-center text-sm font-medium text-[#141413] underline decoration-black/15 underline-offset-4 hover:decoration-[#CF4500] hover:text-[#CF4500] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4500]"
                              >
                                {t(procedure.shortName)}
                              </Link>
                              <span
                                className={`shrink-0 text-[11px] font-semibold uppercase tracking-wider ${
                                  isLive ? 'text-[#CF4500]' : 'text-[#696969]'
                                }`}
                              >
                                {statusLabel[status]}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-8 md:mt-10">
          <Link
            href="/procedures"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#CF4500] hover:text-[#B53D00] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4500] focus-visible:ring-offset-2"
          >
            <span>{t('See all procedures')}</span>
            <ArrowRight className="w-4 h-4 text-[#CF4500] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
