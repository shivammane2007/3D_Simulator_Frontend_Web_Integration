'use client';

import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function MetricsSection() {
  const { t } = useLanguage();

  const metrics = [
    {
      value: siteConfig.metrics.consultTimeReduction,
      label: t('LESS CONSULT TIME'),
      description: t('Patients arrive visually aligned before examination starts.'),
    },
    {
      value: siteConfig.metrics.conversionConfidence,
      label: t('CONVERSION CONFIDENCE'),
      description: t('Have informed visual discussions during the consultation in the room.'),
    },
    {
      value: siteConfig.metrics.feeIncrease,
      label: t('HIGHER CONSULTATION FEES'),
      description: t('Practices utilizing simulation command premium consultation rates.'),
    },
    {
      value: '0',
      label: t('SERVER HOPS'),
      description: t('100% on-device WebGL2 neural inference with zero cloud latency.'),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE]">
      <div className="container-master">
        {/* Stadium Dark Frame (40px radius) */}
        <div className="bg-[#141413] text-white rounded-[40px] p-10 md:p-16 shadow-level-2 space-y-12">
          {/* Header */}
          <div className="max-w-2xl space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot text-white/60">
              {t('PRACTICE ECONOMICS')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white font-display">
              {t('Clinical outcomes validated in daily consultations.')}
            </h2>
          </div>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, i) => (
              <div key={i} className="space-y-2 border-l border-white/15 pl-6">
                <div className="text-4xl sm:text-5xl font-medium tracking-tight text-white font-display">
                  {metric.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#F37338]">
                  {metric.label}
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial Quote */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <blockquote className="text-base sm:text-lg italic font-normal text-white/90">
              {t('“This transformed how we communicate surgical possibilities in our clinic.”')}
            </blockquote>
            <span className="text-xs text-white/50 uppercase tracking-wider whitespace-nowrap">
              {t('PLASTIC SURGEON • BANGKOK PARTNER CLINIC')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
