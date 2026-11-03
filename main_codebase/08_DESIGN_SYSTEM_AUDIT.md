# Faceify Labs — Design System & Styling Audit

## 1. CSS Architecture: Tailwind CSS v4
The application uses Tailwind CSS v4 with the new `@theme` syntax defined directly in `app/[locale]/globals.css`.

### Color Palette (OKLCH Perceptual Space & Hex Tokens)
The design system employs **OKLCH** for medical accuracy, ensuring perceptual brightness and contrast remain consistent across themes:

| Token Name | Color Value / Space | Intended Application |
| :--- | :--- | :--- |
| `--color-background` | `oklch(0.985 0.002 240)` | Ultra-light surgical slate background for high-contrast reading |
| `--color-foreground` | `oklch(0.27 0.06 260)` | Deep surgical navy/slate text (#1e293b equivalent) |
| `--color-primary` | `oklch(0.20 0.06 265)` | High-emphasis dark slate brand color |
| `--color-medical-blue` | `oklch(0.58 0.18 250)` | Diagnostic accuracy indicators and interactive hyperlinks |
| `--color-medical-teal` | `oklch(0.65 0.16 185)` | Clinical authority badges, success states, active tools |
| `--color-medical-cyan` | `oklch(0.72 0.15 210)` | HUD telemetry metrics and landmark coordinate pins |
| `--color-sage` | `#3d6b5e` | Primary organic brand color for buttons, badges, and accents |
| `--color-sage-light` | `#6b9e8f` | Secondary hover states, subtle rings, glowing highlights |
| `--color-cream` | `#f5f0e8` | Warm editorial background for story and narrative sections |
| `--color-warm` | `#faf7f2` | Soft secondary background for cards and contrast bands |
| `--color-ink` | `#0a0f1a` | Deep void black for hero backgrounds and dark-theme containers |
| `--color-sim-bg` | `#0c1018` | Specialized dark canvas background for surgical simulators |
| `--color-sim-surface` | `#141a24` | Elevated sidebar and control panel surface color |
| `--color-sim-border` | `rgba(255, 255, 255, 0.06)`| Hairline separator lines between simulator controls |

---

## 2. Typography Token Mapping
- `font-sans`: `var(--font-plus-jakarta)` (Plus Jakarta Sans)
- `font-serif`: `var(--font-instrument-serif)` (Instrument Serif)
- `font-body`: `var(--font-dm-sans)` (DM Sans)
- `font-headline`: `var(--font-newsreader)` (Newsreader)

---

## 3. Reusable UI Components (`components/ui/`)
- **`Button.tsx`**: Supports primary, secondary, outline, ghost, and danger variants with accessibility tags.
- **`Dialog.tsx`**: Accessible modal dialog system with backdrop blur, focus trapping, and keyboard dismissal.
- **`Accordion.tsx`**: Collapsible FAQ and procedure recovery section containers with smooth height animations.
- **`Tabs.tsx`**: Accessible tab list switching between 2D, 3D, and Realtime simulator modes.
- **`PhoneInput.tsx`**: International phone number input with automatic country flag formatting.
- **`hud/` Primitives**: Surgical HUD components including `GlassTag`, `HudLabel`, `LandmarkOverlay`, `MetricBar`, and `RadialGauge`.
