'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import PatientTopNav from '@/components/patient/PatientTopNav';
import PatientSidebar from '@/components/patient/PatientSidebar';
import { getStoredUser } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (!user) {
      setIsAuthenticated(false);
      const callback = encodeURIComponent(pathname || '/patient/dashboard');
      router.replace(`/login?callbackUrl=${callback}`);
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Loading state while verifying auth session
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#FBFBF9] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-8 h-8 text-[#2D5548] animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-600">Verifying your patient session…</p>
        <p className="text-xs text-slate-400 mt-1">Please sign in if prompted</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBF9] text-ink antialiased">
      {/* Dark Patient Top Bar */}
      <PatientTopNav />

      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <PatientSidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-[#FBFBF9] p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

