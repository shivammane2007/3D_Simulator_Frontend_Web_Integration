'use client';

import { useState } from 'react';
import { Sparkles, Handshake, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { routes } from '@/config/routes';

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    procedures: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Header */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-eyebrow-master text-eyebrow-dot">
              PARTNER PROGRAM
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Grow your practice with{' '}
              <span className="italic font-medium text-[#CF4500]">
                Faceify Labs.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Join our international network of certified plastic surgery clinics and aesthetic centers across Southeast Asia, East Asia, and South Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Application Form */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
            {/* Left: Benefits */}
            <div className="space-y-10">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                  Partner Benefits
                </span>
                <h2 className="text-h2-section text-[#141413]">
                  Why become a certified partner clinic?
                </h2>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: 'Surgeon Registry Listing',
                    desc: 'Get featured on the global Faceify Surgeon Directory and receive patient visualization referrals.',
                  },
                  {
                    title: 'White-Label Simulator Embeds',
                    desc: 'Add real-time simulation tools directly into your clinic website with custom color schemes and procedures.',
                  },
                  {
                    title: 'Direct Product Advisory Seat',
                    desc: 'Provide feedback directly to our engineering team to develop specialized procedure deformation models.',
                  },
                  {
                    title: 'Clinical Staff Onboarding',
                    desc: 'Dedicated training sessions for patient coordinators, surgical nurses, and intake staff.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-[32px] bg-[#FCFBFA] border border-black/5 space-y-3 shadow-level-1 hover:shadow-level-2 transition-shadow"
                  >
                    <h3 className="text-h3-card text-[#141413] flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#CF4500] shrink-0" />
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-xs text-[#555555] pl-8 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Application Form */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-black/5 shadow-level-2 space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                  Clinic Application
                </span>
                <h3 className="text-2xl font-medium font-display text-[#141413]">
                  Apply for Partner Certification
                </h3>
                <p className="text-xs text-[#555555]">
                  Fill in your clinic details to initiate onboarding verification.
                </p>
              </div>

              {submitted ? (
                <div className="p-10 rounded-[32px] bg-[#F3F0EE] border border-black/5 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#141413] text-white flex items-center justify-center mx-auto shadow-level-1">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-medium font-display text-[#141413]">
                    Application Received
                  </h4>
                  <p className="text-xs text-[#555555] max-w-xs mx-auto leading-relaxed">
                    Thank you. Our partnership team will review your practice information and contact you via email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Clinic / Practice Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Siam Aesthetic Clinic"
                        value={formData.clinicName}
                        onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Lead Surgeon / Contact
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Dr. Thanawat"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Practice Email
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="contact@clinic.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+66 95 751 9638"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                      City & Country
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Bangkok, Thailand"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                      Primary Procedures Performed
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rhinoplasty, Blepharoplasty, Facelift"
                      value={formData.procedures}
                      onChange={(e) => setFormData({ ...formData, procedures: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                    />
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="w-full py-4 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all flex justify-center items-center gap-2">
                      Submit Partner Application
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
