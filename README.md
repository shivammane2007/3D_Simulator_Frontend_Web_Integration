# Faceify Labs — 3D Surgical & Facial Simulator

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![WebGL2](https://img.shields.io/badge/Graphics-WebGL2_Shader_Pipeline-990000?style=for-the-badge&logo=webgl)](https://www.khronos.org/webgl/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#)

> **Show the result before the consult ends.**  
> Browser-native 3D facial simulation across 85+ aesthetic and reconstructive procedures. Real-time inference executes on-device with zero cloud photo uploads.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started & How to Run](#-getting-started--how-to-run)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Run the Development Server](#3-run-the-development-server)
  - [4. Build for Production](#4-build-for-production)
  - [5. Run Linting](#5-run-linting)
- [Project Directory Structure](#-project-directory-structure)
- [Key Application Routes](#-key-application-routes)
- [Privacy & Security Model](#-privacy--security-model)
- [Internationalization (i18n)](#-internationalization-i18n)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Faceify Labs** is an enterprise-grade medical and aesthetic consultation platform engineered for plastic surgeons, dermatologists, and aesthetic clinics. It bridges the gap between patient expectations and surgical outcomes through instant, on-device 3D facial morphing and volumetric simulation.

### Core Metrics:
- **85+ Surgical & Non-Surgical Simulators**: Rhinoplasty, Blepharoplasty, Rhytidectomy, Orthognathic surgery, Injectables, and more.
- **468 Anatomical Landmarks**: High-density facial mesh tracking capturing micro-contours and facial dynamics.
- **0.04 mm RMSD Precision**: Clinically calibrated deformation vectors matching surgical biomechanics.
- **Zero Cloud Data Egress**: 100% of image processing and inference runs locally on the user's GPU via WebGL2 shaders and WebAssembly.

---

## ⚡ Key Features

- **Real-Time 3D Facial Morphing**: Interactive sliders and deformation handles allow real-time adjustments with sub-16ms latency.
- **On-Device AI Diagnostics**:
  - **AI Face Analyzer (`/simulate`)**: Complete facial symmetry, proportional analysis (Golden Ratio), and volume mapping.
  - **Acne & Skin Assessment (`/analyse`)**: Multi-zone dermal analysis, lesion classification, and severity scoring.
- **Multi-Language Localization (i18n)**: Seamless instant switching between 5 languages:
  - 🇺🇸 English (`EN`)
  - 🇹🇭 Thai (`TH`)
  - 🇰🇷 Korean (`KO`)
  - 🇧🇷 Portuguese (`PT`)
  - 🇯🇵 Japanese (`JA`)
- **Dual-Audience Custom Portals**:
  - **For Surgeons (`/for-surgeons`)**: Consultation workflow, EHR/EMR export, 3D surgical planning tools.
  - **For Patients (`/for-patients`)**: Education, procedure previews, finding verified specialists.
- **Dynamic Case Gallery (`/gallery`)**: High-fidelity before/after comparative sliders and outcome archives.
- **Founding Partner Program (`/founding-partners`)**: Tiered clinic onboarding and early-access deployments.
- **Fluid Cinematic UI**: Smooth inertial scrolling via Lenis, interactive 3D cards, Framer Motion micro-interactions, and accessible Radix UI primitives.

---

## 🏗 System Architecture

```
                       ┌─────────────────────────────────────────┐
                       │           Client Web Browser            │
                       │                                         │
 ┌─────────────────┐   │  ┌───────────────────┐                  │
 │ WebCam / Photo  │───┼─►│ MediaPipe / Mesh  │ (468 Landmarks)  │
 └─────────────────┘   │  └─────────┬─────────┘                  │
                       │            │                            │
                       │  ┌─────────▼─────────┐                  │
                       │  │   WebGL2 Shader   │ (Sub-16ms        │
                       │  │ Deformation Engine│  Local GPU Pass) │
                       │  └─────────┬─────────┘                  │
                       │            │                            │
                       │  ┌─────────▼─────────┐                  │
                       │  │ Interactive View  │                  │
                       │  │ Split Compare UI  │                  │
                       │  └───────────────────┘                  │
                       │                                         │
                       │  🔒 NO PHOTO DATA LEAVES CLIENT DEVICE  │
                       └─────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Motion & Scroll** | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/) |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com/) (Accordion, Dialog, Tabs, Dropdowns) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Validation** | [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/) |

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed on your machine:

1. **Node.js**: Version `18.18.0` or higher (Node.js `20+` or `22+` recommended).
   - Check version: `node -v`
2. **Package Manager**: `npm` (comes with Node.js), `pnpm`, `yarn`, or `bun`.
3. **Modern Web Browser**: Chrome, Edge, Safari, or Firefox with **WebGL2** support enabled.

---

## 🚀 Getting Started & How to Run

### 1. Clone Repository

```bash
git clone https://github.com/shivammane2007/3D_Simulator_Frontend_Web_Integration.git
cd "3D Simulator Frontend Web Integration"
```

### 2. Install Dependencies

Install all required node packages:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the Development Server

Start the local Next.js development server with Turbopack:

```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

> **Note**: The dev server includes Hot Module Replacement (HMR). Any modifications made in `src/` will reflect immediately.

### 4. Build for Production

To create an optimized, static production build:

```bash
npm run build
```

To run the built production application locally:

```bash
npm run start
```

### 5. Run Linting

Check code formatting and TypeScript/ESLint rules:

```bash
npm run lint
```

---

## 📂 Project Directory Structure

```
├── public/                 # Static assets (images, icons, textures)
├── src/
│   ├── app/                # Next.js App Router (pages & route handlers)
│   │   ├── (legal)         # Privacy, Terms, Cancellation, Refund policies
│   │   ├── analyse/        # AI Acne & Skin Condition assessment tool
│   │   ├── blog/           # Medical aesthetics & tech articles
│   │   ├── consultation/   # Virtual consultation booking flow
│   │   ├── directory/      # Verified plastic surgeon clinic directory
│   │   ├── faq/            # Comprehensive FAQ database
│   │   ├── for-patients/   # Patient-centric portal & procedure insights
│   │   ├── for-surgeons/   # Clinical tools & practice integration portal
│   │   ├── founding-partners/ # Founding partner program application
│   │   ├── gallery/        # Before & after simulation case gallery
│   │   ├── leadership/     # Executive & medical advisory board
│   │   ├── login/          # Clinical portal authentication
│   │   ├── our-story/      # Company vision, mission & team
│   │   ├── partners/       # Enterprise & hospital network partnerships
│   │   ├── pricing/        # Tiered subscription & license pricing
│   │   ├── privacy/        # Zero-data-retention compliance specifications
│   │   ├── procedures/     # 85+ procedure catalog & dynamic detail pages
│   │   │   └── [id]/       # Dynamic single procedure route
│   │   ├── simulate/       # Browser 3D face simulator & landmark analyzer
│   │   ├── technology/     # WebGL2 engine & mathematical pipeline breakdown
│   │   ├── trust/          # Security, HIPAA/GDPR & clinical validation
│   │   ├── use-cases/      # Real-world clinical application scenarios
│   │   ├── globals.css     # Global styles & Tailwind v4 design tokens
│   │   ├── layout.tsx      # Root layout with LanguageProvider & Lenis Scroll
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Navigation, Footer, Container, Mobile Drawer
│   │   ├── media/          # Video/Image comparison sliders & visual assets
│   │   ├── motion/         # Scroll triggers, stagger reveals, fade animations
│   │   ├── sections/       # Hero, ProcedureExplorer, TechSection, Pricing, etc.
│   │   ├── simulator/      # Interactive 3D Simulator Shell & canvas controls
│   │   └── ui/             # Radix primitives, Buttons, Badges, Modals, Cards
│   ├── config/             # Site configuration & metadata
│   ├── context/            # React Contexts (LanguageContext i18n, SimulatorState)
│   ├── data/               # Procedures database, navigation links, pricing tiers
│   └── lib/                # Utility helper functions (cn, formatters, math)
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## 🗺 Key Application Routes

| Route | Description |
|---|---|
| `/` | Main landing page featuring interactive hero, metrics, technology highlights, and procedure explorer |
| `/procedures` | Complete searchable database of 85+ aesthetic and surgical procedures |
| `/procedures/[id]` | Deep-dive procedure page with recovery timelines, anatomical targets, and simulation morphs |
| `/simulate` | Interactive 3D Facial Simulator with real-time morph sliders and landmark tracking |
| `/analyse` | AI-powered dermal acne and skin texture assessment |
| `/gallery` | Before / After clinical case study gallery with split-view comparison |
| `/technology` | Deep architectural breakdown of the client-side WebGL2 inference pipeline |
| `/for-surgeons` | Practice integration tools, patient conversion metrics, and clinic workflows |
| `/for-patients` | Patient guide, expectation management, and simulator walkthrough |
| `/founding-partners` | Application for early access clinic partnership and co-development |
| `/pricing` | Tiered subscription packages for solo practices, multi-location clinics, and enterprise hospital systems |
| `/our-story` | Company origin, founders, clinical advisory team, and research methodology |
| `/trust` | Privacy architecture, zero-data-retention proof, and compliance certifications |
| `/blog` | Medical publication digests, aesthetic trend analysis, and simulation research |

---

## 🔒 Privacy & Security Model

Faceify Labs is built on a **Zero-Data-Retention** philosophy:

1. **Client-Side Compute**: Patient photographs and live camera feeds are processed entirely in browser memory (VRAM/RAM).
2. **Zero Cloud Telemetry**: Raw facial photos are **never** transmitted to backend servers or third-party cloud APIs.
3. **HIPAA & GDPR Aligned**: By eliminating server-side biometric storage, clinics achieve instantaneous compliance without complex data sovereignty overhead.

---

## 🌐 Internationalization (i18n)

The application features a built-in, lightweight translation system managed via `LanguageContext` (`src/context/LanguageContext.tsx`):

- **Supported Languages**: English (`EN`), Thai (`TH`), Korean (`KO`), Portuguese (`PT`), Japanese (`JA`).
- **Persistence**: Selected language preference is preserved across page navigations and sessions.
- **Zero Bundle Overhead**: Pure client-side dictionary mapping with no heavy external dependencies.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'feat: add amazing new feature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use of this software and its associated documentation is strictly prohibited without explicit permission from Faceify Labs.

---

<p align="center">
  Developed with ❤️ for the future of medical aesthetics.
</p>
