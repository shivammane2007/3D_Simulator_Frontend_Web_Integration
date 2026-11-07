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
  Save 
} from 'lucide-react';
import { getStoredUser, persistUserSession, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';

export default function PatientProfilePage() {
  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('IN');
  const [city, setCity] = useState('Mumbai');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      if (stored.dateOfBirth) setDob(stored.dateOfBirth);
      if (stored.gender) setGender(stored.gender);
      if (stored.country) setCountry(stored.country);
      if (stored.city) setCity(stored.city);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
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
    }, 500);
  };

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-ink tracking-tight">
          My Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Your personal space on Faceify Labs. Share what you&apos;re comfortable with; surgeons use this to serve you better.
        </p>
      </div>

      {/* Identity Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Box with Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-[#543E38] text-white flex items-center justify-center font-bold text-3xl shadow-sm">
              {userInitial}
            </div>
            <button 
              type="button"
              title="Update photo"
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2D5548] text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-ink">{user.name || 'Shivam Mane'}</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user.email || 'shivammane2007@gmail.com'}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5548]" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {user.createdAt || 'August 2026'}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
          To update your display name, visit{' '}
          <Link href="/patient/settings" className="font-semibold text-[#2D5548] hover:underline">
            Settings
          </Link>
        </div>
      </div>

      {/* Form: About You */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[#2D5548]/10 text-[#2D5548] flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-ink">About You</h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          All fields are optional. Sharing helps surgeons match you with the right specialist and currency.
        </p>

        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
          {/* Date of Birth */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Date of birth <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#2D5548] focus:ring-1 focus:ring-[#2D5548]/20 transition-all"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Gender <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-ink bg-white focus:outline-none focus:border-[#2D5548] focus:ring-1 focus:ring-[#2D5548]/20 transition-all cursor-pointer"
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
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Country <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="E.G. IN, TH, SG"
                value={country}
                onChange={(e) => setCountry(e.target.value.toUpperCase())}
                maxLength={3}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#2D5548] focus:ring-1 focus:ring-[#2D5548]/20 transition-all uppercase"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              2-letter ISO code (e.g. IN for India, TH for Thailand, SG for Singapore)
            </p>
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              City <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Bangkok, Singapore"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#2D5548] focus:ring-1 focus:ring-[#2D5548]/20 transition-all"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2D5548] hover:bg-[#23453a] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Changes</span>
            </button>

            {saveSuccess && (
              <span className="text-xs text-[#2D5548] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Profile updated successfully</span>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

