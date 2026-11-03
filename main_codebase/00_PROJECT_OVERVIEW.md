# Faceify Labs — Project Overview & Technology Stack

## Executive Summary
**Faceify Labs** is a browser-native surgical simulation and clinical marketplace platform engineered for plastic surgeons, aesthetic practitioners, and cosmetic patients. The platform provides real-time, privacy-first simulations for 88 aesthetic and reconstructive procedures across 6 categories (Surgical, Non-Surgical, Injectables, Dental, Body Contouring, and Hair Restoration). All patient biometric processing and image deformations run 100% client-side via WebGPU, WebGL2, and HTML5 Canvas2D—ensuring zero patient data egress to remote servers.

---

## Technology Stack Matrix

| Category | Technology | Detected Version | Usage Location | Role & Architectural Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.2.3 | `app/`, `next.config.ts`, `proxy.ts` | Core application framework; utilizes Server Components (RSC), Edge Middleware, and ISR. |
| **Frontend Runtime** | React / React DOM | 19.2.3 | Entire codebase | UI component rendering library. |
| **Language** | TypeScript | 5.x | Entire codebase (`tsconfig.json`) | Strict type checking with `@webgpu/types` and path aliases. |
| **Styling** | Tailwind CSS | 4.x (`@tailwindcss/postcss`) | `app/[locale]/globals.css` | OKLCH perceptual color space, CSS theme tokens, responsive layouts. |
| **CSS Utilities** | clsx & tailwind-merge | 2.1.1 / 3.4.0 | `components/`, `lib/` | Dynamic classname merging without Tailwind conflicts. |
| **Smooth Scrolling** | Lenis | 1.3.17 | `components/SmoothScroll.tsx` | Inertial smooth scroll for marketing pages; disabled on simulator routes. |
| **Motion & Animation** | Framer Motion | 12.30.0 | 201+ component files | Layout transitions, modals, interactive cards, micro-interactions. |
| **3D Rendering** | Three.js | 0.182.0 | `components/homepage/HeroFace3D.tsx`, `lib/flame/` | 3D mesh rendering, lighting, material setup, camera controls. |
| **React 3D Bridge** | @react-three/fiber | 9.5.0 | 3D simulator components | Declarative Three.js scene graph in React. |
| **3D Helpers** | @react-three/drei | 10.7.7 | 3D viewers | Camera controls, environment HDR maps, mesh loaders. |
| **Virtual Reality (XR)** | @react-three/xr | 6.6.29 | `components/simulation/SimulatorXRProvider.tsx` | WebXR support for surgeons viewing 3D head models in VR headsets. |
| **Face Landmark Tracking** | @mediapipe/tasks-vision | 0.10.32 | `lib/simulation/face-mesh.ts` | Client-side 468-point facial landmark detection and pose estimation. |
| **Mesh Triangulation** | Delaunator | 5.0.1 | `lib/simulation/warp-engine.ts` | 2D Delaunay triangulation connecting 468 landmarks + boundaries into ~900 triangles. |
| **Neural Runtime** | ONNX Runtime Web | 1.24.3 | `src/lib/flame/FlameInference.ts` | Browser-based neural inference for FLAME 3D head model fitting. |
| **AR & WebAR** | @banuba/webar | 1.18.1 | `components/simulation/RealtimeMode.tsx` | Real-time live camera feed AR deformation and beauty filters. |
| **Internationalization** | next-intl | 4.8.2 | `i18n/`, `messages/`, `app/[locale]/` | 5 active locales: en, th, ko, pt, ja with zero-hydration leak. |
| **ORM & Database** | Prisma Client & CLI | 7.3.0 (`@prisma/adapter-pg`) | `prisma/schema.prisma`, `lib/prisma.ts` | 83 database models, PostgreSQL connection pooling via `pg` 8.18.0. |
| **Authentication** | jose (Custom JWT) | 6.2.0 | `lib/session.ts`, `proxy.ts` | Stateless JWT sessions with HS256, versioning, and role-based guards. |
| **Password Hashing** | bcryptjs | 3.0.3 | `app/api/auth/`, `scripts/set-user-password.ts` | Secure one-way hashing for optional account passwords. |
| **Form Handling** | react-hook-form & Zod | 7.75.0 / 4.3.6 | `components/`, `lib/validations/` | Schema validation and uncontrolled form state handling. |
| **Icons** | Lucide React | 0.563.0 | 391+ files | Lightweight SVG icon library. |
| **Video Production** | Remotion | 4.0.539 | `remotion/` | Programmatic before/after video rendering and marketing assets. |
| **Global Subscriptions** | Polar SDK & Next.js | 0.46.4 / 0.9.5 | `lib/billing/`, `app/api/webhooks/polar/` | SaaS billing, seat management, day-pass checkouts. |
| **India Payments** | Razorpay SDK | Custom REST API | `app/api/checkout/razorpay/` | UPI/NetBanking/INR checkouts for Indian clinic deals. |
| **Transactional Email** | Resend | 6.9.2 | 42 files (`lib/emails/`) | Consultations, OTP verification codes, partner activation emails. |
| **Error Monitoring** | @sentry/nextjs | 10.42.0 | `sentry.*.config.ts`, `next.config.ts` | Full-stack exception tracking, edge telemetry, performance monitoring. |
| **Product Analytics** | PostHog JS | 1.359.1 | `components/PostHogProvider.tsx` | Privacy-friendly product telemetry proxied via `/ingest` rewrite. |
| **AI LLM Integration** | Vercel AI SDK & Cerebras | 6.0.77 / 2.0.41 | `app/api/chat/route.ts`, `lib/ai/` | High-speed clinical assistant chat via Cerebras inference. |
| **Rate Limiting** | @upstash/ratelimit & Redis | 2.0.8 / 1.36.3 | `lib/rate-limit.ts` | Sliding-window edge rate limiting on auth and simulation endpoints. |
| **Object Storage** | @vercel/blob | 2.3.3 | `app/api/uploads/`, `lib/blob.ts` | Avatar photos, KYC documents, simulation thumbnails. |
| **Edge Configuration** | @vercel/edge-config | 1.4.3 | `lib/embed/partner-allowlist.ts` | Real-time white-label embed frame-ancestors allowlisting. |
| **Maps & Location** | @react-google-maps/api | 2.20.8 | `components/directory/ClinicMap.tsx` | Clinic directory maps, geolocation, and address autocomplete. |
| **Telegram Bot** | Grammy | 1.41.1 | `telegram-bot/`, `app/api/telegram/` | Instant notifications for incoming patient leads and admin alerts. |
| **Twitter Automation** | twitter-api-v2 | 1.29.0 | `lib/marketing/twitter.ts` | Automated clinical case study posting. |
| **Unit & Integration Tests** | Vitest | 4.0.18 | `vitest.config.ts`, 130+ test files | Ultra-fast unit testing with JSDOM and v8 coverage. |
| **E2E & Visual Testing** | Playwright | 1.58.2 | `tests/`, `playwright.config.ts` | Cross-browser automated user journeys and visual screenshot diffs. |
| **Accessibility Testing** | @axe-core/playwright | 4.11.1 | `tests/a11y/` | Automated WCAG 2.1 AA accessibility audits. |
| **Code Quality** | ESLint & Husky | 9.x / 9.1.7 | `eslint.config.mjs`, `.husky/` | Strict linting with pre-commit git hooks and lint-staged. |

---

## Key System Metrics
- **Total Project-Owned Files**: 3,829 files
- **Total Folders**: 40+ project-owned directories
- **Total Routes**: 510 routes (250 page routes, 260 API endpoints)
- **Database Models**: 83 Prisma entities
- **Aesthetic Procedures Cataloged**: 88 procedures across 6 categories
- **Interactive Simulators Implemented**: 57 fully functional; 35 in coming-soon waitlist state
- **Active Locales**: 5 languages (English, Thai, Korean, Portuguese, Japanese)
