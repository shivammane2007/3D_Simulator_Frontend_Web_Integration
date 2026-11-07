'use client';

import { useState } from 'react';
import { useTranslations } from '@/i18n/messages';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MetricBar } from '@/components/ui/hud';
import type { FacialAnalysisResult, FacialMeasurement } from '@/lib/analyse/types';

interface RegionGroup {
  label: string;
  measurements: FacialMeasurement[];
}

const SEVERITY_CONFIG = {
  optimal: { color: 'bg-[#7C9082]/10 text-[#7C9082]', bar: '#7C9082' },
  mild: { color: 'bg-[#B8956A]/15 text-[#8a6d2e]', bar: '#B8956A' },
  moderate: { color: 'bg-[#C97B4B]/15 text-[#C97B4B]', bar: '#C97B4B' },
  significant: { color: 'bg-[#B05A50]/12 text-[#B05A50]', bar: '#B05A50' },
};

const SEVERITY_KEYS: Record<keyof typeof SEVERITY_CONFIG, string> = {
  optimal: 'severityOptimal',
  mild: 'severityMild',
  moderate: 'severityModerate',
  significant: 'severitySignificant',
};

// Maps the (stable, English) measurement name to a translation key in the
// Analyse namespace. The descriptive copy itself lives in messages/*.json so it
// is localized across all 5 locales.
const MEASUREMENT_DESC_KEYS: Record<string, string> = {
  'Upper Third': 'measDescUpperThird',
  'Middle Third': 'measDescMiddleThird',
  'Lower Third': 'measDescLowerThird',
  'Nasal Width': 'measDescNasalWidth',
  'Nasolabial Angle': 'measDescNasolabialAngle',
  'Nasal Midline Alignment': 'measDescNasalMidline',
  'Chin Alignment': 'measDescChinAlignment',
  'Tip Projection': 'measDescTipProjection',
  'Lip Ratio (Lower:Upper)': 'measDescLipRatio',
  'Jaw to Cheek Ratio': 'measDescJawToCheek',
  'Chin Projection': 'measDescChinProjection',
  'Eye Spacing': 'measDescEyeSpacing',
  'Cheek Projection': 'measDescCheekProjection',
};

function MeasurementRow({ m, t }: { m: FacialMeasurement; t: (key: string) => string }) {
  const cfg = SEVERITY_CONFIG[m.severity];
  const barWidth = Math.min(100, Math.abs(m.deviation));
  const severityLabel = t(SEVERITY_KEYS[m.severity]);
  const deviationText = `${m.deviationDirection === 'within' ? '±' : m.deviation > 0 ? '+' : ''}${m.deviation.toFixed(1)}%`;

  return (
    <div className="border-b border-[#D8D0C5]/50 py-3 last:border-0">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="font-body text-sm font-medium text-[#2C2C2C]">{m.name}</span>
          {m.unit && (
            <span className="ml-1 font-body text-xs text-[#8C8480]">
              {m.actual.toFixed(m.unit === '°' ? 1 : 2)}{m.unit} / {t('idealLabel')} {m.ideal.toFixed(m.unit === '°' ? 1 : 2)}{m.unit}
            </span>
          )}
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] ${cfg.color}`}>
          {severityLabel}
        </span>
      </div>
      {/* Deviation bar — 1px-track HUD metric */}
      <MetricBar
        label={t('deviationLabel')}
        value={barWidth}
        valueText={deviationText}
        ariaLabel={`${m.name} ${t('deviationLabel')}`}
        color={cfg.bar}
      />
      {/* Description */}
      {MEASUREMENT_DESC_KEYS[m.name] && (
        <p className="mt-2 font-body text-xs leading-relaxed text-[#8C8480]">
          {t(MEASUREMENT_DESC_KEYS[m.name])}
        </p>
      )}
    </div>
  );
}

function RegionSection({ group, t }: { group: RegionGroup; t: (key: string) => string }) {
  const [expanded, setExpanded] = useState(false);
  const worstSeverity = group.measurements.reduce<FacialMeasurement['severity']>(
    (worst, m) => {
      const order = { optimal: 0, mild: 1, moderate: 2, significant: 3 };
      return order[m.severity] > order[worst] ? m.severity : worst;
    },
    'optimal',
  );
  const cfg = SEVERITY_CONFIG[worstSeverity];
  const severityLabel = t(SEVERITY_KEYS[worstSeverity]);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-[#D8D0C5]/70 bg-white shadow-sm">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#EDE8E0]"
      >
        <div className="flex items-center gap-3">
          <span className="font-body font-medium text-[#2C2C2C]">{group.label}</span>
          <span className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] ${cfg.color}`}>
            {severityLabel}
          </span>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-[#8C8480]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#8C8480]" />
        )}
      </button>
      {expanded && (
        <div className="px-5 pb-4">
          {group.measurements.map((m) => (
            <MeasurementRow key={m.name} m={m} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  analysis: FacialAnalysisResult;
}

export default function ProportionAnalysis({ analysis }: Props) {
  const t = useTranslations('Analyse');

  const groups: RegionGroup[] = [
    {
      label: t('regionNose'),
      measurements: [analysis.nasalWidth, analysis.nasolabialAngle, analysis.tipProjection],
    },
    {
      label: t('regionLips'),
      measurements: [analysis.lipRatio],
    },
    {
      label: t('regionJawChin'),
      measurements: [analysis.jawToCheekRatio, analysis.chinProjection],
    },
    {
      label: t('regionEyesBrows'),
      measurements: [analysis.eyeSpacing],
    },
    {
      label: t('regionVerticalBalance'),
      measurements: [analysis.upperThird, analysis.middleThird, analysis.lowerThird],
    },
    {
      label: t('regionMidfaceCheeks'),
      measurements: [analysis.cheekProjection],
    },
  ];

  return (
    <div>
      <h2 className="mb-2 font-headline text-2xl font-light text-[#2C2C2C]">
        {t('proportionTitle')}
      </h2>
      <p className="mb-6 font-body text-sm text-[#8C8480]">
        {t('proportionSubtitle')}
      </p>
      {groups.map((g) => (
        <RegionSection key={g.label} group={g} t={t} />
      ))}
    </div>
  );
}
