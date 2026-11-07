"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPin, ArrowRight, Phone, MessageCircle, Globe, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "@/i18n/messages";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";

export interface SurgeonCardData {
    id: string;
    slug: string | null;
    name: string;
    clinicName?: string | null;
    city?: string | null;
    country?: string | null;
    countryCode?: string | null;
    avatarUrl?: string | null;
    verified: boolean;
    tier: string;
    procedureSlugs: string[];
    profileCompletePct: number;
    bio?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    whatsapp?: string | null;
    bookingUrl?: string | null;
    websiteUrl?: string | null;
    foundingPartner?: boolean | null;
    foundingPartnerCohort?: number | null;
    _count?: { achievements: number };
}

/** Map SurgeonTier enum values to human-readable labels. */
const TIER_LABELS: Record<string, string> = {
    starter: "Starter",
    pro: "Pro",
    clinic: "Clinic",
};

function getCountryFlag(countryCode?: string | null): string {
    if (!countryCode || countryCode.length !== 2) return "";
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((c) => 127397 + c.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export function SurgeonCard({ surgeon, index }: { surgeon: SurgeonCardData; index: number }) {
    const t = useTranslations("Directory");

    return (
        <motion.div
            className="bg-white border border-slate-200 rounded-[20px] overflow-hidden hover:border-[#CF4500]/40 hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
        >
            <div className="p-6">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                    {surgeon.avatarUrl ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                            <Image
                                src={surgeon.avatarUrl}
                                alt={surgeon.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#FDEEE7] border border-[#CF4500]/20 flex items-center justify-center text-[#CF4500] font-semibold text-sm shrink-0">
                            {getInitials(surgeon.name)}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-base font-semibold text-ink font-body truncate">
                                {surgeon.name}
                            </h3>
                            {surgeon.verified && (
                                <ShieldCheck className="w-4 h-4 text-[#CF4500] shrink-0" aria-label={t("verified")} />
                            )}
                            {surgeon.foundingPartner && (
                                <span
                                    className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                                    aria-label="Founding Partner"
                                    title={surgeon.foundingPartnerCohort != null ? `Founding Partner #${surgeon.foundingPartnerCohort}` : "Founding Partner"}
                                >
                                    <Star className="w-2.5 h-2.5" />
                                    Founding
                                </span>
                            )}
                            {TIER_LABELS[surgeon.tier] && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                    {TIER_LABELS[surgeon.tier]}
                                </span>
                            )}
                        </div>
                        {surgeon.clinicName && (
                            <p className="text-xs text-slate-600 font-body truncate mt-0.5">
                                {surgeon.clinicName}
                            </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-body mt-1">
                            {(surgeon.city || surgeon.country) && (
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {[surgeon.city, surgeon.country].filter(Boolean).join(", ")}
                                    {getCountryFlag(surgeon.countryCode)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio snippet */}
                {surgeon.bio && (
                    <p className="text-xs text-slate-500 font-body line-clamp-2 mb-4 leading-relaxed">
                        {surgeon.bio}
                    </p>
                )}

                {/* Procedures */}
                {surgeon.procedureSlugs && surgeon.procedureSlugs.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-1.5">
                            {surgeon.procedureSlugs.slice(0, 4).map((slug) => (
                                <span
                                    key={slug}
                                    className="text-[11px] font-medium text-slate-600 bg-warm border border-slate-200 px-2.5 py-1 rounded-lg font-body capitalize"
                                >
                                    {slug.replace(/-/g, " ")}
                                </span>
                            ))}
                            {surgeon.procedureSlugs.length > 4 && (
                                <span className="text-[11px] font-medium text-slate-500 bg-warm border border-slate-200 px-2.5 py-1 rounded-lg font-body">
                                    +{surgeon.procedureSlugs.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    {surgeon.slug ? (
                        <Link
                            href={`/directory/${surgeon.slug}`}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-warm hover:bg-[#FDEEE7] text-ink hover:text-[#CF4500] text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                            onClick={() => trackEvent("surgeon_profile_clicked", { surgeon_id: surgeon.id, surgeon_city: surgeon.city || "" })}
                        >
                            {t("viewProfile")}
                            <ArrowRight className="w-3.5 h-3.5 text-[#CF4500]" />
                        </Link>
                    ) : surgeon.websiteUrl ? (
                        <a
                            href={surgeon.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 bg-warm hover:bg-[#FDEEE7] text-ink hover:text-[#CF4500] text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Globe className="w-3.5 h-3.5 text-[#CF4500]" />
                            {t("visitWebsite")}
                        </a>
                    ) : (
                        <span className="flex-1 flex items-center justify-center py-2.5 px-4 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl cursor-default">
                            {t("profileComingSoon")}
                        </span>
                    )}

                    {surgeon.phone && (
                        <a
                            href={`tel:${surgeon.phone}`}
                            className="p-2.5 text-slate-400 hover:text-[#CF4500] hover:bg-[#FDEEE7] border border-slate-200 rounded-xl transition-colors"
                            aria-label="Call clinic"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Phone className="w-3.5 h-3.5" />
                        </a>
                    )}
                    {surgeon.whatsapp && (
                        <a
                            href={`https://wa.me/${surgeon.whatsapp.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 text-slate-400 hover:text-[#CF4500] hover:bg-[#FDEEE7] border border-slate-200 rounded-xl transition-colors"
                            aria-label="WhatsApp"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default SurgeonCard;

