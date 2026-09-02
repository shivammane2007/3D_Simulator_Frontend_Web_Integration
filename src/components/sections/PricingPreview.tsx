'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { pricingPlans } from '@/data/pricing';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function PricingPreview() {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-eyebrow-master text-eyebrow-dot">
            {t('TRANSPARENT SUBSCRIPTIONS')}
          </span>
          <h2 className="text-h2-section text-[#141413]">
            {t('Predictable pricing for practices of any scale.')}
          </h2>
          <p className="text-sm text-[#555555]">
            {t('No per-procedure surcharge, no scanner hardware leases. Simple monthly or annual subscriptions.')}
          </p>

          {/* Toggle Pills (20px radius) */}
          <div className="mt-8 inline-flex items-center gap-2 p-1 rounded-full bg-white border border-black/5 shadow-level-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer',
                billingCycle === 'monthly'
                  ? 'bg-[#141413] text-[#F3F0EE]'
                  : 'text-[#555555] hover:text-[#141413]'
              )}
            >
              {t('Monthly billing')}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                'px-5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 cursor-pointer',
                billingCycle === 'annual'
                  ? 'bg-[#141413] text-[#F3F0EE]'
                  : 'text-[#555555] hover:text-[#141413]'
              )}
            >
              <span>{t('Annual billing')}</span>
              <span className={cn(
                'text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider',
                billingCycle === 'annual' ? 'bg-[#CF4500] text-white' : 'bg-[#FDEEE7] text-[#CF4500]'
              )}>
                {t('Save 20%')}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (40px Stadium Frame for highlighted, 32px for standard) */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-14">
          {pricingPlans.map((plan) => {
            const isStarter = plan.id === 'starter';
            const price = isStarter
              ? (billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice)
              : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={cn(
                  'rounded-[40px] p-8 md:p-10 flex flex-col justify-between transition-all relative',
                  plan.highlight
                    ? 'bg-[#141413] text-white shadow-level-2 md:-translate-y-2'
                    : 'bg-[#FCFBFA] text-[#141413] border border-black/5 shadow-level-1 hover:shadow-level-2'
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#CF4500] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
                    {t(plan.badge)}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-medium tracking-tight font-display mb-1">
                    {t(plan.name)}
                  </h3>
                  <p className={cn("text-xs mb-8", plan.highlight ? "text-white/70" : "text-[#555555]")}>
                    {t(plan.tagline)}
                  </p>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-inherit/15">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-medium tracking-tight font-display">
                          ${price}
                        </span>
                        <span className={cn("text-xs", plan.highlight ? "text-white/60" : "text-[#696969]")}>
                          / month
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl font-medium tracking-tight font-display">
                        Custom
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", plan.highlight ? "text-[#F37338]" : "text-[#CF4500]")} />
                        <span className={plan.highlight ? "text-white/90" : "text-[#141413]"}>
                          {t(feature)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.ctaHref}
                  className={cn(
                    'w-full py-3 rounded-[20px] text-xs font-medium tracking-tight text-center transition-all inline-flex items-center justify-center gap-2',
                    plan.highlight
                      ? 'bg-white text-[#141413] hover:bg-[#F3F0EE]'
                      : 'bg-[#141413] text-[#F3F0EE] hover:bg-[#262627]'
                  )}
                >
                  <span>{t(plan.ctaText)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
