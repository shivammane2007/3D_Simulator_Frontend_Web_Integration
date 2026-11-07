// ---------------------------------------------------------------------------
// Analytics — unified event tracking (PostHog + GA4 + Vercel Analytics)
// ---------------------------------------------------------------------------

declare global {
    interface Window {
        posthog?: any;
        gtag?: any;
        va?: any;
    }
}

// ---------------------------------------------------------------------------
// Key funnel event constants — import these instead of typing raw strings
// ---------------------------------------------------------------------------
export const EVENTS = {
    SIGNUP_COMPLETED: 'signup_completed',
    TRIAL_ACTIVATED: 'trial_activated',
    SIMULATION_RUN: 'simulation_run',
    SIMULATION_SAVED: 'simulation_saved',
    LEAD_CAPTURED: 'lead_captured',
    CHECKOUT_INITIATED: 'checkout_initiated',
    PAYWALL_HIT: 'paywall_hit',
    PURCHASE_COMPLETED: 'purchase_completed',
    DIRECTORY_ENABLED: 'directory_enabled',
    PATIENT_ADDED: 'patient_added',
    CONSULTATION_COMPLETED: 'consultation_completed',
} as const;

type EventName =
    // Navigation
    | "page_view"
    // Surgeon funnel
    | "surgeon_portal_click"
    | "schedule_demo_click"
    | "start_free_pilot_click"
    | "sign_up_start"
    | "sign_up_complete"
    // Patient funnel
    | "patient_consultation_start"
    | "consultation_step_complete"
    | "consultation_complete"
    // Simulation engagement
    | "simulation_started"
    | "simulation_procedure_select"
    | "simulation_photo_uploaded"
    | "simulation_slider_changed"
    | "simulation_download"
    | "simulation_completed"
    // Content engagement
    | "procedure_viewed"
    | "procedure_filter_change"
    | "technology_page_view"
    // Lead capture
    | "demo_form_submit"
    | "contact_form_submit"
    | "email_capture"
    // Legacy events (keep for backwards compat)
    | "signup_completed"
    | "patient_referred"
    | "patients_csv_exported"
    | "consultation_booked"
    | "simulation_procedure_added"
    | "simulation_procedure_removed"
    | "simulation_preset_applied"
    | "rhinoplasty_ethnicity_changed"
    | "simulation_report_generated"
    | "simulation_shared"
    | "simulation_shared_whatsapp"
    | "simulation_saved"
    | "simulation_view_mode_changed"
    | "simulation_animate_triggered"
    | "simulation_landmark_toggled"
    // 2D / 3D dimension toggle + perf
    | "simulator_dimension_toggled"
    | "simulation_preview_ready"
    | "simulation_detection_timeout"
    | "simulation_detection_error"
    | "simulation_escape_hatch_clicked"
    | "simulation_dimension_fallback"
    // Billing lifecycle — day pass purchases + refunds + subscription starts
    | "payment_refunded"
    // Chemical peel events
    | "chemical_peel_analyzed"
    | "chemical_peel_photo_uploaded"
    | "chemical_peel_report_generated"
    | "chemical_peel_shared"
    | "chemical_peel_ai_assessment"
    // Injectable events
    | "injectable_simulation_started"
    | "injectable_zone_toggled"
    | "injectable_preset_applied"
    | "injectable_simulation_rendered"
    | "injectable_report_generated"
    // Blepharoplasty events
    | "blepharoplasty_photo_uploaded"
    | "blepharoplasty_preset_applied"
    | "blepharoplasty_assessment_completed"
    | "blepharoplasty_shared"
    | "blepharoplasty_ai_assessment"
    // AI assessment events
    | "rhinoplasty_ai_assessment"
    | "injectable_ai_assessment"
    // V-Line contouring events
    | "vline_photo_uploaded"
    | "vline_preset_applied"
    | "vline_assessment_completed"
    | "vline_shared"
    // Lip lift events
    | "liplift_photo_uploaded"
    | "liplift_preset_applied"
    | "liplift_assessment_completed"
    | "liplift_shared"
    // Chin augmentation events
    | "chin_photo_uploaded"
    | "chin_preset_applied"
    | "chin_assessment_completed"
    | "chin_shared"
    // Facelift events
    | "facelift_photo_uploaded"
    | "facelift_preset_applied"
    | "facelift_assessment_completed"
    | "facelift_shared"
    // Buccal fat removal events
    | "buccal_photo_uploaded"
    | "buccal_preset_applied"
    | "buccal_assessment_completed"
    | "buccal_shared"
    // Thread lift events
    | "threadlift_photo_uploaded"
    | "threadlift_preset_applied"
    | "threadlift_assessment_completed"
    | "threadlift_shared"
    // Laser resurfacing events
    | "laser_photo_uploaded"
    | "laser_preset_applied"
    | "laser_assessment_completed"
    | "laser_shared"
    // Dermal fillers events
    | "dermalfiller_photo_uploaded"
    | "dermalfiller_preset_applied"
    | "dermalfiller_assessment_completed"
    | "dermalfiller_shared"
    // Liposuction events
    | "lipo_photo_uploaded"
    | "lipo_preset_applied"
    | "lipo_assessment_completed"
    | "lipo_shared"
    // Tummy tuck events
    | "tummytuck_photo_uploaded"
    | "tummytuck_preset_applied"
    | "tummytuck_assessment_completed"
    | "tummytuck_shared"
    // BBL events
    | "bbl_photo_uploaded"
    | "bbl_preset_applied"
    | "bbl_assessment_completed"
    | "bbl_shared"
    // Breast augmentation events
    | "breastaug_photo_uploaded"
    | "breastaug_preset_applied"
    | "breastaug_assessment_completed"
    | "breastaug_shared"
    // 3D simulation events
    | "simulation_3d_started"
    | "simulation_3d_toggled"
    // ML data collection events
    | "ml_data_exported"
    | "ml_bulk_export"
    // Volume preservation events
    | "volume_overlay_toggled"
    | "volume_warning_shown"
    // Measurement panel events
    | "measurement_tooltip_viewed"
    | "measurement_report_exported"
    // Error tracking events
    | "simulation_error"
    | "simulation_error_recovered"
    | "simulation_issue_reported"
    // Profile view events
    | "profile_photo_uploaded"
    // Post-simulation conversion CTA events
    | "post_simulation_cta_viewed"
    | "post_simulation_cta_clicked"
    // Deals funnel events (legacy)
    | "deals_cta_clicked"
    | "deal_viewed"
    | "booking_started"
    | "booking_completed"
    // Patient access funnel
    | "paywall_hit"
    | "purchase_completed"
    // Deals marketplace funnel events (T4)
    | "deals_landing_viewed"
    | "deals_search_applied"
    | "deals_filter_applied"
    | "deals_card_clicked"
    | "deals_detail_viewed"
    | "deals_claim_cta_clicked"
    | "deals_lead_form_submitted"
    | "deals_book_cta_clicked"
    | "deals_payment_initiated"
    | "deals_payment_success"
    | "deals_payment_failed"
    | "deals_surgeon_deal_created"
    | "deals_surgeon_deal_submitted"
    | "deals_surgeon_deal_edited"
    | "deals_moderation_approved"
    | "deals_moderation_rejected"
    | "deals_first_redemption"
    // Onboarding funnel events
    | "onboarding_started"
    | "onboarding_step_complete"
    | "onboarding_completed"
    // Directory events
    | "directory_viewed"
    | "surgeon_searched"
    | "surgeon_profile_clicked";

interface EventParams {
    [key: string]: string | number | boolean | undefined;
}

// Cached device type — computed once per session
let cachedDeviceType: string | undefined;
function getDeviceType(): string {
    if (cachedDeviceType) return cachedDeviceType;
    if (typeof window === "undefined") return "unknown";
    const w = window.innerWidth;
    cachedDeviceType = w < 768 ? "mobile" : w <= 1024 ? "tablet" : "desktop";
    return cachedDeviceType;
}

// User cohort — set via setUserCohort() from AuthProvider when session loads
let cachedUserCohort: string | undefined;
export function setUserCohort(cohort: string): void {
    cachedUserCohort = cohort;
}

export function trackEvent(name: EventName | string, params?: EventParams): void {
    try {
        if (typeof window === "undefined") return;

        // Auto-enrich with device_type and user_cohort
        const enriched: EventParams = {
            device_type: getDeviceType(),
            ...(cachedUserCohort ? { user_cohort: cachedUserCohort } : {}),
            ...params, // explicit params override auto-enriched
        };

        // PostHog (loaded by PostHogProvider when user consents)
        if (window.posthog?.__loaded) {
            window.posthog.capture(name, enriched);
        }

        // GA4
        if (window.gtag) {
            window.gtag("event", name as string, enriched);
        }

        // Vercel Analytics custom events
        if (window.va) {
            window.va("event", { name, ...enriched });
        }

        // Console in development
        if (process.env.NODE_ENV === "development") {
            console.log("[Faceify Analytics]", { event: name, properties: params ?? {}, timestamp: new Date().toISOString() });
        }
    } catch {
        // Never throw from analytics — instrumentation must never affect functionality
    }
}

export function identifyUser(userId: string, traits?: EventParams): void {
    try {
        if (typeof window === "undefined") return;
        if (window.posthog?.__loaded) {
            window.posthog.identify(userId, traits);
        }
    } catch {
        // Never throw
    }
}

/**
 * Clears the bound PostHog identity — call on sign-out, before any
 * navigation, so the next anonymous action doesn't keep attributing to the
 * account that just logged out. Without this, posthog-js's own localStorage
 * persistence would carry the identified distinct_id across the sign-out
 * hard-reload into the visitor's next (now-anonymous) session.
 *
 * `reset()` also rotates the anonymous distinct_id, matching PostHog's own
 * recommended sign-out pattern.
 */
export function resetAnalyticsIdentity(): void {
    try {
        if (typeof window === "undefined") return;
        if (window.posthog?.__loaded) {
            window.posthog.reset();
        }
    } catch {
        // Never throw
    }
}

// ---------------------------------------------------------------------------
// Pre-built tracking functions for common events
// ---------------------------------------------------------------------------

export const analytics = {
    // Surgeon CTA clicks
    scheduleDemoClick: (source: string) =>
        trackEvent("schedule_demo_click", { source }),
    startPilotClick: (source: string) =>
        trackEvent("start_free_pilot_click", { source }),
    surgeonPortalClick: () =>
        trackEvent("surgeon_portal_click"),

    // Simulation events
    simulationStart: (procedure: string) =>
        trackEvent("simulation_started", { procedure }),
    procedureSelect: (procedure: string) =>
        trackEvent("simulation_procedure_select", { procedure }),
    photoUpload: (source: "camera" | "upload" | "demo") =>
        trackEvent("simulation_photo_uploaded", { source }),
    sliderAdjust: (procedure: string, parameter: string, value: number) =>
        trackEvent("simulation_slider_changed", { procedure, parameter, value }),
    simulationDownload: (procedure: string) =>
        trackEvent("simulation_download", { procedure }),

    // Consultation funnel
    consultationStart: () =>
        trackEvent("patient_consultation_start"),
    consultationStep: (step: number, stepName: string) =>
        trackEvent("consultation_step_complete", { step, step_name: stepName }),
    consultationComplete: () =>
        trackEvent("consultation_complete"),

    // Procedures page
    procedureClick: (procedureName: string) =>
        trackEvent("procedure_viewed", { procedure: procedureName }),
    procedureFilter: (category: string) =>
        trackEvent("procedure_filter_change", { category }),

    // Lead capture
    demoFormSubmit: (email: string) =>
        trackEvent("demo_form_submit", { email_domain: email.split("@")[1] }),
    contactFormSubmit: (source: string) =>
        trackEvent("contact_form_submit", { source }),
    emailCapture: (source: string) =>
        trackEvent("email_capture", { source }),

    // Auth
    signUpStart: () =>
        trackEvent("sign_up_start"),
    signUpComplete: () =>
        trackEvent("sign_up_complete"),

    // Measurement panel
    measurementTooltipView: (label: string, procedure: string) =>
        trackEvent("measurement_tooltip_viewed", { label, procedure }),
    measurementReportExport: (procedure: string) =>
        trackEvent("measurement_report_exported", { procedure }),

    // Error tracking
    simulationError: (code: string, procedure: string, recovery: string) =>
        trackEvent("simulation_error", { error_code: code, procedure, recovery }),
    simulationErrorRecovered: (code: string, procedure: string) =>
        trackEvent("simulation_error_recovered", { error_code: code, procedure }),
    simulationIssueReported: (errorCount: number) =>
        trackEvent("simulation_issue_reported", { error_count: errorCount }),

    // Deals funnel
    dealsCTAClicked: (dealId: string, procedureSlug: string) =>
        trackEvent("deals_cta_clicked", { deal_id: dealId, procedure: procedureSlug }),
    dealViewed: (dealId: string, procedureSlug: string) =>
        trackEvent("deal_viewed", { deal_id: dealId, procedure: procedureSlug }),
    bookingStarted: (dealId: string) =>
        trackEvent("booking_started", { deal_id: dealId }),
    bookingCompleted: (dealId: string) =>
        trackEvent("booking_completed", { deal_id: dealId }),

    // Deals marketplace
    dealsMarketplaceViewed: (filters?: { procedure?: string; category?: string; city?: string }) =>
        trackEvent("deals_marketplace_viewed", filters ?? {}),
    dealsFiltered: (filterType: string, filterValue: string) =>
        trackEvent("deals_filtered", { filter_type: filterType, filter_value: filterValue }),
    dealAbandoned: (dealId: string) =>
        trackEvent("deal_abandoned", { deal_id: dealId }),
    consultationRequested: (dealId: string, procedureSlug: string) =>
        trackEvent("consultation_requested", { deal_id: dealId, procedure: procedureSlug }),
};

// ---------------------------------------------------------------------------
// Schedule-demo trigger — opens the Cal.com self-serve scheduler in a new
// tab and still fires the scheduleDemoClick analytics event so the existing
// funnel metrics keep flowing.
//
// Name kept as `openDemoModal` for zero churn across ~35 call sites — the
// behavior is no longer a modal, but every consumer just wants "start the
// scheduling flow" and the Cal.com link is a better UX than our internal
// form (instant self-serve booking vs. form → email → someone schedules).
// DemoModalWrapper + DemoRequestForm remain callable if we ever need the
// form fallback (e.g. for an embedded flow) — see openDemoFormModal below.
// ---------------------------------------------------------------------------

/**
 * Allowlist the booking-provider origins we trust. NEXT_PUBLIC_CALENDLY_URL is
 * baked into the client bundle at build time, so the realistic threat model is
 * a compromised CI pipeline or malicious PR swapping the env var for a
 * phishing clone. `window.open` shows no in-app URL bar, so users wouldn't
 * notice the tab opened a lookalike — hence the defense-in-depth.
 *
 * Exported so the guard can be unit-tested as a pure function without
 * mocking the featureFlags module (which caused test-isolation flakes).
 */
export const TRUSTED_BOOKING_ORIGINS = ["https://cal.com/", "https://calendly.com/"] as const;

export function isTrustedBookingUrl(url: string): boolean {
    return TRUSTED_BOOKING_ORIGINS.some((origin) => url.startsWith(origin));
}

export function openDemoModal(source: string = "unknown") {
    if (typeof window === "undefined") return;
    analytics.scheduleDemoClick(source);
    // Open the in-page form so we capture phone + practice details before
    // handing off to Cal.com. The form's success state offers a "pick a
    // time directly" link that preserves the original self-serve flow.
    // Email-only follow-up was averaging 2+ days; a phone/WhatsApp number
    // gets BD a same-hour reply on high-intent demo requests.
    window.dispatchEvent(new CustomEvent("openDemoModal", { detail: { source } }));
}

/**
 * Alias for openDemoModal — kept for any code paths that still call the
 * older name. Both now route through the in-page form. Legacy "open
 * Cal.com directly" behavior was removed once phone-capture became
 * mandatory for demo follow-up.
 */
export function openDemoFormModal(source: string = "unknown") {
    openDemoModal(source);
}
