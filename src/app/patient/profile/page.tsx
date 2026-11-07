'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Camera, 
  Loader2, 
  Save,
  Bell,
  Shield,
  Download,
  AlertTriangle,
  X
} from 'lucide-react';
import { getStoredUser, persistUserSession, signOutClient, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function PatientProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('IN');
  const [city, setCity] = useState('Mumbai');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Notification Preferences State (Matches Screenshot 2)
  const [notifConsultations, setNotifConsultations] = useState(true);
  const [notifSimulations, setNotifSimulations] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);

  // Delete Account Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      if (stored.dateOfBirth) setDob(stored.dateOfBirth);
      if (stored.gender) setGender(stored.gender);
      if (stored.country) setCountry(stored.country);
      if (stored.city) setCity(stored.city);
    }

    try {
      const savedNotifs = localStorage.getItem('faceify_patient_notif_prefs');
      if (savedNotifs) {
        const parsed = JSON.parse(savedNotifs);
        if (typeof parsed.notifConsultations === 'boolean') setNotifConsultations(parsed.notifConsultations);
        if (typeof parsed.notifSimulations === 'boolean') setNotifSimulations(parsed.notifSimulations);
        if (typeof parsed.notifUpdates === 'boolean') setNotifUpdates(parsed.notifUpdates);
      }
    } catch {
      // Non-fatal
    }
  }, []);

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      const updated = persistUserSession({
        dateOfBirth: dob,
        gender,
        country,
        city,
      });
      setUser(updated);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 400);
  };

  const handleToggleNotif = (key: 'consultations' | 'simulations' | 'updates', val: boolean) => {
    let nextConsultations = notifConsultations;
    let nextSimulations = notifSimulations;
    let nextUpdates = notifUpdates;

    if (key === 'consultations') {
      nextConsultations = val;
      setNotifConsultations(val);
    } else if (key === 'simulations') {
      nextSimulations = val;
      setNotifSimulations(val);
    } else if (key === 'updates') {
      nextUpdates = val;
      setNotifUpdates(val);
    }

    try {
      localStorage.setItem('faceify_patient_notif_prefs', JSON.stringify({
        notifConsultations: nextConsultations,
        notifSimulations: nextSimulations,
        notifUpdates: nextUpdates,
      }));
    } catch {
      // Non-fatal
    }
  };

  const handleDownloadData = () => {
    const data = {
      user,
      profile: {
        dateOfBirth: dob,
        gender,
        country,
        city,
      },
      notificationPreferences: {
        notifConsultations,
        notifSimulations,
        notifUpdates,
      },
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faceify-patient-data-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') return;
    setIsDeleting(true);
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

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans mb-1">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 font-sans max-w-2xl">
          Your personal space on Faceify Labs. Share what you&apos;re comfortable with; surgeons use this to serve you better.
        </p>
      </div>

      {/* Card 1: Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Box with Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[#305A4F] text-white flex items-center justify-center font-bold text-3xl shadow-sm">
              {userInitial}
            </div>
            <button 
              type="button"
              title="Update photo"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#305A4F] hover:bg-[#25453C] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-1 font-sans">
            <h2 className="text-lg font-bold text-[#0A0F1A]">{user.name || 'Shivam Mane'}</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user.email || 'shivammane2007@gmail.com'}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-[11px] text-green-600 font-medium">Email verified</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {user.createdAt || 'August 2026'}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 font-sans">
          To update your display name, visit{' '}
          <Link href="/patient/settings" className="font-semibold text-[#305A4F] hover:underline">
            Settings
          </Link>
        </div>
      </div>

      {/* Card 2: Form: About You */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A] font-sans">About You</h2>
        </div>
        <p className="text-xs text-[#555555] mb-6 font-normal">
          All fields are optional. Sharing helps surgeons match you with the right specialist and currency.
        </p>

        <form onSubmit={handleSaveAbout} className="space-y-4 max-w-xl">
          {/* Date of Birth */}
          <div>
            <label className="text-xs font-medium text-[#141413] block mb-1.5">
              Date of birth <span className="text-[#696969] font-normal">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white placeholder:text-[#696969] focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all"
              />
              <Calendar className="w-4 h-4 text-[#696969] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-medium text-[#141413] block mb-1.5">
              Gender <span className="text-[#696969] font-normal">(optional)</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all cursor-pointer"
            >
              <option value="">Select gender..</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non_binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="text-xs font-medium text-[#141413] block mb-1.5">
              Country <span className="text-[#696969] font-normal">(optional)</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#696969] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="E.G. IN, TH, SG"
                value={country}
                onChange={(e) => setCountry(e.target.value.toUpperCase())}
                maxLength={3}
                className="w-full pl-10 pr-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white placeholder:text-[#696969] focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all uppercase"
              />
            </div>
            <p className="text-[11px] text-[#696969] mt-1 font-normal">
              2-letter ISO code (e.g. IN for India, TH for Thailand, SG for Singapore)
            </p>
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-medium text-[#141413] block mb-1.5">
              City <span className="text-[#696969] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Bangkok, Singapore"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-[16px] border border-black/10 text-sm text-[#141413] bg-white placeholder:text-[#696969] focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/20 transition-all"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#305A4F] hover:bg-[#25453C] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Changes</span>
            </button>

            {saveSuccess && (
              <span className="text-xs text-green-600 font-medium flex items-center gap-1 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Profile updated successfully</span>
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Card 3: Notification Preferences (Matches Screenshot 2) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A] font-sans">Notification Preferences</h2>
        </div>

        <div className="space-y-5 max-w-xl">
          {/* Toggle 1: Consultation confirmed */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#141413]">Consultation confirmed</p>
              <p className="text-xs text-[#555555] mt-0.5 font-normal">
                Email me when a surgeon confirms my consultation request
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifConsultations}
              onClick={() => handleToggleNotif('consultations', !notifConsultations)}
              className={`shrink-0 relative w-11 h-6 rounded-full transition-colors focus:outline-none cursor-pointer ${
                notifConsultations ? 'bg-[#23493F]' : 'bg-black/15'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  notifConsultations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="border-t border-black/5" />

          {/* Toggle 2: Simulation shared with me */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#141413]">Simulation shared with me</p>
              <p className="text-xs text-[#555555] mt-0.5 font-normal">
                Email me when a surgeon shares a simulation result with me
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifSimulations}
              onClick={() => handleToggleNotif('simulations', !notifSimulations)}
              className={`shrink-0 relative w-11 h-6 rounded-full transition-colors focus:outline-none cursor-pointer ${
                notifSimulations ? 'bg-[#23493F]' : 'bg-black/15'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  notifSimulations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="border-t border-black/5" />

          {/* Toggle 3: Product updates */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#141413]">Product updates</p>
              <p className="text-xs text-[#555555] mt-0.5 font-normal">
                Occasional emails about new procedures, features, and promotions
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notifUpdates}
              onClick={() => handleToggleNotif('updates', !notifUpdates)}
              className={`shrink-0 relative w-11 h-6 rounded-full transition-colors focus:outline-none cursor-pointer ${
                notifUpdates ? 'bg-[#23493F]' : 'bg-black/15'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  notifUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Card 4: Privacy & Data (Matches Screenshot 2) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-[#0A0F1A] font-sans">Privacy & Data</h2>
        </div>

        <div className="space-y-4 max-w-xl">
          {/* Action 1: Download my data */}
          <button
            type="button"
            onClick={handleDownloadData}
            className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-black/5 hover:border-black/15 bg-[#FCFBFA] hover:bg-[#F3F0EE] transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4 text-[#CF4500]" />
              <span className="text-sm font-medium text-[#141413]">Download my data</span>
            </div>
            <span className="text-xs text-[#696969] group-hover:text-[#CF4500] transition-colors">JSON export</span>
          </button>

          {/* Action 2: Privacy controls & AI photo consent */}
          <Link
            href="/patient/settings"
            className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-black/5 hover:border-black/15 bg-[#FCFBFA] hover:bg-[#F3F0EE] transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#CF4500]" />
              <span className="text-sm font-medium text-[#141413]">Privacy controls & AI photo consent</span>
            </div>
            <span className="text-xs text-[#696969] group-hover:text-[#CF4500] transition-colors">Settings →</span>
          </Link>

          {/* Danger Zone: Delete my account */}
          <div className="pt-4 border-t border-black/5">
            <p className="text-xs text-[#555555] mb-3 leading-relaxed">
              Permanently delete your account and all data. This action cannot be undone.
            </p>
            <button
              type="button"
              onClick={() => setDeleteModalOpen(true)}
              className="px-5 py-2 rounded-[16px] border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all cursor-pointer"
            >
              Delete my account
            </button>
          </div>
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
              <h3 className="text-lg font-medium text-[#141413]">Delete Account</h3>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                This will immediately delete all your simulation results, notifications, and profile details. Type <span className="font-bold text-red-600 font-mono">DELETE</span> below to confirm.
              </p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Type DELETE"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-[16px] border border-black/15 text-sm text-[#141413] focus:outline-none focus:border-red-500 font-mono uppercase"
              />
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
                disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE' || isDeleting}
                onClick={handleDeleteAccount}
                className="px-5 py-2.5 rounded-[20px] bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
