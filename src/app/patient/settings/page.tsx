'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Shield, 
  Key, 
  Trash2, 
  LogOut, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { getStoredUser, persistUserSession, signOutClient, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';

export default function PatientSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setName(stored.name || 'Shivam Mane');
    }
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSaving(true);
    setSavedSuccess(false);

    setTimeout(() => {
      const updated = persistUserSession({ name: name.trim() });
      setUser(updated);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 400);
  };

  const handleClearData = () => {
    try {
      localStorage.removeItem('faceify_simulations');
      sessionStorage.removeItem('faceify_simulations');
    } catch {
      // Non-fatal
    }
    setDataCleared(true);
    setTimeout(() => setDataCleared(false), 2500);
  };

  const handleSignOut = () => {
    signOutClient();
    router.push('/login');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#141413]">
          Settings
        </h1>
        <p className="text-sm text-[#555555] mt-1.5 font-normal">
          Manage your account and privacy preferences
        </p>
      </div>

      {/* Card 1: Profile */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-[14px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-[#141413]">Profile</h2>
        </div>

        <div className="space-y-4 max-w-xl">
          {/* Email */}
          <div>
            <label className="text-xs font-medium text-[#696969] block mb-1.5">
              Email
            </label>
            <input
              type="email"
              disabled
              value={user.email || 'shivammane2007@gmail.com'}
              className="w-full px-4 py-2.5 rounded-[16px] border border-black/5 text-sm text-[#696969] bg-[#F3F0EE]/60 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-medium text-[#141413] block mb-1.5">
              Name
            </label>
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white placeholder:text-[#696969] focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all"
              />
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-medium tracking-tight transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save'}
              </button>
            </form>
            {savedSuccess && (
              <p className="text-xs text-[#CF4500] font-medium mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Name updated successfully</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Privacy & Data */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-[14px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-[#141413]">Privacy & Data</h2>
        </div>

        <div className="space-y-4 max-w-xl">
          {/* Privacy Disclaimer Box */}
          <div className="p-4 rounded-[18px] bg-[#F3F0EE]/70 border border-black/5 text-xs text-[#555555] leading-relaxed flex items-start gap-3">
            <div className="w-4 h-4 rounded-full border border-black/20 shrink-0 mt-0.5" />
            <p>
              Real-time simulations run in your browser. Your photo is sent off your device only if you turn on the optional AI photoreal preview or choose to save a simulation to your account, and is never used to train any model.
            </p>
          </div>

          {/* Local Simulation Data */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs font-medium text-[#141413]">Local Simulation Data</p>
              <p className="text-[11px] text-[#696969] mt-0.5 font-normal">0 simulations stored locally</p>
            </div>

            <button
              type="button"
              onClick={handleClearData}
              className="inline-flex items-center gap-1.5 text-xs text-[#696969] hover:text-[#CF4500] transition-colors p-1.5 cursor-pointer font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{dataCleared ? 'Data Cleared' : 'Clear Data'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 3: Security */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-[14px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-[#141413]">Security</h2>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[20px] border border-[#CF4500]/20 bg-[#FDEEE7] hover:bg-[#fcdcd0] text-[#CF4500] text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Faceify</span>
          </button>
        </div>
      </div>
    </div>
  );
}

