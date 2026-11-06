/**
 * rhinoplasty-profile-metrics — pure, side-effect-free geometry for the
 * rhinoplasty side-view clinical overlays (U1).
 *
 * All functions take pixel-space points (`Pt = [number, number]`) and return
 * plain numbers / plain objects. No canvas, no React, no DOM — everything here
 * is unit-testable in isolation (see __tests__/rhinoplasty-profile-metrics.test.ts).
 *
 * Threshold provenance:
 *   - Nasomental angle 120–132°  → Powell–Humphreys aesthetic triangle
 *     (literature-sourced; NOT from Rhinoplasty.pptx).
 *   - Goode ratio 0.55–0.60      → Fig 81.6 (true perpendicular construction).
 *   - Dorsal hump threshold 2 mm → literature-sourced (Farkas; female dorsum
 *     ideal 1–2 mm behind the N→tip line, male on it).
 *   - Total projection 2/3       → Mastering Rhinoplasty p.111, Fig. 4.7a
 *     ("Tip Aesthetics: Extrinsic Factors").
 *   - Intrinsic projection       → Fig. 4.7a; NO published ideal band in the
 *     figure. We report the ratio only, never a pass/fail verdict.
 *   - Tip rotation 105° F / 100° M → Fig. 4.7b.
 *   - Columellar parallelism x=y → Fig. 4.7c.
 *   - Nasal length 2/3 of MFH    → Fig. 4.7c.
 * Where Fig. 4.7 states a POINT value rather than a band (2/3, 105°, x=y) the
 * tolerances below are REPO-CHOSEN so the readout can classify over/under;
 * they are NOT from the textbook and are flagged as such at each constant.
 *
 * The final section of this file (Rhinobase parameter-gap fill, 2026-08-13)
 * adds the mentocervical angle, columella length, dorsum width and bony base
 * width, plus a POPULATION-AWARE norm-band table. Norms there are never
 * hardcoded to Caucasian defaults, and any band whose tolerance we could not
 * source ships with the verdict withheld — see the section header.
 */

import { NOSE_LANDMARKS } from "./procedures/rhinoplasty";

export type Pt = [number, number];

/**
 * Average adult nasal length (nasion→pronasale), Farkas ~47 mm. This is a
 * SAGITTAL-plane reference: on a lateral photo it lies in the image plane and
 * is therefore NOT foreshortened, unlike the coronal inter-canthal span. Used
 * to calibrate profile px→mm for the dorsal-line deviations.
 */
export const ADULT_NASAL_LENGTH_MM = 47;

// ---------------------------------------------------------------------------
// Angle / range primitives
// ---------------------------------------------------------------------------

/**
 * Interior angle in degrees at `vertex`, between the rays vertex→a and
 * vertex→b. Returns NaN when either ray has zero length.
 *
 * MOVED verbatim from RhinoplastyAnalysisOverlay.tsx (was lines 88–97);
 * the component now imports it from here.
 */
export function angleDegrees(a: Pt, vertex: Pt, b: Pt): number {
    const va: Pt = [a[0] - vertex[0], a[1] - vertex[1]];
    const vb: Pt = [b[0] - vertex[0], b[1] - vertex[1]];
    const magA = Math.hypot(va[0], va[1]);
    const magB = Math.hypot(vb[0], vb[1]);
    if (magA === 0 || magB === 0) return NaN;
    const dot = va[0] * vb[0] + va[1] * vb[1];
    const cos = Math.min(1, Math.max(-1, dot / (magA * magB)));
    return (Math.acos(cos) * 180) / Math.PI;
}

export type RangeState = "in" | "out";

/** Whether `value` sits inside the inclusive [idealMin, idealMax] band. */
export function rangeState(
    value: number,
    idealMin: number,
    idealMax: number,
): RangeState {
    return value >= idealMin && value <= idealMax ? "in" : "out";
}

// ---------------------------------------------------------------------------
// Nasomental angle (profile)
// ---------------------------------------------------------------------------

/**
 * Nasomental angle — vertex at the TIP, between the tip→nasion ray and the
 * tip→pogonion ray. Ideal 120–132° (Powell–Humphreys aesthetic triangle;
 * literature-sourced, not in Rhinoplasty.pptx).
 */
export function nasomentalAngleDeg(nasion: Pt, tip: Pt, pogonion: Pt): number {
    return angleDegrees(nasion, tip, pogonion);
}

// ---------------------------------------------------------------------------
// Goode ratio — true perpendicular construction (profile)
// ---------------------------------------------------------------------------

/**
 * Goode tip-projection ratio via the true Fig 81.6 construction:
 *   AT = |tip.x − alar.x| — perpendicular distance from the tip to the
 *        VERTICAL line through the alar-facial groove (profile construction).
 *   NT = Euclidean nasion→tip length.
 *   ratio = AT / NT  (NaN when NT === 0). Ideal 0.55–0.60.
 */
export function goodePerpendicularRatio(nasion: Pt, tip: Pt, alar: Pt): number {
    const AT = Math.abs(tip[0] - alar[0]);
    const NT = Math.hypot(tip[0] - nasion[0], tip[1] - nasion[1]);
    return NT > 0 ? AT / NT : NaN;
}

// ---------------------------------------------------------------------------
// Dorsal line / bridge-height deviations (profile)
// ---------------------------------------------------------------------------

export interface DorsalDeviation {
    landmarkIndex: number;
    point: Pt;
    /**
     * Signed perpendicular distance (px) from the nasion→tip line. The sign is
     * ORIENTATION-DEPENDENT: the cross-product flips between mirror-image left-
     * and right-facing profiles, so "anterior" maps to +signedPx on one facing
     * direction and −signedPx on the other. Only the magnitude is
     * orientation-invariant; callers that classify hump vs saddle (or apply the
     * sex-specific dorsum rule) must normalise the sign by viewAngle.
     */
    signedPx: number;
    /** signedPx converted to mm via the refPx/refMm calibration below. */
    signedMm: number;
}

/**
 * Signed perpendicular deviation of each dorsum sample point from the infinite
 * line nasion→tip. See {@link DorsalDeviation.signedPx} for the sign
 * convention (orientation-dependent — magnitude is the reliable quantity).
 *
 * @param refPx a reference PIXEL length used to scale px→mm. On a profile pass
 *              a SAGITTAL-plane reference (e.g. the nasion→tip pixel length),
 *              NOT the inter-canthal span — the latter is a coronal (left↔right)
 *              distance foreshortened by ~cos(yaw) on a lateral photo, which
 *              would inflate every mm value 2–20×.
 * @param refMm the real-world millimetre length that `refPx` represents.
 *              Defaults to 63 (adult inter-canthal, measurement-overlay.ts) so
 *              legacy inter-canthal callers keep their 1:1 behaviour.
 */
export function dorsalLineDeviations(
    nasion: Pt,
    tip: Pt,
    dorsumPoints: Array<{ index: number; point: Pt }>,
    refPx: number,
    refMm: number = 63,
): DorsalDeviation[] {
    const dx = tip[0] - nasion[0];
    const dy = tip[1] - nasion[1];
    const len = Math.hypot(dx, dy);
    return dorsumPoints.map(({ index, point: p }) => {
        const signedPx =
            len > 0
                ? (dx * (nasion[1] - p[1]) - (nasion[0] - p[0]) * dy) / len
                : NaN;
        return {
            landmarkIndex: index,
            point: p,
            signedPx,
            signedMm: refPx > 0 ? (signedPx / refPx) * refMm : 0,
        };
    });
}

/** Largest absolute deviation (mm) across the dorsum samples; 0 for empty. */
export function maxAbsDeviationMm(devs: DorsalDeviation[]): number {
    let max = 0;
    for (const d of devs) {
        const abs = Math.abs(d.signedMm);
        if (abs > max) max = abs;
    }
    return max;
}

// ===========================================================================
// Fig. 4.7 — "Tip Aesthetics: Extrinsic Factors" (lateral view)
// ---------------------------------------------------------------------------
// Source: Mastering Rhinoplasty, p.111, Fig. 4.7 (a–c) "Aesthetics – extrinsic
// factors". Cited the same way this file cites Fig 81.6 / Powell–Humphreys /
// Farkas above.
//
// Landmark vocabulary used throughout this section (the figure's own labels):
//   Ni = nasion            AC = alar crease (alar-facial groove)
//   Ti = tip (pronasale)   C' = columellar breakpoint
//
// EVERY quantity here is an ANGLE or a DIMENSIONLESS RATIO. That is deliberate:
// a lateral photo has no reliable px→mm scale (a coronal reference such as the
// inter-canthal span is foreshortened by ~cos(yaw) and inflates mm 2–20×), so
// keeping these calibration-free is the only way they stay trustworthy on a
// profile. Do NOT add a px→mm conversion to this section.
// ===========================================================================

/**
 * Which way the subject faces in the image. Derived from the overlay's
 * `viewAngle` classification, whose sign convention is defined in
 * `lib/simulation/face-pose.ts` (`classifyViewAngle`): positive yaw =
 * "right-profile" = face turned to the VIEWER's right = anterior is +x in
 * image space. Mirror rule for "left-profile".
 */
export type ProfileFacing = "left" | "right";

/**
 * Unit x-direction that points ANTERIORLY (out of the face) for a given
 * facing. Every Fig. 4.7 angle is measured from a vertical reference toward
 * the anterior direction, so it MIRRORS between left- and right-facing
 * profiles — canonicalising x by this sign is what makes the returned angles
 * orientation-invariant (compare {@link DorsalDeviation.signedPx}, which
 * documents the same hazard for the dorsal-line cross product but leaves the
 * normalisation to its caller).
 */
export function anteriorSign(facing: ProfileFacing): 1 | -1 {
    return facing === "right" ? 1 : -1;
}

/** Map the overlay's viewAngle union onto a facing; null on non-profile views. */
export function profileFacingFromViewAngle(
    viewAngle: "front" | "left-profile" | "right-profile" | null | undefined,
): ProfileFacing | null {
    if (viewAngle === "left-profile") return "left";
    if (viewAngle === "right-profile") return "right";
    return null;
}

/**
 * Angle in degrees of the ray `from`→`to`, measured at `from` from the
 * DOWNWARD (caudal) vertical, opening toward the anterior direction.
 *
 *   0°   = straight down (caudal)
 *   90°  = straight anterior (horizontal, out of the face)
 *   180° = straight up (cranial)
 *
 * Built on atan2 in a canonicalised (anterior, caudal) basis rather than on
 * the acos-based {@link angleDegrees}: atan2 returns a value in (−180°, 180°]
 * by construction, so there is no reflex-angle branch to trip over near ±π,
 * and the anterior canonicalisation removes the left/right mirror. Image y
 * grows DOWNWARD, hence caudal = +y.
 *
 * A NEGATIVE result means the ray points posteriorly — non-physiologic for
 * every Fig. 4.7 construction, and in practice the signature of a mismatched
 * `facing` (e.g. a mirrored selfie feed whose yaw sign was never flipped at
 * the call site, per face-pose.ts). Returns NaN for coincident points.
 */
function angleFromCaudalVerticalDeg(
    from: Pt,
    to: Pt,
    facing: ProfileFacing,
): number {
    const anterior = (to[0] - from[0]) * anteriorSign(facing);
    const caudal = to[1] - from[1];
    if (anterior === 0 && caudal === 0) return NaN;
    return (Math.atan2(anterior, caudal) * 180) / Math.PI;
}

// ---------------------------------------------------------------------------
// a1 — Total projection (Fig. 4.7a)
// ---------------------------------------------------------------------------

/** Fig. 4.7a ideal total projection: AC→Ti is 2/3 of Ni→Ti. */
export const TOTAL_PROJECTION_IDEAL = 2 / 3;
/**
 * REPO-CHOSEN tolerance (±0.05 ≈ ±7.5% relative). Fig. 4.7a prints a point
 * value, not a band — this only exists so the readout can say over/under.
 */
export const TOTAL_PROJECTION_TOLERANCE = 0.05;

export type ProjectionState = "ideal" | "over" | "under";

/**
 * a1 — total projection: `dist(AC, Ti) / dist(Ni, Ti)`. Ideal 2/3.
 * NaN when Ni and Ti coincide.
 */
export function totalProjectionRatio(nasion: Pt, tip: Pt, alarCrease: Pt): number {
    const NT = Math.hypot(tip[0] - nasion[0], tip[1] - nasion[1]);
    if (NT === 0) return NaN;
    return Math.hypot(tip[0] - alarCrease[0], tip[1] - alarCrease[1]) / NT;
}

/**
 * Classify a1 against the ideal.
 *
 * SOURCE TYPO — DO NOT "FIX" BACK: Fig. 4.7a marks a point `x` BEYOND Ti along
 * the AC→Ti axis and a point `x'` SHORT of Ti, and the book literally prints
 * the caption "overprojection" for BOTH. `x'` is under-projection; the printed
 * duplicate is an error in the source. This implementation is deliberately
 * correct rather than faithful to the typo.
 */
export function classifyTotalProjection(
    ratio: number,
    tolerance: number = TOTAL_PROJECTION_TOLERANCE,
): ProjectionState | null {
    if (!Number.isFinite(ratio)) return null;
    if (ratio > TOTAL_PROJECTION_IDEAL + tolerance) return "over";
    if (ratio < TOTAL_PROJECTION_IDEAL - tolerance) return "under";
    return "ideal";
}

// ---------------------------------------------------------------------------
// a2 — Intrinsic projection (Fig. 4.7a)
// ---------------------------------------------------------------------------

export interface IntrinsicProjection {
    /**
     * Scalar component of the vector C'→Ti along the unit AC→Ti axis, in
     * PIXELS. In the figure this is the double-headed arrow running from C' to
     * the dashed perpendicular dropped through Ti. Pixel-space only — never
     * convert it to mm off a coronal reference on a profile.
     */
    alongAxisPx: number;
    /**
     * `alongAxisPx / dist(AC, Ti)` — the calibration-free form, i.e. what
     * fraction of the TOTAL projection is intrinsic (tip-cartilage) rather
     * than extrinsic. This is the value the overlay reports.
     */
    ratio: number;
}

/**
 * a2 — intrinsic projection. Projects C'→Ti onto the unit AC→Ti axis.
 * Both fields are NaN when AC and Ti coincide (zero-length axis).
 *
 * NOTE the figure gives NO ideal band for a2, so callers must NOT colour-code
 * it pass/fail — report the number and say so.
 */
export function intrinsicProjection(
    alarCrease: Pt,
    tip: Pt,
    columellarBreakpoint: Pt,
): IntrinsicProjection {
    const ax = tip[0] - alarCrease[0];
    const ay = tip[1] - alarCrease[1];
    const axisLen = Math.hypot(ax, ay);
    if (axisLen === 0) return { alongAxisPx: NaN, ratio: NaN };
    const ux = ax / axisLen;
    const uy = ay / axisLen;
    const alongAxisPx =
        (tip[0] - columellarBreakpoint[0]) * ux +
        (tip[1] - columellarBreakpoint[1]) * uy;
    return { alongAxisPx, ratio: alongAxisPx / axisLen };
}

// ---------------------------------------------------------------------------
// b1 — Tip rotation angle (Fig. 4.7b)
// ---------------------------------------------------------------------------

/**
 * Fig. 4.7b ideal tip-rotation angle at AC: 105° female, 100° male.
 *
 * This is NOT the nasolabial angle (vertex at subnasale, between the columella
 * and the upper lip, Fig 81.10). The two share a ~105° figure but are
 * different constructions from different vertices — the overlay draws both,
 * distinctly labelled, so a surgeon can see WHY they diverge.
 */
export const TIP_ROTATION_IDEAL_DEG = { F: 105, M: 100 } as const;
/**
 * REPO-CHOSEN tolerance (±5°). Fig. 4.7b prints point values, not bands.
 *
 * NEEDS SURGEON REVIEW — two things could bias this band:
 *   1. Internal consistency. Combining the figure's own a1 (AC→Ti = 2/3 of
 *      Ni→Ti) with Goode 0.55–0.60 puts Ti ~29° above the horizontal through
 *      AC, i.e. a b1 of ~119°, not 105°. The two constructions come from
 *      different sources (Fig 4.7b vs Fig 81.6) and disagree about where AC
 *      sits, so a textbook-normal nose may read "over-rotated" here.
 *   2. Landmark fidelity. AC is taken from MediaPipe's alar landmark (48/278),
 *      which is the alar rim/wing point, not the true alar-facial groove.
 * Both push the measured angle up. Widening this tolerance (or shifting the
 * ideal) is a one-line change once a surgeon has looked at real profiles.
 */
export const TIP_ROTATION_TOLERANCE_DEG = 5;

export type RotationState = "ideal" | "over" | "under";

/** Ideal tip-rotation angle for a patient sex; null → female (APAC default). */
export function tipRotationIdealDeg(sex: "M" | "F" | null | undefined): number {
    return sex === "M" ? TIP_ROTATION_IDEAL_DEG.M : TIP_ROTATION_IDEAL_DEG.F;
}

/**
 * b1 — tip rotation: angle at AC between the DOWNWARD (caudal) vertical
 * through AC and the ray AC→Ti. Ideal 105° F / 100° M.
 *
 * > 90° means the tip sits above the horizontal through AC. A LARGER angle =
 * tip rotated upward (over-rotated); a SMALLER angle = tip rotated downward
 * (under-rotated / ptotic), matching the figure's "upward/downward rotation"
 * annotations around the ideal ray.
 *
 * Mirror-normalised via `facing` — see {@link anteriorSign}.
 */
export function tipRotationAngleDeg(
    alarCrease: Pt,
    tip: Pt,
    facing: ProfileFacing,
): number {
    return angleFromCaudalVerticalDeg(alarCrease, tip, facing);
}

/** Classify b1 against its sex-specific ideal. */
export function classifyTipRotation(
    deg: number,
    idealDeg: number,
    tolerance: number = TIP_ROTATION_TOLERANCE_DEG,
): RotationState | null {
    if (!Number.isFinite(deg)) return null;
    if (deg > idealDeg + tolerance) return "over";
    if (deg < idealDeg - tolerance) return "under";
    return "ideal";
}

// ---------------------------------------------------------------------------
// b2 — Columellar axis parallelism (Fig. 4.7c)
// ---------------------------------------------------------------------------

/**
 * REPO-CHOSEN tolerance (±10°). Fig. 4.7c states the rule as an equality
 * (x = y), not a band.
 */
export const COLUMELLAR_PARALLELISM_TOLERANCE_DEG = 10;

/**
 * b2 — columellar axis angle (y° in the figure): angle at the subnasale
 * between the DOWNWARD vertical and the columellar axis subnasale→C'.
 * Same units, same reference and same mirror normalisation as
 * {@link tipRotationAngleDeg} (x°), so the two are directly comparable.
 */
export function columellarAxisAngleDeg(
    subnasale: Pt,
    columellarBreakpoint: Pt,
    facing: ProfileFacing,
): number {
    return angleFromCaudalVerticalDeg(subnasale, columellarBreakpoint, facing);
}

/**
 * b2 — divergence |x − y| in degrees between the tip axis (x°, b1) and the
 * columellar axis (y°). Fig. 4.7c: the two should be PARALLEL, i.e. x = y, so
 * the ideal divergence is 0°.
 *
 * Always the MINOR angle: a raw |a − b| on two values that straddle the atan2
 * ±180° branch reports the reflex (a true 52° comes out 308°). Wrapping to
 * min(d, 360 − d) is the same guard the nasomental arc uses on canvas.
 */
export function columellarParallelismDeg(
    tipAxisDeg: number,
    columellarAxisDeg: number,
): number {
    if (!Number.isFinite(tipAxisDeg) || !Number.isFinite(columellarAxisDeg)) {
        return NaN;
    }
    const d = Math.abs(tipAxisDeg - columellarAxisDeg);
    return Math.min(d, 360 - d);
}

// ---------------------------------------------------------------------------
// c1 — Nasal length (Fig. 4.7c)
// ---------------------------------------------------------------------------

/** Fig. 4.7c ideal nasal length: Ni→Ti is 2/3 of the midface height. */
export const NASAL_LENGTH_IDEAL = 2 / 3;
/** REPO-CHOSEN tolerance (±0.05). Fig. 4.7c prints a point value, not a band. */
export const NASAL_LENGTH_TOLERANCE = 0.05;

export type NasalLengthState = "ideal" | "short" | "long";

/**
 * c1 — nasal length: `dist(Ni, Ti) / MFH`, ideal 2/3.
 *
 * MFH = midface height = glabella → subnasale (founder-approved definition;
 * the standard facial middle third). Both spans are midline SAGITTAL
 * quantities, so both stay in the image plane on a lateral photo and the ratio
 * needs no scale calibration.
 */
export function nasalLengthRatio(
    glabella: Pt,
    subnasale: Pt,
    nasion: Pt,
    tip: Pt,
): number {
    const mfh = Math.hypot(
        subnasale[0] - glabella[0],
        subnasale[1] - glabella[1],
    );
    if (mfh === 0) return NaN;
    return Math.hypot(tip[0] - nasion[0], tip[1] - nasion[1]) / mfh;
}

/**
 * Classify c1. Fig. 4.7c draws dashed Short/Long markers above and below Ti:
 * a tip displaced SUPERIORLY shortens Ni→Ti ("Short"), inferiorly lengthens it
 * ("Long").
 */
export function classifyNasalLength(
    ratio: number,
    tolerance: number = NASAL_LENGTH_TOLERANCE,
): NasalLengthState | null {
    if (!Number.isFinite(ratio)) return null;
    if (ratio > NASAL_LENGTH_IDEAL + tolerance) return "long";
    if (ratio < NASAL_LENGTH_IDEAL - tolerance) return "short";
    return "ideal";
}

// ===========================================================================
// Rhinobase parameter-gap fill + population-aware norm bands
// ---------------------------------------------------------------------------
// Dr. Kshitij Patil (Amravati, ~20 rhinoplasties/month), 2026-08-13:
// "I'll take all the parameters from Rhinobase and incorporate that as well."
//
// Rhinobase (rhinobase.net, Prof. Fazil Apaydin, Ege University; Apaydin,
// Akyildiz, Hecht, Toriumi, Arch Facial Plast Surg 2009, PMID 19451458) is a
// free measurement-and-documentation tool with a 21-parameter photo-analysis
// module. We already shipped 8 of those 21 (nasofrontal, nasolabial,
// nasomental, Goode, total + intrinsic tip projection, nasal length ratio,
// columellar parallelism). This section closes the named gaps.
//
// ADDED HERE
//   · Mentocervical angle          (lateral) — Rhinobase has it, we did not
//   · Columella length Sn→C'       (lateral)
//   · Dorsum width                 (frontal)
//   · Bony base width              (frontal)
//   · Nasal-index CLASSIFICATION   (frontal) — bins only, see below
//   · A population-aware norm-band table with inline citations
//
// DELIBERATELY NOT ADDED — these already exist and a second implementation
// would be a fourth-site divergence of the kind that produced the Goode-ratio
// bug (62e0aed40). Wire the existing ones instead:
//   · Interalar / alar base width  → computeAlarMeasurements() in
//     lib/simulation/measurements.ts (alarBaseWidth 64↔294, plus the
//     intercanthal ratio Rhinobase does not compute). Its norm band IS added
//     to the table below so the existing number can finally be graded.
//   · Columella/lobule ratio       → computeManualBasalMetrics() in
//     lib/simulation/manual-nose-metrics.ts (`columellaLobuleRatio`,
//     Sn→C' : C'→Ti, basal view). Its 1.5–2.5 band gets a citation below.
//   · Nasal index VALUE            → already computed twice, with two
//     different conventions: lib/ai-assessment/shared.ts:379 uses
//     (width / dist(168,2)) × 100, while
//     lib/simulation/ai-suggestions/ethnicity-detector.ts:128 uses a bare
//     width/height RATIO off different landmarks (129/358, |Δy| only). A
//     third would make it three. Only the bin edges are added here.
//
// MILLIMETRES. Same contract as the rest of this file and as
// manual-nose-metrics.ts: no fabricated real-world lengths. Every function
// below returns pixels, degrees or dimensionless ratios, and converts to mm
// ONLY when the caller hands over an explicit calibration. There is no default
// calibration constant here on purpose — the legacy `refMm = 63` default in
// dorsalLineDeviations is an INTER-CANTHAL (coronal) span, which foreshortens
// by ~cos(yaw) on a lateral photo and inflated mm 2–20× the last time it was
// silently defaulted.
// ===========================================================================

// ---------------------------------------------------------------------------
// Norm-band model
// ---------------------------------------------------------------------------

export type PatientSex = "M" | "F";

/**
 * Which published population a norm band belongs to.
 *
 * `"unspecified"` is a real, first-class state, NOT a synonym for Caucasian.
 * Almost every band in the aesthetic-rhinoplasty literature is derived from
 * Caucasian cohorts; silently applying those to a South Asian or East Asian
 * patient is the single failure mode this whole table exists to prevent.
 * When the population is unspecified, {@link resolveNormBand} still surfaces a
 * band so the report can show the reader what the textbook says — but it marks
 * it substituted and strips the verdict.
 *
 * Maps onto the ethnicity vocabulary already in lib/simulation/ethnic-morphology.ts
 * (`korean` | `japanese` | `chinese` | `indian` | `other`) via
 * {@link populationRefFromEthnicityId}.
 */
export type PopulationRef =
    | "unspecified"
    | "caucasian"
    | "indian"
    | "eastAsian"
    /**
     * Turkish cohort, present only as an OBSERVED distribution (Yılmaz 2023).
     * It is in the table because it is the largest measured-population dataset
     * in our reference set and it runs consistently ~8° above the Caucasian
     * aesthetic ideals — the cleanest available evidence that "ideal" and
     * "typical" are different questions.
     */
    | "turkish";

/**
 * What a band actually asserts.
 *
 *   "aesthetic-ideal"     — a surgical target proposed by an author. Being
 *                           outside it is a finding.
 *   "population-observed" — a measured distribution (mean ± SD). Being outside
 *                           it means ATYPICAL, not abnormal, and it must never
 *                           be rendered as a pass/fail. Every entry of this
 *                           kind ships with `graded: false`.
 */
export type BandKind = "aesthetic-ideal" | "population-observed";

export interface NormBand {
    /** Inclusive lower bound. Absent when the source states a point value only. */
    min?: number;
    /** Inclusive upper bound. Absent when the source states a point value only. */
    max?: number;
    /** The point value, when the source gives one instead of a band. */
    point?: number;
    unit: "deg" | "ratio" | "mm";
    kind: BandKind;
    /** Inline citation. Every band in this table carries one. */
    source: string;
    /**
     * Whether a pass/fail VERDICT may be rendered from this band.
     *
     * `false` = render the number, withhold the grade. Same call this file
     * already makes for a1/b1/b2 (f69a3d92a) and that measurements.ts makes for
     * front-view Goode (f53efe970): a repo-invented tolerance around a
     * published point value is not evidence, and a confident wrong verdict is
     * worse than no verdict. {@link classifyAgainstBand} enforces it.
     */
    graded: boolean;
    /** Why it is withheld, what is unresolved, what a surgeon must confirm. */
    note?: string;
    /**
     * True when the figure reached us through a review/secondary snippet rather
     * than the primary source. MUST be surfaced before the number is shown to a
     * surgeon.
     */
    needsVerification?: boolean;
}

interface SexedNormBand {
    M: NormBand;
    F: NormBand;
}

type NormBandEntry = NormBand | SexedNormBand;

function isSexedBand(entry: NormBandEntry): entry is SexedNormBand {
    return (
        (entry as SexedNormBand).M !== undefined &&
        (entry as SexedNormBand).F !== undefined
    );
}

export type RhinobaseMetricKey =
    | "nasofrontalAngleDeg"
    | "nasolabialAngleDeg"
    | "mentocervicalAngleDeg"
    | "goodeRatio"
    | "columellarShowMm"
    | "alarBaseWidthMm"
    | "alarBaseToIntercanthalRatio"
    | "dorsumWidthToInterphiltralRatio"
    | "columellaLobuleRatio"
    | "domalDivergenceDeg"
    | "domalArcWidthMm"
    | "tipDefiningPointDistanceMm"
    | "nasalHeightMm"
    | "nasalWidthMm"
    | "nasalIndex"
    | "columellaLengthMm"
    | "dorsumWidthMm"
    | "bonyBaseWidthMm";

/** Shorthand for the primary aesthetic reference, cited on every band it backs. */
const BRITO_2020 =
    "Brito, Avashia, Rohrich, 'Evidence-based Nasal Analysis for Rhinoplasty: " +
    "The 10-7-5 Method', Plast Reconstr Surg Glob Open 2020;8(2):e2632";
const YILMAZ_2023 =
    "Yılmaz et al, Anatomy 2023;17(2), n=142 Turkish adults (observed mean ± SD)";
const BHANDARI_2021 =
    "Bhandari, Dhar, Gulati, J Plast Reconstr Aesthet Surg 2021;74(12):3421-3430";
const LIANG_2022 = "Liang et al, J Craniofac Surg 2022;33(8):2486-2492";
const SUN_2022 =
    "Sun, Liang et al, J Craniofac Surg 2022;33(1):7-10, preference survey of 703 raters incl. 50 surgeons";
const POWELL_HUMPHREYS =
    "Powell & Humphreys, 'Proportions of the Aesthetic Face' (1984), the same " +
    "aesthetic-triangle source this file already cites for the nasomental band";

/**
 * Population-aware norm bands, keyed metric → population.
 *
 * READ BEFORE ADDING A ROW: a band belongs here only with a citation, and it
 * gets `graded: true` only when the SOURCE ITSELF states a range. A published
 * point value plus a tolerance we picked is `graded: false`.
 */
const NORM_BANDS: Record<
    RhinobaseMetricKey,
    Partial<Record<PopulationRef, NormBandEntry>>
> = {
    nasofrontalAngleDeg: {
        caucasian: {
            M: {
                point: 130,
                unit: "deg",
                kind: "aesthetic-ideal",
                source: BRITO_2020,
                graded: false,
                note:
                    "Source states a point ideal (~130°), not a range. Any " +
                    "tolerance would be repo-invented, so the verdict is withheld.",
            },
            F: {
                point: 134,
                unit: "deg",
                kind: "aesthetic-ideal",
                source: BRITO_2020,
                graded: false,
                note:
                    "Source states a point ideal (~134°), not a range. Any " +
                    "tolerance would be repo-invented, so the verdict is withheld.",
            },
        },
        turkish: {
            M: {
                min: 129.2,
                max: 147.8,
                point: 138.5,
                unit: "deg",
                kind: "population-observed",
                source: `${YILMAZ_2023}: M 138.5 ± 9.3, band shown is mean ± 1 SD`,
                graded: false,
                note:
                    "Observed distribution, not a target. Runs ~8° above the " +
                    "Caucasian aesthetic ideal, which is the point: outside this " +
                    "band means atypical, not abnormal.",
            },
            F: {
                min: 133.5,
                max: 149.7,
                point: 141.6,
                unit: "deg",
                kind: "population-observed",
                source: `${YILMAZ_2023}: F 141.6 ± 8.1, band shown is mean ± 1 SD`,
                graded: false,
                note: "Observed distribution, not a target.",
            },
        },
        eastAsian: {
            point: 139,
            unit: "deg",
            kind: "aesthetic-ideal",
            source: `${LIANG_2022}: cites ~139° preferred vs ~135° Caucasian from earlier work`,
            graded: false,
            needsVerification: true,
            note:
                "Secondary figure quoted from earlier work, point value with no " +
                "published dispersion. Verdict withheld.",
        },
    },

    nasolabialAngleDeg: {
        caucasian: {
            M: {
                min: 90,
                max: 95,
                unit: "deg",
                kind: "aesthetic-ideal",
                source: BRITO_2020,
                graded: true,
                note:
                    "Band assumes the columella↔upper-lip construction. " +
                    "computeMeasurements() in measurements.ts uses the nose TIP as " +
                    "the columellar proxy, which reads several degrees off. Check " +
                    "the construction before trusting a borderline verdict.",
            },
            F: {
                min: 95,
                max: 110,
                unit: "deg",
                kind: "aesthetic-ideal",
                source: BRITO_2020,
                graded: true,
                note:
                    "Band assumes the columella↔upper-lip construction; see the " +
                    "male entry.",
            },
        },
        turkish: {
            M: {
                min: 90.0,
                max: 109.0,
                point: 99.5,
                unit: "deg",
                kind: "population-observed",
                source: `${YILMAZ_2023}: M 99.5 ± 9.5, band shown is mean ± 1 SD`,
                graded: false,
                note: "Observed distribution, not a target.",
            },
            F: {
                min: 91.1,
                max: 109.9,
                point: 100.5,
                unit: "deg",
                kind: "population-observed",
                source: `${YILMAZ_2023}: F 100.5 ± 9.4, band shown is mean ± 1 SD`,
                graded: false,
                note: "Observed distribution, not a target.",
            },
        },
        eastAsian: {
            point: 106,
            unit: "deg",
            kind: "aesthetic-ideal",
            source: `${SUN_2022}: preferred nasolabial angle 106°`,
            graded: false,
            note:
                "Most-preferred value on edited photos, named by the source as the " +
                "nasolabial angle. Point value with no dispersion, so no verdict.",
        },
    },

    mentocervicalAngleDeg: {
        caucasian: {
            min: 80,
            max: 95,
            unit: "deg",
            kind: "aesthetic-ideal",
            source: POWELL_HUMPHREYS,
            graded: false,
            needsVerification: true,
            note:
                "Withheld for two independent reasons. (1) The band was not " +
                "re-verified against the primary source during the 2026-08-13 " +
                "Rhinobase gap-fill. (2) The cervical point C is NOT a MediaPipe " +
                "468-mesh vertex, the mesh stops at the jawline, so it must be " +
                "hand-placed, and the repeatability of that placement is " +
                "unestablished. Both need Dr. Patil's sign-off.",
        },
    },

    goodeRatio: {
        caucasian: {
            min: 0.55,
            max: 0.6,
            unit: "ratio",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: Byrd's construction instead gives 0.67`,
            graded: true,
            note:
                "Lateral view only. On a frontal photo the construction " +
                "degenerates and measurements.ts withholds the verdict below 0.05 " +
                "(f53efe970).",
        },
        eastAsian: {
            point: 0.63,
            unit: "ratio",
            kind: "aesthetic-ideal",
            source: `${SUN_2022}: preferred tip projection : dorsum length 0.63`,
            graded: false,
            needsVerification: true,
            note:
                "Sits ABOVE the Caucasian 0.55–0.60 band. Grading an East Asian " +
                "patient against that band would flag a preferred result as " +
                "over-projected, exactly the substitution this table blocks. " +
                "Point value, no dispersion published, so no verdict here either. " +
                "The source's projection : dorsum-length construction is not yet " +
                "confirmed to match Goode's.",
        },
    },

    columellarShowMm: {
        caucasian: {
            min: 2,
            max: 3,
            unit: "mm",
            kind: "aesthetic-ideal",
            source: BRITO_2020,
            graded: true,
            note:
                "MILLIMETRES: only meaningful against an explicit sagittal " +
                "calibration. An uncalibrated caller must not grade this.",
        },
    },

    alarBaseWidthMm: {
        caucasian: {
            min: 31,
            max: 33,
            unit: "mm",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: alar base ≈ intercanthal distance (31–33 mm), or 70% of nasal height, or one fifth of face width`,
            graded: true,
            note:
                "Caucasian-derived. The Indian mean nasal width (36.59 mm, see " +
                "the `indian` entry under nasalWidthMm) sits ABOVE this band, so a " +
                "typical Indian nose grades 'wide' against it. Do not apply " +
                "cross-population. That is what the population argument is for.",
        },
        indian: {
            point: 36.59,
            unit: "mm",
            kind: "population-observed",
            source: `${BHANDARI_2021}: mean nasal width 36.59 mm`,
            graded: false,
            needsVerification: true,
            note:
                "Reached us via a review snippet, NOT the primary source, and no " +
                "dispersion was captured. Verify before showing to a surgeon.",
        },
    },

    alarBaseToIntercanthalRatio: {
        caucasian: {
            point: 1.0,
            unit: "ratio",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: alar base width approximately equals intercanthal distance`,
            graded: false,
            note:
                "An equality statement, not a band: same treatment as the b2 " +
                "columellar parallelism rule (x = y). A tolerance would be " +
                "repo-chosen, so the verdict is withheld. Feed this the existing " +
                "`alarICRatio` from computeAlarMeasurements(); do not recompute it.",
        },
    },

    dorsumWidthToInterphiltralRatio: {
        caucasian: {
            point: 1.0,
            unit: "ratio",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: dorsal aesthetic line width should match the interphiltral distance / tip-defining-point width`,
            graded: false,
            note:
                "THE TARGET FOR THE FUTURE DAL CONTROL. Withheld for now on the " +
                "landmark side, not the source side: measured on the canonical " +
                "MediaPipe mesh with DORSUM_WIDTH_LANDMARKS (122/351) and " +
                "INTERPHILTRAL_LANDMARKS (37/267), a textbook-normal face reads " +
                "0.79, not 1.00. Either the landmark choice or the ideal needs " +
                "review before this can grade anything. Brito states the rule " +
                "against the TIP-DEFINING-POINT width, and MediaPipe has no domal " +
                "vertex at all, so the interphiltral proxy is our substitution.",
        },
    },

    columellaLobuleRatio: {
        caucasian: {
            point: 2.0,
            unit: "ratio",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: nostril-to-tip ratio approximately 2:1`,
            graded: false,
            note:
                "Citation anchor for the pre-existing 1.5–2.5 band in " +
                "manual-nose-metrics.ts (computeManualBasalMetrics), which is " +
                "repo-chosen. Two unresolved points: Brito states the 2:1 rule on " +
                "the LATERAL view while our implementation measures it on the " +
                "BASAL view, and mapping 'nostril' onto the Sn→C' segment is our " +
                "interpretation. Verdict withheld until both are confirmed.",
        },
    },

    domalDivergenceDeg: {
        caucasian: {
            min: 0,
            max: 60,
            unit: "deg",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: domal divergence ≤ 60°`,
            graded: true,
            note:
                "No MediaPipe landmark resolves the domes. Requires hand-placed " +
                "points; there is no automatic path to this number today.",
        },
    },

    domalArcWidthMm: {
        caucasian: {
            min: 0,
            max: 4,
            unit: "mm",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: domal arc width ≤ 4 mm`,
            graded: true,
            note: "Hand-placed points + explicit mm calibration required.",
        },
    },

    tipDefiningPointDistanceMm: {
        caucasian: {
            min: 5,
            max: 6,
            unit: "mm",
            kind: "aesthetic-ideal",
            source: `${BRITO_2020}: tip-defining-point distance 5–6 mm`,
            graded: true,
            note:
                "Hand-placed points + explicit mm calibration required. On the " +
                "canonical mesh the nearest candidate pair (45/275) spans roughly " +
                "twice this, confirming those vertices are NOT the domal points.",
        },
    },

    nasalHeightMm: {
        indian: {
            point: 50.48,
            unit: "mm",
            kind: "population-observed",
            source: `${BHANDARI_2021}: mean nasal height 50.48 mm`,
            graded: false,
            needsVerification: true,
            note:
                "Reached us via a review snippet, NOT the primary source, and no " +
                "dispersion was captured. Verify before showing to a surgeon.",
        },
    },

    nasalWidthMm: {
        indian: {
            point: 36.59,
            unit: "mm",
            kind: "population-observed",
            source: `${BHANDARI_2021}: mean nasal width 36.59 mm`,
            graded: false,
            needsVerification: true,
            note:
                "Reached us via a review snippet, NOT the primary source, and no " +
                "dispersion was captured. Verify before showing to a surgeon.",
        },
    },

    nasalIndex: {
        indian: {
            point: 72.5,
            unit: "ratio",
            kind: "population-observed",
            source: `${BHANDARI_2021}: mean nasal index ~72.5 (mesorrhine band)`,
            graded: false,
            needsVerification: true,
            note:
                "Reached us via a review snippet, NOT the primary source. A " +
                "population MEAN, and never an expectation about an individual " +
                "patient. See classifyNasalIndex() on why the index does not " +
                "license an ethnicity inference in either direction.",
        },
    },

    // No published band in our reference set. resolveNormBand() returns null,
    // the report renders the number bare. That is the correct outcome, not a
    // gap to be filled with a guess.
    columellaLengthMm: {},
    dorsumWidthMm: {},
    bonyBaseWidthMm: {},
};

export interface NormBandEntryRecord {
    metric: RhinobaseMetricKey;
    population: PopulationRef;
    /** null for a sex-neutral band. */
    sex: PatientSex | null;
    band: NormBand;
}

/**
 * Flatten the whole norm table — for the pre-op report's "sources" appendix and
 * for the invariant tests (every band cites a source; nothing observed or
 * unverified is ever graded).
 */
export function allNormBandEntries(): NormBandEntryRecord[] {
    const out: NormBandEntryRecord[] = [];
    for (const metric of Object.keys(NORM_BANDS) as RhinobaseMetricKey[]) {
        const table = NORM_BANDS[metric];
        for (const population of Object.keys(table) as PopulationRef[]) {
            const entry = table[population];
            if (!entry) continue;
            if (isSexedBand(entry)) {
                out.push({ metric, population, sex: "M", band: entry.M });
                out.push({ metric, population, sex: "F", band: entry.F });
            } else {
                out.push({ metric, population, sex: null, band: entry });
            }
        }
    }
    return out;
}

/**
 * Map the repo's existing ethnicity vocabulary (ethnic-morphology.ts) onto a
 * population reference.
 *
 * `"other"`, an unknown id and `null` ALL map to `"unspecified"` — never to
 * `"caucasian"`. That single line is the difference between "we do not know"
 * and "we assumed Caucasian".
 */
export function populationRefFromEthnicityId(
    ethnicityId: string | null | undefined,
): PopulationRef {
    switch (ethnicityId) {
        case "indian":
            return "indian";
        case "korean":
        case "japanese":
        case "chinese":
            return "eastAsian";
        case "caucasian":
            return "caucasian";
        case "turkish":
            return "turkish";
        default:
            return "unspecified";
    }
}

export interface ResolvedNorm {
    band: NormBand;
    /** The population the returned band was actually published for. */
    bandPopulation: PopulationRef;
    /** The population the caller asked about. */
    requestedPopulation: PopulationRef;
    /**
     * True when no band exists for the requested population and a band from a
     * different one is being shown for reference. `band.graded` is forced false
     * whenever this is true — a substituted band may be displayed, never graded.
     */
    substituted: boolean;
    /** The sex the returned band was published for; null when sex-neutral or unioned. */
    bandSex: PatientSex | null;
}

/** Force a verdict off and append the reason, preserving any existing note. */
function withhold(band: NormBand, reason: string): NormBand {
    return {
        ...band,
        graded: false,
        note: band.note ? `${band.note} ${reason}` : reason,
    };
}

/** Widest band covering both sexes, used when the patient's sex is unknown. */
function unionSexedBand(entry: SexedNormBand): NormBand {
    const { M, F } = entry;
    const mins = [M.min, F.min].filter((v): v is number => v !== undefined);
    const maxes = [M.max, F.max].filter((v): v is number => v !== undefined);
    return {
        min: mins.length === 2 ? Math.min(...mins) : undefined,
        max: maxes.length === 2 ? Math.max(...maxes) : undefined,
        // Two different point values cannot be unioned into one.
        point: undefined,
        unit: M.unit,
        kind: M.kind,
        source: `${M.source} (male) / ${F.source} (female)`,
        graded: false,
        note:
            "Patient sex not specified. Shown is the union of the male and " +
            "female bands; the verdict is withheld because the union is wider " +
            "than either published band and would pass values that fail both.",
        needsVerification: M.needsVerification || F.needsVerification,
    };
}

/**
 * Resolve the norm band for a metric given the patient's sex and population.
 *
 * Returns null when no band exists anywhere in the table for the metric — the
 * honest answer for mentocervical-style measurements we can compute but cannot
 * yet grade.
 *
 * Substitution rules, in order:
 *   1. A band published for the requested population → returned as authored.
 *   2. No such band, but a Caucasian one exists → returned with
 *      `substituted: true` and the verdict stripped, plus a note naming the
 *      substitution. The number is still worth showing; the grade is not.
 *   3. Nothing → null.
 *
 * `population: "unspecified"` always takes path 2, by design: an unstated
 * population is not a Caucasian population.
 */
export function resolveNormBand(
    metric: RhinobaseMetricKey,
    lookup: { sex?: PatientSex | null; population?: PopulationRef | null } = {},
): ResolvedNorm | null {
    const requestedPopulation: PopulationRef = lookup.population ?? "unspecified";
    const table = NORM_BANDS[metric];

    let entry = table[requestedPopulation];
    let bandPopulation = requestedPopulation;
    let substituted = false;

    if (!entry) {
        const fallback = table.caucasian;
        if (!fallback) return null;
        entry = fallback;
        bandPopulation = "caucasian";
        substituted = true;
    }

    let band: NormBand;
    let bandSex: PatientSex | null = null;
    if (isSexedBand(entry)) {
        const sex = lookup.sex ?? null;
        if (sex === null) {
            band = unionSexedBand(entry);
        } else {
            band = entry[sex];
            bandSex = sex;
        }
    } else {
        band = entry;
    }

    if (substituted) {
        band = withhold(
            band,
            `No ${requestedPopulation === "unspecified" ? "population-specific" : requestedPopulation} band for this measurement in our reference set; ` +
                "the band shown is Caucasian-derived and is FOR REFERENCE ONLY. " +
                "Verdict withheld rather than assume the patient's norms are Caucasian.",
        );
    }

    return { band, bandPopulation, requestedPopulation, substituted, bandSex };
}

export type BandVerdict = "below" | "in" | "above";

/**
 * Grade a value against a band — or refuse to.
 *
 * Returns null (NO VERDICT) when the value is non-finite, when the band is
 * marked `graded: false`, or when the band has no min/max. Callers must render
 * null as an absent verdict, not as a neutral or passing one.
 */
export function classifyAgainstBand(
    value: number,
    band: NormBand,
): BandVerdict | null {
    if (!Number.isFinite(value)) return null;
    if (!band.graded) return null;
    if (band.min === undefined || band.max === undefined) return null;
    if (value < band.min) return "below";
    if (value > band.max) return "above";
    return "in";
}

export interface GradedMetric {
    value: number;
    /** null when the metric has no band at all in the table. */
    norm: ResolvedNorm | null;
    /** null whenever the verdict is withheld — see classifyAgainstBand. */
    verdict: BandVerdict | null;
}

/**
 * One-call convenience for a report row: resolve the band for this patient,
 * then grade (or withhold). Always renders `value`; `verdict` is the only part
 * that can be absent.
 */
export function gradeMetric(
    metric: RhinobaseMetricKey,
    value: number,
    lookup: { sex?: PatientSex | null; population?: PopulationRef | null } = {},
): GradedMetric {
    const norm = resolveNormBand(metric, lookup);
    return {
        value,
        norm,
        verdict: norm ? classifyAgainstBand(value, norm.band) : null,
    };
}

// ---------------------------------------------------------------------------
// Mentocervical angle (lateral) — Rhinobase parameter, previously missing
// ---------------------------------------------------------------------------

/**
 * Mentocervical angle: the angle between the facial plane (glabella→pogonion)
 * and the submental/cervical line (menton→cervical point).
 *
 * Constructed from two DIRECTED vectors so the result can legitimately exceed
 * 90° (the published ideal band straddles it):
 *   · G→Pg  runs caudally down the facial plane
 *   · Me→C  runs posteriorly along the submental line to the neck-chin junction
 * The angle between two vectors is invariant under mirroring BOTH of them, so
 * unlike every Fig. 4.7 construction this needs no `facing` argument.
 *
 * THE CERVICAL POINT IS NOT A LANDMARK WE HAVE. The MediaPipe 468 mesh ends at
 * the jaw contour and contains no neck vertex, so C must be hand-placed (the
 * free two-point measure tool is the intended source). Callers must not
 * fabricate it from the jawline.
 *
 * Returns NaN when either segment collapses.
 */
export function mentocervicalAngleDeg(
    glabella: Pt,
    pogonion: Pt,
    menton: Pt,
    cervicalPoint: Pt,
): number {
    const facial: Pt = [pogonion[0] - glabella[0], pogonion[1] - glabella[1]];
    const cervical: Pt = [
        cervicalPoint[0] - menton[0],
        cervicalPoint[1] - menton[1],
    ];
    return angleDegrees(facial, [0, 0], cervical);
}

// ---------------------------------------------------------------------------
// Columella length (lateral) — Rhinobase "columella length (Sn–C)"
// ---------------------------------------------------------------------------

/**
 * Optional px→mm calibration. Deliberately has NO default: on a lateral photo
 * the reference length must be a SAGITTAL one (e.g. nasion→tip, for which
 * {@link ADULT_NASAL_LENGTH_MM} is the population mean). A coronal reference
 * such as the inter-canthal span is foreshortened by ~cos(yaw) and inflates
 * every mm value.
 */
export interface SagittalCalibration {
    /** Pixel length of the sagittal reference measured in THIS image. */
    refPx: number;
    /** Real-world millimetre length that `refPx` represents. */
    refMm: number;
}

export interface ColumellaLength {
    px: number;
    /** null unless a valid calibration was supplied — never a fabricated mm. */
    mm: number | null;
}

/**
 * Columella length: subnasale → columellar breakpoint (C'), the Sn–C distance
 * Rhinobase reports off its ruler-calibrated lateral view.
 *
 * C' IS A PROXY. MediaPipe has no columellar-break vertex; the overlay
 * substitutes landmark 19 (RhinoplastyAnalysisOverlay `columellarBreakpoint`),
 * which is why this measurement inherits that overlay's estimated-landmark
 * badge and why the table above carries no band for it.
 *
 * Returns `px: NaN` only if given non-finite input; a zero-length segment is a
 * legitimate 0 px.
 */
export function columellaLength(
    subnasale: Pt,
    columellarBreakpoint: Pt,
    calibration?: SagittalCalibration,
): ColumellaLength {
    const px = Math.hypot(
        columellarBreakpoint[0] - subnasale[0],
        columellarBreakpoint[1] - subnasale[1],
    );
    const mm =
        calibration && calibration.refPx > 0 && calibration.refMm > 0
            ? (px / calibration.refPx) * calibration.refMm
            : null;
    return { px, mm };
}

// ---------------------------------------------------------------------------
// Dorsum width (frontal) — Rhinobase parameter, previously missing
// ---------------------------------------------------------------------------

/**
 * Dorsum-width landmark pair, verified against
 * public/models/hero/canonical_face_model.obj: 122/351 sit at y = ±2.308 in
 * mesh units, i.e. essentially at the rhinion (landmark 6, y = 2.473), and
 * span 1.126 units against an interalar (64↔294) span of 3.184 — a dorsum
 * roughly 35% of the nasal width, which is the expected proportion.
 *
 * BOTH CAVEATS THIS BLOCK USED TO CARRY WERE RESOLVED 2026-08-13:
 *  1. "NO CURRENT RHINOPLASTY PARAMETER MOVES 122/351" is no longer true.
 *     122/351 are now members of NOSE_LANDMARKS.bonyLeftSide/bonyRightSide and
 *     are driven by `bonyBaseWidth`, `dorsalProfile` and `deviationCorrection`.
 *     This measurement therefore responds to the simulation instead of reading
 *     as a static pre-op number.
 *  2. The `bridgeLeftSidewall` / `bonyLeftSide` mislabel this block flagged
 *     (218/237 sitting at y ~= -0.95, level with the tip-defining point rather
 *     than the rhinion) was corrected in the same change, and the very pairs
 *     nominated here as candidates — 245/465 and 188/412 — are the ones that
 *     were wired. See {@link BONY_BASE_WIDTH_LANDMARKS}.
 */
export const DORSUM_WIDTH_LANDMARKS = { left: 122, right: 351 } as const;

/**
 * Interphiltral landmark pair (philtral columns at the vermilion border /
 * cupid's-bow peaks), the reference Brito's dorsal-aesthetic-line rule is
 * stated against when tip-defining points are unavailable — and they always
 * are, since MediaPipe resolves no domal vertex.
 */
export const INTERPHILTRAL_LANDMARKS = { left: 37, right: 267 } as const;

/**
 * Straight-line width between the two dorsal edge points. Frontal view only —
 * this is a coronal span and foreshortens by ~cos(yaw) off-axis, the same
 * hazard documented for the inter-canthal reference elsewhere in this file.
 */
export function dorsumWidthPx(leftDorsalEdge: Pt, rightDorsalEdge: Pt): number {
    return Math.hypot(
        rightDorsalEdge[0] - leftDorsalEdge[0],
        rightDorsalEdge[1] - leftDorsalEdge[1],
    );
}

/**
 * Dorsum width as a fraction of the interphiltral distance. Brito's rule puts
 * the ideal at 1.0; the verdict is withheld — see the
 * `dorsumWidthToInterphiltralRatio` note in the norm table for why the
 * canonical mesh reads 0.79 against that ideal.
 *
 * Both spans are coronal and share the same photo, so the ratio is
 * calibration-free. NaN when the interphiltral span collapses.
 */
export function dorsumWidthToInterphiltralRatio(
    dorsumPx: number,
    interphiltralPx: number,
): number {
    if (!(interphiltralPx > 0)) return NaN;
    return dorsumPx / interphiltralPx;
}

// ---------------------------------------------------------------------------
// Bony base width (frontal) — Rhinobase parameter + the f5f5a583e slider
// ---------------------------------------------------------------------------

/**
 * The landmark groups the `bonyBaseWidth` SLIDER actually drives (f5f5a583e).
 * Imported, not copied, so the measurement and the control cannot drift apart.
 *
 * ANATOMY WARNING RESOLVED 2026-08-13. This block used to warn that the four
 * vertices `bonyLeftSide`/`bonyRightSide` named sat at y ~= -0.95, down at the
 * tip-defining-point / alar-groove level rather than at the bony pyramid, and
 * nominated 245/465 (y = 2.383, rhinion level) and 188/412 (y = 1.908) as the
 * candidate true pairs. That correction has now landed: the groups are
 * [122, 245] / [351, 465], i.e. 8.3-9.0 mm below the nasion against a rhinion
 * at 7.5 mm.
 *
 * The measurement is still defined as "the width of the region the
 * bonyBaseWidth control moves" — imported by reference, not copied, so the two
 * cannot drift — but that definition is now also the anatomically correct one.
 * The canonical mesh reads a 19.2 mm span across 245/465, which is a plausible
 * adult bony base and means this measurement is anchorable for the first time.
 * The norm table still carries no band for it; populating one is a separate
 * change and needs Dr. Patil's sign-off on which height he measures at.
 */
export const BONY_BASE_WIDTH_LANDMARKS = {
    left: NOSE_LANDMARKS.bonyLeftSide,
    right: NOSE_LANDMARKS.bonyRightSide,
} as const;

/** Arithmetic mean of a point set; NaN components for an empty set. */
function centroid(points: readonly Pt[]): Pt {
    if (points.length === 0) return [NaN, NaN];
    let sx = 0;
    let sy = 0;
    for (const [x, y] of points) {
        sx += x;
        sy += y;
    }
    return [sx / points.length, sy / points.length];
}

/**
 * Bony base width: centroid-to-centroid distance between the left and right
 * bony-vault landmark groups.
 *
 * Centroids rather than the most-lateral vertex in each group, so the readout
 * is LINEAR in the control: a symmetric narrowing of d px per side reduces this
 * by exactly 2d px, whichever vertex happens to be widest. A max-extent
 * definition would step discontinuously as the widest vertex changed identity
 * mid-drag.
 *
 * Frontal view only (coronal span). Returns NaN if either group is empty.
 */
export function bonyBaseWidthPx(
    leftGroupPoints: readonly Pt[],
    rightGroupPoints: readonly Pt[],
): number {
    const l = centroid(leftGroupPoints);
    const r = centroid(rightGroupPoints);
    return Math.hypot(r[0] - l[0], r[1] - l[1]);
}

// ---------------------------------------------------------------------------
// Nasal index classification (frontal) — bins only, no new computation
// ---------------------------------------------------------------------------

/**
 * Nasal-index bin edges, on the ×100 convention
 * (index = nasal width / nasal height × 100).
 *
 * DO NOT COMPUTE THE INDEX HERE. Two implementations already exist and they
 * disagree — lib/ai-assessment/shared.ts:379 uses ×100 off the Euclidean
 * nasion(168)→subnasale(2) height, while
 * lib/simulation/ai-suggestions/ethnicity-detector.ts:128 uses a bare ratio off
 * landmarks 129/358 and a |Δy| height. Feed this the ×100 form.
 */
export const NASAL_INDEX_BINS = {
    /** ≤ 69.9 */
    leptorrhineMax: 69.9,
    /** ≥ 70.0 */
    mesorrhineMin: 70.0,
    /** ≥ 85.0 (classical Martin/Ranke edge) */
    platyrrhineMin: 85.0,
    /** ≥ 100.0 */
    hyperplatyrrhineMin: 100.0,
} as const;

/**
 * The 85.0–89.4 window where our two sources contradict each other: the
 * classical classification puts platyrrhine at ≥ 85.0, while the review snippet
 * behind the Indian figures gives mesorrhine as 70–89.4. Unresolved, so values
 * landing here are reported as DISPUTED rather than binned either way.
 */
export const NASAL_INDEX_DISPUTED_RANGE = { min: 85.0, max: 89.4 } as const;

export type NasalIndexBin =
    | "leptorrhine"
    | "mesorrhine"
    | "platyrrhine"
    | "hyperplatyrrhine";

export interface NasalIndexClassification {
    /** null when non-finite, implausible for the view, or in the disputed window. */
    bin: NasalIndexBin | null;
    /** True when the value falls in {@link NASAL_INDEX_DISPUTED_RANGE}. */
    disputed: boolean;
    /**
     * False when the index is outside 40–130 — on an oblique or lateral photo
     * the coronal width foreshortens and the index collapses, exactly as
     * front-view Goode does. Same degeneracy guard, same reason.
     */
    plausible: boolean;
}

/**
 * Classify a nasal index into its anthropometric bin.
 *
 * THIS IS A DESCRIPTION OF THE NOSE, NOT AN INFERENCE ABOUT THE PATIENT. The
 * index→ethnicity mapping is a crude and contested 19th-century construct that
 * the sources themselves flag; a bin says nothing about ancestry, and ancestry
 * predicts nothing about an individual's bin. Nothing here returns an ethnicity
 * and nothing here should be wired to one. (Note that
 * lib/simulation/ai-suggestions/ethnicity-detector.ts:648-651 does draw exactly
 * that inference today — out of scope for this change, flagged for review.)
 *
 * No pass/fail is produced either: a bin is not a verdict, and no bin is a
 * surgical target.
 */
export function classifyNasalIndex(index: number): NasalIndexClassification {
    if (!Number.isFinite(index)) {
        return { bin: null, disputed: false, plausible: false };
    }
    const plausible = index >= 40 && index <= 130;
    if (!plausible) return { bin: null, disputed: false, plausible: false };

    const disputed =
        index >= NASAL_INDEX_DISPUTED_RANGE.min &&
        index <= NASAL_INDEX_DISPUTED_RANGE.max;
    if (disputed) return { bin: null, disputed: true, plausible: true };

    let bin: NasalIndexBin;
    if (index <= NASAL_INDEX_BINS.leptorrhineMax) bin = "leptorrhine";
    else if (index < NASAL_INDEX_BINS.platyrrhineMin) bin = "mesorrhine";
    else if (index < NASAL_INDEX_BINS.hyperplatyrrhineMin) bin = "platyrrhine";
    else bin = "hyperplatyrrhine";

    return { bin, disputed: false, plausible: true };
}

// ===========================================================================
// JJ 2026 gap fill (2026-08-30) — the four lateral findings Dr. Jerin
// Thomas's checklist names and this file did not measure.
//
// Checklist items L7 (supratip break), L8 (hump or pseudohump), L12 (double
// break) and F9 (anterior septal angle). Each is derivable from landmarks
// the photometry registry already places — RHINION, SUPRATIP, TIP, NASION,
// SUBNASALE, COLUMELLA_BREAKPOINT — so none of this needs new inference or
// new point placement.
//
// ── NO BANDS, DELIBERATELY ───────────────────────────────────────────────
//
// None of these four carries a norm band, and none returns a verdict. That
// is a decision, not an omission: we have no published range for any of
// them, and the alternative — inventing a threshold and colour-coding
// against it — is the failure mode the NORM_BANDS block above already
// refuses (`graded: false` wherever a source states a point rather than a
// range). A number a surgeon can read beats a verdict we made up.
//
// They are also deliberately NOT added to `RhinobaseMetricKey`. That union
// keys the RhinoBase photometry table and every member of it is expected to
// have a NORM_BANDS entry; adding bandless members would either force empty
// band records or imply these rows came from that source. They did not.
// ===========================================================================

/**
 * Signed perpendicular offset of `point` from the infinite line a→b, in
 * pixels, canonicalised so POSITIVE means ANTERIOR (out of the face).
 *
 * The raw cross product is orientation-dependent in exactly the way
 * {@link DorsalDeviation.signedPx} documents — it flips between mirror-image
 * left- and right-facing profiles. `dorsalLineDeviations` leaves that
 * normalisation to its caller and every caller has had to remember; this
 * helper does it once so the four metrics below cannot get it wrong
 * individually. Returns NaN for a degenerate (zero-length) line.
 */
function anteriorOffsetPx(
    a: Pt,
    b: Pt,
    point: Pt,
    facing: ProfileFacing,
): number {
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    if (len === 0) return NaN;
    const cross = (dx * (a[1] - point[1]) - (a[0] - point[0]) * dy) / len;
    // Image y grows downward, so a positive cross product points cranially
    // on a right-facing profile. anteriorSign folds the mirror away.
    return cross * anteriorSign(facing);
}

/**
 * Supratip break — checklist item L7.
 *
 * The break is the shallow concavity between the cartilaginous dorsum and
 * the tip: on a normal profile the supratip sits slightly POSTERIOR to the
 * straight line rhinion→tip, and the tip stands proud of it. So depth is
 * measured as the posterior offset of the supratip from that chord, and a
 * NEGATIVE depth means the supratip is anterior to it — a supratip fullness
 * or polly-beak, which is the clinically opposite finding and must not be
 * reported as a small break.
 *
 * `depthRatio` is the quantity to prefer. It divides by the rhinion→tip
 * chord, so it is dimensionless and needs no px→mm calibration — which
 * matters here more than usual, because this file's header warns that
 * reusing a CORONAL calibration on a profile inflates every millimetre
 * figure 2–20×. `depthPx` is provided for overlay drawing only.
 */
export interface SupratipBreak {
    /** Posterior offset of supratip from the rhinion→tip chord, in pixels. */
    depthPx: number;
    /** depthPx as a fraction of the rhinion→tip chord length. Calibration-free. */
    depthRatio: number;
    /**
     * True when the supratip lies ANTERIOR to the chord — supratip fullness
     * rather than a break. Both `depth` values are negative in this case.
     */
    supratipFullness: boolean;
}

export function supratipBreak(
    rhinion: Pt,
    supratip: Pt,
    tip: Pt,
    facing: ProfileFacing,
): SupratipBreak {
    const chord = Math.hypot(tip[0] - rhinion[0], tip[1] - rhinion[1]);
    const anterior = anteriorOffsetPx(rhinion, tip, supratip, facing);
    // Depth is the POSTERIOR offset, so flip the anterior-positive sign.
    const depthPx = -anterior;
    const depthRatio = chord > 0 ? depthPx / chord : NaN;
    return {
        depthPx,
        depthRatio,
        supratipFullness: Number.isFinite(depthPx) && depthPx < 0,
    };
}

/**
 * The two independent measurements that separate a hump from a pseudohump —
 * checklist item L8.
 *
 * A true hump is a real dorsal convexity. A pseudohump is a dorsum that only
 * LOOKS humped, because a low radix (or an under-projected tip) drops the
 * ends of the profile and leaves the rhinion standing proud of the line
 * between them. The operations differ: you rasp a hump, you graft the radix
 * under a pseudohump. Removing the dorsum of a pseudohump makes the nose
 * worse, which is why the distinction is on the checklist and why having no
 * field for it at all was the sharpest lateral gap in the audit.
 *
 * ── WHY `type` IS ALWAYS NULL TODAY ──────────────────────────────────────
 *
 * Both discriminating inputs are computed here and both are trustworthy.
 * What we do not have is the threshold that separates them — no source we
 * hold states how convex is convex, or how low a radix has to be. Returning
 * a classification would mean choosing those two numbers ourselves and
 * printing the result as clinical fact.
 *
 * So the classification is withheld and the components are surfaced, exactly
 * as `nasofrontalAngleDeg`'s band withholds its verdict for the same reason.
 * When Dr. Thomas supplies the thresholds this becomes a two-line change and
 * the callers do not move. Do NOT fill `type` in from intuition.
 */
export interface DorsalHumpComponents {
    /**
     * Peak anterior deviation of the dorsum from the nasion→tip line, as a
     * fraction of that line's length. Positive = convex (bowed out of the
     * face); negative = a saddle. Calibration-free.
     */
    convexityRatio: number;
    /**
     * How far the radix sits POSTERIOR to the line glabella→rhinion, as a
     * fraction of that line's length. Larger = deeper-set radix, which is the
     * pseudohump-producing direction. Calibration-free.
     */
    radixDepthRatio: number;
    /**
     * Always null. See the block comment above — the discriminating
     * thresholds are not ours to invent.
     */
    type: null;
    /** Why `type` is null, for a UI that must explain an empty field. */
    typeWithheldReason: string;
}

const HUMP_TYPE_WITHHELD =
    "Hump and pseudohump are separated by thresholds on dorsal convexity and " +
    "radix depth that no source we hold states. Both measurements are given; " +
    "the classification is withheld rather than invented.";

export function dorsalHumpComponents(
    nasion: Pt,
    tip: Pt,
    dorsumPoints: Array<{ index: number; point: Pt }>,
    glabella: Pt,
    rhinion: Pt,
    radix: Pt,
    facing: ProfileFacing,
): DorsalHumpComponents {
    const dorsalChord = Math.hypot(tip[0] - nasion[0], tip[1] - nasion[1]);
    let peakAnterior = Number.NEGATIVE_INFINITY;
    for (const { point } of dorsumPoints) {
        const offset = anteriorOffsetPx(nasion, tip, point, facing);
        if (Number.isFinite(offset) && offset > peakAnterior) peakAnterior = offset;
    }
    const convexityRatio =
        dorsumPoints.length > 0 && dorsalChord > 0 && Number.isFinite(peakAnterior)
            ? peakAnterior / dorsalChord
            : NaN;

    const radixChord = Math.hypot(
        rhinion[0] - glabella[0],
        rhinion[1] - glabella[1],
    );
    const radixAnterior = anteriorOffsetPx(glabella, rhinion, radix, facing);
    const radixDepthRatio = radixChord > 0 ? -radixAnterior / radixChord : NaN;

    return {
        convexityRatio,
        radixDepthRatio,
        type: null,
        typeWithheldReason: HUMP_TYPE_WITHHELD,
    };
}

/**
 * Columellar–lobular angle at the columellar breakpoint — checklist item
 * L12, the "double break".
 *
 * Measured as the interior angle at the breakpoint between the rays toward
 * the tip and toward the subnasale. A profile with no double break runs
 * close to straight through the breakpoint and reads near 180°; a distinct
 * double break reads lower.
 *
 * Built on the acos-based {@link angleDegrees} rather than the atan2
 * construction: this is an unsigned interior angle with no vertical
 * reference and no anterior direction in it, so it is already invariant
 * under the left/right mirror and needs no `facing`. Returns NaN when the
 * breakpoint coincides with either neighbour.
 */
export function columellarLobularAngleDeg(
    tip: Pt,
    columellaBreakpoint: Pt,
    subnasale: Pt,
): number {
    return angleDegrees(tip, columellaBreakpoint, subnasale);
}

/**
 * Anterior septal angle — checklist item F9.
 *
 * The interior angle at the supratip between the dorsal septum (toward the
 * rhinion) and the caudal run out to the tip. His sheet files this under the
 * frontal view and asks for prominence AND position; this measures the angle
 * itself, which is the part landmarks can answer. Prominence is a graded
 * observation and lives in the nasal analysis form as
 * FRONTAL_ANTERIOR_SEPTAL_ANGLE.
 *
 * Unsigned interior angle, so mirror-invariant and calibration-free for the
 * same reason as {@link columellarLobularAngleDeg}.
 */
export function anteriorSeptalAngleDeg(
    rhinion: Pt,
    supratip: Pt,
    tip: Pt,
): number {
    return angleDegrees(rhinion, supratip, tip);
}
