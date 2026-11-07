import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { USE_CASES, getUseCaseBySlug } from '@/data/use-cases';
import { ArrowLeft, ArrowRight, Clock, Calendar, Users } from 'lucide-react';
import { getTranslations } from '@/i18n/messages';

export function generateStaticParams() {
  return USE_CASES.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);
  if (!uc) return { title: 'Use Case Not Found | Faceify Labs' };

  return {
    title: `${uc.title} | Faceify Labs`,
    description: uc.description,
    openGraph: {
      title: `${uc.title} | Faceify Labs`,
      description: uc.description,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${uc.title} — Faceify Labs`,
        },
      ],
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  workflow: 'bg-[#CF4500]/10 text-[#CF4500]',
  conversion: 'bg-[#FDF3E7] text-[#9A6428]',
  apac: 'bg-blue-50 text-blue-700',
  privacy: 'bg-slate-100 text-slate-600',
};

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uc = getUseCaseBySlug(slug);
  if (!uc) notFound();
  const tCats = await getTranslations('useCaseCategories');

  const pageUrl = `https://www.faceifylabs.com/use-cases/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: uc.title,
    description: uc.description,
    url: pageUrl,
    datePublished: uc.publishedDate,
    dateModified: uc.publishedDate,
    inLanguage: 'en',
    author: {
      '@type': 'Organization',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.faceifylabs.com/logo.svg',
      },
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
    },
  };

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: uc.title,
    description: uc.description,
    url: pageUrl,
    inLanguage: 'en',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Clinician',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Faceify Labs',
      applicationCategory: 'MedicalApplication',
      url: 'https://www.faceifylabs.com',
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: uc.title,
    description: uc.description,
    step: uc.sections.map((section, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: section.heading,
      text: section.body.split('\n\n')[0],
    })),
  };

  const relatedUCs = USE_CASES.filter((u) => uc.relatedUseCases.includes(u.slug));

  return (
    <div className="min-h-screen bg-warm font-body">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Breadcrumb */}
      <div className="container mx-auto px-5 md:px-8 pt-28 pb-0 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-slate-600 font-body">
          <Link href="/use-cases" className="hover:text-ink transition-colors">
            Use Cases
          </Link>
          <span>/</span>
          <span className="text-slate-500 truncate max-w-[300px]">{uc.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <header className="container mx-auto px-5 md:px-8 pt-8 pb-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={`px-3 py-1 text-[0.65rem] font-semibold tracking-wider uppercase rounded-full ${
              CATEGORY_COLORS[uc.category] ?? 'bg-slate-100 text-slate-600'
            }`}
          >
            {tCats(uc.category)}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Clock className="w-3 h-3" />
            {uc.readTime} min read
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-600">
            <Calendar className="w-3 h-3" />
            {new Date(uc.publishedDate).toLocaleDateString('en-GB', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-body font-semibold text-ink mb-4 leading-tight">
          {uc.title}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-5">{uc.subtitle}</p>

        <div className="flex items-start gap-2 text-sm text-slate-600 p-4 bg-white rounded-xl border border-slate-200">
          <Users className="w-4 h-4 shrink-0 mt-0.5 text-[#CF4500]" />
          <span>Written for: {uc.targetAudience}</span>
        </div>
      </header>

      {/* Key Stats */}
      <section className="border-y border-slate-200 bg-white">
        <div className="container mx-auto px-5 md:px-8 py-8 max-w-3xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {uc.keyStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-semibold text-ink">{stat.value}</p>
                <p className="text-xs text-slate-600 mt-0.5 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="container mx-auto px-5 md:px-8 py-14 max-w-3xl">
        <div className="space-y-12">
          {uc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl md:text-2xl font-body font-semibold text-ink mb-4 leading-snug">
                {section.heading}
              </h2>
              {section.body.split('\n\n').map((para, i) => (
                <p key={i} className="text-base text-slate-600 leading-relaxed mb-4 last:mb-0">
                  {para.trim()}
                </p>
              ))}
            </div>
          ))}
        </div>
      </article>

      {/* Related Simulators */}
      {uc.relatedProcedures.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-12">
          <div className="container mx-auto px-5 md:px-8 max-w-3xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-600 mb-6">
              Try the Simulators
            </h2>
            <div className="flex flex-wrap gap-3">
              {uc.relatedProcedures.map((procSlug) => (
                <Link
                  key={procSlug}
                  href={`/simulate/${procSlug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-ink text-sm font-medium rounded-full hover:border-[#CF4500] hover:text-[#CF4500] transition-all"
                >
                  {procSlug
                    .split('-')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Use Cases */}
      {relatedUCs.length > 0 && (
        <section className="border-t border-slate-200 py-12">
          <div className="container mx-auto px-5 md:px-8 max-w-3xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-600 mb-6">
              Related Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedUCs.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/use-cases/${rel.slug}`}
                  className="group block bg-white rounded-xl border border-slate-200 p-5 hover:border-[#CF4500]/40 hover:shadow-sm transition-all duration-300"
                >
                  <span
                    className={`px-2.5 py-0.5 text-[0.6rem] font-semibold tracking-wider uppercase rounded-full ${
                      CATEGORY_COLORS[rel.category] ?? 'bg-slate-100 text-slate-600'
                    } mb-3 inline-block`}
                  >
                    {tCats(rel.category)}
                  </span>
                  <h3 className="text-sm font-semibold text-ink group-hover:text-[#CF4500] transition-colors leading-snug mb-1.5">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {rel.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Band */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="container mx-auto px-5 md:px-8 max-w-3xl text-center">
          <h2 className="text-2xl font-body font-semibold text-ink mb-3">
            Ready to see it in your practice?
          </h2>
          <p className="text-slate-500 text-sm mb-7 max-w-lg mx-auto">
            No hardware, no installation, just open a browser and start simulating.
          </p>
          <Link
            href="/simulate"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white text-sm font-semibold rounded-full hover:bg-ink/90 transition-all shadow-sm"
          >
            Try a Simulation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Back nav */}
      <div className="border-t border-slate-200 py-8">
        <div className="container mx-auto px-5 md:px-8 max-w-3xl">
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All use cases
          </Link>
        </div>
      </div>
    </div>
  );
}

