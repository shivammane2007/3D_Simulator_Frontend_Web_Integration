// ---------------------------------------------------------------------------
// Simulator Schema Data
// Provides structured data for MedicalWebPage + SoftwareApplication JSON-LD
// injected into each /simulate/[procedure] page.
// ---------------------------------------------------------------------------

export interface SimulatorSchemaData {
  procedureName: string;
  shortName: string;
  description: string;
  bodyLocation: string;
  medicalSpecialty: string;
  /** Plain-English description of the simulator tool itself */
  toolDescription: string;
  /** The canonical simulate slug, e.g. "rhinoplasty" */
  simulateSlug: string;
}

export const SIMULATOR_SCHEMA_MAP: Record<string, SimulatorSchemaData> = {
  rhinoplasty: {
    procedureName: 'Rhinoplasty (Nose Reshaping)',
    shortName: 'Rhinoplasty',
    description:
      'Surgical reshaping of the nose to correct aesthetic concerns such as dorsal humps, bulbous tips, and asymmetry, or to improve nasal airway function.',
    bodyLocation: 'Nose',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'AI-powered rhinoplasty simulator using a 468-point anatomical facial mesh. Adjust tip rotation, dorsal height, alar base width, and projection in real time. Runs entirely in the browser with no patient data uploaded.',
    simulateSlug: 'rhinoplasty',
  },
  blepharoplasty: {
    procedureName: 'Blepharoplasty (Double Eyelid Surgery)',
    shortName: 'Blepharoplasty',
    description:
      'Surgical procedure to reshape the upper or lower eyelids, address skin laxity, correct fat pads, and, in Asian blepharoplasty, create or refine the supratarsal crease.',
    bodyLocation: 'Eyelids',
    medicalSpecialty: 'Oculoplastic Surgery',
    toolDescription:
      'Clinical blepharoplasty simulator with 7 adjustable parameters: crease height, crease shape, MRD1, skin excision, fat reduction, epicanthoplasty, and lateral canthoplasty. Includes 5 ethnic presets and clinical safety rules.',
    simulateSlug: 'blepharoplasty',
  },
  facelift: {
    procedureName: 'Facelift (Rhytidectomy)',
    shortName: 'Facelift',
    description:
      'Surgical repositioning of facial soft tissue to reduce the appearance of jowls, nasolabial folds, and neck laxity, restoring a more youthful facial contour.',
    bodyLocation: 'Face and Neck',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'AI facelift simulator modelling SMAS tissue repositioning, jowl reduction, and neck contouring across 468 anatomical landmarks for realistic consultation previews.',
    simulateSlug: 'facelift',
  },
  'chin-augmentation': {
    procedureName: 'Chin Augmentation (Genioplasty)',
    shortName: 'Chin Augmentation',
    description:
      'Surgical or non-surgical enhancement of chin projection and facial balance through implant placement or bone repositioning.',
    bodyLocation: 'Chin',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Real-time chin augmentation simulator adjusting chin projection, vertical height, and lateral symmetry using anatomical facial landmark mapping.',
    simulateSlug: 'chin-augmentation',
  },
  'facial-contouring': {
    procedureName: 'Facial Contouring',
    shortName: 'Facial Contouring',
    description:
      'Surgical or non-surgical reshaping of facial bone structure and soft tissue to achieve defined facial angles, a narrower face, or improved symmetry.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Facial contouring simulator modelling jawline reduction, cheekbone enhancement, and overall facial proportion changes using a 468-point mesh.',
    simulateSlug: 'facial-contouring',
  },
  'lip-lift': {
    procedureName: 'Lip Lift',
    shortName: 'Lip Lift',
    description:
      'Surgical shortening of the philtrum to increase upper lip show, improve the lip-nose ratio, and rejuvenate the perioral area.',
    bodyLocation: 'Upper Lip',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'AI lip lift simulator adjusting philtrum length, upper lip vermillion show, and lip-nose ratio for realistic pre-consultation visualisation.',
    simulateSlug: 'lip-lift',
  },
  'buccal-fat-removal': {
    procedureName: 'Buccal Fat Removal',
    shortName: 'Buccal Fat Removal',
    description:
      'Surgical removal of the buccal fat pad to slim the lower face and enhance cheekbone definition.',
    bodyLocation: 'Cheeks',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Buccal fat removal simulator modelling lower face slimming and cheekbone definition changes using anatomical mesh mapping.',
    simulateSlug: 'buccal-fat-removal',
  },
  injectables: {
    procedureName: 'Injectable Treatments (Botox & Neurotoxins)',
    shortName: 'Injectables',
    description:
      'Non-surgical injectable treatments using botulinum toxin to relax facial muscles and reduce dynamic wrinkles, including forehead lines, crow\'s feet, and glabellar lines.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'Injectable treatment simulator visualising Botox and neurotoxin effects across common treatment zones: forehead, glabella, and periorbital areas.',
    simulateSlug: 'injectables',
  },
  'dermal-fillers': {
    procedureName: 'Dermal Filler Treatment',
    shortName: 'Dermal Fillers',
    description:
      'Non-surgical injectable treatment using hyaluronic acid or other fillers to restore volume, enhance facial contours, and smooth static wrinkles.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'Dermal filler simulator modelling volume restoration across cheeks, nasolabial folds, lips, and under-eye hollows using real-time 468-point facial mesh.',
    simulateSlug: 'dermal-fillers',
  },
  'chemical-peels': {
    procedureName: 'Chemical Peel',
    shortName: 'Chemical Peel',
    description:
      'Non-surgical skin resurfacing treatment using chemical exfoliants to improve skin texture, reduce pigmentation, and treat acne scarring.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'Chemical peel outcome simulator showing skin texture, tone, and pigmentation improvement across superficial, medium, and deep peel categories.',
    simulateSlug: 'chemical-peels',
  },
  'thread-lift': {
    procedureName: 'Thread Lift',
    shortName: 'Thread Lift',
    description:
      'Minimally invasive facial lifting procedure using dissolvable sutures to lift and tighten facial soft tissue without general anaesthesia.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Thread lift simulator modelling midface lifting, jowl reduction, and neck tightening outcomes for pre-procedure consultations.',
    simulateSlug: 'thread-lift',
  },
  'laser-resurfacing': {
    procedureName: 'Laser Skin Resurfacing',
    shortName: 'Laser Resurfacing',
    description:
      'Non-surgical skin treatment using ablative or non-ablative laser energy to reduce wrinkles, acne scars, and sun damage while stimulating collagen production.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'Laser resurfacing simulator previewing skin smoothing, scar reduction, and tone evening outcomes for ablative and fractional laser treatments.',
    simulateSlug: 'laser-resurfacing',
  },
  liposuction: {
    procedureName: 'Liposuction',
    shortName: 'Liposuction',
    description:
      'Surgical fat removal procedure to sculpt the body by eliminating localised fat deposits resistant to diet and exercise.',
    bodyLocation: 'Body',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Body contouring simulator previewing liposuction outcomes across common treatment areas including abdomen, flanks, and thighs.',
    simulateSlug: 'liposuction',
  },
  'tummy-tuck': {
    procedureName: 'Abdominoplasty (Tummy Tuck)',
    shortName: 'Tummy Tuck',
    description:
      'Surgical procedure to remove excess abdominal skin and fat and repair weakened abdominal muscles, creating a flatter, firmer midsection.',
    bodyLocation: 'Abdomen',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Abdominoplasty simulator modelling skin reduction, muscle repair, and abdominal contour improvement for pre-consultation visualisation.',
    simulateSlug: 'tummy-tuck',
  },
  bbl: {
    procedureName: 'Brazilian Butt Lift (BBL)',
    shortName: 'Brazilian Butt Lift',
    description:
      'Surgical fat transfer procedure using liposuction to harvest fat and inject it into the buttocks for improved shape and volume.',
    bodyLocation: 'Buttocks',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'BBL simulator previewing buttock augmentation and contouring outcomes using fat transfer modelling for realistic consultation preparation.',
    simulateSlug: 'bbl',
  },
  'breast-augmentation': {
    procedureName: 'Breast Augmentation',
    shortName: 'Breast Augmentation',
    description:
      'Surgical enhancement of breast size and shape using implants or fat transfer, tailored to the patient\'s anatomy and aesthetic goals.',
    bodyLocation: 'Chest',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Breast augmentation simulator modelling size, shape, and implant profile changes to help surgeons and patients align expectations pre-operatively.',
    simulateSlug: 'breast-augmentation',
  },
  'gummy-smile': {
    procedureName: 'Gummy Smile Correction',
    shortName: 'Gummy Smile',
    description:
      'Treatment to reduce excessive gingival display when smiling, using Botox, surgical lip repositioning, or crown lengthening depending on the underlying cause.',
    bodyLocation: 'Lips and Gums',
    medicalSpecialty: 'Dental and Oral Medicine',
    toolDescription:
      'Gummy smile simulator modelling Botox and surgical correction outcomes, showing the reduction in gingival display across multiple treatment approaches.',
    simulateSlug: 'gummy-smile',
  },
  'smile-design': {
    procedureName: 'Digital Smile Design',
    shortName: 'Smile Design',
    description:
      'Comprehensive aesthetic dental treatment planning using digital imaging to design and preview the ideal smile before any procedures are performed.',
    bodyLocation: 'Teeth and Gums',
    medicalSpecialty: 'Dental and Oral Medicine',
    toolDescription:
      'Digital smile design simulator enabling real-time preview of tooth shape, size, colour, and gum-line adjustments for patient consultation and treatment planning.',
    simulateSlug: 'smile-design',
  },
  veneers: {
    procedureName: 'Dental Veneers',
    shortName: 'Veneers',
    description:
      'Thin porcelain or composite shells bonded to the front surface of teeth to improve colour, shape, size, and overall smile aesthetics.',
    bodyLocation: 'Teeth',
    medicalSpecialty: 'Dental and Oral Medicine',
    toolDescription:
      'Veneer simulator previewing tooth colour, shape, and smile line transformations to help patients and dentists align on the desired outcome before treatment.',
    simulateSlug: 'veneers',
  },
  'teeth-whitening': {
    procedureName: 'Teeth Whitening',
    shortName: 'Teeth Whitening',
    description:
      'Professional bleaching treatment to lighten tooth discolouration caused by staining, ageing, or lifestyle factors.',
    bodyLocation: 'Teeth',
    medicalSpecialty: 'Dental and Oral Medicine',
    toolDescription:
      'Teeth whitening simulator showing realistic shade progression across multiple whitening levels to set patient expectations before treatment.',
    simulateSlug: 'teeth-whitening',
  },
  'fat-grafting': {
    procedureName: 'Facial Fat Grafting',
    shortName: 'Fat Grafting',
    description:
      'Surgical volume restoration procedure using the patient\'s own harvested fat to rejuvenate hollowed areas of the face including cheeks, temples, and under-eyes.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Fat grafting simulator modelling volume restoration in cheeks, temples, and periorbital areas using anatomical landmark-based mesh deformation.',
    simulateSlug: 'fat-grafting',
  },
  '3d-reconstruction': {
    procedureName: '3D Facial Reconstruction',
    shortName: '3D Reconstruction',
    description:
      'Advanced 3D digital facial reconstruction for surgical planning, patient communication, and outcome visualisation using AI-powered anatomical mapping.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Full 3D facial reconstruction tool generating a high-fidelity digital twin of the patient\'s face for surgical planning and multi-procedure visualisation.',
    simulateSlug: '3d-reconstruction',
  },
  botox: {
    procedureName: 'Botox / Neuromodulator Treatment',
    shortName: 'Botox',
    description:
      'Non-surgical injectable treatment using botulinum toxin to relax facial muscles and reduce dynamic wrinkles such as forehead lines, glabellar "11" lines, and crow\'s feet.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'AI Botox simulator previewing forehead, glabella, crow\'s feet, brow lift, and bunny line outcomes by zone. Runs entirely in the browser with a 468-point facial mesh.',
    simulateSlug: 'botox',
  },
  'brow-lift': {
    procedureName: 'Brow Lift (Forehead Lift)',
    shortName: 'Brow Lift',
    description:
      'Surgical or non-surgical elevation of the eyebrows and forehead to reduce sagging brows, smooth horizontal forehead lines, and open the eye area.',
    bodyLocation: 'Forehead and Brows',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription:
      'Brow lift simulator modelling tail-lift, central-lift, and full-brow elevation across endotine, temporal, and coronal techniques with anatomical eye-orbit clamping.',
    simulateSlug: 'brow-lift',
  },
  'lip-augmentation': {
    procedureName: 'Lip Augmentation (Lip Filler)',
    shortName: 'Lip Augmentation',
    description:
      'Non-surgical lip enhancement using hyaluronic-acid filler to add volume, shape, projection, and definition to the upper and lower lips.',
    bodyLocation: 'Lips',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'Lip augmentation simulator with 6 controls (upper/lower volume, projection, cupid\'s bow, width, and symmetry) calibrated to clinical ml dosing for natural-looking previews.',
    simulateSlug: 'lip-augmentation',
  },
  'lip-flip': {
    procedureName: 'Lip Flip (Botox)',
    shortName: 'Lip Flip',
    description:
      'Non-surgical injectable treatment using a small Botox dose at the upper-lip vermillion border to relax the orbicularis oris and roll the lip outward, exposing more red lip.',
    bodyLocation: 'Upper Lip',
    medicalSpecialty: 'Dermatology',
    toolDescription:
      'Lip flip simulator modelling vermillion roll-out across dose (2-8 units) and weeks-since-injection. Calibrated to the subtle 10-15% visible change of real lip flips.',
    simulateSlug: 'lip-flip',
  },
  'hair-transplant': {
    procedureName: 'Hair Transplant (FUE/FUT/DHI)',
    shortName: 'Hair Transplant',
    description:
      'Surgical hair restoration procedure extracting follicles from the donor area and implanting them into thinning or bald areas using FUE, FUT, or DHI techniques.',
    bodyLocation: 'Scalp',
    medicalSpecialty: 'Dermatology / Hair Restoration Surgery',
    toolDescription:
      'Hair transplant simulator enabling hairline design, graft density adjustment, technique comparison (FUE/FUT/DHI), and 18-month growth timeline preview.',
    simulateSlug: 'hair-transplant',
  },
  'eyebrow-restoration': {
    procedureName: 'Eyebrow Restoration',
    shortName: 'Eyebrow Restoration',
    description:
      'Eyebrow restoration via follicular transplant or semi-permanent microblading to rebuild shape, density, and symmetry of eyebrows.',
    bodyLocation: 'Eyebrows',
    medicalSpecialty: 'Dermatology / Cosmetic Surgery',
    toolDescription:
      'Eyebrow restoration simulator comparing transplant vs microblading outcomes with shape design, density fill zones, and fade timeline preview.',
    simulateSlug: 'eyebrow-restoration',
  },
  'scalp-micropigmentation': {
    procedureName: 'Scalp Micropigmentation (SMP)',
    shortName: 'SMP',
    description:
      'Medical-grade micro-tattooing of the scalp using organic pigments to mimic hair follicles, creating the appearance of a buzzcut or adding density to thinning areas.',
    bodyLocation: 'Scalp',
    medicalSpecialty: 'Dermatology / Trichology',
    toolDescription:
      'Scalp micropigmentation simulator with Poisson-distributed dot patterns, progressive session density, and region painting for buzzcut look, density enhancement, and scar camouflage.',
    simulateSlug: 'scalp-micropigmentation',
  },
  'beard-transplant': {
    procedureName: 'Beard & Mustache Transplant',
    shortName: 'Beard Transplant',
    description:
      'FUE-based transplant of scalp follicles into the facial hair zone to create or enhance beard, mustache, and sideburn growth.',
    bodyLocation: 'Face (lower)',
    medicalSpecialty: 'Dermatology / Hair Restoration Surgery',
    toolDescription:
      'Beard transplant simulator with preset styles, zone-by-zone density control, growth direction rendering, and 18-month timeline preview.',
    simulateSlug: 'beard-transplant',
  },
  'hairline-lowering': {
    procedureName: 'Hairline Lowering (Forehead Reduction)',
    shortName: 'Hairline Lowering',
    description:
      'Surgical or transplant-based procedure to lower the hairline and reduce forehead height, especially popular in Korean aesthetic surgery.',
    bodyLocation: 'Forehead / Hairline',
    medicalSpecialty: 'Plastic Surgery / Hair Restoration',
    toolDescription:
      'Hairline lowering simulator showing forehead proportion changes with surgical advancement vs transplant grafting, Korean-style bell curve design, and measurement overlay.',
    simulateSlug: 'hairline-lowering',
  },

  // ─── Body contouring (surgical) ───────────────────────────────────────
  'breast-lift': {
    procedureName: 'Breast Lift (Mastopexy)',
    shortName: 'Breast Lift',
    description: 'Surgical reshaping of the breast to lift sagging tissue, raise the nipple-areolar complex, and improve shape without significantly changing volume.',
    bodyLocation: 'Breasts',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Mastopexy simulator previewing nipple repositioning, glandular reshaping, and skin envelope tightening across periareolar, vertical, and Wise-pattern techniques.',
    simulateSlug: 'breast-lift',
  },
  'breast-reduction': {
    procedureName: 'Breast Reduction (Reduction Mammoplasty)',
    shortName: 'Breast Reduction',
    description: 'Surgical removal of excess breast tissue, fat, and skin to reduce breast size, relieve physical symptoms, and improve body proportion.',
    bodyLocation: 'Breasts',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Reduction mammoplasty simulator modelling cup-size reduction across pedicle techniques and 0–6 month healing arc.',
    simulateSlug: 'breast-reduction',
  },
  'areola-reduction': {
    procedureName: 'Areola Reduction',
    shortName: 'Areola Reduction',
    description: 'Surgical reduction of the areolar diameter, often combined with breast lift or augmentation, to achieve more proportionate nipple appearance.',
    bodyLocation: 'Breasts',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Areola reduction simulator previewing diameter changes, scar position, and proportional balance with the breast.',
    simulateSlug: 'areola-reduction',
  },
  'mommy-makeover': {
    procedureName: 'Mommy Makeover',
    shortName: 'Mommy Makeover',
    description: 'Combined plastic-surgery package (typically tummy tuck + breast lift/augmentation + liposuction) addressing post-pregnancy body changes in one operative session.',
    bodyLocation: 'Abdomen, Breasts, Flanks',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Mommy makeover simulator visualising the combined effect of abdominal tightening, breast reshaping, and waist contouring.',
    simulateSlug: 'mommy-makeover',
  },
  'mini-tummy-tuck': {
    procedureName: 'Mini Tummy Tuck (Mini Abdominoplasty)',
    shortName: 'Mini Tummy Tuck',
    description: 'Limited abdominoplasty addressing only the lower abdomen below the navel: shorter scar, faster recovery, suited to mild laxity without diastasis.',
    bodyLocation: 'Lower Abdomen',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Mini tummy tuck simulator previewing lower-abdominal skin reduction with shorter horizontal scar than full abdominoplasty.',
    simulateSlug: 'mini-tummy-tuck',
  },
  'body-lift': {
    procedureName: 'Body Lift (Belt Lipectomy)',
    shortName: 'Body Lift',
    description: 'Circumferential abdominoplasty addressing excess skin around the entire torso after major weight loss. Combines tummy tuck, lateral thigh lift, and buttock lift.',
    bodyLocation: 'Torso (circumferential)',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Belt-lipectomy simulator modelling 360° torso skin reduction for post-bariatric and post-MWL patients.',
    simulateSlug: 'body-lift',
  },
  brachioplasty: {
    procedureName: 'Brachioplasty (Arm Lift)',
    shortName: 'Brachioplasty',
    description: 'Surgical removal of excess upper-arm skin and fat, most common after major weight loss. Standard incision runs medial upper arm from axilla to elbow.',
    bodyLocation: 'Upper Arms',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Brachioplasty simulator previewing arm contour change across limited (axillary), standard (axilla→elbow), and extended (+chest) scope.',
    simulateSlug: 'brachioplasty',
  },
  'thigh-lift': {
    procedureName: 'Thigh Lift (Thighplasty)',
    shortName: 'Thigh Lift',
    description: 'Surgical removal of excess thigh skin and fat to improve contour, typically after major weight loss. Approaches: medial, lateral, or vertical.',
    bodyLocation: 'Thighs',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Thighplasty simulator previewing thigh contour changes across medial, lateral, and vertical incision approaches.',
    simulateSlug: 'thigh-lift',
  },
  'buttock-implants': {
    procedureName: 'Buttock Implants (Gluteoplasty)',
    shortName: 'Buttock Implants',
    description: 'Augmentation of buttock projection and shape via solid silicone implants placed in the intramuscular or subfascial plane, alternative to BBL fat-transfer.',
    bodyLocation: 'Buttocks',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Gluteoplasty simulator previewing buttock projection and shape changes across implant size and placement plane.',
    simulateSlug: 'buttock-implants',
  },
  'calf-augmentation': {
    procedureName: 'Calf Augmentation',
    shortName: 'Calf Augmentation',
    description: 'Augmentation of calf muscle definition via silicone implants or fat grafting. Addresses congenitally small calves or post-injury asymmetry.',
    bodyLocation: 'Calves',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Calf augmentation simulator showing implant vs fat-transfer outcomes for muscle definition and proportion.',
    simulateSlug: 'calf-augmentation',
  },
  'gynecomastia-surgery': {
    procedureName: 'Gynecomastia Surgery (Male Breast Reduction)',
    shortName: 'Gynecomastia Surgery',
    description: 'Surgical correction of male breast enlargement via liposuction, glandular excision, or both, restoring a flatter, more masculine chest contour.',
    bodyLocation: 'Male Chest',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Male breast reduction simulator previewing chest flattening across liposuction-only, glandular excision, and combined techniques.',
    simulateSlug: 'gynecomastia-surgery',
  },
  labiaplasty: {
    procedureName: 'Labiaplasty',
    shortName: 'Labiaplasty',
    description: 'Surgical reshaping of the labia minora (and sometimes labia majora) to address asymmetry, hypertrophy, or functional discomfort.',
    bodyLocation: 'Vulva',
    medicalSpecialty: 'Plastic / Gynaecological Surgery',
    toolDescription: 'Labiaplasty simulator previewing labial contour changes across edge, wedge, and combined approaches with discreet anatomical rendering.',
    simulateSlug: 'labiaplasty',
  },
  'mons-pubis-lift': {
    procedureName: 'Mons Pubis Lift',
    shortName: 'Mons Pubis Lift',
    description: 'Surgical lifting and contouring of the mons pubis area, often combined with abdominoplasty after weight loss to address descent and excess skin.',
    bodyLocation: 'Mons Pubis',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Mons pubis lift simulator previewing the proportional improvement when combined with tummy tuck or as standalone procedure.',
    simulateSlug: 'mons-pubis-lift',
  },
  'vaginal-rejuvenation': {
    procedureName: 'Vaginal Rejuvenation',
    shortName: 'Vaginal Rejuvenation',
    description: 'Range of surgical and non-surgical procedures (laser, RF, surgical tightening) addressing vaginal laxity and post-childbirth changes.',
    bodyLocation: 'Vagina',
    medicalSpecialty: 'Gynaecological / Aesthetic Surgery',
    toolDescription: 'Vaginal rejuvenation educational simulator covering surgical and energy-based options. Discreet visual approach.',
    simulateSlug: 'vaginal-rejuvenation',
  },

  // ─── Body / wellness (non-surgical) ──────────────────────────────────
  aqualyx: {
    procedureName: 'Aqualyx Fat-Dissolving Injection',
    shortName: 'Aqualyx',
    description: 'Injectable deoxycholic acid solution that dissolves localised fat deposits, used on chin, jawline, abdomen, and inner thighs over multiple sessions.',
    bodyLocation: 'Localised Fat Deposits',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Aqualyx injection simulator previewing fat-deposit reduction across treatment sessions and timeline (6 weeks per session).',
    simulateSlug: 'aqualyx',
  },
  'cellulite-treatment': {
    procedureName: 'Cellulite Treatment',
    shortName: 'Cellulite Treatment',
    description: 'Range of treatments (RF, mechanical, subcision, injectables) addressing the dimpled appearance caused by fibrous septae pulling on subcutaneous fat.',
    bodyLocation: 'Thighs / Buttocks',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Cellulite treatment simulator previewing skin-surface smoothing across modalities (RF, subcision, Qwo-style injection).',
    simulateSlug: 'cellulite-treatment',
  },
  cryolipolysis: {
    procedureName: 'Cryolipolysis (CoolSculpting)',
    shortName: 'Cryolipolysis',
    description: 'Non-surgical fat reduction via controlled cooling that crystallises and destroys subcutaneous adipocytes; results emerge over 8–12 weeks.',
    bodyLocation: 'Localised Fat Deposits',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'CoolSculpting simulator previewing 20–25% fat reduction per treatment cycle across abdomen, flanks, thighs, and submentum.',
    simulateSlug: 'cryolipolysis',
  },
  emsculpt: {
    procedureName: 'EMSculpt (HIFEM Body Contouring)',
    shortName: 'EMSculpt',
    description: 'Non-invasive body contouring using HIFEM (high-intensity focused electromagnetic) technology that triggers supramaximal muscle contractions for muscle building + fat reduction.',
    bodyLocation: 'Abdomen / Buttocks / Limbs',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'EMSculpt simulator previewing muscle definition + fat reduction across the standard 4-session protocol.',
    simulateSlug: 'emsculpt',
  },
  'glutathione-injection': {
    procedureName: 'Glutathione Skin-Brightening Injection',
    shortName: 'Glutathione Injection',
    description: 'IV glutathione protocol used for skin brightening by inhibiting tyrosinase and reducing eumelanin production. Off-label aesthetic use.',
    bodyLocation: 'Whole Body Skin',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Glutathione injection simulator previewing skin-tone evening across treatment course (8–12 sessions).',
    simulateSlug: 'glutathione-injection',
  },
  'hyperhidrosis-botox': {
    procedureName: 'Botox for Hyperhidrosis (Excessive Sweating)',
    shortName: 'Hyperhidrosis Botox',
    description: 'Off-label Botox use for axillary, palmar, or plantar hyperhidrosis. Blocks acetylcholine release at sweat glands, providing 4–6 months of dryness.',
    bodyLocation: 'Axillae / Palms / Soles',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Hyperhidrosis Botox simulator focused on patient education: sweat-reduction durability across treatment zones and timeline. Visual change is intentionally minimal.',
    simulateSlug: 'hyperhidrosis-botox',
  },
  mesotherapy: {
    procedureName: 'Mesotherapy',
    shortName: 'Mesotherapy',
    description: 'Multi-puncture intradermal injection of vitamins, hyaluronic acid, and amino acids for skin hydration, fat reduction, or hair restoration.',
    bodyLocation: 'Face / Scalp / Body',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Mesotherapy simulator previewing skin texture and tone improvement across face, scalp, and body protocols.',
    simulateSlug: 'mesotherapy',
  },
  'stretch-mark-treatment': {
    procedureName: 'Stretch Mark Treatment',
    shortName: 'Stretch Mark Treatment',
    description: 'Combined treatments (laser, microneedling, RF, topical retinoids) addressing striae rubrae and striae albae from rapid skin stretching.',
    bodyLocation: 'Abdomen / Thighs / Arms',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Stretch mark treatment simulator previewing fading and texture improvement across red (rubrae) and white (albae) striae.',
    simulateSlug: 'stretch-mark-treatment',
  },
  'laser-hair-removal': {
    procedureName: 'Laser Hair Removal',
    shortName: 'Laser Hair Removal',
    description: 'Selective photothermolysis using diode, Nd:YAG, or alexandrite lasers to permanently reduce hair growth in target follicles.',
    bodyLocation: 'Face / Body',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Laser hair removal simulator previewing hair reduction across treatment sessions and Fitzpatrick skin types.',
    simulateSlug: 'laser-hair-removal',
  },
  'co2-laser': {
    procedureName: 'CO2 Laser Resurfacing (Fractional)',
    shortName: 'CO2 Laser',
    description: 'Ablative fractional CO2 laser (10,600 nm) creating microcolumns of controlled tissue ablation for skin resurfacing. Addresses scars, wrinkles, and pigmentation.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Fractional CO2 simulator previewing day-3 redness through month-12 mature result across density (10-70%) and Fitzpatrick types I-VI.',
    simulateSlug: 'co2-laser',
  },

  // ─── Face — surgical / oculofacial ────────────────────────────────────
  'cheek-implants': {
    procedureName: 'Cheek Implants (Malar Augmentation)',
    shortName: 'Cheek Implants',
    description: 'Surgical augmentation of the malar/zygomatic region using silicone, porous polyethylene, or Goretex implants to enhance midface projection.',
    bodyLocation: 'Cheeks / Malar Region',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Malar augmentation simulator previewing cheekbone projection across implant size, shape, and placement (malar, submalar, combined).',
    simulateSlug: 'cheek-implants',
  },
  otoplasty: {
    procedureName: 'Otoplasty (Ear Surgery)',
    shortName: 'Otoplasty',
    description: 'Surgical correction of prominent or misshapen ears via cartilage scoring, suturing, or excision; most commonly performed in childhood.',
    bodyLocation: 'Ears',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Otoplasty simulator previewing ear pinning and reshaping across Mustardé and Furnas suture techniques.',
    simulateSlug: 'otoplasty',
  },
  septoplasty: {
    procedureName: 'Septoplasty (Functional Nose Surgery)',
    shortName: 'Septoplasty',
    description: 'Functional surgery to straighten a deviated nasal septum. Improves breathing without significant external nasal change. Often combined with rhinoplasty as septorhinoplasty.',
    bodyLocation: 'Nasal Septum',
    medicalSpecialty: 'ENT / Plastic Surgery',
    toolDescription: 'Septoplasty patient-education simulator. External appearance changes are intentionally minimal; primary value is breathing improvement.',
    simulateSlug: 'septoplasty',
  },
  'neck-lift': {
    procedureName: 'Neck Lift (Cervicoplasty / Platysmaplasty)',
    shortName: 'Neck Lift',
    description: 'Surgical correction of submental fullness, platysmal banding, and jawline laxity, often combined with facelift or as a standalone for isolated neck aging.',
    bodyLocation: 'Neck / Submentum',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Neck lift simulator previewing jawline definition and submental contour across techniques (lipo-only, cervicoplasty, full neck lift, deep neck lift).',
    simulateSlug: 'neck-lift',
  },
  'forehead-reduction': {
    procedureName: 'Forehead Reduction (Hairline Lowering Surgery)',
    shortName: 'Forehead Reduction',
    description: 'Surgical advancement of the hairline by 1–2 cm via pretrichial trichophytic incision, for patients with high natural hairlines.',
    bodyLocation: 'Forehead',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Forehead reduction simulator previewing hairline advancement (1.0–2.5 cm) and scar maturation across the 12-month healing arc.',
    simulateSlug: 'forehead-reduction',
  },
  dimpleplasty: {
    procedureName: 'Dimpleplasty',
    shortName: 'Dimpleplasty',
    description: 'Surgical creation of cheek dimples via intraoral suture fixation between the buccinator muscle and the dermis.',
    bodyLocation: 'Cheeks',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Dimpleplasty simulator previewing dimple visibility at rest vs smile across position and depth options.',
    simulateSlug: 'dimpleplasty',
  },
  'mid-facelift': {
    procedureName: 'Mid-Facelift',
    shortName: 'Mid-Facelift',
    description: 'Targeted SMAS lift focused on the mid-face: cheek fat pad, malar region, nasolabial folds, tear troughs. Distinct from full facelift (no jowl/neck work).',
    bodyLocation: 'Mid-Face',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'Mid-facelift simulator previewing cheek elevation, nasolabial reduction, tear-trough fill, and smile-line softening across approach and timeline.',
    simulateSlug: 'mid-facelift',
  },
  'earlobe-repair': {
    procedureName: 'Earlobe Repair',
    shortName: 'Earlobe Repair',
    description: 'Surgical repair of split, stretched, or torn earlobes from heavy earrings, plugs, or trauma. Quick outpatient procedure under local anaesthesia.',
    bodyLocation: 'Earlobes',
    medicalSpecialty: 'Plastic Surgery / Dermatology',
    toolDescription: 'Earlobe repair simulator previewing the closure result for split, stretched, or gauge-stretched earlobes.',
    simulateSlug: 'earlobe-repair',
  },
  'v-line-contouring': {
    procedureName: 'V-Line Contouring (Jaw Reduction)',
    shortName: 'V-Line Contouring',
    description: 'Surgical or non-surgical (botox/filler) reshaping of the jaw and chin to achieve a tapered V-shaped lower face, popular in Korean aesthetic surgery.',
    bodyLocation: 'Jaw / Chin',
    medicalSpecialty: 'Plastic Surgery',
    toolDescription: 'V-line simulator previewing jaw narrowing, chin taper, and mandibular angle reduction across surgical and injectable options.',
    simulateSlug: 'v-line-contouring',
  },

  // ─── Face — non-surgical / aesthetic ──────────────────────────────────
  profhilo: {
    procedureName: 'Profhilo (Bio-Remodelling Injection)',
    shortName: 'Profhilo',
    description: 'Stabilised hyaluronic-acid bio-remodeller injected at 5 BAP points per side to stimulate collagen, elastin, and skin hydration without volumising.',
    bodyLocation: 'Face / Neck / Hands',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Profhilo simulator previewing skin firmness and texture improvement over the 2-session protocol (4 weeks apart) and 6-month durability.',
    simulateSlug: 'profhilo',
  },
  sculptra: {
    procedureName: 'Sculptra (Poly-L-Lactic Acid Filler)',
    shortName: 'Sculptra',
    description: 'Bio-stimulator injectable using poly-L-lactic acid microparticles to gradually stimulate collagen production over 6–24 months.',
    bodyLocation: 'Face / Body',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Sculptra simulator previewing gradual volume restoration and collagen-stimulated improvement across the 6-month reveal period.',
    simulateSlug: 'sculptra',
  },
  radiesse: {
    procedureName: 'Radiesse (Calcium Hydroxylapatite Filler)',
    shortName: 'Radiesse',
    description: 'Calcium hydroxylapatite-based filler providing both immediate volume and long-term collagen stimulation. Used for jaw, cheeks, and hands.',
    bodyLocation: 'Jaw / Cheeks / Hands',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Radiesse simulator previewing structural lift and contour for jaw definition, cheek projection, and hand rejuvenation.',
    simulateSlug: 'radiesse',
  },
  'masseter-botox': {
    procedureName: 'Masseter Botox (Jaw Slimming)',
    shortName: 'Masseter Botox',
    description: 'Botox injection into the masseter muscle to reduce hypertrophy. Produces a slimmer lower face contour and treats bruxism. Popular in East Asia.',
    bodyLocation: 'Lower Jaw',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Masseter Botox simulator previewing jaw slimming and V-line emphasis across dose, sessions completed, and baseline muscle bulk.',
    simulateSlug: 'masseter-botox',
  },
  kybella: {
    procedureName: 'Kybella (Submental Fat Dissolving)',
    shortName: 'Kybella',
    description: 'FDA-approved deoxycholic acid injectable that destroys submental fat cells (double chin) over 2–4 sessions spaced 4–6 weeks apart.',
    bodyLocation: 'Submentum / Chin',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Kybella simulator previewing submental fat reduction across treatment sessions and recovery timeline.',
    simulateSlug: 'kybella',
  },
  'lip-fillers': {
    procedureName: 'Lip Fillers',
    shortName: 'Lip Fillers',
    description: 'Hyaluronic-acid filler injection into the lips for volume, shape, projection, and definition. Marketing alias for lip-augmentation.',
    bodyLocation: 'Lips',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Lip filler simulator with 6 controls (upper/lower volume, projection, cupid\'s bow, width, and symmetry) calibrated to clinical ml dosing.',
    simulateSlug: 'lip-fillers',
  },

  // ─── Skin / texture (non-surgical) ────────────────────────────────────
  hydrafacial: {
    procedureName: 'HydraFacial',
    shortName: 'HydraFacial',
    description: 'Multi-step facial treatment combining cleansing, exfoliation, extraction, and hydration via patented vortex tip, no downtime.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'HydraFacial simulator previewing skin clarity, texture, and tone improvement immediately post-treatment.',
    simulateSlug: 'hydrafacial',
  },
  dermaplaning: {
    procedureName: 'Dermaplaning',
    shortName: 'Dermaplaning',
    description: 'Manual exfoliation using a sterile surgical blade to remove dead skin cells and vellus hair (peach fuzz): instant smoothness, brighter skin.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Dermaplaning simulator previewing immediate post-treatment smoothness and brightness.',
    simulateSlug: 'dermaplaning',
  },
  'prp-facial': {
    procedureName: 'PRP Facial (Vampire Facial)',
    shortName: 'PRP Facial',
    description: 'Microneedling combined with topical platelet-rich plasma derived from the patient\'s own blood. Stimulates collagen, improves texture and tone.',
    bodyLocation: 'Face',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'PRP facial simulator previewing texture, tone, and pore-size improvement across the 4–6 week reveal period.',
    simulateSlug: 'prp-facial',
  },
  microneedling: {
    procedureName: 'Microneedling (Collagen Induction Therapy)',
    shortName: 'Microneedling',
    description: 'Mechanical dermal stimulation using fine needles to trigger collagen production. Addresses scars, fine lines, and texture.',
    bodyLocation: 'Face / Body',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Microneedling simulator previewing texture improvement across needle depth, sessions completed, and skin type.',
    simulateSlug: 'microneedling',
  },
  'rf-microneedling': {
    procedureName: 'RF Microneedling (Morpheus8 / Genius RF)',
    shortName: 'RF Microneedling',
    description: 'Combined microneedling + radiofrequency energy delivery for deeper collagen stimulation, skin tightening, and acne-scar revision.',
    bodyLocation: 'Face / Neck / Body',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'RF microneedling simulator previewing skin-tightening and texture outcomes for Morpheus8/Genius RF protocols.',
    simulateSlug: 'rf-microneedling',
  },
  'ipl-photofacial': {
    procedureName: 'IPL Photofacial (Intense Pulsed Light)',
    shortName: 'IPL Photofacial',
    description: 'Broad-spectrum light therapy targeting pigmentation, redness, vascular lesions, and sun damage without ablating the skin surface.',
    bodyLocation: 'Face / Décolletage / Hands',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'IPL photofacial simulator previewing pigmentation and redness reduction across sessions and Fitzpatrick types.',
    simulateSlug: 'ipl-photofacial',
  },
  hifu: {
    procedureName: 'HIFU (High-Intensity Focused Ultrasound)',
    shortName: 'HIFU',
    description: 'Non-surgical skin tightening via focused ultrasound that creates thermal coagulation points in the SMAS layer, gradual lift over 2–6 months.',
    bodyLocation: 'Face / Neck / Body',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'HIFU simulator previewing skin tightening and lifting outcomes across Ultherapy and similar focused-ultrasound protocols.',
    simulateSlug: 'hifu',
  },
  'plasma-fibroblast': {
    procedureName: 'Plasma Fibroblast (Plasma Pen)',
    shortName: 'Plasma Fibroblast',
    description: 'Skin-tightening procedure using ionised gas (plasma) to create micro-injuries that trigger collagen contraction, popular alternative to blepharoplasty.',
    bodyLocation: 'Eyelids / Face / Neck',
    medicalSpecialty: 'Aesthetic Medicine',
    toolDescription: 'Plasma fibroblast simulator previewing skin-tightening outcomes for upper-lid hooding, neck laxity, and fine lines.',
    simulateSlug: 'plasma-fibroblast',
  },
  microblading: {
    procedureName: 'Microblading (Eyebrow Cosmetic Tattooing)',
    shortName: 'Microblading',
    description: 'Semi-permanent cosmetic tattooing technique creating hair-like strokes in the eyebrow area for fuller, defined brow shape.',
    bodyLocation: 'Eyebrows',
    medicalSpecialty: 'Aesthetic / Cosmetic',
    toolDescription: 'Microblading simulator previewing brow shape, density, and color across stroke patterns and pigment shades.',
    simulateSlug: 'microblading',
  },
  'lip-blush-tattoo': {
    procedureName: 'Lip Blush Tattoo',
    shortName: 'Lip Blush Tattoo',
    description: 'Semi-permanent cosmetic tattooing of the lips that adds soft color, enhances shape, and corrects asymmetry. Lasts 1–3 years.',
    bodyLocation: 'Lips',
    medicalSpecialty: 'Aesthetic / Cosmetic',
    toolDescription: 'Lip blush simulator previewing color, shape, and definition outcomes across saturation levels.',
    simulateSlug: 'lip-blush-tattoo',
  },
  'eyelash-extensions': {
    procedureName: 'Eyelash Extensions',
    shortName: 'Eyelash Extensions',
    description: 'Cosmetic application of synthetic or natural fibre lashes attached individually to natural eyelashes for length and volume.',
    bodyLocation: 'Eyelashes',
    medicalSpecialty: 'Aesthetic / Cosmetic',
    toolDescription: 'Eyelash extensions simulator previewing length, volume, and curl style across classic, hybrid, and volume sets.',
    simulateSlug: 'eyelash-extensions',
  },

  // ─── Spot / removal procedures ────────────────────────────────────────
  'mole-removal': {
    procedureName: 'Mole Removal',
    shortName: 'Mole Removal',
    description: 'Surgical excision, shave excision, or laser removal of moles for cosmetic or medical (suspicious lesion) reasons.',
    bodyLocation: 'Skin (any)',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Mole removal simulator previewing post-excision appearance and scar maturation across techniques.',
    simulateSlug: 'mole-removal',
  },
  'tattoo-removal': {
    procedureName: 'Laser Tattoo Removal',
    shortName: 'Tattoo Removal',
    description: 'Q-switched or pico laser treatment that fragments tattoo ink for clearance over multiple sessions. Varies by ink color and density.',
    bodyLocation: 'Skin (any)',
    medicalSpecialty: 'Dermatology',
    toolDescription: 'Tattoo removal simulator previewing fading across laser sessions, ink color, and Fitzpatrick skin type.',
    simulateSlug: 'tattoo-removal',
  },
  'scar-revision': {
    procedureName: 'Scar Revision',
    shortName: 'Scar Revision',
    description: 'Combined surgical, laser, and topical treatments to improve the appearance of hypertrophic, atrophic, or contracted scars.',
    bodyLocation: 'Skin (any)',
    medicalSpecialty: 'Dermatology / Plastic Surgery',
    toolDescription: 'Scar revision simulator previewing improvement across surgical excision, laser, microneedling, and steroid-injection approaches.',
    simulateSlug: 'scar-revision',
  },

  // ─── Hair restoration (additional) ────────────────────────────────────
  'dhi-hair-transplant': {
    procedureName: 'DHI Hair Transplant (Direct Hair Implantation)',
    shortName: 'DHI Hair Transplant',
    description: 'Hair restoration technique using a Choi pen for direct follicular implantation without prior recipient-site incisions: denser packing, faster recovery.',
    bodyLocation: 'Scalp',
    medicalSpecialty: 'Hair Restoration Surgery',
    toolDescription: 'DHI hair transplant simulator previewing density, hairline shape, and 12-month growth across Norwood stages.',
    simulateSlug: 'dhi-hair-transplant',
  },
  'prp-hair': {
    procedureName: 'PRP for Hair Loss (Platelet-Rich Plasma)',
    shortName: 'PRP for Hair Loss',
    description: 'Injection of patient-derived platelet-rich plasma into the scalp to stimulate dormant follicles and slow androgenetic alopecia.',
    bodyLocation: 'Scalp',
    medicalSpecialty: 'Dermatology / Hair Restoration',
    toolDescription: 'PRP for hair loss simulator previewing density and coverage improvement across sessions and Norwood stages.',
    simulateSlug: 'prp-hair',
  },

  // ─── Dental aesthetics ────────────────────────────────────────────────
  'dental-implants': {
    procedureName: 'Dental Implants',
    shortName: 'Dental Implants',
    description: 'Surgical placement of titanium implants in the jawbone to support crowns, bridges, or dentures, replacement for missing teeth.',
    bodyLocation: 'Mouth / Jaw',
    medicalSpecialty: 'Implant Dentistry',
    toolDescription: 'Dental implant simulator previewing tooth replacement and smile restoration across single, multi-tooth, and full-arch protocols.',
    simulateSlug: 'dental-implants',
  },
  invisalign: {
    procedureName: 'Invisalign (Clear Aligner Therapy)',
    shortName: 'Invisalign',
    description: 'Series of removable clear aligners that progressively reposition teeth, alternative to traditional braces for mild-to-moderate malocclusion.',
    bodyLocation: 'Teeth',
    medicalSpecialty: 'Orthodontics',
    toolDescription: 'Clear aligner simulator previewing tooth alignment progress across the 9–18 month treatment timeline.',
    simulateSlug: 'invisalign',
  },
  'gum-contouring': {
    procedureName: 'Gum Contouring (Gingivectomy)',
    shortName: 'Gum Contouring',
    description: 'Reshaping of the gum line via laser or scalpel. Corrects gummy smiles, asymmetric gums, or overly receded gum tissue.',
    bodyLocation: 'Gums',
    medicalSpecialty: 'Periodontics / Cosmetic Dentistry',
    toolDescription: 'Gum contouring simulator previewing gum-line reshaping for gummy smile correction and proportional smile design.',
    simulateSlug: 'gum-contouring',
  },
};
