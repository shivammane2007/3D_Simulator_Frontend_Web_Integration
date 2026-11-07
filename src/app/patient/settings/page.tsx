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
  Loader2,
  Camera,
  AlertTriangle,
  X,
  KeyRound
} from 'lucide-react';
import { getStoredUser, persistUserSession, signOutClient, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';

export default function PatientSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);

  // AI photo consent state
  const [aiConsentGranted, setAiConsentGranted] = useState(true);
  const [aiConsentFeedback, setAiConsentFeedback] = useState<string | null>(null);

  // Danger zone state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEmailInput, setDeleteEmailInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  const handleToggleAiConsent = () => {
    const next = !aiConsentGranted;
    setAiConsentGranted(next);
    setAiConsentFeedback(next ? 'AI photo processing consent enabled.' : 'AI photo consent revoked. 2D on-device simulation only.');
    setTimeout(() => setAiConsentFeedback(null), 3000);
  };

  const handleSignOut = () => {
    signOutClient();
    router.push('/login');
  };

  const handleDeleteAccount = () => {
    if (deleteEmailInput.trim().toUpperCase() !== 'DELETE' && deleteEmailInput.trim() !== (user.email || 'shivammane2007@gmail.com')) {
      setDeleteError('Please type DELETE to confirm.');
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    setTimeout(() => {
      signOutClient();
      try {
        localStorage.removeItem('faceify_user');
        localStorage.removeItem('faceify_simulations');
        localStorage.removeItem('faceify_patient_notifications');
        localStorage.removeItem('faceify_patient_notif_prefs');
      } catch {
        // Non-fatal
      }
      setIsDeleting(false);
      setDeleteModalOpen(false);
      router.push('/login');
    }, 600);
  };

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans mb-1">
          Settings
        </h1>
        <p className="text-sm text-slate-500 font-sans">
          Manage your account and privacy preferences
        </p>
      </div>

      {/* Card 1: Profile */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A] font-sans">Profile</h2>
        </div>

        <div className="space-y-4 max-w-xl">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5 font-sans">
              Email
            </label>
            <input
              type="email"
              disabled
              value={user.email || 'shivammane2007@gmail.com'}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50 cursor-not-allowed font-sans"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5 font-sans">
              Name
            </label>
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A0F1A] bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#305A4F] focus:ring-1 focus:ring-[#305A4F]/20 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-[#305A4F] hover:bg-[#25453C] text-white text-xs font-bold transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save'}
              </button>
            </form>
            {savedSuccess && (
              <p className="text-xs text-green-600 font-medium mt-1.5 flex items-center gap-1 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span>Name updated successfully</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Card 2: Privacy & Data */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A] font-sans">Privacy & Data</h2>
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

      {/* Card 3: AI Photo Processing */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-[14px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-[#141413]">AI Photo Processing</h2>
        </div>

        <div className="space-y-4 max-w-xl">
          <p className="text-xs text-[#555555] font-normal leading-relaxed">
            When enabled, the photorealistic preview feature renders high-fidelity simulations. Your photo is deleted within ~1 hour. Your standard 2D simulations remain fully on-device and private.
          </p>

          <div className="flex items-center justify-between p-4 rounded-[18px] bg-[#FCFBFA] border border-black/5">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${aiConsentGranted ? 'bg-green-500' : 'bg-slate-300'}`} />
              <div>
                <p className="text-xs font-medium text-[#141413]">
                  {aiConsentGranted ? 'Consent granted — AI preview enabled' : 'On-device 2D simulator only'}
                </p>
                <p className="text-[11px] text-[#696969] mt-0.5">
                  {aiConsentGranted ? 'Expires automatically after session' : 'Photos never leave your device'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleAiConsent}
              className={`px-4 py-1.5 rounded-[16px] text-xs font-medium transition-colors cursor-pointer ${
                aiConsentGranted
                  ? 'border border-black/10 hover:bg-black/5 text-[#555555]'
                  : 'bg-[#141413] text-white hover:bg-[#262627]'
              }`}
            >
              {aiConsentGranted ? 'Revoke' : 'Enable'}
            </button>
          </div>

          {aiConsentFeedback && (
            <p className="text-xs text-[#CF4500] font-medium">{aiConsentFeedback}</p>
          )}
        </div>
      </div>

      {/* Card 4: Security */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-[14px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center">
            <KeyRound className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-[#141413]">Security</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out of Faceify</span>
          </button>
        </div>
      </div>

      {/* Card 5: Danger Zone (Matches id="danger") */}
      <div id="danger" className="bg-white rounded-[24px] border border-red-200/80 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-[14px] bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-red-600">Danger Zone</h2>
        </div>

        <div className="max-w-xl space-y-4">
          <p className="text-xs text-[#555555] font-normal leading-relaxed">
            Permanently erase your account and all associated data. This action cannot be undone.
          </p>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="px-5 py-2.5 rounded-[18px] border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] border border-black/10 p-6 sm:p-7 max-w-md w-full shadow-level-3 space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-ink hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-medium text-[#141413]">Are you sure you want to delete your account?</h3>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                Deletion is immediate and cannot be undone. Type <span className="font-bold text-red-600 font-mono">DELETE</span> below to confirm.
              </p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Type DELETE here"
                value={deleteEmailInput}
                onChange={(e) => setDeleteEmailInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[16px] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-red-500 font-mono uppercase"
              />
              {deleteError && (
                <p className="text-xs text-red-500 mt-1.5">{deleteError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-[20px] border border-black/10 text-xs font-medium text-[#555555] hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteEmailInput.trim().toUpperCase() !== 'DELETE' || isDeleting}
                onClick={handleDeleteAccount}
                className="px-5 py-2.5 rounded-[20px] bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Yes, Delete My Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
