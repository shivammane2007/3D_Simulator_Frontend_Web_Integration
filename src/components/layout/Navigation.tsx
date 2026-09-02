'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, ArrowRight, Globe, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routes } from '@/config/routes';
import { mainNav, type NavDropdown } from '@/data/navigation';

import { useLanguage, languages } from '@/context/LanguageContext';

function isDropdown(item: (typeof mainNav)[0]): item is NavDropdown & { isDropdown: true } {
  return 'isDropdown' in item && item.isDropdown === true;
}

export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const navContainerRef = useRef<HTMLDivElement>(null);
  const langContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 16);

      if (currentScrollY <= 20) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 5) {
        // Scrolling up -> show navbar
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!visible) {
      setActiveDropdown(null);
      setLangOpen(false);
    }
  }, [visible]);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (langContainerRef.current && !langContainerRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-2.5 focus:bg-[#141413] focus:text-[#F3F0EE] focus:rounded-[20px] focus:text-xs focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Floating Nav Pill Container */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: visible || mobileOpen ? 0 : -120 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 pointer-events-none flex justify-center px-4"
      >
        <div className="w-full max-w-6xl flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
          {/* Logo Mark (Outside Left) */}
          <div className="flex justify-start">
            <Link
              href={routes.home}
              aria-label="Faceify Labs homepage"
              className="flex items-center gap-2 group shrink-0 pointer-events-auto pl-2 sm:pl-4"
            >
              <img src="/logo-light.svg" alt="Faceify Labs Logo" className="h-16 sm:h-[76px] w-auto transition-transform group-hover:scale-105" />
            </Link>
          </div>

          <nav
            ref={navContainerRef}
            className={cn(
              'pointer-events-auto bg-white/95 backdrop-blur-md rounded-full border border-black/5 shadow-level-1 transition-all duration-200 px-4 sm:px-7 py-2.5 flex items-center gap-4',
              scrolled && 'shadow-level-2 bg-white'
            )}
            aria-label="Main navigation"
          >

            {/* Desktop Center Links */}
            <div className="hidden lg:flex items-center gap-6">
              {mainNav.map((item) => {
                if (isDropdown(item)) {
                  const isOpen = activeDropdown === item.label;
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className={cn(
                          'flex items-center gap-1 py-1.5 text-sm font-medium tracking-[-0.02em] text-[#141413] hover:text-[#CF4500] transition-colors cursor-pointer',
                          isOpen && 'text-[#CF4500]'
                        )}
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                      >
                        <span>{t(item.label)}</span>
                        <ChevronDown
                          className={cn('w-3.5 h-3.5 transition-transform duration-200', isOpen && 'rotate-180')}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.96 }}
                            transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[210px] bg-white rounded-[24px] shadow-level-2 border border-black/5 p-2.5 space-y-0.5 z-50"
                            role="menu"
                          >
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.label + subItem.href}
                                href={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                role="menuitem"
                                className={cn(
                                  'flex flex-col gap-0.5 px-4 py-2.5 rounded-[16px] transition-colors group hover:bg-[#F3F0EE]',
                                  pathname === subItem.href && 'bg-[#F3F0EE]'
                                )}
                              >
                                <span className="text-sm font-medium text-[#141413] group-hover:text-[#CF4500] transition-colors">
                                  {t(subItem.label)}
                                </span>
                                {subItem.description && (
                                  <span className="text-[11px] text-[#696969] leading-tight">
                                    {t(subItem.description)}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'py-1.5 text-sm font-medium tracking-[-0.02em] text-[#141413] hover:text-[#CF4500] transition-colors',
                      pathname === item.href && 'text-[#CF4500]'
                    )}
                  >
                    {t(item.label)}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-[#F3F0EE] text-[#141413] transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Desktop Right CTA (Outside Right) */}
          <div className="hidden lg:flex items-center justify-end gap-3 pointer-events-auto pr-2 sm:pr-4">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langContainerRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md hover:bg-white text-xs font-bold text-[#141413] border border-black/5 shadow-level-1 transition-all cursor-pointer',
                  langOpen && 'ring-1 ring-black/10'
                )}
              >
                <Globe className="w-3.5 h-3.5 text-[#141413]" />
                <span className="tracking-wide">{language}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
                    className="absolute top-full right-0 mt-2.5 w-40 bg-white rounded-[24px] shadow-level-2 border border-black/5 p-2 space-y-0.5 z-50"
                    role="listbox"
                  >
                    {languages.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangOpen(false);
                          }}
                          role="option"
                          aria-selected={isSelected}
                          className={cn(
                            'w-full flex items-center justify-between px-3.5 py-2 rounded-[16px] text-xs transition-colors cursor-pointer text-left',
                            isSelected
                              ? 'bg-[#F3F0EE] font-bold text-[#141413]'
                              : 'text-[#141413] hover:bg-[#F3F0EE]'
                          )}
                        >
                          <span className={cn(isSelected ? 'font-bold' : 'font-medium')}>{lang.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5] text-[#141413]" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={routes.login}
              className="text-xs font-medium text-[#141413] hover:text-[#CF4500] transition-colors px-2"
            >
              {t('Sign In')}
            </Link>
            <Link
              href={routes.simulate}
              className="px-5 py-2.5 bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] text-xs font-medium rounded-[20px] shadow-sm transition-all inline-flex items-center gap-1.5"
            >
              <span>{t('Try Your Face')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#F3F0EE] flex flex-col pt-24 px-6 overflow-y-auto"
            aria-modal="true"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto w-full py-6">
              {mainNav.map((item) => {
                if (isDropdown(item)) {
                  return (
                    <div key={item.label} className="border-b border-black/5 pb-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#696969] px-3 py-2">
                        {t(item.label)}
                      </div>
                      <div className="flex flex-col gap-1 pl-3">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="py-2 text-base font-medium text-[#141413]"
                          >
                            {t(sub.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-3 px-3 text-lg font-medium text-[#141413] border-b border-black/5"
                  >
                    {t(item.label)}
                  </Link>
                );
              })}

              {/* Mobile Language Selector */}
              <div className="py-3 border-b border-black/5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#696969] px-3 py-1.5 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{t('Language')}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 px-3 pt-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-[16px] text-xs transition-colors cursor-pointer',
                        language === lang.code
                          ? 'bg-[#141413] text-[#F3F0EE] font-bold'
                          : 'bg-white border border-black/5 text-[#141413]'
                      )}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-3">
                <Link
                  href={routes.simulate}
                  className="w-full py-3.5 bg-[#141413] text-[#F3F0EE] text-center font-medium rounded-[20px] text-sm"
                >
                  {t('Try Your Face')}
                </Link>
                <Link
                  href={routes.login}
                  className="w-full py-3.5 bg-white text-[#141413] border border-black/10 text-center font-medium rounded-[20px] text-sm"
                >
                  {t('Sign In')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for floating top header */}
      <div className="h-20 md:h-24" aria-hidden="true" />
    </>
  );
}
