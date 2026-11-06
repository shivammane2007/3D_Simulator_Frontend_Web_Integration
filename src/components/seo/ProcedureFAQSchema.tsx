/**
 * ProcedureFAQSchema — auto-generates a FAQPage JSON-LD block per
 * procedure from the registry data we already maintain.
 *
 * Multiplies the GEO surface area by ~90: every /demo/<slug> and
 * /simulate/<slug> URL gets its own AI-quotable Q&A block tailored
 * to that procedure. AI engines (Google AI Overviews, ChatGPT,
 * Perplexity, Claude search) lift these into answers when a user
 * asks "how much does rhinoplasty cost" or "how long is recovery
 * from a tummy tuck".
 *
 * Server component — no client JS shipped.
 */

import { getProcedureBySlug, getProcedureBySimulateSlug, type Procedure } from '@/data/procedures';

interface ProcedureFAQSchemaProps {
    /** Matches a procedure.slug or procedure.simulateSlug. */
    procedureSlug: string;
}

/**
 * Build a 5-question FAQ block from registry fields. Phrasing kept
 * declarative and quotable — AI engines tend to lift the first
 * sentence verbatim.
 */
function buildFAQs(p: Procedure): Array<{ q: string; a: string }> {
    const name = p.shortName || p.name;
    const usPrice = p.pricing?.us;
    const priceLine = usPrice
        ? `${name} typically costs $${usPrice.min.toLocaleString()}–$${usPrice.max.toLocaleString()} in the US (regional pricing varies; Thailand, South Korea, India, and Singapore are typically lower).`
        : `${name} cost varies by region and clinic. See /procedures/${p.slug} for regional pricing.`;

    return [
        {
            q: `What is ${name}?`,
            a: p.description,
        },
        {
            q: `How much does ${name} cost?`,
            a: priceLine,
        },
        {
            q: `How long is recovery from ${name}?`,
            a: `Recovery from ${name} typically takes ${p.recoveryTime}. The procedure itself runs about ${p.procedureDuration}. Final results emerge over weeks to months as swelling and tissue healing complete.`,
        },
        {
            q: `Who is a good candidate for ${name}?`,
            a: p.idealFor,
        },
        {
            q: `Can I see what ${name} would look like before the procedure?`,
            a: `Yes. Faceify Labs offers a free ${name} simulator at faceifylabs.com/demo/${p.slug}: upload any photo and adjust real-time parameters to preview directional outcomes. The simulation runs entirely in your browser; no photo is uploaded to any server. It is an educational planning tool, not a surgical guarantee.`,
        },
    ];
}

export default function ProcedureFAQSchema({ procedureSlug }: ProcedureFAQSchemaProps) {
    const procedure =
        getProcedureBySlug(procedureSlug) ??
        getProcedureBySimulateSlug(procedureSlug);
    if (!procedure) return null;

    const faqs = buildFAQs(procedure);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.a,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
