// Typical price ranges per procedure and city, in the city's currency. Educational ranges, not quotes;
// a city without its own entry falls back to the procedure default.

export interface CostEstimate {
    /** Lower bound of the typical range (in major currency units) */
    low: number;
    /** Upper bound of the typical range (in major currency units) */
    high: number;
    /** ISO 4217 currency code */
    currency: string;
}

interface ProcedureCosts {
    /** Always present; used when no city-specific range exists */
    default: CostEstimate;
    /** Optional per-city overrides; key matches MarketConfig.city */
    cities?: Record<string, CostEstimate>;
    /** Country-wide ranges keyed by ISO 3166-1 alpha-2 code, for markets quoted nationally */
    countries?: Record<string, CostEstimate>;
}

const SURGICAL_DEFAULT_USD: CostEstimate = {
    low: 5_000,
    high: 12_000,
    currency: "USD",
};

const INJECTABLE_DEFAULT_USD: CostEstimate = {
    low: 400,
    high: 1_500,
    currency: "USD",
};

const HAIR_DEFAULT_USD: CostEstimate = {
    low: 4_000,
    high: 15_000,
    currency: "USD",
};

export const PROCEDURE_COSTS: Record<string, ProcedureCosts> = {
    rhinoplasty: {
        default: { low: 8_000, high: 20_000, currency: "USD" },
        cities: {
            Mumbai: { low: 100_000, high: 250_000, currency: "INR" },
            Delhi: { low: 90_000, high: 250_000, currency: "INR" },
            Bengaluru: { low: 80_000, high: 200_000, currency: "INR" },
            Pune: { low: 70_000, high: 160_000, currency: "INR" },
            Bangkok: { low: 60_000, high: 200_000, currency: "THB" },
            London: { low: 8_000, high: 15_000, currency: "GBP" },
        },
        countries: {
            US: { low: 8_000, high: 20_000, currency: "USD" },
        },
    },
    facelift: {
        default: { low: 8_000, high: 25_000, currency: "USD" },
        cities: {
            Pune: { low: 150_000, high: 450_000, currency: "INR" },
            Mumbai: { low: 200_000, high: 600_000, currency: "INR" },
            Delhi: { low: 180_000, high: 550_000, currency: "INR" },
            Bangkok: { low: 150_000, high: 500_000, currency: "THB" },
        },
    },
    blepharoplasty: {
        default: { low: 3_000, high: 6_000, currency: "USD" },
        cities: {
            Pune: { low: 60_000, high: 180_000, currency: "INR" },
            Bangkok: { low: 50_000, high: 180_000, currency: "THB" },
            Seoul: { low: 1_500_000, high: 6_000_000, currency: "KRW" },
        },
    },
    "hair-transplant": {
        default: HAIR_DEFAULT_USD,
        cities: {
            Pune: { low: 70_000, high: 300_000, currency: "INR" },
            Mumbai: { low: 100_000, high: 400_000, currency: "INR" },
            Delhi: { low: 80_000, high: 350_000, currency: "INR" },
            Bangkok: { low: 80_000, high: 350_000, currency: "THB" },
        },
    },
    "fue-hair-transplant": {
        default: HAIR_DEFAULT_USD,
        cities: {
            Pune: { low: 80_000, high: 300_000, currency: "INR" },
            Mumbai: { low: 120_000, high: 400_000, currency: "INR" },
        },
    },
    "dhi-hair-transplant": {
        default: { low: 5_000, high: 18_000, currency: "USD" },
        cities: {
            Pune: { low: 110_000, high: 400_000, currency: "INR" },
            Mumbai: { low: 150_000, high: 500_000, currency: "INR" },
        },
    },
    botox: {
        default: { low: 250, high: 800, currency: "USD" },
        cities: {
            Pune: { low: 8_000, high: 35_000, currency: "INR" },
            Mumbai: { low: 12_000, high: 45_000, currency: "INR" },
            Bangkok: { low: 6_000, high: 25_000, currency: "THB" },
        },
    },
    "dermal-fillers": {
        default: { low: 500, high: 1_500, currency: "USD" },
        cities: {
            Pune: { low: 15_000, high: 60_000, currency: "INR" },
            Mumbai: { low: 20_000, high: 80_000, currency: "INR" },
            Bangkok: { low: 12_000, high: 50_000, currency: "THB" },
        },
    },
    "lip-augmentation": {
        default: { low: 600, high: 1_800, currency: "USD" },
        cities: {
            Pune: { low: 18_000, high: 65_000, currency: "INR" },
            Mumbai: { low: 22_000, high: 80_000, currency: "INR" },
        },
    },
    "lip-fillers": {
        default: { low: 500, high: 1_500, currency: "USD" },
        cities: {
            Pune: { low: 15_000, high: 55_000, currency: "INR" },
        },
    },
    "lip-lift": {
        default: { low: 2_500, high: 6_000, currency: "USD" },
        cities: {
            Pune: { low: 50_000, high: 150_000, currency: "INR" },
        },
    },
    "chin-augmentation": {
        default: { low: 3_000, high: 8_000, currency: "USD" },
        cities: {
            Pune: { low: 60_000, high: 200_000, currency: "INR" },
            Mumbai: { low: 80_000, high: 250_000, currency: "INR" },
        },
    },
    "buccal-fat-removal": {
        default: { low: 2_500, high: 6_500, currency: "USD" },
        cities: {
            Pune: { low: 50_000, high: 180_000, currency: "INR" },
        },
    },
    "thread-lift": {
        default: { low: 1_500, high: 4_500, currency: "USD" },
        cities: {
            Pune: { low: 40_000, high: 140_000, currency: "INR" },
            Bangkok: { low: 30_000, high: 120_000, currency: "THB" },
        },
    },
    sculptra: { default: INJECTABLE_DEFAULT_USD },
    profhilo: { default: INJECTABLE_DEFAULT_USD },
    radiesse: { default: INJECTABLE_DEFAULT_USD },
    kybella: {
        default: { low: 1_200, high: 2_400, currency: "USD" },
        cities: {
            Pune: { low: 25_000, high: 80_000, currency: "INR" },
        },
    },
    "masseter-botox": {
        default: { low: 600, high: 1_800, currency: "USD" },
        cities: {
            Pune: { low: 18_000, high: 60_000, currency: "INR" },
            Bangkok: { low: 12_000, high: 50_000, currency: "THB" },
        },
    },
    otoplasty: {
        default: SURGICAL_DEFAULT_USD,
        cities: {
            Pune: { low: 80_000, high: 250_000, currency: "INR" },
        },
    },
};

/** All cities the estimator can switch to, in display order */
export const ESTIMATOR_CITIES: { city: string; country: string; flag: string }[] = [
    { city: "Pune", country: "IN", flag: "🇮🇳" },
    { city: "Mumbai", country: "IN", flag: "🇮🇳" },
    { city: "Delhi", country: "IN", flag: "🇮🇳" },
    { city: "Bengaluru", country: "IN", flag: "🇮🇳" },
    { city: "Bangkok", country: "TH", flag: "🇹🇭" },
    { city: "Seoul", country: "KR", flag: "🇰🇷" },
    { city: "Singapore", country: "SG", flag: "🇸🇬" },
];

const CITY_COUNTRY: Record<string, string> = {
    ...Object.fromEntries(ESTIMATOR_CITIES.map((c) => [c.city, c.country])),
    London: "GB",
};

export interface CityCost {
    /** Absent for a country-wide range */
    city?: string;
    /** ISO 3166-1 alpha-2 region code */
    country: string;
    estimate: CostEstimate;
}

/** The cities, then the countries, with their own range for this procedure, in data order. */
export function getCityCosts(slug: string): CityCost[] {
    const data = PROCEDURE_COSTS[slug];
    const cities = Object.entries(data?.cities ?? {}).map(([city, estimate]) => {
        const country = CITY_COUNTRY[city];
        if (!country) throw new Error(`no country for cost city "${city}"`);
        return { city, country, estimate };
    });
    const countries = Object.entries(data?.countries ?? {}).map(([country, estimate]) => ({ country, estimate }));
    return [...cities, ...countries];
}

const trim = (value: number): string => value.toFixed(1).replace(/\.0$/, "");

/** "₹80k – ₹2.5L" or "S$8,000 – S$25,000": lakh and crore for INR, compact millions for KRW. */
export function formatCostRange(estimate: CostEstimate, locale?: string): string {
    const fmt = (n: number) => {
        if (estimate.currency === "INR") {
            if (n >= 10_000_000) return `₹${trim(n / 10_000_000)}Cr`;
            if (n >= 100_000) return `₹${trim(n / 100_000)}L`;
            if (n >= 1_000) return `₹${Math.round(n / 1_000)}k`;
            return `₹${n.toLocaleString("en-IN")}`;
        }
        if (estimate.currency === "THB" && n >= 1_000) return `฿${Math.round(n / 1_000)}k`;
        if (estimate.currency === "KRW") {
            if (n >= 1_000_000) return `₩${trim(n / 1_000_000)}m`;
            if (n >= 1_000) return `₩${Math.round(n / 1_000)}k`;
            return `₩${n.toLocaleString()}`;
        }
        try {
            return new Intl.NumberFormat(locale, {
                style: "currency",
                currency: estimate.currency,
                maximumFractionDigits: 0,
            }).format(n);
        } catch {
            return `${estimate.currency} ${n.toLocaleString()}`;
        }
    };
    return `${fmt(estimate.low)} – ${fmt(estimate.high)}`;
}

export function getCostForProcedure(slug: string, city: string): CostEstimate | null {
    const data = PROCEDURE_COSTS[slug];
    if (!data) return null;
    return data.cities?.[city] ?? data.default;
}

export function hasCostEstimate(slug: string): boolean {
    return slug in PROCEDURE_COSTS;
}
