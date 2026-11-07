'use client';

import Link from 'next/link';
import { useTranslations } from '@/i18n/messages';
import type { ProcedureRecommendation } from '@/lib/analyse/types';
import { procedureEducationHref } from '@/lib/analyse/procedure-links';

const CATEGORY_COLORS: Record<ProcedureRecommendation['category'], string> = {
  surgical: 'bg-[#7C9082]/10 text-[#7C9082]',
  'non-surgical': 'bg-[#7C9082]/10 text-[#7C9082]',
  injectable: 'bg-[#B8956A]/12 text-[#B8956A]',
  'body-contouring': 'bg-[#6C6460]/10 text-[#6C6460]',
  'hair-restoration': 'bg-[#B8956A]/15 text-[#8a6d2e]',
};

const CATEGORY_KEYS: Record<ProcedureRecommendation['category'], string> = {
  surgical: 'categorySurgical',
  'non-surgical': 'categoryNonSurgical',
  injectable: 'categoryInjectable',
  'body-contouring': 'categoryBodyContouring',
  'hair-restoration': 'categoryHairRestoration',
};

const PRIORITY_STYLE_CONFIG = {
  high: { headerColor: 'text-[#B05A50]', dividerColor: 'bg-[#B05A50]' },
  medium: { headerColor: 'text-[#7C9082]', dividerColor: 'bg-[#7C9082]' },
  low: { headerColor: 'text-[#8C8480]', dividerColor: 'bg-[#8C8480]' },
};

const PRIORITY_KEYS: Record<keyof typeof PRIORITY_STYLE_CONFIG, string> = {
  high: 'priorityHigh',
  medium: 'priorityMedium',
  low: 'priorityLow',
};

function ImpactBar({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className={`h-2 w-2 rounded-sm ${i < score ? 'bg-[#7C9082]' : 'bg-[#D8D0C5]/60'}`}
        />
      ))}
      <span className="ml-1.5 font-sans text-xs tabular-nums text-[#8C8480]">{score}/10</span>
    </div>
  );
}

function RecommendationCard({ rec, t }: { rec: ProcedureRecommendation; t: (key: string) => string }) {
  return (
    <div className="rounded-2xl border border-[#D8D0C5]/70 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <span
            className={`mb-2 inline-block rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] ${CATEGORY_COLORS[rec.category]}`}
          >
            {t(CATEGORY_KEYS[rec.category])}
          </span>
          <h3 className="font-headline text-lg font-medium text-[#2C2C2C]">
            {rec.procedureNameKey ? t(rec.procedureNameKey) : rec.procedureName}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          {/* estimatedImprovement % removed from UI — kept in data for ranking */}
        </div>
      </div>

      <ImpactBar score={rec.impactScore} />

      {/* Addresses tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {(rec.addressesIssueKeys ?? rec.addressesIssues).map((issue, idx) => (
          <span
            key={idx}
            className="rounded-full bg-[#EDE8E0] px-2 py-0.5 font-sans text-[10px] text-[#6C6460]"
          >
            {rec.addressesIssueKeys ? t(issue) : issue}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {rec.simulatorPath ? (
          <Link
            href={rec.simulatorPath}
            className="inline-flex items-center gap-2 rounded-full bg-[#7C9082] px-4 py-2 font-sans text-xs font-semibold text-white transition-colors hover:bg-[#6A7D70]"
          >
            {t('trySimulator')}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <span className="inline-flex cursor-not-allowed items-center rounded-full bg-[#EDE8E0] px-4 py-2 font-sans text-xs font-semibold text-[#8C8480]">
            {t('comingSoon')}
          </span>
        )}
        {(() => {
          const href = procedureEducationHref(rec.procedureSlug);
          if (!href) return null;
          return (
            <Link
              href={href}
              className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#3d6b5e] underline underline-offset-2 transition-colors hover:text-[#7C9082]"
            >
              {t('learnMore')}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          );
        })()}
      </div>
    </div>
  );
}

interface Props {
  recommendations: ProcedureRecommendation[];
}

export default function TreatmentRecommendations({ recommendations }: Props) {
  const t = useTranslations('Analyse');

  const allGroups: Array<{ priority: ProcedureRecommendation['priority']; items: ProcedureRecommendation[] }> = [
    { priority: 'high' as const, items: recommendations.filter((r) => r.priority === 'high') },
    { priority: 'medium' as const, items: recommendations.filter((r) => r.priority === 'medium') },
    { priority: 'low' as const, items: recommendations.filter((r) => r.priority === 'low') },
  ];
  const groups = allGroups.filter((g) => g.items.length > 0);

  return (
    <div>
      <h2 className="mb-2 font-headline text-2xl font-light text-[#2C2C2C]">
        {t('treatmentTitle')}
      </h2>
      <p className="mb-6 font-body text-sm text-[#8C8480]">
        {t('treatmentSubtitle')}
      </p>

      {recommendations.length === 0 ? (
        <div className="py-12 text-center text-[#8C8480]">
          <p className="font-headline text-lg text-[#2C2C2C]">{t('wellBalanced')}</p>
          <p className="mt-1 font-body text-sm">{t('noRecommendations')}</p>
        </div>
      ) : (
        groups.map(({ priority, items }) => {
          const styleCfg = PRIORITY_STYLE_CONFIG[priority];
          return (
            <div key={priority} className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${styleCfg.dividerColor}`} />
                <h3 className={`font-sans text-sm font-bold uppercase tracking-[0.14em] ${styleCfg.headerColor}`}>
                  {t(PRIORITY_KEYS[priority])}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {items.map((rec) => (
                  <RecommendationCard key={rec.procedureSlug} rec={rec} t={t} />
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Medical disclaimer */}
      <div className="mt-8 rounded-xl border border-[#D8D0C5]/70 bg-[#EDE8E0] p-4">
        <p className="font-body text-[11px] leading-relaxed text-[#8C8480]">
          <strong className="text-[#6C6460]">{t('disclaimerLabel')}</strong> {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}
