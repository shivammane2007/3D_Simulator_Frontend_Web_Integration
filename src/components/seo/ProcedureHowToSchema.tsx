/**
 * ProcedureHowToSchema — auto-generates a HowTo JSON-LD block per
 * procedure, framed as "How to simulate <procedure>" so Google AI
 * Overviews answer "how to preview my rhinoplasty" / "see what BBL
 * would look like" queries with our simulator as the result.
 *
 * Six steps mirror the actual user flow at /demo/<slug>:
 *   1. Visit demo URL
 *   2. Upload photo
 *   3. Adjust parameters
 *   4. Compare before/after
 *   5. Save or share
 *   6. (Optional) Send to surgeon
 *
 * Server component — no client JS.
 */

import { getProcedureBySlug, getProcedureBySimulateSlug, type Procedure } from '@/data/procedures';

interface ProcedureHowToSchemaProps {
    /** Matches a procedure.slug or procedure.simulateSlug. */
    procedureSlug: string;
}

function buildHowTo(p: Procedure) {
    const name = p.shortName || p.name;
    const slug = p.slug;
    const baseUrl = 'https://www.faceifylabs.com';

    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `How to Simulate ${name} Results in Your Browser`,
        description: `Generate a realistic AI preview of ${name} outcomes in under 60 seconds at faceifylabs.com/demo/${slug}; no signup, no app download, photo stays on your device unless you choose to save a simulation to your account.`,
        totalTime: 'PT1M',
        tool: [
            { '@type': 'HowToTool', name: 'Any modern web browser (Chrome, Safari, Firefox, Edge)' },
            { '@type': 'HowToTool', name: 'A clear photo of the treatment area' },
        ],
        step: [
            {
                '@type': 'HowToStep',
                position: 1,
                name: `Open the ${name} simulator`,
                text: `Visit faceifylabs.com/demo/${slug}; the simulator loads in any modern browser with no signup required.`,
                url: `${baseUrl}/demo/${slug}`,
            },
            {
                '@type': 'HowToStep',
                position: 2,
                name: 'Upload your photo',
                text: 'Upload a clear, well-lit photo of the treatment area. The image is processed entirely on-device. Nothing is uploaded to any server.',
            },
            {
                '@type': 'HowToStep',
                position: 3,
                name: `Adjust ${name} parameters`,
                text: p.category === 'body-contouring'
                    ? `Use the real-time sliders to dial in the parameters specific to ${name}. The simulation updates the body contour preview at under 200ms latency.`
                    : `Use the real-time sliders to dial in the parameters specific to ${name}. The 468-point face mesh updates the preview at under 200ms latency.`,
            },
            {
                '@type': 'HowToStep',
                position: 4,
                name: 'Compare before and after',
                text: 'Use the comparison slider or side-by-side view to compare the original photo with the simulated outcome.',
            },
            {
                '@type': 'HowToStep',
                position: 5,
                name: 'Save or share the result',
                text: 'Download the before/after comparison, or use the share button to send a link to your surgeon for review during your consultation.',
            },
            {
                '@type': 'HowToStep',
                position: 6,
                name: 'Discuss with a qualified surgeon',
                text: `The simulation is an educational planning tool, not a guarantee. Use it as a starting point for your consultation with a board-certified ${p.categoryLabel.toLowerCase()} specialist.`,
            },
        ],
    };
}

export default function ProcedureHowToSchema({ procedureSlug }: ProcedureHowToSchemaProps) {
    const procedure =
        getProcedureBySlug(procedureSlug) ??
        getProcedureBySimulateSlug(procedureSlug);
    if (!procedure) return null;

    const schema = buildHowTo(procedure);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
