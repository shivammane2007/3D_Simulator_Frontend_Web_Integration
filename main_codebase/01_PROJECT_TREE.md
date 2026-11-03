# Faceify Labs — Project Tree Structure

## Overview
This document represents the project-owned directory hierarchy of `faceify-labs-web`.
Generated and dependency directories (`node_modules`, `.next`, `.git`, `dist`, `playwright-results`, `coverage`) have been excluded from recursive expansion to preserve clarity while noting their role.

```text
faceify-labs-web/
├── .github/                      # CI/CD Workflows, GitHub Actions, Dependabot (25 files)
│   ├── workflows/                # test.yml, build.yml, e2e.yml, deploy-migrations.yml
│   └── ISSUE_TEMPLATE/
├── .husky/                       # Git pre-commit hooks for lint-staged & test integrity (20 files)
├── .shortcuts/                   # Task automation scripts and developer shortcuts (2 files)
├── .specify/                     # Specification memory and core project constitution (1 file)
│   └── memory/constitution.md    # Source of truth for architectural principles & clinical credibility
│
├── app/                          # Next.js 16 App Router (809 files)
│   ├── [locale]/                 # Internationalized user-facing routes (5 locales)
│   │   ├── (auth)/               # Auth route groups (login, signup, verify, forgot-password)
│   │   ├── about/                # Corporate background & mission
│   │   ├── account/              # User profile & password settings
│   │   ├── admin/                # Platform management (clinics, deals, payouts, affiliates)
│   │   ├── blog/                 # Educational articles & clinical research summaries
│   │   ├── deals/                # Local aesthetic deals marketplace by city/procedure
│   │   ├── demo/                 # Interactive live demo flows for prospective surgeons
│   │   ├── dev/                  # Internal development & benchmark testing harnesses
│   │   ├── directory/            # Board-certified surgeon registry and search
│   │   ├── gallery/              # Clinical before/after case study gallery
│   │   ├── patient/              # Patient portal (consultations, simulations, results)
│   │   ├── procedures/           # 88 Educational procedure deep-dives
│   │   ├── simulate/             # 86 Surgical & aesthetic simulators (2D / 3D / Realtime)
│   │   ├── story/                # Brand narrative and clinical credibility journey
│   │   ├── surgeon/              # Surgeon portal (CRM, patient pipeline, 3D VR setup)
│   │   ├── layout.tsx            # Global layout: font imports, providers, navbar, footer
│   │   ├── page.tsx              # Homepage: Hero, MorphDemo, Proof, Carousel, Deals
│   │   └── globals.css           # Tailwind 4 theme, OKLCH palette, keyframe animations
│   │
│   ├── api/                      # Backend REST API routes (260 endpoints, non-localized)
│   │   ├── account/              # Data export and account erasure (DPDP/GDPR)
│   │   ├── admin/                # 60 platform administration endpoints
│   │   ├── auth/                 # CSRF, Google OAuth, session validation
│   │   ├── checkout/             # Razorpay & Polar payment flows
│   │   ├── clinic/               # Wholesale simulation credits & seat management
│   │   ├── consultations/        # Booking, video coordination, share links
│   │   ├── crm/                  # 37 clinic CRM pipeline & activity endpoints
│   │   ├── cron/                 # 12 scheduled background maintenance jobs
│   │   ├── deals/                # Clinic deals search and redemption
│   │   ├── patient/              # Patient consultation and result endpoints
│   │   ├── surgeon/              # 38 surgeon management and verification endpoints
│   │   ├── webhooks/             # Inbound webhooks from Polar, Razorpay, and Email
│   │   └── chat/                 # Cerebras AI streaming clinical chat
│   │
│   ├── embed/                    # White-label iframe embed surface for partner clinic sites
│   │   ├── [partnerSlug]/[procedure]/page.tsx
│   │   ├── lead-form/page.tsx
│   │   └── layout.tsx
│   │
│   ├── favicon.ico
│   ├── icon.svg
│   ├── not-found.tsx
│   ├── global-error.tsx
│   └── opengraph-image.tsx
│
├── components/                   # React UI Component Library (1,008 files)
│   ├── admin/                    # Platform administration dashboards & approval tables
│   ├── analyse/                  # Facial feature measurement & ratio display widgets
│   ├── annotations/              # 3D canvas annotations and surgeon markings
│   ├── auth/                     # Login forms, OTP inputs, password resets
│   ├── billing/                  # Subscription cards, day-pass pickers, payment status
│   ├── clinical/                 # Disclaimers, expectation modals, FDA references
│   ├── clinic/                   # Clinic team invites, location management
│   ├── crm/                      # Pipeline kanban boards, lead cards, activity feeds
│   ├── deals/                    # Clinic deal tiles, city selectors, redemption vouchers
│   ├── directory/                # Surgeon directory cards, filter sidebar, Google map
│   ├── homepage/                 # HeroSection, HeroMorphDemo, HeroFace3D, ProcedureCarousel
│   ├── onboarding/               # Surgeon & patient interactive walkthroughs
│   ├── procedures/               # ProcedureHero, MiniMorphos, ConcernMapper, Timeline
│   ├── seo/                      # JSON-LD structured data schemas (MedicalProcedure, FAQ)
│   ├── simulation/               # 380 files: Warp engines, sliders, before/after comparison
│   ├── simulators/               # Specialized simulator wrappers and dimension switchers
│   ├── surgeon/                  # VR setup guide, consultation notes, patient export
│   └── ui/                       # Core design system primitives (Button, Dialog, Tabs, HUD)
│
├── data/                         # Static application data & configuration registries (21 files)
│   ├── procedures.ts             # SINGLE SOURCE OF TRUTH: 88 procedures across 6 categories
│   ├── procedures-i18n.ts        # Dynamic translation loader for procedure metadata
│   ├── clinics.ts                # Verified clinic partners and locations
│   ├── surgeon-profiles.ts       # Board-certified surgeon directory data
│   ├── faq-data.ts               # Clinical, pricing, and safety FAQs
│   └── pricing-tiers.ts          # Subscription tiers (Pro, Clinic, Enterprise)
│
├── lib/                          # Core business logic, utilities, and infrastructure (884 files)
│   ├── ai/                       # Cerebras LLM client & streaming response handlers
│   ├── auth-constants.ts         # JWT issuer, audience, and cookie naming definitions
│   ├── billing/                  # Polar SDK client, Razorpay client, credit ledger
│   ├── blob.ts                   # Vercel Blob client for secure image storage
│   ├── csrf.ts                   # Server-side double-submit HMAC CSRF token verification
│   ├── csrf-client.ts            # Client-side `csrfFetch()` wrapper for all mutations
│   ├── emails/                   # Resend transactional email templates and senders
│   ├── embed/                    # Partner iframe allowlisting and frame-ancestors logic
│   ├── prisma.ts                 # Prisma Client singleton with connection pooling
│   ├── rate-limit.ts             # Upstash Redis sliding-window rate limiters
│   ├── session.ts                # Custom JWT session creation, validation, and refresh
│   └── simulation/               # 114 files: Warp engine, MediaPipe face mesh, Delaunator
│
├── messages/                     # Next-intl translation dictionary JSON files (6 files)
│   ├── en.json                   # English (441 KB)
│   ├── ja.json                   # Japanese (521 KB)
│   ├── ko.json                   # Korean (483 KB)
│   ├── pt.json                   # Portuguese (474 KB)
│   └── th.json                   # Thai (765 KB)
│
├── prisma/                       # Database schema and migration history (71 files)
│   ├── schema.prisma             # 83 data models (User, Simulation, Deal, Clinic, etc.)
│   └── migrations/               # 60+ PostgreSQL SQL migration records
│
├── public/                       # Static public assets served by Next.js (212 files)
│   ├── images/                   # Hero faces, procedure diagrams, badges, guides
│   ├── models/                   # 3D GLB/OBJ models, HDR environment maps
│   ├── wasm/                     # WebAssembly binaries for Banuba and MediaPipe
│   ├── logo.svg                  # Brand SVG logos
│   └── ...
│
├── remotion/                     # Programmatic video generation compositions (26 files)
│   └── src/                      # LaunchVideo, LaunchVideoV2, LaunchVideoV3
│
├── scripts/                      # Operational automation and maintenance scripts (101 files)
│   ├── flame-export/             # Python tools exporting FLAME model PKLs to ONNX
│   ├── copy-banuba-assets.mjs    # Post-install script copying AR WASM assets to public/
│   ├── deploy-migrations.sh      # Automated Prisma migration runner
│   └── sync-embed-allowlist.ts   # Edge Config embed domain synchronizer
│
├── src/                          # FLAME 3D neural head model subsystem (9 files)
│   ├── lib/flame/                # FlameFitting, FlameInference, FlameRenderer
│   └── workers/                  # flameFitting.worker.ts (offscreen web worker)
│
├── telegram-bot/                 # Grammy-powered Telegram bot for real-time notifications (17 files)
├── tests/                        # Playwright automated test suites (71 files)
├── types/                        # Global TypeScript declarations (4 files)
├── docs/                         # Clinical evaluations, architecture specs, audits (163 files)
├── package.json                  # Dependencies, scripts, overrides
├── next.config.ts                # Next.js configuration, security headers, rewrites, redirects
├── proxy.ts                      # Edge middleware: dynamic CSP nonce, JWT auth, CSRF fast-path
├── tsconfig.json                 # TypeScript compiler configuration with path aliases
└── vitest.config.ts              # Vitest test suite configuration
```
