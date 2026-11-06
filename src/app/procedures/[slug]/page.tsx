import { Suspense } from "react";
import { PROCEDURES, getProcedureBySlug, getProceduresByCategory, legacyProcedures } from "@/data/procedures";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "@/i18n/messages";
import { Metadata } from "next";
import { buildAlternates } from "@/lib/seo/alternates";
import { ArrowRight, ArrowLeft, Clock, Calendar, DollarSign, Users, CheckCircle2, ThumbsUp, ThumbsDown } from "lucide-react";
import { ProcedurePricingSidebar } from "@/components/ProcedurePricingSidebar";
import ProcedureIcon from "@/components/ProcedureIcon";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import SimulatorSchema from "@/components/seo/SimulatorSchema";
import ProcedureFAQSchema from "@/components/seo/ProcedureFAQSchema";
import ProcedureHowToSchema from "@/components/seo/ProcedureHowToSchema";
import ProcedureMedicalSchema from "@/components/seo/ProcedureMedicalSchema";

// Existing procedure detail components (kept for procedures that have them)
import ProcedureHero from "@/components/procedures/ProcedureHero";
import LogicStrip from "@/components/procedures/LogicStrip";
import PrecisionTable from "@/components/procedures/PrecisionTable";
import ConcernMapper from "@/components/procedures/ConcernMapper";
import MiniMorphos from "@/components/procedures/MiniMorphos";
import RegulatoryFooter from "@/components/procedures/RegulatoryFooter";
import ProcedureBeforeAfter from "@/components/procedures/ProcedureBeforeAfter";
import ProcedureTimeline from "@/components/procedures/ProcedureTimeline";
import ProcedureRelatedDeals from "@/components/procedures/ProcedureRelatedDeals";
import ProcedureSurgeonDirectory from "@/components/procedures/ProcedureSurgeonDirectory";
import FeaturedSurgeonTile from "@/components/procedures/FeaturedSurgeonTile";
import ProcedureCostEstimator from "@/components/procedures/ProcedureCostEstimator";
import ProcedureStickyNav from "@/components/procedures/ProcedureStickyNav";
import ProcedureScreenshotHero, { LIVE_SIMULATOR_SCREENSHOT_SLUGS } from "@/components/procedures/ProcedureScreenshotHero";
import { PROCEDURE_IMAGERY } from "@/data/procedure-imagery";
import { hasCostEstimate } from "@/data/procedure-cost-estimates";
import { getProcedureExplainer } from "@/data/procedure-explainers";
import ProcedureExplainerPage from "@/components/procedures/explainer/ProcedureExplainerPage";

export function generateStaticParams() {
    return PROCEDURES.map((procedure) => ({ slug: procedure.slug }));
}

// Unknown slugs must 404 at the ROUTER, before rendering starts.
//
// This segment has a loading.tsx, so Next streams the response and flushes the
// 200 header before the component body runs. The notFound() further down then
// cannot change the status: on 2026-09-01, production served
// /procedures/not-a-real-procedure as HTTP 200, a soft 404, which lets a
// crawler index unlimited junk URLs as real pages.
//
// dynamicParams = false is safe here specifically because generateStaticParams
// enumerates PROCEDURES, a static in-code catalog, so every real slug is
// prebuilt. If procedures ever become database-driven, this must be revisited
// or every new procedure will 404 until the next build.
export const dynamicParams = false;

// SEO-optimized metadata overrides for high-traffic procedures
const PROCEDURE_SEO_OVERRIDES: Record<string, { title: string; description: string; keywords: string[] }> = {
    'hairline-lowering': {
        title: 'Hairline Lowering Surgery & Forehead Reduction | AI Simulator',
        description: 'Reduce forehead size with hairline lowering surgery or hair transplant. Compare surgical advancement vs FUE/DHI grafting. Try our free AI simulator to preview Korean-style bell curve hairline results.',
        keywords: ['hairline lowering', 'forehead reduction', 'forehead reduction surgery', 'hairline lowering surgery', 'reduce forehead size', 'forehead shortening', 'Korean hairline', 'hairline lowering men', 'hairline lowering women'],
    },
    'scalp-micropigmentation': {
        title: 'Scalp Micropigmentation (SMP) Guide | AI Simulator & Cost',
        description: 'Scalp micropigmentation creates the illusion of hair density using micro-pigment dots. Learn about SMP procedure, cost, and results. Preview your look with our free AI simulator.',
        keywords: ['scalp micropigmentation', 'SMP procedure', 'scalp micropigmentation simulator', 'hair tattoo', 'micropigmentation', 'SMP cost', 'scalp microblading'],
    },
    'rhinoplasty': {
        title: 'Rhinoplasty: Recovery, Cost by City & Nose Job Simulator',
        description: 'What rhinoplasty involves, recovery week by week and typical cost in India, Thailand, the UK and the US. Try the change on your own photo first.',
        keywords: ['rhinoplasty', 'nose job', 'nose reshaping', 'rhinoplasty simulator', 'nose job simulator', 'AI nose job', 'virtual rhinoplasty', 'nose surgery'],
    },
    'chin-augmentation': {
        title: 'Chin Augmentation & Genioplasty Guide | AI Simulator',
        description: 'Chin augmentation improves facial balance through implants or fillers. Compare surgical vs non-surgical options. Try our free AI chin simulator to preview projection and profile changes.',
        keywords: ['chin augmentation', 'genioplasty', 'chin implant', 'chin filler', 'weak chin', 'chin enhancement', 'chin surgery'],
    },
    'blepharoplasty': {
        title: 'Blepharoplasty (Eyelid Surgery) Guide | Free AI Simulator',
        description: 'Upper and lower blepharoplasty for eyelid rejuvenation. Remove excess skin, reduce bags, and create double eyelids. Preview your results with our free AI blepharoplasty simulator.',
        keywords: ['blepharoplasty', 'eyelid surgery', 'blepharoplasty simulator', 'double eyelid surgery', 'eye bag removal', 'upper blepharoplasty', 'lower blepharoplasty'],
    },
    'hair-transplant': {
        title: 'Hair Transplant (FUE/DHI) Guide | AI Simulator & Cost',
        description: 'Complete hair transplant guide covering FUE and DHI techniques. Calculate graft requirements and preview natural-looking results with our free AI hair transplant simulator.',
        keywords: ['hair transplant', 'FUE hair transplant', 'DHI hair transplant', 'hair transplant simulator', 'hair restoration', 'hair transplant cost', 'hair grafts'],
    },
    'facelift': {
        title: 'Facelift Surgery Guide | AI Facial Rejuvenation Simulator',
        description: 'Modern facelift techniques for jowl reduction, neck contouring, and facial rejuvenation. SMAS facelift, deep plane, and mini facelift options. Preview your results with AI simulation.',
        keywords: ['facelift', 'facelift simulator', 'facial rejuvenation', 'SMAS facelift', 'jowl reduction', 'neck lift', 'mini facelift'],
    },
    'dermal-fillers': {
        title: 'Dermal Fillers Guide | AI Filler Simulator for Lips, Cheeks & Jawline',
        description: 'Hyaluronic acid dermal fillers for lips, cheeks, jawline, and under-eyes. Learn about filler types, longevity, and costs. Preview natural-looking results with our free AI filler simulator.',
        keywords: ['dermal fillers', 'lip filler', 'cheek filler', 'jawline filler', 'filler simulator', 'hyaluronic acid filler', 'facial fillers'],
    },
    // Surgical (face)
    'v-line-contouring': {
        title: 'V-Line Jaw Contouring (Korean) Guide | AI Simulator',
        description: 'V-line jaw contouring reshapes the lower face for a slim, tapered K-beauty jawline. Mandible reduction + genioplasty. Preview your Seoul-style result with our free AI simulator.',
        keywords: ['v-line surgery', 'jaw contouring', 'v-line contouring', 'Korean jaw reduction', 'K-beauty jaw', 'mandibuloplasty', 'jaw slimming surgery', 'Seoul v-line', 'v-line simulator'],
    },
    'buccal-fat-removal': {
        title: 'Buccal Fat Removal Guide | AI Cheek Slim Simulator',
        description: 'Buccal fat removal slims full cheeks by excising the buccal fat pad for a more sculpted look. Learn what to expect. Preview cheek slimming with our free AI simulator.',
        keywords: ['buccal fat removal', 'cheek reduction surgery', 'buccal fat pad removal', 'cheek slimming', 'bichectomy', 'buccal fat simulator', 'cheek contouring', 'facial slimming'],
    },
    'lip-lift': {
        title: 'Lip Lift Surgery Guide | AI Simulator & Cost',
        description: 'A lip lift shortens the philtrum and increases upper lip show for a fuller, more youthful mouth. Compare subnasal and corner lip lifts. Preview results with our free AI simulator.',
        keywords: ['lip lift', 'lip lift surgery', 'subnasal lip lift', 'philtrum reduction', 'lip lift simulator', 'upper lip lift', 'lip lift cost', 'corner lip lift'],
    },
    'brow-lift': {
        title: 'Brow Lift (Forehead Lift) Guide | AI Simulator',
        description: 'Brow lift surgery elevates drooping brows, reduces forehead wrinkles, and refreshes the upper face. Endoscopic and temporal options. Preview your result with our free AI simulator.',
        keywords: ['brow lift', 'forehead lift', 'eyebrow lift surgery', 'brow lift simulator', 'endoscopic brow lift', 'brow lift cost', 'brow ptosis', 'temporal brow lift'],
    },
    'otoplasty': {
        title: 'Otoplasty (Ear Pinning) Guide | AI Simulator & Cost',
        description: 'Otoplasty pins back or reshapes prominent ears for a natural, balanced profile. Suitable for adults and children. Preview your ear reshaping result with our free AI simulator.',
        keywords: ['otoplasty', 'ear pinning', 'ear reshaping surgery', 'prominent ear correction', 'otoplasty cost', 'otoplasty simulator', 'ear surgery', 'ear pinback'],
    },
    'mid-facelift': {
        title: 'Mid-Facelift (Cheek Lift) Guide | AI Simulator',
        description: 'A mid-facelift restores cheek volume and reduces nasolabial folds without touching the neck. Ideal for ages 35–55. Preview cheek rejuvenation with our free AI simulator.',
        keywords: ['mid-facelift', 'cheek lift', 'mid face lift surgery', 'nasolabial fold reduction', 'mid facelift cost', 'mid facelift simulator', 'cheek rejuvenation', 'SMAS mid face'],
    },
    'neck-lift': {
        title: 'Neck Lift (Cervicoplasty) Guide | AI Simulator',
        description: 'Neck lift surgery tightens loose skin, removes jowls, and defines the jawline. Cervicoplasty and platysmaplasty options. Preview your result with our free AI neck lift simulator.',
        keywords: ['neck lift', 'cervicoplasty', 'neck lift surgery', 'neck lift simulator', 'platysmaplasty', 'turkey neck surgery', 'neck lift cost', 'jawline tightening'],
    },
    'earlobe-repair': {
        title: 'Earlobe Repair & Reduction Guide | AI Simulator',
        description: 'Earlobe repair corrects torn, stretched, or oversized earlobes from gauges or aging. Quick in-office procedure. Preview your restored earlobe shape with our free AI simulator.',
        keywords: ['earlobe repair', 'earlobe reduction', 'torn earlobe repair', 'gauge earlobe repair', 'earlobe surgery', 'earlobe repair cost', 'earlobe reconstruction', 'stretched earlobe'],
    },
    'forehead-reduction': {
        title: 'Forehead Reduction (Hairline Lowering) | AI Simulator',
        description: 'Forehead reduction surgery advances the hairline to create better facial proportion. Ideal for large or high foreheads. Preview your new hairline shape with our free AI simulator.',
        keywords: ['forehead reduction', 'hairline lowering', 'forehead reduction surgery', 'hairline advancement', 'forehead shortening', 'high forehead surgery', 'forehead reduction cost', 'hairline lowering surgery'],
    },
    'cheek-implants': {
        title: 'Cheek Implants (Malar Augmentation) Guide | AI Simulator',
        description: 'Cheek implants add permanent volume and definition to flat or aging cheekbones. Compare implants vs filler. Preview your cheekbone enhancement with our free AI simulator.',
        keywords: ['cheek implants', 'malar augmentation', 'cheekbone implants', 'cheek augmentation', 'cheek implant surgery', 'malar implants', 'cheek implant cost', 'facial implants simulator'],
    },
    'dimpleplasty': {
        title: 'Dimpleplasty (Dimple Creation) Guide | AI Simulator',
        description: 'Dimpleplasty creates natural-looking cheek dimples through a minimally invasive surgical technique. Quick recovery, lasting results. Preview your dimple look with our free AI simulator.',
        keywords: ['dimpleplasty', 'dimple creation', 'dimple surgery', 'dimpleplasty cost', 'artificial dimples', 'cheek dimple surgery', 'dimpleplasty simulator', 'dimple procedure'],
    },
    'septoplasty': {
        title: 'Septoplasty (Deviated Septum Repair) Guide | AI Simulator',
        description: 'Septoplasty corrects a deviated septum to improve breathing, often combined with rhinoplasty. Learn about recovery and costs. Preview combined results with our free AI simulator.',
        keywords: ['septoplasty', 'deviated septum repair', 'septoplasty cost', 'deviated septum surgery', 'septoplasty recovery', 'septoplasty simulator', 'functional rhinoplasty', 'breathing surgery'],
    },
    'gynecomastia-surgery': {
        title: 'Gynecomastia Surgery (Male Breast Reduction) Guide',
        description: 'Gynecomastia surgery removes excess male breast tissue for a flatter, more masculine chest. Gland excision and liposuction options. Preview results with our free AI simulator.',
        keywords: ['gynecomastia surgery', 'male breast reduction', 'gynecomastia treatment', 'man boobs surgery', 'gynecomastia cost', 'male chest reduction', 'gynecomastia simulator', 'chest contouring men'],
    },
    'genioplasty': {
        title: 'Genioplasty (Sliding Genioplasty) Guide | AI Simulator',
        description: 'Sliding genioplasty repositions the chin bone for precise forward, backward, or vertical correction. More versatile than implants. Preview your chin result with our free AI simulator.',
        keywords: ['genioplasty', 'sliding genioplasty', 'chin osteotomy', 'genioplasty cost', 'genioplasty simulator', 'chin bone surgery', 'chin repositioning', 'osseous genioplasty'],
    },
    // Non-surgical (face/skin)
    'chemical-peels': {
        title: 'Chemical Peel Guide | AI Skin Simulator & Cost',
        description: 'Chemical peels resurface skin to treat acne scars, hyperpigmentation, and fine lines. Light, medium, and deep peel options. Preview smoother skin with our free AI simulator.',
        keywords: ['chemical peel', 'chemical peel cost', 'chemical peel simulator', 'TCA peel', 'glycolic acid peel', 'VI peel', 'skin resurfacing', 'chemical peel for acne scars'],
    },
    'laser-resurfacing': {
        title: 'Laser Resurfacing Guide | AI Skin Simulator & Cost',
        description: 'Laser resurfacing removes damaged outer skin layers to reduce wrinkles, scars, and sun damage. Ablative and non-ablative options. Preview results with our free AI skin simulator.',
        keywords: ['laser resurfacing', 'laser skin resurfacing', 'CO2 laser resurfacing', 'fractional laser', 'laser resurfacing cost', 'laser resurfacing simulator', 'ablative laser', 'skin rejuvenation laser'],
    },
    'thread-lift': {
        title: 'Thread Lift Guide | Non-Surgical Facelift AI Simulator',
        description: 'Thread lifts offer a non-surgical facelift using dissolvable sutures to lift brows, cheeks, and jowls. Popular in Korea and Thailand. Preview your lifted look with our free AI simulator.',
        keywords: ['thread lift', 'PDO thread lift', 'non-surgical facelift', 'thread lift cost', 'thread lift simulator', 'Korean thread lift', 'Thai thread lift', 'face lifting threads', 'APTOS thread lift'],
    },
    'hifu': {
        title: 'HIFU (Ultherapy) Guide | AI Skin Tightening Simulator',
        description: 'HIFU uses focused ultrasound energy to lift and tighten skin without surgery. Ultherapy is the leading brand, popular across Bangkok and Singapore. Preview with our free AI simulator.',
        keywords: ['HIFU', 'Ultherapy', 'high-intensity focused ultrasound', 'HIFU treatment', 'HIFU cost', 'skin tightening', 'non-surgical facelift', 'HIFU Bangkok', 'HIFU Singapore'],
    },
    'microneedling': {
        title: 'Microneedling Guide | AI Skin Simulator & Cost',
        description: 'Microneedling (collagen induction therapy) improves acne scars, pores, and skin texture. Often paired with PRP or Morpheus8 RF. Preview your skin result with our free AI simulator.',
        keywords: ['microneedling', 'collagen induction therapy', 'microneedling cost', 'microneedling simulator', 'Morpheus8', 'RF microneedling', 'acne scar treatment', 'skin texture improvement'],
    },
    'hydrafacial': {
        title: 'HydraFacial Guide | Deep Cleanse & Glow AI Simulator',
        description: 'HydraFacial cleanses, exfoliates, and delivers serums in one step for instant glow. No downtime, suitable for all skin types. Preview your refreshed skin with our free AI simulator.',
        keywords: ['HydraFacial', 'HydraFacial treatment', 'hydradermabrasion', 'HydraFacial cost', 'HydraFacial simulator', 'deep cleanse facial', 'HydraFacial results', 'glow facial'],
    },
    'ipl-photofacial': {
        title: 'IPL Photofacial Guide | AI Skin Simulator & Cost',
        description: 'IPL photofacial uses intense pulsed light to target sun spots, redness, and uneven tone. Multiple sessions for best results. Preview clearer skin with our free AI simulator.',
        keywords: ['IPL photofacial', 'intense pulsed light', 'IPL treatment', 'IPL cost', 'photofacial', 'IPL simulator', 'sun spot removal', 'IPL skin rejuvenation', 'broadband light'],
    },
    'rf-microneedling': {
        title: 'RF Microneedling (Morpheus8) Guide | AI Simulator',
        description: 'RF microneedling (Morpheus8) combines needles and radiofrequency to remodel collagen and tighten skin. Effective on all skin tones. Preview your result with our free AI simulator.',
        keywords: ['RF microneedling', 'Morpheus8', 'radiofrequency microneedling', 'Morpheus8 cost', 'RF microneedling simulator', 'skin tightening', 'Morpheus8 simulator', 'Morpheus8 treatment'],
    },
    'dermaplaning': {
        title: 'Dermaplaning Guide | Smooth Skin AI Simulator & Cost',
        description: 'Dermaplaning removes dead skin cells and vellus hair with a sterile blade for instantly smoother skin. Safe, no downtime. Preview your glass-skin result with our free AI simulator.',
        keywords: ['dermaplaning', 'dermaplaning treatment', 'dermaplaning cost', 'dermaplaning simulator', 'peach fuzz removal', 'exfoliation facial', 'dermaplaning benefits', 'glass skin'],
    },
    'plasma-fibroblast': {
        title: 'Plasma Fibroblast (Plasma Pen) Guide | AI Simulator',
        description: 'Plasma fibroblast therapy tightens loose skin around the eyes, jowls, and neck without surgery. Plasma pen creates precise micro-trauma. Preview results with our free AI simulator.',
        keywords: ['plasma fibroblast', 'plasma pen', 'fibroblast therapy', 'plasma skin tightening', 'plasma pen cost', 'plasma fibroblast simulator', 'non-surgical eyelid lift', 'plexr'],
    },
    'co2-laser': {
        title: 'CO2 Laser Resurfacing Guide | AI Skin Simulator',
        description: 'CO2 laser resurfacing ablates damaged skin layers to dramatically reduce wrinkles, scars, and deep pigmentation. Significant downtime, transformative results. Preview with our AI simulator.',
        keywords: ['CO2 laser', 'CO2 laser resurfacing', 'fractional CO2 laser', 'CO2 laser cost', 'CO2 laser simulator', 'deep skin resurfacing', 'laser wrinkle removal', 'ablative CO2 laser'],
    },
    'prp-facial': {
        title: 'PRP Facial (Vampire Facial) Guide | AI Simulator',
        description: 'PRP facial (Vampire Facial) uses your own platelet-rich plasma to stimulate collagen and rejuvenate skin. Often combined with microneedling. Preview results with our free AI simulator.',
        keywords: ['PRP facial', 'vampire facial', 'platelet-rich plasma facial', 'PRP treatment', 'PRP facial cost', 'PRP simulator', 'PRP microneedling', 'blood facial'],
    },
    'tattoo-removal': {
        title: 'Laser Tattoo Removal Guide | AI Simulator & Cost',
        description: 'Laser tattoo removal uses Q-switched or picosecond lasers to break down ink particles. Sessions vary by ink color and depth. Preview fading progress with our free AI simulator.',
        keywords: ['laser tattoo removal', 'tattoo removal', 'tattoo removal cost', 'picosecond laser tattoo removal', 'Q-switched laser', 'tattoo removal simulator', 'tattoo fading', 'tattoo removal sessions'],
    },
    'laser-hair-removal': {
        title: 'Laser Hair Removal Guide | AI Simulator & Cost',
        description: 'Laser hair removal permanently reduces unwanted hair on face, body, and bikini areas. Multiple sessions required. Compare devices and costs. Preview smooth skin with our free AI simulator.',
        keywords: ['laser hair removal', 'laser hair removal cost', 'permanent hair removal', 'laser hair removal simulator', 'IPL hair removal', 'laser hair removal sessions', 'hair removal laser'],
    },
    'cellulite-treatment': {
        title: 'Cellulite Treatment Guide | AI Body Simulator & Cost',
        description: 'Cellulite treatments from Avéli, Cellfina, and RF devices smooth dimpling on thighs and buttocks. Compare options by longevity and cost. Preview results with our free AI simulator.',
        keywords: ['cellulite treatment', 'cellulite removal', 'cellulite treatment cost', 'Cellfina', 'Aveli', 'RF cellulite treatment', 'cellulite simulator', 'thigh cellulite treatment'],
    },
    'scar-revision': {
        title: 'Scar Revision Guide | AI Skin Simulator & Cost',
        description: 'Scar revision minimizes the appearance of acne scars, surgical scars, and keloids using lasers, fillers, or surgery. Preview scar improvement with our free AI simulator.',
        keywords: ['scar revision', 'scar treatment', 'acne scar removal', 'keloid treatment', 'scar revision surgery', 'scar revision cost', 'scar revision simulator', 'surgical scar treatment'],
    },
    'mole-removal': {
        title: 'Mole Removal Guide | AI Skin Simulator & Cost',
        description: 'Mole removal via surgical excision, shave biopsy, or laser leaves minimal scarring when done correctly. Preview your mole-free skin with our free AI simulator.',
        keywords: ['mole removal', 'mole removal cost', 'laser mole removal', 'mole excision', 'mole removal simulator', 'skin tag removal', 'mole shave biopsy', 'mole removal scar'],
    },
    'stretch-mark-treatment': {
        title: 'Stretch Mark Treatment Guide | AI Body Simulator',
        description: 'Stretch mark treatments include laser resurfacing, RF microneedling, and PRP to reduce appearance of striae. Preview improvement with our free AI body simulator.',
        keywords: ['stretch mark treatment', 'stretch mark removal', 'striae treatment', 'stretch mark laser', 'stretch mark cost', 'RF microneedling stretch marks', 'stretch mark simulator', 'stretch mark cream'],
    },
    // Injectables
    'botox': {
        title: 'Botox (Neuromodulator) Guide | Free AI Simulator',
        description: 'Botox and neuromodulators smooth forehead lines, crow\'s feet, and frown lines in minutes. Compare Dysport, Xeomin, and Jeuveau. Preview results with our free AI Botox simulator.',
        keywords: ['Botox', 'Botox simulator', 'neuromodulator', 'Botox cost', 'Dysport', 'Xeomin', 'forehead Botox', 'crow\'s feet Botox', 'frown line treatment'],
    },
    'fat-grafting': {
        title: 'Fat Grafting (Face) Guide | AI Volume Simulator',
        description: 'Facial fat grafting transfers your own fat to restore volume in cheeks, temples, and under-eyes for natural, lasting results. Preview your rejuvenated look with our free AI simulator.',
        keywords: ['fat grafting', 'fat transfer face', 'facial fat grafting', 'fat grafting cost', 'autologous fat transfer', 'fat grafting simulator', 'face volume restoration', 'fat injection face'],
    },
    'lip-augmentation': {
        title: 'Lip Augmentation Guide | Free AI Lip Simulator',
        description: 'Lip augmentation with hyaluronic acid fillers adds volume, definition, and shape to thin or asymmetric lips. Preview natural or fuller lips with our free AI lip augmentation simulator.',
        keywords: ['lip augmentation', 'lip filler', 'lip augmentation simulator', 'lip enhancement', 'lip augmentation cost', 'hyaluronic acid lip filler', 'lip volume', 'lip injection'],
    },
    'lip-flip': {
        title: 'Lip Flip (Botox) Guide | AI Lip Simulator & Cost',
        description: 'A Botox lip flip relaxes the orbicularis muscle to curl the upper lip upward for more lip show without filler. Preview your lip flip result with our free AI simulator.',
        keywords: ['lip flip', 'Botox lip flip', 'lip flip cost', 'lip flip simulator', 'upper lip flip', 'lip flip before after', 'Botox lip treatment', 'non-surgical lip enhancement'],
    },
    'masseter-botox': {
        title: 'Masseter Botox (Jaw Slimming) Guide | AI Simulator',
        description: 'Masseter Botox slims an overly square jaw by relaxing the chewing muscle, the most popular K-beauty treatment in Seoul. Preview your slimmer jawline with our free AI simulator.',
        keywords: ['masseter Botox', 'jaw slimming Botox', 'masseter reduction', 'jaw Botox', 'jaw slimming', 'Korean jaw slimming', 'masseter Botox cost', 'masseter Botox simulator', 'Seoul jaw Botox'],
    },
    'kybella': {
        title: 'Kybella (Double Chin) Guide | AI Simulator & Cost',
        description: 'Kybella dissolves submental fat under the chin without surgery for a defined jawline. Multiple sessions needed. Preview your double chin reduction with our free AI simulator.',
        keywords: ['Kybella', 'double chin treatment', 'submental fat removal', 'Kybella cost', 'Kybella simulator', 'chin fat removal', 'deoxycholic acid injection', 'non-surgical double chin removal'],
    },
    'sculptra': {
        title: 'Sculptra (PLLA Filler) Guide | AI Volume Simulator',
        description: 'Sculptra stimulates your own collagen using poly-L-lactic acid for gradual, natural-looking volume restoration over months. Preview results with our free AI facial volume simulator.',
        keywords: ['Sculptra', 'poly-L-lactic acid filler', 'Sculptra cost', 'Sculptra simulator', 'collagen stimulator', 'Sculptra vs filler', 'Sculptra treatment', 'PLLA facial filler'],
    },
    'profhilo': {
        title: 'Profhilo (Bio-Remodeller) Guide | AI Skin Simulator',
        description: 'Profhilo is a bio-remodelling injectable that hydrates deeply and stimulates collagen and elastin. Hugely popular in Singapore and the UK. Preview results with our free AI simulator.',
        keywords: ['Profhilo', 'bio-remodeller', 'Profhilo cost', 'Profhilo simulator', 'Profhilo Singapore', 'skin booster', 'hyaluronic acid skin booster', 'Profhilo treatment', 'skin hydration injection'],
    },
    'radiesse': {
        title: 'Radiesse (CaHA Filler) Guide | AI Volume Simulator',
        description: 'Radiesse calcium hydroxylapatite filler provides immediate volume and long-term collagen stimulation for hands, cheeks, and jawline. Preview results with our free AI simulator.',
        keywords: ['Radiesse', 'calcium hydroxylapatite filler', 'Radiesse cost', 'Radiesse simulator', 'CaHA filler', 'Radiesse vs Juvederm', 'Radiesse cheeks', 'Radiesse jawline'],
    },
    'mesotherapy': {
        title: 'Mesotherapy Guide | AI Skin & Hair Simulator & Cost',
        description: 'Mesotherapy delivers vitamins, enzymes, and hyaluronic acid directly into the skin or scalp for rejuvenation or hair growth. Preview results with our free AI simulator.',
        keywords: ['mesotherapy', 'mesotherapy treatment', 'mesotherapy cost', 'mesotherapy simulator', 'skin mesotherapy', 'hair mesotherapy', 'micro-injection skin', 'meso skin booster'],
    },
    'glutathione-injection': {
        title: 'Glutathione Injection (Skin Brightening) Guide',
        description: 'Glutathione injections brighten skin tone and reduce hyperpigmentation. Widely used for skin whitening across Southeast Asia and India. Preview your result with our free AI simulator.',
        keywords: ['glutathione injection', 'skin whitening injection', 'glutathione skin brightening', 'skin lightening injection', 'glutathione cost', 'skin whitening', 'whitening injection SE Asia', 'melanin reduction'],
    },
    'aqualyx': {
        title: 'Aqualyx / Lemonbottle Fat-Dissolving Guide | AI Simulator',
        description: 'Aqualyx and Lemonbottle are fat-dissolving injections that target stubborn pockets under the chin, jowls, and body. Preview your contoured result with our free AI simulator.',
        keywords: ['Aqualyx', 'Lemonbottle', 'fat dissolving injection', 'Aqualyx cost', 'fat dissolving injection cost', 'Aqualyx simulator', 'deoxycholic acid fat', 'lipolytic injection'],
    },
    'hyperhidrosis-botox': {
        title: 'Hyperhidrosis Botox (Sweating) Guide | AI Simulator',
        description: 'Botox for hyperhidrosis blocks sweat gland signals in the underarms, palms, or feet for up to 12 months. Preview treatment mapping with our free AI simulator.',
        keywords: ['hyperhidrosis Botox', 'excessive sweating treatment', 'underarm sweating Botox', 'hyperhidrosis treatment', 'hyperhidrosis cost', 'palmar hyperhidrosis', 'Botox sweating', 'hyperhidrosis simulator'],
    },
    // Dental
    'smile-design': {
        title: 'Smile Design Guide | Free AI Smile Simulator',
        description: 'Digital smile design combines veneers, whitening, and gum contouring to create a custom perfect smile. Preview your new smile with our free AI smile design simulator.',
        keywords: ['smile design', 'digital smile design', 'smile makeover', 'smile design simulator', 'smile design cost', 'cosmetic dentistry', 'perfect smile', 'smile transformation'],
    },
    'teeth-whitening': {
        title: 'Teeth Whitening Guide | Free AI Smile Simulator',
        description: 'Professional teeth whitening brightens your smile by up to 8 shades. Compare in-office Zoom!, take-home trays, and laser whitening. Preview results with our free AI smile simulator.',
        keywords: ['teeth whitening', 'teeth whitening cost', 'teeth whitening simulator', 'professional teeth whitening', 'Zoom whitening', 'laser teeth whitening', 'take-home teeth whitening', 'smile brightening'],
    },
    'veneers': {
        title: 'Veneers Guide | Free AI Veneer Smile Simulator',
        description: 'Porcelain and composite veneers reshape, whiten, and perfect your smile in 1–2 visits. Compare ultra-thin and no-prep options. Preview your veneer smile with our free AI simulator.',
        keywords: ['veneers', 'porcelain veneers', 'veneers cost', 'veneers simulator', 'dental veneers', 'composite veneers', 'no-prep veneers', 'smile veneers'],
    },
    'gummy-smile': {
        title: 'Gummy Smile Correction Guide | AI Smile Simulator',
        description: 'Gummy smile correction reduces excess gum display using Botox, lip repositioning, or crown lengthening. Preview your balanced smile with our free AI smile simulator.',
        keywords: ['gummy smile', 'gummy smile correction', 'gummy smile Botox', 'gummy smile surgery', 'gummy smile simulator', 'lip repositioning', 'crown lengthening', 'excessive gum display'],
    },
    'dental-implants': {
        title: 'Dental Implants Guide | AI Smile Simulator & Cost',
        description: 'Dental implants replace missing teeth with titanium roots and natural-looking crowns for a lifetime. Compare single implants, All-on-4, and mini implants. Preview with our free AI simulator.',
        keywords: ['dental implants', 'dental implants cost', 'dental implants simulator', 'teeth implants', 'All-on-4 implants', 'single tooth implant', 'missing teeth solution', 'implant crown'],
    },
    'invisalign': {
        title: 'Invisalign / Clear Aligners Guide | AI Simulator',
        description: 'Invisalign and clear aligners straighten teeth discreetly without metal braces. Compare Invisalign, ClearCorrect, and generic aligners. Preview your straighter smile with our free AI simulator.',
        keywords: ['Invisalign', 'clear aligners', 'Invisalign cost', 'Invisalign simulator', 'ClearCorrect', 'teeth straightening', 'invisible braces', 'clear braces'],
    },
    'gum-contouring': {
        title: 'Gum Contouring (Gingivectomy) Guide | AI Simulator',
        description: 'Gum contouring reshapes the gumline to correct asymmetry, excess gum tissue, or recession. Laser gingivectomy offers precise, quick results. Preview with our free AI smile simulator.',
        keywords: ['gum contouring', 'gingivectomy', 'gum reshaping', 'gum contouring cost', 'gum contouring simulator', 'laser gum contouring', 'gum lift', 'gumline reshaping'],
    },
    // Body
    'breast-augmentation': {
        title: 'Breast Augmentation Guide | AI Simulator & Cost',
        description: 'Breast augmentation with silicone or saline implants enhances size, shape, and symmetry. Compare profiles, placement, and incisions. Preview your result with our free AI breast simulator.',
        keywords: ['breast augmentation', 'breast implants', 'breast augmentation cost', 'breast augmentation simulator', 'silicone breast implants', 'saline implants', 'breast enhancement', 'boob job'],
    },
    'liposuction': {
        title: 'Liposuction Guide | AI Body Contouring Simulator',
        description: 'Liposuction removes stubborn fat deposits from the abdomen, thighs, arms, and flanks for a contoured figure. Compare VASER, laser, and traditional lipo. Preview with our free AI simulator.',
        keywords: ['liposuction', 'liposuction cost', 'liposuction simulator', 'VASER liposuction', 'laser liposuction', 'body contouring', 'fat removal surgery', 'lipo surgery'],
    },
    'tummy-tuck': {
        title: 'Tummy Tuck (Abdominoplasty) Guide | AI Simulator',
        description: 'Tummy tuck surgery removes excess abdominal skin and tightens muscles for a flat, firm midsection. Compare full and mini abdominoplasty. Preview results with our free AI simulator.',
        keywords: ['tummy tuck', 'abdominoplasty', 'tummy tuck cost', 'tummy tuck simulator', 'stomach tuck', 'tummy tuck recovery', 'tummy tuck before after', 'abdominal tightening'],
    },
    'bbl': {
        title: 'BBL (Brazilian Butt Lift) Guide | AI Body Simulator',
        description: 'Brazilian Butt Lift transfers fat to the buttocks for natural-looking volume and shape enhancement. Learn about safety, cost, and recovery. Preview your BBL result with our free AI simulator.',
        keywords: ['BBL', 'Brazilian butt lift', 'Brazilian butt lift cost', 'BBL simulator', 'butt augmentation', 'fat transfer buttocks', 'BBL surgery', 'butt lift'],
    },
    'breast-reduction': {
        title: 'Breast Reduction Guide | AI Simulator & Cost',
        description: 'Breast reduction surgery relieves back pain, skin irritation, and posture issues by removing excess breast tissue and skin. Preview your new profile with our free AI simulator.',
        keywords: ['breast reduction', 'breast reduction surgery', 'breast reduction cost', 'breast reduction simulator', 'reduction mammaplasty', 'large breast reduction', 'breast reduction recovery'],
    },
    'breast-lift': {
        title: 'Breast Lift (Mastopexy) Guide | AI Simulator & Cost',
        description: 'Mastopexy lifts and reshapes sagging breasts by removing excess skin and repositioning the nipple. Often combined with implants. Preview your lifted result with our free AI simulator.',
        keywords: ['breast lift', 'mastopexy', 'breast lift cost', 'breast lift simulator', 'sagging breasts', 'breast lift with implants', 'breast ptosis', 'nipple repositioning'],
    },
    'labiaplasty': {
        title: 'Labiaplasty Guide | AI Simulator & Cost',
        description: 'Labiaplasty reduces or reshapes the labia minora for improved comfort, symmetry, or aesthetics. Quick recovery, high satisfaction. Preview your result with our free AI simulator.',
        keywords: ['labiaplasty', 'labia reduction', 'labiaplasty cost', 'labiaplasty simulator', 'labia minora reduction', 'vaginal rejuvenation', 'labiaplasty recovery', 'aesthetic gynecology'],
    },
    'emsculpt': {
        title: 'Emsculpt / EmSculpt NEO Guide | AI Body Simulator',
        description: 'Emsculpt NEO burns fat and builds muscle simultaneously using HIFEM and RF energy. No downtime, clinically proven. Preview your sculpted result with our free AI body simulator.',
        keywords: ['Emsculpt', 'EmSculpt NEO', 'Emsculpt cost', 'Emsculpt simulator', 'HIFEM body sculpting', 'muscle building non-surgical', 'fat burning body', 'Emsculpt results'],
    },
    'thigh-lift': {
        title: 'Thigh Lift (Thighplasty) Guide | AI Body Simulator',
        description: 'Thigh lift surgery removes excess skin and fat from inner or outer thighs for smoother, firmer legs. Ideal after major weight loss. Preview results with our free AI body simulator.',
        keywords: ['thigh lift', 'thighplasty', 'inner thigh lift', 'thigh lift cost', 'thigh lift simulator', 'thigh lift recovery', 'leg lift surgery', 'excess thigh skin removal'],
    },
    'mommy-makeover': {
        title: 'Mommy Makeover Guide | AI Body Simulator & Cost',
        description: 'Mommy makeover combines tummy tuck, breast surgery, and liposuction to restore your pre-pregnancy body in one surgical session. Preview your transformation with our free AI simulator.',
        keywords: ['mommy makeover', 'mommy makeover cost', 'mommy makeover simulator', 'post-pregnancy surgery', 'tummy tuck and breast lift', 'body restoration surgery', 'mommy makeover recovery'],
    },
    'body-lift': {
        title: 'Body Lift (Belt Lipectomy) Guide | AI Simulator',
        description: 'A body lift (belt lipectomy) removes a circumferential band of excess skin from the torso after massive weight loss. Preview your result with our free AI body contouring simulator.',
        keywords: ['body lift', 'belt lipectomy', 'lower body lift', 'body lift cost', 'body lift simulator', 'excess skin removal', 'post weight loss surgery', 'circumferential body lift'],
    },
    'calf-augmentation': {
        title: 'Calf Augmentation Guide | AI Body Simulator & Cost',
        description: 'Calf augmentation uses implants or fat grafting to add shape and definition to underdeveloped calves. Preview your proportioned legs with our free AI body simulator.',
        keywords: ['calf augmentation', 'calf implants', 'calf augmentation cost', 'calf augmentation simulator', 'calf enhancement', 'calf implant surgery', 'fat grafting calves', 'leg augmentation'],
    },
    'areola-reduction': {
        title: 'Areola Reduction Guide | AI Simulator & Cost',
        description: 'Areola reduction surgery resizes or reshapes enlarged or asymmetric areolas, often combined with breast lift or reduction. Preview results with our free AI simulator.',
        keywords: ['areola reduction', 'areola reduction surgery', 'areola reduction cost', 'areola reduction simulator', 'nipple areola reduction', 'areola reshaping', 'breast areola surgery'],
    },
    'buttock-implants': {
        title: 'Buttock Implants (Gluteal Augmentation) Guide',
        description: 'Buttock implants use solid silicone to add permanent projection and shape where fat transfer alone is insufficient. Preview your gluteal result with our free AI body simulator.',
        keywords: ['buttock implants', 'gluteal implants', 'butt implants', 'buttock augmentation', 'gluteal augmentation cost', 'buttock implants simulator', 'butt implant surgery', 'silicone butt implants'],
    },
    'mini-tummy-tuck': {
        title: 'Mini Tummy Tuck Guide | AI Simulator & Cost',
        description: 'A mini tummy tuck targets below-navel skin laxity with a shorter scar and faster recovery than a full abdominoplasty. Preview your toned midsection with our free AI simulator.',
        keywords: ['mini tummy tuck', 'mini abdominoplasty', 'mini tummy tuck cost', 'mini tummy tuck simulator', 'partial tummy tuck', 'lower abdomen tightening', 'mini tummy tuck recovery'],
    },
    'mons-pubis-lift': {
        title: 'Mons Pubis Lift (Monsplasty) Guide | AI Simulator',
        description: 'Monsplasty reduces a prominent or sagging mons pubis through skin excision and liposuction. Often combined with tummy tuck. Preview your contoured result with our free AI simulator.',
        keywords: ['mons pubis lift', 'monsplasty', 'pubic lift', 'mons pubis reduction', 'monsplasty cost', 'mons pubis surgery', 'mons lift simulator', 'pubic area contouring'],
    },
    'vaginal-rejuvenation': {
        title: 'Vaginal Rejuvenation (Vaginoplasty) Guide',
        description: 'Vaginal rejuvenation tightens vaginal tissues using surgery or laser for improved tone and comfort. Vaginoplasty and laser options available. Preview with our free AI simulator.',
        keywords: ['vaginal rejuvenation', 'vaginoplasty', 'vaginal tightening', 'vaginal rejuvenation cost', 'laser vaginal rejuvenation', 'vaginal rejuvenation simulator', 'intimate surgery', 'vaginal surgery'],
    },
    'brachioplasty': {
        title: 'Brachioplasty (Arm Lift) Guide | AI Simulator & Cost',
        description: 'Brachioplasty removes excess skin and fat from the upper arms to create toned, defined arms. Ideal after weight loss. Preview your arm contour with our free AI body simulator.',
        keywords: ['brachioplasty', 'arm lift', 'brachioplasty cost', 'brachioplasty simulator', 'upper arm lift', 'bat wing arm surgery', 'arm tuck', 'arm skin removal'],
    },
    // Hair
    'eyebrow-restoration': {
        title: 'Eyebrow Restoration Guide | AI Brow Simulator & Cost',
        description: 'Eyebrow hair transplant restores sparse or over-plucked brows with natural follicles for permanent definition. Preview your restored brows with our free AI simulator.',
        keywords: ['eyebrow restoration', 'eyebrow transplant', 'eyebrow hair transplant', 'eyebrow restoration cost', 'eyebrow simulator', 'sparse eyebrows treatment', 'eyebrow regrowth', 'brow restoration'],
    },
    'beard-transplant': {
        title: 'Beard & Mustache Transplant Guide | AI Simulator',
        description: 'Beard transplant fills patchy facial hair using FUE grafts for a full, natural beard or mustache. Preview your beard density with our free AI facial hair simulator.',
        keywords: ['beard transplant', 'beard hair transplant', 'mustache transplant', 'beard transplant cost', 'beard transplant simulator', 'FUE beard transplant', 'patchy beard fix', 'facial hair restoration'],
    },
    'prp-hair': {
        title: 'PRP for Hair Loss Guide | AI Simulator & Cost',
        description: 'PRP for hair loss injects platelet-rich plasma into the scalp to stimulate follicles and slow shedding. Effective for androgenetic alopecia. Preview with our free AI hair simulator.',
        keywords: ['PRP hair loss', 'PRP hair treatment', 'platelet-rich plasma hair', 'PRP for hair growth', 'PRP hair cost', 'PRP hair simulator', 'hair loss PRP', 'androgenetic alopecia PRP'],
    },
    'dhi-hair-transplant': {
        title: 'DHI Hair Transplant Guide | AI Simulator & Cost',
        description: 'DHI (Direct Hair Implantation) places grafts directly without incisions for higher density and natural-looking results. Compare DHI vs FUE. Preview with our free AI hair simulator.',
        keywords: ['DHI hair transplant', 'direct hair implantation', 'DHI vs FUE', 'DHI cost', 'DHI hair simulator', 'DHI hair transplant cost', 'Choi implanter pen', 'hairline DHI'],
    },
    'microblading': {
        title: 'Microblading (Eyebrow Tattoo) Guide | AI Simulator',
        description: 'Microblading uses a fine blade to deposit pigment into the skin for hair-stroke brows that look natural for 1–3 years. Preview your brow shape with our free AI simulator.',
        keywords: ['microblading', 'eyebrow microblading', 'microblading cost', 'microblading simulator', 'eyebrow tattoo', 'semi-permanent eyebrows', 'nano brows', 'microblading brows'],
    },
    'lip-blush-tattoo': {
        title: 'Lip Blush (Cosmetic Lip Tattoo) Guide | AI Simulator',
        description: 'Lip blush tattoo adds semi-permanent color and definition to lips for a naturally flushed look that lasts 2–3 years. Preview your lip tint with our free AI simulator.',
        keywords: ['lip blush', 'lip blush tattoo', 'cosmetic lip tattoo', 'lip blush cost', 'lip blush simulator', 'semi-permanent lip color', 'lip tattoo', 'permanent lip makeup'],
    },
    'eyelash-extensions': {
        title: 'Eyelash Extensions & Transplant Guide | AI Simulator',
        description: 'Eyelash extensions and eyelash transplants add length, volume, and curl for dramatic or natural lashes. Preview your lash look with our free AI simulator.',
        keywords: ['eyelash extensions', 'eyelash transplant', 'lash extensions', 'eyelash extensions cost', 'eyelash simulator', 'lash lift', 'eyelash transplant cost', 'volume lash extensions'],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const locale = 'en';
    const procedure = getProcedureBySlug(slug);

    if (!procedure) notFound();

    const seoOverride = PROCEDURE_SEO_OVERRIDES[slug];
    // Title: root layout appends " | Faceify Labs" via its template. Override titles are
    // self-contained and skip the template; the fallback must NOT include the brand suffix
    // itself or the rendered title becomes "X Simulator | Faceify Labs | Faceify Labs".
    const title = seoOverride?.title || `${procedure.name} Simulator`;
    const description = seoOverride?.description || `${procedure.description} Preview your ${procedure.name.toLowerCase()} results with our free AI simulator. Private, browser-only processing.`;
    const keywords = seoOverride?.keywords || [procedure.shortName.toLowerCase(), procedure.name.toLowerCase(), `${procedure.shortName.toLowerCase()} simulator`];

    return {
        title,
        description,
        keywords,
        alternates: buildAlternates(`/procedures/${slug}`, locale),
        openGraph: {
            title: seoOverride?.title || `${procedure.name} Simulator | Faceify Labs`,
            description: seoOverride?.description || procedure.description,
            images: [
                {
                    url: '/opengraph-image',
                    width: 1200,
                    height: 630,
                    alt: `${procedure.name}: Faceify Labs AI Surgical Simulation`,
                },
            ],
        },
    };
}

const PROCEDURE_FAQS: Record<string, { question: string; answer: string }[]> = {
    blepharoplasty: [
        { question: "How accurate is the blepharoplasty simulation?", answer: "The simulation uses a 468-point facial mesh for detailed visualizations of upper and lower eyelid changes, accounting for skin laxity, fat pad positioning, and crease height." },
        { question: "Will blepharoplasty affect my vision?", answer: "Faceify Labs simulates aesthetic eyelid changes only. Functional concerns require a clinical ophthalmological assessment by your surgeon." },
        { question: "How long does the simulation take?", answer: "The full eyelid simulation completes in under 60 seconds in your browser." },
    ],
    facelift: [
        { question: "How accurate is the facelift simulation?", answer: "The simulation models tissue repositioning and skin re-draping across 468 anatomical landmarks, accounting for the SMAS layer, jowl reduction, and neck contouring." },
        { question: "Does the simulation account for scarring?", answer: "Faceify Labs focuses on aesthetic volume and contour changes. Scar placement depends on surgical technique and individual biology." },
    ],
    "hairline-lowering": [
        { question: "What is the difference between surgical advancement and transplant grafting?", answer: "Surgical hairline advancement involves a single incision at the existing hairline, physically moving the scalp forward to reduce forehead height by 1–3 cm. It delivers immediate results with a thin scar along the new hairline. Transplant grafting uses FUE or DHI follicular units to create a lower hairline without surgery, can achieve 2–5 cm of lowering, and leaves no linear scar, though full results take 12–18 months to mature." },
        { question: "How accurate is the hairline lowering simulation?", answer: "The simulator renders follicular units using Poisson-disk distribution at clinically realistic graft densities (25–50 grafts/cm²), with hairline curvature modelled from your uploaded photo. Actual results depend on individual scalp laxity, donor density, and surgical technique. Always consult a board-certified surgeon before making treatment decisions." },
        { question: "How many grafts are typically needed?", answer: "Most hairline lowering procedures via transplant require 1,500–3,000 grafts depending on the amount of lowering desired, the hairline shape selected, and whether temple triangle filling is included. The simulator lets you adjust graft count from 500 to 3,500 to explore different coverage levels." },
        { question: "Is hairline lowering popular in Korea?", answer: "Yes, hairline lowering (이마축소술) is one of the most requested hair procedures in Korea, where a smaller, rounder forehead is a widely held aesthetic preference. The Korean bell-curve hairline shape is included as a default option in our simulator for this reason." },
        { question: "What does the post-op timeline show?", answer: "The timeline slider models the expected growth phase: minimal visible growth in months 1–3 (shock loss phase), early fine hairs from months 4–6, noticeable density by months 7–9, approximately 85% of final result by 12 months, and full maturation by 18 months." },
    ],
    "chin-augmentation": [
        { question: "How accurate is the chin augmentation simulation?", answer: "The simulation models chin projection, vertical height, and width changes using anatomical landmarks. It accounts for the relationship between chin, jaw, and neck contour to maintain facial harmony." },
        { question: "What is the difference between implants and fillers for chin augmentation?", answer: "Chin implants are surgical and permanent, offering significant projection changes (5-10mm). Dermal fillers are non-surgical and temporary (12-24 months), best for subtle enhancement (2-5mm). Our simulator can model both approaches." },
        { question: "Will chin augmentation change my profile?", answer: "Yes, chin augmentation primarily affects the side profile. The simulation shows both frontal and profile views so you can evaluate the change from multiple angles." },
    ],
    "dermal-fillers": [
        { question: "How accurate is the filler simulation?", answer: "The simulation models volume addition along natural tissue planes, accounting for filler placement depth and spread patterns. It visualizes results for cheeks, lips, jawline, and under-eye areas." },
        { question: "How long do dermal fillers last?", answer: "Results vary by filler type and placement area. Hyaluronic acid fillers typically last 6-18 months. Lips metabolize filler faster (6-9 months) than cheeks (12-18 months). The simulation shows the immediate post-treatment appearance." },
        { question: "Can I see different filler amounts?", answer: "Yes, the simulation allows you to adjust volume in 0.5ml increments to explore subtle vs. dramatic results. This helps align expectations before your appointment." },
    ],
    "hair-transplant": [
        { question: "How accurate is the hair transplant simulation?", answer: "The simulation models graft placement using Poisson-disk distribution at clinically realistic densities (25-50 grafts/cm²). It accounts for natural hair direction, angle, and density gradients from front to crown." },
        { question: "What is the difference between FUE and DHI?", answer: "FUE (Follicular Unit Extraction) extracts individual grafts for later implantation. DHI (Direct Hair Implantation) uses a Choi pen for simultaneous extraction and implantation. Both achieve similar results; DHI may allow slightly higher density. Our simulator models final results regardless of technique." },
        { question: "How many grafts will I need?", answer: "Graft requirements depend on the area of hair loss and desired density. Typical ranges: hairline (800-1,500 grafts), crown (1,000-2,500 grafts), full head (3,000-5,000 grafts). The simulator lets you adjust graft count to visualize different coverage levels." },
        { question: "When will I see final results?", answer: "Hair transplants show minimal growth for 3-4 months (shock loss phase), early growth at 4-6 months, significant improvement at 8-10 months, and full results at 12-18 months. Our timeline slider shows this progression." },
    ],
    "breast-augmentation": [
        { question: "How accurate is the breast augmentation simulation?", answer: "The simulation models implant size, profile (low to extra-high), and placement (over or under muscle) to show realistic proportional changes. It accounts for chest width and existing breast tissue." },
        { question: "What implant sizes can I simulate?", answer: "The simulator supports implant volumes from 150cc to 800cc in various profiles. Most patients choose between 300-450cc. The simulation helps visualize how different sizes look on your specific frame." },
        { question: "Will the simulation show how I'll look in clothes?", answer: "The simulation shows anatomical changes from the surgical perspective. For clothed appearance, the changes are typically more subtle. Many patients take simulation results to their surgeon for discussion." },
    ],
    "liposuction": [
        { question: "How accurate is the liposuction simulation?", answer: "The simulation models fat reduction and body contouring for common treatment areas: abdomen, flanks, thighs, arms, and chin. It shows proportional changes while maintaining natural body contours." },
        { question: "How much fat can be removed?", answer: "Safe liposuction typically removes 2-5 liters of fat per session. The simulation allows you to adjust reduction levels to see different outcomes. Your surgeon will advise on safe limits for your body." },
        { question: "Will liposuction remove loose skin?", answer: "Liposuction removes fat but not excess skin. Patients with significant skin laxity may need a tummy tuck or body lift for optimal results. The simulation focuses on fat reduction effects." },
    ],
    "lip-augmentation": [
        { question: "How accurate is the lip augmentation simulation?", answer: "The simulation models lip volume, shape, and proportion changes. It accounts for the vermilion border, cupid's bow, and the ratio between upper and lower lips for natural-looking results." },
        { question: "What is the ideal lip ratio?", answer: "The classical ideal is a 1:1.6 upper-to-lower lip ratio, though preferences vary. Korean aesthetics often favor a fuller upper lip (1:1 ratio). The simulator lets you adjust proportions to find your preference." },
        { question: "How long do lip fillers last?", answer: "Lip fillers typically last 6-9 months as the lip area has high blood flow and movement. The simulation shows the immediate post-treatment appearance. Touch-ups are common to maintain results." },
    ],
    "brow-lift": [
        { question: "How accurate is the brow lift simulation?", answer: "The simulation models brow position, arch shape, and forehead changes. It accounts for the natural relationship between brows, eyelids, and forehead for harmonious results." },
        { question: "What is the difference between surgical and non-surgical brow lifts?", answer: "Surgical brow lifts (endoscopic or coronal) provide permanent elevation of 3-8mm. Non-surgical options include Botox (temporary, 3-4 months) and thread lifts (6-12 months). The simulation can model the final position regardless of technique." },
        { question: "Will a brow lift change my eye appearance?", answer: "Yes, elevating the brows can reduce hooding on the upper eyelids and create a more open, refreshed eye appearance. Some patients combine brow lift with blepharoplasty for comprehensive rejuvenation." },
    ],
    "thread-lift": [
        { question: "How accurate is the thread lift simulation?", answer: "The simulation models the lifting vectors and tissue repositioning achieved with absorbable PDO threads. It shows effects on jowls, mid-face, and neck contour." },
        { question: "How long do thread lift results last?", answer: "Thread lift results typically last 12-18 months. The threads dissolve over 6 months but stimulate collagen production for extended benefit. The simulation shows the immediate post-procedure appearance." },
        { question: "Is thread lift an alternative to a facelift?", answer: "Thread lifts provide moderate lifting for early aging signs. For significant laxity, a surgical facelift achieves more dramatic, longer-lasting results. Thread lifts work well for patients not ready for surgery or as maintenance after a facelift." },
    ],
    "veneers": [
        { question: "How accurate is the veneer simulation?", answer: "The simulation models tooth shape, size, color, and alignment changes. It shows realistic veneer results while maintaining natural tooth proportions and smile aesthetics." },
        { question: "How many veneers do I need?", answer: "Most smile makeovers involve 6-10 veneers (the visible teeth when smiling). Some patients choose 4 veneers for front teeth only. The simulator lets you adjust coverage to visualize different options." },
        { question: "Do veneers look natural?", answer: "Modern porcelain veneers are highly customizable and can look completely natural. The simulation helps you choose shades and shapes that match your preferences while maintaining a believable appearance." },
    ],
    botox: [
        { question: "How long do Botox results last?", answer: "Botox results typically last 3-4 months for first-time patients, often extending to 4-6 months with regular treatments as muscles gradually weaken. Maintenance every 3-4 months is standard for sustained effect." },
        { question: "Will Botox make my face look frozen?", answer: "Properly administered Botox should preserve natural expression. The 'frozen' appearance results from over-treatment or wrong injection points. A skilled provider uses the minimum effective dose to soften specific muscles while preserving overall expressiveness." },
        { question: "What areas can Botox treat?", answer: "Common cosmetic uses include forehead lines, frown lines (glabella), crow's feet, bunny lines, gummy smile, lip flip, masseter (jaw slimming), and platysmal bands (neck). Medical uses include hyperhidrosis (sweating), migraines, and TMJ pain." },
    ],
    "tummy-tuck": [
        { question: "How is a tummy tuck different from liposuction?", answer: "Liposuction removes excess fat but cannot tighten loose skin or repair separated abdominal muscles. Tummy tuck (abdominoplasty) removes both fat and excess skin, tightens the abdominal wall, and repairs diastasis recti (muscle separation). Many patients combine both for optimal results." },
        { question: "What's the difference between full and mini tummy tuck?", answer: "Mini tummy tuck addresses only the area below the navel through a shorter incision (similar to a C-section scar). Full tummy tuck extends from pubic bone to rib cage, repositions the navel, and repairs the entire abdominal wall, required for significant skin laxity or muscle separation." },
        { question: "When can I exercise after tummy tuck?", answer: "Light walking starts within days. Light activity returns at 2-3 weeks. Strenuous exercise and abdominal workouts must wait 6-8 weeks to allow internal sutures to fully heal. Returning to exercise too early risks ripping internal sutures." },
    ],
    "teeth-whitening": [
        { question: "How white can my teeth get?", answer: "Most patients see 4-8 shade improvements with professional in-office whitening, lifting teeth from yellow/grey tones to a natural bright white. Results depend on initial shade, enamel quality, and stain type. Internal stains (from medications, trauma) respond less than surface stains." },
        { question: "Is in-office or take-home whitening better?", answer: "In-office uses higher-concentration peroxide gel activated by light/laser: dramatic results in one 60-90 minute session. Take-home trays use lower-concentration gel over 2-4 weeks for gradual results. In-office is faster; take-home is gentler and easier to maintain. Many practices combine both." },
        { question: "Will whitening damage my teeth?", answer: "Professional whitening when properly administered does not damage enamel. Temporary tooth sensitivity (1-3 days) is the most common side effect. Whitening kits used incorrectly or excessively can cause enamel damage and gum irritation; always use under dental supervision." },
    ],
    "smile-design": [
        { question: "What is digital smile design?", answer: "Digital smile design (DSD) uses photographic and 3D analysis to plan a smile makeover, evaluating tooth proportions, gum line, lip dynamics, and facial harmony. The plan typically combines whitening, veneers, gum contouring, and orthodontics into a coordinated treatment sequence." },
        { question: "How long does a full smile design take?", answer: "Treatment varies by complexity. A whitening + veneer combination can complete in 2-4 weeks. Comprehensive cases involving Invisalign + veneers + implants run 6-18 months. The simulation lets you preview the final outcome before committing to the timeline." },
        { question: "Are smile design results permanent?", answer: "Veneers last 10-20 years with good care. Implants are permanent. Whitening fades over 1-2 years and requires periodic touch-ups. Invisalign-corrected alignment is permanent if you wear retainers consistently. Good oral hygiene is essential to longevity." },
    ],
    "breast-reduction": [
        { question: "Will my insurance cover breast reduction?", answer: "Many insurance plans cover breast reduction when symptoms are documented: chronic back/neck/shoulder pain, postural issues, skin irritation under the breast crease, and bra-strap grooves. Pre-authorization typically requires photos, weight chart, and documentation of failed conservative treatments (physical therapy, weight loss). Coverage criteria vary significantly by insurer." },
        { question: "Will I be able to breastfeed after breast reduction?", answer: "Breastfeeding ability is reduced but not eliminated for most patients. Modern techniques preserve more glandular tissue and the duct system than older methods, but some women lose the ability to fully nurse. If future breastfeeding matters, discuss this explicitly with your surgeon: pedicle techniques preserve better than free-graft." },
        { question: "How much smaller will my breasts be?", answer: "Most patients reduce by 1-3 cup sizes. Surgeons aim for proportional, healthy breast size based on your frame rather than a specific cup target. Insurance-covered reductions typically require minimum gram weights of tissue removed (varies by insurer; commonly 350-500g per side)." },
    ],
    "breast-lift": [
        { question: "Will a breast lift make my breasts smaller?", answer: "Standalone breast lift (mastopexy) does not significantly change breast volume: it removes excess skin and reshapes existing tissue. If you want lifting AND larger breasts, mastopexy with implants is one procedure addressing both. If you want lifting AND smaller breasts, that's a breast lift with reduction." },
        { question: "How long do breast lift results last?", answer: "Results last 10-15 years on average. Aging, gravity, weight changes, and pregnancy can recreate ptosis over time. Wearing supportive bras (especially during exercise), maintaining stable weight, and avoiding pregnancy after the procedure all extend results." },
        { question: "What's the difference between donut, lollipop, and anchor lift?", answer: "Donut (circumareolar) for mild ptosis: incision around the areola only. Lollipop (vertical) for moderate: adds a vertical line from areola to crease. Anchor (Wise pattern) for severe: adds a horizontal incision in the breast crease. Your degree of sag determines which is appropriate; mild ptosis doesn't need anchor scars." },
    ],
    "mommy-makeover": [
        { question: "When can I have a mommy makeover after pregnancy?", answer: "Wait at least 6 months postpartum for full hormonal recovery and stable weight. If breastfeeding, wait 6 months after weaning before breast surgery to allow glandular tissue to involute. Most surgeons want patients within 10-15 lbs of their target weight before scheduling." },
        { question: "Can I have more children after mommy makeover?", answer: "Medically yes, but doing so will reverse most of the abdominal results: pregnancy stretches skin and separates muscles again. Most plastic surgeons recommend completing your family before mommy makeover to avoid wasting the investment. The breast results are more durable through future pregnancies." },
        { question: "How long is recovery for combined procedures?", answer: "2-3 weeks before light activity, 6-8 weeks before exercise. Plan for childcare help for at least the first 2 weeks since lifting children >10 lbs is restricted. Many patients schedule the procedure during a partner's vacation or arrange grandparent help." },
    ],
    cryolipolysis: [
        { question: "How does CoolSculpting actually work?", answer: "Controlled cooling at -10°C selectively damages fat cells (which are more cold-sensitive than skin, nerves, or muscle), triggering apoptosis (programmed cell death). Over 2-4 months, the body's lymphatic system clears the dead fat cells permanently. Results are subtle (~20-25% reduction per session) but lasting." },
        { question: "How many CoolSculpting sessions will I need?", answer: "Most patients see meaningful change after 2-3 sessions per area, spaced 4-6 weeks apart. Some areas (flanks, lower abdomen) respond well to single sessions; others (thighs, back rolls) typically need 3+. Visible improvement appears at 6-8 weeks; full results take 4 months." },
        { question: "Is CoolSculpting safe?", answer: "FDA-cleared for multiple body areas with extensive safety data. The most-discussed risk is paradoxical adipose hyperplasia (PAH): fat enlargement instead of reduction in the treated area, occurring in roughly 1 in 1,000 cases (more common in men, larger applicators). Choose providers who track and disclose this complication." },
    ],
    hifu: [
        { question: "How is HIFU different from a surgical facelift?", answer: "HIFU stimulates collagen at the SMAS layer (the same tissue surgeons tighten) using focused ultrasound: no incisions, no recovery. Results are subtler (~30-40% of surgical lift) and last 12-18 months. Best for mild-to-moderate laxity in patients aged 35-65. Severe laxity still needs surgery." },
        { question: "Does HIFU hurt?", answer: "Modern devices have variable energy levels. Most patients describe deep, sharp heat sensations at SMAS depth, uncomfortable but tolerable. Topical anesthesia or oral pain medication is sometimes used. Lower-energy devices (Sofwave, Liftera) are more comfortable but slightly less aggressive." },
        { question: "When will I see HIFU results?", answer: "Some immediate tightening from initial collagen contraction. Full results emerge over 3-6 months as new collagen forms. Results last 12-18 months and can be repeated annually. Many patients combine HIFU with botox and filler for comprehensive non-surgical rejuvenation." },
    ],
    emsculpt: [
        { question: "Can Emsculpt replace going to the gym?", answer: "Emsculpt builds muscle and reduces fat in treated areas but doesn't replicate the cardiovascular, metabolic, or lifestyle benefits of exercise. Best as a complement to a fitness routine, particularly for areas resistant to conventional training (lower abs, glutes, etc.), not a replacement." },
        { question: "How permanent is Emsculpt?", answer: "Built muscle and reduced fat are permanent if maintained, but, like exercise gains, they reverse without ongoing stimulation. Most patients need maintenance sessions every 3-6 months to retain results. Without them, muscle mass returns to baseline within 6-12 months." },
        { question: "Who is NOT a candidate for Emsculpt?", answer: "Pregnant women, patients with cardiac pacemakers or metal implants near the treatment area, those with hernias or muscle injuries, and patients with significantly excess weight (BMI >30): Emsculpt is for body sculpting, not weight loss. Always disclose all medical implants before treatment." },
    ],
    microneedling: [
        { question: "How is microneedling different from lasers?", answer: "Both stimulate collagen, but microneedling uses mechanical micro-injuries while lasers use thermal energy. Microneedling is safer in darker skin (lower hyperpigmentation risk), cheaper per session, and has shorter downtime, but lasers achieve more dramatic results in fewer sessions for severe concerns. Often used in combination." },
        { question: "How many microneedling sessions will I need?", answer: "3-6 sessions spaced 4-6 weeks apart for most concerns. Acne scars typically need 6+ sessions. Results continue improving for 3-6 months after the final session as collagen remodels. Maintenance sessions every 6-12 months extend results." },
        { question: "Can I do microneedling at home?", answer: "Home dermal rollers (with needle depth <0.5mm) can improve product penetration and minor texture concerns. Anything deeper requires medical-grade equipment, sterilization, and training: DIY deep needling carries real infection risk. For acne scars or significant aging, see a professional." },
    ],
    "neck-lift": [
        { question: "Do I need a neck lift or a facelift?", answer: "If your concerns are isolated below the jaw (turkey wattle, double chin, neck bands), a standalone neck lift is appropriate. If you also have midface aging (deep nasolabial folds, jowls), a combined facelift+necklift gives more harmonious results. Treating only the neck on a face with significant midface aging can create disparity." },
        { question: "How long do neck lift results last?", answer: "8-12 years on average. Results don't 'reverse' but the face continues aging normally. Patients in their 50s can expect to look 10-15 years younger; aging from that new baseline begins immediately. Sun protection, weight stability, and skincare extend results." },
        { question: "What's the recovery like?", answer: "10-14 days before returning to work and social activity. Bruising and swelling for 2-3 weeks. Full activity at 4-6 weeks. Most patients can hide residual signs with hair/clothing within 2 weeks. Final results emerge as swelling fully resolves over 3-6 months." },
    ],
    otoplasty: [
        { question: "What age can a child have otoplasty?", answer: "Most surgeons start at age 5-6 once cartilage has fully developed. Early intervention (before school-age teasing begins) often provides significant psychological benefit. The procedure is identical for adults (anatomy is the same), so adult otoplasty is equally effective for those who didn't have it as children." },
        { question: "How long do otoplasty results last?", answer: "Permanent in most cases. Cartilage remodels into its new shape and stays there. Recurrence (~5-10% of cases) typically occurs in the first 6 months as sutures heal. Once healed, the new ear position is essentially permanent, unaffected by aging or weight changes." },
        { question: "Will the scars be visible?", answer: "All incisions are placed behind the ear in the natural fold and become essentially invisible to anyone not specifically looking for them. Even patients with short hair don't have visible scars. The procedure is one of the few cosmetic surgeries where 'no one will notice' is realistic." },
    ],
    labiaplasty: [
        { question: "What's the difference between trim and wedge labiaplasty?", answer: "Trim (linear excision) removes excess tissue along the labial edge: straightforward, predictable. Wedge resection removes a V-shaped section preserving the natural edge: more natural-looking and better for sensation, but technically more demanding. Both work; surgeon experience with the chosen technique matters more than the technique itself." },
        { question: "When can I have sex after labiaplasty?", answer: "Pelvic rest for 6-8 weeks. Resuming intercourse before complete healing risks wound dehiscence (re-opening). Most patients return to full sexual activity at 8 weeks with no lasting impact on sensation. Discuss specific timeline with your surgeon based on healing progress." },
        { question: "Will labiaplasty change my sexual sensation?", answer: "Properly performed (especially wedge technique), labiaplasty preserves all sensation. Some patients report improved sensation post-recovery as physical discomfort during intercourse resolves. Risk of decreased sensation is small but real with aggressive trim technique: choose a surgeon experienced in nerve-preserving approaches." },
    ],
    "tattoo-removal": [
        { question: "How many laser sessions to remove a tattoo?", answer: "Professional tattoos typically need 6-12 sessions; amateur tattoos clear in 4-8. Black ink clears fastest; green/yellow are most stubborn. Picosecond lasers reduce session counts by ~30% vs older Q-switched. Sessions are spaced 6-8 weeks apart to allow lymphatic clearance between treatments." },
        { question: "Is laser tattoo removal painful?", answer: "Most patients describe it as more painful than getting the tattoo, sharp, hot snapping sensation. Modern laser providers use topical numbing and skin cooling. Pain tolerance varies dramatically; some patients tolerate sessions easily, others require local anesthetic injection. Larger or older tattoos hurt less than fresh, dense ones." },
        { question: "Will the tattoo be completely gone?", answer: "Most professional tattoos can be cleared 95%+. Some pigments (white, yellow, neon) cannot be fully removed with current technology. Cover-up tattoos (tattooed over older ink) are particularly stubborn. A 2-3-session 'fading' to enable a future cover-up is faster than complete removal." },
    ],
    "laser-hair-removal": [
        { question: "Is laser hair removal really permanent?", answer: "More accurate term: permanent hair reduction. Most patients see 80-95% permanent reduction; some hairs (light, fine) don't respond and remain. Hormonal changes (puberty, pregnancy, menopause) can stimulate new growth from previously dormant follicles, requiring touch-up sessions. Annual maintenance is common for long-term results." },
        { question: "Does laser hair removal work on dark skin?", answer: "Yes, with the right device. Nd:YAG (1064nm) wavelength is safe for Fitzpatrick V-VI skin. Older alexandrite lasers (755nm) carry burn/pigmentation risk in darker skin. Always verify your provider uses skin-tone-appropriate technology: wrong wavelength on dark skin causes serious damage." },
        { question: "Why doesn't laser work on blonde or grey hair?", answer: "Lasers target melanin in the hair follicle. Blonde, red, grey, and white hair contain insufficient melanin: laser energy passes through without absorption. Electrolysis is the only effective option for non-melanated hair, treated one follicle at a time." },
    ],
    hydrafacial: [
        { question: "How is HydraFacial different from a regular facial?", answer: "HydraFacial uses a vacuum-tip device that simultaneously cleanses, exfoliates, extracts, and infuses serums in one session: automated and standardized vs the manual variations of traditional facials. Medical-grade serums penetrate deeper through freshly cleared pores. Results are visible immediately with zero downtime." },
        { question: "How often should I get HydraFacials?", answer: "Monthly for sustained results: the skin's natural renewal cycle. More frequent treatments (every 2 weeks) before major events boost glow but aren't necessary for maintenance. Many practices offer membership programs for regular monthly treatment at reduced cost." },
        { question: "Can HydraFacial replace other skincare treatments?", answer: "It's a maintenance/glow treatment, not a replacement for collagen-stimulating procedures (microneedling, lasers, RF) or volumizing treatments (filler, biostimulators). Best when combined into a comprehensive plan: HydraFacial monthly, more aggressive treatments quarterly or annually." },
    ],
    "masseter-botox": [
        { question: "How quickly will my jaw look slimmer?", answer: "Initial muscle relaxation begins 2-3 days after injection. Visible slimming starts at 2-3 weeks. Maximum effect at 4-8 weeks once the muscle has atrophied from disuse. Photos at the 8-week mark show the full result. The change is gradual and natural-looking; others won't notice the day-to-day transition." },
        { question: "Will masseter botox affect my chewing?", answer: "Properly dosed (20-30 units per side), normal chewing function is preserved. Patients report easier chewing as TMJ tension and clenching reduce. Excessive doses (>40 units per side) can weaken chewing temporarily. The treatment is widely used and chewing complications are rare with experienced injectors." },
        { question: "Will my jaw look bigger if I stop the treatments?", answer: "If you stop, the muscle gradually returns to its previous size over 6-9 months. It does NOT grow larger than baseline. Many patients use masseter botox for 1-2 years, then stop without dramatic rebound. The treated muscle never grows back larger than it was originally." },
    ],
    profhilo: [
        { question: "How is Profhilo different from regular filler?", answer: "Filler adds volume in a specific spot via gel that holds its shape. Profhilo spreads through the dermis as a hydrating bio-remodeller, improving overall skin quality (hydration, elasticity, texture) without adding visible volume. Different category, different result. Many patients use both: Profhilo for skin quality, filler for volume restoration." },
        { question: "When will I see Profhilo results?", answer: "Subtle hydration improvement within 1-2 weeks. Visible elasticity improvement at 4-6 weeks. Full results emerge at 8-10 weeks after the second session. Effects last 6-9 months; annual maintenance (2 sessions) is the typical protocol." },
        { question: "Is Profhilo painful?", answer: "Each session uses only 5 injection points per side (vs 20-30+ for traditional filler): quick, minimal discomfort. Topical anesthesia eliminates most sensation. Mild swelling at injection points for 1-2 days is typical. The 'BAP' (Bio-Aesthetic Points) technique was specifically designed to minimize injection-related discomfort." },
    ],
    bbl: [
        { question: "How safe is a Brazilian Butt Lift in 2026?", answer: "BBL safety has improved dramatically since the early 2010s when fat embolism mortality rates were alarmingly high. Modern surgeons use ultrasound guidance to ensure subcutaneous-only fat injection (never intramuscular), reducing fat embolism risk by 95%+. Always verify your surgeon uses real-time ultrasound during fat transfer: this is the single most important safety factor." },
        { question: "How much fat do I need for a BBL?", answer: "Typical BBL transfers 600-1,200cc per buttock (1,200-2,400cc total), with 30-40% absorbed in the first 6 months. Patients with limited donor fat (BMI under 22) may not be candidates for dramatic projection; supplemental volume from skin tightening or implants may be needed. Most patients are between BMI 24-32 for ideal donor availability." },
        { question: "How long until I can sit normally after BBL?", answer: "Strict no-sitting protocol for 2 weeks (use a BBL pillow that supports thighs, leaving buttocks suspended), then progressive sitting from weeks 2-8. Direct buttock pressure crushes newly transferred fat cells before they establish blood supply, reducing graft survival from ~70% to under 40%. Working from home or remote arrangements are essential during recovery." },
    ],
    "buccal-fat-removal": [
        { question: "Will buccal fat removal age my face?", answer: "This is the most-discussed concern. Buccal fat pads naturally shrink with age: removing them in your 20s can cause more pronounced hollowing in your 40s-50s. Patients with naturally thin faces, prominent cheekbones, or low BMI should reconsider. Best candidates have a genuinely full lower-face appearance that resists weight loss; the procedure is permanent." },
        { question: "How long does the result last?", answer: "Permanent: once removed, buccal fat does not regenerate. The visible 'sculpted' result emerges over 3-6 months as swelling resolves. Some natural facial volume loss with aging will continue normally, which is why over-aggressive removal in young patients is the most common regret." },
        { question: "What's the recovery like?", answer: "1-2 weeks of significant cheek swelling. Soft food only for 5-7 days. All incisions are inside the mouth, no visible scars. Most patients return to work in 7-10 days. Final shape emerges at 3-6 months. Discomfort is moderate: most patients use only over-the-counter pain relief after day 2." },
    ],
    "v-line-contouring": [
        { question: "What is the difference between V-line and jaw shaving?", answer: "V-line surgery is a comprehensive procedure that reshapes the entire lower face: jaw angle reduction, chin narrowing (often genioplasty), and sometimes jaw front recontouring, creating a tapered V from cheekbones to chin. Jaw shaving is just one component (jaw angle reduction). True V-line addresses the full lower-face proportion, not just one area." },
        { question: "How risky is V-line surgery?", answer: "V-line is one of the more invasive cosmetic procedures: it involves cutting and removing portions of the mandible (jawbone) under general anesthesia. Risks include nerve injury (numbness, motor weakness), bleeding, asymmetry, and prolonged swelling. Korean board-certified plastic surgeons with high V-line volume have the best safety records: case volume matters more than country choice." },
        { question: "How long is V-line recovery?", answer: "1-2 weeks of significant swelling and limited jaw movement. 4-6 weeks before normal social appearance. 3-6 months for full bone healing and final contour to emerge. You'll need a soft/liquid diet for 2-3 weeks. Most international patients plan 14-21 days in Korea minimum, with follow-ups via telehealth after returning home." },
    ],
    "dental-implants": [
        { question: "How long do dental implants last?", answer: "Properly placed implants in healthy bone last 25+ years, often a lifetime. The titanium post itself rarely fails after osseointegration. The crown attached to it may need replacement every 15-20 years from normal wear. Smoking, uncontrolled diabetes, and poor oral hygiene are the primary causes of implant failure." },
        { question: "How long does the implant process take?", answer: "Traditional implants: 4-6 months from extraction to final crown (extraction → 3-month bone healing → implant placement → 3-month osseointegration → crown). Same-day implants ('teeth in a day' / All-on-4): immediate placement and temporary teeth attached the same day, with permanent restoration at 4-6 months. Bone grafting adds 4-6 months." },
        { question: "Are dental implants worth the cost?", answer: "Per year of service, implants are typically the most cost-effective tooth replacement. A $4,000 implant lasting 25 years costs $160/year. A $1,500 bridge needing replacement every 10-15 years and damaging adjacent teeth costs more long-term. Implants don't decay and preserve jaw bone; bridges and dentures don't. Most patients who can afford the upfront cost prefer them." },
    ],
    invisalign: [
        { question: "How is Invisalign different from braces?", answer: "Invisalign uses 20-50 clear plastic aligner trays, each worn 1-2 weeks, gradually moving teeth. Braces use bonded brackets and wires, adjusted monthly. Invisalign is removable (eat normally, brush easily), nearly invisible, and typically 6-18 months. Braces are fixed, more visible, but better for severe complex cases (large rotations, vertical movements, severe crowding)." },
        { question: "How long does Invisalign take?", answer: "Mild cases: 6 months. Moderate cases: 12-18 months. Complex cases: 18-24 months. Wear discipline matters enormously: Invisalign requires 22 hours/day wear. Patients who only wear them 16-18 hours add 6-12 months to their treatment time. Following the protocol exactly is the difference between 12-month treatment and 24-month treatment." },
        { question: "Will I need to wear retainers forever?", answer: "Yes. Teeth naturally drift back toward their original positions throughout life: this is true after any orthodontic treatment, braces or Invisalign. Most patients wear nightly retainers indefinitely. Skipping retainers for even a few months can cause noticeable relapse. Vivera or Essix retainers are typical post-Invisalign and need replacement every 2-3 years." },
    ],
    microblading: [
        { question: "How long does microblading last?", answer: "Average 1-3 years before significant fading. Oily skin holds pigment poorly (sometimes only 12 months); dry skin retains best (up to 3 years). A touch-up at 6-8 weeks after initial treatment is standard. Annual touch-ups maintain crisp results. The 'permanent makeup' label is misleading: microblading is semi-permanent and fades naturally." },
        { question: "Does microblading hurt?", answer: "Topical numbing cream is applied before and during the procedure. Most patients describe it as mild discomfort, a scratching sensation rather than pain. The 2-hour session is completed in stages with reapplication of numbing cream. Patients with sensitive skin or low pain tolerance can request additional numbing. Brief pinch-like sensations occur at hair-thin stroke depth." },
        { question: "Will my brows turn red, orange, or grey over time?", answer: "Color shifts depend on pigment quality and skin chemistry. Quality iron oxide pigments fade evenly without color shift. Older or low-quality pigments can shift to red/orange (warm tones fade unevenly) or blue/grey (carbon-based pigments). Always verify your artist uses fade-tested, modern pigments. Color-corrected touch-ups can fix unwanted shifts." },
    ],
    "mole-removal": [
        { question: "Should my mole be checked before removal?", answer: "Always. Any mole being removed should be examined by a dermatologist first, and if there's any concern about melanoma, it must be excised completely (not shave-removed) and sent to pathology. Cosmetic-only removal is appropriate only for moles confirmed benign. Skipping the dermatology check on an unusual mole is a serious error: early melanoma is curable; missed melanoma is not." },
        { question: "Will mole removal leave a scar?", answer: "Some scarring is unavoidable but technique determines visibility. Shave excision (for raised benign moles) often leaves only minor pigmentation change. Punch excision (small flat moles) leaves a small round scar. Elliptical excision (larger moles, suspicious lesions) leaves a thin linear scar 2-3x the mole's diameter. Laser removal works only for shallow surface moles and risks recurrence." },
        { question: "Will the mole grow back?", answer: "Properly removed moles do not return: the entire melanocyte cluster has been excised. Recurrence indicates incomplete removal (more common with laser/cosmetic-only methods, rare with surgical excision). Recurrent moles should be biopsied: recurrence after surgical excision can rarely indicate transformation and warrants pathology review." },
    ],
    septoplasty: [
        { question: "Is septoplasty the same as rhinoplasty?", answer: "Different procedures with different goals. Septoplasty is a functional surgery that straightens a deviated septum to improve breathing, no aesthetic change. Rhinoplasty reshapes external nose appearance. Septorhinoplasty combines both. Insurance often covers septoplasty (medical necessity); rhinoplasty alone is rarely covered. Many patients combine them when both are indicated." },
        { question: "How do I know if I need septoplasty?", answer: "Symptoms include chronic nasal obstruction (especially one-sided), recurrent sinusitis, snoring/sleep apnea worsened by congestion, frequent nosebleeds, and inability to breathe through the nose during exercise. Diagnosis requires nasal endoscopy and sometimes CT imaging. Many patients have deviated septums asymptomatically: surgery is only indicated when symptoms are bothersome." },
        { question: "What's the recovery from septoplasty?", answer: "1-2 weeks before returning to work (longer if combined with rhinoplasty). No nasal blowing for 7-10 days. Internal splints removed at 1-2 weeks. Full breathing improvement emerges at 4-6 weeks as internal swelling resolves. Pain is generally mild compared to rhinoplasty since no external structures are altered. Most patients report dramatic breathing improvement once healed." },
    ],
    "lip-flip": [
        { question: "What is the difference between lip flip and lip filler?", answer: "Lip flip uses 4-6 units of botox to relax the upper lip muscle, causing the upper lip to roll outward and appear fuller, no actual volume added. Lip filler injects hyaluronic acid gel for true volume increase. Lip flip is subtle (~10-15% increase in upper lip showing); filler creates dramatic change. Lip flip costs ~$80-150; filler ~$600-900. Many patients use both." },
        { question: "How long does a lip flip last?", answer: "8-12 weeks, significantly shorter than other botox uses (3-4 months) because the lip muscle is highly active. Most patients refresh quarterly. The brief duration makes it a low-commitment way to test if you like a fuller lip look before committing to filler. The treatment 'wears off' gradually; there's no abrupt return to baseline." },
        { question: "Will lip flip affect my smile?", answer: "Properly dosed (4-6 units total), normal smile and speech are preserved. Excessive doses (>10 units) can weaken upper lip movement, causing temporary speech changes ('s' sounds), drinking from a straw issues, or asymmetric smile. Always start conservatively with a new injector. Effects fully resolve as the botox wears off." },
    ],
    kybella: [
        { question: "How is Kybella different from CoolSculpting on the chin?", answer: "Kybella injects deoxycholic acid that chemically destroys fat cells under the chin. CoolSculpting uses cooling applicators. Kybella requires 2-4 sessions spaced 4-6 weeks apart with significant swelling for 1-2 weeks per session. CoolSculpting requires 1-2 sessions with minimal downtime. Kybella achieves more dramatic results in stubborn fat; CoolSculpting is gentler. Both produce permanent fat loss in treated cells." },
        { question: "How much swelling should I expect from Kybella?", answer: "Significant: patients are often surprised. Day 1-3: severe 'bullfrog'-like neck swelling. Days 4-10: gradual reduction. Days 10-21: residual mild fullness. Most patients need 1-2 days off work after each session. Plan sessions away from major events. The swelling indicates the medication is working as fat cells dissolve." },
        { question: "Are Kybella results permanent?", answer: "Yes, destroyed fat cells do not regenerate. The treated double chin will not return unless you gain significant weight (which expands remaining fat cells). Most patients are satisfied with 2-3 sessions and don't need maintenance. Significant weight fluctuations after treatment can affect results over time." },
    ],
    sculptra: [
        { question: "How is Sculptra different from regular filler?", answer: "Sculptra (poly-L-lactic acid) is a collagen biostimulator: it doesn't add immediate volume, it stimulates your body to produce its own collagen over 3-6 months. Hyaluronic acid fillers (Restylane, Juvederm) add immediate visible volume. Sculptra results are gradual, natural-looking, and last 2-3 years. HA fillers last 6-18 months. Sculptra is better for overall facial volume restoration; HA for targeted spots." },
        { question: "How many Sculptra sessions do I need?", answer: "Typical protocol is 2-4 sessions spaced 4-6 weeks apart. Mild volume loss: 2 sessions. Moderate: 3 sessions. Severe (significant aging or weight loss): 4 sessions. Each session uses 1-2 vials. Results emerge gradually over 3 months per session, so the full transformation takes 6-9 months from first treatment." },
        { question: "How long do Sculptra results last?", answer: "2-3 years on average, significantly longer than HA fillers. Some patients see results lasting 4+ years. Maintenance is typically 1 vial annually after the initial protocol. Because it stimulates your own collagen, the result ages naturally with you (unlike static filler placement)." },
    ],
    "chemical-peels": [
        { question: "What's the difference between superficial, medium, and deep peels?", answer: "Superficial (glycolic, lactic, salicylic acid): mild brightening, no real downtime, treats surface dullness; every 4-6 weeks. Medium (TCA, Jessner's): treats fine lines, mild scarring, sun damage; 7-10 days of peeling, every 6-12 months. Deep (phenol-croton oil): dramatic results for deep wrinkles and scars; 2-3 week recovery, once-in-a-lifetime treatment. Choice depends on goals and recovery tolerance." },
        { question: "Are chemical peels safe for darker skin?", answer: "Superficial peels (glycolic, lactic) are safe for all skin tones. Medium and deep peels carry significant post-inflammatory hyperpigmentation risk in Fitzpatrick IV-VI skin. TCA peels above 20% concentration are generally avoided in darker skin. Pre-treatment with hydroquinone for 4-6 weeks reduces risk. An experienced provider familiar with darker skin is essential; not all dermatologists are." },
        { question: "How often should I get chemical peels?", answer: "Superficial: every 4-6 weeks for active treatment, then quarterly for maintenance. Medium: 6-12 months between treatments. Deep: typically once in a lifetime. Most patients use a combination: superficial peels regularly plus a medium peel annually. Always wear SPF 30+ daily for at least 6 months after any medium or deep peel." },
    ],
    "laser-resurfacing": [
        { question: "What's the difference between fractional and fully ablative lasers?", answer: "Fully ablative (CO2, Erbium): vaporizes entire skin surface; dramatic results for deep wrinkles and scars, but 10-14 days raw recovery and weeks of redness. Fractional ablative: same lasers in pixelated columns, leaving healthy tissue between; 70% the result with 30% the downtime (5-7 days). Non-ablative fractional (Fraxel): no skin removal, gentler, 3-5 sessions needed for results. Choice depends on severity and recovery tolerance." },
        { question: "How long is laser resurfacing recovery?", answer: "Fully ablative CO2: 10-14 days of raw, weeping skin; 2-4 weeks of redness; 3-6 months for redness to fully fade. Fractional CO2: 5-7 days of swelling and crusting; 2 weeks of pinkness. Non-ablative fractional: 1-3 days of redness and mild swelling. Plan ablative treatment during winter: sun exposure must be avoided for 6+ months." },
        { question: "Is laser resurfacing safe for darker skin?", answer: "Ablative lasers (especially CO2) carry significant hyperpigmentation risk in Fitzpatrick IV-VI skin. Non-ablative fractional lasers are safer with proper settings. Nd:YAG-based devices are the safest laser option for darker skin. Always work with a provider who routinely treats darker skin tones: laser settings designed for fair skin can cause permanent damage on darker skin." },
    ],
    "fat-grafting": [
        { question: "How much of the transferred fat survives?", answer: "Typically 50-70% of transferred fat survives long-term. The rest is reabsorbed in the first 3-6 months. Surgeons compensate by overcorrecting (transferring 30-40% more than the desired final volume). Multiple sessions can build cumulative volume. Survival rates depend on harvest technique, processing method, and recipient site blood supply." },
        { question: "How long do fat grafting results last?", answer: "Permanent: once fat cells establish blood supply at the recipient site, they behave like native fat. Major weight changes affect them: weight gain expands transferred fat; weight loss shrinks it. Aging-related natural volume loss continues. Most patients see lasting results 10+ years out. Touch-up sessions can address asymmetry or volume loss." },
        { question: "What's the recovery like for fat grafting?", answer: "Donor site (where fat was harvested) often hurts more than the recipient site: bruising and tenderness for 2-3 weeks. Recipient swelling lasts 4-6 weeks; final shape emerges at 3-6 months. Compression garments are worn for 4-6 weeks at the donor site. Most patients return to work in 7-10 days; exercise resumes at 4-6 weeks." },
    ],
    "lip-lift": [
        { question: "What is a lip lift and who is a candidate?", answer: "A surgical lip lift removes a small strip of skin between the nose base and upper lip, reducing the philtrum length and exposing more of the upper lip. Best candidates have a long upper lip (>2cm from nose to lip), reduced upper lip show when smiling, or naturally aged upper lip. Younger patients with naturally short philtrums are not candidates." },
        { question: "How is lip lift different from lip filler?", answer: "Lip lift surgically reshapes: lifting and exposing more lip vermillion permanently. Filler adds volume to the existing lip. Lip lift creates the youthful proportion that filler can't replicate; filler creates fullness that lift can't. Many patients combine both: lift first to set proportions, then filler for additional volume. Lift is permanent; filler lasts 6-12 months." },
        { question: "Will I have a visible scar after lip lift?", answer: "The incision is hidden in the natural crease where the nose meets the upper lip and typically heals to a barely-perceptible line. Most patients report no one notices the scar after 3-6 months. Heavy makeup users can completely conceal residual marks. Poor wound healing or wider scars are uncommon but possible: choose surgeons with high lip lift volume." },
    ],
    "gummy-smile": [
        { question: "What causes a gummy smile?", answer: "Multiple causes: hyperactive upper lip muscles (most common, fixed with botox), excessive vertical maxillary growth (genetic, requires LeFort I osteotomy in severe cases), short upper lip (length deficiency), or dental issues like delayed eruption. Identifying the cause determines treatment: botox for muscle, surgery for bone, gum contouring for dental. Most cases respond to non-surgical options." },
        { question: "How long does botox for gummy smile last?", answer: "3-4 months typically. The treatment relaxes the levator labii muscle that elevates the upper lip during smiling. Effects emerge 3-7 days post-injection. Maintenance every 3-4 months. Total cost is low (5-10 units, ~$50-100 per treatment). Patients with severe gummy smiles may benefit from combining botox with gum contouring or veneers." },
        { question: "What is gum contouring and is it permanent?", answer: "Gum contouring (gingivectomy) reshapes the gum line by removing excess tissue, exposing more tooth surface. Done with laser or scalpel. Results are permanent. Best for patients whose gums cover too much tooth (creating short-looking teeth), different from a true gummy smile where the upper lip rises too high. Often combined with veneers for comprehensive smile design." },
    ],
    "eyelash-extensions": [
        { question: "How long do eyelash extensions last?", answer: "Individual lashes last 6-8 weeks (the natural lash growth cycle), but you'll need fills every 2-3 weeks to replace shed lashes and maintain a full look. Without fills, the look gradually thins as natural lashes shed. With consistent fills, extensions can be maintained continuously for years. Removal restores natural lashes within the next growth cycle." },
        { question: "Will eyelash extensions damage my natural lashes?", answer: "Properly applied extensions (one extension per natural lash, weight matched to natural lash strength) cause no damage. Damage occurs from: extensions too heavy/long for the natural lash, clusters bonded to multiple lashes (preventing natural shedding), poor adhesive technique, or rubbing/picking at extensions. Choose certified lash artists who individually isolate each natural lash." },
        { question: "Can I wear makeup with eyelash extensions?", answer: "Most makeup is fine, except oil-based products (waterproof mascara, oil-based makeup remover) which break down the adhesive. Use oil-free cleansers and water-based products. Powder eyeshadow is fine; cream eyeshadow with high oil content can compromise bond longevity. Most patients skip mascara entirely with extensions since the look is already enhanced." },
    ],
    "ipl-photofacial": [
        { question: "What does IPL treat?", answer: "IPL (Intense Pulsed Light) targets brown spots (sun damage, age spots), broken capillaries, redness/rosacea, and overall tone unevenness. It does NOT treat texture, deep wrinkles, or scars; those need lasers or microneedling. IPL is a tone treatment, not a texture treatment. Most patients combine IPL with collagen-stimulating treatments for comprehensive rejuvenation." },
        { question: "How many IPL sessions do I need?", answer: "Most patients need 3-5 sessions spaced 4 weeks apart for optimal results. Significant sun damage may require 5-6 sessions. Maintenance every 6-12 months keeps results. Visible improvement after each session: brown spots darken initially, then flake off in 7-10 days revealing clearer skin underneath." },
        { question: "Is IPL safe for darker skin?", answer: "IPL can cause hyperpigmentation, burns, or hypopigmentation in Fitzpatrick IV-VI skin; it's generally avoided. Lasers like Nd:YAG (1064nm) are safer alternatives for darker skin. Always verify your provider routinely treats your skin tone. If you're Fitzpatrick III or darker and offered IPL, get a second opinion: there are safer options for the same concerns." },
    ],
    "gynecomastia-surgery": [
        { question: "What causes gynecomastia and is surgery the only option?", answer: "Gynecomastia (enlarged male breasts) results from hormonal imbalance, certain medications (anabolic steroids, anti-androgens), genetics, or excess fat (pseudo-gynecomastia). Pseudo-gynecomastia responds to weight loss. True gynecomastia (glandular tissue) doesn't respond to exercise or diet. Hormonal causes need medical evaluation first. Persistent gynecomastia after correcting underlying causes requires surgery." },
        { question: "What does gynecomastia surgery involve?", answer: "Combines liposuction (for excess fat) and direct gland excision (for glandular tissue). Severity grades (Simon classification I-IV) determine technique: mild cases need only liposuction; severe cases require skin excision. Procedure takes 1-2 hours under general anesthesia. Most patients return to work in 1 week, exercise at 4-6 weeks. Compression garment for 4-6 weeks." },
        { question: "Will gynecomastia come back after surgery?", answer: "Properly performed gland excision permanently removes the glandular tissue; it does not regrow. Recurrence usually indicates incomplete initial removal or new tissue growth from anabolic steroid use, hormone replacement therapy, or significant weight gain. Avoiding anabolic steroids is critical for sustained results; many recurrences are steroid-induced." },
    ],
    radiesse: [
        { question: "How is Radiesse different from hyaluronic acid fillers?", answer: "Radiesse is calcium hydroxylapatite (CaHA): it provides immediate volume AND stimulates collagen production over 6-12 months. Lasts 12-18 months (longer than most HA fillers). Cannot be dissolved with hyaluronidase if results are unwanted. Best for cheek volume, jawline contouring, and deep nasolabial folds. Not used in lips (too firm). HA fillers are reversible and softer; Radiesse is firmer and lasts longer." },
        { question: "Where should Radiesse be used?", answer: "Best for deep tissue support: cheekbones, jawline, hand rejuvenation, deep nasolabial folds, marionette lines. Avoided in lips (too firm), tear troughs (lump risk), and superficial dermal placement (visible nodules). Works best in stable anatomical areas where its longevity is an advantage and its firmness creates structural support." },
        { question: "Can Radiesse be reversed?", answer: "Unlike HA fillers, there is no enzyme that dissolves Radiesse; it cannot be quickly reversed. Unwanted results require waiting 12-18 months for natural absorption, dilution with saline injections (limited effect), or surgical excision (rarely needed). This is why Radiesse should only be used by experienced injectors and patients should be confident in their treatment goals before injection." },
    ],
    "prp-hair": [
        { question: "Does PRP actually regrow hair?", answer: "PRP (platelet-rich plasma) stimulates existing miniaturized follicles to produce thicker, longer hairs; it does not regrow follicles that are completely dead. Best for early-to-moderate androgenic alopecia, post-transplant healing acceleration, and women with diffuse thinning. Patients with advanced baldness (Norwood 5+) get minimal benefit. Studies show 30-40% increase in hair density when responders complete the full protocol." },
        { question: "How many PRP sessions do I need?", answer: "Initial protocol: 3-4 monthly sessions. Maintenance: every 4-6 months indefinitely. Skipping maintenance reverses gains within 9-12 months. Total first-year cost is typically $1,500-$3,000. Some clinics combine PRP with exosomes or microneedling for synergistic effects. Visible results emerge at month 3-4; peak results at 6-9 months." },
        { question: "Is PRP painful?", answer: "Topical anesthesia and ice make injections tolerable. Most patients describe a tight, pinching sensation rather than sharp pain. Microneedling-delivered PRP (no injections) is gentler. Bruising and tenderness for 24-48 hours is typical. The blood draw is the most uncomfortable part for needle-averse patients. Most return to normal activity immediately." },
    ],
    "prp-facial": [
        { question: "What is a 'vampire facial' and how does it work?", answer: "PRP facial (the 'vampire facial' nickname) combines microneedling with platelet-rich plasma derived from your own blood. The growth factors in PRP, delivered through microneedling channels, accelerate healing and stimulate collagen production. Different from PRP injections: facial uses topical PRP via microneedling rather than direct injection. Most popular for skin texture, fine lines, and acne scars." },
        { question: "How is PRP facial different from regular microneedling?", answer: "Regular microneedling triggers collagen via mechanical injury alone. PRP-enhanced microneedling adds growth factors that accelerate the healing response and amplify collagen stimulation. Studies show 30-40% better outcomes vs microneedling alone for acne scars and fine lines. Cost is roughly 2x regular microneedling but with proportionally better results." },
        { question: "How long do PRP facial results last?", answer: "Results emerge over 4-6 weeks as new collagen forms and continue improving for 3-6 months. Full protocol is 3-6 sessions spaced 4 weeks apart. Results last 12-18 months; annual maintenance recommended. Best results in patients aged 30-55 with mild-to-moderate concerns. Severe scarring or deep wrinkles may need fractional CO2 laser instead." },
    ],
    "thigh-lift": [
        { question: "When is a thigh lift necessary?", answer: "After significant weight loss (50+ lbs or post-bariatric surgery) or major aging-related skin laxity. The procedure removes excess skin from inner or outer thighs, often combined with liposuction. Patients within 15 lbs of stable target weight are best candidates. Liposuction alone is insufficient when significant skin redundancy is present: the skin won't retract over emptied fat space." },
        { question: "Will I have visible scars after thigh lift?", answer: "Yes, there's no way to remove excess thigh skin without scars. Inner thigh lift scars run along the groin crease (mostly hidden by underwear). Vertical thigh lift adds an inner-thigh vertical scar (necessary for severe laxity). Scars fade significantly over 12-18 months but never disappear completely. Most patients accept the trade-off for the contour improvement." },
        { question: "How long is thigh lift recovery?", answer: "1-2 weeks of significant swelling and limited mobility. Most patients return to desk work in 2 weeks. Exercise resumes at 6-8 weeks. Compression garments worn for 4-6 weeks. Final contour emerges at 3-6 months. The inner thigh area is mobile so healing requires more activity restriction than other body lifts. Walking is encouraged from day 1 to prevent blood clots." },
    ],
    brachioplasty: [
        { question: "What is brachioplasty and who needs it?", answer: "Brachioplasty (arm lift) removes excess skin and fat from the upper arms, the 'bat wing' appearance. Best candidates have significant skin laxity from weight loss or aging that liposuction alone cannot address. Patients with mild-to-moderate fat without major skin laxity should choose liposuction or non-invasive treatments first. The procedure leaves a visible scar that's the main trade-off." },
        { question: "How visible is the brachioplasty scar?", answer: "The scar runs from elbow to armpit along the inner arm, visible when arms are raised or in sleeveless clothing. Most patients accept this for the contour improvement. Scar quality varies dramatically by individual healing. 'Mini' brachioplasty (scar limited to armpit area) works only for mild laxity; full skin redundancy requires the longer scar. Massage, silicone sheets, and sun protection improve scar maturation over 12-18 months." },
        { question: "What's the recovery from brachioplasty?", answer: "1-2 weeks before returning to desk work. No lifting >5 lbs for 3-4 weeks. Full activity at 6-8 weeks. Compression sleeves worn for 4-6 weeks. Drains for 5-10 days in some cases. Most patients are surprised by how immobilizing arm restrictions feel: even basic tasks like dressing and grooming are limited. Plan for help during the first week." },
    ],
    "body-lift": [
        { question: "What is a body lift and when is it needed?", answer: "A body lift (lower body lift / belt lipectomy) removes excess skin in a 360-degree pattern around the lower torso, addressing abdomen, flanks, lower back, and outer thighs simultaneously. Almost exclusively for massive weight loss patients (post-bariatric, 100+ lb loss). Patients with smaller skin laxity benefit from staged tummy tuck and individual procedures rather than this combined approach." },
        { question: "How long is body lift recovery?", answer: "Significantly more involved than tummy tuck alone. 3-4 weeks before returning to desk work. 8-12 weeks before full activity. Multiple drains for 1-3 weeks. Compression garment for 6-8 weeks. Final results emerge at 6-12 months. Most patients describe it as the most demanding cosmetic recovery they've experienced, but also the most transformative for post-massive-weight-loss patients." },
        { question: "Will my insurance cover a body lift?", answer: "Sometimes partially covered after documented massive weight loss with skin-related complications: chronic intertriginous infections, mobility limitations, or recurrent rashes. Cosmetic improvement alone is not covered. Insurance typically covers excess skin removal as 'panniculectomy' (medical) but not the contouring component. Out-of-pocket cost is typical even with partial coverage; prepayment plans are common." },
    ],
    "vaginal-rejuvenation": [
        { question: "What does 'vaginal rejuvenation' actually mean?", answer: "An umbrella term covering multiple procedures with different goals: vaginoplasty (surgical tightening), labiaplasty (cosmetic labia reshaping), perineoplasty (perineum repair after childbirth), and non-surgical options like CO2 laser (MonaLisa Touch) or radiofrequency (ThermiVa). Different procedures address different concerns: internal tightness vs external appearance vs functional issues. A consultation determines which combination is appropriate." },
        { question: "Is non-surgical vaginal rejuvenation effective?", answer: "Energy-based devices (CO2 laser, RF) provide modest improvement for mild-to-moderate atrophy, dryness, and laxity, often after menopause or childbirth. Results are subtle compared to surgery. The FDA issued a 2018 safety communication about marketing claims. Best candidates are those wanting non-invasive improvement of mild concerns; significant laxity or anatomical change requires surgery." },
        { question: "Will vaginal rejuvenation improve sexual sensation?", answer: "Effects vary. Surgical vaginoplasty can improve sensation by tightening the canal, but excessive tightening causes pain. Labiaplasty primarily addresses cosmetic and physical comfort concerns; sexual sensation effect is variable. Non-surgical treatments may improve mild concerns but rarely produce dramatic changes. Sensation issues often have multiple contributors (hormonal, psychological, anatomical); surgery alone may not be the answer." },
    ],
    "forehead-reduction": [
        { question: "What's the difference between forehead reduction and hairline lowering?", answer: "Same procedure, different name emphases. 'Forehead reduction' emphasizes shortening the forehead height; 'hairline lowering' emphasizes bringing the hairline down. Both refer to surgical advancement: a single incision at the existing hairline, scalp moved forward to reduce forehead height by 1-3 cm, immediate results with a thin scar along the new hairline. Hair transplant grafting is a non-surgical alternative." },
        { question: "Will I have a visible scar after forehead reduction?", answer: "A thin linear scar runs along the new hairline: typically hidden as hair grows down through it. Pretrichial incision (just in front of the hairline) allows hair to grow through the scar, often making it nearly invisible. Trichophytic incision technique produces the best scar camouflage. Most patients can wear hair pulled back without scar visibility after 6-12 months." },
        { question: "Can men have forehead reduction?", answer: "Generally not recommended for men due to androgenic alopecia (male pattern baldness): if the hairline recedes after surgery, the scar becomes exposed. Men with stable, non-progressing hairlines and strong family history without recession may be candidates. Hair transplant grafting is usually preferred for men since exposed grafts age more naturally than an exposed surgical scar." },
    ],
    "cheek-implants": [
        { question: "How are cheek implants different from filler?", answer: "Cheek implants are silicone or porous polyethylene structures surgically placed over the cheekbone: permanent, structural, $5,000-$10,000. Filler adds volume in soft tissue: non-surgical, lasts 12-24 months, $800-$2,500. Implants give defined sculptural enhancement; filler gives natural softness. Implants suit patients wanting dramatic permanent contour; filler suits patients wanting subtle reversible enhancement." },
        { question: "Are cheek implants reversible?", answer: "Yes, implants can be removed. Removal surgery is more involved than placement; capsule formation around the implant must be addressed. Some patients have implants removed and replaced with filler for a softer look. Filler dissolution (with hyaluronidase) is faster and easier than implant removal. Reversibility is one reason many patients choose filler first to test the look before committing to implants." },
        { question: "What's the recovery from cheek implants?", answer: "1-2 weeks of significant swelling and bruising. Returning to work at 7-10 days; final shape at 3-6 months. Soft food for first week (incisions inside the mouth heal). Most patients underestimate how dramatically faces swell after midface surgery. Shape continues refining for up to 12 months as soft tissue settles around the implant. Smiles may feel different temporarily as muscles adapt." },
    ],
    "mid-facelift": [
        { question: "What is a mid-facelift and how is it different from a regular facelift?", answer: "Mid-facelift specifically targets the mid-face region (cheeks, lower eyelids, and nasolabial folds) without addressing the lower face or neck. Smaller incisions, often hidden in the lower lash line or temple. Best for younger patients (40s-50s) with early mid-face descent but no jowls or neck laxity. A full facelift addresses the entire face from temples to neck." },
        { question: "Who is a candidate for mid-facelift?", answer: "Patients aged 40-55 with: tear trough hollowing, flattened cheeks, deepening nasolabial folds, but minimal jowls or neck laxity. Patients with advanced aging in lower face/neck need a full facelift. Many surgeons combine mid-facelift with lower blepharoplasty (eyelid surgery) since the regions overlap. The procedure is sometimes called 'subperiosteal lift' or 'cheek lift'." },
        { question: "How long do mid-facelift results last?", answer: "8-12 years on average, similar to a traditional facelift. The face continues aging normally from the new baseline. Patients in their 40s-50s often combine mid-facelift with non-surgical maintenance (botox, filler, peels) to extend the youthful appearance. Sun protection and stable weight are critical to longevity. Some patients return for full facelift in their 60s-70s as lower face aging develops." },
    ],
    "scar-revision": [
        { question: "Can old scars really be removed?", answer: "Scars can be improved but not erased: the goal is to make them less visible. Techniques include surgical re-excision (replacing wide scars with thin lines), laser resurfacing (improving texture and color), steroid injections (flattening keloids), microneedling (improving texture), and z-plasty (reorienting scar direction). Realistic expectation is 50-80% improvement, not invisibility. Multiple modalities often combined." },
        { question: "When should I have scar revision?", answer: "Wait 12-18 months after the original injury or surgery: scars continue maturing during this period and many improve significantly without intervention. Premature revision can produce worse results. Hypertrophic scars and keloids may benefit from earlier intervention (steroid injections, silicone sheets). Acne scars are stable and can be treated anytime once active acne is controlled." },
        { question: "What's the best treatment for keloid scars?", answer: "Keloids extend beyond the original wound and are notoriously difficult to treat, often returning after surgical removal alone. Best protocol combines surgical excision + immediate post-op steroid injections + radiation therapy or pressure therapy. Single-modality treatment has high recurrence rates. Patients with personal or family history of keloids should disclose this before any cosmetic procedure since elective scarring should be avoided." },
    ],
    "hyperhidrosis-botox": [
        { question: "How effective is botox for excessive sweating?", answer: "Highly effective: typically 80-90% reduction in sweat production for treated areas. Most studied for underarms (FDA-approved for axillary hyperhidrosis). Also effective for palms, feet, scalp, and forehead. Botox blocks acetylcholine signaling to sweat glands, halting sweat production at the source. Works regardless of whether sweating is stress-induced, heat-induced, or constant." },
        { question: "How long does botox for hyperhidrosis last?", answer: "Typically 6-9 months, longer than cosmetic botox uses (3-4 months). Larger surface areas of treatment (underarms vs forehead) often last longer. Patients return when sweating begins to recur. Annual or twice-yearly treatments are typical. Cost varies dramatically by area: underarms ~$1,000-$1,500 per session; palms similar but more uncomfortable." },
        { question: "Is botox for sweating covered by insurance?", answer: "Often yes for severe primary axillary hyperhidrosis after failed prescription antiperspirants. Documentation requirements vary by insurer: typically requires Hyperhidrosis Disease Severity Scale score of 3-4 and proof of failed first-line treatments. Pre-authorization required. Cosmetic use (general 'I sweat too much in summer') is not covered. Specialist dermatology consultation is usually needed for insurance approval." },
    ],
    "gum-contouring": [
        { question: "What is gum contouring and is it permanent?", answer: "Gum contouring (gingivectomy) reshapes the gum line by removing or reshaping excess gum tissue, exposing more tooth surface. Performed with laser (most common) or scalpel. Results are permanent. Best for patients with gummy smiles, asymmetric gums, or short-looking teeth. Often combined with crown lengthening (bone reshaping) for severe cases." },
        { question: "Is gum contouring painful?", answer: "Performed under local anesthesia with minimal discomfort during the procedure. Mild soreness for 1-3 days post-procedure managed with over-the-counter pain relief. Soft food for 2-3 days. Laser gum contouring causes less bleeding and faster healing than scalpel. Full healing takes 1-2 weeks. Most patients return to normal activity the next day." },
        { question: "How is gum contouring different from a gummy smile fix?", answer: "Gum contouring fixes excess gum tissue covering teeth (creating short-looking teeth). A 'gummy smile' is when too much gum shows when smiling, caused by hyperactive upper lip muscle (botox fix), excessive vertical maxillary growth (jaw surgery), or excess gum tissue (contouring). Diagnosis determines treatment. Many patients have multiple contributing causes and benefit from combination therapy." },
    ],
    "dhi-hair-transplant": [
        { question: "What is DHI and how is it different from FUE?", answer: "DHI (Direct Hair Implantation) uses a Choi Implanter pen to extract and implant grafts in a single step: no need to create recipient sites in advance. FUE (Follicular Unit Extraction) extracts grafts and creates recipient sites separately. DHI allows slightly higher density placement and shorter graft handling time. FUE allows better customization of angles and depth. Both achieve excellent natural results." },
        { question: "Is DHI better than FUE?", answer: "Neither is universally better: surgeon skill matters more than technique. DHI advantages: minimal trauma to grafts, shorter time out of body, no need to shave the entire recipient area. FUE advantages: better angle/direction control, more flexibility for large sessions, lower cost. For small to medium cases (under 2,500 grafts), DHI excels. For very large cases, FUE is often more practical." },
        { question: "How much does DHI cost?", answer: "DHI typically costs 30-50% more than FUE. Turkey: $2,500-$4,500 for full session. Korea: $5,000-$10,000. United States: $10,000-$25,000. The Choi pen technology and slower technique justifies the premium. Total cost depends on graft count needed: most patients need 2,000-4,000 grafts. International medical tourism remains popular for hair transplants due to dramatic cost differences." },
    ],
    "stretch-mark-treatment": [
        { question: "Can stretch marks really be removed?", answer: "Stretch marks (striae) can be significantly improved but rarely eliminated. Red/purple new stretch marks (striae rubra) respond well to pulsed dye laser and respond best to early treatment. White mature stretch marks (striae alba) are harder, requiring fractional laser, microneedling with PRP, or radiofrequency. Realistic expectation is 50-80% improvement. Combination therapy works better than single-modality treatment." },
        { question: "What's the most effective stretch mark treatment?", answer: "For new red stretch marks: pulsed dye laser or fractional non-ablative laser (Fraxel). For mature white stretch marks: fractional CO2 laser, microneedling with PRP or radiofrequency, or combination therapies. Topical retinoids and tretinoin help only on new stretch marks. Multiple sessions (4-6 typically) are needed regardless of modality. Newer combination protocols (Morpheus8 + PRP) show promising results." },
        { question: "Will stretch marks come back after treatment?", answer: "Treated stretch marks don't 'come back' but new ones can form from future weight gain, pregnancy, or rapid muscle growth. Genetic predisposition determines stretch mark susceptibility. Maintaining stable weight, staying well-hydrated, and using collagen-supporting topicals (retinol, hyaluronic acid) help prevent new formation. Pregnancy almost always causes new stretch marks regardless of prevention efforts." },
    ],
    "earlobe-repair": [
        { question: "What does earlobe repair fix?", answer: "Stretched, torn, or split earlobes from heavy earrings, gauging (intentional stretching), or trauma. The procedure removes scarred or excess tissue and reshapes the earlobe to natural proportions. Common in patients reversing gauges, repairing torn piercings, or addressing age-related earlobe elongation. Quick procedure (15-30 minutes per ear) under local anesthesia." },
        { question: "When can I re-pierce after earlobe repair?", answer: "Wait 6-8 weeks minimum for incisions to fully heal. Many surgeons prefer 3-6 months for tissue strength to fully recover. New piercings should be placed 2-3mm from the previous (now-repaired) site to avoid weakening the repaired tissue. Avoid heavy or dangling earrings for the first year: they can re-stretch the repaired earlobe." },
        { question: "Will the earlobe repair be visible?", answer: "Properly repaired earlobes appear essentially normal: most observers won't notice anything was done. A faint linear scar may be visible on close inspection, especially in the first 6-12 months. Scars improve significantly over 12 months. Repaired ears can wear most jewelry, though large gauges should not be reinstalled into repaired tissue (the tissue is structurally weaker than virgin earlobe)." },
    ],
    "rf-microneedling": [
        { question: "How is RF microneedling different from regular microneedling?", answer: "Regular microneedling creates micro-injuries with needles to trigger collagen. RF microneedling adds radiofrequency energy delivered through the needles, heating dermal tissue to stimulate significantly more collagen and tightening. Brand names include Morpheus8, Vivace, Genius, and Secret RF. Results are more dramatic than regular microneedling, especially for skin laxity, jawline definition, and acne scars." },
        { question: "How many RF microneedling sessions do I need?", answer: "3-4 sessions spaced 4-6 weeks apart for most concerns. Acne scars typically need 4-6 sessions. Annual maintenance recommended. Results emerge gradually over 3-6 months as collagen remodels. Each session takes 60-90 minutes including numbing time. The Morpheus8 device is particularly popular for jawline tightening and lower face definition." },
        { question: "What's the recovery from RF microneedling?", answer: "1-3 days of redness, swelling, and grid-pattern marks. Mild peeling at 3-5 days. Most patients return to work next day with minimal makeup coverage. Avoid sun exposure for 2 weeks; SPF 50+ daily for 4 weeks. Significantly less downtime than ablative laser with comparable collagen-stimulation results: this is why RF microneedling has largely replaced ablative laser for many concerns." },
    ],
    "beard-transplant": [
        { question: "How does a beard transplant work?", answer: "Same FUE/DHI techniques as scalp hair transplants. Donor grafts taken from the back of the scalp (occipital area) and implanted in beard zones: chin, mustache, sideburns, cheeks. Most procedures use 800-2,500 grafts depending on coverage area. Single session, 4-8 hours under local anesthesia. Results blend with natural beard once mature (12-18 months)." },
        { question: "Will the transplanted beard look natural?", answer: "Yes, when performed by experienced surgeons. Critical factors: angle of insertion (beard hairs grow at flatter angles than scalp hair), density gradients (mustache denser than cheeks), and direction matching (downward growth pattern). Poor technique produces 'doll-like' or unnatural appearance. Always review surgeon's beard transplant portfolio specifically: scalp transplant skill doesn't fully transfer." },
        { question: "How permanent is a beard transplant?", answer: "Permanent: transplanted scalp hair retains its DHT-resistant genetics and grows in beard zones for life. The hair behaves like scalp hair (longer growth cycle than native beard hair, may need trimming more often). Initial shedding at 2-4 weeks is normal; growth resumes at 3-4 months; full results at 12-18 months. Quality follicles are precious resource: choose your surgeon carefully since revisions are difficult." },
    ],
    "scalp-micropigmentation": [
        { question: "What is scalp micropigmentation?", answer: "Scalp micropigmentation (SMP) is a cosmetic tattoo technique that deposits tiny pigment dots in the scalp to mimic the appearance of shaved hair follicles. Creates the illusion of a closely-shaved full head of hair, restored hairline, or denser hair within thinning areas. Non-surgical alternative to hair transplants for patients who accept a 'buzz cut' look or want to reinforce thinning hair." },
        { question: "How long does scalp micropigmentation last?", answer: "5-8 years on average before noticeable fading. Pigment fades from black/brown to lighter shades; touch-ups every 3-5 years restore appearance. Sun exposure accelerates fading significantly: daily SPF on the scalp is critical. Quality of pigment and artist technique determine longevity. Some patients prefer occasional touch-ups over complete redo every several years." },
        { question: "Will scalp micropigmentation look fake?", answer: "Properly done SMP is undetectable from natural shaved hair to most observers. Critical factors: realistic dot density (not too dense), pigment color match to natural hair, irregular natural-looking patterns (not military precision). Cheap or inexperienced practitioners create the 'painted on' look that's clearly artificial. Always review SMP-specific portfolios and request video walkarounds of healed work, not just photos." },
    ],
    "eyebrow-restoration": [
        { question: "What is eyebrow restoration and how does it work?", answer: "Surgical eyebrow restoration uses FUE/DHI techniques to transplant scalp follicles into the eyebrow region, same approach as scalp hair transplants. Typically 200-400 grafts per brow. Restores brows lost from over-plucking, alopecia, scarring, or trauma. The transplanted hairs grow continuously like scalp hair and need regular trimming to maintain brow shape." },
        { question: "How is eyebrow restoration different from microblading?", answer: "Microblading is semi-permanent tattoo (1-3 years, semi-pigmented strokes); transplant is real growing hair (permanent, requires trimming). Microblading is non-invasive and quick (~$500-$800); transplants are surgical and expensive ($3,000-$8,000). For full eyebrow loss, transplants are the only option for true regrowth. For thinning or shape enhancement, microblading is faster and cheaper." },
        { question: "Will I need to trim the transplanted brows?", answer: "Yes, transplanted scalp hairs retain scalp growth characteristics, growing much longer than natural eyebrow hair. Weekly trimming is typical. Some surgeons use leg hair or chest hair as donor source for more brow-like growth pattern, but availability varies. Most patients accept trimming as a small trade-off for the permanent fullness restoration." },
    ],
    "lip-blush-tattoo": [
        { question: "What is lip blush and how is it different from lip filler?", answer: "Lip blush is a semi-permanent cosmetic tattoo that adds soft color to the lips, making them appear naturally fuller, defined, and pigmented without makeup. It does NOT add volume (that's filler) or change shape (that's lift). Best for patients with pale lips, asymmetric color, or fading lip definition. Many patients combine lip blush with filler for both color and volume enhancement." },
        { question: "How long does lip blush tattoo last?", answer: "2-5 years before noticeable fading, depending on skin type, sun exposure, lifestyle, and pigment quality. Some patients return for touch-ups every 12-18 months for vibrancy. Initial healing takes 7-14 days during which color appears much more intense before settling to true result. Daily SPF lip balm extends color longevity significantly." },
        { question: "Does lip blush tattoo hurt?", answer: "Topical numbing cream is applied before and during the procedure. Most patients describe it as moderate discomfort, vibrating sensation rather than sharp pain. The 2-3 hour session includes multiple numbing applications. Mild lip swelling for 2-3 days post-procedure is normal. Cold compresses and avoiding hot foods help during healing. Results emerge after the initial healing phase." },
    ],
    "buttock-implants": [
        { question: "How are buttock implants different from BBL?", answer: "Buttock implants surgically place silicone implants under or over the gluteal muscle for permanent shape and projection. BBL transfers your own fat: softer, more natural texture, but limited by available donor fat and 30-40% fat absorption. Implants suit very thin patients without sufficient fat for BBL. BBL suits patients with adequate donor fat seeking softer natural results. Both have distinct trade-offs in feel, shape, and recovery." },
        { question: "Are buttock implants safe?", answer: "Modern implants designed specifically for the buttocks are FDA-approved and considered safe when properly placed. Complications include capsular contracture, implant displacement (rotation or asymmetry), infection, and seroma. Recovery is more demanding than BBL: strict no-sitting protocol for 3-4 weeks, longer pain duration. Properly performed by experienced surgeons, complication rates are similar to other implant-based procedures." },
        { question: "How long do buttock implants last?", answer: "Properly placed implants can last 10-20+ years. Some implants are 'lifetime' devices that don't require replacement unless complications develop. Capsular contracture, displacement, or aesthetic preference changes are reasons for replacement. Unlike fat transfer, implants don't fluctuate with weight changes, providing consistent shape regardless of weight loss/gain. Patients can mix implants with supplemental fat transfer for natural transitions." },
    ],
    "mini-tummy-tuck": [
        { question: "What's the difference between mini and full tummy tuck?", answer: "Mini tummy tuck addresses only the area below the belly button through a shorter incision (similar to a C-section scar). Full tummy tuck extends from pubic bone to rib cage, repositions the navel, and repairs the entire abdominal wall. Mini is appropriate for limited skin laxity below the navel only, typically post-pregnancy patients with mild concerns. Most patients with significant changes need full tummy tuck for optimal results." },
        { question: "Who is a candidate for mini tummy tuck?", answer: "Best candidates: post-pregnancy patients with skin laxity below the belly button only, no significant muscle separation, and no excess skin above the navel. Patients with diastasis recti (full muscle separation), significant upper abdominal laxity, or excess skin extending above the navel need a full tummy tuck. Trying mini when full is needed produces disappointing results; accurate diagnosis is essential." },
        { question: "How long is mini tummy tuck recovery?", answer: "Faster recovery than full tummy tuck: 1-2 weeks before returning to desk work, 4-6 weeks before exercise. Smaller incision and no muscle repair mean less downtime. Compression garment for 4-6 weeks. Most patients return to normal activity in 2-3 weeks. Final results emerge at 3-6 months. Recovery is more comparable to liposuction than to full abdominoplasty." },
    ],
    dimpleplasty: [
        { question: "What is dimpleplasty?", answer: "A surgical procedure that creates artificial dimples by suturing the inner cheek tissue to the underlying buccinator muscle. The connection causes a slight depression when smiling. Procedure takes 30-60 minutes under local anesthesia, performed entirely through inside-mouth incisions (no external scars). Permanent dimples emerge as healing progresses." },
        { question: "Are dimpleplasty results permanent?", answer: "Yes, once the surgical adhesion forms between the cheek tissue and underlying muscle, the dimple is permanent. Initial dimples appear at rest (visible even when not smiling) for 2-4 weeks, then settle to appear only during smiling. Final natural-looking results emerge at 2-3 months. Reversal is technically possible but rarely requested." },
        { question: "What's the recovery from dimpleplasty?", answer: "Minimal: most patients return to work the next day. Soft food for 5-7 days while incisions inside the mouth heal. Mild discomfort and swelling for 1-2 weeks. Saltwater rinses 4-6 times daily for hygiene. The dimples appear visible at rest initially (a 'permanent dimple' look) before settling at 2-3 months to natural-looking dimples that only show when smiling." },
    ],
    mesotherapy: [
        { question: "What is mesotherapy?", answer: "A non-surgical treatment involving microinjections of vitamins, amino acids, hyaluronic acid, and other compounds directly into the mesoderm (middle skin layer). Used for facial rejuvenation, hair restoration, and localized fat reduction. Originally developed in France in the 1950s, now widely practiced in Europe and Asia. Less popular in the US, where it's not FDA-approved as a single category but individual ingredients may be." },
        { question: "Does mesotherapy actually work?", answer: "Effects vary by indication and patient. For facial rejuvenation: modest improvement in skin hydration, brightness, and fine lines. For hair restoration: limited evidence; PRP and minoxidil have stronger data. For fat reduction: modest results vs. CoolSculpting or kybella. Studies are heterogeneous; results depend heavily on specific compounds, technique, and patient factors. Manage expectations carefully." },
        { question: "How many mesotherapy sessions do I need?", answer: "Typical protocol: 4-6 weekly or biweekly sessions, then monthly maintenance. Total cost: $500-$2,000 for initial protocol depending on area. Results emerge gradually; visible improvement at session 3-4. Best results in patients with mild concerns and consistent maintenance. Patients seeking dramatic results in 1-2 sessions are usually disappointed: mesotherapy is a maintenance and gentle improvement modality, not a transformation modality." },
    ],
    dermaplaning: [
        { question: "What is dermaplaning and how does it work?", answer: "A physical exfoliation treatment using a sterile scalpel to remove the outermost layer of dead skin cells and fine vellus hair ('peach fuzz'). Creates immediately smoother skin, allows better skincare product penetration, and improves makeup application. Quick procedure (20-30 minutes) with no downtime. Often combined with chemical peels or facials for enhanced results." },
        { question: "Will dermaplaning make my facial hair grow back thicker?", answer: "No, this is a persistent myth. Vellus hair (the fine peach fuzz dermaplaning removes) grows back at the same rate, thickness, and texture as before. Removing it cannot change follicle characteristics. The illusion of 'thicker' regrowth comes from blunt-cut hair tips feeling different than naturally tapered tips. Hair returns to normal feel within 2-3 weeks." },
        { question: "How often should I get dermaplaning?", answer: "Every 4-6 weeks for sustained results, aligned with the skin's natural exfoliation cycle. More frequent treatments don't improve results and may damage skin. Avoid in patients with active acne (can spread bacteria), severe rosacea, or sensitive skin conditions. Many patients combine monthly dermaplaning with quarterly chemical peels or facials for comprehensive maintenance." },
    ],
    "cellulite-treatment": [
        { question: "Is there really a treatment that eliminates cellulite?", answer: "Cellulite is structural (fibrous bands tethering skin to underlying tissue, fat herniating between bands) and notoriously resistant to treatment. Effective options include: subcision (Cellfina, manual subcision: cuts the fibrous bands), radiofrequency (ThermiTight, Profound), and acoustic wave therapy. Topical creams, massage, and most non-invasive devices provide minimal lasting improvement. Realistic improvement is 30-50%, not elimination." },
        { question: "What's the most effective cellulite treatment?", answer: "Cellfina (FDA-cleared minimally invasive subcision) shows the best evidence: cutting the fibrous bands that cause dimpling. Single treatment, 60-70% improvement, lasting 3+ years. QWO (an injectable enzyme treatment) was discontinued in 2022. Profound RF microneedling helps moderate cases. Patient selection matters: best results in patients with structural cellulite (dimples), not those with smooth orange-peel texture." },
        { question: "Why is cellulite so hard to treat?", answer: "Cellulite has multiple contributors: fibrous septae structure (fixed anatomy), fat distribution, skin thickness, hormonal influence, and genetics. No single treatment addresses all components. Women's connective tissue runs perpendicular to skin (creating dimpling); men's runs in crisscross patterns (avoiding cellulite). Treatment must mechanically break the structural component, which is why most non-invasive treatments fail to deliver lasting results." },
    ],
};

// Opt this route into DYNAMIC rendering.
//
// A CSP nonce cannot exist in prerendered output. Next derives it from the
// Content-Security-Policy header on the REQUEST (see
// getScriptNonceFromHeader in next/dist/server/app-render), and a build-time
// prerender has no request. proxy.ts sends
// `script-src 'self' 'nonce-<random>' 'strict-dynamic'`, and 'strict-dynamic'
// makes the browser ignore 'self', so on 2026-09-01 production served this
// route with every external chunk AND every inline bootstrap script refused,
// including React's $RC() Suspense-completion call. Visitors got the navbar
// and a spinner that never resolved. Six route families were affected.
//
// connection() rather than `export const dynamic = 'force-dynamic'`: it makes
// the RENDER dynamic without changing segment config, so generateStaticParams
// still supplies the param allowlist and dynamicParams keeps behaving as it
// does today. force-dynamic additionally forces revalidate = 0 and changes how
// the segment is built, which is a larger blast radius than this needs.
//
// Cost is deliberate and was decided explicitly: this route family no longer
// gets CDN caching, so it costs a function invocation per view. Do not
// "optimise" this away by making the route static again without first fixing
// the CSP, because that reintroduces a fully blank page.
// Guarded by the CSP-nonce test in tests/ux-audit/ux-audit.spec.ts.
const CATEGORY_BADGES: Record<string, { bg: string; text: string }> = {
    surgical: { bg: "bg-[#FDEEE7]", text: "text-[#CF4500]" },
    "non-surgical": { bg: "bg-[#FDF3E7]", text: "text-[#9A6428]" },
    injectable: { bg: "bg-[#FDEEE7]", text: "text-[#CF4500]" },
    dental: { bg: "bg-[#EDF2F7]", text: "text-[#243847]" },
    "body-contouring": { bg: "bg-[#FDEEE7]", text: "text-[#CF4500]" },
    "hair-restoration": { bg: "bg-[#FDF3E7]", text: "text-[#9A6428]" },
};

export default async function ProcedurePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const locale = 'en';
    setRequestLocale(locale);
    const baseProcedure = getProcedureBySlug(slug);

    if (!baseProcedure) {
        notFound();
    }

    const procedure = baseProcedure;
    const tCats = await getTranslations("procedureCategories");
    const t = await getTranslations("ProcedurePage");
    const categoryLabel = tCats(procedure.category);

    const legacyData = legacyProcedures.find((p) => p.slug === slug);
    const relatedProcedures = getProceduresByCategory(procedure.category).filter((p) => p.slug !== slug).slice(0, 3);
    const explainer = getProcedureExplainer(slug);

    // An explainer page is surgeon-facing: a MedicalWebPage about the procedure, for clinicians.
    const jsonLd = explainer
        ? {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: procedure.name,
            description: PROCEDURE_SEO_OVERRIDES[slug]?.description ?? procedure.description,
            url: `https://www.faceifylabs.com/procedures/${procedure.slug}`,
            about: {
                "@type": "MedicalProcedure",
                name: procedure.name,
                bodyLocation: "Face",
            },
            audience: {
                "@type": "MedicalAudience",
                audienceType: "Clinician",
            },
            publisher: {
                "@type": "Organization",
                name: "Faceify Labs",
                url: "https://www.faceifylabs.com",
                logo: {
                    "@type": "ImageObject",
                    url: "https://www.faceifylabs.com/logo.png",
                },
            },
            datePublished: "2026-10-15",
            dateModified: "2026-10-15",
            disclaimer:
                "Educational content only. Not a substitute for professional medical advice, diagnosis, or treatment. Always consult a board-certified plastic surgeon or qualified aesthetic practitioner.",
        } : {
        "@context": "https://schema.org",
        "@type": ["MedicalProcedure", "Article"],
        name: procedure.name,
        description: procedure.description,
        url: `https://www.faceifylabs.com/procedures/${procedure.slug}`,
        bodyLocation: "Face",
        // Editorial authorship: the team behind the clinical content.
        // Faceify Labs Clinical Team aggregates board-certified surgeon
        // input from our partner network into the procedure descriptions.
        author: {
            "@type": "Organization",
            name: "Faceify Labs Clinical Team",
            url: "https://www.faceifylabs.com/our-story",
        },
        // Editorial review: same org for now; upgrade to specific
        // reviewer (board-certified surgeon name + credentials) when
        // partner clinical advisors agree to public attribution.
        reviewedBy: {
            "@type": "Organization",
            name: "Faceify Labs Clinical Team",
            url: "https://www.faceifylabs.com/our-story",
        },
        publisher: {
            "@type": "Organization",
            name: "Faceify Labs",
            url: "https://www.faceifylabs.com",
            logo: {
                "@type": "ImageObject",
                url: "https://www.faceifylabs.com/logo.png",
            },
        },
        // Use the build date as a rolling lastReviewed so freshness
        // signals stay current. The actual content is reviewed on
        // procedure-data updates; ISR re-bakes daily anyway.
        dateModified: new Date().toISOString().split("T")[0],
        lastReviewed: new Date().toISOString().split("T")[0],
        medicalAudience: {
            "@type": "MedicalAudience",
            audienceType: "Patient",
        },
        // Disclaimer: Google requires medical content disclaimers for
        // health-topic pages. Surfacing it in schema lifts the page out
        // of the "low-trust medical content" bucket.
        disclaimer:
            "Educational content only. Not a substitute for professional medical advice, diagnosis, or treatment. Always consult a board-certified plastic surgeon or qualified aesthetic practitioner.",
    };

    const baseUrl = 'https://www.faceifylabs.com';
    const breadcrumbItems = [
        { name: 'Home', url: baseUrl },
        { name: t('breadcrumbProcedures'), url: `${baseUrl}/procedures` },
        { name: categoryLabel, url: `${baseUrl}/procedures?category=${procedure.category}` },
        { name: procedure.shortName, url: `${baseUrl}/procedures/${procedure.slug}` },
    ];

    return (
        <div className="bg-warm min-h-screen font-body">
            <BreadcrumbSchema items={breadcrumbItems} />
            {/* Per-procedure SEO/GEO schema bundle, same as /demo and /simulate.
                Explainer pages emit only schema built from their own visible copy. */}
            {!explainer && (
                <>
                    <SimulatorSchema procedureSlug={slug} />
                    <ProcedureFAQSchema procedureSlug={slug} />
                    <ProcedureHowToSchema procedureSlug={slug} />
                    <ProcedureMedicalSchema procedureSlug={slug} />
                </>
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {!explainer && PROCEDURE_FAQS[slug] && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: PROCEDURE_FAQS[slug].map((faq) => ({
                                "@type": "Question",
                                name: faq.question,
                                acceptedAnswer: { "@type": "Answer", text: faq.answer },
                            })),
                        }),
                    }}
                />
            )}

            {explainer && (
                <ProcedureExplainerPage
                    explainer={explainer}
                    labels={{
                        categoryLabel,
                        breadcrumbProcedures: t('breadcrumbProcedures'),
                        breadcrumbCurrent: procedure.shortName,
                        relatedHeading: t('relatedProceduresTitle', { category: categoryLabel.toLowerCase() }),
                        related: relatedProcedures.map((rel) => ({
                            slug: rel.slug,
                            shortName: rel.shortName,
                            description: rel.description,
                            icon: rel.icon,
                        })),
                    }}
                />
            )}

            {/* Shared template. Slugs with an explainer render the explainer
                above and skip everything from here to the closing guard. */}
            {!explainer && <>
            {/* Breadcrumb */}
            <div className="container mx-auto px-5 md:px-8 pt-28 pb-2">
                <nav className="flex items-center gap-2 text-sm text-[#696969] font-body">
                    <Link href="/procedures" className="hover:text-[#CF4500] transition-colors">
                        {t('breadcrumbProcedures')}
                    </Link>
                    <span>/</span>
                    <Link href="/procedures" className="hover:text-[#CF4500] transition-colors">{categoryLabel}</Link>
                    <span>/</span>
                    <span className="text-[#141413] font-medium">{procedure.shortName}</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-5 md:px-8 pt-8 pb-12">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-5">
                        <ProcedureIcon slug={procedure.slug} size={52} />
                        <span className={`px-3 py-1 text-[0.65rem] font-body font-semibold tracking-wider uppercase rounded-full ${
                            (CATEGORY_BADGES[procedure.category] || CATEGORY_BADGES.surgical).bg
                        } ${
                            (CATEGORY_BADGES[procedure.category] || CATEGORY_BADGES.surgical).text
                        }`}>
                            {categoryLabel}
                        </span>
                        {procedure.isNew && (
                            <span className="px-3 py-1 text-[0.65rem] font-body font-semibold tracking-wider uppercase rounded-full bg-[#CF4500] text-white">
                                New
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-body font-semibold text-[#141413] mb-4 leading-tight">
                        {procedure.name}
                    </h1>

                    <p className="text-lg text-[#555555] font-body mb-8 max-w-3xl leading-relaxed">
                        {procedure.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={procedure.comingSoon ? `/simulate` : `/simulate/${procedure.simulateSlug}`}
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-semibold rounded-full transition-all font-body shadow-sm"
                        >
                            {procedure.comingSoon
                                ? t('heroViewAllSimulators')
                                : t('heroTrySimulator', { name: procedure.shortName })}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/procedures"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-black/10 text-[#141413] text-sm font-semibold rounded-full hover:bg-black/5 transition-all font-body shadow-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('heroAllProcedures')}
                        </Link>
                    </div>
                    {procedure.comingSoon && (
                        <p className="text-sm text-[#696969] font-body mt-3">{t('heroComingSoon')}</p>
                    )}
                </div>
            </section>

            {/* Simulator screenshot hero: above-the-fold real screenshot from the
                live simulator. Renders only for procedures in the 14-simulator
                live list. Screenshot files live at
                /public/marketing/procedure-screenshots/<slug>-{desktop,mobile}.png
                and are captured by `npm run screenshots:regenerate`.
                Falls back to a dark placeholder if the file is absent. */}
            {LIVE_SIMULATOR_SCREENSHOT_SLUGS[slug] && (
                <ProcedureScreenshotHero
                    slug={slug}
                    procedureName={procedure.name}
                    simulateSlug={LIVE_SIMULATOR_SCREENSHOT_SLUGS[slug].simulateSlug}
                    anatomyCallout={LIVE_SIMULATOR_SCREENSHOT_SLUGS[slug].anatomyCallout}
                />
            )}

            {/* Legacy detail components */}
            {legacyData && (
                <>
                    <ProcedureHero procedure={legacyData} />
                    <LogicStrip procedure={legacyData} />
                    <MiniMorphos slug={slug} />
                    <PrecisionTable procedure={legacyData} />
                </>
            )}

            {/* Mobile sticky in-page nav. Desktop has the long-form
                content laid out side-by-side; mobile is one long scroll
                so the jump-to bar prevents endless swiping. Items array
                is filtered to skip sections that don't render for this
                slug so a tap never dead-ends at a missing anchor. */}
            <ProcedureStickyNav
                items={[
                    ...(LIVE_SIMULATOR_SCREENSHOT_SLUGS[slug]
                        ? [{ id: "simulator-preview", label: "Simulator" }]
                        : []),
                    ...(PROCEDURE_IMAGERY[slug]
                        ? [{ id: "preview", label: "Preview" }]
                        : []),
                    { id: "timeline", label: "Timeline" },
                    ...(hasCostEstimate(slug) ? [{ id: "cost", label: "Cost" }] : []),
                    { id: "deals", label: "Deals" },
                    { id: "surgeons", label: "Surgeons" },
                    { id: "overview", label: "Details" },
                ]}
            />

            {/* Before/after comparison. Only renders for procedures with
                a real before/after pair in /public/images/gallery. Silently
                skipped otherwise so the layout stays clean. */}
            {PROCEDURE_IMAGERY[slug] && (
                <div id="preview" className="scroll-mt-20">
                    <ProcedureBeforeAfter
                        procedureSlug={procedure.simulateSlug ?? slug}
                        procedureName={procedure.name}
                        {...PROCEDURE_IMAGERY[slug]}
                    />
                </div>
            )}

            {/* Timeline infographic. Every procedure renders this
                because every aesthetic patient asks "how soon will I see
                results?". Per-procedure overrides live in
                data/procedure-timelines.ts. */}
            <div id="timeline" className="scroll-mt-20">
                <ProcedureTimeline procedureSlug={slug} />
            </div>

            {/* Cost estimator: interactive city x procedure price-range
                widget. Renders only when data exists in
                data/procedure-cost-estimates.ts. Bridges the timeline
                (expectations) to the deals (actual offers). */}
            {hasCostEstimate(slug) && (
                <div id="cost" className="scroll-mt-20">
                    <ProcedureCostEstimator
                        procedureSlug={procedure.simulateSlug ?? slug}
                        procedureName={procedure.name}
                        defaultCity="Pune"
                        labels={{
                            eyebrow: t('costEstimator.eyebrow'),
                            heading: t.raw('costEstimator.heading') as string,
                            cityLabel: t('costEstimator.cityLabel'),
                            cityAriaLabel: t('costEstimator.cityAriaLabel'),
                            rangeLabel: t.raw('costEstimator.rangeLabel') as string,
                            rangeDisclaimer: t.raw('costEstimator.rangeDisclaimer') as string,
                            seeDeals: t.raw('costEstimator.seeDeals') as string,
                            sourceNote: t('costEstimator.sourceNote'),
                        }}
                    />
                </div>
            )}

            {/* Related deals: server-component prisma query. Preferred
                city defaults to Pune for the launch window so SEO traffic
                researching e.g. "rhinoplasty" sees Pune clinics first.
                Falls back to silent null if the DB query throws.
                Streamed via Suspense so a slow prisma round-trip
                doesn't block the rest of the page from rendering. */}
            <div id="deals" className="scroll-mt-20">
                <Suspense fallback={<DealsSectionSkeleton />}>
                    <ProcedureRelatedDeals
                        procedureSlug={procedure.simulateSlug ?? slug}
                        procedureName={procedure.name}
                        preferredCity="Pune"
                    />
                </Suspense>
            </div>

            {/* Surgeon directory: verified surgeons offering this procedure.
                Differentiated from the deals tile above: deals = ready-to-book
                offers, this = "research a specific surgeon's credentials".
                Both belong because patient research often vets the surgeon
                before booking the deal. Streamed via Suspense for the
                same reason as the related-deals tile above. */}
            <div id="surgeons" className="scroll-mt-20">
                {/* Featured sponsored tile, shown above organic directory
                    when a live procedure_page placement matches this slug.
                    Flag-gated; renders nothing when flag is off. */}
                <Suspense fallback={null}>
                    <FeaturedSurgeonTile
                        procedureSlug={procedure.simulateSlug ?? slug}
                        procedureName={procedure.name}
                        city="Pune"
                    />
                </Suspense>
                <Suspense fallback={<SurgeonsSectionSkeleton />}>
                    <ProcedureSurgeonDirectory
                        procedureSlug={procedure.simulateSlug ?? slug}
                        procedureName={procedure.name}
                        preferredCity="Pune"
                    />
                </Suspense>
            </div>

            {/* Overview Section */}
            <section id="overview" className="bg-white py-12 border-y border-slate-200 scroll-mt-20">
                <div className="container mx-auto px-5 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-body font-semibold text-[#141413] mb-6">{t('overviewTitle')}</h2>
                                <div className="space-y-4">
                                    {(procedure.longDescription || procedure.description || "").split('\n\n').map((para, i) => (
                                        <p key={i} className="text-[#555555] font-body leading-relaxed">
                                            {para.trim()}
                                        </p>
                                    ))}
                                </div>

                                {procedure.benefits && procedure.benefits.length > 0 && (
                                    <>
                                        <h2 className="text-2xl font-body font-semibold text-[#141413] mt-10 mb-5">{t('keyBenefitsTitle')}</h2>
                                        <ul className="space-y-3">
                                            {procedure.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-4 h-4 text-[#CF4500] shrink-0 mt-0.5" />
                                                    <span className="text-[#555555] font-body text-sm leading-relaxed">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {/* Pros & Cons Section */}
                                {procedure.pros && procedure.pros.length > 0 && procedure.cons && procedure.cons.length > 0 && (
                                    <>
                                        <h2 className="text-2xl font-body font-semibold text-[#141413] mt-10 mb-5">{t('prosConsTitle')}</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-[#FDEEE7]/60 border border-[#CF4500]/20 rounded-xl p-5">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <ThumbsUp className="w-4 h-4 text-[#CF4500]" />
                                                    <h3 className="text-sm font-body font-semibold text-[#CF4500]">{t('prosLabel')}</h3>
                                                </div>
                                                <ul className="space-y-2.5">
                                                    {procedure.pros.map((pro, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-[#CF4500] text-xs mt-1 shrink-0">+</span>
                                                            <span className="text-[#555555] font-body text-sm leading-relaxed">{pro}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-red-50/50 border border-red-200/40 rounded-xl p-5">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <ThumbsDown className="w-4 h-4 text-red-500" />
                                                    <h3 className="text-sm font-body font-semibold text-red-500">{t('consLabel')}</h3>
                                                </div>
                                                <ul className="space-y-2.5">
                                                    {procedure.cons.map((con, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <span className="text-red-400 text-xs mt-1 shrink-0">&minus;</span>
                                                            <span className="text-[#555555] font-body text-sm leading-relaxed">{con}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <h2 className="text-2xl font-body font-semibold text-[#141413] mt-10 mb-4">{t('idealForTitle')}</h2>
                                <div className="flex items-start gap-3 p-5 bg-warm rounded-xl border border-slate-200">
                                    <Users className="w-4 h-4 text-[#CF4500] shrink-0 mt-0.5" />
                                    <p className="text-[#555555] font-body text-sm leading-relaxed">{procedure.idealFor}</p>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-24 bg-warm rounded-2xl border border-slate-200 p-6 space-y-5">
                                    <h3 className="text-xs font-body font-semibold text-[#696969] uppercase tracking-widest">{t('quickFactsTitle')}</h3>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 text-[#CF4500] shrink-0 mt-1" />
                                        <div>
                                            <p className="text-[0.65rem] font-body text-[#696969] uppercase tracking-wider mb-0.5">{t('recoveryTimeLabel')}</p>
                                            <p className="text-sm font-body text-[#141413] font-medium">{procedure.recoveryTime}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-4 h-4 text-[#CF4500] shrink-0 mt-1" />
                                        <div>
                                            <p className="text-[0.65rem] font-body text-[#696969] uppercase tracking-wider mb-0.5">{t('procedureDurationLabel')}</p>
                                            <p className="text-sm font-body text-[#141413] font-medium">{procedure.procedureDuration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <DollarSign className="w-4 h-4 text-[#CF4500] shrink-0 mt-1" />
                                        <ProcedurePricingSidebar procedure={procedure} />
                                    </div>

                                    <div className="border-t border-slate-200 pt-4">
                                        <Link
                                            href={procedure.comingSoon ? `/simulate` : `/simulate/${procedure.simulateSlug}`}
                                            className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#CF4500] hover:bg-[#B53D00] text-white text-sm font-body font-semibold rounded-full transition-all shadow-sm"
                                        >
                                            {procedure.comingSoon ? t('sidebarViewSimulators') : t('sidebarTrySimulator')}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-ink relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#CF4500]/[0.07] blur-3xl pointer-events-none" />
                <div className="container mx-auto px-5 md:px-8 text-center relative z-10">
                    <h2 className="text-2xl md:text-3xl font-body font-semibold text-white mb-4 leading-tight">
                        {t('ctaTitle', { name: procedure.shortName.toLowerCase() })}
                    </h2>
                    <p className="text-white/60 font-body text-base mb-8 max-w-xl mx-auto leading-relaxed">
                        {t('ctaBody')}
                    </p>
                    <Link
                        href={procedure.comingSoon ? `/simulate` : `/simulate/${procedure.simulateSlug}`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#CF4500] text-white text-sm font-body font-semibold rounded-full hover:bg-[#B53D00] transition-all shadow-sm"
                    >
                        {procedure.comingSoon
                            ? t('ctaBrowseSimulators')
                            : t('ctaTrySimulator', { name: procedure.shortName })}
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Related Procedures */}
            {relatedProcedures.length > 0 && (
                <section className="bg-white py-14 border-t border-slate-200">
                    <div className="container mx-auto px-5 md:px-8">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-xl font-body font-semibold text-[#141413] mb-6">
                                {t('relatedProceduresTitle', { category: categoryLabel.toLowerCase() })}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {relatedProcedures.map((rel) => (
                                    <Link
                                        key={rel.slug}
                                        href={`/procedures/${rel.slug}`}
                                        className="group bg-warm rounded-2xl border border-slate-200 p-5 hover:-translate-y-1 hover:shadow-md hover:border-[#CF4500]/40 transition-all duration-300"
                                    >
                                        <span className="text-2xl mb-2 block">{rel.icon}</span>
                                        <h3 className="text-sm font-body font-semibold text-[#141413] group-hover:text-[#CF4500] transition-colors mb-1 flex items-center justify-between">
                                            {rel.shortName}
                                            <ArrowRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-all duration-300 text-[#CF4500]" />
                                        </h3>
                                        <p className="text-xs text-[#555555] font-body leading-relaxed line-clamp-2">{rel.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Q&A + real-patient-gallery cross-links: internal-link
                signal for Google + funnel for users still researching.
                Pure-link tile (no DB fetch) so it always renders, even
                before any questions / gallery entries exist for this
                procedure. */}
            <section className="bg-warm py-10 border-t border-slate-200">
                <div className="container mx-auto px-5 md:px-8">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href={`/q/${slug}`}
                            className="group block bg-white rounded-2xl border border-slate-200 p-5 hover:-translate-y-0.5 hover:shadow-md hover:border-[#CF4500]/40 transition-all"
                        >
                            <p className="text-xs font-semibold text-[#CF4500] uppercase tracking-wide mb-2">
                                {t('qaLinkEyebrow')}
                            </p>
                            <h3 className="font-headline font-bold text-lg text-[#141413] group-hover:text-[#CF4500] mb-1 flex items-center justify-between">
                                {t('qaLinkTitle', { name: procedure.name })}
                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-[#CF4500]" />
                            </h3>
                            <p className="text-sm text-[#555555] leading-relaxed">
                                {t('qaLinkBody')}
                            </p>
                        </Link>
                        <Link
                            href={`/gallery#real-patient-stories`}
                            className="group block bg-white rounded-2xl border border-slate-200 p-5 hover:-translate-y-0.5 hover:shadow-md hover:border-[#CF4500]/40 transition-all"
                        >
                            <p className="text-xs font-semibold text-[#CF4500] uppercase tracking-wide mb-2">
                                {t('galleryLinkEyebrow')}
                            </p>
                            <h3 className="font-headline font-bold text-lg text-[#141413] group-hover:text-[#CF4500] mb-1 flex items-center justify-between">
                                {t('galleryLinkTitle')}
                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity text-[#CF4500]" />
                            </h3>
                            <p className="text-sm text-[#555555] leading-relaxed">
                                {t('galleryLinkBody')}
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            <ConcernMapper slug={slug} />
            <RegulatoryFooter />
            </>}
        </div>
    );
}

/**
 * Deals-strip skeleton, shown while the prisma `clinicDeal.findMany`
 * round-trip resolves. Shape mirrors `ProcedureRelatedDeals`'s 3-card
 * grid so layout shift on swap-in is minimal.
 */
function DealsSectionSkeleton() {
    return (
        <section
            id="deals"
            className="bg-white py-12 border-y border-slate-200"
            aria-busy="true"
            aria-label="Loading related deals"
        >
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-warm rounded-2xl border border-slate-200 p-5 space-y-3"
                            >
                                <div className="h-32 w-full bg-slate-200 rounded-xl animate-pulse" />
                                <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                                <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-slate-200 rounded-full animate-pulse mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/**
 * Surgeon-directory skeleton. Layout matches the 3-card grid in
 * `ProcedureSurgeonDirectory` so the section reserves its real height
 * during the streaming window.
 */
function SurgeonsSectionSkeleton() {
    return (
        <section
            id="surgeons"
            className="bg-warm py-12 border-y border-slate-200"
            aria-busy="true"
            aria-label="Loading verified surgeons"
        >
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="h-5 w-56 bg-slate-200 rounded animate-pulse mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse" />
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
                                        <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-slate-200 rounded-full animate-pulse mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
