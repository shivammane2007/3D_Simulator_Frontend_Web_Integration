'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, ArrowRight, Award } from 'lucide-react';
import { foundingPartnerBenefits } from '@/data/pricing';
import { routes } from '@/config/routes';

export default function FoundingPartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    clinicName: '',
    email: '',
    phone: '',
    location: '',
    caseVolume: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20 space-y-12">
      {/* Header Banner (Inverted Stadium Container) */}
      <div className="container-master">
        <div className="bg-[#141413] text-[#F3F0EE] rounded-[40px] p-8 md:p-14 relative overflow-hidden shadow-level-2 border border-black/10">
          {/* Subtle Orange Glow Ambient Effect */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 bg-[#CF4500]"
            aria-hidden="true"
          />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#CF4500] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#CF4500]" />
              <span>Exclusive 2026 Cohort</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-display leading-tight">
              Founding Clinical Partner{' '}
              <span className="italic font-medium text-[#CF4500]">
                Program.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              We are partnering with an exclusive cohort of board-certified plastic surgeons and clinic leaders to shape the future of browser-native and spatial 3D surgical visualization.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content & Application Section */}
      <div className="container-master">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Program Perks (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-eyebrow-master text-eyebrow-dot text-[#CF4500]">
                Cohort Privileges
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141413] font-display">
                Why join as a Founding Partner?
              </h2>
            </div>

            {/* Raised Card for Benefits */}
            <div className="bg-[#FCFBFA] p-8 rounded-[32px] border border-black/5 shadow-level-1 space-y-5">
              <ul className="space-y-4">
                {foundingPartnerBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm font-medium text-[#141413]">
                    <div className="w-5 h-5 rounded-full bg-[#CF4500]/10 text-[#CF4500] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spatial Preview Notice Card */}
            <div className="p-7 rounded-[32px] bg-[#FCFBFA] border border-black/5 shadow-level-1 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CF4500]">
                <Award className="w-4 h-4 text-[#CF4500]" />
                <span>3D Spatial Headset Beta</span>
              </div>
              <p className="text-xs text-[#696969] leading-relaxed">
                Surgeons in the Founding Partner cohort will be the first to test spatial 3D inspection on Apple Vision Pro and Meta Quest headsets, allowing surgeons to walk around patient meshes in physical consultation space.
              </p>
            </div>
          </div>

          {/* Right: Application Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FCFBFA] p-8 sm:p-12 rounded-[40px] border border-black/5 shadow-level-1 space-y-6">
            <div className="space-y-2">
              <span className="text-eyebrow-master text-eyebrow-dot text-[#CF4500]">
                Cohort Application
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#141413] font-display">
                Apply for Founding Cohort
              </h3>
              <p className="text-xs text-[#696969]">
                Limited seats available. Applications evaluated on clinical focus and case volume.
              </p>
            </div>

            {submitted ? (
              <div className="p-10 rounded-[32px] bg-[#F3F0EE] border border-black/5 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#CF4500] text-white flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h4 className="text-xl font-bold text-[#141413] font-display">
                  Application Submitted
                </h4>
                <p className="text-sm text-[#696969] max-w-sm mx-auto leading-relaxed">
                  Thank you. A founding team member will contact you personally within 24 hours to schedule an executive briefing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#141413]">
                      Full Name &amp; Title
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Dr. Alexander Wright, MD"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-[20px] border border-black/10 text-xs text-[#141413] bg-[#F3F0EE] focus:outline-none focus:border-[#CF4500] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#141413]">
                      Clinic / Hospital Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Apex Aesthetic Surgery"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                      className="w-full px-4 py-3 rounded-[20px] border border-black/10 text-xs text-[#141413] bg-[#F3F0EE] focus:outline-none focus:border-[#CF4500] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#141413]">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="surgeon@clinic.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-[20px] border border-black/10 text-xs text-[#141413] bg-[#F3F0EE] focus:outline-none focus:border-[#CF4500] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#141413]">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+66 95 751 9638"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-[20px] border border-black/10 text-xs text-[#141413] bg-[#F3F0EE] focus:outline-none focus:border-[#CF4500] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#141413]">
                      Location (City, Country)
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Seoul, South Korea"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-[20px] border border-black/10 text-xs text-[#141413] bg-[#F3F0EE] focus:outline-none focus:border-[#CF4500] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#141413]">
                      Monthly Consultation Volume
                    </label>
                    <select
                      value={formData.caseVolume}
                      onChange={(e) => setFormData({ ...formData, caseVolume: e.target.value })}
                      className="w-full px-4 py-3 rounded-[20px] border border-black/10 text-xs text-[#141413] bg-[#F3F0EE] focus:outline-none focus:border-[#CF4500] transition-colors cursor-pointer"
                    >
                      <option value="">Select volume...</option>
                      <option value="1-25">1 – 25 consultations / mo</option>
                      <option value="25-75">25 – 75 consultations / mo</option>
                      <option value="75+">75+ consultations / mo</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-sm font-semibold tracking-[-0.02em] shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for Founding Cohort</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
