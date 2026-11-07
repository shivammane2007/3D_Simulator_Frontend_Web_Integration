"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "@/i18n/messages";
import IntendedUseNotice from "@/components/IntendedUseNotice";

const SimulatorAccessContext = createContext<boolean>(true);

export function useSimulatorAccessGranted(): boolean {
  return useContext(SimulatorAccessContext);
}

export default function SimulatorAccessGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Access");

  // The simulate hub (/simulate) is public; only individual simulator pages require auth.
  const isHubPage = pathname === "/simulate";

  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const gateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Hub page is completely public
    if (isHubPage) {
      setIsChecking(false);
      return;
    }

    // Check client session / auth token if present
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("fl_auth_token") || sessionStorage.getItem("fl_auth_token") : null;
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsChecking(false);
    }
  }, [isHubPage, pathname]);

  // Hub page renders directly without any gate
  if (isHubPage) {
    return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1018]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-[#CF4500] animate-spin" />
          <p className="text-slate-500 text-xs">Loading simulator...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const overlay = (
      <div className="fixed inset-0 z-[75] flex items-center justify-center px-4 bg-black/75 backdrop-blur-md">
        <div
          ref={gateRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          tabIndex={-1}
          className="max-w-md w-full text-center bg-[#141a24]/95 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl focus:outline-none"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#CF4500]/15 flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-[#CF4500]" />
          </div>
          <h2 id="gate-title" className="text-2xl font-bold text-white mb-3">
            {t("signInTitle") || "Sign in to access simulators"}
          </h2>
          <p className="text-slate-400 mb-6 text-sm">
            {t("signInDescription") || "Create a free account or sign in to start your simulation"}
          </p>
          <p className="text-slate-400 mb-6 text-xs flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
            {t("freeAccountNote") || "Free account · takes 30 seconds"}
          </p>
          <button
            onClick={() => router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#CF4500] hover:bg-[#F37338] text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-[#CF4500]/25 cursor-pointer"
          >
            {t("signInButton") || "Sign In"} <ArrowRight className="w-4 h-4" />
          </button>
          <IntendedUseNotice className="justify-center mt-6 text-slate-500 text-[11px]" />
        </div>
      </div>
    );

    return (
      <div className="relative min-h-screen bg-[#0c1018]">
        <SimulatorAccessContext.Provider value={false}>
          <div
            aria-hidden="true"
            className="pointer-events-none select-none opacity-20 blur-md"
          >
            {children}
          </div>
        </SimulatorAccessContext.Provider>
        {mounted && typeof document !== "undefined" && createPortal(overlay, document.body)}
      </div>
    );
  }

  return (
    <SimulatorAccessContext.Provider value={true}>
      {children}
    </SimulatorAccessContext.Provider>
  );
}
