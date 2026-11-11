'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CompareSlider from '@/components/ui/CompareSlider';
import { useLanguage } from '@/context/LanguageContext';

interface ProcedureCase {
  id: 'rhinoplasty' | 'lip-augmentation' | 'blepharoplasty';
  tabLabel: string;
  beforeSrc: string;
  afterSrc: string;
  settings: {
    label: string;
    value: string;
  }[];
  href: string;
}

const PROCEDURES: ProcedureCase[] = [
  {
    id: 'rhinoplasty',
    tabLabel: 'Rhinoplasty',
    beforeSrc: '/images/simulator-output/rhinoplasty-cn-a-before.webp',
    afterSrc: '/images/simulator-output/rhinoplasty-cn-a-after.webp',
    settings: [
      { label: 'Tip Width', value: 'Refined 0.9mm' },
      { label: 'Alar Base Width', value: 'Narrower 1.2mm' },
    ],
    href: '/simulate/rhinoplasty',
  },
  {
    id: 'lip-augmentation',
    tabLabel: 'Lip augmentation',
    beforeSrc: '/images/simulator-output/lip-augmentation-black-c-before.webp',
    afterSrc: '/images/simulator-output/lip-augmentation-black-c-after.webp',
    settings: [
      { label: 'Lip Volume', value: '+70' },
    ],
    href: '/simulate/lip-augmentation',
  },
  {
    id: 'blepharoplasty',
    tabLabel: 'Blepharoplasty',
    beforeSrc: '/images/simulator-output/blepharoplasty-jpwoman62-b-before.webp',
    afterSrc: '/images/simulator-output/blepharoplasty-jpwoman62-b-after.webp',
    settings: [
      { label: 'Eyelid Definition', value: '40%' },
    ],
    href: '/simulate/blepharoplasty',
  },
];

export default function BeforeAfterInteractiveSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rhinoplasty' | 'lip-augmentation' | 'blepharoplasty'>('rhinoplasty');

  const activeProcedure = PROCEDURES.find((p) => p.id === activeTab) || PROCEDURES[0];

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5 relative overflow-hidden">
      <div className="container-master">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Image Slider */}
          <div className="w-full max-w-[480px] mx-auto lg:mx-0">
            <CompareSlider
              key={activeProcedure.id}
              beforeSrc={activeProcedure.beforeSrc}
              afterSrc={activeProcedure.afterSrc}
              beforeAlt={`${activeProcedure.tabLabel} before simulation`}
              afterAlt={`${activeProcedure.tabLabel} simulated outcome`}
              beforeLabel={t('Before')}
              afterLabel={t('Simulated')}
              label={t(`Before and after comparison: drag to reveal ${activeProcedure.tabLabel.toLowerCase()} simulation`)}
              initialPosition={28}
              aspectClassName="aspect-square !rounded-[28px] overflow-hidden shadow-level-1 border border-black/5"
            />
            <p className="mt-3 text-xs text-[#696969] tracking-tight">
              {t('Simulator output on an AI-generated face. Illustrative only.')}
            </p>
          </div>

          {/* Right Column: Heading, Tab Pills, Settings, Simulator Link */}
          <div className="flex flex-col space-y-7 max-w-lg mx-auto lg:mx-0 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-medium tracking-tight text-[#141413] leading-[1.15]">
              {t('Their own face,')}
              <br />
              <span className="font-serif italic font-normal text-[#141413]">
                {t('before and after.')}
              </span>
            </h2>

            {/* Procedure Pill Tabs */}
            <div
              className="inline-flex self-start p-1 rounded-full bg-[#E8E4DF]/80 border border-black/5"
              role="tablist"
              aria-label={t('Procedure comparison options')}
            >
              {PROCEDURES.map((proc) => {
                const isActive = activeTab === proc.id;
                return (
                  <button
                    key={proc.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(proc.id)}
                    className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CF4500] ${
                      isActive
                        ? 'bg-[#CF4500] text-white shadow-sm'
                        : 'text-[#555555] hover:text-[#141413] hover:bg-black/5'
                    }`}
                  >
                    {t(proc.tabLabel)}
                  </button>
                );
              })}
            </div>

            {/* Settings Used */}
            <div className="space-y-4 pt-1">
              <p className="text-xs font-semibold tracking-wider text-[#696969] uppercase">
                {t('Settings used')}
              </p>
              <div className="space-y-3">
                {activeProcedure.settings.map((setting, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm py-1.5 border-b border-black/[0.04] last:border-b-0"
                  >
                    <span className="text-[#555555] font-normal">{t(setting.label)}</span>
                    <span className="font-serif text-base sm:text-lg text-[#141413] font-normal tracking-tight">
                      {setting.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Simulator Link */}
            <div className="pt-2">
              <Link
                href={activeProcedure.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#141413] hover:text-[#CF4500] transition-colors group"
              >
                <span>{t('Open the simulator')}</span>
                <ArrowRight className="w-4 h-4 text-[#CF4500] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

