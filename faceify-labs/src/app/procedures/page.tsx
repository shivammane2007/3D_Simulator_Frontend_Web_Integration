'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { procedures, procedureCategories, type ProcedureCategory } from '@/data/procedures';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';
import { SatelliteButton } from '@/components/ui/Button';

export default function ProceduresPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProcedures = useMemo(() => {
    return procedures.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              PROCEDURE CATALOG
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              All 85+ simulated procedures.
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Explore parametric visual simulations across surgical, injectable, non-surgical, dental, body contouring, and hair restoration disciplines.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input
                type="text"
                placeholder="Search procedures (e.g. Rhinoplasty, Botox)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-[999px] bg-white border border-black/5 text-sm text-[#141413] placeholder:text-[#555555] focus-visible:outline-none focus-visible:border-black/20 shadow-level-1 transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  'px-5 py-2.5 rounded-[999px] text-xs font-medium whitespace-nowrap transition-all border cursor-pointer',
                  selectedCategory === 'all'
                    ? 'bg-[#141413] text-[#F3F0EE] border-[#141413] shadow-level-1'
                    : 'bg-white text-[#141413] border-black/5 hover:bg-[#EBE7E3]'
                )}
              >
                All ({procedures.length})
              </button>

              {(Object.keys(procedureCategories) as ProcedureCategory[]).map((cat) => {
                const count = procedures.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      'px-5 py-2.5 rounded-[999px] text-xs font-medium whitespace-nowrap transition-all border cursor-pointer',
                      selectedCategory === cat
                        ? 'bg-[#141413] text-[#F3F0EE] border-[#141413] shadow-level-1'
                        : 'bg-white text-[#141413] border-black/5 hover:bg-[#EBE7E3]'
                    )}
                  >
                    {procedureCategories[cat].label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Procedures Catalog Grid */}
      <section className="py-12 border-t border-black/5 bg-[#F3F0EE]">
        <div className="container-master">
          {filteredProcedures.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {filteredProcedures.map((proc) => (
                <div
                  key={proc.slug}
                  className="bg-[#FCFBFA] rounded-[32px] p-6 border border-black/5 shadow-level-1 flex flex-col justify-between space-y-6 hover:shadow-level-2 transition-all group items-center text-center"
                >
                  {/* Circular Portrait with Satellite Micro-CTA */}
                  <div className="relative w-[180px] h-[180px] my-2">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white via-[#EBE7E3] to-[#DFD9D2] border border-black/5 flex items-center justify-center p-3">
                      <svg className="w-full h-full" viewBox="0 0 160 160" fill="none">
                        <ellipse cx="80" cy="80" rx="42" ry="54" stroke="#141413" strokeWidth="1.2" fill="rgba(255,255,255,0.5)" />
                        <ellipse cx="65" cy="70" rx="8" ry="5" stroke="#141413" strokeWidth="1" fill="#fff" />
                        <ellipse cx="95" cy="70" rx="8" ry="5" stroke="#141413" strokeWidth="1" fill="#fff" />
                        <circle cx="65" cy="70" r="2" fill="#CF4500" />
                        <circle cx="95" cy="70" r="2" fill="#CF4500" />
                        <path d="M80 60 L77 78 Q80 82 83 78 L80 60" stroke="#141413" strokeWidth="1" fill="none" />
                        <path d="M70 95 Q80 100 90 95" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                        <circle cx="80" cy="50" r="1.5" fill="#CF4500" />
                        <circle cx="55" cy="85" r="1.5" fill="#F37338" />
                        <circle cx="105" cy="85" r="1.5" fill="#F37338" />
                        <circle cx="80" cy="110" r="1.5" fill="#CF4500" />
                      </svg>
                    </div>

                    {/* Attached Satellite Micro-CTA (docks bottom-right) */}
                    <div className="absolute -bottom-1 -right-1">
                      <SatelliteButton
                        href={routes.simulateProcedure(proc.simulatorSlug)}
                        ariaLabel={`Simulate ${proc.name}`}
                      />
                    </div>
                  </div>

                  {/* Text Info Below Portrait */}
                  <div className="space-y-2 max-w-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                      • {proc.categoryLabel}
                    </span>

                    <h3 className="text-h3-card text-[#141413]">
                      {proc.name}
                    </h3>

                    <p className="text-xs text-[#555555] leading-relaxed line-clamp-2">
                      {proc.shortDescription}
                    </p>
                  </div>

                  {/* Secondary Link to Guide */}
                  <div className="pt-2 border-t border-black/5 w-full flex justify-center">
                    <Link
                      href={routes.procedure(proc.slug)}
                      className="text-xs font-medium text-[#141413] hover:text-[#CF4500] transition-colors"
                    >
                      View Clinical Guide →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[40px] border border-black/5 p-8 shadow-level-1">
              <p className="text-base font-medium text-[#141413] font-display">No procedures found matching &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-[#555555] mt-2">Try clearing your search query or selecting another category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-6 px-6 py-2.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-sm font-medium transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
