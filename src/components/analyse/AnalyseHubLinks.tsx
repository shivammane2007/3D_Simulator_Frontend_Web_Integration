'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from '@/i18n/messages';
import { Sparkles } from 'lucide-react';

/**
 * Rendered below FaceAnalyser on the /analyse hub page.
 * Lists sibling analysers so users can discover them.
 * Keep this component purely presentational — no state, no side-effects.
 */
export function AnalyseHubLinks() {
  const t = useTranslations('Analyse');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-20">
      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-[#EDE8E0]" />
        <span className="text-xs font-semibold tracking-widest uppercase text-[#8C8480]">
          {t('moreAnalysersHeading')}
        </span>
        <div className="flex-1 h-px bg-[#EDE8E0]" />
      </div>

      {/* Acne Analyser card */}
      <Link
        href={`${prefix}/analyse/acne`}
        className="group flex items-center gap-4 bg-white border border-[#EDE8E0] rounded-2xl px-5 py-4 shadow-sm hover:border-[#7C9082] hover:shadow-md transition-all"
      >
        {/* Icon badge */}
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#EEF3EF] flex items-center justify-center group-hover:bg-[#7C9082] transition-colors">
          <Sparkles className="w-5 h-5 text-[#7C9082] group-hover:text-white transition-colors" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#2C2C2C] leading-tight">
            {t('acneCardTitle')}
          </p>
          <p className="text-xs text-[#8C8480] mt-0.5 leading-relaxed">
            {t('acneCardDescription')}
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="flex-shrink-0 w-4 h-4 text-[#C0B8AF] group-hover:text-[#7C9082] transition-colors"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
