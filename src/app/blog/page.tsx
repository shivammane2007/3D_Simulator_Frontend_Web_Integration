import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
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
    href: routes.trust,
  },
  {
    slug: 'anatomical-constraints-in-rhinoplasty-simulation',
    title: 'The Role of Anatomical Clamps in Rhinoplasty Previews',
    date: 'January 2026',
    readTime: '6 min read',
    category: 'Clinical Methodology',
    excerpt:
      'Why unconstrained 2D image warping creates unrealistic patient expectations, and how 468-point 3D landmark constraints solve the consultation alignment problem.',
    href: routes.procedure('rhinoplasty'),
  },
  {
    slug: 'nvidia-inception-gpu-acceleration-web',
    title: 'Accelerating Facial Landmark Triangulation on Mobile GPUs',
    date: 'December 2025',
    readTime: '4 min read',
    category: 'GPU Performance',
    excerpt:
      'A deep dive into sub-millimeter RMSD precision tracking across modern Safari and Chrome mobile graphics pipelines.',
    href: routes.technology,
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-24">
      {/* Editorial Header Hero */}
      <section className="pb-16 relative overflow-hidden">
        {/* Subtle decorative orbital arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M-100 450 C 400 550, 800 120, 1550 220"
            stroke="#F37338"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.35"
          />
          <circle cx="980" cy="200" r="3.5" fill="#CF4500" opacity="0.4" />
        </svg>

        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-eyebrow-master text-eyebrow-dot">
              INSIGHTS &amp; ENGINEERING
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Clinical insights and{' '}
              <span className="italic font-medium text-[#CF4500]">
                technology breakthroughs.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Explore engineering deep-dives, clinical adoption studies, and the technology powering on-device facial simulation.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-16 md:py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <Link
                key={art.slug}
                href={art.href}
                className="bg-[#FCFBFA] p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-black/5 shadow-level-1 hover:shadow-level-2 transition-all flex flex-col justify-between space-y-6 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDEEE7] text-[#CF4500] text-xs font-semibold uppercase tracking-wider">
                      {art.category}
                    </span>
                    <span className="text-xs font-medium text-[#696969] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#CF4500]" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#141413] group-hover:text-[#CF4500] transition-colors font-display line-clamp-2">
                    {art.title}
                  </h2>

                  <p className="text-sm text-[#555555] leading-relaxed font-normal">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-black/5 flex items-center justify-between text-xs text-[#696969]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#696969]" />
                    <span>{art.date}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#141413] group-hover:text-[#CF4500] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Research Archive Banner */}
          <div className="p-8 md:p-12 rounded-[40px] bg-[#141413] text-white border border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 shadow-level-2 mt-16">
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F37338]">
                CLINICAL RESEARCH ARCHIVE
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium font-display text-white">
                Interested in technical whitepapers &amp; algorithms?
              </h3>
              <p className="text-sm text-white/70 max-w-xl font-normal leading-relaxed">
                Receive clinical accuracy reports, GPU benchmarking whitepapers, and 468-point deformation algorithm documentation.
              </p>
            </div>

            <Link
              href={routes.foundingPartners}
              className="px-7 py-3 rounded-[20px] bg-white text-[#141413] hover:bg-[#F3F0EE] text-sm font-medium tracking-tight transition-all shrink-0 inline-flex items-center gap-2"
            >
              <span>Apply for Research Access</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
