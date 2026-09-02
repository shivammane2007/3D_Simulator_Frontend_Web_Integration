'use client';

import { Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ComparisonSection() {
  const { t } = useLanguage();

  const competitors = [
    {
      name: 'Faceify Labs',
      tagline: t('Browser-native, no hardware'),
      isFaceify: true,
      features: {
        hardware: '$0 (Uses any phone/iPad)',
        inference: 'On-Device WebGL2',
        procedures: '85+ procedures',
        privacy: 'Zero Data Egress',
        price: '$149 / mo',
      },
    },
    {
      name: 'Crisalix',
      tagline: '3D mobile scanner app',
      isFaceify: false,
      features: {
        hardware: 'Mobile scanner required',
        inference: 'Cloud-Based',
        procedures: 'Limited catalog',
        privacy: 'Cloud uploads',
        price: 'Contact sales',
      },
    },
    {
      name: 'Vectra (Canfield)',
      tagline: 'Dedicated 3D camera hardware',
      isFaceify: false,
      features: {
        hardware: '$25,000+ camera tower',
        inference: 'Dedicated workstation',
        procedures: 'Surgical focus',
        privacy: 'Local server',
        price: '$25k+ + annual fee',
      },
    },
  ];

  const rows = [
    { key: 'hardware' as const, label: t('Hardware Investment') },
    { key: 'inference' as const, label: t('Inference Architecture') },
    { key: 'procedures' as const, label: t('Procedure Library') },
    { key: 'privacy' as const, label: t('Privacy Posture') },
    { key: 'price' as const, label: t('Starting Cost') },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-eyebrow-master text-eyebrow-dot">
            {t('HONEST BENCHMARKING')}
          </span>
          <h2 className="text-h2-section text-[#141413]">
            {t('The surgical simulation market, compared.')}
          </h2>
          <p className="text-sm text-[#555555]">
            {t('Why modern aesthetic clinics are transitioning from five-figure hardware towers to web-native platforms.')}
          </p>
        </div>

        {/* Comparison Stadium Table */}
        <div className="bg-[#FCFBFA] rounded-[40px] border border-black/5 shadow-level-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-black/5 bg-white text-xs font-bold uppercase tracking-wider text-[#696969]">
                  <th className="p-6">{t('Feature')}</th>
                  <th className="p-6 text-[#CF4500] font-extrabold">Faceify Labs</th>
                  <th className="p-6">Crisalix</th>
                  <th className="p-6">Vectra (Canfield)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-xs">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="p-6 font-semibold text-[#141413]">{row.label}</td>
                    <td className="p-6 font-bold text-[#141413]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/5 shadow-level-1 text-[#141413]">
                        <Check className="w-3.5 h-3.5 text-[#CF4500]" />
                        <span>{competitors[0].features[row.key]}</span>
                      </span>
                    </td>
                    <td className="p-6 text-[#555555]">{competitors[1].features[row.key]}</td>
                    <td className="p-6 text-[#555555]">{competitors[2].features[row.key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
