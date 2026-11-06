// The only mm/degree envelope for the rhinoplasty controls; keep no second unit table.
// Engine-free so server components can read it; rhinoplasty.ts re-exports it.

export interface ClinicalRange {
    min: number;
    max: number;
    unit: string;
    label: string;
}

export const CLINICAL_RANGES: Record<string, ClinicalRange> = {
    dorsalProfile: {
        min: -4,
        max: 4,
        unit: "mm",
        label: "Hump reduction / augmentation",
    },
    tipRotation: {
        min: -15,
        max: 15,
        unit: "°",
        label: "Rotation angle",
    },
    tipProjection: {
        min: -5,
        max: 5,
        unit: "mm",
        label: "Tip forward/backward displacement",
    },
    bridgeWidth: {
        min: -4,
        max: 4,
        unit: "mm",
        label: "Bridge narrowing (+) / widening (-)", // INVERTED per clinical feedback
    },
    nostrilWidth: {
        min: -4,
        max: 4,
        unit: "mm",
        label: "Alar base width",
    },
    tipRefinement: {
        min: -3,
        max: 3,
        unit: "mm",
        label: "Tip width (+narrow / -widen)",
    },
    nasalLength: {
        min: -5,
        max: 5,
        unit: "mm",
        label: "Length change",
    },
    deviationCorrection: {
        min: -3,
        max: 3,
        unit: "mm",
        label: "3-zone deviation correction",
    },

    // Lateral osteotomy on the bony vault (218/237, 438/457), distinct from mid-vault bridgeWidth.
    // PROVISIONAL: ±3 mm is not surgeon-signed and has no published delta to fall back on.
    bonyBaseWidth: {
        min: -3,
        max: 3,
        unit: "mm",
        label: "Bony base narrowing (+) / widening (-)", // sign matches bridgeWidth
    },

    // Side offsets share the parent's envelope: parent + offset is clamped (combineUnilateral).
    // "Left"/"Right" are the PATIENT'S sides.
    nostrilWidthLeft: {
        min: -4,
        max: 4,
        unit: "mm",
        label: "Alar base width, patient's left",
    },
    nostrilWidthRight: {
        min: -4,
        max: 4,
        unit: "mm",
        label: "Alar base width, patient's right",
    },
    bonyBaseWidthLeft: {
        min: -3,
        max: 3,
        unit: "mm",
        label: "Bony base width, patient's left", // provisional, see bonyBaseWidth
    },
    bonyBaseWidthRight: {
        min: -3,
        max: 3,
        unit: "mm",
        label: "Bony base width, patient's right", // provisional, see bonyBaseWidth
    },
    bridgeWidthLeft: { min: -4, max: 4, unit: "mm", label: "Bridge width, patient's left" },
    bridgeWidthRight: { min: -4, max: 4, unit: "mm", label: "Bridge width, patient's right" },
    tipRefinementLeft: { min: -3, max: 3, unit: "mm", label: "Tip width, patient's left" },
    tipRefinementRight: { min: -3, max: 3, unit: "mm", label: "Tip width, patient's right" },
};

// Maps a UI slider value (-100 to +100) onto its clinical range: tipProjection +50 gives "+2.5mm".
export function getClinicalValue(
    parameterId: string,
    uiValue: number,
): string {
    const range = CLINICAL_RANGES[parameterId];
    if (!range) return "N/A";

    // Map UI value [-100, +100] to clinical range [min, max]
    // Linear interpolation: -100 -> min, 0 -> 0, +100 -> max
    let clinicalValue: number;
    if (uiValue > 0) {
        clinicalValue = (uiValue / 100) * range.max;
    } else if (uiValue < 0) {
        // For negative UI values, scale toward the minimum (which is negative)
        // e.g., -100 -> -1, then -1 * 5 = -5 (using absolute value of min)
        clinicalValue = (uiValue / 100) * Math.abs(range.min);
    } else {
        clinicalValue = 0;
    }

    // Format with 1 decimal place
    const formatted = Math.abs(clinicalValue).toFixed(1);
    const sign = clinicalValue > 0 ? "+" : clinicalValue < 0 ? "-" : "";

    return `${sign}${formatted}${range.unit}`;
}
