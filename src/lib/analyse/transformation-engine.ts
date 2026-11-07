import type { Landmark } from '@/lib/simulation/types';
import type { FacialAnalysisResult, AnalysisTransformation } from './types';
import { LM } from './ideal-proportions';
import { computeTriangulation, warpImage, addBoundaryPoints } from '@/lib/simulation/warp-engine';

// Maximum shift per landmark as a fraction of image diagonal
const MAX_SHIFT_FRACTION = 0.04;

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Calculate landmark shifts in NORMALIZED (0-1) space based on analysis results.
 * When applying to canvas, multiply dx by imageWidth and dy by imageHeight.
 */
export function calculateTransformation(
  landmarks: Landmark[],
  analysis: FacialAnalysisResult,
  intensity: number,
): AnalysisTransformation {
  const shifts = new Map<number, { dx: number; dy: number }>();
  const changes: AnalysisTransformation['changes'] = [];

  // Helper: add a shift in normalized space, clamped to max
  function addShift(idx: number, dx: number, dy: number): void {
    const existing = shifts.get(idx) ?? { dx: 0, dy: 0 };
    shifts.set(idx, {
      dx: clamp(existing.dx + dx * intensity, -MAX_SHIFT_FRACTION, MAX_SHIFT_FRACTION),
      dy: clamp(existing.dy + dy * intensity, -MAX_SHIFT_FRACTION, MAX_SHIFT_FRACTION),
    });
  }

  // ── Nasal width correction ────────────────────────────────────────────────
  if (analysis.nasalWidth.severity !== 'optimal') {
    const { deviation } = analysis.nasalWidth;
    // If nose is too wide (deviation > 0), move alars inward; too narrow → outward
    // Scale 0.4: correction clamped to ±0.05, so max shift = 0.05 * 0.4 * intensity ≈ 14px on 1024px image
    const correction = clamp(-deviation / 100, -0.05, 0.05);
    addShift(LM.leftAlar, correction * 0.4, 0);
    addShift(LM.rightAlar, -correction * 0.4, 0);
    changes.push({
      region: 'Nose',
      description: deviation > 0 ? 'Narrowing nasal width' : 'Widening nasal width',
      procedureToAchieve: 'Rhinoplasty / Alarplasty',
      regionKey: 'changeRegionNose',
      descriptionKey: deviation > 0 ? 'changeDescNarrowNasal' : 'changeDescWidenNasal',
      procedureKey: 'changeProcRhinoAlar',
    });
  }

  // ── Nasolabial angle correction ───────────────────────────────────────────
  if (analysis.nasolabialAngle.severity !== 'optimal') {
    const { deviation } = analysis.nasolabialAngle;
    // Rotate nose tip upward/downward — scale 0.06 gives ~8px for 20% deviation
    const dy = clamp(-deviation / 100 * 0.06, -0.012, 0.012);
    addShift(LM.noseTip, 0, dy);
    changes.push({
      region: 'Nose',
      description: deviation < 0 ? 'Rotating nose tip upward' : 'Adjusting nasolabial angle',
      procedureToAchieve: 'Rhinoplasty',
      regionKey: 'changeRegionNose',
      descriptionKey: deviation < 0 ? 'changeDescRotateTipUp' : 'changeDescAdjustNasolabial',
      procedureKey: 'changeProcRhino',
    });
  }

  // ── Tip projection correction ─────────────────────────────────────────────
  if (analysis.tipProjection.severity !== 'optimal') {
    const { deviation } = analysis.tipProjection;
    // Project tip forward (dx) or pull back — scale 0.05 gives ~7px for 20% deviation
    const dx = clamp(deviation / 100 * 0.05, -0.01, 0.01);
    addShift(LM.noseTip, dx, 0);
  }

  // ── Lip ratio correction ───────────────────────────────────────────────────
  if (analysis.lipRatio.severity !== 'optimal') {
    const { deviation } = analysis.lipRatio;
    // Upper lip too thin → move upper lip top upward (increase height)
    if (deviation < 0) {
      const dy = clamp(deviation / 100 * -0.05, -0.01, 0.01);
      addShift(LM.upperLipTop, 0, dy);
      changes.push({
        region: 'Lips',
        description: 'Enhancing upper lip volume',
        procedureToAchieve: 'Lip Augmentation / Dermal Fillers',
        regionKey: 'changeRegionLips',
        descriptionKey: 'changeDescEnhanceUpperLip',
        procedureKey: 'changeProcLipFillers',
      });
    }
  }

  // ── Jaw to cheek ratio ────────────────────────────────────────────────────
  if (analysis.jawToCheekRatio.severity !== 'optimal') {
    const { deviation } = analysis.jawToCheekRatio;
    // Jaw too wide → slim gonions inward — scale 0.07 gives ~10px for 20% deviation
    if (deviation > 0) {
      const dx = clamp(-deviation / 100 * 0.07, -0.02, 0.02);
      addShift(LM.leftGonion, -dx, 0);
      addShift(LM.rightGonion, dx, 0);
      changes.push({
        region: 'Jaw',
        description: 'Slimming jaw contour (V-line effect)',
        procedureToAchieve: 'Facial Contouring / Jaw Reduction',
        regionKey: 'changeRegionJaw',
        descriptionKey: 'changeDescSlimJaw',
        procedureKey: 'changeProcContouring',
      });
    }
  }

  // ── Chin alignment ───────────────────────────────────────────────────────
  if (analysis.chinProjection.severity !== 'optimal') {
    const { deviation } = analysis.chinProjection;
    if (deviation > 0) {
      // Chin laterally offset from lip center — shift pogonion toward facial midline
      // Scale 0.05 gives ~7px for 20% deviation, clamped to ±0.01
      const lm = landmarks[LM.pogonion];
      const centerX = 0.5; // normalized midline
      // Always shift toward center — direction determined by which side chin is on
      const midlineDirection = lm.x > centerX ? -1 : 1;
      const correction = clamp(Math.abs(deviation) / 100 * 0.05, -0.01, 0.01);
      addShift(LM.pogonion, midlineDirection * correction, 0);
      changes.push({
        region: 'Chin',
        description: 'Improving chin midline alignment',
        procedureToAchieve: 'Chin Augmentation',
        regionKey: 'changeRegionChin',
        descriptionKey: 'changeDescChinMidline',
        procedureKey: 'changeProcChinAug',
      });
    }
  }

  // ── Cheek projection ──────────────────────────────────────────────────────
  if (analysis.cheekProjection.severity !== 'optimal') {
    const { deviation } = analysis.cheekProjection;
    // Enhance cheek width slightly — scale 0.07 gives ~10px for 20% deviation
    if (deviation < 0) {
      const dx = clamp(-deviation / 100 * 0.07, -0.015, 0.015);
      addShift(LM.leftZygomatic, -dx, 0);
      addShift(LM.rightZygomatic, dx, 0);
      changes.push({
        region: 'Cheeks',
        description: 'Enhancing cheekbone definition',
        procedureToAchieve: 'Cheek Fillers / Fat Grafting',
        regionKey: 'changeRegionCheeks',
        descriptionKey: 'changeDescEnhanceCheek',
        procedureKey: 'changeProcCheekFillers',
      });
    }
  }

  return { shifts, intensity, changes };
}

/**
 * Apply the transformation to a canvas using the existing warp engine.
 * sourceCanvas: the original image drawn on a canvas
 * normalizedLandmarks: raw Landmark[] from MediaPipe (x/y in 0-1 space)
 * transformation: output of calculateTransformation()
 * targetCanvas: the canvas to draw the warped result onto
 */
export async function applyTransformationToCanvas(
  sourceCanvas: HTMLCanvasElement,
  normalizedLandmarks: Landmark[],
  transformation: AnalysisTransformation,
  targetCanvas: HTMLCanvasElement,
): Promise<void> {
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;

  // Ensure target canvas matches source dimensions
  targetCanvas.width = w;
  targetCanvas.height = h;

  const ctx = targetCanvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(sourceCanvas, 0, 0, w, h);
    // Apply subtle refined aesthetic preview enhancement
    const factor = transformation.intensity || 0.7;
    ctx.save();
    ctx.filter = `contrast(${100 + Math.round(factor * 6)}%) brightness(${100 + Math.round(factor * 3)}%) saturate(${100 - Math.round(factor * 3)}%)`;
    ctx.drawImage(sourceCanvas, 0, 0, w, h);
    ctx.restore();
  }
}
