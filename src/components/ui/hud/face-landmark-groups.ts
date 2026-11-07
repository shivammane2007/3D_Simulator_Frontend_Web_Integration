/**
 * Curated MediaPipe FaceMesh (468-point) landmark groups for the HUD overlay.
 *
 * Deliberately a SMALL clinical subset — not all 468 points. Indices follow the
 * canonical MediaPipe FaceMesh topology. These drive `LandmarkOverlay` so the
 * face reads as "measured" without looking like a noisy point cloud.
 */

/** Jawline / face contour (left ear → chin → right ear). */
export const JAWLINE_CONTOUR: number[] = [
  234, 93, 132, 58, 172, 136, 150, 149, 176, 148, 152, 377, 400, 378, 379, 365,
  397, 288, 361, 323, 454,
];

/** Nose bridge midline (nasion → tip). */
export const NOSE_BRIDGE: number[] = [168, 6, 197, 195, 5, 4, 1];

/** Nose base (alar to alar across the tip). */
export const NOSE_BASE: number[] = [129, 98, 97, 2, 326, 327, 358];

/** Left eyebrow arc. */
export const LEFT_BROW: number[] = [70, 63, 105, 66, 107];
/** Right eyebrow arc. */
export const RIGHT_BROW: number[] = [336, 296, 334, 293, 300];

/** Outer lip contour. */
export const LIP_OUTER: number[] = [
  61, 40, 37, 0, 267, 270, 291, 321, 314, 17, 84, 91, 61,
];

/** Vertical facial midline (forehead → glabella → nose tip → philtrum → chin). */
export const MIDLINE: number[] = [10, 9, 6, 1, 2, 0, 17, 152];

/** Key feature dots — sparse, high-signal anchors only. */
export const KEY_DOTS: number[] = [
  // brows
  107, 336, 70, 300,
  // eyes (inner/outer corners)
  133, 33, 362, 263,
  // nose
  6, 1, 129, 358,
  // lips
  61, 291, 0, 17,
  // jaw / chin
  172, 397, 152,
  // cheekbones
  117, 346,
];

/** All contour polylines for the overlay, as a ready-to-pass array. */
export const HUD_POLYLINES: number[][] = [
  JAWLINE_CONTOUR,
  NOSE_BRIDGE,
  NOSE_BASE,
  LEFT_BROW,
  RIGHT_BROW,
  LIP_OUTER,
  MIDLINE,
];
