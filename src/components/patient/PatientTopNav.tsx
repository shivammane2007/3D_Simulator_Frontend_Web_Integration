'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Globe, 
  ChevronDown, 
  User, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  BookOpen,
  MapPin
} from 'lucide-react';
import { routes } from '@/config/routes';
import { getStoredUser, signOutClient, UserSession, DEFAULT_PATIENT_USER } from '@/lib/auth-client';
import { useLanguage, languages } from '@/context/LanguageContext';

export default function PatientTopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const [user, setUser] = useState<UserSession>(DEFAULT_PATIENT_USER);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncUser = () => {
      const stored = getStoredUser();
      if (stored) setUser(stored);
    };
    syncUser();
    window.addEventListener('fl_auth_changed', syncUser);
    return () => window.removeEventListener('fl_auth_changed', syncUser);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOutClient();
    router.push('/login');
  };

  const navLinks = [
    { label: 'Dashboard', href: '/patient/dashboard' },
    { label: 'Try Simulators', href: routes.simulate },
    { label: 'Procedure Guides', href: routes.procedures },
    { label: 'Find a Surgeon', href: routes.directory },
  ];

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <header className="sticky top-0 z-50 bg-[#0E1715] text-[#F3F0EE] border-b border-white/10 select-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link 
            href="/patient/dashboard" 
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            {/* Connected nodes logo mark */}
            <svg className="w-7 h-7 text-[#4ECCA3]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="3.5" fill="currentColor" />
              <circle cx="6" cy="10" r="2.5" fill="currentColor" fillOpacity="0.8" />
              <circle cx="26" cy="10" r="2.5" fill="currentColor" fillOpacity="0.8" />
              <circle cx="8" cy="24" r="2" fill="currentColor" fillOpacity="0.6" />
              <circle cx="24" cy="24" r="2" fill="currentColor" fillOpacity="0.6" />
              <line x1="16" y1="16" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="16" y1="16" x2="26" y2="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="16" y1="16" x2="8" y2="24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
              <line x1="16" y1="16" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-bold tracking-tight text-base text-white">faceify</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">labs</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/patient/dashboard' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-white bg-white/10 font-semibold' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Language & User Avatar */}
        <div className="flex items-center gap-3">
          
          {/* Language Switcher */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[#16221E] border border-white/10 rounded-xl shadow-xl p-1.5 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      language === l.code ? 'bg-[#2D5548] text-white font-semibold' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[10px] uppercase opacity-75">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Avatar & Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-[#2D5548] text-white flex items-center justify-center font-semibold text-sm shadow-inner">
                {userInitial}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white text-[#141413] rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50">
                <div className="pb-3 border-b border-slate-100">
                  <p className="text-sm font-bold text-ink truncate">{user.name || 'Shivam Mane'}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{user.email || 'shivammane2007@gmail.com'}</p>
                </div>

                <div className="pt-2 space-y-1">
                  <Link
                    href="/patient/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-ink transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/patient/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-ink transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Settings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-[#CF4500] hover:bg-orange-50 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4 text-[#CF4500]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121E1A] border-b border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

