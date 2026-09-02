'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { pricingPlans } from '@/data/pricing';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

export default function PricingPreview() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-eyebrow-master text-eyebrow-dot">
            TRANSPARENT SUBSCRIPTIONS
          </span>
          <h2 className="text-h2-section text-[#141413]">
            Predictable pricing for practices of any scale.
          </h2>
          <p className="text-sm text-[#555555]">
            No per-procedure surcharge, no scanner hardware leases. Simple monthly or annual subscriptions.
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
              Monthly billing
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
              <span>Annual billing</span>
              <span className={cn(
                'text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider',
                billingCycle === 'annual' ? 'bg-[#CF4500] text-white' : 'bg-[#FDEEE7] text-[#CF4500]'
              )}>
                Save 20%
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
                    {plan.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-medium tracking-tight font-display mb-1">
                    {plan.name}
                  </h3>
                  <p className={cn("text-xs mb-8", plan.highlight ? "text-white/70" : "text-[#555555]")}>
                    {plan.tagline}
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
                      <div className="text-4xl font-medium font-display">Custom</div>
                    )}
                    {isStarter && billingCycle === 'annual' && (
                      <p className="text-[11px] text-[#F37338] font-medium mt-2">
                        Billed annually ($1,428 / yr)
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.slice(0, 6).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs">
                        <Check className={cn("w-4 h-4 shrink-0 mt-0.5", plan.highlight ? "text-[#F37338]" : "text-[#CF4500]")} />
                        <span className={plan.highlight ? "text-white/90" : "text-[#555555]"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.ctaHref}
                  className={cn(
                    'w-full py-3 px-5 rounded-[20px] font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]',
                    plan.highlight
                      ? 'bg-white text-[#141413] hover:bg-[#F3F0EE]'
                      : 'bg-[#141413] text-[#F3F0EE] hover:bg-[#262627]'
                  )}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Founding Partners Banner */}
        <div className="p-8 rounded-[32px] bg-white border border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-level-1">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#CF4500]">
              EXCLUSIVE 2026 COHORT
            </span>
            <h4 className="text-lg font-medium text-[#141413] font-display">
              Applying as a Founding Clinical Partner?
            </h4>
            <p className="text-xs text-[#555555] max-w-xl">
              Lock in lifetime preferred rates and get early access to spatial 3D simulations for Apple Vision Pro &amp; Meta Quest.
            </p>
          </div>
          <Link
            href={routes.foundingPartners}
            className="px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-xs font-medium shrink-0 transition-all inline-flex items-center gap-2"
          >
            <span>Apply for Cohort</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
