'use client';

import Link from 'next/link';
import { Cpu, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function TechnologySection() {
  const { t } = useLanguage();

  const techFeatures = [
    {
      icon: <Zap className="w-5 h-5 text-[#CF4500]" />,
      title: t('468-Point Facial Mesh'),
      description: t('Continuous landmark tracking maps full anatomical geometry with 0.04mm RMSD sub-millimeter precision.'),
      metric: '0.04mm',
      metricLabel: t('RMSD Precision'),
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#CF4500]" />,
      title: t('Real-Time Browser Inference'),
      description: t('All neural networks compile down to WebGL2 fragment shaders running on your local device GPU.'),
      metric: '<200ms',
      metricLabel: t('Render Latency'),
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#CF4500]" />,
      title: t('Zero Data Egress Architecture'),
      description: t('Facial photos never transmit across remote server networks during real-time simulation.'),
      metric: '0',
      metricLabel: t('Server Roundtrips'),
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div className="space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              {t('ENGINEERING & ARCHITECTURE')}
            </span>
            <h2 className="text-h2-section text-[#141413]">
              {t('468 landmarks. 0 server hops.')}
            </h2>
          </div>
          <div>
            <p className="text-sm text-[#555555] leading-relaxed">
              {t('Every simulation is powered by client-side WebGL2 neural shaders executing in browser memory. No cloud upload bottlenecks.')}
            </p>
          </div>
        </div>

        {/* 3 Stadium Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {techFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-[#FCFBFA] rounded-[32px] p-8 border border-black/5 shadow-level-1 flex flex-col justify-between space-y-6 hover:shadow-level-2 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-level-1 flex items-center justify-center">
                  {feat.icon}
                </div>
                <h3 className="text-h3-card text-[#141413]">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-baseline gap-2">
                <span className="text-3xl font-medium tracking-tight text-[#141413] font-display">
                  {feat.metric}
                </span>
                <span className="text-xs text-[#696969] font-medium">{feat.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* NVIDIA Inception Strip */}
        <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-level-1 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#76b900] flex items-center justify-center text-white text-xs font-black">
              N
            </div>
            <div>
              <span className="text-xs font-bold text-[#141413] block">
                {t('NVIDIA Inception Program Member')}
              </span>
              <span className="text-[11px] text-[#696969]">
                {t('Accelerating medical graphics and on-device neural rendering.')}
              </span>
            </div>
          </div>

          <Link
            href={routes.technology}
            className="px-5 py-2 rounded-[20px] bg-[#141413] text-[#F3F0EE] text-xs font-medium tracking-tight hover:bg-[#262627] transition-all inline-flex items-center gap-1.5 shrink-0"
          >
            <span>{t('Read Architecture Paper')}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
