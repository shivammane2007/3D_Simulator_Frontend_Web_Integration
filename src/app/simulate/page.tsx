import type { Metadata } from "next";
import SimulateHub, { type HubProcedure } from "@/components/SimulateHub";
import SimulatorCatalogItemListSchema from "@/components/seo/SimulatorCatalogItemListSchema";
import { PROCEDURES } from "@/data/procedures";

export const metadata: Metadata = {
    title: "AI Plastic Surgery Simulator | Nose Job, Facelift & Filler Preview",
    description: "Try our AI plastic surgery simulator. Preview rhinoplasty, blepharoplasty, facelift, BBL, hair transplant, lip fillers & 85+ procedures. No download. Real-time simulations run in your browser.",
    keywords: [
        'plastic surgery simulator',
        'nose job simulator',
        'rhinoplasty simulator',
        'free plastic surgery simulator',
        'AI plastic surgery',
        'facelift simulator',
        'blepharoplasty simulator',
        'BBL simulator',
        'lip filler simulator',
        'hair transplant simulator',
        'before and after plastic surgery',
        'virtual plastic surgery',
    ],
    openGraph: {
        title: "AI Plastic Surgery Simulator: Preview Procedures on Your Photo",
        description: "Upload a photo, choose from 85+ procedures, and explore AI visualizations in 60 seconds. Rhinoplasty, facelift, fillers, BBL & more. Private by design.",
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Faceify Labs: Free AI Plastic Surgery Simulator',
            },
        ],
    },
};

export default function SimulatePage() {
    const hubProcedures: HubProcedure[] = PROCEDURES.map((p) => ({
        slug: p.slug,
        simulateSlug: p.simulateSlug,
        shortName: p.shortName,
        description: p.description,
        category: p.category,
        popularity: p.popularity,
        isNew: p.isNew,
        comingSoon: p.comingSoon,
        saleReady: p.saleReady,
    }));

    return (
        <>
            <h1 className="sr-only">AI Simulators: Preview Your Results</h1>
            <SimulatorCatalogItemListSchema />
            <SimulateHub procedures={hubProcedures} />
        </>
    );
}
