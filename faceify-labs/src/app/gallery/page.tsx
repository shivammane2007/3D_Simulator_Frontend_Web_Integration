'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

const galleryCases = [
  {
    id: 'rhino-case-1',
    title: 'Nasal Dorsal & Tip Rotation',
    procedure: 'Rhinoplasty',
    category: 'surgical',
    description: 'Reduction of dorsal hump with 4-degree cranial tip rotation.',
    sliderLabel: 'Rhinoplasty Simulation',
  },
  {
    id: 'vline-case-1',
    title: 'Mandibular Angle Refinement',
    procedure: 'V-Line Contouring',
    category: 'surgical',
    description: 'Parametric lower face tapering preserving natural gonial angle.',
    sliderLabel: 'V-Line Simulation',
  },
  {
    id: 'bleph-case-1',
    title: 'Upper Blepharoplasty & Canthal Elevation',
    procedure: 'Blepharoplasty',
    category: 'surgical',
    description: 'Supratarsal fold definition and +5 degree lateral canthal elevation.',
    sliderLabel: 'Blepharoplasty Simulation',
  },
  {
    id: 'lift-case-1',
    title: 'Midface & Jowl Repositioning',
    procedure: 'Facelift',
    category: 'surgical',
    description: 'Deep plane vector alignment for malar fat pad elevation.',
    sliderLabel: 'Facelift Simulation',
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <Section background="default" className="py-12 md:py-16 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Simulation Case Gallery</Eyebrow>
            <Heading level="h1" size="display">
              Visual planning{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                examples.
              </span>
            </Heading>
            <Prose size="lg">
              Explore how Faceify Labs 468 landmark tracking generates directional simulations for various facial aesthetic goals.
            </Prose>
          </div>
        </Container>
      </Section>

      {/* Cases Grid */}
      <Section background="muted">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {galleryCases.map((c) => (
              <div
                key={c.id}
                className="bg-[var(--surface)] p-6 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-xs space-y-4"
              >
                <BeforeAfterSlider procedureTitle={c.sliderLabel} />

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)]">
                      {c.procedure}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[var(--foreground-subtle)]">
                      Simulated Case
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-display text-[var(--foreground)]">
                    {c.title}
                  </h3>

                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Disclaimer */}
          <div className="mt-12 p-6 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border-strong)] flex items-start gap-3 text-xs text-[var(--foreground-muted)]">
            <ShieldAlert className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> All images displayed in this gallery are directional AI-generated visual simulations created for patient-physician expectation alignment. They are not photographs of actual surgical outcomes. Individual results vary.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
