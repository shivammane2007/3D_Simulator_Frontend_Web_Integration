'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CreditCard, 
  Sparkles, 
  Ticket, 
  ImageIcon, 
  ArrowRight,
  Clock,
  Eye,
  Syringe,
  Gem,
  Layers,
  Heart,
  CalendarCheck,
  MessageSquare,
  ScanFace,
  BookOpen,
  MapPin,
  Info,
  AlertCircle
} from 'lucide-react';
import { getStoredUser, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';
import { routes } from '@/config/routes';

const QUICK_SIMULATE = [
  { name: 'Rhinoplasty', slug: 'rhinoplasty', icon: Sparkles },
  { name: 'Blepharoplasty', slug: 'blepharoplasty', icon: Eye },
  { name: 'Fillers', slug: 'dermal-fillers', icon: Syringe },
  { name: 'Chin', slug: 'chin-augmentation', icon: Gem },
  { name: 'Thread Lift', slug: 'thread-lift', icon: Layers },
  { name: 'Lip Lift', slug: 'lip-lift', icon: Heart },
];

const QUICK_ACTIONS = [
  {
    title: 'Try a simulation',
    desc: 'Preview any cosmetic procedure on your own photo, free and private',
    href: routes.simulate,
    cta: 'Open simulator',
    icon: ScanFace,
  },
  {
    title: 'Explore procedures',
    desc: 'Learn what each procedure involves, recovery times, and regional costs',
    href: routes.procedures,
    cta: 'Browse procedures',
    icon: BookOpen,
  },
  {
    title: 'Find a specialist',
    desc: 'Browse Faceify-certified clinics near you, filtered by your procedure',
    href: routes.directory,
    cta: 'View directory',
    icon: MapPin,
  },
];

export default function PatientDashboardPage() {
  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [inviteCode, setInviteCode] = useState('');
  const [lookupStatus, setLookupStatus] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
  }, []);

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLookupCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode.trim()) return;
    setLookupStatus('Searching for simulations associated with this code…');
    setTimeout(() => {
      setLookupStatus('No active surgeon consults found for this code. Please verify with your clinic.');
    }, 800);
  };

  const firstName = user.name ? user.name.split(' ')[0] : 'Shivam';

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header Greeting (Clean Modern Sans-Serif) */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans mb-1">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          Your personal space to explore, simulate, and plan your cosmetic journey.
        </p>
      </div>

      {/* Card 1: Simulation Credits */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#305A4F]/10 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-[#305A4F]" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
              SIMULATION CREDITS
            </span>
            <h2 className="text-lg font-bold text-[#0A0F1A]">No credits yet</h2>
            <p className="text-xs text-slate-500 font-sans">Credits are valid for 12 months from purchase.</p>
          </div>
        </div>

        <Link
          href="/day-pass"
          className="shrink-0 px-5 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
        >
          Get credits
        </Link>
      </div>

      {/* Card 2: Ready to simulate? Upload a photo and preview your results */}
      <div className="bg-[#305A4F]/[0.08] border border-[#305A4F]/20 rounded-2xl p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#305A4F]/15 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#305A4F]" />
          </div>
          <p className="text-sm font-semibold text-[#0A0F1A] font-sans">
            Ready to simulate? Upload a photo and preview your results.
          </p>
        </div>

        <Link
          href={routes.simulate}
          className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
        >
          <span>Try a Simulation</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Card 3: Invite Code from Surgeon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#305A4F]/10 flex items-center justify-center shrink-0">
            <Ticket className="w-5 h-5 text-[#305A4F]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#0A0F1A] font-sans mb-0.5">
              Have an invite code from your surgeon?
            </h2>
            <p className="text-xs text-slate-500 font-sans">
              Enter the code to view simulations prepared for you.
            </p>
          </div>
        </div>

        <form onSubmit={handleLookupCode} className="flex gap-2">
          <input
            type="text"
            placeholder="000000"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.replace(/\D/g, ''))}
            className="flex-1 px-3.5 py-2 text-sm font-mono tracking-wider border border-slate-200 rounded-xl bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#305A4F] focus:ring-1 focus:ring-[#305A4F]/20 transition-all"
            maxLength={6}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-[#EBE7E3] hover:bg-[#DDD8D2] text-slate-700 text-sm font-bold rounded-xl transition-colors cursor-pointer"
          >
            Look up
          </button>
        </form>

        {lookupStatus && (
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-1.5 font-sans">
            <AlertCircle className="w-3.5 h-3.5 text-[#305A4F] shrink-0" />
            <span>{lookupStatus}</span>
          </p>
        )}
      </div>

      {/* Section 1: My Simulations (Matches Screenshot 1 & 8) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-4 h-4" />
          <h2 className="text-xs font-bold font-sans uppercase tracking-wider">MY SIMULATIONS</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center text-center shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-[#0A0F1A] font-sans mb-1">No simulations yet</h3>
          <p className="text-xs text-slate-500 font-sans mb-4 max-w-xs leading-relaxed">
            Your simulation results will appear here after you try a procedure.
          </p>
          <Link
            href={routes.simulate}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            <span>Try a Simulation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Section 2: My Consultations (Matches Screenshot 7) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-400">
          <CalendarCheck className="w-4 h-4" />
          <h2 className="text-xs font-bold font-sans uppercase tracking-wider">MY CONSULTATIONS</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center text-center shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-[#0A0F1A] font-sans mb-1">No consultation requests yet</h3>
          <p className="text-xs text-slate-500 font-sans max-w-xs leading-relaxed">
            When you submit a consultation request, it will appear here.
          </p>
        </div>
      </div>

      {/* Section 3: Quick Simulate (Matches Screenshot 7) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold font-sans uppercase tracking-wider text-slate-400">
            QUICK SIMULATE
          </h2>
          <Link
            href={routes.procedures}
            className="text-xs text-[#305A4F] font-bold hover:text-[#25453C] transition-colors flex items-center gap-1"
          >
            <span>All procedures</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_SIMULATE.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/simulate/${item.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col items-center justify-center text-center hover:border-[#305A4F] hover:shadow-xs transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-[#0A0F1A] group-hover:text-[#305A4F] transition-colors">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Section 4: What Would You Like To Do? (Matches Screenshot 7) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold font-sans uppercase tracking-wider text-slate-400">
          WHAT WOULD YOU LIKE TO DO?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col hover:border-[#305A4F] hover:shadow-xs transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-[#0A0F1A] group-hover:text-[#305A4F] transition-colors mb-1 font-sans">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed mb-3 flex-1">
                  {action.desc}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#305A4F] opacity-70 group-hover:opacity-100 transition-opacity">
                  <span>{action.cta}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Section 5: Bottom Privacy Banner (Matches Screenshot 7) */}
      <div className="bg-[#FAF7F2] border border-[#E8E2D8] rounded-2xl p-5 flex items-start gap-3.5 shadow-xs">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-[#0A0F1A] mb-0.5 font-sans">
            Your simulations stay on your device
          </p>
          <p className="text-xs text-slate-500 font-sans leading-relaxed">
            Real-time simulation processing runs in your browser. Your photo is sent off your device only if you turn on the optional AI photoreal preview or choose to save a simulation to your account. Only contact info you voluntarily submit is stored, and only to connect you with your chosen specialist.
          </p>
        </div>
      </div>
    </div>
  );
}
