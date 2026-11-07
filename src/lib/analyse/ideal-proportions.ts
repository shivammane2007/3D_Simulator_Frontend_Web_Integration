export const LM = {
  foreheadTop: 10,
  glabella: 9,
  nasion: 6,
  noseTip: 1,
  subnasale: 2,
  upperLipTop: 0,
  upperLipBottom: 13,
  lowerLipTop: 14,
  lowerLipBottom: 17,
  pogonion: 152,
  leftEyeInner: 133,
  leftEyeOuter: 33,
  rightEyeInner: 362,
  rightEyeOuter: 263,
  leftAlar: 129,
  rightAlar: 358,
  leftMouthCorner: 61,
  rightMouthCorner: 291,
  leftGonion: 172,
  rightGonion: 397,
  leftZygomatic: 117,
  rightZygomatic: 346,
  leftBrowInner: 107,
  rightBrowInner: 336,
  // Additional landmarks used by detectGender()
  leftJawMid: 234,
  rightJawMid: 454,
  leftBrowRidge: 70,
  rightBrowRidge: 300,
  leftCheekWidth: 123,
  rightCheekWidth: 352,
} as const;

export const IDEAL = {
  verticalThird: 0.333,
  noseWidthToIntercanthal: 1.0,
  goodeRatio: 0.575, // tip projection / nasal length
  lipRatioLowerToUpper: 1.6,
  lipWidthToNoseWidth: 1.5,
  jawToCheekRatio: 0.9, // jaw narrower than cheeks
  eyeWidthToFaceWidth: 0.2,
  intercanthalToEyeWidth: 1.0,
  nasolabialAngle: { female: 105, male: 92 },
};

// Ethnic adjustments applied to ideals
export const ETHNIC_ADJUSTMENTS: Record<string, Partial<typeof IDEAL>> = {
  'east-asian': {
    noseWidthToIntercanthal: 1.05,
    jawToCheekRatio: 0.82, // slimmer jaw preferred (V-line)
  },
  'south-asian': {
    nasolabialAngle: { female: 100, male: 90 },
  },
  'african': {
    noseWidthToIntercanthal: 1.15,
    lipRatioLowerToUpper: 1.8,
  },
  'latin': {
    lipRatioLowerToUpper: 1.7,
  },
  'middle-eastern': {},
  'caucasian': {},
};
