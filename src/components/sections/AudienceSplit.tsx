'use client';

import Link from 'next/link';
import { ArrowRight, Stethoscope, Heart } from 'lucide-react';
import { routes } from '@/config/routes';
import { useLanguage } from '@/context/LanguageContext';

export default function AudienceSplit() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: For Surgeons (Stadium 40px Frame) */}
          <div className="bg-[#FCFBFA] p-8 md:p-12 rounded-[40px] border border-black/5 shadow-level-1 flex flex-col justify-between space-y-8 group hover:shadow-level-2 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow-master text-eyebrow-dot">
                  {t('FOR SURGEONS')}
                </span>
                <div className="w-12 h-12 rounded-full bg-white text-[#141413] shadow-level-1 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#141413] font-display">
                {t('Close more consultations with visual certainty.')}
              </h2>

              <p className="text-sm text-[#555555] leading-relaxed">
                {t('Show patients a real-time visual preview of their procedure options during the consultation. Uses any standard iPad or laptop with zero external hardware.')}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href={routes.surgeons}
                className="px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] text-xs font-medium tracking-tight hover:bg-[#262627] transition-all inline-flex items-center gap-2"
              >
                <span>{t('Explore for Surgeons')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: For Patients (Stadium 40px Frame) */}
          <div className="bg-[#FCFBFA] p-8 md:p-12 rounded-[40px] border border-black/5 shadow-level-1 flex flex-col justify-between space-y-8 group hover:shadow-level-2 transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-eyebrow-master text-eyebrow-dot">
                  {t('FOR PATIENTS')}
                </span>
                <div className="w-12 h-12 rounded-full bg-white text-[#141413] shadow-level-1 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#CF4500]" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#141413] font-display">
                {t('See possibilities before making your decision.')}
              </h2>

              <p className="text-sm text-[#555555] leading-relaxed">
                {t('Explore 85+ procedure simulations directly from your phone browser. No app download, and real-time processing runs 100% on your device.')}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href={routes.patients}
                className="px-6 py-2.5 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2"
              >
                <span>{t('Explore for Patients')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
