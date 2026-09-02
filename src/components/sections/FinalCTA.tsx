'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { routes } from '@/config/routes';
import { useLanguage } from '@/context/LanguageContext';

export default function FinalCTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        {/* 40px Stadium Dark Card */}
        <div className="bg-[#141413] text-white rounded-[40px] p-10 md:p-20 text-center shadow-level-2 relative overflow-hidden">
          {/* Subtle Orange Radial Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-[#CF4500]"
            aria-hidden="true"
          />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-eyebrow-master text-eyebrow-dot text-white/60">
              {t('EXPERIENCE THE PREVIEW')}
            </span>

            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white font-display text-balance">
              {t('Empower your consultations with visual certainty.')}
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto font-normal">
              {t('Test 85+ procedure simulations directly in your web browser. 468 landmark tracking precision with zero software installation.')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href={routes.simulate}
                className="px-8 py-3.5 bg-white text-[#141413] hover:bg-[#F3F0EE] text-sm font-medium rounded-[20px] shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>{t('Try Your Face')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href={routes.consultation}
                className="px-8 py-3.5 bg-transparent text-white border border-white/30 hover:bg-white/10 text-sm font-medium rounded-[20px] transition-all inline-flex items-center gap-2"
              >
                <span>{t('Book Practice Demo')}</span>
              </Link>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
              <span>{t('• 100% On-Device Processing')}</span>
              <span>{t('• No Hardware Required')}</span>
              <span>{t('• Mobile & iPad Optimized')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
