// ---------------------------------------------------------------------------
// Procedure Registry — Single Source of Truth
// Used by BOTH /procedures pages (educational) and /simulate pages (tools)
// ---------------------------------------------------------------------------

export type ProcedureCategoryKey = 'surgical' | 'non-surgical' | 'injectable' | 'dental' | 'body-contouring' | 'hair-restoration';

export interface ProcedureCategory {
    key: ProcedureCategoryKey;
    /** English fallback label — prefer `labelKey` with `useTranslations("procedureCategories")` in components */
    label: string;
    /** i18n key: use with `useTranslations("procedureCategories")(category.key)` */
    labelKey: string;
    icon: string;
}

export const PROCEDURE_CATEGORIES: ProcedureCategory[] = [
    { key: 'surgical', label: 'Surgical', labelKey: 'surgical', icon: '\u{1FA78}' },
    { key: 'non-surgical', label: 'Non-Surgical', labelKey: 'non-surgical', icon: '\u2728' },
    { key: 'injectable', label: 'Injectable', labelKey: 'injectable', icon: '\u{1F489}' },
    { key: 'dental', label: 'Dental Aesthetics', labelKey: 'dental', icon: '\u{1F9B7}' },
    { key: 'body-contouring', label: 'Body Contouring', labelKey: 'body-contouring', icon: '\u{1F4AA}' },
    { key: 'hair-restoration', label: 'Hair Restoration', labelKey: 'hair-restoration', icon: '\u{1F487}' },
];

// ============================================================
// REGION PRICING TYPES
// ============================================================

export type Region = 'us' | 'thailand' | 'south-korea' | 'india' | 'singapore';

export interface RegionInfo {
    id: Region;
    name: string;
    flag: string;
    currency: string;
    currencySymbol: string;
}

export const REGIONS: Record<Region, RegionInfo> = {
    us: { id: 'us', name: 'United States', flag: '\u{1F1FA}\u{1F1F8}', currency: 'USD', currencySymbol: '$' },
    thailand: { id: 'thailand', name: 'Thailand', flag: '\u{1F1F9}\u{1F1ED}', currency: 'USD', currencySymbol: '$' },
    'south-korea': { id: 'south-korea', name: 'South Korea', flag: '\u{1F1F0}\u{1F1F7}', currency: 'USD', currencySymbol: '$' },
    india: { id: 'india', name: 'India', flag: '\u{1F1EE}\u{1F1F3}', currency: 'USD', currencySymbol: '$' },
    singapore: { id: 'singapore', name: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}', currency: 'USD', currencySymbol: '$' },
};

// All prices in USD for consistency — converted from local currencies at 2025 rates
// Thailand: 1 USD ≈ 34 THB | South Korea: 1 USD ≈ 1,350 KRW | India: 1 USD ≈ 85 INR | Singapore: 1 USD ≈ 1.35 SGD

export interface PriceRange {
    min: number;
    max: number;
}

export type RegionalPricing = Record<Region, PriceRange>;

export const DEFAULT_REGION: Region = 'us';

// ============================================================
// PROCEDURE TYPES
// ============================================================

export interface Procedure {
    slug: string;
    name: string;
    shortName: string;
    category: ProcedureCategoryKey;
    categoryLabel: string;
    simulatorType: '2d' | '3d' | 'hybrid';
    description: string;
    longDescription: string;
    benefits: string[];
    pros: string[];
    cons: string[];
    idealFor: string;
    recoveryTime: string;
    procedureDuration: string;
    costRange: string;
    pricing: RegionalPricing;
    icon: string;
    isNew?: boolean;
    comingSoon?: boolean;
    order: number;
    /** Slug used in the /simulate/ route (may differ from procedure slug) */
    simulateSlug: string;
    /** Popularity indicator for UI badges — drives user engagement */
    popularity?: 'high' | 'medium' | 'low';
    /**
     * Marks a simulator as production-ready for surgeons + patients to
     * pay for. Drives:
     *   - whether ClinicDeal.create accepts this procedureSlug
     *   - whether the procedure surfaces in the public deals marketplace
     *   - whether the day-pass checkout shows the procedure
     *
     * Default: undefined → treated as TRUE (backward-compat — every sim
     * that's been through the QA sweep is sale-ready unless explicitly
     * flagged otherwise). Set to FALSE for sims that pass the smoke
     * test but haven't been clinically polished. Updated via
     * /admin/procedures or by editing this file.
     */
    saleReady?: boolean;
    /**
     * Quality tier for marketing and UX focus.
     * A = flagship (full-quality, no SimplifiedModeBanner)
     * B = working simulator, SimplifiedModeBanner OK (default if unset)
     * C = no real simulation — show info + waitlist + deals
     */
    tier?: 'A' | 'B' | 'C';
    /**
     * Per-market regulatory gating. When unset, the procedure is sale-
     * ready in every market where saleReady allows. When set, only
     * countries in this list (ISO 3166-1 alpha-2) can list this
     * procedure for paid offerings.
     *
     * Used for procedures that are commonly marketed in some markets
     * but flagged off-label / restricted elsewhere (e.g. glutathione-
     * injection: TH/IN/PH/VN OK, US/EU restricted).
     */
    marketsAllowed?: string[];
}

export const PROCEDURES: Procedure[] = [
    // ─── Surgical (1-7) ───────────────────────────────────────────────
    {
        slug: 'rhinoplasty',
        name: 'Rhinoplasty (Nose Reshaping)',
        shortName: 'Rhinoplasty',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Nose reshaping simulation with tip rotation, dorsal height, alar base parameters, and 468-point anatomical mesh accuracy.',
        longDescription: `Rhinoplasty is one of the most requested facial plastic surgery procedures worldwide. It addresses both aesthetic concerns — such as dorsal humps, bulbous tips, and asymmetry — and functional issues like a deviated septum or impaired nasal airflow.

Modern rhinoplasty techniques range from open approaches (with a small external incision) to closed approaches (entirely through the nostrils). Your surgeon selects the approach based on the degree of change needed and the complexity of the nasal anatomy.

Faceify Labs' simulation uses a 468-point facial mesh to model tip projection, rotation, dorsal height reduction, and alar base narrowing while preserving the patient's unique ethnic features and structural proportions. The simulation accounts for skin thickness, cartilage elasticity, and underlying bone structure to deliver clinically realistic previews.`,
        benefits: [
            'Correct dorsal humps, bulbous tips, and asymmetry',
            'Improve nasal airway function alongside aesthetics',
            'Maintain ethnic identity and natural facial harmony',
            'Results visible as swelling resolves over 6-12 months',
            'One of the highest patient satisfaction rates in facial surgery',
        ],
        pros: [
            'Permanent results that enhance facial balance and harmony',
            'Can improve both appearance and breathing function simultaneously',
            'Addresses a wide range of concerns: bridge, tip, nostrils, asymmetry',
            'One of the most well-studied cosmetic procedures with decades of safety data',
            'High patient satisfaction rates among facial surgeries',
        ],
        cons: [
            'Full results take 6–12 months to appear due to prolonged swelling',
            'Revision surgery needed in 5–15% of cases',
            'Recovery involves weeks of visible swelling, bruising, and splints',
            'Risks include infection, numbness, scarring, and asymmetry',
            'Not covered by insurance for cosmetic purposes',
        ],
        idealFor: 'Patients who want to improve the shape, size, or proportions of their nose, or correct breathing difficulties caused by structural defects.',
        recoveryTime: '7-10 days (splint removal), 2-4 weeks (swelling subsides)',
        procedureDuration: '1.5-3 hours',
        costRange: '$5,000 - $15,000',
        pricing: {
            us: { min: 5000, max: 15000 },
            thailand: { min: 2000, max: 5500 },
            'south-korea': { min: 3000, max: 9000 },
            india: { min: 900, max: 2400 },
            singapore: { min: 5200, max: 11100 },
        },
        icon: '\u{1F443}',
        order: 1,
        simulateSlug: 'rhinoplasty',
        tier: 'A',
        popularity: 'high',
    },
    {
        slug: 'chin-augmentation',
        name: 'Chin Augmentation',
        shortName: 'Chin Augmentation',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Chin projection, height, and width adjustment using Goode\'s ratio constraints and Ricketts E-line profile balancing.',
        longDescription: `Chin augmentation — also called genioplasty or mentoplasty — improves facial balance by increasing chin projection, adjusting vertical height, or correcting asymmetry. It is frequently combined with rhinoplasty to achieve overall profile harmony.

Two main approaches exist: silicone or porous polyethylene implants placed through a small incision inside the mouth or beneath the chin, and sliding genioplasty where the chin bone itself is repositioned. Your surgeon will recommend the most suitable approach based on your anatomy and aesthetic goals.

Our simulator models chin projection, vertical positioning, and lateral width using Goode's ratio and the Ricketts E-line as reference standards, ensuring proportionally balanced results that complement the rest of the face.`,
        benefits: [
            'Improve facial profile balance and harmony',
            'Correct a receding or weak chin',
            'Enhance jawline definition',
            'Can be combined with rhinoplasty for comprehensive profile correction',
        ],
        pros: [
            'Creates better facial balance and profile definition',
            'Implants can be customized to match your unique facial structure',
            'Results are long-lasting and become permanent',
            'Relatively quick outpatient procedure with manageable recovery',
            'Non-surgical filler alternatives exist for testing the look first',
        ],
        cons: [
            'Implants may shift position over time, requiring revision',
            'Risk of nerve damage leading to chin or lower lip numbness',
            'Non-surgical alternatives are temporary and need ongoing maintenance',
            'Bone erosion beneath the implant can occur over many years',
            'Recovery involves numbness for up to 3 months and swelling for weeks',
        ],
        idealFor: 'Patients with a receding chin, weak profile, or facial asymmetry who desire improved balance between nose, chin, and neck.',
        recoveryTime: '7-10 days',
        procedureDuration: '1-2 hours',
        costRange: '$5,000 - $10,000',
        pricing: {
            us: { min: 3000, max: 8000 },
            thailand: { min: 1500, max: 4000 },
            'south-korea': { min: 2000, max: 6000 },
            india: { min: 1200, max: 3000 },
            singapore: { min: 4000, max: 9000 },
        },
        icon: '\u{1F9D1}',
        order: 2,
        simulateSlug: 'chin-augmentation',
        tier: 'A',
        popularity: 'medium',
    },
    {
        slug: 'v-line-contouring',
        name: 'V-Line / Jaw Contouring',
        shortName: 'V-Line Contouring',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Jaw narrowing, chin reshaping, cheekbone and masseter reduction for refined V-line facial profile with safety-rule engine.',
        longDescription: `V-line jaw contouring is a facial bone surgery that reshapes the lower face into a slimmer, more tapered "V" shape. It is particularly popular in East Asian aesthetic surgery and involves mandibular angle reduction, chin tapering, and sometimes cheekbone reduction.

The procedure is performed under general anesthesia through intraoral incisions, leaving no visible external scars. Surgeons may use oscillating saws, burrs, or piezoelectric tools to precisely reshape the bone while preserving the inferior alveolar nerve.

Our simulation models mandibular angle reduction, bigonial width narrowing, chin point reshaping, and masseter volume changes. A built-in safety-rule engine prevents unrealistic modifications that could compromise facial nerve integrity or occlusion.`,
        benefits: [
            'Achieve a refined, slimmer facial profile',
            'Reduce prominent jaw angles and wide lower face',
            'No visible external scars (intraoral approach)',
            'Long-lasting bone-level results',
            'Improved facial symmetry',
        ],
        pros: [
            'Creates a slimmer, more defined V-shaped facial contour permanently',
            'All incisions inside the mouth — no visible external scars',
            'Can dramatically improve facial proportions and symmetry',
            'Results are permanent once bone is reshaped',
            'Effective for square jaws that resist non-surgical treatments',
        ],
        cons: [
            'Major surgery with risk of inferior alveolar nerve damage causing numbness',
            'Removing jawbone can worsen facial sagging as you age',
            'Demanding recovery: compression garments, liquid diet, 7–10 days off work',
            'Risk of jaw fracture, TMJ pain, bite changes, and asymmetry',
            'Expensive and irreversible procedure',
        ],
        idealFor: 'Patients with a wide, square, or heavy lower face who desire a more tapered, V-shaped facial contour.',
        recoveryTime: '2-4 weeks (major swelling), 3-6 months (final result)',
        procedureDuration: '2-4 hours',
        costRange: '$8,000 - $15,000',
        pricing: {
            us: { min: 8000, max: 20000 },
            thailand: { min: 4000, max: 9000 },
            'south-korea': { min: 7000, max: 15000 },
            india: { min: 3000, max: 7000 },
            singapore: { min: 8000, max: 18000 },
        },
        icon: '\u{1F48E}',
        order: 3,
        simulateSlug: 'facial-contouring',
    },
    {
        slug: 'buccal-fat-removal',
        name: 'Buccal Fat Removal',
        shortName: 'Buccal Fat Removal',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Cheek slimming with buccal fat pad reduction, hollowing depth control, and identity-preserving symmetry correction.',
        longDescription: `Buccal fat removal is a minimally invasive procedure that reduces fullness in the lower cheeks by extracting the buccal fat pads — walnut-sized fat deposits located between the cheekbone and jawbone. The result is a more sculpted, contoured midface.

The procedure is performed through small incisions inside the mouth (no external scars). It typically takes 30-60 minutes under local anesthesia. Results become fully apparent as post-operative swelling resolves over several weeks.

Our simulator visualizes the degree of cheek hollowing while preserving the patient's natural identity. It accounts for facial fat distribution, skin elasticity, and bone structure to prevent over-reduction that could lead to a gaunt appearance with aging.`,
        benefits: [
            'Sculpt a more defined midface contour',
            'Reduce round or "chubby" cheek appearance',
            'Quick procedure with minimal downtime',
            'No visible scars (intraoral incisions)',
        ],
        pros: [
            'Creates slimmer, more defined cheekbones and jawline permanently',
            'No visible scars — incisions are inside the mouth',
            'Quick recovery of 3–5 days with minimal pain',
            'Short procedure time with minimal downtime',
        ],
        cons: [
            'Removing fat pads can cause premature hollowness by your 40s',
            'Completely irreversible — removed fat cannot be replaced',
            '~15% of patients seek corrective fat grafting within 5 years',
            'Not suitable for naturally thin faces or those who may lose volume with age',
            '25% complication rate including edema, jaw stiffness, and persistent pain',
        ],
        idealFor: 'Patients with full or round cheeks who want a more sculpted, contoured facial appearance, particularly in the midface region.',
        recoveryTime: '3-5 days (return to work), 4-6 weeks (final result)',
        procedureDuration: '30-60 minutes',
        costRange: '$3,000 - $7,000',
        pricing: {
            us: { min: 2000, max: 5000 },
            thailand: { min: 1000, max: 2500 },
            'south-korea': { min: 1500, max: 4000 },
            india: { min: 700, max: 1800 },
            singapore: { min: 2500, max: 6000 },
        },
        icon: '\u{1F48E}',
        order: 4,
        simulateSlug: 'buccal-fat-removal',
    },
    {
        slug: 'blepharoplasty',
        name: 'Blepharoplasty (Double Eyelid)',
        shortName: 'Blepharoplasty',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Upper and lower eyelid surgery preview with crease height, epicanthoplasty, lateral canthoplasty, and 5 ethnic presets.',
        longDescription: `Blepharoplasty is eyelid surgery that addresses excess skin, puffiness, and drooping of the upper and/or lower eyelids. In Asian blepharoplasty (double eyelid surgery), it creates or enhances the supratarsal crease for a more defined eyelid fold.

Techniques include incisional (for permanent results with precise crease placement), suture-based (less invasive but best suited for younger patients with thin skin), and lower blepharoplasty (transconjunctival or transcutaneous approaches for under-eye bags).

Our simulator models palpebral fissure height, supratarsal crease positioning, canthal tilt, epicanthal fold modification, and fat pad repositioning. It includes 5 ethnic presets to ensure culturally appropriate aesthetic outcomes that respect each patient's heritage.`,
        benefits: [
            'Restore a youthful, refreshed eye appearance',
            'Create or enhance the double eyelid fold',
            'Improve peripheral vision blocked by drooping lids',
            'Address under-eye bags and puffiness',
            'Ethnically sensitive simulation with 5 presets',
        ],
        pros: [
            'Makes eyes appear more open, youthful, and alert',
            'Can correct impaired vision caused by sagging upper lids',
            'Long-lasting results that endure for many years',
            'Relatively short recovery compared to other facial surgeries',
            'High satisfaction rates for both cosmetic and functional outcomes',
        ],
        cons: [
            'Removing too much skin or fat creates results that are hard to reverse',
            'Temporary dry eye, irritation, and light sensitivity are common',
            'Results do not last forever — additional surgery may be needed with aging',
            'Rare but serious risks include blurred vision and difficulty closing eyes',
            'Important cultural considerations about preserving ethnic identity with double eyelid surgery',
        ],
        idealFor: 'Patients with drooping upper lids, puffy lower lids, or those seeking double eyelid surgery to enhance their natural eye shape.',
        recoveryTime: '5-7 days (suture removal), 1-2 weeks (bruising resolves)',
        procedureDuration: '1-2 hours',
        costRange: '$3,000 - $6,000',
        pricing: {
            us: { min: 3000, max: 7000 },
            thailand: { min: 1200, max: 3000 },
            'south-korea': { min: 1500, max: 5000 },
            india: { min: 800, max: 2000 },
            singapore: { min: 3000, max: 6700 },
        },
        icon: '\u{1F441}\uFE0F',
        order: 5,
        simulateSlug: 'blepharoplasty',
        tier: 'A',
        popularity: 'high',
    },
    {
        slug: 'facelift',
        name: 'Facelift',
        shortName: 'Facelift',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: 'hybrid',
        description: 'Jowl reduction, nasolabial softening, midface lift, and neck tightening with Mini, SMAS, and Deep Plane techniques.',
        longDescription: `A facelift (rhytidectomy) addresses sagging skin, deep folds, jowling, and loss of muscle tone in the lower face and neck. Modern techniques operate at the SMAS (superficial musculoaponeurotic system) layer for natural, long-lasting rejuvenation.

Three main approaches are offered: Mini facelift (limited incisions, targets early jowling), SMAS facelift (standard approach for moderate aging), and Deep Plane facelift (the gold standard for comprehensive, long-lasting rejuvenation that repositions deeper tissue planes).

Our simulator models tissue repositioning, skin re-draping, and volumetric changes across 468 anatomical landmarks. It visualizes jowl reduction, nasolabial fold softening, midface lift, marionette line correction, and neck tightening for all three surgical approaches.`,
        benefits: [
            'Comprehensive facial rejuvenation targeting multiple aging signs',
            'Long-lasting results (10-15 years for deep plane)',
            'Natural-looking outcomes that avoid a "pulled" appearance',
            'Can be combined with neck lift and fat grafting',
        ],
        pros: [
            'Most effective procedure for reversing facial aging with longest-lasting results',
            'Patients report looking an average of 12 years younger with 97% satisfaction',
            'Results typically last 10–15 years',
            'Modern techniques use smaller incisions with shorter recovery',
            'Can be combined with fat grafting for extended longevity',
        ],
        cons: [
            'Major surgery requiring general anesthesia with 2-week initial recovery',
            'Significant cost ($7,000–$15,000+) and not covered by insurance',
            'Does not stop aging — turns back the clock but aging continues',
            'Risks include nerve damage, hematoma, infection, and hair loss near incisions',
            'Visible scarring possible around ears and hairline',
        ],
        idealFor: 'Patients experiencing moderate to significant facial aging including jowling, deep nasolabial folds, and neck laxity who desire comprehensive rejuvenation.',
        recoveryTime: '10-14 days (social recovery), 3-6 weeks (full healing)',
        procedureDuration: '3-5 hours',
        costRange: '$12,000 - $25,000',
        pricing: {
            us: { min: 8000, max: 25000 },
            thailand: { min: 4500, max: 8000 },
            'south-korea': { min: 6000, max: 13500 },
            india: { min: 1800, max: 6500 },
            singapore: { min: 8900, max: 18500 },
        },
        icon: '\u2728',
        order: 6,
        simulateSlug: 'facelift',
        tier: 'A',
        popularity: 'medium',
    },
    {
        slug: 'lip-lift',
        name: 'Lip Lift',
        shortName: 'Lip Lift',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: 'hybrid',
        description: 'Philtral shortening, vermilion show enhancement, and cupid\'s bow refinement with Bullhorn, Corner, and Italian techniques.',
        longDescription: `A lip lift is a surgical procedure that shortens the distance between the base of the nose and the upper lip (the philtrum), increasing the visible vermilion (red part) of the upper lip and enhancing the cupid's bow definition.

Unlike lip fillers which add volume, a lip lift permanently reshapes the lip position for a more youthful, balanced appearance. Techniques include the Bullhorn lift (subnasal crescent excision), Corner lip lift (elevates the mouth corners), and Italian lip lift (two smaller incisions at the base of each nostril).

Our simulator models philtral column shortening, vermilion show increase, cupid's bow enhancement, and lip-to-tooth ratio changes. It includes ethnic presets to ensure proportionally appropriate results for different facial anatomies.`,
        benefits: [
            'Permanent enhancement of upper lip visibility',
            'Restore youthful lip-to-philtrum proportions',
            'Enhanced cupid\'s bow definition',
            'Natural alternative to repeated filler injections',
        ],
        pros: [
            'Permanent results that create a more youthful mouth appearance',
            'Natural enhancement without fillers — restores visible lip show',
            '92% of patients rate the procedure as "worth it"',
            'Results last 10+ years, more cost-effective than repeated fillers',
        ],
        cons: [
            'Scarring is the #1 concern — 60% of complaints are scar-related',
            'Scars at the nose base can be visible if healing is suboptimal',
            'Risk of nerve damage affecting lip sensation or movement',
            'Cannot be easily reversed if you dislike the result',
            'Not suitable for patients with a naturally short philtrum',
        ],
        idealFor: 'Patients with a long philtrum (distance from nose to lip), thin upper lip with minimal vermilion show, or those seeking a permanent alternative to lip fillers.',
        recoveryTime: '5-7 days (suture removal), 2-4 weeks (scar maturation)',
        procedureDuration: '45-90 minutes',
        costRange: '$3,000 - $6,000',
        pricing: {
            us: { min: 3000, max: 6000 },
            thailand: { min: 1500, max: 3000 },
            'south-korea': { min: 2000, max: 4500 },
            india: { min: 800, max: 2000 },
            singapore: { min: 3500, max: 7000 },
        },
        icon: '\u{1F444}',
        order: 7,
        simulateSlug: 'lip-lift',
        tier: 'A',
    },

    // ─── Non-Surgical (8-10) ──────────────────────────────────────────
    //
    // DISAMBIGUATION NOTE (lip-lift vs dental):
    // The 'lip-lift' slug above (order: 7) refers to the SURGICAL lip lift
    // (subnasal bullhorn, corner, or Italian technique — philtral shortening).
    // This is a facial plastic surgery procedure in the 'surgical' category.
    //
    // It is NOT related to dental procedures. The dental category (order: 14-17)
    // covers smile-design, teeth-whitening, veneers, and gummy-smile — none of
    // which share the 'lip-lift' slug.
    //
    // The /simulate/lip-lift route renders LipLiftSimulator (surgical, active).
    // The comingSoon flag is NOT set here — this simulator is fully built.
    // Do not add comingSoon to lip-lift unless explicitly removing the simulator.
    {
        slug: 'chemical-peels',
        name: 'Chemical Peel',
        shortName: 'Chemical Peel',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Skin resurfacing simulation with Fitzpatrick typing, Glogau photoaging assessment, and multi-depth peel visualization.',
        longDescription: `Chemical peels use controlled acid solutions to remove damaged outer layers of skin, revealing smoother, more evenly pigmented skin beneath. They treat fine lines, sun damage, acne scars, uneven skin tone, and textural irregularities.

Peels range from superficial (glycolic acid, lactic acid) through medium-depth (TCA, Jessner's solution) to deep (phenol). The depth of the peel determines both the intensity of results and the recovery time required.

Our simulator assesses your Fitzpatrick skin type and Glogau photoaging scale score, then visualizes the expected improvement for different peel types and depths. It models texture refinement, pigmentation reduction, and overall skin clarity improvement specific to your skin characteristics.`,
        benefits: [
            'Reduce fine lines and sun damage',
            'Improve skin texture and tone uniformity',
            'Treat acne scars and hyperpigmentation',
            'Non-surgical with minimal downtime (superficial peels)',
            'Customizable to skin type and concern severity',
        ],
        pros: [
            'Versatile treatment for acne, wrinkles, sun damage, and pigmentation',
            'Multiple depth options to match specific concerns and tolerance',
            'Light peels have minimal downtime — a "lunchtime procedure"',
            'More affordable than laser treatments',
            'Decades of clinical evidence supporting effectiveness',
        ],
        cons: [
            'Risk of hyperpigmentation, particularly for darker skin tones',
            'Deep peels contain phenol which can affect kidneys, liver, and heart',
            'Strict sun protection mandatory for months after treatment',
            'Medium and deep peels involve noticeable redness and peeling for days to weeks',
            'Risk of infection, scarring, and cold sore reactivation',
        ],
        idealFor: 'Patients seeking skin rejuvenation for sun damage, fine lines, mild acne scarring, or uneven pigmentation without surgery.',
        recoveryTime: '1-3 days (superficial), 1-2 weeks (medium/deep)',
        procedureDuration: '30-60 minutes',
        costRange: '$150 - $3,000',
        pricing: {
            us: { min: 150, max: 3000 },
            thailand: { min: 50, max: 800 },
            'south-korea': { min: 80, max: 600 },
            india: { min: 30, max: 350 },
            singapore: { min: 150, max: 1200 },
        },
        icon: '\u{1F4A7}',
        order: 8,
        simulateSlug: 'chemical-peels',
        tier: 'A',
    },
    {
        slug: 'laser-resurfacing',
        name: 'Laser Resurfacing',
        shortName: 'Laser Resurfacing',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Fitzpatrick-aware laser skin rejuvenation with wrinkle reduction, pigmentation correction, and 5 laser type options.',
        longDescription: `Laser skin resurfacing uses focused light energy to remove damaged skin layers and stimulate collagen production. It effectively treats wrinkles, scars, sun damage, and uneven skin texture with greater precision than chemical peels.

Technologies include ablative lasers (CO2, Erbium:YAG) that remove skin layers directly, non-ablative lasers (Nd:YAG, diode) that heat deeper tissue without surface damage, and fractional lasers that treat micro-columns of skin for faster healing.

Our simulator models the expected improvement across 5 laser types, accounting for your Fitzpatrick skin type (critical for laser safety), treatment depth, and targeted concern. It visualizes wrinkle reduction, pigmentation clearing, skin tightening, and texture smoothing.`,
        benefits: [
            'Significant wrinkle and fine line reduction',
            'Effective treatment for acne scars and sun damage',
            'Stimulates long-term collagen remodeling',
            'Precise treatment depth control',
            'Multiple laser options for different skin types',
        ],
        pros: [
            'Stimulates collagen production for long-term skin improvement',
            'Multiple options (ablative, non-ablative, fractional) for different needs',
            'Effective for deep wrinkles, scars, sun damage, and pigmentation',
            'Fractional laser offers a good balance of effectiveness and shorter recovery',
            'Results can be dramatic and long-lasting with ablative treatments',
        ],
        cons: [
            'Higher risk of pigmentation changes in darker skin tones',
            'Ablative treatments require 1–3 weeks of recovery with redness and crusting',
            'Not recommended if you have taken Accutane within the past year',
            'Multiple sessions often needed for non-ablative treatments, adding to cost',
            'Risk of infection, acne flares, and in rare cases permanent scarring',
        ],
        idealFor: 'Patients with moderate to severe wrinkles, acne scarring, sun damage, or skin laxity who want more dramatic results than topical treatments provide.',
        recoveryTime: '5-10 days (ablative), 1-3 days (non-ablative)',
        procedureDuration: '30-90 minutes',
        costRange: '$1,000 - $5,000',
        pricing: {
            us: { min: 500, max: 3500 },
            thailand: { min: 150, max: 1200 },
            'south-korea': { min: 300, max: 800 },
            india: { min: 100, max: 600 },
            singapore: { min: 220, max: 1100 },
        },
        icon: '\u2600\uFE0F',
        order: 9,
        simulateSlug: 'laser-resurfacing',
    },
    {
        slug: 'thread-lift',
        name: 'Thread Lift',
        shortName: 'Thread Lift',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Non-surgical lift trajectory visualization for midface, jowl, and brow repositioning with PDO, PLLA, and PCL thread options.',
        longDescription: `A thread lift is a minimally invasive procedure that lifts and tightens sagging facial tissue using absorbable sutures. Barbed or smooth threads are inserted beneath the skin to physically lift tissue and stimulate collagen production for ongoing improvement.

Three main thread materials are used: PDO (polydioxanone) — absorbed in 6-8 months with results lasting 1-2 years; PLLA (poly-L-lactic acid) — stronger collagen stimulation lasting 2-3 years; and PCL (polycaprolactone) — the longest-lasting option with results up to 3-4 years.

Our simulator visualizes thread placement trajectories and the resulting lift effect on the midface, jowls, nasolabial folds, neck, and brow. It models the degree of lift achievable with each thread type and the expected collagen stimulation timeline.`,
        benefits: [
            'Immediate lifting effect with no general anesthesia',
            'Minimal downtime compared to surgical facelift',
            'Stimulates collagen for gradual ongoing improvement',
            'Reversible and adjustable results',
        ],
        pros: [
            'Minimally invasive — most patients resume activities within 24–48 hours',
            'Immediate visible lift with additional collagen-building improvement over time',
            'Lower risk profile than surgical facelift — no general anesthesia needed',
            'Shorter procedure time, typically under an hour',
            'Significantly less expensive upfront than a surgical facelift',
        ],
        cons: [
            'Results last only 1–3 years, requiring repeat treatments',
            'Not effective for significant skin laxity — provides only subtle lifting',
            'Risk of thread migration, skin puckering, or visible threads beneath skin',
            'Achieving symmetry can be challenging with potential for uneven results',
            'Results are highly practitioner-dependent — skill directly impacts quality',
        ],
        idealFor: 'Patients with early to moderate facial sagging who want visible lift without the downtime and cost of a surgical facelift.',
        recoveryTime: '2-5 days',
        procedureDuration: '30-60 minutes',
        costRange: '$2,000 - $5,000',
        pricing: {
            us: { min: 1500, max: 4500 },
            thailand: { min: 600, max: 2000 },
            'south-korea': { min: 1500, max: 4000 },
            india: { min: 400, max: 1500 },
            singapore: { min: 1200, max: 3500 },
        },
        icon: '\u26A1',
        order: 10,
        simulateSlug: 'thread-lift',
        tier: 'A',
    },

    // ─── Injectable (11-13) ───────────────────────────────────────────
    {
        slug: 'botox',
        name: 'Botox / Neuromodulator',
        shortName: 'Botox',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Injection zone mapping and wrinkle reduction preview for forehead, glabella, crow\'s feet, and other treatment areas.',
        longDescription: `Botox (botulinum toxin) and other neuromodulators (Dysport, Xeomin, Jeuveau) temporarily relax targeted facial muscles to smooth dynamic wrinkles — lines that form from repeated facial expressions like frowning, squinting, and raising the eyebrows.

Treatment areas include forehead lines, glabellar (frown) lines, crow's feet, bunny lines, lip flip, chin dimpling, masseter reduction (facial slimming), and hyperhidrosis (excessive sweating). Results typically appear within 3-7 days and last 3-4 months.

Our simulator maps injection zones on your face and visualizes the expected wrinkle reduction for each treatment area. It displays clinical dosing guidelines and safety alerts for high-risk zones near sensitive structures.`,
        benefits: [
            'Smooth forehead lines, frown lines, and crow\'s feet',
            'Quick treatment with no downtime',
            'Preventive when started early',
            'Non-permanent — adjustable with each session',
            'Can slim the face via masseter reduction',
        ],
        pros: [
            'Quick "lunchtime procedure" with no downtime — resume activities immediately',
            'Effective for forehead lines, crow\'s feet, and frown lines within days',
            'Proven medical uses: chronic migraines, excessive sweating, muscle spasms',
            'Preventive benefit — long-term use slows formation of new wrinkles',
            'Well-established safety profile with decades of FDA-approved use',
        ],
        cons: [
            'Results are temporary (3–6 months), requiring ongoing treatments',
            'Common side effects: injection site pain, swelling, occasionally drooping eyelids',
            'Long-term heavy use may cause wavy skin texture over treated muscles',
            'Results highly dependent on injector skill — poor technique causes frozen expressions',
            'Ongoing cumulative cost adds up significantly over years',
        ],
        idealFor: 'Patients with dynamic wrinkles (lines that appear with facial expressions) or those seeking preventive anti-aging treatment.',
        recoveryTime: 'None (immediate return to activities)',
        procedureDuration: '10-20 minutes',
        costRange: '$300 - $800 per session',
        pricing: {
            us: { min: 300, max: 1200 },
            thailand: { min: 80, max: 400 },
            'south-korea': { min: 30, max: 300 },
            india: { min: 60, max: 250 },
            singapore: { min: 200, max: 800 },
        },
        icon: '\u{1F489}',
        order: 11,
        simulateSlug: 'injectables',
        tier: 'A',
        popularity: 'high',
    },
    {
        slug: 'dermal-fillers',
        name: 'Dermal Fillers',
        shortName: 'Dermal Fillers',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: '8-zone volume enhancement with hyaluronic acid filler simulation for lips, cheeks, jawline, and tear trough.',
        longDescription: `Dermal fillers are injectable gels — most commonly hyaluronic acid (HA) — used to restore volume, smooth wrinkles, and enhance facial contours. Unlike Botox (which relaxes muscles), fillers physically add volume beneath the skin.

Treatment zones include lips (volume and definition), cheeks (midface volume restoration), nasolabial folds, marionette lines, tear troughs (under-eye hollows), jawline (definition and contouring), chin (projection), and temples. Results are immediate and last 6-18 months depending on the product and area treated.

Our simulator models volume addition across 8 facial zones, visualizing the shape and contour changes from filler placement. It uses anatomical landmarks to ensure natural-looking augmentation proportional to each patient's facial structure.`,
        benefits: [
            'Immediate volume restoration and contouring',
            'Smooth deep folds and wrinkles',
            'Enhance lips, cheeks, and jawline definition',
            'Reversible with hyaluronidase if needed',
            'No surgery or general anesthesia required',
        ],
        pros: [
            'Immediate, visible results with no surgery and minimal downtime',
            'Highly versatile — lips, cheeks, chin, under-eyes, jawline, and more',
            'Hyaluronic acid fillers are reversible if results are unsatisfactory',
            'Results last 6 months to 2 years depending on type and location',
            'Non-permanent nature allows adjustments as your face changes',
        ],
        cons: [
            'Temporary results require repeat treatments with cumulative costs',
            'Rare but serious risk of vascular occlusion causing skin necrosis or blindness',
            'Results are highly technique-dependent — unskilled injection causes asymmetry',
            'Common side effects: bruising, swelling, tenderness, and lumpiness',
            'Over-filling ("pillow face") is a growing concern with repeated treatments',
        ],
        idealFor: 'Patients seeking volume restoration, facial contouring, or wrinkle reduction with immediate results and no surgical downtime.',
        recoveryTime: 'None to 1-2 days (mild swelling)',
        procedureDuration: '15-45 minutes',
        costRange: '$600 - $2,000 per syringe',
        pricing: {
            us: { min: 500, max: 3000 },
            thailand: { min: 150, max: 800 },
            'south-korea': { min: 150, max: 600 },
            india: { min: 120, max: 600 },
            singapore: { min: 300, max: 1500 },
        },
        icon: '\u{1F4A7}',
        order: 12,
        simulateSlug: 'dermal-fillers',
        tier: 'A',
        popularity: 'high',
    },
    {
        slug: 'fat-grafting',
        name: 'Fat Grafting (Face)',
        shortName: 'Fat Grafting',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Autologous fat transfer simulation for facial volume restoration using the patient\'s own harvested fat tissue.',
        longDescription: `Facial fat grafting (autologous fat transfer) harvests fat from one area of the body (typically abdomen or thighs), purifies it, and reinjects it into the face to restore volume lost through aging. Unlike synthetic fillers, the transferred fat integrates with existing tissue for natural, long-lasting results.

The procedure involves three steps: liposuction harvest from a donor site, centrifugation or filtration to purify viable fat cells, and precise micro-injection into target facial areas. Approximately 60-80% of transferred fat survives long-term, making touch-up sessions common.

When available, our simulator will model the expected volume addition and facial contouring effects of fat grafting, accounting for typical fat survival rates. It will visualize projected improvements in cheek volume, under-eye hollows, nasolabial folds, temples, and jawline contouring.`,
        benefits: [
            'Uses your own tissue — no allergic reactions',
            'Long-lasting results (surviving fat is permanent)',
            'Natural feel and appearance',
            'Simultaneous body contouring at the donor site',
        ],
        pros: [
            'Uses your own tissue — no risk of allergic reaction or rejection',
            'Provides both volume restoration and skin quality improvement via stem cells',
            'Long-lasting results once transferred fat establishes blood supply',
            'More natural look and feel compared to synthetic fillers',
            'Can address multiple facial areas in a single session',
        ],
        cons: [
            'Unpredictable fat survival rate — sometimes requiring multiple sessions',
            'Requires a separate liposuction donor site, adding a second procedure area',
            'Risk of fat overgrowth, necrosis, cyst formation, and asymmetry',
            'Forehead and temple injections carry the highest risk of serious complications',
            'More invasive and longer recovery than injectable fillers',
        ],
        idealFor: 'Patients seeking long-lasting facial volume restoration with natural-feeling results using their own tissue rather than synthetic fillers.',
        recoveryTime: '1-2 weeks (face), 1-2 weeks (donor site)',
        procedureDuration: '1-2 hours',
        costRange: '$3,000 - $8,000',
        pricing: {
            us: { min: 2500, max: 7000 },
            thailand: { min: 1500, max: 4000 },
            'south-korea': { min: 2000, max: 5000 },
            india: { min: 700, max: 2500 },
            singapore: { min: 3000, max: 7500 },
        },
        icon: '💫',
        order: 13,
        simulateSlug: 'fat-grafting',
    },

    // ─── Dental Aesthetics (14-17) ────────────────────────────────────
    {
        slug: 'smile-design',
        name: 'Smile Design',
        shortName: 'Smile Design',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Digital smile design simulation for tooth shape, alignment, and proportion analysis using facial harmony principles.',
        longDescription: `Digital Smile Design (DSD) is a diagnostic and planning tool that uses facial analysis, photography, and digital design to plan aesthetic dental treatments. It analyzes the relationship between teeth, gums, lips, and overall facial proportions to create a personalized smile blueprint.

The process considers tooth-to-lip ratio, gingival display, midline alignment, tooth proportions (width-to-height ratio), smile arc, and buccal corridor. It enables patients to preview their new smile before any dental work begins.

Our simulator applies facial harmony principles to design optimal tooth proportions, alignment, and gum contouring. It models how changes to tooth shape, size, and position affect the overall smile within the context of the patient's unique facial features.`,
        benefits: [
            'Visualize your ideal smile before treatment',
            'Personalized design based on facial proportions',
            'Plan comprehensive treatments with confidence',
            'Improved communication between patient and dentist',
        ],
        pros: [
            'Visualize your new smile before any treatment begins',
            'Highly customized plans tailored to your facial proportions',
            'Reduces overall treatment duration by 40–50% with fewer visits',
            'Non-invasive planning phase with no physical risk',
            'Improves communication between you and your dentist',
        ],
        cons: [
            'Actual results may vary from the digital preview in complex cases',
            'Higher upfront costs due to advanced technology required',
            'Digital design is a planning tool only — dental work carries its own risks',
            'Limited availability in some regions outside major cities',
            'Long-term impact of AI-generated designs on satisfaction still being studied',
        ],
        idealFor: 'Patients considering comprehensive dental aesthetics — veneers, crowns, orthodontics, or gum contouring — who want to preview the final result before committing.',
        recoveryTime: 'Varies by treatment plan',
        procedureDuration: '30-60 minutes (design consultation)',
        costRange: '$500 - $1,500 (design fee; treatments separate)',
        pricing: {
            us: { min: 8000, max: 40000 },
            thailand: { min: 2000, max: 10000 },
            'south-korea': { min: 3000, max: 15000 },
            india: { min: 1000, max: 6000 },
            singapore: { min: 5000, max: 25000 },
        },
        icon: '\u{1F601}',
        isNew: true,
        order: 14,
        simulateSlug: 'smile-design',
    },
    {
        slug: 'teeth-whitening',
        name: 'Teeth Whitening',
        shortName: 'Teeth Whitening',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Preview teeth whitening results with shade matching and before/after comparison across professional whitening methods.',
        longDescription: `Professional teeth whitening is one of the most popular cosmetic dental procedures. It uses peroxide-based bleaching agents to remove intrinsic and extrinsic stains, achieving a brighter, more uniform tooth color.

Methods include in-office whitening (Zoom, laser-assisted) which delivers dramatic results in a single session, custom take-home trays with professional-strength gel, and combination approaches. Results depend on the starting shade, type of staining, and the whitening method used.

Our simulator previews the expected shade improvement for your teeth, modeling the transition from your current shade to the targeted result. It accounts for different types of staining (coffee, tetracycline, aging) and realistic shade ranges achievable with professional whitening.`,
        benefits: [
            'Dramatically brighten your smile in one session',
            'Safe and well-researched cosmetic procedure',
            'Boost confidence with a whiter smile',
            'Multiple methods to suit your schedule and budget',
        ],
        pros: [
            'Non-invasive with immediate visible improvement in tooth brightness',
            'Generally safe when performed by a dentist at proper intervals',
            'Multiple options (in-office, custom trays, strips) to fit different budgets',
            'One of the simplest cosmetic improvements available',
            'Does not damage enamel when used as directed',
        ],
        cons: [
            'Increased tooth sensitivity is the most common side effect',
            'Results are temporary — teeth re-stain from coffee, tea, wine, and foods',
            'Overuse can damage enamel and cause permanent sensitivity',
            'Not effective on dental restorations (crowns, veneers), creating color mismatches',
            'Over-the-counter products can cause uneven whitening',
        ],
        idealFor: 'Patients with stained or yellowed teeth who want a brighter, more youthful-looking smile through professional-grade whitening.',
        recoveryTime: 'None',
        procedureDuration: '60-90 minutes (in-office)',
        costRange: '$300 - $1,000',
        pricing: {
            us: { min: 250, max: 1000 },
            thailand: { min: 80, max: 350 },
            'south-korea': { min: 100, max: 400 },
            india: { min: 50, max: 200 },
            singapore: { min: 200, max: 700 },
        },
        icon: '\u{1F9B7}',
        isNew: true,
        order: 15,
        simulateSlug: 'teeth-whitening',
    },
    {
        slug: 'veneers',
        name: 'Veneers',
        shortName: 'Veneers',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Preview porcelain or composite veneer placement with tooth shape selection, shade matching, and smile proportion analysis.',
        longDescription: `Dental veneers are thin shells of porcelain or composite resin bonded to the front surface of teeth to improve their appearance. They address chipped teeth, gaps, discoloration, misalignment, and irregular tooth shapes — creating a uniform, natural-looking smile.

Porcelain veneers are custom-fabricated in a dental lab and offer superior durability, stain resistance, and natural light reflection. Composite veneers are applied directly chairside at a lower cost but may require more maintenance. Both typically require minimal tooth preparation (0.3-0.7mm of enamel removal).

Our simulator previews veneer placement with different tooth shapes, shade options, and proportions. It models how veneers change the overall smile line, tooth uniformity, and facial harmony — helping patients choose the look that best suits their features.`,
        benefits: [
            'Transform your smile in just 2 appointments',
            'Fix chips, gaps, stains, and misalignment',
            'Highly durable with proper care (10-20 years for porcelain)',
            'Natural-looking results with custom shade matching',
        ],
        pros: [
            'Address multiple concerns at once: discoloration, chips, gaps, and misalignment',
            'Porcelain veneers are highly stain-resistant with natural light reflection',
            'High survival rate — porcelain veneers last 10–15 years with proper care',
            'More conservative than crowns with less natural tooth removal',
            'Dramatic smile transformation achievable in just 2–3 visits',
        ],
        cons: [
            'Irreversible — requires permanent enamel removal',
            'Expensive and typically not covered by dental insurance',
            'Can chip or crack from hard foods, grinding, or trauma',
            'Tooth sensitivity after enamel removal is common',
            'Color matching can be challenging — poor execution looks artificial',
        ],
        idealFor: 'Patients with chipped, stained, gapped, or misaligned front teeth who want a complete smile transformation with minimal tooth alteration.',
        recoveryTime: 'None to 1-2 days (sensitivity)',
        procedureDuration: '2 appointments over 1-2 weeks',
        costRange: '$800 - $2,500 per tooth',
        pricing: {
            us: { min: 900, max: 2500 },
            thailand: { min: 190, max: 500 },
            'south-korea': { min: 300, max: 800 },
            india: { min: 100, max: 300 },
            singapore: { min: 600, max: 1500 },
        },
        icon: '\u2728',
        isNew: true,
        order: 16,
        simulateSlug: 'veneers',
    },
    {
        slug: 'gummy-smile',
        name: 'Gummy Smile Correction',
        shortName: 'Gummy Smile',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Simulate gummy smile reduction through crown lengthening, lip repositioning, or Botox injection approaches.',
        longDescription: `A "gummy smile" — clinically known as excessive gingival display — occurs when more than 3-4mm of gum tissue is visible above the upper teeth during a full smile. It affects approximately 10% of the population and can cause self-consciousness despite having otherwise healthy teeth.

Treatment options depend on the cause: crown lengthening surgery (gingivectomy) reshapes the gum line to expose more tooth surface; lip repositioning surgery limits how high the upper lip rises when smiling; orthognathic surgery corrects underlying skeletal issues; and Botox injections offer a temporary non-surgical option by relaxing the upper lip elevator muscles.

Our simulator models the expected improvement from gummy smile correction, visualizing how gum line reshaping or lip repositioning changes the tooth-to-gum ratio and overall smile aesthetics.`,
        benefits: [
            'Reduce excessive gum display when smiling',
            'Multiple treatment approaches available',
            'Quick recovery for most treatment options',
            'Dramatically improve smile confidence',
        ],
        pros: [
            'Multiple treatment options from minimally invasive to surgical',
            'Laser gum contouring is minimally invasive with immediate results',
            'Reducing excess gum tissue can lower periodontal disease risk',
            'Significant boost in self-confidence and willingness to smile',
            'Can be combined with other dental treatments for a complete makeover',
        ],
        cons: [
            'Gum tissue can sometimes regrow after contouring, requiring retreatment',
            'Surgical options carry risks of pain, swelling, bleeding, and infection',
            'Recovery from surgical correction takes several weeks with dietary restrictions',
            'Botox treatment is temporary (3–4 months) and requires repeat visits',
            'Not recommended for patients with poor dental health or bleeding disorders',
        ],
        idealFor: 'Patients who feel self-conscious about showing too much gum tissue when they smile, whether due to short teeth, excess gum tissue, or hypermobile upper lip.',
        recoveryTime: '1-2 weeks (surgical), none (Botox)',
        procedureDuration: '30-90 minutes',
        costRange: '$1,000 - $5,000',
        pricing: {
            us: { min: 300, max: 4000 },
            thailand: { min: 100, max: 1500 },
            'south-korea': { min: 80, max: 1200 },
            india: { min: 60, max: 800 },
            singapore: { min: 200, max: 2500 },
        },
        icon: '\u{1F60A}',
        isNew: true,
        order: 17,
        simulateSlug: 'gummy-smile',
    },

    // ─── Body Contouring (18-21) ─────────────────────────────────────
    {
        slug: 'breast-augmentation',
        name: 'Breast Augmentation',
        shortName: 'Breast Augmentation',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Visualize breast augmentation results with adjustable implant volume, profile, placement, and symmetry controls.',
        longDescription: `Breast augmentation (augmentation mammaplasty) enhances breast size and shape using implants or fat transfer. It is the most commonly performed aesthetic surgery globally, with over 300,000 annual procedures in the US alone.

Modern techniques offer a range of implant profiles (low to extra-high), shapes (round or anatomical/teardrop), and placement planes (subglandular, submuscular, or dual-plane). The choice depends on the patient\u2019s chest wall anatomy, tissue thickness, and desired outcome.

Our simulator lets you visualize how different implant volumes (100\u2013800cc), profiles, and placements would look on a specific body photo. Independent left/right symmetry controls address the pre-existing asymmetry that affects up to 53% of patients. All processing happens in the browser \u2014 no images are uploaded.`,
        benefits: [
            'Enhance breast volume and projection',
            'Correct asymmetry with independent L/R controls',
            'Compare round vs anatomical implant shapes',
            'Visualize subglandular, submuscular, and dual-plane placement',
            'Highest patient satisfaction rate among body procedures',
        ],
        pros: [
            'Enhances size, shape, and symmetry with high patient satisfaction',
            'Multiple options: saline, silicone gel, and fat transfer for personalization',
            'Well-studied procedure with decades of safety data',
            'Can correct asymmetry or restore volume lost after pregnancy or weight loss',
            'Modern cohesive gel implants have lower rupture rates than earlier generations',
        ],
        cons: [
            'Capsular contracture (scar tissue hardening) is the most common long-term complication',
            'Implants are not lifetime devices — eventually require replacement or removal',
            'Breast Implant Illness (BII) symptoms reported: fatigue, brain fog, joint pain',
            'Rare but documented risk of BIA-ALCL (implant-associated lymphoma)',
            'Loss of nipple sensation can occur and may be permanent',
        ],
        idealFor: 'Patients seeking to increase breast size, restore volume lost after pregnancy or weight loss, or correct breast asymmetry.',
        recoveryTime: '1-2 weeks (initial), 6-8 weeks (full activity)',
        procedureDuration: '1-2 hours',
        costRange: '$3,000 - $12,000',
        pricing: {
            us: { min: 6000, max: 12000 },
            thailand: { min: 3000, max: 5000 },
            'south-korea': { min: 4000, max: 8000 },
            india: { min: 2500, max: 4500 },
            singapore: { min: 8000, max: 12000 },
        },
        icon: '\u{1F469}\u200D\u2695\uFE0F',
        isNew: true,
        order: 18,
        simulateSlug: 'breast-augmentation',
    },
    {
        slug: 'liposuction',
        name: 'Liposuction',
        shortName: 'Liposuction',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Simulate liposuction results for abdomen, flanks, thighs, arms, and chin. Compare traditional, VASER, and Hi-Def techniques.',
        longDescription: `Liposuction removes stubborn, localized fat deposits that resist diet and exercise. It is one of the most popular body contouring procedures worldwide, with techniques ranging from traditional tumescent liposuction to advanced VASER (ultrasonic) and Hi-Def sculpting.

VASER liposuction uses ultrasonic energy to selectively emulsify fat while preserving surrounding tissues, resulting in better skin retraction (53\u201362% vs 17% with traditional methods). Hi-Def liposuction goes further by selectively removing fat to reveal underlying muscle definition, popular for \u201Csix-pack\u201D sculpting.

Our simulator supports multi-zone treatment \u2014 abdomen, flanks, inner/outer thighs, arms, chin, back, and chest \u2014 each with independent intensity controls. The Hi-Def mode overlays muscle definition lines for athletic contouring visualization.`,
        benefits: [
            'Remove stubborn fat deposits resistant to diet and exercise',
            'Treat multiple body zones in a single session',
            'Compare traditional, VASER, and Hi-Def techniques',
            'Visualize muscle definition enhancement with Hi-Def mode',
            'Permanent fat cell removal from treated areas',
        ],
        pros: [
            'Effectively reduces stubborn fat deposits resistant to diet and exercise',
            'Fat cells removed do not regenerate — permanent reduction in treated areas',
            'Small incisions result in minimal, easily concealed scarring',
            'Relatively short recovery — most return to work within 1 week',
            'Most popular body contouring procedure with a well-established safety profile',
        ],
        cons: [
            'Not a weight-loss solution — designed for contouring, not significant fat reduction',
            'Does not address loose skin — poor elasticity may need additional procedures',
            'Final results take 3–6 months to appear as swelling subsides',
            'Weight gain after surgery can compromise results',
            'Risks include fat embolism, contour irregularities, and fluid accumulation',
        ],
        idealFor: 'Patients near their ideal body weight with localized fat deposits that do not respond to diet and exercise.',
        recoveryTime: '1-2 weeks (light activity), 4-6 weeks (full activity)',
        procedureDuration: '1-4 hours (depending on areas treated)',
        costRange: '$1,000 - $7,500 per area',
        pricing: {
            us: { min: 3000, max: 7500 },
            thailand: { min: 1500, max: 3500 },
            'south-korea': { min: 2000, max: 5000 },
            india: { min: 1000, max: 3000 },
            singapore: { min: 3000, max: 6000 },
        },
        icon: '\u{1F3CB}\uFE0F',
        isNew: true,
        order: 19,
        simulateSlug: 'liposuction',
        tier: 'A',
    },
    {
        slug: 'tummy-tuck',
        name: 'Tummy Tuck (Abdominoplasty)',
        shortName: 'Tummy Tuck',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Visualize tummy tuck results. Compare mini, full, and extended abdominoplasty with diastasis repair and incision preview.',
        longDescription: `Abdominoplasty (tummy tuck) removes excess abdominal skin and fat while tightening the underlying musculature. Rectus diastasis \u2014 the separation of the abdominal muscles \u2014 affects approximately 40% of women six months postpartum and can only be corrected surgically.

Three main types address different degrees of concern: mini abdominoplasty targets only the lower abdomen with a shorter incision; full abdominoplasty addresses the entire abdominal panel with belly button repositioning; and extended abdominoplasty includes flank and lower back contouring for patients with significant excess tissue.

Our simulator models skin removal, diastasis repair (waist narrowing), optional liposuction contouring, navel reshaping, and incision line placement. Each type shows the expected transformation based on real surgical outcomes.`,
        benefits: [
            'Remove excess skin and fat from the abdomen',
            'Repair separated abdominal muscles (diastasis recti)',
            'Compare mini, full, and extended approaches',
            'Visualize waist narrowing from muscle repair',
            'Preview incision line placement',
        ],
        pros: [
            'Repairs separated abdominal muscles (diastasis recti) that exercise cannot fix',
            'Removes excess skin and stretch marks effectively',
            'Documented health benefits: improved back pain, posture, and urinary incontinence',
            'Long-lasting results when combined with stable weight',
            'Can improve appearance of C-section and hysterectomy scars',
        ],
        cons: [
            'One of the higher morbidity risks in aesthetic plastic surgery',
            'Significant recovery period of several weeks with limited mobility',
            'Permanent scar across the lower abdomen',
            'Weight gain or future pregnancy can reverse results',
            'Expensive procedure typically not covered by insurance',
        ],
        idealFor: 'Patients with loose abdominal skin after pregnancy or significant weight loss, especially those with rectus diastasis.',
        recoveryTime: '2-3 weeks (light activity), 6-8 weeks (full activity)',
        procedureDuration: '2-5 hours',
        costRange: '$3,000 - $15,000',
        pricing: {
            us: { min: 8000, max: 15000 },
            thailand: { min: 4000, max: 7000 },
            'south-korea': { min: 5000, max: 10000 },
            india: { min: 3000, max: 5500 },
            singapore: { min: 8000, max: 15000 },
        },
        icon: '\u{1FA7A}',
        isNew: true,
        order: 20,
        simulateSlug: 'tummy-tuck',
    },
    {
        slug: 'bbl',
        name: 'BBL (Brazilian Butt Lift)',
        shortName: 'BBL',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Simulate Brazilian Butt Lift results. Adjust fat transfer volume, projection, hip dip correction, and donor area reduction.',
        longDescription: `The Brazilian Butt Lift (BBL) is the fastest-growing cosmetic procedure in the US. It combines liposuction from donor areas (abdomen, flanks, thighs, back) with fat re-injection into the buttocks and hips, creating a \u201Csnatched waist\u201D effect paired with enhanced curves.

Approximately 60\u201380% of transferred fat survives long-term (20\u201330% is reabsorbed). Typical transfer volumes range from 300\u2013800cc per side. Key variations include the shape goal (natural, round, athletic, or dramatic), hip dip correction (filling the lateral concavities for a smooth S-curve), and donor area selection for the \u201C360 lipo\u201D component.

Our simulator shows both the buttock enhancement and the donor area slimming in a combined visualization. Fat survival rate adjustment shows the expected final result after absorption, and independent left/right balance controls address pre-existing asymmetry.`,
        benefits: [
            'Enhance buttock size and projection using your own fat',
            'Create a snatched waist with 360-degree liposuction',
            'Correct hip dips for smoother curves',
            'Choose from natural, round, athletic, or dramatic shape goals',
            'See combined donor slimming + buttock enhancement',
        ],
        pros: [
            'Dual benefit: liposuction slims donor areas while enhancing buttock shape',
            'Uses your own fat for natural look and feel',
            'Results are generally long-lasting once fat establishes blood supply',
            'Can create an hourglass figure difficult to achieve through exercise alone',
            'Avoids complications associated with synthetic buttock implants',
        ],
        cons: [
            'Historically the highest mortality rate of any cosmetic procedure',
            'Primary fatal risk is pulmonary fat embolism',
            'Not all transferred fat survives (60–80% retention typical)',
            'Risk of infection, asymmetry, fat necrosis, and contour irregularities',
            'Safety is extremely dependent on surgeon technique and certification',
        ],
        idealFor: 'Patients who want fuller, shapelier buttocks while also slimming donor areas like the abdomen and flanks.',
        recoveryTime: '2-3 weeks (no sitting on buttocks), 6-8 weeks (full activity)',
        procedureDuration: '3-5 hours',
        costRange: '$3,500 - $18,000',
        pricing: {
            us: { min: 8000, max: 15000 },
            thailand: { min: 5000, max: 8000 },
            'south-korea': { min: 6000, max: 12000 },
            india: { min: 3500, max: 6000 },
            singapore: { min: 10000, max: 18000 },
        },
        icon: '\u{1F351}',
        isNew: true,
        order: 21,
        simulateSlug: 'bbl',
        tier: 'A',
    },

    // ─── Hair Restoration (22-26) ────────────────────────────────────
    {
        slug: 'hair-transplant',
        name: 'Hair Transplant (FUE/FUT/DHI)',
        shortName: 'Hair Transplant',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Visualize hair transplant results with adjustable hairline design, graft density, and growth timeline. Compare FUE, FUT, and DHI techniques.',
        longDescription: `Hair transplantation involves extracting hair follicles from a donor area (back and sides of the scalp) and implanting them into thinning or bald areas. FUE (Follicular Unit Extraction) accounts for 75% of all procedures \u2014 individual follicles are extracted with a micro-punch (0.6\u20131.0mm). FUT (Follicular Unit Transplant) removes a strip of scalp for graft dissection. DHI (Direct Hair Implantation) uses a Choi implanter pen for simultaneous extraction and placement.

Typical graft counts range from 1,500 to 5,000 per session. Natural scalp density is 60\u201380 follicular units per cm\u00B2, with transplanted density goals of 30\u201350 FU/cm\u00B2. Graft survival rates reach 90\u201398% for FUE. Hair grows approximately 1cm per month, with visible results at 6\u201312 months post-procedure.

Our simulator lets you design your new hairline shape, select coverage zones, adjust graft density, and preview results across an 18-month growth timeline.`,
        benefits: [
            'Permanent, natural-looking hair restoration',
            'Design your ideal hairline shape before surgery',
            'Compare FUE, FUT, and DHI techniques',
            'Visualize graft density and coverage zones',
            'Preview results across the 18-month growth timeline',
        ],
        pros: [
            'Permanent, natural-looking results with 90%+ graft survival rates (FUE)',
            'Multiple technique options: FUE, DHI, and FUT for different needs',
            'Modern FUE and DHI leave minimal to no visible scarring',
            'One-time procedure for most patients',
            'DHI recovery can be as short as 3–5 days',
        ],
        cons: [
            'Results take 6–12 months to fully appear as follicles go through shedding and regrowth',
            'Limited by donor hair availability — extensive baldness may not have enough donor follicles',
            'FUT leaves a linear scar visible with short haircuts',
            'Does not stop ongoing hair loss — may need additional medical treatment',
            'Expensive ($3,000–$15,000+) and typically not covered by insurance',
        ],
        idealFor: 'Men and women experiencing pattern hair loss (Norwood 2-6), with sufficient donor hair density on the back and sides of the scalp.',
        recoveryTime: '7-10 days (grafts secure), 3-6 months (visible growth begins)',
        procedureDuration: '4-8 hours',
        costRange: '$1,500 - $15,000',
        pricing: {
            us: { min: 8000, max: 15000 },
            thailand: { min: 2000, max: 4000 },
            'south-korea': { min: 4000, max: 8000 },
            india: { min: 1500, max: 3000 },
            singapore: { min: 6000, max: 12000 },
        },
        icon: '\u{1F9D1}',
        isNew: true,
        order: 22,
        simulateSlug: 'hair-transplant',
        popularity: 'high',
        // Re-enabled 2026-05-03 — patient component now derives the face
        // bounding box from MediaPipe FaceLandmarker instead of the
        // hardcoded 25%/15%/50%/55% rectangle. Math fallback only fires
        // when MediaPipe explicitly fails (off-frame face, very obscure
        // angle, etc.) instead of being the default.
    },
    {
        slug: 'eyebrow-restoration',
        name: 'Eyebrow Restoration',
        shortName: 'Eyebrow Restoration',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Simulate eyebrow transplant and microblading results. Design brow shape, adjust density, and compare techniques.',
        longDescription: `Eyebrow restoration includes two primary approaches: eyebrow transplant (permanent) and microblading (semi-permanent). Transplant involves 250\u2013500 single-hair grafts per brow harvested from the scalp, each angled at 10\u201315\u00B0 to mimic natural growth patterns. Hair changes direction along the brow \u2014 upward near the nose, crisscross at the center, and lateral-downward at the tail.

Microblading is a form of semi-permanent tattooing using a handheld blade to create hair-like strokes in the epidermis. It lasts 1\u20133 years and fades over time. Especially popular in Korea, where straight/soft-angled brows are preferred over Western high arches.

Our simulator lets you design your ideal brow shape, compare transplant vs microblading results, adjust density and fill zones, and preview how microblading fades over time.`,
        benefits: [
            'Design your ideal eyebrow shape and arch',
            'Compare transplant vs microblading results',
            'Adjust density and fill specific zones',
            'Preview microblading fade over time',
            'Fine-tune symmetry between brows',
        ],
        pros: [
            'Permanent, natural-looking results using your own hair follicles',
            'Fully customizable shape, density, and arch for your facial features',
            'Unlike microblading, results do not fade or change color over time',
            'Transplanted hair blends seamlessly with existing eyebrow hair',
            'Safe procedure with generally mild side effects',
        ],
        cons: [
            'Transplanted scalp hair grows longer than eyebrow hair, requiring regular trimming',
            'Results take 6–12 months as transplanted hairs shed then regrow',
            'Expensive and not covered by insurance',
            'Possible poor graft survival or uneven growth if aftercare is inadequate',
            'Some patients need a touch-up session to achieve desired density',
        ],
        idealFor: 'Patients with thin, sparse, or over-plucked eyebrows, alopecia-related brow loss, or those wanting to change their brow shape.',
        recoveryTime: '5-7 days (transplant), 7-14 days (microblading)',
        procedureDuration: '2-4 hours (transplant), 1-2 hours (microblading)',
        costRange: '$800 - $5,000',
        pricing: {
            us: { min: 3000, max: 5000 },
            thailand: { min: 1500, max: 2500 },
            'south-korea': { min: 3400, max: 4800 },
            india: { min: 800, max: 1500 },
            singapore: { min: 3000, max: 5000 },
        },
        icon: '\u{1F440}',
        isNew: true,
        order: 23,
        simulateSlug: 'eyebrow-restoration',
    },
    {
        slug: 'scalp-micropigmentation',
        name: 'Scalp Micropigmentation (SMP)',
        shortName: 'SMP',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Preview scalp micropigmentation results. Simulate buzzcut look, density enhancement, hairline definition, and scar camouflage.',
        longDescription: `Scalp micropigmentation (SMP) is medical-grade micro-tattooing of the scalp. Tiny needles deposit pigment dots at 0.5mm depth into the epidermis to mimic the appearance of hair follicles cut close to the scalp. It creates the illusion of a full buzz-cut or adds density to thinning areas.

SMP uses organic pigments (not tattoo ink) that maintain color stability. It lasts 5\u201310 years with periodic touch-ups. Treatment requires 2\u20134 sessions of 2\u20133 hours each, with progressive density buildup: session 1 delivers ~30% density, session 2 reaches ~70%, and sessions 3\u20134 achieve full coverage.

Our simulator lets you preview different SMP goals including the buzzcut look, density enhancement through existing hair, hairline definition, and scar camouflage, with realistic Poisson-distributed dot patterns.`,
        benefits: [
            'Non-surgical solution for hair loss',
            'Create realistic buzzcut or density look',
            'Define or create a new hairline',
            'Camouflage scars from FUT or trauma',
            'See progressive results across sessions',
        ],
        pros: [
            'Non-surgical treatment with no anesthesia required and minimal downtime',
            'Near-instant visible results compared to treatments that take months',
            'More affordable than hair transplants at various budget levels',
            'Low maintenance with no special products or daily routines needed',
            'Effective for thinning, receding hairlines, alopecia, and scar concealment',
        ],
        cons: [
            'Does not actually grow hair — creates an illusion of a close-shaved look only',
            'Limits hairstyle options — existing hair must be kept very short',
            'Fading is inevitable, requiring touch-ups every 1–2 years',
            'Difficult and painful to remove if you change your mind',
            'Results are extremely practitioner-dependent — poor execution looks unnatural',
        ],
        idealFor: 'Patients with any degree of hair loss who want a non-surgical solution, those wanting to add density to thinning areas, or camouflage existing scars.',
        recoveryTime: '3-5 days per session (minimal)',
        procedureDuration: '2-3 hours per session (2-4 sessions)',
        costRange: '$500 - $4,000',
        pricing: {
            us: { min: 2000, max: 4000 },
            thailand: { min: 800, max: 2000 },
            'south-korea': { min: 1500, max: 3000 },
            india: { min: 500, max: 1500 },
            singapore: { min: 2000, max: 4000 },
        },
        icon: '\u2712\uFE0F',
        isNew: true,
        order: 24,
        simulateSlug: 'scalp-micropigmentation',
    },
    {
        slug: 'beard-transplant',
        name: 'Beard & Mustache Transplant',
        shortName: 'Beard Transplant',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Simulate beard and mustache transplant results. Choose style, adjust zone density, and preview patchy fill to full coverage.',
        longDescription: `Beard transplant uses FUE to harvest follicles from the scalp and implant them into the facial hair zone. Typical graft counts range from 1,000\u20133,000 for a full beard, 500\u20131,000 for a goatee or mustache, and 200\u2013500 for patchy fill. Each graft is placed at a 30\u201345\u00B0 angle following natural beard growth patterns.

Growth patterns vary by zone: cheek hair grows downward, chin hair grows slightly forward, mustache hair fans downward from center, and sideburns grow straight down. Natural beard density is 25\u201340 FU/cm\u00B2. Transplanted hairs initially shed at 2\u20134 weeks (\u201Cshock loss\u201D) before regrowing at 3\u20134 months with full results at 12\u201318 months.

Our simulator offers preset styles (full beard, goatee, chinstrap, Van Dyke, and more) with independent zone density controls, growth timeline preview, and hair property customization.`,
        benefits: [
            'Fix patchy or thin facial hair',
            'Choose from preset beard styles or customize zones',
            'Independent density control for each facial zone',
            'Preview results across 18-month growth timeline',
            'Growing fast in Middle East and Asian markets',
        ],
        pros: [
            'Permanent results — transplanted hair grows naturally and can be groomed',
            'Effectively fills patchy or uneven facial hair',
            'Uses your own hair for realistic, natural-looking results',
            'Relatively quick procedure with mostly manageable discomfort',
            'Significant psychological benefit for men who value facial hair',
        ],
        cons: [
            'Success rate of 60–80%, meaning a second transplant may be needed',
            'Requires adequate scalp donor hair — not suitable for extensive scalp hair loss',
            'Swelling, redness, and puffiness common for 2–3 days post-surgery',
            'Recovery takes up to 2 weeks with careful aftercare needed',
            'Transplanted hair may have slightly different texture than native facial hair',
        ],
        idealFor: 'Men with patchy or thin facial hair, those unable to grow a full beard, or patients wanting a specific designer beard style.',
        recoveryTime: '7-10 days (grafts secure), 3-4 months (regrowth begins)',
        procedureDuration: '4-8 hours',
        costRange: '$1,000 - $15,000',
        pricing: {
            us: { min: 5000, max: 15000 },
            thailand: { min: 2000, max: 3500 },
            'south-korea': { min: 3000, max: 6000 },
            india: { min: 1000, max: 2500 },
            singapore: { min: 4000, max: 8000 },
        },
        icon: '\u{1F9D4}',
        isNew: true,
        order: 25,
        simulateSlug: 'beard-transplant',
    },
    {
        slug: 'hairline-lowering',
        name: 'Hairline Lowering (Forehead Reduction)',
        shortName: 'Hairline Lowering',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Visualize hairline lowering results. Compare surgical advancement vs transplant grafting. Adjust forehead height and hairline shape.',
        longDescription: `Hairline lowering addresses a high or disproportionately large forehead. Two primary methods exist: surgical hairline advancement involves an incision at the existing hairline, pulling the scalp forward, and excising excess forehead skin \u2014 lowering by 1\u20133cm with a thin scar along the hairline. Hairline transplant uses FUE/DHI grafts to create a lower hairline without surgery, achieving 2\u20135cm of lowering with 1,500\u20133,000+ grafts.

This procedure is extremely popular in Korea where smaller foreheads are culturally preferred. It\u2019s often combined with hair transplant for temple corner filling. Ideal forehead height is 5\u20136cm for women and 6\u20137cm for men, measured from the brow to the hairline at center.

Our simulator shows dramatic before/after forehead proportion changes with Korean-style bell curve hairline design, temple triangle fill options, and forehead measurement overlay.`,
        benefits: [
            'Dramatically reduce forehead height',
            'Korean-style bell curve hairline design',
            'Compare surgical vs transplant approaches',
            'Preview temple triangle fill',
            'Forehead measurement overlay',
        ],
        pros: [
            'Dramatic improvement in facial proportions with immediate visible results',
            'Low complication rate (<1%) based on published meta-analysis',
            'Permanent results that enhance facial balance',
            'Can be combined with hair transplant for additional density',
            'Single procedure — no waiting months for hair growth',
        ],
        cons: [
            'Leaves a scar along the new hairline that may show if hair recedes with age',
            'Risk of temporary or permanent hair loss around the incision site',
            'Numbness and altered forehead sensation are common',
            'Not suitable for patients with active or progressive hair loss',
            'Limited advancement possible — determined by individual scalp laxity',
        ],
        idealFor: 'Patients with a high forehead or large forehead-to-face ratio, especially popular among women and Korean aesthetic patients.',
        recoveryTime: '7-14 days (surgical), 7-10 days (transplant)',
        procedureDuration: '2-4 hours',
        costRange: '$1,500 - $14,000',
        pricing: {
            us: { min: 8000, max: 14000 },
            thailand: { min: 3000, max: 5000 },
            'south-korea': { min: 4000, max: 8000 },
            india: { min: 1500, max: 3500 },
            singapore: { min: 5000, max: 10000 },
        },
        icon: '\u{1F4CF}',
        isNew: true,
        order: 26,
        simulateSlug: 'hairline-lowering',
        // Re-enabled 2026-05-03 — forehead-reduction.ts now anchors the
        // hairline band off MediaPipe forehead-top landmarks instead of
        // a canvas-relative `height * 0.18`. Safely no-ops when landmarks
        // are missing (no more cheek/eye stripes on non-portrait crops).
    },
    {
        slug: 'brow-lift',
        name: 'Brow Lift (Forehead Lift)',
        shortName: 'Brow Lift',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Visualize eyebrow elevation and forehead rejuvenation. Preview lateral, medial, and overall brow position adjustments.',
        longDescription: `A brow lift (forehead lift) raises the eyebrows and smooths forehead wrinkles, restoring a more alert, refreshed, and youthful appearance. The procedure addresses drooping brows that may partially hood the upper eyelids, deep forehead creases, and the frown lines between the brows.

Several techniques are available: the endoscopic brow lift uses small incisions and a camera for minimal scarring and shorter recovery; the temporal (lateral) brow lift targets outer brow descent through hairline incisions; and the classic coronal lift — less common today — involves a single incision across the top of the scalp for maximal lift.

Our simulator visualizes brow position changes, forehead line reduction, and the interplay between brow height and upper eyelid appearance. Adjust medial brow height, lateral brow arch, and overall elevation to explore different aesthetic outcomes.`,
        benefits: [
            'Elevate drooping or flat brows for a more alert expression',
            'Smooth forehead lines and frown creases',
            'Reduce upper eyelid hooding caused by brow ptosis',
            'Long-lasting results — typically 5–10 years',
            'Can be combined with blepharoplasty for comprehensive upper-face rejuvenation',
        ],
        pros: [
            'Long-lasting correction of sagging brows, forehead lines, and frown creases',
            'Makes face appear more alert, rested, and approachable',
            'Endoscopic technique uses small, hidden incisions with minimal scarring',
            'Can reduce need for upper eyelid surgery by lifting brow weight off eyelids',
            'Improves facial symmetry by repositioning asymmetric brows',
        ],
        cons: [
            'Risk of nerve damage leading to facial muscle weakness or asymmetry',
            'Over-lifting can create a "surprised" expression that is hard to reverse',
            'General anesthesia required for most surgical approaches',
            'Temporary hair loss around incision sites is possible',
            'Results eventually diminish as natural aging continues',
        ],
        idealFor: 'Patients with brow ptosis (drooping eyebrows), heavy forehead creases, or an aged, tired, or stern resting expression who want upper-face rejuvenation without full facelift surgery.',
        recoveryTime: '7–10 days bruising, 2–4 weeks swelling',
        procedureDuration: '1–2 hours',
        costRange: '$4,000 – $7,000',
        pricing: {
            us: { min: 4000, max: 7000 },
            thailand: { min: 3529, max: 6471 },
            'south-korea': { min: 3333, max: 5926 },
            india: { min: 1200, max: 3500 },
            singapore: { min: 3000, max: 8000 },
        },
        icon: '\u{1F928}',
        order: 27,
        simulateSlug: 'brow-lift',
    },
    {
        slug: 'lip-augmentation',
        name: 'Lip Augmentation',
        shortName: 'Lip Augmentation',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Simulate lip volume, shape, and definition changes with filler or implant augmentation. Adjust upper-to-lower lip ratio and cupid\'s bow.',
        longDescription: `Lip augmentation enhances the size, shape, and definition of the lips using injectable fillers (most commonly hyaluronic acid such as Juvederm or Restylane), fat transfer, or surgical implants. The goal is to create fuller, more balanced, and defined lips proportional to the rest of the face.

Key parameters include overall volume (upper and lower lip independently), cupid's bow definition, vermilion border sharpening, upper lip height (philtrum relationship), and corner lift. HA filler results are temporary — lasting 6–12 months — and fully reversible with hyaluronidase, making it the most popular approach for first-time patients.

Our simulator maps volume and shape changes across the upper and lower lip using anatomical landmarks. Adjust individual parameters to preview different augmentation levels — from a subtle definition enhancement to a fuller, more dramatic result — while maintaining natural proportions.`,
        benefits: [
            'Fuller, more defined lips with natural-looking results',
            'Improve upper-to-lower lip ratio and cupid\'s bow shape',
            'Reversible HA filler option for first-time patients',
            'No downtime for injectable augmentation',
            'Customizable volume — subtle enhancement to significant fullness',
        ],
        pros: [
            'Multiple approaches (fillers, fat transfer, implants) to match different goals',
            'HA fillers offer immediate results and are reversible with hyaluronidase',
            'Quick procedure (10–30 minutes for fillers) in a single office visit',
            'Gradual enhancement possible — build volume over multiple sessions',
            'Fat transfer provides longer-lasting results using your own tissue',
        ],
        cons: [
            'Filler results are temporary (6–18 months), requiring ongoing maintenance',
            'Overfilling is a common concern, creating an unnatural "duck lip" appearance',
            'Bruising and swelling at injection sites are nearly universal for several days',
            'Vascular occlusion risk with fillers (rare but can cause tissue damage)',
            'Fat transfer results are unpredictable — variable survival means uneven outcomes',
        ],
        idealFor: 'Patients with naturally thin lips, asymmetric lips, age-related lip volume loss, or those seeking improved lip definition and a more balanced lip-to-face ratio.',
        recoveryTime: '1–3 days minor swelling',
        procedureDuration: '15–30 minutes (filler); 1–2 hours (surgical)',
        costRange: '$600 – $1,500',
        pricing: {
            us: { min: 600, max: 1500 },
            thailand: { min: 529, max: 1324 },
            'south-korea': { min: 519, max: 1333 },
            india: { min: 120, max: 500 },
            singapore: { min: 350, max: 1200 },
        },
        icon: '\u{1F48B}',
        order: 28,
        simulateSlug: 'lip-augmentation',
        tier: 'A',
    },
    // ─── Educational catalog expansion (29-33) ──────────────────────────────
    // High-traffic procedures NOT yet wired with a simulator. Each entry
    // drives the /procedures/[slug] educational page (SEO + lead-gen) and
    // is gated as `comingSoon: true` so the simulator route shows a
    // "consultation only" CTA instead of a broken simulator. Medical
    // accuracy: drafted from publicly-published outcome data; recommend
    // surgeon review before promoting these pages prominently.
    {
        slug: 'otoplasty',
        name: 'Otoplasty (Ear Pinning / Reshaping)',
        shortName: 'Otoplasty',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Ear pinning, reshaping, and prominence correction to create a more proportionate facial profile. One of the most predictable and high-satisfaction facial procedures.',
        longDescription: `Otoplasty corrects prominent or asymmetrical ears by reshaping the cartilage and bringing the ear closer to the side of the head. It is one of the most commonly performed facial procedures in children but is equally suitable for adults — the cartilage finishes developing by age 5–6, after which the procedure is anatomically straightforward.

The most common technique uses a small incision behind the ear to access the cartilage, which is then folded, scored, or sutured into a more natural anti-helical fold. Modern techniques minimize visible scarring by hiding all incisions behind the ear. The procedure can be performed under local anesthesia with sedation in most adult cases.

Our planning tool models conchal-mastoid distance reduction, anti-helical fold creation, and earlobe positioning relative to the standard 1.5–2cm protrusion target. Symmetry between ears is the primary aesthetic measure — surgeons aim for a sub-3mm bilateral difference at the helical apex.`,
        benefits: [
            'Reduce ear prominence and improve facial proportions',
            'Correct asymmetry between left and right ears',
            'Predictable, long-lasting results — one of the highest-satisfaction facial surgeries',
            'Hidden incisions behind the ear leave no visible scars',
            'Suitable for both children (after age 5) and adults',
        ],
        pros: [
            'High patient satisfaction rates (>90% in most published series)',
            'Permanent results — cartilage maintains its new shape long-term',
            'Outpatient procedure with relatively quick recovery',
            'No visible scarring when performed by an experienced surgeon',
            'Significant psychological benefit, especially for children with self-consciousness about ear shape',
        ],
        cons: [
            'Risk of asymmetry, suture extrusion, or recurrence (~5–10% of cases)',
            'Cartilage can occasionally "spring back" toward its original shape',
            'Requires headband compression for 1–2 weeks post-op',
            'Hematoma formation behind the ear is a known early complication',
            'Not covered by insurance in most jurisdictions for cosmetic indication',
        ],
        idealFor: 'Patients with prominent ears (concha-mastoid distance >2cm), asymmetric ear position, or constricted/lop ear deformities. Equally suitable for adults and children over age 5.',
        recoveryTime: '7–14 days (compression headband), 4–6 weeks (full activity)',
        procedureDuration: '1.5–2.5 hours',
        costRange: '$3,000 – $7,000',
        pricing: {
            us: { min: 3000, max: 7000 },
            thailand: { min: 1200, max: 3000 },
            'south-korea': { min: 1500, max: 4000 },
            india: { min: 600, max: 1800 },
            singapore: { min: 2500, max: 6000 },
        },
        icon: '\u{1F442}',
        order: 29,
        simulateSlug: 'otoplasty',
        popularity: 'medium',
    },
    {
        slug: 'cryolipolysis',
        name: 'Cryolipolysis (CoolSculpting)',
        shortName: 'CoolSculpting',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Non-surgical fat reduction by controlled cooling. Treats stubborn fat pockets in flanks, abdomen, thighs, arms, submental area, and more without incisions or downtime.',
        longDescription: `Cryolipolysis (commercially known as CoolSculpting) reduces localized fat by exposing adipose tissue to controlled cooling. Fat cells are more sensitive to cold than surrounding tissues — they undergo apoptosis (programmed cell death) at temperatures that don't damage skin, nerves, or muscle. The body then clears the dead fat cells through normal lymphatic and metabolic pathways over 2–4 months.

Each treatment session targets one or more "pinchable" fat pockets — common areas include the flanks ("love handles"), lower abdomen, inner/outer thighs, upper arms, submental area (double chin), and bra rolls. A vacuum applicator pulls the tissue into a cooling chamber for 35–60 minutes per area. Most patients see a 20–25% fat reduction per treatment in the targeted area; multiple sessions are often combined for 2–3× that result.

The procedure does NOT shrink existing fat cells (as diet and exercise do) — it permanently removes a portion of them. This makes it durable as long as overall weight is maintained. It is not a weight-loss tool; ideal candidates are within 10–15kg of their target weight with discrete, treatment-resistant fat deposits.`,
        benefits: [
            'Non-surgical with no incisions, anesthesia, or recovery time',
            'Permanent fat-cell reduction (~20–25% per session)',
            'Treats areas resistant to diet and exercise',
            'Multiple body areas can be treated per session',
            'Return to normal activity immediately after treatment',
        ],
        pros: [
            'No downtime — return to work and exercise the same day',
            'No needles, no incisions, no scarring',
            'Durable results when weight is maintained',
            'Wide range of treatment areas including the submental fat / "double chin"',
            'FDA-cleared for several body areas with extensive safety data',
        ],
        cons: [
            'Modest fat reduction (~20–25%) — multiple sessions often needed for visible change',
            'Results take 2–4 months to fully appear',
            'Rare but documented risk of paradoxical adipose hyperplasia (PAH) — fat enlargement in the treated area, more common in men',
            'Numbness, bruising, and tingling for 1–2 weeks post-treatment',
            'Not suitable for visceral fat or significant weight loss — only "pinchable" subcutaneous fat',
        ],
        idealFor: 'Patients near their target weight with localized, treatment-resistant fat pockets who want non-surgical body contouring without downtime.',
        recoveryTime: 'No downtime; mild numbness/swelling for 1–2 weeks',
        procedureDuration: '35–60 minutes per area; multiple areas can be combined',
        costRange: '$700 – $4,000 per session',
        pricing: {
            us: { min: 700, max: 4000 },
            thailand: { min: 400, max: 1800 },
            'south-korea': { min: 500, max: 2500 },
            india: { min: 300, max: 1500 },
            singapore: { min: 800, max: 3500 },
        },
        icon: '❄️',
        order: 30,
        simulateSlug: 'cryolipolysis',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'hifu',
        name: 'HIFU (Ultherapy / High-Intensity Focused Ultrasound)',
        shortName: 'HIFU / Ultherapy',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Non-surgical face and neck lifting using focused ultrasound energy to stimulate collagen production at SMAS depth. The closest non-surgical equivalent to a facelift.',
        longDescription: `HIFU (High-Intensity Focused Ultrasound), branded by various devices including Ultherapy, delivers focused ultrasound energy to precise depths below the skin to trigger collagen remodeling. Unlike radiofrequency or laser, HIFU can reach the SMAS (Superficial Musculoaponeurotic System) — the same fibrous layer surgeons tighten in a traditional facelift — without disturbing the surface of the skin.

Energy is delivered through a transducer placed on the skin, creating thermal coagulation points at three depths (1.5mm, 3.0mm, and 4.5mm) corresponding to dermal, subdermal, and SMAS-level tissue. The body responds with a months-long collagen-and-elastin remodeling cascade. Most patients see visible lift improvement at 2–3 months, peaking at 6 months, with results lasting 12–18 months.

Common treatment zones include the brow, mid-face, jawline, jowls, and submental area. HIFU is most effective on patients with mild-to-moderate skin laxity (typically 35–65 years old). It does not replace a surgical facelift for severe laxity but offers meaningful tightening for the majority of patients who aren't ready for surgery.`,
        benefits: [
            'Lift and tighten the brow, jawline, neck, and submental area without surgery',
            'Stimulates the body\'s own collagen production for natural-looking results',
            'No incisions, no anesthesia, no downtime',
            'Targets the same SMAS layer addressed in a surgical facelift',
            'Results last 12–18 months and can be repeated',
        ],
        pros: [
            'Closest non-surgical equivalent to a facelift in mechanism',
            'No incisions, scars, or anesthesia',
            'Treatment usually a single 60–90 minute session',
            'Results build gradually — no obvious "post-procedure" appearance',
            'Multiple FDA-cleared devices with extensive long-term safety data',
        ],
        cons: [
            'Discomfort during treatment (described as deep, sharp heat at SMAS-depth points)',
            'Mild redness, swelling, and tenderness for 1–2 days post-treatment',
            'Results are subtle compared to a surgical facelift — not a substitute for severe laxity',
            'Full effect takes 3–6 months; impatient patients may feel underwhelmed initially',
            'Very rare but documented risk of bruising, nerve irritation, or muscle weakness from incorrect transducer placement',
        ],
        idealFor: 'Patients aged 35–65 with mild-to-moderate skin laxity in the face, neck, or brow who want a non-surgical lift, or younger patients seeking preventive collagen stimulation.',
        recoveryTime: 'No downtime; mild redness/swelling for 1–2 days',
        procedureDuration: '60–90 minutes',
        costRange: '$1,500 – $5,000',
        pricing: {
            us: { min: 1500, max: 5000 },
            thailand: { min: 600, max: 2400 },
            'south-korea': { min: 800, max: 3000 },
            india: { min: 400, max: 1800 },
            singapore: { min: 1200, max: 4000 },
        },
        icon: '\u{1F30A}',
        order: 31,
        simulateSlug: 'hifu',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'microneedling',
        name: 'Microneedling (Collagen Induction Therapy)',
        shortName: 'Microneedling',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Controlled micro-injuries with fine needles trigger natural collagen production. Treats acne scars, fine lines, enlarged pores, stretch marks, and skin texture concerns.',
        longDescription: `Microneedling — also known as Collagen Induction Therapy or Skin Needling — uses an array of very fine needles (0.25–3.0mm depending on indication) to create thousands of controlled micro-injuries in the skin. These tiny punctures trigger the body's natural wound-healing cascade, stimulating fibroblasts to produce new collagen and elastin without damaging the epidermis.

The procedure can be performed with manual rollers (less precise), automated pens (the modern standard), or radiofrequency-enabled devices (RF microneedling — more aggressive, treats deeper layers). Treatment depth is calibrated to the indication: 0.5mm for surface texture and pore size, 1.5–2mm for fine lines, and 2.5–3mm for acne scars and stretch marks.

Most patients require 3–6 sessions spaced 4–6 weeks apart for optimal results. Improvements continue for 3–6 months after the final session as collagen remodels. Microneedling is one of the most versatile non-surgical treatments — appropriate for nearly all skin types and tones (including darker skin where lasers carry pigmentation risks).`,
        benefits: [
            'Improve acne scars, fine lines, enlarged pores, and skin texture',
            'Safe for all skin types, including darker skin tones where lasers may risk pigmentation',
            'Stimulates the body\'s natural collagen production',
            'Can be combined with PRP, growth factors, or topical actives for enhanced results',
            'Treats stretch marks on body areas as well as facial concerns',
        ],
        pros: [
            'Effective on a wide range of skin concerns with minimal risk',
            'Safe for all Fitzpatrick skin types (I–VI)',
            'Far less expensive than ablative laser treatments',
            'Multiple device options — from at-home rollers to in-office RF microneedling',
            'Synergistic with topicals (results enhanced by PRP, hyaluronic acid, or peptides)',
        ],
        cons: [
            'Requires 3–6 sessions for best results — not a one-time fix',
            'Mild redness, pinpoint bleeding, and sensitivity for 1–3 days post-session',
            'Results are gradual and subtle — peak effect at 3–6 months',
            'At-home rollers carry infection risk if not properly sanitized',
            'Less aggressive than ablative lasers for severe scarring or deep wrinkles',
        ],
        idealFor: 'Patients with acne scars, fine lines, enlarged pores, mild skin laxity, uneven texture, or stretch marks who want a versatile, low-risk non-surgical treatment.',
        recoveryTime: 'No formal downtime; redness and pinpoint bleeding for 1–3 days',
        procedureDuration: '30–60 minutes per session',
        costRange: '$200 – $700 per session ($1,200 – $4,000 for a 6-session course)',
        pricing: {
            us: { min: 200, max: 700 },
            thailand: { min: 80, max: 300 },
            'south-korea': { min: 100, max: 400 },
            india: { min: 50, max: 250 },
            singapore: { min: 180, max: 600 },
        },
        icon: '\u{1FA7B}',
        order: 32,
        simulateSlug: 'microneedling',
        popularity: 'high',
    },
    {
        slug: 'breast-reduction',
        name: 'Breast Reduction (Reduction Mammoplasty)',
        shortName: 'Breast Reduction',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Surgical reduction of breast size to relieve back/shoulder pain, improve posture, and achieve proportionate body contour. Often medically necessary and insurance-covered.',
        longDescription: `Breast reduction (reduction mammoplasty) removes excess breast tissue, fat, and skin to create smaller, lighter, better-proportioned breasts. Unlike most cosmetic procedures, breast reduction often qualifies as medically necessary for women with documented physical symptoms — chronic back/shoulder/neck pain, postural issues, skin irritation under the breast crease, or grooves from bra straps — and is covered by many insurance plans when those symptoms are properly documented.

The most common technique uses an anchor or vertical (lollipop) incision pattern, removing tissue and repositioning the nipple-areola complex on its own blood supply. For patients seeking modest reduction with minimal scarring, scarless or short-scar approaches are sometimes possible. Recovery is significant — 2-3 weeks before resuming most activities and 6 weeks before strenuous exercise — but patient satisfaction rates are among the highest in plastic surgery (>95% in published series).`,
        benefits: [
            'Relieves chronic back, neck, and shoulder pain',
            'Improves posture and ability to exercise',
            'Eliminates skin irritation and infections under the breast crease',
            'Often covered by health insurance when symptoms are documented',
            'Among the highest patient-satisfaction procedures in plastic surgery',
        ],
        pros: [
            'Often insurance-covered (unlike most cosmetic surgery)',
            'Resolves long-standing physical pain in addition to aesthetic improvement',
            'Patient satisfaction rates >95% in most published series',
            'Permanent results when weight is maintained',
            'Can dramatically improve quality of life and exercise capacity',
        ],
        cons: [
            'Permanent scars in anchor or lollipop pattern',
            'Loss of nipple sensation in 5-10% of cases',
            'Reduced ability to breastfeed afterwards (varies by technique)',
            'Recovery is significant — 2-3 weeks limited activity, 6 weeks no strenuous exercise',
            'Risk of asymmetry, hematoma, infection, and wound healing issues',
        ],
        idealFor: 'Women with disproportionately large breasts experiencing back/shoulder/neck pain, postural issues, exercise limitations, or skin irritation. Insurance coverage typically requires documented symptoms.',
        recoveryTime: '2-3 weeks (light activity), 6 weeks (full exercise)',
        procedureDuration: '2-4 hours',
        costRange: '$5,500 - $12,000 (often insurance-covered)',
        pricing: {
            us: { min: 5500, max: 12000 },
            thailand: { min: 2500, max: 5500 },
            'south-korea': { min: 3000, max: 7000 },
            india: { min: 1800, max: 4500 },
            singapore: { min: 5000, max: 10000 },
        },
        icon: '\u{1F49C}',
        order: 34,
        simulateSlug: 'breast-reduction',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'breast-lift',
        name: 'Breast Lift (Mastopexy)',
        shortName: 'Breast Lift',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Reshapes and elevates sagging breasts by removing excess skin and tightening surrounding tissue. Restores a youthful breast contour without changing volume.',
        longDescription: `Breast lift (mastopexy) addresses ptosis — the medical term for breast sag — by removing excess skin and reshaping the underlying breast tissue. Unlike breast reduction, mastopexy does not significantly change breast volume; it primarily restores shape and position. Common causes of ptosis include pregnancy, breastfeeding, weight fluctuation, aging, and gravity over time.

Surgeons select the incision pattern based on the degree of ptosis: a circumareolar (donut) lift for mild cases, vertical (lollipop) for moderate, and anchor (Wise pattern) for severe. Many patients combine mastopexy with breast augmentation (mastopexy-augmentation) when both shape correction and volume restoration are desired — this is one of the most technically demanding procedures in cosmetic breast surgery and patient outcomes vary significantly with surgeon experience.`,
        benefits: [
            'Restores a more youthful, lifted breast contour',
            'Repositions the nipple-areola complex to a higher position',
            'Reduces stretched or oversized areolas',
            'Can be combined with implants for both lift and volume',
            'Long-lasting results when weight and pregnancy plans are stable',
        ],
        pros: [
            'Addresses sag without dramatically changing breast volume',
            'Multiple incision options to match the degree of ptosis',
            'Can be combined with augmentation for comprehensive correction',
            'Permanent results in stable-weight patients',
            'High satisfaction when expectations are properly set',
        ],
        cons: [
            'Permanent scars (more visible than augmentation alone)',
            'Future pregnancy or weight changes can recreate ptosis',
            'Loss of nipple sensation in 5-15% of cases',
            'Combined mastopexy-augmentation has higher revision rates',
            'Not insurance-covered (purely cosmetic)',
        ],
        idealFor: 'Women with moderate to severe breast ptosis from pregnancy, weight loss, or aging who want to restore breast position and shape without significant volume change.',
        recoveryTime: '1-2 weeks (light activity), 4-6 weeks (full exercise)',
        procedureDuration: '2-3 hours',
        costRange: '$5,000 - $10,000',
        pricing: {
            us: { min: 5000, max: 10000 },
            thailand: { min: 2500, max: 5500 },
            'south-korea': { min: 3000, max: 7000 },
            india: { min: 1500, max: 4000 },
            singapore: { min: 4500, max: 9000 },
        },
        icon: '\u{1F49E}',
        order: 35,
        simulateSlug: 'breast-lift',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'neck-lift',
        name: 'Neck Lift (Cervicoplasty / Platysmaplasty)',
        shortName: 'Neck Lift',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Targeted surgery to address neck laxity, "turkey wattle" banding, and submental fullness. Often combined with facelift or done as a standalone for younger candidates.',
        longDescription: `Neck lift surgery addresses the specific anatomy of the neck rather than the face overall — making it appropriate for patients whose primary aging concerns are centered below the jaw. The procedure typically combines two techniques: cervicoplasty (removing excess skin) and platysmaplasty (tightening the platysma muscle responsible for visible vertical neck bands, sometimes called "turkey wattle"). Submental liposuction or direct fat excision is often added when neck fullness is the primary concern.

Incisions are placed behind the ear and sometimes under the chin, hidden in natural creases. For patients with significant skin laxity, neck lift is often combined with facelift for harmonious results — addressing the neck alone in someone with significant midface aging can create a "good neck on an old face" disparity. Younger patients with isolated neck concerns are excellent standalone candidates.`,
        benefits: [
            'Eliminates "turkey wattle" vertical neck banding',
            'Restores defined jawline and cervicomental angle',
            'Addresses submental (under-chin) fullness',
            'Can be done as standalone or combined with facelift',
            'Results last 8-12+ years in most patients',
        ],
        pros: [
            'Targeted procedure for the specific aging concern',
            'Hidden incisions behind the ear and under the chin',
            'Less invasive than full facelift for isolated neck issues',
            'Can dramatically improve profile photographs',
            'Long-lasting results',
        ],
        cons: [
            'Bruising and swelling for 2-3 weeks',
            'Risk of nerve injury affecting smile or sensation',
            'Possible visible scars under the chin if not well-placed',
            'May highlight midface aging when neck is corrected alone',
            'Permanent results require maintaining stable weight',
        ],
        idealFor: 'Patients with isolated neck concerns — turkey wattle, submental fullness, or loss of jawline definition — who want targeted correction without full facelift.',
        recoveryTime: '10-14 days (return to work), 4-6 weeks (full activity)',
        procedureDuration: '2-3 hours',
        costRange: '$6,000 - $13,000',
        pricing: {
            us: { min: 6000, max: 13000 },
            thailand: { min: 2500, max: 6000 },
            'south-korea': { min: 3500, max: 8500 },
            india: { min: 1800, max: 4500 },
            singapore: { min: 5500, max: 11000 },
        },
        icon: '\u{1F4AB}',
        order: 36,
        simulateSlug: 'neck-lift',
        popularity: 'medium',
    },
    {
        slug: 'labiaplasty',
        name: 'Labiaplasty',
        shortName: 'Labiaplasty',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Reshaping of the labia minora and/or majora to address discomfort, asymmetry, or aesthetic concerns. The simulator is an expectation visualizer — it shows post-procedure healing texture and tone, not precise geometric outcome (the surgeon is the source of truth on shape).',
        longDescription: `Labiaplasty reshapes the labia minora (inner) and/or labia majora (outer) tissues. Indications range from physical discomfort during exercise, intercourse, or wearing tight clothing, to aesthetic preferences and post-childbirth changes. The procedure is one of the fastest-growing cosmetic surgeries globally — driven by increased patient awareness, surgeon expertise, and reduced stigma around discussing genital concerns.

Two main techniques exist for the labia minora: trim (linear excision of excess tissue along the edge) and wedge (V-shaped removal preserving the natural edge). Wedge resection generally preserves more sensation and produces a more natural-looking edge but is technically more demanding. Recovery is shorter than most surgeries — most patients return to desk work in 3-7 days, exercise in 4-6 weeks, and intercourse in 6-8 weeks.`,
        benefits: [
            'Eliminates discomfort during exercise, sex, or with tight clothing',
            'Improves confidence and intimate well-being',
            'Corrects post-childbirth or asymmetry-related changes',
            'Hidden scars within natural anatomy',
            'High satisfaction rates (>90% in published outcomes)',
        ],
        pros: [
            'Outpatient procedure with relatively short recovery',
            'Both physical and psychological benefits commonly reported',
            'Wedge technique preserves edge anatomy and sensation',
            'Long-lasting results (effectively permanent)',
            'Procedure technique has matured significantly with high safety',
        ],
        cons: [
            'Risk of over-resection (trim technique) — irreversible',
            'Wound dehiscence risk in early healing',
            'Sexual abstinence required for 6-8 weeks',
            'Stigma around discussing the procedure delays many candidates',
            'Not insurance-covered (cosmetic indication)',
        ],
        idealFor: 'Patients with physical discomfort, asymmetry, or aesthetic concerns regarding the labia. Both trim and wedge techniques have specific indications discussed at consultation.',
        recoveryTime: '3-7 days (desk work), 4-6 weeks (exercise), 6-8 weeks (intercourse)',
        procedureDuration: '1-1.5 hours',
        costRange: '$3,500 - $8,000',
        pricing: {
            us: { min: 3500, max: 8000 },
            thailand: { min: 1500, max: 3500 },
            'south-korea': { min: 2000, max: 5000 },
            india: { min: 1000, max: 2500 },
            singapore: { min: 3000, max: 6500 },
        },
        icon: '\u{1F338}',
        order: 37,
        simulateSlug: 'labiaplasty',
        saleReady: false,
        popularity: 'medium',
    },
    {
        slug: 'emsculpt',
        name: 'Emsculpt / EmSculpt NEO (Muscle Stimulation + Fat Reduction)',
        shortName: 'Emsculpt',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'High-intensity focused electromagnetic (HIFEM) energy that triggers ~20,000 supramaximal muscle contractions per session. Builds muscle and reduces fat simultaneously — non-invasive.',
        longDescription: `Emsculpt (and the newer EmSculpt NEO with added radiofrequency) uses High-Intensity Focused Electromagnetic (HIFEM) energy to trigger supramaximal muscle contractions far beyond what voluntary effort can produce. A single 30-minute session delivers approximately 20,000 contractions — the equivalent, by some marketing claims, of doing thousands of crunches or squats.

Most commonly applied to the abdomen, buttocks, thighs, and arms, the technology builds muscle mass (~16% increase per typical 4-session protocol) while simultaneously reducing fat in the treated area (~19% reduction with NEO's added RF). It's not a weight-loss tool but rather a body-contouring and muscle-toning intervention. Best results occur in patients already near their target weight who want enhanced muscle definition without time-intensive gym work.`,
        benefits: [
            'Builds muscle mass (~16% increase) without exercise time',
            'Reduces fat in treated area (~19% with NEO)',
            'Non-invasive — no needles, no incisions, no downtime',
            'Treats abdomen, buttocks, thighs, arms, and calves',
            'Each session ~30 minutes; standard protocol is 4 sessions',
        ],
        pros: [
            'Combines muscle building and fat reduction in one technology',
            'No downtime — return to normal activity immediately',
            'Non-invasive with extensive safety data',
            'Time-efficient compared to gym-based muscle building',
            'Can target areas difficult to isolate with traditional exercise',
        ],
        cons: [
            'Expensive — typical 4-session course $3,000-$5,000',
            'Maintenance sessions needed every 3-6 months for best results',
            'Not a weight-loss tool — best for already-fit patients',
            'Muscle soreness for 1-2 days after each session',
            'Contraindicated for patients with metal implants near treatment area or pacemakers',
        ],
        idealFor: 'Patients near their target weight who want enhanced muscle definition and modest fat reduction without surgery or extensive gym time.',
        recoveryTime: 'No downtime; muscle soreness for 1-2 days',
        procedureDuration: '30 minutes per session; typical course is 4 sessions',
        costRange: '$3,000 - $5,000 for 4-session course',
        pricing: {
            us: { min: 3000, max: 5000 },
            thailand: { min: 1500, max: 2800 },
            'south-korea': { min: 1800, max: 3500 },
            india: { min: 1000, max: 2200 },
            singapore: { min: 2500, max: 4500 },
        },
        icon: '\u{1F4AA}',
        order: 38,
        simulateSlug: 'emsculpt',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'kybella',
        name: 'Kybella (Submental Fat Injection)',
        shortName: 'Kybella',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'FDA-approved injectable (deoxycholic acid) that destroys submental fat cells under the chin. Permanently reduces "double chin" appearance — alternative to surgical or cryolipolysis approaches.',
        longDescription: `Kybella (deoxycholic acid) is an injectable solution FDA-approved specifically for the reduction of submental (under-chin) fat — what most patients call a "double chin". The active ingredient is a synthetic version of a naturally occurring bile acid that destroys fat-cell membranes, causing those cells to be permanently removed via the body's lymphatic system.

Treatment involves a series of small injections into the fat under the chin — typically 20-50 injections per session — performed in the office in 15-30 minutes. Most patients require 2-4 sessions spaced 4-6 weeks apart for visible reduction. Once destroyed, the fat cells do not regenerate, making results durable as long as overall weight is maintained. Side effects include significant swelling that can last 1-2 weeks, hardness in the area for several weeks, and occasional bruising — all expected and resolve on their own.`,
        benefits: [
            'FDA-approved specifically for submental (chin) fat',
            'Permanent destruction of fat cells in the treated area',
            'Non-surgical — no incisions, no general anesthesia',
            'Each session is 15-30 minutes in-office',
            'Alternative for patients who prefer not to do CoolSculpting',
        ],
        pros: [
            'Targeted specifically at the under-chin area',
            'Non-surgical with no incisions or scarring',
            'Permanent fat-cell destruction in treated area',
            'Can be repeated as needed for additional reduction',
            'Does not require general anesthesia or significant downtime',
        ],
        cons: [
            'Significant swelling for 1-2 weeks ("bullfrog" appearance)',
            'Multiple sessions required (typically 2-4) for visible result',
            'Hardness/numbness in the treated area for weeks',
            'Total cost ($1,200-$3,500 per session × multiple sessions) often exceeds surgical alternatives',
            'Rare but serious risk of marginal mandibular nerve injury affecting smile',
        ],
        idealFor: 'Patients with moderate submental fat who want a non-surgical alternative to liposuction or CoolSculpting, and who can tolerate 1-2 weeks of significant post-injection swelling per session.',
        recoveryTime: 'Significant swelling for 1-2 weeks; hardness for 4-6 weeks',
        procedureDuration: '15-30 minutes per session; typically 2-4 sessions needed',
        costRange: '$1,200 - $3,500 per session',
        pricing: {
            us: { min: 1200, max: 3500 },
            thailand: { min: 600, max: 1800 },
            'south-korea': { min: 800, max: 2200 },
            india: { min: 400, max: 1500 },
            singapore: { min: 1000, max: 3000 },
        },
        icon: '\u{1F489}',
        order: 39,
        simulateSlug: 'kybella',
        popularity: 'medium',
    },
    {
        slug: 'sculptra',
        name: 'Sculptra (Poly-L-Lactic Acid Filler)',
        shortName: 'Sculptra',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Collagen-stimulating injectable that gradually restores facial volume over 3-4 months. Results last 2-3+ years — much longer than hyaluronic acid fillers.',
        longDescription: `Sculptra is a poly-L-lactic acid (PLLA) injectable that works fundamentally differently from hyaluronic acid fillers. Rather than directly adding volume, PLLA microparticles are injected into the deep dermis where they trigger a controlled inflammatory response that stimulates the patient's own collagen production. Volume builds gradually over 3-4 months as the body deposits new collagen around the PLLA particles, which themselves are slowly absorbed.

The technology is FDA-approved for nasolabial folds and HIV-related facial fat loss, with widespread off-label use for general facial volume restoration, temple hollowing, and even body areas like buttocks (Sculptra Butt Lift / non-surgical BBL). Treatment requires a series of sessions spaced 4-6 weeks apart, with full results visible at 4-6 months. Once achieved, results typically last 2-3+ years — significantly longer than hyaluronic acid fillers' 6-18 months.`,
        benefits: [
            'Stimulates the patient\'s own collagen — gradual, natural-looking results',
            'Lasts 2-3+ years versus 6-18 months for HA fillers',
            'Treats deep volume loss in temples, cheeks, jawline, and other areas',
            'Non-surgical body sculpting (Sculptra BBL) for buttock enhancement',
            'No surgery, no incisions, treatment is typically 30-45 minutes',
        ],
        pros: [
            'Long-lasting results (2-3+ years)',
            'Stimulates natural collagen rather than adding artificial volume',
            'Treats deeper structural volume loss that HA fillers can\'t address well',
            'Off-label uses include non-surgical buttock augmentation',
            'Subtle, gradual results avoid "overdone" appearance',
        ],
        cons: [
            'Results take 3-6 months to appear (not immediate like HA fillers)',
            'Multiple sessions typically required (2-4 spaced 4-6 weeks apart)',
            'Not reversible — unlike HA fillers, no enzyme can dissolve PLLA',
            'Risk of palpable nodules if not properly massaged post-injection',
            'Total cost ($800-$1,500 per vial × multiple vials × multiple sessions) is significant',
        ],
        idealFor: 'Patients with deep facial volume loss (temples, cheeks, jawline) wanting longer-lasting results than HA fillers, or those seeking gradual non-surgical buttock enhancement.',
        recoveryTime: 'No downtime; mild swelling/bruising for 1-3 days',
        procedureDuration: '30-45 minutes per session',
        costRange: '$800 - $1,500 per vial; typical full course $2,500 - $5,000',
        pricing: {
            us: { min: 800, max: 1500 },
            thailand: { min: 400, max: 900 },
            'south-korea': { min: 500, max: 1100 },
            india: { min: 250, max: 700 },
            singapore: { min: 700, max: 1300 },
        },
        icon: '\u{1F48E}',
        order: 40,
        simulateSlug: 'sculptra',
        popularity: 'medium',
    },
    {
        slug: 'profhilo',
        name: 'Profhilo (Hybrid Hyaluronic Acid Bio-Remodeller)',
        shortName: 'Profhilo',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Innovative hyaluronic acid bio-remodelling injectable that improves skin quality, hydration, and elasticity rather than adding volume. Treats skin laxity from within.',
        longDescription: `Profhilo represents a different category of injectable — neither a traditional volumizing filler nor a collagen stimulator like Sculptra. It contains highly concentrated, ultra-pure hyaluronic acid (32 mg/ml) in both low and high molecular weight forms, hybridized into a stable gel that disperses slowly after injection. The treatment improves skin quality, hydration, and elasticity by stimulating fibroblast activity and remodelling extracellular matrix proteins.

Treatment uses a "BAP" (Bio Aesthetic Points) protocol — five precise injection points per side of the face that allow the product to spread across treatment zones rather than staying localized. Two sessions are typical (spaced 4 weeks apart) with annual maintenance. Profhilo is particularly suited to patients who don't yet need volume restoration but want to address overall skin quality, fine lines, and early laxity. It pairs well with traditional fillers and toxin treatments rather than replacing them.`,
        benefits: [
            'Improves skin hydration, elasticity, and overall quality',
            'Treats early skin laxity without adding volume',
            'Only 5 injection points per side ("BAP technique") vs traditional filler\'s many',
            'Pairs well with toxins (botox) and fillers in a comprehensive plan',
            'Works on face, neck, décolletage, hands',
        ],
        pros: [
            'Targets skin quality rather than just adding volume — different category',
            'Minimally invasive technique (only 5 points per side)',
            'Natural, gradual improvement without "filled" appearance',
            'Suitable for patients who don\'t want traditional volumizing fillers',
            'Off-face uses (neck, décolletage, hands) where many treatments are limited',
        ],
        cons: [
            'Multiple sessions required (typically 2 initial + annual maintenance)',
            'Results are subtle — focused on quality not visible volume change',
            'Cost adds up: $600-$1,500 per session × multiple sessions × annual maintenance',
            'Not widely available outside of Europe and parts of Asia (limited US availability as of 2026)',
            'Mild swelling and bruising at the 5 injection points typical for 2-3 days',
        ],
        idealFor: 'Patients in their 30s-50s with concerns about skin quality, early laxity, fine lines, or hydration — particularly those wanting an alternative to traditional volumizing fillers.',
        recoveryTime: 'No downtime; mild swelling/bruising at injection points for 2-3 days',
        procedureDuration: '15-20 minutes per session',
        costRange: '$600 - $1,500 per session',
        pricing: {
            us: { min: 600, max: 1500 },
            thailand: { min: 350, max: 850 },
            'south-korea': { min: 400, max: 1000 },
            india: { min: 200, max: 600 },
            singapore: { min: 500, max: 1200 },
        },
        icon: '\u{1F4A7}',
        order: 41,
        simulateSlug: 'profhilo',
        popularity: 'medium',
    },
    {
        slug: 'masseter-botox',
        name: 'Masseter Botox (Jaw Slimming)',
        shortName: 'Masseter Botox',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Botulinum toxin injection into the masseter muscle to slim the lower face, soften a square jawline, and treat bruxism (teeth grinding). Extremely popular in East Asia.',
        longDescription: `Masseter botox uses botulinum toxin to weaken and gradually atrophy the masseter — the prominent jaw muscle that becomes overdeveloped through chronic clenching, grinding, or genetic factors. As the muscle atrophies over 4-8 weeks following injection, the lower face narrows visibly, creating a slimmer V-shape or oval contour. The treatment also relieves chronic jaw clenching, teeth grinding (bruxism), and TMJ-associated pain.

The procedure has both aesthetic and functional applications, making it one of the few injectables routinely used by both cosmetic and dental/medical practitioners. East Asian aesthetic markets (South Korea, Japan, Thailand) heavily feature masseter botox as part of "V-line" treatment plans — typically combined with chin filler or jaw filler to achieve the desired tapered profile. Each session uses ~20-30 units per side (depending on muscle bulk); results last 4-6 months and require maintenance.`,
        benefits: [
            'Slims the lower face and softens a square or wide jawline',
            'Relieves teeth grinding (bruxism) and TMJ-related jaw pain',
            'Non-surgical V-line treatment without bone surgery',
            'Each session is 5-10 minutes in-office',
            'Often combined with chin filler / jaw filler for comprehensive lower-face shaping',
        ],
        pros: [
            'Dual aesthetic + functional benefit (jaw slimming AND bruxism relief)',
            'Reversible — effect wears off if you stop treatment',
            'Quick procedure with no downtime',
            'Less invasive than V-line jaw bone surgery',
            'Highly studied and safe with extensive use globally',
        ],
        cons: [
            'Results take 4-8 weeks to fully develop',
            'Effects last 4-6 months — requires ongoing maintenance',
            'Repeated long-term use needed to maintain reduced jaw size',
            'Risk of asymmetric smile or paradoxical muscle bulging if injection technique is incorrect',
            'Cost adds up: $400-$900 per session × 2-3 sessions per year',
        ],
        idealFor: 'Patients with a wide or square jawline, chronic teeth grinding (bruxism), or TMJ-associated pain who want a non-surgical jaw-slimming alternative.',
        recoveryTime: 'No downtime; results develop over 4-8 weeks',
        procedureDuration: '5-10 minutes',
        costRange: '$400 - $900 per session',
        pricing: {
            us: { min: 400, max: 900 },
            thailand: { min: 200, max: 500 },
            'south-korea': { min: 250, max: 600 },
            india: { min: 150, max: 400 },
            singapore: { min: 350, max: 750 },
        },
        icon: '\u{1F92A}',
        order: 42,
        simulateSlug: 'masseter-botox',
        popularity: 'medium',
    },
    {
        slug: 'dental-implants',
        name: 'Dental Implants',
        shortName: 'Dental Implants',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Surgically placed titanium roots fused with the jawbone that hold replacement teeth (crowns). The gold-standard solution for missing teeth — function, appearance, and bone preservation.',
        longDescription: `Dental implants replace missing teeth with titanium screws surgically placed into the jawbone. Through osseointegration — the natural process by which bone fuses with titanium — the implant becomes a permanent foundation that supports a crown, bridge, or full-arch denture. Unlike traditional bridges or removable dentures, implants preserve adjacent teeth and prevent the bone resorption that follows tooth loss.

Treatment typically involves three phases: (1) surgical placement of the titanium fixture, (2) a 3-6 month osseointegration period during which bone fuses with the implant, and (3) crown attachment via an abutment. Modern techniques like immediate-load implants compress this timeline; in select cases, a temporary crown can be placed the same day as surgery. Long-term success rates exceed 95% for a single implant over 10 years, and 98%+ for full-arch reconstruction in healthy candidates.`,
        benefits: [
            'Permanent solution for missing teeth — looks, feels, and functions like a natural tooth',
            'Preserves the jawbone (prevents the bone loss that follows tooth loss)',
            'Doesn\'t damage adjacent teeth (unlike traditional bridges)',
            'Can support single crowns, bridges, or full-arch reconstructions',
            'Long-term success rate >95% over 10 years',
        ],
        pros: [
            'Most durable replacement option — 20-30+ years with proper care',
            'Maintains jawbone density, preventing the "sunken" facial appearance of long-term tooth loss',
            'Indistinguishable from natural teeth in appearance and function',
            'No special cleaning required (just regular brushing and flossing)',
            'Can be combined into "all-on-4" or "all-on-6" full-arch reconstructions',
        ],
        cons: [
            'Treatment timeline is long — often 4-9 months from start to crown placement',
            'Requires sufficient jawbone density; bone grafting may be needed first',
            'Cost is significant — $3,000-$6,000 per single implant + crown',
            'Surgical risks: infection, nerve injury (lower jaw), sinus involvement (upper jaw)',
            'Smokers and uncontrolled diabetics have lower success rates',
        ],
        idealFor: 'Patients missing one or more teeth with adequate jawbone density (or willing to undergo bone grafting first) who want a permanent, natural-looking replacement.',
        recoveryTime: '7-14 days (initial healing); 3-6 months (full osseointegration)',
        procedureDuration: '1-2 hours per implant',
        costRange: '$3,000 - $6,000 per implant + crown',
        pricing: {
            us: { min: 3000, max: 6000 },
            thailand: { min: 1200, max: 2800 },
            'south-korea': { min: 1500, max: 3500 },
            india: { min: 600, max: 1800 },
            singapore: { min: 2500, max: 5000 },
        },
        icon: '\u{1F9B7}',
        order: 43,
        simulateSlug: 'dental-implants',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'invisalign',
        name: 'Invisalign / Clear Aligners',
        shortName: 'Invisalign',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Series of custom-made transparent plastic aligners that gradually shift teeth into proper position. The leading aesthetic alternative to traditional braces.',
        longDescription: `Invisalign and similar clear-aligner systems (ClearCorrect, SmileDirectClub, etc.) replace traditional metal braces with a series of custom-fabricated transparent plastic trays. Each tray is worn for ~1-2 weeks before being replaced with the next, gradually moving teeth toward their planned final position. A complete treatment uses 20-50+ trays depending on case complexity.

Treatment begins with 3D scanning of the patient's teeth, after which orthodontic software generates the entire movement sequence. The orthodontist or dentist reviews and adjusts the treatment plan before manufacturing begins. Patients are advised to wear the aligners 22+ hours per day, removing them only for eating, drinking (other than water), and brushing. Treatment time varies from 6 months for minor corrections to 24+ months for complex cases — generally comparable to traditional braces.`,
        benefits: [
            'Nearly invisible — most people won\'t notice you\'re wearing them',
            'Removable for eating, special occasions, and brushing',
            'No food restrictions (unlike traditional braces)',
            'Easier to keep teeth clean during treatment',
            'Shorter office visits (no wire adjustments)',
        ],
        pros: [
            'Aesthetic appeal of nearly invisible treatment',
            'Easier oral hygiene than fixed braces',
            'No emergency office visits for broken brackets or wires',
            'Predictable treatment timeline visible from start (3D treatment plan shown upfront)',
            'Suitable for most adult patients (children and complex cases may still need braces)',
        ],
        cons: [
            'Requires patient compliance — must wear 22+ hours/day or treatment fails',
            'Not suitable for severe orthodontic cases (bite issues, severely rotated teeth)',
            'Cost is comparable to or higher than traditional braces',
            'Lisp/slurred speech for first 1-2 weeks while adapting',
            'Refinements often needed at end of treatment to achieve final precision',
        ],
        idealFor: 'Adult patients with mild to moderate orthodontic concerns who want an aesthetic alternative to braces and can commit to wearing aligners 22+ hours daily.',
        recoveryTime: 'No formal recovery; soreness with each new tray for 1-3 days',
        procedureDuration: '6-24+ months total treatment',
        costRange: '$3,500 - $8,500',
        pricing: {
            us: { min: 3500, max: 8500 },
            thailand: { min: 2000, max: 5000 },
            'south-korea': { min: 2500, max: 6000 },
            india: { min: 1500, max: 4500 },
            singapore: { min: 3000, max: 7500 },
        },
        icon: '\u{1F60A}',
        order: 44,
        simulateSlug: 'invisalign',
        tier: 'C',
        comingSoon: true,
        popularity: 'high',
    },
    {
        slug: 'tattoo-removal',
        name: 'Laser Tattoo Removal',
        shortName: 'Tattoo Removal',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Q-switched / picosecond laser treatment that breaks down tattoo ink particles for clearance through the lymphatic system. The standard method for tattoo removal worldwide.',
        longDescription: `Laser tattoo removal uses pulsed laser energy at specific wavelengths to break down ink particles in the dermis, after which the body's lymphatic system clears the fragments over weeks. Q-switched lasers (nanosecond pulses) and the newer picosecond lasers each target different ink colors via wavelength specificity — black ink absorbs broadly, while reds, greens, and blues require specific wavelengths.

Treatment is gradual: most professional tattoos require 6-12 sessions spaced 6-8 weeks apart, while amateur tattoos clear in 4-8 sessions. Picosecond lasers shorten timelines and improve clearance of stubborn colors compared to Q-switched. Older tattoos and those on the chest/back clear faster than fresh or extremity tattoos. Complete removal is realistic for most professional tattoos but darker skin tones (Fitzpatrick IV-VI) require careful wavelength selection to avoid hypopigmentation.`,
        benefits: [
            'Permanent removal of unwanted tattoos',
            'Works on all colors with appropriate wavelength selection',
            'Picosecond technology improves clearance and reduces session count',
            'Non-invasive — no surgery, no incisions',
            'Can be combined with other modalities for optimal clearance',
        ],
        pros: [
            'Standard of care for tattoo removal worldwide',
            'Effective on most ink colors (black, blue, red are easiest; green/yellow harder)',
            'No surgical alternative as effective with similar safety profile',
            'Each session is brief (10-30 minutes depending on tattoo size)',
            'Modern picosecond lasers reduce total treatment time',
        ],
        cons: [
            'Requires 6-12+ sessions spaced 6-8 weeks apart',
            'Total cost can exceed the original tattoo cost (~$200-$500 per session)',
            'Treatment is painful (described as worse than getting the tattoo)',
            'Risk of hypopigmentation, especially in darker skin tones',
            'Some tattoos (especially with white or yellow ink) cannot be fully removed',
        ],
        idealFor: 'Anyone wanting to remove an unwanted tattoo. Best results in lighter skin tones with darker ink colors; darker skin requires careful provider selection.',
        recoveryTime: 'Per session: 1-2 weeks for skin healing; full clearance over 12-18 months',
        procedureDuration: '10-30 minutes per session; 6-12 sessions typical',
        costRange: '$200 - $500 per session',
        pricing: {
            us: { min: 200, max: 500 },
            thailand: { min: 80, max: 250 },
            'south-korea': { min: 100, max: 300 },
            india: { min: 50, max: 200 },
            singapore: { min: 180, max: 450 },
        },
        icon: '\u{1F58C}️',
        order: 45,
        simulateSlug: 'tattoo-removal',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'forehead-reduction',
        name: 'Forehead Reduction (Hairline Lowering)',
        shortName: 'Forehead Reduction',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Surgical reduction of forehead height by advancing the hairline forward. Restores facial proportions for patients with naturally tall foreheads or post-childbirth recession.',
        longDescription: `Forehead reduction (also called hairline lowering or hairline advancement) reduces forehead height by 1-3 cm through a trichophytic incision along the hairline. Excess skin is removed, the hair-bearing scalp is advanced forward, and the incision heals as a hidden line within the new hairline — over time, hair grows through the scar making it nearly invisible.

The procedure is most popular among women whose foreheads are disproportionately tall relative to lower facial thirds (the "rule of thirds" being a classical aesthetic guide). It's also performed for patients undergoing facial feminization surgery and for those whose hairlines have receded after pregnancy or due to traction alopecia. Many candidates initially consult about hair transplant before discovering this single-stage alternative produces faster, more predictable results.`,
        benefits: [
            'Reduces forehead height by 1-3 cm in a single procedure',
            'Faster, more predictable than hair transplant for hairline advancement',
            'Hidden scar line that becomes nearly invisible as hair grows through it',
            'Improves facial proportions per the rule of thirds',
        ],
        pros: [
            'Single-stage procedure with predictable advancement',
            'Trichophytic incision allows hair to grow through the scar',
            'Outpatient surgery with relatively short recovery',
            'Often combined with brow lift for patients addressing both concerns',
        ],
        cons: [
            'Permanent scar line at the new hairline (visible in some hairstyles)',
            'Not suitable for patients with weak or receding hairlines',
            'Numbness above the scar is common for 6-12 months',
            'Risk of telogen effluvium (temporary hair shedding) along the scar',
        ],
        idealFor: 'Women with naturally tall foreheads (over ~6cm hair-to-brow distance), post-pregnancy hairline recession, or facial feminization patients seeking forehead reduction.',
        recoveryTime: '7-10 days (sutures out), 4-6 weeks (sensation returns)',
        procedureDuration: '2-3 hours',
        costRange: '$5,000 - $9,000',
        pricing: {
            us: { min: 5000, max: 9000 },
            thailand: { min: 2200, max: 4500 },
            'south-korea': { min: 3000, max: 6500 },
            india: { min: 1500, max: 3500 },
            singapore: { min: 4500, max: 8000 },
        },
        icon: '\u{1F465}',
        order: 46,
        simulateSlug: 'forehead-reduction',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
        // Re-enabled 2026-05-03 — buildHairlineMask now anchors off
        // MediaPipe forehead-top landmarks (10, 109, 67, 103, 338, 297,
        // 332) and safely no-ops without landmarks.
    },
    {
        slug: 'cheek-implants',
        name: 'Cheek Implants (Malar Augmentation)',
        shortName: 'Cheek Implants',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Solid silicone or porous polyethylene implants placed over the cheekbone to add volume, projection, and definition. Permanent alternative to cheek fillers.',
        longDescription: `Cheek implants restore or enhance midface volume by placing a solid implant over the malar (cheek) bone, accessed through a small incision inside the upper mouth. Common materials include silicone, porous polyethylene (Medpor), and ePTFE — each with different tissue integration profiles. The procedure is appropriate for patients with naturally flat cheekbones, age-related midface volume loss, or those who've found temporary fillers don't deliver the projection they want.

Modern surgical planning uses 3D imaging to size and position implants symmetrically, and revision rates have dropped significantly with improved technique. Recovery involves 1-2 weeks of swelling and a soft-food diet during the first week. Once integrated, results are essentially permanent — though the surrounding face continues to age normally.`,
        benefits: [
            'Permanent volume and projection (vs filler\'s 1-2 year duration)',
            'Restores age-related midface volume loss',
            'Multiple shapes and sizes for individualized results',
            'Hidden incision inside the mouth — no external scarring',
        ],
        pros: [
            'Long-term cost vs repeated filler is significantly lower',
            'Predictable, sculptural results once healed',
            'Reversible — implants can be removed if needed',
            'Often combined with chin implant for comprehensive midface harmony',
        ],
        cons: [
            'Surgical risks: infection, implant migration, nerve injury',
            'Implants can shift over time, requiring revision',
            'Recovery includes 1-2 weeks of significant swelling',
            'Bone resorption beneath the implant is a known long-term risk',
        ],
        idealFor: 'Patients with naturally flat cheekbones, age-related midface flattening, or those who prefer permanent enhancement over repeated filler treatments.',
        recoveryTime: '7-14 days (return to work), 4-6 weeks (full activity)',
        procedureDuration: '1-2 hours',
        costRange: '$4,000 - $9,000',
        pricing: {
            us: { min: 4000, max: 9000 },
            thailand: { min: 1800, max: 4000 },
            'south-korea': { min: 2500, max: 6000 },
            india: { min: 1200, max: 3000 },
            singapore: { min: 3500, max: 7500 },
        },
        icon: '\u{1F60A}',
        order: 47,
        simulateSlug: 'cheek-implants',
        popularity: 'medium',
    },
    {
        slug: 'mid-facelift',
        name: 'Mid-Facelift (Cheek Lift)',
        shortName: 'Mid-Facelift',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Targeted lift of the cheek and mid-face area to address sagging cheeks, deepening nasolabial folds, and lower-eyelid hollowing. Less invasive than full facelift.',
        longDescription: `A mid-facelift focuses on the cheek and mid-face region rather than the lower face and neck. Techniques include endoscopic approaches (small incisions in the temple and inside the mouth) and limited-incision lifts. The cheek pad is repositioned over the malar bone to soften the nasolabial fold, restore cheek projection, and improve the tear trough.

This procedure is particularly suited to patients in their 40s-50s with isolated mid-face concerns who don't yet need a full facelift. It's often combined with lower blepharoplasty (eye-bag removal) since the techniques share anatomical territory. Recovery is shorter than full facelift — typically 1-2 weeks for return to work and 4-6 weeks for full activity.`,
        benefits: [
            'Lifts sagging cheeks and softens nasolabial folds',
            'Improves the cheek-eyelid junction (tear trough hollowing)',
            'Less invasive than full facelift — shorter recovery',
            'Often combined with lower eyelid surgery',
        ],
        pros: [
            'Targeted procedure for the specific aging concern',
            'Hidden incisions (temple, inside mouth, or lower lid)',
            'Shorter recovery than full facelift',
            'Suitable for younger patients before full facelift is needed',
        ],
        cons: [
            'Doesn\'t address jawline or neck (those need a different procedure)',
            'Risk of facial nerve injury affecting smile',
            'Bruising and swelling for 2-3 weeks',
            'Results may be subtle compared to full facelift',
        ],
        idealFor: 'Patients in their 40s-50s with isolated mid-face aging — flat cheeks, deep nasolabial folds, tear trough hollowing — who don\'t yet need a full facelift.',
        recoveryTime: '1-2 weeks (return to work), 4-6 weeks (full activity)',
        procedureDuration: '2-3 hours',
        costRange: '$6,000 - $13,000',
        pricing: {
            us: { min: 6000, max: 13000 },
            thailand: { min: 2800, max: 6000 },
            'south-korea': { min: 3500, max: 8500 },
            india: { min: 1800, max: 4500 },
            singapore: { min: 5500, max: 11000 },
        },
        icon: '\u{1F606}',
        order: 48,
        simulateSlug: 'mid-facelift',
        popularity: 'medium',
    },
    {
        slug: 'earlobe-repair',
        name: 'Earlobe Repair / Reduction',
        shortName: 'Earlobe Repair',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Surgical repair of stretched, torn, or split earlobes (commonly from heavy earrings or gauges) and reduction of elongated earlobes. Quick outpatient procedure.',
        longDescription: `Earlobe repair addresses the most common ear-related concerns: torn or stretched piercings (from heavy earrings, accidents, or stretched lobes/gauges) and elongated earlobes from genetic factors or aging. The procedure is brief — typically 30-45 minutes per ear under local anesthesia — with sutures removed at 7-10 days.

For stretched piercings, the lobe is excised and reconstructed with a fresh closure that can be re-pierced after 6-8 weeks. Elongated earlobes are reshaped by removing a wedge of tissue and recontouring. Patient satisfaction rates are extremely high (>97% in published series) because the procedure delivers exactly what most patients seek: a refreshed, normal-looking earlobe with a hidden incision.`,
        benefits: [
            'Repairs torn or stretched earlobes from earrings or gauges',
            'Reduces elongated or sagging earlobes',
            'Quick outpatient procedure (30-45 minutes per ear)',
            'Local anesthesia — no general sedation needed',
        ],
        pros: [
            'High patient satisfaction rates (>97%)',
            'Hidden incision within the natural earlobe shape',
            'Re-piercing possible after 6-8 weeks',
            'Affordable compared to most cosmetic procedures',
        ],
        cons: [
            'Cannot pierce in the same location for several weeks',
            'Slight risk of asymmetry or contour irregularity',
            'Heavy earrings should be avoided permanently to prevent re-tearing',
            'Not insurance-covered (cosmetic indication)',
        ],
        idealFor: 'Anyone with torn, stretched, or elongated earlobes seeking restoration to normal appearance.',
        recoveryTime: '7-10 days (sutures out), 6-8 weeks (re-piercing safe)',
        procedureDuration: '30-45 minutes per ear',
        costRange: '$500 - $2,000 per ear',
        pricing: {
            us: { min: 500, max: 2000 },
            thailand: { min: 200, max: 700 },
            'south-korea': { min: 250, max: 900 },
            india: { min: 100, max: 500 },
            singapore: { min: 400, max: 1500 },
        },
        icon: '\u{1F442}',
        order: 49,
        simulateSlug: 'earlobe-repair',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'thigh-lift',
        name: 'Thigh Lift (Thighplasty)',
        shortName: 'Thigh Lift',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Surgical removal of excess skin and fat from the inner or outer thighs after major weight loss. Restores firm, contoured thighs that diet and exercise alone cannot achieve.',
        longDescription: `Thigh lift addresses skin laxity in the inner or outer thighs that remains after significant weight loss or develops with aging. Three main approaches exist: medial (inner thigh) lift with incision in the groin and along the inner thigh, vertical thighplasty for more severe laxity (incision runs from groin to knee), and outer thigh lift typically combined with body lift.

The procedure delivers reliably tighter, more contoured thighs but trades that for a permanent scar. Recovery is significant: 2-3 weeks of restricted movement, 4-6 weeks before exercise, and 3-6 months for full scar maturation. Liposuction is often combined for finer contour. Most candidates are post-bariatric weight loss patients (60+ lbs lost) who've completed their weight loss journey.`,
        benefits: [
            'Eliminates loose, hanging skin on inner or outer thighs',
            'Restores firm, contoured thigh appearance',
            'Improves clothing fit and comfort during exercise',
            'Often combined with liposuction for refined contour',
        ],
        pros: [
            'Only durable solution for significant thigh skin laxity',
            'Dramatic, immediate change in thigh shape',
            'High satisfaction in post-weight-loss patients',
            'Multiple incision patterns available based on laxity',
        ],
        cons: [
            'Permanent scar (groin and/or vertical along inner thigh)',
            'Recovery is significant — 2-3 weeks restricted, 4-6 weeks before exercise',
            'Risk of wound healing problems given skin tension and groin location',
            'Not insurance-covered unless tied to massive weight loss with documented complications',
        ],
        idealFor: 'Post-weight-loss patients (60+ lbs lost) with significant thigh skin laxity who accept a permanent scar in exchange for contour restoration.',
        recoveryTime: '2-3 weeks (restricted), 4-6 weeks (exercise), 3-6 months (scar maturation)',
        procedureDuration: '2-4 hours',
        costRange: '$5,500 - $11,000',
        pricing: {
            us: { min: 5500, max: 11000 },
            thailand: { min: 2500, max: 5500 },
            'south-korea': { min: 3000, max: 7000 },
            india: { min: 1500, max: 4000 },
            singapore: { min: 5000, max: 9500 },
        },
        icon: '\u{1F9B5}',
        order: 50,
        simulateSlug: 'thigh-lift',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'mommy-makeover',
        name: 'Mommy Makeover (Combined Post-Pregnancy Procedure)',
        shortName: 'Mommy Makeover',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Combined surgery addressing post-pregnancy body changes — typically tummy tuck, breast lift/augmentation, and liposuction in a single operative session. Restores pre-pregnancy contour.',
        longDescription: `Mommy makeover is not a single procedure but a customized combination — typically tummy tuck (or extended abdominoplasty for diastasis recti repair), breast lift and/or augmentation, and liposuction of stubborn fat areas. Combining procedures means one anesthesia, one recovery period, and a coordinated overall result rather than staged operations.

Ideal candidates are mothers who have completed their family planning, are within 10-15 lbs of their target weight, and have stabilized for 6+ months postpartum. Candidates breastfeeding should wait 6 months after weaning before considering breast surgery. Recovery is significant — 2-3 weeks before light activity, 6-8 weeks before exercise — and patients should arrange childcare help for at least the first 2 weeks. The combined approach delivers higher patient satisfaction than staged procedures because the body returns to its new contour all at once.`,
        benefits: [
            'Restores pre-pregnancy body contour in one operative session',
            'Single anesthesia and recovery vs multiple staged procedures',
            'Customizable combination based on individual concerns',
            'Diastasis recti (separated abdominal muscles) can be repaired',
        ],
        pros: [
            'Coordinated overall result rather than mismatched staged operations',
            'Single recovery period vs 6+ months of staged surgery',
            'Long-term cost is lower than separate procedures',
            'Higher patient satisfaction than staged approaches',
        ],
        cons: [
            'Major combined surgery — 4-6 hour operation',
            'Significant recovery requiring childcare help for 2-3 weeks',
            'Higher complication risk than any single procedure alone',
            'Cost is significant — $15,000-$30,000+ for the combination',
        ],
        idealFor: 'Mothers who have completed family planning, are 6+ months postpartum (and 6+ months post-weaning if breastfeeding), within 10-15 lbs of target weight, and have stable health.',
        recoveryTime: '2-3 weeks (light activity), 6-8 weeks (full exercise)',
        procedureDuration: '4-6 hours',
        costRange: '$15,000 - $30,000+',
        pricing: {
            us: { min: 15000, max: 30000 },
            thailand: { min: 7000, max: 15000 },
            'south-korea': { min: 8500, max: 18000 },
            india: { min: 4500, max: 11000 },
            singapore: { min: 13000, max: 25000 },
        },
        icon: '\u{1F46A}',
        order: 51,
        simulateSlug: 'mommy-makeover',
        popularity: 'medium',
    },
    {
        slug: 'hydrafacial',
        name: 'HydraFacial (Multi-Step Hydrating Treatment)',
        shortName: 'HydraFacial',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Patented multi-step facial treatment combining cleansing, exfoliation, extraction, and serum infusion in one ~30-minute session. Visible glow with zero downtime.',
        longDescription: `HydraFacial is a branded multi-step facial treatment that uses a vacuum-tip device to perform cleansing, gentle chemical peel, painless extractions, and infusion of hydrating/antioxidant serums in a single 30-45 minute session. The active ingredients are delivered via a vortex-fusion handpiece that simultaneously exfoliates and infuses serums into the cleared pores.

Unlike traditional facials, HydraFacial is medical-grade — performed by aestheticians or skin therapists in clinical settings — but with no downtime, redness, or peeling. Most patients see immediate improvement in skin clarity, hydration, and glow. Best results come from a series of treatments (typically monthly) plus add-on boosters tailored to specific concerns (anti-aging, brightening, acne control). It's especially popular for pre-event glow ("get-it-now" appearance refresh) and as part of a maintenance regimen.`,
        benefits: [
            'Immediate visible glow and improved skin clarity',
            'Zero downtime — return to normal activities immediately',
            'Customizable boosters for anti-aging, brightening, or acne',
            'Suitable for all skin types including sensitive',
        ],
        pros: [
            'Painless, comfortable treatment',
            'Visible results immediately after treatment',
            'No redness, peeling, or post-treatment care required',
            'Combines multiple traditional treatments into one session',
        ],
        cons: [
            'Results are subtle and short-lived without monthly maintenance',
            'More expensive than traditional facials ($150-$350 per session)',
            'Doesn\'t address deep wrinkles, scarring, or significant pigmentation',
            'Best as part of a regimen, not a standalone solution',
        ],
        idealFor: 'Anyone seeking immediate skin glow with zero downtime — pre-event prep, monthly skincare maintenance, or first introduction to medical-grade facials.',
        recoveryTime: 'No downtime',
        procedureDuration: '30-45 minutes',
        costRange: '$150 - $350 per session',
        pricing: {
            us: { min: 150, max: 350 },
            thailand: { min: 60, max: 180 },
            'south-korea': { min: 80, max: 220 },
            india: { min: 40, max: 150 },
            singapore: { min: 120, max: 300 },
        },
        icon: '\u{1F4A6}',
        order: 52,
        simulateSlug: 'hydrafacial',
        popularity: 'high',
    },
    {
        slug: 'ipl-photofacial',
        name: 'IPL Photofacial (Intense Pulsed Light)',
        shortName: 'IPL Photofacial',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Intense pulsed light treatment that targets sun damage, age spots, broken capillaries, redness, and rosacea. Multi-wavelength alternative to laser for pigmentation and vascular concerns.',
        longDescription: `IPL (Intense Pulsed Light) uses broadband light energy across multiple wavelengths to target chromophores in the skin — melanin (causing pigmentation) and hemoglobin (causing visible blood vessels). Unlike single-wavelength lasers, IPL treats multiple skin concerns simultaneously: sun damage, freckles, age spots, broken capillaries, rosacea, and overall complexion irregularity.

Treatment requires 3-5 sessions spaced 4 weeks apart for cumulative results. Each session is 20-30 minutes, with the sensation often described as "rubber band snaps" against the skin. Pigmented spots typically darken before sloughing off over 7-14 days post-treatment. Best results are in patients with Fitzpatrick I-III skin types; darker skin requires careful provider selection or alternative treatments to avoid hypopigmentation.`,
        benefits: [
            'Treats multiple concerns: sun spots, redness, broken capillaries, rosacea',
            'Improves overall complexion clarity and tone',
            'Stimulates mild collagen response for added benefit',
            'Multiple skin concerns addressed in a single treatment',
        ],
        pros: [
            'Treats both pigmentation AND vascular concerns simultaneously',
            'Each session is brief (20-30 minutes)',
            'No downtime — return to normal activities immediately',
            'Highly effective on sun damage and age spots',
        ],
        cons: [
            'Not suitable for darker skin tones (Fitzpatrick IV-VI)',
            'Multiple sessions (3-5) required for optimal results',
            'Pigmented spots darken visibly before sloughing for 7-14 days',
            'Strict sun avoidance required for 4-6 weeks post-treatment',
        ],
        idealFor: 'Patients with sun damage, freckles, age spots, redness, rosacea, or broken capillaries — particularly those with lighter skin tones (Fitzpatrick I-III).',
        recoveryTime: 'No downtime; pigmented spots darken/slough for 7-14 days',
        procedureDuration: '20-30 minutes per session; typically 3-5 sessions',
        costRange: '$300 - $700 per session',
        pricing: {
            us: { min: 300, max: 700 },
            thailand: { min: 120, max: 350 },
            'south-korea': { min: 150, max: 450 },
            india: { min: 80, max: 280 },
            singapore: { min: 250, max: 600 },
        },
        icon: '\u{1F506}',
        order: 53,
        simulateSlug: 'ipl-photofacial',
        popularity: 'medium',
    },
    {
        slug: 'rf-microneedling',
        name: 'RF Microneedling (Morpheus8 / Genius RF)',
        shortName: 'RF Microneedling',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Combines microneedling with radiofrequency energy delivered at controlled depths to remodel deeper skin layers. More aggressive than standard microneedling — treats moderate-to-severe wrinkles and laxity.',
        longDescription: `RF (radiofrequency) microneedling combines two technologies: traditional microneedling that creates micro-channels in the skin, and radiofrequency energy delivered through the needle tips at controlled depths (0.5-4mm). The RF heats the dermis to ~60-70°C, triggering significant collagen remodeling and tissue tightening that standard microneedling cannot achieve.

Branded systems include Morpheus8, Genius RF, Vivace, and Secret RF. Treatment is more aggressive than non-RF microneedling: 1-3 sessions spaced 4-6 weeks apart, with 3-7 days of redness and pinpoint scabbing afterward. Results continue building for 3-6 months as collagen remodels. Particularly effective for moderate skin laxity, acne scars, stretch marks, and submental laxity. RF energy can be delivered safely in darker skin tones (Fitzpatrick I-VI) where standard ablative lasers are risky.`,
        benefits: [
            'Treats moderate skin laxity, acne scars, and stretch marks',
            'More aggressive collagen stimulation than standard microneedling',
            'Safe across all skin types including darker tones',
            'Significant tightening effect from RF heating',
        ],
        pros: [
            'Combines microneedling and RF in one session',
            'Effective on areas like neck, jawline, and submental that respond poorly to other treatments',
            'Safe for Fitzpatrick I-VI (unlike ablative lasers)',
            'Fewer sessions needed than traditional microneedling',
        ],
        cons: [
            '3-7 days of visible redness and pinpoint scabbing',
            'More expensive than standard microneedling ($800-$2,500 per session)',
            'Can be uncomfortable despite topical anesthesia',
            'Multiple sessions still required (1-3) for optimal results',
        ],
        idealFor: 'Patients with moderate skin laxity, acne scars, stretch marks, or submental laxity wanting more aggressive collagen stimulation than standard microneedling.',
        recoveryTime: '3-7 days redness; results continue building for 3-6 months',
        procedureDuration: '45-90 minutes per session',
        costRange: '$800 - $2,500 per session',
        pricing: {
            us: { min: 800, max: 2500 },
            thailand: { min: 350, max: 1200 },
            'south-korea': { min: 450, max: 1500 },
            india: { min: 200, max: 900 },
            singapore: { min: 700, max: 2000 },
        },
        icon: '\u{1FA7A}',
        order: 54,
        simulateSlug: 'rf-microneedling',
        popularity: 'medium',
    },
    {
        slug: 'dermaplaning',
        name: 'Dermaplaning',
        shortName: 'Dermaplaning',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Manual exfoliation using a sterile surgical scalpel to remove dead skin cells and vellus hair (peach fuzz). Immediate smooth, glowing skin with no downtime.',
        longDescription: `Dermaplaning is a manual exfoliation technique using a sterile surgical scalpel held at a precise angle to gently remove the topmost layer of dead skin and vellus hair. The procedure takes 20-30 minutes, requires no anesthesia, and produces immediate skin smoothness with the bonus of removing facial peach fuzz that traps oil and makeup.

Despite intuitive concerns, vellus hair regrows at the same rate, color, and texture as before treatment — it does not grow back darker or thicker (a common myth). Treatment is best done monthly and is often combined with chemical peel, hydrafacial, or LED therapy in the same session. Suitable for nearly all skin types, though active acne breakouts and sensitive rosacea should wait until those concerns are calm.`,
        benefits: [
            'Immediate visibly smoother skin',
            'Removes peach fuzz that traps oil and makeup',
            'Better product penetration after treatment',
            'No downtime, no anesthesia, no special aftercare',
        ],
        pros: [
            'Painless, comfortable treatment',
            'Significantly cheaper than laser or chemical exfoliation',
            'Combines well with other facial treatments same-day',
            'Suitable for most skin types',
        ],
        cons: [
            'Effects last 3-4 weeks — requires monthly maintenance',
            'Not suitable during active acne breakouts (can worsen)',
            'Risk of nicks/cuts if performed by inexperienced practitioner',
            'Doesn\'t address deep wrinkles, scarring, or pigmentation',
        ],
        idealFor: 'Anyone wanting smoother skin and peach-fuzz removal — particularly before makeup application or events where flawless skin matters.',
        recoveryTime: 'No downtime',
        procedureDuration: '20-30 minutes',
        costRange: '$75 - $200 per session',
        pricing: {
            us: { min: 75, max: 200 },
            thailand: { min: 30, max: 100 },
            'south-korea': { min: 40, max: 130 },
            india: { min: 20, max: 80 },
            singapore: { min: 60, max: 180 },
        },
        icon: '\u{1FA92}',
        order: 55,
        simulateSlug: 'dermaplaning',
        popularity: 'medium',
    },
    {
        slug: 'cellulite-treatment',
        name: 'Cellulite Treatment (Cellfina / QWO / Cellulaze)',
        shortName: 'Cellulite Treatment',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Targeted treatments addressing the dimpled appearance of cellulite by releasing the fibrous bands tethering skin to underlying tissue. Multiple modalities — surgical, injectable, and laser.',
        longDescription: `Cellulite is caused by fibrous bands (septae) that tether skin to underlying muscle while fat cells push up against them, creating the dimpled appearance most common in thighs and buttocks. Diet and exercise alone cannot resolve cellulite because the issue is structural rather than fat-related. Modern treatments target the septae directly:

Cellfina is a minimally-invasive subcision device that mechanically releases septae — single treatment, results lasting 5+ years. QWO was an injectable enzyme that dissolved septae but was discontinued in 2023 due to inconsistent results. Cellulaze is a laser device delivered through small cannulas that simultaneously releases septae, melts fat, and stimulates collagen. Newer non-invasive options like Emtone use thermal and acoustic shockwave energy. Best candidates are women near their target weight with discrete cellulite dimples — none of these treatments address generalized texture irregularity well.`,
        benefits: [
            'Reduces visible cellulite dimples in thighs and buttocks',
            'Single-treatment options (Cellfina) with long-lasting results',
            'Multiple modalities to match individual cellulite patterns',
            'Combines well with other body contouring procedures',
        ],
        pros: [
            'First treatments to address cellulite\'s structural cause (septae)',
            'Cellfina results last 5+ years from a single session',
            'Outpatient procedures with relatively short recovery',
            'Visible improvement that diet and exercise cannot match',
        ],
        cons: [
            'Best results require accurate dimple targeting (Cellfina marks individual dimples)',
            'Bruising and tenderness for 1-3 weeks',
            'Not effective for generalized texture (best for discrete dimples)',
            'Cost is significant ($3,500-$7,500 per session) and not insurance-covered',
        ],
        idealFor: 'Women near their target weight with discrete cellulite dimples in thighs or buttocks — particularly those who haven\'t responded to conservative measures.',
        recoveryTime: '1-3 weeks (bruising and tenderness)',
        procedureDuration: '30-90 minutes',
        costRange: '$3,500 - $7,500 per session',
        pricing: {
            us: { min: 3500, max: 7500 },
            thailand: { min: 1500, max: 3500 },
            'south-korea': { min: 2000, max: 4500 },
            india: { min: 1000, max: 2800 },
            singapore: { min: 3000, max: 6500 },
        },
        icon: '\u{1FAC1}',
        order: 56,
        simulateSlug: 'cellulite-treatment',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'laser-hair-removal',
        name: 'Laser Hair Removal',
        shortName: 'Laser Hair Removal',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Laser energy targets hair follicle melanin to inhibit future hair growth. The standard for permanent hair reduction — works on face, body, and most skin types with appropriate device.',
        longDescription: `Laser hair removal uses laser energy specifically attracted to melanin in the hair follicle. Heat damages the follicle's growth structure, leading to permanent reduction in hair density over a series of treatments. Different lasers serve different skin types: alexandrite (755nm) for lighter skin and finer hair, diode (810nm) for medium skin, Nd:YAG (1064nm) for darker skin tones (Fitzpatrick V-VI) where alternative wavelengths risk burns.

Most patients require 6-10 sessions spaced 4-8 weeks apart for optimal hair reduction. Hair must be in active growth phase (anagen) to respond, which is why multiple spaced sessions are needed — at any moment, only a portion of hair is in anagen. Light hair (blonde, red, gray, white) does not respond well because there's insufficient melanin to absorb laser energy. Modern devices with appropriate cooling are well-tolerated; numbing cream is optional.`,
        benefits: [
            'Permanent reduction in hair density (>80% in most patients)',
            'Treats face, underarms, legs, bikini, back, chest — virtually any area',
            'Modern devices safe for darker skin tones (with Nd:YAG)',
            'Each session covers large areas in 15-45 minutes',
        ],
        pros: [
            'Long-term cost is far less than continued shaving, waxing, or epilation',
            'No more ingrown hairs or razor irritation',
            'Smooth results between sessions',
            'Suitable for all skin types with appropriate device selection',
        ],
        cons: [
            'Requires 6-10 sessions for optimal results',
            'Light hair (blonde, red, gray) does not respond',
            'Strict sun avoidance required for 2 weeks before/after each session',
            'Annual touch-ups often needed for long-term maintenance',
        ],
        idealFor: 'Anyone with dark hair on lighter or darker skin (with appropriate device) seeking long-term hair reduction. Light-haired patients are not good candidates.',
        recoveryTime: 'Mild redness for hours; no downtime',
        procedureDuration: '15-45 minutes per session, depending on area; 6-10 sessions',
        costRange: '$150 - $1,500 per session, depending on area',
        pricing: {
            us: { min: 150, max: 1500 },
            thailand: { min: 50, max: 600 },
            'south-korea': { min: 80, max: 800 },
            india: { min: 30, max: 400 },
            singapore: { min: 130, max: 1200 },
        },
        icon: '\u{1F39B}️',
        order: 57,
        simulateSlug: 'laser-hair-removal',
        tier: 'C',
        comingSoon: true,
        popularity: 'high',
    },
    {
        slug: 'prp-hair',
        name: 'PRP for Hair Loss (Platelet-Rich Plasma)',
        shortName: 'PRP for Hair',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Patient\'s own concentrated platelets injected into the scalp to stimulate dormant hair follicles. Non-surgical treatment for early-stage androgenetic alopecia and thinning.',
        longDescription: `PRP (Platelet-Rich Plasma) for hair loss involves drawing the patient's blood, centrifuging it to concentrate platelets and growth factors, then injecting the resulting plasma into thinning areas of the scalp. The growth factors (PDGF, VEGF, EGF, and others) signal dormant hair follicles to re-enter the active growth phase, increase blood supply, and prolong the active hair cycle.

Treatment requires 3-4 initial sessions spaced 4 weeks apart, followed by quarterly maintenance. Best results are in patients with early androgenetic alopecia (male or female pattern hair loss) where follicles are miniaturized but not yet permanently lost. PRP works synergistically with finasteride (men) or spironolactone (women) and topical minoxidil — combination therapy outperforms PRP alone. Once hair follicles are completely lost (advanced Norwood VI-VII or Ludwig III), PRP cannot reverse the loss; hair transplant is the only option.`,
        benefits: [
            'Stimulates dormant follicles in early-stage hair loss',
            'Uses the patient\'s own blood — no allergic reactions or rejection',
            'Each session is 30-45 minutes in-office',
            'Combines synergistically with finasteride/minoxidil for better results',
        ],
        pros: [
            'Non-surgical with no incisions or downtime',
            'Autologous treatment — uses patient\'s own biological material',
            'Can delay or prevent need for hair transplant in early-stage cases',
            'Safe for both men and women (unlike finasteride which is male-only)',
        ],
        cons: [
            'Multiple sessions required (3-4 initial + quarterly maintenance)',
            'Cost adds up: $400-$1,200 per session × ongoing maintenance',
            'Cannot regenerate completely lost follicles (advanced cases)',
            'Results vary significantly by patient — no guaranteed response',
        ],
        idealFor: 'Patients with early-stage androgenetic alopecia (thinning but not bald), post-pregnancy hair loss, or those wanting to maintain density alongside topical treatments.',
        recoveryTime: 'Mild scalp tenderness for 1-2 days',
        procedureDuration: '30-45 minutes per session; 3-4 sessions initial + maintenance',
        costRange: '$400 - $1,200 per session',
        pricing: {
            us: { min: 400, max: 1200 },
            thailand: { min: 200, max: 600 },
            'south-korea': { min: 250, max: 750 },
            india: { min: 100, max: 400 },
            singapore: { min: 350, max: 950 },
        },
        icon: '\u{1F489}',
        order: 58,
        simulateSlug: 'prp-hair',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'body-lift',
        name: 'Body Lift (Belt Lipectomy / 360° Lift)',
        shortName: 'Body Lift',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Comprehensive 360° body contouring after major weight loss — lifts the abdomen, flanks, lower back, and outer thighs simultaneously. The most extensive body procedure.',
        longDescription: `Body lift (also called belt lipectomy or circumferential abdominoplasty) addresses excess skin and fat across the entire 360° of the trunk after major weight loss — combining tummy tuck, lateral thigh lift, and lower back lift into a single coordinated procedure. The incision typically runs around the entire waistline (hidden under clothing/swimwear) and the underlying tissues are tightened comprehensively.

Most candidates have lost 75+ lbs through bariatric surgery, lifestyle change, or pregnancy. Recovery is significant — 4-6 weeks before return to work, 8-12 weeks before strenuous exercise — and the procedure carries higher complication rates than any single component (tummy tuck alone). It's typically the most expensive cosmetic procedure most patients undergo, but for severe post-weight-loss skin laxity it's often the only durable solution.`,
        benefits: ['Comprehensive 360° contour restoration', 'Eliminates skin folds across abdomen, flanks, back, and thighs', 'Often combined with breast lift and brachioplasty for full body contouring', 'Permanent results when weight is maintained'],
        pros: ['Most comprehensive body restoration option', 'Single recovery period vs staged procedures', 'High satisfaction in post-bariatric patients', 'Hidden incision under clothing/swimwear'],
        cons: ['Major surgery — 6-8 hour operation, often two surgeons', 'High complication rate vs single procedures', 'Long recovery (4-6 weeks restricted, 8-12 weeks before exercise)', 'Cost is significant ($15,000-$30,000)'],
        idealFor: 'Post-bariatric patients with severe 360° skin laxity who have stabilized at goal weight for 12+ months.',
        recoveryTime: '4-6 weeks (return to work), 8-12 weeks (full exercise)',
        procedureDuration: '6-8 hours',
        costRange: '$15,000 - $30,000',
        pricing: { us: { min: 15000, max: 30000 }, thailand: { min: 7000, max: 15000 }, 'south-korea': { min: 9000, max: 18000 }, india: { min: 5000, max: 12000 }, singapore: { min: 13000, max: 25000 } },
        icon: '\u{1F465}',
        order: 59,
        simulateSlug: 'body-lift',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'calf-augmentation',
        name: 'Calf Augmentation',
        shortName: 'Calf Augmentation',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Calf enhancement using silicone implants or fat transfer to address thin or underdeveloped calf muscles. Particularly popular for bodybuilders and patients with congenital asymmetry.',
        longDescription: `Calf augmentation increases the size and shape of the calf muscles using either solid silicone implants placed beneath the gastrocnemius muscle or autologous fat transfer (using fat harvested from elsewhere on the body). Implants deliver more dramatic enhancement and predictable shape; fat transfer is gentler but with less reliable retention rates.

Common indications include bodybuilders or athletes whose calf muscles haven't responded to training, patients with congenital muscle asymmetry, and those whose calves don't match their overall lower-body proportions. Recovery requires limited weight-bearing for 1-2 weeks and avoiding intense calf exercise for 6-8 weeks. Patient satisfaction is high in well-selected cases but post-operative pain is significant in the first 1-2 weeks.`,
        benefits: ['Dramatic calf size enhancement', 'Corrects congenital asymmetry between calves', 'Two technique options (implant or fat transfer)', 'Permanent enhancement with implants'],
        pros: ['Predictable and dramatic results with implants', 'Fat transfer uses your own tissue', 'Outpatient procedure', 'Hidden small incision behind the knee'],
        cons: ['Significant post-operative pain for 1-2 weeks', 'Limited weight-bearing for 1-2 weeks', 'Implants can shift over time', 'Fat transfer has variable retention (30-70%)'],
        idealFor: 'Bodybuilders, athletes, or patients with thin/underdeveloped or asymmetric calves wanting larger, more muscular-looking legs.',
        recoveryTime: '1-2 weeks (limited weight-bearing), 6-8 weeks (full exercise)',
        procedureDuration: '1-2 hours',
        costRange: '$5,000 - $10,000',
        pricing: { us: { min: 5000, max: 10000 }, thailand: { min: 2000, max: 5000 }, 'south-korea': { min: 2500, max: 6500 }, india: { min: 1500, max: 3500 }, singapore: { min: 4500, max: 8500 } },
        icon: '\u{1F9B5}',
        order: 60,
        simulateSlug: 'calf-augmentation',
        tier: 'C',
        comingSoon: true,
        popularity: 'low',
    },
    {
        slug: 'scar-revision',
        name: 'Scar Revision',
        shortName: 'Scar Revision',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Surgical and non-surgical techniques to improve the appearance of unsightly scars from prior surgery, trauma, or burns. Multiple modalities — excision, laser, steroids, and silicone.',
        longDescription: `Scar revision encompasses multiple approaches to improve scars that are wide, raised, depressed, hyperpigmented, or otherwise cosmetically problematic. Surgical excision repositions the scar in a more favorable orientation or breaks up linear scars with z-plasty/w-plasty geometric closures. Laser resurfacing softens raised or pigmented scars. Steroid injections flatten keloid or hypertrophic scars. Silicone sheeting and pressure garments prevent and improve early scars.

Treatment selection depends on scar type, age, and patient skin type. New scars (under 1 year) often improve dramatically with non-surgical interventions; older scars typically need surgical revision. Best candidates have realistic expectations — scar revision improves but never erases scars. Treatment timing matters: it's generally best to wait 12-18 months after the original injury for the scar to fully mature before surgical revision.`,
        benefits: ['Significantly improves appearance of unsightly scars', 'Multiple modalities to match scar type', 'Often combines surgical + non-surgical for best results', 'Can address keloid and hypertrophic scars'],
        pros: ['Treatments tailored to scar type and skin', 'Non-surgical options have minimal recovery', 'Multiple sessions improve results progressively', 'Significant satisfaction in well-selected cases'],
        cons: ['Cannot erase scars completely', 'Surgical revision creates a new scar (better but still present)', 'Multiple sessions often needed', 'Keloid scars frequently recur despite treatment'],
        idealFor: 'Patients with mature (12+ months old) scars from prior surgery, trauma, burns, or acne that they find aesthetically problematic.',
        recoveryTime: 'Varies by technique: 1 day (steroid) to 2-3 weeks (surgical revision)',
        procedureDuration: '30 min (laser/injection) to 2-3 hours (surgical)',
        costRange: '$200 - $5,000',
        pricing: { us: { min: 200, max: 5000 }, thailand: { min: 80, max: 2000 }, 'south-korea': { min: 100, max: 2500 }, india: { min: 50, max: 1500 }, singapore: { min: 180, max: 4000 } },
        icon: '\u{1FA79}',
        order: 61,
        simulateSlug: 'scar-revision',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'mole-removal',
        name: 'Mole Removal',
        shortName: 'Mole Removal',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Surgical or laser removal of moles for cosmetic or medical (suspected malignancy) reasons. Each technique has cosmetic and pathology trade-offs.',
        longDescription: `Mole removal can be performed surgically (excision with sutures) or via shave excision (raised moles) or laser ablation (small flat moles). Surgical excision provides a complete tissue specimen for pathology — important when there's any concern about melanoma — and produces the most predictable cosmetic outcome with linear scarring. Shave excision removes raised moles flush with the skin but leaves a small flat round scar and may not get the full mole depth. Laser is suitable only for small, flat, clearly benign moles in patients seeking pure cosmetic removal.

Any mole with concerning features (asymmetry, irregular borders, color variation, large size, recent change) MUST be excised surgically with pathology. The other techniques destroy the tissue and prevent definitive diagnosis. Cost varies dramatically by technique — laser is least expensive but least diagnostic; surgical excision is most expensive but provides full pathology assessment.`,
        benefits: ['Removes cosmetically problematic moles', 'Surgical excision provides full pathology', 'Multiple techniques to match indication', 'Quick outpatient procedure (15-30 min)'],
        pros: ['Surgical excision is the gold standard for any concerning mole', 'Multiple techniques for different mole types', 'Local anesthesia only', 'Patient satisfaction high in straightforward cases'],
        cons: ['Surgical excision leaves a linear scar', 'Shave/laser cannot diagnose malignancy', 'Risk of incomplete removal with shave/laser', 'Very rare risk of malignancy missed by destruction techniques'],
        idealFor: 'Patients with cosmetically unwanted moles. ANY suspicious mole must be excised surgically with pathology — not removed by shave or laser.',
        recoveryTime: '7-14 days (sutures), 1-2 weeks (laser/shave)',
        procedureDuration: '15-30 minutes',
        costRange: '$100 - $800 per mole',
        pricing: { us: { min: 100, max: 800 }, thailand: { min: 30, max: 250 }, 'south-korea': { min: 50, max: 350 }, india: { min: 20, max: 150 }, singapore: { min: 80, max: 600 } },
        icon: '\u{1F534}',
        order: 62,
        simulateSlug: 'mole-removal',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'lip-flip',
        name: 'Lip Flip (Botox Lip Treatment)',
        shortName: 'Lip Flip',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Small dose of botulinum toxin injected at the upper lip border that subtly rolls the lip outward. A natural-looking alternative to lip filler with no volume change.',
        longDescription: `Lip flip uses a small dose of botulinum toxin (typically 4-8 units) injected at strategic points along the upper lip's vermilion border. The toxin relaxes the orbicularis oris muscle just enough to allow the upper lip to "flip" or "roll" outward, creating the appearance of a fuller lip without adding volume. Results are subtle — visible but not obvious — and last 6-8 weeks before reinjection is needed.

The procedure is popular among patients who want lip enhancement without the commitment of HA filler, those whose upper lip "disappears" when smiling (gummy smile patients), and those seeking complementary results to existing lip filler. Treatment takes <5 minutes and has no downtime. Cost is significantly lower than filler ($150-$400 per session) but maintenance frequency is much higher.`,
        benefits: ['Subtle lip enhancement without volume change', 'Faster, cheaper, less commitment than lip filler', 'No bruising or swelling typical of fillers', 'Can complement existing filler for refined results'],
        pros: ['Quick procedure (<5 minutes)', 'Reversible — wears off naturally', 'Significantly cheaper than lip filler', 'Subtle and natural-looking results'],
        cons: ['Effects last only 6-8 weeks (filler lasts 6-18 months)', 'Frequent reinjection needed', 'Can affect drinking from straws or making certain sounds for first week', 'Less dramatic enhancement than filler'],
        idealFor: 'Patients wanting subtle lip enhancement without filler, those with thin upper lip from gummy smile, or as a complement to existing lip filler.',
        recoveryTime: 'No downtime; effects develop over 4-7 days',
        procedureDuration: '<5 minutes',
        costRange: '$150 - $400 per session',
        pricing: { us: { min: 150, max: 400 }, thailand: { min: 60, max: 200 }, 'south-korea': { min: 80, max: 250 }, india: { min: 40, max: 180 }, singapore: { min: 120, max: 350 } },
        icon: '\u{1F445}',
        order: 63,
        simulateSlug: 'lip-flip',
        popularity: 'high',
    },
    {
        slug: 'hyperhidrosis-botox',
        name: 'Hyperhidrosis Botox (Excessive Sweating Treatment)',
        shortName: 'Sweat Botox',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Botulinum toxin injection to treat excessive underarm, palm, or forehead sweating. Blocks sweat-gland nerve signals — FDA-approved and life-changing for severe hyperhidrosis.',
        longDescription: `Hyperhidrosis (excessive sweating) affects 4-5% of the population and can be socially debilitating. Botulinum toxin blocks the nerve signals that activate sweat glands, dramatically reducing sweating in the treated area for 4-9 months per session. The treatment is FDA-approved for axillary (underarm) hyperhidrosis but is widely used off-label for palmar (palm), plantar (foot), and forehead sweating.

Treatment uses 50-100 units per axilla — significantly more than cosmetic facial botox. Each underarm requires 15-20 small injections. The procedure is moderately uncomfortable but relief is dramatic: most patients see ~75-90% reduction in sweating within 1-2 weeks. The high unit count makes treatment expensive ($1,000-$2,500 per session per area), but for severe hyperhidrosis it is genuinely transformative — many patients describe it as life-changing.`,
        benefits: ['~75-90% reduction in sweating within 1-2 weeks', 'Treatment lasts 4-9 months per session', 'FDA-approved for underarms; effective off-label elsewhere', 'Dramatic improvement in social/professional confidence'],
        pros: ['Often life-changing for severe hyperhidrosis patients', 'Better tolerated than oral anticholinergic medications', 'No surgical alternative as safe and effective', 'Often covered by insurance for severe cases (with documentation)'],
        cons: ['Expensive due to high unit count ($1,000-$2,500/session/area)', 'Multiple injections per area (uncomfortable)', 'Requires repeat treatment every 4-9 months', 'Palm injections particularly painful — nerve block usually used'],
        idealFor: 'Patients with severe hyperhidrosis (excessive sweating affecting daily life) who haven\'t responded to topical antiperspirants or oral medications.',
        recoveryTime: 'No downtime; effects develop over 1-2 weeks',
        procedureDuration: '20-30 minutes per area',
        costRange: '$1,000 - $2,500 per session per area',
        pricing: { us: { min: 1000, max: 2500 }, thailand: { min: 400, max: 1200 }, 'south-korea': { min: 500, max: 1500 }, india: { min: 250, max: 900 }, singapore: { min: 850, max: 2200 } },
        icon: '\u{1F4A6}',
        order: 64,
        simulateSlug: 'hyperhidrosis-botox',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'mesotherapy',
        name: 'Mesotherapy (Skin/Hair Vitamin Injections)',
        shortName: 'Mesotherapy',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Multiple small injections of vitamins, amino acids, hyaluronic acid, and growth factors into the mesoderm layer of the skin. Used for facial rejuvenation, hair loss, and body contouring.',
        longDescription: `Mesotherapy delivers small doses of customized cocktails — typically vitamins (B-complex, C), amino acids, hyaluronic acid, peptides, and growth factors — directly into the mesoderm layer (between dermis and subcutaneous tissue) via numerous small injections. The localized delivery achieves higher target tissue concentrations than oral or topical routes.

Treatments target three main indications: facial rejuvenation (improved skin tone, texture, hydration), hair loss (scalp injections to stimulate follicles), and body contouring (claimed lipolytic effects, though clinical evidence is limited). A typical course is 6-10 sessions spaced 1-2 weeks apart, with maintenance every 1-2 months. Mesotherapy has more research support for hair indications than for fat reduction. Patient experience varies dramatically by formulation, practitioner technique, and individual response.`,
        benefits: ['Direct delivery of vitamins/HA/growth factors to skin', 'Customizable formulations per indication', 'Treats face, hair, or body areas', 'Combines well with other treatments'],
        pros: ['Multiple indications with one technique', 'Customizable cocktails for individual needs', 'Lower cost than alternative treatments per session', 'Minimal downtime'],
        cons: ['Clinical evidence varies by indication (strongest for hair, weakest for fat reduction)', 'Multiple sessions required', 'Painful (multiple injections)', 'Results vary significantly by formulation and patient'],
        idealFor: 'Patients seeking nutrient-based facial rejuvenation, those with early-stage hair thinning, or as adjunct therapy to other aesthetic treatments.',
        recoveryTime: 'Mild bruising/redness for 1-3 days',
        procedureDuration: '20-40 minutes per session',
        costRange: '$200 - $600 per session',
        pricing: { us: { min: 200, max: 600 }, thailand: { min: 80, max: 280 }, 'south-korea': { min: 100, max: 350 }, india: { min: 50, max: 200 }, singapore: { min: 180, max: 500 } },
        icon: '\u{1F489}',
        order: 65,
        simulateSlug: 'mesotherapy',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'plasma-fibroblast',
        name: 'Plasma Fibroblast (Plasma Pen / Fibroblast Therapy)',
        shortName: 'Plasma Fibroblast',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Targeted plasma energy creates micro-injuries that contract the skin and stimulate collagen. Treats eyelid laxity, fine lines, and skin tags — non-surgical alternative to blepharoplasty for some patients.',
        longDescription: `Plasma fibroblast therapy uses a hand-held device that ionizes air to create a small electrical arc (plasma) at the device tip. The plasma creates precisely controlled micro-injuries on the skin surface, causing immediate skin contraction and triggering a collagen-remodeling response over the following months. The technology is particularly suited to small areas — eyelid skin, fine lines around the mouth, skin tags, age spots, and small areas of laxity.

For many patients with mild upper-eyelid laxity, plasma fibroblast offers a non-surgical alternative to blepharoplasty. The treatment leaves small black "carbon dots" on the skin that crust over for 5-7 days before flaking off naturally. Most patients require 1-3 sessions spaced 8-12 weeks apart, with results building over 3-6 months as collagen remodels. Best candidates have lighter skin tones (darker skin has higher hyperpigmentation risk).`,
        benefits: ['Non-surgical alternative to blepharoplasty for mild laxity', 'Treats fine lines, skin tags, age spots', 'Visible immediate skin contraction', 'Stimulates collagen for ongoing improvement'],
        pros: ['Avoids surgical risks for mild cases', 'Cheaper than blepharoplasty', 'Outpatient with topical anesthesia only', 'Multiple treatable concerns in one session'],
        cons: ['5-7 days of visible "carbon dots" crusting', 'Risk of hyperpigmentation, especially in darker skin', 'Not suitable for moderate-severe laxity', 'Results subtle compared to surgical alternatives'],
        idealFor: 'Patients with mild upper-eyelid laxity, fine lines, or skin tags who want a non-surgical alternative — particularly those with lighter skin tones.',
        recoveryTime: '5-7 days (carbon dots), 2-3 weeks (full healing)',
        procedureDuration: '30-90 minutes per session',
        costRange: '$500 - $2,500 per session',
        pricing: { us: { min: 500, max: 2500 }, thailand: { min: 200, max: 1000 }, 'south-korea': { min: 250, max: 1300 }, india: { min: 150, max: 800 }, singapore: { min: 450, max: 2000 } },
        icon: '⚡',
        order: 66,
        simulateSlug: 'plasma-fibroblast',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'radiesse',
        name: 'Radiesse (Calcium Hydroxylapatite Filler)',
        shortName: 'Radiesse',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Long-lasting calcium-based filler that adds immediate volume AND stimulates collagen for up to 18 months. Particularly suited to deep folds, jawline, and hand rejuvenation.',
        longDescription: `Radiesse is a calcium hydroxylapatite (CaHA) injectable that combines two mechanisms: immediate volumization from the calcium microspheres suspended in a gel carrier, and long-term collagen stimulation as the spheres are gradually resorbed. The dual action makes it longer-lasting (12-18 months) than most HA fillers (6-12 months) and gives it characteristic "skin booster" effects beyond simple volume.

Common applications include deep nasolabial folds, jawline contouring, hand rejuvenation (where age-related volume loss makes veins prominent), and chest decollete. It is generally NOT suitable for lip enhancement (visible white lumps can occur) or fine line treatment. The product can be diluted ("hyperdilute Radiesse") for skin-quality treatment that resembles Sculptra but with faster onset.`,
        benefits: ['Lasts 12-18 months — longer than most HA fillers', 'Dual action: immediate volume + collagen stimulation', 'Excellent for jawline, hands, and deep folds', 'Hyperdilute version provides skin-quality improvement'],
        pros: ['Longer-lasting than HA fillers', 'FDA-approved with extensive safety data', 'Particularly effective on jawline and hands', 'Versatile dilution for different indications'],
        cons: ['NOT suitable for lips (visible nodules)', 'Cannot be reversed (no enzyme dissolves it)', 'More expensive than HA fillers ($800-$1,500 per syringe)', 'Bruising more common than with HA'],
        idealFor: 'Patients with deep nasolabial folds, jawline contouring needs, hand volume loss, or wanting longer-lasting filler than HA — but NOT for lip treatment.',
        recoveryTime: 'No downtime; bruising/swelling for 3-7 days',
        procedureDuration: '20-30 minutes',
        costRange: '$800 - $1,500 per syringe',
        pricing: { us: { min: 800, max: 1500 }, thailand: { min: 350, max: 800 }, 'south-korea': { min: 450, max: 1000 }, india: { min: 250, max: 600 }, singapore: { min: 700, max: 1300 } },
        icon: '\u{1F48A}',
        order: 67,
        simulateSlug: 'radiesse',
        popularity: 'medium',
    },
    {
        slug: 'eyelash-extensions',
        name: 'Eyelash Extensions / Eyelash Transplant',
        shortName: 'Eyelash Enhancement',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Semi-permanent eyelash extensions or surgical eyelash transplant for sparse or absent lashes. From cosmetic boost to reconstruction after trauma or trichotillomania.',
        longDescription: `Eyelash enhancement spans two distinct categories. Semi-permanent eyelash extensions are individual synthetic, mink, or silk lashes glued to natural lashes, lasting 3-6 weeks before needing fills. They\'re a purely cosmetic enhancement requiring frequent maintenance.

Eyelash transplant is a surgical procedure where individual hair follicles (typically from the back of the scalp) are transplanted into the eyelid, providing permanent eyelash restoration. The procedure is most commonly performed for patients with sparse lashes from genetic causes, trauma, burns, prior surgery, or trichotillomania (compulsive hair-pulling). Each session transplants 30-50 follicles per upper lid; results are permanent but require trimming since transplanted hair grows like scalp hair, not naturally short like eyelashes.`,
        benefits: ['Extensions: instant fuller lashes, no surgery', 'Transplant: permanent eyelash restoration', 'Treats trauma, burns, or trichotillomania', 'Restores normal eyelash appearance'],
        pros: ['Extensions: no permanent commitment, dramatic results', 'Transplant: truly permanent, natural-looking', 'Can be combined for enhanced results', 'High patient satisfaction in well-selected cases'],
        cons: ['Extensions: weak natural lashes from glue, frequent maintenance', 'Transplant: hair grows like scalp hair (needs trimming)', 'Transplant has surgical risks and significant cost', 'Misapplied extensions can damage natural lashes'],
        idealFor: 'Extensions: anyone wanting fuller lashes temporarily. Transplant: patients with sparse lashes from trauma, surgery, congenital cause, or trichotillomania.',
        recoveryTime: 'Extensions: none. Transplant: 1-2 weeks initial healing',
        procedureDuration: 'Extensions: 1-3 hours. Transplant: 2-4 hours',
        costRange: 'Extensions: $150-$400 per fill. Transplant: $5,000-$15,000',
        pricing: { us: { min: 150, max: 15000 }, thailand: { min: 50, max: 6000 }, 'south-korea': { min: 80, max: 9000 }, india: { min: 30, max: 4000 }, singapore: { min: 130, max: 12000 } },
        icon: '\u{1F441}️',
        order: 68,
        simulateSlug: 'eyelash-extensions',
        popularity: 'medium',
    },
    {
        slug: 'mons-pubis-lift',
        name: 'Mons Pubis Lift (Monsplasty)',
        shortName: 'Mons Pubis Lift',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Surgical lift and reduction of the mons pubis (pubic mound) area following major weight loss or aging. Often combined with tummy tuck or labiaplasty for comprehensive lower-body restoration.',
        longDescription: `The mons pubis is the soft tissue mound covering the pubic bone. Following major weight loss, pregnancy, or aging, this area can develop excess skin and fat that creates a prominent bulge under clothing — sometimes called "FUPA" colloquially. Mons pubis lift removes excess tissue and tightens remaining skin, often combined with simultaneous tummy tuck since the incisions can share an anatomical zone.

The procedure uses an incision typically hidden in or just above the underwear line. Recovery is similar to tummy tuck — 2-3 weeks before light activity, 4-6 weeks before exercise — and most patients combine it with other procedures rather than doing it standalone. Patient satisfaction is high in well-selected cases, particularly post-bariatric patients.`,
        benefits: ['Reduces prominent mons pubis bulge under clothing', 'Often combined with tummy tuck for shared incision', 'Restores body confidence after major weight loss', 'Permanent results when weight is maintained'],
        pros: ['Hidden incision under underwear/clothing', 'High satisfaction in post-weight-loss patients', 'Often combinable with tummy tuck or labiaplasty', 'Single-stage procedure'],
        cons: ['Permanent scar (though hidden by clothing)', '2-3 weeks restricted activity', 'Risk of wound healing problems given location', 'Not insurance-covered (cosmetic indication)'],
        idealFor: 'Post-weight-loss patients or post-pregnancy patients with prominent mons pubis bulge — often as part of mommy makeover or after bariatric surgery.',
        recoveryTime: '2-3 weeks (light activity), 4-6 weeks (full exercise)',
        procedureDuration: '1-2 hours (standalone); 4-6 hours (combined with tummy tuck)',
        costRange: '$3,500 - $8,000 (standalone)',
        pricing: { us: { min: 3500, max: 8000 }, thailand: { min: 1500, max: 3500 }, 'south-korea': { min: 2000, max: 5000 }, india: { min: 1000, max: 2500 }, singapore: { min: 3000, max: 6500 } },
        icon: '\u{1F338}',
        order: 69,
        simulateSlug: 'mons-pubis-lift',
        saleReady: false,
        popularity: 'low',
    },
    {
        slug: 'dimpleplasty',
        name: 'Dimpleplasty (Dimple Creation)',
        shortName: 'Dimpleplasty',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Surgical creation of cheek dimples by attaching a small portion of cheek muscle to the inner skin. A growing trend particularly popular in Korea and Southeast Asia.',
        longDescription: `Dimpleplasty creates artificial cheek dimples by suturing a small portion of the buccinator muscle to the inner cheek skin, causing a depression to form when the patient smiles. The procedure is performed entirely through a small incision inside the mouth, leaving no external scars. The depth and position of the dimple are customized at consultation, and patients can preview the proposed dimple location with a marker test.

For the first 4-6 weeks post-procedure, the dimple appears even when the face is at rest (not just when smiling) — this is expected and gradually evolves to a smile-only dimple as the surgical adhesions mature. The procedure is technically simple but requires precision: misplaced dimples are difficult to revise, and over-deep dimples can look unnatural. Particularly popular in South Korea, Thailand, and parts of South Asia where dimples are considered an attractive feature.`,
        benefits: ['Permanent cheek dimples that appear when smiling', 'Outpatient procedure with quick recovery', 'No external scarring (intraoral approach)', 'Customizable dimple depth and position'],
        pros: ['Quick procedure (~30-45 minutes)', 'Hidden intraoral incision', 'Permanent result', 'Local anesthesia option'],
        cons: ['Dimple visible at rest for 4-6 weeks (expected)', 'Difficult to revise if positioned poorly', 'Risk of asymmetry between left and right dimples', 'Not insurance-covered (purely cosmetic)'],
        idealFor: 'Patients without natural dimples who want permanent cheek dimples — particularly popular in East Asian and South Asian aesthetic markets.',
        recoveryTime: 'Soft food for 5-7 days; full normalization in 4-6 weeks',
        procedureDuration: '30-45 minutes',
        costRange: '$1,500 - $4,000',
        pricing: { us: { min: 1500, max: 4000 }, thailand: { min: 500, max: 1800 }, 'south-korea': { min: 700, max: 2500 }, india: { min: 350, max: 1200 }, singapore: { min: 1200, max: 3500 } },
        icon: '\u{1F60A}',
        order: 70,
        simulateSlug: 'dimpleplasty',
        popularity: 'medium',
    },
    {
        slug: 'gynecomastia-surgery',
        name: 'Gynecomastia Surgery (Male Breast Reduction)',
        shortName: 'Gynecomastia Surgery',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Surgical reduction of enlarged male breast tissue (gynecomastia). Combines liposuction with direct glandular excision for a flat, masculine chest contour.',
        longDescription: `Gynecomastia surgery addresses enlarged male breast tissue — a condition affecting 30-60% of men at some point in life, often persisting from puberty or developing during weight gain, hormonal changes, certain medications, or anabolic steroid use. The procedure combines liposuction (for fatty tissue) with direct glandular excision (for dense breast tissue), producing a flat, masculine chest contour.

Most cases use a small incision around the lower areola edge for glandular removal plus 2-3 small puncture sites for liposuction. Severe cases with significant skin laxity may need additional skin excision (similar to a male mastectomy pattern). Recovery is typically 1-2 weeks for return to work and 4-6 weeks before resuming chest exercises. Patient satisfaction is among the highest in male cosmetic surgery — the condition is often a source of significant psychological distress, and the surgical fix is durable.`,
        benefits: ['Flat, masculine chest contour', 'High patient satisfaction (often life-changing)', 'Combines lipo + glandular excision in one session', 'Can be done with local + sedation'],
        pros: ['Outpatient procedure', 'Minimal scarring (hidden at areolar edge)', 'Permanent results when weight is maintained', 'Resolves long-standing psychological burden'],
        cons: ['Possible asymmetry or contour irregularity', 'Risk of nipple sensation changes', 'Permanent scars (small but present)', 'Recurrence possible with significant weight gain'],
        idealFor: 'Men with persistent gynecomastia (lasting >12 months) that hasn\'t responded to weight loss or addressing underlying causes.',
        recoveryTime: '1-2 weeks (return to work), 4-6 weeks (chest exercise)',
        procedureDuration: '1-2 hours',
        costRange: '$3,500 - $8,000',
        pricing: { us: { min: 3500, max: 8000 }, thailand: { min: 1500, max: 3500 }, 'south-korea': { min: 2000, max: 5000 }, india: { min: 1000, max: 2800 }, singapore: { min: 3000, max: 7000 } },
        icon: '\u{1F454}',
        order: 71,
        simulateSlug: 'gynecomastia-surgery',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'septoplasty',
        comingSoon: true,
        name: 'Septoplasty (Deviated Septum Repair)',
        shortName: 'Septoplasty',
        category: 'surgical',
        categoryLabel: 'Surgical',
        simulatorType: '2d',
        description: 'Functional surgery to straighten a deviated nasal septum and improve breathing. Often combined with rhinoplasty (septorhinoplasty) for both functional and cosmetic outcomes.',
        longDescription: `Septoplasty straightens a deviated nasal septum — the wall of cartilage and bone between the nostrils that, when displaced, can obstruct airflow, cause chronic congestion, and contribute to sinus issues. Unlike rhinoplasty (cosmetic nose reshaping), septoplasty is purely functional and is therefore typically covered by insurance when documented breathing difficulties are present.

The procedure works through small incisions inside the nostrils — no external scars. Surgeons remove or reposition deviated portions of the septum while preserving structural support. Most patients see significant breathing improvement immediately after splints are removed at 5-7 days. Septoplasty is frequently combined with cosmetic rhinoplasty (called "septorhinoplasty") so patients address both concerns in a single recovery — common after sports injuries that cause both breathing issues and visible deformity.`,
        benefits: ['Significant breathing improvement', 'Often insurance-covered (functional indication)', 'Can be combined with cosmetic rhinoplasty', 'No external scarring'],
        pros: ['Insurance coverage typical for documented obstruction', 'Pure functional benefit (or combined functional + cosmetic)', 'Hidden incisions inside the nostrils', 'High satisfaction for breathing improvement'],
        cons: ['Recovery includes 1-2 weeks of internal congestion', 'Risk of septal perforation (rare but serious)', 'Splints uncomfortable for first 5-7 days', 'Improvement can be incomplete if other airway issues exist'],
        idealFor: 'Patients with documented nasal obstruction from a deviated septum — chronic congestion, mouth breathing, sleep disturbance, or recurrent sinus issues.',
        recoveryTime: '5-7 days (splint removal), 2-3 weeks (full breathing recovery)',
        procedureDuration: '45-90 minutes',
        costRange: '$3,000 - $6,000 (often insurance-covered)',
        pricing: { us: { min: 3000, max: 6000 }, thailand: { min: 1200, max: 2800 }, 'south-korea': { min: 1500, max: 3500 }, india: { min: 600, max: 1800 }, singapore: { min: 2500, max: 5000 } },
        icon: '\u{1F443}',
        order: 72,
        simulateSlug: 'septoplasty',
        tier: 'C',
        popularity: 'medium',
    },
    {
        slug: 'vaginal-rejuvenation',
        name: 'Vaginal Rejuvenation (Vaginoplasty)',
        shortName: 'Vaginal Rejuvenation',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Surgical or non-surgical procedures to address vaginal laxity after childbirth or aging. Includes vaginoplasty (surgical tightening) and laser/RF treatments. The simulator is an expectation visualizer — it shows post-procedure healing texture, not a precise geometric outcome.',
        longDescription: `Vaginal rejuvenation refers to multiple procedures that address vaginal laxity, dryness, and related concerns — usually after childbirth, aging-related estrogen decline, or major weight loss. The umbrella term covers both surgical (vaginoplasty) and non-surgical (laser/RF) interventions, distinct from labiaplasty (which addresses external labial tissue).

Surgical vaginoplasty tightens the vaginal canal by removing excess tissue from the posterior vaginal wall and reconstructing the underlying muscle. Non-surgical options use fractional CO2 laser (MonaLisa Touch), RF (ThermiVa), or PRP (O-Shot) to stimulate tissue remodeling without surgery. Patient satisfaction is high among well-selected candidates, but stigma around discussing the procedures keeps many women from seeking treatment despite real concerns.`,
        benefits: ['Addresses postpartum vaginal laxity', 'Improves intimate sensation and confidence', 'Multiple modalities — surgical and non-surgical options', 'Can resolve mild urinary stress incontinence'],
        pros: ['High patient satisfaction in well-selected cases', 'Multiple options to match severity', 'Non-surgical options have minimal recovery', 'Often combined with labiaplasty in single session'],
        cons: ['Surgical recovery includes 6 weeks of pelvic rest', 'Stigma delays many candidates from seeking treatment', 'Non-surgical results subtle compared to surgical', 'Not insurance-covered (cosmetic indication)'],
        idealFor: 'Women with vaginal laxity from childbirth, aging, or weight loss — particularly those experiencing intimate dissatisfaction or mild stress incontinence.',
        recoveryTime: 'Surgical: 6 weeks pelvic rest. Non-surgical: 2-3 days mild discomfort',
        procedureDuration: 'Surgical: 1-2 hours. Non-surgical: 30 minutes',
        costRange: 'Surgical: $4,500-$9,000. Non-surgical: $1,500-$3,500/session',
        pricing: { us: { min: 1500, max: 9000 }, thailand: { min: 600, max: 4000 }, 'south-korea': { min: 800, max: 5000 }, india: { min: 400, max: 2500 }, singapore: { min: 1300, max: 7500 } },
        icon: '\u{1F33A}',
        order: 73,
        simulateSlug: 'vaginal-rejuvenation',
        saleReady: false,
        popularity: 'medium',
    },
    {
        slug: 'mini-tummy-tuck',
        name: 'Mini Tummy Tuck (Mini Abdominoplasty)',
        shortName: 'Mini Tummy Tuck',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Less invasive variant of tummy tuck that addresses only the lower abdomen below the navel. Smaller incision, shorter recovery — ideal for patients with localized lower-belly concerns.',
        longDescription: `Mini tummy tuck addresses only the area between the pubic bone and navel, in contrast to full abdominoplasty which extends from pubic bone to rib cage. The procedure removes a smaller skin/fat segment, leaves the navel intact (no umbilical relocation), and uses a shorter incision similar in length to a C-section scar — typically 4-6 inches vs the 12-18 inches of a full tummy tuck.

Ideal candidates have isolated lower-abdominal skin laxity or fat (often post-pregnancy) without significant upper abdominal concerns or diastasis recti. Recovery is meaningfully shorter than full abdominoplasty: most patients return to work in 7-10 days vs 2-3 weeks. Cost is also reduced. Limitations are real, though — patients with significant upper-abdominal laxity or muscle separation will be disappointed by the limited correction; for them, full abdominoplasty is the right answer.`,
        benefits: ['Shorter scar (similar to C-section)', 'Faster recovery than full tummy tuck', 'Lower cost', 'Hidden incision under underwear/swimwear'],
        pros: ['Outpatient procedure (often local + sedation)', '7-10 days return to work', 'Less aggressive surgical experience', 'Suitable for fit patients with localized concerns'],
        cons: ['Cannot address upper abdomen', 'No diastasis recti repair (muscle separation stays)', 'Limited fat/skin removal vs full tummy tuck', 'Wrong choice for patients with significant abdominal concerns'],
        idealFor: 'Fit patients with isolated lower-abdominal laxity (often post-pregnancy or minor weight loss) who don\'t need full abdominoplasty.',
        recoveryTime: '7-10 days (return to work), 3-4 weeks (full activity)',
        procedureDuration: '1.5-2 hours',
        costRange: '$3,500 - $7,500',
        pricing: { us: { min: 3500, max: 7500 }, thailand: { min: 1500, max: 3500 }, 'south-korea': { min: 2000, max: 4500 }, india: { min: 1000, max: 2800 }, singapore: { min: 3000, max: 6500 } },
        icon: '\u{1F465}',
        order: 74,
        simulateSlug: 'mini-tummy-tuck',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'areola-reduction',
        name: 'Areola Reduction',
        shortName: 'Areola Reduction',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Surgical reduction of enlarged or stretched areolas. Often performed alone or combined with breast lift/reduction/augmentation. Quick outpatient procedure.',
        longDescription: `Areola reduction surgery decreases the diameter of enlarged or stretched areolas (the pigmented circular area surrounding the nipple). Common indications include: areolas enlarged from pregnancy or weight changes, congenitally large areolas, or asymmetry between left and right. The procedure is performed alone or combined with breast lift, reduction, or augmentation when overall breast reshaping is desired.

The technique uses a circumferential (donut) excision around the areola, with a smaller circular incision drawn within and the intervening skin removed. The remaining tissue is closed in a circular pattern. Sensation usually preserves well since the underlying nerve supply is preserved by the technique. Recovery is brief — most patients return to work within a few days; the breast tissue heals in 4-6 weeks before strenuous exercise. The scar is hidden at the areola edge and typically fades to a pale line over 12-18 months.`,
        benefits: ['Reduces enlarged or stretched areolas', 'Corrects asymmetry between left and right', 'Quick outpatient procedure', 'Often combined with other breast surgery'],
        pros: ['Hidden scar at the areola edge', 'Preserves nipple sensation in most cases', 'Brief recovery (return to work in days)', 'High patient satisfaction'],
        cons: ['Possible reduction in nipple sensation', 'Future pregnancy/breastfeeding can re-stretch areolas', 'Permanent (though usually fading) scar', 'Not insurance-covered (cosmetic)'],
        idealFor: 'Patients with enlarged or asymmetric areolas — often post-pregnancy or post-weight loss — wanting more proportionate breast appearance.',
        recoveryTime: '3-7 days (light activity), 4-6 weeks (chest exercise)',
        procedureDuration: '45-90 minutes',
        costRange: '$2,000 - $5,000',
        pricing: { us: { min: 2000, max: 5000 }, thailand: { min: 800, max: 2500 }, 'south-korea': { min: 1200, max: 3500 }, india: { min: 600, max: 1800 }, singapore: { min: 1800, max: 4500 } },
        icon: '\u{2B55}',
        order: 75,
        simulateSlug: 'areola-reduction',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'buttock-implants',
        name: 'Buttock Implants (Gluteal Augmentation)',
        shortName: 'Buttock Implants',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Solid silicone implants placed in the buttocks to add volume and projection. Alternative to BBL fat transfer for patients without enough fat to harvest, or who prefer firmer feel.',
        longDescription: `Buttock implants use solid silicone implants placed beneath the gluteal muscle to add permanent volume and projection. Unlike BBL (Brazilian Butt Lift, which uses fat transfer), implants don't require fat harvest — making them an option for thin patients without enough donor fat. They also provide more predictable, consistent volume since fat transfer has variable retention rates.

Implants come in various shapes (round, oval, anatomical) and sizes (200-700cc range). Recovery is significant — patients cannot sit directly on their buttocks for 4-6 weeks, and full healing takes 3 months. The procedure carries higher complication rates than BBL (infection, implant migration, capsular contracture) and the recovery is more demanding. Patient selection is critical: thin patients without fat donor sites benefit most, while patients with adequate fat are usually better served by BBL.`,
        benefits: ['Permanent volume that doesn\'t require fat reabsorption', 'Suitable for thin patients without donor fat', 'Predictable, firmer projection', 'Longer-lasting than BBL\'s natural fat-loss decline'],
        pros: ['No need for fat harvest (lipo) elsewhere', 'Predictable, firm volume', 'Customizable shapes and sizes', 'Permanent enhancement'],
        cons: ['Cannot sit directly on buttocks for 4-6 weeks (recovery is demanding)', 'Higher complication rate than BBL (infection, migration)', 'Implants can shift over time', 'Different feel than natural fat (firmer)'],
        idealFor: 'Thin patients without enough fat for BBL who want permanent buttock volume, or those preferring the predictable result of an implant over fat-transfer variability.',
        recoveryTime: '4-6 weeks (sitting restriction), 3 months (full healing)',
        procedureDuration: '2-3 hours',
        costRange: '$8,000 - $14,000',
        pricing: { us: { min: 8000, max: 14000 }, thailand: { min: 3500, max: 7000 }, 'south-korea': { min: 4500, max: 9000 }, india: { min: 2500, max: 5500 }, singapore: { min: 7000, max: 12000 } },
        icon: '\u{1F351}',
        order: 76,
        simulateSlug: 'buttock-implants',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'prp-facial',
        name: 'PRP Facial (Vampire Facial)',
        shortName: 'PRP Facial',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Patient\'s own concentrated platelets applied to the face after microneedling. Stimulates collagen, improves texture, and reduces acne scars — popularized as the "Vampire Facial".',
        longDescription: `PRP (Platelet-Rich Plasma) facial — popularized as the "Vampire Facial" — combines microneedling with the patient's own concentrated platelets and growth factors. Blood is drawn, centrifuged to concentrate platelets, then applied topically to the freshly micro-channeled skin where the growth factors penetrate deeply and signal increased collagen production, accelerated healing, and improved cellular turnover.

The treatment addresses similar concerns to standalone microneedling — fine lines, acne scars, enlarged pores, dull texture — but with enhanced results from the growth-factor delivery. Most patients require 3-6 sessions spaced 4-6 weeks apart, with continued improvement for 3-6 months after the final session. PRP is autologous (uses the patient's own biological material), so there's no risk of allergic reaction or rejection. The "vampire" nickname comes from the dramatic appearance of blood on the face during treatment, but the actual procedure is well-tolerated and recovery is similar to standard microneedling (1-3 days redness).`,
        benefits: ['Combines microneedling + growth factors for enhanced results', 'Treats fine lines, acne scars, pores, dull skin', 'Uses your own blood (no allergic reactions)', 'Continued improvement for 3-6 months post-treatment'],
        pros: ['Autologous treatment — no foreign substances', 'More effective than microneedling alone for many concerns', 'Safe across all skin types', 'Combines well with other treatments'],
        cons: ['Multiple sessions required (3-6) for optimal results', 'Cost more than standalone microneedling ($600-$1,500/session)', '1-3 days of redness/sensitivity after each session', 'Results subtle — not a one-time dramatic fix'],
        idealFor: 'Patients with fine lines, mild acne scars, enlarged pores, or dull texture who want enhanced results over standalone microneedling.',
        recoveryTime: '1-3 days redness/sensitivity',
        procedureDuration: '60-90 minutes per session',
        costRange: '$600 - $1,500 per session',
        pricing: { us: { min: 600, max: 1500 }, thailand: { min: 250, max: 700 }, 'south-korea': { min: 350, max: 900 }, india: { min: 150, max: 500 }, singapore: { min: 500, max: 1300 } },
        icon: '\u{1F9DB}',
        order: 77,
        simulateSlug: 'prp-facial',
        popularity: 'medium',
    },
    {
        slug: 'co2-laser',
        name: 'CO2 Laser Resurfacing (Fractional CO2)',
        shortName: 'CO2 Laser',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Aggressive ablative laser that vaporizes the top layers of skin to trigger dramatic collagen remodeling. The most powerful non-surgical resurfacing — significant downtime in exchange for significant results.',
        longDescription: `CO2 laser resurfacing uses a 10,600nm wavelength laser to vaporize the topmost layers of skin in precise patterns, then triggers dramatic collagen remodeling during healing. Modern fractional CO2 (treating only fractional columns of skin rather than the full surface) has reduced — but not eliminated — the recovery time compared to full-resurfacing techniques. It remains the most powerful non-surgical resurfacing available.

Indications include severe acne scars, deep wrinkles, sun damage, precancerous lesions, and overall skin aging. Recovery involves 7-14 days of significant redness, swelling, and crusting before the new skin emerges. Strict sun avoidance is required for 3-6 months. The investment in downtime is significant but the results — particularly for severe concerns — are unmatched by gentler treatments. Best results in lighter skin tones (Fitzpatrick I-III); darker skin requires careful provider selection due to hyperpigmentation risk.`,
        benefits: ['Most powerful non-surgical resurfacing', 'Treats severe scarring, deep wrinkles, advanced sun damage', 'Single treatment delivers dramatic results (vs multi-session alternatives)', 'Stimulates years of collagen remodeling'],
        pros: ['Unmatched results for severe concerns', 'Often a single treatment is enough', 'Long-lasting results (5+ years)', 'Treats multiple concerns simultaneously'],
        cons: ['Significant downtime: 7-14 days redness/crusting', 'Strict sun avoidance for 3-6 months', 'Risk of hyperpigmentation in darker skin tones', 'Most painful resurfacing — typically requires sedation'],
        idealFor: 'Patients with severe acne scarring, deep wrinkles, advanced sun damage, or overall photoaged skin willing to commit to 1-2 weeks of downtime — particularly those with lighter skin tones.',
        recoveryTime: '7-14 days (visible healing), 3-6 months (sun avoidance)',
        procedureDuration: '60-90 minutes',
        costRange: '$1,500 - $5,000 per session',
        pricing: { us: { min: 1500, max: 5000 }, thailand: { min: 600, max: 2200 }, 'south-korea': { min: 800, max: 3000 }, india: { min: 400, max: 1800 }, singapore: { min: 1300, max: 4000 } },
        icon: '\u{1F525}',
        order: 78,
        simulateSlug: 'co2-laser',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'microblading',
        name: 'Microblading (Eyebrow Tattoo)',
        shortName: 'Microblading',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Semi-permanent eyebrow tattooing using fine blade strokes to mimic individual hairs. Results last 18-24 months — natural-looking alternative for sparse, thin, or absent eyebrows.',
        longDescription: `Microblading is a semi-permanent cosmetic tattoo technique that deposits pigment into the upper dermis using a hand-held tool with very fine blades. The artist creates individual hair-like strokes mimicking natural eyebrow hairs, producing a result much more natural than traditional powder-fill cosmetic tattoo. Most clients are women with sparse, over-plucked, thin, or chemotherapy-affected eyebrows.

Treatment is performed in two sessions: an initial 2-3 hour session, followed by a touch-up at 6-8 weeks to perfect the design and replace pigment that didn't fully take during initial healing. Annual or biannual color refreshes maintain the look since the pigment fades over 18-24 months. Unlike permanent tattoo, microblading uses pigments specifically designed to fade — preventing the unnatural blue/green appearance of older eyebrow tattoos as they age. Best results are in patients with normal-to-dry skin; oily skin causes faster fading and less crisp lines.`,
        benefits: ['Natural-looking, hair-stroke appearance', 'No daily eyebrow makeup needed', 'Lasts 18-24 months before refresh needed', 'Restores eyebrows lost to over-plucking, alopecia, or chemotherapy'],
        pros: ['Looks like real eyebrow hairs', 'Customized shape and color to match face', 'Saves time daily on eyebrow makeup', 'High patient satisfaction'],
        cons: ['Fades faster on oily skin', 'Annual touch-ups needed for ongoing results', 'Risk of poor outcome with inexperienced artist', 'Cannot easily correct if shape is wrong (must wait for fade)'],
        idealFor: 'Patients with sparse, over-plucked, thin, or absent eyebrows wanting natural-looking semi-permanent enhancement.',
        recoveryTime: '7-10 days (scab healing); 6-8 weeks before touch-up',
        procedureDuration: '2-3 hours initial + 1 hour touch-up',
        costRange: '$300 - $900 (initial + touch-up)',
        pricing: { us: { min: 300, max: 900 }, thailand: { min: 100, max: 400 }, 'south-korea': { min: 150, max: 500 }, india: { min: 60, max: 300 }, singapore: { min: 250, max: 750 } },
        icon: '\u{1F58C}',
        order: 79,
        simulateSlug: 'microblading',
        popularity: 'medium',
    },
    {
        slug: 'lip-blush-tattoo',
        name: 'Lip Blush (Cosmetic Lip Tattoo)',
        shortName: 'Lip Blush',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Semi-permanent cosmetic tattoo that deposits pigment into the lips for enhanced color, definition, and a permanently "tinted" appearance. Lasts 2-3 years.',
        longDescription: `Lip blush (also called lip tint, lip tattoo, or cosmetic lip pigmentation) is a semi-permanent makeup technique that deposits soft pigment into the lips, enhancing color, defining the lip border, and creating a subtle "always wearing lipstick" appearance. The technique uses very fine needles and pigments specifically formulated for lip tissue — different from body-tattoo pigments which can fade unpredictably.

Treatment requires 2 sessions: an initial 2-3 hour application, followed by a touch-up 6-8 weeks later to refine the color. Final results last 2-3 years before refresh is needed. Color choices range from natural pink/coral tones (subtle enhancement) to bold reds (for those wanting more dramatic effect). Recovery involves 5-7 days of swollen, scaly lips that gradually flake to reveal the final color. Pre-treatment consultation should include screening for cold sore history (HSV) since lip tattoo can trigger outbreaks — antiviral prophylaxis is standard for affected patients.`,
        benefits: ['Permanent lip color enhancement', 'Defines lip border and corrects asymmetry', 'No daily lipstick required', 'Subtle enhancement or bold color — your choice'],
        pros: ['Wakes up with lip color in place', 'Brightens dull or faded lips', 'Customizable color and intensity', 'Long-lasting (2-3 years)'],
        cons: ['5-7 days of swollen, peeling lips', 'Can trigger cold sore outbreaks (antiviral prophylaxis recommended)', 'Color shifts as it fades', 'Requires periodic refresh'],
        idealFor: 'Patients with pale, asymmetric, or aging lips wanting permanent color enhancement — particularly those who wear lipstick daily.',
        recoveryTime: '5-7 days (peeling), 6-8 weeks before touch-up',
        procedureDuration: '2-3 hours initial + 1 hour touch-up',
        costRange: '$400 - $1,200 (initial + touch-up)',
        pricing: { us: { min: 400, max: 1200 }, thailand: { min: 150, max: 500 }, 'south-korea': { min: 200, max: 700 }, india: { min: 80, max: 350 }, singapore: { min: 350, max: 1000 } },
        icon: '\u{1F484}',
        order: 80,
        simulateSlug: 'lip-blush-tattoo',
        popularity: 'medium',
    },
    {
        slug: 'glutathione-injection',
        // Off-label per FDA (US) and PMDA (JP) for skin whitening, but
        // commonly marketed in TH/IN/PH/VN/MY/ID. Per-market gating:
        // sale-ready in those markets, hidden in others. The free /demo
        // route stays live everywhere — it's the paid offerings that
        // are gated.
        marketsAllowed: ['TH', 'IN', 'PH', 'VN', 'MY', 'ID'],
        name: 'Glutathione (Skin Whitening Injection)',
        shortName: 'Glutathione',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'IV or IM injection of the antioxidant glutathione, marketed for skin lightening. Hugely popular in APAC markets but with limited Western regulatory approval and active scientific debate.',
        longDescription: `Glutathione is an endogenous antioxidant naturally produced in cells. Injectable glutathione (IV or IM) is marketed for skin lightening based on its mechanism of inhibiting tyrosinase — the enzyme that produces melanin — and converting eumelanin (darker) to pheomelanin (lighter). The treatment is enormously popular in the Philippines, Thailand, Vietnam, Indonesia, India, and parts of the Middle East for skin lightening, but remains controversial in Western medical circles where the FDA has issued explicit warnings about safety and efficacy.

Treatment protocols vary widely — typical IV regimens use 600-1,200mg per session, 1-3 times weekly for 8-12 weeks initial, then monthly maintenance. Cost is significant when summed across the protocol. The FDA does not approve injectable glutathione for skin lightening, and serious side effects (including kidney injury, Stevens-Johnson syndrome, and liver toxicity) have been reported with non-pharmaceutical-grade products. Patients pursuing this treatment should: (1) verify pharmaceutical-grade source, (2) be screened for kidney/liver function, (3) understand the limited evidence base.`,
        benefits: ['Marketed for overall skin lightening', 'Antioxidant benefits beyond pigmentation', 'Popular in APAC aesthetic markets', 'Relatively quick treatment (15-30 min IV)'],
        pros: ['Wide cultural acceptance in many markets', 'Endogenous antioxidant (not foreign substance)', 'Multiple administration routes (IV, IM, oral)', 'Often combined with vitamin C for synergy'],
        cons: ['FDA does not approve for skin lightening', 'Limited rigorous clinical evidence vs marketing claims', 'Documented serious side effects (kidney, liver, allergic)', 'Treatment cost adds up significantly across protocol'],
        idealFor: 'Patients in markets where the treatment is well-established, who have access to verified pharmaceutical-grade product and physician monitoring. NOT recommended without informed-consent discussion of risks.',
        recoveryTime: 'No downtime',
        procedureDuration: '15-30 minutes (IV)',
        costRange: '$50 - $250 per session; full protocol $1,000-$4,000',
        pricing: { us: { min: 100, max: 400 }, thailand: { min: 30, max: 150 }, 'south-korea': { min: 50, max: 200 }, india: { min: 30, max: 150 }, singapore: { min: 80, max: 300 } },
        icon: '\u{1F319}',
        order: 81,
        simulateSlug: 'glutathione-injection',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'aqualyx',
        name: 'Aqualyx / Lemonbottle (Fat-Dissolving Body Injection)',
        shortName: 'Fat-Dissolving Injection',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Injectable solution that dissolves localized fat deposits in body areas. Different from Kybella (chin-only) — used on flanks, inner thighs, knees, banana rolls, and other small areas.',
        longDescription: `Aqualyx (sodium deoxycholate) and similar products like Lemonbottle, Kabelline, and various local formulations are fat-dissolving injectables used on body areas where the FDA-approved Kybella is not indicated. The mechanism is similar — bile-salt-derived compounds destroy fat-cell membranes, leading to gradual elimination through the lymphatic system — but body applications are off-label and use larger volumes per session.

Common treatment areas include flanks ("love handles"), inner thighs, knees, banana rolls (under buttocks), back rolls, upper arms, and bra fat. Each session uses 5-10 vials typically distributed across multiple injection points. Most patients require 2-4 sessions spaced 4-6 weeks apart. Significant swelling and bruising are expected for 5-7 days post-injection. Results appear gradually over 6-8 weeks. Patient selection is critical — these treatments are NOT for weight loss or large-volume reduction; they're for stubborn small fat pockets in patients otherwise close to their target weight.`,
        benefits: ['Treats body areas where Kybella isn\'t FDA-approved', 'Non-surgical fat reduction', 'Can target small, specific areas', 'Permanent fat-cell destruction in treated zone'],
        pros: ['Non-surgical alternative to liposuction for small areas', 'In-office treatment, no general anesthesia', 'Permanent reduction in treated cells', 'Multiple body areas treatable'],
        cons: ['Significant swelling/bruising for 5-7 days', 'Multiple sessions required (2-4)', 'Off-label in many markets — verify product source', 'NOT a weight-loss tool — only for localized small areas'],
        idealFor: 'Patients near their target weight with small, stubborn fat pockets in body areas where Kybella isn\'t approved (flanks, thighs, knees, etc.).',
        recoveryTime: '5-7 days (swelling/bruising)',
        procedureDuration: '20-45 minutes per session',
        costRange: '$300 - $1,200 per session per area',
        pricing: { us: { min: 300, max: 1200 }, thailand: { min: 100, max: 500 }, 'south-korea': { min: 150, max: 700 }, india: { min: 80, max: 400 }, singapore: { min: 250, max: 1000 } },
        icon: '\u{1F4A7}',
        order: 82,
        simulateSlug: 'aqualyx',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'dhi-hair-transplant',
        name: 'DHI (Direct Hair Implantation)',
        shortName: 'DHI Hair Transplant',
        category: 'hair-restoration',
        categoryLabel: 'Hair Restoration',
        simulatorType: '2d',
        description: 'Refined hair transplant technique using a Choi pen to implant grafts directly without pre-creating recipient channels. Higher density and more precise angle control than standard FUE.',
        longDescription: `DHI (Direct Hair Implantation) is an evolution of FUE hair transplant that uses a specialized Choi pen-style implanter to extract and place grafts in a single instrument. Unlike traditional FUE — where recipient channels are pre-made before grafts are placed — DHI implants each graft in one motion, providing more precise control over angle, depth, and direction.

Advantages include: higher graft density (more grafts per cm²), more precise direction matching to existing hair, no need to shave the recipient area in some cases, and reduced graft handling time (which improves survival). Disadvantages include: typically smaller maximum session size (~3,000 grafts vs FUE's 4,500+), higher cost per graft, and longer procedure time per graft. DHI is particularly popular for hairline restoration where precision matters most, and for patients seeking dense coverage in smaller areas. Major DHI clinics — particularly in Turkey, Thailand, and Korea — drive significant medical tourism.`,
        benefits: ['Higher graft density than standard FUE', 'More precise angle/direction control', 'No need to shave recipient area in some cases', 'Reduced graft handling time'],
        pros: ['Particularly suited to hairline restoration', 'Less visible scarring during recovery', 'High patient satisfaction in well-selected cases', 'Major medical tourism driver'],
        cons: ['Higher cost per graft than standard FUE', 'Smaller maximum session size', 'Longer procedure time per graft', 'Requires specialized equipment and training'],
        idealFor: 'Patients seeking precision hairline restoration, dense coverage in smaller areas, or those wanting to avoid shaving the recipient area.',
        recoveryTime: '7-10 days (initial healing), 3-6 months (full results)',
        procedureDuration: '6-10 hours',
        costRange: '$3,500 - $12,000',
        pricing: { us: { min: 6000, max: 12000 }, thailand: { min: 2500, max: 5500 }, 'south-korea': { min: 3000, max: 7000 }, india: { min: 1500, max: 4000 }, singapore: { min: 5000, max: 10000 } },
        icon: '\u{1F485}',
        order: 83,
        simulateSlug: 'dhi-hair-transplant',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
        // Re-enabled together with hair-transplant once the patient
        // component switched to MediaPipe-derived face boxes.
    },
    {
        slug: 'gum-contouring',
        name: 'Gum Contouring (Gingivectomy / Crown Lengthening)',
        shortName: 'Gum Contouring',
        category: 'dental',
        categoryLabel: 'Dental Aesthetics',
        simulatorType: '2d',
        description: 'Surgical reshaping of the gum line to address "gummy smile" or asymmetric gums. Reveals more natural tooth surface for improved smile aesthetics.',
        longDescription: `Gum contouring (gingivectomy or crown lengthening) reshapes the gum line by surgically removing or repositioning excess gum tissue to reveal more natural tooth surface. The procedure addresses gummy smiles (where >2-3mm of gum shows when smiling), asymmetric gum lines, or gums that cover too much of the tooth crown making teeth appear short or square.

Two main approaches exist: gingivectomy (simple soft-tissue removal for excess gum without bony involvement) and crown lengthening (more extensive procedure that also reshapes the underlying bone). Modern techniques use lasers (CO2, diode, or Er:YAG) for the soft-tissue work — providing precise control and minimal bleeding. Crown lengthening with bone reshaping requires traditional surgical instruments. Recovery from soft-tissue-only procedures is brief (1-3 days); crown lengthening with bone work takes 7-14 days.

Gum contouring is a complement to (not replacement for) other dental aesthetics. Patients with gummy smiles who also have small teeth may benefit from veneers afterward to fully restore proportion. Distinct from "gummy smile" botox treatment — that’s muscular, while this is structural.`,
        benefits: ['Reveals more natural tooth surface', 'Corrects asymmetric gum lines', 'Treats gummy smile structurally', 'Often part of comprehensive smile makeover'],
        pros: ['Modern laser techniques are precise and minimally bleeding', 'Improvement is permanent', 'Often single-session for soft-tissue cases', 'Results visible immediately after healing'],
        cons: ['Crown lengthening with bone work has longer recovery', 'Risk of gum recession or sensitivity', 'May expose more sensitive root surface', 'Often best when combined with other dental aesthetics'],
        idealFor: 'Patients with gummy smiles, asymmetric gum lines, or short-appearing teeth from excess gum coverage — often as part of a comprehensive smile makeover.',
        recoveryTime: 'Soft-tissue: 1-3 days. Crown lengthening: 7-14 days',
        procedureDuration: '30 min - 2 hours depending on extent',
        costRange: '$300 - $3,000',
        pricing: { us: { min: 300, max: 3000 }, thailand: { min: 120, max: 1200 }, 'south-korea': { min: 150, max: 1500 }, india: { min: 80, max: 800 }, singapore: { min: 250, max: 2500 } },
        icon: '\u{1F9B7}',
        order: 84,
        simulateSlug: 'gum-contouring',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'stretch-mark-treatment',
        name: 'Stretch Mark Treatment',
        shortName: 'Stretch Mark Treatment',
        category: 'non-surgical',
        categoryLabel: 'Non-Surgical',
        simulatorType: '2d',
        description: 'Multi-modality treatment combining microneedling, RF, lasers, and topicals to improve the appearance of stretch marks. Results vary by stretch-mark age and treatment approach.',
        longDescription: `Stretch marks (striae) result from rapid skin stretching during pregnancy, growth spurts, weight changes, or anabolic steroid use, causing the dermis to tear at a microscopic level. They progress through phases: red/purple (striae rubrae) when fresh and active, then mature to silvery-white (striae albae). Treatment is significantly more effective during the red phase — older white striae are much harder to improve.

Multiple modalities exist: fractional CO2 laser, RF microneedling (Morpheus8 is popular for this), pulsed dye laser (effective for red striae specifically), microneedling with PRP, and topical retinoids. Best outcomes typically combine modalities — for example, fractional laser + topical retinoid + occasional PRP. Patient education about expectations is critical: complete erasure of stretch marks is rare; substantial improvement is the realistic goal. Treatment courses typically run 4-8 sessions spaced 4-6 weeks apart over 4-8 months.`,
        benefits: ['Improves the appearance of stretch marks substantially', 'Multiple modalities to match stretch-mark age', 'Fresh (red) striae respond best — earlier treatment is better', 'Combined treatments outperform single modalities'],
        pros: ['Multiple FDA-cleared technologies available', 'Procedural risk is low', 'Combinable with other body procedures', 'Stretch marks are extremely common — high demand'],
        cons: ['Cannot completely erase stretch marks', 'Multiple sessions required (4-8 typical)', 'White (mature) striae respond less well than red', 'Treatment cost adds up significantly'],
        idealFor: 'Patients with stretch marks from pregnancy, weight changes, or growth — particularly those caught in the red phase, where treatment outcomes are best.',
        recoveryTime: '3-7 days redness/sensitivity per session',
        procedureDuration: '30-60 minutes per session; 4-8 sessions typical',
        costRange: '$400 - $1,500 per session',
        pricing: { us: { min: 400, max: 1500 }, thailand: { min: 150, max: 600 }, 'south-korea': { min: 200, max: 800 }, india: { min: 100, max: 500 }, singapore: { min: 350, max: 1300 } },
        icon: '\u{1F9F5}',
        order: 85,
        simulateSlug: 'stretch-mark-treatment',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'iv-therapy',
        name: 'IV Therapy (Vitamin Drips)',
        shortName: 'IV Therapy',
        category: 'injectable',
        categoryLabel: 'Injectable',
        simulatorType: '2d',
        description: 'Intravenous infusion of fluids, vitamins, minerals, and antioxidants — including hydration drips, Myers\' cocktail, vitamin C, B-complex, NAD+, and glutathione blends. Hugely popular in APAC wellness and aesthetic clinics. Evidence for marketed benefits beyond hydration and correcting diagnosed deficiencies is limited.',
        longDescription: `IV therapy (intravenous vitamin and nutrient infusion) delivers fluids, electrolytes, vitamins, minerals, and antioxidants directly into the bloodstream, bypassing the gastrointestinal system. Most sessions run 20–60 minutes in a supervised clinical setting; a trained nurse or doctor inserts a peripheral IV line, and the selected formulation drips in at a controlled rate. There is no downtime.

**Common drip types — what they contain and what the evidence says:**

Plain hydration and electrolyte drips contain normal saline or Lactated Ringer's solution with sodium, potassium, and chloride. This is the most clinically grounded IV offering: rapid rehydration is effective and well-established for dehydration from illness, exercise, or alcohol, and is the only IV-therapy claim with consistent clinical support for otherwise healthy adults.

Myers' cocktail — first described by physician John Myers in the 1970s — combines magnesium, calcium, B vitamins (B1, B2, B3, B5, B6), and vitamin C. It is one of the most commonly administered "wellness" infusions. Small observational studies suggest some benefit for fatigue and fibromyalgia; controlled trial evidence is limited, and most clinics administer modified proprietary versions rather than the original formula. Reasonable rationale exists for correcting demonstrated B-vitamin or magnesium deficiency, but claims beyond that are not strongly supported.

High-dose vitamin C drips deliver ascorbic acid at concentrations far above what the gut can absorb orally (often 10–50 g per session). Research on high-dose IV vitamin C is active and genuine, particularly in oncology-support contexts — but evidence for routine "immune boost" or "skin glow" in healthy adults is weak and mixed. High-dose vitamin C is metabolised to oxalate; patients with renal impairment or G6PD deficiency should not receive it without specialist guidance.

B-complex and B12 "energy" drips replace vitamins that are genuinely lost through poor diet, alcohol use, malabsorption, or vegan diets. If you are B12-deficient, IV or IM replacement is clinically effective and fast. If you are not deficient, the excess is excreted in urine with negligible lasting effect on energy.

NAD+ (nicotinamide adenine dinucleotide) drips are among the most expensive offerings, priced on preclinical research linking NAD+ to cellular energy metabolism, DNA repair, and anti-aging pathways. Human clinical trial evidence for NAD+ IV infusion in healthy adults remains early-stage and inconclusive. Common side effects during infusion include flushing, chest tightness, and nausea; these usually resolve by slowing the infusion rate.

Glutathione and antioxidant blends add glutathione (a naturally produced antioxidant) or vitamin C/E mixes, sometimes alongside brightening or "glow" claims. Glutathione is unstable in the bloodstream and is rapidly metabolised; the clinical literature on IV glutathione for skin lightening or systemic antioxidant loading is sparse and largely anecdotal. See our dedicated glutathione injection page for more detail.

**Shared safety considerations:** all IV therapy carries a small but real risk of IV-site infection, bruising, or phlebitis with repeated access of the same vein. Rapid fluid infusion can precipitate fluid overload in patients with cardiac or renal insufficiency — this is a genuine medical risk, not a theoretical one. Compounding quality varies widely between clinics; pharmaceutical-grade, sterile-prepared formulations from a licensed pharmacy are essential. IV therapy is not a substitute for medical diagnosis or treatment of any condition.`,
        benefits: [
            'Rapid rehydration — the most well-established benefit',
            'Marketed for hangover and jet-lag recovery; evidence is mainly anecdotal',
            'Popular adjunct in wellness and aesthetic clinic protocols',
            'May support nutritional correction in patients with documented deficiencies',
        ],
        pros: [
            'Quick in-clinic session (20–60 minutes), no downtime',
            'Widely available across APAC aesthetic and wellness clinics',
            'Variety of formulations to match stated wellness goals',
            'Generally low-risk for healthy, medically screened adults',
        ],
        cons: [
            'Evidence for most marketed benefits (energy, immunity, skin glow) is limited or mixed outside correcting a deficiency',
            'Risk of infection or bruising at the IV insertion site',
            'Vein irritation or phlebitis with frequent sessions',
            'Fluid overload risk in patients with cardiac or renal conditions — medical screening is required',
            'Compounding quality varies widely in unregulated clinics — verify pharmaceutical-grade sourcing',
            'Cost stacks significantly across regular sessions without established long-term benefit',
            'Effects are temporary; not a substitute for diet, hydration, or medical care',
        ],
        idealFor: 'Adults seeking wellness or hydration support who have been medically screened and are otherwise healthy. Not appropriate without clinician evaluation for anyone with cardiac, renal, or hepatic conditions. Best framed as a complement to — not a replacement for — adequate oral hydration and nutrition.',
        recoveryTime: 'No downtime',
        procedureDuration: '20–60 minutes per session',
        costRange: '$60 – $500 per session depending on formulation and market',
        pricing: {
            us: { min: 150, max: 500 },
            thailand: { min: 60, max: 250 },
            'south-korea': { min: 80, max: 300 },
            india: { min: 40, max: 180 },
            singapore: { min: 120, max: 400 },
        },
        icon: '\u{1F4A7}',
        order: 86,
        simulateSlug: 'iv-therapy',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
    {
        slug: 'brachioplasty',
        name: 'Brachioplasty (Arm Lift)',
        shortName: 'Arm Lift',
        category: 'body-contouring',
        categoryLabel: 'Body Contouring',
        simulatorType: '2d',
        description: 'Remove excess skin and fat from the upper arms following major weight loss or aging-related laxity. Creates a smoother, tighter arm contour with definition.',
        longDescription: `Brachioplasty (arm lift) addresses excess skin and fat in the upper arms — most commonly seen after significant weight loss or as a result of age-related skin laxity. Diet and exercise can shrink fat but cannot tighten loose skin once elasticity is lost; brachioplasty is the only intervention that durably restores upper-arm contour in these cases.

The traditional procedure makes an incision along the inner upper arm from the armpit to the elbow, removes excess skin and underlying fat (often combined with liposuction for contour refinement), and tightens the deeper fascial layer. For patients with less severe laxity, a "minimal-incision" or "limited brachioplasty" may be performed with an incision confined to the armpit only.

Trade-offs are significant: the procedure delivers reliably tighter arms, but the resulting scar runs along the inner arm and is visible whenever the arms are raised. Modern surgeons place the scar in the bicipital groove (the natural fold between the biceps and triceps) to minimize visibility, but patients should plan for a permanent scar in exchange for the contour improvement.`,
        benefits: [
            'Eliminate "bat wing" sagging skin in the upper arms',
            'Restore arm contour after major weight loss',
            'Improve fit of clothing — sleeves, fitted tops, athletic wear',
            'Liposuction can be combined for contour refinement',
            'Permanent results when weight is maintained',
        ],
        pros: [
            'Only durable solution for significant upper-arm skin laxity',
            'Dramatic, immediate change in arm shape',
            'High satisfaction rate among post-weight-loss patients',
            'Can be combined with liposuction for finer contour',
            'Minimal-incision options exist for less severe cases',
        ],
        cons: [
            'Permanent scar runs along the inner arm — visible when arms are raised',
            'Significant recovery: 2–4 weeks of restricted arm use, 4–6 weeks for return to exercise',
            'Risk of hypertrophic scarring (worse in some patients than others)',
            'Risk of nerve injury, seroma, infection, asymmetry, and wound healing delays',
            'Often not covered by insurance unless tied to massive weight loss with documented medical complications',
        ],
        idealFor: 'Patients with significant upper-arm skin laxity following weight loss (50+ lbs / 23+ kg) or age-related elasticity loss, who accept a permanent inner-arm scar in exchange for contour improvement.',
        recoveryTime: '2–4 weeks (light activity), 4–6 weeks (full exercise)',
        procedureDuration: '2–3 hours',
        costRange: '$5,000 – $11,000',
        pricing: {
            us: { min: 5000, max: 11000 },
            thailand: { min: 2200, max: 5500 },
            'south-korea': { min: 3000, max: 7000 },
            india: { min: 1500, max: 4000 },
            singapore: { min: 4500, max: 9500 },
        },
        icon: '\u{1F4AA}',
        order: 33,
        simulateSlug: 'brachioplasty',
        tier: 'C',
        comingSoon: true,
        popularity: 'medium',
    },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getProcedureBySlug(slug: string): Procedure | undefined {
    return PROCEDURES.find((p) => p.slug === slug);
}

export function getProcedureBySimulateSlug(simulateSlug: string): Procedure | undefined {
    return PROCEDURES.find((p) => p.simulateSlug === simulateSlug);
}

export function getProceduresByCategory(category: ProcedureCategoryKey): Procedure[] {
    return PROCEDURES.filter((p) => p.category === category);
}

export function getAllProceduresSorted(): Procedure[] {
    return [...PROCEDURES].sort((a, b) => a.order - b.order);
}

export function getAllProcedureSlugs(): string[] {
    return PROCEDURES.map((p) => p.slug);
}

export function isSimulatorAvailable(slug: string): boolean {
    const procedure = getProcedureBySlug(slug);
    return procedure ? !procedure.comingSoon : false;
}

/**
 * Whether a procedure is sale-ready — i.e. surgeons may post deals,
 * patients may purchase a Day Pass, and the marketplace surfaces it.
 *
 * Default policy: undefined → TRUE. This matches the post-#178-#182
 * world where every catalog procedure has been through at least one
 * sell-readiness sweep. Procedures that explicitly opt OUT (set
 * `saleReady: false`) are hidden from money flows but stay live for
 * the free /demo route.
 *
 * comingSoon trumps saleReady — a comingSoon procedure is never
 * sale-ready regardless of the flag.
 *
 * Optional countryCode (ISO 3166-1 alpha-2): when supplied, also
 * checks marketsAllowed[] regulatory gating. Procedures with
 * marketsAllowed set are only sale-ready in listed countries.
 */
export function isProcedureSaleReady(slug: string, countryCode?: string): boolean {
    const p = getProcedureBySlug(slug);
    if (!p) return false;
    if (p.comingSoon) return false;
    if (p.tier === 'C') return false;
    if (p.saleReady === false) return false;
    // Per-market gating — when marketsAllowed is set AND a countryCode
    // is supplied, the country must be on the allow list.
    if (countryCode && Array.isArray(p.marketsAllowed) && p.marketsAllowed.length > 0) {
        return p.marketsAllowed.includes(countryCode.toUpperCase());
    }
    return true;
}

/**
 * Set of all sale-ready procedure slugs (both `slug` and `simulateSlug`
 * variants where they differ). Used by server-side gates on deal POST
 * + day-pass checkout.
 */
export function saleReadyProcedureSlugs(): Set<string> {
    const out = new Set<string>();
    for (const p of PROCEDURES) {
        if (!isProcedureSaleReady(p.slug)) continue;
        out.add(p.slug);
        if (p.simulateSlug) out.add(p.simulateSlug);
    }
    return out;
}

export function formatPrice(price: PriceRange, locale = 'en-US', currency = 'USD'): string {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return `${formatter.format(price.min)} \u2013 ${formatter.format(price.max)}`;
}

export function getPriceForRegion(procedure: Procedure, region: Region): string {
    return formatPrice(procedure.pricing[region]);
}

export const CATEGORIES: ProcedureCategoryKey[] = ['surgical', 'non-surgical', 'injectable', 'dental', 'body-contouring', 'hair-restoration'];

// Legacy exports for backward compatibility with existing procedure detail pages
export type ProcedureCategory_Legacy = "Face" | "Body" | "Non-Surgical";
export const procedureCategories: ProcedureCategory_Legacy[] = ["Face", "Body", "Non-Surgical"];

export interface ExplorerProcedure {
    slug: string;
    name: string;
    category: ProcedureCategory_Legacy;
    description: string;
    consultTimeSaved: number;
    hasDetailPage: boolean;
}

// Map new categories to legacy categories for old components
const CATEGORY_TO_LEGACY: Record<ProcedureCategoryKey, ProcedureCategory_Legacy> = {
    'surgical': 'Face',
    'non-surgical': 'Non-Surgical',
    'injectable': 'Non-Surgical',
    'dental': 'Non-Surgical',
    'body-contouring': 'Body',
    'hair-restoration': 'Face',
};

export const explorerProcedures: ExplorerProcedure[] = PROCEDURES.map((p) => ({
    slug: p.slug,
    name: p.shortName,
    category: CATEGORY_TO_LEGACY[p.category],
    description: p.description,
    consultTimeSaved: 10,
    hasDetailPage: true,
}));

// Legacy detailed procedure data for existing /procedures/[slug] detail page components
export interface Procedure_Legacy {
    slug: string;
    title: string;
    description: string;
    landmarks: string[];
    benchmarks: {
        nla: string;
        goode: string;
        phi: string;
    };
    recovery: {
        downtime: string;
        swelling: string;
        pain: string;
    };
    cost: {
        usd: string;
        thb: string;
        krw: string;
    };
}

export const procedures: Procedure_Legacy[] = [
    {
        slug: "rhinoplasty",
        title: "Precision Rhinoplasty",
        description: "Anatomically constrained nasal restructuring using 468-point mesh technology to ensure functional and aesthetic harmony.",
        landmarks: ["Radix Height", "Tip Projection", "Alar Base Width", "Columellar Show"],
        benchmarks: { nla: "78-93\u00B0", goode: "0.55-0.60", phi: "1.618" },
        recovery: { downtime: "7-10 Days", swelling: "2-4 Weeks", pain: "Mild to Moderate" },
        cost: { usd: "$4,500 - $8,000", thb: "\u0E3F150,000 - \u0E3F280,000", krw: "\u20A95,500,000 - \u20A99,000,000" },
    },
    {
        slug: "blepharoplasty",
        title: "Upper/Lower Blepharoplasty",
        description: "Precision eyelid surgery to restore youthful contours and visual field without altering your unique ethnic identity.",
        landmarks: ["Supratarsal Crease", "Palpebral Fissure Height", "Canthal Tilt"],
        benchmarks: { nla: "N/A", goode: "N/A", phi: "1.618 (Eye Width/Intercanthal)" },
        recovery: { downtime: "5-7 Days", swelling: "1-2 Weeks", pain: "Mild" },
        cost: { usd: "$3,000 - $5,500", thb: "\u0E3F80,000 - \u0E3F180,000", krw: "\u20A93,000,000 - \u20A96,500,000" },
    },
    {
        slug: "facelift",
        title: "Deep Plane Facelift",
        description: "Comprehensive facial rejuvenation targeting the SMAS layer for natural, long-lasting results validated by digital twin analysis.",
        landmarks: ["Jowl Line", "Marionette Lines", "Malar Prominence"],
        benchmarks: { nla: "N/A", goode: "N/A", phi: "1.618 (Face Height/Width)" },
        recovery: { downtime: "10-14 Days", swelling: "3-6 Weeks", pain: "Moderate" },
        cost: { usd: "$12,000 - $20,000", thb: "\u0E3F350,000 - \u0E3F600,000", krw: "\u20A915,000,000 - \u20A925,000,000" },
    },
    {
        slug: "genioplasty",
        title: "Sliding Genioplasty",
        description: "Chin augmentation or reduction to balance the facial profile, utilizing Goode\u2019s Ratio for optimal projection.",
        landmarks: ["Pogonion", "Menton", "Labiodental Fold"],
        benchmarks: { nla: "N/A", goode: "0.55-0.60 (Projection)", phi: "1.618" },
        recovery: { downtime: "7-10 Days", swelling: "2-4 Weeks", pain: "Mild to Moderate" },
        cost: { usd: "$5,000 - $8,500", thb: "\u0E3F160,000 - \u0E3F290,000", krw: "\u20A96,000,000 - \u20A910,000,000" },
    },
    {
        slug: "jaw-contouring",
        title: "V-Line Jaw Contouring",
        description: "Mandibular angle reduction and chin narrowing to achieve a refined, symmetrical lower face profile.",
        landmarks: ["Gonional Angle", "Bigonial Width", "Bizygomatic Width"],
        benchmarks: { nla: "N/A", goode: "N/A", phi: "1.618 (Bizygomatic/Bigonial)" },
        recovery: { downtime: "10-14 Days", swelling: "4-8 Weeks", pain: "Moderate" },
        cost: { usd: "$8,000 - $12,000", thb: "\u0E3F250,000 - \u0E3F400,000", krw: "\u20A99,000,000 - \u20A914,000,000" },
    },
];
