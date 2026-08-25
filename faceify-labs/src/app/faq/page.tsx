'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { faqs, FAQ } from '@/data/faq';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All Questions' },
  { id: 'general', label: 'General' },
  { id: 'privacy', label: 'Privacy & Security' },
  { id: 'technology', label: 'Technology & ML' },
  { id: 'clinical', label: 'Clinical Accuracy' },
  { id: 'pricing', label: 'Pricing & Plans' },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const filteredFaqs = faqs.filter(
    (f) => selectedCategory === 'all' || f.category === selectedCategory
  );

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <Section background="default" className="py-12 md:py-16 border-b border-[var(--border)]">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Eyebrow className="mb-2">Knowledge Base</Eyebrow>
            <Heading level="h1" size="display">
              Frequently asked questions.
            </Heading>
            <Prose size="lg">
              Find clear answers on how our on-device simulation engine operates, privacy safeguards, and clinic integrations.
            </Prose>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer',
                    selectedCategory === cat.id
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs'
                      : 'bg-[var(--surface)] text-[var(--foreground-muted)] border-[var(--border)] hover:border-[var(--border-strong)]'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Accordion List */}
      <Section background="muted">
        <Container>
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={cn(
                    'rounded-[var(--radius-xl)] border transition-all duration-200 overflow-hidden bg-[var(--surface)]',
                    isOpen
                      ? 'border-[var(--accent-subtle)] shadow-[var(--shadow-sm)]'
                      : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                  )}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm md:text-base text-[var(--foreground)] font-display">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200',
                        isOpen
                          ? 'bg-[var(--accent-soft)] text-[var(--accent)] rotate-180'
                          : 'bg-[var(--surface-muted)] text-[var(--foreground-muted)]'
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
                        transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                      >
                        <div className="px-6 pb-6 text-xs md:text-sm text-[var(--foreground-muted)] leading-relaxed border-t border-[var(--border)] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Need More Help Card */}
          <div className="max-w-3xl mx-auto mt-12 p-8 rounded-[var(--radius-2xl)] bg-[var(--surface)] border border-[var(--border-strong)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h3 className="text-base font-bold font-display text-[var(--foreground)]">
                Have a specific question not listed here?
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] mt-1">
                Reach out directly to our clinical operations team.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={routes.external.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-[var(--accent-soft)] hover:bg-[var(--accent)] text-[var(--accent)] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={routes.external.emailCeo}
                className="px-4 py-2.5 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--border)] text-[var(--foreground)] text-xs font-bold flex items-center gap-1.5 transition-all border border-[var(--border)]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email CEO</span>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
