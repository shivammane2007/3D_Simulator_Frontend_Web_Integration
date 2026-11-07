import type { FacialAnalysisResult, ProcedureRecommendation } from './types';

type Category = ProcedureRecommendation['category'];

// Localization maps — the rule table below keeps English copy (the source of
// truth for the English PDF report); these resolve that copy to i18n keys in
// the Analyse namespace so the UI can render localized procedure names + tags.
const PROC_NAME_KEY: Record<string, string> = {
  Rhinoplasty: 'procRhinoplasty',
  Alarplasty: 'procAlarplasty',
  'Lip Augmentation': 'procLipAugmentation',
  'Dermal Fillers': 'procDermalFillers',
  'Facial Contouring': 'procFacialContouring',
  'Chin Augmentation': 'procChinAugmentation',
  Blepharoplasty: 'procBlepharoplasty',
  'Injectable Fillers': 'procInjectables',
  'Hairline Lowering': 'procHairlineLowering',
  'Lip Lift': 'procLipLift',
};

const ISSUE_KEY: Record<string, string> = {
  'Wide nasal base': 'issueWideNasalBase',
  'Nasal proportions': 'issueNasalProportions',
  'Alar width': 'issueAlarWidth',
  'Nostril flare': 'issueNostrilFlare',
  'Nasolabial angle': 'issueNasolabialAngle',
  'Nasal tip rotation': 'issueNasalTipRotation',
  'Tip projection': 'issueTipProjection',
  'Nasal definition': 'issueNasalDefinition',
  'Lip volume': 'issueLipVolume',
  'Upper lip definition': 'issueUpperLipDefinition',
  'Lip proportion': 'issueLipProportion',
  'Perioral volume': 'issuePerioralVolume',
  'Jaw width': 'issueJawWidth',
  'Face shape': 'issueFaceShape',
  'V-line definition': 'issueVLineDefinition',
  'Chin projection': 'issueChinProjection',
  'Lower facial balance': 'issueLowerFacialBalance',
  'Eye appearance': 'issueEyeAppearance',
  'Periorbital definition': 'issuePeriorbitalDefinition',
  'Cheekbone definition': 'issueCheekboneDefinition',
  'Midface volume': 'issueMidfaceVolume',
  'Forehead height': 'issueForeheadHeight',
  'Vertical balance': 'issueVerticalBalance',
  'Midface height': 'issueMidfaceHeight',
  'Vertical thirds balance': 'issueVerticalThirdsBalance',
  'Lower face height': 'issueLowerFaceHeight',
  'Lower third proportion': 'issueLowerThirdProportion',
  'Philtrum length': 'issuePhiltrumLength',
};

interface RuleEntry {
  slug: string;
  name: string;
  category: Category;
  simulatorPath?: string;
  addressesIssues: string[];
  baseImpact: number;
  estimatedImprovement: number;
}

const PROCEDURE_RULES: Record<string, RuleEntry[]> = {
  nasalWidth: [
    {
      slug: 'rhinoplasty',
      name: 'Rhinoplasty',
      category: 'surgical',
      simulatorPath: '/simulate/rhinoplasty',
      addressesIssues: ['Wide nasal base', 'Nasal proportions'],
      baseImpact: 8,
      estimatedImprovement: 35,
    },
    {
      slug: 'alarplasty',
      name: 'Alarplasty',
      category: 'surgical',
      simulatorPath: '/simulate/rhinoplasty',
      addressesIssues: ['Alar width', 'Nostril flare'],
      baseImpact: 6,
      estimatedImprovement: 25,
    },
  ],
  nasolabialAngle: [
    {
      slug: 'rhinoplasty',
      name: 'Rhinoplasty',
      category: 'surgical',
      simulatorPath: '/simulate/rhinoplasty',
      addressesIssues: ['Nasolabial angle', 'Nasal tip rotation'],
      baseImpact: 7,
      estimatedImprovement: 30,
    },
  ],
  tipProjection: [
    {
      slug: 'rhinoplasty',
      name: 'Rhinoplasty',
      category: 'surgical',
      simulatorPath: '/simulate/rhinoplasty',
      addressesIssues: ['Tip projection', 'Nasal definition'],
      baseImpact: 7,
      estimatedImprovement: 30,
    },
  ],
  lipRatio: [
    {
      slug: 'lip-augmentation',
      name: 'Lip Augmentation',
      category: 'injectable',
      simulatorPath: '/simulate/injectables',
      addressesIssues: ['Lip volume', 'Upper lip definition'],
      baseImpact: 6,
      estimatedImprovement: 28,
    },
    {
      slug: 'dermal-fillers',
      name: 'Dermal Fillers',
      category: 'injectable',
      simulatorPath: '/simulate/dermal-fillers',
      addressesIssues: ['Lip proportion', 'Perioral volume'],
      baseImpact: 5,
      estimatedImprovement: 22,
    },
  ],
  jawToCheekRatio: [
    {
      slug: 'facial-contouring',
      name: 'Facial Contouring',
      category: 'surgical',
      simulatorPath: '/simulate/facial-contouring',
      addressesIssues: ['Jaw width', 'Face shape', 'V-line definition'],
      baseImpact: 8,
      estimatedImprovement: 32,
    },
  ],
  chinProjection: [
    {
      slug: 'chin-augmentation',
      name: 'Chin Augmentation',
      category: 'surgical',
      simulatorPath: '/simulate/chin-augmentation',
      addressesIssues: ['Chin projection', 'Lower facial balance'],
      baseImpact: 7,
      estimatedImprovement: 30,
    },
  ],
  eyeSpacing: [
    {
      slug: 'blepharoplasty',
      name: 'Blepharoplasty',
      category: 'surgical',
      simulatorPath: '/simulate/blepharoplasty',
      addressesIssues: ['Eye appearance', 'Periorbital definition'],
      baseImpact: 6,
      estimatedImprovement: 25,
    },
  ],
  cheekProjection: [
    {
      slug: 'injectables',
      name: 'Injectable Fillers',
      category: 'injectable',
      simulatorPath: '/simulate/injectables',
      addressesIssues: ['Cheekbone definition', 'Midface volume'],
      baseImpact: 6,
      estimatedImprovement: 24,
    },
  ],
  upperThird: [
    {
      slug: 'hairline-lowering',
      name: 'Hairline Lowering',
      category: 'surgical',
      simulatorPath: '/simulate/hairline-lowering',
      addressesIssues: ['Forehead height', 'Vertical balance'],
      baseImpact: 5,
      estimatedImprovement: 20,
    },
  ],
  middleThird: [
    {
      slug: 'rhinoplasty',
      name: 'Rhinoplasty',
      category: 'surgical',
      simulatorPath: '/simulate/rhinoplasty',
      addressesIssues: ['Midface height', 'Vertical thirds balance'],
      baseImpact: 6,
      estimatedImprovement: 25,
    },
  ],
  lowerThird: [
    {
      slug: 'chin-augmentation',
      name: 'Chin Augmentation',
      category: 'surgical',
      simulatorPath: '/simulate/chin-augmentation',
      addressesIssues: ['Lower face height', 'Vertical thirds balance'],
      baseImpact: 7,
      estimatedImprovement: 28,
    },
    {
      slug: 'lip-lift',
      name: 'Lip Lift',
      category: 'surgical',
      addressesIssues: ['Lower third proportion', 'Philtrum length'],
      baseImpact: 5,
      estimatedImprovement: 20,
    },
  ],
};

/**
 * Generate a prioritized treatment plan from facial analysis results.
 * Deduplicates by slug, keeps highest impact score, sorts descending.
 */
export function generateTreatmentPlan(
  analysis: FacialAnalysisResult,
): ProcedureRecommendation[] {
  const candidates = new Map<string, ProcedureRecommendation>();

  function consider(
    measurementKey: keyof typeof PROCEDURE_RULES,
    severity: string,
    _deviationAbsolute: number,
  ) {
    if (severity === 'optimal') return;

    const rules = PROCEDURE_RULES[measurementKey] ?? [];
    for (const rule of rules) {
      // Scale impact based on severity
      const severityMultiplier =
        severity === 'significant' ? 1.0 :
        severity === 'moderate' ? 0.75 :
        0.5; // mild

      const impactScore = Math.min(10, Math.round(rule.baseImpact * severityMultiplier));
      const estimatedImprovement = Math.min(
        60,
        Math.round(rule.estimatedImprovement * severityMultiplier),
      );

      const existing = candidates.get(rule.slug);
      if (!existing || existing.impactScore < impactScore) {
        candidates.set(rule.slug, {
          procedureSlug: rule.slug,
          procedureName: rule.name,
          procedureNameKey: PROC_NAME_KEY[rule.name],
          category: rule.category,
          impactScore,
          addressesIssues: rule.addressesIssues,
          addressesIssueKeys: rule.addressesIssues.map((i) => ISSUE_KEY[i] ?? i),
          estimatedImprovement,
          priority: 'medium', // assigned below
          simulatorPath: rule.simulatorPath,
        });
      }
    }
  }

  // Evaluate each measurement
  const m = analysis;
  consider('nasalWidth', m.nasalWidth.severity, Math.abs(m.nasalWidth.deviation));
  consider('nasolabialAngle', m.nasolabialAngle.severity, Math.abs(m.nasolabialAngle.deviation));
  consider('tipProjection', m.tipProjection.severity, Math.abs(m.tipProjection.deviation));
  consider('lipRatio', m.lipRatio.severity, Math.abs(m.lipRatio.deviation));
  consider('jawToCheekRatio', m.jawToCheekRatio.severity, Math.abs(m.jawToCheekRatio.deviation));
  consider('chinProjection', m.chinProjection.severity, Math.abs(m.chinProjection.deviation));
  consider('eyeSpacing', m.eyeSpacing.severity, Math.abs(m.eyeSpacing.deviation));
  consider('cheekProjection', m.cheekProjection.severity, Math.abs(m.cheekProjection.deviation));
  consider('upperThird', m.upperThird.severity, Math.abs(m.upperThird.deviation));
  consider('middleThird', m.middleThird.severity, Math.abs(m.middleThird.deviation));
  consider('lowerThird', m.lowerThird.severity, Math.abs(m.lowerThird.deviation));

  // Sort by impact score descending
  const sorted = Array.from(candidates.values()).sort((a, b) => b.impactScore - a.impactScore);

  // Assign priorities
  return sorted.map((rec, idx) => ({
    ...rec,
    priority: idx < 3 ? 'high' : idx < 6 ? 'medium' : 'low',
  }));
}
