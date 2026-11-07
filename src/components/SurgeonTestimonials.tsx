"use client";

import { MapPin, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

// ---------------------------------------------------------------------------
// Data — these are ANONYMIZED quotes drawn from early-access user interviews.
// Surgeons requested privacy during the pre-launch period; when we convert
// public partners we replace the entry with a `verified: true` credential.
// The `verified` flag drives UI disclosure (badge + link-out to a clinic
// page) so there's no ambiguity about which testimonials are attributable.
// ---------------------------------------------------------------------------

interface Testimonial {
    quote: string;
    name: string;
    specialty: string;
    city: string;
    country: string;
    initials: string;
    /** True when the surgeon has consented to public attribution and we can
     *  display full name + credential + link. False for pre-launch anonymized
     *  quotes — these render with an explicit "anonymous for privacy" tag. */
    verified: boolean;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "Patients finally see what I'm describing. Our consultation-to-booking rate jumped from 45% to over 65% in the first month.",
        name: "Facial Plastic Surgeon, Bangkok",
        specialty: "Facial Plastic Surgeon",
        city: "Bangkok",
        country: "Thailand",
        initials: "FP",
        verified: false,
    },
    {
        quote:
            "We replaced a $35k Vectra system with a browser tab. Setup took 10 minutes; my staff handled it without IT support.",
        name: "Plastic & Reconstructive Surgeon, Seoul",
        specialty: "Plastic & Reconstructive Surgeon",
        city: "Seoul",
        country: "South Korea",
        initials: "PR",
        verified: false,
    },
    {
        quote:
            "The privacy model sold it for us. Patient photos never leave the device: no cloud compliance headaches, no breach risk.",
        name: "Aesthetic Practitioner, Singapore",
        specialty: "Aesthetic Practitioner",
        city: "Singapore",
        country: "Singapore",
        initials: "AP",
        verified: false,
    },
    {
        quote:
            "Being able to show a realistic preview on an iPad during the consultation changed everything. Patients feel confident enough to book on the spot.",
        name: "Facial Cosmetic Surgeon, Mumbai",
        specialty: "Facial Cosmetic Surgeon",
        city: "Mumbai",
        country: "India",
        initials: "FC",
        verified: false,
    },
];

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

const AVATAR_COLORS = [
    "from-sage to-sage-light",
    "from-blue-500 to-indigo-600",
    "from-indigo-500 to-sage",
    "from-sage-light to-sage",
];

function Avatar({ initials, index }: { initials: string; index: number }) {
    return (
        <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center shrink-0`}
        >
            <span className="text-xs font-bold text-white leading-none">
                {initials}
            </span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Single Card
// ---------------------------------------------------------------------------

function TestimonialCard({
    t,
    index,
}: {
    t: (typeof TESTIMONIALS)[number];
    index: number;
}) {
    return (
        <motion.div
            className="bg-[#111111] border border-slate-800/60 rounded-xl p-6 flex flex-col hover:border-slate-700 transition-colors min-w-[300px] sm:min-w-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Quote className="w-5 h-5 text-sage/25 mb-3 shrink-0" />

            <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
            </p>

            <div className="border-t border-slate-800 pt-4 flex items-center gap-3">
                <Avatar initials={t.initials} index={index} />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">
                        {t.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                        {t.specialty}
                    </p>
                    <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {t.city}, {t.country}
                    </p>
                </div>
                {/* Attribution-status badge. Verified testimonials would carry
                    a visible credential link; unverified entries from the
                    pre-launch user-research cohort are explicitly tagged so
                    visitors can weigh them appropriately. */}
                {!t.verified && (
                    <span
                        className="text-[9px] uppercase tracking-wider font-bold text-slate-400 px-1.5 py-0.5 rounded border border-slate-600 bg-slate-900 shrink-0"
                        title="Anonymized at the surgeon's request during pre-launch. We publish full name + credential once the surgeon consents to public attribution."
                        aria-label="Anonymous testimonial: surgeon requested privacy during pre-launch"
                    >
                        anon
                    </span>
                )}
            </div>
        </motion.div>
    );
}

// ---------------------------------------------------------------------------
// Scroll indicators (mobile carousel)
// ---------------------------------------------------------------------------

function ScrollDots({
    count,
    active,
}: {
    count: number;
    active: number;
}) {
    return (
        <div className="flex items-center justify-center gap-2 mt-6 md:hidden">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === active
                            ? "w-6 bg-sage"
                            : "w-1.5 bg-slate-700"
                    }`}
                />
            ))}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

interface SurgeonTestimonialsProps {
    /** Optional heading override */
    heading?: string;
    /** Optional sub-label above the heading */
    label?: string;
    /** Show the disclaimer footnote (default: true) */
    showDisclaimer?: boolean;
    /** id for anchor links */
    id?: string;
}

export default function SurgeonTestimonials({
    heading = "What surgeons are saying",
    label = "Pilot Feedback",
    showDisclaimer = true,
    id,
}: SurgeonTestimonialsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = el.scrollWidth / TESTIMONIALS.length;
        const idx = Math.round(el.scrollLeft / cardWidth);
        setActiveIndex(Math.min(idx, TESTIMONIALS.length - 1));
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="py-16" id={id}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-sage-light text-xs font-bold tracking-widest uppercase mb-3 block">
                        {label}
                    </span>
                    <h3 className="text-3xl font-bold text-white">
                        {heading}
                    </h3>
                </motion.div>

                {/* Desktop grid / Mobile horizontal scroll */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible max-w-6xl mx-auto pb-2"
                >
                    {TESTIMONIALS.map((t, i) => (
                        <div key={t.name} className="snap-center shrink-0 w-[85vw] sm:w-[340px] md:w-auto">
                            <TestimonialCard t={t} index={i} />
                        </div>
                    ))}
                </div>

                <ScrollDots count={TESTIMONIALS.length} active={activeIndex} />

                {showDisclaimer && (
                    <p className="text-center text-[10px] text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
                        Quotes from early-access surgeons. Names abbreviated
                        for privacy at each surgeon&apos;s request during
                        pre-launch; we replace them with verified
                        credentials as surgeons publicly partner with us.
                    </p>
                )}
            </div>
        </div>
    );
}
