import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { getBlogPost, getAllBlogPosts } from '@/data/blogPosts';
import { routes } from '@/config/routes';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found — Faceify Labs Blog',
    };
  }

  return {
    title: `${post.title} | Faceify Labs Blog | Faceify Labs`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Faceify Labs',
      url: 'https://www.faceifylabs.com',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.faceifylabs.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.faceifylabs.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.faceifylabs.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="bg-[#F3F0EE] min-h-screen text-[#141413]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <div className="container-master max-w-[65ch] mx-auto px-5 pt-32 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#696969]">
          <Link href="/blog" className="hover:text-[#141413] transition-colors font-medium">
            Blog
          </Link>
          <span className="text-[#999999]">/</span>
          <span className="text-[#141413] font-medium line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* Main Article Container */}
      <article className="container-master max-w-[65ch] mx-auto px-5 pb-20">
        {/* Category Pill */}
        <div className="pt-6 mb-5">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#E5E0DA] text-[#555555] border border-black/5">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#141413] tracking-tight leading-[1.2] mb-6 font-normal">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg md:text-xl text-[#555555] leading-relaxed mb-7 font-normal">
          {post.excerpt}
        </p>

        {/* Metadata Divider */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#696969] border-y border-black/10 py-4 mb-10">
          <span className="font-medium text-[#141413]">{post.author.name}</span>
          <span className="text-[#999999]">·</span>
          <span>{formattedDate}</span>
          <span className="text-[#999999]">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#696969]" />
            {post.readingTime} min read
          </span>
        </div>

        {/* Sections Content */}
        <div className="space-y-10">
          {post.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#141413] pt-4 mb-4 leading-snug">
                  {section.heading}
                </h2>
              )}
              {section.body.split('\n\n').map((paragraph, pIdx) => {
                // If paragraph has inline key-value bullet points like "Face detection: ... Simulation rendering: ..."
                // Let's render cleanly with bold prefixes
                const parts = paragraph.split(/(Face detection:|Simulation rendering:|Minimal data egress:|Rhinoplasty:|Blepharoplasty:|Injectables \(Botox & fillers\):|Facelift:)/g);

                if (parts.length > 1) {
                  return (
                    <p key={pIdx} className="text-[#333333] leading-relaxed text-base md:text-lg">
                      {parts.map((part, i) => {
                        if (
                          [
                            'Face detection:',
                            'Simulation rendering:',
                            'Minimal data egress:',
                            'Rhinoplasty:',
                            'Blepharoplasty:',
                            'Injectables (Botox & fillers):',
                            'Facelift:',
                          ].includes(part)
                        ) {
                          return (
                            <strong key={i} className="font-semibold text-[#141413] block sm:inline mt-2 sm:mt-0">
                              {part}{' '}
                            </strong>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </p>
                  );
                }

                return (
                  <p key={pIdx} className="text-[#333333] leading-relaxed text-base md:text-lg">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </section>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-black/10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold tracking-wide uppercase text-[#555555] bg-[#E5E0DA] border border-black/5 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* In-article CTA Section */}
        <section className="bg-[#141413] text-white py-14 px-6 sm:px-10 rounded-[32px] my-16 text-center relative overflow-hidden shadow-level-2">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <p className="text-[11px] font-bold text-[#CF4500] uppercase tracking-widest">Faceify Labs</p>
            <h2 className="text-2xl md:text-3xl font-serif text-white leading-tight font-normal">
              On-device simulation by default.{' '}
              <em className="font-serif text-[#E5DFD7] italic">Zero egress unless you save.</em>
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Every simulation runs entirely within your hardware. No uploads, no server round-trips, no third-party data exposure, ever.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/for-surgeons"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#CF4500] hover:bg-[#B33B00] text-white text-sm font-semibold rounded-full transition-all shadow-level-1 hover:-translate-y-0.5"
              >
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/procedures"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-white/90 hover:bg-white/10 text-sm font-medium rounded-full transition-all"
              >
                Try a Simulator
              </Link>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-6 border-t border-black/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#696969] hover:text-[#141413] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </article>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <Link
          href="/procedures"
          className="inline-flex items-center gap-2 bg-[#CF4500] hover:bg-[#B33B00] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-level-2 transition-all hover:scale-105 active:scale-95"
        >
          Try Simulators
        </Link>
      </div>
    </div>
  );
}

