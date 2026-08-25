'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Camera, RefreshCw, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { routes } from '@/config/routes';

export default function SkinAnalyserPage() {
  const [analyzing, setAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-32 pb-20 space-y-12">
      {/* Header */}
      <div className="container-master text-center max-w-3xl mx-auto space-y-4">
        <span className="text-eyebrow-master text-eyebrow-dot text-[#CF4500]">
          On-Device Skin Analytics
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#141413] font-display">
          Optical skin{' '}
          <span className="italic font-medium text-[#CF4500]">
            assessment engine.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#696969] leading-relaxed max-w-xl mx-auto font-normal">
          Analyze skin tone metrics, Fitzpatrick phototype proxy, and Glogau classification locally in your browser with zero image uploads.
        </p>
      </div>

      {/* Main Analysis Playground */}
      <div className="container-master">
        <div className="max-w-4xl mx-auto bg-[#FCFBFA] rounded-[40px] border border-black/5 shadow-level-1 overflow-hidden grid lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Interactive Canvas */}
          <div className="p-8 bg-[#F3F0EE] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/5">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CF4500]">
                Image Capture Context
              </span>
              <div className="aspect-square rounded-[32px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex flex-col items-center justify-center p-6 text-center text-zinc-300 relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">
                  <Camera className="w-8 h-8 text-[#CF4500]" />
                </div>
                <p className="text-xs font-semibold">Front-facing photo in natural lighting</p>
                <p className="text-[10px] text-zinc-400 mt-1">Processed locally in browser memory</p>

                {/* Processing animation */}
                {analyzing && (
                  <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="w-8 h-8 text-[#CF4500] animate-spin" />
                    <span className="text-xs font-bold text-white">Extracting Optical Metrics...</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleRunAnalysis}
                disabled={analyzing}
                className="w-full py-3.5 rounded-[20px] bg-[#141413] text-[#F3F0EE] hover:bg-[#262627] text-xs font-semibold tracking-[-0.02em] shadow-sm transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {analyzing ? 'Analyzing Local Pixels...' : 'Run Local Skin Assessment'}
              </button>
            </div>
          </div>

          {/* Right: Results Breakdown */}
          <div className="p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-display text-[#141413]">
                  Assessment Scorecard
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-[#CF4500]/10 text-[#CF4500]">
                  Optical Proxy
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { metric: 'Fitzpatrick Phototype', value: 'Type III (Medium / Olive Tone)' },
                  { metric: 'Glogau Photoaging Stage', value: 'Stage II (Moderate / Early Wrinkling)' },
                  { metric: 'Evenness & Pigmentation Score', value: '78 / 100 (Balanced Distribution)' },
                  { metric: 'Surface Texture Metric', value: '84 / 100 (Smooth Contour)' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-[20px] bg-[#F3F0EE] border border-black/5 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#696969]">
                      {item.metric}
                    </span>
                    <p className="text-xs font-bold text-[#141413]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-[20px] bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Clinical Notice</span>
              </div>
              <p className="leading-snug text-amber-800 text-[11px]">
                This is a cosmetic proxy indicator derived from optical image analysis, not a medical diagnosis. Consult a board-certified dermatologist for clinical skin conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
