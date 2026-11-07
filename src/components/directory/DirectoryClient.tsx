"use client";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "@/i18n/messages";
import { Stethoscope, LayoutGrid, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { DirectoryFilters } from "./DirectoryFilters";
import { SurgeonCard, SurgeonCardData } from "./SurgeonCard";
import { PROCEDURES } from "@/data/procedures";
import { trackEvent } from "@/lib/analytics";

// Dynamically load the map component
const SurgeonLocator = dynamic(() => import("@/components/SurgeonLocator"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[500px] bg-slate-100 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 text-sm">
            Loading map…
        </div>
    ),
});

interface DirectoryClientProps {
    initialSurgeons: SurgeonCardData[];
    initialTotal: number;
    cities: string[];
    countries: string[];
}

const ALL_SPECIALTIES = PROCEDURES.map((p) => p.slug);

type ViewMode = "list" | "map";

function DirectoryClientInner({
    initialSurgeons,
    initialTotal,
    cities,
    countries,
}: DirectoryClientProps) {
    const t = useTranslations("Directory");
    const router = useRouter();
    const searchParams = useSearchParams();

    const [allSurgeons, setAllSurgeons] = useState<SurgeonCardData[]>(initialSurgeons);
    const [viewMode, setViewMode] = useState<ViewMode>("list");

    // Track directory page view once on mount
    useEffect(() => {
        trackEvent("directory_viewed");
    }, []);

    // Pre-select specialty from ?procedure= URL param
    useEffect(() => {
        const procedureParam = searchParams.get("procedure");
        const specialtyParam = searchParams.get("specialty");
        if (procedureParam && !specialtyParam) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("specialty", procedureParam);
            params.delete("procedure");
            router.replace(`?${params.toString()}`);
        }
    }, [router, searchParams]);

    // Client-side filtering over surgeons list
    const filteredSurgeons = useMemo(() => {
        const q = searchParams.get("q")?.toLowerCase();
        const city = searchParams.get("city")?.toLowerCase();
        const country = searchParams.get("country")?.toLowerCase();
        const specialty = searchParams.get("specialty")?.toLowerCase();
        const tier = searchParams.get("tier")?.toLowerCase();

        return allSurgeons.filter((s) => {
            if (q) {
                const matchesName = s.name.toLowerCase().includes(q);
                const matchesClinic = s.clinicName?.toLowerCase().includes(q) ?? false;
                const matchesBio = s.bio?.toLowerCase().includes(q) ?? false;
                if (!matchesName && !matchesClinic && !matchesBio) return false;
            }
            if (city && s.city && !s.city.toLowerCase().includes(city)) return false;
            if (country && s.country && !s.country.toLowerCase().includes(country)) return false;
            if (specialty && !s.procedureSlugs?.some((p) => p.toLowerCase().includes(specialty))) return false;
            if (tier && s.tier.toLowerCase() !== tier) return false;
            return true;
        });
    }, [allSurgeons, searchParams]);

    const uniqueCountries = useMemo(() => {
        return new Set(filteredSurgeons.map((s) => s.country).filter(Boolean));
    }, [filteredSurgeons]);

    return (
        <div>
            {/* Filters row + view toggle */}
            <div className="flex flex-col gap-3 mb-6">
                <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
                    {/* Filters take up available space */}
                    <div className="flex-1 w-full">
                        <DirectoryFilters
                            cities={cities}
                            countries={countries}
                            specialties={ALL_SPECIALTIES}
                        />
                    </div>

                    {/* View toggle */}
                    <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shrink-0 self-start lg:self-auto shadow-sm">
                        <button
                            onClick={() => setViewMode("list")}
                            aria-label="List view"
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all font-body ${
                                viewMode === "list"
                                    ? "bg-[#141413] text-white shadow-sm"
                                    : "text-slate-500 hover:text-ink"
                            }`}
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            List
                        </button>
                        <button
                            onClick={() => setViewMode("map")}
                            aria-label="Map view"
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all font-body ${
                                viewMode === "map"
                                    ? "bg-[#141413] text-white shadow-sm"
                                    : "text-slate-500 hover:text-ink"
                            }`}
                        >
                            <MapPin className="w-3.5 h-3.5" />
                            Map
                        </button>
                    </div>
                </div>
            </div>

            {/* Count */}
            <div className="flex items-center gap-2 mb-6">
                <Stethoscope className="w-4 h-4 text-[#CF4500]" />
                <p className="text-sm text-slate-500 font-body">
                    {t("surgeonsCount", {
                        count: filteredSurgeons.length,
                        countries: uniqueCountries.size || 0,
                    }) || `${filteredSurgeons.length} surgeons across ${uniqueCountries.size || 0} countries`}
                </p>
            </div>

            {/* Map View */}
            {viewMode === "map" && (
                <SurgeonLocator surgeons={filteredSurgeons} />
            )}

            {/* List View */}
            {viewMode === "list" && (
                <>
                    {filteredSurgeons.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                            {filteredSurgeons.map((surgeon, i) => (
                                <SurgeonCard key={surgeon.id} surgeon={surgeon} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 max-w-md mx-auto">
                            <div className="w-16 h-16 rounded-full bg-[#FDEEE7] flex items-center justify-center mx-auto mb-4">
                                <Users className="w-7 h-7 text-[#CF4500]" />
                            </div>
                            <h3 className="text-xl font-serif text-[#141413] mb-2">Directory launching soon</h3>
                            <p className="text-sm text-[#555555] mb-6 leading-relaxed font-body">
                                We are onboarding verified surgeons and clinics. Check back soon or join as a provider.
                            </p>
                            <Link
                                href="/for-surgeons"
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
                            >
                                Join as a Surgeon
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export function DirectoryClient(props: DirectoryClientProps) {
    return (
        <Suspense fallback={<div className="py-16 text-center text-slate-500">Loading...</div>}>
            <DirectoryClientInner {...props} />
        </Suspense>
    );
}

export default DirectoryClient;

