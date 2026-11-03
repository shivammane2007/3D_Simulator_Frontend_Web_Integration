# Faceify Labs — Folder-by-Folder Analysis

This document provides a comprehensive breakdown of every project-owned directory in the repository.

---

## 1. `app/` (Application Layer)
- **Location**: `/app`
- **Purpose**: Next.js 16 App Router hierarchy hosting all localized user-facing pages, non-localized backend API routes, and white-label embed surfaces.
- **Key Subdirectories**:
  - `[locale]/`: Route group containing internationalized pages across 5 locales (`en`, `th`, `ko`, `pt`, `ja`).
  - `api/`: 260 REST endpoints handling database interactions, payment webhooks, AI chat, and CRM operations.
  - `embed/`: Lightweight iframe routes framed by partner clinic websites.
- **Important Files**:
  - `app/[locale]/layout.tsx`: Root application layout with font declarations, providers, and navigation.
  - `app/[locale]/page.tsx`: Main marketing homepage with responsive clinical showcases.
  - `app/[locale]/globals.css`: Core Tailwind CSS 4 theme, OKLCH palette, and component styles.
- **Dependencies**: React, Next.js, next-intl, Framer Motion, Lenis, Lucide React.
- **Used By**: End-users, surgeons, clinic administrators, and external partner sites.

---

## 2. `components/` (Component Library)
- **Location**: `/components`
- **Purpose**: Massive presentation and interaction layer containing 1,008 component files.
- **Key Subdirectories**:
  - `simulation/` (380 files): Interactive before/after canvases, parameter sliders, measurement HUDs, and GPU deformation controllers.
  - `homepage/` (38 files): Specialized hero morphing demos, 3D face visualizers, procedure carousels, and ROI calculators.
  - `simulators/` (49 files): Procedural simulator wrappers for specific anatomical treatments.
  - `admin/` (37 files): Platform administrative interfaces for deal approvals, payouts, and surgeon verification.
  - `crm/` (16 files): Surgical lead kanban boards, appointment scheduling, and patient interaction logs.
  - `ui/` (21 files): Primitives such as Button, Dialog, Tabs, Accordion, and surgical HUD overlays.
- **Important Files**:
  - `components/Navbar.tsx`: Global navigation bar with localized links and auth controls.
  - `components/Footer.tsx`: Application footer with medical disclaimers and procedure links.
  - `components/SmoothScroll.tsx`: Lenis smooth scrolling orchestrator.
  - `components/simulation/PatientRhinoplastySimulator.tsx`: Core rhinoplasty simulation workspace.
- **Dependencies**: Lucide React, Framer Motion, Three.js, Banuba WebAR, Delaunator.

---

## 3. `lib/` (Core Utilities & Domain Logic)
- **Location**: `/lib`
- **Purpose**: Houses pure business logic, database singletons, security infrastructure, and image processing algorithms.
- **Key Subdirectories**:
  - `simulation/` (114 files): The complete procedural deformation engine—MediaPipe face mesh detection, Delaunay triangulation, WebGL Catmull-Rom shaders, and anatomic volume clamps.
  - `billing/`: Payment processing integration for Polar and Razorpay.
  - `emails/`: Resend email templates and delivery helpers.
  - `embed/`: Edge Config partner allowlisting and frame-ancestors logic.
  - `crm/`: Patient data management, activity logs, and DPDP Act compliance.
- **Important Files**:
  - `lib/simulation/warp-engine.ts`: WebGL/Canvas2D mesh warping engine.
  - `lib/simulation/face-mesh.ts`: MediaPipe 468 landmark pipeline.
  - `lib/session.ts`: Stateless JWT auth with `jose`.
  - `lib/csrf.ts` & `lib/csrf-client.ts`: Double-submit HMAC CSRF protection.
  - `lib/prisma.ts`: Prisma Client database singleton.
- **Dependencies**: Prisma, Jose, Delaunator, MediaPipe, Sentry, Upstash.

---

## 4. `data/` (Static Data Registries)
- **Location**: `/data`
- **Purpose**: Serves as the single source of truth for all medical, anatomical, procedural, and pricing metadata.
- **Important Files**:
  - `data/procedures.ts`: Exhaustive registry containing 88 procedures across 6 categories, regional cost ranges, and recovery timelines.
  - `data/procedures-i18n.ts`: Localized accessor for procedure metadata.
  - `data/clinics.ts`: Partner clinic directory and geographic coordinates.
  - `data/pricing-tiers.ts`: Subscription plan definitions for surgeons and clinics.
- **Dependencies**: Consumed by `app/[locale]/procedures/[slug]`, `app/[locale]/simulate/`, and marketplace components.

---

## 5. `prisma/` (Database Infrastructure)
- **Location**: `/prisma`
- **Purpose**: Defines PostgreSQL schema models and tracks database migration history.
- **Important Files**:
  - `prisma/schema.prisma`: 83 data models covering Users, Surgeons, Simulations, Deals, Leads, and Audits.
  - `prisma/migrations/`: Over 60 individual SQL migration files documenting schema evolution.
- **Dependencies**: `@prisma/client`, `@prisma/adapter-pg`, `pg`.

---

## 6. `public/` (Static Public Assets)
- **Location**: `/public`
- **Purpose**: Directly served static web assets, 3D models, textures, and client-side neural binaries.
- **Key Subdirectories**:
  - `images/`: Photography of illustrative faces, before/after examples, and UI guides.
  - `models/`: 3D head models (`face.glb`), OBJ files, and HDR environment lighting.
  - `wasm/`: MediaPipe and Banuba WebAR WebAssembly binaries.
- **Important Files**: `logo.svg`, `faceify-icon.svg`, `noise.svg`.

---

## 7. `src/` (FLAME Neural 3D Head Model Subsystem)
- **Location**: `/src`
- **Purpose**: Specialized subsystem for dense 3D parametric head model fitting using the FLAME topology.
- **Important Files**:
  - `src/lib/flame/FlameFitting.ts`: Optimizes FLAME shape and expression coefficients against landmarks.
  - `src/lib/flame/FlameInference.ts`: Evaluates FLAME neural mesh via ONNX Runtime Web.
  - `src/lib/flame/FlameRenderer.ts`: Renders fitted 3D mesh with texture mapping.
  - `src/workers/flameFitting.worker.ts`: Off-thread Web Worker preventing UI thread blocking during optimization.

---

## 8. `remotion/` (Video Generation Studio)
- **Location**: `/remotion`
- **Purpose**: Programmatic video generation framework creating high-resolution before/after video exports and social marketing clips.
- **Important Files**: `LaunchVideo.tsx`, `LaunchVideoV2.tsx`, `LaunchVideoV3.tsx`.

---

## 9. `messages/` (Translation Dictionaries)
- **Location**: `/messages`
- **Purpose**: Houses the JSON translation catalogs for all supported languages: English (`en.json`), Thai (`th.json`), Korean (`ko.json`), Portuguese (`pt.json`), and Japanese (`ja.json`).

---

## 10. `scripts/` (Developer & CI/CD Tooling)
- **Location**: `/scripts`
- **Purpose**: Build-time scripts, asset distributors, benchmark runners, and database migration helpers.
- **Important Files**:
  - `scripts/copy-banuba-assets.mjs`: Distributes Banuba WebAR binaries into `public/`.
  - `scripts/deploy-migrations.sh`: Handles zero-downtime database migrations in deployment pipelines.
  - `scripts/flame-export/`: Python tooling converting PyTorch/PKL FLAME weights into browser-ready ONNX models.

---

## 11. `telegram-bot/` (Real-Time Notification Daemon)
- **Location**: `/telegram-bot`
- **Purpose**: Telegram bot built with `grammy` to alert administrators and surgeons instantly when new patient consultation leads or high-priority clinic deals are booked.
