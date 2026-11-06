/**
 * Capability detection for the simulator dimension toggle.
 *
 * Two independent dimensions:
 * - Device capability: does the user's browser/GPU support the 3D renderer?
 * - Procedure capability: does this specific procedure have a 3D renderer wired?
 *
 * Both must be true for the 3D mode to be selectable.
 */

export type Dimension = "2d" | "3d" | "realtime";

/**
 * Whether the Realtime (live-camera) mode is available in this build: on unless
 * NEXT_PUBLIC_REALTIME_OWN is "0", the kill switch. Inlined at build time.
 */
export function isRealtimeModeAvailable(): boolean {
    return process.env.NEXT_PUBLIC_REALTIME_OWN !== "0";
}

/**
 * Procedures that currently have a Realtime (live-camera) pipeline wired.
 *
 * Criterion for inclusion: the realtime loop actually renders THAT procedure's
 * deformation. Milestone-2 scope is rhinoplasty only — RealtimeWarpLoop owns
 * the rhinoplasty params itself and RealtimeMode discards the incoming
 * `procedureId`/`paramValues`, so any other slug silently renders rhinoplasty's
 * sliders and rhinoplasty's morph on the patient's face.
 *
 * Add a slug here ONLY once its deformation channels are wired into the warp
 * loop. Mirrors PROCEDURES_WITH_3D.
 */
export const PROCEDURES_WITH_REALTIME = new Set<string>([
    "rhinoplasty",
]);

/**
 * Returns true when this procedure has a wired Realtime pipeline AND the build
 * has Realtime enabled.
 *
 * The env flag alone is never sufficient: it is build-global, so gating on it
 * offered every procedure a live-camera mode that only ever rendered
 * rhinoplasty. Both gates must pass.
 *
 * Every Realtime gate — the toggle pill, the dimension resolver, and the
 * wrapper dispatch branch — calls this one function so they cannot disagree.
 */
export function isProcedureRealtimeCapable(slug: string | undefined): boolean {
    if (!slug) return false;
    if (!isRealtimeModeAvailable()) return false;
    return PROCEDURES_WITH_REALTIME.has(slug);
}

export interface DeviceCapabilities {
    webgl2: boolean;
    webgpu: boolean;
}

/**
 * Procedures that currently have a 3D renderer wired to this context.
 *
 * Criterion for inclusion: there is a production-ready patient-facing 3D
 * simulator that the dispatcher can switch to. Surgeon-only or feature-
 * flagged 3D (e.g. rhinoplasty's FLAME mode inside SimulationEngine) does
 * NOT count on its own — but the patient 3D branch does.
 */
export const PROCEDURES_WITH_3D = new Set<string>([
    "hair-transplant",
    "rhinoplasty",
    "facelift",
    "blepharoplasty",
    "chin-augmentation",
    "brow-lift",
    "buccal-fat-removal",
    "facial-contouring",
    "thread-lift",
    "lip-lift",
    "lip-augmentation",
    "fat-grafting",
    "neck-lift",
    "mid-facelift",
]);

/**
 * Procedures that default to 3D on capable devices when the user has no
 * stored preference and no URL override.
 *
 * INTENTIONALLY EMPTY — the 3D pipeline is not production-ready.
 * 3D is opt-in via the 2D/3D/Realtime toggle; no procedure auto-starts in 3D.
 * Once the 3D pipeline is validated for patient use, add slugs back here.
 *
 * The previous set (rhinoplasty, facelift, blepharoplasty, chin-augmentation,
 * brow-lift, buccal-fat-removal, facial-contouring, lip-lift, fat-grafting,
 * neck-lift, mid-facelift) caused sliders/brush to appear broken for patients
 * because the unfinished 3D view does not yet wire those controls.
 */
export const SURGICAL_3D_DEFAULT_PROCEDURES = new Set<string>();

/**
 * Returns true when the given procedure should default to 3D on a capable
 * device (i.e. the user has no stored preference and no URL override).
 *
 * Always returns false while SURGICAL_3D_DEFAULT_PROCEDURES is empty — 3D is
 * opt-in until the 3D pipeline is production-ready.
 */
export function isSurgical3DDefault(slug: string | undefined): boolean {
    if (!slug) return false;
    return SURGICAL_3D_DEFAULT_PROCEDURES.has(slug);
}

/**
 * Emergency 3D kill-switch. Set NEXT_PUBLIC_DISABLED_3D_PROCEDURES in Vercel
 * env to a comma-separated list of slugs to force 2D for those procedures
 * without a code redeploy.
 *
 * Examples:
 *   NEXT_PUBLIC_DISABLED_3D_PROCEDURES=hair-transplant
 *   NEXT_PUBLIC_DISABLED_3D_PROCEDURES=hair-transplant,rhinoplasty
 *   NEXT_PUBLIC_DISABLED_3D_PROCEDURES=*   // disables 3D for all procedures
 *
 * Why a single env var instead of one flag per procedure: avoids 12 separate
 * env-var deploys when we need to disable 3D platform-wide; matches how
 * isProcedure3DCapable already gates every consumer (toggle visibility,
 * default selection, urlfallback).
 */
function getDisabled3DSet(): Set<string> {
    // The build inlines NEXT_PUBLIC_* env vars, so this evaluates per build.
    const raw = process.env.NEXT_PUBLIC_DISABLED_3D_PROCEDURES ?? "";
    if (!raw) return new Set();
    if (raw.trim() === "*") return new Set(["*"]);
    return new Set(
        raw.split(",").map((s) => s.trim()).filter(Boolean),
    );
}

const DISABLED_3D_PROCEDURES = getDisabled3DSet();

/** True when the procedure has a 3D renderer and 3D is opted in (NEXT_PUBLIC_ENABLE_3D=1, or unit tests);
 * NEXT_PUBLIC_DISABLED_3D_PROCEDURES ("*" or slugs) always wins. */
export function isProcedure3DCapable(slug: string | undefined): boolean {
    if (!slug) return false;
    // Gate 2: existing per-procedure / wildcard kill-switch.
    if (DISABLED_3D_PROCEDURES.has("*")) return false;
    if (DISABLED_3D_PROCEDURES.has(slug)) return false;
    // Gate 3: 3D is hidden outside unit tests unless opted in.
    if (
        process.env.NODE_ENV !== "test" &&
        process.env.NEXT_PUBLIC_ENABLE_3D !== "1"
    ) {
        return false;
    }
    // Gate 4: procedure must have a wired patient-facing 3D renderer.
    return PROCEDURES_WITH_3D.has(slug);
}

/**
 * Synchronous capability probe. Runs in the browser only — returns a pessimistic
 * `{ webgl2: false, webgpu: false }` during SSR so the toggle never renders
 * in a "3D available" state before hydration.
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
    if (typeof window === "undefined") {
        return { webgl2: false, webgpu: false };
    }

    let webgl2 = false;
    try {
        const canvas = document.createElement("canvas");
        webgl2 = !!canvas.getContext("webgl2");
    } catch {
        webgl2 = false;
    }

    // `navigator.gpu` is the WebGPU entry-point. Presence alone is enough here —
    // we don't need to request an adapter synchronously just to decide whether
    // to show the toggle. The actual renderer falls back on request failure.
    const webgpu = "gpu" in navigator;

    return { webgl2, webgpu };
}

/**
 * The user's device can render the 3D preview at all.
 * We require WebGL2 as the floor — WebGPU is a nice-to-have that unlocks
 * future higher-quality tiers but is not strictly required today.
 */
export function canRender3D(caps: DeviceCapabilities): boolean {
    return caps.webgl2;
}

// ---------------------------------------------------------------------------
// Slow-device hint
// ---------------------------------------------------------------------------

/**
 * A lightweight signal that 3D was painful on this device last time.
 *
 * Set when a 3D landmark detection exceeded SLOW_3D_THRESHOLD_MS, cleared
 * when one succeeds quickly. When present, useSimulatorDimension() defaults
 * to "2d" so return visitors aren't forced to sit through another slow render
 * — they can still explicitly opt back into 3D.
 *
 * Deliberately a single boolean in localStorage rather than a timing log:
 * we only need "this device has trouble" / "this device is fine", and the
 * hint self-heals on the next fast render.
 */
const SLOW_HINT_KEY = "faceify:simulator-3d-slow:v1";
export const SLOW_3D_THRESHOLD_MS = 6000;

export function getSlow3DHint(): boolean {
    if (typeof window === "undefined") return false;
    try {
        return window.localStorage.getItem(SLOW_HINT_KEY) === "true";
    } catch {
        return false;
    }
}

export function setSlow3DHint(slow: boolean): void {
    if (typeof window === "undefined") return;
    try {
        if (slow) window.localStorage.setItem(SLOW_HINT_KEY, "true");
        else window.localStorage.removeItem(SLOW_HINT_KEY);
    } catch {
        // private mode — silently tolerate; next fast render self-heals anyway
    }
}
