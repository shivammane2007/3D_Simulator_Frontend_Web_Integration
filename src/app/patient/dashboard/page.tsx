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
  AlertCircle
} from 'lucide-react';
import { getStoredUser, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';
import { routes } from '@/config/routes';

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
    <div className="space-y-6">
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
            <span className="text-eyebrow-master text-[11px] font-bold text-[#696969] uppercase tracking-wider block mb-1">
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
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-medium tracking-tight shadow-sm transition-all shrink-0"
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
            onChange={(e) => setInviteCode(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white placeholder:text-[#696969] focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all font-mono"
            maxLength={10}
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

      {/* Section: My Simulations */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-[#696969]">
          <Clock className="w-4 h-4" />
          <h2 className="text-xs font-bold tracking-[0.04em] uppercase">MY SIMULATIONS</h2>
        </div>

        <div className="bg-white rounded-[24px] border border-black/5 p-12 text-center shadow-level-1">
          <div className="w-14 h-14 rounded-[18px] bg-[#F3F0EE] text-[#696969] flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-medium text-[#141413]">No simulations yet</h3>
          <p className="text-xs text-[#555555] mt-1 max-w-sm mx-auto font-normal">
            Your simulation results will appear here after you try a procedure.
          </p>
        </div>
      </div>
    </div>
  );
}

