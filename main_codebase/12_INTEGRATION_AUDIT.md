# Faceify Labs — Third-Party Integrations Audit

| Integration Service | Category / Purpose | Key Implementation Files | Required Environment Variables | Active Status |
| :--- | :--- | :--- | :--- | :--- |
| **Polar.sh** | Global SaaS Subscriptions & Day-Passes | `lib/billing/`, `app/api/webhooks/polar/route.ts` | `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET` | Active |
| **Razorpay** | Indian INR Payment Gateway (Deals & Deposits) | `app/api/checkout/razorpay/route.ts`, `app/api/webhooks/razorpay/route.ts` | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` | Active |
| **Resend** | Transactional Email Delivery | `lib/emails/`, 42 API routes | `RESEND_API_KEY`, `EMAIL_FROM` | Active |
| **Sentry** | Error Tracking & Performance Telemetry | `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts` | `SENTRY_ORG`, `SENTRY_PROJECT`, `NEXT_PUBLIC_SENTRY_DSN` | Active |
| **PostHog** | Product Analytics (Reverse Proxied via `/ingest`) | `components/PostHogProvider.tsx`, `next.config.ts` | `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` | Active |
| **Cerebras / AI SDK** | Ultra-Fast Clinical Consultation Chat | `app/api/chat/route.ts`, `lib/ai/` | `CEREBRAS_API_KEY` | Active |
| **Banuba WebAR** | Live Webcam AR Facial Deformation | `components/simulation/RealtimeMode.tsx`, `scripts/copy-banuba-assets.mjs` | `BANUBA_CLIENT_TOKEN`, `NEXT_PUBLIC_BANUBA_CLIENT_TOKEN` | Active |
| **MediaPipe / ONNX** | On-Device Face Mesh & FLAME 3D Model | `lib/simulation/face-mesh.ts`, `src/lib/flame/` | `NEXT_PUBLIC_USE_FLAME` | Active |
| **Upstash Redis** | Sliding-Window Rate Limiting | `lib/rate-limit.ts`, `app/api/auth/` | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Active |
| **Vercel Blob** | Avatar & KYC Document Object Storage | `lib/blob.ts`, `app/api/uploads/` | `BLOB_READ_WRITE_TOKEN` | Active |
| **Vercel Edge Config** | Partner Embed Domain Allowlist | `lib/embed/partner-allowlist.ts`, `proxy.ts` | `EDGE_CONFIG` | Active |
| **Google Maps** | Clinic Directory Mapping & Geocoding | `components/directory/ClinicMap.tsx` | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Active |
| **Telegram Bot** | Real-Time Admin Lead Alerts | `telegram-bot/index.ts`, `app/api/telegram/` | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ADMIN_CHAT_ID` | Active |
| **Cal.com** | Surgeon Consultation Scheduling | `app/api/cal-com/webhook/route.ts` | `CAL_WEBHOOK_SECRET` | Configured |
| **Twitter / X** | Automated Case Study Marketing Posts | `lib/marketing/twitter.ts` | `TWITTER_API_KEY`, `TWITTER_ACCESS_TOKEN` | Configured |
