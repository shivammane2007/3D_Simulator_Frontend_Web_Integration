/**
 * ProcedureMedicalSchema — emits schema.org/MedicalProcedure JSON-LD for
 * each /procedures/[slug] page so Google's medical-content rich result
 * pipeline understands the page is authoritative information about a
 * specific medical procedure (rather than a generic shopping page).
 *
 * Why this matters: Google specifically promotes structured medical
 * content in AI Overviews + the "Things to know" panel. The HowTo +
 * FAQ schemas already in place answer "how do I preview this" / "how
 * does Faceify work"; this block answers "what IS rhinoplasty" — a
 * different (and much higher-volume) class of queries.
 *
 * Falls back gracefully when a procedure has no longDescription —
 * still emits the minimum viable MedicalProcedure block (name + url +
 * @type) which Google accepts and ranks.
 *
 * Server component — emits a plain <script type="application/ld+json">.
 * Cost data (when available) is included as a `Service`-typed sibling
 * so the price-range estimator gains structured-data weight too.
 */

import {
    getProcedureBySlug,
    getProcedureBySimulateSlug,
    type Procedure,
} from "@/data/procedures";
import { getCostForProcedure } from "@/data/procedure-cost-estimates";

interface ProcedureMedicalSchemaProps {
    /** Matches Procedure.slug or simulateSlug */
    procedureSlug: string;
}

const BASE_URL = "https://www.faceifylabs.com";

// schema.org/MedicalProcedure recognised types. Most aesthetic
// procedures map to "Therapeutic" (corrective) or "PercutaneousProcedure"
// (injectable). We default to TherapeuticProcedure when category doesn't
// give us a clearer signal.
function inferProcedureType(p: Procedure): string {
    if (p.category === "injectable") return "TherapeuticProcedure";
    if (p.category === "non-surgical") return "TherapeuticProcedure";
    if (p.category === "surgical") return "TherapeuticProcedure";
    return "TherapeuticProcedure";
}

function buildSchema(p: Procedure) {
    const slug = p.slug;
    const name = p.name;
    const description = p.description ?? `${p.name}: aesthetic procedure information, simulator, and clinic listings on Faceify Labs.`;

    const procedureNode: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "@id": `${BASE_URL}/procedures/${slug}#medicalprocedure`,
        name,
        alternateName: p.shortName && p.shortName !== name ? p.shortName : undefined,
        description,
        url: `${BASE_URL}/procedures/${slug}`,
        procedureType: inferProcedureType(p),
        // Body location — schema.org accepts a simple string here. We
        // pull it from the procedure category for now (face vs body).
        bodyLocation:
            p.category === "body-contouring"
                ? "Body"
                : p.category === "hair-restoration"
                  ? "Scalp"
                  : "Face",
        // The simulator IS our preparation step — link it.
        preparation: {
            "@type": "MedicalEntity",
            name: `${name} simulator preview`,
            description: `Run a 60-second AI simulation at ${BASE_URL}/simulate/${p.simulateSlug ?? slug} before booking a consultation.`,
            url: `${BASE_URL}/simulate/${p.simulateSlug ?? slug}`,
        },
    };

    // Drop undefined keys so the emitted JSON-LD stays clean (Google
    // accepts undefined-as-omitted but warns on null/empty).
    for (const k of Object.keys(procedureNode)) {
        if (procedureNode[k] === undefined) delete procedureNode[k];
    }

    // When we have a Pune cost estimate, add a sibling Service block so
    // the price range becomes structured data Google can surface in
    // AI Overviews and rich results.
    const cost = getCostForProcedure(p.simulateSlug ?? slug, "Pune");
    if (cost) {
        return [
            procedureNode,
            {
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": `${BASE_URL}/procedures/${slug}#service`,
                name: `${name} (Pune)`,
                serviceType: name,
                provider: {
                    "@type": "Organization",
                    name: "Faceify Labs marketplace clinics",
                    url: `${BASE_URL}/deals/city/pune`,
                },
                offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: cost.currency,
                    lowPrice: cost.low,
                    highPrice: cost.high,
                    offerCount: 30, // founder-cohort cap; refresh as cohorts expand
                    availability: "https://schema.org/InStock",
                    url: `${BASE_URL}/deals?city=Pune&procedure=${encodeURIComponent(p.simulateSlug ?? slug)}`,
                },
            },
        ];
    }

    return [procedureNode];
}

export default function ProcedureMedicalSchema({
    procedureSlug,
}: ProcedureMedicalSchemaProps) {
    const p =
        getProcedureBySlug(procedureSlug) ??
        getProcedureBySimulateSlug(procedureSlug);
    if (!p) return null;
    const schema = buildSchema(p);
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
