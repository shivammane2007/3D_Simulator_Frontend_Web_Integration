"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "@/i18n/messages";
import { Link } from "@/i18n/routing";
import { openDemoModal } from "@/lib/analytics";

interface DemoGuideProps {
  defaultTab?: "patient" | "surgeon";
}

type TabId = "patient" | "surgeon";

export default function DemoGuide({ defaultTab = "patient" }: DemoGuideProps) {
  const t = useTranslations("demoGuide");
  const [activeTab, setActiveTab] = useState<TabId>(defaultTab);
  const [videoLoaded, setVideoLoaded] = useState<Record<TabId, boolean>>({
    patient: false,
    surgeon: false,
  });

  const patientSteps = t.raw("patientSteps") as string[];
  const surgeonSteps = t.raw("surgeonSteps") as string[];

  // Auto-hide the loading spinner after 8s in case the video never fires onLoadedData
  useEffect(() => {
    if (videoLoaded[activeTab]) return;
    const timer = setTimeout(() => {
      setVideoLoaded((prev) => ({ ...prev, [activeTab]: true }));
    }, 8000);
    return () => clearTimeout(timer);
  }, [activeTab, videoLoaded]);

  return (
    <section className="relative bg-ink py-24 px-4 overflow-hidden">
      {/*
        ── Ambient glow orbs (same technique as SocialProof) ─────────────────
        All CSS-only; wrapped in prefers-reduced-motion media query so that
        the globals.css kill-switch gets a second layer of support.
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Sage aurora — top-left */}
        <div
          className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full dg-aurora-1"
          style={{
            background: "radial-gradient(circle, rgba(61,107,94,0.16) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        {/* Coral aurora — bottom-right */}
        <div
          className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full dg-aurora-2"
          style={{
            background: "radial-gradient(circle, rgba(232,112,90,0.10) 0%, transparent 70%)",
            filter: "blur(65px)",
          }}
        />
        {/* Gold aurora — center-top */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[340px] h-[240px] rounded-full dg-aurora-3"
          style={{
            background: "radial-gradient(ellipse, rgba(154,125,46,0.07) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Dot-grid mesh pattern */}
        <div
          className="absolute inset-0 dg-dots"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label + heading */}
        <div className="text-center mb-12">
          {/* Gradient accent dot + label row */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #3d6b5e, #6b9e8f)" }}
              aria-hidden="true"
            />
            <p className="text-sage text-xs font-bold tracking-widest uppercase">
              {t("sectionLabel")}
            </p>
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #6b9e8f, #3d6b5e)" }}
              aria-hidden="true"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("heading")}
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            {t("subheading")}
          </p>
        </div>

        {/* Tab switcher — gradient active state */}
        <div
          role="tablist"
          aria-label="Demo guide tabs"
          className="flex justify-center gap-3 mb-10"
        >
          {(["patient", "surgeon"] as TabId[]).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`tabpanel-${tab}`}
              id={`tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`dg-tab px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                activeTab === tab
                  ? "dg-tab-active text-white"
                  : "bg-white/8 text-white/55 hover:bg-white/14 hover:text-white/85"
              }`}
            >
              {tab === "patient" ? t("patientTab") : t("surgeonTab")}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        {(["patient", "surgeon"] as TabId[]).map((tab) => (
          <div
            key={tab}
            id={`tabpanel-${tab}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            hidden={activeTab !== tab}
            className={activeTab === tab ? "block" : ""}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Video container — gradient border glow */}
              {activeTab === tab && (
                <div className="border-flow-wrap rounded-2xl">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 aspect-video bg-[#1e293b]">
                    {/* Inner glow frame */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                      style={{
                        boxShadow: "inset 0 0 40px rgba(61,107,94,0.12), inset 0 0 80px rgba(61,107,94,0.06)",
                      }}
                      aria-hidden="true"
                    />
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      className="w-full h-full rounded-2xl object-cover"
                      aria-label={tab === "patient" ? t("patientHeading") : t("surgeonHeading")}
                      onLoadedData={() =>
                        setVideoLoaded((prev) => ({ ...prev, [tab]: true }))
                      }
                      onError={() =>
                        setVideoLoaded((prev) => ({ ...prev, [tab]: true }))
                      }
                    >
                      <source src={`/demos/faceifylabs-${tab}-guide.webm`} type="video/webm" />
                      <source src={`/demos/faceifylabs-${tab}-guide.mp4`} type="video/mp4" />
                    </video>
                    {/* Fallback shown while video loads */}
                    {!videoLoaded[tab] && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <div className="text-center">
                          <div className="w-12 h-12 rounded-full border-2 border-sage/40 border-t-sage animate-spin mx-auto mb-3" />
                          <p className="text-white/40 text-xs font-body">Loading demo…</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Content — headline + steps + CTA */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  {tab === "patient" ? t("patientHeading") : t("surgeonHeading")}
                </h3>
                <p className="text-white/60 text-sm mb-8">
                  {tab === "patient" ? t("patientSubheading") : t("surgeonSubheading")}
                </p>

                {/* Steps with connecting lines */}
                <ol className="relative mb-10">
                  {(tab === "patient" ? patientSteps : surgeonSteps).map(
                    (step, i, arr) => (
                      <li key={i} className="flex items-start gap-4 relative">
                        {/* Step number + connector line column */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          <span
                            className="dg-step-num w-7 h-7 rounded-full border text-xs font-bold flex items-center justify-center mt-0.5 relative z-10 transition-all duration-300"
                            style={{
                              background: "rgba(61,107,94,0.15)",
                              borderColor: "rgba(61,107,94,0.35)",
                              color: "#6b9e8f",
                            }}
                          >
                            {i + 1}
                          </span>
                          {/* Connecting line between steps — not rendered after the last item */}
                          {i < arr.length - 1 && (
                            <div
                              className="w-px flex-1 min-h-[1.75rem] mt-1 mb-1"
                              style={{
                                background: "linear-gradient(to bottom, rgba(61,107,94,0.35), rgba(61,107,94,0.06))",
                              }}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        {/* Step text — padded bottom only when connector is present */}
                        <div className={i < arr.length - 1 ? "pb-4" : ""}>
                          <span className="text-white/75 text-sm leading-relaxed">
                            {step}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ol>

                {tab === "patient" ? (
                  <Link
                    href="/login"
                    className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-bold rounded-full transition-all glow-hover gradient-bg-animated"
                    style={{
                      background: "linear-gradient(135deg, #3d6b5e, #6b9e8f, #3d6b5e)",
                      backgroundSize: "200% 200%",
                      boxShadow: "0 4px 20px rgba(61,107,94,0.30)",
                    }}
                  >
                    {t("patientCta")}
                  </Link>
                ) : (
                  <button
                    onClick={() => openDemoModal("demo-guide-surgeon")}
                    className="shimmer-btn inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-bold rounded-full transition-all glow-hover gradient-bg-animated"
                    style={{
                      background: "linear-gradient(135deg, #3d6b5e, #6b9e8f, #3d6b5e)",
                      backgroundSize: "200% 200%",
                      boxShadow: "0 4px 20px rgba(61,107,94,0.30)",
                    }}
                  >
                    {t("surgeonCta")}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*
        ── Scoped keyframes ─────────────────────────────────────────────────────
        Aurora orbs pulse with staggered timing (same pattern as SocialProof).
        Dot field fades in and out.
        Tab active gradient shifts via gradient-bg-animated (defined in globals.css).
        All wrapped in prefers-reduced-motion; globals.css kill-switch is a
        second layer of defence.
      */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes dg-aurora-pulse {
            0%, 100% { opacity: 0.75; transform: scale(1);    }
            50%       { opacity: 1;   transform: scale(1.10); }
          }
          @keyframes dg-dots-pulse {
            0%, 100% { opacity: 0.5; }
            50%       { opacity: 0.9; }
          }
          .dg-aurora-1 { animation: dg-aurora-pulse 8s ease-in-out infinite; }
          .dg-aurora-2 { animation: dg-aurora-pulse 10s ease-in-out infinite 2.5s; }
          .dg-aurora-3 { animation: dg-aurora-pulse 12s ease-in-out infinite 5s; }
          .dg-dots     { animation: dg-dots-pulse 7s ease-in-out infinite; }
        }

        /* Active tab — gradient fill with subtle glow */
        .dg-tab-active {
          background: linear-gradient(135deg, #3d6b5e, #6b9e8f);
          box-shadow:
            0 4px 20px rgba(61,107,94,0.35),
            0 1px 6px rgba(61,107,94,0.20);
        }
        /* Inactive tab hover — smooth fade */
        .dg-tab:not(.dg-tab-active) {
          background: rgba(255,255,255,0.08);
        }
        .dg-tab:not(.dg-tab-active):hover {
          background: rgba(255,255,255,0.14);
        }
      `}</style>
    </section>
  );
}
