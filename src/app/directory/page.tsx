import type { Metadata } from "next";
import { getTranslations } from "@/i18n/messages";
import { buildAlternates } from "@/lib/seo/alternates";
import PageHero from "@/components/marketing/PageHero";
import MarketingSection from "@/components/marketing/MarketingSection";
import { DirectoryClient } from "@/components/directory/DirectoryClient";
import type { SurgeonCardData } from "@/components/directory/SurgeonCard";
import FeaturedDirectoryRow from "@/components/directory/FeaturedDirectoryRow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Directory");

    return {
        title: t("metaTitle") || "Find a Surgeon",
        description: t("metaDescription") || "Browse verified Faceify-powered surgeons and clinics across Asia-Pacific. Filter by city, country, and specialty.",
        alternates: buildAlternates("/directory", "en"),
        openGraph: {
            title: t("metaTitle") || "Find a Surgeon",
            description: t("metaOgDescription") || "Browse verified Faceify-powered surgeons across Bangkok, Seoul, Singapore, Mumbai and more.",
            images: [
                {
                    url: "/opengraph-image",
                    width: 1200,
                    height: 630,
                    alt: t("metaOgAlt") || "Faceify Labs: AI Surgical Simulation Platform",
                },
            ],
        },
    };
}

const DEFAULT_CITIES = [
    "Bangkok",
    "Delhi",
    "Kuala Lumpur",
    "Mumbai",
    "Pune",
    "Seoul",
    "Singapore",
    "Tokyo",
];

const DEFAULT_COUNTRIES = [
    "India",
    "Japan",
    "Malaysia",
    "Singapore",
    "South Korea",
    "Thailand",
];

export default async function DirectoryPage({
    searchParams,
}: {
    searchParams?: Promise<{ city?: string }>;
}) {
    const sp = searchParams ? await searchParams : {};
    const cityFilter = sp?.city ?? null;

    const initialSurgeons: SurgeonCardData[] = [];
    const total = initialSurgeons.length;

    const t = await getTranslations("Directory");

    return (
        <div className="bg-[#F3F0EE] min-h-screen font-body pt-28 md:pt-36">
            <PageHero
                label={t("pageHeroLabel") || "SURGEON DIRECTORY"}
                title={
                    <>
                        Find a <em className="font-serif text-[#CF4500] not-italic italic">Verified</em> Surgeon
                    </>
                }
                subtitle={t("subtitle") || "Browse verified Faceify-powered surgeons and clinics across Asia-Pacific."}
            />

            <MarketingSection variant="warm" className="!pt-6">
                <FeaturedDirectoryRow city={cityFilter} />
                <DirectoryClient
                    initialSurgeons={initialSurgeons}
                    initialTotal={total}
                    cities={DEFAULT_CITIES}
                    countries={DEFAULT_COUNTRIES}
                />
            </MarketingSection>

            {/* CTA */}
            <MarketingSection variant="white" className="py-16">
                <div className="max-w-2xl mx-auto text-center bg-[#141413] rounded-[24px] p-10 sm:p-14 relative overflow-hidden shadow-level-2">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#CF4500]/20 rounded-full blur-[80px] pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-serif text-white mb-3">
                            {t("joinCTA") || "Want your clinic listed here?"}
                        </h2>
                        <p className="text-white/60 mb-8 max-w-lg mx-auto leading-relaxed font-body">
                            {t("joinDescription") || "Join Faceify's clinical program to get listed in our directory."}
                        </p>
                        <Link
                            href="/for-surgeons"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-bold rounded-full transition-all shadow-sm"
                        >
                            {t("joinButton") || "Join Faceify"} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </MarketingSection>
        </div>
    );
}
