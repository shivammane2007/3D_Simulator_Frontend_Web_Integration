# Faceify Labs — Media & Asset Inventory

## Asset Distribution Summary
Total Non-Code Media Assets: **246 Files**

- **JPEG Images (`.jpg`)**: 105 files (Hero faces, clinical before/after photographs, surgeon avatars)
- **PNG Images (`.png`)**: 84 files (Alpha-transparent overlays, medical diagrams, texture masks)
- **WebP Images (`.webp`)**: 37 files (High-efficiency compressed procedure examples)
- **WebAssembly Binaries (`.wasm`)**: 6 files (Banuba WebAR real-time engine, MediaPipe vision tasks)
- **Neural ONNX Models (`.onnx`)**: 3 files (FLAME 3D head model inference networks)
- **Video Assets (`.mp4` / `.webm`)**: 5 files (Demonstration simulations and hero video loops)
- **Audio Assets (`.mp3`)**: 2 files (Camera shutter feedback sounds for photo capture)
- **3D Geometry (`.glb` / `.obj` / `.hdr`)**: 3 files (Base anatomical head mesh and HDR lighting environment)
- **Vision Tasks (`.task`)**: 1 file (MediaPipe Face Landmarker bundle)

---

## Typography & Font Strategy
No static local font files (`.woff`, `.woff2`, `.ttf`) are stored in the repository. All fonts are streamed via **`next/font/google`** with zero layout shift (CLS):

1. **Plus Jakarta Sans** (`--font-plus-jakarta`): Primary UI sans-serif font across all portals and controls.
2. **DM Sans** (`--font-dm-sans`): Clean body text font for clinical explanations, procedures, and blogs.
3. **Instrument Serif** (`--font-instrument-serif`): Editorial serif used for high-impact marketing headlines and pull quotes.
4. **Newsreader** (`--font-newsreader`): Medical academic serif font used for clinical authority and procedure titles.

---

## 3D Models and Neural Assets
| Asset File | Location | File Size | Purpose |
| :--- | :--- | :--- | :--- |
| `face.glb` | `public/models/hero/face.glb` | ~1.2 MB | 3D decorative head model rendered on coming-soon simulator pages |
| `flame_model.onnx` | `public/models/flame_model.onnx` | ~4.8 MB | Dense 3D parametric head model evaluated via ONNX Runtime Web |
| `face_landmarker.task` | `public/models/face_landmarker.task` | ~3.1 MB | MediaPipe 468 landmark detection model bundle |
| `studio_small_08.hdr` | `public/models/env/studio.hdr` | ~1.4 MB | High dynamic range image providing realistic anatomical lighting |
