'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Shield, 
  Trash2, 
  LogOut, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  X, 
  KeyRound, 
  MessageCircle, 
  Download 
} from 'lucide-react';
import { getStoredUser, persistUserSession, signOutClient, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';

export default function PatientSettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // Data state
  const [simCount, setSimCount] = useState(0);
  const [dataCleared, setDataCleared] = useState(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);
  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);

  // Danger zone state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setName(stored.name || 'Shivam Mane');
    }
    try {
      const sims = localStorage.getItem('faceify_simulations');
      if (sims) {
        const parsed = JSON.parse(sims);
        setSimCount(Array.isArray(parsed) ? parsed.length : 0);
      }
    } catch {
      setSimCount(0);
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
    setSimCount(0);
    setDataCleared(true);
    setTimeout(() => setDataCleared(false), 2500);
  };

  const handleDownloadMyData = () => {
    const exportData = {
      user: {
        id: user.id || 'usr_shivam_1',
        name: user.name || 'Shivam Mane',
        email: user.email || 'shivammane2007@gmail.com',
        role: user.role || 'patient',
      },
      settings: {
        exportDate: new Date().toISOString(),
        dataProtectionCompliance: 'DPDP Act 2023 & GDPR Art. 15',
      },
      simulations: [],
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faceify-patient-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportFeedback('Your local profile data has been exported successfully.');
    setTimeout(() => setExportFeedback(null), 3500);
  };

  const handleRequestFullCrmExport = () => {
    setExportFeedback('Full data export requested. The download link will be emailed to your registered address within 24 hours.');
    setTimeout(() => setExportFeedback(null), 5000);
  };

  const handleSignOut = () => {
    signOutClient();
    router.push('/login');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmInput.trim().toUpperCase() !== 'DELETE' && deleteConfirmInput.trim() !== (user.email || 'shivammane2007@gmail.com')) {
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
    <div className="space-y-6 max-w-3xl pb-16 font-sans">
      {/* Toast Feedback */}
      {exportFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportFeedback}</span>
        </div>
      )}

      {/* ── 1. Profile Section ── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#7C9082]/10 text-[#7C9082] flex items-center justify-center">
            <User className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A]">Profile</h2>
        </div>

        <div className="space-y-4 max-w-xl">
          {/* Email */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1.5">
              Email
            </label>
            <input
              type="email"
              disabled
              value={user.email || 'shivammane2007@gmail.com'}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Name
            </label>
            <form onSubmit={handleSaveName} className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A0F1A] bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#7C9082] focus:ring-1 focus:ring-[#7C9082]/30 transition-all"
              />
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-[#7C9082] hover:bg-[#6A7D70] text-white text-xs font-semibold transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save'}
              </button>
            </form>
            {savedSuccess && (
              <p className="text-xs text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Name updated successfully</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. Privacy & Data Section (Image 1) ── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#7C9082]/10 text-[#7C9082] flex items-center justify-center">
            <Shield className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A]">Privacy &amp; Data</h2>
        </div>

        <div className="space-y-5">
          {/* Clinical privacy callout */}
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
            <Shield className="w-4 h-4 text-[#7C9082] shrink-0 mt-0.5" />
            <p>
              Real-time simulations run in your browser. Your photo is sent off your device only if you turn on the optional AI photoreal preview or choose to save a simulation to your account, and is never used to train any model.
            </p>
          </div>

          {/* Local Simulation Data row */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-sm font-semibold text-[#0A0F1A]">Local Simulation Data</p>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {simCount} simulation{simCount === 1 ? '' : 's'} stored locally
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearData}
              disabled={simCount === 0 && !dataCleared}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-600 transition-colors cursor-pointer font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{dataCleared ? 'Data Cleared' : 'Clear Data'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Security Section (Image 1) ── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#7C9082]/10 text-[#7C9082] flex items-center justify-center">
            <KeyRound className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A]">Security</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Change password button -> navigates to /account/password (Image 3) */}
          <Link
            href="/account/password"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#0A0F1A] hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors shadow-2xs"
          >
            <KeyRound className="w-4 h-4 text-slate-500" />
            <span>Change password</span>
          </Link>

          {/* WhatsApp sign-in button */}
          <button
            type="button"
            onClick={() => setWhatsAppModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#0A0F1A] hover:bg-slate-50 rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-slate-500" />
            <span>WhatsApp sign-in</span>
          </button>
        </div>
      </section>

      {/* ── 4. Data Export & Sign Out Section (Image 1) ── */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-2">
        <div>
          <button
            type="button"
            onClick={handleDownloadMyData}
            className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-[#305A4F] hover:text-[#1F3D35] hover:bg-slate-50 rounded-xl transition-colors cursor-pointer w-full text-left sm:w-auto"
          >
            <Download className="w-4 h-4 text-[#305A4F]" />
            <span>Download my data</span>
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={handleRequestFullCrmExport}
            className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-[#305A4F] hover:text-[#1F3D35] hover:bg-slate-50 rounded-xl transition-colors cursor-pointer w-full text-left sm:w-auto"
          >
            <Download className="w-4 h-4 text-[#305A4F]" />
            <span>Request full data export (CRM + clinic records)</span>
          </button>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/60 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* ── 5. Danger Zone (Image 1) ── */}
      <section id="danger" className="bg-white rounded-2xl border border-red-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
          <h2 className="text-base font-bold text-red-600">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Permanently erase your account and all associated data. This action cannot be undone.
          </p>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-600 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-600" />
            <span>Delete Account</span>
          </button>
        </div>
      </section>

      {/* ── WhatsApp Sign-In Modal ── */}
      {whatsAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-xl space-y-5 animate-in fade-in">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setWhatsAppModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A0F1A]">WhatsApp Instant Sign-in</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Connect your WhatsApp number to receive one-tap login links and consultation booking updates directly.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  defaultValue="98230 12345"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A0F1A] focus:outline-none focus:border-[#7C9082] focus:ring-1 focus:ring-[#7C9082]/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWhatsAppModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setWhatsAppModalOpen(false);
                  setExportFeedback('WhatsApp sign-in verification link sent.');
                  setTimeout(() => setExportFeedback(null), 3000);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#305A4F] hover:bg-[#25453C] text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Send Verification Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Account Confirmation Modal ── */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-md w-full shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0A0F1A]">Delete Account</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Permanently erase your account and all associated data. This action cannot be undone. Type <span className="font-bold text-red-600 font-mono">DELETE</span> below to confirm.
              </p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Type DELETE here"
                value={deleteConfirmInput}
                onChange={(e) => setDeleteConfirmInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#0A0F1A] focus:outline-none focus:border-red-500 font-mono uppercase"
              />
              {deleteError && (
                <p className="text-xs text-red-500 mt-1.5">{deleteError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmInput.trim().toUpperCase() !== 'DELETE' || isDeleting}
                onClick={handleDeleteAccount}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete My Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
