import { Metadata } from 'next';
import Link from 'next/link';
import { Cpu, ShieldCheck, Zap, Layers, Lock, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Technology & AI Architecture — 468 Landmarks, 0 Server Hops',
  description:
    'Deep dive into Faceify Labs client-side ML engine. 468 facial landmarks, 934 mesh triangles, 0.04mm RMSD sub-millimeter precision, and Zero Data Egress architecture.',
};

export default function TechnologyPage() {
  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20">
      {/* Hero */}
      <section className="pb-16 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-eyebrow-master text-eyebrow-dot">
              PROPRIETARY ML ENGINE
            </span>
            <h1 className="text-h1-hero text-[#141413]">
              {siteConfig.stats.landmarks} landmarks.{' '}
              <span className="italic font-medium text-[#CF4500]">
                0 server hops.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-normal">
              Faceify Labs replaces cloud video streaming with on-device WebGL2 neural inference. Your patient&apos;s face is transformed entirely inside their browser memory.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={routes.simulate}
                className="px-7 py-3 rounded-[20px] bg-[#141413] text-[#F3F0EE] border-[1.5px] border-[#141413] hover:bg-[#262627] text-sm font-medium tracking-[-0.02em] shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Launch Live Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={routes.trust}
                className="px-7 py-3 rounded-[20px] bg-white text-[#141413] border-[1.5px] border-[#141413] hover:bg-[#F3F0EE] text-sm font-medium tracking-[-0.02em] transition-all inline-flex items-center gap-2"
              >
                <span>Privacy & Security Architecture</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specifications Matrix */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              TECHNICAL BENCHMARKS
            </span>
            <h2 className="text-h2-section text-[#141413]">
              Validated against peer-reviewed standards.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stat: '468',
                label: 'Landmark Points',
                sub: 'Continuous real-time tracking across full facial geometry',
              },
              {
                stat: '934',
                label: 'Mesh Triangles',
                sub: 'Deformation topology preserving skin elasticity bounds',
              },
              {
                stat: '0.04mm',
                label: 'RMSD Precision',
                sub: 'Sub-millimeter tracking accuracy vs ground truth scans',
              },
              {
                stat: '<200ms',
                label: 'Render Latency',
                sub: '60 FPS interactive deformation on modern mobile GPUs',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#FCFBFA] p-8 rounded-[40px] border border-black/5 shadow-level-1 flex flex-col justify-between space-y-4 hover:shadow-level-2 transition-all"
              >
                <div className="text-4xl sm:text-5xl font-black font-display text-[#141413]">
                  {item.stat}
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-[#CF4500] uppercase tracking-wider">{item.label}</div>
                  <p className="text-xs text-[#555555] leading-relaxed">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Architectural Pipeline */}
      <section className="py-20 md:py-28 bg-[#F3F0EE] border-t border-black/5 relative overflow-hidden">
        <div className="container-master relative z-10">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-eyebrow-master text-eyebrow-dot">
              THE INFERENCE PIPELINE
            </span>
            <h2 className="text-h2-section text-[#141413]">
              How Faceify transforms photos in-browser.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                num: '01',
                title: 'Client-Side Photo Ingestion & Landmark Localization',
                description:
                  'When a patient photo is selected, it is loaded into an HTML5 Canvas context. A quantized neural network detects facial orientation and extracts 468 landmark coordinates at sub-millimeter precision.',
              },
              {
                num: '02',
                title: '3D Anatomical Mesh Construction',
                description:
                  'A 934-triangle Delaunay surface mesh is mapped to the landmark coordinates. Soft tissue vectors (nasal dorsum, alar base, canthal angle, mandible) are isolated into parametric deformation channels.',
              },
              {
                num: '03',
                title: 'Anatomical Safety Clamping',
                description:
                  'Clinical boundary constraints clamp maximum geometric displacement. The system prevents unfeasible surgical simulations such as orbit displacement beyond biological limits.',
              },
              {
                num: '04',
                title: 'WebGL2 Shader Deformation & Color Blending',
                description:
                  'Hardware-accelerated fragment shaders apply texture coordinate morphing, specular highlight recalculation, and realistic subsurface skin rendering in under 200ms.',
              },
            ].map((stage) => (
              <div
                key={stage.num}
                className="bg-[#FCFBFA] p-8 rounded-[40px] border border-black/5 shadow-level-1 space-y-4 hover:shadow-level-2 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#CF4500]">
                    Stage {stage.num}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white text-[#141413] flex items-center justify-center shadow-level-1 font-bold">
                    {stage.num}
                  </div>
                </div>
                <h3 className="text-xl font-medium tracking-tight text-[#141413] font-display">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#555555] leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NVIDIA Inception Program */}
      <section className="py-20 bg-[#F3F0EE] border-t border-black/5">
        <div className="container-master">
          <div className="p-8 md:p-12 rounded-[40px] bg-[#141413] text-white border border-black/5 flex flex-col md:flex-row items-center gap-8 shadow-level-2">
            <div className="w-16 h-16 rounded-[20px] bg-[#76b900] flex items-center justify-center text-white text-3xl font-black shrink-0">
              N
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F37338]">
                Ecosystem Recognition
              </span>
              <h3 className="text-2xl font-medium font-display text-white">
                Member of the NVIDIA Inception Program
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-2xl font-normal">
                Faceify Labs is part of NVIDIA Inception, a program nurturing cutting-edge startups revolutionizing medical imaging and web-native GPU acceleration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
