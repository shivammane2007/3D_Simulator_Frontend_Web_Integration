'use client';

import { useState } from 'react';
import { Camera, Sliders, Eye, RefreshCw, Download, Share2, CheckCircle2, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider';
import { procedures, type Procedure } from '@/data/procedures';
import { cn } from '@/lib/utils';

interface SimulatorShellProps {
  initialProcedureSlug?: string;
}

export default function SimulatorShell({ initialProcedureSlug = 'rhinoplasty' }: SimulatorShellProps) {
  const [selectedSlug, setSelectedSlug] = useState(initialProcedureSlug);
  const [showMesh, setShowMesh] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<'adjust' | 'generating' | 'ready'>('adjust');

  // Sliders state
  const [slider1, setSlider1] = useState(65);
  const [slider2, setSlider2] = useState(40);
  const [slider3, setSlider3] = useState(50);
  const [copied, setCopied] = useState(false);

  const currentProcedure = procedures.find((p) => p.slug === selectedSlug) || procedures[0];

  const handleSimulateAction = () => {
    setIsSimulating(true);
    setActiveStep('generating');
    setTimeout(() => {
      setIsSimulating(false);
      setActiveStep('ready');
    }, 1200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-black/5 rounded-[40px] shadow-level-2 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-[#FCFBFA] border-b border-black/5 p-5 md:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#141413] text-[#F3F0EE] flex items-center justify-center text-xs font-bold font-display">
            AI
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#141413] flex items-center gap-2">
              <span>{currentProcedure.name} Simulator</span>
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDEEE7] text-[#CF4500] font-bold">
                On-Device ML
              </span>
            </h2>
            <p className="text-[11px] text-[#696969]">
              468 Landmarks Active • WebGL2 Latency: &lt;140ms
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMesh(!showMesh)}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer',
              showMesh
                ? 'bg-[#141413] text-[#F3F0EE] border-[#141413]'
                : 'bg-white text-[#141413] border-black/10'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showMesh ? 'Hide Mesh' : 'Show 468 Mesh'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white hover:bg-[#F3F0EE] border border-black/10 text-[#141413] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
            title="Share simulation parameters"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#CF4500]" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-0">
        {/* Left: Interactive Canvas & Comparison */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-[#F3F0EE] relative">
          <div className="relative w-full mb-6">
            <BeforeAfterSlider
              procedureTitle={`${currentProcedure.name} Preview`}
              transformationIntensity={slider1}
            />

            {/* 468 Landmark Mesh Overlay SVG */}
            {showMesh && (
              <div className="absolute inset-0 pointer-events-none p-8 flex items-center justify-center opacity-60">
                <svg className="w-full h-full max-h-[320px]" viewBox="0 0 400 320" fill="none">
                  <polygon points="200,108 170,121 200,155" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="200,108 230,121 200,155" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="170,121 170,139 200,155" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="230,121 230,139 200,155" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="170,139 190,153 200,155" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="230,139 210,153 200,155" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="200,155 178,185 200,190" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                  <polygon points="200,155 222,185 200,190" stroke="#F37338" strokeWidth="0.6" fill="none" opacity="0.5" />
                </svg>
              </div>
            )}
          </div>

          {/* Quick Procedure Selector Pill Carousel */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#696969]">
              • Select Procedure
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {procedures.slice(0, 7).map((p) => (
                <button
                  key={p.slug}
                  onClick={() => setSelectedSlug(p.slug)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border cursor-pointer',
                    selectedSlug === p.slug
                      ? 'bg-[#141413] text-[#F3F0EE] border-[#141413]'
                      : 'bg-white text-[#141413] border-black/5 hover:bg-[#EBE7E3]'
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Parameter Controls Panel */}
        <div className="p-6 md:p-8 bg-[#FCFBFA] border-t lg:border-t-0 lg:border-l border-black/5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#CF4500]">
                • PARAMETER ADJUSTMENT
              </span>
              <h3 className="text-base font-medium tracking-tight text-[#141413] font-display">
                Clinical Vectors
              </h3>
              <p className="text-xs text-[#555555]">
                Anatomical safety bounds clamp transformations to realistic physiological boundaries.
              </p>
            </div>

            {/* Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#141413]">
                <span>Primary Vector Refinement</span>
                <span className="text-[#CF4500] font-bold">{slider1}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={slider1}
                onChange={(e) => setSlider1(Number(e.target.value))}
                className="w-full accent-[#141413] h-1.5 bg-[#EBE7E3] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#696969]">
                <span>Conservative</span>
                <span>Enhanced</span>
              </div>
            </div>

            {/* Slider 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#141413]">
                <span>Dorsal / Contour Angle</span>
                <span className="text-[#CF4500] font-bold">{slider2}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={slider2}
                onChange={(e) => setSlider2(Number(e.target.value))}
                className="w-full accent-[#141413] h-1.5 bg-[#EBE7E3] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-[#141413]">
                <span>Soft Tissue Compression</span>
                <span className="text-[#CF4500] font-bold">{slider3}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={slider3}
                onChange={(e) => setSlider3(Number(e.target.value))}
                className="w-full accent-[#141413] h-1.5 bg-[#EBE7E3] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Update Simulation Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={handleSimulateAction}
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mapping Geometry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F37338]" />
                    <span>Update Real-Time Preview</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Clinical Disclaimer Notice */}
          <div className="p-4 rounded-[20px] bg-white border border-black/5 text-[11px] text-[#555555] space-y-1 shadow-level-1">
            <div className="flex items-center gap-1.5 text-[#CF4500] font-bold">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>Medical Disclaimer</span>
            </div>
            <p className="leading-snug">
              Faceify is a visual planning tool, not a diagnostic or medical device. Previews are illustrative only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
