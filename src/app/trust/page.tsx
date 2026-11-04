import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield,
  Lock,
  FileCheck,
  Mail,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { routes } from '@/config/routes';

export const metadata: Metadata = {
  title: 'Trust & Privacy Architecture — Transparent Security Posture',
  description:
    'The base simulator runs 100% in your browser. No patient photo reaches our servers. Detailed compliance alignment, sub-processor matrix, and patient consent architecture.',
};

// ---------------------------------------------------------------------------
// Sub-processor matrix — verbatim from en.json / TrustPage
// ---------------------------------------------------------------------------
const SUB_PROCESSORS = [
  {
    name: 'Vercel',
    receives: 'All HTTP traffic; Vercel Blob stores patient before/after simulation images when saved',
    phi: 'Yes — Vercel Blob receives actual patient facial images (on explicit save only)',
    baa: 'DPA available; no BAA signed',
    scope: 'All paths (hosting); patient images on save (base sim + diffusion)',
  },
  {
    name: 'Neon (PostgreSQL)',
    receives:
      'User PII (email, name, userId); simulation metadata (procedure slug, params); PHI audit log entries; AI photo consent timestamps; Vercel Blob image URLs',
    phi: 'No raw photo bytes. Stores image URLs and userId + procedure + consent timestamps.',
    baa: 'DPA available; no BAA signed',
    scope: 'Base sim + diffusion; billing; auth',
  },
  {
    name: 'Vercel Blob',
    receives:
      'Patient before/after simulation images (base64-sourced, re-encoded) when a signed-in user saves a simulation',
    phi: 'Yes — full facial image. Stored at a non-guessable UUID path but with public access.',
    baa: 'Part of Vercel DPA; no BAA signed',
    scope: 'Base sim on save; diffusion output on save',
  },
  {
    name: 'Upstash Redis',
    receives: 'IP addresses + rate-limit counters; hashed user IDs as rate-limit keys',
    phi: 'No image data. No PHI.',
    baa: 'No DPA confirmed from source code',
    scope: 'All paths (rate limiting)',
  },
  {
    name: 'Resend',
    receives:
      'Patient email address; surgeon email address; patient name; surgeon name; procedure label; share URL (encodes simulation params only — no photos)',
    phi: 'Email addresses. Template explicitly excludes photos.',
    baa: 'DPA available; no BAA',
    scope: 'Consultation sharing; transactional email',
  },
  {
    name: 'Polar',
    receives: 'Patient email; payment metadata; subscription status',
    phi: 'Email address. No images.',
    baa: 'DPA available; no BAA. Polar is Merchant of Record.',
    scope: 'Billing only',
  },
  {
    name: 'Sentry',
    receives:
      'Stack traces; error messages; request URLs (tokens redacted by beforeSend filter). Extra context stripped of image/file keys. Session replay active at 1% sample rate with maskAllText + blockAllMedia.',
    phi: 'No confirmed PHI. One P2 gap: error message string content is not scrubbed for embedded fragments (low probability).',
    baa: 'DPA available; no BAA',
    scope: 'All paths (error monitoring)',
  },
  {
    name: 'PostHog',
    receives:
      'Funnel events: procedure name, landmark count (integer), preset ID, deal ID, error code. Page views. Session replay if enabled in project dashboard.',
    phi: 'No image bytes in event payloads. Session replay gap: canvas is not explicitly blocked in posthog.init options (P0 fix in progress).',
    baa: 'DPA available; no BAA. EU primary region.',
    scope: 'All paths (analytics)',
  },
  {
    name: 'Replicate',
    receives:
      'Patient photo (base64 data URL) for photoreal/diffusion preview generation. US users are geo-blocked (HTTP 451). Non-US users only, after explicit AI photo consent.',
    phi: 'YES — full patient facial photo transmitted. Replicate is a US-based company. UK/AU transmission triggers UK GDPR Chapter V and AU Privacy Act APP 8 international transfer obligations. No BAA, no DPA confirmed.',
    baa: 'No BAA. No DPA confirmed from source. Transfer mechanism for UK/AU not yet executed.',
    scope: 'Diffusion/photoreal path only. Non-US only.',
  },
] as const;

// ---------------------------------------------------------------------------
// Compliance framework rows
// ---------------------------------------------------------------------------
const COMPLIANCE_ROWS = [
  {
    framework: 'HIPAA (United States)',
    status: 'aligned' as const,
    summary:
      'The base simulator produces zero data egress by design: MediaPipe landmark detection and ONNX inference run in the browser; no patient photos reach Faceify servers on the standard path. Faceify is not a covered entity. BAA available on Enterprise plan upon request.',
  },
  {
    framework: 'GDPR (European Union)',
    status: 'aligned' as const,
    summary:
      'Lawful basis: consent (Article 6(1)(a)) for AI photo features; contract (Article 6(1)(b)) for account and billing. Article 17 deletion right is exercisable via /api/account/delete or Settings. For the base simulator, image data does not transit EU borders (stays on device). The diffusion path transmits to Replicate (US); transfer mechanism for EU users is under review.',
  },
  {
    framework: 'UK GDPR (post-Brexit)',
    status: 'partial' as const,
    summary:
      'Same data-residency position as EU GDPR for the base simulator. Supervisory authority: ICO (not EDPB). Any third-party transfers require IDTA (International Data Transfer Agreement), not SCCs. Replicate DPA under IDTA has not yet been executed. This is an open gap for the diffusion path.',
  },
  {
    framework: 'PDPA (Singapore / Thailand)',
    status: 'aligned' as const,
    summary:
      'Base simulator: image data does not leave the device; PDPA cross-border transfer obligations are not triggered. Consent collected in-app before any simulation preview runs.',
  },
  {
    framework: 'PIPA (South Korea / Japan)',
    status: 'aligned' as const,
    summary:
      'Base simulator: image data does not leave the device; PIPA cross-border transfer obligations are not triggered. Consent collected in-app before any simulation preview runs.',
  },
  {
    framework: 'AU Privacy Act + APP 8 (Australia)',
    status: 'partial' as const,
    summary:
      'Base simulator: image data does not leave the device; APP 8 cross-border disclosure obligations are not triggered. The diffusion path requires an explicit APP 8 disclosure before non-US (including AU) users can use it. That disclosure is being added to the AI photo consent modal. Until it lands, the diffusion path is non-compliant for AU users.',
  },
];

// ---------------------------------------------------------------------------
// Roadmap items
// ---------------------------------------------------------------------------
const ROADMAP_ITEMS = [
  {
    item: 'ISO 27001',
    status: 'Under review (last reviewed 2026-05-26)',
  },
  {
    item: 'SOC 2 Type II',
    status: 'Not yet pursued. Trigger: first $50k+ ACV contract per internal decision criteria.',
  },
  {
    item: 'Multi-region data residency',
    status: 'Under evaluation for UK and AU private hospital requirements.',
  },
  {
    item: 'PHI-tier audit log',
    status: 'Planned Q2 2026 per CTO report. Will cover photos, annotations, and consultation messages.',
  },
  {
    item: 'Replicate DPA / BAA (UK IDTA + AU APP 8)',
    status: 'Required before diffusion path is compliant for UK/AU users. Under active procurement.',
  },
];

function StatusBadge({ status }: { status: 'aligned' | 'partial' | 'gap' }) {
  if (status === 'aligned') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#CF4500] bg-[#FDEEE7] border border-[#CF4500]/30 rounded-full px-3 py-0.5 shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Aligned
      </span>
    );
  }
  if (status === 'partial') {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-3 py-0.5 shrink-0">
        <AlertCircle className="w-3.5 h-3.5" />
        Partial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-full px-3 py-0.5 shrink-0">
      <XCircle className="w-3.5 h-3.5" />
      Open gap
    </span>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-10 sm:py-14">
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#CF4500]/30 to-transparent" />
    </div>
  );
}

export default function TrustPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#CF4500]/15 selection:text-[#141413] relative overflow-hidden">
      {/* ── Background Trajectory Curve ── */}
      <svg
        className="absolute inset-0 w-full h-[700px] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M-100 480 C 350 620, 850 140, 1600 260"
          stroke="#F37338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.35"
        />
        <circle cx="1020" cy="220" r="3.5" fill="#CF4500" opacity="0.4" />
      </svg>

      {/* ── Hero Header ── */}
      <section className="container-master relative z-10 text-center max-w-3xl mx-auto pt-6 pb-4 space-y-4">
        <span className="text-eyebrow-master text-eyebrow-dot justify-center">
          01 / TRUST &amp; PRIVACY
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-display tracking-tight text-[#141413] leading-[1.1]">
          Patient data.{' '}
          <span className="italic font-medium text-[#CF4500]">
            Transparent architecture.
          </span>
        </h1>

        <p className="pt-2 text-base sm:text-lg text-[#555555] font-normal max-w-2xl mx-auto leading-relaxed">
          The base simulator runs 100% in your browser. No patient photo reaches our servers. The photoreal path is different — this page names every sub-processor and every gap.
        </p>
      </section>

      <SectionDivider />

      {/* ── Section 01 — The Architecture ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
            02 / THE ARCHITECTURE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413] mb-8">
          Browser-native inference. Zero server PHI.
        </h2>

        <div className="space-y-6">
          {/* Base simulator claim */}
          <div className="bg-white border-l-4 border-[#CF4500] rounded-r-[24px] p-6 sm:p-8 border-y border-r border-black/5 shadow-level-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#141413] leading-snug">
                  Base simulator: real-time landmark detection and rendering run in the browser
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  MediaPipe landmark detection (468 points) and ONNX inference (Depth Anything v2, FairFace) run entirely in the browser using WebAssembly and WebGL. No image bytes are transmitted to Faceify servers during standard simulation. Model weights are fetched once (self-hosted, with CDN fallback) and run locally. Your photo leaves your device only if you turn on the optional AI photoreal preview (sent to a third-party provider) or choose to save a simulation to your account.
                </p>
                <p className="text-xs font-mono text-[#696969] bg-[#FCFBFA] rounded-xl px-3 py-1.5 inline-block border border-black/5">
                  lib/simulation/face-mesh.ts · lib/simulation/depth-v2/depth-v2-inference.ts · lib/simulation/ai-suggestions/ethnicity-ml.ts
                </p>
              </div>
            </div>
          </div>

          {/* Diffusion path — honest disclosure */}
          <div className="bg-amber-50/70 border-l-4 border-amber-500 rounded-r-[24px] p-6 sm:p-8 border-y border-r border-amber-200/70 shadow-level-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 flex items-center justify-center text-amber-700 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#141413] leading-snug">
                  Photoreal path: explicit disclosure of third-party transmission
                </h3>
                <p className="text-sm text-[#555555] leading-relaxed">
                  When a user activates the photoreal preview and grants AI photo consent, the patient photo (base64 data URL) is transmitted to Replicate, a US-based GPU cloud provider, via /api/simulation/diffusion-preview. Replicate generates the preview and returns a URL. The image is not persisted to Faceify&apos;s database — it exists on Replicate&apos;s CDN for their TTL only.
                </p>
                <p className="text-sm text-[#555555] leading-relaxed">
                  US users are blocked at the API route level (HTTP 451). Non-US users — including UK and AU — are exposed to this third-party transmission once they grant explicit AI photo consent. The consent modal is being updated to name Replicate by name and describe the US-based transfer.
                </p>
                <p className="text-xs font-mono text-amber-800 bg-white/80 rounded-xl px-3 py-1.5 inline-block border border-amber-200">
                  app/api/simulation/diffusion-preview/route.ts:277 — x-vercel-ip-country === &quot;US&quot; → HTTP 451
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 02 — Compliance Alignment ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
            02 / COMPLIANCE ALIGNMENT
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413] mb-3">
          Regulatory frameworks: honest status
        </h2>
        <p className="text-base text-[#555555] leading-relaxed mb-8">
          The architectural fact — browser-native inference, zero server PHI on the base path — is the strongest compliance asset. The diffusion path creates obligations that are not yet fully met. This table shows both.
        </p>

        <div className="space-y-4">
          {COMPLIANCE_ROWS.map((row) => (
            <div
              key={row.framework}
              className="bg-white border border-black/10 rounded-[24px] p-6 shadow-level-1 hover:border-[#CF4500]/25 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-bold text-[#141413] text-base leading-snug">
                  {row.framework}
                </h3>
                <StatusBadge status={row.status} />
              </div>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {row.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 03 — What We Capture + Sub-processor Matrix ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
            03 / WHAT WE CAPTURE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413] mb-8">
          Event data and sub-processor matrix
        </h2>

        {/* Analytics events vs What is never captured */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-black/10 shadow-level-1 space-y-4">
            <div className="flex items-center gap-3 text-[#CF4500]">
              <div className="w-10 h-10 rounded-xl bg-[#FDEEE7] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#141413]">
                What analytics events contain
              </h3>
            </div>
            <ul className="text-xs text-[#555555] space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                Procedure name (string)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                Landmark count (integer)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                Preset ID (string)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                Error code (string)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CF4500]" />
                Source context (camera / upload / demo)
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[28px] p-6 sm:p-7 border border-black/10 shadow-level-1 space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <XCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#141413]">
                What is never captured
              </h3>
            </div>
            <ul className="text-xs text-[#555555] space-y-2 leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Image bytes or base64 strings
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                EXIF metadata (GPS, device, timestamp)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Patient name or identifier
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Biometric data or face embeddings
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Canvas screenshots
              </li>
            </ul>
          </div>
        </div>

        {/* Realtime camera note */}
        <div className="bg-white border border-black/10 rounded-[24px] p-6 shadow-level-1 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-[#141413]">
                Realtime mode: camera feed stays on-device
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                When Realtime mode is active, the Banuba SDK processes the camera feed entirely within the browser WASM runtime. No image frames or face landmarks are transmitted to Faceify Labs or any third party. The Banuba license token is validated locally; the SDK does not phone home.
              </p>
            </div>
          </div>
        </div>

        {/* Replicate callout */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-[24px] p-6 shadow-level-1 mb-10 space-y-2">
          <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Replicate: patient photo transmitted (diffusion path only)
          </p>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            For non-US users who activate the photoreal preview, the patient&apos;s facial photo (base64) is transmitted to Replicate. US users are geo-blocked. Non-US users see an explicit AI photo consent modal. Replicate is a US-based company; no BAA or DPA is currently in place. This is the most significant sub-processor disclosure on this page.
          </p>
        </div>

        {/* Sub-processor table */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-display font-normal text-[#141413]">
            Sub-processor matrix
          </h3>
          <p className="text-xs sm:text-sm text-[#696969] leading-relaxed">
            Every vendor that receives data on our behalf. Sub-processor list last reviewed 2026-05-26. We update within 7 days of any vendor change.
          </p>

          <div className="overflow-x-auto bg-white rounded-[28px] border border-black/10 shadow-level-1 p-4 sm:p-6">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-black/10 text-[#141413] font-bold">
                  <th scope="col" className="pb-3 pr-4">Vendor</th>
                  <th scope="col" className="pb-3 px-3">What it receives</th>
                  <th scope="col" className="pb-3 px-3">PHI / patient photo?</th>
                  <th scope="col" className="pb-3 px-3">BAA / DPA status</th>
                  <th scope="col" className="pb-3 pl-3">Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 text-[#555555]">
                {SUB_PROCESSORS.map((sp) => (
                  <tr
                    key={sp.name}
                    className={`hover:bg-[#FCFBFA] transition-colors ${
                      sp.name === 'Replicate' ? 'bg-amber-50/50 hover:bg-amber-50/70' : ''
                    }`}
                  >
                    <td className="py-3.5 pr-4 font-bold text-[#141413] whitespace-nowrap align-top">
                      {sp.name}
                    </td>
                    <td className="py-3.5 px-3 leading-relaxed align-top">
                      {sp.receives}
                    </td>
                    <td className="py-3.5 px-3 leading-relaxed align-top">
                      {sp.phi.startsWith('YES') ? (
                        <span className="text-amber-800 font-semibold">{sp.phi}</span>
                      ) : (
                        sp.phi
                      )}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap leading-relaxed align-top">
                      {sp.baa}
                    </td>
                    <td className="py-3.5 pl-3 leading-relaxed align-top">
                      {sp.scope}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 04 — Patient Consent ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
            04 / PATIENT CONSENT
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413] mb-8">
          How consent is captured and who owns it
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-black/10 shadow-level-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500]">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#141413]">
              Consent captured in-app
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Consent is collected in-app before any procedure preview runs. The consent gate is enforced at the route level — no simulation output is returned before the patient has acknowledged the terms.
            </p>
          </div>

          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-black/10 shadow-level-1 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#141413]">
              Owned by the clinic
            </h3>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Consent records are owned by the clinic, not Faceify. Faceify does not store consent records. The clinic&apos;s EHR or patient management system is responsible for maintaining the consent audit trail per their local regulatory requirements.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#CF4500]/25 rounded-[24px] p-6 shadow-level-1 space-y-2">
          <p className="text-xs font-bold text-[#CF4500] uppercase tracking-wider">
            Diffusion path: explicit AI photo consent
          </p>
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            For the photoreal preview, an explicit AI photo consent modal names Replicate, Inc. as the US-based GPU compute provider, describes the data transfer to the US, and states that the base simulator runs entirely in-browser without any data transfer. For UK users, the modal discloses the IDTA gap (no signed agreement with Replicate yet, ICO is the supervisory authority). For AU users, the modal provides the APP 8 cross-border disclosure. Consent is double opt-in; declining disables only the photoreal feature and the base simulator remains fully available.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 05 — Security Contact & DPIA ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
            05 / SECURITY CONTACT
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413] mb-8">
          Security contact and DPIA
        </h2>

        <div className="bg-white rounded-[28px] p-7 sm:p-9 border border-black/10 shadow-level-1 space-y-5">
          <p className="text-sm text-[#555555] leading-relaxed">
            Security questions, BAA and DPA requests, vulnerability disclosure, and procurement questionnaires:
          </p>
          <div>
            <a
              href="mailto:partners@faceifylabs.com"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#141413] hover:bg-[#262627] text-white text-xs font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#CF4500]" />
              <span>partners@faceifylabs.com</span>
            </a>
          </div>
          <p className="text-xs text-[#696969] leading-relaxed pt-2 border-t border-black/5">
            A Data Protection Impact Assessment (DPIA) for the photoreal diffusion path is available upon request. Response within 5 business days.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ── Section 06 — Roadmap ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
            06 / ROADMAP
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-normal text-[#141413] mb-3">
          What is planned
        </h2>
        <p className="text-base text-[#555555] leading-relaxed mb-8">
          No invented dates. Status reflects internal roadmap as of 2026-05-26.
        </p>

        <div className="space-y-3">
          {ROADMAP_ITEMS.map((r) => (
            <div
              key={r.item}
              className="flex items-start gap-4 bg-white border border-black/10 rounded-[20px] p-5 shadow-level-1 hover:border-[#CF4500]/25 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#141413]">{r.item}</p>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {r.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ── Regulatory Disclaimer & Cross Links ── */}
      <section className="container-master relative z-10 max-w-3xl mx-auto px-4">
        <div className="bg-[#FCFBFA] rounded-[32px] p-8 sm:p-10 border border-black/10 shadow-level-1 space-y-6 text-center">
          <p className="text-xs sm:text-sm text-[#696969] leading-relaxed max-w-2xl mx-auto">
            Faceify Labs is an educational visual planning tool designed to facilitate patient-surgeon communication. It is{' '}
            <span className="font-semibold text-[#141413]">
              not regulated as a medical device
            </span>{' '}
            under the U.S. FDA, the Thai FDA, the Korean MFDS, ANVISA (Brazil), or the PMDA (Japan). All previews are visualisations of the requested change — not predictions of surgical outcome, clinical diagnoses, or treatment recommendations.{' '}
            <Link
              href="/clinical-safety"
              className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
            >
              Read our full clinical posture &rarr;
            </Link>
          </p>

          <div className="border-t border-black/10 pt-5 text-center">
            <p className="text-xs sm:text-sm text-[#696969]">
              Related:{' '}
              <Link
                href="/security"
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Security &amp; procurement posture
              </Link>
              {' · '}
              <Link
                href={routes.privacy}
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Privacy policy
              </Link>
              {' · '}
              <Link
                href="/clinical-safety"
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                Clinical safety
              </Link>
              {' · '}
              <Link
                href="/surgeon/vr-setup"
                className="underline text-[#141413] hover:text-[#CF4500] transition-colors"
              >
                VR consult mode setup guide
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
