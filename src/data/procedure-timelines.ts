/**
 * procedure-timelines — sensible "what to expect" milestones per
 * procedure, surfaced by ProcedureTimeline on /procedures/[slug] pages.
 *
 * Defaults to a generic 5-step surgical timeline. Procedures that
 * deviate (Botox is a 15-min office visit, not a recovery story)
 * declare their own list. The component never renders fewer than 5
 * steps so the visual rhythm stays consistent.
 *
 * `kind` drives the icon — see ICON_BY_KIND in
 * components/procedures/ProcedureTimeline.tsx
 */

export type TimelineKind =
    | "consult"
    | "procedure"
    | "early-recovery"
    | "settling-in"
    | "final-result";

export interface TimelineStep {
    when: string;
    label: string;
    description: string;
    kind: TimelineKind;
}

const SURGICAL_DEFAULT: TimelineStep[] = [
    {
        when: "Before surgery",
        label: "Consultation",
        description:
            "Surgeon reviews your photos + the simulator preview, sets realistic expectations, and books the procedure date.",
        kind: "consult",
    },
    {
        when: "Day 0",
        label: "Procedure",
        description:
            "In-clinic procedure under local or general anaesthetic. Most patients go home the same day.",
        kind: "procedure",
    },
    {
        when: "Days 1–7",
        label: "Early recovery",
        description:
            "Swelling and bruising peak around day 3 then start to subside. Most patients work from home this week.",
        kind: "early-recovery",
    },
    {
        when: "Weeks 2–6",
        label: "Settling in",
        description:
            "Visible swelling resolves; you can return to social commitments + light exercise. Final shape still emerging.",
        kind: "settling-in",
    },
    {
        when: "Months 6–12",
        label: "Final result",
        description:
            "Tissues fully settle and the simulated outcome becomes your real face. Follow-up review with your surgeon.",
        kind: "final-result",
    },
];

const INJECTABLE_TIMELINE: TimelineStep[] = [
    {
        when: "Before treatment",
        label: "Consultation",
        description:
            "Practitioner walks you through the simulation, marks the injection points, and explains the units / volume needed.",
        kind: "consult",
    },
    {
        when: "Day of treatment",
        label: "Treatment",
        description:
            "15–30 minute in-clinic visit. Numbing cream + fine needles. You walk out the same hour.",
        kind: "procedure",
    },
    {
        when: "Days 1–3",
        label: "Onset",
        description:
            "Mild redness or pinpoint bruising at injection sites. Effects start showing within 48–72 hours.",
        kind: "early-recovery",
    },
    {
        when: "Weeks 1–2",
        label: "Peak effect",
        description:
            "Full result visible. Top-up appointment if any asymmetry needs balancing.",
        kind: "settling-in",
    },
    {
        when: "Months 3–6",
        label: "Maintenance",
        description:
            "Gradual softening of the effect. Most patients schedule a maintenance visit at the 4–6 month mark.",
        kind: "final-result",
    },
];

const HAIR_TRANSPLANT_TIMELINE: TimelineStep[] = [
    {
        when: "Before surgery",
        label: "Consultation",
        description:
            "Surgeon reviews your hair-loss pattern, density goals, and donor-area capacity.",
        kind: "consult",
    },
    {
        when: "Day 0",
        label: "Transplant day",
        description:
            "FUE / DHI session: typically 6–8 hours under local anaesthesia. You're awake throughout.",
        kind: "procedure",
    },
    {
        when: "Weeks 2–4",
        label: "Shock loss",
        description:
            "Transplanted hairs shed normally; this is expected and the follicles remain alive under the scalp.",
        kind: "early-recovery",
    },
    {
        when: "Months 3–6",
        label: "New growth",
        description:
            "Transplanted follicles begin producing new hairs. Density visibly improves week by week.",
        kind: "settling-in",
    },
    {
        when: "Months 9–12",
        label: "Final result",
        description:
            "Full density emerges; final hairline matures. Photo review against your simulated outcome.",
        kind: "final-result",
    },
];

// Map of procedure slug → custom timeline. Anything not listed gets
// SURGICAL_DEFAULT.
const TIMELINE_OVERRIDES: Record<string, TimelineStep[]> = {
    // Injectables
    botox: INJECTABLE_TIMELINE,
    "dermal-fillers": INJECTABLE_TIMELINE,
    "lip-fillers": INJECTABLE_TIMELINE,
    "lip-augmentation": INJECTABLE_TIMELINE,
    "lip-flip": INJECTABLE_TIMELINE,
    sculptra: INJECTABLE_TIMELINE,
    radiesse: INJECTABLE_TIMELINE,
    profhilo: INJECTABLE_TIMELINE,
    kybella: INJECTABLE_TIMELINE,
    "masseter-botox": INJECTABLE_TIMELINE,
    "prp-facial": INJECTABLE_TIMELINE,
    // Hair restoration
    "hair-transplant": HAIR_TRANSPLANT_TIMELINE,
    "fue-hair-transplant": HAIR_TRANSPLANT_TIMELINE,
    "dhi-hair-transplant": HAIR_TRANSPLANT_TIMELINE,
    "beard-transplant": HAIR_TRANSPLANT_TIMELINE,
    "eyebrow-restoration": HAIR_TRANSPLANT_TIMELINE,
};

export function getTimelineForProcedure(slug: string): TimelineStep[] {
    return TIMELINE_OVERRIDES[slug] ?? SURGICAL_DEFAULT;
}
