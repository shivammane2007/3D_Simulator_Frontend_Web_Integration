'use client';

import Link from 'next/link';
import { MessageCircle, ShieldCheck, Award, ArrowUpRight, Globe } from 'lucide-react';
import { footerNav } from '@/data/navigation';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#141413] text-[#F3F0EE] pt-20 pb-16 border-t border-white/10">
      <div className="container-master">
        {/* Large Conversational Headline as per DESIGN.md */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className="text-eyebrow-master text-eyebrow-dot text-white/60">
            {t('CONNECT WITH FACEIFY')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white font-display">
            {t("We're always here when you need us.")}
          </h2>
          <p className="text-sm text-white/70 leading-relaxed max-w-xl">
            {t('Empowering aesthetic surgeons and patients worldwide with privacy-first visual planning tools.')}
          </p>
        </div>

        {/* 4-Column Link Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 pb-16">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-5">
              • {t('Product')}
            </h3>
            <ul className="space-y-3">
              {footerNav.product.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-5">
              • {t('Explore')}
            </h3>
            <ul className="space-y-3">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-5">
              • {t('Company')}
            </h3>
            <ul className="space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-5">
              • {t('Need Help?')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={routes.external.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{t('WhatsApp Priority')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={routes.external.emailCeo}
                  className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{siteConfig.email.ceo}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={routes.external.emailPartners}
                  className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>{siteConfig.email.partners}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 1px White-at-Opacity Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-white/60">
          <div>
            <p>{siteConfig.copyright}</p>
            <p className="mt-0.5 opacity-60">{siteConfig.legalName} • Operating as Faceify Labs.</p>
          </div>

          {/* Legal Links & Pill Selectors */}
          <div className="flex flex-wrap items-center gap-4">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                {t(item.label)}
              </Link>
            ))}

            {/* Social Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-white/40 leading-relaxed max-w-4xl">
          {siteConfig.compliance.medicalDisclaimer} Faceify Labs is an educational visual planning tool and not regulated as a medical device. Previews are directional approximations.
        </div>
      </div>
    </footer>
  );
}
