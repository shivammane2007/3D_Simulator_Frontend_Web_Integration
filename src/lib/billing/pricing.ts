// "practitioner" kept as internal DB/webhook alias for "starter" (backward compat)
export type Tier = "free" | "practitioner" | "pro" | "clinic" | "enterprise";

export interface TierConfig {
  tier: Tier;
  label: string;
  monthlySimLimit: number | null; // null = unlimited
  watermark: boolean;
  allowedProcedures: string[] | null; // null = all
  seats: number;
}

export const FREE_PROCEDURE_SLUGS = [
  "rhinoplasty",
  "blepharoplasty",
  "lip-augmentation",
];

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  free: {
    tier: "free",
    label: "Free",
    monthlySimLimit: 5,
    watermark: true,
    allowedProcedures: FREE_PROCEDURE_SLUGS,
    seats: 1,
  },
  practitioner: {
    tier: "practitioner",
    label: "Starter",
    monthlySimLimit: null,
    watermark: false,
    allowedProcedures: null,
    seats: 1,
  },
  pro: {
    tier: "pro",
    label: "Pro",
    monthlySimLimit: null,
    watermark: false,
    allowedProcedures: null,
    seats: 3,
  },
  clinic: {
    tier: "clinic",
    label: "Clinic",
    monthlySimLimit: null,
    watermark: false,
    allowedProcedures: null,
    seats: 10,
  },
  enterprise: {
    tier: "enterprise",
    label: "Enterprise",
    monthlySimLimit: null,
    watermark: false,
    allowedProcedures: null,
    seats: 999,
  },
};

// ─── Final Tier Prices (CEO-approved 2026-05-09) ──────────────────────────────
// Historical tier amounts remain in cents (USD); new seats use surgeon-plans.ts.
// Clinic tier: white-glove onboarding only until Q3 2026 self-serve gate ships.

export const SURGEON_TIERS = {
  starter: {
    monthly: 14900,       // $149/mo
    annual: 178800,       // $1,788/yr prepay ($149 × 12 — annual prepay, one invoice instead of twelve, same rate)
    annualSavings: 0,     // no discount — annual is same rate as monthly × 12
    annualDiscountPct: 0,
    name: "Starter",
    target: "Solo surgeon practice",
    seats: 1,
    monthlyDiffusionCap: 100, // hard cap; alert at 80%
  },
  pro: {
    monthly: 29900,        // $299/mo
    annual: 358800,        // $3,588/yr prepay ($299 × 12 — annual prepay, one invoice instead of twelve, same rate)
    annualSavings: 0,      // no discount — annual is same rate as monthly × 12
    annualDiscountPct: 0,
    name: "Pro",
    target: "2–3 surgeon practice",
    seats: 3,
    monthlyDiffusionCap: 500,
  },
  clinic: {
    monthly: 49900,        // $499/mo
    annual: 598800,        // $5,988/yr prepay ($499 × 12 — annual prepay, one invoice instead of twelve, same rate)
    annualSavings: 0,      // no discount — annual is same rate as monthly × 12
    annualDiscountPct: 0,
    name: "Clinic",
    target: "Multi-doc clinic / hospital aesthetic dept",
    seats: 10,
    monthlyDiffusionCap: 2000,
    // Self-serve checkout disabled until Q3 2026. Onboarding is white-glove only.
    foundingPartnerWhiteGloveOnly: true,
  },
} as const;

/** Day Pass — $25/24h, the same artifact one redeemed credit mints (2026-10-02). */
export const PATIENT_DAY_PASS = {
  amount: 2500,        // cents — $25 USD
  durationHours: 24,
} as const;

/**
 * Credit — banked, gateway-agnostic 24h single-procedure credits.
 *
 * 1 credit = 24h of access to ONE procedure, chosen at redemption (a
 * 1-credit redemption IS a Day Pass). Purchased in qty 1/3/5 per checkout,
 * no bundle discount. Credits expire 12 months after purchase; unused
 * credits sit in a balance until redeemed or expired. Purchasing from a
 * procedure page auto-redeems 1 credit for that procedure immediately; the
 * remainder banks.
 *
 * 2026-10-02 founder decision (decisions/2026-10-02-credit-25-usd-both-roles.md):
 * $25 USD, or Rs 1,999 for Indian buyers (a rounded local price, not FX),
 * sold to patients AND surgeons, on Razorpay (the only gateway). The
 * SimulationCredit rows this produces never record which gateway minted
 * them; the Razorpay order ledger is CreditOrder (lib/billing/credit-order.ts).
 */
export const PATIENT_CREDIT = {
  unitCents: 2500,      // $25 USD per credit, matches PATIENT_DAY_PASS.amount
  durationHours: 24,    // redeemed credit -> 24h single-procedure PatientDayPass
  expiryMonths: 12,     // unredeemed balance expires 12 months after purchase
  allowedQty: [1, 3, 5] as const,
} as const;

export type CreditCurrency = "USD" | "INR";

/**
 * Per-credit price in minor units (cents / paise) by checkout currency. The
 * ONLY source the credit checkout charges from and the UI displays from, so
 * the published price cannot drift from the charged one.
 */
export const CREDIT_UNIT_PRICE_MINOR: Record<CreditCurrency, number> = {
  USD: PATIENT_CREDIT.unitCents, // $25
  INR: 199_900,                  // Rs 1,999
};

/**
 * The Rs 999 first credit: one discounted paid credit, once per verified
 * surgeon, ever (replaces the old Rs 999 first-month seat). INR only. It is a
 * discounted PAID credit; never describe it as a trial or as free.
 */
export const SURGEON_FIRST_CREDIT = {
  amountMinor: 99_900, // Rs 999
  currency: "INR" as CreditCurrency,
} as const;

/**
 * Checkout currency for a credit buyer. India pays in INR; everyone else in
 * USD. Country only, same as the surgeon zone table.
 */
export function resolveCreditCurrency(countryCode: string | null | undefined): CreditCurrency {
  return countryCode?.trim().toUpperCase() === "IN" ? "INR" : "USD";
}

/** Formats a minor-unit credit price with no decimals ("$25", "₹1,999"). */
export function formatCreditPrice(amountMinor: number, currency: CreditCurrency): string {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountMinor / 100);
}

export type PatientCreditQty = (typeof PATIENT_CREDIT.allowedQty)[number];

/**
 * Annual prepay rate vs monthly rate — 2026-05-19 update removes all discounts.
 * Annual billing is one invoice instead of twelve at the same per-month rate.
 * No discount is applied. No other discount mechanism (flash sales, promo codes,
 * referral discounts) may be added without explicit CEO approval.
 */
export const ANNUAL_PREPAY_DISCOUNT_PCT = {
  starter: 0,
  pro: 0,
  clinic: 0,
} as const;

/**
 * Founding Partner program — first 100 paying surgeons (any tier) get:
 *   - 2-year price lock at their initial rate
 *   - Name on /founding-partners page
 *   - Direct roadmap input via private founder channel
 *   - Instagram cross-promo (1 repost/week rotating across cohort)
 * Cohort tracked via Surgeon.foundingPartner + Surgeon.foundingPartnerCohort
 * in the DB. The 100-cap is enforced at the app layer (not schema constraint).
 */
export const FOUNDING_PARTNER_CAP = 100;
export const FOUNDING_PARTNER_LOCK_YEARS = 2;

// Retained for reading historical patient purchases. New payments use credit-order.ts.
export const PATIENT_CREDIT_CONFIG = {
  patient_pass: { credits: null, priceCents: 999, expiryDays: 30 },  // $9.99, 30-day unlimited (DEPRECATED — see Day Pass)
} as const;

export const PATIENT_TRIAL_CONFIG = {
  credits: 3,
  durationDays: 7,
} as const;

/**
 * DEPRECATED (public surface) — 2026-05-09 CEO directive removes the
 * public 7-day free trial entirely. Acquisition now routes through:
 *   - Free embed widget (zero commitment, no clock, no CC)
 *   - Invite-only voucher for founder-selected ambassadors
 * This constant is retained for the internal create-trial API endpoint
 * backward compat until that route is retired by voucher-admin-flow agent.
 * Do NOT reference this in any public-facing UI or marketing copy.
 */
export const SURGEON_TRIAL_CONFIG = {
  durationDays: 7,
} as const;

// ─── Clinic Wholesale Credit Channel (2026-07-03) ──────────────────────────────
//
// Faceify sells simulator-access credits to clinics at a wholesale price.
// The clinic resells access to its own patients off-platform at its own markup.
// Faceify's ONLY payment relationship is with the clinic — no patient payment
// data ever passes through this stack.
//
// COMPLIANCE (founder-confirmed 2026-07-03, hard rules):
//   • No per-patient payout, commission, rebate, or referral fee to clinics.
//   • One standard credit unit = one patient access grant, any procedure.
//   • INR deals → Razorpay; all other currencies → Razorpay USD (same rail as deals).
//   • Zero-decimal currencies (JPY/KRW): raw units — NOT ×100.
//     Matches the PatientDayPass.amountPaid convention.
//
// PLACEHOLDER — founder to set final wholesale unit prices before production launch.

/**
 * Wholesale unit price per credit, by currency (minor units).
 * USD/EUR/GBP/SGD/THB/INR → cents/paise/pence/cents/satang/paise (×100 convention).
 * Zero-decimal currencies (JPY, KRW) → raw units (NOT ×100).
 *
 * PLACEHOLDER — founder to set final prices.
 */
export const CLINIC_WHOLESALE_CREDIT_PRICING: Record<string, number> = {
  USD: 500,    // PLACEHOLDER — $5.00 per credit unit (100 cents × 5)
  INR: 39900,  // PLACEHOLDER — ₹399 per credit unit (100 paise × 399)
  SGD: 700,    // PLACEHOLDER — S$7.00 per credit unit
  THB: 18000,  // PLACEHOLDER — ฿180 per credit unit
  GBP: 400,    // PLACEHOLDER — £4.00 per credit unit
  EUR: 450,    // PLACEHOLDER — €4.50 per credit unit
  JPY: 750,    // PLACEHOLDER — ¥750 per credit unit (zero-decimal, raw units)
  KRW: 6500,   // PLACEHOLDER — ₩6,500 per credit unit (zero-decimal, raw units)
} as const;

/**
 * Standard bundle sizes available at checkout.
 * The price of a bundle = quantity × CLINIC_WHOLESALE_CREDIT_PRICING[currency].
 *
 * PLACEHOLDER — founder to confirm bundle sizes.
 */
export const CLINIC_WHOLESALE_BUNDLE_SIZES: readonly number[] = [
  10,   // PLACEHOLDER — starter bundle
  25,   // PLACEHOLDER — mid bundle
  50,   // PLACEHOLDER — growth bundle
  100,  // PLACEHOLDER — clinic bundle
] as const;

/**
 * Free monthly credits included with every active clinic subscription.
 * Lazy-replenished at the start of each calendar month (no cron — Vercel
 * CPU is capped). See ensureFreeMonthlyCredits() in clinic-credit-service.ts.
 *
 * Framed as "included free monthly simulations" — never "free trial."
 *
 * PLACEHOLDER — founder to set final free allowance.
 */
export const CLINIC_FREE_MONTHLY_CREDITS = 2; // PLACEHOLDER — 2 free credits/month

/**
 * Zero-decimal currencies — amounts are in raw units, NOT ×100.
 * Used to validate that callers don't accidentally multiply these by 100.
 */
export const ZERO_DECIMAL_CURRENCIES = new Set(["JPY", "KRW"]) as ReadonlySet<string>;
