"use client";

import { useEffect, useState, useRef, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, Ticket, ArrowRight, Loader2, Shield, CheckCircle2, AlertCircle } from "lucide-react";
import { getStoredUser, signOutClient } from "@/lib/auth-client";
import { useTranslations } from "@/i18n/messages";

const SimulatorAccessContext = createContext<boolean>(false);

export function useSimulatorAccessGranted(): boolean {
  return useContext(SimulatorAccessContext);
}

const CREDIT_TIERS = [
  { qty: 1, price: "₹1,999", label: "1 credit: ₹1,999" },
  { qty: 3, price: "₹5,997", label: "3 credits: ₹5,997" },
  { qty: 5, price: "₹9,995", label: "5 credits: ₹9,995" },
];

export default function SimulatorAccessGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Access");

  // The simulate hub (/simulate) is public; individual procedure simulators are strictly gated.
  const isHubPage = pathname === "/simulate";
  const procedureSlug = pathname.split("/").filter(Boolean).pop() || "rhinoplasty";

  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("shivammane2007@gmail.com");
  
  // Paywall state
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [creditBalance, setCreditBalance] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [showVoucherInput, setShowVoucherInput] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherSuccess, setVoucherSuccess] = useState<string | null>(null);
  const [voucherError, setVoucherError] = useState<string | null>(null);

  const gateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    if (isHubPage) {
      setIsUnlocked(true);
      setIsChecking(false);
      return;
    }

    try {
      // 1. Check user session
      const stored = getStoredUser();
      if (stored && stored.email) {
        setUserEmail(stored.email);
      }

      // 2. Strict restriction: wipe any stored unlock keys so no account can enter
      localStorage.removeItem("fl_unlocked_simulators");
      sessionStorage.removeItem("fl_unlocked_simulators");

      // 3. Stored credit balance
      const storedCredits = localStorage.getItem("fl_credits_balance");
      const credits = storedCredits ? parseInt(storedCredits, 10) : 0;
      setCreditBalance(isNaN(credits) ? 0 : credits);

      // 4. Force locked: under no circumstance allow entry to the procedure simulator
      setIsUnlocked(false);
    } catch {
      setIsUnlocked(false);
    } finally {
      setIsChecking(false);
    }
  }, [isHubPage, pathname, procedureSlug]);

  // Handle buying credits: access is restricted for all accounts
  const handleBuyAndUnlock = () => {
    setIsProcessing(true);
    setActionNotice(null);

    setTimeout(() => {
      setIsProcessing(false);
      setActionNotice("Access restricted: This procedure simulator is currently in private clinic preview. Direct online access is closed.");
    }, 600);
  };

  // Handle redeeming credit: access is restricted for all accounts
  const handleRedeemCredit = () => {
    setIsProcessing(true);
    setActionNotice(null);

    setTimeout(() => {
      setIsProcessing(false);
      setActionNotice("Access restricted: Simulator access is currently invitation-only for verified partner clinics.");
    }, 600);
  };

  // Handle voucher redemption: access is restricted for all accounts
  const handleRedeemVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) {
      setVoucherError("Please enter a voucher code");
      return;
    }

    setIsProcessing(true);
    setVoucherError(null);

    setTimeout(() => {
      setIsProcessing(false);
      setVoucherError("Invalid code or access restricted for direct preview.");
    }, 600);
  };

  const handleSignOut = () => {
    signOutClient();
    router.push("/login");
  };

  // Hub page renders directly without any gate
  if (isHubPage) {
    return <>{children}</>;
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c1018]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-[#F37338] animate-spin" />
          <p className="text-slate-500 text-xs">Loading simulator...</p>
        </div>
      </div>
    );
  }

  // If simulator is NOT unlocked, show the Paywall Card styled with our Signal Orange theme
  if (!isUnlocked) {
    const overlay = (
      <div className="fixed inset-0 z-[75] flex items-center justify-center px-4 py-8 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div
          ref={gateRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          tabIndex={-1}
          className="max-w-[440px] w-full text-center bg-[#111317]/95 backdrop-blur-xl rounded-[28px] p-7 sm:p-9 border border-white/[0.08] shadow-2xl shadow-[#CF4500]/5 focus:outline-none animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Top Orange Icon (Sparkles) */}
          <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#28130B] border border-[#5A2512] flex items-center justify-center text-[#F37338] shadow-inner shadow-[#CF4500]/20">
            <Sparkles className="w-6 h-6" />
          </div>

          {/* Heading */}
          <h2 id="gate-title" className="text-2xl font-bold text-white mb-2 tracking-tight">
            Unlock this simulator
          </h2>

          {/* Subtitle with Orange price accent */}
          <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-xs mx-auto">
            Redeem a credit for 24-hour access, or buy credits · <span className="text-[#FF8A4C] font-semibold">₹1,999 each</span>.
          </p>

          {/* HOW MANY CREDITS? */}
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest text-[#F37338]/90 uppercase mb-3">
              HOW MANY CREDITS?
            </p>

            {/* Credit Option Pills (Row 1: 1 credit & 3 credits; Row 2: 5 credits) */}
            <div className="space-y-2">
              <div className="flex gap-2 justify-center">
                {CREDIT_TIERS.slice(0, 2).map((tier) => {
                  const isSelected = selectedQty === tier.qty;
                  return (
                    <button
                      key={tier.qty}
                      type="button"
                      onClick={() => setSelectedQty(tier.qty)}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#CF4500] bg-[#28130B] text-[#FF8A4C] shadow-sm shadow-[#CF4500]/25"
                          : "border-white/10 bg-[#161B22] text-slate-400 hover:border-[#CF4500]/40 hover:text-white"
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                {CREDIT_TIERS.slice(2, 3).map((tier) => {
                  const isSelected = selectedQty === tier.qty;
                  return (
                    <button
                      key={tier.qty}
                      type="button"
                      onClick={() => setSelectedQty(tier.qty)}
                      className={`w-full max-w-[210px] py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#CF4500] bg-[#28130B] text-[#FF8A4C] shadow-sm shadow-[#CF4500]/25"
                          : "border-white/10 bg-[#161B22] text-slate-400 hover:border-[#CF4500]/40 hover:text-white"
                      }`}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Notice when access is attempted */}
          {actionNotice && (
            <div className="mb-4 p-3 rounded-xl bg-[#28130B] border border-[#CF4500]/40 text-[#FF8A4C] text-xs font-medium text-left flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-[#F37338] shrink-0 mt-0.5" />
              <span>{actionNotice}</span>
            </div>
          )}

          {/* Primary Action Button (Get credits / Use credit) */}
          {creditBalance > 0 ? (
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleRedeemCredit}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#CF4500] to-[#E35414] hover:from-[#B83D00] hover:to-[#CF4500] text-white text-sm font-bold transition-all shadow-lg shadow-[#CF4500]/25 hover:shadow-[#CF4500]/35 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Checking authorization...</span>
                </>
              ) : (
                <>
                  <span>Use 1 credit ({creditBalance} available)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleBuyAndUnlock}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#CF4500] to-[#E35414] hover:from-[#B83D00] hover:to-[#CF4500] text-white text-sm font-bold transition-all shadow-lg shadow-[#CF4500]/25 hover:shadow-[#CF4500]/35 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Checking authorization...</span>
                </>
              ) : (
                <>
                  <span>Get credits</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}

          {/* Voucher Input or Voucher Toggle Button */}
          {showVoucherInput ? (
            <form onSubmit={handleRedeemVoucher} className="mt-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter voucher / invite code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs bg-[#161B22] border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#CF4500] focus:ring-1 focus:ring-[#CF4500]/30 uppercase font-mono tracking-wider"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2.5 bg-[#CF4500] hover:bg-[#B83D00] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
              {voucherError && <p className="text-[11px] text-red-400 text-left">{voucherError}</p>}
              {voucherSuccess && (
                <p className="text-[11px] text-[#FF8A4C] text-left flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{voucherSuccess}</span>
                </p>
              )}
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowVoucherInput(true)}
              className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-[#CF4500]/40 hover:bg-white/5 text-slate-300 font-medium text-xs transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-[#F37338]" />
              <span>Enter Voucher Code</span>
            </button>
          )}

          {/* Browse Procedures Button */}
          <button
            type="button"
            onClick={() => router.push("/procedures")}
            className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-[#CF4500]/30 hover:bg-white/5 text-slate-400 hover:text-white font-medium text-xs transition-all flex items-center justify-center gap-2 mt-2.5 cursor-pointer"
          >
            <span>Browse Procedures</span>
          </button>

          {/* User Sign-In Status */}
          <div className="text-[11px] text-slate-500 mt-5 mb-4">
            <span>Signed in as {userEmail} · </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="underline text-slate-400 hover:text-[#FF8A4C] transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>

          {/* Clinical Disclaimer */}
          <div className="pt-3 border-t border-white/[0.06] flex items-start gap-1.5 text-left text-[10px] text-slate-500 leading-normal">
            <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
            <p>
              Visualization aid only, not medical advice, and not a substitute for professional consultation. Your surgeon makes all clinical decisions.
            </p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="relative min-h-screen bg-[#0c1018]">
        {/* Blurred Teaser Behind Paywall */}
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

  // When unlocked, render simulator children normally
  return (
    <SimulatorAccessContext.Provider value={true}>
      {children}
    </SimulatorAccessContext.Provider>
  );
}
