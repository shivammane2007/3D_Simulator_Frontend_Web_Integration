# Faceify Labs — Complete SVG Asset Inventory

## 1. Standalone SVG Files (16 Files Detected)

| SVG File | Path | ViewBox | Dimensions | Animated | Visual Purpose | Used By |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `icon.svg` | `app/icon.svg` | `0 0 300 300` | `3.5 x auto` | `No` | Favicon / Brand Icon | Browser Tab, Header |
| `faceify-icon.svg` | `public/faceify-icon.svg` | `0 0 300 300` | `3.5 x auto` | `No` | Favicon / Brand Icon | Browser Tab, Header |
| `file.svg` | `public/file.svg` | `0 0 16 16` | `auto x auto` | `No` | General Asset | Various Components |
| `globe.svg` | `public/globe.svg` | `0 0 16 16` | `auto x auto` | `No` | General Asset | Various Components |
| `acne-closeup-guide.svg` | `public/images/guides/acne-closeup-guide.svg` | `0 0 600 300` | `240 x 260` | `No` | Clinical Photography Guide | Acne & Skin Analysis Modals |
| `logo-light.svg` | `public/logo-light.svg` | `0 0 900 400` | `2.5 x auto` | `No` | Brand Logo | Navbar, Footer, Remotion Video |
| `logo.svg` | `public/logo.svg` | `0 0 900 400` | `2.5 x auto` | `No` | Brand Logo | Navbar, Footer, Remotion Video |
| `next.svg` | `public/next.svg` | `0 0 394 80` | `auto x auto` | `No` | General Asset | Various Components |
| `noise.svg` | `public/noise.svg` | `None` | `200 x 200` | `No` | Decorative Texture | Hero & Section Backgrounds |
| `safari-pinned-tab.svg` | `public/safari-pinned-tab.svg` | `0 0 16 16` | `16 x 16` | `No` | General Asset | Various Components |
| `vercel.svg` | `public/vercel.svg` | `0 0 1155 1000` | `auto x auto` | `No` | General Asset | Various Components |
| `window.svg` | `public/window.svg` | `0 0 16 16` | `auto x auto` | `No` | General Asset | Various Components |
| `faceify_logo_full_horizontal.svg` | `remotion/public/faceify_logo_full_horizontal.svg` | `0 0 1200 400` | `2.5 x auto` | `No` | Brand Logo | Navbar, Footer, Remotion Video |
| `faceify_logo_horizontal.svg` | `remotion/public/faceify_logo_horizontal.svg` | `0 0 900 400` | `2.5 x auto` | `No` | Brand Logo | Navbar, Footer, Remotion Video |
| `faceify_logo_icon_only.svg` | `remotion/public/faceify_logo_icon_only.svg` | `0 0 300 300` | `3.5 x auto` | `No` | Brand Logo | Navbar, Footer, Remotion Video |
| `faceify_logo_monochrome.svg` | `remotion/public/faceify_logo_monochrome.svg` | `0 0 900 400` | `2.5 x auto` | `No` | Brand Logo | Navbar, Footer, Remotion Video |

---

## 2. Inline SVG Elements in Components (138 Elements Across 88 Files)

Key components utilizing inline SVG for clinical and interface graphics:

1. **`components/homepage/HeroMorphDemo.tsx`**:
   - **Visual Elements**: Surgical annotation lines, landmark target rings, procedural measurement tags, drop-shadow filters (`<feDropShadow>`), and glowing coordinate anchors.
   - **Purpose**: Displays illustrative MediaPipe landmark measurements (Canthal tilt, nasolabial angle, vermilion ratio) directly mapped to an aesthetic portrait.

2. **`components/ui/hud/LandmarkOverlay.tsx` & `RadialGauge.tsx`**:
   - **Visual Elements**: Dynamic SVG circular progress gauges, coordinate crosshairs, anatomical bounding boxes, and surgical guide grids.
   - **Purpose**: Real-time HUD telemetry rendered during interactive facial deformation.

3. **`components/procedures/MiniMorphos.tsx`**:
   - **Visual Elements**: Vector morph paths showing procedural before/after silhouettes.
   - **Purpose**: Educational vector morphing demonstration on procedure detail pages.

4. **`components/procedures/LogicStrip.tsx`**:
   - **Visual Elements**: Medical workflow step connectors, diagnostic icons, and precision indicator arrows.

---

## 3. SVG Classification Matrix
- **Brand Logos**: `public/logo.svg`, `public/logo-light.svg`, `remotion/public/faceify_logo_full_horizontal.svg`.
- **System Icons**: `app/icon.svg`, `public/faceify-icon.svg`, `public/safari-pinned-tab.svg`.
- **Clinical Guides**: `public/images/guides/acne-closeup-guide.svg`.
- **Textures**: `public/noise.svg` (applied as a SVG turbulence noise overlay for glassmorphism effects).
- **Interactive HUD Overlays**: 138 inline SVGs across `components/ui/hud/` and `components/simulation/`.
- **UI Icons**: Handled by **Lucide React** (391 component files import from `lucide-react`).
