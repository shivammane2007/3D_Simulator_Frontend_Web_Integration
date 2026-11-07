import type { Landmark } from '@/lib/simulation/types';
import type { FacialAnalysisResult, FacialMeasurement } from './types';
import { LM, IDEAL, ETHNIC_ADJUSTMENTS } from './ideal-proportions';

type Gender = 'female' | 'male';
// 'neutral' carries no entry in ETHNIC_ADJUSTMENTS → base ideals (no adjustment).
type Ethnicity = 'neutral' | 'east-asian' | 'south-asian' | 'middle-eastern' | 'african' | 'caucasian' | 'latin';

function dist(a: [number, number], b: [number, number]): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function createMeasurement(
  name: string,
  actual: number,
  ideal: number,
  relatedProcedures: string[],
  unit?: string,
): FacialMeasurement {
  const deviation = ((actual - ideal) / ideal) * 100;
  const absDeviation = Math.abs(deviation);
  const deviationDirection: FacialMeasurement['deviationDirection'] =
    absDeviation <= 5 ? 'within' : deviation > 0 ? 'above' : 'below';
  const severity: FacialMeasurement['severity'] =
    absDeviation <= 5 ? 'optimal' :
    absDeviation <= 15 ? 'mild' :
    absDeviation <= 25 ? 'moderate' : 'significant';

  return { name, actual, ideal, deviation, deviationDirection, severity, relatedProcedures, unit };
}

/**
 * A measurement the current view cannot grade. Reports the number but scores it
 * as neutral: zero deviation, `within`, `optimal`. Grading a quantity the view
 * cannot produce does not just print a wrong row — every measurement here feeds
 * `overallHarmonyScore`, so a permanently-failing one taxes every user's score.
 */
function createUngradedMeasurement(
  name: string,
  actual: number,
  relatedProcedures: string[],
  unit?: string,
): FacialMeasurement {
  return {
    name,
    actual,
    ideal: actual,
    deviation: 0,
    deviationDirection: 'within',
    severity: 'optimal',
    relatedProcedures,
    unit,
  };
}

function getMergedIdeals(gender: Gender, ethnicity: Ethnicity) {
  const adj = ETHNIC_ADJUSTMENTS[ethnicity] || {};
  const base = { ...IDEAL };
  if (adj.noseWidthToIntercanthal !== undefined) base.noseWidthToIntercanthal = adj.noseWidthToIntercanthal;
  if (adj.jawToCheekRatio !== undefined) base.jawToCheekRatio = adj.jawToCheekRatio;
  if (adj.lipRatioLowerToUpper !== undefined) base.lipRatioLowerToUpper = adj.lipRatioLowerToUpper;
  if (adj.nasolabialAngle !== undefined) base.nasolabialAngle = adj.nasolabialAngle;
  return base;
}

function toPx(lm: Landmark, w: number, h: number): [number, number] {
  return [lm.x * w, lm.y * h];
}

function computeNasolabialAngle(
  landmarks: Landmark[],
  w: number,
  h: number,
): number {
  // Approximate: angle at subnasale between nose tip and upper lip
  const noseTip = toPx(landmarks[LM.noseTip], w, h);
  const subnasale = toPx(landmarks[LM.subnasale], w, h);
  const upperLip = toPx(landmarks[LM.upperLipTop], w, h);

  const v1: [number, number] = [noseTip[0] - subnasale[0], noseTip[1] - subnasale[1]];
  const v2: [number, number] = [upperLip[0] - subnasale[0], upperLip[1] - subnasale[1]];

  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const mag1 = Math.hypot(v1[0], v1[1]);
  const mag2 = Math.hypot(v2[0], v2[1]);
  if (mag1 < 0.001 || mag2 < 0.001) return 90;

  const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return (Math.acos(cosAngle) * 180) / Math.PI;
}

/**
 * Geometric heuristic gender estimation using MediaPipe face mesh landmarks.
 * Returns 'male' or 'female' based on a weighted score of facial geometry cues.
 * This is a rough heuristic — it is always overridable by user selection.
 */
export function detectGender(
  landmarks: Landmark[],
  w: number,
  h: number,
): Gender {
  const px = (idx: number): [number, number] => toPx(landmarks[idx], w, h);

  // Key points per task spec — using LM constants for MediaPipe indices
  const jawLeft = px(LM.leftJawMid);     // 234 — left jaw midpoint
  const jawRight = px(LM.rightJawMid);   // 454 — right jaw midpoint
  const chin = px(LM.pogonion);          // 152 — pogonion / chin tip
  const browLeft = px(LM.leftBrowRidge);  // 70 — left brow ridge
  const browRight = px(LM.rightBrowRidge); // 300 — right brow ridge
  const cheekLeft = px(LM.leftCheekWidth);  // 123 — left cheek width point
  const cheekRight = px(LM.rightCheekWidth); // 352 — right cheek width point

  // Also use existing landmark constants for additional measurements
  const foreheadTop = px(LM.foreheadTop);   // 10
  const glabella = px(LM.glabella);         // 9
  const leftGonion = px(LM.leftGonion);     // 172
  const rightGonion = px(LM.rightGonion);   // 397

  // ── Feature 1: Jaw width relative to face height ───────────────────────────
  // Wider jaw relative to face height → more likely male
  const jawWidth = dist(jawLeft, jawRight);
  const faceHeight = dist(foreheadTop, chin);
  const jawToFaceHeightRatio = jawWidth / (faceHeight + 0.001);
  // Typical range: female ~0.55–0.65, male ~0.65–0.78
  const jawScore = (jawToFaceHeightRatio - 0.60) / 0.08; // positive = more male

  // ── Feature 2: Brow ridge prominence ──────────────────────────────────────
  // Measure vertical distance from brow to forehead top, normalized by face height
  // More prominent brow (lower relative to forehead) → more likely male
  const browMidY = (browLeft[1] + browRight[1]) / 2;
  const foreheadTopY = foreheadTop[1];
  const glabellaY = glabella[1];
  // Brow prominence: how much of the forehead-to-glabella span is taken by the brow-forehead gap
  const foreheadSpan = Math.abs(glabellaY - foreheadTopY) + 0.001;
  const browProminenceRatio = Math.abs(browMidY - foreheadTopY) / foreheadSpan;
  // Female: brow is higher (closer to forehead top, smaller ratio ~0.6–0.7)
  // Male:   brow is lower / more prominent (larger ratio ~0.7–0.85)
  const browScore = (browProminenceRatio - 0.70) / 0.08; // positive = more male

  // ── Feature 3: Jaw angularity (gonion vs chin width) ──────────────────────
  // Square/wide jaw → male; narrow/pointed chin → female
  const gonionWidth = dist(leftGonion, rightGonion);
  // Width of face at gonion level vs nose-tip level approximation using jaw points
  const gonionToFaceRatio = gonionWidth / (jawWidth + 0.001);
  // Higher ratio means jaw stays wide at gonion → more square → male
  const jawAngularityScore = (gonionToFaceRatio - 0.88) / 0.06; // positive = more male

  // ── Feature 4: Face width-to-height ratio ─────────────────────────────────
  // Wider face relative to height → more likely male
  const cheekWidth = dist(cheekLeft, cheekRight);
  const faceWidthToHeight = cheekWidth / (faceHeight + 0.001);
  // Typical: female ~0.58–0.68, male ~0.65–0.78
  const widthHeightScore = (faceWidthToHeight - 0.64) / 0.07; // positive = more male

  // ── Feature 5: Chin shape (pointed vs square) ─────────────────────────────
  // Compare jaw width (at jaw-angle level) to gonion width
  // More taper (jaw wider than gonion) → pointed chin → female
  // Less taper → square chin → male
  const jawToGonionRatio = jawWidth / (gonionWidth + 0.001);
  const chinScore = (jawToGonionRatio - 1.04) / 0.06; // positive = more male

  // ── Weighted aggregate ─────────────────────────────────────────────────────
  // Weights chosen to reflect relative reliability of each cue
  const maleScore =
    jawScore * 0.30 +
    browScore * 0.25 +
    jawAngularityScore * 0.20 +
    widthHeightScore * 0.15 +
    chinScore * 0.10;

  // Positive maleScore → male, negative → female
  // Apply a slight female bias (offset -0.05) to counter landmark geometry noise
  return maleScore > -0.05 ? 'male' : 'female';
}

function detectFaceShape(
  cheekWidth: number,
  jawWidth: number,
  faceHeight: number,
): FacialAnalysisResult['faceShape'] {
  const jawToCheek = jawWidth / cheekWidth;
  const heightToWidth = faceHeight / cheekWidth;

  if (jawToCheek > 0.95 && heightToWidth < 1.3) return 'square';
  if (heightToWidth < 1.2) return 'round';
  if (jawToCheek < 0.75 && heightToWidth > 1.4) return 'heart';
  if (heightToWidth > 1.6) return 'oblong';
  if (jawToCheek < 0.8 && heightToWidth > 1.3 && heightToWidth < 1.6) return 'diamond';
  return 'oval';
}

function computeSymmetryScore(landmarks: Landmark[], w: number, h: number): number {
  // Mirror pairs: left/right symmetric landmarks
  const pairs: [number, number][] = [
    [LM.leftEyeInner, LM.rightEyeInner],
    [LM.leftEyeOuter, LM.rightEyeOuter],
    [LM.leftAlar, LM.rightAlar],
    [LM.leftMouthCorner, LM.rightMouthCorner],
    [LM.leftGonion, LM.rightGonion],
    [LM.leftZygomatic, LM.rightZygomatic],
    [LM.leftBrowInner, LM.rightBrowInner],
  ];

  // Face center x
  const noseTip = toPx(landmarks[LM.noseTip], w, h);
  const faceWidth = dist(
    toPx(landmarks[LM.leftZygomatic], w, h),
    toPx(landmarks[LM.rightZygomatic], w, h),
  );
  const centerX = noseTip[0];

  let totalDeviation = 0;
  for (const [l, r] of pairs) {
    const lp = toPx(landmarks[l], w, h);
    const rp = toPx(landmarks[r], w, h);
    // Symmetric ideal: both at same distance from center, same y
    const lDist = Math.abs(centerX - lp[0]);
    const rDist = Math.abs(centerX - rp[0]);
    const xDev = Math.abs(lDist - rDist) / (faceWidth * 0.5 + 0.001);
    const yDev = Math.abs(lp[1] - rp[1]) / (faceWidth * 0.5 + 0.001);
    totalDeviation += (xDev + yDev) * 0.5;
  }

  const avgDeviation = totalDeviation / pairs.length;
  // Convert: 0 deviation = 100 score, 0.1 deviation ~ 50, cap at 0
  return Math.max(0, Math.min(100, 100 - avgDeviation * 400));
}

export function analyzeFace(
  landmarks: Landmark[],
  imageWidth: number,
  imageHeight: number,
  gender: Gender | null = null,
  ethnicity: Ethnicity = 'neutral',
): FacialAnalysisResult {
  // Use provided gender as an explicit override; otherwise detect from geometry
  const detectedGender: Gender = gender ?? detectGender(landmarks, imageWidth, imageHeight);
  const ideals = getMergedIdeals(detectedGender, ethnicity);

  const px = (idx: number): [number, number] => toPx(landmarks[idx], imageWidth, imageHeight);

  // Key points
  const foreheadTop = px(LM.foreheadTop);
  const glabella = px(LM.glabella);
  const nasion = px(LM.nasion);
  const noseTip = px(LM.noseTip);
  const subnasale = px(LM.subnasale);
  const upperLipTop = px(LM.upperLipTop);
  const lowerLipBottom = px(LM.lowerLipBottom);
  const pogonion = px(LM.pogonion);
  const leftEyeInner = px(LM.leftEyeInner);
  const rightEyeInner = px(LM.rightEyeInner);
  const leftEyeOuter = px(LM.leftEyeOuter);
  const rightEyeOuter = px(LM.rightEyeOuter);
  const leftAlar = px(LM.leftAlar);
  const rightAlar = px(LM.rightAlar);
  const leftGonion = px(LM.leftGonion);
  const rightGonion = px(LM.rightGonion);
  const leftZygomatic = px(LM.leftZygomatic);
  const rightZygomatic = px(LM.rightZygomatic);
  const upperLipBottom = px(LM.upperLipBottom);
  const lowerLipTop = px(LM.lowerLipTop);

  // ── Vertical thirds ───────────────────────────────────────────────────────
  const totalFaceHeight = dist(foreheadTop, pogonion);
  const upperThirdH = dist(foreheadTop, glabella);
  const middleThirdH = dist(glabella, subnasale);
  const lowerThirdH = dist(subnasale, pogonion);

  const idealThirdH = totalFaceHeight * ideals.verticalThird;

  const upperThird = createMeasurement(
    'Upper Third',
    upperThirdH,
    idealThirdH,
    ['hairline-lowering'],
    'px',
  );
  const middleThird = createMeasurement(
    'Middle Third',
    middleThirdH,
    idealThirdH,
    ['rhinoplasty'],
    'px',
  );
  const lowerThird = createMeasurement(
    'Lower Third',
    lowerThirdH,
    idealThirdH,
    ['chin-augmentation', 'lip-lift'],
    'px',
  );

  // ── Nasal width ────────────────────────────────────────────────────────────
  const nasalWidthPx = dist(leftAlar, rightAlar);
  const intercanthalDist = dist(leftEyeInner, rightEyeInner);
  const nasalWidthRatio = nasalWidthPx / (intercanthalDist + 0.001);
  const nasalWidth = createMeasurement(
    'Nasal Width',
    nasalWidthRatio,
    ideals.noseWidthToIntercanthal,
    ['rhinoplasty', 'alarplasty'],
  );

  // ── Nasolabial angle ───────────────────────────────────────────────────────
  const nasolabialAngleDeg = computeNasolabialAngle(landmarks, imageWidth, imageHeight);
  const idealNasolabial = ideals.nasolabialAngle[detectedGender];
  const nasolabialAngle = createMeasurement(
    'Nasolabial Angle',
    nasolabialAngleDeg,
    idealNasolabial,
    ['rhinoplasty'],
    '°',
  );

  // ── Nasal axis verticality (NOT Goode's ratio) ────────────────────────────
  // This was labelled "Tip Projection (Goode Ratio)" and graded against the
  // 0.55–0.60 band. It is neither.
  //
  // The formula is |tip_y − nasion_y| / dist(nasion, tip) — the vertical
  // fraction of the nasion→tip vector, i.e. cos(angle of the nasal axis from
  // vertical). On a frontal photo the nose runs very nearly vertically, so it
  // returns ~1.00 for EVERY face. Against an ideal of 0.575 that is a +74%
  // deviation, which scored `significant` for every user and — because every
  // measurement here feeds overallHarmonyScore — silently taxed everyone's
  // harmony score by roughly 8 points.
  //
  // Goode's ratio is a SAGITTAL quantity: anterior tip projection measured
  // from the alar-facial groove. A frontal photograph cannot produce it at
  // all, which is why the canonical implementation
  // (rhinoplasty-profile-metrics.goodePerpendicularRatio) is profile-gated.
  // Same call already made for front-view Goode on the flagship overlay
  // (f53efe970). What this number actually detects is head tilt / obliquity,
  // so it is reported honestly, under its real name, and ungraded.
  const nasalLength = dist(nasion, noseTip);
  const nasalAxisVerticalPx = Math.abs(noseTip[1] - nasion[1]);
  const nasalAxisVerticality = nasalAxisVerticalPx / (nasalLength + 0.001);
  const tipProjection = createUngradedMeasurement(
    'Nasal Axis Verticality',
    nasalAxisVerticality,
    ['rhinoplasty'],
  );

  // ── Lip ratio ─────────────────────────────────────────────────────────────
  const upperLipHeight = dist(upperLipTop, upperLipBottom);
  const lowerLipHeight = dist(lowerLipTop, lowerLipBottom);
  const lipRatioActual = lowerLipHeight / (upperLipHeight + 0.001);
  const lipRatio = createMeasurement(
    'Lip Ratio (Lower:Upper)',
    lipRatioActual,
    ideals.lipRatioLowerToUpper,
    ['lip-augmentation', 'dermal-fillers'],
  );

  // ── Jaw to cheek ratio ────────────────────────────────────────────────────
  const jawWidth = dist(leftGonion, rightGonion);
  const cheekWidth = dist(leftZygomatic, rightZygomatic);
  const jawToCheekActual = jawWidth / (cheekWidth + 0.001);
  const jawToCheekRatio = createMeasurement(
    'Jaw to Cheek Ratio',
    jawToCheekActual,
    ideals.jawToCheekRatio,
    ['facial-contouring'],
  );

  // ── Chin projection ───────────────────────────────────────────────────────
  // BUG-FIX PAT-P1-15: Previously measured LATERAL X offset of chin from
  // mouth center — this is chin alignment (deviation), not chin projection.
  // Correct chin projection = how far the chin extends below the lower lip
  // relative to face height (vertical position approximation of Ricketts'
  // E-plane in 2D).
  // Formula: chinProjection = (pogonion_y - lowerLip_y) / totalFaceHeight
  // lowerLipY = average of lowerLipBottom (17) and mouth corners (61, 291).
  // Normal range: 0.12–0.20 of face height.  Ideal ≈ 0.16 (midpoint).
  const lowerLipAvgY = (
    lowerLipBottom[1] +
    px(LM.leftMouthCorner)[1] +
    px(LM.rightMouthCorner)[1]
  ) / 3;
  const chinProjectionRatio = (pogonion[1] - lowerLipAvgY) / (totalFaceHeight + 0.001);
  const chinProjection = createMeasurement(
    'Chin Projection',
    chinProjectionRatio,
    0.16,
    ['chin-augmentation'],
  );

  // ── Eye spacing ───────────────────────────────────────────────────────────
  const leftEyeWidth = dist(leftEyeInner, leftEyeOuter);
  const rightEyeWidth = dist(rightEyeInner, rightEyeOuter);
  const avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2;
  const eyeSpacingRatio = intercanthalDist / (avgEyeWidth + 0.001);
  const eyeSpacing = createMeasurement(
    'Eye Spacing',
    eyeSpacingRatio,
    ideals.intercanthalToEyeWidth,
    ['blepharoplasty'],
  );

  // ── Cheek projection ──────────────────────────────────────────────────────
  // Cheek projection approximated by cheek width vs face height ratio
  const cheekProjectionRatio = cheekWidth / (totalFaceHeight + 0.001);
  // Ideal: cheek width about 65-70% of face height
  const cheekProjection = createMeasurement(
    'Cheek Projection',
    cheekProjectionRatio,
    0.67,
    ['injectables', 'dermal-fillers'],
  );

  // ── Overall harmony score ─────────────────────────────────────────────────
  const measurements: FacialMeasurement[] = [
    upperThird, middleThird, lowerThird, nasalWidth,
    nasolabialAngle, tipProjection, lipRatio, jawToCheekRatio,
    chinProjection, eyeSpacing, cheekProjection,
  ];
  const severityWeight = { optimal: 100, mild: 70, moderate: 40, significant: 10 };
  const overallHarmonyScore = Math.round(
    measurements.reduce((sum, m) => sum + severityWeight[m.severity], 0) / measurements.length,
  );

  // ── Key Proportions Score ──────────────────────────────────────────────────
  // Average severity across 5 key measurements (NOT the golden ratio φ=1.618)
  const proportionMeasurements = [upperThird, middleThird, lowerThird, nasalWidth, eyeSpacing];
  const proportionsScore = Math.round(
    proportionMeasurements.reduce((sum, m) => sum + severityWeight[m.severity], 0) / proportionMeasurements.length,
  );

  // ── Face shape ────────────────────────────────────────────────────────────
  const faceShape = detectFaceShape(cheekWidth, jawWidth, totalFaceHeight);

  // ── Symmetry ──────────────────────────────────────────────────────────────
  const symmetryScore = Math.round(computeSymmetryScore(landmarks, imageWidth, imageHeight));

  // ── Detected demographics ─────────────────────────────────────────────────
  // detectedGender was resolved at the top of this function (geometric heuristic or user override)
  const selectedEthnicity = ethnicity;

  return {
    faceShape,
    symmetryScore,
    upperThird,
    middleThird,
    lowerThird,
    nasalWidth,
    nasolabialAngle,
    tipProjection,
    lipRatio,
    jawToCheekRatio,
    chinProjection,
    eyeSpacing,
    cheekProjection,
    overallHarmonyScore,
    proportionsScore,
    detectedGender,
    selectedEthnicity,
  };
}
