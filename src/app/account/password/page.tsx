'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';
import { getStoredUser, persistUserSession } from '@/lib/auth-client';

export default function AccountPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      persistUserSession({ hasPassword: true });
      setIsSubmitting(false);
      setSuccess(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex flex-col justify-center items-center px-4 py-20 font-sans selection:bg-[#305A4F]/15">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/patient/settings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Settings</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#EDE8E0] shadow-sm p-8 sm:p-10 text-left">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#141413]">Password set successfully</h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                You can now use this password to sign in without waiting for an email code.
              </p>
              <div className="pt-2">
                <Link
                  href="/patient/settings"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#7C9082] hover:bg-[#6A7D70] text-white text-xs font-semibold transition-colors"
                >
                  Return to Settings
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Heading (Image 3) */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#141413] tracking-tight mb-2">
                  Set a password
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  This lets you sign in without waiting for an email code.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New Password */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-sans">
                    NEW PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#141413] bg-white focus:outline-none focus:border-[#7C9082] focus:ring-1 focus:ring-[#7C9082]/30 transition-all font-sans pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 font-sans">
                    At least 8 characters
                  </p>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-sans">
                    CONFIRM NEW PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder=""
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#141413] bg-white focus:outline-none focus:border-[#7C9082] focus:ring-1 focus:ring-[#7C9082]/30 transition-all font-sans pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit button (Image 3) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || newPassword.length < 8 || newPassword !== confirmPassword}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#8FA89B] hover:bg-[#7C9789] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-xs cursor-pointer text-center"
                  >
                    {isSubmitting ? 'Saving...' : 'Set password'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

