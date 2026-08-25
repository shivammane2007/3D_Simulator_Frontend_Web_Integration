/**
 * Faceify Labs — Data Layer: Procedures
 * Source: https://faceifylabs.com/
 * All procedure names and categories are source-verified.
 */

export type ProcedureCategory =
  | 'surgical'
  | 'non-surgical'
  | 'injectable'
  | 'dental'
  | 'body'
  | 'hair';

export interface Procedure {
  slug: string;
  name: string;
  category: ProcedureCategory;
  categoryLabel: string;
  simulatorSlug: string;
  shortDescription: string;
  description: string;
  relatedProcedures: string[];
  disclaimer: string;
}

export const procedureCategories: Record<
  ProcedureCategory,
  { label: string; color: string }
> = {
  surgical: { label: 'Surgical', color: 'accent' },
  'non-surgical': { label: 'Non-Surgical', color: 'sage' },
  injectable: { label: 'Injectable', color: 'teal' },
  dental: { label: 'Dental', color: 'moss' },
  body: { label: 'Body', color: 'forest' },
  hair: { label: 'Hair', color: 'pine' },
};

export const procedures: Procedure[] = [
  // ─── Surgical ──────────────────────────────────────────────
  {
    slug: 'rhinoplasty',
    name: 'Rhinoplasty',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'rhinoplasty',
    shortDescription: 'Nose reshaping — tip, bridge, and alar base visualization.',
    description:
      'Visualize changes to nasal tip rotation, dorsal height, alar base width, and projection before your consultation. Our simulation uses 468 facial landmarks to model how nasal adjustments integrate with your unique facial geometry.',
    relatedProcedures: ['blepharoplasty', 'facelift', 'chin-augmentation'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'blepharoplasty',
    name: 'Blepharoplasty',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'blepharoplasty',
    shortDescription: 'Eyelid refinement — upper and lower lid visualization.',
    description:
      'Explore how upper or lower eyelid adjustments can affect the appearance of the eye region. The simulator models canthal tilt and lid contour changes across your facial mesh.',
    relatedProcedures: ['rhinoplasty', 'facelift', 'brow-lift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'facelift',
    name: 'Facelift',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'facelift',
    shortDescription: 'Facial rejuvenation — midface and jawline visualization.',
    description:
      'See how midface repositioning and jawline definition adjustments might appear. Our AI maps 468 landmarks to model how structural changes interact with your skin and bone anatomy.',
    relatedProcedures: ['blepharoplasty', 'brow-lift', 'rhinoplasty'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'brow-lift',
    name: 'Brow Lift',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'brow-lift',
    shortDescription: 'Brow repositioning — forehead and brow arch visualization.',
    description:
      'Visualize how brow position and arch shape changes can affect your overall facial expression and upper face appearance.',
    relatedProcedures: ['blepharoplasty', 'facelift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'otoplasty',
    name: 'Otoplasty',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'otoplasty',
    shortDescription: 'Ear reshaping — prominence and position visualization.',
    description:
      'Explore ear prominence adjustments and position changes before your consultation.',
    relatedProcedures: ['rhinoplasty'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'v-line-contouring',
    name: 'V-Line Contouring',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'facial-contouring',
    shortDescription: 'Jaw and chin reshaping — mandible and lower face visualization.',
    description:
      'Visualize jaw angle reduction and chin refinement for a more defined lower face contour. Facial thirds measurements are modeled in the simulation.',
    relatedProcedures: ['rhinoplasty', 'chin-augmentation', 'facelift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'lip-lift',
    name: 'Lip Lift',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'lip-lift',
    shortDescription: 'Upper lip height and vermilion visualization.',
    description:
      'See how a lip lift affects philtrum length, vermilion exposure, and overall mouth proportions in the context of your full face.',
    relatedProcedures: ['rhinoplasty', 'lip-augmentation'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'chin-augmentation',
    name: 'Chin Augmentation',
    category: 'surgical',
    categoryLabel: 'Surgical',
    simulatorSlug: 'chin-augmentation',
    shortDescription: 'Chin projection, width, and height visualization.',
    description:
      'Explore how chin projection, width, and height adjustments interact with your nose and jawline proportions.',
    relatedProcedures: ['rhinoplasty', 'v-line-contouring', 'facelift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },

  // ─── Non-Surgical ───────────────────────────────────────────
  {
    slug: 'chemical-peel',
    name: 'Chemical Peel',
    category: 'non-surgical',
    categoryLabel: 'Non-Surgical',
    simulatorSlug: 'chemical-peel',
    shortDescription: 'Skin texture and tone improvement visualization.',
    description:
      'Visualize how chemical peel treatments may affect skin texture, tone uniformity, and surface quality.',
    relatedProcedures: ['microneedling', 'laser-resurfacing'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'laser-resurfacing',
    name: 'Laser Resurfacing',
    category: 'non-surgical',
    categoryLabel: 'Non-Surgical',
    simulatorSlug: 'laser',
    shortDescription: 'Skin refinement and rejuvenation visualization.',
    description:
      'Explore how laser treatments can address texture, pigmentation, and overall skin quality.',
    relatedProcedures: ['chemical-peel', 'microneedling'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'microneedling',
    name: 'Microneedling',
    category: 'non-surgical',
    categoryLabel: 'Non-Surgical',
    simulatorSlug: 'microneedling',
    shortDescription: 'Skin texture and collagen stimulation visualization.',
    description:
      'Visualize skin texture improvements and the effects of collagen remodeling on your facial appearance.',
    relatedProcedures: ['chemical-peel', 'laser-resurfacing'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'hifu',
    name: 'HIFU',
    category: 'non-surgical',
    categoryLabel: 'Non-Surgical',
    simulatorSlug: 'hifu',
    shortDescription: 'Non-surgical lifting and tightening visualization.',
    description:
      'See how HIFU treatments may affect facial contour, skin laxity, and overall lift appearance.',
    relatedProcedures: ['rf-skin-tightening', 'facelift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'rf-skin-tightening',
    name: 'RF Skin Tightening',
    category: 'non-surgical',
    categoryLabel: 'Non-Surgical',
    simulatorSlug: 'rf',
    shortDescription: 'Radiofrequency skin tightening visualization.',
    description:
      'Explore how RF skin tightening may affect facial skin firmness and contour.',
    relatedProcedures: ['hifu', 'facelift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },

  // ─── Injectable ─────────────────────────────────────────────
  {
    slug: 'botox',
    name: 'Botox',
    category: 'injectable',
    categoryLabel: 'Injectable',
    simulatorSlug: 'injectables',
    shortDescription: 'Wrinkle relaxation and facial contouring visualization.',
    description:
      'Visualize how Botox may affect expression lines, forehead wrinkles, crow\'s feet, and facial contouring treatments including masseter reduction.',
    relatedProcedures: ['dermal-fillers', 'masseter-botox'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'dermal-fillers',
    name: 'Dermal Fillers',
    category: 'injectable',
    categoryLabel: 'Injectable',
    simulatorSlug: 'fillers',
    shortDescription: 'Volume restoration and contouring visualization.',
    description:
      'Explore how dermal fillers can restore facial volume, enhance cheekbones, soften nasolabial folds, and augment the lips.',
    relatedProcedures: ['botox', 'lip-augmentation', 'rhinoplasty'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'lip-augmentation',
    name: 'Lip Augmentation',
    category: 'injectable',
    categoryLabel: 'Injectable',
    simulatorSlug: 'lip-augmentation',
    shortDescription: 'Lip volume and shape visualization.',
    description:
      'See how lip filler treatments can change lip volume, definition, and overall mouth proportions.',
    relatedProcedures: ['dermal-fillers', 'lip-lift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'masseter-botox',
    name: 'Masseter Botox',
    category: 'injectable',
    categoryLabel: 'Injectable',
    simulatorSlug: 'masseter',
    shortDescription: 'Jawline slimming and masseter reduction visualization.',
    description:
      'Visualize how masseter muscle relaxation can slim the lower face and create a more tapered jawline.',
    relatedProcedures: ['botox', 'v-line-contouring', 'chin-augmentation'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'profhilo',
    name: 'Profhilo',
    category: 'injectable',
    categoryLabel: 'Injectable',
    simulatorSlug: 'profhilo',
    shortDescription: 'Skin bio-remodeling and hydration visualization.',
    description:
      'Explore how Profhilo bio-remodeling treatment may affect skin quality, hydration, and overall luminosity.',
    relatedProcedures: ['dermal-fillers', 'botox'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'kybella',
    name: 'Kybella',
    category: 'injectable',
    categoryLabel: 'Injectable',
    simulatorSlug: 'kybella',
    shortDescription: 'Submental fat reduction visualization.',
    description:
      'Visualize how Kybella treatment may affect under-chin fullness and neck contour.',
    relatedProcedures: ['chin-augmentation', 'facelift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },

  // ─── Dental ─────────────────────────────────────────────────
  {
    slug: 'veneers',
    name: 'Veneers',
    category: 'dental',
    categoryLabel: 'Dental',
    simulatorSlug: 'veneers',
    shortDescription: 'Tooth shape, color, and alignment visualization.',
    description:
      'Explore how dental veneers can transform tooth shape, color, and your overall smile.',
    relatedProcedures: ['smile-design', 'teeth-whitening'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'smile-design',
    name: 'Smile Design',
    category: 'dental',
    categoryLabel: 'Dental',
    simulatorSlug: 'smile-design',
    shortDescription: 'Comprehensive smile transformation visualization.',
    description:
      'Visualize a complete smile redesign including tooth shape, gum line, and color harmony.',
    relatedProcedures: ['veneers', 'teeth-whitening', 'gummy-smile'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'dental',
    categoryLabel: 'Dental',
    simulatorSlug: 'whitening',
    shortDescription: 'Tooth brightness and tone visualization.',
    description:
      'See how professional teeth whitening can affect the overall brightness and tone of your smile.',
    relatedProcedures: ['veneers', 'smile-design'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'gummy-smile',
    name: 'Gummy Smile',
    category: 'dental',
    categoryLabel: 'Dental',
    simulatorSlug: 'gummy-smile',
    shortDescription: 'Gum-to-tooth ratio and smile line visualization.',
    description:
      'Explore how gummy smile correction can change the gum-to-tooth ratio and overall smile appearance.',
    relatedProcedures: ['smile-design', 'botox'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },

  // ─── Body Contouring ────────────────────────────────────────
  {
    slug: 'breast-augmentation',
    name: 'Breast Augmentation',
    category: 'body',
    categoryLabel: 'Body',
    simulatorSlug: 'breast-augmentation',
    shortDescription: 'Volume and projection visualization.',
    description:
      'Visualize breast augmentation options and how different approaches may affect proportion and silhouette.',
    relatedProcedures: ['breast-lift'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'liposuction',
    name: 'Liposuction',
    category: 'body',
    categoryLabel: 'Body',
    simulatorSlug: 'liposuction',
    shortDescription: 'Body contour and definition visualization.',
    description:
      'Explore how targeted fat reduction might affect body contour and proportion.',
    relatedProcedures: ['bbl', 'tummy-tuck'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'bbl',
    name: 'BBL',
    category: 'body',
    categoryLabel: 'Body',
    simulatorSlug: 'bbl',
    shortDescription: 'Brazilian butt lift volume and shape visualization.',
    description:
      'Visualize how Brazilian butt lift fat transfer might affect volume, projection, and lower body proportions.',
    relatedProcedures: ['liposuction'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },
  {
    slug: 'tummy-tuck',
    name: 'Tummy Tuck',
    category: 'body',
    categoryLabel: 'Body',
    simulatorSlug: 'tummy-tuck',
    shortDescription: 'Abdominal contour and profile visualization.',
    description:
      'Explore how abdominoplasty may affect the abdominal profile and overall torso contour.',
    relatedProcedures: ['liposuction', 'bbl'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict surgical outcomes.',
  },

  // ─── Hair Restoration ───────────────────────────────────────
  {
    slug: 'dhi-hair-transplant',
    name: 'DHI Hair Transplant',
    category: 'hair',
    categoryLabel: 'Hair',
    simulatorSlug: 'hair-transplant',
    shortDescription: 'Hairline design and density visualization.',
    description:
      'Visualize how DHI hair transplant might affect hairline position, density, and overall hair coverage.',
    relatedProcedures: ['prp-hair', 'laser-hair-removal'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'prp-hair',
    name: 'PRP Hair',
    category: 'hair',
    categoryLabel: 'Hair',
    simulatorSlug: 'prp-hair',
    shortDescription: 'Hair density and quality improvement visualization.',
    description:
      'Explore how PRP hair treatment might affect hair density and overall scalp health.',
    relatedProcedures: ['dhi-hair-transplant'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
  {
    slug: 'laser-hair-removal',
    name: 'Laser Hair Removal',
    category: 'hair',
    categoryLabel: 'Hair',
    simulatorSlug: 'laser-hair',
    shortDescription: 'Hair reduction and skin smoothness visualization.',
    description:
      'Visualize the effects of laser hair removal on skin texture and hair reduction.',
    relatedProcedures: ['prp-hair'],
    disclaimer:
      'Simulations are educational visualizations only. Results do not predict treatment outcomes.',
  },
];

export function getProcedureBySlug(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}

export function getProceduresByCategory(category: ProcedureCategory): Procedure[] {
  return procedures.filter((p) => p.category === category);
}

export function getRelatedProcedures(procedure: Procedure): Procedure[] {
  return procedure.relatedProcedures
    .map((slug) => getProcedureBySlug(slug))
    .filter((p): p is Procedure => p !== undefined);
}
