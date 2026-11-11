import { Suspense } from "react";
import type { Metadata } from "next";
import { headers } from "next/headers";
import PricingClient from "@/components/PricingClient";
import { FOUNDING_PARTNER_CAP } from "@/lib/billing/pricing";

export const metadata: Metadata = {
    title: "Pricing: Plans for Surgeons & Clinics",
    description:
        "Transparent pricing for aesthetic surgeons and clinics. Browser-native 3D simulations with surgeon approval gate. No hardware, no per-patient fees.",
    openGraph: {
        title: "Faceify Labs Pricing: Plans That Pay For Themselves",
        description:
            "Transparent pricing for aesthetic surgeons and clinics. Browser-native 3D simulations with surgeon approval gate. No hardware, no per-patient fees.",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Faceify Labs: AI Surgical Simulation Platform",
            },
        ],
    },
};

async function PricingContent() {
    let country: string | null = null;
    try {
        const hdrs = await headers();
        country = hdrs.get("x-vercel-ip-country")?.toUpperCase() ?? null;
    } catch {
        // Non-fatal static generation fallback
    }

    const foundingPartnerCount = 0;
    const puneCount = 0;
    const spotsRemaining = Math.max(0, FOUNDING_PARTNER_CAP - foundingPartnerCount);

    return (
        <>
            <h1 className="sr-only">Pricing</h1>
            <PricingClient
                country={country}
                foundingPartnerCount={foundingPartnerCount}
                foundingPartnerSpotsRemaining={spotsRemaining}
                puneCount={puneCount}
            />
        </>
    );
}

export default function PricingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-warm" />}>
            <PricingContent />
        </Suspense>
    );
}
