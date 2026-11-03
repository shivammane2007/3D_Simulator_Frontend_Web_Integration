'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProcedureIllustrationProps {
  slug: string;
  category?: string;
  className?: string;
}

/**
 * High-fidelity anatomical vector illustration for aesthetic & surgical procedures.
 * Replaces generic placeholder graphics with authentic procedure-specific
 * surgical vectors, before/after comparative lines, and anatomical landmark guides.
 */
export default function ProcedureIllustration({
  slug,
  category,
  className,
}: ProcedureIllustrationProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full h-full select-none', className)}
      aria-hidden="true"
    >
      <defs>
        {/* Soft surgical tissue gradient for after-comparison side */}
        <linearGradient id={`grad-tissue-${slug}`} x1="80" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CF4500" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#F37338" stopOpacity="0.02" />
        </linearGradient>
        {/* Accent glow filter for landmark nodes */}
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#CF4500" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Subtle vertical split reference guide */}
      <line x1="80" y1="20" x2="80" y2="140" stroke="#141413" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.18" />

      {/* Procedure-Specific Illustration Elements */}
      {renderProcedureContent(slug, category)}
    </svg>
  );
}

function renderProcedureContent(slug: string, category?: string) {
  switch (slug) {
    // ─── 1. RHINOPLASTY ────────────────────────────────────────────────────────
    case 'rhinoplasty':
      return (
        <g>
          {/* Base Face Contour */}
          <path
            d="M80 24 C50 24 38 48 38 80 C38 112 56 136 80 136 C104 136 122 112 122 80 C122 48 110 24 80 24 Z"
            stroke="#141413"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.4)"
          />
          {/* Eyes */}
          <path d="M54 72 Q64 68 74 72 Q64 76 54 72" stroke="#141413" strokeWidth="1" fill="#fff" />
          <circle cx="64" cy="72" r="2.2" fill="#141413" />
          <path d="M86 72 Q96 68 106 72 Q96 76 86 72" stroke="#141413" strokeWidth="1" fill="#fff" />
          <circle cx="96" cy="72" r="2.2" fill="#141413" />
          {/* Eyebrows */}
          <path d="M52 64 Q64 60 74 64" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M86 64 Q96 60 108 64" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />
          {/* Lips */}
          <path d="M68 110 Q80 107 92 110" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M72 110 Q80 115 88 110" stroke="#141413" strokeWidth="1" strokeLinecap="round" />

          {/* LEFT: Pre-op Dorsal Hump (Dashed) */}
          <path
            d="M78 58 Q72 68 74 76 Q70 82 74 88 Q77 92 80 92"
            stroke="#141413"
            strokeWidth="1.4"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* RIGHT: Refined Dorsal Profile & Rotated Nasal Tip */}
          <path
            d="M80 58 L80 74 Q82 78 85 86 Q83 91 80 92"
            stroke="#CF4500"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Shaded dorsal hump reduction area */}
          <path
            d="M78 58 Q72 68 74 76 Q70 82 74 88 L85 86 Q82 78 80 74 Z"
            fill="rgba(207,69,0,0.14)"
          />
          {/* Tip Rotation Angle Arc */}
          <path d="M84 83 A 6 6 0 0 1 88 88" stroke="#F37338" strokeWidth="1.2" strokeDasharray="1.5 1.5" fill="none" />
          <polygon points="87,89 89,86 86,86" fill="#CF4500" />

          {/* Landmark coordinates */}
          <circle cx="80" cy="58" r="2" fill="#CF4500" />
          <circle cx="85" cy="86" r="2.5" fill="#CF4500" filter="url(#node-glow)" />
          <circle cx="75" cy="91" r="1.5" fill="#141413" opacity="0.6" />
          <circle cx="85" cy="91" r="1.8" fill="#CF4500" />
        </g>
      );

    // ─── 2. BLEPHAROPLASTY ─────────────────────────────────────────────────────
    case 'blepharoplasty':
      return (
        <g>
          {/* Base Face Contour */}
          <path
            d="M80 24 C50 24 38 48 38 80 C38 112 56 136 80 136 C104 136 122 112 122 80 C122 48 110 24 80 24 Z"
            stroke="#141413"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.4)"
          />
          {/* Nose & Mouth */}
          <path d="M80 70 L78 88 Q80 92 82 88" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M68 110 Q80 113 92 110" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />

          {/* LEFT: Hooded Eyelid / Dermatochalasis */}
          {/* Drooping hooding skin crease */}
          <path d="M48 64 Q64 58 76 66" stroke="#141413" strokeWidth="1.2" />
          <path d="M48 68 Q62 65 74 72" stroke="#141413" strokeWidth="1.2" strokeDasharray="2 2" opacity="0.7" />
          <path d="M50 72 Q62 76 74 73" stroke="#141413" strokeWidth="1" fill="rgba(20,20,19,0.06)" />
          <circle cx="62" cy="72" r="2" fill="#141413" opacity="0.7" />

          {/* RIGHT: Cleared Upper Blepharoplasty & Canthal Elevation */}
          {/* Elevated arched brow */}
          <path d="M84 63 Q96 56 112 61" stroke="#141413" strokeWidth="1.3" />
          {/* Crisp supratarsal fold */}
          <path d="M86 64 Q98 60 110 63" stroke="#CF4500" strokeWidth="1.5" />
          {/* Open palpebral fissure */}
          <path d="M86 70 Q98 64 110 68 Q98 75 86 70" stroke="#141413" strokeWidth="1.2" fill="#fff" />
          <circle cx="98" cy="69" r="2.8" fill="#CF4500" filter="url(#node-glow)" />
          {/* Lateral Canthal Lift Vector */}
          <line x1="110" y1="68" x2="116" y2="64" stroke="#F37338" strokeWidth="1.4" strokeLinecap="round" />
          <polygon points="116,63 117,67 113,65" fill="#CF4500" />
          {/* Excised crescent zone */}
          <path d="M86 64 Q98 60 110 63 Q98 66 86 70 Z" fill="rgba(207,69,0,0.12)" />
        </g>
      );

    // ─── 3. FACELIFT ───────────────────────────────────────────────────────────
    case 'facelift':
      return (
        <g>
          {/* Central features */}
          <path d="M62 68 Q70 66 76 68" stroke="#141413" strokeWidth="1" />
          <path d="M84 68 Q90 66 98 68" stroke="#141413" strokeWidth="1" />
          <path d="M80 66 L78 84 Q80 87 82 84" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M72 104 Q80 106 88 104" stroke="#141413" strokeWidth="1.2" />

          {/* LEFT: Sagging Jowls & Deep Nasolabial Fold */}
          <path
            d="M80 24 C50 24 38 48 38 78 C38 96 42 110 50 118 C58 126 68 135 80 136"
            stroke="#141413"
            strokeWidth="1.2"
            strokeDasharray="2.5 2.5"
            opacity="0.6"
          />
          {/* Drooping jowl bulge */}
          <path d="M46 106 Q42 118 52 124" stroke="#141413" strokeWidth="1.4" opacity="0.7" />
          <path d="M68 84 Q62 96 66 108" stroke="#141413" strokeWidth="1.2" opacity="0.6" />

          {/* RIGHT: SMAS Deep-Plane Lift Vectors & Defined Jawline */}
          <path
            d="M80 24 C106 24 122 48 122 74 C122 92 114 108 102 120 C92 130 84 135 80 136"
            stroke="#CF4500"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Lifted malar cheek highlight */}
          <ellipse cx="98" cy="80" rx="9" ry="6" transform="rotate(-15 98 80)" fill="rgba(207,69,0,0.12)" stroke="#CF4500" strokeWidth="1" />
          {/* Vector Arrows along 45° SMAS Vector */}
          <line x1="88" y1="108" x2="102" y2="88" stroke="#CF4500" strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points="104,86 104,91 99,88" fill="#CF4500" />
          <line x1="94" y1="116" x2="108" y2="98" stroke="#F37338" strokeWidth="1.3" strokeDasharray="3 2" />
          <polygon points="110,96 110,101 105,98" fill="#F37338" />
        </g>
      );

    // ─── 4. V-LINE CONTOURING ──────────────────────────────────────────────────
    case 'v-line-contouring':
      return (
        <g>
          {/* Eyes, Nose, Mouth */}
          <ellipse cx="64" cy="68" rx="6" ry="3.5" fill="#141413" />
          <ellipse cx="96" cy="68" rx="6" ry="3.5" fill="#141413" />
          <path d="M80 62 L78 78 Q80 82 82 78" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M70 98 Q80 102 90 98" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />

          {/* Forehead & Upper Skull */}
          <path d="M38 72 C38 42 54 26 80 26 C106 26 122 42 122 72" stroke="#141413" strokeWidth="1.2" fill="none" />

          {/* LEFT: Wide, Square Mandibular Gonial Angle (Dashed) */}
          <path
            d="M38 72 L38 98 Q40 114 56 124 L78 132"
            stroke="#141413"
            strokeWidth="1.4"
            strokeDasharray="2.5 2.5"
            opacity="0.6"
          />
          {/* Square jaw angle highlight */}
          <path d="M38 98 L56 124 L78 132 L78 120 L48 100 Z" fill="rgba(20,20,19,0.06)" />

          {/* RIGHT: Tapered V-Line Jaw & Refined Chin Apex */}
          <path
            d="M122 72 L118 90 Q112 110 92 126 L80 136"
            stroke="#CF4500"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Left post-op symmetrical preview */}
          <path d="M80 136 L68 126 Q48 110 42 90 L38 72" stroke="#CF4500" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />

          {/* Chin Apex Landmark Marker */}
          <circle cx="80" cy="136" r="2.8" fill="#CF4500" filter="url(#node-glow)" />
          {/* Tapering arrows */}
          <line x1="116" y1="104" x2="102" y2="108" stroke="#F37338" strokeWidth="1.4" />
          <polygon points="100,108 105,105 104,111" fill="#CF4500" />
        </g>
      );

    // ─── 5. LIP LIFT / LIP AUGMENTATION ────────────────────────────────────────
    case 'lip-lift':
    case 'lip-augmentation':
      return (
        <g>
          {/* Lower face background outline */}
          <path
            d="M44 48 C44 94 56 132 80 136 C104 132 116 94 116 48"
            stroke="#141413"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.4)"
          />
          {/* Subnasal base / nostrils */}
          <path d="M70 56 Q80 54 90 56" stroke="#141413" strokeWidth="1.4" strokeLinecap="round" />
          <ellipse cx="74" cy="56" rx="2.5" ry="1.5" fill="#141413" />
          <ellipse cx="86" cy="56" rx="2.5" ry="1.5" fill="#141413" />

          {/* LEFT: Long Philtrum (Before) */}
          <line x1="77" y1="58" x2="77" y2="84" stroke="#141413" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M58 88 Q68 85 76 86 Q80 88 80 88" stroke="#141413" strokeWidth="1.2" opacity="0.6" />
          <path d="M60 88 Q70 94 78 94" stroke="#141413" strokeWidth="1" opacity="0.6" />

          {/* Bullhorn Subnasal Excision Marking */}
          <path d="M72 58 Q80 62 88 58 Q80 65 72 58 Z" fill="rgba(207,69,0,0.18)" stroke="#CF4500" strokeWidth="1" />

          {/* RIGHT: Lifted Vermilion & Prominent Cupid's Bow */}
          <path
            d="M80 74 Q88 71 96 76 Q104 82 108 86 Q96 90 88 90 Q80 90 80 90"
            stroke="#CF4500"
            strokeWidth="1.8"
            fill="rgba(207,69,0,0.12)"
          />
          {/* Cupid's bow peak & tubercle */}
          <circle cx="85" cy="73" r="2" fill="#CF4500" filter="url(#node-glow)" />
          <ellipse cx="88" cy="82" rx="4" ry="2.5" fill="#F37338" opacity="0.5" />
          {/* Philtrum height measurement arrow */}
          <line x1="92" y1="58" x2="92" y2="72" stroke="#CF4500" strokeWidth="1.3" />
          <polygon points="92,74 90,70 94,70" fill="#CF4500" />
        </g>
      );

    // ─── 6. BOTOX / INJECTABLES ────────────────────────────────────────────────
    case 'botox':
    case 'masseter-botox':
    case 'profhilo':
    case 'kybella':
      return (
        <g>
          {/* Face Base */}
          <path
            d="M80 24 C50 24 38 48 38 80 C38 112 56 136 80 136 C104 136 122 112 122 80 C122 48 110 24 80 24 Z"
            stroke="#141413"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.4)"
          />
          {/* Eyes & Mouth */}
          <ellipse cx="64" cy="72" rx="6" ry="3.5" fill="#141413" />
          <ellipse cx="96" cy="72" rx="6" ry="3.5" fill="#141413" />
          <path d="M80 66 L78 84 Q80 87 82 84" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M68 108 Q80 112 92 108" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />

          {/* LEFT: Dynamic Expression Wrinkles */}
          {/* Forehead horizontal rhytids */}
          <path d="M52 42 Q64 45 76 43" stroke="#141413" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.6" />
          <path d="M50 49 Q64 52 76 50" stroke="#141413" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.6" />
          {/* Glabellar frown lines (11s) */}
          <line x1="75" y1="57" x2="75" y2="65" stroke="#141413" strokeWidth="1.2" opacity="0.7" />
          <line x1="78" y1="56" x2="78" y2="66" stroke="#141413" strokeWidth="1.2" opacity="0.7" />
          {/* Crow's feet */}
          <path d="M48 68 L42 66 M48 72 L40 72 M48 76 L42 78" stroke="#141413" strokeWidth="1" opacity="0.6" />

          {/* RIGHT: Precise Clinical Injection Dot Matrix */}
          {/* Glabellar injection units */}
          <circle cx="82" cy="60" r="2.5" fill="#CF4500" filter="url(#node-glow)" />
          <circle cx="88" cy="58" r="2.2" fill="#F37338" />
          {/* Frontalis injection grid */}
          <circle cx="88" cy="44" r="2.2" fill="#CF4500" />
          <circle cx="102" cy="46" r="2.2" fill="#F37338" />
          <circle cx="94" cy="51" r="2.2" fill="#CF4500" />
          {/* Lateral periorbital crow's feet injection pattern */}
          <circle cx="108" cy="68" r="2.2" fill="#CF4500" />
          <circle cx="112" cy="73" r="2.2" fill="#F37338" />
          <circle cx="108" cy="78" r="2.2" fill="#CF4500" />

          {/* Concentric relaxation ripple */}
          <circle cx="96" cy="48" r="8" stroke="#CF4500" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.4" />
        </g>
      );

    // ─── 7. CHIN AUGMENTATION ──────────────────────────────────────────────────
    case 'chin-augmentation':
      return (
        <g>
          {/* Full face outline */}
          <path
            d="M80 24 C50 24 38 48 38 80 C38 112 56 130 76 132"
            stroke="#141413"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M80 24 C104 24 122 48 122 80 C122 112 110 128 84 138"
            stroke="#CF4500"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Features */}
          <ellipse cx="64" cy="70" rx="6" ry="3.5" fill="#141413" />
          <ellipse cx="96" cy="70" rx="6" ry="3.5" fill="#141413" />
          <path d="M80 64 L78 82 Q80 86 82 82" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M68 102 Q80 106 92 102" stroke="#141413" strokeWidth="1.2" strokeLinecap="round" />

          {/* LEFT: Retruded Chin (Dashed) */}
          <path d="M66 118 Q74 124 78 126" stroke="#141413" strokeWidth="1.3" strokeDasharray="2 2" opacity="0.6" />

          {/* RIGHT: Advanced Pogonion with Chin Implant / Genioplasty Arc */}
          <path
            d="M80 124 Q88 128 92 134 Q86 140 80 140"
            stroke="#CF4500"
            strokeWidth="2"
            fill="rgba(207,69,0,0.14)"
          />
          {/* Forward Projection Vector */}
          <line x1="82" y1="130" x2="96" y2="134" stroke="#CF4500" strokeWidth="1.5" />
          <polygon points="98,135 94,131 93,137" fill="#CF4500" />
          <circle cx="80" cy="140" r="2.5" fill="#CF4500" filter="url(#node-glow)" />
        </g>
      );

    // ─── 8. BROW LIFT ──────────────────────────────────────────────────────────
    case 'brow-lift':
      return (
        <g>
          {/* Face base */}
          <path
            d="M80 24 C50 24 38 48 38 80 C38 112 56 136 80 136 C104 136 122 112 122 80 C122 48 110 24 80 24 Z"
            stroke="#141413"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.4)"
          />
          {/* Nose & Mouth */}
          <path d="M80 66 L78 84 Q80 87 82 84" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M68 108 Q80 112 92 108" stroke="#141413" strokeWidth="1.2" />

          {/* LEFT: Drooping, Ptotic Brow Tail */}
          <path d="M50 63 Q62 58 74 62" stroke="#141413" strokeWidth="1.4" strokeDasharray="2 2" opacity="0.6" />
          <path d="M52 72 Q63 68 74 72 Q63 76 52 72" stroke="#141413" strokeWidth="1" fill="#fff" />
          <circle cx="63" cy="72" r="2" fill="#141413" opacity="0.7" />

          {/* RIGHT: Elevated Youthful Brow Arch */}
          <path d="M86 60 Q96 48 112 54" stroke="#CF4500" strokeWidth="2" strokeLinecap="round" />
          <path d="M86 70 Q97 64 108 68 Q97 75 86 70" stroke="#141413" strokeWidth="1.2" fill="#fff" />
          <circle cx="97" cy="69" r="2.8" fill="#CF4500" filter="url(#node-glow)" />

          {/* Temporal Suspension Vectors */}
          <line x1="98" y1="52" x2="104" y2="40" stroke="#F37338" strokeWidth="1.5" />
          <polygon points="106,38 106,43 101,41" fill="#CF4500" />
          <line x1="110" y1="56" x2="116" y2="44" stroke="#F37338" strokeWidth="1.3" />
          <polygon points="118,42 118,47 113,45" fill="#F37338" />
        </g>
      );

    // ─── 9. OTOPLASTY ──────────────────────────────────────────────────────────
    case 'otoplasty':
      return (
        <g>
          {/* Head profile / back contour */}
          <path d="M80 30 C56 30 50 50 50 80 C50 110 58 130 80 134 C102 130 110 110 110 80 C110 50 104 30 80 30 Z" stroke="#141413" strokeWidth="1.2" fill="rgba(255,255,255,0.4)" />
          {/* Central facial features */}
          <ellipse cx="68" cy="74" rx="4" ry="2.5" fill="#141413" />
          <ellipse cx="92" cy="74" rx="4" ry="2.5" fill="#141413" />
          <path d="M74 106 Q80 108 86 106" stroke="#141413" strokeWidth="1" />

          {/* LEFT: Protruding / Prominent Ear (Conchal Hypertrophy) */}
          <path
            d="M50 64 C32 60 26 76 30 92 C34 100 48 104 52 98"
            stroke="#141413"
            strokeWidth="1.4"
            strokeDasharray="2.5 2.5"
            opacity="0.6"
          />

          {/* RIGHT: Corrected Setback Ear & Created Antihelical Fold */}
          <path
            d="M110 64 C120 62 124 74 122 88 C120 96 112 100 110 98"
            stroke="#CF4500"
            strokeWidth="1.8"
            fill="rgba(207,69,0,0.12)"
          />
          {/* Conchal setback vector */}
          <line x1="126" y1="78" x2="114" y2="80" stroke="#CF4500" strokeWidth="1.4" />
          <polygon points="112,80 116,77 117,83" fill="#CF4500" />
        </g>
      );

    // ─── 10. DENTAL / SMILE (Veneers, Smile Design, Whitening, Gummy Smile) ───
    case 'veneers':
    case 'smile-design':
    case 'teeth-whitening':
    case 'gummy-smile':
      return (
        <g>
          {/* Lower face & mouth opening */}
          <path d="M48 50 C48 94 60 130 80 134 C100 130 112 94 112 50" stroke="#141413" strokeWidth="1.2" fill="rgba(255,255,255,0.4)" />
          {/* Lips border */}
          <path d="M52 86 Q80 76 108 86 Q80 94 52 86 Z" stroke="#141413" strokeWidth="1.3" fill="none" />
          <path d="M56 86 Q80 104 104 86 Q80 110 56 86 Z" stroke="#141413" strokeWidth="1.3" fill="none" />

          {/* Dental Arch Opening */}
          <path d="M60 88 Q80 84 100 88 Q80 98 60 88 Z" fill="#141413" />

          {/* Teeth Grid */}
          {/* LEFT: Irregular/Uneven Teeth */}
          <rect x="64" y="87" width="7" height="8" rx="1" fill="#EBE7E3" stroke="#141413" strokeWidth="0.8" />
          <rect x="72" y="86" width="7.5" height="9.5" rx="1" fill="#EBE7E3" stroke="#141413" strokeWidth="0.8" />

          {/* RIGHT: Perfectly Proportioned Golden-Ratio Veneers */}
          <rect x="80.5" y="85" width="8" height="11" rx="1" fill="#fff" stroke="#CF4500" strokeWidth="1.2" />
          <rect x="89.5" y="86" width="7" height="9.5" rx="1" fill="#fff" stroke="#CF4500" strokeWidth="1" />

          {/* Aesthetic Smile Arc Curvature */}
          <path d="M80 96 Q90 97 100 90" stroke="#F37338" strokeWidth="1.5" strokeLinecap="round" />
          {/* Radiance sparkle */}
          <polygon points="98,82 100,77 102,82 107,84 102,86 100,91 98,86 93,84" fill="#CF4500" filter="url(#node-glow)" />
        </g>
      );

    // ─── 11. HAIR (DHI Transplant, PRP, Laser Hair) ───────────────────────────
    case 'dhi-hair-transplant':
    case 'prp-hair':
    case 'laser-hair-removal':
      return (
        <g>
          {/* Head & Cranium */}
          <path d="M80 24 C50 24 38 48 38 80 C38 112 56 136 80 136 C104 136 122 112 122 80 C122 48 110 24 80 24 Z" stroke="#141413" strokeWidth="1.2" fill="rgba(255,255,255,0.4)" />
          {/* Facial features */}
          <ellipse cx="64" cy="74" rx="5" ry="3" fill="#141413" />
          <ellipse cx="96" cy="74" rx="5" ry="3" fill="#141413" />
          <path d="M80 70 L78 86 Q80 89 82 86" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M72 106 Q80 109 88 106" stroke="#141413" strokeWidth="1.2" />

          {/* LEFT: Receded Norwood Hairline (Dashed) */}
          <path d="M40 70 Q44 48 66 52 Q76 56 80 56" stroke="#141413" strokeWidth="1.3" strokeDasharray="2.5 2.5" opacity="0.6" />

          {/* RIGHT: Reconstructed Dense Hairline & Follicular Matrix */}
          <path d="M80 40 Q94 38 112 46 Q120 56 120 70" stroke="#CF4500" strokeWidth="1.8" fill="none" />
          {/* Follicular micro-graft points */}
          <circle cx="85" cy="44" r="1.5" fill="#CF4500" />
          <circle cx="92" cy="42" r="1.5" fill="#F37338" />
          <circle cx="100" cy="43" r="1.5" fill="#CF4500" />
          <circle cx="107" cy="47" r="1.5" fill="#F37338" />
          <circle cx="88" cy="48" r="1.5" fill="#CF4500" />
          <circle cx="96" cy="47" r="1.5" fill="#F37338" />
          <circle cx="104" cy="50" r="1.5" fill="#CF4500" />
          <circle cx="112" cy="54" r="1.5" fill="#F37338" />
          <circle cx="94" cy="53" r="1.5" fill="#CF4500" />
          <circle cx="102" cy="55" r="1.5" fill="#CF4500" />
        </g>
      );

    // ─── 12. BODY (Breast, Liposuction, BBL, Tummy Tuck) ──────────────────────
    case 'breast-augmentation':
    case 'liposuction':
    case 'bbl':
    case 'tummy-tuck':
      return (
        <g>
          {/* Torso / Body Silhouette */}
          {/* Left: Pre-contour silhouette */}
          <path
            d="M80 28 C64 36 50 56 46 80 C42 104 46 122 52 136 L80 136"
            stroke="#141413"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          {/* Right: Sculpted Hourglass / Refined Silhouette */}
          <path
            d="M80 28 C96 34 114 54 114 74 C114 88 100 96 102 110 C104 122 116 128 116 136 L80 136"
            stroke="#CF4500"
            strokeWidth="2"
            fill="rgba(207,69,0,0.1)"
          />
          {/* Anatomical contour vectors */}
          <path d="M80 50 Q96 52 108 66" stroke="#CF4500" strokeWidth="1.4" />
          <path d="M80 92 Q94 94 102 110" stroke="#F37338" strokeWidth="1.4" />
          <circle cx="106" cy="70" r="2.5" fill="#CF4500" filter="url(#node-glow)" />
          <line x1="84" y1="74" x2="104" y2="74" stroke="#CF4500" strokeWidth="1.2" strokeDasharray="2 2" />
        </g>
      );

    // ─── 13. SKIN / NON-SURGICAL (Peels, Lasers, RF, HIFU, Microneedling) ─────
    case 'chemical-peel':
    case 'laser-resurfacing':
    case 'microneedling':
    case 'hifu':
    case 'rf-skin-tightening':
    default:
      return (
        <g>
          {/* Base Face Contour */}
          <path
            d="M80 24 C50 24 38 48 38 80 C38 112 56 136 80 136 C104 136 122 112 122 80 C122 48 110 24 80 24 Z"
            stroke="#141413"
            strokeWidth="1.2"
            fill="rgba(255,255,255,0.4)"
          />
          {/* Facial features */}
          <ellipse cx="64" cy="72" rx="6" ry="3.5" fill="#141413" />
          <ellipse cx="96" cy="72" rx="6" ry="3.5" fill="#141413" />
          <path d="M80 66 L78 84 Q80 87 82 84" stroke="#141413" strokeWidth="1" fill="none" />
          <path d="M68 108 Q80 112 92 108" stroke="#141413" strokeWidth="1.2" />

          {/* Dermal Mesh / Micro-Lattice Overlay (468 Landmark Tracking) */}
          {/* Cheek mesh lattice */}
          <line x1="86" y1="78" x2="108" y2="82" stroke="#CF4500" strokeWidth="0.8" strokeDasharray="2 1.5" />
          <line x1="88" y1="88" x2="112" y2="92" stroke="#CF4500" strokeWidth="0.8" strokeDasharray="2 1.5" />
          <line x1="90" y1="98" x2="108" y2="104" stroke="#CF4500" strokeWidth="0.8" strokeDasharray="2 1.5" />
          <line x1="94" y1="74" x2="94" y2="106" stroke="#F37338" strokeWidth="0.8" strokeDasharray="2 1.5" />
          <line x1="104" y1="76" x2="104" y2="104" stroke="#F37338" strokeWidth="0.8" strokeDasharray="2 1.5" />

          {/* Landmark coordinate nodes */}
          <circle cx="94" cy="78" r="2.2" fill="#CF4500" />
          <circle cx="104" cy="82" r="2.2" fill="#F37338" />
          <circle cx="94" cy="88" r="2.5" fill="#CF4500" filter="url(#node-glow)" />
          <circle cx="104" cy="92" r="2.2" fill="#CF4500" />
          <circle cx="94" cy="98" r="2.2" fill="#F37338" />
          <circle cx="104" cy="102" r="2.2" fill="#CF4500" />
        </g>
      );
  }
}

