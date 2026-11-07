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
        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-[#141413]">
          My Profile
        </h1>
        <p className="text-sm text-[#555555] mt-1.5 max-w-2xl font-normal">
          Your personal space on Faceify Labs. Share what you&apos;re comfortable with; surgeons use this to serve you better.
        </p>
      </div>

      {/* Identity Card */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar Box with Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-[20px] bg-[#141413] text-[#F3F0EE] flex items-center justify-center font-bold text-3xl shadow-sm">
              {userInitial}
            </div>
            <button 
              type="button"
              title="Update photo"
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#CF4500] hover:bg-[#F37338] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-[#141413]">{user.name || 'Shivam Mane'}</h2>
            <div className="flex items-center gap-1.5 text-xs text-[#555555]">
              <Mail className="w-3.5 h-3.5 text-[#696969]" />
              <span>{user.email || 'shivammane2007@gmail.com'}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#CF4500]" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#696969] pt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Member since {user.createdAt || 'August 2026'}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-black/5 text-xs text-[#555555]">
          To update your display name, visit{' '}
          <Link href="/patient/settings" className="font-medium text-[#CF4500] hover:underline">
            Settings
          </Link>
        </div>
      </div>

      {/* Form: About You */}
      <div className="bg-white rounded-[24px] border border-black/5 p-6 sm:p-7 shadow-level-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-[14px] bg-[#FDEEE7] text-[#CF4500] flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-base font-medium text-[#141413]">About You</h2>
        </div>
        <p className="text-xs text-[#555555] mb-6 font-normal">
          All fields are optional. Sharing helps surgeons match you with the right specialist and currency.
        </p>

        <form onSubmit={handleSave} className="space-y-4 max-w-xl">
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[20px] bg-[#141413] hover:bg-[#262627] text-[#F3F0EE] text-xs font-medium tracking-tight shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Changes</span>
            </button>

            {saveSuccess && (
              <span className="text-xs text-[#CF4500] font-medium flex items-center gap-1">
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

