"use client";

/**
 * ProcedureStickyNav — sticky in-page nav for the long /procedures/[slug]
 * page. Renders only on small viewports (where the page is one long
 * scroll and the desktop sidebar TOC isn't visible). Highlights the
 * active section as the user scrolls via IntersectionObserver.
 *
 * Production-grade requirements honoured:
 *   - SSR-safe (initial render shows the first item active so there's
 *     no flash on hydration)
 *   - prefers-reduced-motion: skip the smooth-scroll animation on
 *     anchor click
 *   - Hidden until the user scrolls past the hero so it doesn't fight
 *     the page header
 *   - Honours Tailwind's `sm:hidden` so it never shows on desktop
 *   - Each anchor target needs a matching `id` on the rendered section
 *     — those ids live alongside the section markup in
 *     /procedures/[slug]/page.tsx so this component is decoupled
 */

import { useCallback, useEffect, useRef, useState } from "react";

interface NavItem {
    id: string;
    label: string;
}

interface ProcedureStickyNavProps {
    /** Section anchors in the order they appear on the page. */
    items: NavItem[];
    /** Pixel offset of the nav from viewport top (matches header height) */
    offsetTop?: number;
}

const REVEAL_AFTER_SCROLL_PX = 280;

export default function ProcedureStickyNav({
    items,
    offsetTop = 56,
}: ProcedureStickyNavProps) {
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
    const [revealed, setRevealed] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    // Active-section detection. IntersectionObserver fires on scroll
    // direction changes; we pick the topmost intersecting target whose
    // top is within the upper third of the viewport (rootMargin shrinks
    // the bottom so a section "becomes active" only when it's properly
    // scrolled into focus, not as the leading edge first appears).
    useEffect(() => {
        if (typeof window === "undefined") return;
        const observers: IntersectionObserver[] = [];
        const visibility = new Map<string, number>();

        const handleEntries = (entries: IntersectionObserverEntry[]) => {
            for (const e of entries) {
                visibility.set(e.target.id, e.intersectionRatio);
            }
            // Pick the section with highest visibility ratio. Ties broken
            // by document order (ie. the first matching one).
            let bestId = activeId;
            let bestRatio = 0;
            for (const item of items) {
                const ratio = visibility.get(item.id) ?? 0;
                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestId = item.id;
                }
            }
            if (bestRatio > 0 && bestId !== activeId) {
                setActiveId(bestId);
            }
        };

        for (const item of items) {
            const el = document.getElementById(item.id);
            if (!el) continue;
            const obs = new IntersectionObserver(handleEntries, {
                // -40% from top means a section needs to be scrolled into
                // the upper 60% before it's considered "current"
                rootMargin: `-${offsetTop + 8}px 0px -40% 0px`,
                threshold: [0, 0.25, 0.5, 0.75, 1],
            });
            obs.observe(el);
            observers.push(obs);
        }
        return () => observers.forEach((o) => o.disconnect());
        // activeId intentionally not a dep — including it would cycle
        // the observer constantly. Same for handleEntries' closure-read.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, offsetTop]);

    // Reveal after the user scrolls past the hero.
    useEffect(() => {
        if (typeof window === "undefined") return;
        const onScroll = () => {
            const should = window.scrollY > REVEAL_AFTER_SCROLL_PX;
            setRevealed((prev) => (prev === should ? prev : should));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Smooth-scroll on anchor click; respect prefers-reduced-motion.
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY - offsetTop - 8;
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
            setActiveId(id);

            // Scroll the active chip into view inside the horizontal track
            // so users on phones can always see where they are. Optional-
            // chain `scrollIntoView` so older browsers (and jsdom) don't
            // crash when the API is missing.
            const chip = trackRef.current?.querySelector<HTMLElement>(`a[href="#${id}"]`);
            chip?.scrollIntoView?.({ behavior: "smooth", inline: "center", block: "nearest" });
        },
        [offsetTop],
    );

    return (
        <nav
            aria-label="Sections on this page"
            className={`sm:hidden sticky z-40 bg-warm/95 backdrop-blur border-b border-slate-200 transition-all duration-300 ${
                revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{ top: offsetTop }}
        >
            <div ref={trackRef} className="overflow-x-auto scrollbar-none">
                <div className="flex gap-1 px-3 py-2 min-w-max">
                    {items.map((item) => {
                        const isActive = item.id === activeId;
                        return (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                                aria-current={isActive ? "true" : undefined}
                                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-body font-semibold transition-colors whitespace-nowrap ${
                                    isActive
                                        ? "bg-[#CF4500] text-white shadow-sm"
                                        : "bg-white text-[#555555] hover:text-[#141413] border border-black/10"
                                }`}
                            >
                                {item.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
