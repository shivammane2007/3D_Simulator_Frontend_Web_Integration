import type { Metadata } from 'next';
import { USE_CASES } from '@/data/use-cases';
import Link from 'next/link';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { getTranslations } from '@/i18n/messages';

export const metadata: Metadata = {
  title: 'Use Cases: How Surgeons Use Faceify Labs | Faceify Labs',
  description:
    'Deep-dive guides on how plastic surgeons integrate AI simulation into rhinoplasty consultations, medical tourism workflows, multi-procedure planning, and practice conversion strategy.',
  openGraph: {
    title: 'Use Cases | Faceify Labs',
    description:
      'How plastic surgeons in Bangkok, Seoul, and beyond integrate AI simulation into their workflows to increase conversions and reduce revision rates.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Faceify Labs: AI Surgical Simulation Platform',
      },
    ],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  workflow: 'bg-[#CF4500]/10 text-[#CF4500]',
  conversion: 'bg-[#FDF3E7] text-[#9A6428]',
  apac: 'bg-blue-50 text-blue-700',
  privacy: 'bg-slate-100 text-slate-600',
};

export default async function UseCasesIndexPage() {
  const [t, tCats] = await Promise.all([
    getTranslations('UseCases'),
    getTranslations('useCaseCategories'),
  ]);

  return (
    <div className="min-h-screen bg-warm font-body">
      {/* Hero */}
      <section className="pt-32 pb-16 border-b border-slate-200">
        <div className="container mx-auto px-5 md:px-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#CF4500] mb-4">
            {t('heroEyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-body font-semibold text-ink mb-5 leading-tight">
            {t('heroHeadingLine1')}<br />
            <em className="font-serif italic not-italic text-[#CF4500]">{t('heroHeadingBrand')}</em>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {t('heroDescription')}
          </p>
        </div>
      </section>

      {/* Use case grid */}
      <section className="py-16">
        <div className="container mx-auto px-5 md:px-8 max-w-4xl">
          <div className="space-y-6">
            {USE_CASES.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className="group block bg-white rounded-2xl border border-slate-200 p-7 hover:-translate-y-0.5 hover:shadow-md hover:border-[#CF4500]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-[0.65rem] font-semibold tracking-wider uppercase rounded-full ${
                          CATEGORY_COLORS[uc.category] ?? 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tCats(uc.category)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <Clock className="w-3 h-3" />
                        {uc.readTime} {t('minRead')}
                      </span>
                    </div>
                    <h2 className="text-xl font-body font-semibold text-ink group-hover:text-[#CF4500] transition-colors mb-2 leading-snug">
                      {uc.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {uc.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Users className="w-3 h-3" />
                      <span>{uc.targetAudience}</span>
                    </div>
                  </div>
                  <div className="shrink-0 mt-1">
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#CF4500] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>

                {/* Key stats strip */}
                <div className="mt-6 pt-5 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {uc.keyStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-lg font-semibold text-ink">{stat.value}</p>
                      <p className="text-[0.7rem] text-slate-600 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-5 md:px-8 max-w-4xl text-center">
          <h2 className="text-2xl font-body font-semibold text-ink mb-3">
            {t('ctaHeading')}
          </h2>
          <p className="text-slate-500 text-sm mb-7 max-w-lg mx-auto">
            {t('ctaDescription')}
          </p>
          <Link
            href="/simulate"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white text-sm font-semibold rounded-full hover:bg-ink/90 transition-all shadow-sm"
          >
            {t('ctaButton')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
