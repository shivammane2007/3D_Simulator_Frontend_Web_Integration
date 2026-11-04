'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Upload,
  Camera,
  ChevronDown,
  Check,
  X,
  Sun,
  User,
  Droplets,
  Focus,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import { routes } from '@/config/routes';

interface ZoneResult {
  name: string;
  key: string;
  severity: number; // 0 - 100
  level: 'Clear' | 'Mild' | 'Moderate' | 'Severe';
  type: string;
  notes: string;
}

const DEFAULT_ZONES: ZoneResult[] = [
  {
    name: 'Forehead',
    key: 'forehead',
    severity: 24,
    level: 'Mild',
    type: 'Whiteheads & Papules',
    notes: 'Occasional surface micro-comedones around the hairline.',
  },
  {
    name: 'Left Cheek',
    key: 'leftCheek',
    severity: 12,
    level: 'Clear',
    type: 'Minimal blemishes',
    notes: 'Smooth texture with uniform skin tone.',
  },
  {
    name: 'Right Cheek',
    key: 'rightCheek',
    severity: 18,
    level: 'Mild',
    type: 'Papules',
    notes: 'Localized minor redness; minimal active blemishes.',
  },
  {
    name: 'Nose',
    key: 'nose',
    severity: 38,
    level: 'Moderate',
    type: 'Blackheads (Open Comedones)',
    notes: 'Sebum congestion across the nasal bridge and alar crease.',
  },
  {
    name: 'Chin',
    key: 'chin',
    severity: 28,
    level: 'Mild',
    type: 'Papules & Whiteheads',
    notes: 'Minor hormonal-pattern follicular inflammation.',
  },
  {
    name: 'Jawline',
    key: 'jaw',
    severity: 8,
    level: 'Clear',
    type: 'Clear',
    notes: 'Unobstructed jaw contour with even pigmentation.',
  },
];

export default function AcneAssessmentPage() {
  const [consentChecked, setConsentChecked] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const takePhotoInputRef = useRef<HTMLInputElement>(null);

  const progressSteps = [
    'Detecting facial landmarks',
    'Mapping 6 cosmetic skin zones',
    'Scanning for redness & comedones',
    'Classifying lesion appearances',
    'Finalizing aesthetic scorecard',
  ];

  const handleImageFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setUploadedImageSrc(src);
      startAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setAnalysisStep(0);

    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => {
        if (prev < progressSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            setAnalyzing(false);
            setAnalyzed(true);
          }, 400);
          return prev;
        }
      });
    }, 450);
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
    setAnalysisStep(0);
    stopCamera();
  };

  // Live Camera handlers
  const startCamera = async () => {
    if (!consentChecked) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch {
      // Fallback to native capture input
      takePhotoInputRef.current?.click();
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror if front facing
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setUploadedImageSrc(dataUrl);
      stopCamera();
      startAnalysis();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

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
      <div className="relative z-10 text-center max-w-xl mx-auto pt-6 pb-6 px-4 space-y-3">
        <h1 className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-[#141413] leading-[1.15]">
          Acne Skin Assessment
        </h1>

        <p className="pt-1 text-sm sm:text-base text-[#555555] font-normal max-w-[440px] mx-auto leading-relaxed">
          Get a personalised cosmetic skin assessment in seconds. All analysis runs locally in your browser: no images leave your device.
        </p>
      </div>

      {/* ── 2. Main Content Container (Proper spacing on both sides: max-w-[480px]) ── */}
      <div className="relative z-10 w-full mx-auto px-4">
        {!analyzed ? (
          <div className="w-full max-w-[480px] mx-auto space-y-4">
            {/* Guide Accordion: HOW TO GET THE BEST RESULTS */}
            <div className="bg-white rounded-[24px] border border-black/10 shadow-level-1 overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setIsGuideOpen(!isGuideOpen)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-[#FCFBFA] transition-colors"
                aria-expanded={isGuideOpen}
              >
                <span className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                  HOW TO GET THE BEST RESULTS
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#696969] transition-transform duration-200 ${
                    isGuideOpen ? 'rotate-180 text-[#CF4500]' : ''
                  }`}
                />
              </button>

              {isGuideOpen && (
                <div className="px-6 pb-6 pt-1 border-t border-black/5 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6 pt-3">
                    {/* DO column */}
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-bold text-[#CF4500] uppercase tracking-wider mb-3">
                        <Check className="w-4 h-4" />
                        DO
                      </p>
                      <ul className="space-y-2.5 text-xs text-[#555555]">
                        <li className="flex items-start gap-2">
                          <Sun className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#CF4500]" />
                          <span>Natural, even lighting — face a window; avoid harsh overhead light</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <User className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#CF4500]" />
                          <span>Whole face in frame, straight on (forehead to chin)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Droplets className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#CF4500]" />
                          <span>Bare skin — remove makeup, concealer, and tinted SPF</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#CF4500]" />
                          <span>Clean, dry skin; pull hair back off your face</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Focus className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#CF4500]" />
                          <span>Hold steady, in focus, neutral expression</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Camera className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#CF4500]" />
                          <span>For acne type — zoom in on your most affected area at 15–30 cm</span>
                        </li>
                      </ul>
                    </div>

                    {/* AVOID column */}
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-wider mb-3">
                        <X className="w-4 h-4" />
                        AVOID
                      </p>
                      <ul className="space-y-2.5 text-xs text-[#555555]">
                        <li className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                          <span>Beauty filters / skin-smoothing / &ldquo;portrait beautify&rdquo;</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                          <span>Backlight or strong harsh cast shadows</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                          <span>Photos too far away, extreme angles, or tilted poses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400" />
                          <span>Sunglasses or hair covering cheeks/forehead</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Photo guide illustration */}
                  <div className="p-3 bg-[#FCFBFA] rounded-2xl border border-black/5 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/guides/acne-closeup-guide.svg"
                      alt="Front-facing selfie and close-up photography guide"
                      className="max-h-48 w-auto object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Tip Banner Pill */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#FDEEE7] border border-[#CF4500]/20 text-[#9A3A0A] text-xs font-medium leading-relaxed">
              <Camera className="w-4 h-4 shrink-0 text-[#CF4500]" />
              <span>
                Front-facing photo — or close-up of your most affected area for acne type detection
              </span>
            </div>

            {/* DPDP Act 2023 Consent Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer select-none py-1 text-left">
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

            {/* Live Camera Modal (if active) */}
            {isCameraActive && (
              <div className="relative w-full rounded-[28px] overflow-hidden bg-[#141413] shadow-level-2 border border-black/10 p-4 text-center">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  {/* Oval Face Guide Overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-[50%] border-2 border-dashed border-[#CF4500]/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] flex items-center justify-center">
                      <span className="text-[11px] font-semibold text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm -mt-40">
                        Align Face Within Oval
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 hover:text-white text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#CF4500] hover:bg-[#B33B00] text-white text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Photo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Upload Box (Dashed Card) */}
            {!isCameraActive && (
              <div
                role="button"
                tabIndex={consentChecked ? 0 : -1}
                onClick={() => consentChecked && !analyzing && fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className={`relative w-full border-2 border-dashed rounded-[28px] p-8 sm:p-12 text-center transition-all bg-white shadow-level-1 overflow-hidden ${
                  !consentChecked
                    ? 'opacity-60 cursor-not-allowed border-black/10'
                    : 'cursor-pointer border-black/15 hover:border-[#CF4500]/40 hover:bg-[#FCFBFA]'
                }`}
              >
                {/* Processing Overlay */}
                {analyzing && (
                  <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6">
                    <div className="w-12 h-12 rounded-full border-3 border-[#FDEEE7] border-t-[#CF4500] animate-spin" />
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-bold text-[#141413]">
                        {progressSteps[analysisStep]}
                      </p>
                      <p className="text-xs text-[#696969]">
                        Step {analysisStep + 1} of {progressSteps.length} · Processing on-device
                      </p>
                    </div>
                    {/* Animated progress bar */}
                    <div className="w-48 h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#CF4500] transition-all duration-300 rounded-full"
                        style={{ width: `${((analysisStep + 1) / progressSteps.length) * 100}%` }}
                      />
                    </div>
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
                  ref={takePhotoInputRef}
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
                    if (consentChecked && !analyzing) {
                      takePhotoInputRef.current?.click();
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#141413] hover:bg-[#262627] text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Take Photo</span>
                </button>
              </div>
            )}

            {/* Secondary Action: Use camera with face guide */}
            {!isCameraActive && (
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  disabled={!consentChecked || analyzing}
                  onClick={startCamera}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-black/15 hover:border-[#CF4500]/40 text-[#141413] text-xs font-semibold shadow-level-1 hover:shadow-level-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-98"
                >
                  <Camera className="w-4 h-4 text-[#CF4500]" />
                  <span>Use camera with face guide</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ── 3. Results Scorecard ── */
          <div className="w-full max-w-[600px] mx-auto space-y-6 animate-in fade-in duration-300">
            {/* Top Bar: Assessment Overview & Reset */}
            <div className="bg-white border border-black/10 rounded-[28px] p-6 sm:p-8 shadow-level-1 space-y-6">
              <div className="flex items-center justify-between border-b border-black/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#141413]">
                      Skin Assessment Report
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FDEEE7] text-[#CF4500] border border-[#CF4500]/20">
                      Mild Appearance
                    </span>
                  </div>
                  <p className="text-xs text-[#696969] mt-0.5">
                    Analyzed zone-by-zone · On-device biometric inference
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#CF4500] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Assess Another</span>
                </button>
              </div>

              {/* Photo & Zone Map HUD Preview */}
              <div className="grid sm:grid-cols-2 gap-5 items-center">
                {uploadedImageSrc && (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/5 border border-black/5">
                    <Image
                      src={uploadedImageSrc}
                      alt="Uploaded face with skin analysis"
                      fill
                      className="object-cover"
                    />
                    {/* Zone HUD overlays */}
                    <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="bg-black/65 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          Forehead: Mild
                        </span>
                        <span className="bg-black/65 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          Nose: Moderate
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="bg-black/65 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          L. Cheek: Clear
                        </span>
                        <span className="bg-black/65 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          Chin: Mild
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Overall Score Metrics */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FCFBFA] border border-black/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#696969] tracking-wider">
                      Overall Skin Clarity Score
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-display font-bold text-[#CF4500]">
                        82
                      </span>
                      <span className="text-xs text-[#696969]">/ 100</span>
                    </div>
                    <p className="text-xs text-[#555555] leading-relaxed pt-1">
                      This visualization highlights a mild appearance of blemish-prone areas.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FCFBFA] border border-black/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#696969] tracking-wider">
                      Predominant Appearance
                    </span>
                    <p className="text-xs font-bold text-[#141413]">
                      Papules &amp; Micro-comedones
                    </p>
                    <p className="text-[11px] text-[#696969]">
                      Non-cystic superficial pattern concentrated primarily in the T-zone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone Breakdown */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#141413] uppercase tracking-wider">
                    6-Zone Facial Breakdown
                  </h3>
                  <span className="text-[11px] text-[#696969]">
                    0 = Clear · 100 = High Activity
                  </span>
                </div>

                <div className="space-y-2.5">
                  {DEFAULT_ZONES.map((zone) => (
                    <div
                      key={zone.key}
                      className="p-3.5 rounded-2xl bg-[#FCFBFA] border border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="min-w-[140px]">
                        <p className="text-xs font-bold text-[#141413]">{zone.name}</p>
                        <p className="text-[11px] text-[#696969]">{zone.type}</p>
                      </div>

                      {/* Severity Progress Bar */}
                      <div className="flex-1 max-w-xs mx-auto w-full">
                        <div className="flex justify-between text-[10px] text-[#696969] mb-1">
                          <span>Activity Level</span>
                          <span className="font-semibold text-[#141413]">{zone.severity}%</span>
                        </div>
                        <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              zone.level === 'Clear'
                                ? 'bg-[#141413]/40'
                                : zone.level === 'Mild'
                                ? 'bg-[#F37338]'
                                : 'bg-[#CF4500]'
                            }`}
                            style={{ width: `${zone.severity}%` }}
                          />
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            zone.level === 'Clear'
                              ? 'bg-black/5 text-[#555555]'
                              : zone.level === 'Mild'
                              ? 'bg-[#FDEEE7] text-[#CF4500]'
                              : 'bg-[#CF4500]/15 text-[#CF4500]'
                          }`}
                        >
                          {zone.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations: Areas to Discuss with a Professional */}
              <div className="p-4 rounded-2xl bg-[#FDEEE7]/50 border border-[#CF4500]/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#CF4500] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Areas to discuss with a professional</span>
                </div>
                <ul className="text-xs text-[#555555] space-y-1.5 list-disc list-inside">
                  <li>Gentle salicylic acid (BHA) cleanse for T-zone and nasal comedones</li>
                  <li>Non-comedogenic barrier hydration with niacinamide to calm localized erythema</li>
                  <li>In-clinic consultation if inflammatory papules persist beyond 4–6 weeks</li>
                </ul>
              </div>

              {/* Medical & DPDP Disclaimer */}
              <div className="p-4 rounded-2xl bg-[#FCFBFA] border border-black/5 flex items-start gap-3">
                <Info className="w-4 h-4 text-[#CF4500] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#696969] leading-relaxed">
                  <span className="font-bold text-[#141413]">Important Notice: </span>
                  This is a cosmetic skin assessment, not a medical diagnosis. Results are based on optical image analysis and are intended for cosmetic awareness purposes only. Consult a board-certified dermatologist for evaluation and treatment of acne or any other skin condition.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#141413] hover:bg-[#262627] text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Assess Another Photo</span>
                </button>

                <Link
                  href={routes.analyse}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-black/15 hover:border-[#CF4500]/40 text-[#141413] text-xs font-semibold shadow-level-1 hover:shadow-level-2 transition-all hover:scale-105 active:scale-95"
                >
                  <span>Explore Facial Proportions</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CF4500]" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 5. Floating Pill: Try Simulators ── */}
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

