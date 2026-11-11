import { Suspense } from "react";
import type { Metadata } from "next";
import ForSurgeonsPage from "@/components/ForSurgeonsPage";

export const metadata: Metadata = {
    title: "For Surgeons: Convert More DM Enquiries Into Consultations",
    description:
        "AI cosmetic preview your patients use privately. You review every result before they see it final. Embed on your Instagram bio link in 15 minutes. Founding Partner spots: 100 only.",
    openGraph: {
        title: "Faceify for Surgeons: Convert Hesitant Consults",
        description:
            "AI cosmetic preview with surgeon approval gate. Your patient sees only what you approve. Embed widget free. Founding Partner plan $149/mo.",
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

export default function ForSurgeonsRoute() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-warm" />}>
            <ForSurgeonsPage />
        </Suspense>
    );
}
