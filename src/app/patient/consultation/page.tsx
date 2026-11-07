'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  Smile,
  Target,
  Eye,
  Scissors,
  Check,
  Upload,
  Shield,
  CheckCircle2,
  Sliders,
  MoveHorizontal,
  Download,
  User,
  CalendarCheck,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';
import { routes } from '@/config/routes';

const STEPS = [
  { id: 1, label: 'Welcome' },
  { id: 2, label: 'Area' },
  { id: 3, label: 'Procedure' },
  { id: 4, label: 'Photo' },
  { id: 5, label: 'Preview' },
  { id: 6, label: 'Summary' },
  { id: 7, label: 'Booking' },
];

type Region = 'face' | 'nose' | 'eyes' | 'body' | 'dental' | 'hair';

interface RegionOption {
  id: Region;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const REGIONS: RegionOption[] = [
  { id: 'face', name: 'Face', desc: 'Facelift, contouring, chin', icon: Smile },
  { id: 'nose', name: 'Nose', desc: 'Rhinoplasty, tip, bridge', icon: Target },
  { id: 'eyes', name: 'Eyes', desc: 'Eyelids, brow lift', icon: Eye },
  { id: 'body', name: 'Body', desc: 'Liposuction, tummy tuck', icon: Sparkles },
  { id: 'dental', name: 'Dental', desc: 'Smile design, veneers, whitening', icon: Smile },
  { id: 'hair', name: 'Hair', desc: 'Transplant, hairline, restoration', icon: Scissors },
];

interface ProcedureOption {
  id: string;
  name: string;
  desc: string;
}

const PROCEDURES_BY_REGION: Record<Region, ProcedureOption[]> = {
  nose: [
    { id: 'rhinoplasty', name: 'Rhinoplasty', desc: 'Reshape the nose for improved proportion and nasal airway' },
    { id: 'tip-refinement', name: 'Tip Refinement', desc: 'Refine the nasal tip shape, rotation, and projection' },
    { id: 'bridge-reduction', name: 'Bridge Reduction', desc: 'Smooth a dorsal hump for a straighter nasal profile' },
  ],
  face: [
    { id: 'facelift', name: 'Facelift', desc: 'Tighten and lift sagging skin for a more youthful facial contour' },
    { id: 'buccal-fat', name: 'Buccal Fat Removal', desc: 'Reduce cheek volume to create a slimmer, sculpted midface' },
    { id: 'chin-aug', name: 'Chin Augmentation', desc: 'Enhance chin projection and balance the lower facial profile' },
  ],
  eyes: [
    { id: 'blepharoplasty', name: 'Blepharoplasty', desc: 'Remove excess eyelid skin for a refreshed, alert appearance' },
    { id: 'brow-lift', name: 'Brow Lift', desc: 'Elevate the brow position to reduce forehead heaviness' },
    { id: 'under-eye', name: 'Under-Eye Treatment', desc: 'Address hollowing and dark circles beneath the eyes' },
  ],
  body: [
    { id: 'liposuction', name: 'Liposuction', desc: 'Remove stubborn fat deposits for improved body contour' },
    { id: 'tummy-tuck', name: 'Tummy Tuck', desc: 'Tighten abdominal muscles and remove excess skin' },
    { id: 'bbl', name: 'Brazilian Butt Lift', desc: 'Fat transfer to enhance buttock shape and volume' },
  ],
  dental: [
    { id: 'smile-design', name: 'Smile Design', desc: 'Reshape tooth form, alignment, and smile proportions for facial harmony' },
    { id: 'teeth-whitening', name: 'Teeth Whitening', desc: 'Brighten your smile with professional shade-matched whitening' },
    { id: 'veneers', name: 'Veneers', desc: 'Porcelain or composite shells for a complete smile transformation' },
  ],
  hair: [
    { id: 'hair-transplant', name: 'Hair Transplant', desc: 'FUE, FUT, or DHI graft techniques to restore a natural hairline' },
    { id: 'hairline-lowering', name: 'Hairline Lowering', desc: 'Surgical advancement or graft-based forehead reduction' },
    { id: 'eyebrow-restoration', name: 'Eyebrow Restoration', desc: 'Transplant or microblading to restore full, natural brows' },
  ],
};

export default function PatientConsultationPage() {
  const [currentStep, setCurrentStep] = useState(2); // Defaults to Step 2 as in canonical flow
  const [selectedRegion, setSelectedRegion] = useState<Region>('nose');
  const [selectedProcedure, setSelectedProcedure] = useState('rhinoplasty');
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(60);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProcedures = PROCEDURES_BY_REGION[selectedRegion] || PROCEDURES_BY_REGION.nose;
  const activeProcObj = currentProcedures.find((p) => p.id === selectedProcedure) || currentProcedures[0];

  const handleFileSelect = (file: File) => {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setUploadError('Invalid file type. Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File too large. Maximum size is 10 MB.');
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setImageSrc(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  // Slider dragging handlers
  const handleSliderMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = () => setIsDragging(true);
  const onPointerUp = () => setIsDragging(false);
  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging) handleSliderMove(e.clientX);
  };

  const handleDownloadPreview = () => {
    if (!imageSrc) {
      alert('Preview saved to your account.');
      return;
    }
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = `faceify-${selectedProcedure}-preview.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto font-sans">
      {/* 7-Step Progress Stepper (Matches Image 9 & 10) */}
      <div className="py-4">
        <div className="relative flex items-center justify-between max-w-2xl mx-auto">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          {STEPS.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#305A4F] text-white shadow-sm ring-4 ring-[#305A4F]/20'
                      : isCompleted
                      ? 'bg-[#141413] text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                  aria-label={`Step ${step.id}: ${step.label}`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.id}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Welcome Screen */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#305A4F]/10 text-[#305A4F] flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans mb-2">
            Welcome to Your Virtual Consultation
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-4 font-sans">
            POWERED BY FACEIFY LABS
          </p>

          <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed mb-8 font-sans">
            This guided experience helps you explore procedures and explore AI visualizations, all before your first appointment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mb-8 font-sans">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Takes about 3 minutes</span>
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#305A4F]" />
              <span>Real-time simulation runs in your browser</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#305A4F] hover:bg-[#25453C] text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
          >
            <span>Begin Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 2: Select Area (Matches Image 9 Exactly) */}
      {currentStep === 2 && (
        <div>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans">
              What area would you like to explore?
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              Select the area you&apos;re most interested in
            </p>
          </div>

          {/* 6 Regions Grid in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {REGIONS.map((region) => {
              const Icon = region.icon;
              const isSelected = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region.id)}
                  className={`p-6 sm:p-7 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                    isSelected
                      ? 'border-[#305A4F] bg-[#305A4F]/[0.05] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected ? 'bg-[#305A4F]/10 text-[#305A4F]' : 'bg-slate-100 text-slate-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#0A0F1A] font-sans">
                    {region.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    {region.desc}
                  </p>

                  {/* Checkmark when selected */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#305A4F] text-white flex items-center justify-center mt-3">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Select Procedure */}
      {currentStep === 3 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans">
              Choose a procedure
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              Select the procedure you&apos;d like to preview
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {currentProcedures.map((proc) => {
              const isSelected = selectedProcedure === proc.id;
              return (
                <button
                  key={proc.id}
                  type="button"
                  onClick={() => setSelectedProcedure(proc.id)}
                  className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col text-left ${
                    isSelected
                      ? 'border-[#305A4F] bg-[#305A4F]/[0.05] shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <h3 className="text-base font-bold text-[#0A0F1A] font-sans mb-1.5">{proc.name}</h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed mb-4 flex-1">
                    {proc.desc}
                  </p>
                  {isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#305A4F] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-slate-300" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Upload Your Photo (Matches Image 10 Exactly!) */}
      {currentStep === 4 && (
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0F1A] font-sans mb-2">
              Upload your photo
            </h1>
            <p className="text-sm text-slate-400 font-sans">
              Upload a front-facing photo for your personalized preview
            </p>
          </div>

          {uploadError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {uploadError}
            </div>
          )}

          {/* Dashed Drag & Drop Box */}
          {!imageSrc ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#305A4F] rounded-2xl p-10 text-center cursor-pointer transition-all bg-white hover:bg-[#305A4F]/[0.02]"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center transition-colors">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-bold text-slate-700 mb-1 font-sans">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-slate-400 font-sans">
                JPG, PNG, or WebP (max 10MB)
              </p>
            </div>
          ) : (
            <div className="text-center bg-white rounded-2xl border border-slate-200 p-6">
              <div className="relative inline-block rounded-xl overflow-hidden border border-slate-200 shadow-md mb-4 max-w-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt="Uploaded" className="max-h-64 w-auto object-cover" />
                <button
                  type="button"
                  onClick={() => setImageSrc(null)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors text-sm font-bold"
                  aria-label="Remove photo"
                >
                  &times;
                </button>
              </div>
              <p className="text-sm text-green-600 font-medium flex items-center justify-center gap-1.5 font-sans">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Photo uploaded successfully</span>
              </p>
            </div>
          )}

          {/* Tips for Best Results Box */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-left">
            <p className="text-xs font-bold text-slate-500 mb-2 font-sans">Tips for best results:</p>
            <ul className="text-xs text-slate-400 space-y-1 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#305A4F] mt-0.5">•</span> Good, even lighting on your face
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#305A4F] mt-0.5">•</span> Hair pulled back from your face
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#305A4F] mt-0.5">•</span> Neutral expression, looking directly at camera
              </li>
            </ul>
          </div>

          {/* Privacy Note */}
          <div className="mt-4 flex items-center gap-2 justify-center text-xs text-slate-400 text-center leading-relaxed font-sans">
            <Shield className="w-3.5 h-3.5 shrink-0" />
            <span>
              Real-time simulations run in your browser. Your photo is sent off your device only if you turn on the optional AI photoreal preview or choose to save a simulation to your account, and is never used to train any model.
            </span>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white font-bold rounded-xl transition-all text-sm cursor-pointer"
            >
              <span>Generate Preview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Your AI Preview */}
      {currentStep === 5 && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1A] font-sans mb-1">
              Your AI Preview
            </h2>
            <p className="text-sm text-slate-400 font-sans">
              Drag the slider to compare. Adjust intensity to see subtle to dramatic outcomes.
            </p>
            <p className="text-[10px] text-[#305A4F] font-bold mt-1 tracking-wider uppercase font-sans">
              468-POINT FACE MESH ACTIVE
            </p>
          </div>

          {/* Before / After Comparison Slider */}
          <div
            ref={containerRef}
            className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md select-none touch-none bg-slate-900 mb-6 aspect-[4/3] max-h-[460px] mx-auto cursor-ew-resize"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onPointerMove={onPointerMove}
          >
            {/* Before layer */}
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageSrc} alt="Before" className="w-full h-full object-cover" draggable={false} />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <Smile className="w-16 h-16 mb-2 opacity-50" />
                  <span className="text-xs">Original Photo</span>
                </div>
              )}
            </div>

            {/* After layer clipped by slider */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-slate-700"
              style={{ clipPath: `inset(0 0 0 ${100 - sliderPos}%)` }}
            >
              {imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={imageSrc} 
                  alt="After" 
                  className="w-full h-full object-cover filter contrast-105 saturate-105" 
                  draggable={false} 
                />
              ) : (
                <div className="flex flex-col items-center text-slate-300">
                  <Sparkles className="w-16 h-16 mb-2 text-[#305A4F]" />
                  <span className="text-xs">Simulated Result</span>
                </div>
              )}
            </div>

            {/* Slider Divider Line & Thumb */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="w-0.5 h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-auto">
                <MoveHorizontal className="w-4 h-4 text-slate-700" />
              </div>
            </div>

            {/* Corner Badges */}
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black/60 backdrop-blur rounded-lg text-[10px] font-bold text-white pointer-events-none font-sans">
              BEFORE
            </div>
            <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-[#305A4F]/90 backdrop-blur rounded-lg text-[10px] font-bold text-white pointer-events-none font-sans">
              AFTER (AI PREVIEW)
            </div>
          </div>

          {/* Intensity Slider */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 font-sans">
                <Sliders className="w-3.5 h-3.5 text-[#305A4F]" />
                <span>Simulation Intensity</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#305A4F]">{intensity}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#305A4F]"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-sans">
              <span>Subtle</span>
              <span>Moderate</span>
              <span>Dramatic</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(6)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white font-bold rounded-xl transition-all text-sm cursor-pointer"
            >
              <span>View Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Consultation Summary (Matches Screenshot 1 & 2 Exactly) */}
      {currentStep === 6 && (
        <div className="max-w-3xl mx-auto">
          {/* Header without subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A0F1A] font-sans">
              Your Consultation Summary
            </h2>
          </div>

          {/* Side by side: Before & After (AI Preview) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Before Card */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs flex flex-col">
              <div className="px-3 py-2 bg-slate-100 text-xs font-bold text-slate-500 text-center tracking-wider font-sans">
                BEFORE
              </div>
              <div className="aspect-[16/10] bg-slate-800 flex items-center justify-center overflow-hidden">
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageSrc} alt="Before" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                    <Smile className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-xs font-sans">Original photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* After (AI Preview) Card */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs flex flex-col">
              <div className="px-3 py-2 bg-[#1E293B] text-xs font-bold text-slate-300 text-center tracking-wider font-sans">
                AFTER (AI PREVIEW)
              </div>
              <div className="aspect-[16/10] bg-slate-800 flex items-center justify-center overflow-hidden">
                {imageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageSrc}
                    alt="After AI preview"
                    className="w-full h-full object-cover filter contrast-105 saturate-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-300 p-6 text-center">
                    <Sparkles className="w-12 h-12 mb-2 text-[#305A4F]" />
                    <span className="text-xs font-sans text-slate-400">Simulated preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Card (Matches Screenshot 1 Exactly) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400 font-sans">Procedure</span>
              <span className="text-sm font-bold text-[#0A0F1A] font-sans">{activeProcObj.name}</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400 font-sans">Simulation Intensity</span>
              <span className="text-sm font-normal text-[#0A0F1A] font-sans">{intensity}%</span>
            </div>
            <div className="h-px bg-slate-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400 font-sans">Face Detection</span>
              <span className="text-sm font-bold text-green-600 font-sans">✓ Good</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed font-sans">
            This preview is an AI-generated estimation. Actual surgical results may vary based on individual anatomy and surgical technique.
          </p>

          {/* Save Preview Action Button (Matches Screenshot 2) */}
          <div className="flex items-center justify-center mb-8">
            <button
              type="button"
              onClick={handleDownloadPreview}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer shadow-xs font-sans"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Save Preview</span>
            </button>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(7)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white font-bold rounded-xl transition-all text-sm cursor-pointer shadow-xs font-sans"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 7: Ready to take the next step? (Matches Screenshot 1 Exactly) */}
      {currentStep === 7 && (
        <div className="max-w-3xl mx-auto">
          {bookingSubmitted ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center shadow-xs">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#0A0F1A] font-sans mb-2">
                Consultation Request Submitted!
              </h2>
              <p className="text-sm text-slate-500 font-sans leading-relaxed mb-6">
                Your AI preview and procedure details for {activeProcObj.name} have been safely saved. A specialist will review your simulation and reach out shortly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/patient/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#305A4F] hover:bg-[#25453C] text-white font-bold rounded-xl text-sm transition-all"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0F1A] font-sans mb-2">
                  Ready to take the next step?
                </h2>
                <p className="text-sm text-slate-400 font-sans">
                  Book a consultation with your chosen clinic. Your AI visualization will be shared with your surgeon before your appointment.
                </p>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Left Column: Calendar Card */}
                <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col items-center justify-center text-center p-8 min-h-[380px] shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-3">
                    <Calendar className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-700 font-sans mb-1">
                    Calendar not configured
                  </p>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-xs">
                    Online booking isn&apos;t available yet. Please contact the clinic directly to schedule.
                  </p>
                </div>

                {/* Right Column: Contact Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 font-sans">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#305A4F]/30 focus:border-[#305A4F] transition-all bg-white font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 font-sans">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@email.com"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#305A4F]/30 focus:border-[#305A4F] transition-all bg-white font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 font-sans">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#305A4F]/30 focus:border-[#305A4F] transition-all bg-white font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 font-sans">
                      Additional notes (optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share any specific concerns or questions for the surgeon…"
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#305A4F]/30 focus:border-[#305A4F] transition-all bg-white font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#305A4F] hover:bg-[#25453C] text-white font-bold rounded-xl transition-all shadow-md shadow-[#305A4F]/20 text-sm flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    Book a Consultation
                  </button>

                  <p className="text-[11px] text-slate-400 text-center font-sans mt-2">
                    Your surgeon will review your AI preview before your appointment.
                  </p>
                </form>
              </div>

              {/* Bottom Navigation */}
              <div className="flex justify-start mt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer font-sans"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
