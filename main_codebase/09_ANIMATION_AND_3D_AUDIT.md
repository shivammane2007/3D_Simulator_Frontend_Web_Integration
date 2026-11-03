# Faceify Labs — Animation and 3D Systems Audit

## 1. Smooth Scroll Orchestration: Lenis
- **Implementation**: `components/SmoothScroll.tsx`
- **Configuration**:
  - Duration: `1.2s`
  - Easing: Exponential decay function `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
  - Gesture: Smooth vertical wheel interpolation with `touchMultiplier: 2`
- **Route Gate**: Intentionally deactivated on `LENIS_DISABLED_SEGMENTS = ["/simulate/"]` so that the simulator's fixed-viewport workspace and scrollable parameter sidebar do not conflict with outer page scrolling.
- **Accessibility**: Automatically disables when `(prefers-reduced-motion: reduce)` is active.

---

## 2. Component Transitions: Framer Motion
- **Presence**: Integrated across 201+ component files.
- **Use Cases**:
  - Staggered entrances on homepage cards (`HeroSection`, `ProcedureCarousel`).
  - Interactive before/after split sliders (`BeforeAfterSlider.tsx`).
  - Dialog and drawer transitions.
  - Interactive parameter controls in the simulation workspace.

---

## 3. WebGL Bicubic Mesh Warp Shader
- **Source**: `lib/simulation/warp-engine.ts`
- **Shader Pipeline**:
  - Vertex Shader: Binds interleaved `[clipX, clipY, uvU, uvV]` coordinates for all ~900 triangles and maps them to normalized device coordinates.
  - Fragment Shader: Uses a **16-tap Catmull-Rom bicubic filter** with `GL_FRAGMENT_PRECISION_HIGH` precision. This prevents pixelation, smearing, and pore blurring when facial triangles are stretched during rhinoplasty tip rotation or chin augmentation.

---

## 4. 3D Head Reconstruction: FLAME & Three.js
- **Subsystem**: `src/lib/flame/` & `components/homepage/HeroFace3D.tsx`
- **Architecture**:
  - Uses the FLAME 3D head topology.
  - Evaluates shape and expression blendshapes via ONNX Runtime Web in a background Web Worker (`src/workers/flameFitting.worker.ts`).
  - Renders the resulting 3D geometry in Three.js with photo-aligned UV texture projection.
  - Supports WebXR via `@react-three/xr` for surgeons using VR headsets.

---

## 5. Live AR Deformation: Banuba WebAR
- **Implementation**: `components/simulation/RealtimeMode.tsx` & `RealtimeWarpLoop.tsx`
- **Role**: Feeds live webcam video through Banuba WebAssembly filters to preview cosmetic adjustments live at 60 FPS.
