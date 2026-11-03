# Faceify Labs — Comprehensive File-by-File Analysis

This document provides a deep architectural inspection of key source files across each layer of the application.

---

## 1. System Entry Points & Edge Infrastructure

### `proxy.ts` (Edge Request Middleware)
- **Extension**: `.ts`
- **File Type**: Next.js Edge Middleware
- **Purpose**: First line of defense intercepting incoming HTTP requests before React Server Components render.
- **Key Exports**: `default function proxy(req: NextRequest)`, `config` (matcher configuration).
- **Key Imports**: `next-intl/middleware`, `jose` (`jwtVerify`), `./i18n/config`, `./lib/session`, `./lib/embed/partner-allowlist`.
- **Main Logic & Responsibilities**:
  1. **Dynamic CSP Nonce**: Mints a unique random UUID nonce (`crypto.randomUUID()`) per request, embedding it into `x-nonce` and the Content-Security-Policy header. Replaces insecure `unsafe-inline`.
  2. **Iframe Framing Control**: Inspects pathname. Standard pages receive `frame-ancestors 'none'`. Routes starting with `/embed/` resolve partner clinic allowlists via `resolvePartnerAllowlist(partnerSlug)` to dynamically permit approved partner domains.
  3. **Stateless JWT Verification**: Protects `/surgeon`, `/patient`, `/dashboard`, `/admin`, and individual `/simulate/` pages. Validates JWT claims (`iss`, `aud`, `sub`, `role`) using `jose`. Redirects unauthenticated visitors to `/[locale]/login?callbackUrl=...`.
  4. **CSRF Fast-Path**: Contains `timingSafeStringEqual()` for constant-time comparison of `fl-csrf` cookie against `x-csrf-token` header on state-changing methods.
  5. **Sliding-Window Refresh**: Automatically re-issues tokens that have exceeded 50% of their 30-day lifetime via `refreshSessionIfNeeded()`.
  6. **CDN Cache Disabling**: Forces `Cache-Control: private, no-store` on dynamic demo and procedure routes to eliminate CSP nonce mismatch stalls.

---

### `next.config.ts` (Application Build Configuration)
- **Extension**: `.ts`
- **File Type**: Next.js Configuration Module
- **Purpose**: Configures build-time optimization, security headers, reverse proxy rewrites, and redirect rules.
- **Key Exports**: `export default withSentryConfig(withNextIntl(nextConfig))`.
- **Main Logic & Responsibilities**:
  1. **Tree-Shaking Optimization**: `experimental.optimizePackageImports` tree-shakes heavy barrel exports from `three`, `framer-motion`, `lucide-react`, `@react-three/fiber`, and `@react-three/drei`.
  2. **PostHog Reverse Proxy**: Rewrites `/ingest/static/:path*` to `https://us-assets.i.posthog.com/static/:path*` and `/ingest/:path*` to `https://us.i.posthog.com/:path*` to prevent adblocker loss.
  3. **Canonical Redirects**: Enforces permanent redirects for legacy simulator URLs (e.g. `/simulate/v-line-contouring` -> `/simulate/facial-contouring`, `/case-gallery` -> `/gallery`).
  4. **Sentry Webpack Plugins**: Configures automated client file sourcemap uploading and debug logging removal.

---

## 2. Simulation & Mathematical Algorithms

### `lib/simulation/warp-engine.ts` (Image Deformation Engine)
- **Extension**: `.ts`
- **File Type**: WebGL2 / 2D Canvas Image Processing Engine
- **Purpose**: Core algorithm executing real-time facial mesh deformation client-side.
- **Key Exports**: `computeTriangulation()`, `addBoundaryPoints()`, `warpImageWebGL()`, `warpImageCanvas2D()`.
- **Key Imports**: `delaunator`.
- **Main Logic & Responsibilities**:
  1. **Triangulation Caching**: Computes Delaunay triangulation for 468 landmarks + 16 perimeter boundary points. Uses a 32-bit rolling hash over all coordinates to detect single-landmark adjustments.
  2. **WebGL Shaders**:
     - Vertex Shader: Maps interleaved vertex positions and UV coordinates into normalized clip space.
     - Fragment Shader: Executes a **16-tap Catmull-Rom bicubic interpolation filter** with high-precision floats (`GL_FRAGMENT_PRECISION_HIGH`). This guarantees smooth continuous gradients without banding or pore blurring during extreme facial modifications.
  3. **Canvas 2D Fallback**: Uses offscreen buffer double-buffering with bounding dirty-rect calculation for legacy devices lacking WebGL.

---

### `lib/simulation/face-mesh.ts` (Facial Landmark Pipeline)
- **Extension**: `.ts`
- **File Type**: Computer Vision Inference Pipeline
- **Purpose**: Detects 468 3D facial landmarks from static images and video feeds.
- **Key Imports**: `@mediapipe/tasks-vision`.
- **Key Exports**: `detectLandmarks()`, `initializeFaceMesh()`, `getFacialPose()`.
- **Main Logic & Responsibilities**:
  1. Loads `face_landmarker.task` model bundle.
  2. Runs landmark inference and computes pitch, roll, and yaw head pose angles.
  3. Enforces confidence thresholding and triggers anatomical fallback adjustments when lighting or face angles are suboptimal.

---

## 3. Data Models & Registries

### `data/procedures.ts` (Procedure Registry)
- **Extension**: `.ts`
- **File Type**: TypeScript Data Definition Module (3,955 lines)
- **Purpose**: Single source of truth for all medical procedure information across educational and simulation routes.
- **Key Exports**: `PROCEDURES`, `PROCEDURE_CATEGORIES`, `REGIONS`, `getProcedureBySlug()`, `getProceduresByCategory()`.
- **Main Logic & Responsibilities**:
  - Defines 88 unique aesthetic procedures.
  - Documents recovery timelines, procedural duration, pros/cons, benefits, ideal candidates, and popularity indicators.
  - Houses regional cost matrices across 5 major cosmetic surgery markets: United States, Thailand, South Korea, India, and Singapore.
