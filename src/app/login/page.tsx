'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowRight, Eye, EyeOff, Loader2, CheckCircle2, LogOut, UserCheck } from 'lucide-react';
import { routes } from '@/config/routes';

type AuthMode = 'code' | 'password' | 'signup';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<AuthMode>('code');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if user is currently already signed in
  const [currentUser, setCurrentUser] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const token = localStorage.getItem('fl_auth_token') || sessionStorage.getItem('fl_auth_token');
      const userRaw = localStorage.getItem('fl_user') || sessionStorage.getItem('fl_user');
      if (token && userRaw) {
        const parsed = JSON.parse(userRaw);
        setCurrentUser(parsed);
      }
    } catch {
      // Non-fatal
    }
  }, []);

  // Complete sign-in / sign-up and establish session
  const completeAuth = (userEmail: string, userName?: string, provider = 'email') => {
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage('Authenticating session...');

    setTimeout(() => {
      try {
        const id = 'usr_' + Math.random().toString(36).substring(2, 9);
        const resolvedName = userName || (userEmail.toLowerCase().includes('shivam') ? 'Shivam Mane' : userEmail.split('@')[0]);

        // Format standard 3-segment base64url JWT payload
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(
          JSON.stringify({
            id,
            email: userEmail,
            name: resolvedName,
            provider,
            role: 'patient',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          })
        );
        const signature = btoa('faceify_jwt_verified_sig_' + id);
        const jwtToken = `${header}.${payload}.${signature}`;

        const userObj = {
          id,
          email: userEmail,
          name: resolvedName,
          role: 'patient',
          createdAt: 'August 2026',
        };

        // Persist token in localStorage, sessionStorage, and document.cookie
        localStorage.setItem('fl_auth_token', jwtToken);
        sessionStorage.setItem('fl_auth_token', jwtToken);
        localStorage.setItem('fl_user', JSON.stringify(userObj));
        sessionStorage.setItem('fl_user', JSON.stringify(userObj));
        document.cookie = `fl_auth_token=${jwtToken}; path=/; max-age=2592000; SameSite=Lax`;
        document.cookie = `fl-session=${jwtToken}; path=/; max-age=2592000; SameSite=Lax`;

        window.dispatchEvent(new Event('fl_auth_changed'));

        setStatusMessage('Success! Redirecting...');

        setTimeout(() => {
          const destination = callbackUrl ? decodeURIComponent(callbackUrl) : '/patient/dashboard';
          router.push(destination);
        }, 500);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage('Failed to establish session. Please try again.');
      }
    }, 600);
  };

  const handleSignOut = () => {
    localStorage.removeItem('fl_auth_token');
    sessionStorage.removeItem('fl_auth_token');
    localStorage.removeItem('fl_user');
    sessionStorage.removeItem('fl_user');
    document.cookie = 'fl_auth_token=; path=/; max-age=0; SameSite=Lax';
    document.cookie = 'fl-session=; path=/; max-age=0; SameSite=Lax';
    setCurrentUser(null);
    setStatusMessage('Signed out successfully.');
    window.dispatchEvent(new Event('fl_auth_changed'));
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if ((mode === 'password' || mode === 'signup') && password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    completeAuth(email, name);
  };

  const handleOAuth = (provider: string) => {
    const demoEmail =
      email.includes('@') ? email : `user.${provider.toLowerCase()}@faceifylabs.com`;
    completeAuth(demoEmail, undefined, provider);
  };

  return (
    <div className="min-h-screen bg-warm flex flex-col items-center justify-center px-4 py-16 sm:py-24 font-body">
      {/* Faceify Brand Logo Above Card */}
      <div className="flex items-center justify-center mb-8">
        <Link href={routes.home} className="hover:opacity-90 transition-opacity">
          <img src="/logo-light.svg" alt="Faceify Labs" className="h-14 sm:h-16 w-auto" />
        </Link>
      </div>

      {/* Main Auth Container Card */}
      <div className="w-full max-w-[440px] bg-white rounded-[28px] border border-slate-200/90 shadow-xl p-8 sm:p-10 transition-all">
        {mounted && currentUser ? (
          /* Already Signed In View */
          <div className="text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-[#CF4500]/10 text-[#CF4500] flex items-center justify-center mx-auto">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-serif text-ink mb-1">
                Welcome back
              </h2>
              <p className="text-sm text-slate-500">
                You are signed in as <strong className="text-ink">{currentUser.email}</strong>
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  const destination = callbackUrl ? decodeURIComponent(callbackUrl) : '/patient/dashboard';
                  router.push(destination);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#CF4500] hover:bg-[#F37338] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[#CF4500]/25 cursor-pointer"
              >
                <span>{callbackUrl ? 'Continue to Destination' : 'Go to Patient Dashboard'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSignOut}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Standard Login / Signup Forms */
          <>
            <h1 className="text-2xl font-bold font-serif text-ink text-center mb-6">
              {mode === 'signup'
                ? 'Create your account'
                : mode === 'password'
                ? 'Sign in with password'
                : 'Sign in'}
            </h1>

            {/* Social / OAuth Buttons (Shown in 'code' or 'password' modes) */}
            {mode !== 'signup' && (
              <div className="space-y-3 mb-6">
                {/* Apple */}
                <button
                  type="button"
                  onClick={() => handleOAuth('Apple')}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2.5 text-sm font-semibold cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170" aria-hidden="true">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.94-12.04-14.58-6.19-9.5-10.97-20.08-14.34-31.74-3.37-11.66-5.06-22.38-5.06-32.17 0-14.4 3.52-26.04 10.55-34.92 7.03-8.88 15.79-13.43 26.27-13.66 4.93 0 10.33 1.34 16.2 4.02 5.87 2.68 9.77 4.08 11.71 4.2 2.37-.36 6.39-1.85 12.05-4.48 5.66-2.62 10.74-3.83 15.24-3.62 11.53.58 20.89 4.75 28.08 12.51-10.02 6.07-14.93 14.51-14.74 25.32.22 8.35 3.33 15.35 9.33 21 6 5.65 13.06 8.78 21.19 9.38-2.19 6.83-4.87 13.67-8.03 20.52zM119.22 31.84c0-7.39 2.64-14.28 7.92-20.67 5.28-6.39 11.83-10.37 19.65-11.95.83 1.83 1.25 3.69 1.25 5.58 0 7.37-2.73 14.3-8.19 20.78-5.46 6.48-12.09 10.35-19.89 11.62-.24-1.79-.74-3.58-.74-5.36z" />
                  </svg>
                  <span>Continue with Apple</span>
                </button>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={() => handleOAuth('WhatsApp')}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 text-ink hover:bg-slate-50 transition-colors flex items-center justify-center gap-2.5 text-sm font-semibold cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-[#25D366] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.25-4.43c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.63c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
                  </svg>
                  <span>Continue with WhatsApp</span>
                </button>

                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleOAuth('Google')}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white border border-slate-200 text-ink hover:bg-slate-50 transition-colors flex items-center justify-center gap-2.5 text-sm font-semibold cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            )}

            {/* Divider */}
            {mode !== 'signup' && (
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-xs text-slate-400 font-medium">
                  or continue with email
                </span>
              </div>
            )}

            {/* Error & Status Feedback */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {errorMessage}
              </div>
            )}

            {statusMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FDEEE7] border border-[#CF4500]/25 text-xs text-[#9A3A0A] font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#CF4500]" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Optional Name for Sign up */}
              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5 block">
                    Full Name (optional)
                  </label>
                  <input
                    suppressHydrationWarning
                    type="text"
                    placeholder="Dr. Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#CF4500] focus:ring-2 focus:ring-[#CF4500]/15 transition-all shadow-xs"
                  />
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1.5 block">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    suppressHydrationWarning
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#CF4500] focus:ring-2 focus:ring-[#CF4500]/15 transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Password field for password or signup modes */}
              {(mode === 'password' || mode === 'signup') && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                      PASSWORD
                    </label>
                    {mode === 'password' && (
                      <a href="#" className="text-xs text-[#CF4500] hover:text-[#9A3A0A] transition-colors">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      suppressHydrationWarning
                      required
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm text-ink bg-white placeholder:text-slate-400 focus:outline-none focus:border-[#CF4500] focus:ring-2 focus:ring-[#CF4500]/15 transition-all shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#CF4500] hover:bg-[#F37338] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-[#CF4500]/25 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing in…</span>
                    </>
                  ) : mode === 'signup' ? (
                    <>
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : mode === 'password' ? (
                    <>
                      <span>Sign in</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Send sign-in code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Password Switcher Link */}
              {mode === 'code' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('password');
                      setErrorMessage(null);
                    }}
                    className="text-xs text-[#CF4500] hover:text-[#9A3A0A] font-medium transition-colors cursor-pointer"
                  >
                    Have a password? Sign in →
                  </button>
                </div>
              )}

              {mode === 'password' && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('code');
                      setErrorMessage(null);
                    }}
                    className="text-xs text-[#CF4500] hover:text-[#9A3A0A] font-medium transition-colors cursor-pointer"
                  >
                    Use email code instead →
                  </button>
                </div>
              )}
            </form>

            {/* Inset Account Switcher Box */}
            <div className="border border-slate-200/90 rounded-2xl p-4 text-center mt-6 bg-slate-50/50">
              <p className="text-xs text-slate-500 mb-1">
                {mode === 'signup' ? 'Already have an account?' : 'New to Faceify Labs?'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signup' ? 'code' : 'signup');
                  setErrorMessage(null);
                }}
                className="text-xs font-semibold text-[#CF4500] hover:text-[#9A3A0A] hover:underline cursor-pointer transition-colors"
              >
                {mode === 'signup' ? 'Sign in →' : 'Create an account →'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Terms and Privacy Notice */}
      <p className="mt-8 text-center text-xs text-slate-500 max-w-sm leading-relaxed">
        By continuing, you agree to Faceify Labs&apos;{' '}
        <Link href={routes.terms} className="underline text-[#141413] hover:text-[#CF4500] transition-colors">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href={routes.privacy} className="underline text-[#141413] hover:text-[#CF4500] transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-warm" />}>
      <LoginContent />
    </Suspense>
  );
}
