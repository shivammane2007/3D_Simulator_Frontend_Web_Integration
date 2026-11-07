'use client';

import { useState } from 'react';
import { useTranslations } from '@/i18n/messages';
import type { FacialAnalysisResult } from '@/lib/analyse/types';

type Gender = FacialAnalysisResult['detectedGender'] | 'non-binary';
type Ethnicity = FacialAnalysisResult['selectedEthnicity'];

interface Props {
  detectedGender: FacialAnalysisResult['detectedGender'];
  selectedEthnicity: Ethnicity;
  onGenderChange: (gender: FacialAnalysisResult['detectedGender']) => void;
  onEthnicityChange: (ethnicity: Ethnicity) => void;
}

export default function DemographicsSelector({
  detectedGender,
  selectedEthnicity,
  onGenderChange,
  onEthnicityChange,
}: Props) {
  const t = useTranslations('Analyse');
  const [expanded, setExpanded] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>(detectedGender);
  const [ethnicity, setEthnicity] = useState<Ethnicity>(selectedEthnicity);

  const GENDERS: Array<{ value: Gender; label: string }> = [
    { value: 'female', label: t('genderFemale') },
    { value: 'male', label: t('genderMale') },
    { value: 'non-binary', label: t('genderNonBinary') },
  ];

  const ETHNICITIES: Array<{ value: Ethnicity; label: string }> = [
    { value: 'neutral', label: t('ethnicityNeutral') },
    { value: 'east-asian', label: t('ethnicityEastAsian') },
    { value: 'south-asian', label: t('ethnicitySouthAsian') },
    { value: 'middle-eastern', label: t('ethnicityMiddleEastern') },
    { value: 'african', label: t('ethnicityAfrican') },
    { value: 'caucasian', label: t('ethnicityCaucasian') },
    { value: 'latin', label: t('ethnicityLatin') },
  ];

  const handleGenderSelect = (g: Gender) => {
    setSelectedGender(g);
    // Map non-binary → female for ideal calculations (no specific non-binary ideals)
    onGenderChange(g === 'non-binary' ? 'female' : g);
  };

  const handleEthnicitySelect = (e: Ethnicity) => {
    setEthnicity(e);
    onEthnicityChange(e);
  };

  const detectedLabel = `${detectedGender.charAt(0).toUpperCase() + detectedGender.slice(1)}, ${
    ETHNICITIES.find((e) => e.value === selectedEthnicity)?.label ?? selectedEthnicity
  }`;

  return (
    <div className="mb-6 rounded-2xl border border-[#D8D0C5]/70 bg-white p-4">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="mb-0.5 font-sans text-[10px] uppercase tracking-[0.14em] text-[#8C8480]">
            {t('detectedProfile')}
          </p>
          <p className="font-body text-sm font-medium text-[#2C2C2C]">{detectedLabel}</p>
        </div>
        <span className="font-sans text-xs font-semibold text-[#7C9082] underline underline-offset-2">
          {expanded ? t('close') : t('tapToChange')}
        </span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Gender */}
          <div>
            <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#6C6460]/80">
              {t('genderLabel')}
            </p>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => handleGenderSelect(g.value)}
                  className={`rounded-full border px-3 py-1.5 font-sans text-xs font-semibold transition-colors ${
                    selectedGender === g.value
                      ? 'border-[#7C9082] bg-[#7C9082] text-white'
                      : 'border-[#D8D0C5] bg-white text-[#6C6460] hover:border-[#7C9082]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ethnicity */}
          <div>
            <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#6C6460]/80">
              {t('ethnicityLabel')}
            </p>
            <div className="flex flex-wrap gap-2">
              {ETHNICITIES.map((e) => (
                <button
                  key={e.value}
                  onClick={() => handleEthnicitySelect(e.value)}
                  className={`rounded-full border px-3 py-1.5 font-sans text-xs font-semibold transition-colors ${
                    ethnicity === e.value
                      ? 'border-[#7C9082] bg-[#7C9082] text-white'
                      : 'border-[#D8D0C5] bg-white text-[#6C6460] hover:border-[#7C9082]'
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <p className="font-body text-[10px] text-[#8C8480]">
            {t('demographicsNote')}
          </p>
        </div>
      )}
    </div>
  );
}
