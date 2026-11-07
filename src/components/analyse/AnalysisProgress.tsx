'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/i18n/messages';

const STEP_DURATION_MS = 400;

interface Props {
  /**
   * Optional pre-translated step labels. When omitted, the generic facial-
   * geometry steps from the Analyse namespace are used. The acne flow passes
   * its own skin-appropriate steps so the loader never shows face-geometry
   * copy (e.g. "Calculating golden ratios") during a skin assessment.
   */
  steps?: string[];
}

export default function AnalysisProgress({ steps }: Props = {}) {
  const t = useTranslations('Analyse');

  const STEPS = steps ?? [
    t('progressStep1'),
    t('progressStep2'),
    t('progressStep3'),
    t('progressStep4'),
    t('progressStep5'),
    t('progressStep6'),
    t('progressStep7'),
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), STEP_DURATION_MS);
    return () => clearTimeout(timer);
  }, [currentStep, STEPS.length]);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#EDE8E0] px-6 py-16">
      {/* Spinning ring */}
      <div
        className="relative mb-8 h-20 w-20"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={STEPS[currentStep]}
      >
        <svg
          className="h-20 w-20 -rotate-90"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="34" stroke="#d1d5db" strokeOpacity="0.5" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="#7C9082"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 34}`}
            strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-sans text-sm font-bold tabular-nums text-[#7C9082]">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Step label */}
      <p className="mb-6 text-center font-headline text-xl font-light text-[#2C2C2C]">
        {STEPS[currentStep]}
      </p>

      {/* Dot progress indicators */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i <= currentStep ? 'scale-110 bg-[#7C9082]' : 'bg-[#D8D0C5]'
            }`}
          />
        ))}
      </div>

      <p className="mt-6 max-w-xs text-center font-body text-xs text-[#8C8480]">
        {t('progressPrivacy')}
      </p>
    </div>
  );
}
