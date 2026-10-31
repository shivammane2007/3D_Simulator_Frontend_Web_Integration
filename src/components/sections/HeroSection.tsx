// Delivered by Originkit · stack: nextjs · styling: tailwind
/* eslint-disable */
// @ts-nocheck
"use client";

import Link from "next/link";
import GrinIris from "@/components/ui/hero-51/grin-iris";
import "@/components/originkit/hero-51.css";
import { routes } from "@/config/routes";
import { ButtonWithIcon } from "@/components/ui/button-witn-icon";

export default function HeroSection() {
  return (
    <div className="hero-51 -mt-20 md:-mt-24">
      <main className="hero" style={{ paddingTop: "calc(var(--ok-design-h, 100vh) * 0.04 + 72px)" }}>
        <p className="kicker">
          <i />
          AI Surgical Simulation · Clinical Precision
        </p>
        <h1 aria-label="Show them how they look.">
          <span className="soft">Show them how</span>
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
            Real-time photorealistic surgical outcome simulation on your consultation device.
            86 procedures, 486 facial landmarks, zero cloud uploads. Built for plastic surgeons.
          </p>
          <div className="buttons">
            <ButtonWithIcon
              href={routes.simulate}
              className="bg-[#FF2400] hover:bg-[#15110E] text-white h-[52px] text-sm sm:text-base font-semibold shadow-level-1 transition-all duration-500 border-0"
              iconClassName="w-10 h-10 bg-white text-[#FF2400]"
            >
              Try the simulator
            </ButtonWithIcon>
            <Link className="link" href={routes.consultation}>
              Book a consultation demo
            </Link>
          </div>
          <div className="readout">
            <h2>Session 0814 · 30 s · Rhinoplasty</h2>
            <dl>
              <div>
                <dt>Landmarks</dt>
                <dd>486 points · 0.34 s</dd>
              </div>
              <div>
                <dt>Deformation model</dt>
                <dd>Dorsal reduction</dd>
              </div>
              <div>
                <dt>Inference</dt>
                <dd>Local device RAM</dd>
              </div>
              <div>
                <dt>Cloud upload</dt>
                <dd className="hot">0 KB (Zero server)</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
