/**
 * ProcedureIcon — Anatomical SVG diagrams replacing emoji icons.
 *
 * Three base silhouettes (face-front, face-profile, body-front) with
 * procedure-specific highlight zones rendered in the brand sage colour
 * with a subtle pulse animation.
 */

import React from 'react';
import type { ProcedureCategoryKey } from '@/data/procedures';

interface ProcedureIconProps {
    slug: string;
    size?: number;
    className?: string;
    /** Optional category — drives a distinct fallback highlight zone when the
     *  slug has no bespoke diagram, so generic cards differ per category. */
    category?: ProcedureCategoryKey;
}

// ── Colour tokens ──────────────────────────────────────────────────────────
const STROKE = '#b0bab3';       // muted sage outline
const HIGHLIGHT = '#7C9082';    // brand sage
const HIGHLIGHT_GLOW = 'rgba(124,144,130,0.35)';

// ── Base silhouettes ───────────────────────────────────────────────────────

function FaceFront({ children, size }: { children?: React.ReactNode; size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head outline */}
            <ellipse cx="32" cy="28" rx="16" ry="20" stroke={STROKE} strokeWidth="1.2" fill="none" />
            {/* Neck */}
            <path d="M26 46 L26 54 M38 46 L38 54" stroke={STROKE} strokeWidth="1.2" strokeLinecap="round" />
            {/* Ears */}
            <path d="M16 24 Q13 28 16 32" stroke={STROKE} strokeWidth="1" fill="none" />
            <path d="M48 24 Q51 28 48 32" stroke={STROKE} strokeWidth="1" fill="none" />
            {/* Eyes (minimal) */}
            <ellipse cx="25" cy="26" rx="3.5" ry="1.8" stroke={STROKE} strokeWidth="0.8" fill="none" />
            <ellipse cx="39" cy="26" rx="3.5" ry="1.8" stroke={STROKE} strokeWidth="0.8" fill="none" />
            {/* Nose */}
            <path d="M32 24 L30 33 Q32 35 34 33 L32 24" stroke={STROKE} strokeWidth="0.8" fill="none" />
            {/* Mouth */}
            <path d="M27 38 Q32 41 37 38" stroke={STROKE} strokeWidth="0.8" fill="none" />
            {/* Procedure-specific highlights */}
            {children}
        </svg>
    );
}

function FaceProfile({ children, size }: { children?: React.ReactNode; size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head profile outline */}
            <path
                d="M40 8 Q20 8 18 20 Q16 28 18 32 L16 36 Q15 38 18 40 L20 42 Q22 46 24 48 L24 56"
                stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round"
            />
            {/* Back of head */}
            <path d="M40 8 Q50 12 50 24 Q50 36 44 44 L38 48 L34 56" stroke={STROKE} strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Ear */}
            <path d="M46 22 Q50 26 46 30" stroke={STROKE} strokeWidth="1" fill="none" />
            {/* Eye */}
            <ellipse cx="28" cy="24" rx="3" ry="1.5" stroke={STROKE} strokeWidth="0.8" fill="none" />
            {/* Nose */}
            <path d="M18 26 L14 32 L18 34" stroke={STROKE} strokeWidth="0.8" fill="none" strokeLinejoin="round" />
            {/* Lips */}
            <path d="M18 38 L22 37 M18 38 L22 40" stroke={STROKE} strokeWidth="0.8" fill="none" />
            {/* Procedure-specific highlights */}
            {children}
        </svg>
    );
}

function BodyFront({ children, size }: { children?: React.ReactNode; size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="32" cy="10" r="6" stroke={STROKE} strokeWidth="1.2" fill="none" />
            {/* Neck */}
            <path d="M30 16 L30 19 M34 16 L34 19" stroke={STROKE} strokeWidth="1" />
            {/* Shoulders */}
            <path d="M30 19 Q22 19 16 24" stroke={STROKE} strokeWidth="1.2" fill="none" />
            <path d="M34 19 Q42 19 48 24" stroke={STROKE} strokeWidth="1.2" fill="none" />
            {/* Torso */}
            <path d="M16 24 L18 48 M48 24 L46 48" stroke={STROKE} strokeWidth="1.2" />
            {/* Waist */}
            <path d="M18 48 Q32 46 46 48" stroke={STROKE} strokeWidth="1" fill="none" />
            {/* Hips */}
            <path d="M18 48 L20 58 M46 48 L44 58" stroke={STROKE} strokeWidth="1.2" />
            {/* Arms */}
            <path d="M16 24 L10 42" stroke={STROKE} strokeWidth="1" />
            <path d="M48 24 L54 42" stroke={STROKE} strokeWidth="1" />
            {/* Procedure-specific highlights */}
            {children}
        </svg>
    );
}

// ── Highlight zone component with pulse animation ──────────────────────────

function HighlightZone({ d, cx, cy, rx, ry, type = 'path' }: {
    d?: string;
    cx?: number; cy?: number; rx?: number; ry?: number;
    type?: 'path' | 'ellipse' | 'circle';
}) {
    const pulse = <animate attributeName="opacity" values="0.45;0.75;0.45" dur="2.5s" repeatCount="indefinite" />;

    if (type === 'ellipse') {
        return (
            <>
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={HIGHLIGHT_GLOW}>{pulse}</ellipse>
                <ellipse cx={cx} cy={cy} rx={rx} ry={ry} stroke={HIGHLIGHT} strokeWidth="1.5" fill="none" />
            </>
        );
    }

    if (type === 'circle') {
        return (
            <>
                <circle cx={cx} cy={cy} r={rx} fill={HIGHLIGHT_GLOW}>{pulse}</circle>
                <circle cx={cx} cy={cy} r={rx} stroke={HIGHLIGHT} strokeWidth="1.5" fill="none" />
            </>
        );
    }

    return (
        <>
            <path d={d} fill={HIGHLIGHT_GLOW}>{pulse}</path>
            <path d={d} stroke={HIGHLIGHT} strokeWidth="1.5" fill="none" />
        </>
    );
}

// ── Procedure-specific icon mappings ───────────────────────────────────────

function getIcon(slug: string, size: number, category?: ProcedureCategoryKey): React.ReactNode {
    switch (slug) {
        // ── Surgical ───────────────────────────────────────────────────
        case 'rhinoplasty':
            return (
                <FaceProfile size={size}>
                    {/* Nose highlight */}
                    <HighlightZone d="M18 26 L14 32 L18 34 Q20 30 18 26Z" />
                </FaceProfile>
            );

        case 'chin-augmentation':
            return (
                <FaceProfile size={size}>
                    {/* Chin highlight */}
                    <HighlightZone d="M18 40 Q16 44 20 46 Q24 48 26 46 Q22 44 20 42Z" />
                </FaceProfile>
            );

        case 'v-line-contouring':
            return (
                <FaceFront size={size}>
                    {/* Jawline + chin highlight */}
                    <HighlightZone d="M20 36 Q18 42 22 46 Q28 50 32 50 Q36 50 42 46 Q46 42 44 36 Q40 40 32 42 Q24 40 20 36Z" />
                </FaceFront>
            );

        case 'buccal-fat-removal':
            return (
                <FaceFront size={size}>
                    {/* Cheek highlights (bilateral) */}
                    <HighlightZone type="ellipse" cx={21} cy={32} rx={4} ry={4.5} />
                    <HighlightZone type="ellipse" cx={43} cy={32} rx={4} ry={4.5} />
                </FaceFront>
            );

        case 'blepharoplasty':
            return (
                <FaceFront size={size}>
                    {/* Eye area highlights */}
                    <HighlightZone type="ellipse" cx={25} cy={26} rx={5} ry={3.5} />
                    <HighlightZone type="ellipse" cx={39} cy={26} rx={5} ry={3.5} />
                </FaceFront>
            );

        case 'facelift':
            return (
                <FaceFront size={size}>
                    {/* Lower face + jawline highlight */}
                    <HighlightZone d="M18 30 Q16 38 18 44 Q22 50 32 50 Q42 50 46 44 Q48 38 46 30 Q42 34 32 36 Q22 34 18 30Z" />
                </FaceFront>
            );

        case 'lip-lift':
            return (
                <FaceFront size={size}>
                    {/* Upper lip / philtrum highlight */}
                    <HighlightZone d="M28 33 Q32 34 36 33 L37 38 Q32 41 27 38Z" />
                </FaceFront>
            );

        // ── Non-Surgical ───────────────────────────────────────────────
        case 'chemical-peels':
            return (
                <FaceFront size={size}>
                    {/* Full face skin overlay */}
                    <HighlightZone type="ellipse" cx={32} cy={28} rx={14} ry={18} />
                </FaceFront>
            );

        case 'laser-resurfacing':
            return (
                <FaceFront size={size}>
                    {/* Full face with scan line effect */}
                    <HighlightZone type="ellipse" cx={32} cy={28} rx={14} ry={18} />
                    <line x1="18" y1="28" x2="46" y2="28" stroke={HIGHLIGHT} strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                </FaceFront>
            );

        case 'thread-lift':
            return (
                <FaceFront size={size}>
                    {/* Lift vector lines on midface */}
                    <line x1="22" y1="36" x2="20" y2="24" stroke={HIGHLIGHT} strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowUp)" />
                    <line x1="42" y1="36" x2="44" y2="24" stroke={HIGHLIGHT} strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowUp)" />
                    <defs>
                        <marker id="arrowUp" markerWidth="4" markerHeight="4" refX="2" refY="4" orient="auto">
                            <path d="M0 4 L2 0 L4 4" fill="none" stroke={HIGHLIGHT} strokeWidth="1" />
                        </marker>
                    </defs>
                </FaceFront>
            );

        // ── Injectable ─────────────────────────────────────────────────
        case 'botox':
            return (
                <FaceFront size={size}>
                    {/* Forehead + crow's feet dots */}
                    <HighlightZone type="ellipse" cx={32} cy={16} rx={10} ry={5} />
                    <circle cx={19} cy={25} r={1.5} fill={HIGHLIGHT} opacity="0.7" />
                    <circle cx={45} cy={25} r={1.5} fill={HIGHLIGHT} opacity="0.7" />
                </FaceFront>
            );

        case 'dermal-fillers':
            return (
                <FaceFront size={size}>
                    {/* Lips + cheek injection points */}
                    <HighlightZone d="M27 37 Q32 42 37 37 Q32 39 27 37Z" />
                    <circle cx={22} cy={30} r={2} fill={HIGHLIGHT_GLOW} stroke={HIGHLIGHT} strokeWidth="1" />
                    <circle cx={42} cy={30} r={2} fill={HIGHLIGHT_GLOW} stroke={HIGHLIGHT} strokeWidth="1" />
                </FaceFront>
            );

        case 'fat-grafting':
            return (
                <FaceFront size={size}>
                    {/* Under-eye + cheek volume zones */}
                    <HighlightZone type="ellipse" cx={25} cy={30} rx={4} ry={2.5} />
                    <HighlightZone type="ellipse" cx={39} cy={30} rx={4} ry={2.5} />
                </FaceFront>
            );

        // ── Dental ─────────────────────────────────────────────────────
        case 'smile-design':
        case 'teeth-whitening':
        case 'veneers':
            return (
                <FaceFront size={size}>
                    {/* Mouth/teeth highlight */}
                    <HighlightZone d="M26 36 Q32 34 38 36 Q38 42 32 44 Q26 42 26 36Z" />
                </FaceFront>
            );

        case 'gummy-smile':
            return (
                <FaceFront size={size}>
                    {/* Upper gum / lip line */}
                    <HighlightZone d="M26 34 Q32 32 38 34 L38 38 Q32 36 26 38Z" />
                </FaceFront>
            );

        // ── Body Contouring ────────────────────────────────────────────
        case 'breast-augmentation':
            return (
                <BodyFront size={size}>
                    {/* Chest highlight */}
                    <HighlightZone type="ellipse" cx={26} cy={30} rx={5} ry={4} />
                    <HighlightZone type="ellipse" cx={38} cy={30} rx={5} ry={4} />
                </BodyFront>
            );

        case 'liposuction':
            return (
                <BodyFront size={size}>
                    {/* Abdomen + flanks highlight */}
                    <HighlightZone d="M20 32 Q18 40 20 48 Q32 46 44 48 Q46 40 44 32 Q38 30 32 30 Q26 30 20 32Z" />
                </BodyFront>
            );

        case 'tummy-tuck':
            return (
                <BodyFront size={size}>
                    {/* Lower abdomen highlight */}
                    <HighlightZone d="M22 38 Q32 36 42 38 Q44 46 42 48 Q32 46 22 48 Q20 46 22 38Z" />
                </BodyFront>
            );

        case 'bbl':
            return (
                <BodyFront size={size}>
                    {/* Hip/buttock highlight */}
                    <HighlightZone d="M18 48 Q16 52 20 58 Q26 60 32 58 Q38 60 44 58 Q48 52 46 48 Q32 46 18 48Z" />
                </BodyFront>
            );

        // ── Hair Restoration ───────────────────────────────────────────
        case 'hair-transplant':
            return (
                <FaceFront size={size}>
                    {/* Scalp / hairline highlight */}
                    <HighlightZone d="M20 10 Q24 6 32 6 Q40 6 44 10 Q46 14 44 18 Q38 12 32 12 Q26 12 20 18 Q18 14 20 10Z" />
                </FaceFront>
            );

        case 'eyebrow-restoration':
            return (
                <FaceFront size={size}>
                    {/* Brow area highlights */}
                    <HighlightZone d="M20 22 Q25 19 30 22" />
                    <HighlightZone d="M34 22 Q39 19 44 22" />
                </FaceFront>
            );

        case 'scalp-micropigmentation':
            return (
                <FaceFront size={size}>
                    {/* Full scalp highlight */}
                    <HighlightZone d="M18 18 Q16 12 20 8 Q28 4 32 4 Q36 4 44 8 Q48 12 46 18 Q40 14 32 14 Q24 14 18 18Z" />
                    {/* Dot pattern for SMP */}
                    <circle cx={28} cy={10} r={0.8} fill={HIGHLIGHT} opacity="0.5" />
                    <circle cx={32} cy={8} r={0.8} fill={HIGHLIGHT} opacity="0.5" />
                    <circle cx={36} cy={10} r={0.8} fill={HIGHLIGHT} opacity="0.5" />
                    <circle cx={30} cy={12} r={0.8} fill={HIGHLIGHT} opacity="0.5" />
                    <circle cx={34} cy={12} r={0.8} fill={HIGHLIGHT} opacity="0.5" />
                </FaceFront>
            );

        case 'beard-transplant':
            return (
                <FaceFront size={size}>
                    {/* Lower face / beard zone */}
                    <HighlightZone d="M20 36 Q18 40 20 46 Q26 50 32 50 Q38 50 44 46 Q46 40 44 36 Q40 38 32 38 Q24 38 20 36Z" />
                </FaceFront>
            );

        case 'hairline-lowering':
            return (
                <FaceFront size={size}>
                    {/* Forehead / hairline highlight */}
                    <HighlightZone d="M20 10 Q24 6 32 6 Q40 6 44 10 Q44 16 40 18 Q34 14 32 14 Q30 14 24 18 Q20 16 20 10Z" />
                    {/* Downward arrow indicating lowering */}
                    <line x1="32" y1="8" x2="32" y2="16" stroke={HIGHLIGHT} strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M29 14 L32 17 L35 14" stroke={HIGHLIGHT} strokeWidth="1.2" fill="none" strokeLinecap="round" />
                </FaceFront>
            );

        case 'brow-lift':
            return (
                <FaceFront size={size}>
                    {/* Brow + forehead highlight */}
                    <HighlightZone d="M18 18 Q20 12 32 12 Q44 12 46 18 Q44 22 32 22 Q20 22 18 18Z" />
                    {/* Upward arrows */}
                    <line x1="25" y1="20" x2="25" y2="14" stroke={HIGHLIGHT} strokeWidth="1" strokeLinecap="round" />
                    <line x1="39" y1="20" x2="39" y2="14" stroke={HIGHLIGHT} strokeWidth="1" strokeLinecap="round" />
                </FaceFront>
            );

        case 'lip-augmentation':
            return (
                <FaceFront size={size}>
                    {/* Full lips highlight */}
                    <HighlightZone d="M26 37 Q32 34 38 37 Q38 42 32 44 Q26 42 26 37Z" />
                </FaceFront>
            );

        // ── Fallback ───────────────────────────────────────────────────
        // No bespoke diagram for this slug. Vary the highlight zone by
        // category so the ~57 generic cards are visually distinguishable
        // instead of all sharing one centred face-oval.
        default:
            return getCategoryFallbackIcon(size, category);
    }
}

// ── Category-level fallback diagrams ───────────────────────────────────────
// Used when a procedure has no slug-specific icon. Each category gets a
// recognisably different silhouette + highlight zone.
function getCategoryFallbackIcon(size: number, category?: ProcedureCategoryKey): React.ReactNode {
    switch (category) {
        case 'body-contouring':
            return (
                <BodyFront size={size}>
                    {/* Torso / waist contour zone */}
                    <HighlightZone d="M18 26 Q32 30 46 26 Q44 40 32 44 Q20 40 18 26Z" />
                </BodyFront>
            );

        case 'hair-restoration':
            return (
                <FaceFront size={size}>
                    {/* Scalp / hairline zone across the top of the head */}
                    <HighlightZone d="M18 14 Q20 8 32 8 Q44 8 46 14 Q40 12 32 12 Q24 12 18 14Z" />
                </FaceFront>
            );

        case 'dental':
            return (
                <FaceFront size={size}>
                    {/* Mouth / smile zone */}
                    <HighlightZone d="M24 37 Q32 34 40 37 Q40 42 32 44 Q24 42 24 37Z" />
                </FaceFront>
            );

        case 'injectable':
            return (
                <FaceFront size={size}>
                    {/* Mid-face injection points (cheeks) */}
                    <HighlightZone type="circle" cx={23} cy={31} rx={3.5} />
                    <HighlightZone type="circle" cx={41} cy={31} rx={3.5} />
                </FaceFront>
            );

        case 'non-surgical':
            return (
                <FaceFront size={size}>
                    {/* Skin-surface / resurfacing sweep across the cheeks */}
                    <HighlightZone d="M19 24 Q32 28 45 24 Q44 36 32 40 Q20 36 19 24Z" />
                </FaceFront>
            );

        case 'surgical':
            return (
                <FaceProfile size={size}>
                    {/* Profile contour zone — jaw + cheek */}
                    <HighlightZone d="M16 34 Q18 44 26 48 Q24 40 22 34 Q19 33 16 34Z" />
                </FaceProfile>
            );

        // Unknown / no category supplied — original generic face-oval.
        default:
            return (
                <FaceFront size={size}>
                    <HighlightZone type="ellipse" cx={32} cy={28} rx={14} ry={18} />
                </FaceFront>
            );
    }
}

// ── Exported component ─────────────────────────────────────────────────────

export default function ProcedureIcon({ slug, size = 48, className = '', category }: ProcedureIconProps) {
    return (
        <div className={`inline-flex items-center justify-center ${className}`}>
            {getIcon(slug, size, category)}
        </div>
    );
}

