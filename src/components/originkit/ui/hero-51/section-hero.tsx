// Delivered by Originkit · stack: nextjs · styling: tailwind
/* eslint-disable */
// @ts-nocheck
"use client"
import GrinIris from "@/components/originkit/ui/hero-51/grin-iris";

export function SectionHero() {
  return (
    <div className="hero-51">
    <>
      <header className="nav">
        <div className="brand">
          <i />
          Saccade
        </div>
        <nav className="links">
          <a href="#">Product</a>
          <a href="#">Studies</a>
          <a href="#">Method</a>
          <a href="#">Pricing</a>
        </nav>
        <a className="cta" href="#">
          Book a demo
        </a>
      </header>
      <main className="hero">
        <p className="kicker">
          <i />
          Eye tracking from any webcam
        </p>
        <h1 aria-label="See where they look.">
          <span className="soft">See where</span>
          <br />
          they l
          <span className="eye" data-grin-iris="" aria-hidden="true">
            <GrinIris
              background="transparent"
              advanced={{ maxTurn: 30 }}
              scale={138}
              irisColor="#FF2400"
              scleraColor="#FFFFFF"
              pupilSize={0}
              follow="page"
              reach={10}
              dilate={5.2}
              wander={10}
              float={10}
            />
          </span>
          <span className="eye" data-grin-iris="" aria-hidden="true">
            <GrinIris
              background="transparent"
              advanced={{ maxTurn: 30 }}
              scale={138}
              irisColor="#FF2400"
              scleraColor="#FFFFFF"
              pupilSize={0}
              follow="page"
              reach={10}
              dilate={5.2}
              wander={10}
              float={10}
            />
          </span>
          k.
        </h1>
        <div className="below">
          <p className="sub">
            Send a link, and testers look at your page through their own laptop camera. Saccade
            turns every glance into a heatmap within the hour. No lab, no hardware.
          </p>
          <div className="buttons">
            <a className="btn" href="#">
              Run your first study{" "}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
            <a className="link" href="#">
              See a sample heatmap
            </a>
          </div>
          <div className="readout">
            <h2>Session 0417 · 30 s · pricing page</h2>
            <dl>
              <div>
                <dt>First fixation</dt>
                <dd>0.21 s · headline</dd>
              </div>
              <div>
                <dt>Fixations</dt>
                <dd>86</dd>
              </div>
              <div>
                <dt>Saccades / s</dt>
                <dd>3.1</dd>
              </div>
              <div>
                <dt>Never looked at</dt>
                <dd className="hot">annual toggle</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </>
    </div>
  );
}
