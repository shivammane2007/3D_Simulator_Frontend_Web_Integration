import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/components/layout/Container';
import { Eyebrow, Heading, Prose } from '@/components/ui/Typography';
import { routes } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Blog & Clinical Insights — Faceify Labs',
  description:
    'Research, technical engineering articles, and clinical perspectives on browser-native AI facial simulation and medical imaging.',
};

const articles = [
  {
    slug: 'browser-native-inference-medical-privacy',
    title: 'Why Zero Data Egress Architecture is the Future of Clinical Software',
    date: 'February 2026',
    readTime: '5 min read',
    category: 'Engineering & Privacy',
    excerpt:
      'How WebGL2 shaders and quantized client-side models enable high-fidelity 3D simulation without transferring patient photos across cloud networks.',
  },
  {
    slug: 'anatomical-constraints-in-rhinoplasty-simulation',
    title: 'The Role of Anatomical Clamps in Rhinoplasty Previews',
    date: 'January 2026',
    readTime: '6 min read',
    category: 'Clinical Methodology',
    excerpt:
      'Why unconstrained 2D image warping creates unrealistic patient expectations, and how 468-point 3D landmark constraints solve the consultation alignment problem.',
  },
  {
    slug: 'nvidia-inception-gpu-acceleration-web',
    title: 'Accelerating Facial Landmark Triangulation on Mobile GPUs',
    date: 'December 2025',
    readTime: '4 min read',
    category: 'GPU Performance',
    excerpt:
      'A deep dive into sub-millimeter RMSD precision tracking across modern Safari and Chrome mobile graphics pipelines.',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-8 pb-20">
      {/* Header */}
      <Section background="default" className="py-16 md:py-24 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow>Insights &amp; Engineering</Eyebrow>
            <Heading level="h1" size="display">
              Clinical insights and{' '}
              <span className="italic" style={{ color: 'var(--accent)' }}>
                technology breakthroughs.
              </span>
            </Heading>
            <Prose size="lg">
              Explore engineering deep-dives, clinical adoption studies, and the technology powering on-device facial simulation.
            </Prose>
          </div>
        </Container>
      </Section>

      {/* Articles Grid */}
      <Section background="muted">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.slug}
                className="bg-[var(--surface)] p-8 rounded-[var(--radius-2xl)] border border-[var(--border)] shadow-xs flex flex-col justify-between hover:border-[var(--accent-subtle)] hover:shadow-md transition-all group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)]">
                    {art.category}
                  </span>

                  <h3 className="text-lg font-bold font-display text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--foreground-subtle)]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold text-[var(--accent)]">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
