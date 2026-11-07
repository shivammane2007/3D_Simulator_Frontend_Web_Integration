"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "@/i18n/messages";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

const TIER_OPTIONS = [
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
    { value: "clinic", label: "Clinic" },
] as const;

interface DirectoryFiltersProps {
    cities: string[];
    countries: string[];
    specialties: string[];
}

export function DirectoryFilters({ cities, countries, specialties }: DirectoryFiltersProps) {
    const t = useTranslations("Directory");
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
    const debouncedSearch = useDebounce(searchValue, 300);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
            params.set("q", debouncedSearch);
            trackEvent("surgeon_searched", { query: debouncedSearch });
        } else {
            params.delete("q");
        }
        params.delete("page");
        router.push(`?${params.toString()}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    const updateParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            params.delete("page");
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 items-stretch sm:items-center w-full">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    aria-label="Search surgeons"
                    placeholder={t("searchPlaceholder") || "Search by name or clinic..."}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:border-[#CF4500]/40 focus:ring-1 focus:ring-[#CF4500]/20 font-body shadow-sm transition-all"
                />
            </div>

            {/* City filter */}
            <select
                value={searchParams.get("city") || ""}
                onChange={(e) => updateParam("city", e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-ink focus:outline-none focus:border-[#CF4500]/40 font-body shadow-sm cursor-pointer"
            >
                <option value="">{t("allCities") || "All Cities"}</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>

            {/* Country filter */}
            <select
                value={searchParams.get("country") || ""}
                onChange={(e) => updateParam("country", e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-ink focus:outline-none focus:border-[#CF4500]/40 font-body shadow-sm cursor-pointer"
            >
                <option value="">{t("allCountries") || "All Countries"}</option>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            {/* Specialty filter */}
            <select
                value={searchParams.get("specialty") || ""}
                onChange={(e) => updateParam("specialty", e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-ink focus:outline-none focus:border-[#CF4500]/40 font-body shadow-sm cursor-pointer"
            >
                <option value="">{t("allSpecialties") || "All Specialties"}</option>
                {specialties.map((slug) => (
                    <option key={slug} value={slug}>
                        {slug
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                    </option>
                ))}
            </select>

            {/* Tier filter */}
            <select
                value={searchParams.get("tier") || ""}
                onChange={(e) => updateParam("tier", e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-ink focus:outline-none focus:border-[#CF4500]/40 font-body shadow-sm cursor-pointer"
                aria-label="Filter by tier"
            >
                <option value="">{t("allTiers") || "All Tiers"}</option>
                {TIER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DirectoryFilters;

