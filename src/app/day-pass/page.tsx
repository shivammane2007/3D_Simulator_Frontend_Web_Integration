import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";
import DayPassPicker from "@/components/DayPassPicker";
import { resolveCreditCurrency } from "@/lib/billing/pricing";

export const metadata: Metadata = {
    title: "Simulation Credits: ₹1,999 per credit",
    description: "Buy 24-hour single-procedure credits. No subscription, 100% on-device privacy.",
    openGraph: {
        title: "Simulation Credits: 24-Hour Access",
        description: "Buy 24-hour single-procedure credits. No subscription, 100% on-device privacy.",
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

async function DayPassContent() {
    let currency: "INR" | "USD" = "INR";
    try {
        const hdrs = await headers();
        const country = hdrs.get("x-vercel-ip-country");
        currency = resolveCreditCurrency(country);
    } catch {
        // Fallback for static generation
    }

    return <DayPassPicker currency={currency} />;
}

export default function DayPassPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-warm" />}>
            <DayPassContent />
        </Suspense>
    );
}

