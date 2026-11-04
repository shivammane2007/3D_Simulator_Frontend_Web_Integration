'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Upload,
  Camera,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { routes } from '@/config/routes';

export default function FaceAnalyserPage() {
  const [consentChecked, setConsentChecked] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setUploadedImageSrc(src);
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalyzed(true);
      }, 1600);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!consentChecked) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setUploadedImageSrc(null);
    setAnalyzed(false);
    setAnalyzing(false);
  };

  return (
    <div className="bg-[#F3F0EE] min-h-screen pt-28 sm:pt-32 pb-24 font-sans selection:bg-[#CF4500]/15 selection:text-[#141413] relative overflow-hidden">
      {/* ── Background Trajectory Curve ── */}
      <svg
        className="absolute inset-0 w-full h-[600px] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M-100 450 C 400 550, 800 120, 1550 220"
          stroke="#F37338"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.35"
        />
        <circle cx="980" cy="200" r="3.5" fill="#CF4500" opacity="0.4" />
      </svg>

      {/* ── 1. Header ── */}
      <div className="container-master relative z-10 text-center max-w-3xl mx-auto pt-6 pb-8 space-y-4">
        <span className="text-eyebrow-master text-eyebrow-dot justify-center">
          FACIAL VISUALIZATION
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal font-display tracking-tight text-[#141413] leading-[1.1]">
          Your{' '}
          <span className="italic font-medium text-[#CF4500]">
            Facial Proportion Explorer
          </span>
        </h1>

        <p className="pt-1 text-base sm:text-lg text-[#555555] font-normal max-w-[56ch] mx-auto leading-relaxed">
          Discover your aesthetic profile using golden ratio analysis and AI-powered facial measurements. All processing is local. No images leave your device.
        </p>
      </div>

      {/* ── 2. Consent & Upload Area ── */}
      <div className="container-master relative z-10 max-w-2xl mx-auto px-4">
        {!analyzed ? (
          <div>
            {/* DPDP Act 2023 Consent Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none mb-6 max-w-xl mx-auto text-left">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-black/20 accent-[#CF4500] shrink-0 cursor-pointer"
              />
              <span className="text-[#555555] text-xs leading-relaxed font-normal">
                I consent to Faceify processing my facial or body photograph as sensitive personal data under the{' '}
                <Link
                  href={routes.privacy}
                  className="underline text-[#CF4500] hover:text-[#9A3A0A] font-semibold transition-colors"
                  target="_blank"
                >
                  DPDP Act 2023
                </Link>
                . This image is processed on-device and is not shared without my consent.
              </span>
            </label>

            {/* Upload Box */}
            <div
              role="button"
              tabIndex={consentChecked ? 0 : -1}
              onClick={() => consentChecked && !analyzing && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`relative w-full max-w-xl mx-auto border-2 border-dashed rounded-[28px] p-8 sm:p-12 text-center transition-all bg-white shadow-level-1 overflow-hidden ${
                !consentChecked
                  ? 'opacity-60 cursor-not-allowed border-black/10'
                  : 'cursor-pointer border-black/15 hover:border-[#CF4500]/40 hover:bg-[#FCFBFA]'
              }`}
            >
              {/* Processing Overlay */}
              {analyzing && (
                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3.5 p-6">
                  <RefreshCw className="w-8 h-8 text-[#CF4500] animate-spin" />
                  <p className="text-sm font-semibold text-[#141413]">
                    Calculating 468 landmarks &amp; facial ratios...
                  </p>
                  <p className="text-xs text-[#696969]">
                    Evaluating vertical thirds and golden ratio symmetry locally in browser.
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileInput}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="user"
                className="hidden"
                onChange={handleFileInput}
              />

              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500]">
                <Upload className="w-6 h-6" />
              </div>

              <p className="text-base font-bold text-[#141413] mb-1">
                Upload your photo
              </p>
              <p className="text-xs text-[#696969] mb-1">
                .JPG, .PNG, or WebP; max 10 MB
              </p>
              <p className="text-xs text-[#696969] mb-2">
                Min 400x400px, front-facing, good lighting
              </p>
              <p className="text-xs text-[#CF4500] font-medium mb-6">
                Photos processed in your browser. Nothing uploaded.
              </p>

              <button
                type="button"
                disabled={!consentChecked || analyzing}
                onClick={(e) => {
                  e.stopPropagation();
                  cameraInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#141413] hover:bg-[#262627] text-white text-xs font-bold rounded-full transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </button>
            </div>
          </div>
        ) : (
          /* ── Results View ── */
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-black/5 shadow-level-1 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/5">
                <div>
                  <h3 className="text-lg font-bold text-[#141413]">
                    Proportion Scorecard
                  </h3>
                  <p className="text-xs text-[#696969]">
                    Golden ratio &amp; symmetry index
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CF4500] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Assess Another</span>
                </button>
              </div>

              {uploadedImageSrc && (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 border border-black/5">
                  <Image
                    src={uploadedImageSrc}
                    alt="Analyzed face"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#CF4500]" />
                    <span>468 Landmarks Active</span>
                  </div>
                </div>
              )}

              {/* Metric Scores */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Overall Harmony', value: '88 / 100', color: 'text-[#CF4500]' },
                  { label: 'Golden Ratio', value: '1:1.618', color: 'text-[#CF4500]' },
                  { label: 'Symmetry', value: '94%', color: 'text-[#CF4500]' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#FCFBFA] border border-black/5 text-center space-y-1"
                  >
                    <div className="text-[10px] uppercase font-bold text-[#696969] tracking-wider">
                      {item.label}
                    </div>
                    <div className={`text-base font-bold font-mono ${item.color}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Proportions Breakdown */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                  Facial Thirds Analysis
                </div>
                {[
                  { section: 'Upper Third (Trichion to Glabella)', score: 'Balanced · 33.1%' },
                  { section: 'Middle Third (Glabella to Subnasale)', score: 'Balanced · 33.6%' },
                  { section: 'Lower Third (Subnasale to Menton)', score: 'Balanced · 33.3%' },
                ].map((row, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#FCFBFA] border border-black/5 text-xs"
                  >
                    <span className="text-[#555555] font-medium">{row.section}</span>
                    <span className="text-[#CF4500] font-bold">{row.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 3. More Analysers Section (Screenshot 2) ── */}
        <div className="max-w-xl mx-auto pt-14 pb-12">
          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#696969]">
              MORE ANALYSERS
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          {/* Acne Skin Assessment Card */}
          <Link
            href={routes.analyse}
            className="group flex items-center gap-4 bg-white border border-black/10 rounded-[24px] p-5 shadow-level-1 hover:border-[#CF4500]/30 hover:shadow-level-2 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FDEEE7] flex items-center justify-center text-[#CF4500] shrink-0 group-hover:bg-[#CF4500] group-hover:text-white transition-colors shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#141413] leading-tight">
                Acne Skin Assessment
              </p>
              <p className="text-xs text-[#555555] mt-1 leading-relaxed">
                Zone-by-zone AI skin visualization to explore and discuss with a professional.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#696969] group-hover:text-[#CF4500] group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        </div>
      </div>

      {/* ── 4. Floating Pill: Try Simulators (Screenshot 2 bottom right) ── */}
      <div className="fixed bottom-6 right-20 z-40">
        <Link
          href={routes.simulate}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#141413] hover:bg-[#262627] text-white text-xs font-bold shadow-level-2 border border-white/20 transition-all hover:scale-105 active:scale-95"
        >
          <span>Try Simulators</span>
        </Link>
      </div>
    </div>
  );
}
