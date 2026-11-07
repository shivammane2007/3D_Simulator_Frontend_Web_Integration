import type { Metadata } from 'next';
import { Tag } from 'lucide-react';
import { getTranslations } from '@/i18n/messages';

export const metadata: Metadata = {
  title: 'Clinic Deals & Offers | Faceify Labs',
  description:
    'Browse exclusive clinic deals from verified surgeons across Bangkok, Seoul, Singapore, Mumbai and more. Save on rhinoplasty, Botox, fillers, and 85+ cosmetic procedures.',
  openGraph: {
    title: 'Clinic Deals & Offers | Faceify Labs',
    description:
      'Exclusive deals from verified clinics on rhinoplasty, Botox, fillers and more across APAC.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Faceify Labs — AI Surgical Simulation Platform',
      },
    ],
  },
};

interface DealsPageProps {
  searchParams?: Promise<{ procedure?: string }>;
}

export default async function DealsPage({ searchParams }: DealsPageProps) {
  const t = await getTranslations('Deals');
  const params = searchParams ? await searchParams : {};
  const procedureSlug = params.procedure;

  return (
    <div className="bg-warm min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 sm:py-32 font-body">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Tag Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-[#CF4500]/10 border border-[#CF4500]/20 flex items-center justify-center mb-6 text-[#CF4500] shadow-xs">
          <Tag className="w-7 h-7 stroke-[1.75]" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ink tracking-tight font-normal mb-4">
          {t('flagOffTitle') || 'Clinic deals are coming soon'}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {t('flagOffDesc') ||
            "We're finalising clinic partnerships across Asia-Pacific. Check back here for exclusive offers on rhinoplasty, injectables, and more."}
        </p>
      </div>
    </div>
  );
}

