# Faceify Labs — Developer Onboarding Guide

Welcome to the Faceify Labs engineering codebase. This guide walks you through the mental model and architecture required to understand and work safely within this repository.

---

## 1. Core Architectural Mental Model
Faceify Labs combines two major systems:
1. **Clinical Simulation Engine (Client-Side)**: Real-time image deformation running entirely in the user's browser via MediaPipe (468 landmarks), Delaunator, and WebGL2 Catmull-Rom shaders. **No patient photos are ever uploaded to a server for simulation.**
2. **SaaS & Marketplace Platform (Full-Stack)**: Next.js 16 App Router backed by PostgreSQL (Prisma 7), custom JWT sessions (`jose`), Polar/Razorpay billing, and a multi-city aesthetic deal marketplace.

---

## 2. Directory Navigation
- Look in `app/[locale]/` for user-facing routes (Pages, layouts).
- Look in `app/api/` for backend REST endpoints (Non-localized).
- Look in `components/simulation/` for the simulation canvas and parameter controls.
- Look in `lib/simulation/` for the underlying mathematical, geometric, and WebGL shader algorithms.
- Look in `data/procedures.ts` whenever adding, modifying, or reading procedure specifications.

---

## 3. Request Lifecycle
1. Request arrives at `proxy.ts` (Edge Middleware):
   - Mints a unique CSP nonce for script execution.
   - Enforces `frame-ancestors` security (widened only for approved `/embed/` partner domains).
   - Validates the `jose` JWT session cookie for protected prefixes (`/surgeon`, `/admin`, `/patient`, `/simulate/`).
   - Verifies the double-submit CSRF cookie on mutation methods (POST, PUT, DELETE).
2. Request passes to Next.js App Router:
   - Root layout (`app/[locale]/layout.tsx`) injects Google Fonts, `AuthProvider`, `SmoothScroll`, and global navigation.
   - Server Component pages fetch relational data via Prisma or static metadata from `data/procedures.ts`.

---

## 4. Safe Development Guidelines
- **Modifying Shared Components**: `components/Navbar.tsx`, `components/Footer.tsx`, `components/SmoothScroll.tsx`, and `components/simulation/PatientRhinoplastySimulator.tsx` are shared across multiple critical paths.
- **CSRF Mutations**: Always use `csrfFetch()` from `@/lib/csrf-client` when making POST, PUT, or DELETE requests.
- **Strict Verification Standards**:
  ```bash
  npx tsc --noEmit          # Strict type check
  npm run test              # Vitest test suite
  npm run lint              # ESLint check
  npm run build             # Build verification for layout/routing changes
  ```
