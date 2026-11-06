// Slugs with an entry here render the explainer page. Ranges come from CLINICAL_RANGES and
// references from the norm-band table or the overlay's own constants, so no number is hand-typed.

import { CLINICAL_RANGES } from "@/lib/simulation/procedures/rhinoplasty-ranges";
import {
    TOTAL_PROJECTION_IDEAL,
    NASAL_LENGTH_IDEAL,
    TIP_ROTATION_IDEAL_DEG,
    allNormBandEntries,
    type NormBand,
    type PopulationRef,
    type RhinobaseMetricKey,
} from "@/lib/simulation/rhinoplasty-profile-metrics";
import { isProcedureRealtimeCapable } from "@/lib/simulator-dimension/capability";

export type ExplainerView = "side" | "front" | "either";

/** ideal: an author's band; pointIdeal: a single published value; observed: a measured spread. */
export type ReferenceKind = "ideal" | "pointIdeal" | "observed";

export type SourceId = "farkas" | "brito" | "powell" | "yilmaz" | "liang" | "sun" | "mastering";

export interface ReferenceSource {
    /** Short form for the table, "Surname et al., year". */
    cite: string;
    full: string;
}

export const REFERENCE_SOURCES: Record<SourceId, ReferenceSource> = {
    farkas: { cite: "Farkas, 1994", full: "Farkas LG. Anthropometry of the Head and Face. 2nd ed. 1994." },
    brito: {
        cite: "Brito et al., 2020",
        full: "Brito, Avashia, Rohrich. Evidence-based nasal analysis for rhinoplasty: the 10-7-5 method. Plast Reconstr Surg Glob Open 2020;8(2):e2632.",
    },
    powell: { cite: "Powell and Humphreys, 1984", full: "Powell, Humphreys. Proportions of the Aesthetic Face. 1984." },
    yilmaz: {
        cite: "Yılmaz et al., 2023",
        full: "Yılmaz et al. Anatomy 2023;17(2). Measured in 142 Turkish adults; ranges are mean ± 1 SD.",
    },
    liang: { cite: "Liang et al., 2022", full: "Liang et al. J Craniofac Surg 2022;33(8):2486–2492." },
    sun: {
        cite: "Sun et al., 2022",
        full: "Sun, Liang et al. J Craniofac Surg 2022;33(1):7–10. Preference survey of 703 raters, including 50 surgeons.",
    },
    mastering: { cite: "Mastering Rhinoplasty", full: "Mastering Rhinoplasty, p.111, Fig. 4.7 (a–c), \"Aesthetics: extrinsic factors\"." },
};

export interface ReferenceRow {
    /** The value as the table prints it, "95–110°" or "0.67". */
    value: string;
    /** null when the source does not split by sex. */
    sex: "M" | "F" | null;
    population: PopulationRef;
    kind: ReferenceKind;
    source: SourceId;
    /** The figure reached the norm table through a secondary source. */
    unverified: boolean;
}

export interface ExplainerMeasurement {
    /** Message key under ProcedureExplainer.rhinoplasty.measure.items. */
    key: string;
    view: ExplainerView;
    /** The simulator reads this measurement from a proxy landmark. */
    estimated: boolean;
    /** Published references; empty means the simulator draws it as a guide only. */
    references: ReferenceRow[];
}

export interface ExplainerControl {
    /** Message key under ProcedureExplainer.rhinoplasty.adjust.items. */
    key: string;
    /** CLINICAL_RANGES id the range and unit are read from. */
    rangeId: string;
    view: "front" | "both";
}

export interface ProcedureExplainer {
    slug: string;
    measurements: ExplainerMeasurement[];
    controls: ExplainerControl[];
    /** Live camera is claimed only while the realtime pipeline is actually wired. */
    liveCamera: boolean;
    /** Message keys, in page order, under about.facts, recovery.items and patientFaq.items. */
    facts: string[];
    recovery: string[];
    patientFaq: string[];
}

const RATIO = (value: number): string => value.toFixed(2);

// Bands the overlay hardcodes; explainer-reference-drift.test.ts pins each to its overlay call.
const REFERENCE_LITERALS = {
    nasofrontal: "115–135°",
    nasomental: "120–132°",
    alarIC: "0.85–1.15",
} as const;

// Norm-table metrics shown on the page, keyed by measurement.
const NORM_METRICS: Partial<Record<string, RhinobaseMetricKey>> = {
    nasofrontal: "nasofrontalAngleDeg",
    nasolabial: "nasolabialAngleDeg",
    goode: "goodeRatio",
    alarIC: "alarBaseToIntercanthalRatio",
};

const SOURCE_PREFIXES: [string, SourceId][] = [
    ["Brito", "brito"],
    ["Yılmaz", "yilmaz"],
    ["Liang", "liang"],
    ["Sun, Liang", "sun"],
    ["Powell", "powell"],
];

function sourceOf(citation: string): SourceId {
    const match = SOURCE_PREFIXES.find(([prefix]) => citation.startsWith(prefix));
    if (!match) throw new Error(`no reference source for "${citation}"`);
    return match[1];
}

function formatBand(band: NormBand): string {
    const number = (value: number): string => (band.unit === "ratio" ? RATIO(value) : String(value));
    const suffix = band.unit === "deg" ? "°" : band.unit === "mm" ? " mm" : "";
    if (band.min !== undefined && band.max !== undefined) return `${number(band.min)}–${number(band.max)}${suffix}`;
    if (band.point !== undefined) return `${number(band.point)}${suffix}`;
    throw new Error(`band from "${band.source}" has no value`);
}

function normRows(metric: RhinobaseMetricKey): ReferenceRow[] {
    return allNormBandEntries()
        .filter((entry) => entry.metric === metric)
        .map(({ band, sex, population }) => ({
            value: formatBand(band),
            sex,
            population,
            kind:
                band.kind === "population-observed"
                    ? "observed"
                    : band.min !== undefined && band.max !== undefined
                      ? "ideal"
                      : "pointIdeal",
            source: sourceOf(band.source),
            unverified: band.needsVerification === true,
        }));
}

/** A row restated from the overlay or Fig. 4.7, which the norm table does not hold. */
function literal(value: string, source: SourceId, kind: ReferenceKind, population: PopulationRef, sex: "M" | "F" | null = null): ReferenceRow {
    return { value, sex, population, kind, source, unverified: false };
}

function measurement(key: string, view: ExplainerView, extra: ReferenceRow[] = [], estimated = false): ExplainerMeasurement {
    const metric = NORM_METRICS[key];
    return { key, view, estimated, references: [...extra, ...(metric ? normRows(metric) : [])] };
}

const RHINOPLASTY_MEASUREMENTS: ExplainerMeasurement[] = [
    measurement("nasofrontal", "side", [literal(REFERENCE_LITERALS.nasofrontal, "powell", "ideal", "caucasian")]),
    measurement("nasolabial", "side"),
    measurement("nasomental", "side", [literal(REFERENCE_LITERALS.nasomental, "powell", "ideal", "caucasian")]),
    measurement("goode", "side"),
    measurement("totalProjection", "side", [literal(RATIO(TOTAL_PROJECTION_IDEAL), "mastering", "pointIdeal", "unspecified")], true),
    measurement("intrinsicProjection", "side", [], true),
    measurement(
        "tipRotation",
        "side",
        [
            literal(`${TIP_ROTATION_IDEAL_DEG.M}°`, "mastering", "pointIdeal", "unspecified", "M"),
            literal(`${TIP_ROTATION_IDEAL_DEG.F}°`, "mastering", "pointIdeal", "unspecified", "F"),
        ],
        true,
    ),
    measurement("columellar", "side", [literal("0°", "mastering", "pointIdeal", "unspecified")], true),
    measurement("nasalLength", "side", [literal(RATIO(NASAL_LENGTH_IDEAL), "mastering", "pointIdeal", "unspecified")]),
    measurement("dorsalLine", "side"),
    measurement("tipPoint", "side"),
    measurement("alarIC", "front", [literal(REFERENCE_LITERALS.alarIC, "farkas", "observed", "unspecified")]),
    measurement("symmetry", "front", [], true),
    measurement("nasalThirds", "front"),
    measurement("dorsalAesthetic", "either"),
    measurement("facialThirds", "front", [], true),
    measurement("frankfort", "either", [], true),
];

// The eight core controls in simulator order; per-side offsets, bony base width and presets
// are covered by the adjust.extras line.
const RHINOPLASTY_CONTROLS: ExplainerControl[] = [
    { key: "dorsalProfile", rangeId: "dorsalProfile", view: "both" },
    { key: "bridgeWidth", rangeId: "bridgeWidth", view: "front" },
    { key: "tipRefinement", rangeId: "tipRefinement", view: "front" },
    { key: "tipRotation", rangeId: "tipRotation", view: "both" },
    { key: "tipProjection", rangeId: "tipProjection", view: "both" },
    { key: "nasalLength", rangeId: "nasalLength", view: "both" },
    { key: "nostrilWidth", rangeId: "nostrilWidth", view: "front" },
    { key: "deviationCorrection", rangeId: "deviationCorrection", view: "front" },
];

function rhinoplastyExplainer(): ProcedureExplainer {
    for (const control of RHINOPLASTY_CONTROLS) {
        if (!CLINICAL_RANGES[control.rangeId]) {
            throw new Error(`no clinical range for ${control.rangeId}`);
        }
    }
    return {
        slug: "rhinoplasty",
        measurements: RHINOPLASTY_MEASUREMENTS,
        controls: RHINOPLASTY_CONTROLS,
        liveCamera: isProcedureRealtimeCapable("rhinoplasty"),
        facts: ["duration", "nights", "work", "final"],
        recovery: ["splint", "work", "bruising", "exercise", "swelling", "final"],
        patientFaq: ["simulation", "pain", "permanent", "breathing", "age", "risks"],
    };
}

const EXPLAINERS: Record<string, ProcedureExplainer> = {
    rhinoplasty: rhinoplastyExplainer(),
};

export function getProcedureExplainer(slug: string): ProcedureExplainer | null {
    return EXPLAINERS[slug] ?? null;
}

/** "−4 to +4 mm" or "−15 to +15°", read from the range table at call time. */
export function formatControlRange(rangeId: string): string {
    const range = CLINICAL_RANGES[rangeId];
    if (!range) throw new Error(`no clinical range for ${rangeId}`);
    const bound = (value: number): string => {
        if (value > 0) return `+${value}`;
        if (value < 0) return `−${Math.abs(value)}`;
        return "0";
    };
    return `${bound(range.min)} to ${bound(range.max)}${range.unit === "°" ? "" : " "}${range.unit}`;
}

export { REFERENCE_LITERALS };
