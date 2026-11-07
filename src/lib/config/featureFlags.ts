export const FEATURE_FLAGS = {
  // FLAME 3D model — global toggle, default OFF.
  // Set NEXT_PUBLIC_USE_FLAME=true to enable for ALL procedures.
  USE_FLAME_MODEL: process.env.NEXT_PUBLIC_USE_FLAME === 'true',

  // Rhinoplasty-specific FLAME default: defaults to ON. Lifts the rhinoplasty
  // 3D mesh from MediaPipe's 468-landmark / ~930-triangle topology to FLAME's
  // 5,023-vertex / ~1,700-triangle full-head model — roughly 10× mesh density
  // and the missing back-of-head geometry. Kill switch via
  // NEXT_PUBLIC_USE_FLAME_RHINOPLASTY=false.
  //
  // The 26.7MB FLAME ONNX is lazy-loaded only when the user toggles 3D mode,
  // so this default doesn't add to first-paint cost on the 2D simulator path.
  USE_FLAME_RHINOPLASTY: process.env.NEXT_PUBLIC_USE_FLAME_RHINOPLASTY !== 'false',

  // FLAME fitting v2 solver — defaults to ON. Kill switch via
  // NEXT_PUBLIC_FLAME_FIT_V2=false.
  //
  // The previous (v1) solver left the weak-perspective camera (s, tx, ty) in
  // the Adam optimization vector alongside shape/expr/pose. Measured against
  // synthetic FLAME ground truth (5 subjects), ~99% of the initial loss is
  // camera misalignment, so the 15-iteration budget was spent dragging the
  // camera and the fit stalled at ~21-33px landmark error (@1024px). For
  // tightly-cropped photos (true scale ≳4.5) v1 converged to a face *worse*
  // than the FLAME mean (18.3mm vs 14.7mm vertex RMS).
  //
  // v2 solves the camera in closed form (weak-perspective least squares) each
  // evaluation, drops SHAPE_REGULARIZATION from 1e-3 — which measured 31× the
  // entire achievable landmark term, making the mean face the objective's
  // global optimum — and batches the finite-difference gradient into a single
  // ONNX run per iteration. Net: 3.5-4.5px landmark error, 12-13mm vertex RMS,
  // at 0.29× the wall-clock of v1 despite 2× the iterations.
  //
  // Verified on real photos (real MediaPipe landmarks, real ONNX): residual
  // 8.29% → 4.35% and 1.83% → 0.98% of face width on two subjects, 1949ms →
  // 695ms. On both, v1 scored *worse* than returning the mean face.
  //
  // NOSE CAVEAT: only 3 of the 105 FLAME↔MediaPipe landmarks touch the nose
  // (tip + 2 dorsum; none on the alar wings or columella). v2 does move the
  // nose per-subject — cross-subject nose deviation is 12.4mm vs v1's 2.1mm —
  // but that comes from whole-face shape correlation, not observed nose
  // evidence, so per-patient nose accuracy remains unverified. Closing that
  // gap needs real nose correspondences; see specs/004-nose-landmark-coverage.md.
  FLAME_FIT_V2: process.env.NEXT_PUBLIC_FLAME_FIT_V2 !== 'false',

  // Extra nose-region FLAME↔MediaPipe correspondences — default OFF, pending
  // surgeon sign-off. Kept separate from FLAME_FIT_V2 on purpose: v2 is
  // approved and shipping, this is a distinct, clinically-unvalidated change
  // and must not ride on v2's coattails.
  //
  // The base 105-entry mapping has only 3 nose landmarks (tip + 2 dorsum), so
  // the solver cannot observe the nose. This adds 42 correspondences derived
  // offline by non-rigid registration against MediaPipe's canonical face model
  // (scripts/flame-export/compute_nose_landmark_mapping.mjs), taking nose
  // coverage from 3 to 45 landmarks.
  //
  // Accuracy of the derived entries, by leave-one-out cross-validation over the
  // 105 known anchors: 1.86mm mean / 1.06mm median overall, 1.79mm mean on the
  // 3 nose anchors — against a 12.4mm rigid-alignment baseline. Good enough to
  // give the solver real nose evidence; NOT surgical-grade, and the nose subset
  // is only 3 samples so treat that figure as indicative.
  //
  // Ships as a SEPARATE file so flame_mediapipe_mapping.json stays byte-
  // identical and lib/annotations/reproject.ts — which iterates that file and
  // would otherwise change how saved surgeon annotations reproject — is
  // unaffected. See specs/004-nose-landmark-coverage.md.
  FLAME_NOSE_LANDMARKS: process.env.NEXT_PUBLIC_FLAME_NOSE_LANDMARKS === 'true',

  // Video consultation link generation — default OFF.
  // The handler currently mints `https://meet.faceifylabs.com/<id>` URLs
  // which DON'T resolve (no DNS / no provider behind the domain). Audit
  // P0 round 4 (2026-05-03): patients + surgeons were getting emailed
  // dead links every time a "video" consultation was confirmed. Flip
  // NEXT_PUBLIC_VIDEO_CONSULTATIONS_ENABLED=true once a real provider
  // (Daily.co, Whereby, Calendly, Zoom) is wired into the route handler.
  VIDEO_CONSULTATIONS_ENABLED: process.env.NEXT_PUBLIC_VIDEO_CONSULTATIONS_ENABLED === 'true',

  // 3D Hair Transplant Simulator — default OFF.
  // Set NEXT_PUBLIC_USE_3D_HAIR_TRANSPLANT=true to enable the 3D view toggle.
  USE_3D_HAIR_TRANSPLANT: process.env.NEXT_PUBLIC_USE_3D_HAIR_TRANSPLANT === 'true',

  // FLAME-backed 3D head for the hair-transplant simulator. Defaults OFF
  // so we ship the FLAME path behind a flag for staged rollout — the
  // procedural cap from ScalpZoneDefinition still works as the fallback.
  // Set NEXT_PUBLIC_USE_FLAME_HAIR_TRANSPLANT=true to swap from the
  // MediaPipe 468-vert face mesh to the FLAME 5,023-vert head mesh
  // (with the procedural scalp cap built on top of FLAME's boundary).
  // Costs ~5-30s on first activation while FLAME fits the photo via
  // a Web Worker; subsequent param tweaks are instant.
  USE_FLAME_HAIR_TRANSPLANT:
    process.env.NEXT_PUBLIC_USE_FLAME_HAIR_TRANSPLANT === 'true',

  // FLAME-backed 3D for ALL patient face simulators that go through
  // Patient3DSimulatorShell (rhinoplasty, facelift, blepharoplasty,
  // chin-augmentation, brow-lift, buccal-fat-removal, facial-contouring,
  // thread-lift, lip-lift, lip-augmentation, fat-grafting). Defaults
  // OFF — Phase 1 fits FLAME in the background without changing the
  // rendering path so we can collect production telemetry on success
  // rate before flipping the renderer in Phase 2. Set
  // NEXT_PUBLIC_USE_FLAME_PATIENT_3D=true to enable.
  USE_FLAME_PATIENT_3D:
    process.env.NEXT_PUBLIC_USE_FLAME_PATIENT_3D === 'true',

  // Phase 2: guided 3-view capture (front + left + right profile) to refine
  // MediaPipe z-depth with real parallax observations. Default OFF — still
  // dark-launched while we iterate on the fit algorithm.
  // Set NEXT_PUBLIC_THREE_VIEW_CAPTURE=true to enable.
  THREE_VIEW_CAPTURE: process.env.NEXT_PUBLIC_THREE_VIEW_CAPTURE === 'true',

  // Phase 3: Depth Anything v2 ONNX as a WebGPU-tier depth source. Default OFF.
  // Falls back to MediaPipe z-depth on non-WebGPU browsers or when the model
  // fails to load. Set NEXT_PUBLIC_DEPTH_V2=true to enable.
  //
  // The ~100MB model is fetched at runtime from NEXT_PUBLIC_DEPTH_V2_MODEL_URL
  // (defaults to /models/depth-anything-v2-small.onnx) and cached in the
  // browser's IndexedDB — so the weights stay out of the repo / Vercel
  // deploy artifact. Point the URL at a CDN / HuggingFace / R2 bucket.
  DEPTH_V2: process.env.NEXT_PUBLIC_DEPTH_V2 === 'true',

  // LEGAL KILL-SWITCH — patient-facing procedure-deal marketplace.
  // The ClinicDeal prepaid-escrow + platform-fee + surgeon-payout model is an
  // illegal inducement / fee-split in target markets (criminal under Korean
  // Medical Act). Default OFF (absent env var = false). All deal API routes,
  // payment webhooks for deal_prepayment, and surgeon/admin deal management
  // return 404 / NO-OP while this flag is OFF.
  // Flip NEXT_PUBLIC_MARKETPLACE_DEALS_ENABLED=true ONLY after legal clears
  // the structure in each target jurisdiction. Do NOT delete DB models or run
  // migrations until the clean-deletion milestone is approved.
  MARKETPLACE_DEALS_ENABLED: process.env.NEXT_PUBLIC_MARKETPLACE_DEALS_ENABLED === 'true',

  // COMPLIANCE KILL-SWITCH — clinic wholesale-credit purchasing ONLY.
  // Originally gated every patient purchase entry point while Razorpay
  // underwriting reviewed the site. Since 2026-10-02 credits ($25 / Rs 1,999,
  // decisions/2026-10-02-credit-25-usd-both-roles.md) are sold to patients
  // AND surgeons on Razorpay and are NOT gated by this flag anywhere
  // (/day-pass, the credits paywall, analyser unlocks, /api/credits/checkout).
  // Default OFF (absent env var = false). Still gates, server and client:
  //   - the clinic wholesale-credit PURCHASE UI in ClinicCreditsSection and
  //     POST /api/clinic/wholesale-checkout (balance/grants/history stay on)
  // The name is kept so existing env config keeps working.
  PATIENT_CHECKOUT_ENABLED: process.env.NEXT_PUBLIC_PATIENT_CHECKOUT_ENABLED === 'true',

  // Legal hold: default OFF for new deposits, payment/refund routes, UI and reminders.
  // Historical reads, expiry and authenticated money reconciliation stay available.
  CONSULTATION_DEPOSITS_ENABLED: process.env.NEXT_PUBLIC_CONSULTATION_DEPOSITS_ENABLED === 'true',
};

// External booking URLs
export const BOOKING_CONFIG = {
  // Our self-serve scheduling link (Calendly). The env var name keeps
  // CALENDLY in it for backwards compat — all call sites read through this
  // constant, so we can swap providers without touching them.
  // Falls back to undefined (no link rendered) rather than a personal dev URL.
  // Set NEXT_PUBLIC_CALENDLY_URL in Vercel env vars to enable the booking CTA.
  CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL || undefined,
};
