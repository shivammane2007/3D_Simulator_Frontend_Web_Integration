# Faceify Labs — Data & Content Flow Architecture

## 1. Single Source of Truth: `data/procedures.ts`
The entire application relies on `data/procedures.ts` (3,955 lines) as the canonical repository for aesthetic procedures. It defines:
- **88 Procedures** grouped into 6 clinical categories:
  1. `surgical` (Rhinoplasty, Blepharoplasty, Facelift, Chin Augmentation, Buccal Fat, etc.)
  2. `non-surgical` (Chemical Peels, Laser Resurfacing, Thread Lift, Microneedling, etc.)
  3. `injectable` (Botox, Dermal Fillers, Fat Grafting, Profhilo, Sculptra, etc.)
  4. `dental` (Smile Design, Teeth Whitening, Veneers, Dental Implants, Invisalign)
  5. `body-contouring` (Breast Augmentation, Liposuction, Tummy Tuck, BBL, Arm Lift)
  6. `hair-restoration` (FUE Hair Transplant, Scalp Micropigmentation, Beard Transplant, Eyebrows)
- **5 Geographic Regions**: United States, Thailand, South Korea, India, and Singapore with currency symbols and local cost ranges.

---

## 2. Relational Data Layer: Prisma ORM (83 Entities)
Key database entity clusters:
- **Identity & Roles**: `User`, `Surgeon`, `Affiliate`, `ClinicMembership`, `ClinicSeat`.
- **Clinical Simulations**: `Simulation`, `SurgeonSimulation`, `PatientSimulation`, `Annotation3D`.
- **Marketplace & Deals**: `ClinicDeal`, `DealCampaign`, `DealRedemption`, `DealPayoutBatch`.
- **Consultations & CRM**: `ConsultationRequest`, `ConsultationDeposit`, `CrmLead`, `CrmActivity`, `CrmAppointment`.
- **Compliance & Auditing**: `AuditLog`, `LoginAttempt`, `PatientConsent`, `DpdpErasureJob`.

---

## 3. Data Mutation Flow & Security
1. Client components trigger mutations exclusively through `csrfFetch()` (`lib/csrf-client.ts`).
2. The double-submit cookie protocol transmits the `fl-csrf` cookie and `x-csrf-token` header.
3. Edge middleware (`proxy.ts`) performs constant-time string comparison (`timingSafeStringEqual`).
4. Route handlers verify session versions via `validateSessionVersion()` before mutating PostgreSQL.
