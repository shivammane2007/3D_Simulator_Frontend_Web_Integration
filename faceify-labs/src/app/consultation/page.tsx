'use client';

import { useState } from 'react';
import { Stethoscope, User, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

export default function ConsultationPage() {
  const [role, setRole] = useState<'surgeon' | 'patient'>('surgeon');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    procedureInterest: '',
    message: '',
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
              CONSULTATION & PRACTICE DEMOS
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              Schedule your{' '}
              <span className="italic font-medium text-[#CF4500]">
                consultation or demo.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Whether you are an aesthetic surgeon looking to integrate 3D simulation into your practice, or a patient exploring clinical visualization options.
            </p>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
            {/* Left: Contact Info & WhatsApp */}
            <div className="space-y-8">
              <div className="bg-[#FCFBFA] p-8 md:p-10 rounded-[40px] border border-black/5 shadow-level-1 space-y-6">
                <h3 className="text-h3-card text-[#141413]">
                  Instant WhatsApp Booking
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  Need an immediate response? Chat directly with our clinical onboarding coordinators on WhatsApp.
                </p>
                <a
                  href={routes.external.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-[20px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp ({siteConfig.whatsapp})</span>
                </a>
              </div>

              <div className="bg-[#FCFBFA] p-8 md:p-10 rounded-[40px] border border-black/5 shadow-level-1 space-y-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                  Clinical Support Desk
                </span>
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col gap-1 text-[#555555]">
                    <span className="font-bold text-[#141413]">Executive Support: </span>
                    <a href={routes.external.emailCeo} className="text-[#CF4500] hover:underline transition-colors">
                      {siteConfig.email.ceo}
                    </a>
                  </div>
                  <div className="flex flex-col gap-1 text-[#555555] pt-2">
                    <span className="font-bold text-[#141413]">Partnership Inquiries: </span>
                    <a href={routes.external.emailPartners} className="text-[#CF4500] hover:underline transition-colors">
                      {siteConfig.email.partners}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] border border-black/5 shadow-level-2 space-y-8">
              {/* Role Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-[24px] bg-[#F3F0EE] border border-black/5">
                <button
                  type="button"
                  onClick={() => setRole('surgeon')}
                  className={`py-3 px-4 rounded-[20px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'surgeon'
                      ? 'bg-white text-[#CF4500] shadow-sm'
                      : 'text-[#555555] hover:text-[#141413]'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Surgeon / Clinic</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`py-3 px-4 rounded-[20px] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    role === 'patient'
                      ? 'bg-white text-[#CF4500] shadow-sm'
                      : 'text-[#555555] hover:text-[#141413]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Patient Inquiry</span>
                </button>
              </div>

              {submitted ? (
                <div className="p-10 rounded-[32px] bg-[#F3F0EE] border border-black/5 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#141413] text-white flex items-center justify-center mx-auto shadow-level-1">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-medium font-display text-[#141413]">
                    Request Confirmed
                  </h4>
                  <p className="text-xs text-[#555555] max-w-xs mx-auto leading-relaxed">
                    We have received your consultation details. Our team will reach out with calendar times within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Dr. Samantha Tan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="samantha@tanplasticsurgery.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        {role === 'surgeon' ? 'Clinic / Practice Name' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="text"
                        placeholder={role === 'surgeon' ? 'Tan Aesthetic Surgery' : '+66 95 751 9638'}
                        value={role === 'surgeon' ? formData.organization : formData.phone}
                        onChange={(e) =>
                          role === 'surgeon'
                            ? setFormData({ ...formData, organization: e.target.value })
                            : setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                        Procedures of Interest
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rhinoplasty, Facelift"
                        value={formData.procedureInterest}
                        onChange={(e) => setFormData({ ...formData, procedureInterest: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#141413]">
                      Notes / Consultation Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share any specific requirements, consultation volume, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-[20px] border border-black/10 text-sm text-[#141413] bg-white focus-visible:outline-none focus-visible:border-black/30 transition-colors shadow-sm resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button type="submit" className="w-full py-4 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all flex justify-center items-center gap-2">
                      {role === 'surgeon' ? 'Request Practice Demo' : 'Submit Consultation Request'}
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
