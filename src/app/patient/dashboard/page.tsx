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
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink tracking-tight">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Your personal space to explore, simulate, and plan your cosmetic journey.
        </p>
      </div>

      {/* Card 1: Simulation Credits */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2D5548]/10 text-[#2D5548] flex items-center justify-center shrink-0 mt-0.5">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
              SIMULATION CREDITS
            </span>
            <h2 className="text-base font-bold text-ink">No credits yet</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Credits are valid for 12 months from purchase.
            </p>
          </div>
        </div>

        <Link
          href="/day-pass"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#2D5548] hover:bg-[#23453a] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          Get credits
        </Link>
      </div>

      {/* Card 2: Ready to Simulate */}
      <div className="bg-[#EBF3EF]/60 rounded-2xl border border-[#2D5548]/20 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2D5548]/15 text-[#2D5548] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-ink">
            Ready to simulate? Upload a photo and preview your results.
          </p>
        </div>

        <Link
          href={routes.simulate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D5548] hover:bg-[#23453a] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <span>Try a Simulation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Card 3: Invite Code from Surgeon */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#2D5548]/10 text-[#2D5548] flex items-center justify-center shrink-0">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-ink">Have an invite code from your surgeon?</h2>
            <p className="text-xs text-slate-500 mt-0.5">
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
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#2D5548] focus:ring-1 focus:ring-[#2D5548]/20 transition-all font-mono"
            maxLength={10}
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            Look up
          </button>
        </form>

        {lookupStatus && (
          <p className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{lookupStatus}</span>
          </p>
        )}
      </div>

      {/* Section: My Simulations */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-4 h-4" />
          <h2 className="text-xs font-bold tracking-wider uppercase">MY SIMULATIONS</h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-ink">No simulations yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Your simulation results will appear here after you try a procedure.
          </p>
        </div>
      </div>
    </div>
  );
}

