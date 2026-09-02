'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { faqs } from '@/data/faq';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const featuredFaqs = faqs.slice(0, 6);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
      <div className="container-master">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-4 lg:sticky lg:top-28">
            <span className="text-eyebrow-master text-eyebrow-dot">
              {t('GOT QUESTIONS?')}
            </span>
            <h2 className="text-h2-section text-[#141413]">
              {t('Frequently asked questions.')}
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              {t('Everything you need to know about our browser-native simulation technology, on-device data isolation, and clinic onboarding.')}
            </p>
            <div className="pt-2">
              <Link
                href={routes.faq}
                className="px-6 py-2.5 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#EBE7E3] text-xs font-medium tracking-tight transition-all inline-flex items-center gap-2"
              >
                <span>{t('View All FAQs')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="space-y-3">
            {featuredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className={cn(
                    'rounded-[24px] border border-black/5 transition-all overflow-hidden bg-white shadow-level-1',
                    isOpen && 'shadow-level-2'
                  )}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-sm md:text-base text-[#141413] tracking-[-0.02em]">
                      {t(faq.question)}
                    </span>
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full bg-[#F3F0EE] flex items-center justify-center shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-180 bg-[#141413] text-[#F3F0EE]'
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm text-[#555555] leading-relaxed border-t border-black/5 pt-4">
                          {t(faq.answer)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
