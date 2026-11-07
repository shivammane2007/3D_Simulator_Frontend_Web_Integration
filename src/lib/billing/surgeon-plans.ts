/**
 * Surgeon-seat pricing table + zone resolution for the Razorpay rail
 * (decisions/2026-08-14-rhinoplasty-pricing-and-razorpay.md). Pure data +
 * pure functions only -- no Prisma, no HTTP. lib/billing/razorpay-subscription.ts
 * is the only caller that should reach for these.
 *
 * All prices are integer MINOR units (paise for INR, cents for USD),
 * ex-GST / ex-local-tax, per the decision doc's price card.
 */

export type SurgeonPlanZone = "A" | "B" | "C";
/**
 * Every plan a RazorpayOrder / Subscription row can carry. "trial" and
 * "monthly" stay in the type (and in the price card below) because
 * historical rows and the inert auto-renew rail (razorpay-recurring*.ts)
 * still reference them; they are no longer SOLD. See PURCHASABLE_SURGEON_PLANS.
 */
export type SurgeonPlanKey = "trial" | "monthly" | "annual";

/**
 * Plans checkout may create an order for (2026-10-02 pricing lock,
 * decisions/2026-10-02-credit-25-usd-both-roles.md): annual only. The
 * Rs 9,999 monthly plan was dropped, and the Rs 999 first-month trial was
 * replaced by the Rs 999 first CREDIT (lib/billing/credit-order.ts).
 */
export const PURCHASABLE_SURGEON_PLANS: readonly SurgeonPlanKey[] = ["annual"];

export function isSurgeonPlanPurchasable(plan: string): plan is SurgeonPlanKey {
  return (PURCHASABLE_SURGEON_PLANS as readonly string[]).includes(plan);
}

/**
 * Zone A = India + emerging (VN, ID, PH). Zone B = TH, MY. Everything else
 * (SG, AU, HK, JP, KR, US, EU, UK, CA, any future market) is Zone C at the
 * same rate -- "any new country slots into the nearest zone by purchasing
 * power" (decision doc). COUNTRY ONLY. No pincode, no city, no metro-tier
 * logic anywhere in this module -- the India metro split was explicitly
 * REMOVED (decision doc line 27).
 */
const ZONE_A_COUNTRY_CODES: readonly string[] = ["IN", "VN", "ID", "PH"];
const ZONE_B_COUNTRY_CODES: readonly string[] = ["TH", "MY"];

/**
 * Resolves a Zone from an ISO 3166-1 alpha-2 country code. Returns `null`
 * for a missing/empty code -- callers must treat "no country on file" as a
 * distinct case from "country resolved to Zone C", never silently default
 * to India.
 */
export function resolveZone(countryCode: string | null | undefined): SurgeonPlanZone | null {
  if (!countryCode) return null;
  const cc = countryCode.trim().toUpperCase();
  if (!cc) return null;
  if (ZONE_A_COUNTRY_CODES.includes(cc)) return "A";
  if (ZONE_B_COUNTRY_CODES.includes(cc)) return "B";
  // Catch-all: every other country code, including the developed markets
  // named explicitly in the decision doc (SG, AU, HK, JP, KR, US, EU, UK,
  // CA) and any future market, resolves to Zone C.
  return "C";
}

interface SurgeonPlanPrice {
  amountMinor: number;
  currency: string;
}

/**
 * Price card (ex-GST / local tax) -- 2026-08-14 REVISED pricing, frozen for
 * 90 days or 20 paying surgeons. See the decision doc's price table.
 */
export const SURGEON_PLAN_PRICING: Record<SurgeonPlanZone, Record<SurgeonPlanKey, SurgeonPlanPrice>> = {
  A: {
    trial: { amountMinor: 99_900, currency: "INR" }, // Rs 999
    monthly: { amountMinor: 999_900, currency: "INR" }, // Rs 9,999
    annual: { amountMinor: 4_999_900, currency: "INR" }, // Rs 49,999
  },
  B: {
    trial: { amountMinor: 2_900, currency: "USD" }, // $29
    monthly: { amountMinor: 19_900, currency: "USD" }, // $199
    annual: { amountMinor: 99_900, currency: "USD" }, // $999
  },
  C: {
    trial: { amountMinor: 4_900, currency: "USD" }, // $49
    monthly: { amountMinor: 39_900, currency: "USD" }, // $399
    annual: { amountMinor: 199_900, currency: "USD" }, // $1,999
  },
};

export function getSurgeonPlanPrice(zone: SurgeonPlanZone, plan: SurgeonPlanKey): SurgeonPlanPrice {
  return SURGEON_PLAN_PRICING[zone][plan];
}

const RAZORPAY_TRANSACTABLE_ZONES: readonly SurgeonPlanZone[] = ["A", "B", "C"];

export function isZoneTransactable(zone: SurgeonPlanZone): boolean {
  return RAZORPAY_TRANSACTABLE_ZONES.includes(zone);
}

/**
 * Paid-period length for a plan. Annual = 12 months. Monthly AND trial both
 * grant a 1-month period -- the Rs 999 first-month trial is cadence
 * "monthly" too (Subscription.billingInterval), `plan` is what marks it as
 * the discounted once-ever trial row.
 */
export function periodMonthsForPlan(plan: SurgeonPlanKey): number {
  return plan === "annual" ? 12 : 1;
}
