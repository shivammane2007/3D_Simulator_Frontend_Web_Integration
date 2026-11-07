"use client";

// Bottom-left "Book a Demo" pill on the surgeon-facing marketing routes in ALLOWED_PATHS,
// revealed after 3 s or 150 px of scroll and dismissible for 7 days.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendarDays, X } from "lucide-react";
import { openDemoModal } from "@/lib/analytics";

const DISMISS_KEY = "fl-demo-cta-dismissed-until";
const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const REVEAL_AFTER_MS = 1500;
const REVEAL_AFTER_SCROLL_PX = 150;

// Routes where this CTA renders.
const ALLOWED_PATHS = new Set([
    "/pricing",
    "/for-surgeons",
    "/for-surgeons/guide",
    "/technology",
    "/our-story",
    "/use-cases",
    "/faq",
    "/blog",
    "/partners",
    "/trust",
    "/gallery",
]);

function stripLocale(path: string): string {
    const m = path.match(/^\/(en|th|ko|pt|ja)(\/.*)?$/);
    if (m) return m[2] ?? "/";
    return path;
}

export default function FloatingDemoCTA() {
    const pathname = usePathname();
    const [revealed, setRevealed] = useState(false);
    const [dismissed, setDismissed] = useState(true);

    useEffect(() => {
        let dismissedNow = false;
        try {
            const raw = localStorage.getItem(DISMISS_KEY);
            const until = raw ? Number(raw) : 0;
            dismissedNow = Number.isFinite(until) && until > Date.now();
        } catch {
            dismissedNow = false;
        }
        const id = window.setTimeout(() => setDismissed(dismissedNow), 0);
        return () => window.clearTimeout(id);
    }, []);

    useEffect(() => {
        if (dismissed) return;
        let cancelled = false;
        const timer = setTimeout(() => {
            if (!cancelled) setRevealed(true);
        }, REVEAL_AFTER_MS);
        const onScroll = () => {
            if (window.scrollY > REVEAL_AFTER_SCROLL_PX) {
                setRevealed(true);
                window.removeEventListener("scroll", onScroll);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelled = true;
            clearTimeout(timer);
            window.removeEventListener("scroll", onScroll);
        };
    }, [dismissed]);

    const stripped = stripLocale(pathname ?? "/");
    if (!ALLOWED_PATHS.has(stripped)) return null;
    if (dismissed) return null;

    function handleClick() {
        openDemoModal("floating_cta");
    }

    function handleDismiss(e: React.MouseEvent) {
        e.stopPropagation();
        try {
            localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION_MS));
        } catch {
            /* ignore */
        }
        setDismissed(true);
    }

    return (
        <div
            className={`hidden sm:flex items-center gap-2 fixed left-6 bottom-6 z-[55] transition-all duration-500 ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
            }`}
            role="region"
            aria-label="Book a demo"
        >
            <button
                type="button"
                onClick={handleClick}
                className="flex min-h-11 items-center gap-2 pl-4 pr-5 py-3 rounded-full bg-sage hover:bg-sage-light text-white text-sm font-bold shadow-lg shadow-sage/30 transition-colors"
            >
                <CalendarDays className="w-4 h-4" aria-hidden="true" />
                <span>Book a Demo</span>
            </button>
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss for 7 days"
                title="Dismiss"
                className="w-11 h-11 rounded-full bg-warm border border-slate-200 text-slate-500 hover:text-ink hover:border-slate-400 flex items-center justify-center shadow-sm transition-colors"
            >
                <X className="w-4 h-4" aria-hidden="true" />
            </button>
        </div>
    );
}

