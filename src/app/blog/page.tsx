import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Rss, Bell } from 'lucide-react';
import { routes } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Blog & Clinical Insights — Faceify Labs',
  description:
    'Case studies, clinical deep-dives, and product updates written for plastic surgeons and aesthetic practitioners.',
};

const latestArticles = [
  {
    slug: 'privacy-first-surgical-simulation',
    title: 'Why Privacy-First Matters in Surgical Simulation Software',
    date: 'March 17, 2026',
    readTime: '6 min read',
    category: 'Privacy',
    excerpt:
      'Most plastic surgery simulators upload patient photos to cloud servers. Learn why Faceify Labs processes photos on-device by default and why surgeons prefer minimal-egress simulation.',
    href: '/blog/privacy-first-surgical-simulation',
  },
  {
    slug: 'how-accurate-are-plastic-surgery-simulators',
    title: 'How Accurate Are Plastic Surgery Simulators in 2026?',
    date: 'March 15, 2026',
    readTime: '5 min read',
    category: 'Technology',
    excerpt:
      'Patients and surgeons want to know: can you really preview surgical results? We break down the technology behind AI surgical simulation and what to expect.',
    href: '/blog/how-accurate-are-plastic-surgery-simulators',
  },
  {
    slug: 'patient-images-dont-belong-in-the-cloud',
    title: "Your Patient's Face Doesn't Belong in the Cloud",
    date: 'March 14, 2026',
    readTime: '5 min read',
    category: 'Technology',
    excerpt:
      "Most simulation platforms upload patient photos to remote servers to process them. Here's why that trade-off is worth examining, and what privacy-first, on-device inference changes.",
    href: '/blog/patient-images-dont-belong-in-the-cloud',
  },
  {
    slug: 'best-plastic-surgery-simulators-2026',
    title: 'Best Plastic Surgery Simulators in 2026: Complete Comparison Guide',
    date: 'March 12, 2026',
    readTime: '8 min read',
    category: 'Industry',
    excerpt:
      'Compare the top plastic surgery simulation tools for surgeons and patients. Side-by-side analysis of Crisalix, FaceTouchUp, AEDIT, and browser-native alternatives.',
    href: '/blog/best-plastic-surgery-simulators-2026',
  },
  {
    slug: 'surgical-simulation-for-patient-consultations',
    title: 'How Surgical Simulation Increases Consultation Conversion Rates',
    date: 'March 10, 2026',
    readTime: '5 min read',
    category: 'Practice Growth',
    excerpt:
      'Data shows practices using simulation tools see 30-40% higher consultation-to-surgery conversion. Learn how to integrate simulation into your patient workflow.',
    href: '/blog/surgical-simulation-for-patient-consultations',
  },
  {
    slug: 'plastic-surgery-simulation-bangkok-seoul-singapore',
    title: 'Plastic Surgery Simulation for APAC Clinics: Bangkok, Seoul, Singapore & Mumbai',
    date: 'March 8, 2026',
    readTime: '6 min read',
    category: 'APAC',
    excerpt:
      'How aesthetic clinics in Asia-Pacific are using browser-native simulation to enhance patient consultations. Available in Thai, Korean, Japanese, and English.',
    href: '/blog/plastic-surgery-simulation-bangkok-seoul-singapore',
  },
];

const upcomingArticles = [
  {
    category: 'Case Study',
    title: 'How Real-Time Simulation Changed Our Consultation Conversion Rate',
    excerpt: 'A Bangkok clinic shares 90 days of data after adopting Faceify for rhinoplasty consultations.',
  },
  {
    category: 'Clinical Insight',
    title: 'The Anatomical Limits of Nasal Tip Projection, and Why Your Software Should Know Them',
    excerpt: 'Why cartilage mechanics matter for simulation accuracy and patient trust.',
  },
];

const topics = [
  'Clinical Simulation',
  'Rhinoplasty',
  'Blepharoplasty',
  'Practice Growth',
  'Patient Communication',
  'APAC Aesthetics',
];

export default function BlogPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-24">
      {/* Centered Editorial Header */}
      <section className="pb-16 px-4 relative overflow-hidden text-center">
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

        <div className="container-master relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-eyebrow-master text-eyebrow-dot justify-center">
            Clinical Insights
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-serif tracking-tight text-[#141413] leading-[1.1]">
            Thoughts on simulation,{' '}
            <span className="italic">surgery, and trust.</span>
          </h1>

          <p className="pt-2 text-base sm:text-lg text-[#555555] font-normal max-w-[58ch] mx-auto leading-relaxed">
            Case studies, clinical deep-dives, and product updates written for plastic surgeons and aesthetic practitioners.
          </p>
        </div>
      </section>

      {/* Main Blog Container */}
      <section className="px-4">
        <div className="max-w-3xl mx-auto">
          {/* Latest Section */}
          <div className="mb-14">
            <p className="text-xs md:text-sm font-semibold text-[#696969] uppercase tracking-wider mb-6">
              Latest
            </p>

            <div className="space-y-5">
              {latestArticles.map((art) => (
                <Link
                  key={art.slug}
                  href={art.href}
                  className="group block bg-[#FCFBFA] border border-black/5 rounded-[20px] p-6 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 shadow-level-1 cursor-pointer"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-[12px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#CF4500] group-hover:text-white transition-colors duration-300">
                      <BookOpen className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#696969]">
                        <span className="font-bold text-[#CF4500] uppercase tracking-wider text-[11px]">
                          {art.category}
                        </span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                        <span>·</span>
                        <span>{art.date}</span>
                      </div>

                      <h2 className="text-base md:text-lg font-semibold text-[#141413] mt-1 mb-2 leading-snug group-hover:text-[#CF4500] transition-colors font-display">
                        {art.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-normal">
                        {art.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#CF4500] group-hover:text-[#B33B00] transition-colors">
                        <span>Read article</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* More Coming Soon Divider */}
          <div className="flex items-center justify-center gap-3 my-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FDEEE7] border border-[#CF4500]/20 rounded-full">
              <Rss className="w-3.5 h-3.5 text-[#CF4500]" />
              <span className="text-xs font-bold text-[#CF4500] tracking-wider uppercase">
                More coming soon
              </span>
            </div>
          </div>

          {/* Coming Up Section */}
          <div className="space-y-4 mb-14">
            <p className="text-xs md:text-sm font-semibold text-[#696969] uppercase tracking-wider mb-6">
              Coming up
            </p>

            {upcomingArticles.map((item, i) => (
              <div
                key={i}
                className="bg-[#FCFBFA] border border-black/5 rounded-[20px] p-5 flex gap-4 items-start shadow-level-1"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-[#CF4500]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#CF4500] uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[#141413] mt-1 mb-1 leading-snug font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Topics We Cover Section */}
          <div className="mb-14">
            <p className="text-[10px] font-bold text-[#696969] uppercase tracking-widest mb-4">
              Topics we cover
            </p>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium text-[#555555] bg-white border border-black/10 px-3.5 py-1.5 rounded-full shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Get Notified When We Publish Card */}
          <div className="bg-[#141413] rounded-[24px] p-8 sm:p-12 text-center relative overflow-hidden shadow-level-2">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[360px] h-[180px] bg-[#CF4500]/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <Bell className="w-6 h-6 text-[#CF4500] mx-auto mb-2" />
              <h3 className="text-xl sm:text-2xl font-serif text-white">
                Get notified when we publish.
              </h3>
              <p className="text-white/70 text-sm max-w-sm mx-auto leading-relaxed font-normal">
                One email per article. No newsletters, no digests. Just the piece itself when it&apos;s ready.
              </p>
              <div className="pt-2">
                <Link
                  href={routes.surgeons}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[#CF4500] hover:bg-[#b03b00] text-white text-sm font-bold rounded-full transition-all shadow-sm"
                >
                  <span>Join the Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
