import type { Metadata } from "next";
import ForSurgeonsGuidePage from "@/components/ForSurgeonsGuidePage";

export const metadata: Metadata = {
    title: "Consultation Guide: How Surgeons Use Faceify in Practice",
    description:
        "Step-by-step walkthrough of how Faceify fits into a real surgical consultation. See the workflow, time savings, and patient experience.",
    openGraph: {
        title: "Consultation Guide: How Surgeons Use Faceify",
        description:
            "See how Faceify fits into a real consultation workflow, from patient arrival to take-home preview.",
        images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
};

export default function Page() {
    return <ForSurgeonsGuidePage />;
}

