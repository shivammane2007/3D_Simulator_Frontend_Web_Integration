# Faceify Labs — Application Architecture

## 1. High-Level Architectural Flow

```mermaid
flowchart TD
    User([End User / Surgeon / Patient]) -->|HTTPS Request| Cloudflare[Cloudflare Edge / CDN]
    Cloudflare -->|Request with Headers| EdgeProxy[proxy.ts: Edge Middleware]

    subgraph Security & Routing Boundary
        EdgeProxy -->|1. Nonce-based CSP| CSPGen[Mint Crypto Nonce]
        EdgeProxy -->|2. Frame Ancestors| EmbedCheck{Is /embed Route?}
        EmbedCheck -->|Yes| Allowlist[Edge Config Partner Allowlist]
        EmbedCheck -->|No| StrictFrame[frame-ancestors 'none']
        EdgeProxy -->|3. JWT Verification| JoseAuth[Validate jose JWT Cookie]
        EdgeProxy -->|4. CSRF Check| CSRFFastPath[Timing-safe Double-submit Cookie]
        EdgeProxy -->|5. i18n Rewriting| IntlRouter[next-intl Locale Router]
    end

    IntlRouter --> NextApp[Next.js 16 App Router]

    subgraph Presentation & Application Core
        NextApp --> RootLayout[app/locale/layout.tsx]
        RootLayout --> Providers[AuthProvider + SmoothScroll + PostHog]
        Providers --> PageSwitch{Route Selector}

        PageSwitch -->|/| Homepage[Home Page: Hero + MorphDemo + Carousel]
        PageSwitch -->|/procedures/:slug| ProcedureDetail[Educational Procedure Deep Dive: ISR 300s]
        PageSwitch -->|/simulate/:slug| SimulatorShell[PatientSimulatorShell & Mode Gating]
        PageSwitch -->|/surgeon/*| SurgeonDashboard[Surgeon CRM & VR Studio]
        PageSwitch -->|/admin/*| AdminDashboard[Platform Admin & Verification]
        PageSwitch -->|/api/*| APIRoutes[Backend REST API & Webhooks]
    end

    subgraph Client-Side Simulation Pipeline - Zero Data Egress
        SimulatorShell --> LocalMediaPipe[MediaPipe Vision: 468 Face Landmarks]
        LocalMediaPipe --> Triangulator[Delaunator: Delaunay Mesh Generation]
        Triangulator --> WarpDispatcher{Dimension Dispatcher}

        WarpDispatcher -->|2D Mode| WebGLWarp[WebGL2 Catmull-Rom Bicubic Shader Engine]
        WebGLWarp -->|Fallback| Canvas2D[Canvas2D Offscreen Buffering]
        WarpDispatcher -->|3D Mode| FlameONNX[FLAME ONNX Runtime + Three.js Mesh]
        FlameONNX -->|VR Mode| WebXR[Three.js @react-three/xr SteamVR/Quest]
        WarpDispatcher -->|Realtime AR| BanubaWebAR[Banuba WebAR WASM Live Cam Warp]
    end

    subgraph Persistence & Infrastructure
        APIRoutes --> PrismaORM[Prisma 7.3 Client]
        PrismaORM --> Postgres[(PostgreSQL Database: 83 Models)]
        APIRoutes --> Upstash[(Upstash Redis: Rate Limiting)]
        APIRoutes --> VercelBlob[(Vercel Blob: Public KYC/Thumbnails)]
        APIRoutes --> ResendService[Resend API: Transactional Email]
        APIRoutes --> CerebrasAI[Cerebras API: High-speed Clinical Chat]
    end
```

---

## 2. Architectural Layers

### A. Edge Security Layer (`proxy.ts`)
1. **Per-Request CSP Nonce**: Every response receives a dynamically generated cryptographic nonce. Inline scripts must match this nonce to execute.
2. **Embed Frame Ancestors**: For standard routes, `frame-ancestors 'none'` is enforced. For `/embed/*` routes, dynamic allowlists (stored in Vercel Edge Config or local JSON) restrict iframe framing strictly to approved partner clinic domains.
3. **Stateless JWT Validation**: Validates session cookies via `jose`. Protects `/surgeon`, `/admin`, `/patient`, and private simulator routes before React Server Components render.
4. **Sliding-Window Session Refresh**: Sessions nearing half of their 30-day lifetime are automatically refreshed with an updated expiration header.

### B. Internationalization Strategy (`next-intl`)
- Supported Locales: English (`en`, default), Thai (`th`), Korean (`ko`), Portuguese (`pt`), Japanese (`ja`).
- Routing: `localePrefix: 'as-needed'` ensures clean URLs for default English while prefixing international routes (e.g., `/th/simulate/rhinoplasty`).
- Performance: Translation dictionaries are loaded server-side per request, preventing bloated client JavaScript bundles.

### C. Client-Side Simulation Pipeline (Zero Data Egress)
The core clinical mandate is that **no patient photo ever leaves the browser**.
1. **Ingestion**: Patient photos are ingested locally and normalized (EXIF orientation, max 1024px constraint).
2. **Landmark Extraction**: `@mediapipe/tasks-vision` extracts 468 3D facial coordinates on an offscreen canvas.
3. **Mesh Triangulation**: `delaunator` computes Delaunay triangulation combining the 468 landmarks with 16 boundary anchor points into ~900 triangles.
4. **Deformation Engine**:
   - **Primary Path**: WebGL2 shader with interleaved vertex buffers and 16-tap Catmull-Rom bicubic texture sampling.
   - **Fallback Path**: Canvas 2D affine transform clipping per triangle with dirty-rect optimization.
   - **3D Path**: Parametric FLAME neural mesh fitted via ONNX Runtime Web and rendered with Three.js.
   - **AR Path**: Live webcam stream deformation powered by Banuba WebAR.
