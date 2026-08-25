'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Stethoscope, Sparkles, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

const certifiedClinics = [
  {
    name: 'Siam Aesthetic Institute',
    city: 'Bangkok, Thailand',
    leadSurgeon: 'Dr. Thanawat K.',
    specialties: ['Rhinoplasty', 'Blepharoplasty', 'Facelift'],
    status: 'Verified Founding Clinic',
  },
  {
    name: 'Gangnam Facial Architecture',
    city: 'Seoul, South Korea',
    leadSurgeon: 'Dr. Min-jun P.',
    specialties: ['V-Line Contouring', 'Jawline Surgery', 'Rhinoplasty'],
    status: 'Verified Partner',
  },
  {
    name: 'Orchard Aesthetic Medicine',
    city: 'Singapore',
    leadSurgeon: 'Dr. Sarah L.',
    specialties: ['Injectables', 'HIFU', 'Non-Surgical Rejuvenation'],
    status: 'Verified Partner',
  },
  {
    name: 'Apex Plastic Surgery Centre',
    city: 'Mumbai, India',
    leadSurgeon: 'Dr. Rajiv M.',
    specialties: ['Rhinoplasty', 'Facial Reconstruction', 'Lip Lift'],
    status: 'Verified Partner',
  },
  {
    name: 'Sukhumvit Cosmetic Hospital',
    city: 'Bangkok, Thailand',
    leadSurgeon: 'Dr. Chaiwat S.',
    specialties: ['Facelift', 'Blepharoplasty', 'Breast Augmentation'],
    status: 'Verified Partner',
  },
  {
    name: 'Aura Skin & Contour Clinic',
    city: 'Delhi, India',
    leadSurgeon: 'Dr. Priya V.',
    specialties: ['Dermal Fillers', 'Botox', 'Skin Resurfacing'],
    status: 'Verified Partner',
  },
];

export default function DirectoryPage() {
  const [cityFilter, setCityFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredClinics = certifiedClinics.filter((c) => {
    const matchesCity = cityFilter === 'all' || c.city.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              SURGEON REGISTRY
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Find a Faceify-certified{' '}
              <span className="italic font-medium text-[#CF4500]">
                clinic near you.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Connect with plastic surgeons and aesthetic doctors who use Faceify 3D simulation tools to plan procedures and align expectations visually.
            </p>

            {/* Filter controls */}
            <div className="pt-8 flex flex-col sm:flex-row gap-5 items-center">
              <div className="relative w-full sm:max-w-sm">
                <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-[#555555]" />
                <input
                  type="text"
                  placeholder="Search clinic or specialty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-5 py-3.5 rounded-[999px] bg-white border border-black/5 text-sm text-[#141413] placeholder:text-[#555555] focus-visible:outline-none focus-visible:border-black/20 shadow-level-1 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
                {['all', 'Bangkok', 'Seoul', 'Singapore', 'Mumbai', 'Delhi'].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setCityFilter(loc)}
                    className={cn(
                      'px-5 py-2.5 rounded-[999px] text-xs font-medium whitespace-nowrap transition-all border cursor-pointer',
                      cityFilter === loc
                        ? 'bg-[#141413] text-[#F3F0EE] border-[#141413] shadow-level-1'
                        : 'bg-white text-[#141413] border-black/5 hover:bg-[#EBE7E3]'
                    )}
                  >
                    {loc === 'all' ? 'All Locations' : loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-16 md:py-24 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClinics.map((clinic, idx) => (
              <div
                key={idx}
                className="bg-[#FCFBFA] rounded-[40px] border border-black/5 p-8 flex flex-col justify-between hover:shadow-level-2 transition-all space-y-8 shadow-level-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                      • {clinic.status}
                    </span>
                  </div>

                  <h3 className="text-h3-card text-[#141413]">
                    {clinic.name}
                  </h3>

                  <div className="space-y-2 text-sm text-[#555555]">
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#CF4500] shrink-0" />
                      <span>{clinic.city}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Stethoscope className="w-4 h-4 text-[#555555] shrink-0" />
                      <span>{clinic.leadSurgeon}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-2">
                    {clinic.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-black/5 text-[#141413] font-medium shadow-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5">
                  <Link
                    href={routes.consultation}
                    className="w-full py-3.5 rounded-[20px] bg-white hover:bg-[#141413] text-[#141413] hover:text-[#F3F0EE] border border-black/5 hover:border-[#141413] text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Request Visual Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Join Registry CTA for Clinics */}
          <div className="mt-16 p-8 md:p-12 rounded-[40px] bg-white border border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 shadow-level-1">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-xl font-medium font-display text-[#141413]">
                Are you an accredited cosmetic surgery clinic?
              </h4>
              <p className="text-sm text-[#555555]">
                Get listed in the Faceify certified registry and receive patient visualization referrals.
              </p>
            </div>
            <Link
              href={routes.partners}
              className="px-8 py-3.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-sm font-medium transition-all shadow-sm shrink-0"
            >
              Apply for Certification
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
