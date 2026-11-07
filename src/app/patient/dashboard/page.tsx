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
  CheckCircle2,
  AlertCircle,
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
  Info
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
    desc: 'Preview any cosmetic procedure on your own photo — free and private',
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
    <div className="space-y-8 pb-10">
      {/* Header Greeting */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#141413]">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-sm text-[#555555] mt-1.5 font-normal">
          Your personal space to explore, simulate, and plan your cosmetic journey.
        </p>
      </div>

      {/* Card 1: Simulation Credits */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-[16px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center shrink-0 mt-0.5">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#696969] uppercase tracking-wider block mb-1">
              SIMULATION CREDITS
            </span>
            <h2 className="text-xl font-medium tracking-tight text-[#141413]">No credits yet</h2>
            <p className="text-xs text-[#555555] mt-0.5 font-normal">
              Credits are valid for 12 months from purchase.
            </p>
          </div>
        </div>

        <Link
          href="/day-pass"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-medium tracking-tight shadow-sm transition-all shrink-0 cursor-pointer"
        >
          Get credits
        </Link>
      </div>

      {/* Card 2: Ready to Simulate */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-[16px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-[#141413]">
            Ready to simulate? Upload a photo and preview your results.
          </p>
        </div>

        <Link
          href={routes.simulate}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] bg-[#CF4500] hover:bg-[#F37338] text-white text-xs font-semibold shadow-xs transition-all shrink-0"
        >
          <span>Try a Simulation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Card 3: Invite Code from Surgeon */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-[16px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center shrink-0">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-medium tracking-tight text-[#141413]">Have an invite code from your surgeon?</h2>
            <p className="text-xs text-[#555555] mt-0.5 font-normal">
              Enter the code to view simulations prepared for you.
            </p>
          </div>
        </div>

        <form onSubmit={handleLookupCode} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="000000"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.replace(/\D/g, ''))}
            className="flex-1 px-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white placeholder:text-[#696969] focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all font-mono"
            maxLength={6}
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-medium tracking-tight transition-all cursor-pointer"
          >
            Look up
          </button>
        </form>

        {lookupStatus && (
          <p className="mt-3 text-xs text-[#555555] flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-[#CF4500] shrink-0" />
            <span>{lookupStatus}</span>
          </p>
        )}
      </div>

      {/* Section 1: My Simulations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#696969]">
          <Clock className="w-4 h-4" />
          <h2 className="text-xs font-bold tracking-[0.06em] uppercase">MY SIMULATIONS</h2>
        </div>

        <div className="bg-white rounded-[24px] border border-black/5 p-10 sm:p-12 text-center shadow-level-1">
          <div className="w-14 h-14 rounded-[18px] bg-[#F3F0EE] text-[#696969] flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-medium text-[#141413]">No simulations yet</h3>
          <p className="text-xs text-[#555555] mt-1 max-w-sm mx-auto font-normal leading-relaxed mb-4">
            Your simulation results will appear here after you try a procedure.
          </p>
          <Link
            href={routes.simulate}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-[20px] bg-[#31574D] hover:bg-[#25453c] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <span>Try a Simulation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Section 2: My Consultations (Matches Screenshot 1) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#696969]">
          <CalendarCheck className="w-4 h-4" />
          <h2 className="text-xs font-bold tracking-[0.06em] uppercase">MY CONSULTATIONS</h2>
        </div>

        <div className="bg-white rounded-[24px] border border-black/5 p-10 sm:p-12 text-center shadow-level-1">
          <div className="w-14 h-14 rounded-[18px] bg-[#F3F0EE] text-[#696969] flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="text-base font-medium text-[#141413]">No consultation requests yet</h3>
          <p className="text-xs text-[#555555] mt-1 max-w-sm mx-auto font-normal leading-relaxed">
            When you submit a consultation request, it will appear here.
          </p>
        </div>
      </div>

      {/* Section 3: Quick Simulate (Matches Screenshot 1) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-[0.06em] uppercase text-[#696969]">
            QUICK SIMULATE
          </h2>
          <Link
            href={routes.procedures}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#CF4500] hover:text-[#F37338] transition-colors"
          >
            <span>All procedures</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_SIMULATE.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.slug}
                href={`/simulate/${item.slug}`}
                className="group bg-white rounded-[20px] border border-black/5 hover:border-[#CF4500]/30 hover:shadow-level-1 p-4 flex flex-col items-center gap-2 text-center transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-[14px] bg-[#FDEEE7] group-hover:bg-[#CF4500] text-[#CF4500] group-hover:text-white transition-colors flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-[#141413] group-hover:text-[#CF4500] transition-colors">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Section 4: What Would You Like To Do? (Matches Screenshot 1) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold tracking-[0.06em] uppercase text-[#696969]">
          WHAT WOULD YOU LIKE TO DO?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-white rounded-[24px] border border-black/5 hover:border-[#CF4500]/30 hover:shadow-level-1 p-6 transition-all flex flex-col cursor-pointer"
              >
                <div className="w-11 h-11 rounded-[16px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium text-[#141413] mb-1.5 group-hover:text-[#CF4500] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-[#555555] font-normal leading-relaxed mb-4 flex-1">
                  {action.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#CF4500]">
                  <span>{action.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Section 5: Bottom Privacy Banner (Matches Screenshot 1) */}
      <div className="bg-[#FCFBFA] rounded-[24px] border border-black/5 p-5 sm:p-6 flex items-start gap-3.5 shadow-level-1">
        <Info className="w-5 h-5 text-[#696969] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-semibold text-[#141413] mb-1">
            Your simulations stay on your device
          </h4>
          <p className="text-xs text-[#555555] font-normal leading-relaxed">
            Real-time simulation processing runs in your browser. Your photo is sent off your device only if you turn on the optional AI photoreal preview or choose to save a simulation to your account. Only contact info you voluntarily submit is stored, and only to connect you with your chosen specialist.
          </p>
        </div>
      </div>
    </div>
  );
}
