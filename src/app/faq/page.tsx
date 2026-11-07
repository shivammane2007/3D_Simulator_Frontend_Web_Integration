import type { Metadata } from "next";
import FAQClient from "@/components/FAQClient";

export const metadata: Metadata = {
    title: "FAQ: Privacy, HIPAA, Compliance, and Clinical Setup",
    description: "How Faceify protects patient privacy, HIPAA and GDPR compatibility, consent capture, multi-seat clinics, supported languages, and the Founding Partner programme.",
    openGraph: {
        title: "Faceify Labs FAQ | Privacy, HIPAA, Compliance, Setup",
        description: "How Faceify protects patient privacy, HIPAA and GDPR compatibility, consent capture, multi-seat clinics, supported languages, and the Founding Partner programme.",
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Faceify Labs: AI Surgical Simulation Platform',
            },
        ],
    },
};

export default function FAQPage() {
    return (
        <>
            <h1 className="sr-only">Faceify Labs FAQ: Privacy, HIPAA, Compliance, and Clinical Setup</h1>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "How does Faceify protect patient privacy?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Real-time simulations run in your browser. Your photo leaves your device only if you turn on the optional AI photoreal preview or save a simulation to your account, and we do not use it to train AI models."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is Faceify HIPAA-compatible?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The browser-native architecture means Faceify does not receive, store, or transmit Protected Health Information from the base simulator. US clinics can use Faceify alongside their existing PHI workflows. BAAs are available on the Enterprise plan upon request. See /trust for the architecture statement."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What about GDPR, PDPA, and PIPA?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Image data does not leave the patient's device, so EU, Singapore/Thailand, and Korea/Japan data-residency rules apply at the device level, not the cloud level. DPIA available on request via partners@faceifylabs.com. The optional photoreal preview path uses Replicate (US) and is consent-gated; see /trust."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How is patient consent captured?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Consent is captured in the simulator UI before any procedure preview runs. The clinic owns the consent log via its own EHR. Faceify does not store consent records."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long does training take?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "About 15 minutes for a surgeon to run their first consult. The interface is designed for in-room use, not classroom training."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can my clinic have multiple seats?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The Clinic tier covers multiple surgeons under one billing account. Each surgeon has an isolated session and procedure access."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Which languages are supported?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "English, Thai, Korean, Portuguese, Japanese. Procedure terminology is medically validated per locale."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What is the Founding Partner program?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "The first cohort of clinics onboarding before launch receives a structured voucher access programme covering full simulator access, direct product input, and named clinic recognition. Apply via the form on the homepage."
                                }
                            },
                        ]
                    })
                }}
            />
            <FAQClient />
        </>
    );
}
