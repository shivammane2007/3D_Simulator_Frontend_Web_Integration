# Faceify Labs — Important Files Quick Reference

| Category | File Path | Primary Responsibility |
| :--- | :--- | :--- |
| **Edge Middleware** | `proxy.ts` | Dynamic CSP nonce minting, JWT auth verification, CSRF fast-path, embed frame allowlist. |
| **App Configuration** | `next.config.ts` | Next-intl integration, Sentry wrapping, PostHog rewrites, security headers, redirects. |
| **TypeScript Config** | `tsconfig.json` | Module resolution, WebGPU typing, path aliases (`@/*`). |
| **Root Layout** | `app/[locale]/layout.tsx` | Google font loading, AuthProvider, SmoothScroll, ConsentGatedAnalytics, Navbar, Footer. |
| **Design System** | `app/[locale]/globals.css` | Tailwind 4 `@theme`, OKLCH surgical palette, keyframe animations, dark container overrides. |
| **Homepage** | `app/[locale]/page.tsx` | Server-rendered marketing homepage with geo-targeted deals and dynamic sections. |
| **Hero Component** | `components/homepage/HeroSection.tsx` | Hero section container with CSS keyframe entrance and responsive layout. |
| **Hero Morph Demo** | `components/homepage/HeroMorphDemo.tsx` | Illustrative facial landmark annotation overlay with SVG paths and filter effects. |
| **Procedure Registry** | `data/procedures.ts` | Single source of truth defining 88 procedures across 6 categories with regional pricing. |
| **Database Schema** | `prisma/schema.prisma` | 83 relational data models governing users, simulations, deals, leads, and audits. |
| **Session & Auth** | `lib/session.ts` | Jose JWT session creation, sliding-window refresh, and role assignment. |
| **CSRF Security** | `lib/csrf.ts` & `lib/csrf-client.ts` | Double-submit cookie CSRF generation, HMAC validation, and `csrfFetch` client. |
| **Warp Engine** | `lib/simulation/warp-engine.ts` | WebGL2 Catmull-Rom bicubic shader engine and Canvas2D fallback mesh deformation. |
| **Face Mesh** | `lib/simulation/face-mesh.ts` | MediaPipe vision task client extracting 468 3D facial landmarks. |
| **Simulator Wrapper**| `components/simulation/RhinoplastySimulatorWrapper.tsx` | Dimension switcher coordinating 2D, 3D, and Realtime AR simulation pipelines. |
| **Smooth Scroll** | `components/SmoothScroll.tsx` | Lenis smooth scroll provider with selective simulator route disabling. |
| **i18n Routing** | `i18n/routing.ts` & `i18n/config.ts` | Locale definitions (`en`, `th`, `ko`, `pt`, `ja`) and localized navigation helpers. |
| **AI Chat API** | `app/api/chat/route.ts` | Cerebras LLM clinical consultation streaming assistant. |
| **PostHog Analytics**| `components/PostHogProvider.tsx` | Privacy-friendly product telemetry initialization with reverse proxy. |
