export interface FacialMeasurement {
  name: string;
  actual: number;
  ideal: number;
  deviation: number; // percentage from ideal
  deviationDirection: 'above' | 'below' | 'within';
  severity: 'optimal' | 'mild' | 'moderate' | 'significant';
  relatedProcedures: string[]; // procedure slugs
  unit?: string;
}

export interface FacialAnalysisResult {
  // Face
  faceShape: 'oval' | 'round' | 'square' | 'heart' | 'oblong' | 'diamond';
  symmetryScore: number; // 0-100

  // Measurements
  upperThird: FacialMeasurement;
  middleThird: FacialMeasurement;
  lowerThird: FacialMeasurement;
  nasalWidth: FacialMeasurement;
  nasolabialAngle: FacialMeasurement;
  tipProjection: FacialMeasurement;
  lipRatio: FacialMeasurement;
  jawToCheekRatio: FacialMeasurement;
  chinProjection: FacialMeasurement;
  eyeSpacing: FacialMeasurement;
  cheekProjection: FacialMeasurement;

  // Scores
  overallHarmonyScore: number; // 0-100
  proportionsScore: number; // 0-100 — key proportions compliance (NOT golden ratio)

  // Demographics (for ideal calibration, always user-overridable)
  // 'neutral' = auto / no ethnic adjustment (default for first-time visitors).
  detectedGender: 'female' | 'male';
  selectedEthnicity: 'neutral' | 'east-asian' | 'south-asian' | 'middle-eastern' | 'african' | 'caucasian' | 'latin';
}

export interface ProcedureRecommendation {
  procedureSlug: string;
  procedureName: string; // English — used by the English PDF report
  /** i18n key (Analyse namespace) for the localized procedure name. */
  procedureNameKey?: string;
  category: 'surgical' | 'non-surgical' | 'injectable' | 'body-contouring' | 'hair-restoration';
  impactScore: number; // 1-10
  addressesIssues: string[]; // English — used by the English PDF report
  /** i18n keys (Analyse namespace) for the localized "addresses" tags. */
  addressesIssueKeys?: string[];
  estimatedImprovement: number; // percentage
  priority: 'high' | 'medium' | 'low';
  simulatorPath?: string; // if simulator exists
}

export interface AnalysisTransformation {
  // Normalized-space shifts for each landmark index
  shifts: Map<number, { dx: number; dy: number }>;
  intensity: number; // 0-1
  changes: Array<{
    region: string; // English — retained for tests / non-localized consumers
    description: string; // English
    procedureToAchieve: string; // English
    /** i18n keys (Analyse namespace) for localized display. */
    regionKey?: string;
    descriptionKey?: string;
    procedureKey?: string;
  }>;
}
