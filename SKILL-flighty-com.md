---
name: design-flighty-com
description: Design system extracted from Flighty (https://flighty.com/). Use when building UI that should match this brand's visual identity.
triggers:
  - "Flighty"
  - "flighty-com"
  - "design like Flighty"
  - "Flighty風"
source: https://flighty.com/
extractedAt: 2026-08-24T10:17:05.967Z
tags: ["light", "rounded", "colorful", "bold-typography", "serif"]
---
# Design System Inspired by Flighty

> Auto-extracted from `https://flighty.com/` on 2026-08-24

## 1. Visual Theme & Atmosphere

Friendly, approachable design with rounded shapes and generous whitespace.

The hero section leads with "Get the truth when you travel".

**Key Characteristics:**
- system-ui as the heading font
- sans-serif as the body font for all running text
- Heading weight 700, letter-spacing -1px
- Light/white background (#ffffff) as the primary canvas
- Primary accent `#5200ff` used for CTAs and brand highlights
- 8 shadow level(s) detected — tinted shadows
- Rounded corners (16px+) creating a friendly, approachable feel
- Tags: light, rounded, colorful, bold-typography, serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#5200ff`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#032aff`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#ffffff`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#000000`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#000000`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#666666`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#fafafa`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#ffffff` | `--palette-1` | block | large | text-dark |
| 2 | `#000000` | `--palette-2` | block | large | text-light |
| 3 | `#021e30` | `--palette-3` | section | large | text-light |
| 4 | `#010a1a` | `--palette-4` | section | large | text-light |
| 5 | `#0d0a14` | `--palette-5` | section | large | text-light |
| 6 | `#05010d` | `--palette-6` | block | large | text-light |
| 7 | `#c91a1a` | `--palette-7` | block | medium | text-light |
| 8 | `#032aff` | `--palette-8` | block | medium | text-light |
| 9 | `#0a8935` | `--palette-9` | block | medium | text-light |
| 10 | `#5200ff` | `--palette-10` | block | medium | text-light |

## 3. Typography Rules

- **Heading Font:** `system-ui`, sans-serif
- **Body Font:** `sans-serif`, sans-serif

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | system-ui | 65px | 700 | 78px | -1px |
| H2 | system-ui | 56px | 700 | 56px | -0.28px |
| H3 | system-ui | 44px | 700 | 48.4px | normal |
| Body | system-ui | 14px | 500 | 16.8px | normal |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `65px` | headings |
| H1 | `56px` | headings |
| H2 | `48px` | headings |
| H3 | `44px` | headings |
| H4 | `40px` | headings |
| Body L | `36px` | body / supporting text |
| Body | `32px` | body / supporting text |
| Small | `28px` | body / supporting text |
| XS | `24px` | body / supporting text |
| Caption | `22px` | body / supporting text |

## 4. Component Stylings

No prominent button or card components detected. Use the color palette and typography rules above to create components consistent with the brand.

## 5. Layout Principles

- **Base spacing unit:** `20px` — use multiples (40px, 60px, 80px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `20px` | element |
| spacing-2 | `10px` | element |
| spacing-3 | `40px` | card |
| spacing-4 | `16px` | element |
| spacing-5 | `12px` | element |
| spacing-6 | `32px` | card |
| spacing-7 | `3px` | element |
| spacing-8 | `24px` | card |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-card | `16px` | card |
| radius-button | `12px` | button |
| radius-card | `20px` | card |
| radius-card | `99px` | card |
| radius-button | `8px` | button |
| radius-card | `50px` | card |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Low | `rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0.5px, rgba...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0.04) 0px 0px 0px 1px, rgba(0, 0, 0, 0.02) 0px 1px 1px 0.5px, rgba...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0.03) 0px 1px 1px 0.5px, rgba(0, 0, 0, 0.03) 0px 3px 3px 1.5px, rg...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0.19) 0px 1px 2px 0px` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0.03) 0px 0px 1px 1px, rgba(0, 0, 0, 0.03) 0px 1px 1px 0.25px, rgb...` | Cards, subtle elevation |


## 7. Do's and Don'ts

### Do
- Use `#ffffff` as the primary background color
- Use `system-ui` for all headings and `sans-serif` for body text
- Use `#5200ff` as the single dominant accent/CTA color
- Maintain `20px` as the base spacing unit — all gaps should be multiples
- Use rounded corners (`16px`+) consistently for all interactive elements
- Use serif fonts for headlines to maintain editorial authority
- Make headlines large and bold — typography is the hero element
- Embrace bold color combinations — playful energy is the point
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 700 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute system-ui/sans-serif with generic alternatives
- Don't use irregular spacing — stick to 20px grid
- Don't use dark/black backgrounds — this is a light-themed design
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't mix in geometric sans-serif headlines — it breaks the editorial tone
- Don't use pure black (#000000) for text — use `#000000` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 20px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #ffffff
Text:        #000000
Accent:      #5200ff
Secondary:   #032aff
Border:      #fafafa
```

### Example Prompts

1. "Build a hero section with a `#ffffff` background, `system-ui` heading in `#000000`, and a `#5200ff` CTA button."
2. "Create a pricing card using background `#000000`, border `#fafafa`, `sans-serif` for text, and 60px padding."
3. "Design a navigation bar — `#ffffff` background, `#000000` links, `#5200ff` for active state."
4. "Build a feature grid with 3 columns, 60px gap, each card using the card component style."
5. "Create a footer with `#000000` background, `#ffffff` text, and 40px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct
