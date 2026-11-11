'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

export default function StickyCardsSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.spotlight-card');
      if (cards.length === 0) return;

      cards.forEach((card, i) => {
        const depth = cards.length - 1 - i;
        if (!depth) return;

        const pin = () => getComputedStyle(card).top;
        const lastCard = cards[cards.length - 1];

        const st = {
          trigger: card,
          start: () => `top ${pin()}`,
          endTrigger: lastCard,
          end: () => `top ${pin()}`,
          scrub: true,
          invalidateOnRefresh: true,
        };

        gsap.to(card, {
          scale: 1 - 0.08 * depth,
          y: -18 * depth,
          ease: 'none',
          scrollTrigger: { ...st },
        });

        const face = card.querySelector('.spotlight-face');
        if (face) {
          gsap.to(face, {
            opacity: 0,
            ease: 'none',
            scrollTrigger: { ...st },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F3F0EE] py-20 md:py-28 overflow-visible border-b border-black/5"
      aria-label="Consultation process walkthrough"
    >
      <div className="container-master max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left Column: Stack of Sticky Cards */}
        <div className="flex flex-col gap-3.5 order-2 lg:order-1 spotlight-track">
          {/* Card 01 */}
          <div className="spotlight-card sticky top-[clamp(6rem,13vh,8.5rem)] origin-top h-[clamp(220px,32vh,320px)] bg-[#FCFBFA] border-[1.5px] border-[#D5D0C7] rounded-2xl shadow-level-1 overflow-hidden transition-shadow">
            <div className="spotlight-face flex flex-col justify-between h-full p-7">
              <div>
                <p className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight max-w-[16ch]">
                  {t('Capture a consultation photo')}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#555555] font-normal leading-relaxed max-w-[28ch]">
                  {t('Take a front or profile photo on any phone, iPad, or laptop in the room.')}
                </p>
              </div>
              <span className="self-end font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#CF4500] leading-none tabular-nums">
                01
              </span>
            </div>
          </div>

          {/* Card 02 */}
          <div className="spotlight-card sticky top-[clamp(6rem,13vh,8.5rem)] origin-top h-[clamp(220px,32vh,320px)] bg-[#FCFBFA] border-[1.5px] border-[#D5D0C7] rounded-2xl shadow-level-1 overflow-hidden transition-shadow">
            <div className="spotlight-face flex flex-col justify-between h-full p-7">
              <div>
                <p className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight max-w-[16ch]">
                  {t('Map 468 anatomical landmarks')}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#555555] font-normal leading-relaxed max-w-[28ch]">
                  {t('Browser-native AI locates facial planes and structural contours with zero server latency.')}
                </p>
              </div>
              <span className="self-end font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#CF4500] leading-none tabular-nums">
                02
              </span>
            </div>
          </div>

          {/* Card 03 */}
          <div className="spotlight-card sticky top-[clamp(6rem,13vh,8.5rem)] origin-top h-[clamp(220px,32vh,320px)] bg-[#FCFBFA] border-[1.5px] border-[#D5D0C7] rounded-2xl shadow-level-1 overflow-hidden transition-shadow">
            <div className="spotlight-face flex flex-col justify-between h-full p-7">
              <div>
                <p className="text-xl sm:text-2xl font-medium text-[#141413] tracking-tight max-w-[16ch]">
                  {t('Adjust surgical vectors live')}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#555555] font-normal leading-relaxed max-w-[28ch]">
                  {t('Fine-tune tip rotation, dorsal height, and soft-tissue compression side-by-side with the patient.')}
                </p>
              </div>
              <span className="self-end font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#CF4500] leading-none tabular-nums">
                03
              </span>
            </div>
          </div>

          {/* Card 04 - Signature Signal Orange Accent Card */}
          <Link
            href="/simulate/rhinoplasty"
            className="spotlight-card sticky top-[clamp(6rem,13vh,8.5rem)] origin-top h-[clamp(220px,32vh,320px)] bg-[#CF4500] border-[1.5px] border-[#CF4500] rounded-2xl shadow-level-2 overflow-hidden block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#CF4500]"
          >
            <div className="spotlight-face flex flex-col justify-between h-full p-7">
              <div>
                <p className="text-xl sm:text-2xl font-medium text-white tracking-tight max-w-[16ch]">
                  {t('Close with visual certainty')}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-white/85 font-normal leading-relaxed max-w-[28ch]">
                  {t('Align patient expectations and agree on a photorealistic preview before surgery.')}
                </p>
              </div>
              <span className="self-end flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#CF4500] shadow-sm group-hover:scale-110 group-hover:bg-[#F3F0EE] transition-all">
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
          </Link>
        </div>

        {/* Right Column: Sticky Headline aligned with the theme */}
        <div className="lg:sticky lg:top-[clamp(7.5rem,15vh,10.5rem)] lg:text-right order-1 lg:order-2 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#141413] leading-[1.08] font-display">
            {t('From photo to plan in')}
            <br />
            <span className="font-serif italic font-normal text-[#CF4500]">
              {t('four quick steps.')}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed max-w-md lg:ml-auto">
            {t('Real-time photorealistic outcome simulation designed for the surgical consultation room — 100% browser-native.')}
          </p>
        </div>
      </div>
    </section>
  );
}
